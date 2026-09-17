import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CategoryPage extends BasePage {

    readonly products: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.products = page.locator('div.categoryRight').getByRole('listitem');
    }

    async chooseProduct(nth: number) {
        await this.products.nth(nth).click();
        await this.page.waitForURL(/product/);
        await this.page.waitForResponse(response => response.url().includes('product-page.html') && response.status() === 200);
        await this.loader.waitFor({ state: 'hidden' });
    }
}
