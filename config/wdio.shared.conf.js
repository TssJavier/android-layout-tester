const { config } = require('wdio.conf.js');

exports.config = {
    runner: 'local',
    specs: ['./tests/**/*.js'],
    maxInstances: 1,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000 // 10 minutos por actividad
    },
    reporters: ['spec'],
    services: ['appium'],
    logLevel: 'info',
    waitforTimeout: 10000,
};
