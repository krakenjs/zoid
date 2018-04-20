/* @flow */

import { assert } from 'chai';

import { testComponent_parentDomains_string,
    testComponent_parentDomains_array_of_strings,
    testComponent_parentDomains_array_of_regex,
    testComponent_parentDomains_string_match,
    testComponent_parentDomains_array_of_regex_match,
    testComponent_parentDomains_array_of_strings_match,
    testComponent_parentDomains_array_of_strings_match_wildcard,
    testComponent_parentDomains_string_match_wildcard
} from '../component';
import { RenderError } from '../../src/error';

describe('parent domain check', () => {

    describe('should not throw error when: ', () => {

        it('allowedParentDomains is a wildcard', done => {
            testComponent_parentDomains_string_match_wildcard.renderIframe({
                onEnter: () => {
                    done();
                }
            }, document.body);
        });

        it('allowedParentDomains is specified as string and parent domian match', done => {
            testComponent_parentDomains_string_match.renderIframe({
                onEnter: () => {
                    done();
                }
            }, document.body);
        });

        it('allowedParentDomains is specified as array of strings and parent domian match', done => {
            testComponent_parentDomains_array_of_strings_match.renderIframe({
                onEnter: () => {
                    done();
                }
            }, document.body);
        });

        it('allowedParentDomains is specified as array of strings with a wildcard', done => {
            testComponent_parentDomains_array_of_strings_match_wildcard.renderIframe({
                onEnter: () => {
                    done();
                }
            }, document.body);
        });

        it('allowedParentDomains is specified as array of regex and parent domian match', done => {
            testComponent_parentDomains_array_of_regex_match.renderIframe({
                onEnter: () => {
                    done();
                }
            }, document.body);
        });

    });

    describe('should throw error when: ', () => {
        it('allowedParentDomains is specified as string and parent domain does not match', done => {
            testComponent_parentDomains_string.renderIframe({}, document.body)
                .catch(err => {
                    assert.isTrue(err instanceof RenderError);
                    // $FlowFixMe
                    assert.isTrue(err && err.toString().indexOf('Can not be rendered by domain:') > -1);
                    done();
                });
        });

        it('allowedParentDomains is specified as array of strings and parent domain does not match', done => {
            testComponent_parentDomains_array_of_strings.renderIframe({}, document.body)
                .catch(err => {
                    assert.isTrue(err instanceof RenderError);
                    // $FlowFixMe
                    assert.isTrue(err && err.toString().indexOf('Can not be rendered by domain:') > -1);
                    done();
                });
        });

        it('allowedParentDomains is specified as array of regex expressions and parent domain does not match', done => {
            testComponent_parentDomains_array_of_regex.renderIframe({}, document.body)
                .catch(err => {
                    assert.isTrue(err instanceof RenderError);
                    // $FlowFixMe
                    assert.isTrue(err && err.toString().indexOf('Can not be rendered by domain:') > -1);
                    done();
                });
        });
    });

});
