var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = {
        description: '',
        passed: true,
        failed: true,
        pending: true,
        withLog: true,
    };

    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        $scope.searchSettings.passed = true;
        $scope.searchSettings.failed = true;
        $scope.searchSettings.pending = true;
        $scope.searchSettings.withLog = true;
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.specLevel = function (str) {
        var arr = str.split('|');
        str = "";
        if (arr.length < 3) {
            return true;
        }
        return false;
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };


    this.nToBr = function (str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    };


    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number)/1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {passCount++};
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {pendingCount++};
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {failCount++}
        }
        return failCount;
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results =[
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "fa2e6abdf12a3a8951710fc7d98b0d46",
        "instanceId": 18621,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524558175747,
                "type": ""
            }
        ],
        "timestamp": 1524558166760,
        "duration": 12148
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "543ea3d68583d9f50273acb9ab3e3f9c",
        "instanceId": 19036,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Failed: No element found using locator: By(css selector, user_password)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, user_password)\n    at WebDriverError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:27:5)\n    at NoSuchElementError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:192:5)\n    at elementArrayFinder.getWebElements.then (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)Error\n    at ElementArrayFinder.applyAction_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:831:22)\n    at LoginPage.enterPassword (/home/sachin/protractor_framework/pageobjects/login.po.js:11:14)\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:9:15)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\nFrom: Task: Run it(\"Login test\") in control flow\n    at UserContext.<anonymous> (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:4:3)\n    at addSpecsToSuite (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:2:1)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524558306005,
                "type": ""
            }
        ],
        "screenShotFile": "images/00980004-00d8-0000-0024-003000fb0080.png",
        "timestamp": 1524558295632,
        "duration": 18966
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "b6f17406d93037d76a3692528e43ad7a",
        "instanceId": 19368,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Failed: invalid selector: No selector specified\n  (Session info: chrome=66.0.3359.117)\n  (Driver info: chromedriver=2.38.552522 (437e6fbedfa8762dec75e2c5b3ddb86763dc9dcb),platform=Linux 4.13.0-38-generic x86_64)",
        "trace": "InvalidSelectorError: invalid selector: No selector specified\n  (Session info: chrome=66.0.3359.117)\n  (Driver info: chromedriver=2.38.552522 (437e6fbedfa8762dec75e2c5b3ddb86763dc9dcb),platform=Linux 4.13.0-38-generic x86_64)\n    at WebDriverError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:27:5)\n    at InvalidSelectorError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:135:5)\n    at Object.checkLegacyResponse (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: WebDriver.findElements(By(css selector, ))\n    at thenableWebDriverProxy.schedule (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at thenableWebDriverProxy.findElements (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:1048:19)\n    at ptor.waitForAngular.then (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:159:44)\n    at ManagedPromise.invokeCallback_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)Error\n    at ElementArrayFinder.applyAction_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function) [as click] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function) [as click] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:831:22)\n    at LoginPage.clickButton (/home/sachin/protractor_framework/pageobjects/login.po.js:15:17)\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:10:15)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\nFrom: Task: Run it(\"Login test\") in control flow\n    at UserContext.<anonymous> (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:4:3)\n    at addSpecsToSuite (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:2:1)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524558479585,
                "type": ""
            }
        ],
        "screenShotFile": "images/0042009b-00f7-00f9-0072-002f003e000d.png",
        "timestamp": 1524558470885,
        "duration": 13743
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "beeb12449410a700aa5fce54974fb0dc",
        "instanceId": 19700,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524558529821,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login_cpw.do - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524558536585,
                "type": ""
            }
        ],
        "timestamp": 1524558523979,
        "duration": 12618
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "7dfd47fb027c107d16bd97748c2c0359",
        "instanceId": 20299,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
        "trace": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:386:11)\n    at tryOnTimeout (timers.js:250:5)\n    at Timer.listOnTimeout (timers.js:214:5)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524559328706,
                "type": ""
            }
        ],
        "screenShotFile": "images/00370044-0057-005b-0073-00fa00f7002f.png",
        "timestamp": 1524559320572,
        "duration": 32492
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "06f727878ea0555614ecd8ea58d798ec",
        "instanceId": 20616,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
        "trace": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:386:11)\n    at tryOnTimeout (timers.js:250:5)\n    at Timer.listOnTimeout (timers.js:214:5)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524559415061,
                "type": ""
            }
        ],
        "screenShotFile": "images/00a80033-00c5-00ff-001a-003a002300df.png",
        "timestamp": 1524559405236,
        "duration": 32364
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "35aed54163633b1c92b3f12533142f5b",
        "instanceId": 21044,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Expected 'ServiceNow' to equal 'ITIL Homepage | ServiceNow'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:11:34)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2974:25)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524559729280,
                "type": ""
            }
        ],
        "screenShotFile": "images/0076001b-007e-003c-0070-009c005500e5.png",
        "timestamp": 1524559719886,
        "duration": 30224
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "db72a7c167f684e33cda64192bc35be1",
        "instanceId": 21411,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524559983905,
                "type": ""
            }
        ],
        "timestamp": 1524559971870,
        "duration": 31064
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "aa594b266d9652989eec12d32b625d1d",
        "instanceId": 21799,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Failed: filter is not defined",
        "trace": "ReferenceError: filter is not defined\n    at HomePage.enterValue (/home/sachin/protractor_framework/pageobjects/homepage.po.js:8:5)\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:15:14)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2974:25)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\nFrom: Task: Run it(\"Login test\") in control flow\n    at UserContext.<anonymous> (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:5:3)\n    at addSpecsToSuite (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:3:1)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "images/00c600cd-007e-00e5-0040-005800d50081.png",
        "timestamp": 1524560273860,
        "duration": 150
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "7913f103fb976bb2e640832399b6cc83",
        "instanceId": 22098,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524560343611,
                "type": ""
            }
        ],
        "timestamp": 1524560334460,
        "duration": 32423
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "cf5004fc7069e71024f8099b95be15d4",
        "instanceId": 22407,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524560385670,
                "type": ""
            }
        ],
        "timestamp": 1524560371851,
        "duration": 36534
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "2cb5214ae0ce55d8d7ab45dd9d8d30b9",
        "instanceId": 22730,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524560426774,
                "type": ""
            }
        ],
        "timestamp": 1524560415249,
        "duration": 29328
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "b545064ef838548c97026ea948f42b8c",
        "instanceId": 23031,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524560462239,
                "type": ""
            }
        ],
        "timestamp": 1524560449381,
        "duration": 31504
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "7b92300460348179e1e94b0d57345cb1",
        "instanceId": 23602,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524561167152,
                "type": ""
            }
        ],
        "timestamp": 1524561144518,
        "duration": 53144
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "6afc6e6708682a903961e0808f3d9594",
        "instanceId": 24094,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524561700756,
                "type": ""
            }
        ],
        "timestamp": 1524561689174,
        "duration": 33752
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "2dd6acc13872c9b0ed0324d78bc77359",
        "instanceId": 24579,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Failed: No element found using locator: By(css selector, #sys_display.incident.caller_id)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, #sys_display.incident.caller_id)\n    at WebDriverError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:27:5)\n    at NoSuchElementError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:192:5)\n    at elementArrayFinder.getWebElements.then (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)Error\n    at ElementArrayFinder.applyAction_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:831:22)\n    at HomePage.enterCallerValue (/home/sachin/protractor_framework/pageobjects/homepage.po.js:11:17)\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:17:14)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\nFrom: Task: Run it(\"Login test\") in control flow\n    at UserContext.<anonymous> (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:5:3)\n    at addSpecsToSuite (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:3:1)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524562416408,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev52726.service-now.com/scripts/doctype/js_includes_doctype.jsx?v=02-26-2018_1106&lp=Mon_Feb_26_12_33_26_PST_2018&c=3_49 11790 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1524562439537,
                "type": ""
            }
        ],
        "screenShotFile": "images/00f90059-0044-00db-001a-001e00f40088.png",
        "timestamp": 1524562405465,
        "duration": 47915
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "57de3e272746758f0e63d25b62bcd87e",
        "instanceId": 24947,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Failed: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=66.0.3359.117)\n  (Driver info: chromedriver=2.38.552522 (437e6fbedfa8762dec75e2c5b3ddb86763dc9dcb),platform=Linux 4.13.0-38-generic x86_64)",
        "trace": "InvalidSelectorError: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=66.0.3359.117)\n  (Driver info: chromedriver=2.38.552522 (437e6fbedfa8762dec75e2c5b3ddb86763dc9dcb),platform=Linux 4.13.0-38-generic x86_64)\n    at WebDriverError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:27:5)\n    at InvalidSelectorError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:135:5)\n    at Object.checkLegacyResponse (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: WebDriver.findElements(By(css selector, #sys_display\u0002e incident\u0002e caller_id))\n    at thenableWebDriverProxy.schedule (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at thenableWebDriverProxy.findElements (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:1048:19)\n    at ptor.waitForAngular.then (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:159:44)\n    at ManagedPromise.invokeCallback_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)Error\n    at ElementArrayFinder.applyAction_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:831:22)\n    at HomePage.enterCallerValue (/home/sachin/protractor_framework/pageobjects/homepage.po.js:11:17)\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:17:14)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\nFrom: Task: Run it(\"Login test\") in control flow\n    at UserContext.<anonymous> (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:5:3)\n    at addSpecsToSuite (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:3:1)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524562675991,
                "type": ""
            }
        ],
        "screenShotFile": "images/00490039-00b6-0031-00e3-00e6000e00a4.png",
        "timestamp": 1524562665061,
        "duration": 31908
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "5f305b64a6b2342c2a95c0eb2d382c6d",
        "instanceId": 25273,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"sys_display.incident.caller_id\"])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"sys_display.incident.caller_id\"])\n    at WebDriverError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:27:5)\n    at NoSuchElementError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:192:5)\n    at elementArrayFinder.getWebElements.then (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)Error\n    at ElementArrayFinder.applyAction_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:831:22)\n    at HomePage.enterCallerValue (/home/sachin/protractor_framework/pageobjects/homepage.po.js:11:17)\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:17:14)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\nFrom: Task: Run it(\"Login test\") in control flow\n    at UserContext.<anonymous> (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:5:3)\n    at addSpecsToSuite (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:3:1)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524562773239,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev52726.service-now.com/scripts/doctype/js_includes_doctype.jsx?v=02-26-2018_1106&lp=Mon_Feb_26_12_33_26_PST_2018&c=3_49 11790 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1524562801582,
                "type": ""
            }
        ],
        "screenShotFile": "images/00810009-0044-00a1-00ec-00e100910014.png",
        "timestamp": 1524562763887,
        "duration": 50335
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "44fcf3670b494584d60aed6758e1bf1f",
        "instanceId": 26657,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"sys_display.incident.caller_id\"])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"sys_display.incident.caller_id\"])\n    at WebDriverError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:27:5)\n    at NoSuchElementError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:192:5)\n    at elementArrayFinder.getWebElements.then (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)Error\n    at ElementArrayFinder.applyAction_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:831:22)\n    at HomePage.enterCallerValue (/home/sachin/protractor_framework/pageobjects/homepage.po.js:11:17)\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:18:14)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\nFrom: Task: Run it(\"Login test\") in control flow\n    at UserContext.<anonymous> (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:5:3)\n    at addSpecsToSuite (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:3:1)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524563271828,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev52726.service-now.com/scripts/doctype/js_includes_doctype.jsx?v=02-26-2018_1106&lp=Mon_Feb_26_12_33_26_PST_2018&c=3_49 11790 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1524563296817,
                "type": ""
            }
        ],
        "screenShotFile": "images/00eb00d4-00bc-00f3-008e-00d4009200a4.png",
        "timestamp": 1524563257801,
        "duration": 52272
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "ce9b6724ae14094160ef5ac33a215ee6",
        "instanceId": 27007,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Failed: ptor is not defined",
        "trace": "ReferenceError: ptor is not defined\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:17:5)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2974:25)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: Run it(\"Login test\") in control flow\n    at UserContext.<anonymous> (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:5:3)\n    at addSpecsToSuite (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:3:1)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "images/00ea00b1-0076-00c9-0074-008700bf000b.png",
        "timestamp": 1524563419782,
        "duration": 144
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "a3295201ce4efd704be57685d64e2f79",
        "instanceId": 27350,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Failed: No element found using locator: By(css selector, #incident.short_description)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, #incident.short_description)\n    at WebDriverError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:27:5)\n    at NoSuchElementError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:192:5)\n    at elementArrayFinder.getWebElements.then (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)Error\n    at ElementArrayFinder.applyAction_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:831:22)\n    at HomePage.enterDescriptionValue (/home/sachin/protractor_framework/pageobjects/homepage.po.js:14:22)\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:19:14)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\nFrom: Task: Run it(\"Login test\") in control flow\n    at UserContext.<anonymous> (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:5:3)\n    at addSpecsToSuite (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:3:1)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524563491413,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev52726.service-now.com/scripts/doctype/js_includes_doctype.jsx?v=02-26-2018_1106&lp=Mon_Feb_26_12_33_26_PST_2018&c=3_49 11790 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1524563519548,
                "type": ""
            }
        ],
        "screenShotFile": "images/00c80082-00dc-0093-00fb-009200e9002b.png",
        "timestamp": 1524563479665,
        "duration": 55886
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "2d7fbf60776344007ca8ac294bb5e026",
        "instanceId": 27698,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Failed: No element found using locator: By(css selector, #sysverb_login)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, #sysverb_login)\n    at WebDriverError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:27:5)\n    at NoSuchElementError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:192:5)\n    at elementArrayFinder.getWebElements.then (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)Error\n    at ElementArrayFinder.applyAction_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function) [as click] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function) [as click] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:831:22)\n    at LoginPage.clickButton (/home/sachin/protractor_framework/pageobjects/login.po.js:17:17)\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:20:15)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\nFrom: Task: Run it(\"Login test\") in control flow\n    at UserContext.<anonymous> (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:5:3)\n    at addSpecsToSuite (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:3:1)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524563649567,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev52726.service-now.com/scripts/doctype/js_includes_doctype.jsx?v=02-26-2018_1106&lp=Mon_Feb_26_12_33_26_PST_2018&c=3_49 11790 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1524563676114,
                "type": ""
            }
        ],
        "screenShotFile": "images/0002003b-00de-009b-00b6-002300b1008b.png",
        "timestamp": 1524563637491,
        "duration": 55885
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "63dc1ba8f6b0fd3afd33e3dd397939c6",
        "instanceId": 28053,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524563843127,
                "type": ""
            }
        ],
        "timestamp": 1524563830847,
        "duration": 31373
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "91a46f89a9d16462c140dcac68e5ec95",
        "instanceId": 30113,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524568283933,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev52726.service-now.com/scripts/doctype/js_includes_doctype.jsx?v=02-26-2018_1106&lp=Mon_Feb_26_12_33_26_PST_2018&c=3_49 11790 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1524568313557,
                "type": ""
            }
        ],
        "timestamp": 1524568272939,
        "duration": 51097
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "67c73c940c50c040d6d97182ae32a4e5",
        "instanceId": 30424,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524568349194,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev52726.service-now.com/scripts/doctype/js_includes_doctype.jsx?v=02-26-2018_1106&lp=Mon_Feb_26_12_33_26_PST_2018&c=3_49 11790 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1524568374952,
                "type": ""
            }
        ],
        "timestamp": 1524568337749,
        "duration": 47649
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "62fc25218e7fa8fdf583f9f4b96f8d83",
        "instanceId": 31097,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.",
        "trace": "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4281:23)\n    at ontimeout (timers.js:386:11)\n    at tryOnTimeout (timers.js:250:5)\n    at Timer.listOnTimeout (timers.js:214:5)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524568624084,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/styles/css_includes.cssx?v=02-26-2018_1106&c=2015-08-22_14:42:14_9ba65a134fe113006b620f5e9310c78e&theme= - Failed to load resource: net::ERR_NETWORK_CHANGED",
                "timestamp": 1524568707639,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/styles/heisenberg/heisenberg_all.cssx?v=02-26-2018_1106 - Failed to load resource: net::ERR_NETWORK_CHANGED",
                "timestamp": 1524568707640,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/amb/handshake - Failed to load resource: net::ERR_NETWORK_CHANGED",
                "timestamp": 1524568707640,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/scripts/lib/jquery_includes.jsx?v=02-26-2018_1106 - Failed to load resource: net::ERR_NETWORK_CHANGED",
                "timestamp": 1524568707640,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/home_splash.do?sysparm_direct=true 0:956 Uncaught ReferenceError: $j is not defined",
                "timestamp": 1524568707640,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/api/now/ui/presence?sysparm_auto_request=true&cd=1524568707588 - Failed to load resource: net::ERR_NETWORK_CHANGED",
                "timestamp": 1524568707654,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/api/now/embeddedhelp/home_splash/normal - Failed to load resource: net::ERR_INTERNET_DISCONNECTED",
                "timestamp": 1524568707661,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/scripts/sn/concourse/js_includes_concourse.jsx?v=02-26-2018_1106&lp=Mon_Feb_26_12_33_26_PST_2018&c=3_49 46263:8 \"{\\\"data\\\":null,\\\"status\\\":-1,\\\"config\\\":{\\\"method\\\":\\\"GET\\\",\\\"transformRequest\\\":[null],\\\"transformResponse\\\":[null],\\\"url\\\":\\\"/api/now/embeddedhelp/home_splash/normal\\\",\\\"headers\\\":{\\\"Accept\\\":\\\"application/json, text/plain, */*\\\",\\\"X-UserToken\\\":\\\"63df58e74f2913006b620f5e9310c7fd964e1b0d1deb399e1a205318f8f874559e8f0067\\\",\\\"X-WantSessionNotificationMessages\\\":\\\"true\\\"}},\\\"statusText\\\":\\\"\\\"}\"",
                "timestamp": 1524568707661,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/scripts/sn/concourse/js_includes_concourse.jsx?v=02-26-2018_1106&lp=Mon_Feb_26_12_33_26_PST_2018&c=3_49 46549:8 \"Error retrieving embedded help content.  \\\"Unknown error occurred\\\"\"",
                "timestamp": 1524568707661,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/connect_alert.mp3 - Failed to load resource: net::ERR_INTERNET_DISCONNECTED",
                "timestamp": 1524568710301,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/api/now/live/profiles/74aaff5b4fa513006b620f5e9310c7be - Failed to load resource: net::ERR_INTERNET_DISCONNECTED",
                "timestamp": 1524568710301,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/api/now/connect/conversations - Failed to load resource: net::ERR_INTERNET_DISCONNECTED",
                "timestamp": 1524568710301,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/angular.do?sysparm_type=user_preference&sysparm_pref_name=connect.conversation_list.active_list.frameSet.id&sysparm_action=set&sysparm_pref_value= - Failed to load resource: net::ERR_INTERNET_DISCONNECTED",
                "timestamp": 1524568710301,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/styles/fonts/source-sans-pro/SourceSansPro-Semibold.otf.woff - Failed to load resource: net::ERR_INTERNET_DISCONNECTED",
                "timestamp": 1524568710301,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/styles/fonts/source-sans-pro/SourceSansPro-Semibold.ttf - Failed to load resource: net::ERR_INTERNET_DISCONNECTED",
                "timestamp": 1524568710301,
                "type": ""
            }
        ],
        "screenShotFile": "images/00f60009-00b1-0041-0026-008200a2006c.png",
        "timestamp": 1524568611718,
        "duration": 115998
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "bda09d6ba3c02e139511d6764cc68d3c",
        "instanceId": 31570,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Failed: No element found using locator: By(css selector, #user_name)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, #user_name)\n    at WebDriverError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:27:5)\n    at NoSuchElementError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:192:5)\n    at elementArrayFinder.getWebElements.then (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)Error\n    at ElementArrayFinder.applyAction_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function) [as sendKeys] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:831:22)\n    at LoginPage.enterUser (/home/sachin/protractor_framework/pageobjects/login.po.js:11:14)\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:11:15)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\nFrom: Task: Run it(\"Login test\") in control flow\n    at UserContext.<anonymous> (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:5:3)\n    at addSpecsToSuite (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:3:1)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524568775508,
                "type": ""
            }
        ],
        "screenShotFile": "images/00750036-0085-0060-0024-0015003800b7.png",
        "timestamp": 1524568736900,
        "duration": 46037
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "67867634569bfee0da09903ccdac1a99",
        "instanceId": 32063,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524568811741,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev52726.service-now.com/scripts/doctype/js_includes_doctype.jsx?v=02-26-2018_1106&lp=Mon_Feb_26_12_33_26_PST_2018&c=3_49 11790 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1524568846142,
                "type": ""
            }
        ],
        "timestamp": 1524568786404,
        "duration": 70214
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "10d4c1903340cd997b970e38402dc5c7",
        "instanceId": 32442,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524569118124,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev52726.service-now.com/scripts/doctype/js_includes_doctype.jsx?v=02-26-2018_1106&lp=Mon_Feb_26_12_33_26_PST_2018&c=3_49 11790 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1524569142992,
                "type": ""
            }
        ],
        "timestamp": 1524569110460,
        "duration": 51306
    },
    {
        "description": "Login test|Login with valid credential",
        "passed": false,
        "pending": false,
        "os": "Linux",
        "sessionId": "93c4525d71df45bc06cf9c4b765ddec0",
        "instanceId": 547,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Failed: No element found using locator: By(css selector, .banner-text)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, .banner-text)\n    at WebDriverError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:27:5)\n    at NoSuchElementError (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:192:5)\n    at elementArrayFinder.getWebElements.then (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)Error\n    at ElementArrayFinder.applyAction_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function) [as getText] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function) [as getText] (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/built/element.js:831:22)\n    at LoginPage.getBannerText (/home/sachin/protractor_framework/pageobjects/login.po.js:20:23)\n    at UserContext.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:14:22)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:112:25\n    at new ManagedPromise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1077:7)\n    at ControlFlow.promise (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2505:12)\n    at schedulerExecute (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:95:18)\n    at TaskQueue.execute_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\nFrom: Task: Run it(\"Login test\") in control flow\n    at UserContext.<anonymous> (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:5:3)\n    at addSpecsToSuite (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/home/sachin/.nvm/versions/node/v6.12.0/lib/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)\n    at Object.<anonymous> (/home/sachin/protractor_framework/testcases/login_spec.js:3:1)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524569849784,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524569852401,
                "type": ""
            }
        ],
        "screenShotFile": "images/00ba00cd-001c-005c-0017-0013003300db.png",
        "timestamp": 1524569840589,
        "duration": 31886
    },
    {
        "description": "Login test and create a new incident|Login and create new incident test",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "7d0b91d339c4bcf909977a87493672ec",
        "instanceId": 1568,
        "browser": {
            "name": "chrome",
            "version": "66.0.3359.117"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://dev52726.service-now.com/login.do? - [DOM] Found 2 elements with non-unique id #sysparm_ck: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1524570885393,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev52726.service-now.com/scripts/doctype/js_includes_doctype.jsx?v=02-26-2018_1106&lp=Mon_Feb_26_12_33_26_PST_2018&c=3_49 11790 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1524570932235,
                "type": ""
            }
        ],
        "timestamp": 1524570866735,
        "duration": 66263
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length-1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};