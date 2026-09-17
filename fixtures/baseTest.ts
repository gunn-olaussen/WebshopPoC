import { test as baseTest } from '@playwright/test';
import { HomePage, AccountPage, CategoryPage, CheckoutPage, ProductPage, RegisterPage } from '@pages';

type Pages = {
    homePage: HomePage,
    accountPage: AccountPage,
    registerPage: RegisterPage,
    categoryPage: CategoryPage,
    productPage: ProductPage,
    checkoutPage: CheckoutPage,
}

export const test = baseTest.extend<Pages>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    categoryPage: async ({ page }, use) => {
        await use(new CategoryPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
});
