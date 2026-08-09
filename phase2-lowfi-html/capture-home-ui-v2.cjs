const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const outputDir = __dirname;
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
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.locator('.home-hero-card').waitFor();
  await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));

  const checks = {
    welcome: await page.locator('.home-top-welcome h1').textContent(),
    tagline: await page.locator('.home-hero-tagline').textContent(),
    starBalance: await page.locator('.home-star-balance strong').textContent(),
    heroImageWidth: await page.locator('.home-hero-card > img').evaluate(image => image.naturalWidth),
    heroHeight: await page.locator('.home-hero-card').evaluate(element => element.getBoundingClientRect().height),
    metricHeight: await page.locator('.home-metrics .metric').first().evaluate(element => element.getBoundingClientRect().height),
    taskRowHeight: await page.locator('.home-task-row').first().evaluate(element => element.getBoundingClientRect().height),
    taskRows: await page.locator('.home-task-row').count(),
    navItems: await page.locator('.home-bottom-nav .nav-item').count(),
    startButtonHeight: await page.locator('.home-start-button').evaluate(element => element.getBoundingClientRect().height),
    statusButtonMinHeight: Math.min(...await page.locator('.home-task-row .status').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().height)))
  };

  await page.screenshot({ path: path.join(outputDir, 'preview-child-home-ui-v2-viewport.png') });
  await page.screenshot({ path: path.join(outputDir, 'preview-child-home-ui-v2-full.png'), fullPage: true });

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(200);
  const bottomClearance = await page.evaluate(() => {
    const content = document.querySelector('.home-review-list');
    const nav = document.querySelector('.home-bottom-nav');
    return Math.round(nav.getBoundingClientRect().top - content.getBoundingClientRect().bottom);
  });
  checks.bottomClearance = bottomClearance;
  await page.screenshot({ path: path.join(outputDir, 'preview-child-home-ui-v2-bottom.png') });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);

  const taskScreenBefore = await page.locator('.home-task-row .status').first().click().then(() => page.locator('.secondary-topbar h1').textContent());
  await page.locator('[data-action="secondary-back"]').click();
  const returnedHome = await page.locator('.home-hero-card').isVisible();

  if (!checks.welcome?.toLowerCase().includes('happy')) issues.push('welcome name missing');
  if (!checks.tagline?.includes('开心学英语')) issues.push('hero tagline missing');
  if (!checks.starBalance) issues.push('star balance missing');
  if (checks.heroImageWidth <= 0) issues.push('hero image not loaded');
  if (Math.abs(checks.heroHeight - 253) > 1) issues.push(`hero height drifted: ${checks.heroHeight}px`);
  if (Math.abs(checks.metricHeight - 90) > 1) issues.push(`metric height drifted: ${checks.metricHeight}px`);
  if (Math.abs(checks.taskRowHeight - 68) > 1) issues.push(`task row height drifted: ${checks.taskRowHeight}px`);
  if (checks.taskRows < 3) issues.push(`expected at least 3 task rows, got ${checks.taskRows}`);
  if (checks.navItems !== 3) issues.push(`expected 3 nav items, got ${checks.navItems}`);
  if (checks.startButtonHeight < 48) issues.push('start button touch target too small');
  if (checks.statusButtonMinHeight < 36) issues.push('status button touch target too small');
  if (checks.bottomClearance < 8) issues.push(`bottom content is obscured by navigation: ${checks.bottomClearance}px`);
  if (!returnedHome) issues.push('task back navigation failed');

  console.log(JSON.stringify({ checks, taskScreenBefore, returnedHome, issues }, null, 2));
  await browser.close();
  if (issues.length) process.exitCode = 1;
})();
