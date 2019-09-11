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

  afterEach(() => {
    /** @type {TestResults} */
    const testResults = browser.eyesTestResults;
    if (global.browser.eyesTestStarted && testResults) {
      if (testResults.isPassed()) {
        console.log(`${testResults.getTestName()} is passed.`);
      } else {
        console.log(`Test is not passed: ${testResults.getMismatches()} out of ${testResults.getSteps()} failed.`);
        console.log(`Step details URL: ${testResults.getAppUrls().getSession()}`);
      }
    }
  });

});
