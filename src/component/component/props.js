
/*  Internal Props
    --------------

    We define and use certain props by default, for configuration and events that are used at the framework level.
    These follow the same format as regular props, and are classed as reserved words that may not be overriden by users.
*/

export const internalProps = {

    // A custom url to use to render the component

    url: {
        type: 'string',
        required: false,
        queryParam: false
    },

    // The desired env in which the component is being rendered. Used to determine the correct url to use from envUrls

    env: {
        type: 'string',
        required: false
    },

    // A millisecond timeout before onTimeout is called

    timeout: {
        type: 'number',
        required: false,
        queryParam: false,
        autoClose: true
    },

    // When we get an INIT message from the child

    onEnter: {
        type: 'function',
        required: false,
        noop: true
    },

    // When the user closes the component. Defaults to onError if no handler passed.

    onClose: {
        type: 'function',
        required: false,
        noop: true,
        once: true
    },

    // When we time-out before getting an INIT message from the child. Defaults to onError if no handler passed.

    onTimeout: {
        type: 'function',
        required: false,
        once: true,
        autoClose: true,
        def(err) {
            return this.props.onError(err);
        }
    },

    // When the component experiences an error

    onError: {
        type: 'function',
        required: false,
        autoClose: true,
        def(err) {
            console.error(err.message, '\n', err.stack || err.toString());
        },
        once: true
    }
};