var loginPage = require('./../pageobjects/login.po.js');
var homePage = require('./../pageobjects/homepage.po.js');
var incidentPage = require('./../pageobjects/incident.po.js');
var logoutPage = require('./../pageobjects/logout.po.js');

describe('Login and create new incident test', function() {

  it('Login with valid credentials', function() {
    var loginpage = new loginPage();

    browser.waitForAngularEnabled(false);
    loginpage.get();
    loginpage.enterUser(browser.params.UserName);
    loginpage.enterPassword(browser.params.Password);
    loginpage.clickButton();
    expect(loginpage.getBannerText()).toEqual(browser.params.BannerText);
  });

  it('Create new incident', function() {
    var homepage = new homePage();
    var incidentpage = new incidentPage();

    homepage.enterValue(browser.params.FilterValue);
    homepage.clickButton();
    browser.switchTo().frame('gsft_main');
    incidentpage.clickCallerField();
    incidentpage.enterCallerValue(browser.params.Caller);
    incidentpage.clickDescriptionField();
    incidentpage.enterDescriptionValue(browser.params.Description);
    incidentpage.clickSubmitButton();
    browser.driver.switchToParentFrame();
  });

  it('Logout from application', function() {
    var logoutpage = new logoutPage();

    logoutpage.clickprofileIcon(0);
    logoutpage.clickLogout();
    expect(loginpage.getBannerText()).toNotEqual(browser.params.BannerText);
  });

});
