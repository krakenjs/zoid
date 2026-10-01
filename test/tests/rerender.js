/* @flow */
/** @jsx node */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { wrapPromise } from "@krakenjs/belter/src";

import { getBody } from "../common";
import { zoid } from "../zoid";

describe("zoid rerender cases", () => {
  it("should re-render a component when the container is removed and immediately re-added to the dom", () => {
    return wrapPromise(({ expect, avoid }) => {
      window.__component__ = () => {
        return zoid.create({
          tag: "test-rerender",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          exports: ({ getExports }) => {
            return {
              exec: (...args) => {
                return getExports().then((exports) => {
                  return exports.exec(...args);
                });
              },
            };
          },
        });
      };

      const container = document.createElement("div");
      getBody().appendChild(container);

      const component = window.__component__();
      const instance = component({
        onRendered: expect("onRendered"),
        onClose: avoid("onClose"),
        onDestroy: avoid("onDestroy"),
        onError: avoid("onError"),
        foo: expect("foo"),
        run: () => `
                    window.xprops.export({
                        exec: (code) => eval(code)
                    });
                `,
      });

      return instance
        .render(container)
        .then(() => {
          return ZalgoPromise.delay(50);
        })
        .then(() => {
          getBody().removeChild(container);
          getBody().appendChild(container);
        })
        .then(() => {
          return ZalgoPromise.delay(50);
        })
        .then(() => {
          instance.exec(`
                    window.xprops.foo();
                `);
        });
    });
  });

  it("should let a fresh instance that never called render() find and re-render into the last rendered container", () => {
    return wrapPromise(
      ({ expect, avoid }) => {
        const tag = "test-rerender-fallback-fresh-instance";
        window.__component__ = () => {
          return zoid.create({
            tag: "test-rerender-fallback-fresh-instance",
            url: "mock://www.child.com/base/test/windows/child/index.htm",
            domain: "mock://www.child.com",
            enableRerenderFallback: true,
            exports: ({ getExports }) => {
              return {
                exec: (...args) => {
                  return getExports().then((exports) => {
                    return exports.exec(...args);
                  });
                },
              };
            },
          });
        };

        const container = document.createElement("div");
        container.id = "fallback-fresh-instance-container";
        getBody().appendChild(container);

        const component = window.__component__();
        const instance = component({
          onRendered: expect("onRendered"),
          onClose: avoid("onClose"),
          onDestroy: avoid("onDestroy"),
          onError: avoid("onError"),
          run: () => `
                    window.xprops.export({
                        exec: (code) => eval(code)
                    });
                `,
        });

        return instance
          .render(container)
          .then(() => {
            return ZalgoPromise.delay(50);
          })
          .then(() => {
            const stored = window.sessionStorage.getItem(
              `__zoid_latest_render__${tag}`
            );

            if (
              !stored ||
              stored.indexOf("fallback-fresh-instance-container") === -1
            ) {
              throw new Error(
                "Expected the rendered container to be persisted to sessionStorage"
              );
            }

            const secondInstance = component({
              onClose: avoid("onClose2"),
              onDestroy: avoid("onDestroy2"),
              onError: avoid("onError2"),
              foo: expect("foo"),
              run: () => `
                            window.xprops.export({
                                exec: (code) => eval(code)
                            });
                        `,
            });

            return secondInstance
              .rerender()
              .then(() => {
                return ZalgoPromise.delay(50);
              })
              .then(() => {
                return secondInstance.exec(`
                            window.xprops.foo();
                        `);
              });
          });
      },
      { timeout: 15000 }
    );
  });

  it("should not cross-wire the fallback rerender between two instances of the same tag rendered into different containers", () => {
    return wrapPromise(
      ({ expect, avoid }) => {
        window.__component__ = () => {
          return zoid.create({
            tag: "test-rerender-fallback-multi-instance",
            url: "mock://www.child.com/base/test/windows/child/index.htm",
            domain: "mock://www.child.com",
            enableRerenderFallback: true,
            exports: ({ getExports }) => {
              return {
                exec: (...args) => {
                  return getExports().then((exports) => {
                    return exports.exec(...args);
                  });
                },
              };
            },
          });
        };

        const component = window.__component__();

        const containerA = document.createElement("div");
        containerA.id = "fallback-multi-instance-container-a";
        getBody().appendChild(containerA);

        const containerB = document.createElement("div");
        containerB.id = "fallback-multi-instance-container-b";
        getBody().appendChild(containerB);

        const instanceA = component({
          onRendered: expect("onRenderedA"),
          onClose: avoid("onCloseA"),
          onDestroy: avoid("onDestroyA"),
          onError: avoid("onErrorA"),
          run: () => `
                    window.xprops.export({
                        exec: (code) => eval(code)
                    });
                `,
        });

        const instanceB = component({
          onRendered: expect("onRenderedB"),
          onClose: () => {},
          onDestroy: () => {},
          onError: avoid("onErrorB"),
          run: () => `
                    window.xprops.export({
                        exec: (code) => eval(code)
                    });
                `,
        });

        return instanceA
          .render(containerA)
          .then(() => {
            return instanceB.render(containerB);
          })
          .then(() => {
            return ZalgoPromise.delay(50);
          })
          .then(() => {
            // containerB is removed from the dom -- only containerA remains,
            // so a fallback rerender must resolve to containerA, not
            // whichever container was rendered to most recently (containerB)
            getBody().removeChild(containerB);

            const freshInstance = component({
              onClose: avoid("onCloseFresh"),
              onDestroy: avoid("onDestroyFresh"),
              onError: avoid("onErrorFresh"),
              foo: expect("foo"),
              run: () => `
                            window.xprops.export({
                                exec: (code) => eval(code)
                            });
                        `,
            });

            return freshInstance
              .rerender()
              .then(() => {
                return ZalgoPromise.delay(50);
              })
              .then(() => {
                if (!containerA.querySelector("iframe")) {
                  throw new Error(
                    "Expected the fallback rerender to land in the still-present containerA"
                  );
                }

                return freshInstance.exec(`
                            window.xprops.foo();
                        `);
              });
          });
      },
      { timeout: 15000 }
    );
  });

  it("should re-render a component when the container is removed and immediately re-added to the dom during render", () => {
    return wrapPromise(({ expect, avoid }) => {
      window.__component__ = () => {
        return zoid.create({
          tag: "test-rerender-during-render",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          exports: ({ getExports }) => {
            return {
              exec: (...args) => {
                return getExports().then((exports) => {
                  return exports.exec(...args);
                });
              },
            };
          },
        });
      };

      const container = document.createElement("div");
      getBody().appendChild(container);

      const component = window.__component__();
      const instance = component({
        onRendered: expect("onRendered"),
        onClose: avoid("onClose"),
        onDestroy: avoid("onDestroy"),
        onError: avoid("onError"),
        foo: expect("foo"),
        run: () => `
                    window.xprops.export({
                        exec: (code) => eval(code)
                    });
                `,
      });

      const renderPromise = instance.render(container);
      getBody().removeChild(container);
      getBody().appendChild(container);

      return renderPromise
        .then(() => {
          return ZalgoPromise.delay(50);
        })
        .then(() => {
          instance.exec(`
                    window.xprops.foo();
                `);
        });
    });
  });

  it("should re-render a component with decorated props", () => {
    return wrapPromise(({ expect, avoid }) => {
      window.__component__ = () => {
        return zoid.create({
          tag: "test-rerender-decorated-props",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          exports: ({ getExports }) => {
            return {
              exec: (...args) => {
                return getExports().then((exports) => {
                  return exports.exec(...args);
                });
              },
            };
          },
        });
      };

      const container = document.createElement("div");
      getBody().appendChild(container);

      const component = window.__component__();
      const instance = component({
        onRendered: expect("onRendered"),
        onClose: avoid("onClose"),
        onDestroy: avoid("onDestroy"),
        onError: avoid("onError"),
        getValue: avoid("getValue"),
        run: () => `
                    window.xprops.export({
                        exec: (code) => eval(code)
                    });
                `,
      });

      return instance
        .render(container)
        .then(() => {
          return instance.rerender({
            decorate: (props) => ({
              ...props,
              getValue: expect("getValue", () => "decorated-value"),
            }),
          });
        })
        .then(() => {
          return instance.exec(`
                    window.xprops.getValue().then((value) => {
                        if (value !== "decorated-value") {
                            throw new Error("Expected decorated prop value");
                        }
                    });
                `);
        });
    });
  });

  it("should render a component to the parent as an iframe and re-render when the container is removed and immediately re-added to the dom", () => {
    return wrapPromise(({ expect, avoid }) => {
      window.__component__ = () => {
        return {
          simple: zoid.create({
            tag: "test-rerender-renderto-iframe-simple",
            url: "mock://www.child.com/base/test/windows/child/index.htm",
            domain: "mock://www.child.com",
          }),

          remote: zoid.create({
            tag: "test-rerender-renderto-iframe-remote",
            url: "mock://www.child.com/base/test/windows/child/index.htm",
            domain: "mock://www.child.com",
            exports: ({ getExports }) => {
              return {
                exec: (...args) => {
                  return getExports().then((exports) => {
                    return exports.exec(...args);
                  });
                },
              };
            },
          }),
        };
      };

      const container = document.createElement("div");
      container.id = "remote-element-id";
      getBody().appendChild(container);

      return window
        .__component__()
        .simple({
          onRendered: expect("onRendered"),
          onClose: avoid("onClose"),
          onDestroy: avoid("onDestroy"),
          onError: avoid("onError"),
          foo: expect("foo"),
          delay: ZalgoPromise.delay,
          rerender: () => {
            getBody().removeChild(container);
            getBody().appendChild(container);
          },

          run: () => {
            return `
                        const instance = window.__component__().remote({
                            foo: window.xprops.foo,
                            run: () => \`
                                window.xprops.export({
                                    exec: (code) => eval(code)
                                });
                            \`
                        });
                        
                        instance.renderTo(window.parent, '#remote-element-id').then(() => {
                            return window.xprops.delay(50);
                        }).then(() => {
                            return window.xprops.rerender();
                        }).then(() => {
                            return window.xprops.delay(50);
                        }).then(() => {
                            return instance.exec(\`
                                window.xprops.foo();
                            \`);
                        }).catch(window.xprops.onError);
                    `;
          },
        })
        .render(getBody());
    });
  });

  it("should render a component to the parent as an iframe and re-render when the container is removed and immediately re-added to the dom during render", () => {
    return wrapPromise(({ expect, avoid }) => {
      window.__component__ = () => {
        return {
          simple: zoid.create({
            tag: "test-rerender-during-render-renderto-iframe-simple",
            url: "mock://www.child.com/base/test/windows/child/index.htm",
            domain: "mock://www.child.com",
          }),

          remote: zoid.create({
            tag: "test-rerender-during-render-renderto-iframe-remote",
            url: "mock://www.child.com/base/test/windows/child/index.htm",
            domain: "mock://www.child.com",
            exports: ({ getExports }) => {
              return {
                exec: (...args) => {
                  return getExports().then((exports) => {
                    return exports.exec(...args);
                  });
                },
              };
            },
          }),
        };
      };

      const container = document.createElement("div");
      container.id = "remote-element-id";
      getBody().appendChild(container);

      return window
        .__component__()
        .simple({
          onRendered: expect("onRendered"),
          onClose: avoid("onClose"),
          onDestroy: avoid("onDestroy"),
          onError: avoid("onError"),
          foo: expect("foo"),
          delay: ZalgoPromise.delay,
          rerender: () => {
            getBody().removeChild(container);
            getBody().appendChild(container);
          },

          run: () => {
            return `
                        const instance = window.__component__().remote({
                            foo: window.xprops.foo,
                            run: () => \`
                                window.xprops.export({
                                    exec: (code) => eval(code)
                                });
                            \`
                        });

                        const renderPromise = instance.renderTo(window.parent, '#remote-element-id');

                        return window.xprops.rerender().then(() => {
                            return renderPromise;
                        }).then(() => {
                            return window.xprops.delay(500);
                        }).then(() => {
                            return instance.exec(\`
                                window.xprops.foo();
                            \`);
                        }).catch(window.xprops.onError);
                    `;
          },
        })
        .render(getBody());
    });
  });
});
