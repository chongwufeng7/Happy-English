const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  });
  const page = await browser.newPage({ viewport: { width: 430, height: 916 }, deviceScaleFactor: 1 });
  const issues = [];
  page.on('console', message => { if (message.type() === 'error') issues.push(`console: ${message.text()}`); });
  page.on('pageerror', error => issues.push(`page: ${error.message}`));
  page.on('requestfailed', request => issues.push(`request: ${request.url()} ${request.failure()?.errorText || ''}`));
  await page.goto('http://127.0.0.1:4175/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
  const checks = {
    pageWidth: await page.locator('.home-page').evaluate(el => Math.round(el.getBoundingClientRect().width)),
    metricCards: await page.locator('.metric-card').count(),
    taskRows: await page.locator('.task-row').count(),
    navItems: await page.locator('.bottom-nav button').count(),
    images: await page.locator('img').count()
  };
  await page.screenshot({ path: path.join(__dirname, 'preview-figma-source.png'), fullPage: true });
  if (checks.pageWidth !== 430) issues.push(`expected width 430, got ${checks.pageWidth}`);
  if (checks.metricCards !== 2) issues.push(`expected 2 metric cards, got ${checks.metricCards}`);
  if (checks.taskRows !== 3) issues.push(`expected 3 task rows, got ${checks.taskRows}`);
  if (checks.navItems !== 4) issues.push(`expected 4 nav items, got ${checks.navItems}`);
  console.log(JSON.stringify({ checks, issues }, null, 2));
  await browser.close();
  if (issues.length) process.exitCode = 1;
})();
