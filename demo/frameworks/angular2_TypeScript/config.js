System.config({
  // use typescript for compilation
    transpiler: 'typescript',
  // typescript compiler options
    typescriptOptions: {
        emitDecoratorMetadata: true
    },
    paths: {
        'npm:': 'https://unpkg.com/'
    },
  // map tells the System loader where to look for things
    map: {
    
        'app': './',
        '@angular/core': 'npm:@angular/core@2/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common@2/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler@2/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser@2/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@2/bundles/platform-browser-dynamic.umd.js',
        'rxjs': 'npm:rxjs@5.0.0',
        'typescript': 'npm:typescript@2.2.1/lib/typescript.js'
    },
  // packages defines our app package
    packages: {
        app: {
            main: './main.ts',
            defaultExtension: 'ts'
        },
        rxjs: {
            defaultExtension: 'js'
        }
    }
});