import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

    async chooseCategory(category: 'tablets') {
        if (category === 'tablets') {
            await this.page.getByRole('link', { name: 'TabletsCategory', exact: true }).click();
            await this.page.waitForURL(/category\/Tablets/);
            await this.page.waitForResponse(response => response.url().includes('category-page.html') && response.status() === 200);
            await this.loader.waitFor({ state: 'hidden' });
            await expect(this.page.getByRole('article')).toContainText('TABLETS');
        }
    }
}
