System.config({
  //SystemJS 에서 사용하는 트랜스파일러는 Typescript를 지정한다
  transpiler: 'typescript',

  typescriptOptions: {
    // Angular에서는 어노테이션을 사용해서 컴포넌트를 인식하고 등록하기 때문에 Systemjs의
    // Typescript 컴파일러에게 메타데이터와 데코레이터를 사용한다는 것을 알려준다.
    emitDecoratorMetadata: true,
    // 최종 결과물 ES5
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
    '@angular/platform-browser': {main: 'bundles/platform-browser.umd.min.js'},
    '@angular/platform-browser-dynamic': {main: 'bundles/platform-browser-dynamic.umd.min.js'},
    '@angular/router': {main: 'bundles/router.umd.min.js'},
    // 애플리케이션 코드는 app 폴더에 위치, 애플리케이션 시작점은 main.ts파일이라는 것을 지정
    'app': {main: 'main', defaultExtension: 'ts'}
  }
});