'use strict';

const {Configuration, Eyes, Target, StitchMode} = require('@applitools/eyes-webdriverio');


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

      let stitchMode = StitchMode.CSS;
      if (eyesConfig.stitchMode) {
        switch (eyesConfig.stitchMode) {
          case 'CSS':
            this.eyes.setStitchMode(stitchMode.CSS);
            break;
          default:
            this.eyes.setStitchMode(stitchMode.SCROLL);
        }
      }

      this.eyes.setHideScrollbars(true);
    }
  }


  before(config, capabilities) {

    global.browser.addCommand('eyesCheckWindow', (title) => {
      if (!title) {
        throw new Error(`Title can't be null`);
      }
      return this.eyes.check(title, Target.window());
    });

  }


  beforeTest(test) {
    const appName = test.parent;
    const testName = test.title;
    const viewport = DEFAULT_VIEWPORT;

    global.browser.call(() => this.eyes.open(global.browser, appName, testName, viewport));
  }


  async afterTest(exitCode, config, capabilities) {
    try {
      const result = browser.call(() => this.eyes.close(false));
    } catch (e) {
      browser.call(() => this.eyes.abortIfNotClosed());
    }
  }

}

exports.EyesService = EyesService;
