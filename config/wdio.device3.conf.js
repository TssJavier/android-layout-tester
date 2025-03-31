const { config } = require('./wdio.shared.conf');

exports.config = {
    ...config,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Pixel_3a_API_30',
        'appium:platformVersion': '13.0',
        'appium:appPackage': 'cognifit.android.clevermind.children',
        'appium:appActivity': 'cognifit.android.clevermind.children.MainActivity',
        'appium:autoGrantPermissions': true,
        'appium:noReset': true,
    }],
};
