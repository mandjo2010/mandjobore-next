import { test, expect, Page } from '@playwright/test'

test('Search: GIS via clavier ouvre un post', async ({ page }: { page: Page }) => {
  await page.goto('/')
  const searchBtn = page.getByTestId('search-button').or(page.getByRole('button', { name: /rechercher/i }))
  await searchBtn.click()

  const input = page.getByTestId('search-input').or(page.getByPlaceholder(/recherch/i))
  await input.fill('GIS')

  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')

  await expect(page).toHaveURL(/\/posts\//)
  await expect(page.locator('body')).toContainText(/gis/i)
})

test('Filtre catégorie met ?cat=... et liste correcte', async ({ page }: { page: Page }) => {
  await page.goto('/')

  const catButton = page.getByRole('button', { name: /catégor/i }).first().or(page.getByTestId('category-button'))
  await catButton.click()

  await page.getByRole('option').or(page.getByText(/^Data$/)).first().click()

  await expect(page).toHaveURL(/[\?&]cat=/i)

  const cards = page.getByTestId('post-card')
  const count = await cards.count()
  expect(count).toBeGreaterThan(0)

  const firstSlug = await cards.nth(0).getAttribute('data-category')
  for (let i = 0; i < count; i++) {
    await expect(cards.nth(i)).toHaveAttribute('data-category', firstSlug!)
  }
})

test('Esc ferme l’overlay de recherche', async ({ page }: { page: Page }) => {
  await page.goto('/')
  await page.getByTestId('search-button').click()
  await expect(page.getByTestId('search-overlay')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByTestId('search-overlay')).toBeHidden()
})
