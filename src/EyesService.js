'use strict';

const {Configuration, Eyes, StitchMode, Target} = require('@applitools/eyes-webdriverio');


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

      let stitchMode = StitchMode.SCROLL;
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

    global.browser.addCommand('eyesCheckWindow', (title, checkSettings = Target.window().fully()) => {
      return this.eyes.check(title, checkSettings);
    });

  }


  beforeTest(test) {
    const appName = this.eyes.getConfiguration().getAppName() || test.parent;
    const testName = test.title;
    const viewport = this.eyes.getConfiguration().getViewportSize() || DEFAULT_VIEWPORT;

    global.browser.call(() => this.eyes.open(global.browser, appName, testName, viewport));
  }


  afterTest(exitCode, config, capabilities) {
    try {
      const result = browser.call(() => this.eyes.close(false));
    } catch (e) {
      browser.call(() => this.eyes.abortIfNotClosed());
    }
  }

}

exports.EyesService = EyesService;
