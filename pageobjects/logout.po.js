var LogoutPage = function() {
  var clickProfileIcon = element.all(by.css('.caret'));
  var clickLogoutOption = element(by.xpath('//a[contains(text(),"Logout")]'));

this.clickprofileIcon = function(index) {
     clickProfileIcon.get(index).click();
  };
this.clickLogout = function(index) {
     clickLogoutOption.click();
  };
};
module.exports = LogoutPage
