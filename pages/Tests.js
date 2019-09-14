var BasePage = require('./BasePage');

class Tests {

  constructor() {
    this.basePage = BasePage;
    this.searchInput = element(by.className('form-control'));
    this.testsIds = element.all(by.xpath('//td[@data-label=\'Test_Id\']/div'));
    this.clearButton = element(by.css('.btn.btn-outline-primary'));

    this.timeout = {
      'xs': 420,
      's': 1000,
      'm': 2000,
      'l': 5000,
      'xl': 9000,
      'xxl': 15000
    };

    this.url = '/#/admin/estuary-testrunner';
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

  async getTestId(index) {
    return await this.testsIds.getText().then(result => {
      return result[index];
    });
  }

  async getTotalTests() {
    return await this.testsIds.getText().then(result => {
      return result.length;
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

module.exports = new Tests();
