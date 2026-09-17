import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {

    // NOTE during demo the /login and /orderPayment share this page
    readonly loginUsername: Locator;
    readonly loginPassword: Locator;
    readonly loginBtn: Locator;

    readonly nextBtn: Locator;
    readonly payNowBtn: Locator;

    readonly successReply: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.loginUsername = page.locator('input[name="usernameInOrderPayment"]');
        this.loginPassword = page.locator('input[name="passwordInOrderPayment"]');
        this.loginBtn = page.locator('button#login_btn');
        this.nextBtn = page.getByRole('button', { name: 'NEXT' });
        this.payNowBtn = page.locator('#pay_now_btn_MasterCredit');
        this.successReply = page.locator('#orderPaymentSuccess');
    }

    async login(username: string, password: string) {
        await this.loginUsername.fill(username);
        await this.loginPassword.fill(password);
        // const requestPromise = this.page.waitForResponse(response => response.url().includes('AccountLoginRequest') && response.status() === 200);
        await this.loginBtn.click();
        // await requestPromise;
        await expect(this.page).not.toHaveURL(/\/login/);
        await expect(this.menuUser).toContainText(username);
        await this.loader.waitFor({ state: 'hidden' });
    }
}