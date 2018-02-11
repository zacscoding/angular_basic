System.config({
  transpiler: 'typescript',

  typescriptOptions: {
    emitDecoratorMetadata: true,
    target: 'ES5',
    module: 'commonjs'
  },

  map: {
    '@angular': 'node_modules/@angular',
    'rxjs': 'node_modules/rxjs'
  },

  meta: {
    'app/mediator/stock.ts': {
      format: 'es6'
    }
  },

  packages: {
    'rxjs': {main: 'Rx'},
    '@angular/core': {main: 'bundles/core.umd.min.js'},
    '@angular/common': {main: 'bundles/common.umd.min.js'},
    '@angular/compiler': {main: 'bundles/compiler.umd.min.js'},
    '@angular/http': {main: 'bundles/http.umd.min.js'},
    '@angular/forms': {main: 'bundles/forms.umd.min.js'},
    '@angular/platform-browser': {main: 'bundles/platform-browser.umd.min.js'},
    '@angular/platform-browser-dynamic': {main: 'bundles/platform-browser-dynamic.umd.min.js'},
    //'app': {main: 'input_output/input-property-binding-getter-setter',defaultExtension: 'ts'}
    'app': {
      // main: 'input_output/output-property-binding',
      // main: 'mediator/mediator-main',
      // main: 'projection/basic-ng-content',
      main: 'projection/ng-content-selector',
      defaultExtension: 'ts'
    }
  }
});