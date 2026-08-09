const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const results = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));

  async function verify(name) {
    await page.waitForSelector('.system-status-bar');
    const data = await page.locator('.system-status-bar').evaluate(element => {
      const rect = element.getBoundingClientRect();
      const topbar = document.querySelector('.topbar')?.getBoundingClientRect();
      return {
        count: document.querySelectorAll('.system-status-bar').length,
        top: rect.top,
        height: rect.height,
        width: rect.width,
        topbarTop: topbar?.top ?? null,
        time: element.querySelector('time')?.textContent
      };
    });
    results.push({ name, ...data });
  }

  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await verify('child-home');

  await page.locator('[data-action="nav"][data-screen="units"]').click();
  await verify('child-units');

  await page.locator('[data-action="nav"][data-screen="rewards"]').click();
  await verify('child-rewards');

  await page.locator('[data-action="open-star-bill"]').click();
  await verify('child-star-bill');

  await page.locator('[data-action="secondary-back"]').click();
  await page.locator('[data-action="nav"][data-screen="home"]').click();
  await page.locator('.home-task-row [data-action="open-task"]').first().click();
  await verify('child-task-detail');

  await page.locator('[data-action="secondary-back"]').click();
  await page.locator('[data-action="nav"][data-screen="units"]').click();
  await page.locator('[data-action="switch-role"]').click();
  await page.locator('#role-password').fill('123456');
  await page.locator('[data-action="confirm-role"]').click();
  await verify('parent-home');

  for (const screen of ['settings', 'report', 'parentSettings']) {
    await page.locator(`.bottom-nav [data-action="nav"][data-screen="${screen}"]`).click();
    await verify(`parent-${screen}`);
  }

  const issues = results.flatMap(item => {
    const itemIssues = [];
    if (item.count !== 1) itemIssues.push(`${item.name}: expected one status bar`);
    if (item.top !== 0) itemIssues.push(`${item.name}: status bar top is ${item.top}`);
    if (item.height !== 24) itemIssues.push(`${item.name}: status bar height is ${item.height}`);
    if (item.width !== 390) itemIssues.push(`${item.name}: status bar width is ${item.width}`);
    if (item.topbarTop !== 24) itemIssues.push(`${item.name}: topbar starts at ${item.topbarTop}`);
    if (item.time !== '9:41') itemIssues.push(`${item.name}: time is missing`);
    return itemIssues;
  });

  console.log(JSON.stringify({ results, errors, issues }, null, 2));
  await browser.close();
  process.exit(errors.length || issues.length ? 1 : 0);
})();
