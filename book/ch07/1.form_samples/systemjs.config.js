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
		'@angular/forms' : { main : 'bundles/forms.umd.min.js' },
		'@angular/platform-browser' : { main : 'bundles/platform-browser.umd.min.js' },
		'@angular/platform-browser-dynamic' : { main : 'bundles/platform-browser-dynamic.umd.min.js' },

		//'app' : { main : '01_template-driven', defaultExtension : 'ts' }
    // 'app' : { main : '02_growable-items-form', defaultExtension : 'ts' }
		// 'app' : { main : '03_reactive', defaultExtension : 'ts' }
    // 'app' : { main : '04_form-builder', defaultExtension : 'ts' }
    // 'app' : { main : '05_custom-validator', defaultExtension : 'ts' }
    // 'app' : { main : '07_custom-validator-error-message', defaultExtension
    // : 'ts' }
    // 'app' : { main : '08_async-validator', defaultExtension : 'ts' }
    // 'app' : { main : '06_custom-validator-directive', defaultExtension :
		// 'ts' }
		'app' : { main : '10_template-driven-with-validation', defaultExtension : 'ts' }
	}
});