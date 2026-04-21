// ── Step Coach — Tutor Mode: One step at a time, coached to perfection ─────────
window.StepCoach = (function() {

  // ── Step Definitions ──────────────────────────────────────────────────────
  const STEPS = [
    {
      id: 'read',
      icon: '👁️',
      label: 'Situation Assessment',
      timeLimit: 60,
      instruction: 'You\'ve read the case. In 60 seconds give me three things:\n1. A one-sentence distillation of the situation (not a repeat — a distillation)\n2. What you think the core business question really is\n3. Your gut instinct on where the answer likely sits',
      bcgExpects: [
        '<strong>Distil, don\'t recite</strong> — compress the situation into one crisp sentence that captures the tension',
        '<strong>Reframe the question</strong> — "The real question is not X, it\'s Y" shows strategic thinking',
        '<strong>Directional gut instinct</strong> — even if imperfect, a directional view signals business judgment',
        '<strong>No structure yet</strong> — this step is about reading the room, not frameworks',
      ],
      scoringCriteria: '(1) Did they distil or just repeat the case? (2) Did they reframe the question in their own terms? (3) Did they show a directional instinct with a reason?',
    },
    {
      id: 'clarify',
      icon: '❓',
      label: 'Clarifying Questions',
      timeLimit: 90,
      instruction: 'Ask 2–3 sharp clarifying questions. For each question, say WHY you\'re asking it — what analytical decision it unlocks.',
      bcgExpects: [
        '<strong>Maximum 3 questions</strong> — more signals poor prioritisation. BCG partners notice immediately.',
        '<strong>Each question justified</strong> — "I\'m asking because knowing X will determine whether I go down path A or B"',
        '<strong>Question types that matter</strong>: scope (what\'s in/out), definition (how is success measured), baseline (what does good look like historically?)',
        '<strong>Never ask for data you can assume</strong> — only ask if the answer would materially change your approach',
      ],
      scoringCriteria: '(1) Maximum 3 questions asked? (2) Each justified with an analytical reason? (3) At least one question that unlocks the structure or reveals a key constraint?',
    },
    {
      id: 'structure',
      icon: '🏗️',
      label: 'Hypothesis + Framework',
      timeLimit: 120,
      instruction: 'Do three things in sequence:\n1. State your hypothesis — what you believe the answer is before you prove it\n2. Present your MECE framework (3 buckets, each with its own hypothesis)\n3. Prioritise — which bucket you\'d investigate first and why',
      bcgExpects: [
        '<strong>Hypothesis first, always</strong> — "My hypothesis is X because Y." Not "I\'d like to structure around..."',
        '<strong>MECE framework</strong> — mutually exclusive (no overlaps), collectively exhaustive (no gaps). Each bucket named with a hypothesis, not just a category label.',
        '<strong>Explicit prioritisation with rationale</strong> — "I\'d start with X because it\'s likely the biggest lever given Y"',
        '<strong>Framework fits the case type</strong> — no generic 3C/4P unless it genuinely applies to this case',
      ],
      scoringCriteria: '(1) Hypothesis stated before any framework? (2) Is the framework MECE — no overlaps, no missing branches? (3) Each bucket has a hypothesis, not just a name? (4) Clear prioritisation with a reason?',
    },
    {
      id: 'analysis',
      icon: '📊',
      label: 'Priority Branch Analysis',
      timeLimit: 150,
      instruction: 'Go deep into your highest-priority branch:\n1. State the specific question this branch needs to answer\n2. Name the analysis you\'d run (decomposition / benchmarking / scenario analysis)\n3. Use the available data — do actual calculations\n4. Interpret every number: "This means..."',
      bcgExpects: [
        '<strong>Name the specific analytical question</strong> — not "look at costs" but "is the cost increase driven by fixed cost deleveraging or variable cost inflation?"',
        '<strong>Do the math</strong> — never hand-wave numbers. Decompose, calculate, compare.',
        '"<strong>So what" for every number</strong> — data without interpretation is just noise',
        '<strong>Know when to pivot</strong> — if the data clears a branch, say so and name where you\'d go next',
      ],
      scoringCriteria: '(1) Specific analytical question defined for the branch? (2) Actual calculations done with case data? (3) Every number interpreted with a "so what"? (4) Clear conclusion on what the branch tells them?',
    },
    {
      id: 'synthesis',
      icon: '💡',
      label: 'Final Recommendation',
      timeLimit: 90,
      instruction: 'Deliver your final recommendation in 90 seconds using this exact BCG format:\nSituation (1 sentence) → Root Cause insight → Recommendation (lead with it) → 3 specific actions → Key risk',
      bcgExpects: [
        '<strong>Lead with the recommendation</strong> — first sentence = the answer. Not findings, not caveats — the answer.',
        '<strong>Single driving insight</strong> — the root cause that makes everything else make sense. Not a list of findings.',
        '<strong>Three specific, sequenced actions</strong> — not "improve operations" but "reduce SKU count from 800 to 200 which our analysis shows recovers 60% of the margin gap"',
        '<strong>One honest risk</strong> — shows judgment. Don\'t sanitise. State what would make you wrong.',
      ],
      scoringCriteria: '(1) Led with recommendation (not analysis recap)? (2) Named a single root cause insight? (3) Actions are specific, not generic? (4) Risk acknowledged honestly?',
    },
  ];

  // ── State ─────────────────────────────────────────────────────────────────
  let S = { caseObj: null, stepIdx: 0, results: [], timer: null, micActive: false, micRec: null };

  // ── Public: start a coaching session ─────────────────────────────────────
  function startCoach(caseObj) {
    S = { caseObj, stepIdx: 0, results: [], timer: null, micActive: false, micRec: null };
    _showCoachPanel();
    _renderStep();
  }

  // ── Render: case-select-screen for coach view ─────────────────────────────
  window.renderCoachSelect = function() {
    const el = document.getElementById('coach-case-select');
    if (!el) return;
    const types = [
      { type: 'profitability', icon: '📊', label: 'Profitability' },
      { type: 'market_entry',  icon: '🌍', label: 'Market Entry'  },
      { type: 'ma',            icon: '🤝', label: 'M&A'           },
      { type: 'growth',        icon: '🚀', label: 'Growth'        },
      { type: 'operations',    icon: '⚙️', label: 'Operations'    },
      { type: 'random',        icon: '🎲', label: 'Random'        },
    ];
    el.innerHTML = `
      <div class="coach-select-intro">
        <h2 class="coach-select-title">🎓 Step Coach — Tutor Mode</h2>
        <p class="coach-select-sub">Practice one step at a time. After each step Claude shows you the model answer and coaches you to perfection before you advance.</p>
        <div class="coach-mode-pills">
          <span class="coach-mode-pill">📖 Learn → ⚡ Apply → ✅ Model Answer → ⚡ Fix → ↩ Retry</span>
        </div>
      </div>
      <div class="coach-type-grid">
        ${types.map(t => `
          <button class="coach-type-btn" onclick="(()=>{
            const cases = ${t.type === 'random' ? 'window.CASES' : `(window.CASES||[]).filter(c=>c.type==='${t.type}')`} || [];
            if(!cases.length){showToast('No cases loaded','error');return;}
            const pick = cases[Math.floor(Math.random()*cases.length)];
            StepCoach.startCoach(pick);
          })()">
            <span class="coach-type-icon">${t.icon}</span>
            <span>${t.label}</span>
          </button>
        `).join('')}
      </div>
      <p class="coach-select-tip">Or pick a specific case from the <a class="coach-lib-link" onclick="showView('library')">Case Library →</a></p>`;
  };

  // ── Panel management ──────────────────────────────────────────────────────
  function _showCoachPanel() {
    document.getElementById('coach-case-select').style.display = 'none';
    document.getElementById('coach-active').style.display = 'flex';
  }

  // ── Render current step ───────────────────────────────────────────────────
  function _renderStep() {
    const step = STEPS[S.stepIdx];
    const mins = Math.floor(step.timeLimit / 60);
    const secs = (step.timeLimit % 60).toString().padStart(2, '0');

    document.getElementById('coach-active').innerHTML = `
      ${_progressHTML()}

      <div class="coach-scroll-body">

        <!-- Case context -->
        <details class="coach-context-details">
          <summary class="coach-context-summary">📋 Case: ${S.caseObj.title} <span class="coach-expand-hint">click to expand</span></summary>
          <div class="coach-context-body">
            <p>${S.caseObj.context}</p>
            ${S.caseObj.keyData ? `
              <div class="coach-data-list">
                <strong>Available data:</strong>
                <ul>${Object.entries(S.caseObj.keyData).map(([k,v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('')}</ul>
              </div>` : ''}
          </div>
        </details>

        <!-- Step instruction card -->
        <div class="coach-step-card">
          <div class="coach-step-badge">${step.icon} Step ${S.stepIdx + 1} of ${STEPS.length} — ${step.label}</div>
          <div class="coach-step-instruction">${step.instruction.replace(/\n/g, '<br>')}</div>
          <div class="coach-expects">
            <div class="coach-expects-hdr">BCG expects at this step:</div>
            <ul>${step.bcgExpects.map(e => `<li>${e}</li>`).join('')}</ul>
          </div>
        </div>

        <!-- Response -->
        <div class="coach-respond-card" id="coach-respond-area">
          <div class="coach-timer-row">
            <span class="coach-respond-label">Your response</span>
            <span class="coach-timer-el" id="coach-timer-el">⏱ ${mins}:${secs}</span>
          </div>
          <div class="coach-interim-wrap">
            <textarea id="coach-input" class="coach-textarea"
              placeholder="Type your response, or click Speak…"></textarea>
            <span id="coach-interim" class="coach-interim-text"></span>
          </div>
          <div class="coach-respond-actions">
            <button class="coach-mic-btn" id="coach-mic-btn" onclick="StepCoach._toggleMic()">🎤 Speak</button>
            <button class="coach-submit-btn" onclick="StepCoach._submit()">Submit for coaching →</button>
          </div>
        </div>

      </div>`;

    _startTimer(step.timeLimit);
  }

  // ── Progress bar ──────────────────────────────────────────────────────────
  function _progressHTML() {
    return `
      <div class="coach-header-bar">
        <div class="coach-header-title">🎓 Step Coach <span class="coach-case-chip">${S.caseObj.title}</span></div>
        <button class="coach-exit-btn" onclick="StepCoach.exit()">✕ Exit</button>
      </div>
      <div class="coach-progress-bar">
        ${STEPS.map((s, i) => `
          <div class="coach-pip ${i < S.stepIdx ? 'done' : i === S.stepIdx ? 'active' : 'upcoming'}">
            <div class="coach-pip-dot">${i < S.stepIdx ? '✓' : i + 1}</div>
            <div class="coach-pip-label">${s.label}</div>
          </div>
        `).join('')}
      </div>`;
  }

  // ── Timer ─────────────────────────────────────────────────────────────────
  function _startTimer(seconds) {
    clearInterval(S.timer);
    let rem = seconds;
    S.timer = setInterval(() => {
      rem--;
      const el = document.getElementById('coach-timer-el');
      if (el) {
        const m = Math.floor(rem / 60), s = (rem % 60).toString().padStart(2, '0');
        el.textContent = `⏱ ${m}:${s}`;
        el.style.color = rem <= 20 ? '#ef5350' : rem <= 40 ? '#ff9800' : '';
      }
      if (rem <= 0) { clearInterval(S.timer); _submit(); }
    }, 1000);
  }

  // ── Mic ───────────────────────────────────────────────────────────────────
  function _toggleMic() { S.micActive ? _stopMic() : _startMic(); }

  function _startMic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { showToast('Speech not supported — use Chrome.', 'error'); return; }
    S.micRec = new SR();
    S.micRec.continuous = true; S.micRec.interimResults = true; S.micRec.lang = 'en-IN';
    let base = (document.getElementById('coach-input')?.value || '').trim();
    if (base) base += ' ';
    S.micRec.onresult = e => {
      let finals = '', interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finals += e.results[i][0].transcript + ' ';
        else interim += e.results[i][0].transcript;
      }
      base += finals;
      const inp = document.getElementById('coach-input');
      const intEl = document.getElementById('coach-interim');
      if (inp) inp.value = base.trim();
      if (intEl) intEl.textContent = interim;
    };
    S.micRec.onerror = e => { if (e.error !== 'no-speech') { _stopMic(); showToast('Mic error: ' + e.error, 'error'); } };
    S.micRec.onend = () => { if (S.micActive) { try { S.micRec.start(); } catch(e){} } };
    S.micRec.start();
    S.micActive = true;
    const btn = document.getElementById('coach-mic-btn');
    if (btn) { btn.textContent = '🔴 Recording — click to stop'; btn.style.color = '#ef5350'; btn.style.borderColor = '#ef5350'; }
  }

  function _stopMic() {
    S.micActive = false;
    try { S.micRec?.stop(); } catch(e) {}
    const btn = document.getElementById('coach-mic-btn');
    const intEl = document.getElementById('coach-interim');
    if (btn) { btn.textContent = '🎤 Speak'; btn.style.color = ''; btn.style.borderColor = ''; }
    if (intEl) intEl.textContent = '';
  }

  // ── Submit + Score ────────────────────────────────────────────────────────
  async function _submit() {
    clearInterval(S.timer); _stopMic();
    const answer = document.getElementById('coach-input')?.value?.trim() || '';
    if (!answer) { showToast('Enter your response first.', 'error'); return; }

    const area = document.getElementById('coach-respond-area');
    if (area) area.innerHTML = `
      <div class="coach-loading">
        <div class="debrief-spinner-dots"><span></span><span></span><span></span></div>
        <p>Claude Sonnet is reviewing your response…</p>
      </div>`;

    try {
      const fb = await _scoreStep(answer);
      S.results[S.stepIdx] = { stepId: STEPS[S.stepIdx].id, answer, feedback: fb };
      _renderFeedback(fb, answer);
    } catch(err) {
      if (area) area.innerHTML = `<p style="color:#ef5350;padding:20px;">Error: ${err.message}</p>`;
    }
  }

  async function _scoreStep(answer) {
    const step = STEPS[S.stepIdx];
    const msg = `Coach this BCG case interview step response. You are in TUTOR mode — openly share the ideal answer and exact coaching. Cite the candidate's actual words.

CASE: ${S.caseObj.title}
CONTEXT: ${S.caseObj.context}
KEY DATA: ${JSON.stringify(S.caseObj.keyData || {})}
HIDDEN INSIGHT: ${S.caseObj.hiddenInsight || 'Not specified'}

STEP: ${step.label}
INSTRUCTION GIVEN: ${step.instruction}
SCORING CRITERIA: ${step.scoringCriteria}

CANDIDATE'S RESPONSE:
"${answer}"

Return ONLY this JSON:
{
  "score": <0-10 float>,
  "verdict": "<Excellent | Strong | Good | Needs Work | Redo>",
  "whatYouDid": "<2-3 sentences — what they actually did, quoting their specific words>",
  "whatWasMissing": "<2-3 sentences — specific missing element, with evidence from their answer>",
  "modelAnswer": "<Full ideal 4-6 sentence response a top BCG candidate would give for this step and this specific case — write it as if you are the candidate, using actual case data>",
  "coachingRule": "<The single most important rule to internalise — crisp, memorable, universally applicable>",
  "exactNextTime": "<Starts with 'Next time, open with:' — then the exact words they should say at the start of this step>"
}`;

    const resp = await callClaude(
      [{ role: 'user', content: msg }],
      'You are a senior BCG India partner in tutor mode. Be specific, honest, cite evidence. Return only valid JSON.',
      'claude-sonnet-4-6', 1500
    );
    const match = resp.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Could not parse coaching response');
    return JSON.parse(match[0]);
  }

  // ── Render Feedback ───────────────────────────────────────────────────────
  function _renderFeedback(fb, answer) {
    const area = document.getElementById('coach-respond-area');
    if (!area) return;
    const isLast = S.stepIdx >= STEPS.length - 1;
    const col = fb.score >= 7 ? '#00c853' : fb.score >= 5 ? '#ff9800' : '#ef5350';
    const bg  = fb.score >= 7 ? 'rgba(0,200,83,0.07)' : fb.score >= 5 ? 'rgba(255,152,0,0.07)' : 'rgba(239,83,80,0.07)';

    area.innerHTML = `
      <div class="coach-fb-wrap">

        <div class="coach-score-card" style="border-color:${col};background:${bg}">
          <div class="coach-score-num" style="color:${col}">${fb.score.toFixed(1)}<span class="coach-denom">/10</span></div>
          <div>
            <div class="coach-verdict" style="color:${col}">${fb.verdict}</div>
            <div class="coach-step-sm">${STEPS[S.stepIdx].icon} ${STEPS[S.stepIdx].label}</div>
          </div>
        </div>

        <div class="coach-your-ans">
          <div class="coach-fb-lbl">💬 What you said</div>
          <p class="coach-your-text">"${answer}"</p>
        </div>

        <div class="coach-fb-row">
          <div class="coach-fb-card coach-green">
            <div class="coach-fb-lbl">✅ What you did right</div>
            <p>${fb.whatYouDid}</p>
          </div>
          <div class="coach-fb-card coach-red">
            <div class="coach-fb-lbl">🔧 What was missing</div>
            <p>${fb.whatWasMissing}</p>
          </div>
        </div>

        <div class="coach-model-card">
          <div class="coach-fb-lbl">💡 Model answer — what a top candidate says</div>
          <p class="coach-model-text">"${fb.modelAnswer}"</p>
        </div>

        <div class="coach-rule-card">
          <div class="coach-fb-lbl">🧠 Rule to internalise</div>
          <p class="coach-rule-text">${fb.coachingRule}</p>
        </div>

        <div class="coach-nexttime-card">
          <div class="coach-fb-lbl">⚡ Exact words — next time</div>
          <p class="coach-nexttime-text">${fb.exactNextTime}</p>
        </div>

        <div class="coach-fb-actions">
          <button class="coach-retry-btn" onclick="StepCoach._retry()">↩ Retry this step</button>
          ${isLast
            ? `<button class="coach-advance-btn" onclick="StepCoach._summary()">✓ View Full Summary</button>`
            : `<button class="coach-advance-btn" onclick="StepCoach._next()">
                Next: ${STEPS[S.stepIdx + 1].label} →
               </button>`}
        </div>
      </div>`;

    area.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  function _summary() {
    const el = document.getElementById('coach-active');
    if (!el) return;
    const scores = S.results.map(r => r.feedback?.score || 0);
    const avg = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1) : '—';
    const avgCol = parseFloat(avg) >= 7 ? '#00c853' : parseFloat(avg) >= 5 ? '#ff9800' : '#ef5350';

    el.innerHTML = `
      ${_progressHTML()}
      <div class="coach-scroll-body">
        <div class="coach-summary-header">
          <div class="coach-sum-avg" style="color:${avgCol}">${avg}<span class="coach-denom">/10</span></div>
          <div class="coach-sum-label">Average across all ${STEPS.length} steps</div>
        </div>
        <div class="coach-sum-list">
          ${S.results.map(r => {
            const step = STEPS.find(s => s.id === r.stepId) || {};
            const sc = r.feedback?.score || 0;
            const col = sc >= 7 ? '#00c853' : sc >= 5 ? '#ff9800' : '#ef5350';
            return `
              <div class="coach-sum-row">
                <div class="coach-sum-step-name">${step.icon || ''} ${step.label || r.stepId}</div>
                <div class="coach-sum-score" style="color:${col}">${sc.toFixed(1)}/10 — ${r.feedback?.verdict || ''}</div>
                <div class="coach-sum-rule">🧠 ${r.feedback?.coachingRule || ''}</div>
                <div class="coach-sum-fix">⚡ ${r.feedback?.exactNextTime || ''}</div>
              </div>`;
          }).join('')}
        </div>
        <div class="coach-sum-actions">
          <button class="coach-retry-btn" onclick="StepCoach.startCoach(window._lastCoachCase)">↩ Redo This Case</button>
          <button class="coach-advance-btn" onclick="StepCoach.exit()">Back to Practice</button>
        </div>
      </div>`;

    window._lastCoachCase = S.caseObj;
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  function _retry() { _renderStep(); }
  function _next()  { S.stepIdx++; _renderStep(); }

  function exit() {
    clearInterval(S.timer); _stopMic();
    document.getElementById('coach-active').style.display = 'none';
    document.getElementById('coach-case-select').style.display = 'block';
    renderCoachSelect();
  }

  return { startCoach, exit, _toggleMic, _submit, _retry, _next, _summary };
})();
