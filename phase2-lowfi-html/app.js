const STORAGE_KEY = 'happy-english-phase2-lowfi-v1';
const CHALLENGE_STAGE_COUNT = 6;

const units = [
  {
    id: 'u1',
    title: "Hello, I'm Andy",
    theme: '打招呼与介绍自己',
    goal: '能听懂简单问候，并尝试介绍自己',
    vocabulary: 'hello、hi、Andy（示例，待教材实物核对）',
    sentence: "Hello. I'm Andy.（示例）",
    tasks: [
      { id: 'u1-listen', title: '听一听', subtitle: '听辨 3 句问候', type: '听' },
      { id: 'u1-speak', title: '跟我说', subtitle: '跟读 3 句', type: '说' },
      { id: 'u1-read', title: '看图找一找', subtitle: '认读 3 个表达', type: '读' },
      { id: 'u1-write', title: '描一描', subtitle: '描写 1 个简单内容', type: '写' }
    ]
  },
  {
    id: 'u2',
    title: 'I have a new bag',
    theme: '书包与学习用品',
    goal: '能听懂并尝试表达自己的学习用品',
    vocabulary: 'bag 等（完整词表待教材实物核对）',
    sentence: 'I have a new bag.（示例）',
    tasks: [
      { id: 'u2-listen', title: '听音选图', subtitle: '听辨学习用品', type: '听' },
      { id: 'u2-speak', title: '跟我说', subtitle: '跟读 3 句', type: '说' },
      { id: 'u2-read', title: '图片配对', subtitle: '认读 4 个内容', type: '读' },
      { id: 'u2-review', title: '单元复习', subtitle: '轻松复习 3 题', type: '复习' }
    ]
  },
  {
    id: 'u3',
    title: 'Count from one to ten',
    theme: '数字 1–10',
    goal: '能听懂并尝试从 1 数到 10',
    vocabulary: 'one–ten（范围待教材实物核对）',
    sentence: 'Count from one to ten.（示例）',
    tasks: [
      { id: 'u3-listen', title: '听数字', subtitle: '听音选择数字', type: '听' },
      { id: 'u3-speak', title: '数一数', subtitle: '跟着数 1–10', type: '说' },
      { id: 'u3-read', title: '数字配对', subtitle: '数字与读音配对', type: '读' },
      { id: 'u3-review', title: '单元复习', subtitle: '轻松复习 3 题', type: '复习' }
    ]
  }
];

const rewards = [
  { id: 'r1', title: '今晚选择睡前故事', cost: 12 },
  { id: 'r2', title: '周末一起去公园', cost: 30 },
  { id: 'r3', title: '选择一次家庭游戏', cost: 20 }
];

const challengeUnits = {
  u1: {
    islandTitle: '新朋友岛',
    pageTitle: '新朋友冒险岛',
    intro: '和奶牛猫一起学习问候、介绍自己，并完成一段新朋友对话。',
    badge: '新朋友徽章',
    badgeText: '你已经能够完成简单问候和自我介绍。',
    scene: '清晨、森林与朋友派对',
    stages: [
      { id: 1, title: '清晨码头', subtitle: '听声音，找到正确问候', kind: 'choice', story: '太阳升起来了，鹦鹉飞来和你打招呼。听一听，它说的是什么？', audio: 'Good morning!', choices: [['Goodbye!', false], ['Good morning!', true], ['Thank you!', false]], reviewTaskId: 'u1-listen' },
      { id: 2, title: '名字森林', subtitle: '听介绍，把姓名牌交给正确角色', kind: 'choice', story: '三个新朋友都举起了姓名牌。哪一位说的是“你好，我是 Andy”？', audio: "Hello, I'm Andy.", choices: [["A · Hi, I'm Amy.", false], ["B · Hello, I'm Andy.", true], ['C · Good morning!', false]], reviewTaskId: 'u1-listen' },
      { id: 3, title: '句子石桥', subtitle: '按顺序铺好自我介绍的词块', kind: 'sequence', story: '奶牛猫搭起一座句子桥。按正确顺序点击词块，介绍你自己。', target: ['Hello,', "I'm", '{name}.'], success: "句子桥搭好啦：Hello, I'm {name}.", reviewTaskId: 'u1-read' },
      { id: 4, title: '回声山谷', subtitle: '录下自己的名字并听一听', kind: 'record', story: '山谷只有听到你的声音才会打开出口。听完问题后，录下自己的回答。', audio: "What's your name?", prompt: 'My name is {name}.', success: '回声山谷听见你啦，可以继续前进。', reviewTaskId: 'u1-speak' },
      { id: 5, title: '朋友小屋', subtitle: '完成三轮见面对话', kind: 'dialogue', story: '完成三轮对话，新朋友派对的大门就会打开。', completeText: '三位新朋友都认识你啦！', turns: [
        { speaker: '鹦鹉', line: 'Hello!', choices: [['Hello!', true], ['Goodbye!', false]] },
        { speaker: '变色龙', line: "What's your name?", choices: [['My name is {name}.', true], ['Thank you.', false]] },
        { speaker: '奶牛猫', line: 'Good morning, {name}!', choices: [['Good morning!', true], ['Goodbye!', false]] }
      ], reviewTaskId: 'u1-speak' },
      { id: 6, title: '友谊派对', subtitle: '完成整座岛的综合终章', kind: 'dialogue', story: '最后完成三项派对任务，整座新朋友岛就会亮起来。', completeText: '派对开始啦！新朋友岛全部点亮！', turns: [
        { speaker: '派对入口', line: '太阳刚升起来，应该怎样问候？', choices: [['Good morning!', true], ['Goodbye!', false]] },
        { speaker: '签到台', line: "What's your name?", choices: [['My name is {name}.', true], ['Thank you.', false]] },
        { speaker: '派对舞台', line: '向所有新朋友介绍自己吧！', choices: [["Hello, I'm {name}.", true], ['Goodbye!', false]] }
      ], reviewTaskId: 'u1-read' }
    ]
  },
  u2: {
    islandTitle: '书包宝藏岛',
    pageTitle: '书包宝藏岛',
    intro: '和紫色变色龙一起认识书包与学习用品，收集物品并装好自己的新书包。',
    badge: '书包小管家徽章',
    badgeText: '你已经能够听辨学习用品，并表达自己拥有的物品。',
    scene: '文具港、收纳森林与宝藏教室',
    stages: [
      { id: 1, title: '文具港口', subtitle: '听单词，找到正确学习用品', kind: 'choice', story: '宝箱里藏着三件学习用品。听一听鹦鹉说的是哪一件。', audio: 'bag', choices: [['book · 书', false], ['bag · 书包', true], ['pencil · 铅笔', false]], reviewTaskId: 'u2-listen' },
      { id: 2, title: '新书包洞穴', subtitle: '听句子，选出正确物品', kind: 'choice', story: '变色龙找到了一件新物品。听句子，帮它拿到正确的宝藏。', audio: 'I have a new bag.', choices: [['新书包', true], ['一本书', false], ['一支铅笔', false]], reviewTaskId: 'u2-listen' },
      { id: 3, title: '收纳吊桥', subtitle: '按顺序拼好拥有物品的句子', kind: 'sequence', story: '把词块放进正确的收纳格，告诉奶牛猫你有什么。', target: ['I', 'have', 'a new bag.'], success: '收纳完成：I have a new bag.', reviewTaskId: 'u2-read' },
      { id: 4, title: '文具回声谷', subtitle: '录下自己的书包句子', kind: 'record', story: '对着山谷说出你的新书包，声音钥匙会打开下一扇门。', audio: 'What do you have?', prompt: 'I have a new bag.', success: '山谷收到了你的书包介绍，可以继续寻宝。', reviewTaskId: 'u2-speak' },
      { id: 5, title: '宝藏教室', subtitle: '完成三轮学习用品对话', kind: 'dialogue', story: '帮助三位角色认领学习用品，完成教室里的对话。', completeText: '所有学习用品都找到主人啦！', turns: [
        { speaker: '鹦鹉', line: 'What do you have?', choices: [['I have a bag.', true], ['Good morning!', false]] },
        { speaker: '变色龙', line: 'Is it a book?', choices: [['Yes, a book.', true], ['My name is HAPPY.', false]] },
        { speaker: '奶牛猫', line: 'Show me your pencil.', choices: [['Here is my pencil.', true], ['Goodbye!', false]] }
      ], reviewTaskId: 'u2-speak' },
      { id: 6, title: '书包宝藏库', subtitle: '完成整座岛的综合收纳任务', kind: 'dialogue', story: '完成听、认、说三项宝藏任务，把学习用品装进新书包。', completeText: '新书包整理完成，宝藏库亮起来啦！', turns: [
        { speaker: '听音门', line: '听到“bag”应该选择什么？', choices: [['书包', true], ['数字三', false]] },
        { speaker: '认读门', line: '哪一句表示“我有一本书”？', choices: [['I have a book.', true], ['Good morning!', false]] },
        { speaker: '表达门', line: '告诉大家你有一个新书包。', choices: [['I have a new bag.', true], ['My name is Andy.', false]] }
      ], reviewTaskId: 'u2-review' }
    ]
  },
  u3: {
    islandTitle: '数字火车岛',
    pageTitle: '数字火车岛',
    intro: '和鹦鹉列车长一起听数字、数物品、排顺序，让数字火车从1开到10。',
    badge: '数字列车长徽章',
    badgeText: '你已经能够听辨并尝试说出1至10的英文数字。',
    scene: '数字车站、星星隧道与终点庆典',
    stages: [
      { id: 1, title: '数字车站', subtitle: '听数字，选择正确车厢', kind: 'choice', story: '鹦鹉列车长喊出了一个数字。听一听，哪节车厢应该出发？', audio: 'three', choices: [['2 · two', false], ['3 · three', true], ['5 · five', false]], reviewTaskId: 'u3-listen' },
      { id: 2, title: '星星隧道', subtitle: '数一数，选择正确数量', kind: 'choice', story: '隧道里亮起了四颗星星：★ ★ ★ ★。应该选择哪个数字？', choices: [['three', false], ['four', true], ['six', false]], reviewTaskId: 'u3-read' },
      { id: 3, title: '车厢排序桥', subtitle: '按顺序连接数字词块', kind: 'sequence', story: '三节车厢顺序乱了。按从小到大的顺序把它们接起来。', target: ['one, two,', 'three, four,', 'five.'], success: '车厢连接成功：one, two, three, four, five.', reviewTaskId: 'u3-read' },
      { id: 4, title: '报数广播站', subtitle: '录下从1数到10的声音', kind: 'record', story: '请你担任小列车长，对着广播从1数到10。', audio: 'Count from one to ten.', prompt: 'One, two, three, four, five, six, seven, eight, nine, ten.', success: '广播清楚响亮，数字火车可以继续前进。', reviewTaskId: 'u3-speak' },
      { id: 5, title: '丢失的数字', subtitle: '完成三轮缺失数字挑战', kind: 'dialogue', story: '三节车厢的号码不见了，找出每组中缺少的数字。', completeText: '所有丢失的数字都找回来啦！', turns: [
        { speaker: '1号车厢', line: 'one, two, ___', choices: [['three', true], ['five', false]] },
        { speaker: '2号车厢', line: 'four, five, ___', choices: [['six', true], ['two', false]] },
        { speaker: '3号车厢', line: 'eight, nine, ___', choices: [['ten', true], ['seven', false]] }
      ], reviewTaskId: 'u3-read' },
      { id: 6, title: '终点庆典', subtitle: '完成数字火车综合终章', kind: 'dialogue', story: '完成听、数、说三项任务，让所有车厢一起抵达终点。', completeText: '数字火车顺利到站，终点烟花亮起来啦！', turns: [
        { speaker: '听音检票口', line: '听到“seven”应该选择什么？', choices: [['7', true], ['4', false]] },
        { speaker: '数数月台', line: '★ ★ ★ ★ ★ 一共有多少颗星？', choices: [['five', true], ['nine', false]] },
        { speaker: '列车长', line: '从8继续数到10。', choices: [['eight, nine, ten', true], ['one, two, three', false]] }
      ], reviewTaskId: 'u3-review' }
    ]
  }
};

const challengeUnitOrder = ['u1', 'u2', 'u3'];

function freshState() {
  return {
    version: 3,
    role: 'child',
    screen: 'home',
    currentUnitId: 'u1',
    selectedUnitId: 'u1',
    selectedTaskId: null,
    starBillReturnScreen: 'home',
    activeChildId: 'child-1',
    children: [{ id: 'child-1', name: 'HAPPY', avatar: '', createdAt: new Date().toISOString() }],
    learningByChildId: {
      'child-1': {
        currentUnitId: 'u1', stars: 36, todayStars: 0, completedTaskIds: [], todayCompletedIds: [], todayExperiencedTaskIds: [],
        reviewItems: [], rewardRequests: [], starLedger: [], challengeProgress: { u1: 0, u2: 0, u3: 0 }, wrongAnswerStreaks: {}, dailyPlan: null, activeDate: null
      }
    },
    parentSettingsTab: 'child',
    stars: 36,
    todayStars: 0,
    completedTaskIds: [],
    todayCompletedIds: [],
    todayExperiencedTaskIds: [],
    dailyPlan: null,
    activeDate: null,
    reviewItems: [],
    rewardRequests: [],
    starLedger: [{ id: `star-${Date.now()}`, childId: 'child-1', amount: 36, action: '初始星星', at: new Date().toISOString() }],
    challengeProgress: { u1: 0, u2: 0, u3: 0 },
    wrongAnswerStreaks: {},
    challengeReplayMode: false,
    challengeReplayUnitId: null,
    challengeReplayProgress: 0,
    selectedChallengeStage: 1,
    challengeDraft: [],
    challengeDialogueStep: 0,
    settings: {
      dailyTaskCount: 3,
      dailyMinutes: 12,
      reminder: '19:30',
      assignedReviewUnitIds: [],
      assignedReviewTaskIds: []
    }
  };
}

function loadState() {
  try {
    const base = freshState();
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const isLegacyPlan = Number(saved.version || 1) < 2;
    const savedSettings = saved.settings || {};
    const legacyDefaultReviewUnits = isLegacyPlan
      && Array.isArray(savedSettings.assignedReviewUnitIds)
      && savedSettings.assignedReviewUnitIds.length === 1
      && savedSettings.assignedReviewUnitIds[0] === 'u1';
    const importedBalance = Number(saved.stars ?? base.stars);
    const children = Array.isArray(saved.children) && saved.children.length ? saved.children : base.children;
    const activeChildId = children.some(child => child.id === saved.activeChildId) ? saved.activeChildId : children[0].id;
    const migrateStarLedger = (items, childId) => Array.isArray(items)
      ? items.map(item => ({ ...item, childId: item.childId || childId }))
      : [];
    const legacyLearningByChildId = {
      [activeChildId]: {
        currentUnitId: saved.currentUnitId || base.currentUnitId,
        stars: importedBalance,
        todayStars: saved.todayStars || 0,
        completedTaskIds: saved.completedTaskIds || [],
        todayCompletedIds: saved.todayCompletedIds || [],
        todayExperiencedTaskIds: saved.todayExperiencedTaskIds || [],
        reviewItems: saved.reviewItems || [],
        rewardRequests: saved.rewardRequests || [],
        starLedger: migrateStarLedger(saved.starLedger, activeChildId),
        challengeProgress: { ...base.challengeProgress, ...(saved.challengeProgress || {}) },
        wrongAnswerStreaks: { ...(saved.wrongAnswerStreaks || {}) },
        dailyPlan: saved.dailyPlan || null,
        activeDate: saved.activeDate || null
      }
    };
    const learningByChildId = Object.fromEntries(
      Object.entries(saved.learningByChildId || legacyLearningByChildId).map(([childId, learning]) => [
        childId,
        { ...learning, starLedger: migrateStarLedger(learning?.starLedger, childId) }
      ])
    );
    return {
      ...base,
      ...saved,
      version: base.version,
      settings: {
        ...base.settings,
        ...savedSettings,
        assignedReviewUnitIds: legacyDefaultReviewUnits ? [] : (savedSettings.assignedReviewUnitIds || base.settings.assignedReviewUnitIds)
      },
      challengeProgress: { ...base.challengeProgress, ...(saved.challengeProgress || {}) },
      children,
      activeChildId,
      learningByChildId,
      starLedger: Array.isArray(saved.starLedger)
        ? migrateStarLedger(saved.starLedger, activeChildId)
        : [{ id: `star-${Date.now()}`, childId: activeChildId, amount: importedBalance, action: '历史星星余额', at: new Date().toISOString() }]
    };
  } catch {
    return freshState();
  }
}

function challengeDoneCount(unitId = 'u1') {
  return Number(state.challengeProgress[unitId] || 0);
}

function selectedChallengeUnitId() {
  return challengeUnits[state.selectedUnitId] ? state.selectedUnitId : 'u1';
}

function selectedChallengeConfig() {
  return challengeUnits[selectedChallengeUnitId()];
}

function challengeStagesFor(unitId = selectedChallengeUnitId()) {
  return challengeUnits[unitId]?.stages || challengeUnits.u1.stages;
}

function challengeUnitUnlocked(unitId) {
  const index = challengeUnitOrder.indexOf(unitId);
  return index <= 0 || challengeDoneCount(challengeUnitOrder[index - 1]) >= CHALLENGE_STAGE_COUNT;
}

function isReplayingUnit(unitId = selectedChallengeUnitId()) {
  return state.challengeReplayMode && state.challengeReplayUnitId === unitId;
}

function currentChallengeRunProgress(unitId = selectedChallengeUnitId()) {
  return isReplayingUnit(unitId)
    ? Number(state.challengeReplayProgress || 0)
    : challengeDoneCount(unitId);
}

function openChallengeStage(stageId) {
  const unitId = selectedChallengeUnitId();
  if (!challengeUnitUnlocked(unitId)) return showToast('先完成前一座主题岛，就能开启这里');
  const progress = currentChallengeRunProgress(unitId);
  const stage = Number(stageId);
  if (stage <= progress) return showToast('这一关已经通过，请继续向前冒险');
  if (stage !== progress + 1) return showToast('先完成前一关，就能继续前进');
  cleanupChallengeRecording();
  state.selectedChallengeStage = stage;
  state.challengeDraft = [];
  state.challengeDialogueStep = 0;
  state.screen = 'challengeStage';
  save();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function restartChallengeUnit() {
  const unitId = selectedChallengeUnitId();
  const config = challengeUnits[unitId];
  if (challengeDoneCount(unitId) < CHALLENGE_STAGE_COUNT) return;
  state.challengeReplayMode = true;
  state.challengeReplayUnitId = unitId;
  state.challengeReplayProgress = 0;
  state.selectedChallengeStage = 1;
  state.challengeDraft = [];
  state.challengeDialogueStep = 0;
  state.screen = 'unit';
  save();
  showToast(`重新开始${config.islandTitle}，本次不再增加星星`);
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeChallengeStage(stageId) {
  cleanupChallengeRecording();
  const unitId = selectedChallengeUnitId();
  const config = challengeUnits[unitId];
  const stage = Number(stageId);
  const wasReplay = isReplayingUnit(unitId);
  if (wasReplay) {
    state.challengeReplayProgress = stage;
    if (stage === CHALLENGE_STAGE_COUNT) {
      state.challengeReplayMode = false;
      state.challengeReplayUnitId = null;
    }
  } else {
    const previous = challengeDoneCount(unitId);
    if (stage > previous) {
      state.challengeProgress[unitId] = stage;
      const rewardAmount = stage === CHALLENGE_STAGE_COUNT ? 3 : 2;
      const stageName = challengeStagesFor(unitId).find(item => item.id === stage)?.title || `第 ${stage} 关`;
      recordStarChange(rewardAmount, `${config.islandTitle}：通过${stageName}`);
    }
  }
  state.screen = 'unit';
  save();
  const replayMessage = stage === CHALLENGE_STAGE_COUNT ? `再次完成${config.islandTitle}！` : '通过一关，继续向前冒险';
  const firstMessage = stage === CHALLENGE_STAGE_COUNT ? `主题闯关完成，获得${config.badge}和 3 颗星星！` : '通过一关，获得 2 颗星星';
  showToast(wasReplay ? replayMessage : firstMessage);
  render();
}

let state = loadState();
let toastTimer = null;
let challengeRecorder = null;
let challengeStream = null;
let challengeChunks = [];
let challengeAudioUrl = null;
let pendingChildAvatar = null;

const app = document.getElementById('app');
const overlayRoot = document.getElementById('overlay-root');
const toast = document.getElementById('toast');

function save() {
  syncActiveChildLearning();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function activeChild() {
  return state.children.find(child => child.id === state.activeChildId) || state.children[0];
}

function activeChildName() {
  return activeChild()?.name?.trim() || 'HAPPY';
}

function syncActiveChildLearning() {
  const childId = state.activeChildId;
  if (!childId) return;
  state.learningByChildId ||= {};
  state.learningByChildId[childId] = {
    currentUnitId: state.currentUnitId,
    stars: state.stars,
    todayStars: state.todayStars,
    completedTaskIds: [...state.completedTaskIds],
    todayCompletedIds: [...state.todayCompletedIds],
    todayExperiencedTaskIds: [...(state.todayExperiencedTaskIds || [])],
    reviewItems: state.reviewItems.map(item => ({ ...item })),
    rewardRequests: state.rewardRequests.map(item => ({ ...item })),
    starLedger: state.starLedger.map(item => ({ ...item })),
    challengeProgress: { ...state.challengeProgress },
    wrongAnswerStreaks: { ...(state.wrongAnswerStreaks || {}) },
    dailyPlan: state.dailyPlan ? {
      ...state.dailyPlan,
      newTaskIds: [...state.dailyPlan.newTaskIds],
      reviewTaskIds: [...state.dailyPlan.reviewTaskIds]
    } : null,
    activeDate: state.activeDate,
    settings: { ...state.settings, assignedReviewUnitIds: [...state.settings.assignedReviewUnitIds], assignedReviewTaskIds: [...state.settings.assignedReviewTaskIds] },
    updatedAt: new Date().toISOString()
  };
}

function recordStarChange(amount, action) {
  const value = Number(amount);
  if (!value) return;
  state.stars += value;
  state.starLedger.unshift({
    id: `star-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    childId: state.activeChildId,
    amount: value,
    action,
    at: new Date().toISOString()
  });
}

function formatLedgerTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '时间未知';
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
  }).format(date);
}

function isToday(value) {
  const date = new Date(value);
  const today = new Date();
  return !Number.isNaN(date.getTime())
    && date.getFullYear() === today.getFullYear()
    && date.getMonth() === today.getMonth()
    && date.getDate() === today.getDate();
}

function cleanupChallengeRecording() {
  if (challengeRecorder?.state === 'recording') challengeRecorder.stop();
  challengeStream?.getTracks().forEach(track => track.stop());
  challengeStream = null;
  challengeRecorder = null;
  challengeChunks = [];
  if (challengeAudioUrl) URL.revokeObjectURL(challengeAudioUrl);
  challengeAudioUrl = null;
}

async function startChallengeRecording() {
  const feedback = document.getElementById('challenge-feedback');
  try {
    cleanupChallengeRecording();
    challengeStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    challengeRecorder = new MediaRecorder(challengeStream);
    challengeChunks = [];
    challengeRecorder.addEventListener('dataavailable', event => {
      if (event.data.size) challengeChunks.push(event.data);
    });
    challengeRecorder.addEventListener('stop', () => {
      const blob = new Blob(challengeChunks, { type: challengeRecorder?.mimeType || 'audio/webm' });
      challengeAudioUrl = URL.createObjectURL(blob);
      challengeStream?.getTracks().forEach(track => track.stop());
      challengeStream = null;
      document.getElementById('record-start')?.removeAttribute('disabled');
      document.getElementById('record-stop')?.setAttribute('disabled', '');
      document.getElementById('record-play')?.removeAttribute('disabled');
      document.getElementById('record-reset')?.removeAttribute('disabled');
      document.getElementById('record-confirm')?.removeAttribute('disabled');
      if (feedback) {
        feedback.className = 'challenge-feedback good';
        feedback.textContent = '录音完成！先听听自己的声音，也可以重新录音。';
      }
    });
    challengeRecorder.start();
    document.getElementById('record-start')?.setAttribute('disabled', '');
    document.getElementById('record-stop')?.removeAttribute('disabled');
    if (feedback) {
      feedback.className = 'challenge-feedback';
      feedback.textContent = `正在录音，请说：My name is ${activeChildName()}.`;
    }
  } catch {
    if (feedback) {
      feedback.className = 'challenge-feedback bad';
      feedback.textContent = '无法使用麦克风，请允许浏览器录音权限，并检查手机麦克风或耳机。';
    }
  }
}

function stopChallengeRecording() {
  if (challengeRecorder?.state === 'recording') challengeRecorder.stop();
}

function playChallengeRecording() {
  if (!challengeAudioUrl) return showToast('请先录下自己的声音');
  new Audio(challengeAudioUrl).play().catch(() => showToast('录音暂时无法播放，请重新录制'));
}

function resetChallengeRecording() {
  cleanupChallengeRecording();
  document.getElementById('record-start')?.removeAttribute('disabled');
  ['record-stop', 'record-play', 'record-reset', 'record-confirm'].forEach(id => document.getElementById(id)?.setAttribute('disabled', ''));
  const feedback = document.getElementById('challenge-feedback');
  if (feedback) {
    feedback.className = 'challenge-feedback';
    feedback.textContent = '准备好了，再录一次吧。';
  }
}

function compressAvatarFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('error', () => reject(new Error('read-failed')));
    reader.addEventListener('load', () => {
      const image = new Image();
      image.addEventListener('error', () => reject(new Error('image-failed')));
      image.addEventListener('load', () => {
        const maxEdge = 512;
        const scale = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight));
        const width = Math.max(1, Math.round(image.naturalWidth * scale));
        const height = Math.max(1, Math.round(image.naturalHeight * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL('image/webp', 0.78));
      });
      image.src = String(reader.result || '');
    });
    reader.readAsDataURL(file);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function taskById(id) {
  for (const unit of units) {
    const task = unit.tasks.find(item => item.id === id);
    if (task) return { ...task, unit };
  }
  return null;
}

function unitIsComplete(unit) {
  return unit.tasks.every(task => state.completedTaskIds.includes(task.id));
}

function unlockedUnitIds() {
  const unlocked = ['u1'];
  if (unitIsComplete(units[0])) unlocked.push('u2');
  if (unitIsComplete(units[1])) unlocked.push('u3');
  return unlocked;
}

function currentUnit() {
  return units.find(unit => unit.id === state.currentUnitId) || units[0];
}

function localDateKey(date = new Date()) {
  const pad = value => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function buildDailyPlan(date = localDateKey()) {
  const totalTaskCount = Math.max(1, Number(state.settings.dailyTaskCount) || 3);
  const sourceRank = { '家长指定': 0, '连续答错3次': 1, '孩子主动标记': 2 };
  const pendingReviewIds = state.reviewItems
    .filter(item => item.status === '待复习')
    .sort((a, b) => (sourceRank[a.source] ?? 3) - (sourceRank[b.source] ?? 3))
    .map(item => item.taskId);
  const assignedUnitTaskIds = state.settings.assignedReviewUnitIds
    .flatMap(unitId => units.find(unit => unit.id === unitId)?.tasks.map(task => task.id) || []);
  const reviewCandidateIds = [...new Set([
    ...state.settings.assignedReviewTaskIds,
    ...pendingReviewIds,
    ...assignedUnitTaskIds
  ])].filter(taskId => taskById(taskId) && !state.todayCompletedIds.includes(taskId));
  const reviewTaskIds = reviewCandidateIds.length ? reviewCandidateIds.slice(0, 1) : [];
  const newTaskIds = currentUnit().tasks
    .filter(task => !state.completedTaskIds.includes(task.id) && !reviewTaskIds.includes(task.id))
    .slice(0, Math.max(0, totalTaskCount - reviewTaskIds.length))
    .map(task => task.id);
  return {
    date,
    newTaskIds,
    reviewTaskIds,
    generatedAt: new Date().toISOString(),
    taskLimit: totalTaskCount
  };
}

function ensureDailyPlan() {
  const today = localDateKey();
  if (state.dailyPlan?.date === today) return false;
  if (state.activeDate !== today) {
    state.todayCompletedIds = [];
    state.todayStars = 0;
    state.todayExperiencedTaskIds = [];
  }
  state.activeDate = today;
  state.dailyPlan = buildDailyPlan(today);
  return true;
}

function todayTasks() {
  ensureDailyPlan();
  return state.dailyPlan.newTaskIds.map(taskById).filter(Boolean);
}

function todayReviewTasks() {
  ensureDailyPlan();
  return state.dailyPlan.reviewTaskIds.map(taskById).filter(Boolean);
}

function todayPlanTasks() {
  return [...todayReviewTasks(), ...todayTasks()];
}

function navTo(screen) {
  state.screen = screen;
  state.selectedTaskId = null;
  save();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openTask(taskId) {
  state.selectedTaskId = taskId;
  state.screen = 'task';
  save();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeTask(taskId) {
  const info = taskById(taskId);
  if (!state.todayExperiencedTaskIds?.includes(taskId)) {
    showToast('请先完成一次任务体验');
    return;
  }
  if (!state.todayCompletedIds.includes(taskId)) {
    state.todayCompletedIds.push(taskId);
    recordStarChange(3, `完成今日任务：${info?.title || '学习任务'}`);
    state.todayStars += 3;
  }
  if (!state.completedTaskIds.includes(taskId)) {
    state.completedTaskIds.push(taskId);
  }
  state.reviewItems.forEach(item => {
    if (item.taskId === taskId && item.status === '待复习') {
      item.status = '已复习';
      item.completedAt = new Date().toISOString();
    }
  });
  state.settings.assignedReviewTaskIds = state.settings.assignedReviewTaskIds.filter(id => id !== taskId);
  if (info && unitIsComplete(info.unit)) {
    const next = units[units.findIndex(unit => unit.id === info.unit.id) + 1];
    if (next) state.currentUnitId = next.id;
  }
  save();
  showToast('任务完成，获得 3 颗星星');
  navTo('home');
}

function experienceTask(taskId) {
  if (!taskById(taskId)) return;
  state.todayExperiencedTaskIds ||= [];
  if (!state.todayExperiencedTaskIds.includes(taskId)) state.todayExperiencedTaskIds.push(taskId);
  save();
  render();
  showToast('体验完成，现在可以提交任务');
}

function ensureReviewItem(taskId, source) {
  const existing = state.reviewItems.find(item => item.taskId === taskId && item.status === '待复习');
  if (existing) return false;
  state.reviewItems.push({
    id: `review-${Date.now()}-${taskId}`,
    taskId,
    status: '待复习',
    source,
    createdAt: new Date().toISOString()
  });
  state.dailyPlan = null;
  return true;
}

function addReview(taskId) {
  ensureReviewItem(taskId, '孩子主动标记');
  save();
  showToast('已标记“还不熟”，加入今日复习');
  render();
}

function removeChildReview(taskId) {
  const before = state.reviewItems.length;
  state.reviewItems = state.reviewItems.filter(item => !(
    item.taskId === taskId
    && item.status === '待复习'
    && item.source === '孩子主动标记'
  ));
  if (state.reviewItems.length === before) return;
  state.dailyPlan = null;
  save();
  render();
  showToast('已撤销“还不熟”标记');
}

function challengeWrongKey() {
  return `challenge-${selectedChallengeUnitId()}-stage-${Number(state.selectedChallengeStage || 1)}`;
}

function currentChallengeReviewTaskId() {
  const stage = Number(state.selectedChallengeStage || 1);
  return challengeStagesFor().find(item => item.id === stage)?.reviewTaskId || `${selectedChallengeUnitId()}-listen`;
}

function registerChallengeWrongAnswer() {
  state.wrongAnswerStreaks ||= {};
  const key = challengeWrongKey();
  const nextCount = Number(state.wrongAnswerStreaks[key] || 0) + 1;
  if (nextCount >= 3) {
    state.wrongAnswerStreaks[key] = 0;
    const added = ensureReviewItem(currentChallengeReviewTaskId(), '连续答错3次');
    save();
    return { count: 3, reachedLimit: true, added };
  }
  state.wrongAnswerStreaks[key] = nextCount;
  save();
  return { count: nextCount, reachedLimit: false, added: false };
}

function resetChallengeWrongAnswer() {
  state.wrongAnswerStreaks ||= {};
  state.wrongAnswerStreaks[challengeWrongKey()] = 0;
  save();
}

function systemStatusBar() {
  return `
    <div class="system-status-bar" aria-label="Android 状态栏">
      <time datetime="09:41">9:41</time>
      <svg class="system-status-icons" width="78" height="16" viewBox="0 0 78 16" fill="none" aria-hidden="true">
        <g fill="currentColor">
          <rect x="0" y="11" width="3" height="4" rx="1"></rect>
          <rect x="5" y="8" width="3" height="7" rx="1"></rect>
          <rect x="10" y="5" width="3" height="10" rx="1"></rect>
          <rect x="15" y="2" width="3" height="13" rx="1"></rect>
          <path d="M28 6.8c4.1-4 10.7-4 14.8 0l-2 2c-3-2.9-7.8-2.9-10.8 0l-2-2Zm4 4c2-1.9 5-1.9 7 0l-3.5 3.5L32 10.8Z"></path>
          <rect x="52" y="3" width="22" height="11" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"></rect>
          <rect x="54.5" y="5.5" width="15" height="6" rx="1.5"></rect>
          <rect x="75" y="6" width="3" height="5" rx="1"></rect>
        </g>
      </svg>
    </div>`;
}

function header(title) {
  if (state.role === 'child') {
    const primaryScreens = ['home', 'units', 'rewards'];
    const isPrimary = primaryScreens.includes(state.screen);
    const backTargets = {
      unit: 'units',
      challengeStage: 'unit',
      task: 'home',
      starBill: state.starBillReturnScreen || 'home'
    };
    if (!isPrimary) {
      return `
        <header class="topbar child-topbar secondary-topbar">
          <button class="topbar-back" data-action="secondary-back" data-screen="${backTargets[state.screen] || 'home'}" aria-label="返回">← 返回</button>
          <h1>${title}</h1>
          <span class="topbar-spacer" aria-hidden="true"></span>
        </header>`;
    }
    if (state.screen === 'home') {
      const homeDisplayName = activeChildName().toLowerCase() === 'happy' ? 'Happy' : activeChildName();
      return `
        <header class="topbar child-topbar primary-topbar home-topbar">
          <div class="home-top-welcome">
            <h1>欢迎，${homeDisplayName}！</h1>
          </div>
          <button class="home-star-balance" data-action="open-star-bill" aria-label="查看星星账单">
            <img src="assets/figma-home-10-3/star-face.svg" alt="">
            <strong>${state.stars}</strong>
          </button>
        </header>`;
    }
    return `
      <header class="topbar child-topbar primary-topbar">
        <div class="primary-title-zone">
          <h1>${title}</h1>
          ${state.screen === 'rewards' ? `<button class="star-balance" data-action="open-star-bill" aria-label="查看星星账单">☆ <strong>${state.stars}</strong></button>` : ''}
        </div>
        <button class="text-button parent-entry" data-action="switch-role">切换家长端</button>
      </header>`;
  }
  return `
    <header class="topbar parent-topbar">
      <h1>${title}</h1>
      <button class="text-button" data-action="switch-role">切换儿童端</button>
    </header>`;
}

function statusText(taskId) {
  return state.todayCompletedIds.includes(taskId) ? '已完成' : '未完成';
}

function taskRows(tasks) {
  const taskIcons = [
    ['assets/home-ui/task-read-chameleon.png', '紫色变色龙任务图标'],
    ['assets/home-ui/task-listen-parrot.png', '鹦鹉任务图标'],
    ['assets/home-ui/task-write-star.png', '星星任务图标']
  ];
  return tasks.map((task, index) => {
    const [icon, alt] = taskIcons[index % taskIcons.length];
    return `
    <article class="task-row home-task-row">
      <img class="home-task-icon" src="${icon}" alt="${alt}">
      <div class="task-copy"><h3>${task.title}</h3><p>${task.subtitle}</p></div>
      <button class="status ${state.todayCompletedIds.includes(task.id) ? 'done' : ''}" data-action="open-task" data-id="${task.id}">${statusText(task.id)}</button>
    </article>`;
  }).join('');
}

function childHome() {
  const tasks = todayTasks();
  const reviewTasks = todayReviewTasks();
  const planTasks = [...reviewTasks, ...tasks];
  const doneCount = planTasks.filter(task => state.todayCompletedIds.includes(task.id)).length;
  const nextTask = planTasks.find(task => !state.todayCompletedIds.includes(task.id));
  const startLabel = doneCount > 0 ? '继续学习' : '开始学习';
  const reviewMinutes = reviewTasks.length ? Math.min(state.settings.dailyMinutes, reviewTasks.length * 4) : 0;
  return `
    ${header('Happy 英语')}
    <main class="screen child-home-screen">
      <section class="home-hero-stage">
        <div class="home-hero-card">
          <img src="assets/home-ui/happy-home-hero-v2.png" alt="黑白奶牛猫、紫色变色龙和鹦鹉在草地上欢迎你">
          <p class="home-hero-tagline">今天也要开心学英语呀！</p>
        </div>
        <button class="primary home-start-button" data-action="start-next" ${nextTask ? '' : 'disabled'}>${nextTask ? startLabel : '今日任务已完成'}</button>
      </section>
      <section class="metrics compact-metrics home-metrics">
        <div class="card metric home-progress-card">
          <img class="home-metric-icon" src="assets/figma-home-10-3/raw-1.png" alt="今日进度">
          <div class="home-metric-copy"><div class="metric-line"><span>今日进度</span><strong>${doneCount}/${planTasks.length}</strong></div></div>
        </div>
        <div class="card metric home-star-card">
          <img class="home-metric-icon" src="assets/figma-home-10-3/star-balance.svg" alt="今日星星">
          <div class="home-metric-copy"><div class="metric-line"><span>今日星星</span><strong>${state.todayStars}</strong></div></div>
        </div>
      </section>
      <div class="row home-section-heading"><h2 class="section-title">今日任务</h2><strong>约 ${state.settings.dailyMinutes} 分钟</strong></div>
      <section class="home-task-list">${taskRows(tasks)}</section>
      <div class="row home-section-heading review-heading"><h2 class="section-title">今日复习任务</h2><strong>约 ${reviewMinutes} 分钟</strong></div>
      <section class="home-task-list home-review-list">
        ${reviewTasks.length ? taskRows(reviewTasks) : '<div class="empty">今天暂时没有复习内容</div>'}
      </section>
    </main>
    ${childNav('home')}`;
}

function unitsScreen() {
  return `
    ${header('主题闯关')}
    <main class="screen">
      <h2 class="screen-title">三座主题冒险岛</h2>
      <section class="card challenge-rules-summary">
        <div class="row"><div><strong>怎么玩</strong><p class="subtle">完成当前岛的 6 关，下一座岛就会开启。</p></div><button class="text-button" data-action="show-challenge-rules">查看规则</button></div>
      </section>
      ${challengeUnitOrder.map((unitId, index) => {
        const config = challengeUnits[unitId];
        const unit = units.find(item => item.id === unitId);
        const progress = challengeDoneCount(unitId);
        const unlocked = challengeUnitUnlocked(unitId);
        const status = !unlocked ? '未开启' : progress === CHALLENGE_STAGE_COUNT ? '已完成' : progress ? '继续闯关' : '开始冒险';
        return `<button class="card challenge-theme-card ${unlocked ? '' : 'disabled-theme'}" data-action="open-unit" data-id="${unitId}" ${unlocked ? '' : 'disabled'}>
          <div class="challenge-theme-top"><div class="placeholder-icon">主题<br>${index + 1}</div><div class="unit-copy"><h3>${config.islandTitle}</h3><p>${unit.title}</p></div><span class="status ${unlocked ? '' : 'locked'}">${status}</span></div>
          <div class="progress-track"><i style="width:${progress / CHALLENGE_STAGE_COUNT * 100}%"></i></div>
          <p class="tiny">${unlocked ? `已通过 ${progress}/${CHALLENGE_STAGE_COUNT} 关 · 完成可获得“${config.badge}”` : `完成“${challengeUnits[challengeUnitOrder[index - 1]].islandTitle}”后开启`}</p>
        </button>`;
      }).join('')}
    </main>
    ${childNav('units')}`;
}

function unitDetail() {
  const unitId = selectedChallengeUnitId();
  const config = challengeUnits[unitId];
  const unit = units.find(item => item.id === unitId);
  const progress = currentChallengeRunProgress(unitId);
  const completedOnce = challengeDoneCount(unitId) === CHALLENGE_STAGE_COUNT;
  const replaying = isReplayingUnit(unitId);
  const stages = challengeStagesFor(unitId);
  return `
    ${header(config.islandTitle)}
    <main class="screen inner-screen unit-detail-screen">
      <section class="card challenge-intro">
        <div class="placeholder-scene">${config.scene}</div>
        <h2 class="screen-title">${config.pageTitle}</h2>
        <p>${config.intro}</p>
        <div class="row"><span>教材主题</span><strong>${unit.title}</strong></div>
      </section>
      <div class="row"><h3 class="section-title">${replaying ? '重新冒险路线' : '冒险路线'}</h3><span class="subtle">${progress}/${CHALLENGE_STAGE_COUNT}</span></div>
      ${replaying ? '<div class="wire-note">正在重新游玩：必须从第一关依次前进，本轮不再增加星星。</div>' : ''}
      <section class="challenge-path">
        ${stages.map(stage => {
          const done = progress >= stage.id;
          const current = stage.id === progress + 1;
          return `<button class="stage-card ${done ? 'done' : ''} ${current ? '' : 'locked'}" data-action="open-challenge-stage" data-stage="${stage.id}" ${current ? '' : 'disabled'}>
            <span class="stage-number">${done ? '✓' : stage.id}</span>
            <span class="stage-copy"><strong>${stage.title}</strong><small>${stage.subtitle}</small></span>
            <span class="status ${done ? 'done' : current ? '' : 'locked'}">${done ? '已通过' : current ? '开始' : '未开启'}</span>
          </button>`;
        }).join('')}
      </section>
      ${completedOnce && !replaying ? `<section class="card badge-card"><strong>${config.badge}</strong><p>${config.badgeText} 重新游玩需要从第一关开始，且不会重复增加星星。</p><button class="secondary" data-action="restart-challenge-unit">重新玩${config.islandTitle}</button></section>` : ''}
    </main>`;
}

function personalizeChallengeText(value, learnerName = activeChildName()) {
  return String(value || '').replaceAll('{name}', learnerName);
}

function challengeStageScreen() {
  const unitId = selectedChallengeUnitId();
  const config = challengeUnits[unitId];
  const stage = Number(state.selectedChallengeStage || 1);
  const stages = challengeStagesFor(unitId);
  const meta = stages.find(item => item.id === stage) || stages[0];
  const replay = isReplayingUnit(unitId);
  const learnerName = activeChildName();
  let activity = '';

  if (meta.kind === 'choice') {
    activity = `
      <p class="challenge-story">${personalizeChallengeText(meta.story, learnerName)}</p>
      ${meta.audio ? `<button class="secondary audio-button" data-action="play-phrase" data-phrase="${personalizeChallengeText(meta.audio, learnerName)}">▶ 播放声音</button>` : ''}
      <div class="challenge-options">
        ${meta.choices.map(([label, correct]) => `<button class="challenge-option" data-action="challenge-choice" data-correct="${correct}">${personalizeChallengeText(label, learnerName)}</button>`).join('')}
      </div>`;
  }

  if (meta.kind === 'sequence') {
    const target = meta.target.map(word => personalizeChallengeText(word, learnerName));
    activity = `
      <p class="challenge-story">${personalizeChallengeText(meta.story, learnerName)}</p>
      <div class="sentence-board">${state.challengeDraft.length ? state.challengeDraft.map(index => target[index]).join(' ') : '点击下方词块开始拼句子'}</div>
      <div class="word-bank">
        ${target.map((word, index) => `<button class="word-chip" data-action="challenge-word" data-index="${index}" ${state.challengeDraft.includes(index) ? 'disabled' : ''}>${word}</button>`).join('')}
      </div>
      <div class="button-row"><button class="secondary" data-action="clear-challenge-sentence">重新拼</button><button class="primary" data-action="check-challenge-sentence">检查句子</button></div>`;
  }

  if (meta.kind === 'record') {
    activity = `
      <p class="challenge-story">${personalizeChallengeText(meta.story, learnerName)}</p>
      <button class="secondary audio-button" data-action="play-phrase" data-phrase="${personalizeChallengeText(meta.audio, learnerName)}">▶ 听问题</button>
      <div class="recording-prompt">请说：<strong>${personalizeChallengeText(meta.prompt, learnerName)}</strong></div>
      <div class="recording-controls">
        <button id="record-start" class="primary" data-action="start-challenge-recording">● 开始录音</button>
        <button id="record-stop" class="secondary" data-action="stop-challenge-recording" disabled>■ 结束录音</button>
        <button id="record-play" class="secondary" data-action="play-challenge-recording" disabled>▶ 听听我的声音</button>
        <button id="record-reset" class="text-button" data-action="reset-challenge-recording" disabled>重新录音</button>
        <button id="record-confirm" class="primary" data-action="confirm-challenge-recording" disabled>我说好了</button>
      </div>`;
  }

  if (meta.kind === 'dialogue') {
    const step = Number(state.challengeDialogueStep || 0);
    const turns = meta.turns;
    const current = turns[Math.min(step, turns.length - 1)];
    activity = `
      <p class="challenge-story">${personalizeChallengeText(meta.story, learnerName)}</p>
      <div class="dialogue-progress">${stage === CHALLENGE_STAGE_COUNT ? '终章' : '互动'} ${Math.min(step + 1, turns.length)}/${turns.length}</div>
      <div class="dialogue-log">
        ${turns.slice(0, step).map(turn => `<p><strong>${turn.speaker}：</strong>${personalizeChallengeText(turn.line, learnerName)}<br><strong>${learnerName}：</strong>${personalizeChallengeText(turn.choices.find(choice => choice[1])[0], learnerName)}</p>`).join('')}
        ${step < turns.length ? `<p class="current-turn"><strong>${current.speaker}：</strong>${personalizeChallengeText(current.line, learnerName)}</p>` : `<div class="celebration">${meta.completeText}</div>`}
      </div>
      ${step < turns.length ? `<div class="challenge-options">${current.choices.map(([label, correct]) => `<button class="challenge-option" data-action="dialogue-choice" data-correct="${correct}">${personalizeChallengeText(label, learnerName)}</button>`).join('')}</div>` : ''}`;
  }

  const dialogueComplete = meta.kind === 'dialogue' && state.challengeDialogueStep >= meta.turns.length;
  return `
    ${header(meta.title)}
    <main class="screen inner-screen challenge-screen">
      <div class="row stage-progress-row"><span class="status">第 ${stage} 关，共 ${CHALLENGE_STAGE_COUNT} 关</span><span class="tiny">${replay ? '重新游玩不增加星星' : stage === CHALLENGE_STAGE_COUNT ? '终章首次通过可得 3 颗星星' : '首次挑战可得 2 颗星星'}</span></div>
      <section class="card challenge-activity">
        <div class="stage-visual">${config.islandTitle} · ${meta.title}</div>
        <h2>${meta.title}</h2>
        <p class="subtle">${meta.subtitle}</p>
        ${activity}
        <div id="challenge-feedback" class="challenge-feedback" aria-live="polite"></div>
        <button id="challenge-next" class="primary challenge-next ${dialogueComplete ? '' : 'hidden'}" data-action="complete-challenge-stage" data-stage="${stage}">${stage === CHALLENGE_STAGE_COUNT ? `完成${config.islandTitle}并领取徽章` : '通过这一关'}</button>
      </section>
    </main>`;
}

function taskScreen() {
  const info = taskById(state.selectedTaskId);
  if (!info) return childHome();
  const isInReview = state.reviewItems.some(item => item.taskId === info.id && item.status === '待复习');
  const childMarkedReview = state.reviewItems.some(item => item.taskId === info.id && item.status === '待复习' && item.source === '孩子主动标记');
  const hasExperienced = state.todayExperiencedTaskIds?.includes(info.id);
  const actionHint = info.type === '听' ? '播放示范音频（低保真模拟）' : info.type === '说' ? '录音与重录（低保真模拟）' : info.type === '写' ? '手写区域（低保真占位）' : '看图选择区域（低保真占位）';
  const experienceLabel = info.type === '听' ? '播放一次示范' : info.type === '说' ? '完成一次录音' : info.type === '写' ? '完成一次书写' : '完成一次找图';
  return `
    ${header(info.title)}
    <main class="screen inner-screen task-detail-screen">
      <section class="card task-detail-card">
        <div class="task-detail-heading">
          <span class="status">${info.type}</span>
          <div><h2>${info.title}</h2><p class="subtle">${info.unit.title} · ${info.subtitle}</p></div>
        </div>
        <div class="exercise-placeholder"><div><strong>${actionHint}</strong><span>此处用于确认流程，不使用正式教材音频或插画。</span></div></div>
        <div class="action-stack">
          <button class="secondary" data-action="simulate" data-id="${info.id}" ${hasExperienced ? 'disabled' : ''}>${hasExperienced ? '已完成任务体验' : experienceLabel}</button>
          <button class="primary" data-action="complete-task" data-id="${info.id}" ${hasExperienced ? '' : 'disabled'}>${hasExperienced ? '完成任务 +3 星' : '请先完成上方体验'}</button>
        </div>
        <section class="self-review-card">
          <div><strong>这项还不熟？</strong><span>没关系，先放进复习区，稍后再轻松练一次。</span></div>
          <button class="secondary self-review-button" data-action="${childMarkedReview ? 'remove-review' : 'add-review'}" data-id="${info.id}" ${isInReview && !childMarkedReview ? 'disabled' : ''}>${childMarkedReview ? '撤销“还不熟”' : isInReview ? '已加入今日复习' : '标记“还不熟”'}</button>
        </section>
      </section>
    </main>`;
}

function rewardsScreen() {
  return `
    ${header('奖品兑换')}
    <main class="screen reward-grid">
      ${rewards.map(reward => {
        const request = state.rewardRequests.find(item => item.rewardId === reward.id && item.status === '待审批');
        return `<article class="card reward-product-card">
          <div class="reward-product-image">奖品大图</div>
          <h2>${reward.title}</h2>
          <div class="reward-product-action">
            <strong>☆ ${reward.cost}</strong>
            <button class="primary" data-action="request-reward" data-id="${reward.id}" ${request || state.stars < reward.cost ? 'disabled' : ''}>${request ? '待家长确认' : state.stars < reward.cost ? `还差 ${reward.cost - state.stars} 颗星` : '申请兑换'}</button>
          </div>
        </article>`;
      }).join('')}
    </main>
    ${childNav('rewards')}`;
}

function starBillScreen() {
  const income = state.starLedger.filter(item => item.amount > 0).reduce((sum, item) => sum + item.amount, 0);
  const expense = Math.abs(state.starLedger.filter(item => item.amount < 0).reduce((sum, item) => sum + item.amount, 0));
  return `
    ${header('星星账单')}
    <main class="screen inner-screen ledger-screen">
      <section class="metrics compact-metrics ledger-summary">
        <div class="card metric"><span>累计收入</span><strong>+${income}</strong></div>
        <div class="card metric"><span>累计支出</span><strong>-${expense}</strong></div>
      </section>
      <h2 class="section-title">收支记录</h2>
      <section class="card ledger-list">
        ${state.starLedger.length ? state.starLedger.map(item => `
          <article class="ledger-row">
            <div><strong>${item.action}</strong><time>${formatLedgerTime(item.at)}</time></div>
            <b class="${item.amount >= 0 ? 'income' : 'expense'}">${item.amount >= 0 ? '+' : ''}${item.amount}</b>
          </article>`).join('') : '<div class="empty">暂时没有星星记录</div>'}
      </section>
    </main>`;
}

function childNav(active) {
  const visualHomeNav = active === 'home';
  const items = visualHomeNav
    ? [
      ['home', '首页', 'assets/figma-home-10-3/nav-home.svg'],
      ['units', '闯关', 'assets/figma-home-10-3/nav-challenge.svg'],
      ['rewards', '商城', 'assets/figma-home-10-3/nav-shop.svg']
    ]
    : [
      ['home', '首页', '□'], ['units', '闯关', '▦'], ['rewards', '奖励', '☆']
    ];
  return `<nav class="bottom-nav three-items ${visualHomeNav ? 'home-bottom-nav' : ''}" aria-label="儿童端导航">${items.map(([id, label, icon]) => `<button class="nav-item ${active === id ? 'active' : ''}" data-action="nav" data-screen="${id}">${visualHomeNav ? `<img src="${icon}" alt="">` : `<span>${icon}</span>`}${label}</button>`).join('')}</nav>`;
}

function parentHome() {
  const pendingRewards = state.rewardRequests.filter(item => item.status === '待审批');
  const plan = state.dailyPlan || buildDailyPlan();
  const reviewCount = plan.reviewTaskIds.length;
  const newCount = plan.newTaskIds.length;
  return `
    ${header('概览')}
    <main class="screen">
      <section class="metrics">
        <div class="card metric"><span>今日完成</span><strong>${state.todayCompletedIds.length}</strong><small>项任务</small></div>
        <div class="card metric"><span>今日学习</span><strong>${Math.min(state.settings.dailyMinutes, state.todayCompletedIds.length * 4)}</strong><small>分钟（模拟）</small></div>
      </section>
      <section class="card"><div class="row"><div><strong>当前计划</strong><p class="subtle">${reviewCount} 项复习 + ${newCount} 项新学 · 约 ${state.settings.dailyMinutes} 分钟 · ${state.settings.reminder} 提醒</p></div><button class="text-button" data-action="nav" data-screen="settings">修改</button></div></section>
      <h2 class="section-title">奖励审批</h2>
      <section class="card">${pendingRewards.length ? pendingRewards.map(request => {
        const reward = rewards.find(item => item.id === request.rewardId);
        return `<article class="reward-row"><div class="reward-copy"><h3>${reward.title}</h3><p>需要 ${reward.cost} 颗星星</p></div><div class="button-row"><button class="text-button" data-action="reward-decision" data-decision="reject" data-id="${request.id}">拒绝</button><button class="primary" data-action="reward-decision" data-decision="approve" data-id="${request.id}">同意</button></div></article>`;
      }).join('') : '<div class="empty">暂无兑换申请</div>'}</section>
    </main>
    ${parentNav('parentHome')}`;
}

function settingsScreen() {
  const assignedReviewTasks = state.settings.assignedReviewTaskIds.map(taskById).filter(Boolean);
  const previewPlan = buildDailyPlan();
  const previewReviewTasks = previewPlan.reviewTaskIds.map(taskById).filter(Boolean);
  const previewNewTasks = previewPlan.newTaskIds.map(taskById).filter(Boolean);
  const previewTasks = [...previewReviewTasks, ...previewNewTasks];
  return `
    ${header('任务设置')}
    <main class="screen">
      <h2 class="screen-title">每日学习计划</h2>
      <form id="settings-form" class="card form-grid">
        <p class="subtle plan-rule-note">计划会持续生效，无需每天重复设置。每天首次打开时自动生成；当天保持固定，家长主动修改时才重新排程。</p>
        <label class="field">每日任务数量
          <select name="dailyTaskCount"><option value="1">1 项</option><option value="2">2 项</option><option value="3">3 项</option><option value="4">4 项</option></select>
        </label>
        <label class="field">每日学习时长
          <select name="dailyMinutes"><option value="5">约 5 分钟</option><option value="10">约 10 分钟</option><option value="12">约 12 分钟</option><option value="15">约 15 分钟</option></select>
        </label>
        <label class="field">学习提醒
          <input name="reminder" type="time" value="${state.settings.reminder}">
        </label>
        <fieldset class="field"><legend>指定复习单元</legend><div class="checkbox-list">
          ${units.map(unit => `<label class="checkbox-row"><input type="checkbox" name="reviewUnits" value="${unit.id}" ${state.settings.assignedReviewUnitIds.includes(unit.id) ? 'checked' : ''}>${unit.title}</label>`).join('')}
        </div></fieldset>
        <section class="assigned-review-content">
          <strong>已指定复习内容</strong>
          ${assignedReviewTasks.length
            ? assignedReviewTasks.map(task => `<p>${task.title}<small>${task.unit.title} · ${task.type}</small></p>`).join('')
            : '<p class="subtle">暂未指定具体内容，可在学习报告的“复习建议”中选择。</p>'}
        </section>
        <section class="assigned-review-content plan-preview">
          <strong>下一次自动计划预览</strong>
          <p>${previewReviewTasks.length} 项复习 + ${previewNewTasks.length} 项新学 · 约 ${state.settings.dailyMinutes} 分钟</p>
          ${previewTasks.length
            ? previewTasks.map((task, index) => `<p><b>${index + 1}. ${task.title}</b><small>${previewReviewTasks.some(item => item.id === task.id) ? '复习' : '新学'} · ${task.unit.title}</small></p>`).join('')
            : '<p class="subtle">当前单元暂时没有可安排的内容。</p>'}
        </section>
        <button class="primary" type="submit">保存并同步儿童端</button>
      </form>
    </main>
    ${parentNav('settings')}`;
}

function reportScreen() {
  const completed = state.todayCompletedIds.map(taskById).filter(Boolean);
  const reviewed = state.reviewItems
    .filter(item => item.status === '已复习' && isToday(item.completedAt))
    .map(item => ({ ...item, task: taskById(item.taskId) }))
    .filter(item => item.task);
  const types = ['听', '说', '读', '写'];
  const counts = Object.fromEntries(types.map(type => [type, completed.filter(task => task.type === type).length]));
  const suggestionMap = new Map();
  state.reviewItems
    .filter(item => item.status === '待复习')
    .forEach(item => {
      const task = taskById(item.taskId);
      const reasonMap = {
        '孩子主动标记': '孩子主动标记为还不熟',
        '连续答错3次': '同一练习连续答错3次',
        '家长指定': '家长已指定复习'
      };
      if (task) suggestionMap.set(task.id, { task, reason: reasonMap[item.source] || '孩子标记为还不熟' });
    });
  currentUnit().tasks
    .filter(task => !state.completedTaskIds.includes(task.id))
    .forEach(task => {
      if (!suggestionMap.has(task.id)) suggestionMap.set(task.id, { task: taskById(task.id), reason: '本主题尚未完成' });
    });
  const suggestions = [...suggestionMap.values()].filter(item => item.task);
  const assignedReviewTaskIds = new Set(state.settings.assignedReviewTaskIds);
  return `
    ${header(`${activeChildName()}学习报告`)}
    <main class="screen">
      <h2 class="screen-title">今日学习记录</h2>
      <section class="card skill-bars">
        ${types.map(type => `<div class="skill-bar"><strong>${type}</strong><div class="bar"><i style="width:${Math.min(100, counts[type] * 34)}%"></i></div><span>${counts[type]}</span></div>`).join('')}
      </section>
      <section class="card">
        ${completed.length ? completed.map(task => `<article class="record-row"><div class="record-copy"><strong>${task.title}</strong><p>${task.unit.title} · ${task.type}</p></div><span class="status done">已完成</span></article>`).join('') : '<div class="empty">今天还没有完成记录</div>'}
      </section>
      <h2 class="section-title">今日复习记录</h2>
      <section class="card">
        ${reviewed.length ? reviewed.map(item => `<article class="record-row"><div class="record-copy"><strong>${item.task.title}</strong><p>${item.task.unit.title} · ${item.task.type}${item.completedAt ? ` · ${formatLedgerTime(item.completedAt)}` : ''}</p></div><span class="status done">已复习</span></article>`).join('') : '<div class="empty">今天还没有复习记录</div>'}
      </section>
      <h3 class="section-title">复习建议</h3>
      <form id="review-suggestion-form" class="card review-suggestion-form">
        <p class="subtle">可同时勾选多条建议，添加后会同步到儿童端“今日复习”。</p>
        ${suggestions.length ? `<div class="checkbox-list suggestion-list">
          ${suggestions.map(({ task, reason }) => {
            const assigned = assignedReviewTaskIds.has(task.id);
            return `<label class="checkbox-row suggestion-row ${assigned ? 'is-assigned' : ''}">
              <input type="checkbox" name="suggestionTaskIds" value="${task.id}" ${assigned ? 'checked disabled' : ''}>
              <span class="suggestion-copy"><strong>${task.title}</strong><small>${task.unit.title} · ${task.type} · ${reason}</small></span>
              ${assigned ? '<span class="status done">已指定</span>' : ''}
            </label>`;
          }).join('')}
        </div>` : '<div class="empty">暂未发现需要重复练习的内容。</div>'}
        <button class="primary" type="submit" ${suggestions.every(({ task }) => assignedReviewTaskIds.has(task.id)) ? 'disabled' : ''}>添加至指定复习内容</button>
      </form>
    </main>
    ${parentNav('report')}`;
}

function contentModelPanel() {
  return `
    <section class="card">
      <ul class="model-tree">
        <li><strong>册</strong>：一年级上册
          <ul><li><strong>单元</strong>：Unit 1
            <ul><li>主题</li><li>学习目标</li><li>词汇</li><li>口语表达</li><li>技能：听 / 说 / 认读 / 少量书写</li><li>任务：音频 + 图片 + 操作 + 星星</li><li>复习关联</li></ul>
          </li></ul>
        </li>
      </ul>
    </section>
    ${units.map(unit => `<section class="card"><strong>${unit.title}</strong><p>${unit.goal}</p><span class="status">内容待核对</span></section>`).join('')}`;
}

function parentSettingsScreen() {
  pendingChildAvatar = null;
  const child = activeChild();
  const tab = state.parentSettingsTab === 'content' ? 'content' : 'child';
  const childPanel = `
    <section class="card child-profile-card">
      <label class="child-avatar-upload" for="child-avatar-file" aria-label="修改小孩头像">
        <div class="child-avatar-preview">
          ${child.avatar ? `<img src="${child.avatar}" alt="${child.name}的头像">` : '<span>头像</span>'}
        </div>
      </label>
      <form id="child-profile-form" class="form-grid">
        <input type="hidden" name="childId" value="${child.id}">
        <input id="child-avatar-file" class="avatar-file-input" name="childAvatar" type="file" accept="image/png,image/jpeg,image/webp">
        <label class="field">小孩名称
          <input name="childName" type="text" maxlength="20" value="${child.name}" autocomplete="off" required>
        </label>
        <button class="primary" type="submit">保存小孩资料</button>
      </form>
    </section>`;
  return `
    ${header('设置')}
    <main class="screen parent-settings-screen">
      <div class="settings-tabs" role="tablist" aria-label="设置分类">
        <button class="settings-tab ${tab === 'child' ? 'active' : ''}" data-action="set-parent-settings-tab" data-tab="child" role="tab" aria-selected="${tab === 'child'}">我的小孩</button>
        <button class="settings-tab ${tab === 'content' ? 'active' : ''}" data-action="set-parent-settings-tab" data-tab="content" role="tab" aria-selected="${tab === 'content'}">教材内容</button>
      </div>
      <section class="settings-tab-panel">${tab === 'child' ? childPanel : contentModelPanel()}</section>
      <footer class="settings-version"><strong>V1.0</strong><span>提醒：教材内容仍处于准备阶段，正式制作前需复核教材及授权。</span></footer>
    </main>
    ${parentNav('parentSettings')}`;
}

function parentNav(active) {
  const items = [
    ['parentHome', '概览', '□'], ['settings', '任务', '≡'], ['report', '报告', '▤'], ['parentSettings', '设置', '⚙']
  ];
  return `<nav class="bottom-nav" aria-label="家长端导航">${items.map(([id, label, icon]) => `<button class="nav-item ${active === id ? 'active' : ''}" data-action="nav" data-screen="${id}"><span>${icon}</span>${label}</button>`).join('')}</nav>`;
}

function requestPassword() {
  const targetRole = state.role === 'child' ? 'parent' : 'child';
  overlayRoot.innerHTML = `<div class="overlay"><section class="dialog" role="dialog" aria-modal="true" aria-labelledby="password-title">
    <h2 id="password-title">切换到${targetRole === 'parent' ? '家长端' : '儿童端'}</h2>
    <p>请输入切换密码。</p>
    <label class="field">密码<input id="role-password" type="password" inputmode="numeric" maxlength="6" autocomplete="off"></label>
    <div id="password-error" class="error"></div>
    <div class="button-row"><button class="secondary" data-action="close-overlay">取消</button><button class="primary" data-action="confirm-role" data-role="${targetRole}">确认切换</button></div>
  </section></div>`;
  setTimeout(() => document.getElementById('role-password')?.focus(), 0);
}

function showChallengeRules() {
  overlayRoot.innerHTML = `<div class="overlay"><section class="dialog" role="dialog" aria-modal="true" aria-labelledby="challenge-rule-title">
    <h2 id="challenge-rule-title">闯关规则</h2>
    <ol class="dialog-rule-list">
      <li>完成前一座岛，才会开启下一座岛。</li>
      <li>每座岛有 6 关，必须按顺序前进；通过后继续向前。</li>
      <li>答错不扣星；连续答错 3 次自动加入复习。</li>
      <li>前 5 关首次通过各得 2 星，终章首次通过得 3 星。</li>
      <li>整岛完成后可以从头重玩，但不重复增加星星。</li>
    </ol>
    <button class="primary" data-action="close-overlay">知道了</button>
  </section></div>`;
}

function requestReward(rewardId) {
  const reward = rewards.find(item => item.id === rewardId);
  if (!reward || state.stars < reward.cost) return showToast('星星还不够，慢慢积累');
  if (!state.rewardRequests.some(item => item.rewardId === rewardId && item.status === '待审批')) {
    state.rewardRequests.push({ id: `request-${Date.now()}`, rewardId, status: '待审批' });
    save();
  }
  showToast('已提交给家长确认');
  render();
}

function decideReward(requestId, decision) {
  const request = state.rewardRequests.find(item => item.id === requestId);
  if (!request || request.status !== '待审批') return;
  const reward = rewards.find(item => item.id === request.rewardId);
  if (decision === 'approve' && reward && state.stars >= reward.cost) {
    recordStarChange(-reward.cost, `兑换奖品：${reward.title}`);
    request.status = '已同意';
    showToast('已批准，星星已扣除');
  } else {
    request.status = '已拒绝';
    showToast('已拒绝，不扣星星');
  }
  save();
  render();
}

function render() {
  if (ensureDailyPlan()) save();
  const childScreens = { home: childHome, units: unitsScreen, unit: unitDetail, challengeStage: challengeStageScreen, task: taskScreen, rewards: rewardsScreen, starBill: starBillScreen };
  const parentScreens = { parentHome, settings: settingsScreen, report: reportScreen, parentSettings: parentSettingsScreen };
  const screens = state.role === 'child' ? childScreens : parentScreens;
  const fallback = state.role === 'child' ? childHome : parentHome;
  const isInnerScreen = state.role === 'child' && ['unit', 'challengeStage', 'task', 'starBill'].includes(state.screen);
  const isChildHome = state.role === 'child' && state.screen === 'home';
  app.innerHTML = `<div class="app-shell ${isInnerScreen ? 'inner-shell' : ''} ${isChildHome ? 'child-home-shell' : ''}">${systemStatusBar()}${(screens[state.screen] || fallback)()}</div>`;

  if (state.screen === 'settings') {
    const form = document.getElementById('settings-form');
    if (form) {
      form.dailyTaskCount.value = String(state.settings.dailyTaskCount);
      form.dailyMinutes.value = String(state.settings.dailyMinutes);
    }
  }
}

document.addEventListener('click', event => {
  const control = event.target.closest('[data-action]');
  if (!control || control.disabled) return;
  const { action, id, screen, role, decision } = control.dataset;
  if (action === 'nav') navTo(screen);
  if (action === 'set-parent-settings-tab') {
    state.parentSettingsTab = control.dataset.tab === 'content' ? 'content' : 'child';
    save();
    render();
  }
  if (action === 'open-star-bill') {
    state.starBillReturnScreen = ['home', 'units', 'rewards'].includes(state.screen) ? state.screen : 'home';
    navTo('starBill');
  }
  if (action === 'secondary-back') {
    if (state.screen === 'challengeStage') cleanupChallengeRecording();
    navTo(screen || 'home');
  }
  if (action === 'switch-role') requestPassword();
  if (action === 'show-challenge-rules') showChallengeRules();
  if (action === 'close-overlay') overlayRoot.innerHTML = '';
  if (action === 'confirm-role') {
    const input = document.getElementById('role-password');
    const error = document.getElementById('password-error');
    if (input?.value !== '123456') {
      error.textContent = '密码不正确，请重新输入。';
      input?.focus();
      return;
    }
    state.role = role;
    state.screen = role === 'parent' ? 'parentHome' : 'home';
    overlayRoot.innerHTML = '';
    save();
    render();
  }
  if (action === 'start-next') {
    const planTasks = todayPlanTasks();
    const next = planTasks.find(task => !state.todayCompletedIds.includes(task.id)) || planTasks[0];
    if (next) openTask(next.id);
  }
  if (action === 'open-task') openTask(id);
  if (action === 'complete-task') completeTask(id);
  if (action === 'add-review') addReview(id);
  if (action === 'remove-review') removeChildReview(id);
  if (action === 'simulate') experienceTask(id);
  if (action === 'open-unit') {
    if (!challengeUnitUnlocked(id)) return showToast('先完成前一座主题岛，就能开启这里');
    state.selectedUnitId = id;
    state.screen = 'unit';
    save();
    render();
  }
  if (action === 'open-challenge-stage') openChallengeStage(control.dataset.stage);
  if (action === 'restart-challenge-unit') restartChallengeUnit();
  if (action === 'back-to-challenge') {
    cleanupChallengeRecording();
    navTo('unit');
  }
  if (action === 'start-challenge-recording') startChallengeRecording();
  if (action === 'stop-challenge-recording') stopChallengeRecording();
  if (action === 'play-challenge-recording') playChallengeRecording();
  if (action === 'reset-challenge-recording') resetChallengeRecording();
  if (action === 'confirm-challenge-recording') {
    const stageMeta = challengeStagesFor().find(item => item.id === Number(state.selectedChallengeStage));
    const feedback = document.getElementById('challenge-feedback');
    if (!challengeAudioUrl) return showToast('请先完成一次录音');
    if (feedback) {
      feedback.className = 'challenge-feedback good';
      feedback.textContent = personalizeChallengeText(stageMeta?.success || '录音完成，可以继续前进。');
    }
    document.getElementById('challenge-next')?.classList.remove('hidden');
  }
  if (action === 'play-phrase') {
    const phrase = control.dataset.phrase || '';
    if ('speechSynthesis' in window && phrase) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'en-US';
      utterance.rate = 0.78;
      window.speechSynthesis.speak(utterance);
    } else {
      showToast('当前浏览器暂不支持语音播放');
    }
  }
  if (action === 'challenge-choice') {
    const feedback = document.getElementById('challenge-feedback');
    if (control.dataset.correct === 'true') {
      resetChallengeWrongAnswer();
      control.parentElement.querySelectorAll('.challenge-option').forEach(option => {
        option.disabled = true;
        if (option.dataset.correct === 'true') option.classList.add('correct');
      });
      if (feedback) {
        feedback.className = 'challenge-feedback good';
        feedback.textContent = '答对啦！你已经找到通关答案。';
      }
      document.getElementById('challenge-next')?.classList.remove('hidden');
    } else {
      const wrongResult = registerChallengeWrongAnswer();
      control.classList.add('wrong');
      if (feedback) {
        feedback.className = 'challenge-feedback bad';
        feedback.textContent = wrongResult.reachedLimit
          ? '已经连续答错 3 次，这项练习已自动加入今日复习。现在再试一次吧。'
          : `差一点，再听或再想一次吧，不扣星星。（连续答错 ${wrongResult.count}/3）`;
      }
      setTimeout(() => control.classList.remove('wrong'), 500);
    }
  }
  if (action === 'challenge-word') {
    const index = Number(control.dataset.index);
    if (!state.challengeDraft.includes(index)) state.challengeDraft.push(index);
    save();
    render();
  }
  if (action === 'clear-challenge-sentence') {
    state.challengeDraft = [];
    save();
    render();
  }
  if (action === 'check-challenge-sentence') {
    const stageMeta = challengeStagesFor().find(item => item.id === Number(state.selectedChallengeStage));
    const expectedOrder = (stageMeta?.target || []).map((_, index) => index);
    const correct = JSON.stringify(state.challengeDraft) === JSON.stringify(expectedOrder);
    const wrongResult = correct ? null : registerChallengeWrongAnswer();
    if (correct) resetChallengeWrongAnswer();
    const feedback = document.getElementById('challenge-feedback');
    if (feedback) {
      feedback.className = `challenge-feedback ${correct ? 'good' : 'bad'}`;
      feedback.textContent = correct
        ? personalizeChallengeText(stageMeta?.success || '顺序正确，可以继续前进。')
        : wrongResult.reachedLimit
          ? '已经连续答错 3 次，这项练习已自动加入今日复习。点“重新拼”再试一次。'
          : `顺序还不对，点“重新拼”再试一次，不扣星星。（连续答错 ${wrongResult.count}/3）`;
    }
    if (correct) document.getElementById('challenge-next')?.classList.remove('hidden');
  }
  if (action === 'dialogue-choice') {
    if (control.dataset.correct === 'true') {
      const stageMeta = challengeStagesFor().find(item => item.id === Number(state.selectedChallengeStage));
      const turnCount = stageMeta?.turns?.length || 3;
      resetChallengeWrongAnswer();
      state.challengeDialogueStep = Math.min(turnCount, Number(state.challengeDialogueStep || 0) + 1);
      save();
      render();
    } else {
      const wrongResult = registerChallengeWrongAnswer();
      const feedback = document.getElementById('challenge-feedback');
      control.classList.add('wrong');
      if (feedback) {
        feedback.className = 'challenge-feedback bad';
        feedback.textContent = wrongResult.reachedLimit
          ? '已经连续答错 3 次，这项练习已自动加入今日复习。现在再选一次吧。'
          : `这个答案还不对，再选一次吧。（连续答错 ${wrongResult.count}/3）`;
      }
      setTimeout(() => control.classList.remove('wrong'), 500);
    }
  }
  if (action === 'complete-challenge-stage') completeChallengeStage(control.dataset.stage);
  if (action === 'request-reward') requestReward(id);
  if (action === 'reward-decision') decideReward(id, decision);
  if (action === 'reset' && confirm('确定重置低保真测试数据吗？')) {
    state = freshState();
    save();
    showToast('测试数据已重置');
    render();
  }
});

document.addEventListener('change', async event => {
  if (event.target.id !== 'child-avatar-file') return;
  const file = event.target.files?.[0];
  if (!file) return;
  if (file.size > 12 * 1024 * 1024) {
    event.target.value = '';
    return showToast('原图请控制在 12MB 以内');
  }
  try {
    pendingChildAvatar = await compressAvatarFile(file);
    const preview = document.querySelector('.child-avatar-preview');
    if (preview) preview.innerHTML = `<img src="${pendingChildAvatar}" alt="新头像预览">`;
    showToast('头像已自动压缩，点击保存即可生效');
  } catch {
    pendingChildAvatar = null;
    event.target.value = '';
    showToast('头像处理失败，请换一张图片');
  }
});

document.addEventListener('submit', event => {
  if (event.target.id === 'review-suggestion-form') {
    event.preventDefault();
    const data = new FormData(event.target);
    const selectedTaskIds = data.getAll('suggestionTaskIds').filter(taskId => !state.settings.assignedReviewTaskIds.includes(taskId));
    if (!selectedTaskIds.length) return showToast('请至少选择一条新的复习建议');
    state.settings.assignedReviewTaskIds = [...new Set([...state.settings.assignedReviewTaskIds, ...selectedTaskIds])];
    selectedTaskIds.forEach(taskId => {
      const hasPendingItem = state.reviewItems.some(item => item.taskId === taskId && item.status === '待复习');
      if (!hasPendingItem) {
        state.reviewItems.push({
          id: `review-${Date.now()}-${taskId}`,
          taskId,
          status: '待复习',
          source: '家长指定',
          assignedAt: new Date().toISOString()
        });
      }
    });
    state.dailyPlan = null;
    save();
    showToast(`已添加 ${selectedTaskIds.length} 条指定复习内容`);
    render();
  }
  if (event.target.id === 'settings-form') {
    event.preventDefault();
    const data = new FormData(event.target);
    state.settings.dailyTaskCount = Number(data.get('dailyTaskCount'));
    state.settings.dailyMinutes = Number(data.get('dailyMinutes'));
    state.settings.reminder = data.get('reminder') || '19:30';
    state.settings.assignedReviewUnitIds = data.getAll('reviewUnits');
    state.dailyPlan = null;
    save();
    showToast('设置已同步到儿童端');
    render();
  }
  if (event.target.id === 'child-profile-form') {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const child = state.children.find(item => item.id === data.get('childId')) || activeChild();
    const childName = String(data.get('childName') || '').trim();
    if (!childName) return showToast('请输入小孩名称');
    child.name = childName;
    if (pendingChildAvatar) child.avatar = pendingChildAvatar;
    pendingChildAvatar = null;
    save();
    showToast('小孩资料已保存');
    render();
  }
});

render();
