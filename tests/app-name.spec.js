'use strict';

const url = 'http://applitools.github.io/demo/TestPages/FramesTestPage/';
const {equal} = require('assert');

describe('appName1', () => {

  beforeEach(() => {
    browser.url(url);
  });

  it('check1', () => {
    browser.eyesCheck('region');
    browser.eyesClearProperties();
    equal('appName1', browser.eyesGetConfiguration().getAppName())
  });

});

describe('appName2', () => {
  beforeEach(() => {
    browser.url(url);
  });

  it('check2', () => {
    browser.eyesCheck('region');
    equal('appName2', browser.eyesGetConfiguration().getAppName())
  });
});

describe('appName3', () => {
  beforeEach(() => {
    browser.url(url);
    browser.eyesGetConfiguration().setAppName('appName3!!!');
  });

  it('check3', () => {
    browser.eyesCheck('region');
    equal('appName3', browser.eyesGetConfiguration().getAppName())
  });
});
