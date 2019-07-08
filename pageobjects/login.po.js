var LoginPage = function() {
  var userName = element(by.css('#user_name'));
  var password = element(by.css('#user_password'));
  var loginButton = element(by.css('#sysverb_login'));
  var bannerText = element(by.css('.banner-text'));

this.get = function() {
    browser.get(browser.params.baseUrl);
  };
this.enterUser = function(name) {
    userName.sendKeys(name);
  };
this.enterPassword = function(name) {
    password.sendKeys(name);
  };
this.clickButton = function(){
    loginButton.click();
}
this.getBannerText = function() {
    return bannerText.getText();
  };
};
module.exports = LoginPage
