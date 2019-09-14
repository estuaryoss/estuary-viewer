let BasePage = require("./BasePage");

class Dashboard {

  constructor() {
    this.basePage = BasePage;
    this.deployersTotal = element(by.id('deployers-total')).element(by.className('card-title'));
    this.testRunnersTotal = element(by.id('testrunners-total')).element(by.className('card-title'));
    this.discoveryTotal = element(by.id('discovery-total')).element(by.className('card-title'));
    this.chart = element(by.id('stack-barchart')).element(by.className('card-title'));
    this.chartActiveDeployments= element.all(by.className('ct-bar')).get(0);
    this.chartActiveTests= element.all(by.className('ct-bar')).get(1);

    this.url = "/";
    this.pageLoaded = this.basePage.inDom($('#deployers-total'));

    this.timeout = {
      'xs': 420,
      's': 1000,
      'm': 2000,
      'l': 5000,
      'xl': 9000,
      'xxl': 15000
    }
  }

  async loaded() {
    return browser.wait(async () => {
      return await this.pageLoaded();
    }, this.timeout.xl, 'timeout waiting for page to load. Url: ' + this.url);
  }

  async goto() {
    this.basePage.goto(this.url);
    return await this.loaded();
  }

  async getDeployersTotal() {
    await this.sleep(this.timeout.m);
    return this.deployersTotal.getText().then(result => {
      return parseInt(result);
    });
  }

  async getTestRunnersTotal() {
    await this.sleep(this.timeout.m);
    return this.testRunnersTotal.getText().then(result => {
      return parseInt(result);
    });
  }

  async getDiscoveryTotal() {
    await this.sleep(this.timeout.m);
    return this.discoveryTotal.getText().then(result => {
      return parseInt(result);
    });
  }

  async getTotalDeployments() {
    await this.sleep(this.timeout.m);
    return this.chartActiveDeployments.getText().then(result => {
      return result;
    });
  }

  async getTotalTests() {
    await this.sleep(this.timeout.m);
    return this.chartActiveTests.getText().then(result => {
      return result;
    });
  }

  async getChartCardTitle() {
    await this.sleep(this.timeout.m);
    return this.chart.getText().then(result => {
       return result;
      });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new Dashboard();
