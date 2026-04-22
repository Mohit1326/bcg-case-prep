// ── Issue Tree Builder — Victor Cheng Methodology ─────────────────────────────
// Step-by-step MECE structuring practice with Claude feedback + ideal tree comparison
// Based on VC Ch.9 (Issue Tree), Ch.10 (Drill-Down), Ch.18 (Analytics)
window.IssueTree = (function () {

  // ── Cases ──────────────────────────────────────────────────────────────────
  const CASES = [
    {
      id: 'it_profit_01',
      type: 'Profitability',
      title: 'MedDevice Co. — Profit Margin Decline',
      context: 'Your client is MedDevice Co., a mid-sized US medical device manufacturer. Their net profit margin has declined from 18% to 9% over the past 3 years, despite revenue growing 12% in the same period. The CEO wants to understand why and what to do about it.',
      objective: 'Identify the primary driver(s) of profit margin compression and recommend a fix.',
      hypothesis: 'MedDevice Co.\'s profit decline is primarily cost-driven — specifically manufacturing or input costs — rather than a revenue or pricing issue.',
      idealTree: {
        L1: ['Revenue issues', 'Cost issues'],
        L2: {
          'Revenue issues': ['Price / mix decline', 'Volume decline'],
          'Cost issues':    ['COGS increase', 'Operating expense increase'],
        },
        L3: {
          'Price / mix decline':           ['Pricing pressure from competition', 'Product mix shift to lower-margin lines'],
          'Volume decline':                ['Market share loss', 'Overall market contraction'],
          'COGS increase':                 ['Raw material cost increase', 'Manufacturing inefficiency', 'Labour cost increase'],
          'Operating expense increase':    ['SG&A bloat', 'R&D spend increase', 'Overhead growth'],
        },
      },
      drillClue: 'The CFO shares: COGS has risen from 42% to 61% of revenue over 3 years. Revenue growth has been entirely volume-driven — average selling price is flat.',
      drillAnswer: 'The clue points directly to the COGS increase sub-branch under Cost issues. Refined hypothesis: Manufacturing inefficiency or raw material cost inflation is the primary driver of margin compression — not pricing or volume.',
      vcRef: 'VC Ch.13 — Profitability (P = R − C)',
    },
    {
      id: 'it_growth_01',
      type: 'Growth',
      title: 'RetailBank — Revenue Growth Stall',
      context: 'RetailBank, a mid-sized Indian private bank, has seen revenue growth at 2% YoY for the past 2 years while the industry grew at 11%. The CEO wants to understand why growth has stalled and what to prioritise.',
      objective: 'Diagnose why revenue growth has stalled and identify the highest-impact recovery levers.',
      hypothesis: 'RetailBank\'s growth stall is driven by a customer acquisition slowdown and declining revenue per existing customer — not market shrinkage.',
      idealTree: {
        L1: ['Customer base issues', 'Revenue per customer issues'],
        L2: {
          'Customer base issues':           ['Low new customer acquisition', 'High customer churn'],
          'Revenue per customer issues':    ['Low product penetration', 'Declining transaction value / volume'],
        },
        L3: {
          'Low new customer acquisition':    ['Weak brand / awareness', 'Uncompetitive product offering', 'Poor distribution reach'],
          'High customer churn':             ['Service quality gaps', 'Better competitor offers', 'Life-event attrition'],
          'Low product penetration':         ['Weak cross-sell execution', 'Narrow product suite'],
          'Declining transaction value / volume': ['Economic stress on customers', 'Shift to competing platforms (UPI, fintechs)'],
        },
      },
      drillClue: 'Data: New account openings are down 35% vs 2 years ago. Existing customer transaction volumes are roughly flat. Industry new account growth was +18%.',
      drillAnswer: 'The clue isolates "Low new customer acquisition" under Customer base issues. Refined hypothesis: RetailBank is losing the acquisition battle — likely due to a weaker digital onboarding experience or uncompetitive offers vs fintech challengers.',
      vcRef: 'VC Ch.14 — Business Situation (Customer · Product · Company · Competition)',
    },
    {
      id: 'it_mktentry_01',
      type: 'Market Entry',
      title: 'PharmaCo — India Generics Entry',
      context: 'PharmaCo is a €2B European pharmaceutical company with no India presence. They are evaluating whether to enter the Indian generics market, which has grown at 14% CAGR. The board wants a go / no-go recommendation.',
      objective: 'Determine whether PharmaCo should enter the Indian generics market, and if so, how.',
      hypothesis: 'PharmaCo should enter India because the market is large and growing; however, competitive intensity and margin structure require validation before committing.',
      idealTree: {
        L1: ['Market attractiveness', 'Company fit', 'Entry feasibility'],
        L2: {
          'Market attractiveness': ['Market size & growth', 'Profitability potential', 'Competitive intensity'],
          'Company fit':           ['Capability match', 'Strategic alignment'],
          'Entry feasibility':     ['Regulatory & compliance', 'Distribution & GTM', 'Investment & returns'],
        },
        L3: {
          'Market size & growth':    ['Total addressable market', 'Growth drivers', 'Segment breakdown'],
          'Profitability potential': ['Margin structure vs EU', 'Pricing power', 'Cost position vs local players'],
          'Competitive intensity':   ['Local player strength', 'MNC presence', 'Barriers to entry'],
          'Capability match':        ['Manufacturing fit', 'Product portfolio relevance', 'Regulatory track record'],
          'Strategic alignment':     ['Portfolio strategy', 'Management bandwidth'],
          'Regulatory & compliance': ['CDSCO approval path', 'IP / patent risks', 'Local manufacturing rules'],
          'Distribution & GTM':      ['Channel access', 'Local partner options', 'Brand requirements'],
          'Investment & returns':    ['Capex requirement', 'Payback timeline', 'Risk-adjusted IRR'],
        },
      },
      drillClue: 'Research shows: Indian generics market is ₹1.8T growing 14% CAGR. Three local players control 58% of the market and operate at 12–15% EBITDA margins — roughly half of PharmaCo\'s European margins.',
      drillAnswer: 'The clue points to Profitability potential and Competitive intensity sub-branches under Market attractiveness. Refined hypothesis: The margin gap and dominant local players may not justify entry unless PharmaCo targets a premium niche or uses a partnership model to lower cost.',
      vcRef: 'VC Ch.14 — Business Situation + Market Entry logic',
    },
  ];

  // ── State ──────────────────────────────────────────────────────────────────
  let S = {
    caseObj: null,
    phase: 'select',
    userTree: { L1: [], L2: {}, L3: {} },
    l2Queue: [],
    feedback: {},
    currentNode: null,
    userDrilldownAnswer: '',
  };

  // ── Open / Close ───────────────────────────────────────────────────────────
  function open() {
    document.getElementById('it-modal')?.remove();
    const overlay = document.createElement('div');
    overlay.id = 'it-modal';
    overlay.className = 'it-modal-overlay';
    overlay.innerHTML = `
      <div class="it-modal">
        <div class="it-modal-hdr">
          <div>
            <span class="it-badge">🌳 Issue Tree Builder</span>
            <div class="it-modal-title">MECE Structuring Practice</div>
          </div>
          <button class="it-close-btn" onclick="IssueTree.close()">✕</button>
        </div>
        <div class="it-body" id="it-body"></div>
      </div>`;
    document.body.appendChild(overlay);
    _render();
  }

  function close() {
    document.getElementById('it-modal')?.remove();
  }

  // ── Render dispatcher ──────────────────────────────────────────────────────
  function _render() {
    const body = document.getElementById('it-body');
    if (!body) return;
    const map = {
      select:        _selectHTML,
      intro:         _introHTML,
      build_l1:      _l1HTML,
      fb_l1:         _fbL1HTML,
      build_l2:      _l2HTML,
      fb_l2:         _fbL2HTML,
      drilldown:     _drilldownHTML,
      fb_drilldown:  _fbDrilldownHTML,
      compare:       _compareHTML,
    };
    const fn = map[S.phase];
    if (fn) body.innerHTML = fn();
  }

  // ── Phase: Select Case ─────────────────────────────────────────────────────
  function _selectHTML() {
    return `
      <div class="it-intro-text">
        <p>Build a <strong>MECE issue tree step by step</strong> — the exact method Victor Cheng teaches. You'll construct each level, get Claude feedback on MECE quality, do a drill-down, then compare your tree to the ideal side-by-side.</p>
        <div class="it-vc-ref">📖 Based on VC Ch.9 (Issue Tree) · Ch.10 (Drill-Down) · Ch.18 (Analytics)</div>
      </div>
      <div class="it-case-grid">
        ${CASES.map(c => `
          <div class="it-case-card" onclick="IssueTree._startCase('${c.id}')">
            <div class="it-case-type-badge">${c.type}</div>
            <div class="it-case-card-title">${c.title}</div>
            <div class="it-case-card-ref">${c.vcRef}</div>
            <div class="it-case-card-cta">Start →</div>
          </div>
        `).join('')}
      </div>`;
  }

  function _startCase(caseId) {
    const c = CASES.find(x => x.id === caseId);
    if (!c) return;
    S = { caseObj: c, phase: 'intro', userTree: { L1: [], L2: {}, L3: {} }, l2Queue: [], feedback: {}, currentNode: null, userDrilldownAnswer: '' };
    _render();
  }

  // ── Phase: Intro ───────────────────────────────────────────────────────────
  function _introHTML() {
    const c = S.caseObj;
    return `
      <div class="it-phase-pill">📋 Phase 1 — Case Context & Hypothesis</div>
      <div class="it-context-card">
        <div class="it-context-title">${c.title}</div>
        <p class="it-context-body">${c.context}</p>
        <div class="it-objective"><strong>Objective:</strong> ${c.objective}</div>
      </div>
      <div class="it-hyp-card">
        <div class="it-hyp-label">💡 Working Hypothesis (VC Ch.8)</div>
        <p class="it-hyp-text">"${c.hypothesis}"</p>
        <div class="it-hyp-note">Every branch of your tree must be a <em>sub-hypothesis</em> that, if proven true, supports or disproves this hypothesis. This is VC's "Hypothesis Test" — one of the three validity tests for any issue tree.</div>
      </div>
      <div class="it-vc-rule-box">📖 ${c.vcRef} — Three validity tests: <strong>Hypothesis Test</strong> (each branch is falsifiable), <strong>MECE Test</strong> (no overlap, no gaps), <strong>Conclusiveness Test</strong> (resolving all branches gives you the answer).</div>
      <button class="it-primary-btn" onclick="IssueTree._goL1()">Build Level 1 →</button>`;
  }

  function _goL1() { S.phase = 'build_l1'; _render(); }

  // ── Phase: Build L1 ────────────────────────────────────────────────────────
  function _l1HTML() {
    return `
      <div class="it-phase-pill">🌳 Phase 2 — Level 1 Branches</div>
      <div class="it-context-mini">
        <strong>${S.caseObj.title}</strong>
        <div class="it-hyp-mini">Hypothesis: "${S.caseObj.hypothesis}"</div>
      </div>
      <div class="it-instruction">
        <strong>What are the 2–4 main branches of your issue tree?</strong><br>
        These are the highest-level MECE categories that together cover the entire problem space. Enter one per line.
        <div class="it-tip">💡 Profitability → Revenue vs Costs. Market Entry → Market attractiveness / Company fit / Feasibility. Keep L1 to 2–4 branches max.</div>
      </div>
      <textarea id="it-input" class="it-textarea" placeholder="e.g.&#10;Revenue issues&#10;Cost issues"></textarea>
      <button class="it-primary-btn" onclick="IssueTree._submitL1()">Check my L1 branches →</button>`;
  }

  async function _submitL1() {
    const raw = document.getElementById('it-input')?.value?.trim() || '';
    if (!raw) { showToast('Enter your L1 branches first.', 'error'); return; }
    const branches = raw.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    if (branches.length < 2) { showToast('Enter at least 2 branches.', 'error'); return; }
    S.userTree.L1 = branches;
    _setLoading('Claude is checking your MECE quality…');
    try {
      S.feedback['L1'] = await _checkMECE('L1', branches, S.caseObj.hypothesis, S.caseObj.context, null);
      S.phase = 'fb_l1';
      _render();
    } catch(e) { _setError(e.message); }
  }

  function _fbL1HTML() {
    const fb = S.feedback['L1'] || {};
    const ideal = S.caseObj.idealTree;
    return `
      <div class="it-phase-pill">✅ L1 Feedback</div>
      ${_scoreBadge(fb.score, fb.verdict)}
      <div class="it-two-col">
        <div class="it-tree-panel">
          <div class="it-tree-lbl it-your-lbl">Your L1</div>
          ${_treeHTML({ L1: S.userTree.L1 }, false)}
        </div>
        <div class="it-tree-panel">
          <div class="it-tree-lbl it-ideal-lbl">✅ Ideal L1</div>
          ${_treeHTML({ L1: ideal.L1 }, true)}
        </div>
      </div>
      ${_fbCard(fb)}
      <div class="it-actions">
        <button class="it-secondary-btn" onclick="IssueTree._retryL1()">↩ Redo L1</button>
        <button class="it-primary-btn" onclick="IssueTree._goL2()">Expand to L2 →</button>
      </div>`;
  }

  function _retryL1() { S.userTree.L1 = []; S.feedback['L1'] = null; S.phase = 'build_l1'; _render(); }

  // ── Phase: Build L2 ────────────────────────────────────────────────────────
  function _goL2() { S.l2Queue = [...S.userTree.L1]; S.phase = 'build_l2'; _render(); }

  function _l2HTML() {
    const node = S.l2Queue[0];
    if (!node) { _goDrilldown(); return ''; }
    S.currentNode = node;
    return `
      <div class="it-phase-pill">🌿 Phase 3 — Level 2: Expand "${node}"</div>
      <div class="it-partial-tree-wrap">
        <div class="it-tree-lbl">Tree so far:</div>
        ${_treeHTML(S.userTree, false)}
      </div>
      <div class="it-instruction">
        <strong>Expand "${node}" — what are its sub-branches?</strong><br>
        Each sub-branch must be a falsifiable sub-hypothesis. Together they must be MECE under "${node}".
        <div class="it-tip">💡 Think: what are all the ways "${node}" could be true? Segment them exhaustively with no overlap.</div>
      </div>
      <textarea id="it-input" class="it-textarea" placeholder="Enter sub-branches, one per line"></textarea>
      <button class="it-primary-btn" onclick="IssueTree._submitL2()">Check this branch →</button>`;
  }

  async function _submitL2() {
    const raw = document.getElementById('it-input')?.value?.trim() || '';
    if (!raw) { showToast('Enter sub-branches first.', 'error'); return; }
    const branches = raw.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    if (branches.length < 2) { showToast('Enter at least 2 sub-branches.', 'error'); return; }
    const node = S.currentNode;
    S.userTree.L2[node] = branches;
    _setLoading(`Checking "${node}" sub-branches…`);
    try {
      S.feedback[node] = await _checkMECE('L2', branches, node, S.caseObj.context, S.userTree.L1);
      S.phase = 'fb_l2';
      _render();
    } catch(e) { _setError(e.message); }
  }

  function _fbL2HTML() {
    const node = S.currentNode;
    const fb   = S.feedback[node] || {};
    const isLast = S.l2Queue.length === 1;
    // Best-match ideal L2 for this node
    const idealL2 = S.caseObj.idealTree.L2[node]
      || S.caseObj.idealTree.L2[Object.keys(S.caseObj.idealTree.L2).find(k => k.toLowerCase().startsWith(node.toLowerCase().split(' ')[0])) || '']
      || ['(see ideal tree in comparison)'];
    return `
      <div class="it-phase-pill">✅ L2 Feedback — "${node}"</div>
      ${_scoreBadge(fb.score, fb.verdict)}
      <div class="it-two-col">
        <div class="it-tree-panel">
          <div class="it-tree-lbl it-your-lbl">Your sub-branches</div>
          ${_treeHTML({ L1: [node], L2: { [node]: S.userTree.L2[node] } }, false)}
        </div>
        <div class="it-tree-panel">
          <div class="it-tree-lbl it-ideal-lbl">✅ Ideal sub-branches</div>
          ${_treeHTML({ L1: [node], L2: { [node]: idealL2 } }, true)}
        </div>
      </div>
      ${_fbCard(fb)}
      <div class="it-actions">
        <button class="it-secondary-btn" onclick="IssueTree._retryL2()">↩ Redo this branch</button>
        <button class="it-primary-btn" onclick="IssueTree._nextL2()">${isLast ? 'Go to Drill-Down →' : 'Next branch →'}</button>
      </div>`;
  }

  function _retryL2() { delete S.userTree.L2[S.currentNode]; delete S.feedback[S.currentNode]; S.phase = 'build_l2'; _render(); }
  function _nextL2()  { S.l2Queue.shift(); S.phase = S.l2Queue.length ? 'build_l2' : 'drilldown'; _render(); }

  // ── Phase: Drill-Down ──────────────────────────────────────────────────────
  function _goDrilldown() { S.phase = 'drilldown'; _render(); }

  function _drilldownHTML() {
    return `
      <div class="it-phase-pill">🔬 Phase 4 — Drill-Down (VC Ch.10)</div>
      <div class="it-partial-tree-wrap">
        <div class="it-tree-lbl">Your tree:</div>
        ${_treeHTML(S.userTree, false)}
      </div>
      <div class="it-clue-card">
        <div class="it-clue-label">📊 New data from the interviewer:</div>
        <p class="it-clue-text">"${S.caseObj.drillClue}"</p>
      </div>
      <div class="it-instruction">
        <strong>Two things to answer:</strong>
        <ol style="margin:8px 0 0 16px;line-height:1.8">
          <li>Which specific branch of your tree does this data point to? Name it exactly.</li>
          <li>State your <em>refined hypothesis</em> based on this clue.</li>
        </ol>
        <div class="it-tip">💡 VC's drill-down: segment → isolate → eliminate. Data lets you kill branches and focus on one.</div>
      </div>
      <textarea id="it-input" class="it-textarea" placeholder="e.g. This points to the COGS increase sub-branch under Cost issues. My refined hypothesis is that raw material cost inflation is the primary driver based on the 19pp COGS increase..."></textarea>
      <button class="it-primary-btn" onclick="IssueTree._submitDrilldown()">Submit →</button>`;
  }

  async function _submitDrilldown() {
    const raw = document.getElementById('it-input')?.value?.trim() || '';
    if (!raw) { showToast('Answer both questions first.', 'error'); return; }
    S.userDrilldownAnswer = raw;
    _setLoading('Evaluating drill-down reasoning…');
    try {
      S.feedback['drilldown'] = await _checkDrilldown(raw, S.caseObj.drillClue, S.caseObj.drillAnswer, S.caseObj.context);
      S.phase = 'fb_drilldown';
      _render();
    } catch(e) { _setError(e.message); }
  }

  function _fbDrilldownHTML() {
    const fb = S.feedback['drilldown'] || {};
    return `
      <div class="it-phase-pill">✅ Drill-Down Feedback</div>
      ${_scoreBadge(fb.score, fb.verdict)}
      <div class="it-two-col">
        <div class="it-tree-panel" style="flex:1">
          <div class="it-tree-lbl it-your-lbl">Your answer</div>
          <p class="it-answer-text">${S.userDrilldownAnswer}</p>
        </div>
        <div class="it-tree-panel" style="flex:1">
          <div class="it-tree-lbl it-ideal-lbl">Ideal approach</div>
          <p class="it-answer-text it-ideal-answer">${S.caseObj.drillAnswer}</p>
        </div>
      </div>
      ${_fbCard(fb)}
      <button class="it-primary-btn" onclick="IssueTree._goCompare()">See full tree comparison →</button>`;
  }

  // ── Phase: Final Comparison ────────────────────────────────────────────────
  function _goCompare() { S.phase = 'compare'; _render(); }

  function _compareHTML() {
    const allScores = Object.values(S.feedback).map(f => f?.score || 0).filter(Boolean);
    const avg    = allScores.length ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1) : '—';
    const avgCol = parseFloat(avg) >= 7 ? '#00c853' : parseFloat(avg) >= 5 ? '#ff9800' : '#ef5350';

    const stepRows = Object.entries(S.feedback).map(([key, fb]) => {
      if (!fb) return '';
      const col   = fb.score >= 7 ? '#00c853' : fb.score >= 5 ? '#ff9800' : '#ef5350';
      const label = key === 'L1' ? 'Level 1 branches' : key === 'drilldown' ? 'Drill-down reasoning' : `"${key}" sub-branches`;
      return `<div class="it-step-row">
        <span class="it-step-row-lbl">${label}</span>
        <span class="it-step-row-score" style="color:${col}">${fb.score?.toFixed(1)}/10 — ${fb.verdict}</span>
      </div>`;
    }).join('');

    return `
      <div class="it-phase-pill">🎯 Phase 5 — Full Tree Comparison</div>
      <div class="it-avg-score">
        <span class="it-avg-num" style="color:${avgCol}">${avg}</span>
        <span class="it-avg-denom">/10</span>
        <span class="it-avg-label">average MECE quality</span>
      </div>
      <div class="it-two-col it-compare-section">
        <div class="it-tree-panel">
          <div class="it-tree-lbl it-your-lbl">🧑 Your Tree</div>
          ${_treeHTML(S.userTree, false)}
        </div>
        <div class="it-tree-panel">
          <div class="it-tree-lbl it-ideal-lbl">✅ Ideal Tree</div>
          ${_fullIdealTree()}
        </div>
      </div>
      <div class="it-step-scores">${stepRows}</div>
      <div class="it-actions">
        <button class="it-secondary-btn" onclick="IssueTree.open()">Try another case →</button>
        <button class="it-primary-btn"   onclick="IssueTree.close()">Done</button>
      </div>`;
  }

  // ── Tree Rendering (CSS nested list) ──────────────────────────────────────
  function _treeHTML(tree, isIdeal) {
    const cls = isIdeal ? 'it-tree it-ideal-tree' : 'it-tree';
    if (!tree.L1 || !tree.L1.length) return `<div class="it-tree-empty">—</div>`;
    const items = tree.L1.map(node => {
      const children = (tree.L2 || {})[node] || [];
      const childItems = children.map(child => {
        const grand = (tree.L3 || {})[child] || [];
        const grandItems = grand.map(g => `<li class="it-tree-leaf">${g}</li>`).join('');
        return `<li>${child}${grand.length ? `<ul>${grandItems}</ul>` : ''}</li>`;
      });
      return `<li class="it-tree-l1">${node}${children.length ? `<ul>${childItems.join('')}</ul>` : ''}</li>`;
    });
    return `<div class="${cls}"><ul>${items.join('')}</ul></div>`;
  }

  function _fullIdealTree() {
    const ideal = S.caseObj.idealTree;
    return _treeHTML({ L1: ideal.L1, L2: ideal.L2, L3: ideal.L3 || {} }, true);
  }

  // ── Claude Scoring ─────────────────────────────────────────────────────────
  async function _checkMECE(level, branches, parentContext, caseContext, l1Branches) {
    const prompt = `You are a BCG case interview coach evaluating an issue tree for MECE quality.

CASE: ${caseContext}
${level === 'L1' ? `HYPOTHESIS BEING TESTED: ${parentContext}` : `PARENT BRANCH BEING EXPANDED: "${parentContext}"`}
${l1Branches ? `L1 BRANCHES FOR CONTEXT: ${l1Branches.join(', ')}` : ''}

CANDIDATE'S ${level} BRANCHES:
${branches.map((b, i) => `${i + 1}. ${b}`).join('\n')}

Evaluate against VC's 3 tests:
1. Hypothesis Test — is each branch a falsifiable sub-hypothesis (not an activity like "analyse costs")?
2. MECE Test — any overlap? Any obvious gaps?
3. Conclusiveness Test — if all branches resolved, would you know the answer?

Return ONLY this JSON:
{
  "score": <0-10 float>,
  "verdict": "<Excellent|Good|Needs Work|Redo>",
  "strengths": "<1-2 sentences: what's correct and why>",
  "gaps": "<1-2 sentences: what's missing, overlapping, or wrong>",
  "meceCheck": "<specific judgment: is it ME? CE? Give concrete example of the issue if any.>"
}`;

    const resp = await callClaude(
      [{ role: 'user', content: prompt }],
      'You are a BCG case coach. Return only valid JSON, nothing else.',
      'claude-haiku-4-5-20251001', 450
    );
    const match = resp.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Could not parse MECE feedback — try again.');
    return JSON.parse(match[0]);
  }

  async function _checkDrilldown(answer, clue, idealAnswer, caseContext) {
    const prompt = `You are a BCG case coach evaluating a candidate's drill-down reasoning.

CASE: ${caseContext}
DATA CLUE: "${clue}"
IDEAL ANSWER: ${idealAnswer}
CANDIDATE'S ANSWER: "${answer}"

Evaluate: (1) Did they identify the correct branch? (2) Did they state a refined hypothesis? (3) Is their segment→isolate→eliminate logic tight?

Return ONLY this JSON:
{
  "score": <0-10 float>,
  "verdict": "<Excellent|Good|Needs Work|Redo>",
  "strengths": "<1-2 sentences>",
  "gaps": "<1-2 sentences — what was missing>"
}`;

    const resp = await callClaude(
      [{ role: 'user', content: prompt }],
      'You are a BCG case coach. Return only valid JSON, nothing else.',
      'claude-haiku-4-5-20251001', 300
    );
    const match = resp.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Could not parse drill-down feedback — try again.');
    return JSON.parse(match[0]);
  }

  // ── UI Helpers ─────────────────────────────────────────────────────────────
  function _scoreBadge(score, verdict) {
    const col = score >= 7 ? '#00c853' : score >= 5 ? '#ff9800' : '#ef5350';
    const bg  = score >= 7 ? 'rgba(0,200,83,0.08)' : score >= 5 ? 'rgba(255,152,0,0.08)' : 'rgba(239,83,80,0.08)';
    return `<div class="it-score-badge" style="border-color:${col};background:${bg}">
      <span class="it-score-num" style="color:${col}">${score != null ? score.toFixed(1) : '?'}/10</span>
      <span class="it-score-verdict" style="color:${col}">${verdict || ''}</span>
    </div>`;
  }

  function _fbCard(fb) {
    return `<div class="it-fb-card">
      <div class="it-fb-row it-fb-green"><strong>✅ What's right:</strong> ${fb.strengths || '—'}</div>
      <div class="it-fb-row it-fb-red"><strong>🔧 Gap:</strong> ${fb.gaps || '—'}</div>
      ${fb.meceCheck ? `<div class="it-fb-row it-fb-orange"><strong>⚡ MECE check:</strong> ${fb.meceCheck}</div>` : ''}
    </div>`;
  }

  function _setLoading(msg) {
    const body = document.getElementById('it-body');
    if (body) body.innerHTML = `<div class="it-loading">
      <div class="debrief-spinner-dots"><span></span><span></span><span></span></div>
      <p>${msg}</p>
    </div>`;
  }

  function _setError(msg) {
    const body = document.getElementById('it-body');
    if (body) body.innerHTML = `<p style="color:#ef5350;padding:24px;">${msg}<br><button class="it-secondary-btn" onclick="IssueTree.open()" style="margin-top:16px;">Start over</button></p>`;
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  return {
    open, close,
    _startCase,
    _goL1, _submitL1, _retryL1,
    _goL2, _submitL2, _retryL2, _nextL2,
    _submitDrilldown,
    _goCompare,
  };
})();
