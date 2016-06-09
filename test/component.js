
import xcomponent from 'src/index';

export var testComponent = xcomponent.create({

    tag: 'test-component',
    url: '/base/test/child.htm',

    dimensions: {
        width: 500,
        height: 500
    },

    props: {
        foo: {
            type: 'function',
            required: false
        }
    }
});

export var testComponent2 = xcomponent.create({

    tag: 'test-component2',
    url: '/base/test/child.htm',

    dimensions: {
        width: 500,
        height: 500
    },

    props: {
        foo: {
            type: 'function',
            required: false
        }
    }
});