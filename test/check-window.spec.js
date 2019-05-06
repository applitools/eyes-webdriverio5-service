'use strict';

const {Target} = require('@applitools/eyes-webdriverio');

describe('EyesServiceTest', () => {

  beforeEach(() => {
    browser.url('http://applitools.github.io/demo/TestPages/FramesTestPage/');
  });


  it('checkWindow', () => {
    try {
      browser.checkWindow('main');
    } catch (e) {
      console.error(e);
    }
  });


  it('check', () => {
    try {
      browser.check('main 2', Target.window());
    } catch (e) {
      console.error(e);
    }
  });


  it('checkFrame', () => {
    try {
      browser.checkFrame('frame1', null, 'frame1');
    } catch (e) {
      console.error(e);
    }
  });

});
