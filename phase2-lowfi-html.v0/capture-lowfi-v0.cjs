const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const issues = [];

  page.on('console', message => {
    if (message.type() === 'error') issues.push(`console: ${message.text()}`);
  });
  page.on('pageerror', error => issues.push(`page: ${error.message}`));
  page.on('requestfailed', request => issues.push(`request: ${request.url()} ${request.failure()?.errorText || ''}`));

  await page.addInitScript(() => localStorage.removeItem('happy-english-phase2-lowfi-v1'));
  await page.goto('http://127.0.0.1:4174/', { waitUntil: 'networkidle' });
  await page.locator('.home-hero-card').waitFor();

  const checks = {
    taskRows: await page.locator('.home-task-row').count(),
    navItems: await page.locator('.bottom-nav .nav-item').count(),
    visibleHeroImages: await page.locator('.home-hero-card > img:visible').count(),
    startButtonHeight: await page.locator('.home-start-button').evaluate(element => element.getBoundingClientRect().height)
  };

  await page.screenshot({ path: path.join(__dirname, 'preview-lowfi-v0.png') });
  await page.screenshot({ path: path.join(__dirname, 'preview-lowfi-v0-full.png'), fullPage: true });

  await page.locator('.home-task-row .status').first().click();
  await page.locator('[data-action="secondary-back"]').click();
  checks.returnedHome = await page.locator('.home-hero-card').isVisible();

  if (checks.taskRows !== 3) issues.push(`expected 3 task rows, got ${checks.taskRows}`);
  if (checks.navItems !== 3) issues.push(`expected 3 nav items, got ${checks.navItems}`);
  if (checks.visibleHeroImages !== 0) issues.push('hero illustration should be hidden in low-fi mode');
  if (checks.startButtonHeight < 48) issues.push('start button touch target too small');
  if (!checks.returnedHome) issues.push('task return flow failed');

  console.log(JSON.stringify({ checks, issues }, null, 2));
  await browser.close();
  if (issues.length) process.exitCode = 1;
})();
