/* @flow */

import { wrapPromise } from "@krakenjs/belter/src";

import { zoid } from "../zoid";
import { runOnClick, getBody } from "../common";

describe("zoid bridge cases", () => {
  it("should render a component with popup context with ie user-agent", () => {
    return wrapPromise(
      ({ expect }) => {
        window.__component__ = () => {
          return zoid.create({
            tag: "test-render-popup-post-bridge",
            url: "mock://www.child.com/base/test/windows/child/index.htm",
            bridgeUrl:
              "mock://www.child.com/base/test/windows/bridge/index.htm",
          });
        };

        window.navigator.mockUserAgent =
          "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko";

        const component = window.__component__();
        const instance = component({
          functionProp: expect("functionProp"),

          run: expect("run", () => {
            return `
                        window.xprops.functionProp();
                    `;
          }),
        });

        return runOnClick(() => {
          return instance.render(getBody(), zoid.CONTEXT.POPUP);
        });
      },
      { timeout: 5000 }
    );
  });

  it("should render a component with popup context with ie user-agent, and error when no bridge url set", () => {
    return wrapPromise(({ expect }) => {
      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-popup-post-bridge-no-url",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
        });
      };

      window.navigator.mockUserAgent =
        "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko";

      const component = window.__component__();
      const instance = component();

      return runOnClick(() => {
        return instance.render(getBody(), zoid.CONTEXT.POPUP);
      }).catch(expect("catch"));
    });
  });
});
