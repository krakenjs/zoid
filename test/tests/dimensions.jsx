/* @flow */
/** @jsx node */
/* eslint max-lines: off */

import { wrapPromise } from "@krakenjs/belter/src";
import { node, dom } from "@krakenjs/jsx-pragmatic/src";

import { zoid } from "../zoid";
import { onWindowOpen, runOnClick, getBody } from "../common";

describe("zoid dimensions cases", () => {
  it("should render a component to an iframe with specific px dimensions", () => {
    return wrapPromise(({ expect }) => {
      const width = 178;
      const height = 253;

      const expectedWidth = width;
      const expectedHeight = height;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-dimensions",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          dimensions: {
            width: "178px",
            height: "253px",
          },
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onRendered: expect("onRendered"),
      })
        .render(getBody())
        .then(() => {
          return componentWindowPromise;
        })
        .then((componentWindow) => {
          if (componentWindow.innerWidth !== expectedWidth) {
            throw new Error(
              `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
            );
          }

          if (componentWindow.innerHeight !== expectedHeight) {
            throw new Error(
              `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
            );
          }
        });
    });
  });

  it.skip("should render a component to a popup with specific px dimensions", () => {
    return wrapPromise(({ expect }) => {
      const width = 178;
      const height = 253;

      const expectedWidth = width;
      const expectedHeight = height;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-popup-dimensions",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          dimensions: {
            width: "178px",
            height: "253px",
          },
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      const instance = component({
        onRendered: expect("onRendered"),
      });

      return runOnClick(() => {
        return instance.render(getBody(), zoid.CONTEXT.POPUP);
      })
        .then(() => {
          return componentWindowPromise;
        })
        .then((componentWindow) => {
          if (componentWindow.innerWidth !== expectedWidth) {
            throw new Error(
              `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
            );
          }

          if (componentWindow.innerHeight !== expectedHeight) {
            throw new Error(
              `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
            );
          }
        });
    });
  });

  it("should render a component to an iframe and resize with specific px dimensions", () => {
    return wrapPromise(({ expect }) => {
      const width = 293;
      const height = 101;

      const expectedWidth = width;
      const expectedHeight = height;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-resize",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      const instance = component({
        onRendered: expect("onRendered"),
      });
      return instance
        .render(getBody())
        .then(() => {
          return instance.resize({ width, height });
        })
        .then(() => {
          return componentWindowPromise;
        })
        .then((componentWindow) => {
          if (componentWindow.innerWidth !== expectedWidth) {
            throw new Error(
              `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
            );
          }

          if (componentWindow.innerHeight !== expectedHeight) {
            throw new Error(
              `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
            );
          }
        });
    });
  });

  it("should render a component to an popup with specific px dimensions function", () => {
    return wrapPromise(({ expect }) => {
      const width = 1282;
      const height = 720;

      const expectedWidth = width;
      const expectedHeight = height;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-popup-dimensions-func",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          dimensions: ({ props }) => ({
            width: props.dimensions.width,
            height: props.dimensions.height,
          }),
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onRendered: expect("onRendered"),
        dimensions: {
          width: "1282px",
          height: "720px",
        },
      })
        .render(getBody())
        .then(() => {
          return componentWindowPromise;
        })
        .then((componentWindow) => {
          if (componentWindow.innerWidth !== expectedWidth) {
            throw new Error(
              `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
            );
          }

          if (componentWindow.innerHeight !== expectedHeight) {
            throw new Error(
              `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
            );
          }
        });
    });
  });

  it("should render a component to an iframe and resize from the child with specific px dimensions", () => {
    return wrapPromise(({ expect }) => {
      const width = 293;
      const height = 101;

      const expectedWidth = width;
      const expectedHeight = height;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-resize-from-child",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onResized: expect("onResized", () => {
          return componentWindowPromise.then((componentWindow) => {
            if (componentWindow.innerWidth !== expectedWidth) {
              throw new Error(
                `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
              );
            }

            if (componentWindow.innerHeight !== expectedHeight) {
              throw new Error(
                `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
              );
            }
          });
        }),

        run: () => {
          return `
                        window.xprops.resize({ width: ${JSON.stringify(
                          width
                        )}, height: ${JSON.stringify(height)} })
                            .then(() => window.xprops.onResized());
                    `;
        },
      }).render(getBody());
    });
  });

  it("should render a component to an iframe and autoresize from the child", () => {
    return wrapPromise(({ expect }) => {
      const width = 293;
      const height = 101;

      const expectedWidth = width;
      const expectedHeight = height;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-autoresize-from-child",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          autoResize: {
            height: true,
            width: true,
          },
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onResize: expect("onResize"),
        onResized: expect("onResized", () => {
          return componentWindowPromise.then((componentWindow) => {
            if (componentWindow.innerWidth !== expectedWidth) {
              throw new Error(
                `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
              );
            }

            if (componentWindow.innerHeight !== expectedHeight) {
              throw new Error(
                `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
              );
            }
          });
        }),

        run: () => {
          return `
                        document.body.style.height = '${height}px';
                        document.body.style.width = '${width}px';
                        setTimeout(window.xprops.onResized, 100);
                    `;
        },
      }).render(getBody());
    });
  });

  it("should render a component to an iframe and autoresize width from the child", () => {
    return wrapPromise(({ expect }) => {
      const width = 293;
      const height = 100;

      const expectedWidth = width;
      const expectedHeight = height;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-autoresize-width-from-child",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          autoResize: {
            height: false,
            width: true,
          },
          dimensions: {
            width: "100px",
            height: "100px",
          },
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onResized: expect("onResized", () => {
          return componentWindowPromise.then((componentWindow) => {
            if (componentWindow.innerWidth !== expectedWidth) {
              throw new Error(
                `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
              );
            }

            if (componentWindow.innerHeight !== expectedHeight) {
              throw new Error(
                `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
              );
            }
          });
        }),

        run: () => {
          return `
                        document.body.style.height = '${height}px';
                        document.body.style.width = '${width}px';
                        setTimeout(window.xprops.onResized, 100);
                    `;
        },
      }).render(getBody());
    });
  });

  it("should render a component to an iframe and autoresize height from the child", () => {
    return wrapPromise(({ expect }) => {
      const width = 293;
      const height = 105;

      const expectedWidth = 100;
      const expectedHeight = height;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-autoresize-height-from-child",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          autoResize: {
            height: true,
            width: false,
          },
          dimensions: {
            height: "100px",
            width: "100px",
          },
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onResized: expect("onResized", () => {
          return componentWindowPromise.then((componentWindow) => {
            if (componentWindow.innerWidth !== expectedWidth) {
              throw new Error(
                `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
              );
            }

            if (componentWindow.innerHeight !== expectedHeight) {
              throw new Error(
                `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
              );
            }
          });
        }),

        run: () => {
          return `
                        document.body.style.height = '${height}px';
                        document.body.style.width = '${width}px';
                        setTimeout(window.xprops.onResized, 100);
                    `;
        },
      }).render(getBody());
    });
  });

  it("should render a component to an iframe and autoresize from the child with a custom element", () => {
    return wrapPromise(({ expect }) => {
      const width = 293;
      const height = 101;

      const expectedWidth = width;
      const expectedHeight = height;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-autoresize-custom-from-child",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          autoResize: {
            height: true,
            width: true,
            element: "#container",
          },
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onResized: expect("onResized", () => {
          return componentWindowPromise.then((componentWindow) => {
            if (componentWindow.innerWidth !== expectedWidth) {
              throw new Error(
                `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
              );
            }

            if (componentWindow.innerHeight !== expectedHeight) {
              throw new Error(
                `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
              );
            }
          });
        }),

        run: () => {
          return `
                        let container = document.querySelector('#container');
                        container.style.height = '${height}px';
                        container.style.width = '${width}px';
                        setTimeout(window.xprops.onResized, 100);
                    `;
        },
      }).render(getBody());
    });
  });

  it("should render a component to an iframe and autoresize from the prerender template", () => {
    return wrapPromise(({ expect }) => {
      const width = 293;
      const height = 101;

      const expectedWidth = width;
      const expectedHeight = height;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-autoresize-from-prerender",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          autoResize: {
            height: true,
            width: true,
          },
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
          prerenderTemplate: ({ props, doc }) => {
            const { onResized } = props;
            window.__onResized__ = onResized;
            return (
              <html>
                <body>
                  <script>
                    {`
                                            document.body.style.height = '${height}px';
                                            document.body.style.width = '${width}px';
                                            setTimeout(window.parent.__onResized__, 1);
                                        `}
                  </script>
                </body>
              </html>
            ).render(dom({ doc }));
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onResized: expect("onResized", () => {
          return componentWindowPromise.then((componentWindow) => {
            if (componentWindow.innerWidth !== expectedWidth) {
              throw new Error(
                `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
              );
            }

            if (componentWindow.innerHeight !== expectedHeight) {
              throw new Error(
                `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
              );
            }
          });
        }),
      }).render(getBody());
    });
  });

  it("should render a component to an iframe and autoresize the width from the prerender template", () => {
    return wrapPromise(({ expect }) => {
      const width = 293;
      const height = 101;

      const expectedWidth = width;
      const expectedHeight = 100;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-autoresize-width-from-prerender",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          autoResize: {
            height: false,
            width: true,
          },
          dimensions: {
            height: "100px",
            width: "100px",
          },
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
          prerenderTemplate: ({ props, doc }) => {
            const { onResized } = props;
            window.__onResized__ = onResized;
            return (
              <html>
                <body>
                  <script>
                    {`
                                            document.body.style.height = '${height}px';
                                            document.body.style.width = '${width}px';
                                            setTimeout(window.parent.__onResized__, 1);
                                        `}
                  </script>
                </body>
              </html>
            ).render(dom({ doc }));
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onResized: expect("onResized", () => {
          return componentWindowPromise.then((componentWindow) => {
            if (componentWindow.innerWidth !== expectedWidth) {
              throw new Error(
                `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
              );
            }

            if (componentWindow.innerHeight !== expectedHeight) {
              throw new Error(
                `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
              );
            }
          });
        }),
      }).render(getBody());
    });
  });

  it("should render a component to an iframe and autoresize the height from the prerender template", () => {
    return wrapPromise(({ expect }) => {
      const width = 293;
      const height = 101;

      const expectedWidth = 100;
      const expectedHeight = height;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-autoresize-height-from-prerender",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          autoResize: {
            height: true,
            width: false,
          },
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
          dimensions: {
            height: "100px",
            width: "100px",
          },
          prerenderTemplate: ({ props, doc }) => {
            const { onResized } = props;
            window.__onResized__ = onResized;
            return (
              <html>
                <body>
                  <script>
                    {`
                                            document.body.style.height = '${height}px';
                                            document.body.style.width = '${width}px';
                                            setTimeout(window.parent.__onResized__, 1);
                                        `}
                  </script>
                </body>
              </html>
            ).render(dom({ doc }));
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onResized: expect("onResized", () => {
          return componentWindowPromise.then((componentWindow) => {
            if (componentWindow.innerWidth !== expectedWidth) {
              throw new Error(
                `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
              );
            }

            if (componentWindow.innerHeight !== expectedHeight) {
              throw new Error(
                `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
              );
            }
          });
        }),
      }).render(getBody());
    });
  });

  it("should render a component to an iframe and autoresize using a custom element from the prerender template", () => {
    return wrapPromise(({ expect }) => {
      const width = 293;
      const height = 101;

      const expectedWidth = width;
      const expectedHeight = height;

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-autoresize-custom-from-prerender",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          autoResize: {
            height: true,
            width: true,
            element: "#container",
          },
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
          prerenderTemplate: ({ props, doc }) => {
            const { onResized } = props;
            window.__onResized__ = onResized;
            return (
              <html>
                <body>
                  <div id="container" />
                  <script>
                    {`
                                            let container = document.querySelector('#container');
                                            container.style.height = '${height}px';
                                            container.style.width = '${width}px';
                                            setTimeout(window.parent.__onResized__, 1);
                                        `}
                  </script>
                </body>
              </html>
            ).render(dom({ doc }));
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onResized: expect("onResized", () => {
          return componentWindowPromise.then((componentWindow) => {
            if (componentWindow.innerWidth !== expectedWidth) {
              throw new Error(
                `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
              );
            }

            if (componentWindow.innerHeight !== expectedHeight) {
              throw new Error(
                `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
              );
            }
          });
        }),
      }).render(getBody());
    });
  });

  it("should render a component to an iframe with 100% percentage dimensions", () => {
    return wrapPromise(({ expect }) => {
      const width = 178;
      const height = 253;

      const expectedWidth = width;
      const expectedHeight = height;

      const el = document.createElement("div");
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;

      if (!getBody()) {
        throw new Error(`Could not find getBody()`);
      }

      getBody().appendChild(el);

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-100-percent-dimensions",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          dimensions: {
            width: "100%",
            height: "100%",
          },
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onRendered: expect("onRendered"),
      })
        .render(el)
        .then(() => {
          return componentWindowPromise;
        })
        .then((componentWindow) => {
          if (componentWindow.innerWidth !== expectedWidth) {
            throw new Error(
              `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
            );
          }

          if (componentWindow.innerHeight !== expectedHeight) {
            throw new Error(
              `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
            );
          }
        });
    });
  });

  it("should render a component to an iframe with 50% percentage dimensions", () => {
    return wrapPromise(({ expect }) => {
      const width = 161;
      const height = 257;

      const expectedWidth = width;
      const expectedHeight = height;

      const el = document.createElement("div");
      el.style.width = `${width * 2}px`;
      el.style.height = `${height * 2}px`;

      if (!getBody()) {
        throw new Error(`Could not find getBody()`);
      }

      getBody().appendChild(el);

      window.__component__ = () => {
        return zoid.create({
          tag: "test-render-iframe-50-percent-dimensions",
          url: "mock://www.child.com/base/test/windows/child/index.htm",
          domain: "mock://www.child.com",
          dimensions: {
            width: "50%",
            height: "50%",
          },
          attributes: {
            iframe: {
              scrolling: "no",
            },
          },
        });
      };

      const componentWindowPromise = onWindowOpen().then(
        expect("onWindowOpen", ({ win }) => win)
      );

      const component = window.__component__();
      return component({
        onRendered: expect("onRendered"),
      })
        .render(el)
        .then(() => {
          return componentWindowPromise;
        })
        .then((componentWindow) => {
          if (componentWindow.innerWidth !== expectedWidth) {
            throw new Error(
              `Expected width to be ${expectedWidth}, got ${componentWindow.innerWidth}`
            );
          }

          if (componentWindow.innerHeight !== expectedHeight) {
            throw new Error(
              `Expected height to be ${expectedHeight}, got ${componentWindow.innerHeight}`
            );
          }
        });
    });
  });
});
