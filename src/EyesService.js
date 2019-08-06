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
    global.browser.addCommand('eyesCheckWindow', (title, checkSettings = Target.window().fully()) => {
      return this.eyes.check(title, checkSettings);
    });

    global.browser.addCommand('eyesSetScrollRootElement', (element) => {
      return this.eyes.setScrollRootElement(element);
    });
  }


  async beforeTest(test) {
    const appName = this.eyes.getConfiguration().getAppName() || test.parent;
    const testName = test.title;
    const viewport = this.eyes.getConfiguration().getViewportSize() || DEFAULT_VIEWPORT;

    await global.browser.call(() => this.eyes.open(global.browser, appName, testName, viewport));
  }


  async afterTest(exitCode, config, capabilities) {
    try {
      const result = await browser.call(() => this.eyes.close(false));
    } catch (e) {
      await browser.call(() => this.eyes.abortIfNotClosed());
    }
  }

}

exports.EyesService = EyesService;
