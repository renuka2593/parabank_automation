import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;

  protected get welcomeHeading() {
    return this.page.getByRole("heading", { name: /^Welcome / });
  }

  constructor(page: Page) {
    this.page = page;
  }

  public async logout() {
    await this.page.getByRole("link", { name: "Log Out" }).click();
  }

  public async assertText(element: Locator, expectedText: string) {
    await expect(
      element,
      `Assert element must contain ${expectedText} text`
    ).toHaveText(expectedText);
  }

  public async assertPageURL(pageUrl) {
    await expect(this.page).toHaveURL(pageUrl);
  }

  public async assertPageTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }
}
