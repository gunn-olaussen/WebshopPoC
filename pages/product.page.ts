import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {

    readonly quantityMinus: Locator;
    readonly quantityPlus: Locator;
    readonly addToCartBtn: Locator;
    readonly checkoutBtn: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.quantityPlus = page.locator('.plus');
        this.quantityMinus = page.locator('.minus');
        this.addToCartBtn = page.getByRole('button', { name: 'ADD TO CART' });
        this.checkoutBtn = page.getByRole('button', { name: 'CHECKOUT', exact: false });
    }
}
