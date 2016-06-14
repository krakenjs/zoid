
import xcomponent from 'src/index';

export var testComponent = xcomponent.create({

    tag: 'test-component',
    url: '/base/test/child.htm',

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
    }
});

export var testComponent2 = xcomponent.create({

    tag: 'test-component2',
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
    }
});