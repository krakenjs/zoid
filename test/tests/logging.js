

import { testComponent_logLevel_configured, testComponent_no_logLevel_configured } from '../component';

describe('xcomponent console logging', () => {

    describe('when defaultLogLevel is configured when creating component', () => {
        it('should set log level to the configured value', done => {
            testComponent_logLevel_configured.renderIframe({
                onEnter() {
                    if (!(window.LOG_LEVEL === 'error')) {
                        throw new Error(`should set log level to the configured value: error, but it was ${window.LOG_LEVEL}`);
                    } else {
                        done();
                    }
                }
            }, document.body);
        });

        it('when passing logLevel as prop, it should override component configured value', done => {
            testComponent_logLevel_configured.renderIframe({
                logLevel: 'warn',
                onEnter() {
                    if (!(window.LOG_LEVEL === 'warn')) {
                        throw new Error(`should set log level to the prop value: warn, but it was ${window.LOG_LEVEL}`);
                    } else {
                        done();
                    }
                }
            }, document.body);
        });
    });

    describe('when defaultLogLevel is not configured when creating component', () => {
        it('should set log level to the default value: info', done => {
            testComponent_no_logLevel_configured.renderIframe({
                onEnter() {
                    if (!(window.LOG_LEVEL === 'info')) {
                        throw new Error(`should have set log level to the default value: info, but it was ${window.LOG_LEVEL}`);
                    } else {
                        done();
                    }
                }
            }, document.body);
        });

        it('when passing logLevel as prop, it should override component default value', done => {
            testComponent_no_logLevel_configured.renderIframe({
                logLevel: 'warn',
                onEnter() {
                    if (!(window.LOG_LEVEL === 'warn')) {
                        throw new Error(`should set log level to the prop value: warn, but it was ${window.LOG_LEVEL}`);
                    } else {
                        done();
                    }
                }
            }, document.body);
        });
    });

});
