// ── Dashboard & Library ────────────────────────────────────────────────────────
window.renderDashboard = function() {
  const sessions = Storage.getSessions();

  // Stats
  document.getElementById('total-cases').textContent = sessions.length;

  if (sessions.length > 0) {
    const avg = s => (sessions.slice(0, Math.min(s, sessions.length)).reduce((a, b) => a + b.overall, 0) / Math.min(s, sessions.length)).toFixed(1);
    document.getElementById('avg-score').textContent = avg(sessions.length);
    document.getElementById('recent-score').textContent = sessions[0].overall.toFixed(1);

    // Streak
    let streak = 0;
    const today = new Date(); today.setHours(0,0,0,0);
    const seen = new Set();
    for (const s of sessions) {
      const d = new Date(s.timestamp); d.setHours(0,0,0,0);
      const key = d.toDateString();
      if (!seen.has(key)) { seen.add(key); streak++; } else continue;
      const diff = (today - d) / 86400000;
      if (diff > streak) break;
    }
    document.getElementById('streak-count').textContent = streak;
  } else {
    ['avg-score','recent-score','streak-count'].forEach(id => { const el = document.getElementById(id); if(el) el.textContent = '—'; });
  }

  // Recent sessions list
  const listEl = document.getElementById('recent-sessions');
  if (listEl) {
    if (sessions.length === 0) {
      listEl.innerHTML = '<p class="empty-state">No sessions yet. Start a case to begin!</p>';
    } else {
      listEl.innerHTML = sessions.slice(0, 6).map(s => {
        const verdictClass = { 'Strong Hire': 'verdict-strong', 'Hire': 'verdict-hire', 'Borderline': 'verdict-borderline', 'No Hire': 'verdict-no' }[s.verdict] || '';
        const date = new Date(s.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        return `
          <div class="session-row">
            <div class="session-info">
              <span class="session-title">${s.caseTitle}</span>
              <span class="session-meta">${date} · ${s.durationMinutes}min · ${s.caseType}</span>
            </div>
            <div class="session-scores">
              <span class="score-chip">${s.overall.toFixed(1)}</span>
              <span class="verdict-chip ${verdictClass}">${s.verdict}</span>
            </div>
          </div>`;
      }).join('');
    }
  }

  // Trend chart
  drawTrendChart(sessions);

  // Weakness radar
  drawWeaknessRadar(sessions);

  // Case type performance
  drawCaseTypePerf(sessions);
};

function drawTrendChart(sessions) {
  const canvas = document.getElementById('trend-chart');
  if (!canvas || !window.Chart) return;
  if (canvas._chart) canvas._chart.destroy();

  if (sessions.length < 2) {
    canvas.parentElement.querySelector('.chart-empty') && (canvas.parentElement.querySelector('.chart-empty').style.display = 'block');
    return;
  }

  const last10 = sessions.slice(0, 10).reverse();
  const labels = last10.map((s, i) => `#${i+1}`);
  const dims = ['structuring', 'analytics', 'synthesis', 'communication'];
  const colors = { structuring: '#00a651', analytics: '#2196F3', synthesis: '#FF9800', communication: '#9C27B0' };

  canvas._chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: dims.map(d => ({
        label: d.charAt(0).toUpperCase() + d.slice(1),
        data: last10.map(s => s.scores?.[d] || 0),
        borderColor: colors[d],
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 4,
        tension: 0.3,
      })).concat([{
        label: 'BCG Bar (7.0)',
        data: last10.map(() => 7),
        borderColor: 'rgba(255,255,255,0.25)',
        borderWidth: 1,
        borderDash: [6,3],
        pointRadius: 0,
        fill: false,
      }])
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        y: { min: 0, max: 10, grid: { color: 'rgba(255,255,255,0.08)' }, ticks: { color: '#aaa', stepSize: 2 } },
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#aaa' } }
      },
      plugins: { legend: { labels: { color: '#ccc', boxWidth: 12 } } }
    }
  });
}

function drawWeaknessRadar(sessions) {
  const canvas = document.getElementById('weakness-radar');
  if (!canvas || !window.Chart) return;
  if (canvas._chart) canvas._chart.destroy();
  if (sessions.length === 0) return;

  const dims = ['structuring', 'analytics', 'synthesis', 'communication'];
  const avgs = dims.map(d => {
    const vals = sessions.filter(s => s.scores?.[d]).map(s => s.scores[d]);
    return vals.length ? vals.reduce((a,b) => a+b, 0) / vals.length : 0;
  });

  canvas._chart = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: ['Structuring', 'Analytics', 'Synthesis', 'Communication'],
      datasets: [
        { label: 'Your Average', data: avgs, backgroundColor: 'rgba(0,166,81,0.15)', borderColor: '#00a651', borderWidth: 2, pointBackgroundColor: '#00a651' },
        { label: 'BCG SA2 Bar', data: [7,7,7,7], backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.25)', borderWidth: 1, borderDash: [5,5], pointBackgroundColor: 'transparent' }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: { r: { min: 0, max: 10, ticks: { stepSize: 2, color: '#aaa', backdropColor: 'transparent' }, grid: { color: 'rgba(255,255,255,0.1)' }, pointLabels: { color: '#ccc', font: { size: 12 } } } },
      plugins: { legend: { labels: { color: '#ccc', boxWidth: 12 } } }
    }
  });
}

function drawCaseTypePerf(sessions) {
  const container = document.getElementById('case-type-perf');
  if (!container) return;
  if (sessions.length === 0) { container.innerHTML = '<p class="empty-state">Complete cases to see breakdown</p>'; return; }

  const types = {};
  sessions.forEach(s => {
    if (!types[s.caseType]) types[s.caseType] = { total: 0, count: 0 };
    types[s.caseType].total += s.overall;
    types[s.caseType].count++;
  });

  const typeLabels = { profitability: 'Profitability', market_entry: 'Market Entry', ma: 'M&A', growth: 'Growth', operations: 'Operations' };
  container.innerHTML = Object.entries(types).map(([type, data]) => {
    const avg = (data.total / data.count).toFixed(1);
    const pct = Math.round(avg * 10);
    const color = avg >= 7 ? '#00a651' : avg >= 5 ? '#ff9800' : '#ef5350';
    return `
      <div class="type-row">
        <span class="type-label">${typeLabels[type] || type}</span>
        <div class="type-bar-wrap">
          <div class="type-bar" style="width:${pct}%;background:${color}"></div>
        </div>
        <span class="type-score" style="color:${color}">${avg}</span>
        <span class="type-count">${data.count}x</span>
      </div>`;
  }).join('');
}

// ── Case Library ───────────────────────────────────────────────────────────────
window.renderLibrary = function(filterType = 'all', filterDiff = 'all') {
  const grid = document.getElementById('case-grid');
  if (!grid) return;

  let cases = window.CASES || [];
  if (filterType !== 'all') cases = cases.filter(c => c.type === filterType);
  if (filterDiff !== 'all') cases = cases.filter(c => c.difficulty === filterDiff);

  const typeIcons = { profitability: '📊', market_entry: '🌍', ma: '🤝', growth: '🚀', operations: '⚙️' };
  const diffColors = { Easy: '#00c853', Medium: '#ff9800', Hard: '#ef5350' };

  grid.innerHTML = cases.map(c => `
    <div class="case-card" onclick="startCaseById('${c.id}')">
      <div class="case-card-header">
        <span class="case-type-icon">${typeIcons[c.type] || '📋'}</span>
        <span class="case-diff" style="color:${diffColors[c.difficulty]}">${c.difficulty}</span>
      </div>
      <h3 class="case-card-title">${c.title}</h3>
      <p class="case-card-industry">${c.industry}${c.source ? ` <span style="opacity:0.5;font-size:10px;">· ${c.source}</span>` : ''}</p>
      <p class="case-card-context">${c.context.substring(0, 120)}...</p>
      <button class="btn-primary case-start-btn">Start Case →</button>
    </div>`).join('');

  if (cases.length === 0) grid.innerHTML = '<p class="empty-state">No cases match this filter.</p>';
};

window.startCaseById = function(id) {
  const c = (window.CASES || []).find(x => x.id === id);
  if (!c) return;
  showView('practice');
  window.Interview.startCase(c);
};

// Library filters
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      document.querySelectorAll(`.filter-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const typeFilter = document.querySelector('.filter-btn[data-group="type"].active')?.dataset.value || 'all';
      const diffFilter = document.querySelector('.filter-btn[data-group="diff"].active')?.dataset.value || 'all';
      renderLibrary(typeFilter, diffFilter);
    });
  });

  // AI case generation
  document.getElementById('generate-case-btn')?.addEventListener('click', async () => {
    const type = document.getElementById('gen-type').value;
    const industry = document.getElementById('gen-industry').value;
    const difficulty = document.getElementById('gen-difficulty').value;
    const btn = document.getElementById('generate-case-btn');
    btn.disabled = true; btn.textContent = 'Generating...';
    try {
      const prompt = window.buildCaseGenerationPrompt(type, industry, difficulty);
      const response = await callClaude([{ role: 'user', content: prompt }], 'You are a BCG case interview writer. Return only valid JSON.', 'claude-sonnet-4-6', 2000);
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Invalid case format returned');
      const newCase = JSON.parse(jsonMatch[0]);
      window.CASES = window.CASES || [];
      window.CASES.unshift(newCase);
      showToast('New case generated!');
      renderLibrary();
      showView('library');
    } catch (err) {
      showToast('Generation failed: ' + err.message, 'error');
    }
    btn.disabled = false; btn.textContent = 'Generate Case';
  });

  // Practice view - quick start buttons
  document.querySelectorAll('.quick-start-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const cases = (window.CASES || []).filter(c => c.type === type);
      if (cases.length) {
        const random = cases[Math.floor(Math.random() * cases.length)];
        Interview.startCase(random);
      }
    });
  });

  // Time target selector — update CaseTimer target and highlight active button
  document.querySelectorAll('.time-opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target.id === 'custom-time-input') return; // let input handle itself
      document.querySelectorAll('.time-opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mins = btn.dataset.mins;
      if (mins === 'custom') {
        const input = document.getElementById('custom-time-input');
        const v = parseInt(input?.value);
        if (v >= 10 && v <= 90 && window.CaseTimer) CaseTimer.setTarget(v);
      } else {
        if (window.CaseTimer) CaseTimer.setTarget(parseInt(mins));
      }
    });
  });

  // Custom time input — update target as user types
  document.getElementById('custom-time-input')?.addEventListener('input', (e) => {
    const v = parseInt(e.target.value);
    if (v >= 10 && v <= 90 && window.CaseTimer) {
      CaseTimer.setTarget(v);
      // Activate the custom button
      document.querySelectorAll('.time-opt-btn').forEach(b => b.classList.remove('active'));
      e.target.closest('.time-opt-btn')?.classList.add('active');
    }
  });
});

// ── Focus Banner (shown on case-select screen) ────────────────────────────────
window.showFocusBanner = function() {
  const banner = document.getElementById('focus-banner');
  const descEl = document.getElementById('focus-banner-desc');
  const btnEl  = document.getElementById('focus-banner-btn');
  if (!banner) return;

  const sessions = Storage.getSessions();
  if (!sessions.length) { banner.style.display = 'none'; return; }

  const last = sessions[0];
  if (!last.scores) { banner.style.display = 'none'; return; }

  const DIMS = ['structuring', 'analytics', 'synthesis', 'communication'];
  const gaps = DIMS.filter(d => (last.scores[d] || 0) < 7.0)
                   .sort((a, b) => last.scores[a] - last.scores[b]);

  if (!gaps.length) { banner.style.display = 'none'; return; }

  const dim = gaps[0];
  const DIM_LABELS = { structuring: 'Structuring', analytics: 'Analytics', synthesis: 'Synthesis', communication: 'Communication' };
  const DIM_DESC   = {
    structuring:   'Work on MECE hypothesis-first frameworks',
    analytics:     'Sharpen quant reasoning & math confidence',
    synthesis:     'Practice crisp Situation → Insight → Action recommendations',
    communication: 'Cut filler words, add signposting & executive presence',
  };

  banner.style.display = 'flex';
  if (descEl) descEl.textContent = `${DIM_LABELS[dim]} (${last.scores[dim].toFixed(1)}/10 last session) — ${DIM_DESC[dim]}`;
  if (btnEl)  btnEl.onclick = () => window.startTargetedCase(dim);
};

// ── Case History Repository ────────────────────────────────────────────────────
window.renderHistory = function() {
  const sessions = Storage.getSessions();
  const container = document.getElementById('history-list');
  if (!container) return;

  if (sessions.length === 0) {
    container.innerHTML = '<p class="empty-state" style="padding:40px;text-align:center;">No sessions yet. Complete a case to see your history here.</p>';
    return;
  }

  const verdictColors = { 'Strong Hire':'#00c853','Hire':'#00a651','Borderline':'#ff9800','No Hire':'#ef5350' };
  const typeIcons = { profitability:'📊', market_entry:'🌍', ma:'🤝', growth:'🚀', operations:'⚙️' };

  container.innerHTML = sessions.map((s, idx) => {
    const date = new Date(s.timestamp).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
    const time = new Date(s.timestamp).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
    const vColor = verdictColors[s.verdict] || '#888';
    const dims = ['structuring','analytics','synthesis','communication'];
    return `
      <div class="history-row" onclick="openTranscript(${idx})">
        <div class="history-icon">${typeIcons[s.caseType] || '📋'}</div>
        <div class="history-info">
          <div class="history-title">${s.caseTitle}</div>
          <div class="history-meta">${date} · ${time} · ${s.durationMinutes || '—'} min · ${s.caseType?.replace('_',' ')}</div>
        </div>
        <div class="history-dim-scores">
          ${dims.map(d => `<div class="dim-pill" title="${d}">${d.slice(0,1).toUpperCase()} <strong>${s.scores?.[d]?.toFixed(1) ?? '—'}</strong></div>`).join('')}
        </div>
        <div class="history-overall" style="color:${s.overall >= 7 ? '#00a651' : s.overall >= 5 ? '#ff9800' : '#ef5350'}">${s.overall?.toFixed(1) ?? '—'}</div>
        <div class="history-verdict" style="color:${vColor}">${s.verdict || '—'}</div>
        <div class="history-arrow">›</div>
      </div>`;
  }).join('');
};

// Store current open session index for debrief generation
window._openSessionIdx = null;

window.openTranscript = function(idx) {
  const sessions = Storage.getSessions();
  const s = sessions[idx];
  if (!s) return;
  window._openSessionIdx = idx;

  const modal = document.getElementById('transcript-modal');
  document.getElementById('modal-case-title').textContent = s.caseTitle;
  document.getElementById('modal-case-meta').textContent =
    `${new Date(s.timestamp).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})} · ${s.durationMinutes || '—'} min · ${s.caseType?.replace('_',' ')} · ${s.verdict || '—'}`;

  // Score summary chips
  const dims = ['structuring','analytics','synthesis','communication'];
  document.getElementById('modal-scores').innerHTML = dims.map(d => {
    const num = parseFloat(s.scores?.[d]);
    const col = !isNaN(num) ? (num >= 7 ? '#00a651' : num >= 5 ? '#ff9800' : '#ef5350') : '#888';
    return `<div style="background:#243320;border:1px solid rgba(0,166,81,0.15);border-radius:8px;padding:10px;text-align:center;">
      <div style="font-size:20px;font-weight:800;color:${col}">${!isNaN(num) ? num.toFixed(1) : '—'}</div>
      <div style="font-size:10px;color:#5a7054;text-transform:uppercase;letter-spacing:0.5px;margin-top:3px;">${d}</div>
    </div>`;
  }).join('');

  // Transcript pane
  const rawTranscript = s.transcript || 'No transcript saved.';
  const formatted = rawTranscript
    .replace(/^INTERVIEWER:/gm, '\n🎙️  INTERVIEWER:')
    .replace(/^CANDIDATE:/gm, '\n🧑  YOU:');
  document.getElementById('modal-pane-transcript').textContent = formatted;

  // Feedback pane
  const fb = s.feedback;
  if (fb) {
    document.getElementById('modal-pane-feedback').innerHTML = `
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${dims.map(d => `
          <div style="background:#243320;border-radius:8px;padding:14px;">
            <div style="font-size:10px;color:#5a7054;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">${d}</div>
            <div style="font-size:13px;color:#c8d8c4;line-height:1.6;">${fb.dimensionFeedback?.[d] || '—'}</div>
          </div>`).join('')}
        <div style="background:#1a4731;border:1px solid rgba(0,166,81,0.3);border-radius:8px;padding:14px;">
          <div style="font-size:10px;color:#00a651;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">🎯 #1 Focus</div>
          <div style="font-size:13px;color:#e8f0e4;font-weight:500;">${fb.nextFocus || '—'}</div>
        </div>
        <div style="background:#243320;border-radius:8px;padding:14px;">
          <div style="font-size:10px;color:#5a7054;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">🏋️ Today's Drill</div>
          <div style="font-size:13px;color:#c8d8c4;">${fb.drillSuggestion || '—'}</div>
        </div>
        <div style="background:#243320;border-radius:8px;padding:14px;">
          <div style="font-size:10px;color:#5a7054;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">⚡ Key Moment</div>
          <div style="font-size:13px;color:#c8d8c4;">${fb.keyMoment || '—'}</div>
        </div>
      </div>`;
  } else {
    document.getElementById('modal-pane-feedback').innerHTML = '<p style="color:#5a7054;font-size:13px;padding:20px 0;">No feedback data for this session.</p>';
  }

  // Debrief pane — show existing or offer to generate
  _renderModalDebrief(s, idx);

  switchModalTab('transcript');
  modal.style.display = 'block';
};

function _renderModalDebrief(s, idx) {
  const pane = document.getElementById('modal-pane-debrief');
  if (!pane) return;

  if (s.debrief) {
    // Already saved — render it
    _renderDebriefInModal(s.debrief);
  } else {
    // Not yet generated — show the Generate button
    const hasTranscript = !!(s.transcript && s.transcript.length > 100);
    const caseObj = (window.CASES||[]).find(c => c.id === s.caseId) || { title: s.caseTitle, type: s.caseType, context: s.caseContext || '', keyData:{}, hiddenInsight:'', suggestedFramework:'', scoringRubric:{} };
    pane.innerHTML = `
      <div style="text-align:center;padding:40px 20px;">
        <div style="font-size:32px;margin-bottom:12px;">🧠</div>
        <div style="font-size:15px;font-weight:700;color:#e8f0e4;margin-bottom:8px;">Solution Debrief Not Yet Generated</div>
        <div style="font-size:13px;color:#8fa887;margin-bottom:24px;line-height:1.6;">
          Get the full model answer, issue tree, framework breakdown,<br>key numbers, and cross-application guide for this case.
        </div>
        ${!hasTranscript ? '<p style="color:#ef5350;font-size:12px;margin-bottom:16px;">⚠️ No transcript saved — debrief will be based on case data only.</p>' : ''}
        <button id="modal-gen-debrief-btn" onclick="generateDebriefForSession(${idx})"
          style="background:#00a651;color:white;border:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;">
          ✨ Generate Solution Debrief
        </button>
      </div>`;
  }
}

function _renderDebriefInModal(debrief) {
  const pane = document.getElementById('modal-pane-debrief');
  if (!pane) return;

  const fw = debrief.frameworkExplained || {};
  const tree = debrief.issueTree || {};

  pane.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:16px;padding-bottom:20px;">

      <!-- Model Answer -->
      <div style="background:rgba(0,166,81,0.08);border:1px solid rgba(0,166,81,0.3);border-radius:10px;padding:16px;">
        <div style="font-size:10px;font-weight:700;color:#00a651;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">💡 Model Answer</div>
        <div style="font-size:13px;color:#e8f0e4;line-height:1.7;font-weight:500;">${debrief.modelAnswer || '—'}</div>
      </div>

      <!-- You vs Ideal -->
      <div style="background:#243320;border-radius:10px;padding:16px;">
        <div style="font-size:10px;font-weight:700;color:#8fa887;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">🔍 Your Approach vs Ideal</div>
        <div style="font-size:13px;color:#c8d8c4;line-height:1.7;">${debrief.candidateVsIdeal || '—'}</div>
      </div>

      <!-- Issue Tree -->
      <div style="background:#243320;border-radius:10px;padding:16px;">
        <div style="font-size:10px;font-weight:700;color:#8fa887;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px;">🌳 Issue Tree</div>
        <div style="background:#1e2d1a;border-radius:6px;padding:10px 14px;font-size:12px;font-weight:600;color:#e8f0e4;text-align:center;margin-bottom:10px;">❓ ${tree.rootQuestion || ''}</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin-bottom:10px;">
          ${(tree.level1||[]).map((b,i) => `
            <div style="background:#1e2d1a;border-radius:6px;padding:10px;">
              <div style="font-size:12px;font-weight:700;color:#00a651;margin-bottom:4px;">${i+1}. ${b.branch}</div>
              <div style="font-size:11px;color:#5a7054;font-style:italic;margin-bottom:6px;">${b.hypothesis}</div>
              ${(b.children||[]).map(c=>`<div style="display:inline-block;background:#243320;border-radius:4px;padding:2px 6px;font-size:10px;color:#8fa887;margin:2px;">${c}</div>`).join('')}
            </div>`).join('')}
        </div>
        <div style="background:rgba(0,166,81,0.1);border-radius:6px;padding:8px 12px;font-size:12px;color:#e8f0e4;">💡 ${tree.answerLivesIn || ''}</div>
      </div>

      <!-- Framework -->
      <div style="background:#243320;border-radius:10px;padding:16px;">
        <div style="font-size:10px;font-weight:700;color:#8fa887;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">📐 Framework: ${fw.name || ''}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
          <div style="background:#1e2d1a;border-radius:6px;padding:10px;">
            <div style="font-size:10px;color:#5a7054;margin-bottom:4px;">WHEN TO USE</div>
            <div style="font-size:12px;color:#c8d8c4;line-height:1.5;">${fw.whenToUse || '—'}</div>
          </div>
          <div style="background:#1e2d1a;border-radius:6px;padding:10px;">
            <div style="font-size:10px;color:#5a7054;margin-bottom:4px;">BCG TWIST</div>
            <div style="font-size:12px;color:#00a651;line-height:1.5;">${fw.bcgTwist || '—'}</div>
          </div>
        </div>
        <div style="background:#1e2d1a;border-radius:6px;padding:10px;margin-bottom:8px;">
          <div style="font-size:10px;color:#5a7054;margin-bottom:4px;">STRUCTURE</div>
          <pre style="font-family:monospace;font-size:11px;color:#e8f0e4;white-space:pre-wrap;line-height:1.6;margin:0;">${fw.structure || '—'}</pre>
        </div>
        <div style="background:rgba(0,166,81,0.08);border:1px solid rgba(0,166,81,0.2);border-radius:6px;padding:10px;margin-bottom:8px;">
          <div style="font-size:10px;color:#00a651;margin-bottom:4px;">🧠 MEMORY HOOK</div>
          <div style="font-size:12px;color:#e8f0e4;font-weight:500;">${fw.memoryHook || '—'}</div>
        </div>
        <div style="font-size:10px;color:#5a7054;margin-bottom:6px;">⚠️ COMMON MISTAKES</div>
        ${(fw.commonMistakes||[]).map(m=>`<div style="font-size:12px;color:#c8d8c4;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05);">• ${m}</div>`).join('')}
      </div>

      <!-- Key Numbers -->
      <div style="background:#243320;border-radius:10px;padding:16px;">
        <div style="font-size:10px;font-weight:700;color:#8fa887;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">🔢 Key Numbers</div>
        ${(debrief.keyNumbers||[]).map(n=>`
          <div style="display:grid;grid-template-columns:140px 100px 1fr;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);align-items:start;">
            <div style="font-size:12px;color:#8fa887;">${n.metric}</div>
            <div style="font-size:16px;font-weight:800;color:#00a651;">${n.value}</div>
            <div style="font-size:12px;color:#c8d8c4;line-height:1.5;">${n.significance}</div>
          </div>`).join('')}
      </div>

      <!-- Cross-Application -->
      <div style="background:#243320;border-radius:10px;padding:16px;">
        <div style="font-size:10px;font-weight:700;color:#8fa887;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">♻️ Cross-Application</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;">
          ${(debrief.crossApplication||[]).map(c=>`
            <div style="background:#1e2d1a;border-radius:8px;padding:12px;border:1px solid rgba(156,39,176,0.2);">
              <div style="font-size:12px;font-weight:700;color:#ce93d8;margin-bottom:8px;text-transform:capitalize;">${c.caseType}</div>
              <div style="font-size:11px;color:#8fa887;margin-bottom:4px;">WHY SIMILAR</div>
              <div style="font-size:12px;color:#c8d8c4;margin-bottom:8px;">${c.similarity}</div>
              <div style="font-size:11px;color:#8fa887;margin-bottom:4px;">ADAPT BY</div>
              <div style="font-size:12px;color:#c8d8c4;margin-bottom:8px;">${c.adaptation}</div>
              <div style="font-size:11px;color:#8fa887;margin-bottom:4px;">EXAMPLE</div>
              <div style="font-size:12px;color:#c8d8c4;">${c.example}</div>
            </div>`).join('')}
        </div>
      </div>

    </div>`;
}

window.generateDebriefForSession = async function(idx) {
  const btn = document.getElementById('modal-gen-debrief-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Generating... (20-30 sec)'; }

  const sessions = Storage.getSessions();
  const s = sessions[idx];
  if (!s) return;

  const pane = document.getElementById('modal-pane-debrief');
  if (pane) pane.innerHTML = `
    <div style="text-align:center;padding:60px 20px;display:flex;flex-direction:column;align-items:center;gap:16px;">
      <div style="display:flex;gap:8px;">${[0,200,400].map(d=>`<div style="width:10px;height:10px;border-radius:50%;background:#00a651;animation:pulse 1.2s ${d}ms ease-in-out infinite;"></div>`).join('')}</div>
      <p style="font-size:13px;color:#8fa887;">Claude Sonnet is building your full solution debrief…</p>
    </div>`;

  try {
    // Reconstruct a minimal caseObj from saved data
    const caseObj = (window.CASES||[]).find(c => c.id === s.caseId) || {
      id: s.caseId || 'unknown',
      title: s.caseTitle,
      type: s.caseType,
      industry: s.caseType,
      difficulty: '—',
      context: s.caseContext || s.caseTitle,
      keyData: {},
      hiddenInsight: s.feedback?.keyMoment || '',
      suggestedFramework: '',
      scoringRubric: {}
    };

    const debrief = await window.Scoring.generateDebrief(caseObj, s.transcript || '');

    // Save debrief back to session
    const allSessions = Storage.getSessions();
    allSessions[idx].debrief = debrief;
    Storage.set('sessions', allSessions);

    _renderDebriefInModal(debrief);
    showToast('Solution debrief ready!');
  } catch (err) {
    if (pane) pane.innerHTML = `<p style="color:#ef5350;font-size:13px;padding:20px;">Failed: ${err.message}</p>`;
    showToast('Debrief failed: ' + err.message, 'error');
  }
};

window.switchModalTab = function(tab) {
  ['transcript','feedback','debrief'].forEach(t => {
    const pane = document.getElementById(`modal-pane-${t}`);
    const btn = document.querySelector(`.modal-tab-btn[data-tab="${t}"]`);
    if (pane) pane.style.display = t === tab ? 'block' : 'none';
    if (btn) {
      if (t === tab) {
        btn.style.background = 'rgba(0,166,81,0.15)'; btn.style.borderColor = 'rgba(0,166,81,0.3)'; btn.style.color = '#00a651';
      } else {
        btn.style.background = '#243320'; btn.style.borderColor = 'rgba(0,166,81,0.15)'; btn.style.color = '#8fa887';
      }
    }
  });
};
