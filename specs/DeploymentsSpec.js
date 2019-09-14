let deploymentsPage = require('../pages/Deployments');

describe('Deployments', function () {
  browser.waitForAngularEnabled(false); //not angular app

  it('it should have a title', async function () {
    await deploymentsPage.goto();

    await expect(deploymentsPage.getTitle()).toEqual('Estuary Viewer');
  });

  it('it should write dummy string in the searchbox and the filtered deployments should be 0', async function () {
    let input = "dummy string";

    await deploymentsPage.goto();

    await deploymentsPage.sleep(3000);
    await expect(deploymentsPage.getTotalDeployments()).toBeGreaterThan(0);

    await deploymentsPage.sendKeysSearchInput(input);
    await expect(deploymentsPage.getTotalDeployments()).toEqual(0);
  });

  it('it should write dummy string in the searchbox and the filtered deployments should be greater then 0 after clear button is pressed', async function () {
    let input = "dummy string";

    await deploymentsPage.goto();

    await deploymentsPage.sleep(3000);
    await expect(deploymentsPage.getTotalDeployments()).toBeGreaterThan(0);

    await deploymentsPage.sendKeysSearchInput(input);
    await expect(deploymentsPage.getTotalDeployments()).toEqual(0);

    await deploymentsPage.clickOnClear();
    await expect(deploymentsPage.getTotalDeployments()).toBeGreaterThan(0);
  });

  it('it should write a valid Deployment Id in the searchbox and the filtered deployments should be 1', async function () {
    await deploymentsPage.goto();
    await deploymentsPage.sleep(3000);

    let input = await deploymentsPage.getDeploymentId(0);
    await expect(deploymentsPage.getTotalDeployments()).toBeGreaterThan(0);

    await deploymentsPage.sendKeysSearchInput(input);
    await expect(deploymentsPage.getTotalDeployments()).toEqual(1);
  });

});
