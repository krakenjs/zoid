'use strict';

exports.__esModule = true;
exports.getInternalProps = getInternalProps;

var _src = require('zalgo-promise/src');

var _lib = require('../../lib');

require('../../types');

/*  Internal Props
    --------------

    We define and use certain props by default, for configuration and events that are used at the framework level.
    These follow the same format as regular props, and are classed as reserved words that may not be overriden by users.
*/

function getInternalProps() {
    return {

        // The desired env in which the component is being rendered. Used to determine the correct url

        env: {
            type: 'string',
            queryParam: true,
            required: false,
            def: function def(props, component) {
                return component.defaultEnv;
            }
        },

        uid: {
            type: 'string',
            def: function def() {
                return (0, _lib.uniqueID)();
            },

            queryParam: true
        },

        logLevel: {
            type: 'string',
            queryParam: true,
            def: function def(props, component) {
                return component.defaultLogLevel;
            }
        },

        dimensions: {
            type: 'object',
            required: false
        },

        version: {
            type: 'string',
            required: false,
            queryParam: true,
            def: function def(props, component) {
                return component.version;
            }
        },

        // A millisecond timeout before onTimeout is called

        timeout: {
            type: 'number',
            required: false,
            sendToChild: false
        },

        onDisplay: {
            type: 'function',
            required: false,
            sendToChild: false,

            def: function def() {
                return _lib.noop;
            },
            decorate: function decorate(onDisplay) {
                return (0, _lib.memoize)((0, _lib.promisify)(onDisplay));
            }
        },

        onEnter: {
            type: 'function',
            required: false,
            sendToChild: false,

            def: function def() {
                return _lib.noop;
            },
            decorate: function decorate(onEnter) {
                return (0, _lib.promisify)(onEnter);
            }
        },

        // When we get an INIT message from the child

        onRender: {
            type: 'function',
            required: false,
            sendToChild: false,

            def: function def() {
                return _lib.noop;
            },
            decorate: function decorate(onRender) {
                return (0, _lib.promisify)(onRender);
            }
        },

        // When the user closes the component.

        onClose: {
            type: 'function',
            required: false,
            sendToChild: false,

            def: function def() {
                return _lib.noop;
            },
            decorate: function decorate(onClose) {
                return (0, _lib.once)((0, _lib.promisify)(onClose));
            }
        },

        // When we time-out before getting an INIT message from the child. Defaults to onError if no handler passed.

        onTimeout: {
            type: 'function',
            required: false,
            sendToChild: false,
            def: function def() {
                return function onTimeout(err) {
                    return this.props.onError(err);
                };
            },
            decorate: function decorate(onTimeout) {
                return (0, _lib.memoize)((0, _lib.promisify)(onTimeout));
            }
        },

        // When the component experiences an error

        onError: {
            type: 'function',
            required: false,
            sendToChild: true,
            def: function def() {
                return function onError(err) {
                    setTimeout(function () {
                        throw err;
                    });
                };
            },
            decorate: function decorate(onError) {
                return (0, _lib.once)((0, _lib.promisify)(onError));
            }
        }
    };
}