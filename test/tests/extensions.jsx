/* @flow */
/** @jsx node */

import { wrapPromise } from "@krakenjs/belter/src";
import { getParent } from "@krakenjs/cross-domain-utils/src";

import { onWindowOpen, getBody } from "../common";
import { zoid } from "../zoid";

describe("zoid getExtensions cases", () => {
  it("should render a component with additional properties to the component", () => {
    return wrapPromise(({ expect }) => {
      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-with-extended-properties",
          url: () => "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          getExtensions: () => {
            return {
              testAttribute: "123",
              testMethod: () => "result_of_test_method",
            };
          },
        });
      };

      onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => {
          if (getParent(win) !== window) {
            throw new Error(`Expected window parent to be current window`);
          }
        })
      );

      const component = window.__component__();
      const instance = component({
        onRendered: expect("onRendered"),
      });

      if (instance.testAttribute !== "123") {
        throw new Error(
          `Expected test attribute to be "123", but got ${instance.testAttribute}`
        );
      }
      if (instance.testMethod() !== "result_of_test_method") {
        throw new Error(
          `Expected test attribute to be "result_of_test_method", but got ${instance.testMethod()}`
        );
      }

      return instance.render(getBody());
    });
  });

  it("should not be able to ovverride default properties of component using getExtensions", () => {
    return wrapPromise(({ expect }) => {
      window.__component__ = () => {
        return zoid.create({
          tag: "test-extended-properties-cannot-override-defaults",
          url: () => "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          getExtensions: () => {
            return {
              render: () => {
                throw new Error("The render method should have been ovveriden");
              },
            };
          },
        });
      };

      onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => {
          if (getParent(win) !== window) {
            throw new Error(`Expected window parent to be current window`);
          }
        })
      );

      const component = window.__component__();
      const instance = component({
        onRendered: expect("onRendered"),
      });

      return instance.render(getBody());
    });
  });

  it("should be able to interact with method supplied to the component during instantiation", () => {
    return wrapPromise(({ expect }) => {
      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-with-extended-method-invokes-callbacks",
          url: () => "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          getExtensions: (parent) => {
            return {
              invokeCalculatePrice: () => {
                return parent.getProps().calculatePrice();
              },
            };
          },
        });
      };

      onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => {
          if (getParent(win) !== window) {
            throw new Error(`Expected window parent to be current window`);
          }
        })
      );

      const component = window.__component__();
      const instance = component({
        onRendered: expect("onRendered"),
        calculatePrice: () => 1034.56,
      });

      if (instance.invokeCalculatePrice() !== 1034.56) {
        throw new Error(
          `Expected test attribute to be "result_of_test_method", but got ${instance.testMethod()}`
        );
      }

      return instance.render(getBody());
    });
  });
});
