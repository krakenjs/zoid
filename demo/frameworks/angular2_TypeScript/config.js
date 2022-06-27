System.config({
  // use typescript for compilation
  transpiler: "typescript",
  // typescript compiler options
  typescriptOptions: {
    emitDecoratorMetadata: true,
  },
  paths: {
    "npm:": "https://unpkg.com/",
  },
  // map tells the System loader where to look for things
  map: {
    app: "./",
    "@angular/core": "npm:@angular/core/bundles/core.umd.js",
    "@angular/common": "npm:@angular/common/bundles/common.umd.js",
    "@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd.js",
    "@angular/platform-browser":
      "npm:@angular/platform-browser/bundles/platform-browser.umd.js",
    "@angular/platform-browser-dynamic":
      "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
    rxjs: "npm:rxjs",
    typescript: "npm:typescript@2.2.1/lib/typescript.js",
  },
  // packages defines our app package
  packages: {
    app: {
      main: "./main.ts",
      defaultExtension: "ts",
    },
    rxjs: {
      defaultExtension: "js",
    },
  },
});
