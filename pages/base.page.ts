import { Locator, Page } from '@playwright/test';

export class BasePage {

    readonly loader: Locator;

    readonly menu: Locator;
    readonly menuUser: Locator;
    private readonly menuUserLink: Locator;
    readonly menuUserSub: Locator;
    readonly menuUserProfile: Locator;
    readonly menuUserOrders: Locator;
    readonly menuUserSignout: Locator;
    readonly menuCart: Locator;
    readonly menuCartTooltip: Locator;
    readonly menuHelp: Locator;
    readonly menuHelpSub: Locator;
    readonly menuHelpAbout: Locator;

    readonly loginModal: Locator;
    readonly loginModalUsr: Locator;
    readonly loginModalPwd: Locator;
    readonly loginModalLoader: Locator;
    readonly loginModalNewBtn: Locator;
    readonly loginModalSigninBtn: Locator;

    constructor(public readonly page: Page) {
        this.loader = page.locator('div.loader').first();
        this.menu = page.locator('nav');
        this.menuUser = page.getByRole('link', { name: 'UserMenu' });
        this.menuUserLink = this.menuUser.locator('#hrefUserIcon');
        this.menuUserSub = this.page.locator('#loginMiniTitle');
        this.menuUserProfile = this.menuUserSub.getByRole('link', { name: 'My account' });
        this.menuUserOrders = this.menuUserSub.getByRole('link', { name: 'My orders' });
        this.menuUserSignout = this.menuUserSub.getByRole('link', { name: 'Sign out' });
        this.menuCart = this.menu.getByLabel('ShoppingCart');
        this.menuCartTooltip = this.menu.locator('#toolTipCart');
        this.menuHelp = page.locator('#helpLink');
        this.menuHelpSub = this.page.locator('#helpMiniTitle');
        this.menuHelpAbout = this.menu.getByRole('link', { name: 'About', exact: true });

        this.loginModal = this.page.locator('login-modal > div.PopUp')
        this.loginModalUsr = page.locator('input[name="username"]');
        this.loginModalPwd = page.locator('input[name="password"]');
        this.loginModalSigninBtn = this.loginModal.locator('#sign_in_btn');
        this.loginModalNewBtn = this.loginModal.getByRole('link', { name: 'CREATE NEW ACCOUNT' });
        this.loginModalLoader = this.loginModal.locator('div.loader');
    }

    async goto(sub: string = '', waitFullyLoaded = false) {
        await this.page.goto(sub, { waitUntil: 'load' });
        // if the test depends on all elements, then wait for the home page:
        if (waitFullyLoaded && sub === '') {
            await this.page.waitForResponse(response => response.url().includes('home-page.html') && response.status() === 200);
        }
    }

    async login(username: string, password: string) {
        await this.menuClick('user');
        await this.loginModalUsr.fill(username);
        await this.loginModalPwd.fill(password);
        await this.loginModalSigninBtn.click();
        await this.loginModalLoader.waitFor({ state: 'hidden' });
        await this.loginModal.waitFor({ state: 'visible' });
    }

    async menuClick(goto: 'user' | 'user:account' | 'user:orders' | 'user:signout' | 'cart' | 'help:about') {// minimal demo example
        const openSub = async (open: Locator, waitFor: Locator, clickOn: Locator) => {
            await open.click();
            await waitFor.waitFor({ state: 'visible' });
            await clickOn.click();
        };
        let waitFor: string | undefined;
        switch(goto) {
            case 'user':
                await this.menuUserLink.click();
                await this.loginModalLoader.waitFor({ state: 'hidden' });
                break;
            case 'user:account':
                await openSub(this.menuUserLink, this.menuUserSub, this.menuUserProfile); waitFor = '**/myAccount';
                break;
            case 'user:orders':
                await openSub(this.menuUserLink, this.menuUserSub, this.menuUserOrders); waitFor = '**/MyOrders';
                break;
            case 'user:signout':
                await openSub(this.menuUserLink, this.menuUserSub, this.menuUserSignout); waitFor = '/#/';
                break;
            case 'cart':
                await this.menuCart.click(); waitFor = 'shoppingCart';
                break;
            case 'help:about':
                await openSub(this.menuHelp, this.menuHelpSub, this.menuHelpAbout); waitFor = '**/about';
                break;
        }
        if (waitFor) {
            await this.page.waitForURL(waitFor);
            await this.loader.waitFor({ state: 'hidden' });
        }
    }
}
