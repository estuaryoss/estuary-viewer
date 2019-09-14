let testsPage = require('../pages/Tests');

describe('Tests', function () {
  browser.waitForAngularEnabled(false); //not angular app

  it('it should have a title', async function () {
    await testsPage.goto();

    await expect(testsPage.getTitle()).toEqual('Estuary Viewer');
  });

  it('it should write dummy string in the searchbox and the filtered tests should be 0', async function () {
    let input = "dummy string";

    await testsPage.goto();
    await testsPage.sleep(2000);
    await expect(testsPage.getTotalTests()).toBeGreaterThan(0);

    await testsPage.sendKeysSearchInput(input);
    await expect(testsPage.getTotalTests()).toEqual(0);
  });

  it('it should write dummy string in the searchbox and the filtered tests should be greater then 0 after clear button is pressed', async function () {
    let input = "dummy string";

    await testsPage.goto();
    await testsPage.sleep(2000);
    await expect(testsPage.getTotalTests()).toBeGreaterThan(0);

    await testsPage.sendKeysSearchInput(input);
    await expect(testsPage.getTotalTests()).toEqual(0);

    await testsPage.clickOnClear();
    await expect(testsPage.getTotalTests()).toBeGreaterThan(0);
  });

  it('it should write a valid test Id in the searchbox and the filtered tests should be 1', async function () {
    await testsPage.goto();

    await testsPage.sleep(2000);
    let input = await testsPage.getTestId(0);
    await expect(testsPage.getTotalTests()).toBeGreaterThan(0);

    await testsPage.sendKeysSearchInput(input);
    await expect(testsPage.getTotalTests()).toEqual(1);
  });

});
