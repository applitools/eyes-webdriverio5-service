'use strict';

const {By, Target} = require('@applitools/eyes-webdriverio');

describe('EyesServiceTest', () => {

  beforeEach(() => {
    browser.url('http://applitools.github.io/demo/TestPages/FramesTestPage/');
  });

  it('checkWindow', async () => {
    await browser.eyesCheckWindow('main');
  });

  it('checkWindow - no title', async () => {
    await browser.eyesCheckWindow();
  });

  it('checkRegion', () => {
    browser.eyesCheckWindow('region', Target.region(By.id("overflowing-div")));
  });

  it('checkFrame', () => {
    browser.eyesCheckWindow('frame', Target.frame("frame1"));
  });

});
