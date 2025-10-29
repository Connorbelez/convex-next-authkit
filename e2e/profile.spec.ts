import { test, expect } from "@playwright/test";

test.describe.skip("Profile Page (auth required)", () => {
  test("renders layout and controls", async ({ page }) => {
    await page.goto("/profile");
    await expect(page).toHaveURL(/profile/);
    await expect(page.locator("text=Personal Information")).toBeVisible();
    await expect(page.locator("label:has-text('First name')")).toBeVisible();
    await expect(page.locator("label:has-text('Last name')")).toBeVisible();
    await expect(page.locator("label:has-text('Email')")).toBeVisible();
    await expect(page.locator("text=Organization")).toBeVisible();
  });
});


