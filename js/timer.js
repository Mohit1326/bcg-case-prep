// ── Case Timer ─────────────────────────────────────────────────────────────────
// BCG cases: 35 min standard. Each stage has a recommended budget.
// Timer shows elapsed time, fills a progress bar, warns at 80% and 100%.
// Per-stage timestamps recorded so timing breakdown appears in results.

window.CaseTimer = (function() {

  // Recommended time split (% of total) — based on real BCG interview pacing
  const STAGE_BUDGETS = {
    setup:       0.06,   // ~2 min of 35 = read case, orient
    clarifying:  0.12,   // ~4 min
    structuring: 0.17,   // ~6 min
    analysis:    0.48,   // ~17 min — most of the case
    synthesis:   0.17,   // ~6 min — recommendation
  };

  const STAGE_LABELS = {
    setup: 'Case Setup', clarifying: 'Clarifying', structuring: 'Structure',
    analysis: 'Analysis', synthesis: 'Synthesis'
  };

  let targetSecs   = 35 * 60;
  let startTime    = null;
  let intervalId   = null;
  let stageLog     = {};   // { stageName: { start: ms, end: ms } }
  let currentStage = null;
  let elapsed      = 0;

  // ── Public: set target before case starts ────────────────────────────────
  function setTarget(minutes) {
    targetSecs = Math.max(10, Math.min(90, parseInt(minutes) || 35)) * 60;
  }

  function getTargetMins() { return Math.round(targetSecs / 60); }

  // ── Public: start timer when case begins ─────────────────────────────────
  function start() {
    startTime = Date.now();
    elapsed   = 0;
    stageLog  = {};
    _buildStageMarkers();
    intervalId = setInterval(_tick, 1000);
    _tick();
    document.getElementById('timer-bar').style.display = 'flex';
    document.getElementById('timer-target').textContent = `/ ${_fmt(targetSecs)}`;
  }

  // ── Public: called when stage changes ────────────────────────────────────
  function onStageChange(newStage) {
    const now = Date.now();
    // Close previous stage
    if (currentStage && stageLog[currentStage]) {
      stageLog[currentStage].end = now;
      stageLog[currentStage].durationSecs = Math.round((now - stageLog[currentStage].start) / 1000);
    }
    // Open new stage
    currentStage = newStage;
    stageLog[newStage] = { start: now };
  }

  // ── Public: stop and return timing summary ────────────────────────────────
  function stop() {
    if (intervalId) { clearInterval(intervalId); intervalId = null; }
    const now = Date.now();
    if (currentStage && stageLog[currentStage]) {
      stageLog[currentStage].end = now;
      stageLog[currentStage].durationSecs = Math.round((now - stageLog[currentStage].start) / 1000);
    }
    elapsed = startTime ? Math.round((now - startTime) / 1000) : 0;
    return buildSummary();
  }

  // ── Build timing summary for scoring & display ───────────────────────────
  function buildSummary() {
    const totalSecs  = elapsed || (startTime ? Math.round((Date.now() - startTime) / 1000) : 0);
    const totalMins  = totalSecs / 60;
    const targetMins = targetSecs / 60;
    const delta      = totalMins - targetMins; // positive = over time

    // Timing verdict
    let verdict, color;
    if (Math.abs(delta) <= 2)       { verdict = 'On Time ✓';       color = '#00c853'; }
    else if (delta > 2 && delta <= 5) { verdict = 'Slightly Over';   color = '#ff9800'; }
    else if (delta > 5)               { verdict = 'Over Time ✗';     color = '#ef5350'; }
    else if (delta < -2 && delta >= -6){ verdict = 'Slightly Under'; color = '#2196F3'; }
    else                              { verdict = 'Too Quick ✗';     color = '#9C27B0'; }

    // Per-stage analysis
    const stageAnalysis = Object.entries(stageLog).map(([stage, data]) => {
      const actual   = (data.durationSecs || 0) / 60;
      const budget   = (STAGE_BUDGETS[stage] || 0) * targetMins;
      const stageDelta = actual - budget;
      return {
        stage,
        label: STAGE_LABELS[stage] || stage,
        actualMins:  parseFloat(actual.toFixed(1)),
        budgetMins:  parseFloat(budget.toFixed(1)),
        deltaMins:   parseFloat(stageDelta.toFixed(1)),
        status: Math.abs(stageDelta) <= 1.5 ? 'ok' : stageDelta > 0 ? 'over' : 'under',
      };
    });

    return {
      totalSecs,
      totalMins:   parseFloat(totalMins.toFixed(1)),
      targetMins,
      deltaMins:   parseFloat(delta.toFixed(1)),
      verdict,
      color,
      stageAnalysis,
    };
  }

  // ── Internal tick ─────────────────────────────────────────────────────────
  function _tick() {
    if (!startTime) return;
    elapsed = Math.round((Date.now() - startTime) / 1000);
    const pct = Math.min(elapsed / targetSecs, 1);

    // Timer display
    const displayEl = document.getElementById('timer-display');
    if (displayEl) {
      displayEl.textContent = _fmt(elapsed);
      // Colour changes: green → orange at 80% → red at 100%
      if (pct >= 1)       displayEl.style.color = '#ef5350';
      else if (pct >= 0.8) displayEl.style.color = '#ff9800';
      else                 displayEl.style.color = '#00a651';
    }

    // Progress fill
    const fill = document.getElementById('timer-fill');
    if (fill) {
      fill.style.width = `${pct * 100}%`;
      if (pct >= 1)       fill.style.background = '#ef5350';
      else if (pct >= 0.8) fill.style.background = '#ff9800';
      else                 fill.style.background = '#00a651';
    }

    // Status text
    const statusEl = document.getElementById('timer-status');
    if (statusEl) {
      const remaining = targetSecs - elapsed;
      if (remaining <= 0) {
        statusEl.textContent = `+${_fmt(Math.abs(remaining))} over`;
        statusEl.style.color = '#ef5350';
      } else if (remaining <= 5 * 60) {
        statusEl.textContent = `${_fmt(remaining)} left`;
        statusEl.style.color = '#ff9800';
      } else {
        statusEl.textContent = `${_fmt(remaining)} left`;
        statusEl.style.color = '#5a7054';
      }
    }

    // Pulsing warning at 80%
    const bar = document.getElementById('timer-bar');
    if (bar) bar.classList.toggle('timer-warning', pct >= 0.8 && pct < 1);
    if (bar) bar.classList.toggle('timer-over',    pct >= 1);
  }

  // ── Draw stage marker lines on the progress bar ───────────────────────────
  function _buildStageMarkers() {
    const markers = document.getElementById('timer-stage-markers');
    if (!markers) return;
    markers.innerHTML = '';
    let cumulative = 0;
    const stages = ['setup','clarifying','structuring','analysis']; // last stage has no marker
    stages.forEach(s => {
      cumulative += (STAGE_BUDGETS[s] || 0);
      const m = document.createElement('div');
      m.className = 'timer-marker';
      m.style.left = `${cumulative * 100}%`;
      m.title = `${STAGE_LABELS[s]} ends`;
      markers.appendChild(m);
    });
  }

  function _fmt(secs) {
    const s = Math.abs(Math.floor(secs));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2,'0')}`;
  }

  // ── Display timing results after case ─────────────────────────────────────
  function displayTimingResults(summary) {
    // Header timing badge
    const wrap = document.getElementById('timing-result-wrap');
    if (wrap) {
      wrap.style.display = 'flex';
      document.getElementById('timing-result-time').textContent = `${summary.totalMins} min`;
      document.getElementById('timing-result-time').style.color = summary.color;
      document.getElementById('timing-result-label').textContent =
        `target was ${summary.targetMins} min · ${summary.deltaMins > 0 ? '+' : ''}${summary.deltaMins} min`;
      const badge = document.getElementById('timing-result-badge');
      badge.textContent = summary.verdict;
      badge.style.background = summary.color + '22';
      badge.style.color = summary.color;
      badge.style.border = `1px solid ${summary.color}55`;
    }

    // Stage breakdown card
    const card = document.getElementById('timing-insight-card');
    const breakdown = document.getElementById('timing-stage-breakdown');
    if (card && breakdown && summary.stageAnalysis.length > 0) {
      card.style.display = 'block';
      const statusColors = { ok: '#00a651', over: '#ef5350', under: '#2196F3' };
      const statusLabels = { ok: '✓ On pace', over: '⏰ Over', under: '⚡ Under' };
      breakdown.innerHTML = `
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:14px;flex-wrap:wrap;">
          <span style="font-size:22px;font-weight:800;color:${summary.color}">${summary.totalMins} min</span>
          <span style="font-size:13px;color:var(--text-muted)">vs ${summary.targetMins} min target</span>
          <span style="padding:3px 10px;border-radius:5px;font-size:12px;font-weight:700;background:${summary.color}22;color:${summary.color};border:1px solid ${summary.color}55">${summary.verdict}</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:14px;">
          ${summary.stageAnalysis.map(s => `
            <div style="background:var(--surface2);border-radius:8px;padding:10px;border-left:3px solid ${statusColors[s.status]};">
              <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.4px;margin-bottom:4px;">${s.label}</div>
              <div style="font-size:16px;font-weight:800;color:${statusColors[s.status]}">${s.actualMins}m</div>
              <div style="font-size:11px;color:var(--text-muted)">budget ${s.budgetMins}m</div>
              <div style="font-size:11px;color:${statusColors[s.status]};margin-top:2px;">${statusLabels[s.status]}</div>
            </div>`).join('')}
        </div>
        ${_timingCoach(summary)}`;
    }
  }

  // Generate coaching advice based on timing pattern
  function _timingCoach(summary) {
    const tips = [];
    summary.stageAnalysis.forEach(s => {
      if (s.stage === 'clarifying' && s.deltaMins > 2)
        tips.push('You spent too long on clarifying questions. In BCG, 2–3 sharp questions max — then move.');
      if (s.stage === 'structuring' && s.deltaMins > 2)
        tips.push('Framework took too long to present. Practice delivering your structure in under 90 seconds.');
      if (s.stage === 'analysis' && s.deltaMins < -3)
        tips.push('You rushed through analysis. BCG partners want to see you dig deep — don\'t move to synthesis too quickly.');
      if (s.stage === 'synthesis' && s.deltaMins < -1)
        tips.push('Synthesis was rushed. Your recommendation should take 3–5 minutes: situation → insight → action → risk.');
      if (s.stage === 'analysis' && s.deltaMins > 5)
        tips.push('Analysis ran over budget — you may have gone too deep without prioritising. Ask "which lever is biggest?" early.');
    });
    if (summary.deltaMins > 5)
      tips.push('Overall you ran significantly over time. In a real BCG round, the interviewer would redirect you at 35 min.');
    if (summary.deltaMins < -5)
      tips.push('Overall you finished too quickly. Rushing signals lack of depth — slow down in analysis and synthesis.');
    if (!tips.length) return '<div style="font-size:13px;color:#00a651;">✓ Excellent pacing — you stayed within budget across all stages.</div>';
    return `<div style="display:flex;flex-direction:column;gap:6px;">${tips.map(t =>
      `<div style="font-size:12.5px;color:var(--text-dim);padding:8px 12px;background:var(--surface2);border-radius:6px;border-left:3px solid #ff9800;">⏰ ${t}</div>`
    ).join('')}</div>`;
  }

  return { setTarget, getTargetMins, start, stop, onStageChange, buildSummary, displayTimingResults };
})();
