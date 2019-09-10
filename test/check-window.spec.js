'use strict';

const {By, Target} = require('@applitools/eyes-webdriverio');

describe('EyesServiceTest', () => {

  beforeEach(() => {
    browser.url('http://applitools.github.io/demo/TestPages/FramesTestPage/');
  });

  afterEach(() => {
    // console.log(browser.getTestResults()._name);
  });

  after(() => {
    // console.log(browser.getAllTestResults());
  });

  it('checkWindow', () => {
    browser.eyesCheckWindow('main');
  });

  it('checkWindow - no title', () => {
    browser.eyesCheckWindow();
  });

  it('checkRegion', () => {
    browser.eyesCheckWindow('region', Target.region(By.id("overflowing-div")));
  });

  it('checkFrame', () => {
    browser.eyesCheckWindow('frame', Target.frame("frame1"));
  });

});
