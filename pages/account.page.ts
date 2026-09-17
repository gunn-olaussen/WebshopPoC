import { expect, Locator, Page } from '@playwright/test';
import { UserInformation } from '@lib/types';
import { BasePage } from './base.page';

export class AccountPage extends BasePage {
    readonly details: Locator;
    readonly deleteBtn: Locator;
    readonly deletePopup: Locator;
    readonly deletePopupY: Locator;
    readonly deletePopupN: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.details = this.page.getByRole('heading', { name: 'Account details' }).locator('..');
        this.deleteBtn = this.page.locator('button.deleteMainBtnContainer');
        this.deletePopup = this.page.locator('div#deleteAccountPopup');
        this.deletePopupY = this.deletePopup.locator('div.deletePopupBtn.deleteRed');
        this.deletePopupN = this.deletePopup.locator('div.deletePopupBtn.deleteGreen');
    }

    async verifyUser(info: UserInformation) {
        await this.page.waitForURL('**\/myAccount');
        // NOTE: taking a shortcut here for the demo:
        const joinDefined = (fields: (string | number | undefined)[], separator = ' ') => fields.filter(Boolean).join(separator);
        if (info.firstName || info.lastName) {
            await expect(this.details).toContainText(joinDefined([info.firstName, info.lastName]));
        }
        if (info.address || info.city || info.country || info.postcode) {
            const expected = joinDefined([info.address, info.city, info.country, info.postcode]);
            await expect(this.details.locator('div.middle')).toContainText(expected);
        }
        // TODO would check more in full version...
    }
}
