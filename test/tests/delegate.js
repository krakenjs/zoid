/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { zoid } from "../zoid";

describe("zoid delegate domain matcher", () => {
  function expectError(description, method): ZalgoPromise<void> {
    let error;

    return ZalgoPromise.try(method)
      .catch((err) => {
        error = err;
      })
      .then(() => {
        if (!(error instanceof Error)) {
          throw new TypeError(`Expected Error for use case: ${description}`);
        }
      });
  }

  // ── Config-time validation ──────────────────────────────────────────────────

  it("should throw when domain is explicitly set to WILDCARD", () => {
    return expectError("Wildcard domain guard", () => {
      zoid.create({
        tag: "test-delegate-domain-wildcard",
        url: "mock://www.child.com/base/test/windows/child/index.htm",
        domain: "*",
      });
    });
  });

  it("should not throw when url is a function that resolves without instance props", () => {
    return ZalgoPromise.try(() => {
      zoid.create({
        tag: "test-delegate-function-url-no-props",
        url: () => "mock://www.child.com/base/test/windows/child/index.htm",
      });
    });
  });

  it("should throw when url is a function that requires live props and no domain is set", () => {
    return expectError("Function url requiring props without domain", () => {
      zoid.create({
        tag: "test-delegate-function-url-requires-props",
        url: ({ props }) => {
          if (!props.clientID) {
            throw new Error(`clientID required`);
          }
          return `mock://www.child.com/base/test/windows/child/index.htm?client=${props.clientID}`;
        },
      });
    });
  });

  // ── Runtime listener filtering — verifies the domain option is enforced ─────
  //
  // In __TEST__ mode, post-robot overrides event.origin with getDomain(source),
  // which reads window.mockDomain when set. This lets us simulate messages
  // from different sender origins by temporarily setting window.mockDomain.

  it("should reject an ALLOW_DELEGATE message from a mismatched origin", () => {
    const component = zoid.create({
      tag: "test-delegate-origin-reject",
      url: "mock://www.child.com/base/test/windows/child/index.htm",
      domain: "mock://www.child.com",
    });

    // window.mockDomain is not set — actual karma origin (e.g. http://localhost)
    // does not match "mock://www.child.com", so the listener must not fire.
    return component.canRenderTo(window).then((result) => {
      if (result !== false) {
        throw new Error(
          `Expected canRenderTo to return false for mismatched origin, got: ${String(
            result
          )}`
        );
      }
    });
  });

  it("should accept an ALLOW_DELEGATE message from a matching origin", () => {
    const component = zoid.create({
      tag: "test-delegate-origin-accept",
      url: "mock://www.child.com/base/test/windows/child/index.htm",
      domain: "mock://www.child.com",
    });

    // Temporarily simulate the window being at "mock://www.child.com" so the
    // listener recognizes the sender origin and responds.
    window.mockDomain = "mock://www.child.com";

    return component
      .canRenderTo(window)
      .then((result) => {
        window.mockDomain = undefined;
        if (result !== true) {
          throw new Error(
            `Expected canRenderTo to return true for matching origin, got: ${String(
              result
            )}`
          );
        }
      })
      .catch((err) => {
        window.mockDomain = undefined;
        throw err;
      });
  });

  // ── Smaller gaps ────────────────────────────────────────────────────────────

  it("should derive the domain matcher from a string url when domain is not set", () => {
    const component = zoid.create({
      tag: "test-delegate-string-url-no-domain",
      url: "mock://www.child.com/base/test/windows/child/index.htm",
    });

    // Verify the correct domain was derived: a message from "mock://www.child.com"
    // should be accepted, proving getDomainFromUrl produced the right value.
    window.mockDomain = "mock://www.child.com";

    return component
      .canRenderTo(window)
      .then((result) => {
        window.mockDomain = undefined;
        if (result !== true) {
          throw new Error(
            `Expected canRenderTo to return true — string url domain not derived correctly, got: ${String(
              result
            )}`
          );
        }
      })
      .catch((err) => {
        window.mockDomain = undefined;
        throw err;
      });
  });
});
