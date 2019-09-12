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
     * Gets executed just before initialising the webdriver session and test framework.
     * It allows you to manipulate configurations depending on the capability or spec.
     *
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession(config, capabilities, specs) {
        this.eyesConfig = config.eyes;
        if (this.eyesConfig) {
            this.eyes.setConfiguration(this.eyesConfig);
        }
    }

    /**
     * Gets executed before test execution begins. At this point you can access to all global variables like `browser`.
     * It is the perfect place to define custom commands.
     *
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before(capabilities, specs) {
        global.browser.addCommand('eyesCheck', async (title, checkSettings = Target.window().fully()) => {
            const matchResult = await this.eyes.check(title, checkSettings);
            if (this.eyesConfig.throwErrorIfNotAsExpected && !matchResult.getAsExpected()) {
                throw new Error('Eyes detected visual mismatch!');
            }
            return matchResult;
        });

        // deprecated, alias of eyesCheck
        global.browser.addCommand('eyesCheckWindow', async (title, checkSettings) => {
            return global.browser.eyesCheck(title, checkSettings);
        });

        global.browser.addCommand('eyesSetScrollRootElement', (element) => {
            return this.eyes.setScrollRootElement(element);
        });

        global.browser.addCommand('eyesAddProperty', (tagName, tagValue) => {
            return this.eyes.addProperty(tagName, tagValue);
        });

        global.browser.addCommand('eyesClearProperties', () => {
            return this.eyes.clearProperties();
        });

        global.browser.addCommand('eyesGetTestResults', async () => {
            if (this.eyes.getIsOpen() && !this.testResults) {
                this.testResults = await this.eyes.close(false);
            }

            return this.testResults;
        });

        global.browser.addCommand('eyesSetConfiguration', (configuration) => {
            return this.eyes.setConfiguration(configuration);
        });

        global.browser.addCommand('eyesGetConfiguration', () => {
            return this.eyes.getConfiguration();
        });

        global.browser.addCommand('eyesGetAllTestResults', async () => {
            return this.eyes.getRunner().getAllTestResults();
        });
    }

    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     *
     * @param {Object} test test details
     */
    async beforeTest(test) {
        this.testResults = null;

        const appName = this.eyes.getConfiguration().getAppName() || test.parent;
        const testName = this.eyes.getConfiguration().getTestName() || test.title;
        const viewport = this.eyes.getConfiguration().getViewportSize() || DEFAULT_VIEWPORT;

        await global.browser.call(async () => this.eyes.open(global.browser, appName, testName, viewport));
    }

    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
     *
     * @param {Object} test test details
     */
    async afterTest(test) {
        this.testResults = await global.browser.call(async () => this.eyes.close(true));
    }

    /**
     * Gets executed after all tests are done. You still have access to all global variables from the test.
     *
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    async after(result, capabilities, specs) {
        await global.browser.call(async () => this.eyes.abort());
    }
}

exports.EyesService = EyesService;
