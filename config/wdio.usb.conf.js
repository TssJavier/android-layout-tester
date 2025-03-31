// config/wdio.usb.conf.js
const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,
  specs: ['./tests/sanityTest.js'], // Ruta a tu test principal
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'R58R92NRQEN', // ← tu deviceName real
    'appium:platformVersion': '13.0', // Cambia según tu Android si quieres
    'appium:automationName': 'UiAutomator2',
    'appium:appPackage': 'cognifit.android.clevermind.children',
    'appium:appActivity': 'cognifit.android.clevermind.children.MainActivity',
    'appium:noReset': true,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 300
  }],
  logLevel: 'info',
};
