
import { testComponent_parentDomain_string, testComponent_parentDomain_array_of_strings, testComponent_parentDomain_array_of_regex, testComponent_parentDomain_array_of_strings_match_wildcard } from '../component';

describe('parent domain check', () => {

    describe('should throw error when: ', () => {
        it('allowedParentDomains is specified as string and parent domain doesn not match', done => {
            testComponent_parentDomain_string.renderIframe().catch(err => {
                assert.isTrue(err instanceof Error);
                assert.isTrue(err.toString().indexOf('Can not be rendered by domain:') > -1);
                done();
            });
        });

        it('allowedParentDomains is specified as array of strings and parent domain doesn not match', done => {
            testComponent_parentDomain_array_of_strings.renderIframe().catch(err => {
                assert.isTrue(err instanceof Error);
                assert.isTrue(err.toString().indexOf('Can not be rendered by domain:') > -1);
                done();
            });
        });

        it('allowedParentDomains is specified as array of regex expressions and parent domain doesn not match', done => {
            testComponent_parentDomain_array_of_regex.renderIframe().catch(err => {
                assert.isTrue(err instanceof Error);
                assert.isTrue(err.toString().indexOf('Can not be rendered by domain:') > -1);
                done();
            });
        });
    });

    describe('should not throw error when: ', () => {
        it('allowedParentDomains is specified as array of strings with a wildcard', done => {
            testComponent_parentDomain_array_of_strings_match_wildcard.renderIframe({
                onEnter: () => {
                    done();
                }
            });
        });
    });
    
});