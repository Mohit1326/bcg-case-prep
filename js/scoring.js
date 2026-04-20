// ── Scoring Engine + Solution Debrief ─────────────────────────────────────────
window.Scoring = (function() {

  const BENCHMARK = { structuring: 7.0, analytics: 7.0, synthesis: 7.0, communication: 7.0 };
  const DIMS = ['structuring', 'analytics', 'synthesis', 'communication'];

  // ── Progression context from past sessions ────────────────────────────────
  function buildProgressionContext() {
    const sessions = Storage.getSessions().slice(0, 5);
    if (sessions.length === 0) return '';
    const lines = ['CANDIDATE HISTORY (last sessions):'];
    sessions.forEach((s, i) => {
      const retestTag = s.retestFor ? ` [RETEST targeting ${s.retestFor}]` : '';
      lines.push(`Session ${i+1} — ${s.caseTitle}${retestTag}: S=${s.scores?.structuring??'?'} A=${s.scores?.analytics??'?'} Sy=${s.scores?.synthesis??'?'} C=${s.scores?.communication??'?'} | Focus: "${s.feedback?.nextFocus??'N/A'}"`);
    });
    if (sessions.length >= 2) {
      lines.push('TRENDS:');
      DIMS.forEach(d => {
        const vals = sessions.map(s => s.scores?.[d]).filter(v => v != null);
        if (vals.length >= 2) {
          const delta = vals[0] - vals[vals.length - 1];
          const dir = delta > 0.4 ? '↑ improving' : delta < -0.4 ? '↓ declining' : '→ flat';
          lines.push(`  ${d}: ${dir} (${vals[vals.length-1].toFixed(1)} → ${vals[0].toFixed(1)})`);
        }
      });
    }
    return lines.join('\n');
  }

  // ── Score a session ────────────────────────────────────────────────────────
  async function scoreSession(caseObj, fullTranscript) {
    const progressionContext = buildProgressionContext();

    // If this is a targeted retest, add explicit comparison instruction
    const retestContext = caseObj._retestFor
      ? `\nRETEST SESSION: Candidate specifically practiced to improve their ${caseObj._retestFor}. In your dimensionFeedback for ${caseObj._retestFor}, explicitly state whether they improved vs. prior sessions, and by how much. In progressionNote, call out the retest result directly.`
      : '';

    const systemPrompt = `You are a senior BCG India partner evaluating a SA2 candidate.
Feedback must be SPECIFIC, HONEST, ACTIONABLE — cite transcript evidence.${retestContext}

STRUCTURING (0-10): MECE issue trees, hypothesis-driven framing, logical prioritisation
  9-10: Crisp MECE tree, strong upfront hypothesis, correct prioritisation
  7-8:  Good structure, mostly MECE, hypothesis present but could be sharper
  5-6:  Some structure, missing branches, weak hypothesis
  3-4:  Reactive, no clear framework    1-2: No structure

ANALYTICS (0-10): Quant reasoning, math accuracy, data-driven decisions
  9-10: Accurate math, sharp quantification, no avoidance
  7-8:  Good quant, minor errors OK    5-6: Misses key calculations
  3-4:  Largely qualitative    1-2: Zero quantitative engagement

SYNTHESIS (0-10): Root cause identification, "so-what" insight, recommendation quality
  9-10: Correct root cause, crisp recommendation, risks addressed
  7-8:  Clear recommendation, slightly generic    5-6: Misses key insight
  3-4:  Vague    1-2: No synthesis or wrong conclusion

COMMUNICATION (0-10): Clarity, signposting, executive presence, conciseness
  9-10: Crisp, confident, zero filler, signposted    7-8: Clear, minor verbosity
  5-6:  Rambling, weak signposting    3-4: Hard to follow    1-2: Very unclear

BCG SA2 bar: 7.0+ on ALL 4 = Hire.
Case rubric: ${JSON.stringify(caseObj.scoringRubric)}
${progressionContext}
RETURN ONLY VALID JSON. NO OTHER TEXT.`;

    const userMsg = `Score this BCG case interview:
CASE: ${caseObj.title} (${caseObj.type} | ${caseObj.difficulty})
CONTEXT: ${caseObj.context}
HIDDEN INSIGHT: ${caseObj.hiddenInsight}
TRANSCRIPT:
${fullTranscript}

Return ONLY this JSON:
{
  "scores": { "structuring":<0-10>, "analytics":<0-10>, "synthesis":<0-10>, "communication":<0-10> },
  "overall": <mean>,
  "verdict": "Strong Hire|Hire|Borderline|No Hire",
  "strengthHighlights": ["<specific quote + why strong>","<second>","<third>"],
  "developmentAreas": ["<gap + evidence + fix>","<second>","<third>"],
  "dimensionFeedback": {
    "structuring": "<2-3 sentences: what done, what missing, one fix>",
    "analytics": "<2-3 sentences>",
    "synthesis": "<2-3 sentences>",
    "communication": "<2-3 sentences>"
  },
  "keyMoment": "<most defining moment — quote candidate if possible>",
  "bcgComparison": "<honest: at/above/below SA2 bar, biggest gap>",
  "nextFocus": "<ONE specific skill to drill — prescriptive>",
  "progressionNote": "<improving/plateauing/regressing vs focus area>",
  "drillSuggestion": "<specific 15-min drill for weakest dimension>"
}`;

    const response = await callClaude(
      [{ role: 'user', content: userMsg }],
      systemPrompt, 'claude-sonnet-4-6', 2000
    );
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Could not parse scoring response');
    const result = JSON.parse(jsonMatch[0]);
    result.overall = parseFloat(((result.scores.structuring + result.scores.analytics + result.scores.synthesis + result.scores.communication) / 4).toFixed(2));
    return result;
  }

  // ── Generate Solution Debrief ──────────────────────────────────────────────
  async function generateDebrief(caseObj, fullTranscript) {
    const systemPrompt = `You are a BCG India principal writing a structured solution debrief for a case interview candidate.
Write with precision and clarity. Use concrete examples. This is a teaching document.
The candidate just finished the case — compare what they said vs. the ideal answer where relevant.
RETURN ONLY VALID JSON. NO OTHER TEXT.`;

    const userMsg = `Generate a complete solution debrief for this case:

CASE: ${caseObj.title}
TYPE: ${caseObj.type} | INDUSTRY: ${caseObj.industry} | DIFFICULTY: ${caseObj.difficulty}
CONTEXT: ${caseObj.context}
KEY DATA: ${JSON.stringify(caseObj.keyData, null, 2)}
HIDDEN INSIGHT: ${caseObj.hiddenInsight}
SUGGESTED FRAMEWORK: ${caseObj.suggestedFramework}
CANDIDATE TRANSCRIPT:
${fullTranscript.slice(0, 3000)}

Return this exact JSON:
{
  "modelAnswer": "<3-4 sentence crisp answer a BCG partner would give — the recommendation, root cause, and key actions>",

  "solutionWalkthrough": [
    { "step": 1, "label": "Clarify & Scope", "what": "<what to do>", "why": "<why this step matters>", "example": "<what ideal candidate says/asks>" },
    { "step": 2, "label": "State Hypothesis", "what": "<upfront hypothesis>", "why": "<why hypothesis-first>", "example": "<exact phrasing>" },
    { "step": 3, "label": "Build Framework", "what": "<framework structure>", "why": "<why this framework for this case>", "example": "<how to present it verbally>" },
    { "step": 4, "label": "Prioritise & Dig", "what": "<which branch to go deep on first>", "why": "<why this is highest leverage>", "example": "<what questions to ask>" },
    { "step": 5, "label": "Do the Math", "what": "<key calculations needed>", "why": "<what numbers prove the case>", "example": "<worked example with this case's numbers>" },
    { "step": 6, "label": "Synthesise", "what": "<how to structure the final recommendation>", "why": "<what makes a BCG-quality recommendation>", "example": "<example closing statement for this case>" }
  ],

  "issueTree": {
    "rootQuestion": "<the central question of this case>",
    "level1": [
      { "branch": "<bucket 1 name>", "hypothesis": "<what you suspect about this branch>", "children": ["<sub-issue 1>", "<sub-issue 2>", "<sub-issue 3>"] },
      { "branch": "<bucket 2 name>", "hypothesis": "<hypothesis>", "children": ["<sub-issue 1>", "<sub-issue 2>"] },
      { "branch": "<bucket 3 name>", "hypothesis": "<hypothesis>", "children": ["<sub-issue 1>", "<sub-issue 2>"] }
    ],
    "answerLivesIn": "<which branch/sub-branch contains the answer and why>"
  },

  "frameworkExplained": {
    "name": "<name of framework used — e.g. Profitability Tree, 3C, Market Entry, Value Chain>",
    "whenToUse": "<what signals in the case prompt tell you to use this framework>",
    "structure": "<how the framework is structured — draw it out in text>",
    "commonMistakes": ["<mistake 1 candidates make with this framework>", "<mistake 2>", "<mistake 3>"],
    "memoryHook": "<a simple analogy, story, or phrase to remember this framework and when to apply it>",
    "bcgTwist": "<how BCG expects you to use this vs. textbook — e.g. hypothesis-first, not data-first>"
  },

  "keyNumbers": [
    { "metric": "<metric name>", "value": "<value>", "significance": "<why this number matters in the analysis>" },
    { "metric": "<metric 2>", "value": "<value>", "significance": "<significance>" },
    { "metric": "<metric 3>", "value": "<value>", "significance": "<significance>" }
  ],

  "crossApplication": [
    {
      "caseType": "<case type where this framework/approach applies>",
      "similarity": "<what is structurally similar to this case>",
      "adaptation": "<what you'd change in the framework for that case type>",
      "example": "<a real-world scenario where you'd use this>"
    },
    {
      "caseType": "<second case type>",
      "similarity": "<similarity>",
      "adaptation": "<adaptation>",
      "example": "<example>"
    },
    {
      "caseType": "<third case type>",
      "similarity": "<similarity>",
      "adaptation": "<adaptation>",
      "example": "<example>"
    }
  ],

  "candidateVsIdeal": "<2-3 sentences comparing what the candidate actually did vs. the ideal path — what was close, what diverged, and the single biggest missed opportunity>"
}`;

    const response = await callClaude(
      [{ role: 'user', content: userMsg }],
      systemPrompt, 'claude-sonnet-4-6', 4000
    );
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Could not parse debrief response');
    return JSON.parse(jsonMatch[0]);
  }

  // ── Display Results ────────────────────────────────────────────────────────
  function displayResults(result, session) {
    const panel = document.getElementById('results-panel');
    if (!panel) return;

    document.getElementById('interview-active').style.display = 'none';
    panel.style.display = 'flex';

    // Reset debrief tab to spinner state for this new session
    const spinner = document.getElementById('debrief-spinner');
    const content = document.getElementById('debrief-content');
    if (spinner) { spinner.style.display = 'flex'; spinner.innerHTML = `<div class="debrief-spinner-dots"><span></span><span></span><span></span></div><p>Generating your full solution debrief with Claude Sonnet…</p>`; }
    if (content) content.style.display = 'none';

    // Show case title in header
    const titleEl = document.getElementById('results-case-title');
    if (titleEl) titleEl.textContent = session.caseTitle || 'Case Complete';

    // Always start on scores tab
    switchResultsTab('scores');

    const verdictColors = { 'Strong Hire': '#00c853', 'Hire': '#00a651', 'Borderline': '#ff9800', 'No Hire': '#ef5350' };
    const verdictEl = document.getElementById('verdict-badge');
    if (verdictEl) { verdictEl.textContent = result.verdict; verdictEl.style.background = verdictColors[result.verdict] || '#888'; }

    const overallEl = document.getElementById('overall-score');
    if (overallEl) overallEl.textContent = result.overall.toFixed(1);

    DIMS.forEach(dim => {
      const score = result.scores[dim];
      const bar = document.getElementById(`score-bar-${dim}`);
      const num = document.getElementById(`score-num-${dim}`);
      const fb  = document.getElementById(`feedback-${dim}`);
      if (bar) { bar.style.width = `${score * 10}%`; bar.className = `score-bar-fill ${score >= BENCHMARK[dim] ? 'above' : 'below'}`; }
      if (num) num.textContent = score.toFixed(1);
      if (fb)  fb.textContent  = result.dimensionFeedback?.[dim] || '';
    });

    const el = id => document.getElementById(id);
    if (el('strengths-list'))   el('strengths-list').innerHTML   = (result.strengthHighlights||[]).map(s=>`<li>${s}</li>`).join('');
    if (el('development-list')) el('development-list').innerHTML = (result.developmentAreas||[]).map(s=>`<li>${s}</li>`).join('');
    if (el('key-moment'))       el('key-moment').textContent     = result.keyMoment    || '';
    if (el('bcg-comparison'))   el('bcg-comparison').textContent = result.bcgComparison || '';
    if (el('next-focus'))       el('next-focus').textContent     = result.nextFocus     || '';
    if (el('session-duration')) el('session-duration').textContent = `${session.durationMinutes} min`;
    if (el('progression-note')) el('progression-note').textContent = result.progressionNote || '—';
    if (el('drill-suggestion')) el('drill-suggestion').textContent = result.drillSuggestion  || '—';

    drawScoreRadar(result.scores);

    // Display timing results if available
    if (session.timingSummary && window.CaseTimer) {
      CaseTimer.displayTimingResults(session.timingSummary);
    }

    // Render gap action plan
    displayLoopActions(result);

    showToast('Session scored! Generating solution debrief...');

    // Switch to score tab by default
    switchResultsTab('scores');
  }

  // ── Close the Loop — Gap Action Plan ──────────────────────────────────────
  function displayLoopActions(result) {
    const panel = document.getElementById('loop-panel');
    if (!panel) return;

    const DIM_LABELS = { structuring: 'Structuring', analytics: 'Analytics', synthesis: 'Synthesis', communication: 'Communication' };
    const DIM_ICONS  = { structuring: '🏗️', analytics: '📊', synthesis: '💡', communication: '🗣️' };
    const DIM_DRILLS = {
      structuring:   'State your hypothesis upfront before laying out any framework. Draw a 3-bucket MECE tree on paper, label each branch with a hypothesis, then speak it aloud.',
      analytics:     'Pick a market sizing question and work it entirely in numbers — no hand-waving. Show every step: segment → penetration → price → volume → total.',
      synthesis:     'Practice the "Situation → Root Cause → Recommendation → Risk" format in under 60 seconds. Record yourself and check: is the insight crisp or generic?',
      communication: 'Record your next answer. Count filler words (um, uh, so, like). Add explicit signposting: "I\'ll cover three areas — first X, second Y, third Z."',
    };
    const DIM_CASE_TYPES = {
      structuring:   ['market_entry', 'growth'],
      analytics:     ['profitability', 'operations'],
      synthesis:     ['ma', 'growth'],
      communication: ['profitability', 'market_entry'],
    };

    const gaps = DIMS.filter(d => result.scores[d] < BENCHMARK[d])
                     .sort((a, b) => result.scores[a] - result.scores[b]);

    panel.style.display = 'block';

    if (gaps.length === 0) {
      panel.innerHTML = `
        <div class="loop-panel">
          <div class="loop-panel-title">🎯 Above Bar on All Dimensions!</div>
          <p class="loop-all-clear">All 4 scores ≥ 7.0 — you're in BCG SA2 hire territory. Keep drilling for consistency under pressure.</p>
          <button class="loop-start-btn" onclick="(()=>{document.getElementById('results-panel').style.display='none';document.getElementById('case-select-screen').style.display='flex';window.showFocusBanner&&window.showFocusBanner();})()">Practice Another Case →</button>
        </div>`;
      return;
    }

    panel.innerHTML = `
      <div class="loop-panel">
        <div class="loop-panel-title">🔄 Close the Loop — Your Gap Action Plan</div>
        <p class="loop-panel-sub">Below BCG SA2 bar on ${gaps.length} dimension${gaps.length > 1 ? 's' : ''}. Targeted practice below.</p>
        <div class="loop-gaps">
          ${gaps.map((dim, i) => `
            <div class="loop-gap-card ${i === 0 ? 'primary-gap' : ''}">
              <div class="loop-gap-header">
                <span class="loop-gap-icon">${DIM_ICONS[dim]}</span>
                <div>
                  <div class="loop-gap-name">${DIM_LABELS[dim]}</div>
                  <div class="loop-gap-score">${result.scores[dim].toFixed(1)}/10 — need +${(BENCHMARK[dim] - result.scores[dim]).toFixed(1)} to clear bar</div>
                </div>
                ${i === 0 ? '<span class="loop-primary-badge">Top Priority</span>' : ''}
              </div>
              <p class="loop-gap-feedback">${result.dimensionFeedback?.[dim] || ''}</p>
              <div class="loop-gap-drill"><span class="loop-drill-label">⚡ Fix this now:</span> ${DIM_DRILLS[dim]}</div>
              <button class="loop-start-btn" onclick="window.startTargetedCase('${dim}')">
                Practice ${DIM_LABELS[dim]}-focused Case →
              </button>
            </div>
          `).join('')}
        </div>
        <div class="loop-retest-row">
          <span style="font-size:12px;color:var(--text-muted);">Ready for a full retest on your #1 gap?</span>
          <button class="btn-secondary" style="font-size:12px;" onclick="window.startTargetedCase('${gaps[0]}')">
            Retest: ${DIM_LABELS[gaps[0]]}-focused Case →
          </button>
        </div>
      </div>`;
  }

  // ── Display Debrief ────────────────────────────────────────────────────────
  function displayDebrief(debrief) {
    const el = id => document.getElementById(id);

    // Hide spinner, show content
    const spinner = el('debrief-spinner');
    const content = el('debrief-content');
    if (spinner) spinner.style.display = 'none';
    if (content) { content.style.display = 'flex'; content.style.flexDirection = 'column'; }

    // Model Answer
    if (el('debrief-model-answer')) el('debrief-model-answer').textContent = debrief.modelAnswer || '';

    // Candidate vs Ideal
    if (el('debrief-vs-ideal')) el('debrief-vs-ideal').textContent = debrief.candidateVsIdeal || '';

    // Solution Walkthrough
    if (el('debrief-walkthrough')) {
      el('debrief-walkthrough').innerHTML = (debrief.solutionWalkthrough || []).map(step => `
        <div class="walk-step">
          <div class="walk-step-header">
            <span class="walk-num">${step.step}</span>
            <span class="walk-label">${step.label}</span>
          </div>
          <div class="walk-what"><strong>What:</strong> ${step.what}</div>
          <div class="walk-why"><strong>Why it matters:</strong> ${step.why}</div>
          <div class="walk-example"><span class="walk-say-label">Say exactly:</span> <em>"${step.example}"</em></div>
        </div>`).join('');
    }

    // Issue Tree
    if (el('debrief-issue-tree') && debrief.issueTree) {
      const tree = debrief.issueTree;
      el('debrief-issue-tree').innerHTML = `
        <div class="tree-root-box">❓ ${tree.rootQuestion}</div>
        <div class="tree-level1">
          ${(tree.level1 || []).map((b, i) => `
            <div class="tree-branch-card">
              <div class="tree-branch-header">
                <span class="tree-branch-num">${i+1}</span>
                <span class="tree-branch-name">${b.branch}</span>
              </div>
              <div class="tree-branch-hypothesis">Hypothesis: ${b.hypothesis}</div>
              <div class="tree-children-row">
                ${(b.children||[]).map(c=>`<span class="tree-child-chip">${c}</span>`).join('')}
              </div>
            </div>`).join('')}
        </div>
        <div class="tree-answer-box">💡 <strong>Answer lives in:</strong> ${tree.answerLivesIn}</div>`;
    }

    // Framework
    if (el('debrief-framework') && debrief.frameworkExplained) {
      const f = debrief.frameworkExplained;
      el('debrief-framework').innerHTML = `
        <div class="fw-name-badge">${f.name}</div>
        <div class="fw-grid">
          <div class="fw-block">
            <div class="fw-block-label">When to use</div>
            <div class="fw-block-text">${f.whenToUse}</div>
          </div>
          <div class="fw-block">
            <div class="fw-block-label">BCG twist vs textbook</div>
            <div class="fw-block-text fw-bcg-text">${f.bcgTwist}</div>
          </div>
          <div class="fw-block fw-full">
            <div class="fw-block-label">Structure (draw this)</div>
            <pre class="fw-structure">${f.structure}</pre>
          </div>
          <div class="fw-block fw-full fw-hook-block">
            <div class="fw-block-label">🧠 Memory Hook</div>
            <div class="fw-hook-text">${f.memoryHook}</div>
          </div>
          <div class="fw-block fw-full">
            <div class="fw-block-label">⚠️ Common Mistakes</div>
            <ul class="fw-mistakes">${(f.commonMistakes||[]).map(m=>`<li>${m}</li>`).join('')}</ul>
          </div>
        </div>`;
    }

    // Key Numbers
    if (el('debrief-numbers')) {
      el('debrief-numbers').innerHTML = (debrief.keyNumbers || []).map(n => `
        <div class="num-row">
          <div class="num-metric">${n.metric}</div>
          <div class="num-value">${n.value}</div>
          <div class="num-sig">${n.significance}</div>
        </div>`).join('');
    }

    // Cross-Application
    if (el('debrief-cross')) {
      el('debrief-cross').innerHTML = (debrief.crossApplication || []).map(c => `
        <div class="cross-card">
          <div class="cross-type">${c.caseType}</div>
          <div class="cross-row"><span class="cross-label">Why similar</span> ${c.similarity}</div>
          <div class="cross-row"><span class="cross-label">Adapt by</span> ${c.adaptation}</div>
          <div class="cross-row"><span class="cross-label">Example</span> ${c.example}</div>
        </div>`).join('');
    }

    showToast('Solution debrief ready! Click the 🧠 tab.');
  }

  // ── Results Tab Switching ──────────────────────────────────────────────────
  window.switchResultsTab = function(tab) {
    document.querySelectorAll('.results-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.querySelectorAll('.results-tab-pane').forEach(p => p.classList.toggle('active', p.dataset.pane === tab));
  };

  // ── Radar Chart ────────────────────────────────────────────────────────────
  function drawScoreRadar(scores) {
    const canvas = document.getElementById('radar-chart-result');
    if (!canvas || !window.Chart) return;
    if (canvas._chart) canvas._chart.destroy();
    const prev = Storage.getSessions()[1];
    const datasets = [
      { label: 'This Session', data: DIMS.map(d => scores[d]), backgroundColor: 'rgba(0,166,81,0.2)', borderColor: '#00a651', borderWidth: 2, pointBackgroundColor: '#00a651' },
      { label: 'BCG SA2 Bar', data: [7,7,7,7], backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.25)', borderWidth: 1, borderDash: [5,5], pointRadius: 0 }
    ];
    if (prev?.scores) {
      datasets.splice(1, 0, { label: 'Previous', data: DIMS.map(d => prev.scores[d]||0), backgroundColor: 'rgba(33,150,243,0.08)', borderColor: 'rgba(33,150,243,0.5)', borderWidth: 1, borderDash: [3,3], pointBackgroundColor: 'rgba(33,150,243,0.5)' });
    }
    canvas._chart = new Chart(canvas, {
      type: 'radar',
      data: { labels: ['Structuring','Analytics','Synthesis','Communication'], datasets },
      options: {
        scales: { r: { min:0, max:10, ticks:{ stepSize:2, color:'#aaa', backdropColor:'transparent' }, grid:{ color:'rgba(255,255,255,0.1)' }, pointLabels:{ color:'#e0e0e0', font:{ size:13 } } } },
        plugins: { legend: { labels: { color:'#e0e0e0', boxWidth:12 } } },
        elements: { line: { borderWidth:2 } }
      }
    });
  }

  return { scoreSession, generateDebrief, displayResults, displayDebrief, BENCHMARK };
})();
