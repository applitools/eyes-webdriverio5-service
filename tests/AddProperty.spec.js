'use strict';

const assert = require('assert');

describe('AddProperty', () => {

  beforeEach(() => {
    browser.url('http://applitools.github.io/demo/TestPages/FramesTestPage/');
    browser.eyesClearProperties(); // as an alternative solution which do not require customers to add this line,
                                   // we can save list of properties before test and reset it after test (but then we need to do same for suites as well)
                                   // right now, customers should control that by their own
  });

  it('add property', () => {
    assert.strictEqual(browser.eyesGetConfiguration().getProperties().length, 0);

    browser.eyesAddProperty('testProp', 'foobar');
    assert.strictEqual(browser.eyesGetConfiguration().getProperties().length, 1);

    browser.eyesCheckWindow('main');
  });

  it('properties should be cleaned beforeEach', () => {
    assert.strictEqual(browser.eyesGetConfiguration().getProperties().length, 0);
  });

});
