// ── Micro-Drill Engine — Victor Cheng Method: Learn → Apply → Fix ─────────────
// Each drill is tagged with the VC chapter/principle it trains
// Based on "Case Interview Secrets" — Victor Cheng (McKinsey, 2012)
window.Drills = (function() {

  // ── Drill Library — Victor Cheng Aligned ──────────────────────────────────
  const LIBRARY = {

    // ─ STRUCTURING drills — VC Ch.8 (Hypothesis) + Ch.9 (Issue Tree) + Ch.12-14 (Frameworks) ─
    structuring: [
      {
        id: 'vc_str_hypothesis',
        title: 'State a Hypothesis — VC Five-Minute Rule',
        vcPrinciple: 'VC Chapter 8 — The Hypothesis',
        concept: {
          title: 'Victor Cheng\'s Hypothesis-First Rule',
          steps: [
            '<strong>State a hypothesis within 5 minutes — always</strong> — VC calls this the "Five-Minute Hypothesis Rule." If you haven\'t stated one by minute 5, you\'re at serious risk of never stating one.',
            '<strong>Arbitrary is OK — silence is not</strong> — "Given limited information, I\'ll state an arbitrary hypothesis that costs have risen. I\'ll revise as data comes in."',
            '<strong>Format: "My initial working hypothesis is X because Y"</strong> — specific, causal, directional. Not "there could be several reasons..."',
            '<strong>A hypothesis organises your entire issue tree</strong> — every branch you build must test this hypothesis. Without it, a framework is just box-ticking.',
          ],
          watch: 'The most common VC Mistake #1: Candidates jump straight into a framework with no hypothesis. Interviewers find this "ridiculous" — VC\'s word. The framework exists ONLY to test the hypothesis.',
        },
        example: {
          label: 'Hospital EBITDA margin fell from 22% to 14% over 3 years',
          text: '"My initial working hypothesis is that this is a fixed cost deleveraging problem, not a revenue problem. Given that revenue has grown 40% but margins have fallen sharply, I suspect fixed costs — staff, rent, equipment depreciation — are scaling faster than revenue. To test this, I\'ll build an issue tree that decomposes the margin decline into revenue per bed vs. cost per bed, and within costs, fixed vs. variable. I\'ll start with fixed costs since that\'s where my hypothesis points."',
        },
        prompt: 'State a crisp working hypothesis in 2–3 sentences for this situation: "A leading Indian cement manufacturer\'s EBITDA margin has fallen from 28% to 18% over 2 years, despite revenue growing 15%."',
        timeLimit: 60,
        scoring: 'Score on: (1) Hypothesis explicitly stated — "My hypothesis is X because Y" — not vague exploration language? (2) Directional — points to specific driver (not just "costs or revenues")? (3) Causal mechanism named — WHY do they suspect this? (4) States what the issue tree will test?',
      },
      {
        id: 'vc_str_issue_tree',
        title: 'Build a MECE Issue Tree — VC\'s 3 Validity Tests',
        vcPrinciple: 'VC Chapter 9 — The Issue Tree',
        concept: {
          title: 'Victor Cheng\'s 3 Issue Tree Validity Tests',
          steps: [
            '<strong>Test 1 — Hypothesis test</strong>: Does every branch directly test your hypothesis? A branch not tied to the hypothesis is wasted time (VC Mistake #2).',
            '<strong>Test 2 — MECE test</strong>: Mutually Exclusive (no overlapping buckets — VC Mistake #3) + Collectively Exhaustive (no missing branches — VC Mistake #4).',
            '<strong>Test 3 — Conclusiveness test (VC\'s own test)</strong>: "If all my branches are true, can I imagine the OPPOSITE of my hypothesis being true?" If yes — the tree is incomplete.',
            '<strong>Rephrase each branch as a sub-hypothesis</strong> — not "Costs" but "Variable costs have outpaced pricing power." The label must be testable.',
          ],
          watch: 'Candidates often use a generic framework (e.g., 3C or 4P) without customising it to the hypothesis. VC says: "If you memorise and recall frameworks but never actually test a hypothesis, you will get rejected."',
        },
        example: {
          label: 'Hypothesis: Margin decline driven by cost inflation, not revenue weakness',
          text: '"To test my hypothesis, I\'ve built a 3-bucket issue tree. Branch 1: Revenue realisation — sub-hypothesis: pricing and volumes have held steady, supporting that revenue is not the problem. Branch 2: Variable costs — sub-hypothesis: raw material input costs (coal, limestone) or logistics costs have increased disproportionately. Branch 3: Fixed cost absorption — sub-hypothesis: fixed overheads are not scaling down with any volume softness. Conclusiveness test: if Branches 2 or 3 are true, my hypothesis is proven. I\'d start with Branch 2 — input cost inflation is where the macro environment points."',
        },
        prompt: 'Build a MECE issue tree for this hypothesis — present it verbally as you would to an interviewer: "My hypothesis is that profits are down because revenue per unit has declined, not because costs have risen." The company is a mid-tier Indian hotel chain.',
        timeLimit: 90,
        scoring: 'Score on: (1) Every branch tests the stated hypothesis (not generic categories)? (2) Branches are mutually exclusive — no overlapping content? (3) Collectively exhaustive — no obvious missing branch? (4) Conclusiveness test: if branches are true, is the hypothesis proven? (5) At least one branch phrased as a sub-hypothesis (not just a label)?',
      },
      {
        id: 'vc_str_profitability',
        title: 'Profitability Framework — VC\'s Segmentation Method',
        vcPrinciple: 'VC Chapter 13 — Profitability Framework',
        concept: {
          title: 'Victor Cheng\'s Profitability Tree',
          steps: [
            '<strong>Profits = Revenue − Costs</strong> — the most important MECE formula in business. Both sides are exhaustive and non-overlapping.',
            '<strong>Revenue = Price per unit × Units sold</strong> — segment further by geography, product, channel, or customer segment.',
            '<strong>Costs = Fixed costs + Variable costs</strong> — then Variable costs = Cost per unit × Units. Understanding fixed vs. variable is critical: a company with high fixed costs must grow volume; a company with negative contribution margins cannot grow its way out.',
            '<strong>Always segment, always isolate</strong> — once you know which branch has the problem, drill down that branch using segmentation. "I\'d like to break down costs into its component parts."',
          ],
          watch: 'VC Mistake #5: Candidates describe the framework correctly but never do the math. Interviewers will always ask "give me the number." Be prepared to compute, not just describe.',
        },
        example: {
          label: 'QSR chain — profits down ₹40Cr despite flat revenue',
          text: '"Profits = Revenue − Costs. Revenue is flat, so the problem is entirely cost-driven — mathematically, costs must be up ₹40Cr. I\'d like to break costs into fixed and variable. [Interviewer: fixed costs are up 20%, variable costs per unit are flat.] So fixed costs increased — let me quantify: if fixed costs were ₹200Cr last year, a 20% rise means ₹40Cr incremental cost, which fully explains the profit decline. The next question is: which fixed cost line drove this — rent, staff, or depreciation?"',
        },
        prompt: 'A D2C ethnic wear brand had ₹120Cr revenue last year and ₹18Cr profit (15% margin). This year revenue is ₹150Cr but profit is ₹12Cr (8% margin). Walk through the profitability framework to identify the problem. Do the actual math.',
        timeLimit: 120,
        scoring: 'Score on: (1) Stated the P=R−C formula explicitly? (2) Checked both revenue and cost branches, then isolated which branch drives the problem? (3) Computed the implied numbers (revenue up ₹30Cr, but profit down ₹6Cr, so costs up ₹36Cr)? (4) Asked to segment the cost branch further? (5) Never hand-waved the math?',
      },
      {
        id: 'vc_str_bsf',
        title: 'Business Situation Framework — Customer · Product · Company · Competition',
        vcPrinciple: 'VC Chapter 14 — Business Situation Framework',
        concept: {
          title: 'Victor Cheng\'s Business Situation Framework (CPCC)',
          steps: [
            '<strong>Four branches: Customer · Product · Company · Competition</strong> — qualitative, strategic. Use for market entry, growth strategy, new product, turnaround.',
            '<strong>Start with customers — always</strong> — "Who is the customer? What are the segments? What does each segment need? What is their price sensitivity?"',
            '<strong>Bounce between quant and qual</strong> — the profitability framework is quantitative, the BSF is qualitative. A great case uses BOTH. "Customers prefer X — now let\'s quantify how many customers and how much they\'d pay."',
            '<strong>Use only the relevant portions</strong> — don\'t ask all questions in all four boxes. Let your hypothesis guide which sub-questions matter. VC Mistake #9: pursuing unnecessary analysis.',
          ],
          watch: 'VC\'s warning: PhD candidates love the profitability tree (math) but struggle with the Business Situation Framework (qualitative). Liberal arts candidates love BSF but forget to quantify. You must do both.',
        },
        example: {
          label: 'Should a D2C skincare brand enter modern trade (supermarkets)?',
          text: '"My hypothesis is the channel shift is viable but will compress margins — I need to test whether contribution economics hold. I\'ll use the Business Situation framework. Customers: modern trade shoppers are more price-sensitive than D2C buyers — if they value the brand\'s premium positioning, the channel fits; if not, we risk brand dilution. Competition: what are Mamaearth and WOW doing in modern trade — are they leading with entry-level products or full range? Company: our gross margin is 55% D2C; modern trade typically demands 35% trade margins — does the remaining 20% cover our fixed costs? I\'d prioritise the Company branch — this is a financial viability question first, strategic question second."',
        },
        prompt: 'An Indian B2B logistics startup (revenue ₹80Cr, serves 200 SME clients in 3 cities) wants to add consumer last-mile delivery to its offerings. Should it? Use the Business Situation Framework. Hypothesis first.',
        timeLimit: 90,
        scoring: 'Score on: (1) Hypothesis stated before framework? (2) All four CPCC branches acknowledged, even briefly? (3) Each branch framed as a sub-hypothesis, not just a question list? (4) Explicit prioritisation — which branch to start with and why? (5) At least one qualitative insight translated into a quantitative test?',
      },
    ],

    // ─ ANALYTICS drills — VC Ch.10 (Drill-Down) + Ch.18 (Analysis process) ─
    analytics: [
      {
        id: 'vc_anal_segment_isolate',
        title: 'Segment → Isolate → Eliminate',
        vcPrinciple: 'VC Chapter 18 — "Total numbers lie. Averages lie."',
        concept: {
          title: 'Victor Cheng\'s Segmentation & Isolation Method',
          steps: [
            '<strong>"Total numbers lie. Averages lie."</strong> — anytime you hear an aggregate or average, it is misleading. Segment it to find what is really going on.',
            '<strong>Request segmentation without specifying how</strong> — "I\'d like to break this revenue figure into its component parts." Then stop talking. The interviewer will reveal the correct segmentation.',
            '<strong>Process of elimination</strong> — once segmented, identify which sub-branch drives the problem and explicitly rule out the others: "This rules out X. The problem is therefore in Y or Z."',
            '<strong>Drill down, then pull up</strong> — work down one branch until you hit a dead end or disprove it, then pull back up to the top and drill the next branch.',
          ],
          watch: 'VC Mistake #8: Candidates jump between branches arbitrarily. Always finish one branch (or explicitly close it) before starting another. "I\'ve exhausted the cost branch. The issue is not cost. I\'m pulling up to test revenues next."',
        },
        example: {
          label: 'Retail chain — flat revenue despite 20 new stores',
          text: '"Let me segment revenue. Revenue = Stores × Revenue per store. Last year: 80 stores, ₹500Cr → ₹6.25Cr per store. This year: 100 stores, ₹500Cr → ₹5Cr per store. Same-store revenue dropped 20%. I can now rule out the thesis that total revenue is flat because of insufficient store expansion — it\'s flat DESPITE expansion. The new stores added ₹125Cr but existing stores lost ₹125Cr, netting to zero. I\'d next want to segment existing store revenue by product category to identify which category is declining."',
        },
        prompt: 'A QSR chain had ₹300Cr revenue last year (150 outlets). This year revenue is ₹360Cr (180 outlets). The CEO says "great growth." Walk me through your analysis — is it really great growth? Do the math.',
        timeLimit: 120,
        scoring: 'Score on: (1) Correctly decomposed Revenue = Outlets × Revenue per outlet? (2) Computed the actual per-outlet numbers (last year ₹2Cr/outlet, this year ₹2Cr/outlet — flat)? (3) Used process of elimination: "same-store performance is flat — this is not great growth, it\'s new outlet growth only"? (4) Suggested the next segmentation without specifying the pattern?',
      },
      {
        id: 'vc_anal_two_benchmarks',
        title: 'The Two Benchmarks — History + Competition',
        vcPrinciple: 'VC Chapter 10 — "Always compare metrics to something else"',
        concept: {
          title: 'Victor Cheng\'s Two Benchmark Rule',
          steps: [
            '<strong>An absolute number is meaningless without context</strong> — "Variable cost per unit is ₹5,000." Is that good or bad? You cannot know without comparing it to something.',
            '<strong>Benchmark 1 — Historical</strong>: "How does this compare to the same metric last year?" A ₹5,000 cost that was ₹4,000 last year signals a company-specific cost spike.',
            '<strong>Benchmark 2 — Competitive</strong>: "How does this compare to industry / competitors?" If competitors are at ₹4,000 and stable, the gap tells you the problem is unique to your client.',
            '<strong>The two comparisons together reveal whether the problem is company-specific or industry-wide</strong> — this determines your entire hypothesis revision.',
          ],
          watch: 'Most candidates ask only one comparison. VC explicitly says to write this down, tattoo it on your hand: ALWAYS compare to history AND always compare to competition. Both. Every time.',
        },
        example: {
          label: 'Client\'s gross margin is 32% — is this a problem?',
          text: '"32% gross margin on its own tells me nothing. Let me benchmark it two ways. First, historically: if margins were 42% two years ago, a 10pp drop signals a significant deterioration that needs explaining. Second, competitively: if industry average is 38%, the client is 6pp below peers — this suggests a company-specific cost disadvantage or pricing weakness, not an industry-wide issue. These two benchmarks together tell me this is likely a company-specific problem, and I should focus my next analysis on understanding why costs or pricing differ from the industry, not on external market factors."',
        },
        prompt: 'An interviewer tells you that a client\'s net promoter score (NPS) has fallen from 68 to 52 over 18 months. Demonstrate the two-benchmark method to interpret this data and determine what it tells you.',
        timeLimit: 90,
        scoring: 'Score on: (1) Explicitly identified that the absolute number (52 NPS) is insufficient without benchmarks? (2) Applied historical benchmark: compared to 68 — a 16-point drop is significant? (3) Applied competitive benchmark: asked for or stated what industry NPS looks like? (4) Drew a conclusion from the two benchmarks about whether this is company-specific or industry-wide? (5) Used the finding to shape the next hypothesis?',
      },
      {
        id: 'vc_anal_profitability_math',
        title: 'Revenue Decomposition — Do the Actual Math',
        vcPrinciple: 'VC Chapter 13 — Segmenting and Isolating',
        concept: {
          title: 'Victor Cheng\'s Math-First Approach',
          steps: [
            '<strong>Never describe the decomposition — compute it</strong> — "Revenue = Price × Volume" is just a formula. Show the numbers.',
            '<strong>Fixed cost vs variable cost insight</strong> — VC: "A company with high fixed costs must grow volume to fix itself. A company with negative contribution margins will lose money FASTER if it grows." These are opposite prescriptions — the math tells you which applies.',
            '<strong>If profit and revenue both decline by the same amount — costs are flat</strong> — this is a mathematical certainty. Use it to eliminate entire branches immediately.',
            '<strong>Compare profit per unit across periods</strong> — this reveals whether the problem is structural (unit economics) or volume-driven.',
          ],
          watch: 'VC Mistake #7: Math errors are automatic rejection at top firms. VC Mistake #5: hand-waving numbers without computing. Both are fatal. Get the math right, and get it fast.',
        },
        example: {
          label: 'Profits down ₹20Cr, revenue also down ₹20Cr',
          text: '"Profits are down ₹20Cr and revenue is also down ₹20Cr. Using P = R − C: if R went down ₹20Cr and P went down ₹20Cr, then C must be unchanged — this is a mathematical certainty. So the problem is entirely on the revenue side, not costs. I can rule out the cost branch entirely right now without asking any questions. Within revenue: R = Price × Volume. I\'d like to know whether units sold changed — [Interviewer: units are flat]. If units are flat but revenue is down ₹20Cr on a ₹200Cr base, that\'s a 10% revenue decline with flat volume — which means price per unit has fallen by 10%. My revised hypothesis: this is a pricing problem."',
        },
        prompt: 'A pharma company had revenue of ₹500Cr and profit of ₹75Cr last year (15% margin). This year revenue is ₹520Cr but profit is ₹52Cr (10% margin). The CEO thinks it\'s a cost problem. Work through the math to confirm or refute.',
        timeLimit: 120,
        scoring: 'Score on: (1) Used P = R − C to compute implied cost change (costs must be up ₹43Cr to explain the profit drop despite revenue rising ₹20Cr)? (2) Correctly identified this IS a cost problem (CEO is right, costs rose ₹43Cr on ₹20Cr of revenue gain)? (3) Quantified the margin compression precisely (margin fell 5pp on a ₹520Cr base = ₹26Cr impact, but actual profit fall is ₹23Cr — reconcile)? (4) Suggested next step: segment costs into fixed vs. variable?',
      },
    ],

    // ─ SYNTHESIS drills — VC Ch.11 (Synthesis) + Ch.19 (How to Close) ─────
    synthesis: [
      {
        id: 'vc_syn_topdown',
        title: 'Top-Down Synthesis — VC\'s Exact Format',
        vcPrinciple: 'VC Chapter 11 — "Conclusion ALWAYS first. Never more than 3 points."',
        concept: {
          title: 'Victor Cheng\'s Top-Down Synthesis Format',
          steps: [
            '<strong>The format — memorise it</strong>: "[Recommendation]. For three reasons. First, [point 1]. Second, [point 2]. Third, [point 3]. And for those three reasons, I recommend [same recommendation]."',
            '<strong>Recommendation FIRST — always</strong> — VC: "If you have time to hear only the first sentence, you understand the essential message." Bottom-up summaries bury the message.',
            '<strong>Exactly 3 supporting points — never more</strong> — 4+ points means you haven\'t prioritised. VC is explicit: force yourself to pick 3.',
            '<strong>Restate the conclusion at the end</strong> — creates a "rhythm and cadence." The first and last sentence say the same thing. Everything in between is support.',
          ],
          watch: 'VC Mistake #10: activity-based bottom-up summary — "First I looked at X and found Y, then I looked at Z..." This is a chronological recap, not synthesis. It signals that you cannot distinguish important from unimportant findings.',
        },
        example: {
          label: 'Should the hospital chain enter the diagnostics segment?',
          text: '"I recommend the client enter diagnostics — specifically by acquiring a regional lab chain rather than building greenfield. For three reasons: First, the economics are compelling — diagnostics carries 28% EBITDA margins vs. 14% in inpatient care, and our patient base of 1.2M annually provides a captive referral stream. Second, the competitive window is closing — SRL and Metropolis are expanding aggressively in Tier 2 cities, and our three target cities still have fragmented independent labs. Third, acquisition is the right mode — we identified two regional chains at 6x EV/EBITDA that would give us 40 centres and lab infrastructure immediately vs. 3 years to build. For those three reasons, I recommend entering diagnostics via a targeted acquisition."',
        },
        prompt: 'Deliver a top-down synthesis for this case: A Tier 2 Indian hotel chain (8 properties, ₹80Cr revenue) should decide whether to franchise one brand or stay independent. Your analysis found: franchise fees are 8% of revenue, brand premium adds 12% occupancy lift, standalone renovation costs are ₹30Cr vs ₹45Cr under franchise brand standards.',
        timeLimit: 90,
        scoring: 'Score on: (1) Recommendation in the FIRST sentence — not analysis, not context? (2) Exactly 3 supporting points — not 2, not 4? (3) Points are specific and quantified using the case data? (4) Conclusion explicitly restated at the end using similar words? (5) Action-oriented ("the client should [verb]") not vague ("there are considerations...")?',
      },
      {
        id: 'vc_syn_mini',
        title: 'Mini-Synthesis at Branch Switch',
        vcPrinciple: 'VC Chapter 18 — Synthesise when switching branches',
        concept: {
          title: 'The Branch-Switch Mini-Synthesis',
          steps: [
            '<strong>Every time you switch branches — synthesise</strong> — tell the interviewer what the branch you\'ve just finished told you. Don\'t just jump to the next branch silently.',
            '<strong>Format: "I can conclude that X is not the problem because [evidence]. Since [math], the problem must be in [remaining branch]. I\'d like to now analyse [next branch]."</strong>',
            '<strong>Explicitly rule out the branch you\'re closing</strong> — this shows you are using process of elimination, not just exploring randomly.',
            '<strong>State the revised hypothesis if the data prompted one</strong> — "My initial hypothesis was costs. I\'ve just found that costs are flat, so I\'m revising my hypothesis: the problem is revenue. Specifically, I now suspect pricing."',
          ],
          watch: 'Most candidates say "OK, so now let\'s look at revenues" and jump over. This looks like random exploration (VC Mistake #8). The mini-synthesis closes the prior branch, keeps the interviewer oriented, and signals disciplined, linear thinking.',
        },
        example: {
          label: 'After finding costs are not the problem',
          text: '"I\'ve now completed my analysis of the cost branch. I can conclude that costs are NOT the driver of the profit decline — specifically, both fixed and variable costs per unit are flat versus last year, and our cost structure is in line with industry benchmarks. Since profits = revenue − costs, and costs are unchanged, the entire ₹40Cr profit decline must come from the revenue side. I\'m revising my hypothesis: this is a revenue problem, and within revenue, I suspect it\'s volume-driven rather than price-driven, since we haven\'t changed our pricing strategy. Let me now drill into revenues — starting with unit volumes by product category."',
        },
        prompt: 'You\'ve just analysed the revenue branch of a profitability case for a paint manufacturer. You found: Revenue is up 8% (volumes flat, price up 8%). Now write the mini-synthesis you would deliver before switching to the cost branch.',
        timeLimit: 60,
        scoring: 'Score on: (1) Explicitly closed the revenue branch with a clear conclusion — stated what revenue analysis found? (2) Used process of elimination — ruled out revenue as the problem driver since it\'s up? (3) Stated the mathematical implication: if revenue is up 8% and profits are still down, costs must have risen MORE than 8% of revenue? (4) Stated the next hypothesis for the cost branch? (5) Transitioned cleanly: "I am now moving to the cost branch because..."?',
      },
    ],

    // ─ COMMUNICATION drills — VC Ch.11 (Synthesis format) + Ch.25 (Confidence) ─
    communication: [
      {
        id: 'vc_comm_topdown_verbal',
        title: 'Signposting — "I\'ll Cover Three Areas"',
        vcPrinciple: 'VC Chapter 11 & 25 — Executive Communication',
        concept: {
          title: 'Victor Cheng\'s Signposting Principle',
          steps: [
            '<strong>Tell them what you\'ll say, then say it</strong> — "I\'ll cover three areas: first, X; second, Y; third, Z." This gives the listener a mental map and makes you sound structured.',
            '<strong>Number your points out loud</strong> — "First... Second... Third..." without fillers between. This forces linear thinking and prevents you from jumping around (VC Mistake #8).',
            '<strong>Avoid filler transitions</strong> — "So, uh, you know, moving on..." → "Second:" is all you need.',
            '<strong>Senior executives value this above all else</strong> — VC: "The best communicator often wins when candidates are analytically equal." A first-year consultant who can communicate with a senior client is always chosen over one who cannot.',
          ],
          watch: 'The most common failure: candidates say "and also..." or "another thing is..." instead of numbering points. This makes it impossible to tell how many points are coming and signals unstructured thinking.',
        },
        example: {
          label: 'Why market share declined despite revenue growth',
          text: '"There are two reasons market share can decline even when absolute revenue grows. First, market growth is outpacing you: if the total market grows 30% but you grew only 15%, your share falls even though your revenue is up. Second, competitor-led dynamics: a new entrant or expanded competitor took disproportionate share of new customers without yet affecting your existing base. In our client\'s case, I\'d want to see total addressable market growth rates to determine which of these two mechanisms applies."',
        },
        prompt: 'Answer in 60 seconds with explicit signposting and numbered points: "What are the main reasons a company\'s NPS could be declining even as revenue is growing?"',
        timeLimit: 60,
        scoring: 'Score on: (1) Opened with an explicit count — "There are X reasons"? (2) Each point clearly numbered — "First... Second..." (not "also" or "another")? (3) No filler words between points (um, uh, so, like, you know, basically)? (4) Closed with a landing sentence or summary? (5) Points are genuinely distinct — mutually exclusive?',
      },
      {
        id: 'vc_comm_avoid_activity_recap',
        title: 'Avoid the Activity-Based Summary — VC Mistake #10',
        vcPrinciple: 'VC Chapter 26 — Common Mistake #10',
        concept: {
          title: 'Top-Down vs Bottom-Up — the Critical Difference',
          steps: [
            '<strong>Bottom-up (WRONG)</strong>: "First I looked at X and found Y. Then I analysed Z. Then I examined W. Therefore, I conclude A." — this is a chronological activity recap that buries the conclusion.',
            '<strong>Top-down (CORRECT)</strong>: "I recommend A. For three reasons: first Y, second Z, third W. Therefore I recommend A." — conclusion leads, evidence follows.',
            '<strong>Why it matters</strong> — VC: "A CEO generates $3M in revenue per day. If you take 35 minutes to explain something that could take 5 minutes, you\'ve wasted $50K of her time. She will think about this. You don\'t want to be known for that."',
            '<strong>Test yourself</strong>: If someone interrupted you after your FIRST sentence, would they know your recommendation? If yes — top-down. If no — bottom-up.',
          ],
          watch: 'VC: "Many beginners close a case by listing everything discovered in the order it was discovered. The interviewer doesn\'t care. She wants to know upfront what\'s important."',
        },
        example: {
          label: 'Bad vs. Good close — M&A case',
          text: '<strong>WRONG (bottom-up):</strong> "First, I analysed the target\'s sales and found single-product concentration. Then I looked at the market and found growth tapering. Then I checked margins and found they\'d erode post-acquisition."<br><br><strong>RIGHT (top-down):</strong> "Do not acquire this company. It is a bad idea for three reasons: the revenue is dangerously concentrated in one product; the underlying market is expected to decelerate in 3 years; and margin synergies assumed in the deal model are unlikely to materialise. For those three reasons, do not acquire."',
        },
        prompt: 'Rewrite this bottom-up summary as a top-down synthesis: "So first I looked at the cost side and found that raw material costs were up 15%, especially coal. Then I checked fixed costs and they were stable. Then I looked at revenues and found they were flat. And pricing was actually down 5% because of competitive pressure. So I guess the main issue is a combination of cost inflation and pricing pressure."',
        timeLimit: 60,
        scoring: 'Score on: (1) Recommendation or conclusion in the first sentence? (2) Eliminated all chronological sequencing ("first I looked at... then I checked...")? (3) Organised into 2–3 clean supporting points? (4) Each point is a finding, not an activity? (5) Concluded by restating the recommendation?',
      },
      {
        id: 'vc_comm_hypothesis_language',
        title: 'Confident Hypothesis Language — No Hedging',
        vcPrinciple: 'VC Chapter 8 & 25 — Conviction in Communication',
        concept: {
          title: 'Victor Cheng on Confident Language',
          steps: [
            '<strong>State hypotheses with conviction, not hedging</strong> — "My hypothesis is X" vs "I think maybe it could possibly be X..." BCG partners want a directional view, even if imperfect.',
            '<strong>Arbitrary hypotheses need flagging, not hedging</strong> — "I\'ll state an arbitrary hypothesis that costs are the driver. I\'ll revise as data comes in." This is confident and honest.',
            '<strong>Revise confidently too</strong> — "My initial hypothesis was wrong. The data clearly shows the problem is revenue, not costs. I\'m revising my hypothesis accordingly." Don\'t apologise. Revision is the process.',
            '<strong>Never emotionally attach to a hypothesis</strong> — VC: "If data disproves your hypothesis, don\'t deny it. Don\'t try desperately to validate despite contrary facts — you\'ll look illogical."',
          ],
          watch: 'Hedging phrases to eliminate: "I think maybe...", "it could possibly be...", "there might be some reasons...", "sort of...", "kind of...", "I guess...". Replace with: "My hypothesis is...", "I believe...", "The data suggests...".',
        },
        example: {
          label: 'Hypothesis revision done confidently',
          text: '"My initial hypothesis — that this was a cost problem — is incorrect. The data shows fixed and variable costs per unit are flat. I\'m revising my hypothesis: this is a revenue problem. Specifically, I now believe volumes have declined, not pricing, because the client has not changed its price list in 18 months. To test this revised hypothesis, I\'d like to see unit shipment data by geography."',
        },
        prompt: 'Rewrite this hedging, low-conviction version into a confident VC-style hypothesis statement: "Um, so I guess the issue might be something to do with costs, you know, maybe raw materials or something. I\'m not totally sure, but it could possibly also be revenue. I think we should maybe look at both, just to see what comes up."',
        timeLimit: 45,
        scoring: 'Score on: (1) All hedging language eliminated (um, so, I guess, might be, you know, maybe, not totally sure, could possibly, I think)? (2) Clear hypothesis stated with conviction — "My hypothesis is X"? (3) Causal mechanism named — WHY do they believe this? (4) Next analytical step stated with direction — what will they test and how?',
      },
    ],
  };

  // ── State ─────────────────────────────────────────────────────────────────
  let state = { drill: null, dimension: null, phase: 'learn' };
  let timerInterval = null;
  let speechRec      = null;
  let speechActive   = false;
  let _micBase       = '';   // text in textarea when mic started (merged into on each onend restart)
  let _micNew        = '';   // only speech added since last recognition segment started
  let _grammarTimer  = null; // debounce handle for auto grammar-correction
  let _grammarVer    = 0;    // version counter — incremented on each new final chunk

  // ── Public: open a drill ──────────────────────────────────────────────────
  // ── Drill Picker — show before random selection ───────────────────────────
  function openDrillModal(dimension) {
    const drills = LIBRARY[dimension] || [];
    if (!drills.length) { showToast('No drills for this dimension yet.', 'error'); return; }
    _showPicker(dimension, drills);
  }

  const DIM_LABELS = { structuring:'Structuring', analytics:'Analytics', synthesis:'Synthesis', communication:'Communication' };
  const DIM_ICONS  = { structuring:'🏗️', analytics:'📊', synthesis:'💡', communication:'🗣️' };
  const DIM_DESCS  = {
    structuring:   'Hypothesis-first thinking, MECE trees, VC frameworks',
    analytics:     'Data segmentation, drill-down, math under pressure',
    synthesis:     'Top-down recommendation, conclusion-first delivery',
    communication: 'Signposting, confident language, avoiding recap mode',
  };

  function _vcChapRef(id) {
    if (id.startsWith('vc_str'))  return 'VC Ch.8–14 · Structuring';
    if (id.startsWith('vc_anal')) return 'VC Ch.10–18 · Analytics';
    if (id.startsWith('vc_syn'))  return 'VC Ch.11–19 · Synthesis';
    return 'VC Ch.25–26 · Communication';
  }

  function _showPicker(dimension, drills) {
    document.getElementById('drill-picker-overlay')?.remove();
    const overlay = document.createElement('div');
    overlay.id = 'drill-picker-overlay';
    overlay.className = 'drill-modal-overlay';
    overlay.innerHTML = `
      <div class="drill-modal drill-picker-modal">
        <div class="drill-modal-hdr">
          <div>
            <span class="drill-dim-badge">${DIM_ICONS[dimension]} ${DIM_LABELS[dimension]} Drills</span>
            <div class="drill-modal-title">Choose your practice focus</div>
            <div class="drill-picker-desc">${DIM_DESCS[dimension]}</div>
          </div>
          <button class="drill-close-btn" onclick="document.getElementById('drill-picker-overlay')?.remove()">✕</button>
        </div>
        <div class="drill-picker-body">
          <button class="drill-picker-random-btn" onclick="Drills._startRandom('${dimension}')">
            🎲 <span>Random drill — surprise me</span>
          </button>
          <div class="drill-picker-or">— or pick a specific skill —</div>
          ${drills.map(d => `
            <div class="drill-picker-card" onclick="Drills._startSpecific('${d.id}','${dimension}')">
              <div class="drill-picker-card-hdr">
                <div class="drill-picker-card-title">${d.title}</div>
                <div class="drill-picker-card-time">⏱ ${d.timeLimit}s</div>
              </div>
              <div class="drill-picker-card-meta">${_vcChapRef(d.id)}</div>
              ${d.concept?.watch ? `<div class="drill-picker-card-watch">⚠️ ${d.concept.watch}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>`;
    document.body.appendChild(overlay);
  }

  function _startRandom(dimension) {
    document.getElementById('drill-picker-overlay')?.remove();
    const drills = LIBRARY[dimension] || [];
    const pick = drills[Math.floor(Math.random() * drills.length)];
    state = { drill: pick, dimension, phase: 'learn' };
    _renderModal();
  }

  function _startSpecific(drillId, dimension) {
    document.getElementById('drill-picker-overlay')?.remove();
    const drills = LIBRARY[dimension] || [];
    const pick = drills.find(d => d.id === drillId) || drills[0];
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
        placeholder="Type your answer here, or click the mic to speak…"></textarea>
      <div id="drill-interim" class="drill-interim-text" style="display:none;"></div>
      <div id="drill-grammar-status" class="drill-grammar-status" style="display:none;">✨ Auto-correcting grammar…</div>

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
  function _toggleMic() { speechActive ? _stopMic() : _startMic(); }

  function _clearInterim() {
    const el = document.getElementById('drill-interim');
    if (el) { el.textContent = ''; el.style.display = 'none'; }
  }

  function _startMic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { showToast('Speech recognition not supported — please use Chrome.', 'error'); return; }

    speechRec = new SR();
    speechRec.continuous      = true;
    speechRec.interimResults  = true;
    speechRec.lang            = 'en-IN';
    speechRec.maxAlternatives = 1;

    // Snapshot current textarea text as base; only NEW speech goes into _micNew
    _micBase = (document.getElementById('drill-input')?.value || '').trim();
    _micNew  = '';

    speechRec.onresult = (e) => {
      let finalChunk = '', interimChunk = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalChunk += t + ' ';
        else interimChunk += t;
      }

      if (finalChunk) {
        _micNew += finalChunk;
        // Debounce grammar correction — fires 1.5 s after last confirmed word
        clearTimeout(_grammarTimer);
        _grammarTimer = setTimeout(_correctGrammar, 1500);
      }

      // Textarea = base + confirmed new speech (no interim in textarea)
      const inp = document.getElementById('drill-input');
      if (inp) inp.value = (_micBase + (_micNew ? ' ' + _micNew : '')).trim();

      // Interim shown separately below textarea
      const interimEl = document.getElementById('drill-interim');
      if (interimEl) {
        if (interimChunk) {
          interimEl.textContent = '🎤 ' + interimChunk;
          interimEl.style.display = 'block';
        } else {
          interimEl.textContent = '';
          interimEl.style.display = 'none';
        }
      }
    };

    speechRec.onerror = (e) => {
      if (e.error === 'not-allowed' || e.error === 'permission-denied') {
        showToast('Microphone access denied — allow mic in browser settings.', 'error');
        _stopMic();
      } else if (e.error === 'network') {
        showToast('Network error with speech recognition — check connection.', 'error');
        _stopMic();
      } else if (e.error === 'audio-capture') {
        showToast('No microphone found — plug one in and try again.', 'error');
        _stopMic();
      }
      // 'no-speech' and 'aborted' are non-fatal — let onend handle restart
    };

    speechRec.onend = () => {
      if (speechActive) {
        // ── KEY FIX: merge confirmed finals into _micBase before restarting ──
        // Chrome may drop words that were "interim" at the moment onend fired.
        // Merging here guarantees all confirmed finals survive the recognition gap.
        if (_micNew) {
          _micBase = (_micBase + ' ' + _micNew).trim();
          _micNew  = '';
          const inp = document.getElementById('drill-input');
          if (inp) inp.value = _micBase;
        }
        // Short delay prevents a Chrome race condition on rapid stop→start
        setTimeout(() => {
          if (speechActive) {
            try { speechRec.start(); } catch(e) { /* already starting */ }
          }
        }, 80);
      }
    };

    speechRec.start();
    speechActive = true;

    const btn = document.getElementById('drill-mic-btn');
    if (btn) {
      btn.textContent = '🔴 Stop recording';
      btn.style.color = '#ef5350';
      btn.style.borderColor = '#ef5350';
    }
  }

  // ── Grammar auto-correction (debounced, runs after each finalised chunk) ──
  async function _correctGrammar() {
    const inp = document.getElementById('drill-input');
    if (!inp || !inp.value.trim()) return;

    const version  = ++_grammarVer;
    const fullText = inp.value.trim();

    // Show subtle status indicator (only if interim isn't showing live speech)
    const grammarEl = document.getElementById('drill-grammar-status');
    if (grammarEl) { grammarEl.style.display = 'block'; }

    try {
      const corrected = await callClaude(
        [{ role: 'user', content: `Fix ONLY grammar, punctuation, and capitalisation in this speech-to-text transcript from a case interview. Do NOT change, add, or remove any words. Do NOT rewrite sentences. Fix: sentence-start capitals, "i" → "I", missing full stops, comma splices, obvious mis-capitalised proper nouns. Return ONLY the corrected text — no quotes, no explanation.\n\n${fullText}` }],
        'You are a grammar corrector for speech transcripts. Return only the corrected text, nothing else.',
        'claude-haiku-4-5-20251001', 512
      );

      // Only apply if no newer grammar run was triggered in the meantime
      if (version === _grammarVer) {
        const clean = corrected.trim();
        if (clean && clean !== fullText) {
          inp.value = clean;
          // Reset base/new so further speech appends correctly
          _micBase = clean;
          _micNew  = '';
        }
      }
    } catch(e) {
      // Silent fail — raw transcript stays as-is
    } finally {
      if (version === _grammarVer) {
        if (grammarEl) { grammarEl.style.display = 'none'; }
      }
    }
  }

  function _stopMic() {
    speechActive = false;
    clearTimeout(_grammarTimer);   // cancel any pending correction
    try { speechRec?.stop(); } catch(e) {}
    _clearInterim();
    const grammarEl = document.getElementById('drill-grammar-status');
    if (grammarEl) { grammarEl.style.display = 'none'; }
    const btn = document.getElementById('drill-mic-btn');
    if (btn) { btn.textContent = '🎤 Speak'; btn.style.color = ''; btn.style.borderColor = ''; }
  }

  // ── Submit & Score ────────────────────────────────────────────────────────
  async function _submit() {
    clearInterval(timerInterval);
    _stopMic();
    _clearInterim();
    // Flush any pending interim into the textarea before reading
    const inp = document.getElementById('drill-input');
    if (inp && _micNew) inp.value = (_micBase + ' ' + _micNew).trim();
    const answer = inp?.value?.trim() || document.getElementById('drill-input')?.value?.trim() || '';
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
  function _goApply() {
    _stopMic();
    _micBase = ''; _micNew = ''; _grammarVer = 0;
    state.phase = 'apply';
    _renderPhase();
  }

  function _retry() {
    _stopMic();
    _micBase = ''; _micNew = ''; _grammarVer = 0;
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

  return { openDrillModal, close, _goApply, _submit, _toggleMic, _retry, _nextDrill, _startRandom, _startSpecific };
})();
