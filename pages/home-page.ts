import { expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export default class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Navigation menu link locator
  protected navigationLink(menuItem) {
    return this.page
      .locator("#headerPanel")
      .getByRole("link", { name: menuItem });
  }

  // Locators
  protected get openNewAccountLink() {
    return this.page.getByRole("link", { name: "Open New Account" });
  }

  protected get createNewAccountBtn() {
    return this.page.getByRole("button", { name: "Open New Account" });
  }

  protected get accountOverviewLnk() {
    return this.page.getByRole("link", { name: "Accounts Overview" });
  }

  protected get transferFundsLnk() {
    return this.page.getByRole("link", { name: "Transfer Funds" });
  }

  protected get billPayLnk() {
    return this.page.getByRole("link", { name: "Bill Pay" });
  }

  protected get billPaymentCompleteHeader() {
    return this.page.getByRole("heading", { name: "Bill Payment Complete" });
  }

  protected get transferCompleteHeader() {
    return this.page.getByRole("heading", { name: "Transfer Complete!" });
  }

  protected get fromAccountDropdown() {
    return this.page.locator("#fromAccountId");
  }

  protected get savingsAccountDropdown() {
    return this.page.locator("#type");
  }

  protected get newAccountId() {
    return this.page.locator("#newAccountId");
  }

  protected get congratulationsMessage() {
    return this.page.getByText("Congratulations, your account");
  }

  async navigateToOpenNewAccount() {
    try {
      await this.openNewAccountLink.click();
    } catch (error) {
      throw new Error("Failed to navigate to 'Open New Account' page.");
    }
  }

  async navigateToAccountOverview() {
    try {
      await this.accountOverviewLnk.click();
      await this.page.getByText("Total").waitFor({ state: "visible" });
    } catch (error) {
      throw new Error("Failed to navigate to 'Account Overview' page.");
    }
  }

  async navigateToTransferFunds() {
    try {
      await this.transferFundsLnk.click();
    } catch (error) {
      throw new Error("Failed to navigate to 'Transfer Funds' page.");
    }
  }

  async navigateToPayBill() {
    try {
      await this.billPayLnk.click();
    } catch (error) {
      throw new Error("Failed to navigate to 'Bill Pay' page.");
    }
  }

  async fillUpPayeeDetails(payeeDetails, accountNumber) {
    try {
      await this.page
        .locator('input[name="payee\\.name"]')
        .fill(payeeDetails.payeeName);
      await this.page
        .locator('input[name="payee\\.address\\.street"]')
        .fill(payeeDetails.payeeAddress);
      await this.page
        .locator('input[name="payee\\.address\\.city"]')
        .fill(payeeDetails.payeeCity);
      await this.page
        .locator('input[name="payee\\.address\\.state"]')
        .fill(payeeDetails.payeeState);
      await this.page
        .locator('input[name="payee\\.address\\.zipCode"]')
        .fill(payeeDetails.payeeZipCode);
      await this.page
        .locator('input[name="payee\\.phoneNumber"]')
        .fill(payeeDetails.payeePhoneNumber);
      await this.page
        .locator('input[name="payee\\.accountNumber"]')
        .fill(accountNumber);
      await this.page
        .locator('input[name="verifyAccount"]')
        .fill(accountNumber);
      await this.page.locator('input[name="amount"]').fill(payeeDetails.amount);
      await this.page
        .getByRole("button", { name: "Send Payment" })
        .click({ force: true });
    } catch (error) {
      throw new Error("Failed to fill up payee details or send payment.");
    }
  }

  async verifyBillPaymentCompleted() {
    try {
      await expect(this.billPaymentCompleteHeader).toBeVisible();
    } catch (error) {
      throw new Error("Bill payment completion verification failed.");
    }
  }

  async transferFundFromAccount(fromAccount, amount) {
    try {
      await this.page.locator("#amount").fill(amount);
      await expect(this.fromAccountDropdown.locator("option")).toHaveCount(2);
      await this.fromAccountDropdown.selectOption(fromAccount);
      await this.page
        .getByRole("button", { name: "Transfer" })
        .click({ force: true });
    } catch (error) {
      throw new Error("Failed to transfer funds.");
    }
  }

  async verifyAmountHasBeenTransferred() {
    try {
      await expect(this.transferCompleteHeader).toBeVisible();
    } catch (error) {
      throw new Error("Transfer completion verification failed.");
    }
  }

  async verifyAccountDetailsAmount(accountNumber, amount) {
    try {
      const accountRow = this.page.locator(`tr:has-text("${accountNumber}")`);
      await expect(accountRow).toBeVisible();
      const balance = await accountRow.locator("td:nth-child(3)").textContent();
      expect(
        parseFloat(balance?.replace(/[^0-9.]/g, "") || "0")
      ).toBeGreaterThanOrEqual(amount);
    } catch (error) {
      throw new Error("Failed to verify account details or amount.");
    }
  }

  async selectSavingAccount() {
    try {
      await this.savingsAccountDropdown.selectOption("1");
      await this.fromAccountDropdown.waitFor({ state: "attached" });
      await expect(this.fromAccountDropdown.locator("option")).toHaveCount(1);
    } catch (error) {
      throw new Error("Failed to select saving account.");
    }
  }

  async clickOnOpenNewBankAccount() {
    try {
      await this.createNewAccountBtn.click({ force: true });
    } catch (error) {
      throw new Error("Failed to click on 'Open New Bank Account' button.");
    }
  }

  async verifyAccountIsCreatedSuccessfully() {
    try {
      await expect(this.congratulationsMessage).toBeVisible();
    } catch (error) {
      throw new Error("Account creation success message verification failed.");
    }
  }

  async getAccountNumber() {
    try {
      const accountNumber = await this.newAccountId.textContent();
      expect(accountNumber).not.toBeNull();
      return accountNumber;
    } catch (error) {
      throw new Error("Failed to retrieve the account number.");
    }
  }

  async verifyGlobalNavigationMenu(navigationMenu: any) {
    try {
      for (const menuItem of navigationMenu) {
        const link = this.navigationLink(menuItem.name);
        await expect(link).toBeVisible();
        await link.click();
        await expect(this.page).toHaveURL(new RegExp(menuItem.expectedUrl));
      }
    } catch (error) {
      throw new Error("Global navigation menu verification failed.");
    }
  }

  async assertWelcomeMessagePostLogin(fullName: {
    firstName: string;
    lastName: string;
  }) {
    try {
      await expect(this.page.getByText(/Welcome .*/)).toHaveText(
        `Welcome ${fullName.firstName} ${fullName.lastName}`
      );
    } catch (error) {
      throw new Error("Welcome message post-login verification failed.");
    }
  }
}
