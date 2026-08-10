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
    parentEntry: await page.locator('.home-parent-entry').textContent(),
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

  await page.locator('.home-parent-entry').click();
  const dialogBox = await page.locator('.happy-role-dialog').boundingBox();
  const passwordInputBox = await page.locator('#role-password').boundingBox();
  const dialogButtonCount = await page.locator('.happy-dialog-actions button').count();
  await page.screenshot({ path: path.join(outputDir, 'preview-child-parent-password-modal.png') });
  await page.locator('#role-password').fill('000000');
  await page.locator('[data-action="confirm-role"]').click();
  const passwordError = await page.locator('#password-error').textContent();
  await page.locator('[data-action="close-overlay"]').click();
  const modalClosed = await page.locator('.happy-role-dialog').count() === 0;

  checks.dialogWidth = Math.round(dialogBox?.width || 0);
  checks.dialogHeight = Math.round(dialogBox?.height || 0);
  checks.passwordInputHeight = Math.round(passwordInputBox?.height || 0);
  checks.dialogButtonCount = dialogButtonCount;

  const taskScreenBefore = await page.locator('.home-task-row .status').first().click().then(() => page.locator('.secondary-topbar h1').textContent());
  await page.locator('[data-action="secondary-back"]').click();
  const returnedHome = await page.locator('.home-hero-card').isVisible();

  if (!checks.welcome?.toLowerCase().includes('happy')) issues.push('welcome name missing');
  if (!checks.tagline?.includes('开心学英语')) issues.push('hero tagline missing');
  if (!checks.parentEntry?.includes('切换家长端')) issues.push('parent switch entry missing');
  if (checks.heroImageWidth <= 0) issues.push('hero image not loaded');
  if (Math.abs(checks.heroHeight - 253) > 1) issues.push(`hero height drifted: ${checks.heroHeight}px`);
  if (Math.abs(checks.metricHeight - 90) > 1) issues.push(`metric height drifted: ${checks.metricHeight}px`);
  if (Math.abs(checks.taskRowHeight - 68) > 1) issues.push(`task row height drifted: ${checks.taskRowHeight}px`);
  if (checks.taskRows < 3) issues.push(`expected at least 3 task rows, got ${checks.taskRows}`);
  if (checks.navItems !== 3) issues.push(`expected 3 nav items, got ${checks.navItems}`);
  if (checks.startButtonHeight < 48) issues.push('start button touch target too small');
  if (checks.statusButtonMinHeight < 36) issues.push('status button touch target too small');
  if (checks.bottomClearance < 8) issues.push(`bottom content is obscured by navigation: ${checks.bottomClearance}px`);
  if (Math.abs(checks.dialogWidth - 326) > 1) issues.push(`password dialog width drifted: ${checks.dialogWidth}px`);
  if (checks.dialogHeight < 286) issues.push(`password dialog height too small: ${checks.dialogHeight}px`);
  if (Math.abs(checks.passwordInputHeight - 58) > 1) issues.push(`password input height drifted: ${checks.passwordInputHeight}px`);
  if (checks.dialogButtonCount !== 2) issues.push(`expected 2 dialog buttons, got ${checks.dialogButtonCount}`);
  if (!passwordError?.includes('密码不正确')) issues.push('wrong password feedback missing');
  if (!modalClosed) issues.push('password dialog did not close');
  if (!returnedHome) issues.push('task back navigation failed');

  console.log(JSON.stringify({ checks, passwordError, modalClosed, taskScreenBefore, returnedHome, issues }, null, 2));
  await browser.close();
  if (issues.length) process.exitCode = 1;
})();
