const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const issues = [];

  page.on('console', message => {
    if (message.type() === 'error') issues.push(`console: ${message.text()}`);
  });
  page.on('pageerror', error => issues.push(`page: ${error.message}`));
  page.on('requestfailed', request => issues.push(`request: ${request.url()} ${request.failure()?.errorText || ''}`));

  await page.addInitScript(() => localStorage.clear());
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });

  const onboardingVisible = await page.locator('#onboarding-form').isVisible();
  const zeroStateVisible = await page.getByText('0 颗星星').isVisible();
  await page.locator('[name="childName"]').fill('HAPPY');
  await page.locator('#onboarding-form button[type="submit"]').click();
  await page.locator('.child-home-screen').waitFor();

  const homeVisible = await page.locator('.child-home-screen').isVisible();
  const childNamePersisted = await page.evaluate(() => {
    const raw = localStorage.getItem('happy-english-phase2-lowfi-v1');
    if (!raw) return false;
    const data = JSON.parse(raw);
    return data.version === 6 && data.children?.[0]?.name === 'HAPPY' && data.activeChildId === data.children[0].id;
  });

  await page.locator('[data-action="nav"][data-screen="rewards"]').click();
  await page.locator('.child-rewards-screen').waitFor();
  const emptyRewardsVisible = await page.locator('.reward-empty-state').isVisible();

  const checks = {
    onboardingVisible,
    zeroStateVisible,
    homeVisible,
    childNamePersisted,
    emptyRewardsVisible,
    runtimeIssues: issues
  };

  console.log(JSON.stringify(checks, null, 2));
  await browser.close();

  if (Object.entries(checks).some(([key, value]) => key !== 'runtimeIssues' && value !== true) || issues.length) {
    process.exitCode = 1;
  }
})();
