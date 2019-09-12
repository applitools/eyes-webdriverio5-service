'use strict';

const {Eyes, Target} = require('@applitools/eyes-webdriverio');


const DEFAULT_VIEWPORT = {
    width: 800,
    height: 600
};

class EyesService {
    constructor() {
        this.eyes = new Eyes();

        this.eyes.setHideScrollbars(true);
    }

    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     *
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession(config, capabilities, specs) {
        const eyesConfig = config.eyes;
        if (eyesConfig) {
            this.eyes.setConfiguration(eyesConfig);
        }
    }

    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     *
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before(capabilities, specs) {
        // deprecated, alias of eyesCheck
        global.browser.addCommand('eyesCheckWindow', (title, checkSettings = Target.window().fully()) => {
            return this.eyes.check(title, checkSettings);
        });

        global.browser.addCommand('eyesCheck', (title, checkSettings = Target.window().fully()) => {
            return this.eyes.check(title, checkSettings);
        });

        global.browser.addCommand('eyesSetScrollRootElement', (element) => {
            return this.eyes.setScrollRootElement(element);
        });

        global.browser.addCommand('eyesTag', (tagName, tagValue) => {
            return this.eyes.addProperty(tagName, tagValue);
        });

        global.browser.addCommand('eyesClearTags', () => {
            return this.eyes.clearProperties();
        });

        global.browser.addCommand('getTestResults', () => {
            if (this.eyes.getIsOpen()) {
                return this._eyesClose();
            } else {
            }
        });

        global.browser.addCommand('getAllTestResults', () => {
            return this.eyes.getRunner().getAllTestResults();
        });
    }

    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     *
     * @param {Object} test test details
     */
    async beforeTest(test) {
        const appName = this.eyes.getConfiguration().getAppName() || test.parent;
        const testName = this.eyes.getConfiguration().getTestName() || test.title;
        const viewport = this.eyes.getConfiguration().getViewportSize() || DEFAULT_VIEWPORT;

        await global.browser.call(() => this.eyes.open(global.browser, appName, testName, viewport));
        global.browser.eyesTestStarted = true;
    }

    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
     *
     * @param {Object} test test details
     */
    async afterTest(test) {
        global.browser.eyesTestResults = await global.browser.call(() => this.eyes.close(false));
    }

    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    async after(result, capabilities, specs) {
        await global.browser.call(() => this.eyes.abortIfNotClosed());
    }
}

exports.EyesService = EyesService;
