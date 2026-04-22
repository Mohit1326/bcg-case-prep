// ── Step Coach — Victor Cheng Methodology: 5 Steps to Crack Any Case ─────────
// Based on "Case Interview Secrets" by Victor Cheng (McKinsey, 2012)
// VC Chapter refs embedded in each step definition
window.StepCoach = (function() {

  // ── Step Definitions — Victor Cheng's Exact Process ──────────────────────
  const STEPS = [
    {
      id: 'stall_clarify',
      icon: '🔍',
      label: 'Stall & Clarify',
      vcRef: 'VC Ch.17 — Steps 1 & 2',
      timeLimit: 90,
      instruction:
        'Victor Cheng opens every case with two moves — STALL, then CLARIFY.\n\n' +
        '① STALL: Restate the question slowly in your own words. "So, you want to know whether X should do Y?" ' +
        'This buys 20–30 seconds of thinking time and confirms you heard correctly.\n\n' +
        '② CLARIFY: Ask 1–3 background questions. For EACH question, state WHY you are asking it — ' +
        '"I want to ask about X because knowing it will determine whether I structure this as A or B."\n\n' +
        'End with: "Before I state my hypothesis, I want to confirm a couple of things."\n\n' +
        'NEVER jump straight into analysis. NEVER ask more than 3 questions.',
      vcRule: '"Five-Minute Hypothesis Rule: If you haven\'t stated a hypothesis within 5 minutes, you\'re at serious risk of never stating one." — Victor Cheng',
      bcgExpects: [
        '<strong>Restate the question first</strong> — "So, you\'re asking me whether…" signals you heard correctly and creates thinking time',
        '<strong>Maximum 3 clarifying questions</strong> — more signals poor prioritisation. Each must be justified with an analytical reason',
        '<strong>Clarify the objective & measure of success</strong> — "When you say \'should we enter\', what does success look like — IRR threshold, market share, absolute revenue?"',
        '<strong>Clarify terms you don\'t know</strong> — VC himself asked "What\'s reinsurance?" mid-interview. Never fake domain knowledge',
        '<strong>Telegraph the hypothesis is coming</strong> — "Once I confirm a few things, I\'ll share my initial hypothesis"',
      ],
      scoringCriteria:
        '(1) Did they restate the question? ' +
        '(2) Max 3 questions? ' +
        '(3) Each question justified with an analytical reason — why does the answer change the approach? ' +
        '(4) Did they clarify objective / definition of success? ' +
        '(5) Did they signal that a hypothesis follows?',
    },
    {
      id: 'hypothesis',
      icon: '💡',
      label: 'State Hypothesis',
      vcRef: 'VC Ch.8 — The Hypothesis',
      timeLimit: 60,
      instruction:
        'Victor Cheng\'s Step 4: STATE YOUR HYPOTHESIS — explicitly, always, even if arbitrary.\n\n' +
        'FORMAT: "My initial working hypothesis is [X] because [reason]. ' +
        'This means the primary driver is likely [specific area]. To test this, I want to..."\n\n' +
        'If you have minimal information: "Given the limited information, I\'ll state an ARBITRARY hypothesis ' +
        'that [X] is the cause. This will organise my analysis and I\'ll revise it as data comes in."\n\n' +
        'The hypothesis does NOT need to be correct. It needs to be STATED.\n\n' +
        'CRITICAL: Never say "there could be several reasons..." — that is not a hypothesis.',
      vcRule: '"Many candidates jump into a framework without having stated a hypothesis, which interviewers find ridiculous: how can you create a structure to test a hypothesis if you haven\'t stated one?" — Victor Cheng',
      bcgExpects: [
        '<strong>Hypothesis explicitly stated</strong> — "My hypothesis is X" — not vague exploration language like "I\'d like to look at..."',
        '<strong>Directional and specific</strong> — points to where you believe the problem lives, not just "costs or revenues"',
        '<strong>Testable</strong> — framed so it can be proven or disproven with data',
        '<strong>Arbitrary is acceptable</strong> — if you have little information, say "I\'ll state an arbitrary hypothesis that costs have risen, which I\'ll test and revise as data comes in"',
        '<strong>Leads naturally into the issue tree</strong> — "To test this hypothesis, I\'ll build a framework that..."',
      ],
      scoringCriteria:
        '(1) Hypothesis explicitly stated — not vague exploration language? ' +
        '(2) Directional — says where the problem likely is? ' +
        '(3) Testable — can be proven or disproven with a specific piece of data? ' +
        '(4) Signals the issue tree structure that follows?',
    },
    {
      id: 'issue_tree',
      icon: '🌳',
      label: 'Build Issue Tree',
      vcRef: 'VC Ch.9 — The Issue Tree + Ch.12–14 Frameworks',
      timeLimit: 120,
      instruction:
        'Victor Cheng\'s Step 5: DECIDE, DRAW, AND COMMUNICATE your issue tree.\n\n' +
        'Your tree must pass 3 validity tests:\n' +
        '① HYPOTHESIS TEST: Does every branch directly test your stated hypothesis?\n' +
        '② MECE TEST: Mutually Exclusive (no overlaps) + Collectively Exhaustive (no gaps)?\n' +
        '③ CONCLUSIVENESS TEST: "If all branches turn out to be true, can I imagine the OPPOSITE of my hypothesis being true?" If yes, fix the tree.\n\n' +
        'Use VC\'s 3 core frameworks:\n' +
        '• Profitability: P = Revenue − Costs (use for margin/profit cases)\n' +
        '• Business Situation: Customer · Product · Company · Competition (qualitative/strategic cases)\n' +
        '• M&A: Strategic fit + Financial fit (acquisition cases)\n\n' +
        'Rephrase each branch as a SUB-HYPOTHESIS — not "Costs" but "Variable costs have outpaced pricing power."',
      vcRule: '"A framework is just an issue tree template. The ONLY reason you use a framework is to test a hypothesis. If you use a framework without a hypothesis, you will be rejected." — Victor Cheng',
      bcgExpects: [
        '<strong>Every branch tied to the hypothesis</strong> — not generic "areas to look at." Ask: does each branch prove/disprove the hypothesis?',
        '<strong>MECE</strong> — mutually exclusive: no overlapping buckets. Collectively exhaustive: no major factor missing. Math-based trees can be 100% MECE; conceptual trees aim to be as MECE as possible',
        '<strong>Conclusiveness test passed</strong> — "If all these branches are true, I cannot imagine the opposite of my hypothesis being true"',
        '<strong>Branches phrased as sub-hypotheses</strong> — "Revenue has declined due to volume loss, not pricing pressure" vs just "Revenue"',
        '<strong>Explicit prioritisation with rationale</strong> — "I will test Branch 1 first because it is mathematically the largest potential driver given X"',
      ],
      scoringCriteria:
        '(1) Hypothesis test: each branch directly tests the stated hypothesis? ' +
        '(2) MECE test: no overlapping branches, no major gap? ' +
        '(3) Conclusiveness test: would finding all branches true conclusively prove the hypothesis? ' +
        '(4) Sub-hypotheses: branches framed as testable sub-claims, not just category labels? ' +
        '(5) Prioritisation: one branch called out with a specific rationale?',
    },
    {
      id: 'drill_down',
      icon: '🔬',
      label: 'Drill-Down Analysis',
      vcRef: 'VC Ch.10 — Drill-Down + Ch.18 — How to Analyse',
      timeLimit: 150,
      instruction:
        'Victor Cheng\'s analysis process: SEGMENT → ISOLATE → PROCESS OF ELIMINATION → BENCHMARK.\n\n' +
        '① SEGMENT: "I\'d like to break this metric into its component parts." ' +
        'Do NOT specify how — say it open-endedly and let the interviewer reveal the right pattern.\n\n' +
        '② ISOLATE: Once you have sub-data, identify which sub-branch drives the problem. ' +
        'Explicitly rule out what is NOT the problem: "This rules out X."\n\n' +
        '③ BENCHMARK: Always compare a metric to TWO things — (a) its own history, (b) competitors. ' +
        '"Is this good or bad? Compared to last year... compared to the industry..."\n\n' +
        '④ MINI-SYNTHESIS when switching branches: Before moving on, synthesise what the current branch told you.\n\n' +
        'REMEMBER: Total numbers lie. Averages lie. Segment everything.',
      vcRule: '"Total numbers lie. Averages lie. Anytime you hear a total or average, assume it is misleading and segment it to understand what is really going on." — Victor Cheng',
      bcgExpects: [
        '<strong>Request segmentation without specifying how</strong> — "I\'d like to understand what drives this number" then stop talking. Let the interviewer reveal the segmentation pattern',
        '<strong>Use process of elimination explicitly</strong> — "I can now rule out X because... so the problem must be in Y or Z"',
        '<strong>Two benchmarks, always</strong> — compare every metric to (a) its own prior period AND (b) competitors or industry',
        '<strong>Mini-synthesis before every branch switch</strong> — "The cost branch is not the primary driver. Specifically, fixed costs are stable and variable cost per unit is flat. This means the issue is entirely on the revenue side." Then switch.',
        '<strong>Do the actual math</strong> — never hand-wave numbers. Decompose, calculate, state the implication.',
      ],
      scoringCriteria:
        '(1) Requested segmentation without specifying the pattern? ' +
        '(2) Used process of elimination — explicitly ruled out branches? ' +
        '(3) Compared metrics to historical AND competitive benchmark? ' +
        '(4) Delivered mini-synthesis before switching to a new branch? ' +
        '(5) Did the actual math accurately?',
    },
    {
      id: 'synthesis',
      icon: '🎯',
      label: 'Top-Down Synthesis',
      vcRef: 'VC Ch.11 — Synthesis + Ch.19 — How to Close',
      timeLimit: 90,
      instruction:
        'Victor Cheng\'s closing format — the exact structure BCG partners use with CEOs:\n\n' +
        '"[Recommendation] for [three reasons]:\n' +
        'First, [supporting point 1].\n' +
        'Second, [supporting point 2].\n' +
        'Third, [supporting point 3].\n' +
        'And those are the three reasons why I recommend [same recommendation]."\n\n' +
        'RULES:\n' +
        '• Recommendation ALWAYS comes FIRST — never data, never context, never caveats\n' +
        '• Exactly 3 supporting points — never more\n' +
        '• Restate the recommendation at the end\n' +
        '• Action-oriented: "The client should shut down the Bangalore plant" not "there are profitability challenges"\n\n' +
        'If you ran out of time: "Given more time, I would also analyse X to address the remaining uncertainty around Y."',
      vcRule: '"Most people use a bottom-up summary intuitively — listing everything they did. This is NOT synthesis. Synthesis always leads with the conclusion. First sentence = the answer." — Victor Cheng',
      bcgExpects: [
        '<strong>Recommendation in the FIRST sentence</strong> — not analysis recap, not context, not caveats — the answer',
        '<strong>Exactly 3 supporting points</strong> — force yourself to prioritise. Never list 4 or 5 "reasons"',
        '<strong>Action-oriented recommendation</strong> — specific verb + specific subject: "shut down," "invest ₹200Cr in," "exit the market"',
        '<strong>Conclusion restated at the end</strong> — "And for these three reasons, I recommend [exact same action]"',
        '<strong>Risk or next step as add-on</strong> — after restating conclusion, optionally: "The key risk is X, and given more time I would validate Y"',
      ],
      scoringCriteria:
        '(1) Recommendation stated FIRST — not data or summary? ' +
        '(2) Exactly 3 supporting points — not 2, not 4+? ' +
        '(3) Supporting points logically prove the recommendation? ' +
        '(4) Conclusion explicitly restated at the end? ' +
        '(5) Action-oriented — specific, not vague?',
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
      { type: 'profitability', icon: '📊', label: 'Profitability', vcFramework: 'P = R − C tree' },
      { type: 'market_entry',  icon: '🌍', label: 'Market Entry',  vcFramework: 'Business Situation (CPCC)' },
      { type: 'ma',            icon: '🤝', label: 'M&A',           vcFramework: 'M&A = Strategic + Financial fit' },
      { type: 'growth',        icon: '🚀', label: 'Growth',        vcFramework: 'Business Situation (CPCC)' },
      { type: 'operations',    icon: '⚙️', label: 'Operations',    vcFramework: 'Value Chain + Profitability' },
      { type: 'random',        icon: '🎲', label: 'Random',        vcFramework: 'All frameworks' },
    ];
    el.innerHTML = `
      <div class="coach-select-intro">
        <h2 class="coach-select-title">🎓 Step Coach — Victor Cheng Method</h2>
        <p class="coach-select-sub">Practice each of Victor Cheng's 5 steps one at a time. After every step, see the model answer, the VC rule you should internalise, and the exact words to use next time.</p>
        <div class="coach-mode-pills">
          <span class="coach-mode-pill">🔍 Stall & Clarify → 💡 Hypothesis → 🌳 Issue Tree → 🔬 Drill-Down → 🎯 Synthesis</span>
        </div>
        <div class="coach-vc-note">
          <span class="coach-vc-badge">📖 Based on</span>
          <span class="coach-vc-title">Case Interview Secrets — Victor Cheng</span>
        </div>
      </div>
      <div class="coach-type-grid">
        ${types.map(t => `
          <button class="coach-type-btn" onclick="(()=>{
            const allCases = window.CASES || [];
            const filtered = ${t.type === 'random' ? 'allCases' : `allCases.filter(c=>c.type==='${t.type}')`};
            if(!filtered.length){showToast('No cases loaded','error');return;}
            const pick = filtered[Math.floor(Math.random()*filtered.length)];
            StepCoach.startCoach(pick);
          })()">
            <span class="coach-type-icon">${t.icon}</span>
            <div>
              <div style="font-weight:600">${t.label}</div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:3px">${t.vcFramework}</div>
            </div>
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

        <!-- VC Rule Banner -->
        <div class="coach-vc-rule-banner">
          <span class="coach-vc-chip">${step.vcRef}</span>
          <p class="coach-vc-rule-text">${step.vcRule}</p>
        </div>

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
            <div class="coach-expects-hdr">What Victor Cheng's interviewers look for:</div>
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
              placeholder="Type or speak your response…"></textarea>
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
        <p>Claude Sonnet is reviewing against Victor Cheng's criteria…</p>
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

    const msg =
`You are a BCG senior partner coaching a candidate using VICTOR CHENG'S methodology from "Case Interview Secrets."
Evaluate the response strictly against Cheng's criteria. Cite the candidate's actual words as evidence.

CASE: ${S.caseObj.title}
CASE TYPE: ${S.caseObj.type} | ${S.caseObj.industry}
CONTEXT: ${S.caseObj.context}
KEY DATA: ${JSON.stringify(S.caseObj.keyData || {})}
HIDDEN INSIGHT: ${S.caseObj.hiddenInsight || 'Not specified'}
VC FRAMEWORK HINT: ${S.caseObj.suggestedFramework || 'Not specified'}

STEP BEING COACHED: ${step.label} (${step.vcRef})
STEP INSTRUCTION GIVEN TO CANDIDATE: ${step.instruction}
SCORING CRITERIA (APPLY STRICTLY): ${step.scoringCriteria}

VICTOR CHENG'S RULE FOR THIS STEP: ${step.vcRule}

CANDIDATE'S RESPONSE:
"${answer}"

Return ONLY this JSON — no other text:
{
  "score": <0-10 float, strict — 7.0+ only if VC criteria clearly met>,
  "verdict": "<Excellent | Strong | Good | Needs Work | Redo>",
  "vcMistakesMade": ["<Which of VC's 10 common mistakes was made, if any — e.g. 'Mistake #1: No hypothesis stated'>"],
  "whatYouDid": "<2-3 sentences quoting their specific words — what they actually did right>",
  "whatWasMissing": "<2-3 sentences — specific VC criterion not met, with evidence from their answer>",
  "modelAnswer": "<Full ideal response a top BCG candidate would give for THIS step and THIS specific case — write in first person as the candidate, use actual case data, mirror Victor Cheng's exact templates from the book>",
  "vcRule": "<The single Victor Cheng rule most violated or most relevant — exact principle from the book>",
  "exactNextTime": "<Starts with the literal first words the candidate should say — e.g. 'Next time, open with: My initial working hypothesis is...'>"
}`;

    const resp = await callClaude(
      [{ role: 'user', content: msg }],
      'You are a strict BCG senior partner coaching with Victor Cheng\'s methodology. Return only valid JSON.',
      'claude-sonnet-4-6', 1600
    );
    const match = resp.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Could not parse coaching response');
    return JSON.parse(match[0]);
  }

  // ── Render Feedback ───────────────────────────────────────────────────────
  function _renderFeedback(fb, answer) {
    const area = document.getElementById('coach-respond-area');
    if (!area) return;
    const step   = STEPS[S.stepIdx];
    const isLast = S.stepIdx >= STEPS.length - 1;
    const col = fb.score >= 7 ? '#00c853' : fb.score >= 5 ? '#ff9800' : '#ef5350';
    const bg  = fb.score >= 7 ? 'rgba(0,200,83,0.07)' : fb.score >= 5 ? 'rgba(255,152,0,0.07)' : 'rgba(239,83,80,0.07)';
    const mistakesHTML = (fb.vcMistakesMade || []).length
      ? `<div class="coach-vc-mistakes">
           <div class="coach-fb-lbl">⚠️ VC Common Mistakes Triggered</div>
           <ul>${fb.vcMistakesMade.map(m => `<li>${m}</li>`).join('')}</ul>
         </div>`
      : '';

    area.innerHTML = `
      <div class="coach-fb-wrap">

        <div class="coach-score-card" style="border-color:${col};background:${bg}">
          <div class="coach-score-num" style="color:${col}">${fb.score.toFixed(1)}<span class="coach-denom">/10</span></div>
          <div>
            <div class="coach-verdict" style="color:${col}">${fb.verdict}</div>
            <div class="coach-step-sm">${step.icon} ${step.label} · ${step.vcRef}</div>
          </div>
        </div>

        ${mistakesHTML}

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
            <div class="coach-fb-lbl">🔧 What was missing (VC criteria)</div>
            <p>${fb.whatWasMissing}</p>
          </div>
        </div>

        <div class="coach-model-card">
          <div class="coach-fb-lbl">💡 Model answer — what a top candidate says (Victor Cheng style)</div>
          <p class="coach-model-text">"${fb.modelAnswer}"</p>
        </div>

        <div class="coach-rule-card">
          <div class="coach-fb-lbl">📖 Victor Cheng rule to internalise</div>
          <p class="coach-rule-text">${fb.vcRule}</p>
        </div>

        <div class="coach-nexttime-card">
          <div class="coach-fb-lbl">⚡ Exact words — use these next time</div>
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

    // Collect all VC mistakes across steps
    const allMistakes = S.results.flatMap(r => r.feedback?.vcMistakesMade || []);
    const uniqueMistakes = [...new Set(allMistakes)];

    // ── Persist to Step Coach history ─────────────────────────────────────
    try {
      Storage.saveCoachSession({
        id: 'coach_' + Date.now(),
        timestamp: Date.now(),
        caseTitle:   S.caseObj?.title || 'Unknown Case',
        caseType:    S.caseObj?.type  || 'unknown',
        avgScore:    parseFloat(avg)  || 0,
        stepResults: S.results.map(r => {
          const step = STEPS.find(st => st.id === r.stepId) || {};
          return { stepId: r.stepId, label: step.label || r.stepId, icon: step.icon || '', score: r.feedback?.score || 0, verdict: r.feedback?.verdict || '' };
        }),
        vcMistakes: uniqueMistakes,
      });
    } catch(e) { /* silent */ }

    el.innerHTML = `
      ${_progressHTML()}
      <div class="coach-scroll-body">
        <div class="coach-summary-header">
          <div class="coach-sum-avg" style="color:${avgCol}">${avg}<span class="coach-denom">/10</span></div>
          <div class="coach-sum-label">Average across all ${STEPS.length} Victor Cheng steps</div>
        </div>

        ${uniqueMistakes.length ? `
          <div class="coach-vc-mistakes-summary">
            <div class="coach-fb-lbl">⚠️ Victor Cheng Mistakes to Fix</div>
            <ul>${uniqueMistakes.map(m => `<li>${m}</li>`).join('')}</ul>
          </div>` : `
          <div class="coach-vc-mistakes-summary" style="border-color:#00c853;background:rgba(0,200,83,0.07)">
            <div class="coach-fb-lbl" style="color:#00c853">✅ No common VC mistakes flagged!</div>
          </div>`}

        <div class="coach-sum-list">
          ${S.results.map(r => {
            const step = STEPS.find(s => s.id === r.stepId) || {};
            const sc = r.feedback?.score || 0;
            const col = sc >= 7 ? '#00c853' : sc >= 5 ? '#ff9800' : '#ef5350';
            return `
              <div class="coach-sum-row">
                <div class="coach-sum-step-name">${step.icon || ''} ${step.label || r.stepId} <span style="font-size:11px;color:var(--text-muted)">${step.vcRef||''}</span></div>
                <div class="coach-sum-score" style="color:${col}">${sc.toFixed(1)}/10 — ${r.feedback?.verdict || ''}</div>
                <div class="coach-sum-rule">📖 ${r.feedback?.vcRule || ''}</div>
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
