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
  });
});

customHoursInput.addEventListener('input', () => {
  const v = parseInt(customHoursInput.value);
  if (v >= 1 && v <= 168) {
    state.goalHours = v;
    statGoal.textContent = v + 'h';
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

// Boot
statGoal.textContent = state.goalHours + 'h';
buildTimeline();
renderHistory();
restoreState();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
