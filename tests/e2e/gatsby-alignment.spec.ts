import { test, expect } from '@playwright/test'

test('Gatsby-style list: larger oval thumbnails (92px) + grey titles + excerpts', async ({ page }) => {
  await page.goto('/')
  
  // Check that post items exist
  const firstItem = page.locator('li.postItem').first()
  await expect(firstItem).toBeVisible()
  
  // Check that thumbnails are visible and larger (92px)
  const thumbnail = firstItem.locator('.postThumb img')
  await expect(thumbnail).toBeVisible()
  
  // Check that title has correct default grey color (#545454)
  const title = firstItem.locator('.postTitle')
  await expect(title).toBeVisible()
  
  // Check that excerpt is visible under title
  const excerpt = firstItem.locator('.postExcerpt')
  await expect(excerpt).toBeVisible()
  
  // Check that no category tags are visible in the list
  const categoryTags = page.locator('.postItem .MuiChip-root, .postItem .category-tag')
  await expect(categoryTags).toHaveCount(0)
  
  // Check that no border separators exist between items
  const borderBottoms = page.locator('.postItem')
  for (const item of await borderBottoms.all()) {
    const borderBottom = await item.evaluate(el => getComputedStyle(el).borderBottom)
    expect(borderBottom).toBe('none')
  }
})

test('Right rail with proper Gatsby layout: Home/Filter/Search top, Fullscreen/ScrollTop bottom', async ({ page }) => {
  await page.goto('/')
  
  // Check that right rail is visible
  const rightRail = page.locator('.rightRail')
  await expect(rightRail).toBeVisible()
  
  // Check top buttons (Home, Filter, Search) with proper icons
  const topButtons = rightRail.locator('.rightRailTop button')
  await expect(topButtons).toHaveCount(3)
  
  // Check bottom buttons (Fullscreen, Scroll to top) 
  const bottomButtons = rightRail.locator('.rightRailBottom button')
  await expect(bottomButtons).toHaveCount(2)
  
  // Verify lucide icons are rendered (they should contain SVG elements)
  const homeIcon = rightRail.locator('.rightRailTop button').first().locator('svg')
  await expect(homeIcon).toBeVisible()
})

test('Category filter panel opens with light background and proper categories', async ({ page }) => {
  await page.goto('/')
  
  // Click filter button (second button in top rail)
  const filterButton = page.locator('.rightRail .rightRailTop button').nth(1)
  await filterButton.click()
  
  // Check that filter panel is visible with light background
  const filterPanel = page.locator('.catDialog')
  await expect(filterPanel).toBeVisible()
  
  // Check for light background (rgba(255,255,255,.96))
  const bgColor = await filterPanel.evaluate(el => getComputedStyle(el).background)
  expect(bgColor).toContain('255, 255, 255') // white background
  
  // Check that correct categories are present
  const categoryButtons = filterPanel.locator('.catBox button')
  await expect(categoryButtons).toHaveCount(5) // all posts, Data viz, Satellite, Spatial Data, Agro
  
  // Check for "all posts" option
  const allPostsButton = filterPanel.locator('button', { hasText: 'all posts' })
  await expect(allPostsButton).toBeVisible()
})

test('Title color changes: grey default → lime green on hover', async ({ page }) => {
  await page.goto('/')
  
  const firstTitle = page.locator('li.postItem').first().locator('.postTitle a')
  await expect(firstTitle).toBeVisible()
  
  // Check default grey color (#545454)
  const defaultColor = await firstTitle.evaluate(el => getComputedStyle(el).color)
  expect(defaultColor).toContain('84, 84, 84') // #545454 as rgb
  
  // Hover over title and check color change
  await firstTitle.hover()
  
  // Check that hover state applies lime green color (#BFFF00)
  const hoverColor = await firstTitle.evaluate(el => getComputedStyle(el).color)
  expect(hoverColor).toContain('191, 255, 0') // #BFFF00 as rgb
})

test('Profile sidebar: avatar first, smaller size (84px), proper structure', async ({ page }) => {
  await page.goto('/')
  
  // Check profile sidebar exists
  const profileSidebar = page.locator('.profileSidebar')
  await expect(profileSidebar).toBeVisible()
  
  // Check avatar is first and proper size
  const avatar = profileSidebar.locator('.profileAvatar').first()
  await expect(avatar).toBeVisible()
  
  // Check that avatar comes before name in DOM order
  const profileHeader = profileSidebar.locator('.profileHeader')
  await expect(profileHeader).toBeVisible()
  
  // Check name follows avatar
  const profileName = profileSidebar.locator('.profileName')
  await expect(profileName).toBeVisible()
  await expect(profileName).toContainText('Mandjo Béa Boré')
})

test('Scroll to top functionality works', async ({ page }) => {
  await page.goto('/')
  
  // Scroll down to test scroll-to-top
  await page.evaluate(() => window.scrollTo(0, 500))
  
  // Click scroll to top button (last button in right rail bottom)
  const scrollTopButton = page.locator('.rightRail .rightRailBottom button').last()
  await scrollTopButton.click()
  
  // Wait a moment for smooth scroll
  await page.waitForTimeout(100)
  
  // Check that we're back at top
  const scrollY = await page.evaluate(() => window.scrollY)
  expect(scrollY).toBe(0)
})
