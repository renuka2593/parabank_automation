import { test as baseTest } from "@playwright/test";
import PageManager from "../pages/page-manager";

import * as userdata from "../testdata/register-user-testdata.json";

type Pages = {
  pageManager: PageManager;
};

type TestData = {
  userDetails: { username: string; password: string };
  registerData: any;
  globalNavigationMenu: any;
  transferDetails: any;
  payeeDetails: any;
};

export const test = baseTest.extend<Pages & TestData>({
  pageManager: async ({ page }, use) => {
    await use(new PageManager(page));
  },
  userDetails: async ({}, use) => {
    const generateRandomUsername = (): string => {
      return `ParaBank_${Math.random().toString(36).substring(2, 10)}`;
    };
    const username = generateRandomUsername();
    await use({ username: username, password: "Test@123" });
  },
  registerData: async ({}, use) => {
    await use(userdata.registerdata);
  },
  globalNavigationMenu: async ({}, use) => {
    await use(userdata.globalNavigationMenu);
  },
  transferDetails: async ({}, use) => {
    await use(userdata.transferDetails);
  },
  payeeDetails: async ({}, use) => {
    await use(userdata.payeeDetails);
  },
});
