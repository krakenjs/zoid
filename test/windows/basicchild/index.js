/* @flow */
/* eslint no-eval: off, security/detect-eval-with-expression: off */

import { setup, send, on, once } from '@krakenjs/post-robot/src';

setup();

on('sendMessageToParent', ({ data }) => {
    return send(window.opener || window.parent, data.messageName, data.data)
        .then((event) => event.data);
});

on('setupListener', ({ data }) => {
    once(data.messageName, () => {
        return data.handler ? data.handler() : data.data;
    });
});

send(window.opener || window.parent, 'initBasicChild', { win: window });
