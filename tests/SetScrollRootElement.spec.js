'use strict';

const {By, Target} = require('@applitools/eyes-webdriverio');

describe('SetScrollRootElement', () => {

  beforeEach(() => {
    browser.url('https://applitools.github.io/demo/TestPages/SimpleTestPage/scrollablebody.html');
  });

  it('checkWindow with body as scroll root', async () => {
    await browser.eyesSetScrollRootElement(By.tagName('body'));

    await browser.eyesCheckWindow();
  });

  it('scroll root element should release after the test', async () => {
    await browser.eyesCheck('Footer links', Target.region(By.css('#overflowing-div')).fully());
  });

});
