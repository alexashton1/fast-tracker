const CIRCUMFERENCE = 2 * Math.PI * 96; // SVG ring r=96

let state = {
  active: false,
  startTime: null,
  goalHours: 16,
  timerInterval: null,
};

const $ = id => document.getElementById(id);
const timeDisplay  = $('timeDisplay');
const phaseLabel   = $('phaseLabel');
const ringFill     = $('ringFill');
const startBtn     = $('startBtn');
const statGoal     = $('statGoal');
const statPercent  = $('statPercent');
const statRemaining = $('statRemaining');
const endTimeRow   = $('endTimeRow');
const endTimeDisplay = $('endTimeDisplay');
const historyList  = $('historyList');
const emptyHistory = $('emptyHistory');
const setupSection = $('setupSection');
const customInput  = $('customInput');
const customHoursInput = $('customHours');

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
  if (v >= 1 && v <= 72) {
    state.goalHours = v;
    statGoal.textContent = v + 'h';
  }
});

function toggleFast() {
  state.active ? stopFast() : startFast();
}

function startFast() {
  state.active = true;
  state.startTime = Date.now();
  setupSection.style.opacity = '0.4';
  setupSection.style.pointerEvents = 'none';
  startBtn.textContent = 'End Fast';
  startBtn.classList.add('stopping');
  const endTime = new Date(state.startTime + state.goalHours * 3_600_000);
  endTimeDisplay.textContent = fmt12(endTime);
  endTimeRow.style.display = '';
  saveState();
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
}

function tick() {
  const elapsed = Date.now() - state.startTime;
  const goal    = state.goalHours * 3_600_000;
  const pct     = Math.min(elapsed / goal, 1);
  const overdue = elapsed > goal;

  timeDisplay.textContent = fmtDuration(elapsed);
  ringFill.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct);
  ringFill.classList.toggle('done',   pct >= 1 && !overdue);
  ringFill.classList.toggle('overdue', overdue);

  phaseLabel.textContent = overdue
    ? 'Goal reached — +' + fmtDuration(elapsed - goal) + ' over'
    : phase(elapsed);

  statPercent.textContent   = Math.min(Math.round(pct * 100), 100) + '%';
  statRemaining.textContent = overdue ? '✓ done' : fmtDuration(goal - elapsed);
}

function resetDisplay() {
  timeDisplay.textContent = '00:00:00';
  phaseLabel.textContent  = 'Ready to fast';
  ringFill.style.strokeDashoffset = CIRCUMFERENCE;
  ringFill.classList.remove('done', 'overdue');
  statPercent.textContent   = '0%';
  statRemaining.textContent = '—';
}

function phase(ms) {
  const h = ms / 3_600_000;
  if (h < 1)  return 'Digestion phase';
  if (h < 4)  return 'Post-absorptive phase';
  if (h < 8)  return 'Gluconeogenesis begins';
  if (h < 12) return 'Glycogen depleting';
  if (h < 16) return 'Ketosis building';
  if (h < 20) return 'Deep ketosis';
  if (h < 24) return 'Autophagy active';
  return 'Extended fast';
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
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
    ' at ' + fmt12(d);
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

// State persistence

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
    tick();
    state.timerInterval = setInterval(tick, 1000);
  } catch {}
}

// Boot
statGoal.textContent = state.goalHours + 'h';
renderHistory();
restoreState();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
