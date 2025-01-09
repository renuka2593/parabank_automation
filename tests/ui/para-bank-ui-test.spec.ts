import { test } from "../../config/ui-base-test";

test.describe("Para Bank Application UI Test Scenarios", () => {
  test("e2e - create a new user and validate end-to-end scenarios", async ({
    pageManager,
    userDetails,
    registerData,
    globalNavigationMenu,
    transferDetails,
    payeeDetails,
  }) => {
    // Step 1: Navigate to register page
    await test.step("Navigate to Register Page", async () => {
      console.log(userDetails);
      await pageManager.registerPage.navigateToRegister();
      await pageManager.registerPage.assertPageURL(/.*register.htm/);
    });

    // Step 2: Register a new user
    await test.step("Register a new user", async () => {
      await pageManager.registerPage.fillRegistrationForm(
        userDetails,
        registerData
      );
      await pageManager.registerPage.submitRegistration();
      await pageManager.registerPage.assertRegistrationSuccess(
        userDetails.username
      );
    });

    // Step 3: Login to the application with the user created in step 2
    await test.step("Login as new user", async () => {
      await pageManager.homePage.logout();
      await pageManager.loginPage.assertPageURL(/.*index.htm/);
      await pageManager.loginPage.loginAsUser(userDetails);
      await pageManager.homePage.assertWelcomeMessagePostLogin({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
      });
    });

    // Step 4: Verify if the Global navigation menu in home page is working as expected
    await test.step("Verify Global Navigation Menu", async () => {
      await pageManager.homePage.verifyGlobalNavigationMenu(
        globalNavigationMenu
      );
    });

    // Step 5: Create a Savings account from “Open New Account Page”
    await test.step("Create Savings Account", async () => {
      await pageManager.homePage.navigateToOpenNewAccount();
      await pageManager.homePage.assertPageURL(/.*openaccount.htm/);
      await pageManager.homePage.selectSavingAccount();
      await pageManager.homePage.clickOnOpenNewBankAccount();
      await pageManager.homePage.verifyAccountIsCreatedSuccessfully();
    });

    const accountNumber = await pageManager.homePage.getAccountNumber();

    // Step 6: Validate if Accounts overview page is displaying the balance details as expected
    await test.step("Validate Account Overview", async () => {
      await pageManager.homePage.navigateToAccountOverview();
      await pageManager.homePage.verifyAccountDetailsAmount(
        accountNumber,
        transferDetails.minimumExpectedAmount
      );
    });

    // Step 7: Transfer funds from account created in step 5 to another account
    await test.step("Transfer funds from account created ", async () => {
      await pageManager.homePage.navigateToTransferFunds();
      await pageManager.homePage.assertPageURL(/.*transfer.htm/);
      await pageManager.homePage.transferFundFromAccount(accountNumber, "50");
      await pageManager.homePage.verifyAmountHasBeenTransferred();
    });

    // Step 8: Pay the bill with account created in step 5
    await test.step("Pay the bill with account created ", async () => {
      await pageManager.homePage.navigateToPayBill();
      await pageManager.homePage.assertPageURL(/.*billpay.htm/);
      await pageManager.homePage.fillUpPayeeDetails(
        payeeDetails,
        accountNumber
      );
      await pageManager.homePage.verifyBillPaymentCompleted();
    });
  });
});
