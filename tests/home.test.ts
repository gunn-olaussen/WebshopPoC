import { test } from '@fixtures/baseTest';
import { expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveTitle(' Advantage Shopping');
});

test('has menu', async ({ homePage: home }) => {
  await home.goto();

  // check menu presence:
  expect(await home.menu.getByRole('link').count()).toBeGreaterThanOrEqual(3);

  // expose sub menu and check that it is actually usable:
  await home.menuClick('help:about');
  await expect(home.page.getByRole('heading')).toHaveText('ABOUT');

  // the menu should have closed when navigation was performed:
  // FIXME seems it doesn't: expect(await home.menuHelpSub.isVisible()).toBe(false);
});

test('loads content', async ({ homePage: home }) => {
  await home.goto('', true);
  await expect(home.page.getByText('SPECIAL OFFER').first()).toBeVisible();
});