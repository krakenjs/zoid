
import xcomponent from 'src/index';

xcomponent.postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

window.xcomponent = xcomponent;

export let testComponent = xcomponent.create({

    tag: 'test-component',
    url: '/base/test/child.htm',

    singleton: true,

    envUrls: {
        dev: '/base/test/child.htm?devenv=true'
    },

    dimensions: {
        width: 500,
        height: 500
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
        }
    }
});

export let testComponent2 = xcomponent.create({

    tag: 'test-component2',
    url: '/base/test/child.htm',

    remoteRenderDomain: '*',

    envUrls: {
        dev: '/base/test/child.htm?devenv=true'
    },

    dimensions: {
        width: 500,
        height: 500
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

export let testComponent3 = xcomponent.create({

    tag: 'test-component3',
    url: '/base/test/child.htm',

    envUrls: {
        dev: '/base/test/child.htm?devenv=true'
    },

    dimensions: {
        width: 500,
        height: 500
    },

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
        popup: false,
        iframe: false,
        lightbox: true
    }
});

export let testComponent4 = xcomponent.create({

    tag: 'test-component4',
    url: '/base/test/child.htm',

    envUrls: {
        dev: '/base/test/child.htm?devenv=true'
    }
});


export let testComponent5 = xcomponent.create({

    tag: 'test-component5',
    url: '/base/test/child.htm',

    envUrls: {
        dev: '/base/test/child.htm?devenv=true'
    },

    dimensions: {
        width: 500,
        height: 500
    },

    props: {
        foo: {
            type: 'function',
            required: true
        }
    },

    contexts: {
        popup: false,
        iframe: false,
        lightbox: true
    }
});
