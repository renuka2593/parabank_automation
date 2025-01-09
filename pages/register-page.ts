import { expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export default class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  protected get registerLink() {
    return this.page.getByRole("link", { name: "Register" });
  }

  protected get firstNameField() {
    return this.page.locator('[id="customer\\.firstName"]');
  }

  protected get lastNameField() {
    return this.page.locator('[id="customer\\.lastName"]');
  }

  protected get addressField() {
    return this.page.locator('[id="customer\\.address\\.street"]');
  }

  protected get cityField() {
    return this.page.locator('[id="customer\\.address\\.city"]');
  }

  protected get stateField() {
    return this.page.locator('[id="customer\\.address\\.state"]');
  }

  protected get zipCodeField() {
    return this.page.locator('[id="customer\\.address\\.zipCode"]');
  }

  protected get phoneNumberField() {
    return this.page.locator('[id="customer\\.phoneNumber"]');
  }

  protected get ssnField() {
    return this.page.locator('[id="customer\\.ssn"]');
  }

  protected get usernameField() {
    return this.page.locator('[id="customer\\.username"]');
  }

  protected get passwordField() {
    return this.page.locator('[id="customer\\.password"]');
  }

  protected get repeatedPasswordField() {
    return this.page.locator("#repeatedPassword");
  }

  protected get registerButton() {
    return this.page.getByRole("button", { name: "Register" });
  }

  protected get welcomeHeading() {
    return this.page.locator('h1:has-text("Welcome")');
  }

  // Methods
  async navigateToRegister() {
    try {
      await this.page.goto("/");
      await this.registerLink.click();
    } catch (error) {
      throw new Error("Failed to navigate to the register page.");
    }
  }

  async fillRegistrationForm(
    userDetails: { username: string; password: string },
    registerData: {
      firstName: string;
      lastName: string;
      address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
      };
      phoneNumber: string;
      ssn: string;
    }
  ) {
    try {
      await this.firstNameField.fill(registerData.firstName);
      await this.lastNameField.fill(registerData.lastName);
      await this.addressField.fill(registerData.address.street);
      await this.cityField.fill(registerData.address.city);
      await this.stateField.fill(registerData.address.state);
      await this.zipCodeField.fill(registerData.address.zipCode);
      await this.phoneNumberField.fill(registerData.phoneNumber);
      await this.ssnField.fill(registerData.ssn);
      await this.usernameField.fill(userDetails.username);
      await this.passwordField.fill(userDetails.password);
      await this.repeatedPasswordField.fill(userDetails.password);
    } catch (error) {
      throw new Error("Failed to fill the registration form.");
    }
  }

  async submitRegistration() {
    try {
      await this.registerButton.click();
    } catch (error) {
      throw new Error("Failed to submit the registration form.");
    }
  }

  async assertRegistrationSuccess(username: string) {
    try {
      await expect(this.welcomeHeading).toBeVisible();
      await expect(this.welcomeHeading).toHaveText(`Welcome ${username}`);
    } catch (error) {
      throw new Error("Registration success verification failed.");
    }
  }
}
