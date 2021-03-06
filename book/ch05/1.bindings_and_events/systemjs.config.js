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

  packages: {
    'rxjs': {main: 'Rx'},
    '@angular/core': {main: 'bundles/core.umd.min.js'},
    '@angular/common': {main: 'bundles/common.umd.min.js'},
    '@angular/compiler': {main: 'bundles/compiler.umd.min.js'},
    '@angular/http': {main: 'bundles/http.umd.min.js'},
    '@angular/forms': {main: 'bundles/forms.umd.min.js'},
    '@angular/platform-browser': {main: 'bundles/platform-browser.umd.min.js'},
    '@angular/platform-browser-dynamic': {main: 'bundles/platform-browser-dynamic.umd.min.js'},

    //'app' : { main : 'bindings/attribute-vs-property', defaultExtension :'ts' }
    // 'app': {main: 'bindings/template-bindings', defaultExtension: 'ts'}
    // 'app': {main: 'bindings/two-way-bindings', defaultExtension: 'ts'}
    // 'app': {main: 'observables/observable-events', defaultExtension: 'ts'}
    // 'app': {main: 'observables/observable-events-http', defaultExtension:'ts'}
    'app': {main: 'pipes/pipe-tester', defaultExtension: 'ts'}
  }
});