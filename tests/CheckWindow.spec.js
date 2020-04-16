'use strict';

const assert = require('assert');
const {By, Target} = require('@applitools/eyes-webdriverio');

describe('CheckWindow', () => {

  beforeEach(() => {
    browser.url('http://applitools.github.io/demo/TestPages/FramesTestPage/');
  });

  it('eyesOpen', () => {
    assert.strictEqual(browser.eyesGetIsOpen(), false);
  });

  it('checkWindow', () => {
    assert.strictEqual(browser.eyesGetIsOpen(), false);
    browser.eyesCheckWindow();
    assert.strictEqual(browser.eyesGetIsOpen(), true);
  });

  it('checkRegion', () => {
    browser.eyesCheck('region', Target.region(By.id("overflowing-div")));
  });

  it('checkFrame & GetTestResults', () => {
    browser.eyesCheck('frame', Target.frame("frame1"));

    /** @type {TestResults} */
    const testResults = browser.eyesGetTestResults();
    assert.strictEqual(true, testResults.isPassed());
  });

  it('eyesGetAllTestResults (depends of previous tests)', () => {
    /** @type {TestResultSummary} */
    const testResults = browser.eyesGetAllTestResults();
    assert.strictEqual(3, testResults.getAllResults().length);
  });

  afterEach(() => {
    /** @type {TestResults} */
    const testResults = browser.eyesGetTestResults();
    if (testResults) {
      if (testResults.isPassed()) {
        console.log(`${testResults.getName()} is passed.`);
      } else {
        console.log(`Test is not passed: ${testResults.getMismatches()} out of ${testResults.getSteps()} failed.`);
        console.log(`Step details URL: ${testResults.getAppUrls().getSession()}`);
      }
    }
  });

});
