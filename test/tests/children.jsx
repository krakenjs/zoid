/* @flow */
/** @jsx node */

import { wrapPromise } from 'belter/src';
import { getParent } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { onWindowOpen, getBody } from '../common';
import { zoid } from '../zoid';

describe('zoid children cases', () => {

    it('should render a set of of child components which inherit parent props', () => {
        return wrapPromise(({ expect, avoid }) => {

            window.__component__ = () => {
                const CardNumberField = zoid.create({
                    tag:    'test-multiple-children-card-field-number',
                    url:    () => '/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });

                const CardCVVField = zoid.create({
                    tag:    'test-multiple-children-card-field-cvv',
                    url:    () => '/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });

                const CardExpiryField = zoid.create({
                    tag:    'test-multiple-children-card-field-expiry',
                    url:    () => '/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });

                const CardFields = zoid.create({
                    tag:      'test-multiple-children-card-fields',
                    url:      () => '/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    children: () => {
                        return {
                            NumberField: CardNumberField,
                            CVVField:    CardCVVField,
                            ExpiryField: CardExpiryField
                        };
                    }
                });

                return CardFields;
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const CardFields = window.__component__();
            const cardFields = CardFields({
                style: {
                    color: 'red'
                },
                onRendered: avoid('onRenderedCardFields'),
                callProp:   avoid('callPropCardFields'),
                run:        () => `
                    window.xprops.callProp(window.xprops.style);
                `
            });

            const cardNumberInstance = cardFields.NumberField({
                onRendered: expect('onRenderedNumberField'),
                callProp:   expect('callPropNumberField', (style) => {
                    if (!style || style.color !== 'red') {
                        throw new Error(`Expected number field to inherit style`);
                    }
                }),
                run: () => `
                    window.xprops.callProp(window.xprops.parent.props.style);
                `
            });

            const cardCVVInstance = cardFields.CVVField({
                onRendered: expect('onRenderedCVVField'),
                callProp:   expect('callPropCVVField', (style) => {
                    if (!style || style.color !== 'red') {
                        throw new Error(`Expected cvv field to inherit style`);
                    }
                }),
                run: () => `
                    window.xprops.callProp(window.xprops.parent.props.style);
                `
            });

            const cardExpiryInstance = cardFields.ExpiryField({
                onRendered: expect('onRenderedExpiryField'),
                callProp:   expect('callPropExpiryField', (style) => {
                    if (!style || style.color !== 'red') {
                        throw new Error(`Expected expiry field to inherit style`);
                    }
                }),
                run: () => `
                    window.xprops.callProp(window.xprops.parent.props.style);
                `
            });

            return ZalgoPromise.all([
                cardNumberInstance.render(getBody()),
                cardCVVInstance.render(getBody()),
                cardExpiryInstance.render(getBody())
            ]);
        });
    });

    it('should render a component in isolation with props, with multiple children which are never called', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                const CardFields = zoid.create({
                    tag:      'test-multiple-children-card-fields-isolation',
                    url:      () => '/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    children: () => {
                        return {
                            NumberField: () => {
                                throw new Error(`Should not call NumberField`);
                            },
                            CVVField:    () => {
                                throw new Error(`Should not call CVVField`);
                            },
                            ExpiryField: () => {
                                throw new Error(`Should not call ExpiryField`);
                            }
                        };
                    }
                });

                return CardFields;
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const CardFields = window.__component__();
            const cardFields = CardFields({
                style: {
                    color: 'red'
                },
                onRendered: expect('onRenderedCardFields'),
                callProp:   expect('callPropCardFields', (style) => {
                    if (!style || style.color !== 'red') {
                        throw new Error(`Expected expiry field to inherit style`);
                    }
                }),
                run: () => `
                    window.xprops.callProp(window.xprops.style);
                `
            });

            return cardFields.render(getBody());
        });
    });

    it('should render a set of of child components which export to the parent', () => {
        return wrapPromise(({ expect }) => {

            window.__component__ = () => {
                const CardNumberField = zoid.create({
                    tag:    'test-multiple-children-card-field-number-export',
                    url:    () => '/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });

                const CardCVVField = zoid.create({
                    tag:    'test-multiple-children-card-field-cvv-export',
                    url:    () => '/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });

                const CardExpiryField = zoid.create({
                    tag:    'test-multiple-children-card-field-expiry-export',
                    url:    () => '/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com'
                });

                const CardFields = zoid.create({
                    tag:      'test-multiple-children-card-fields-export',
                    url:      () => '/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    children: () => {
                        return {
                            NumberField: CardNumberField,
                            CVVField:    CardCVVField,
                            ExpiryField: CardExpiryField
                        };
                    },
                    exports: ({ getExports }) => {
                        return {
                            submit: (...args) => {
                                return getExports().then(exports => {
                                    return exports.submit(...args);
                                });
                            }
                        };
                    }
                });

                return CardFields;
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const CardFields = window.__component__();
            const cardFields = CardFields();

            let onSubmitCalledTimes = 0;
            const onSubmit = expect('onSubmit', () => {
                onSubmitCalledTimes += 1;
            });

            const cardNumberInstance = cardFields.NumberField({
                onSubmit,
                run: () => `
                    window.xprops.parent.export({
                        submit: () => {
                            window.xprops.onSubmit();
                        }
                    });
                `
            });

            const cardCVVInstance = cardFields.CVVField({
                onSubmit,
                run: () => `
                    window.xprops.parent.export({
                        submit: () => {
                            window.xprops.onSubmit();
                        }
                    });
                `
            });

            const cardExpiryInstance = cardFields.ExpiryField({
                onSubmit,
                run: () => `
                    window.xprops.parent.export({
                        submit: () => {
                            window.xprops.onSubmit();
                        }
                    });
                `
            });

            return ZalgoPromise.all([
                cardNumberInstance.render(getBody()),
                cardCVVInstance.render(getBody()),
                cardExpiryInstance.render(getBody())
            ]).then(() => {
                return cardFields.submit()
                    .timeout(500, new Error(`cardFields.submit() timed out`));
            }).then(() => {
                if (onSubmitCalledTimes !== 1) {
                    throw new Error(`Expected onSubmit to be called a single time`);
                }
            });
        });
    });

    it('should render a child component which directly inherits a prop from the parent', () => {
        return wrapPromise(({ expect }) => {
            window.__component__ = () => {
                const Button = zoid.create({
                    tag:    'test-multiple-children-card-button-inherit-prop',
                    url:    () => '/base/test/windows/child/index.htm',
                    domain: 'mock://www.child.com',
                    props:  {
                        fundingSource: {
                            type:     'string',
                            required: false,
                            default:  ({ props }) => props.parent.props.fundingSource
                        }
                    }
                });

                const CardFields = zoid.create({
                    tag:      'test-multiple-children-card-fields-inherit-prop',
                    url:      () => '/base/test/windows/child/index.htm',
                    domain:   'mock://www.child.com',
                    props:  {
                        fundingSource: {
                            type:  'string',
                            value: () => 'card'
                        }
                    },
                    children: () => {
                        return {
                            Button
                        };
                    }
                });

                return CardFields;
            };

            onWindowOpen().then(expect('onWindowOpen', ({ win }) => {
                if (getParent(win) !== window) {
                    throw new Error(`Expected window parent to be current window`);
                }
            }));

            const CardFields = window.__component__();
            const cardFields = CardFields({
                onRendered: expect('onRenderedCardFields'),
                callProp:   expect('callPropCardFields', ({ fundingSource }) => {
                    if (fundingSource !== 'card') {
                        throw new Error(`Expected fundingSource to be card, got ${ fundingSource }`);
                    }
                }),
                run: () => `
                    window.xprops.callProp({ fundingSource: window.xprops.fundingSource });
                `
            });

            const cardButtonInstance = cardFields.Button({
                onRendered: expect('onRenderedButton'),
                callProp:   expect('callPropbutton', ({ fundingSource }) => {
                    if (fundingSource !== 'card') {
                        throw new Error(`Expected fundingSource to be card, got ${ fundingSource }`);
                    }
                }),
                run: () => `
                    window.xprops.callProp({ fundingSource: window.xprops.fundingSource });
                `
            });

            return ZalgoPromise.all([
                cardFields.render(getBody()),
                cardButtonInstance.render(getBody())
            ]);
        });
    });
});
