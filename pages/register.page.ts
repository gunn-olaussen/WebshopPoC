import { Locator, Page } from '@playwright/test';
import { UserInformation } from '@lib/types';
import { BasePage } from './base.page';

export class RegisterPage extends BasePage {

    inputUsername: Locator;
    inputPassword: Locator;
    inputPasswordConf: Locator;
    inputEmail: Locator;
    inputFirstName: Locator;
    inputLastName: Locator;
    inputCity: Locator;
    inputAddress: Locator;
    inputPostcode: Locator;
    selectCountry: Locator;
    checkOffers: Locator;
    checkTerms: Locator;
    registerBtn: Locator;

    constructor(public readonly page: Page) {
        super(page);

        this.inputUsername = page.locator('input[name="usernameRegisterPage"]');
        this.inputPassword = page.locator('input[name="passwordRegisterPage"]');
        this.inputPasswordConf = page.locator('input[name="confirm_passwordRegisterPage"]');
        this.inputEmail = page.locator('input[name="emailRegisterPage"]');
        this.inputFirstName = page.locator('input[name="first_nameRegisterPage"]');
        this.inputLastName = page.locator('input[name="last_nameRegisterPage"]');
        this.inputCity = page.locator('input[name="cityRegisterPage"]');
        this.inputAddress = page.locator('input[name="addressRegisterPage"]');
        this.inputPostcode = page.locator('input[name="postal_codeRegisterPage"]');
        this.selectCountry = page.locator('select[name="countryListboxRegisterPage"]');

        this.checkOffers = page.locator('input[name="allowOffersPromotion"]');
        this.checkTerms = page.locator('input[name="i_agree"]');
        this.registerBtn = page.getByRole('button', { name: 'REGISTER' });
    }

    async createUser(info: UserInformation) {
        await this.page.waitForURL('**\/register');

        // Mandatory fields:
        await this.inputUsername.fill(info.username);
        await this.inputEmail.fill(info.email);
        await this.inputPassword.fill(info.password);
        await this.inputPasswordConf.fill(info.password);

        // Optional fields:
        if (info.firstName) {
            await this.inputFirstName.fill(info.firstName);
        }
        if (info.lastName) {
            await this.inputLastName.fill(info.lastName);
        }
        if (info.country) {
            await this.selectCountry.selectOption({ label: info.country });
        }
        if (info.city) {
            await this.inputCity.fill(info.city);
        }
        if (info.address) {
            await this.inputAddress.fill(info.address);
        }
        if (info.postcode) {
            await this.inputPostcode.fill(String(info.postcode));
        }

        // if undefined booleans, then leave the checkboxes with the default:
        if (info.receiveOffers !== undefined) {
            if (info.receiveOffers) {
                await this.checkOffers.check();
            } else {
                await this.checkOffers.uncheck();
            }
        }
        if (info.agreeTerms) {
            await this.checkTerms.check();
        } else {
            await this.checkTerms.uncheck();
        }
        await this.registerBtn.click();
    }
}