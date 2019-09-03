var indexPage = require('../pages/IndexPage')

describe('Index', function () {
  browser.waitForAngularEnabled(false); //not angular app

  it('it should have a title', async function () {
    await indexPage.basePage.goto("/");

    await expect(browser.getTitle()).toEqual('Estuary Viewer');
  });


});
