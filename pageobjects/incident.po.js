var IncidentPage = function() {
  var enterCaller = element(by.xpath('//*[@id="sys_display.incident.caller_id"]'));
  var enterDescription = element(by.xpath('//*[@id="incident.short_description"]'));
  var submitButton = element(by.css('#sysverb_insert'));
  var clickProfileIcon = element.all(by.css('.caret'));
  var clickLogoutOption = element(by.xpath('//a[contains(text(),"Logout")]'));

this.enterCallerValue = function(name) {
    enterCaller.sendKeys(name);
  };
this.enterDescriptionValue = function(name) {
    enterDescription.sendKeys(name);
  };
this.clickCallerField = function() {
    enterCaller.click();
  };
this.clickDescriptionField = function() {
    enterDescription.click();
  };
this.clickButton = function(){
    createNewButton.click();
};
this.clickSubmitButton = function(){
    submitButton.click();
};
this.clickprofileIcon = function(index) {
     clickProfileIcon.get(index).click();
  };
this.clickLogout = function(index) {
     clickLogoutOption.click();
  };
};
module.exports = IncidentPage
