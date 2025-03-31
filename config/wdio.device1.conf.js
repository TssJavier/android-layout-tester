const { config } = require('./wdio.shared.conf');

exports.config = {
    ...config,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        //'appium:platformVersion': '12',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'cognifit.android.minded.children',
        'appium:appActivity': 'cognifit.android.minded.children.MainActivity',
        'appium:autoGrantPermissions': true,
        'appium:noReset': true,
    }],
};
