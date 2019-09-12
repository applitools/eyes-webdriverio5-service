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

  it('checkRegion', () => {
    browser.eyesCheck('region', Target.region(By.id("overflowing-div")));
  });

  it('checkFrame', () => {
    browser.eyesCheck('frame', Target.frame("frame1"));
  });

  afterEach(() => {
    /** @type {TestResults} */
    const testResults = browser.eyesGetTestResults();
    if (testResults) {
      if (testResults.isPassed()) {
        console.log(`${testResults.getTestName()} is passed.`);
      } else {
        console.log(`Test is not passed: ${testResults.getMismatches()} out of ${testResults.getSteps()} failed.`);
        console.log(`Step details URL: ${testResults.getAppUrls().getSession()}`);
      }
    }
  });

});
