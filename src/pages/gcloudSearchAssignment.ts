import { Locator, Page, expect } from "@playwright/test";
import * as testData from "../helper/testData/testData.json";
import UTILS from "../helper/util/utils"

export default class gcloudSearchAssignment {
  chooseCommercialAgreementLink: Locator;
  gcloudProject: Locator;
  gcloudSearchProject: Locator;
  searchField: Locator;
  searchOption: Locator;
  updateResultsButton: Locator;
  saveSearchResultButton: Locator;
  downloadlink: Locator;



  constructor(private page: Page) {
    this.chooseCommercialAgreementLink = page.getByRole('link', { name: 'choose a commercial agreement' });
    this.gcloudProject = page.getByLabel('G-Cloud 13 (RM1557.13) , Show');
    this.gcloudSearchProject = page.locator('dt').filter({ hasText: 'All: Find cloud hosting,' })
    this.searchField = page.locator('#search');
    this.searchOption = page.getByLabel('Lot');
    this.updateResultsButton = page.locator('#topFilterBtn')
    this.saveSearchResultButton = page.getByRole('link', { name: 'Save your search' });
    this.downloadlink = page.getByRole('row', { name: testData.savedSearchResultName }).getByRole('link');
  }

  async chooseCommercialAgreementLink_click() {
    await this.chooseCommercialAgreementLink.click();
  }

  async selectProject(project: string) {
    if (project.includes("Gcloud")) {
      await this.gcloudProject.click();
    }

    expect(await this.page.title()).toContain("Choose a commercial agreement | Crown Commercial Service");
  }

  async selectSubProject(subProject) {
    if (subProject.includes("All: Find cloud hosting, software and support")) {
      await this.page.getByRole('link', { name: 'All: Find cloud hosting,' }).click();
    }
    expect(await this.page.title()).toContain("Your Project | Crown Commercial Service");
  }

  async startNewSearchButton() {
    await this.page.getByRole('link', { name: 'Start a new search' }).click();
  }
  async searchText(searchText:string) {
    expect(await this.page.title()).toContain("Search Results | Crown Commercial Service");
    // await expect(this.page.locator('#main-content')).toContainText('44029');
    await this.searchField.fill(searchText);
    await expect(this.searchField).toHaveValue(searchText);
  }

  async selectSearchOption(searchOption) {
    await this.searchOption.selectOption(searchOption);
    await expect(this.searchOption).toHaveValue('cloud-hosting');

  }

  async updateResultsButtonClick() {
    await this.updateResultsButton.click();
    await this.page.url().includes("**/search/**")
    await expect(this.page.getByRole('heading', { name: 'Search results' })).toBeVisible();
  }

  async asssertSearchResultsPage(searchText) {
    expect(await this.page.title()).toContain("Search Results | Crown Commercial Service");
  }

  async saveSearchResults() {
    await this.saveSearchResultButton.click();
  }

  async nameAndSaveSearchResult() {
    let savedResultName = await UTILS.searchResultName();
    await this.page.getByLabel('To save your search, you must').fill(savedResultName);
    await this.saveAndContinue()
  }

  async clickOnExportResults() {
    await this.page.getByRole('link', { name: 'Export results' }).first().click();
    await this.page.getByLabel('I understand that I cannot').check();
    await this.page.getByRole('button', { name: 'Export results and continue' }).click();

  }

  async seeSearchResultinExportTab() {
    await this.page.getByRole('tab', { name: 'Exported searches' }).click();
    await expect(this.page.getByLabel('Exported searches').locator('tbody')).toContainText(testData.savedSearchResultName);
    await expect(this.page.getByText(testData.savedSearchResultName)).toBeVisible();
  }

  async nameTheProject(projectName) {
    let updatedProjectName = await UTILS.nameTheProject(projectName);
    await this.page.getByRole('link', { name: 'Name your project' }).click();
    expect(await this.page.title()).toContain("Name Project | Crown Commercial Service");
    await this.page.getByLabel('You can change the name of').fill(updatedProjectName);
    await this.saveAndContinue()
  }

  async saveAndContinue() {
    await this.page.getByRole('button', { name: 'Save and continue' }).click();
  }

  async pageTitleAssertion(title) {
    expect(await this.page.title()).toContain(title);
  }

  async downloadTheResults() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadlink.click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file in download folder in TestData.
    await download.saveAs('src/helper/testData/downloads/' + download.suggestedFilename());
  }
}