const { chromium } = require('playwright');
const path = require('path');

const STORAGE_KEY = 'happy-english-phase2-lowfi-v1';

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

  await page.addInitScript(key => {
    if (sessionStorage.getItem('reward-capture-initialized')) return;
    localStorage.removeItem(key);
    sessionStorage.setItem('reward-capture-initialized', '1');
  }, STORAGE_KEY);
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.locator('[data-screen="rewards"]').click();
  await page.locator('.reward-empty-state').waitFor();
  await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
  await page.screenshot({ path: path.join(outputDir, 'preview-child-rewards-empty.png') });

  await page.evaluate(key => {
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    const rewards = [
      { id: 'reward-story', title: '今晚选睡前故事', note: '今晚由你挑一本喜欢的故事书', cost: 12, image: 'assets/reward-ui/storybook.svg' },
      { id: 'reward-game', title: '家庭游戏时间', note: '和爸爸妈妈一起玩喜欢的小游戏', cost: 20, image: 'assets/reward-ui/park.svg' },
      { id: 'reward-park', title: '周末一起去公园', note: '周末去公园散步、放风筝', cost: 60, image: 'assets/reward-ui/family-game.svg' },
      { id: 'reward-sticker', title: '彩虹贴纸', note: '选择一张喜欢的彩虹贴纸', cost: 25, image: 'assets/reward-ui/rainbow-sticker.svg' }
    ];
    const rewardRequests = [
      { id: 'request-game', rewardId: 'reward-game', status: '待审批' },
      { id: 'request-sticker', rewardId: 'reward-sticker', status: '已同意', reviewedAt: '2026-08-10T14:26:00+08:00' }
    ];
    saved.version = 5;
    saved.role = 'child';
    saved.screen = 'rewards';
    saved.stars = 36;
    saved.rewards = rewards;
    saved.rewardRequests = rewardRequests;
    const childId = saved.activeChildId || 'child-1';
    saved.learningByChildId ||= {};
    saved.learningByChildId[childId] = {
      ...(saved.learningByChildId[childId] || {}),
      stars: 36,
      rewards,
      rewardRequests
    };
    localStorage.setItem(key, JSON.stringify(saved));
  }, STORAGE_KEY);
  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('.reward-product-card').first().waitFor();
  await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));

  const checks = {
    starBalance: await page.locator('.reward-star-balance strong').textContent(),
    heroTitle: await page.locator('.reward-hero h1').textContent(),
    rewardCards: await page.locator('.reward-product-card').count(),
    availableCards: await page.locator('.reward-product-card.is-available').count(),
    pendingCards: await page.locator('.reward-product-card.is-pending').count(),
    insufficientCards: await page.locator('.reward-product-card.is-insufficient').count(),
    redeemedCards: await page.locator('.reward-product-card.is-redeemed').count(),
    firstCardHeight: Math.round(await page.locator('.reward-product-card').first().evaluate(element => element.getBoundingClientRect().height)),
    navItems: await page.locator('.happy-bottom-nav .nav-item').count(),
    rewardNavSelected: await page.locator('.happy-bottom-nav [data-screen="rewards"]').evaluate(element => element.classList.contains('active'))
  };

  await page.screenshot({ path: path.join(outputDir, 'preview-child-rewards-ui-viewport.png') });
  await page.screenshot({ path: path.join(outputDir, 'preview-child-rewards-ui-full.png'), fullPage: true });

  await page.locator('.reward-star-balance').click();
  checks.starBillOpened = await page.locator('.ledger-screen').isVisible();
  await page.locator('[data-action="secondary-back"]').click();
  checks.returnedToRewards = await page.locator('.reward-hero').isVisible();

  await page.locator('.reward-parent-entry').click();
  checks.passwordDialogOpened = await page.locator('.happy-role-dialog').isVisible();
  await page.locator('[data-action="close-overlay"]').click();

  await page.locator('.reward-product-card.is-available .reward-exchange-button').click();
  checks.availableBecamePending = await page.locator('.reward-product-card.is-pending').count() === 2;

  if (checks.starBalance?.trim() !== '36') issues.push(`unexpected star balance: ${checks.starBalance}`);
  if (checks.heroTitle?.trim() !== '奖品兑换') issues.push('reward hero title missing');
  if (checks.rewardCards !== 4) issues.push(`expected 4 reward cards, got ${checks.rewardCards}`);
  if (checks.availableCards !== 1 || checks.pendingCards !== 1 || checks.insufficientCards !== 1 || checks.redeemedCards !== 1) issues.push('reward states are incomplete');
  if (Math.abs(checks.firstCardHeight - 178) > 1) issues.push(`reward card height drifted: ${checks.firstCardHeight}px`);
  if (checks.navItems !== 3 || !checks.rewardNavSelected) issues.push('reward navigation state is incorrect');
  if (!checks.starBillOpened || !checks.returnedToRewards) issues.push('star bill return flow failed');
  if (!checks.passwordDialogOpened) issues.push('parent password dialog did not open');
  if (!checks.availableBecamePending) issues.push('reward request state did not update');

  console.log(JSON.stringify({ checks, issues }, null, 2));
  await browser.close();
  if (issues.length) process.exitCode = 1;
})();
