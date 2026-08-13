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
  const onboardingCopyVisible = await page.getByText('选择头像，再告诉我你的名字').isVisible();
  await page.locator('[name="childName"]').fill('HAPPY');
  await page.locator('#onboarding-form button[type="submit"]').click();
  await page.locator('.child-home-screen').waitFor();

  const homeVisible = await page.locator('.child-home-screen').isVisible();
  const childNamePersisted = await page.evaluate(() => {
    const raw = localStorage.getItem('happy-english-phase2-lowfi-v1');
    if (!raw) return false;
    const data = JSON.parse(raw);
    return data.version === 8 && data.children?.[0]?.name === 'HAPPY' && data.activeChildId === data.children[0].id;
  });

  await page.locator('[data-action="nav"][data-screen="rewards"]').click();
  await page.locator('.child-rewards-screen').waitFor();
  const emptyRewardsVisible = await page.locator('.reward-empty-state').isVisible();
  const emptyRewardsCopyVisible = await page.getByText('还没有奖品').isVisible();
  await page.locator('[data-action="open-star-bill"]').click();
  await page.locator('.ledger-screen').waitFor();
  const emptyLedgerVisible = await page.getByText('还没有星星记录').isVisible();

  await page.evaluate(() => {
    state.starLedger = [
      { id: 'test-income', childId: state.activeChildId, amount: 3, action: '完成学习任务', at: new Date().toISOString() },
      { id: 'test-expense', childId: state.activeChildId, amount: -2, action: '兑换奖品', at: new Date(Date.now() - 86400000).toISOString() }
    ];
    state.role = 'child';
    state.screen = 'starBill';
    render();
  });
  const ledgerGroupCount = await page.locator('.ledger-day-group').count();
  const ledgerGroupsVisible = ledgerGroupCount === 2;
  const ledgerWidth = await page.locator('.app-shell').evaluate(element => Math.round(element.getBoundingClientRect().width));

  const checks = {
    onboardingVisible,
    onboardingCopyVisible,
    homeVisible,
    childNamePersisted,
    emptyRewardsVisible,
    emptyRewardsCopyVisible,
    emptyLedgerVisible,
    ledgerGroupsVisible,
    ledgerGroupCount,
    ledgerWidthIs390: ledgerWidth === 390,
    runtimeIssues: issues
  };

  console.log(JSON.stringify(checks, null, 2));
  await browser.close();

  if (Object.entries(checks).some(([key, value]) => !['runtimeIssues', 'ledgerGroupCount'].includes(key) && value !== true) || issues.length) {
    process.exitCode = 1;
  }
})();
