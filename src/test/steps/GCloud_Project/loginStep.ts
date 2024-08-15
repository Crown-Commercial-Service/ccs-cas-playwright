import { Given, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "../../../hooks/pageFixture"
import LoginPage from "../../../pages/login"

let loginPage : LoginPage;

Given('I am accessing a valid CAS url', async function () {
  loginPage = new LoginPage(pageFixture.page)
  await loginPage.navigateUrl()
});

When('the email {string} and password {string} is entered', async function (email,password) {
  await loginPage.addUserDetails(email, password);
  await loginPage.clickOnsignInButton();
});

Then('User should be validated {string}',{ timeout: 10000 }, async function (assertionString) {
  await loginPage.assertLoginMessage(assertionString)
});

