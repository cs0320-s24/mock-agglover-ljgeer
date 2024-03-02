import { expect, test } from "@playwright/test";


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach( async ({ page }) => {
    // ... you'd put it here.
    // TODO: Is there something we need to do before every test case to avoid repeating code?
    await page.goto('http://localhost:8000/');
  })

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
test('on page load, i see a login button', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('after I type into the input box, its text changes', async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.getByLabel('Login').click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

test('on page load, i see a button', async ({ page }) => {
  // TODO WITH TA: Fill this in!
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Submit button')).toBeVisible()
});

test('after I click the button, its label increments', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Submit button')).toHaveText("Submit (0 submissions)")
  await page.getByLabel('Submit button').click()
  await expect(page.getByLabel('Submit button')).toHaveText("Submit (1 submissions)")
});

test('after I click the button, my command gets pushed', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('Awesome command');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('verbose').click()

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const historyContent = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(historyContent).toContain("Awesome command");
});

test('I can load simple.csv, then view it', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('load_file simple.csv');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('Command input').fill('view');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('verbose').click()

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const historyContent = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.textContent;
  });
  expect(historyContent).toContain("has been loaded");
  expect(historyContent).toContain("eleven");
});

test('I cannot load bogus.csv', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('load_file bogus.csv');
  await page.getByLabel('Submit button').click()

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const historyContent = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(historyContent).toContain("File not found.");
});