import { Page } from "@playwright/test";
import RegisterPage from "./register-page";
import HomePage from "./home-page";
import LoginPage from "./login-page";

export default class PageManager {
  private readonly page: Page;

  private _registerPage: RegisterPage;
  private _homePage: HomePage;
  private _loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
  }

  get registerPage(): RegisterPage {
    if (!this._registerPage) {
      this._registerPage = new RegisterPage(this.page);
    }
    return this._registerPage;
  }

  get homePage(): HomePage {
    if (!this._homePage) {
      this._homePage = new HomePage(this.page);
    }
    return this._homePage;
  }

  get loginPage(): LoginPage {
    if (!this._loginPage) {
      this._loginPage = new LoginPage(this.page);
    }
    return this._loginPage;
  }
}
