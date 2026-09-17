import { expect } from '@playwright/test';
import { test } from '@fixtures/baseTest';
import { existingLogin } from '@data/users';
import { UserInformation } from '@lib/types';

test('create new user', async ({ homePage: hPage, registerPage: rPage, accountPage: aPage }) => {
    await hPage.goto();
    await hPage.menuClick('user');

    await hPage.loginModalNewBtn.click();
    await hPage.loginModalLoader.waitFor({ state: 'hidden' });
    await hPage.loginModal.waitFor({ state: 'hidden', timeout: 20000 });

    const newUser: UserInformation = { username: 'u'+Date.now(), password: '4zigqRMkZ4t3', email: 'demo@test.com', agreeTerms: true, firstName: 'Me', country: 'Norway' }
    await rPage.createUser(newUser);
    await expect(hPage.menu.getByRole('link', { name: 'UserMenu' })).toContainText(newUser.username);
    try {
        await hPage.menuClick('user:account');
        await aPage.verifyUser(newUser);
    } finally {
        // TODO temporary clean-up of user during the demo:
        await aPage.deleteBtn.click();
        await aPage.deletePopup.waitFor({ state: 'visible' });
        await aPage.deletePopupY.click();
        await expect(hPage.menuUser).not.toContainText(newUser.username);
    }
});

test('login existing user', async ({ homePage: hPage, accountPage: aPage }) => {
    await hPage.goto();
    await hPage.login(existingLogin.username, existingLogin.password);

    // verify that we now have access to the full user menu:
    await expect(hPage.menuUser).toContainText(existingLogin.username);
    await hPage.menuClick('user:account');
    await expect(aPage.page.getByRole('article')).toContainText('MY ACCOUNT');

    // last we test logout:
    await aPage.menuClick('user:signout');
    await expect(aPage.menuUser).not.toContainText(existingLogin.username);
});
