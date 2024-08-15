import { Locator, Page, expect } from "@playwright/test";


export default class login {
  password: Locator;
  signInButton: Locator;
  message: Locator;
  successMessage: Locator;
  invalidEmailAndPasswordMessage: Locator;
  passwordErrorMessage: Locator;
  emailErrorMessage: Locator;
  signIn: Locator;
  email: Locator;

  constructor(private page: Page) {
    this.signIn = page.locator('#main-content').getByRole('link', { name: 'Sign in' });
    this.email = page.getByPlaceholder('Enter your email');
    this.password = page.getByPlaceholder('Enter your password');
    this.signInButton = page.getByTestId('loginButton')
    this.invalidEmailAndPasswordMessage = page.locator('#email-error');
    this.passwordErrorMessage = page.locator('#password-error');
    this.emailErrorMessage = page.locator('#email-error');
    this.successMessage = page.getByText('This is a dashboard banner')
  }

  async navigateUrl() {
    await this.page.goto(process.env.BASEURL,{waitUntil:"commit"});
    await this.signIn.click();
    expect(await this.page.title()).toContain("Sign In - CCS");

  }

  async addUserDetails(email: string, password: string) {

    await this.page.waitForTimeout(5000);
    // await this.page.waitForURL("**/login/**");
    await this.page.keyboard.press('PageDown');
    expect(await this.page.url()).toContain("login");
    await this.email.fill(email);
    await this.password.fill(password);
  }


  async clickOnsignInButton() {
    await this.page.getByRole('button', { name: 'Sign in' }).click({ timeout: 10000 });
  }


  async assertLoginMessage(message: string) {
    switch (message) {
      case "valid":
        await expect(this.successMessage).toBeVisible({ timeout: 10000 });
        break;
      case "InvalidEmail":
        await expect(this.emailErrorMessage).toBeVisible({ timeout: 10000 });
        break;
      case "InvalidPassword":
        await expect(this.passwordErrorMessage).toBeVisible({ timeout: 10000 });
        break;
      default:
        await expect(this.emailErrorMessage).toBeVisible();
        await expect(this.passwordErrorMessage).toBeVisible();
        break;

    }
  }

  async assertSuccessMessage() {
    expect(await this.successMessage.innerText()).toContain("Congratulations! You must have the proper credentials.")
  }
}