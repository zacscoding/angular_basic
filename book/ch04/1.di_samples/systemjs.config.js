System.config({
	transpiler : 'typescript',

	typescriptOptions : {
		emitDecoratorMetadata : true,
		target : "ES5",
		module : "commonjs"
	},

	map : {
		'@angular' : 'node_modules/@angular',
		'rxjs' : 'node_modules/rxjs'
	},

	packages : {
		'rxjs' : { main : 'Rx' },
		'@angular/core' : { main : 'bundles/core.umd.min.js' },
		'@angular/common' : { main : 'bundles/common.umd.min.js' },
		'@angular/compiler' : { main : 'bundles/compiler.umd.min.js' },
		'@angular/http' : { main : 'bundles/http.umd.min.js' },
		'@angular/platform-browser' : { main : 'bundles/platform-browser.umd.min.js' },
		'@angular/platform-browser-dynamic' : { main : 'bundles/platform-browser-dynamic.umd.min.js' },
		'@angular/router' : { main : 'bundles/router.umd.min.js' },

		// 'app' : { main : 'main-basic', defaultExtension : 'ts' }
		// 'app' : { main : 'main-change-provider', defaultExtension : 'ts' }
        // 'app' : { main : 'main-factory', defaultExtension : 'ts' }
        'app' : { main : 'main-opaque-token', defaultExtension : 'ts' }
	}
});