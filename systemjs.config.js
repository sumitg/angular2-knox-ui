/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the apps folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                       'npm:rxjs',
      // 'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      'ng2-json-editor': 'npm:ng2-json-editor',
      'ng2-ace-editor': 'npm:ng2-ace-editor',
      'ng2-ace': 'npm:ng2-ace',
      'brace': 'npm:brace',
    'w3c-blob': 'npm:w3c-blob',
    'buffer': 'npm:buffer',
    'base64-js': 'npm:base64-js',
    'ieee754': 'npm:ieee754',   
      'angular2-prettyjson': 'npm:angular2-prettyjson',
      'ng2-bs3-modal': 'npm:ng2-bs3-modal'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      // 'angular2-in-memory-web-api': {
      //   main: './index.js',
      //   defaultExtension: 'js'
      // },
      'ng2-json-editor': {
        defaultExtension: 'js'
      },
      'ng2-ace-editor': {
        main: './ng2-ace-editor.js',
        defaultExtension: 'js'
      },
      'ng2-ace': {
        defaultExtension: 'js'
      },
      'brace': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'buffer': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'base64-js': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ieee754': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'w3c-blob': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'angular2-prettyjson': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ng2-bs3-modal': {
        defaultExtension: 'js'
      }
    }
  });
})(this);
