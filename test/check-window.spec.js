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
