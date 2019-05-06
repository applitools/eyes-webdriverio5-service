'use strict';

const {Target} = require('@applitools/eyes-webdriverio');

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



});
