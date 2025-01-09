import { expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export default class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  protected get usernameInput() {
    return this.page.locator('input[name="username"]');
  }

  protected get passwordInput() {
    return this.page.locator('input[name="password"]');
  }

  protected get loginButton() {
    return this.page.getByRole("button", { name: "Log In" });
  }

  async loginAsUser(userDetails: { username: string; password: string }) {
    try {
      await this.usernameInput.fill(userDetails.username);
      await this.passwordInput.fill(userDetails.password);
      await this.loginButton.click();
    } catch (error) {
      throw new Error(
        "Failed to log in as user. Please check the credentials or page elements."
      );
    }
  }
}
