exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://selenium-hub:4444/wd/hub', //docker compose
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['../specs/*Spec.js'],
    baseUrl: 'http://estuary-viewer:8080', //docker compose
    // baseUrl: 'http://10.10.1.1:8080',
    SELENIUM_PROMISE_MANAGER : false,
    multiCapabilities: [
        // {'browserName': 'firefox'}
        {'browserName': 'chrome'},
    ]
};
