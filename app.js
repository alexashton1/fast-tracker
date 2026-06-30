const CIRCUMFERENCE = 2 * Math.PI * 96;

const STAGES = [
  {
    name: 'Digestion',
    start: 0,
    end: 1,
    label: '0 – 1h',
    summary: 'Digestion phase',
    description: 'Your body is breaking down your last meal. Blood sugar is elevated and insulin is high, signalling your cells to absorb glucose for energy. Fat burning is essentially switched off during this window.',
    tags: ['High insulin', 'Blood sugar rising', 'Fat burning off'],
  },
  {
    name: 'Post-absorptive',
    start: 1,
    end: 4,
    label: '1 – 4h',
    summary: 'Post-absorptive phase',
    description: 'Digestion is complete. Blood glucose and insulin levels are falling back to baseline. Your body is primarily running on the glucose still circulating in your bloodstream and stored as glycogen in your liver.',
    tags: ['Insulin dropping', 'Glucose from blood', 'Glycogen in use'],
  },
  {
    name: 'Gluconeogenesis',
    start: 4,
    end: 8,
    label: '4 – 8h',
    summary: 'Gluconeogenesis begins',
    description: 'With blood glucose falling, your liver starts producing new glucose from non-carbohydrate sources — mainly amino acids and glycerol from fat. Insulin is now low. Your body is beginning to shift its fuel source.',
    tags: ['Liver producing glucose', 'Low insulin', 'Fat mobilising'],
  },
  {
    name: 'Glycogen depleting',
    start: 8,
    end: 12,
    label: '8 – 12h',
    summary: 'Glycogen stores running low',
    description: 'Your liver\'s glycogen stores are significantly depleted. Growth hormone begins to rise to protect muscle tissue. Your body is ramping up fat breakdown (lipolysis) as a primary energy source is about to switch.',
    tags: ['Glycogen nearly gone', 'Growth hormone rising', 'Lipolysis increasing'],
  },
  {
    name: 'Ketosis building',
    start: 12,
    end: 16,
    label: '12 – 16h',
    summary: 'Ketosis beginning',
    description: 'Fat burning is now well underway. Your liver is converting fatty acids into ketone bodies, which your brain and muscles can use as fuel. Many people notice improved mental clarity and reduced hunger as ketones rise.',
    tags: ['Ketones rising', 'Fat as primary fuel', 'Mental clarity', 'Hunger reducing'],
  },
  {
    name: 'Deep ketosis',
    start: 16,
    end: 20,
    label: '16 – 20h',
    summary: 'Deep ketosis',
    description: 'Ketone levels are significantly elevated. Your brain is now running efficiently on ketones. Inflammation markers often decrease in this phase. Growth hormone peaks — which helps preserve lean muscle while fat is burned.',
    tags: ['High ketones', 'Anti-inflammatory', 'Growth hormone peak', 'Fat burning peak'],
  },
  {
    name: 'Autophagy active',
    start: 20,
    end: 24,
    label: '20 – 24h',
    summary: 'Autophagy active',
    description: 'Autophagy — your body\'s cellular "self-cleaning" process — is now significantly active. Damaged proteins and cellular components are being broken down and recycled. This is one of the most sought-after benefits of extended fasting.',
    tags: ['Autophagy', 'Cellular repair', 'Protein recycling', 'Deep ketosis'],
  },
  {
    name: 'Glycogen fully gone',
    start: 24,
    end: 36,
    label: '24 – 36h',
    summary: 'Glycogen fully depleted',
    description: 'All liver and muscle glycogen stores are now completely exhausted. Your body is running almost entirely on fat and ketones. Autophagy is intensifying. Many people report a noticeable shift in energy — often a calm, steady mental clarity rather than the usual energy peaks and troughs.',
    tags: ['Zero glycogen', 'Full fat adaptation', 'Deep autophagy', 'Stable energy'],
  },
  {
    name: 'Immune reset begins',
    start: 36,
    end: 48,
    label: '36 – 48h',
    summary: 'Immune system regenerating',
    description: 'Research suggests that around 36–48 hours, the body begins breaking down old and damaged immune cells. This triggers the production of fresh immune cells from stem cells. Growth hormone is elevated, actively protecting muscle mass. Ketones are at their highest levels.',
    tags: ['Immune cell renewal', 'Stem cell activation', 'Peak ketones', 'Muscle preservation'],
  },
  {
    name: 'Deep cellular renewal',
    start: 48,
    end: 72,
    label: '48 – 72h',
    summary: 'Deep cellular renewal',
    description: 'You\'re now in the territory of a 3-day fast. Autophagy is at very high levels — your body is aggressively clearing out damaged cells, misfolded proteins, and cellular debris. Studies on fasting suggest significant immune system regeneration is occurring. Insulin is at its absolute lowest, maximising fat burning.',
    tags: ['Very high autophagy', 'Deep immune reset', 'Lowest insulin ever', 'Maximum fat burning'],
  },
  {
    name: 'Stem cell surge',
    start: 72,
    end: 96,
    label: '72 – 96h',
    summary: 'Stem cell regeneration peaks',
    description: 'Around the 72-hour mark, research (notably from Dr Valter Longo at USC) shows a significant surge in stem cell production. Old immune cells that were broken down are being replaced with new ones. The body is essentially performing a partial immune system reboot. This is considered one of the most powerful biological effects of extended fasting.',
    tags: ['Stem cell surge', 'Immune reboot', 'Cellular regeneration', 'High autophagy'],
  },
  {
    name: 'Metabolic adaptation',
    start: 96,
    end: 120,
    label: '96 – 120h',
    summary: 'Full metabolic adaptation',
    description: 'Your body is now fully fat-adapted and running with extraordinary efficiency on ketones. Hunger hormones (ghrelin) have largely subsided — many extended fasters report feeling little hunger at this stage. Your brain is thriving on ketones. Anti-inflammatory effects are pronounced. This is deep fasting territory that warrants medical supervision.',
    tags: ['Full fat adaptation', 'Hunger suppressed', 'Anti-inflammatory', 'Medical supervision advised'],
  },
  {
    name: 'Extended renewal',
    start: 120,
    end: 144,
    label: '5 – 6 days',
    summary: 'Extended cellular renewal',
    description: 'At 5–6 days, you are in rare fasting territory. Autophagy remains elevated. The body continues to conserve protein by becoming increasingly efficient at recycling amino acids. Electrolyte management becomes critical at this stage — sodium, potassium, and magnesium must be supplemented. Medical guidance is strongly recommended.',
    tags: ['Rare fasting territory', 'Protein recycling', 'Electrolytes critical', 'Medical guidance required'],
  },
  {
    name: '7-day fast',
    start: 144,
    end: Infinity,
    label: '6 – 7 days',
    summary: '7-day fast',
    description: 'A full 7-day fast is a serious medical undertaking and should only be done under clinical supervision. At this stage the body has exhausted most available fat stores in leaner individuals and may begin breaking down muscle protein. The cellular regeneration benefits have largely been achieved. Refeeding carefully and slowly is critical to avoid refeeding syndrome.',
    tags: ['Clinical supervision essential', 'Refeeding care critical', 'Maximum regeneration reached', 'Muscle risk increases'],
  },
];

let state = {
  active: false,
  startTime: null,
  goalHours: 16,
  timerInterval: null,
};

const $ = id => document.getElementById(id);
const timeDisplay    = $('timeDisplay');
const phaseLabel     = $('phaseLabel');
const ringFill       = $('ringFill');
const startBtn       = $('startBtn');
const statGoal       = $('statGoal');
const statPercent    = $('statPercent');
const statRemaining  = $('statRemaining');
const endTimeRow     = $('endTimeRow');
const endTimeDisplay = $('endTimeDisplay');
const historyList    = $('historyList');
const emptyHistory   = $('emptyHistory');
const setupSection   = $('setupSection');
const customInput    = $('customInput');
const customHoursInput = $('customHours');
const bodyIntro        = $('bodyIntro');
const currentStageCard = $('currentStageCard');
const csName           = $('csName');
const csTime           = $('csTime');
const csDesc           = $('csDesc');
const timeline         = $('timeline');
const startTimeToggle  = $('startTimeToggle');
const startTimePicker  = $('startTimePicker');
const startTimeInput   = $('startTimeInput');

function toggleStartTime() {
  const open = !startTimePicker.classList.contains('hidden');
  startTimePicker.classList.toggle('hidden', open);
  startTimeToggle.textContent = open ? 'Started earlier?' : 'Use current time';
  if (!open) {
    // Default to 1 hour ago as a helpful starting point
    const d = new Date(Date.now() - 3_600_000);
    startTimeInput.value = toLocalDateTimeValue(d);
  }
}

function toLocalDateTimeValue(date) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    $('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// Protocol buttons
document.querySelectorAll('.protocol-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (state.active) return;
    document.querySelectorAll('.protocol-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const val = btn.dataset.hours;
    if (val === 'custom') {
      customInput.classList.remove('hidden');
      state.goalHours = parseInt(customHoursInput.value) || 16;
    } else {
      customInput.classList.add('hidden');
      state.goalHours = parseInt(val);
    }
    statGoal.textContent = state.goalHours + 'h';
    renderGuide();
  });
});

customHoursInput.addEventListener('input', () => {
  const v = parseInt(customHoursInput.value);
  if (v >= 1 && v <= 168) {
    state.goalHours = v;
    statGoal.textContent = v + 'h';
    renderGuide();
  }
});

function toggleFast() {
  state.active ? stopFast() : startFast();
}

function startFast() {
  state.active = true;
  // Use custom start time if set, but don't allow future times
  if (!startTimePicker.classList.contains('hidden') && startTimeInput.value) {
    const picked = new Date(startTimeInput.value).getTime();
    state.startTime = Math.min(picked, Date.now());
  } else {
    state.startTime = Date.now();
  }
  // Reset the picker back to hidden for next time
  startTimePicker.classList.add('hidden');
  startTimeToggle.textContent = 'Started earlier?';
  setupSection.style.opacity = '0.4';
  setupSection.style.pointerEvents = 'none';
  startBtn.textContent = 'End Fast';
  startBtn.classList.add('stopping');
  const endTime = new Date(state.startTime + state.goalHours * 3_600_000);
  endTimeDisplay.textContent = fmt12(endTime);
  endTimeRow.style.display = '';
  saveState();
  buildTimeline();
  tick();
  state.timerInterval = setInterval(tick, 1000);
}

function stopFast() {
  clearInterval(state.timerInterval);
  state.timerInterval = null;
  const elapsed = Date.now() - state.startTime;
  addToHistory({
    startTime: state.startTime,
    elapsed,
    goalHours: state.goalHours,
    completed: elapsed >= state.goalHours * 3_600_000,
  });
  state.active = false;
  state.startTime = null;
  setupSection.style.opacity = '';
  setupSection.style.pointerEvents = '';
  startBtn.textContent = 'Start Fast';
  startBtn.classList.remove('stopping');
  endTimeRow.style.display = 'none';
  resetDisplay();
  clearState();
  renderHistory();
  // Reset body tab
  bodyIntro.classList.remove('hidden');
  currentStageCard.classList.add('hidden');
  buildTimeline();
}

function tick() {
  const elapsed = Date.now() - state.startTime;
  const goal    = state.goalHours * 3_600_000;
  const pct     = Math.min(elapsed / goal, 1);
  const overdue = elapsed > goal;

  timeDisplay.textContent = fmtDuration(elapsed);
  ringFill.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct);
  ringFill.classList.toggle('done',    pct >= 1 && !overdue);
  ringFill.classList.toggle('overdue', overdue);

  const currentStage = getStage(elapsed);
  phaseLabel.textContent = overdue
    ? 'Goal reached — +' + fmtDuration(elapsed - goal) + ' over'
    : currentStage.summary;

  statPercent.textContent   = Math.min(Math.round(pct * 100), 100) + '%';
  statRemaining.textContent = overdue ? '✓ done' : fmtDuration(goal - elapsed);

  updateBodyTab(elapsed, currentStage);
}

function getStage(ms) {
  const h = ms / 3_600_000;
  return STAGES.find(s => h >= s.start && h < s.end) || STAGES[STAGES.length - 1];
}

function updateBodyTab(elapsed, stage) {
  bodyIntro.classList.add('hidden');
  currentStageCard.classList.remove('hidden');
  csName.textContent = stage.name;
  csTime.textContent = stage.label;
  csDesc.textContent = stage.description;

  const h = elapsed / 3_600_000;

  // Update timeline dots and lines
  document.querySelectorAll('.tl-item').forEach((item, i) => {
    const s = STAGES[i];
    const dot  = item.querySelector('.tl-dot');
    const line = item.querySelector('.tl-line');
    const name = item.querySelector('.tl-name');
    const body = item.querySelector('.tl-body');
    const tags = item.querySelectorAll('.tl-tag');

    const reached = h >= s.start;
    const current = stage === s;

    dot.classList.toggle('reached', reached && !current);
    dot.classList.toggle('current', current);
    if (line) line.classList.toggle('reached', h >= s.end);
    name.classList.toggle('reached', reached);
    body.classList.toggle('reached', reached);
    tags.forEach(tag => tag.classList.toggle('active-tag', current));
  });
}

function buildTimeline() {
  timeline.innerHTML = STAGES.map((s, i) => `
    <div class="tl-item" data-index="${i}">
      <div class="tl-left">
        <div class="tl-dot"></div>
        <div class="tl-line"></div>
      </div>
      <div class="tl-right">
        <div class="tl-header">
          <span class="tl-name">${s.name}</span>
          <span class="tl-hours">${s.label}</span>
        </div>
        <div class="tl-body">${s.description}</div>
        <div class="tl-tags">${s.tags.map(t => `<span class="tl-tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}

function resetDisplay() {
  timeDisplay.textContent = '00:00:00';
  phaseLabel.textContent  = 'Ready to fast';
  ringFill.style.strokeDashoffset = CIRCUMFERENCE;
  ringFill.classList.remove('done', 'overdue');
  statPercent.textContent   = '0%';
  statRemaining.textContent = '—';
}

function fmtDuration(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return pad(h) + ':' + pad(m) + ':' + pad(s % 60);
}

function pad(n) { return String(n).padStart(2, '0'); }

function fmt12(date) {
  let h = date.getHours();
  const m = pad(date.getMinutes());
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return h + ':' + m + ' ' + ap;
}

function fmtDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' at ' + fmt12(d);
}

// History
function addToHistory(entry) {
  const h = getHistory();
  h.unshift(entry);
  if (h.length > 30) h.length = 30;
  localStorage.setItem('fastHistory', JSON.stringify(h));
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem('fastHistory')) || []; }
  catch { return []; }
}

function renderHistory() {
  const history = getHistory();
  if (!history.length) {
    historyList.innerHTML = '';
    emptyHistory.style.display = '';
    return;
  }
  emptyHistory.style.display = 'none';
  historyList.innerHTML = history.map(e => {
    const h = Math.floor(e.elapsed / 3_600_000);
    const m = Math.floor((e.elapsed % 3_600_000) / 60_000);
    const dur = h + 'h ' + pad(m) + 'm';
    const badge = e.completed
      ? '<span class="hi-badge">✓ Goal met</span>'
      : `<span class="hi-badge missed">${e.goalHours}h goal</span>`;
    return `<li class="history-item">
      <div class="hi-left">
        <span class="hi-date">${fmtDate(e.startTime)}</span>
        <span class="hi-duration">${dur}</span>
      </div>
      ${badge}
    </li>`;
  }).join('');
}

// Persistence
function saveState() {
  localStorage.setItem('fastState', JSON.stringify({
    startTime: state.startTime,
    goalHours: state.goalHours,
  }));
}

function clearState() {
  localStorage.removeItem('fastState');
}

function restoreState() {
  try {
    const saved = JSON.parse(localStorage.getItem('fastState'));
    if (!saved?.startTime) return;
    state.goalHours = saved.goalHours || 16;
    statGoal.textContent = state.goalHours + 'h';
    const matchBtn = document.querySelector(`.protocol-btn[data-hours="${state.goalHours}"]`);
    document.querySelectorAll('.protocol-btn').forEach(b => b.classList.remove('active'));
    if (matchBtn) {
      matchBtn.classList.add('active');
    } else {
      document.querySelector('.protocol-btn[data-hours="custom"]').classList.add('active');
      customInput.classList.remove('hidden');
      customHoursInput.value = state.goalHours;
    }
    state.active = true;
    state.startTime = saved.startTime;
    setupSection.style.opacity = '0.4';
    setupSection.style.pointerEvents = 'none';
    startBtn.textContent = 'End Fast';
    startBtn.classList.add('stopping');
    endTimeDisplay.textContent = fmt12(new Date(state.startTime + state.goalHours * 3_600_000));
    endTimeRow.style.display = '';
    buildTimeline();
    tick();
    state.timerInterval = setInterval(tick, 1000);
  } catch {}
}

// ─── Guide ───────────────────────────────────────────────────────────────────

const guideContent = $('guideContent');

function guideCategory(hours) {
  if (hours <= 16)  return 'short';
  if (hours <= 24)  return 'medium';
  if (hours <= 72)  return 'extended';
  return 'prolonged';
}

const GUIDE_DATA = {
  during: {
    hydration: {
      icon: '💧',
      title: 'Hydration',
      content: hours => {
        const cat = guideCategory(hours);
        const base = `<ul class="guide-list">
          <li><strong>Water is your best friend.</strong> Aim for at least 2–3 litres throughout the day. Sip steadily rather than drinking large amounts at once.</li>
          <li><strong>Black coffee</strong> is fine and can suppress appetite. Limit to 1–2 cups to avoid spiking cortisol.</li>
          <li><strong>Plain herbal teas</strong> (peppermint, ginger, chamomile) are excellent — warming, calming, and zero calories.</li>
          <li><strong>Sparkling water</strong> can help with hunger pangs — the bubbles create a feeling of fullness.</li>
        </ul>`;
        if (cat === 'short') return base;
        return base + `<div class="guide-tip">For fasts over 16 hours, add a pinch of quality sea salt or pink Himalayan salt to your water. This replaces sodium lost through reduced food intake and helps prevent headaches.</div>`;
      },
    },
    electrolytes: {
      icon: '⚡',
      title: 'Electrolytes',
      content: hours => {
        const cat = guideCategory(hours);
        if (cat === 'short') return `<ul class="guide-list">
          <li>For a 16h or shorter fast, electrolytes aren't usually necessary — you'll replenish them at your next meal.</li>
          <li>If you feel lightheaded or get a headache, a pinch of salt in water usually resolves it quickly.</li>
        </ul>`;
        if (cat === 'medium') return `<ul class="guide-list">
          <li><strong>Sodium:</strong> Add a pinch of sea salt to water or have plain salted water once or twice. This is the most important electrolyte during a fast.</li>
          <li><strong>Potassium:</strong> If your fast runs close to 24h, consider a supplement or a small amount of cream of tartar dissolved in water.</li>
          <li><strong>Magnesium:</strong> Helps with sleep, cramps, and mood. A magnesium glycinate supplement before bed is ideal.</li>
        </ul><div class="guide-tip">A simple electrolyte drink: 500ml water + pinch of sea salt + squeeze of lemon. Zero calories, breaks nothing.</div>`;
        if (cat === 'extended') return `<ul class="guide-list">
          <li><strong>Sodium (critical):</strong> 1,000–2,000mg per day. Salt your water or use an electrolyte supplement without sugar.</li>
          <li><strong>Potassium (critical):</strong> 1,000–3,500mg per day. Supplement or use low-sodium salt (which is potassium chloride).</li>
          <li><strong>Magnesium (critical):</strong> 300–500mg per day. Deficiency causes cramps, poor sleep, and anxiety.</li>
          <li><strong>Phosphorus:</strong> Usually fine unless the fast extends past 5 days.</li>
        </ul><div class="guide-alert">Without electrolytes on a multi-day fast, you risk hyponatraemia (low sodium), severe cramping, heart palpitations and fatigue. Do not skip these.</div>`;
        return `<ul class="guide-list">
          <li><strong>Sodium:</strong> 2,000–3,000mg daily — salt water multiple times per day.</li>
          <li><strong>Potassium:</strong> 3,500mg daily — supplement essential.</li>
          <li><strong>Magnesium:</strong> 400–500mg daily — supplement essential.</li>
          <li><strong>Phosphorus & Calcium:</strong> Monitor carefully for fasts beyond 5 days.</li>
        </ul><div class="guide-alert">A fast of this length requires medical supervision. Electrolyte imbalances at this stage can be life-threatening. Please consult a doctor.</div>`;
      },
    },
    activity: {
      icon: '🚶',
      title: 'Activity & Exercise',
      content: hours => {
        const cat = guideCategory(hours);
        if (cat === 'short') return `<ul class="guide-list">
          <li><strong>Light to moderate exercise is absolutely fine</strong> during a 16–18h fast — many people prefer fasted workouts.</li>
          <li><strong>Strength training:</strong> Fine, but strength may feel slightly reduced. Have your meal shortly after to aid recovery.</li>
          <li><strong>Cardio:</strong> Fasted cardio is excellent for fat burning — a 30–45 min walk or easy run works well.</li>
          <li><strong>HIIT:</strong> Possible but may feel harder. Listen to your body.</li>
        </ul>`;
        if (cat === 'medium') return `<ul class="guide-list">
          <li><strong>Light walking</strong> (20–30 mins) is ideal and helps manage hunger.</li>
          <li><strong>Avoid heavy weight training</strong> past the 20h mark — muscle breakdown risk increases without fuel.</li>
          <li><strong>Yoga and stretching</strong> are excellent — gentle movement aids circulation without taxing your system.</li>
          <li>If you feel dizzy or lightheaded during exercise, stop and have some salted water.</li>
        </ul>`;
        return `<ul class="guide-list">
          <li><strong>Gentle walking only.</strong> 15–20 minute walks help with circulation and keep energy moving without stressing your body.</li>
          <li><strong>No gym, no HIIT, no heavy lifting.</strong> Your body is in repair mode — intense exercise competes with that process.</li>
          <li><strong>Rest is productive.</strong> Sleep, reading, light tasks. Your body is doing significant work at a cellular level.</li>
          <li>If you feel weak, dizzy, or your heart races — stop activity and rest immediately.</li>
        </ul><div class="guide-alert">Extended fasting puts significant stress on the body. Vigorous exercise during this period can be dangerous.</div>`;
      },
    },
    mindset: {
      icon: '🧠',
      title: 'Managing Hunger & Mindset',
      content: hours => `<ul class="guide-list">
        <li><strong>Hunger comes in waves.</strong> It peaks and then passes — usually within 20 minutes. Ride it out with water or tea.</li>
        <li><strong>Distraction is your best tool.</strong> Hunger is much louder when you're bored. Stay engaged with work, hobbies, or social activity.</li>
        <li><strong>Don't watch food content.</strong> Cooking videos, food ads, and recipe browsing amplify hunger signals significantly.</li>
        <li><strong>Black coffee or green tea</strong> suppress ghrelin (the hunger hormone) for 1–2 hours.</li>
        <li><strong>Brush your teeth.</strong> A clean mouth reduces food cravings and signals to the brain that eating is "done."</li>
        <li><strong>Sleep through the hard part.</strong> Starting your fast after dinner means you sleep through 6–8 hours of it.</li>
        <li><strong>Remember it's not real hunger.</strong> True physiological hunger takes days to set in. Early hunger is hormonal — your body is used to eating at certain times.</li>
      </ul>${hours >= 48 ? '<div class="guide-tip">After 48 hours, ghrelin (the hunger hormone) typically drops significantly. Many extended fasters report that day 3 is actually easier than day 2.</div>' : ''}`,
    },
    sleep: {
      icon: '😴',
      title: 'Sleep',
      content: hours => {
        const ext = hours >= 48;
        return `<ul class="guide-list">
          <li><strong>Sleep quality often improves</strong> during fasting — ketones are a clean fuel for the brain and many people report deeper, more restful sleep.</li>
          <li>Take magnesium glycinate before bed — it promotes relaxation and sleep depth, and is commonly depleted during fasting.</li>
          <li>You may feel <strong>cooler than usual</strong> at night — your metabolic rate drops slightly during a fast. Have an extra blanket ready.</li>
          ${ext ? '<li>During multi-day fasts, napping is encouraged. Your body is doing intensive repair work and rest maximises this.</li>' : ''}
        </ul>`;
      },
    },
  },
  breaking: {
    protocol: hours => {
      const cat = guideCategory(hours);
      if (cat === 'short') return {
        title: 'Breaking a Short Fast (up to 16h)',
        steps: [
          { title: 'Eat normally — no special protocol needed', body: 'After a 16h fast your digestive system is perfectly capable of handling a normal meal. No need for special refeeding.' },
          { title: 'Prioritise protein and vegetables first', body: 'Starting with protein (eggs, chicken, fish) and fibre (vegetables, salad) helps stabilise blood sugar before carbohydrates.' },
          { title: 'Avoid a huge binge', body: 'The temptation is to overeat after fasting. Eat mindfully — your stomach may feel smaller than usual. Stop when you\'re satisfied, not stuffed.' },
          { title: 'Avoid ultra-processed foods as your first meal', body: 'Refined carbs and sugars will spike insulin hard after a fast. A balanced whole-food meal makes the most of the metabolic benefits you\'ve just built up.' },
        ],
        avoid: null,
        tip: 'Good first meals: eggs with avocado and greens, grilled salmon with roasted vegetables, a Greek salad with chicken.',
      };
      if (cat === 'medium') return {
        title: 'Breaking a Medium Fast (16–24h)',
        steps: [
          { title: 'Start small — don\'t jump straight to a full meal', body: 'After 18–24h, give your digestive system 15–30 minutes to wake up before your main meal.' },
          { title: 'Option 1: A small snack first', body: 'A small handful of nuts, a boiled egg, or a few olives. Something with fat and protein, low in carbs. Wait 20 minutes.' },
          { title: 'Option 2: Bone broth', body: 'Warm bone broth is ideal — it\'s rich in collagen, minerals, and electrolytes, and is very gentle on the gut.' },
          { title: 'Then eat a normal balanced meal', body: 'Protein + healthy fats + vegetables. Introduce carbohydrates last, and choose complex sources (sweet potato, brown rice, legumes) over refined ones.' },
        ],
        avoid: 'Sugary drinks, alcohol, large portions of refined carbs, and raw cruciferous vegetables (like broccoli or cabbage) as your very first food — these can cause significant bloating.',
        tip: 'Ideal first meal: bone broth → grilled fish or chicken with roasted vegetables and a small portion of sweet potato.',
      };
      if (cat === 'extended') return {
        title: 'Breaking an Extended Fast (24–72h)',
        steps: [
          { title: 'Bone broth first — 30–60 minutes before anything else', body: 'Warm, salty bone broth gently reawakens your digestive system, replenishes electrolytes, and prepares your gut lining for food.' },
          { title: 'Soft, easily digestible foods next', body: 'Scrambled eggs, avocado, steamed fish, soft-cooked vegetables, yoghurt. Your gut enzymes and stomach acid are lower after an extended fast and need time to ramp back up.' },
          { title: 'Reintroduce carbohydrates slowly', body: 'Wait until your second or third meal before introducing carbohydrates. Start with small amounts of easily digested sources: banana, white rice, sweet potato.' },
          { title: 'Eat small portions and eat slowly', body: 'Your stomach has contracted during the fast. Overeating will be uncomfortable and can cause nausea. Small meals, chewed thoroughly.' },
          { title: 'Continue electrolyte supplementation', body: 'Refeeding can cause a shift in electrolytes (particularly phosphorus). Continue taking electrolytes for at least 24 hours after breaking the fast.' },
        ],
        avoid: 'Large meals, raw vegetables, high-fibre foods, alcohol, processed sugars, and dairy in large quantities as your first foods. These can cause severe digestive distress.',
        tip: null,
      };
      return {
        title: 'Breaking a Prolonged Fast (72h+)',
        steps: [
          { title: 'Medical guidance strongly recommended', body: 'Breaking a fast of this length incorrectly can cause refeeding syndrome — a potentially life-threatening shift in electrolytes. Please consult a doctor before breaking.' },
          { title: 'Day 1 of refeeding — liquids only', body: 'Bone broth, vegetable broth, diluted fruit juice. Very small amounts (a cup every 2–3 hours). No solid food on day 1.' },
          { title: 'Day 2 — soft solids only', body: 'Scrambled eggs, avocado, steamed fish, soft cooked vegetables. Still small portions. No carbohydrates yet.' },
          { title: 'Day 3 — slowly reintroduce carbohydrates', body: 'A small amount of white rice or banana. Monitor how you feel carefully. Continue eating small portions, multiple times a day.' },
          { title: 'Continue electrolyte supplementation throughout', body: 'Phosphorus in particular is critical during refeeding. A doctor may recommend a specific electrolyte protocol.' },
        ],
        avoid: 'Any large meals, alcohol, processed foods, high-sugar foods, raw vegetables, or large quantities of carbohydrates. Refeeding syndrome is real and serious.',
        tip: null,
      };
    },
  },
  meals: hours => {
    const cat = guideCategory(hours);
    const base = [
      { icon: '🥚', title: 'Eggs', body: 'The ideal fast-breaking food. High in protein and healthy fats, easy to digest, and highly satiating. Scrambled, poached, or boiled.' },
      { icon: '🥑', title: 'Avocado', body: 'Rich in healthy monounsaturated fats and potassium. Excellent for replenishing electrolytes and providing sustained energy.' },
      { icon: '🐟', title: 'Oily fish', body: 'Salmon, mackerel, and sardines provide omega-3s, high-quality protein, and healthy fats — ideal for reducing inflammation after a fast.' },
      { icon: '🍗', title: 'Lean protein', body: 'Chicken breast, turkey, or lean beef. Protein is the priority — it supports muscle repair, keeps you full, and stabilises blood sugar.' },
      { icon: '🥬', title: 'Cooked leafy greens', body: 'Spinach, kale, and Swiss chard. Rich in minerals and easy on the gut when cooked. Avoid raw in large quantities immediately post-fast.' },
      { icon: '🍠', title: 'Sweet potato', body: 'A gentle carbohydrate source, rich in potassium and fibre. Better than refined carbs for your first carb reintroduction.' },
    ];
    if (cat === 'short') {
      base.push({ icon: '🫐', title: 'Berries', body: 'High in antioxidants, low in sugar, and easy to digest. A great way to reintroduce natural sugars gently.' });
      base.push({ icon: '🥗', title: 'Mixed salad with olive oil', body: 'Olive oil provides healthy fats and anti-inflammatory compounds. Pair with protein for a balanced, nutrient-dense first meal.' });
    }
    if (cat !== 'short') {
      base.unshift({ icon: '🦴', title: 'Bone broth', body: 'The gold standard for breaking longer fasts. Rich in collagen, glycine, glutamine, and electrolytes. Heals and prepares the gut lining for solid food.' });
    }
    return base;
  },
  avoid: hours => {
    const cat = guideCategory(hours);
    const common = [
      { icon: '🍬', title: 'Sugary foods & drinks', body: 'A sugar spike immediately after fasting will crash your insulin hard and undo much of the metabolic work of your fast. Avoid juice, sweets, and fizzy drinks.' },
      { icon: '🍺', title: 'Alcohol', body: 'Your liver is already working hard processing the metabolic changes of the fast. Alcohol adds significant stress and will hit much harder than usual on an empty stomach.' },
      { icon: '🍕', title: 'Ultra-processed foods', body: 'High in refined carbs, seed oils, and additives. Your gut is sensitive post-fast — these will cause bloating, insulin spikes, and undermine your fast\'s benefits.' },
    ];
    if (cat !== 'short') {
      common.push({ icon: '🥦', title: 'Raw cruciferous vegetables', body: 'Broccoli, cauliflower, and cabbage are excellent foods normally, but on a post-fast gut they cause severe bloating and discomfort. Cook them thoroughly first.' });
      common.push({ icon: '🫘', title: 'Large portions of beans & legumes', body: 'High fibre content can overwhelm a post-fast digestive system. Introduce slowly and in small amounts after longer fasts.' });
    }
    if (cat === 'extended' || cat === 'prolonged') {
      common.push({ icon: '🍝', title: 'Large carbohydrate portions', body: 'A huge plate of pasta or rice after a 48h+ fast can cause severe digestive distress and significant blood sugar swings. Reintroduce carbs slowly and in small amounts.' });
    }
    return common;
  },
};

function renderGuide() {
  const hours = state.goalHours;
  const active = state.active;
  const cat = guideCategory(hours);
  const protocol = GUIDE_DATA.breaking.protocol(hours);
  const meals = GUIDE_DATA.meals(hours);
  const avoid = GUIDE_DATA.avoid(hours);
  const duringCards = GUIDE_DATA.during;

  const catLabel = { short: 'Short fast', medium: 'Medium fast', extended: 'Extended fast', prolonged: 'Prolonged fast' }[cat];

  function card(icon, title, bodyHtml, id) {
    return `<div class="guide-card" id="gc-${id}">
      <div class="guide-card-header" onclick="toggleGuideCard('gc-${id}')">
        <span class="guide-icon">${icon}</span>
        <span class="guide-card-title">${title}</span>
        <span class="guide-chevron">▶</span>
      </div>
      <div class="guide-card-body">${bodyHtml}</div>
    </div>`;
  }

  const duringHtml = Object.entries(duringCards).map(([key, def]) =>
    card(def.icon, def.title, def.content(hours), 'during-' + key)
  ).join('');

  const breakStepsHtml = protocol.steps.map((s, i) => `
    <div class="guide-meal-step">
      <div class="guide-step-num">${i + 1}</div>
      <div class="guide-step-text"><strong>${s.title}</strong><br>${s.body}</div>
    </div>`).join('');
  const breakAvoidHtml = protocol.avoid ? `<div class="guide-alert"><strong>Avoid:</strong> ${protocol.avoid}</div>` : '';
  const breakTipHtml   = protocol.tip   ? `<div class="guide-tip">${protocol.tip}</div>` : '';
  const breakHtml = breakStepsHtml + breakAvoidHtml + breakTipHtml;

  const mealsHtml = meals.map(m =>
    card(m.icon, m.title, `<p>${m.body}</p>`, 'meal-' + m.title.replace(/\s/g,''))
  ).join('');

  const avoidHtml = avoid.map(a =>
    card(a.icon, a.title, `<p>${a.body}</p>`, 'avoid-' + a.title.replace(/\s/g,''))
  ).join('');

  guideContent.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:28px">
      <div class="guide-section">
        <div class="guide-section-title">During your fast &mdash; ${catLabel}</div>
        ${duringHtml}
      </div>
      <div class="guide-section">
        <div class="guide-section-title">Breaking your fast</div>
        ${card('🍽️', protocol.title, breakHtml, 'break-protocol')}
      </div>
      <div class="guide-section">
        <div class="guide-section-title">Best foods to eat post-fast</div>
        ${mealsHtml}
      </div>
      <div class="guide-section">
        <div class="guide-section-title">What to avoid post-fast</div>
        ${avoidHtml}
      </div>
    </div>
  `;
}

function toggleGuideCard(id) {
  const card = $(id);
  if (card) card.classList.toggle('open');
}

// Boot
statGoal.textContent = state.goalHours + 'h';
buildTimeline();
renderHistory();
renderGuide();
restoreState();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
