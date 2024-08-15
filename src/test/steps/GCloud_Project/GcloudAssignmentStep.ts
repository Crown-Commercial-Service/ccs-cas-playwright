import { Given, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "../../../hooks/pageFixture"
import GcloudSearch from "../../../pages/gcloudSearchAssignment"
import LoginPage from "../../../pages/login"

let loginPage: LoginPage;
let gcloudSearch: GcloudSearch;

Given('I am accessing a CAS url with valid username and password', async function () {
  loginPage = new LoginPage(pageFixture.page)
  await loginPage.navigateUrl();
  await loginPage.addUserDetails("shruthi_cas_uat@yopmail.com", "Test_12345");
  await loginPage.clickOnsignInButton();
  await loginPage.assertLoginMessage("valid")
});

Given('click on choose a commercial service link', async function () {
  gcloudSearch = new GcloudSearch(pageFixture.page);
  await gcloudSearch.chooseCommercialAgreementLink_click();
});

When('I select the {string} project and {string} as the agreement', async function (project, subProject) {
  await gcloudSearch.selectProject(project);
  await gcloudSearch.selectSubProject(subProject);
});

When('then I search for {string} and select the option {string}', async function (searchText, searchOption) {
  await gcloudSearch.startNewSearchButton();
  await gcloudSearch.searchText(searchText);
  await gcloudSearch.selectSearchOption(searchOption);
});

Then('I should see the search results containing {string}', async function (searchText) {
  await gcloudSearch.asssertSearchResultsPage(searchText)
});

When('click on update results button', async function () {
  await gcloudSearch.updateResultsButtonClick();
});

When('I click on the save search', async function () {
  await gcloudSearch.saveSearchResults();
});

When('give name to you search results and save', async function () {
  await gcloudSearch.nameAndSaveSearchResult();
});

When('click on export results and confirm you cant edit', async function () {
  await gcloudSearch.clickOnExportResults();
});

When('you should see the saved results in exported results tab', async function () {
  await gcloudSearch.seeSearchResultinExportTab();
});

When('name the project {string}', async function (projectName) {
  await gcloudSearch.nameTheProject(projectName);
});

When('then download the saved results', async function () {
  await gcloudSearch.downloadTheResults();
});

Then('delete the search results', async function () {
  
});