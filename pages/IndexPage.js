let BasePage = require("./BasePage");

class IndexPage{

   constructor()
    {
        this.basePage = BasePage;
        this.reportOptions = element.all(by.className('jumbotron'));
        this.url = "/";
    }

    async getTotalTests() {
        return this.reportOptions.then(function (list) {
            return parseInt(list.length, 10);
        });
    }
}

module.exports = new IndexPage();
