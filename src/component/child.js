
import { Promise } from 'es6-promise-min';
import postRobot from 'post-robot/dist/post-robot';
import { noop, once, extend, getParentWindow, b64decode, onCloseWindow } from '../util';
import { CONSTANTS } from '../constants';

export class ChildComponent {

    constructor(component, options = {}) {
        this.validate(options);

        this.component = component;

        this.onEnter = once(options.onEnter || noop);
        this.onExit = once(options.onExit || noop);
        this.onClose = once(options.onClose || noop);
        this.onError = once(options.onError || noop);

        this.onProps = options.onProps || noop;

        this.setWindows();
        this.watchForClose();

        this.props = {};

        if (!this.parentWindow) {
            throw new Error(`[${this.component.tag}] Can not find parent window`);
        }

        this.init(this.parentWindow);
    }

    setWindows() {

        if (window.__activeXComponent__) {
            throw new Error(`[${this.component.tag}] Can not attach multiple components to the same window`);
        }

        window.__activeXComponent__ = this;

        this.parentWindow = getParentWindow();

        let winProps;

        try {
            winProps = JSON.parse(b64decode(window.name));
        } catch (err) {
            // pass
        }

        if (!winProps || winProps.type !== CONSTANTS.XCOMPONENT) {
            throw new Error(`[${this.component.tag}] Window has not been rendered by xcomponent - can not attach here`);
        }

        if (winProps.parent) {
            this.parentComponentWindow = this.parentWindow.frames[winProps.parent];
        } else {
            this.parentComponentWindow = this.parentWindow;
        }

        this.id = winProps.id;
    }

    init() {
        this.initPromise = postRobot.send(this.parentComponentWindow, CONSTANTS.POST_MESSAGE.INIT).then(data => {

            this.listen();

            this.context = data.context;
            extend(this.props, data.props);

            this.onEnter.call(this);
            this.onProps.call(this);

        }).catch(err => this.onError(err));
    }

    watchForClose() {

        onCloseWindow(this.parentWindow, () => {
            this.onClose(new Error(`[${this.component.tag}] parent window was closed`));
        });

        onCloseWindow(this.parentComponentWindow, () => {
            this.close(new Error(`[${this.component.tag}] parent component window was closed`));
        });
    }

    validate(options) {
        // pass
    }

    parentListeners() {
        return {
            [ CONSTANTS.POST_MESSAGE.PROPS ](source, data) {
                extend(this.props, data.props);
                this.onProps.call(this);
            },

            [ CONSTANTS.POST_MESSAGE.CLOSE ](source, data) {
                return this.close();
            },

            [ CONSTANTS.POST_MESSAGE.RESIZE ](source, data) {
                window.resizeTo(data.width, data.height);
            }
        };
    }

    listen() {
        if (!this.parentComponentWindow) {
            throw new Error(`[${this.component.tag}] parent component window not set`);
        }

        let parentListeners = this.parentListeners();

        for (let listenerName of Object.keys(parentListeners)) {
            postRobot.on(listenerName, { window: this.parentComponentWindow }, (source, data) => {
                return parentListeners[listenerName].call(this, source, data);
            });
        }
    }

    close(err) {
        this.onClose.call(this, err);
        return postRobot.sendToParent(CONSTANTS.POST_MESSAGE.CLOSE);
    }

    focus() {
        window.focus();
    }

    resize(height, width) {
        return Promise.resolve().then(() => {

            if (this.context === CONSTANTS.CONTEXT.POPUP) {
                window.resizeTo(width, height);

            } else if (this.context === CONSTANTS.CONTEXT.IFRAME) {
                return postRobot.sendToParent(CONSTANTS.POST_MESSAGE.RESIZE, {
                    height,
                    width
                });
            }
        });
    }

    redirectParent(url) {

        return postRobot.sendToParent(CONSTANTS.POST_MESSAGE.REDIRECT, {
            url
        }).then(() => {
            console.warn(`[${this.component.tag}] Parent did not redirect`);
            this.parentWindow.location = url;
        }, err => {
            console.warn(`[${this.component.tag}] Parent did not redirect due to error: ${err.stack || err.toString()}`);
            this.parentWindow.location = url;
        });
    }
}
