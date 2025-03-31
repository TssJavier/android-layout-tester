exports.config = {
    runner: 'local',
    specs: ['./tests/**/*.js'],
    maxInstances: 1,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000 // 10 minutos por actividad
    },
    reporters: [
        'spec',
        ['allure', {
          outputDir: 'allure-results',
          disableWebdriverStepsReporting: false,
          disableWebdriverScreenshotsReporting: false,
        }]
      ],
    services: ['appium'],
    logLevel: 'info',
    waitforTimeout: 10000,
};
