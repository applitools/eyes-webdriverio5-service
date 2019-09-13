'use strict';

const {By, Target} = require('@applitools/eyes-webdriverio');

describe('EyesServiceTest', () => {

  beforeEach(() => {
    browser.url('https://www.nytimes.com/');
  });

  it('checkWindow', async () => {
    await browser.eyesSetScrollRootElement(By.tagName('body'));

    await browser.eyesCheckWindow('Homepage', Target.window().fully());
  });

});
