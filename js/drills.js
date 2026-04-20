// ── Micro-Drill Engine — eGMAT style: Concept → Example → Apply → Fix ──────────
window.Drills = (function() {

  // ── Drill Library ─────────────────────────────────────────────────────────
  const LIBRARY = {

    structuring: [
      {
        id: 'str_1',
        title: 'Profit Decline — Build the Framework',
        concept: {
          title: 'The BCG Structuring Process',
          steps: [
            '<strong>Hypothesis first</strong> — before any framework, state what you suspect the answer is and why.',
            '<strong>3-bucket MECE tree</strong> — mutually exclusive (no overlap), collectively exhaustive (nothing missing). Always label each bucket with a hypothesis, not just a name.',
            '<strong>Prioritise out loud</strong> — end with: "I'd start with X because it's likely the biggest lever." Never leave a structure hanging without a priority call.',
          ],
          watch: 'Most candidates jump straight to the framework and skip the hypothesis. BCG partners notice this immediately — it signals reactive thinking vs hypothesis-driven thinking.',
        },
        example: {
          label: 'Cement company, margins fell 28% → 18%',
          text: '"My hypothesis is this is a cost issue — cement is a commodity so price realisation is limited, meaning margin erosion likely comes from input cost inflation or fixed cost deleveraging. I\'d structure the analysis around three buckets: (1) Revenue — price realisation, volume, product mix; (2) Costs — variable (coal, limestone, logistics) and fixed (plant, overheads); (3) External — industry dynamics, regulatory changes. I\'d start with variable costs, specifically energy, which typically drives 35–40% of cement COGS and has been volatile."',
        },
        prompt: 'A mid-sized Indian cement manufacturer\'s EBITDA margin has fallen from 28% to 18% over 2 years. The MD has hired BCG. Structure your analytical approach in 90 seconds.',
        timeLimit: 90,
        scoring: 'Score ONLY on 3 criteria: (1) Did they state a hypothesis before the framework? (2) Is the framework MECE — no overlapping buckets, no missing branches? (3) Did they explicitly prioritise one bucket with a reason?',
      },
      {
        id: 'str_2',
        title: 'Market Entry — Issue Tree',
        concept: {
          title: 'Market Entry Structuring',
          steps: [
            '<strong>Hypothesis on attractiveness</strong> — is the market likely attractive or not, and why? Say it upfront.',
            '<strong>Three lenses</strong>: Market attractiveness (size, growth, profit pool) → Competitive position (our strengths vs what the market needs) → Entry strategy & economics (mode, timing, cost, payback).',
            '<strong>Flag the critical unknown</strong> — what one piece of information would change your entire analysis? Naming this shows you can prioritise.',
          ],
          watch: 'Candidates often forget the "so what" — building a beautiful framework but never stating whether the market entry makes sense. Always close with your directional view.',
        },
        example: {
          label: 'German luxury EV OEM entering India',
          text: '"My hypothesis is India is an interesting long-term opportunity but the timing is challenging — EV infrastructure is nascent and luxury is a small segment. I\'d structure around: (1) Market attractiveness — EV market size and growth, customer willingness to pay ₹50L+ for a luxury EV, charging infrastructure readiness; (2) Competitive position — brand perception vs Audi/BMW already present, localization vs import economics; (3) Entry mode and returns — import vs CKD assembly, required market share to justify CapEx, breakeven timeline. The critical unknown is customer willingness to pay — if there are fewer than 50,000 households with the propensity and income, the economics are hard to justify."',
        },
        prompt: 'A leading Indian dairy cooperative wants to enter the premium packaged cheese segment (currently dominated by Amul and Britannia). Structure your approach in 90 seconds.',
        timeLimit: 90,
        scoring: 'Score on: (1) Upfront hypothesis on attractiveness, (2) MECE coverage of market/competitive position/economics, (3) Named one critical unknown or highest-priority bucket with rationale.',
      },
      {
        id: 'str_3',
        title: 'Growth Strategy — Lever Tree',
        concept: {
          title: 'Growth Strategy Structuring',
          steps: [
            '<strong>Anchor to the growth objective</strong> — restate it in numbers: "Double revenue in 5 years = ~15% CAGR. Is that market growth or share gain?"',
            '<strong>Growth lever tree</strong>: Organic (existing customers × wallet share, new customers × channels) vs Inorganic (M&A, partnerships). Always both.',
            '<strong>Constrain by starting position</strong> — what the company already has changes which lever is realistic. State this explicitly.',
          ],
          watch: 'Candidates often just list options without a view on which is most feasible given the company\'s starting position. The BCG value-add is always the prioritisation.',
        },
        example: {
          label: 'Private bank wants to double retail deposits in 5 years',
          text: '"Doubling deposits in 5 years is roughly 15% CAGR — above market growth of 10%, so we need market share gain. Given the bank\'s current position, I\'d structure around: (1) Existing customers — increase wallet share through higher FD rates, salary account stickiness, digital engagement; (2) New customer acquisition — geographic expansion to under-penetrated tier 2/3 cities where branch economics are improving; (3) Product innovation — new deposit products targeting the NRI or senior citizen segment. I\'d prioritise tier 2/3 geography — competition is lower, the bank\'s brand has room to grow, and deposit growth rates in these markets are outpacing metros."',
        },
        prompt: 'An Indian edtech platform (₹500Cr revenue, 2M paid users) wants to triple revenue in 4 years. Most revenue today is K-12 test prep. Structure your growth strategy in 90 seconds.',
        timeLimit: 90,
        scoring: 'Score on: (1) Anchored to the numbers (what growth rate does 3x imply), (2) MECE growth levers (organic existing/new + inorganic), (3) Prioritised with rationale given the company\'s starting position.',
      },
    ],

    analytics: [
      {
        id: 'anal_1',
        title: 'Revenue Decomposition — Find the Driver',
        concept: {
          title: 'The Decomposition Method',
          steps: [
            '<strong>Break the metric into its mathematical components first</strong> — Revenue = Price × Volume, Profit = Revenue − Costs. Don\'t jump to hypotheses before you\'ve decomposed.',
            '<strong>Calculate both sides</strong> — compute the implied number on each branch, not just describe it. Numbers reveal what words hide.',
            '<strong>Interpret, don\'t just report</strong> — "Volume per store is down 20%" is data. "This means same-store traffic is declining, not a store-count problem" is insight.',
          ],
          watch: 'The most common error: stating the decomposition formula correctly but never doing the math. BCG interviewers will push: "Give me the number."',
        },
        example: {
          label: 'Retail chain — flat revenue despite 20 new stores',
          text: '"Let me decompose revenue into Stores × Revenue per Store. Last year: 80 stores, ₹500Cr → ₹6.25Cr per store. This year: 100 stores, ₹500Cr → ₹5Cr per store. Per-store revenue dropped 20%. That means new stores added ₹100Cr of revenue but existing stores lost ₹100Cr — net zero. The problem isn\'t store expansion, it\'s same-store performance. This could be cannibalization from new stores or demand decline. I\'d next want to see same-store-sales growth to isolate which."',
        },
        prompt: 'A quick-service restaurant chain had ₹300Cr revenue last year (150 outlets). This year revenue is ₹360Cr (180 outlets). The CEO says "great growth." Is it? Walk me through your analysis.',
        timeLimit: 120,
        scoring: 'Score on: (1) Correct decomposition formula (Revenue = Outlets × Revenue per outlet), (2) Correct math computed (last year: ₹2Cr/outlet, this year: ₹2Cr/outlet — flat), (3) Correct interpretation: revenue grew only because of new outlets, same-store performance is flat — not "great growth".',
      },
      {
        id: 'anal_2',
        title: 'Break-Even — Full Calculation',
        concept: {
          title: 'Break-Even Analysis',
          steps: [
            '<strong>Identify all fixed costs</strong> — capex (amortised over useful life) + annual fixed opex. Never forget to annualise capex.',
            '<strong>Calculate contribution per unit</strong>: Price − Variable Cost per unit.',
            '<strong>Break-even units = Fixed Costs ÷ Contribution per unit</strong>. Then sense-check: is that volume operationally achievable?',
          ],
          watch: 'Candidates often forget to amortise the capex investment over the asset life. This understates fixed costs and makes investments look more attractive than they are.',
        },
        example: {
          label: 'Hospital MRI machine',
          text: '"Fixed costs: ₹5Cr capex over 5 years = ₹1Cr/year amortisation + ₹50L annual opex = ₹1.5Cr total annual fixed cost. Contribution per scan = ₹8,000 price − ₹2,000 variable cost = ₹6,000. Break-even = ₹1.5Cr ÷ ₹6,000 = 2,500 scans/year = ~7 scans/day. An MRI machine can do 8–10 scans/day, so this is achievable at ~75% utilisation. It\'s a viable investment assuming demand exists."',
        },
        prompt: 'A co-working company is opening a new floor: 200 desks. Setup cost: ₹2Cr (amortise over 4 years). Monthly fixed costs: ₹10L. Desk rental: ₹15,000/month. Variable cost per desk (utilities, cleaning): ₹2,000/month. What\'s the break-even occupancy rate?',
        timeLimit: 150,
        scoring: 'Score on: (1) Correctly amortised capex (₹2Cr ÷ 4 years = ₹50L/year = ₹4.17L/month), (2) Correct monthly fixed cost = ₹4.17L + ₹10L = ₹14.17L, (3) Contribution per desk = ₹15,000 − ₹2,000 = ₹13,000, (4) Break-even desks = ₹14.17L ÷ ₹13,000 = ~109 desks, (5) Break-even occupancy = 109/200 = ~55%. Sense-check: 55% is reasonable for co-working.',
      },
      {
        id: 'anal_3',
        title: 'Market Sizing — Bottom-Up Build',
        concept: {
          title: 'Market Sizing Method',
          steps: [
            '<strong>Choose your entry point</strong> — population-down (total → segment → sub-segment) or supply-side (number of providers × capacity × utilisation). State which and why.',
            '<strong>State every assumption explicitly</strong> — "I\'m assuming X% penetration because..." Assumptions you don\'t justify get challenged.',
            '<strong>Triangulate and sense-check</strong> — after your calculation, do a quick sanity check from a different angle. If they match, you\'re confident. If not, explain the gap.',
          ],
          watch: 'Don\'t chase precision — chase logic. A market size that\'s off by 2x but has watertight logic beats a precise number with black-box assumptions.',
        },
        example: {
          label: 'Corporate catering in Mumbai',
          text: '"I\'ll go population-down. Mumbai: 20M people. Working age (20–55): ~50% = 10M. Formal employment: ~25% = 2.5M. In offices eligible for corporate catering (>100 employees): ~40% = 1M people. Of those, 50% use corporate catering = 500K users. Average spend: ₹120/meal, 240 working days = ₹29,000/year. Market = 500K × ₹29,000 = ₹1,450Cr. Sanity check: ~10 large caterers at ₹100–150Cr revenue each — plausible for a city of Mumbai\'s size."',
        },
        prompt: 'Size the market for private tutoring (K-12) in Bengaluru. Think aloud, state all assumptions, and give me a final number with a sanity check.',
        timeLimit: 150,
        scoring: 'Score on: (1) Clear segmentation entry point stated, (2) Explicit assumptions with brief rationale for each, (3) Math is correct given assumptions, (4) Sanity check from a different angle attempted.',
      },
    ],

    synthesis: [
      {
        id: 'synth_1',
        title: '60-Second Recommendation',
        concept: {
          title: 'The BCG Recommendation Format',
          steps: [
            '<strong>Lead with the recommendation</strong> — not the findings. "My recommendation is X" — first sentence, always. Partners hate waiting.',
            '<strong>State the single driving insight</strong> — the one finding that makes everything else make sense. Not a list of findings — the root cause.',
            '<strong>Three specific actions, sequenced</strong> — not generic ("improve operations") but specific ("reduce SKU count from 800 to 200, which our analysis shows recovers 60% of the margin gap").',
            '<strong>One risk, honestly stated</strong> — shows judgment. "The risk is X, which we\'d mitigate by Y."',
          ],
          watch: 'The single biggest synthesis failure: leading with "Based on our analysis..." and recapping findings for 2 minutes before the recommendation. In a real meeting, the CEO has already left.',
        },
        example: {
          label: 'Pharma company, generic competition hitting core molecules',
          text: '"My recommendation is a two-track strategy: cut costs aggressively now, and accelerate the pipeline to replace revenue by 2026. The core insight is that the revenue decline is structural — once generics enter, pricing doesn\'t recover — so there is no revenue fix in the short term; only cost and pipeline levers exist. Specifically: first, close the 15% manufacturing cost gap vs benchmark — our analysis shows this recovers ₹120Cr of EBITDA; second, fast-track Phase 3 trials for Drug A using ₹300Cr of the cash balance; third, in-license one near-term product to bridge the 2024–2026 revenue gap. The key risk is Phase 3 failure — if both drugs miss, we need M&A as a backup, and we should begin target screening now."',
        },
        prompt: `You've just completed a case on an Indian retail bank. Key findings:
• Net Interest Margin compressed from 3.8% to 3.1% over 3 years (industry average: 3.6%)
• Loan mix has shifted toward lower-yield home loans (now 55% of book, was 30%)
• Operating costs are 15% above peer median — mainly branch network costs
• Digital transactions now 68% of volume but branches handle 85% of costs

Give me your recommendation in 60 seconds.`,
        timeLimit: 90,
        scoring: 'Score on: (1) Led with recommendation (not findings recap), (2) Named the root cause (mix shift to low-yield loans + cost structure not rightsized to digital), (3) Gave 2–3 specific actions (not generic), (4) Acknowledged one risk.',
      },
      {
        id: 'synth_2',
        title: '"So What?" Insight Drill',
        concept: {
          title: 'Extracting the Insight',
          steps: [
            '<strong>Never restate the data as the insight</strong> — "Revenue grew 20%" is data. "Revenue grew 20% but below the market\'s 35% — we lost share" is insight.',
            '<strong>Relative thinking always</strong> — any number only means something compared to something else: a benchmark, a prior period, a competitor, a target.',
            '<strong>Insight implies action</strong> — if your "insight" doesn\'t suggest what to do next, it\'s not an insight, it\'s a finding. Push yourself: "So what should the client do differently because of this?"',
          ],
          watch: 'Most candidates stop at describing what happened. The BCG "so what" is always about what the client should do differently as a result.',
        },
        example: {
          label: 'Online channel grew 45% but is only 8% of revenue',
          text: '"The insight isn\'t that online is growing fast — it\'s that we may be systematically underinvesting in the channel that will define the category in 5 years. At 8% share, we\'re almost certainly behind peers. If competitors are at 25–30% online, we have a structural gap that will compound. My recommendation: benchmark online penetration vs the top 3 competitors immediately. If the gap is real, we should shift 20–30% of the store expansion budget to digital acquisition — the return on invested capital is likely 3–4x higher online."',
        },
        prompt: `You're told: "Our customer acquisition cost has increased from ₹800 to ₹1,400 over 18 months, but customer lifetime value is also up — from ₹6,000 to ₹9,500."

What's the insight? What do you tell the CEO? 45 seconds.`,
        timeLimit: 60,
        scoring: 'Score on: (1) Computed or referenced the LTV:CAC ratio (was 7.5x, now 6.8x — declining), (2) Insight is that CAC is growing faster than LTV so unit economics are degrading, (3) Recommendation: investigate CAC drivers and whether LTV improvement is durable or one-time.',
      },
    ],

    communication: [
      {
        id: 'comm_1',
        title: 'Signposting Drill',
        concept: {
          title: 'The Signposting Framework',
          steps: [
            '<strong>Open with the count</strong> — "There are three reasons..." or "I see this in two parts..." Telling them the number upfront lets them track you.',
            '<strong>Label every point</strong> — "First... Second... Third..." Never skip the label. It\'s the GPS for your listener.',
            '<strong>Close with a landing sentence</strong> — summarise the point you just made in one sentence. Don\'t trail off.',
          ],
          watch: 'Candidates who skip signposting sound smart but make interviewers work hard to follow the logic. In a case, cognitive load belongs to the client problem — not tracking what point you\'re on.',
        },
        example: {
          label: 'Why a profitable company can go bankrupt',
          text: '"There are two main reasons. First, liquidity — a company can be profitable on paper but run out of cash if receivables are slow, inventory builds up, or debt repayments are front-loaded. Profit is an accounting concept; cash is reality. Second, solvency — if total liabilities exceed total assets, the balance sheet is technically insolvent even if the P&L shows profit. The clearest example is a fast-growing startup: profitable per unit, but burning cash faster than collections come in. The lesson: always look at cash flow, not just earnings."',
        },
        prompt: 'Answer in 45 seconds with clear signposting: "What are the main reasons a company\'s market share could be declining even if its absolute revenue is growing?"',
        timeLimit: 60,
        scoring: 'Score on: (1) Opened with explicit count ("There are X reasons"), (2) Each point labelled (First/Second/Third), (3) No filler words (um, uh, so, like, you know), (4) Closed with a summary or landing sentence.',
      },
      {
        id: 'comm_2',
        title: 'Conciseness — Cut the Fat',
        concept: {
          title: 'The Conciseness Principle',
          steps: [
            '<strong>Identify the core message first</strong> — before speaking, ask: what is the single thing I need them to understand? Start with that.',
            '<strong>Eliminate throat-clearing</strong> — "So I was thinking...", "I guess what I\'m trying to say is...", "That\'s an interesting question..." are all filler. Delete.',
            '<strong>One idea, one sentence</strong> — if a sentence has more than one idea, split it. Complexity hides in long sentences.',
          ],
          watch: 'In a BCG interview, every rambling answer trains the interviewer to trust you less. Every crisp answer does the opposite. You have limited time — use every word deliberately.',
        },
        example: {
          label: 'Before vs After',
          text: '<strong>Before (rambling):</strong> "So I was thinking about, you know, the revenue side of things, and I think there are probably a few different areas we could look at, like pricing could be one thing, and then volume is another, and there might also be some product mix effects too, so I was going to explore those areas."<br><br><strong>After (BCG-crisp):</strong> "Revenue can be decomposed into three drivers: price, volume, and product mix. I\'d like to quantify each."',
        },
        prompt: `Restate this rambling answer in 2 clean, signposted sentences:

"Yeah so basically what I found was that, um, the costs are actually going up quite a bit, especially on the raw material side, which is, you know, coal and limestone mainly, and I think that combined with the fact that, like, fixed costs aren't really coming down even though volumes are lower, it means the margins are being hit from both sides, so that's kind of the issue."`,
        timeLimit: 45,
        scoring: 'Score on: (1) Eliminated ALL filler words (yeah, basically, um, you know, like, kind of, actually, quite), (2) Named specific costs (coal, limestone, fixed costs) precisely, (3) Structured as 2 clean sentences with clear subject-verb structure, (4) Preserved all the substance of the original.',
      },
      {
        id: 'comm_3',
        title: 'Hypothesis Statement Drill',
        concept: {
          title: 'Stating a Hypothesis Confidently',
          steps: [
            '<strong>One sentence, present tense</strong> — "My hypothesis is that X is causing Y because Z." Not "I think maybe it could be..."',
            '<strong>Include a causal mechanism</strong> — don\'t just name the problem, name the driver. "Costs are too high" is weak. "Fixed costs are not scaling down with volume" is a hypothesis.',
            '<strong>Make it falsifiable</strong> — a good hypothesis tells you what data would prove it wrong. "If variable cost per unit is flat, my hypothesis is wrong."',
          ],
          watch: 'Hedging language ("I think maybe...", "it could possibly be...") signals low conviction. BCG partners want to see a directional view, even if imperfect.',
        },
        example: {
          label: 'Airline load factor declining',
          text: '"My hypothesis is that the load factor decline is driven by overcapacity on domestic routes following aggressive fleet expansion by low-cost carriers — specifically, the supply of seats is growing faster than demand. If correct, we\'d expect to see yield compression alongside load factor decline. I\'d test this by comparing our seat capacity growth vs total market demand growth over the last 3 years."',
        },
        prompt: 'State a crisp hypothesis in 2 sentences for this situation: "A leading Indian hospital chain\'s EBITDA margin has fallen from 22% to 14% over 3 years, despite revenue growing 40%."',
        timeLimit: 45,
        scoring: 'Score on: (1) Single sentence hypothesis with causal mechanism (not just "costs are high"), (2) Stated in confident language (no excessive hedging), (3) Named what data would test or falsify it.',
      },
    ],
  };

  // ── State ─────────────────────────────────────────────────────────────────
  let state = { drill: null, dimension: null, phase: 'learn' };
  let timerInterval = null;
  let speechRec = null;
  let speechActive = false;

  // ── Public: open a drill ──────────────────────────────────────────────────
  function openDrillModal(dimension) {
    const drills = LIBRARY[dimension] || [];
    if (!drills.length) { showToast('No drills for this dimension yet.', 'error'); return; }
    const pick = drills[Math.floor(Math.random() * drills.length)];
    state = { drill: pick, dimension, phase: 'learn' };
    _renderModal();
  }

  // ── Modal shell ───────────────────────────────────────────────────────────
  function _renderModal() {
    document.getElementById('drill-modal')?.remove();
    const DIM_LABELS = { structuring: 'Structuring', analytics: 'Analytics', synthesis: 'Synthesis', communication: 'Communication' };
    const DIM_ICONS  = { structuring: '🏗️', analytics: '📊', synthesis: '💡', communication: '🗣️' };
    const el = document.createElement('div');
    el.id = 'drill-modal';
    el.className = 'drill-modal-overlay';
    el.innerHTML = `
      <div class="drill-modal">
        <div class="drill-modal-hdr">
          <div>
            <span class="drill-dim-badge">${DIM_ICONS[state.dimension]} ${DIM_LABELS[state.dimension]} · Micro-Drill</span>
            <div class="drill-modal-title">${state.drill.title}</div>
          </div>
          <button class="drill-close-btn" onclick="Drills.close()">✕</button>
        </div>
        <div class="drill-modal-body" id="drill-body"></div>
      </div>`;
    document.body.appendChild(el);
    _renderPhase();
  }

  function _renderPhase() {
    const body = document.getElementById('drill-body');
    if (!body) return;
    if (state.phase === 'learn')    body.innerHTML = _learnHTML();
    if (state.phase === 'apply')    { body.innerHTML = _applyHTML(); _startTimer(); }
    if (state.phase === 'feedback') body.innerHTML = state.feedbackHTML || '';
  }

  // ── Phase 1: Learn ────────────────────────────────────────────────────────
  function _learnHTML() {
    const { concept, example } = state.drill;
    return `
      <div class="drill-phase-pill">📖 Phase 1 — Learn the Process</div>

      <div class="drill-concept-card">
        <div class="drill-card-title">${concept.title}</div>
        <ol class="drill-steps">
          ${concept.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
        <div class="drill-watch-out">
          <span class="drill-watch-label">⚠️ Watch out for:</span> ${concept.watch}
        </div>
      </div>

      <div class="drill-example-card">
        <div class="drill-card-title">✅ What good looks like — <em>${example.label}</em></div>
        <p class="drill-example-text">"${example.text}"</p>
      </div>

      <button class="drill-primary-btn" onclick="Drills._goApply()">
        I've read this — Start the drill →
      </button>`;
  }

  // ── Phase 2: Apply ────────────────────────────────────────────────────────
  function _applyHTML() {
    const mins = Math.floor(state.drill.timeLimit / 60);
    const secs = (state.drill.timeLimit % 60).toString().padStart(2, '0');
    return `
      <div class="drill-phase-pill">⚡ Phase 2 — Your Turn
        <span class="drill-timer-badge" id="drill-timer-el">⏱ ${mins}:${secs}</span>
      </div>

      <div class="drill-prompt-card">${state.drill.prompt.replace(/\n/g, '<br>')}</div>

      <textarea id="drill-input" class="drill-textarea"
        placeholder="Type your answer here, or click the mic to speak..."></textarea>

      <div class="drill-apply-row">
        <button class="drill-mic-btn" id="drill-mic-btn" onclick="Drills._toggleMic()">🎤 Speak</button>
        <button class="drill-primary-btn" onclick="Drills._submit()">Submit →</button>
      </div>`;
  }

  // ── Phase 3: Feedback ─────────────────────────────────────────────────────
  function _feedbackHTML(fb) {
    const scoreColor = fb.score >= 7 ? '#00c853' : fb.score >= 5 ? '#ff9800' : '#ef5350';
    const verdictBg  = fb.score >= 7 ? 'rgba(0,200,83,0.1)' : fb.score >= 5 ? 'rgba(255,152,0,0.1)' : 'rgba(239,83,80,0.1)';
    return `
      <div class="drill-phase-pill">✅ Phase 3 — Feedback</div>

      <div class="drill-score-card" style="border-color:${scoreColor};background:${verdictBg};">
        <div class="drill-score-num" style="color:${scoreColor}">${fb.score.toFixed(1)}<span class="drill-score-denom">/10</span></div>
        <div class="drill-verdict" style="color:${scoreColor}">${fb.verdict}</div>
      </div>

      <div class="drill-fb-card drill-fb-green">
        <div class="drill-card-title">✅ What you did well</div>
        <p class="drill-fb-text">${fb.strengths}</p>
      </div>

      <div class="drill-fb-card drill-fb-red">
        <div class="drill-card-title">🔧 What to fix</div>
        <p class="drill-fb-text">${fb.gaps}</p>
      </div>

      <div class="drill-fb-card drill-fb-orange">
        <div class="drill-card-title">⚡ Say this next time — exact words</div>
        <p class="drill-fb-text drill-exact-fix">${fb.exactFix}</p>
      </div>

      <div class="drill-feedback-actions">
        <button class="drill-secondary-btn" onclick="Drills._retry()">↩ Retry this drill</button>
        <button class="drill-primary-btn"   onclick="Drills._nextDrill()">Next drill →</button>
      </div>`;
  }

  // ── Timer ─────────────────────────────────────────────────────────────────
  function _startTimer() {
    clearInterval(timerInterval);
    let remaining = state.drill.timeLimit;
    timerInterval = setInterval(() => {
      remaining--;
      const el = document.getElementById('drill-timer-el');
      if (el) {
        const m = Math.floor(remaining / 60);
        const s = (remaining % 60).toString().padStart(2, '0');
        el.textContent = `⏱ ${m}:${s}`;
        el.style.color = remaining <= 20 ? '#ef5350' : remaining <= 45 ? '#ff9800' : '';
      }
      if (remaining <= 0) { clearInterval(timerInterval); _submit(); }
    }, 1000);
  }

  // ── Mic ───────────────────────────────────────────────────────────────────
  function _toggleMic() {
    speechActive ? _stopMic() : _startMic();
  }

  function _startMic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { showToast('Speech not supported — use Chrome.', 'error'); return; }
    speechRec = new SR();
    speechRec.continuous = true; speechRec.interimResults = true; speechRec.lang = 'en-IN';
    let base = (document.getElementById('drill-input')?.value || '').trim();
    speechRec.onresult = e => {
      let finals = '', interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finals += e.results[i][0].transcript + ' ';
        else interim += e.results[i][0].transcript;
      }
      base += finals;
      const inp = document.getElementById('drill-input');
      if (inp) inp.value = (base + (interim ? ' ' + interim : '')).trim();
    };
    speechRec.onend = () => { if (speechActive) { try { speechRec.start(); } catch(e){} } };
    speechRec.start();
    speechActive = true;
    const btn = document.getElementById('drill-mic-btn');
    if (btn) { btn.textContent = '🔴 Recording — click to stop'; btn.style.color = '#ef5350'; btn.style.borderColor = '#ef5350'; }
  }

  function _stopMic() {
    speechActive = false;
    try { speechRec?.stop(); } catch(e) {}
    const btn = document.getElementById('drill-mic-btn');
    if (btn) { btn.textContent = '🎤 Speak'; btn.style.color = ''; btn.style.borderColor = ''; }
  }

  // ── Submit & Score ────────────────────────────────────────────────────────
  async function _submit() {
    clearInterval(timerInterval);
    _stopMic();
    const answer = document.getElementById('drill-input')?.value?.trim() || '';
    if (!answer) { showToast('Write or speak your answer first.', 'error'); return; }

    const body = document.getElementById('drill-body');
    if (body) body.innerHTML = `
      <div class="drill-loading">
        <div class="debrief-spinner-dots"><span></span><span></span><span></span></div>
        <p>Scoring with Claude Haiku…</p>
      </div>`;

    try {
      const fb = await _scoreDrill(answer);
      state.phase = 'feedback';
      state.feedbackHTML = _feedbackHTML(fb);
      _renderPhase();
    } catch(err) {
      if (body) body.innerHTML = `<p style="color:#ef5350;padding:24px;">Scoring error: ${err.message}</p>`;
    }
  }

  async function _scoreDrill(answer) {
    const msg = `Score this micro-drill answer.

DRILL: ${state.drill.title}
PROMPT GIVEN TO CANDIDATE:
${state.drill.prompt}

SCORING CRITERIA (use this to evaluate):
${state.drill.scoring}

CANDIDATE'S ANSWER:
"${answer}"

Return ONLY this JSON — no other text:
{
  "score": <0-10 float>,
  "verdict": "<Excellent | Good | Needs Work | Redo>",
  "strengths": "<1-2 sentences, cite their specific words, what was done right>",
  "gaps": "<1-2 sentences, specific missing element with evidence from their answer>",
  "exactFix": "<the exact 1-3 sentences they should say next time — write it as if you are them>"
}`;

    const resp = await callClaude(
      [{ role: 'user', content: msg }],
      'You are a BCG India partner giving sharp, specific feedback on a micro case drill. Be direct. Cite evidence. Return only valid JSON.',
      'claude-haiku-4-5-20251001', 450
    );
    const match = resp.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Could not parse feedback JSON');
    return JSON.parse(match[0]);
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  function _goApply() { state.phase = 'apply'; _renderPhase(); }

  function _retry()  {
    state.phase = 'apply';
    state.feedbackHTML = null;
    _renderPhase();
  }

  function _nextDrill() {
    const drills = LIBRARY[state.dimension] || [];
    const others = drills.filter(d => d.id !== state.drill.id);
    const next   = (others.length ? others : drills)[Math.floor(Math.random() * (others.length || drills.length))];
    state = { drill: next, dimension: state.dimension, phase: 'learn' };
    _renderPhase();
  }

  function close() {
    clearInterval(timerInterval);
    _stopMic();
    document.getElementById('drill-modal')?.remove();
  }

  return { openDrillModal, close, _goApply, _submit, _toggleMic, _retry, _nextDrill };
})();
