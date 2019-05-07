'use strict';

const {By, Target} = require('@applitools/eyes-webdriverio');

describe('EyesServiceTest', () => {

  beforeEach(() => {
    browser.url('http://applitools.github.io/demo/TestPages/FramesTestPage/');
  });


  it('checkWindow', () => {
    browser.eyesCheckWindow('main');
  });

  it('checkWindow - no title', () => {
    browser.eyesCheckWindow();
  });


  it.skip('checkRegion', () => {
    browser.eyesCheckWindow('main', Target.region(By.id("overflowing-div")));
  });


  it.skip('checkFrame', () => {
    browser.eyesCheckWindow('main', Target.frame("frame1"));
  });


});
