const shared = require('./wdio.shared.conf');

exports.config = {
    ...shared.config,
    specs: [__dirname + '/../tests/**/*.js'],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'R58R92NRQEN',
        //'appium:platformVersion': '12',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'cognifit.android.minded.children',
        'appium:appActivity': 'cognifit.android.minded.children.MainActivity',
        'appium:noReset': true,
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 300
    }]
};
