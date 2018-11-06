/* @flow */
/* @jsx jsxDom */

import zoid from '../src';

window.zoid = zoid;

function containerTemplate({ id, CLASS, CONTEXT, tag, context, actions, outlet, jsxDom }) {

    function close(event) {
        event.preventDefault();
        event.stopPropagation();
        return actions.close('foo');
    }

    function focus(event) {
        event.preventDefault();
        event.stopPropagation();
        return actions.focus();
    }

    return (
        <div id={ id } onClick={ focus } class={ `${ CLASS.ZOID } ${ CLASS.ZOID }-tag-${ tag } ${ CLASS.ZOID }-context-${ context } ${ CLASS.ZOID }-focus` }>

            <a href="#" onClick={ close } class={ `${ CLASS.ZOID }-close` }></a>

            { outlet }

            <style>
                {`
                    #${ id } {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.8);
                    }

                    #${ id }.${ CLASS.ZOID }-context-${ CONTEXT.POPUP } {
                        cursor: pointer;
                    }

                    #${ id }.${ CLASS.ZOID }-context-${ CONTEXT.IFRAME } .${CLASS.OUTLET} {
                        box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.4);
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate3d(-50%, -50%, 0);
                        -webkit-transform: translate3d(-50%, -50%, 0);
                        -moz-transform: translate3d(-50%, -50%, 0);
                        -o-transform: translate3d(-50%, -50%, 0);
                        -ms-transform: translate3d(-50%, -50%, 0);
                    }

                    #${ id }.${ CLASS.ZOID }-context-${ CONTEXT.IFRAME } iframe {
                        height: 100%;
                        width: 100%;
                    }

                    #${ id } .${ CLASS.ZOID }-close {
                        position: absolute;
                        right: 16px;
                        top: 16px;
                        width: 16px;
                        height: 16px;
                        opacity: 0.6;
                    }

                    #${ id } .${ CLASS.ZOID }-close:hover {
                        opacity: 1;
                    }

                    #${ id } .${ CLASS.ZOID }-close:before,
                    #${ id } .${ CLASS.ZOID }-close:after {
                        position: absolute;
                        left: 8px;
                        content: ' ';
                        height: 16px;
                        width: 2px;
                        background-color: white;
                    }

                    #${ id } .${ CLASS.ZOID }-close:before {
                        transform: rotate(45deg);
                    }

                    #${ id } .${ CLASS.ZOID }-close:after {
                        transform: rotate(-45deg);
                    }
                `}
            </style>
        </div>
    );
}

export let testComponent = zoid.create({

    tag: 'test-component',

    singleton: true,

    url: {
        dev: '/base/test/child.htm?devenv=true',
        custom: '/base/test/child.htm?customenv=true'
    },

    defaultEnv: 'dev',

    contexts: {
        iframe: true,
        popup: true
    },

    containerTemplate: containerTemplate,

    validate(component, { invalidate }) {
        if (invalidate === true) {
            throw new Error('Invalidated prop is defined as true');
        }
    },

    props: {
        childEntered: {
            type: 'function',
            required: false
        },

        sendUrl: {
            type: 'function',
            required: false
        },

        foo: {
            type: 'function',
            required: false
        },

        complete: {
            type: 'function',
            required: false
        },

        memoizedFunction: {
            type: 'function',
            required: false,
            memoize: true
        },

        onceFunction: {
            type: 'function',
            required: false,
            once: true
        },

        denodeifyFunction: {
            type: 'function',
            required: false,
            denodeify: true
        },

        booleanProp: {
            type: 'boolean',
            required: false
        },

        functionProp: {
            type: 'function',
            required: false
        },

        objectProp: {
            type: 'object',
            required: false
        },

        stringProp: {
            type: 'string',
            required: false
        },

        numberProp: {
            type: 'number',
            required: false
        },

        run: {
            type: 'string',
            required: false
        },

        invalidate: {
            type:     'boolean',
            required: false
        },

        validateProp: {
            type:     'string',
            required: false,

            validate(validate) {
                if (validate && validate !== 'validate') {
                    throw new Error('String does not equal "validate"');
                }
            }
        }
    }
});

export let testComponent2 = zoid.create({

    tag: 'test-component2',

    containerTemplate: containerTemplate,

    url: {
        dev: '/base/test/child.htm?devenv=true'
    },

    defaultEnv: 'dev',

    contexts: {
        iframe: true,
        popup: true
    },

    props: {
        foo: {
            type: 'function',
            required: false
        },

        sendUrl: {
            type: 'function',
            required: false
        },

        run: {
            type: 'string',
            required: false
        }
    }
});

export let testComponent3 = zoid.create({

    tag: 'test-component3',

    containerTemplate: containerTemplate,

    url: {
        dev: '/base/test/child.htm?devenv=true'
    },

    defaultEnv: 'dev',

    props: {
        foo: {
            type: 'function',
            required: false
        },

        sendUrl: {
            type: 'function',
            required: false
        }
    },

    contexts: {
        popup: true,
        iframe: false
    }
});

export let testComponent4 = zoid.create({

    tag: 'test-component4',

    containerTemplate: containerTemplate,

    url: {
        dev: '/base/test/child.htm?devenv=true'
    },

    defaultEnv: 'dev',
});


export let testComponent5 = zoid.create({

    tag: 'test-component5',

    containerTemplate: containerTemplate,

    url: {
        dev: '/base/test/child.htm?devenv=true'
    },

    defaultEnv: 'dev',

    props: {
        foo: {
            type: 'function',
            required: true
        }
    },

    contexts: {
        popup: false,
        iframe: true
    }
});


export let testComponent_no_logLevel_configured = zoid.create({

    tag: 'test-component-no-log-level',

    url: {
        dev: '/base/test/child.htm?devenv=true',
        custom: '/base/test/child.htm?customenv=true'
    },

    defaultEnv: 'dev'
});

export let testComponent_logLevel_configured = zoid.create({

    tag: 'test-component-log-level',

    defaultLogLevel: 'error',

    url: {
        dev: '/base/test/child.htm?devenv=true',
        custom: '/base/test/child.htm?customenv=true'
    },

    defaultEnv: 'dev'
});


export let testComponent_parentDomains_string = zoid.create({
    tag: 'test-component-parent-domains-string',

    allowedParentDomains: 'http://www.somedomain.com',

    url: '/base/test/child.htm?devenv=true',
});

export let testComponent_parentDomains_array_of_strings = zoid.create({
    tag: 'test-component-parent-domain-array-of-strings',

    allowedParentDomains: ['http://www.somedomain.com', 'http://www.otherdomain.com'],

    url: '/base/test/child.htm?devenv=true',
});


export let testComponent_parentDomains_array_of_regex = zoid.create({
    tag: 'test-component-parent-domains-array-of-regex',

    // $FlowFixMe
    allowedParentDomains: [/^http\:\/\/www.somedomain.com$/, /^http\:\/\/www.otherdomain.com$/],

    url: '/base/test/child.htm?devenv=true',
});

export let testComponent_parentDomains_string_match = zoid.create({
    tag: 'test-component-parent-domains-string-match',

    allowedParentDomains: 'http://localhost:9876',

    url: '/base/test/child.htm?devenv=true',
});

export let testComponent_parentDomains_array_of_strings_match = zoid.create({
    tag: 'test-component-parent-domains-array-of-strings-match',

    allowedParentDomains: ['http://www.somedomain.com', 'http://localhost:9876'],

    url: '/base/test/child.htm?devenv=true',
});

export let testComponent_parentDomains_array_of_strings_match_wildcard = zoid.create({
    tag: 'test-component-parent-domains-array-of-strings-match-wildcard',

    allowedParentDomains: ['http://www.somedomain.com', '*'],

    url: '/base/test/child.htm?devenv=true',
});


export let testComponent_parentDomains_string_match_wildcard = zoid.create({
    tag: 'test-component-parent-domains-string-match-wildcard',

    allowedParentDomains: '*',

    url: '/base/test/child.htm?devenv=true',
});


export let testComponent_parentDomains_array_of_regex_match = zoid.create({
    tag: 'test-component-parent-domains-array-of-regex-match',

    // $FlowFixMe
    allowedParentDomains: [/^http\:\/\/www.somedomain.com$/, /^http\:\/\/localhost\:9876$/],

    url: '/base/test/child.htm?devenv=true',
});
