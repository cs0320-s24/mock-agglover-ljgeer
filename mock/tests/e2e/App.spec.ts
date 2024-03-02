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
  // CHANGED
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

test('I cannot view without loading', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('view');
  await page.getByLabel('Submit button').click()

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const historyContent = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(historyContent).toContain("Please load a file first using load_file.");
});

test('I cannot search without loading', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('view');
  await page.getByLabel('Submit button').click()

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const historyContent = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(historyContent).toContain("Please load a file first using load_file.");
});

test('I can load simple.csv, then search it and find a result', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('load_file simple.csv');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('Command input').fill('search 0 one');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('verbose').click()

  const outputTableRow = await page.textContent('.repl-history tbody .table-cell:nth-child(2)');

  const expectedRow = "onetwothreefour";

  expect(outputTableRow).toContain(expectedRow);
});

test('I can load header.csv, then search it and find a result', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('load_file header.csv');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('Command input').fill('search header2 element');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('verbose').click()

  const outputTableRow = await page.textContent('.repl-history tbody .table-cell:nth-child(2)');

  const expectedRow = "notaheaderelement";

  expect(outputTableRow).toContain(expectedRow);
});

test('I can load simple.csv, then search it and not find a result', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('load_file simple.csv');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('Command input').fill('search 1 one');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('verbose').click()

  const outputTableRow = await page.textContent('.repl-history tbody .table-cell:nth-child(2)');

  const expectedRow = "Search failed: value not found";

  expect(outputTableRow).toContain(expectedRow);
});

test('I can load simple.csv, then view it, then load something else and view it', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('load_file simple.csv');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('Command input').fill('view');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('verbose').click()

  const outputTableRow = await page.textContent('.repl-history tbody .table-cell:nth-child(2)');

  const expectedRow = "onetwothreefourfivesixseveneightnineteneleventwelve";

  expect(outputTableRow).toContain(expectedRow);

  await page.getByLabel('Command input').fill('load_file header.csv');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('Command input').fill('view');
  await page.getByLabel('Submit button').click()

  const outputTableRow2 = await page.textContent('.repl-history tbody .table-cell:nth-child(2)');

  const expectedRow2 = "header1header2notaheaderelementanother not-headerfinal not-header";

  expect(outputTableRow2).toContain(expectedRow2);
});

test('I cannot load without specifiying a file path', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('load_file');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('verbose').click()

  const historyContent = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(historyContent).toContain(" Invalid argument length, correct usage: load_file [path to file]");
});

test('I cannot load with too many arguments', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('load_file idk idk');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('verbose').click()

  const historyContent = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(historyContent).toContain(" Invalid argument length, correct usage: load_file [path to file]");
});

test('I cannot view with too many arguments', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('view idk');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('verbose').click()

  const historyContent = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(historyContent).toContain("Incorrect usage: view has no arguments.");
});

test('I cannot search with invalid argument count', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('search idk idk idk');
  await page.getByLabel('Submit button').click()
  await page.getByLabel('verbose').click()

  const historyContent = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(historyContent).toContain("Invalid argument length, correct usage: search [header_id] [term]");
});

test('i cannot see a submit button if i dont log in', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  // Login button exists, but don't press it
  await expect(page.getByLabel('Login')).toBeVisible();
  await expect(page.getByLabel('Command input')).not.toBeVisible();
  await expect(page.getByLabel('Submit button')).not.toBeVisible();
});

test('if i log in, do some stuff, log out, i cannot press other buttons', async ({ page }) => {
  // Load and view a csv
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

  // Signing out should remove the buttons from interaction
  await page.getByLabel('Sign out').click();
  await expect(page.getByLabel('Login')).toBeVisible();
  await expect(page.getByLabel('Submit button')).not.toBeVisible();
  await expect(page.getByLabel('Command input')).not.toBeVisible();
  await expect(page.getByLabel('Submit button')).not.toBeVisible();
});