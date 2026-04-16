// BCG India Case Library — merged with case book extracts
// BOOK_CASES is loaded separately from cases_books.js and merged below
window._BCG_INDIA_CASES = [
  // ─── PROFITABILITY ────────────────────────────────────────────────────────
  {
    id: 'prof_001',
    type: 'profitability',
    title: 'Flipkart Margins Under Pressure',
    industry: 'E-Commerce / Technology',
    difficulty: 'Medium',
    context: `Your client is Flipkart, India's leading e-commerce platform. Over the last 18 months, EBITDA margins have declined from -2% to -8% despite GMV growing 22% YoY. The CEO has hired BCG and wants to understand the root cause and a path to profitability. You have 35 minutes.`,
    keyData: {
      gmv: '₹2.4 lakh crore (FY25)',
      categories: 'Electronics (40%), Fashion (28%), Grocery (18%), Others (14%)',
      logistics_cost_pct: '14% of GMV (up from 10%)',
      customer_acquisition_cost: '₹850 per new customer (up 40% YoY)',
      return_rate: '22% overall; 35% in fashion',
      average_order_value: '₹1,200',
      contribution_margin: 'Electronics: +3%, Fashion: -6%, Grocery: -11%',
    },
    hiddenInsight: 'Grocery and fashion have negative contribution margins and are dragging profitability despite high growth. The fix is either category-level pricing/cost intervention or selective de-emphasis. The real unlock is return-rate reduction in fashion — each percentage point saves ~₹240 crore.',
    suggestedFramework: 'Revenue (price × volume by category) vs. Cost breakdown (COGS, logistics, marketing, G&A). Prioritize by contribution margin per category.',
    interviewerNotes: 'Push candidate to go below P&L level into category-specific economics. If they only stay at GMV/EBITDA level, prompt: "Which categories are growing? Are they all equally profitable?"',
    scoringRubric: {
      structuring: 'Expected: Revenue vs. Cost tree, broken down by category. Strong: Hypothesis upfront (cost-side issue), MECE categories.',
      analytics: 'Must calculate: logistics cost increase = ~₹960 crore delta. Return rate impact = ₹1,200 × 0.22 × 2.4L crore / 1200 = meaningful. Bonus: contribution margin waterfall.',
      synthesis: 'Strong recommendation: Exit or restructure grocery (negative unit economics). Fix fashion returns via sizing tools or return fees. Double down on electronics.',
    }
  },
  {
    id: 'prof_002',
    type: 'profitability',
    title: 'Apollo Hospitals EBITDA Decline',
    industry: 'Healthcare',
    difficulty: 'Hard',
    context: `Apollo Hospitals, one of India's largest private hospital chains, has seen EBITDA margins drop from 15% to 9% over 3 years across its 50-hospital network. Revenue has grown 12% CAGR but costs have outpaced growth. The Board wants BCG's assessment within 4 weeks.`,
    keyData: {
      revenue_mix: 'Inpatient (65%), Outpatient (20%), Pharmacy (15%)',
      bed_occupancy: '58% (down from 71%)',
      atpu: '₹45,000 average revenue per inpatient (flat 3 years)',
      staff_cost_pct: '38% of revenue (up from 31%)',
      new_hospitals: '12 new hospitals opened in last 2 years',
      mature_hospital_margins: '17% EBITDA',
      new_hospital_margins: '-4% EBITDA (avg, still ramping)',
    },
    hiddenInsight: 'New hospital ramp-up drag is the primary culprit — 12 new hospitals at -4% EBITDA are dragging the portfolio average. Secondary issue: staff costs rising due to specialist doctor attrition and expensive replacement. Bed occupancy drop reflects under-utilization at new facilities.',
    suggestedFramework: 'Revenue/cost per hospital, segmented by vintage (mature vs. new). Then drill into new hospital performance curve and break-even timeline.',
    interviewerNotes: 'If candidate focuses only on cost, push: "Is this a system-wide problem or concentrated?" Bridge to new vs. old hospital segmentation.',
    scoringRubric: {
      structuring: 'Top marks for segmenting hospitals by vintage early. MECE cost tree (staff, consumables, facility, G&A).',
      analytics: 'Calculate blended margin drag from new hospitals. 12 hospitals × -4% × average revenue = ~₹240 crore EBITDA impact.',
      synthesis: 'Recommendation must address ramp-up acceleration (case volume marketing, specialist hiring) AND portfolio management (slow expansion pace).',
    }
  },
  {
    id: 'prof_003',
    type: 'profitability',
    title: 'Café Coffee Day Revenue Collapse',
    industry: 'Food & Beverage / Retail',
    difficulty: 'Easy',
    context: `A mid-size café chain with 300 outlets across Tier 1 and Tier 2 Indian cities has seen revenues drop 28% in 2 years. Pre-COVID they were profitable; now they're burning cash. The promoter wants to know whether to restructure or exit.`,
    keyData: {
      footfall_drop: '35% at Tier 1 outlets, 12% at Tier 2',
      avg_ticket_size: '₹180 (unchanged)',
      rent_pct_revenue: 'Tier 1: 28%, Tier 2: 14%',
      zomato_swiggy_revenue: '18% of total (growing)',
      top_10_outlets: '40% of total revenue',
      closure_count: '45 outlets closed in 12 months',
    },
    hiddenInsight: 'Tier 1 outlets are structurally unprofitable due to post-COVID rent vs. footfall mismatch. Tier 2 outlets are healthy. The right strategy is aggressive Tier 1 downsizing + Tier 2 expansion + delivery-first model for high-rent locations.',
    suggestedFramework: 'Outlet-level P&L by geography. Then contribution margin analysis with and without rent. Decision tree: fix vs. close vs. renegotiate.',
    interviewerNotes: 'Good warm-up case. Guide toward segmentation if candidate stays high-level.',
    scoringRubric: {
      structuring: 'Revenue (footfall × ticket) vs. Cost (COGS, rent, staff, G&A) tree. Bonus: segment by tier upfront.',
      analytics: 'Tier 1 rent at 28% makes it very hard to be profitable. With 35% footfall drop, revenue dropped ~35%, but rent is fixed = breakeven likely negative.',
      synthesis: 'Clear keep/close/fix recommendation per outlet type.',
    }
  },

  // ─── MARKET ENTRY ─────────────────────────────────────────────────────────
  {
    id: 'mkt_001',
    type: 'market_entry',
    title: 'Nestlé Entering India Rural FMCG',
    industry: 'FMCG / Consumer Goods',
    difficulty: 'Medium',
    context: `Nestlé India wants to expand its product portfolio into rural India — specifically Tier 3 and Tier 4 towns (population 10,000–1,00,000). Currently 85% of revenues come from Tier 1 & 2 cities. The CMO wants a market entry strategy and 3-year revenue potential assessment.`,
    keyData: {
      rural_india_fmcg_market: '₹3.5 lakh crore, growing at 9% CAGR',
      nestle_rural_share: '8% of rural FMCG (low vs. 24% urban share)',
      avg_rural_income: '₹12,000/month household',
      distribution_reach: 'Nestle currently reaches 2.8M outlets; rural India has 12M kirana stores',
      competitor_rural_share: 'HUL: 38%, ITC: 18%, Dabur: 14%',
      price_sensitivity: 'Rural consumers 3× more price sensitive; sachet penetration 67%',
      cold_chain_gap: '40% of Nestlé products need refrigeration',
    },
    hiddenInsight: 'Distribution gap (2.8M vs. 12M outlets) and refrigeration dependency are the primary barriers. Entry via sachet format + ambient temperature products (Maggi, KitKat) through Shakti-type rural distributor model is the fastest path. Avoid dairy-heavy entry due to cold chain.',
    suggestedFramework: 'Market attractiveness (size, growth, competition) + Capability fit (products, distribution, pricing) + Entry mode options + Risk assessment.',
    interviewerNotes: 'Ask: "Which specific product categories would you prioritize for rural entry and why?" Test product-market fit thinking.',
    scoringRubric: {
      structuring: 'Market attractiveness vs. internal capability framework. Must address distribution as a key issue.',
      analytics: 'Rural market share opportunity: 8% → 15% of ₹3.5L crore = ₹2,450 crore incremental. Distribution investment required estimate.',
      synthesis: 'Must prioritize products (ambient > refrigerated), channels (kirana network partnership), and phased geography rollout.',
    }
  },
  {
    id: 'mkt_002',
    type: 'market_entry',
    title: 'German Automaker Entering EV India',
    industry: 'Automotive',
    difficulty: 'Hard',
    context: `A major German premium automaker (analogous to BMW) is evaluating entering India's electric vehicle market. India's EV penetration is currently 2% of total auto sales. They want BCG's view on whether to enter, when, and how.`,
    keyData: {
      india_auto_market: '4.2 million units/year, ₹6 lakh crore',
      premium_segment: '85,000 units (2% of market), growing 18% YoY',
      ev_premium_segment: '3,200 units currently',
      charging_infra: '8,500 public chargers (vs. 1.8M gas stations)',
      import_duty: '100% on CBU imports; 25% on CKD kits',
      tata_nexon_ev_price: '₹14-18 lakh (mass market EV leader)',
      target_segment: 'Premium EV (₹60L+)',
      competitor_timeline: 'Mercedes EQ launches 2026, Audi Q8 e-tron already launched',
    },
    hiddenInsight: 'The premium EV market is tiny (3,200 units) but fast-growing. Import duty structure strongly favors local assembly (CKD). The real risk is the charging infrastructure — range anxiety is the top purchase barrier for Indian premium buyers. Entry strategy: CKD assembly JV + charging infra partnership (with TATA Power or EESL).',
    suggestedFramework: 'Market attractiveness × Competitive landscape × Internal capabilities × Entry mode options. Must quantify market size and growth.',
    interviewerNotes: 'Push on "What assumptions drive your market size estimate?" Test if they can build a bottoms-up estimate from premium auto buyers.',
    scoringRubric: {
      structuring: 'Classic market entry framework expected. Bonus: explicitly address regulatory/duty environment as a key dimension.',
      analytics: 'Premium segment: 85,000 units. EV penetration growing (say 5% by 2028) = 4,250 units. At ₹70L ASP = ₹2,975 crore market. Reasonable market share target 15-20%.',
      synthesis: 'Yes/No entry recommendation with clear rationale. Entry mode (CKD vs. full local) and partnership strategy required.',
    }
  },
  {
    id: 'mkt_003',
    type: 'market_entry',
    title: 'US Fintech Entering India B2B Payments',
    industry: 'Fintech / Financial Services',
    difficulty: 'Medium',
    context: `A US-based B2B payments company (processing $200B in annual transactions in the US) is evaluating entering India's B2B payments market. They specialize in automating accounts payable/receivable for mid-market companies. Should they enter India, and if so, how?`,
    keyData: {
      india_b2b_payments_market: '₹80 lakh crore annual volume, 70% still cheque/cash',
      gstn_registered_businesses: '14 million',
      target_segment: 'Mid-market (₹50-500 crore revenue), ~180,000 companies',
      incumbent_competitors: 'Razorpay, PayU, HDFC SmartHub, Zoho Books',
      rbi_regulations: 'Payment aggregator license required; data localization mandated',
      upi_dominance: 'UPI processes ₹20L crore/month (consumer-focused)',
      customer_acquisition: 'Average B2B SaaS CAC in India: ₹45,000-80,000',
    },
    hiddenInsight: 'The regulatory barrier (PA license, data localization) is the biggest entry friction — 12-18 months to obtain. UPI actually creates tailwinds (API infrastructure, digital payment acceptance). Best entry mode: acquire or partner with an existing licensed Indian fintech, then overlay their superior workflow automation product.',
    suggestedFramework: 'Market size → Competitive intensity → Regulatory fit → Entry mode options (organic/partnership/acquisition).',
    interviewerNotes: 'Test regulatory awareness. Ask: "What unique advantages does this US company bring, and what disadvantages?"',
    scoringRubric: {
      structuring: 'Must explicitly call out regulatory environment as a key dimension (not just market size and competition).',
      analytics: 'TAM: 180,000 companies × ₹2L avg payment volume processed = large. Realistic market share in 3 years. Licensing timeline as constraint.',
      synthesis: 'Partnership/acquisition entry mode strongly preferred over organic. Clear rationale required.',
    }
  },

  // ─── M&A / DUE DILIGENCE ─────────────────────────────────────────────────
  {
    id: 'ma_001',
    type: 'ma',
    title: 'PE Firm Acquiring Indian Logistics Company',
    industry: 'Logistics / Supply Chain',
    difficulty: 'Hard',
    context: `A global private equity firm is evaluating acquiring a majority stake in Delhivery (India's largest listed logistics company) at a 20% premium to current market price. They want BCG to perform commercial due diligence and assess whether the deal creates value at this price.`,
    keyData: {
      delhivery_revenue: '₹7,200 crore (FY24)',
      ebitda_margin: '4.2%',
      market_share: '22% of express parcel market',
      e_commerce_dependency: '68% of volumes from e-commerce clients',
      top_5_clients: '45% of revenue (Meesho 18%, Flipkart 14%, others)',
      industry_growth: 'Express logistics: 18% CAGR (5-year)',
      asset_intensity: 'High — ₹3,200 crore capex last 3 years',
      price_trend: 'Per-shipment price declining 8% YoY due to competition',
    },
    hiddenInsight: 'Client concentration (top 2 = 32%) and price deflation are key risks. The margin expansion thesis requires volume growth to absorb fixed costs — plausible but dependent on e-commerce GMV growth. At 20% premium, IRR is borderline attractive (12-14%) unless margin improvement to 8%+ is achievable. The deal is borderline — recommend only with renegotiated price.',
    suggestedFramework: 'Market outlook → Company competitive position → Financial performance and quality of earnings → Deal value creation levers → Risk assessment.',
    interviewerNotes: 'Push on "What are the key risks to the investment thesis?" Test if they identify customer concentration proactively.',
    scoringRubric: {
      structuring: 'Commercial DD framework: market, company position, financials, risks, value creation. Must be structured as due diligence, not just market entry.',
      analytics: 'At ₹7,200 crore revenue, 4.2% EBITDA = ₹302 crore. At 20x EBITDA (typical logistics) = ₹6,048 crore EV. 20% premium to market = evaluate if justified.',
      synthesis: 'Clear invest/don\'t invest recommendation with price sensitivity. Identify 2-3 key diligence questions that would change the recommendation.',
    }
  },
  {
    id: 'ma_002',
    type: 'ma',
    title: 'Pharma Merger Synergy Analysis',
    industry: 'Pharmaceuticals',
    difficulty: 'Medium',
    context: `Sun Pharma is considering acquiring a mid-size Indian pharma company (call it "MediCorp") with strong branded generics in South India for ₹8,500 crore. The deal thesis is revenue synergies from distribution expansion and cost synergies from manufacturing consolidation. Quantify synergies and assess if the price is justified.`,
    keyData: {
      medicorp_revenue: '₹2,100 crore',
      medicorp_ebitda: '₹420 crore (20% margin)',
      sun_pharma_south_india_share: '8%',
      medicorp_south_india_share: '23%',
      sun_pharma_manufacturing_utilization: '65%',
      medicorp_plants: '3 plants (2 in South India, 1 in Gujarat)',
      revenue_synergy_estimate: 'Cross-sell into Sun\'s North/West network: potential 15-20% revenue uplift',
      cost_synergy_estimate: 'Plant consolidation, procurement, G&A: estimated ₹180-220 crore',
    },
    hiddenInsight: 'Revenue synergies of ₹315-420 crore (15-20% × ₹2,100 crore) + cost synergies of ₹200 crore = total synergy ₹515-620 crore. At 10× EBITDA multiple on synergies = ₹5,150-6,200 crore synergy value. Deal price ₹8,500 crore vs. standalone value (₹420 crore × 12x = ₹5,040 crore) implies ₹3,460 crore synergy premium — at the high end of synergy range, barely justified.',
    suggestedFramework: 'Standalone value → Synergy identification (revenue + cost) → Synergy quantification → Realization risk → Implied price check.',
    interviewerNotes: 'Ask candidate to walk through the synergy math step by step. Test arithmetic accuracy.',
    scoringRubric: {
      structuring: 'Revenue synergies vs. cost synergies framework. Must separate standalone valuation from synergy value.',
      analytics: 'Accurate synergy calculation and comparison to deal premium. Bonus: NPV of synergies with realization timeline.',
      synthesis: 'Deal attractiveness verdict with clear conditions (price negotiation, integration plan). Not just "synergies exist" — quantified position required.',
    }
  },

  // ─── GROWTH STRATEGY ──────────────────────────────────────────────────────
  {
    id: 'growth_001',
    type: 'growth',
    title: 'HDFC Bank Digital Strategy',
    industry: 'Banking / Financial Services',
    difficulty: 'Hard',
    context: `HDFC Bank's MD wants BCG to help develop a 5-year digital strategy to defend against the threat of digital-native challengers (Paytm, PhonePe, Jupiter, Fi). HDFC Bank has 8.7 crore customers, 8,000+ branches, and is India's most profitable bank but is losing wallet share among customers under 30.`,
    keyData: {
      under_30_customer_share: '28% of customers but only 18% of revenue',
      digital_txn_share: '72% of transactions (up from 45% in 2020)',
      neobank_growth: 'Jupiter/Fi collectively 40L customers, growing 80% YoY',
      branch_cost: '₹2.8 crore per branch per year',
      mobile_app_rating: '3.2/5 (vs. Jupiter 4.7/5)',
      net_interest_margin: '4.1% (industry-leading)',
      credit_card_market_share: '28% (but slowing)',
    },
    hiddenInsight: 'HDFC\'s NIM advantage and brand are durable. The threat is wallet-share among young customers via UX-first neobanks. The response is NOT to out-build them on UX alone — it\'s to use data and credit access as the moat. Strategy: build a "digital bank within a bank" brand for <30 segment with superior app UX + exclusive credit products (first credit card for young professionals).',
    suggestedFramework: 'Threat assessment → Current position vs. challengers → Strategic options → Recommended path. Must cover both offense (new segments) and defense (retention).',
    interviewerNotes: 'Push on: "What is HDFC\'s actual competitive advantage vs. neobanks?" Expect candidate to move beyond "brand" to specifics.',
    scoringRubric: {
      structuring: 'Situation (where are they) → Complication (what\'s threatening) → Resolution (strategy options). Must not jump to recommendations without diagnosis.',
      analytics: 'Revenue opportunity from improving under-30 share. Cost of digital investment vs. branch network optimization.',
      synthesis: 'Specific strategic recommendation — not generic "invest in digital". Must name the specific moves (product, segment, partnership, build/buy).',
    }
  },
  {
    id: 'growth_002',
    type: 'growth',
    title: 'Byju\'s Path to Profitability',
    industry: 'EdTech',
    difficulty: 'Medium',
    context: `This is a 2023 scenario. Byju's, once India's most valuable startup ($22B valuation), is facing a cash crisis. Revenue has stalled at ₹5,000 crore, but cash burn is ₹300 crore/month. Lenders are calling in loans. The founder has hired BCG to identify a path to positive cash flow within 18 months. What do you recommend?`,
    keyData: {
      revenue_streams: 'K-12 subscriptions (55%), Test prep (25%), Coding (10%), International (10%)',
      sales_force: '25,000 direct sales people (largest cost)',
      sales_productivity: '₹20L revenue per salesperson per year',
      customer_complaints: 'Mis-selling, aggressive tactics flagged by ASCI',
      churn_rate: '42% annual',
      international_operations: '7 countries, all loss-making',
      brand_value: 'Still high (Sachin, Shahrukh endorsements)',
    },
    hiddenInsight: 'The 25,000-person sales force at ₹20L productivity = ₹5,000 crore revenue but at very high cost and with mis-selling risk. Cutting to 10,000 high-quality salespeople and adding digital/inbound channels is the fastest path to cash flow. Exit all international markets. Shut coding segment (too competitive vs. free resources). This alone saves ₹1,500-2,000 crore/year.',
    suggestedFramework: 'Cash burn waterfall → Revenue vs. cost levers → Prioritized actions by impact and speed → 18-month roadmap.',
    interviewerNotes: 'Time-constrained turnaround case — push for prioritization. "If you could only do 3 things in the next 90 days, what would they be?"',
    scoringRubric: {
      structuring: 'Revenue enhancement vs. cost reduction tree. Must be time-sensitive (18-month constraint should shape prioritization).',
      analytics: 'Sales force cost: 25,000 × avg ₹8L CTC = ₹2,000 crore/year. Cutting by 60% saves ₹1,200 crore. Math should be quick and directional.',
      synthesis: 'Bold, specific, time-sequenced recommendations. Not "reduce costs" — "cut international in 60 days, reduce sales force by 60% in Q2".',
    }
  },
  {
    id: 'growth_003',
    type: 'growth',
    title: 'Jio New Revenue Streams',
    industry: 'Telecom / Technology',
    difficulty: 'Hard',
    context: `Jio has achieved 450M subscribers and dominates India's telecom market with 38% revenue share. ARPU has plateaued at ₹181/month despite subscriber growth. Mukesh Ambani wants BCG to identify the next ₹50,000 crore revenue opportunity for Jio over 5 years. Where should they play?`,
    keyData: {
      current_revenue: '₹1,06,000 crore (FY24)',
      arpu_trend: 'Flat at ₹181 for 3 years',
      data_consumption: '24 GB/user/month (world-leading)',
      jio_platforms_apps: 'JioTV, JioCinema, JioSaavn, JioHealth, JioMoney',
      digital_ad_market_india: '₹35,000 crore, growing 30% YoY',
      ott_subscription_market: '₹8,000 crore',
      fiber_homes_connected: '11M (out of 100M addressable)',
      enterprise_revenue: '₹12,000 crore (growing 28%)',
    },
    hiddenInsight: 'Three viable paths: (1) JioCinema premium subscription + advertising — leverage 450M users × digital ad ARPU uplift; (2) JioFiber scale-up — 11M vs. 100M addressable = 9× growth potential at higher ARPU (₹600+); (3) Enterprise/B2B cloud + connectivity — fastest margin-accretive growth. Fiber + Enterprise together is the recommended play over OTT alone.',
    suggestedFramework: 'Opportunity sizing for each adjacency → Jio\'s competitive advantage in each → Prioritization matrix (market size × strategic fit × speed to revenue).',
    interviewerNotes: 'Open-ended strategic case — test creativity and structure. Candidate should generate 4-5 options before narrowing.',
    scoringRubric: {
      structuring: 'Structured opportunity generation (don\'t just brainstorm — use axes: B2C vs B2B, within telecom vs. adjacent, short-term vs. long-term).',
      analytics: 'Must size at least 2 opportunities quantitatively. Fiber: 89M households × ₹600 ARPU × 12 = ₹64,000 crore TAM. Even 15% share = target met.',
      synthesis: 'Prioritized recommendation with clear "why Jio vs. competitors" logic. Avoid generic "digital services" — be specific.',
    }
  },

  // ─── OPERATIONS ───────────────────────────────────────────────────────────
  {
    id: 'ops_001',
    type: 'operations',
    title: 'Maruti Supply Chain Crisis',
    industry: 'Automotive / Manufacturing',
    difficulty: 'Medium',
    context: `Maruti Suzuki is facing a supply chain disruption — semiconductor shortages have caused production to drop 18% for 3 consecutive quarters, building up a 4-lakh-unit waitlist. Customers are waiting 8-12 months for popular models. The CEO wants BCG to solve this in 6 months.`,
    keyData: {
      production_drop: '18% = ~1.5L units/quarter shortfall',
      waitlist_value: '4L units × ₹8L avg = ₹32,000 crore in pending orders',
      semiconductor_suppliers: '3 primary suppliers (2 Taiwan, 1 Japan); single-source for 60% of chips',
      alternate_sources: 'Korean and EU suppliers exist but not qualified',
      vehicle_mix: 'Alto/S-Presso (low chip) vs. Baleno/Brezza (high chip)',
      dealer_impact: 'Dealers losing ~₹200 crore/month in commission',
      competitor_inventory: 'Hyundai/Kia have 3-4 week wait times vs. Maruti 8-12 months',
    },
    hiddenInsight: 'Short-term: reallocate chips to lower-chip models (Alto, S-Presso) to maximize unit output. Qualify alternate suppliers in parallel (3-4 month process). Medium-term: redesign 3 high-volume models to reduce semiconductor content by 30%. Long-term: dual-source all critical chips.',
    suggestedFramework: 'Problem diagnosis → Short-term fixes (maximize current supply) → Medium-term (alternate supply) → Long-term (design/supply chain redesign). Time-phased approach.',
    interviewerNotes: 'Push for specificity: "What exactly would you do in the next 30 days?" Test actionability of recommendations.',
    scoringRubric: {
      structuring: 'Time-phased response plan (30 days / 6 months / 12+ months). Must distinguish demand-side and supply-side levers.',
      analytics: 'Chip reallocation impact: if high-chip models use 4× more chips, shifting 30% of production to low-chip doubles unit output from same chip supply.',
      synthesis: 'Specific, actionable 30-60-90 day plan. Must include supplier qualification timeline and product mix recommendation.',
    }
  },
  {
    id: 'ops_002',
    type: 'operations',
    title: 'Big Basket Last-Mile Delivery Optimization',
    industry: 'Grocery / Logistics',
    difficulty: 'Easy',
    context: `BigBasket, India's leading online grocery platform, is facing rising last-mile delivery costs. Cost per delivery has increased from ₹45 to ₹78 in 2 years while average order value has stayed flat at ₹650. They need to get delivery costs back to ₹55 within 12 months without reducing delivery quality.`,
    keyData: {
      daily_orders: '600,000 orders/day across India',
      delivery_density: 'Mumbai: 45 orders/sq km, Tier 2: 8 orders/sq km',
      failed_delivery_rate: '11% (redelivery costs ₹40/attempt)',
      morning_slot_demand: '65% of orders choose 6-9 AM slot',
      delivery_partner_cost: '₹62/order (70% of total delivery cost)',
      dark_store_network: '700 stores, avg coverage 5 km radius',
      electric_vehicle_fleet_pct: '12%',
    },
    hiddenInsight: 'Three levers: (1) Reduce failed deliveries — 11% failed × ₹40 redelivery = ₹11/order → fix with OTP/live tracking = saves ₹8-10/order; (2) Shift peak demand — 65% in morning slot creates surge pricing for delivery partners → time-slot pricing incentive saves ₹6-8/order; (3) Increase EV fleet from 12% to 60% = fuel cost savings ₹4-5/order.',
    suggestedFramework: 'Cost per delivery waterfall → identify largest cost pools → prioritize by impact and ease of implementation.',
    interviewerNotes: 'Good starter case for testing cost breakdown thinking and quick math.',
    scoringRubric: {
      structuring: 'Cost per delivery breakdown (partner cost, fuel, failed deliveries, overhead). Must identify failed delivery as a key lever.',
      analytics: 'Failed delivery math: 600K × 11% × ₹40 = ₹2.64 crore/day = ₹960 crore/year — massive. Quick math should surface this.',
      synthesis: 'Prioritized 3-action plan with expected cost reduction per action summing to target of ₹23/order reduction.',
    }
  },
];

// Merge India cases + book cases into global CASES array
// (called after cases_books.js loads)
window.mergeCases = function() {
  window.CASES = [...(window._BCG_INDIA_CASES || []), ...(window.BOOK_CASES || [])];
};

// Build generation prompt for AI cases
window.buildCaseGenerationPrompt = function(type, industry, difficulty) {
  return `Generate a BCG India consulting case interview for a Senior Associate 2 candidate.

Type: ${type}
Industry: ${industry}
Difficulty: ${difficulty}

Requirements:
- India-specific context (Indian market data, INR figures, Indian companies/brands)
- Realistic financial data with actual numbers
- A non-obvious hidden insight that a strong candidate should reach
- Clear data that the interviewer would reveal upon questioning
- Designed to test: MECE structuring, quantitative reasoning, and insight quality

Return ONLY valid JSON in this exact format:
{
  "id": "ai_${Date.now()}",
  "type": "${type}",
  "title": "descriptive case title",
  "industry": "${industry}",
  "difficulty": "${difficulty}",
  "context": "3-4 sentence case setup paragraph",
  "keyData": {
    "metric1": "value1",
    "metric2": "value2"
  },
  "hiddenInsight": "what a strong candidate discovers",
  "suggestedFramework": "recommended framework approach",
  "interviewerNotes": "what the interviewer should push on",
  "scoringRubric": {
    "structuring": "what good structuring looks like",
    "analytics": "key math/quantitative elements",
    "synthesis": "what a strong recommendation looks like"
  }
}`;
};
