/* @flow */
/* eslint max-lines: off */

import { ZalgoPromise } from 'zalgo-promise/src';
import { wrapPromise, noop, destroyElement } from 'belter/src';

import { onWindowOpen, runOnClick, getBody } from '../common';
import { zoid } from '../zoid';

describe('zoid error cases', () => {

    it('should error out when window.open returns a closed window', () => {
        return wrapPromise(({ expect, error }) => {
            const windowOpen = window.open;
            window.open = () => {
                return {
                    closed: true,
                    close:  error('close')
                };
            };

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-error-popup-closed',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({
                onDestroy: expect('onDestroy')
            }).render('body', zoid.CONTEXT.POPUP).catch(expect('catch', err => {
                if (!(err instanceof zoid.PopupOpenError)) {
                    throw err;
                }

                window.open = windowOpen;
            }));
        });
    });

    it('should enter a component, throw an integration error, and return the error to the parent with the original stack', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-error-from-child',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({

                onDestroy: avoid('onDestroy'),

                onError: expect('onError', err => {
                    // $FlowFixMe
                    const message = err.message ? err.message.toString() : '';

                    if (!err || message.indexOf('xxxxx') === -1) {
                        throw new Error(`Expected error to contain original error from child window`);
                    }
                }),

                run: () => `
                    window.xprops.onError(new Error('xxxxx'));
                `
            }).render(getBody(), zoid.CONTEXT.IFRAME).catch(noop);
        });
    });

    it('should enter a component and timeout, then call onError', () => {
        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-error-from-child-onerror',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({
                timeout:   1,
                onError:   expect('onError'),
                onDestroy: expect('onDestroy')
            }).render(getBody(), zoid.CONTEXT.IFRAME).catch(expect('catch'));
        });
    });

    it('should run validate function on props, and pass up error when thrown', () => {
        return wrapPromise(({ expect, expectError }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-error-prop-validate',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        validateProp: {
                            type:     'string',
                            validate: expectError('validate', () => {
                                throw new Error(`Invalid prop`);
                            })
                        }
                    }
                });
            };

            const component = window.__component__();

            return ZalgoPromise.try(() => {
                component({
                    validateProp: 'foo'
                });
            }).catch(expect('catch'));
        });
    });

    it('should run validate function on props, and not call onError when error is thrown', () => {
        return wrapPromise(({ expect, avoid, expectError }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-error-prop-validate-onerror',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        validateProp: {
                            type:     'string',
                            validate: expectError('validate', () => {
                                throw new Error(`Invalid prop`);
                            })
                        }
                    }
                });
            };

            const component = window.__component__();

            return ZalgoPromise.try(() => {
                component({
                    validateProp: 'foo',
                    onError:      avoid('onError')
                });
            }).catch(expect('catch'));
        });
    });

    it('should run validate function on component, and pass up error when thrown', () => {
        return wrapPromise(({ expect, expectError }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:      'test-error-validate',
                    url:      '/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    validate: expectError('validate', () => {
                        throw new Error(`Invalid component`);
                    })
                });
            };

            const component = window.__component__();

            return ZalgoPromise.try(() => {
                component();
            }).catch(expect('catch'));
        });
    });

    it('should run validate function on component, and not call onError when error is thrown', () => {
        return wrapPromise(({ expect, avoid, expectError }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:      'test-error-validate-onerror',
                    url:      '/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    validate: expectError('validate', () => {
                        throw new Error(`Invalid component`);
                    })
                });
            };

            const component = window.__component__();

            return ZalgoPromise.try(() => {
                component({
                    onError: avoid('onError')
                });
            }).catch(expect('catch'));
        });
    });

    it('should call onError when a popup is opened without a click event', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-popup-no-onclick',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            const instance = component({
                onClose:   avoid('onClose'),
                onError:   expect('onError'),
                onDestroy: expect('onDestroy')
            });
            
            return instance.render('body', zoid.CONTEXT.POPUP).catch(expect('catch'));
        }, { timeout: 5000 });
    });

    it('should call onclose when a popup is closed by someone other than zoid', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-onclose-popup-closed',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            let openedWindow;

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                openedWindow = win;
            }));

            const component = window.__component__();
            const instance = component({
                onClose:   expect('onClose'),
                onError:   avoid('onError'),
                onDestroy: expect('onDestroy')
            });
            
            return runOnClick(() => {
                return instance.render('body', zoid.CONTEXT.POPUP);
            }).then(() => {
                if (!openedWindow) {
                    throw new Error(`Expected window to have been opened`);
                }
                openedWindow.close();
            });
        }, { timeout: 5000 });
    });

    it('should call onclose when a popup is closed by someone other than zoid during render', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-onclose-popup-closed-during-render',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win: openedWindow }) => {
                setTimeout(() => openedWindow.close(), 1);
            }));

            const component = window.__component__();
            const instance = component({
                onClose:   expect('onClose'),
                onError:   avoid('onError'),
                onDestroy: expect('onDestroy')
            });
            
            return runOnClick(() => {
                return instance.render('body', zoid.CONTEXT.POPUP);
            }).catch(expect('catch'));
        }, { timeout: 5000 });
    });

    it('should call onclose when an iframe is closed by someone other than zoid', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-onclose-iframe-closed',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win: openedWindow }) => {
                setTimeout(() => {
                    destroyElement(openedWindow.frameElement);
                }, 200);
            }));
            
            const component = window.__component__();
            const instance = component({
                onClose:   expect('onClose'),
                onError:   avoid('onError'),
                onDestroy: expect('onDestroy')
            });
            
            return runOnClick(() => {
                return instance.render('body');
            }).catch(noop);
        }, { timeout: 5000 });
    });

    it('should call onclose when an iframe is closed by someone other than zoid during render', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-onclose-iframe-closed-during-render',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win: openedWindow }) => {
                setTimeout(() => {
                    destroyElement(openedWindow.frameElement);
                }, 1);
            }));

            const component = window.__component__();
            return component({
                onClose:   expect('onClose'),
                onError:   avoid('onError'),
                onDestroy: expect('onDestroy')
            }).render('body', zoid.CONTEXT.IFRAME).catch(expect('catch'));
        }, { timeout: 5000 });
    });

    it('should error out when a prerender template is created with the incorrect document', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-prerender-incorrect-document',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
    
                    prerenderTemplate: () => {
                        const body = document.createElement('body');
                        const html = document.createElement('html');
                        html.appendChild(body);
                        return html;
                    }
                });
            };

            const component = window.__component__();
            return component({
                onDestroy: expect('onDestroy')
            }).render(getBody()).catch(expect('catch'));
        });
    });

    it('should call onclose when an iframe is closed immediately after changing location', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-onclose-iframe-redirected-during-render',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            let openedWindow;

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                openedWindow = win;
            }));

            const component = window.__component__();
            return component({
                run: () => {
                    return `
                        window.xprops.onLoad();
                    `;
                },
                onLoad: expect('onLoad', () => {
                    openedWindow.location.reload();
                    destroyElement(openedWindow.frameElement);
                }),
                onClose:   expect('onClose'),
                onError:   avoid('onError'),
                onDestroy: expect('onDestroy')
            }).render('body', zoid.CONTEXT.IFRAME);
        }, { timeout: 9000 });
    });

    it('should call onclose when an iframe is closed after changing location after a small delay', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-onclose-iframe-immediately-redirected-during-render',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            let openedWindow;

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                openedWindow = win;
            }));

            const component = window.__component__();
            return component({
                run: () => {
                    return `
                        window.xprops.onLoad();
                    `;
                },
                onLoad: expect('onLoad', () => {
                    openedWindow.location.reload();
                    setTimeout(() => {
                        destroyElement(openedWindow.frameElement);
                    }, 50);
                }),
                onClose:   expect('onClose'),
                onError:   avoid('onError'),
                onDestroy: expect('onDestroy')
            }).render('body', zoid.CONTEXT.IFRAME);
        }, { timeout: 5000 });
    });

    it('should call onclose when an popup is closed immediately after changing location', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-onclose-popup-redirected-during-render',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            let openedWindow;

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                openedWindow = win;
            }));

            const component = window.__component__();
            const instance = component({
                run: () => {
                    return `
                        window.xprops.onLoad();
                    `;
                },
                onLoad: expect('onLoad', () => {
                    openedWindow.location.reload();
                    openedWindow.close();
                }),
                onClose:   expect('onClose'),
                onError:   avoid('onError'),
                onDestroy: expect('onDestroy')
            });

            return runOnClick(() => {
                return instance.render('body', zoid.CONTEXT.POPUP);
            });
        }, { timeout: 9000 });
    });

    it('should call onclose when an popup is closed after changing location after a small delay', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-onclose-popup-immediately-redirected-during-render',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            let openedWindow;

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                openedWindow = win;
            }));

            const component = window.__component__();
            const instance = component({
                run: () => {
                    return `
                        window.xprops.onLoad();
                    `;
                },
                onLoad: expect('onLoad', () => {
                    openedWindow.location.reload();
                    setTimeout(() => {
                        openedWindow.close();
                    }, 50);
                }),
                onClose:   expect('onClose'),
                onError:   avoid('onError'),
                onDestroy: expect('onDestroy')
            });

            return runOnClick(() => {
                return instance.render('body', zoid.CONTEXT.POPUP);
            });
        }, { timeout: 5000 });
    });


    it('should error out when a component is created with a duplicate tag', () => {
        return wrapPromise(({ expect }) => {
            zoid.create({
                tag:    'test-error-duplicate-tag',
                url:    'mock://www.child.com/base/test/windows/child/index.htm',
                domain: 'mock://www.child.com'
            });

            return ZalgoPromise.try(() => {
                zoid.create({
                    tag:    'test-error-duplicate-tag',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            }).catch(expect('catch'));
        });
    });

    it('should error out when an unknown driver is requested', () => {
        return wrapPromise(({ expect }) => {
            const component = zoid.create({
                tag:    'test-error-unknown-driver',
                url:    'mock://www.child.com/base/test/windows/child/index.htm',
                domain: 'mock://www.child.com'
            });

            return ZalgoPromise.try(() => {
                component.driver('meep', {});
            }).catch(expect('catch'));
        });
    });

    it('should error out where the domain is an invalid regex', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-domain-invalid-regex',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: /^mock:\/\/www\.meep\.com$/
                });
            };

            const component = window.__component__();
            return component({
                onDestroy: expect('onDestroy')
            }).render(getBody()).catch(expect('catch'));
        });
    });

    it('should error out where an invalid element is passed', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-invalid-element',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({
                onDestroy: expect('onDestroy')
            }).render({}).catch(expect('catch'));
        });
    });

    it('should error out where an invalid window is passed', () => {
        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-invalid-window',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({
                onDestroy: expect('onDestroy')
            }).renderTo({}, 'body').catch(expect('catch'));
        });
    });

    it('should error out where no element is passed', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-no-element',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({
                onDestroy: expect('onDestroy')
            }).render().catch(expect('catch'));
        });
    });

    it('should error out where an invalid context is passed', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-render-invalid-context',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({
                onDestroy: expect('onDestroy')
            }).render('body', 'meep').catch(expect('catch'));
        });
    });

    it('should error out when trying to register a child when one is already active', () => {
        return wrapPromise(({ expect }) => {

            const component = zoid.create({
                tag:    'test-xprops-present',
                url:    'mock://www.child.com/base/test/windows/child/index.htm',
                domain: 'mock://www.child.com'
            });

            window.__component__ = () => {
                window.xprops = {};
                let error;

                try {
                    zoid.create({
                        tag:    'test-xprops-present',
                        url:    'mock://www.child.com/base/test/windows/child/index.htm',
                        domain: 'mock://www.child.com'
                    });
                } catch (err) {
                    error = err;
                }

                delete window.xprops;
                zoid.create({
                    tag:    'test-xprops-present',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });

                window.xprops.onLoad(error);
            };

            return component({
                onLoad: expect('onLoad', (err) => {
                    if (!err) {
                        throw new Error(`Expected error to be thrown in child`);
                    }
                })
            }).render(getBody());
        });
    });

    it('should not set xprops when window name does not contain zoid', () => {
        window.name = `__transformer__test_create_window_name_no_zoid__abc123__`;

        zoid.create({
            tag:    'test-create-window-name-no-zoid',
            url:    'mock://www.child.com/base/test/windows/child/index.htm',
            domain: 'mock://www.child.com'
        });

        if (window.xprops) {
            throw new Error(`Expected xprops to not be set`);
        }
    });

    it('should not set xprops when window name does contain component name', () => {
        window.name = `__zoid__`;

        zoid.create({
            tag:    'test-create-window-name-no-component-name-passed',
            url:    'mock://www.child.com/base/test/windows/child/index.htm',
            domain: 'mock://www.child.com'
        });

        if (window.xprops) {
            throw new Error(`Expected xprops to not be set`);
        }
    });

    it('should not set xprops when window name does not match component name', () => {
        window.name = `__zoid__some_other_component__abc123__`;

        zoid.create({
            tag:    'test-create-window-name-non-matching-component',
            url:    'mock://www.child.com/base/test/windows/child/index.htm',
            domain: 'mock://www.child.com'
        });

        if (window.xprops) {
            throw new Error(`Expected xprops to not be set`);
        }
    });

    it('should not set xprops when payload is not sent', () => {
        window.name = `__zoid__test_create_window_name_no_payload__`;

        zoid.create({
            tag:    'test-create-window-name-no-payload',
            url:    'mock://www.child.com/base/test/windows/child/index.htm',
            domain: 'mock://www.child.com'
        });

        if (window.xprops) {
            throw new Error(`Expected xprops to not be set`);
        }
    });

    it('should not set xprops when payload is not correctly formatted', () => {
        window.name = `__zoid__test_create_window_name_bad_payload__abc123__`;

        zoid.create({
            tag:    'test-create-window-name-bad-payload',
            url:    'mock://www.child.com/base/test/windows/child/index.htm',
            domain: 'mock://www.child.com'
        });

        if (window.xprops) {
            throw new Error(`Expected xprops to not be set`);
        }
    });

    it('should not call onError when the window navigates away', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:    'test-error-unload',
                    url:    'mock://www.child.com/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });
            };

            const component = window.__component__();
            return component({
                onError:   avoid('onError'),
                onDestroy: expect('onDestroy')
            }).render(getBody(), zoid.CONTEXT.IFRAME).then(() => {
                window.dispatchEvent(new Event('unload'));
            });
        });
    });

    it('should call onDestroy even if component is not eligible', () => {
        return wrapPromise(({ expect, avoid }) => {
            window.__component__ = () => {
                return zoid.create({
                    tag:      'test-error-ondestroy-ineligible',
                    url:      'mock://www.child.com/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    eligible: () => ({ eligible: false })
                });
            };

            const component = window.__component__();
            return component({
                onError:   avoid('onError'),
                onDestroy: expect('onDestroy')
            }).render(getBody(), zoid.CONTEXT.IFRAME).catch(expect('error'));
        });
    });
});
