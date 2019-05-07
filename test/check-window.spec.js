'use strict';

const {By, Target} = require('@applitools/eyes-webdriverio');

describe('EyesServiceTest', () => {

  beforeEach(() => {
    browser.url('http://applitools.github.io/demo/TestPages/FramesTestPage/');
  });


  it('checkWindow', () => {
    try {
      browser.eyesCheckWindow('main');
    } catch (e) {
      console.error(e);
    }
  });


  it('checkRegion', () => {
    try {
      browser.eyesCheckWindow('main', Target.region(By.id("overflowing-div")));
    } catch (e) {
      console.error(e);
    }
  });


  it.skip('checkFrame', () => {
    try {
      browser.eyesCheckWindow('main', Target.frame("frame1").fully());
    } catch (e) {
      console.error(e);
    }
  });



});
