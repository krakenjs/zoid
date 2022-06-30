/* @flow */
/** @jsx node */

import { wrapPromise } from "@krakenjs/belter/src";

import { getBody } from "../common";
import { zoid } from "../zoid";

describe("zoid url method cases", () => {
  it("should send props via get and post to an iframe component", () => {
    return wrapPromise(({ expect }) => {
      window.__component__ = () => {
        return zoid.create({
          tag: "test-post-props",
          url: () => "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",

          props: {
            foo: {
              type: "string",
              queryParam: true,
            },
            bar: {
              type: "string",
              bodyParam: true,
            },
          },
        });
      };

      const component = window.__component__();
      return component({
        foo: "123",
        bar: "456",
        onRendered: expect("onRendered"),
        run: () => `
                    window.xprops.checkUrl(window.location.href);
                `,
        checkUrl: expect("checkUrl", (url) => {
          if (url.indexOf("foo=123") === -1) {
            throw new Error(`Expected to find foo=123 in the url`);
          }

          if (url.indexOf("bar=456") !== -1) {
            throw new Error(`Expected not to find bar=456 in the url`);
          }
        }),
      }).render(getBody());
    });
  });
});
