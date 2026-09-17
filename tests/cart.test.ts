import { expect } from '@playwright/test';
import { test } from '@fixtures/baseTest';
import { existingLogin } from '@data/users';

test('add to cart', async ({ homePage: hPage, categoryPage: cPage, productPage: pPage, checkoutPage: coPage }) => {
    await hPage.goto('', true);

    // Just pick the second tablet and buy 2:
    await hPage.chooseCategory('tablets');
    await cPage.chooseProduct(1);
    await pPage.quantityPlus.click();
    await pPage.addToCartBtn.click();
    await pPage.checkoutBtn.click();

    // Before we proceed we need to fill in the login:
    await coPage.login(existingLogin.username,existingLogin.password);
    await coPage.nextBtn.click();
    // NOTE: current user has stored card...
    await coPage.payNowBtn.click();

    // Check the confirmation:
    await expect(coPage.page.getByRole('article')).toContainText('ORDER PAYMENT');
    await expect(coPage.successReply).toContainText(/Your tracking number is \d+\s*\|\s*Your order number is \d+\s*\|\s*Your warranty number is \d+/);
    await expect(coPage.successReply).toContainText(existingLogin.firstName+' '+existingLogin.lastName);
    await expect(coPage.successReply).toContainText('MasterCredit **** **** **** ');

    // Now check that we can see orders attached to this account:
    await coPage.menuClick('user:orders');
    await expect(coPage.page.getByRole('article')).toContainText('MY ORDERS');
    expect(await coPage.page.getByRole('row').count()).toBeGreaterThan(0);
});
