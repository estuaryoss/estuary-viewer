var BasePage = require('./BasePage');

class Deployments {

  constructor() {
    this.basePage = BasePage;
    this.searchInput = element(by.className('form-control'));
    this.deploymentIds = element.all(by.xpath('//td[@data-label=\'Deployment_Id\']/div'));
    this.clearButton = element(by.css('.btn.btn-outline-primary'));

    this.timeout = {
      'xs': 420,
      's': 1000,
      'm': 2000,
      'l': 5000,
      'xl': 9000,
      'xxl': 15000
    };

    this.url = '/#/admin/estuary-deployer';
    this.pageLoaded = this.basePage.inDom($('.input-group'));
  }

  /**
   * wait and verify that a page is loaded
   * @returns {promise}
   * @requires a page to include `pageLoaded` method
   */
  async loaded() {
    return browser.wait(async () => {
      return await this.pageLoaded();
    }, this.timeout.xl, 'timeout: waiting for page to load. The url is: ' + this.url);
  }

  async goto() {
    this.basePage.goto(this.url);
    return await this.loaded();
  }

  async sendKeysSearchInput(input) {
    return this.searchInput.sendKeys(input);
  }


  async getTitle() {
    return await this.basePage.getTitle();
  }

  async clickOnClear() {
    //browser.executeScript("arguments[0].style.visibility = 'visible'; ", this.clearButton.getWebElement());
    return await this.clearButton.click();
  }

  async getDeploymentId(index) {
    return await this.deploymentIds.getText().then(result => {
      return result[index]
    });
  }

  async getTotalDeployments() {
    return await this.deploymentIds.getText().then(result => {
        return result.length;
      }
    )
      ;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

module.exports = new Deployments();
