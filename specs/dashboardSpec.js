let dashboardPage = require('../pages/Dashboard')
let totalDockerComposeDeployers = 1;
let totalDockerComposeTestRunners = 1;
let totalDockerComposeDiscovery = 1;

describe('DashBoard', function () {
  browser.waitForAngularEnabled(false); //not angular app

  it('it should have a title', async function () {
    await dashboardPage.goto();

    await expect(browser.getTitle()).toEqual('Estuary Viewer');
  });

  it('numbers of deployers must be expected number', async function () {
    await dashboardPage.goto();
    await expect(dashboardPage.getDeployersTotal()).toEqual(totalDockerComposeDeployers);
  });

  it('number of test runners must be the expected number', async function () {
    await dashboardPage.goto();

    await expect(dashboardPage.getTestRunnersTotal()).toEqual(totalDockerComposeTestRunners);
  });

  it('number of discovery must be the expected number', async function () {
    await dashboardPage.goto();

    await expect(dashboardPage.getDiscoveryTotal()).toEqual(totalDockerComposeDiscovery);
  });

  it('chart must be present as soon as page boots up, and the name is the one expected', async function () {
    await dashboardPage.goto();

    await expect(dashboardPage.getChartCardTitle()).toEqual('Estuary stack stats');
  });

  it('chart must have active deployments and tests', async function () {
    await dashboardPage.goto();
    await dashboardPage.sleep(dashboardPage.timeout.xxl);
    await expect(dashboardPage.getTotalDeployments()).toEqual(''); //cant get data from the canvas, but can check that the bar appeared // TODO?
    await expect(dashboardPage.getTotalTests()).toEqual(''); // cant get data out of canvas, but can check that the bar appeared // TODO?
  });

});
