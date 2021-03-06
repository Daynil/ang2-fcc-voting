(function(global) {

    // map tells the System loader where to look for things
    var map = {
        'js':                         'js', // 'dist',
        'rxjs':                       'scripts/rxjs',
        'angular2-in-memory-web-api': 'scripts/angular2-in-memory-web-api',
        '@angular':                   'scripts/@angular',
        'lodash':                     'scripts/lodash/lodash.js',
        'chart':                      'scripts/chart.js/src/chart.js'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'js':                         { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { defaultExtension: 'js' },
        'lodash':                     { defaultExtension: 'js' },
        'chart':                      { defaultExtension: 'js' }
    };
    
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router-deprecated',
        'testing',
        'upgrade'
    ];

    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    // Bundled (~40 requests)
    function packUmd(pkgName) {
        packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packWithIndex ? packIndex : packUmd;

    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);

    var config = {
        map: map,
        packages: packages
    }

    // filterSystemConfig - index.html's chance to modify config before we register it.
    //if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);