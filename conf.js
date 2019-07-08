var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'chrome'
    },
    framework: 'jasmine',
    specs: ['./testcases/**/*.js'],

    params: {
        baseUrl: '',
        UserName: '',
        Password: '',
        Caller: 'Abel Tuter',
        Description: 'Testing',
        BannerText: 'Service Management',
        FilterValue: 'incident',
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
    onPrepare: function () {
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(20000);

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: './summary-report',
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            takeScreenShotsOnlyForFailedSpecs: true,
            docTitle: 'Service now Automation Execution Summary ..'
        }).getJasmine2Reporter());
    }


};
