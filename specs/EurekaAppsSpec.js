let eurekaAppsPage = require('../pages/EurekaApps');

describe('Eureka Apps', function () {
  browser.waitForAngularEnabled(false); //not angular app

  it('it should have a title', async function () {
    await eurekaAppsPage.goto();

    await expect(eurekaAppsPage.getTitle()).toEqual('Estuary Viewer');
  });

  it('it should write dummy string in the searchbox and the filtered apps should be 0', async function () {
    let input = "dummy string";

    await eurekaAppsPage.goto();
    await eurekaAppsPage.sleep(2000);
    await expect(eurekaAppsPage.getTotalEurekaApps()).toBeGreaterThan(0);

    await eurekaAppsPage.sendKeysSearchInput(input);
    await expect(eurekaAppsPage.getTotalEurekaApps()).toEqual(0);
  });

  it('it should write dummy string in the searchbox and the filtered apps should be greater then 0 after clear button is pressed', async function () {
    let input = "dummy string";

    await eurekaAppsPage.goto();
    await eurekaAppsPage.sleep(2000);
    await expect(eurekaAppsPage.getTotalEurekaApps()).toBeGreaterThan(0);

    await eurekaAppsPage.sendKeysSearchInput(input);
    await expect(eurekaAppsPage.getTotalEurekaApps()).toEqual(0);

    await eurekaAppsPage.clickOnClear();
    await expect(eurekaAppsPage.getTotalEurekaApps()).toBeGreaterThan(0);
  });

  it('it should write a valid app name in the searchbox and the filtered apps should be 1', async function () {
    await eurekaAppsPage.goto();

    await eurekaAppsPage.sleep(2000);
    let input = await eurekaAppsPage.getAppName(0);
    await expect(eurekaAppsPage.getTotalEurekaApps()).toBeGreaterThan(0);

    await eurekaAppsPage.sendKeysSearchInput(input);
    await expect(eurekaAppsPage.getTotalEurekaApps()).toEqual(1);
  });

});
