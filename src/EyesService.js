'use strict';

const {Configuration, Eyes, Target} = require('@applitools/eyes-webdriverio');


const DEFAULT_VIEWPORT = {
  width: 800,
  height: 600
};


class EyesService {

  /**
   *
   * @param {Configuration} [config]
   */
  constructor(config) {
    this.eyes = new Eyes();
  }


  beforeSession(config) {
    const eyesConfig = config.eyes;
    if (eyesConfig) {
      this.eyes.setConfiguration(eyesConfig);
    }
    this.eyes.setHideScrollbars(true);
  }


  before(config, capabilities) {

    browser.addCommand('getTestResults', () => {
      if (this.eyes.getIsOpen()) {
        return this._eyesClose();
      } else {
      }
    });

    browser.addCommand('getAllTestResults', () => {
      return this.eyes.getRunner().getAllTestResults();
    });

    browser.addCommand('eyesCheckWindow', (title, checkSettings = Target.window().fully()) => {
      return this.eyes.check(title, checkSettings);
    });

    browser.addCommand('eyesTag', (tagName, tagValue) => {
      return this.eyes.addProperty(tagName, tagValue);
    });

    browser.addCommand('eyesClearTags', () => {
      return this.eyes.clearProperties();
    });
  }


  async beforeTest(test) {
    const appName = this.eyes.getConfiguration().getAppName() || test.parent;
    const testName = test.title;
    const viewport = this.eyes.getConfiguration().getViewportSize() || DEFAULT_VIEWPORT;

    await browser.call(() => this.eyes.open(browser, appName, testName, viewport));
  }


  async afterTest(exitCode, config, capabilities) {
    if (this.eyes.getIsOpen()) {
      await this._eyesClose();
    }
  }

  async _eyesClose() {
    try {
      return await browser.call(() => this.eyes.close(false));
    } catch (e) {
      return await browser.call(() => this.eyes.abortIfNotClosed());
    }
  }
}

exports.EyesService = EyesService;
