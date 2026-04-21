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
  {
    id: 'ops_003',
    type: 'operations',
    title: 'JSW Steel — OEE Crisis at Vijayanagar Plant',
    industry: 'Steel / Heavy Manufacturing',
    difficulty: 'Hard',
    context: `JSW Steel's flagship Vijayanagar plant (12 MTPA capacity) has seen Overall Equipment Effectiveness (OEE) drop from 81% to 64% over 18 months. The COO estimates each OEE percentage point is worth ₹180 crore in lost output annually. BCG has been engaged to recover at least 12 OEE points within 9 months without capital expenditure.`,
    keyData: {
      oee_components: 'Availability: 74% (down from 88%), Performance: 89% (stable), Quality: 97% (stable)',
      downtime_breakdown: 'Unplanned breakdown: 61%, Planned maintenance: 22%, Changeovers: 17%',
      top_5_breakdown_equipment: 'Blast furnace #2 (28%), Caster #1 (19%), Hot strip mill (16%), Ladle furnace (14%), Sinter plant (23%)',
      maintenance_model: 'Reactive (breakdown-driven); PM compliance rate: 41%',
      shift_structure: '3 shifts × 8 hours; avg breakdown response time: 4.2 hours',
      spare_parts_availability: 'Critical spares stockout rate: 34%; avg procurement lead time: 11 days',
      benchmark: 'Best-in-class integrated steel: OEE 85–88%; Indian peer average: 74%',
    },
    hiddenInsight: 'Availability is the sole driver of OEE decline — Performance and Quality are healthy. 61% of downtime is unplanned breakdowns concentrated in 3 assets (BF#2, Caster#1, Sinter). Root cause is PM compliance at 41% — PMs are being deferred to meet short-term production targets. Fix: implement RCM-based PM scheduling with maintenance windows locked in production plan. Spare parts stockout (34%) extends MTTR — a critical spares buffer of top-20 failure modes halves response time.',
    suggestedFramework: 'OEE decomposition (Availability × Performance × Quality) → Identify bottleneck component → Pareto of downtime by equipment → Root cause: PM compliance vs. spare availability vs. skill → Prioritised action plan by impact and lead time.',
    interviewerNotes: 'Push candidate to decompose OEE before diagnosing. If they jump to solutions, ask: "Which of the three OEE components is driving this?" Then: "What percentage of downtime is unplanned vs. planned?" Test whether they can design a 90-day vs. 9-month roadmap.',
    scoringRubric: {
      structuring: 'Must decompose OEE into Availability/Performance/Quality first. Strong: identify Availability as sole problem, then Pareto downtime by type and equipment. Weak: jump to generic maintenance recommendations.',
      analytics: '12 OEE points × ₹180 crore = ₹2,160 crore recovery potential. BF#2 + Caster#1 + Sinter = 68% of unplanned downtime — fixing these 3 assets recovers ~8-9 OEE points. PM compliance from 41% → 80% estimated to reduce unplanned downtime by 40%.',
      synthesis: 'Three-horizon plan: Immediate (30 days) — lock critical spares buffer, force PM compliance on top-3 assets; Medium (90 days) — implement RCM on top-10 failure modes; Long-term — predictive maintenance sensors on BF#2.',
    }
  },
  {
    id: 'ops_004',
    type: 'operations',
    title: 'Sun Pharma — Debottleneck or Greenfield?',
    industry: 'Pharmaceuticals / Manufacturing',
    difficulty: 'Hard',
    context: `Sun Pharma's API (Active Pharmaceutical Ingredient) manufacturing plant in Vadodara is running at 96% capacity utilisation. Demand for three key molecules is forecast to grow 35% over 3 years, driven by export markets. The CFO wants BCG to recommend the most capital-efficient path to add 40% capacity within 36 months, comparing debottlenecking, brownfield expansion, and contract manufacturing.`,
    keyData: {
      current_capacity: '800 MT/year API across 6 reactor lines',
      capacity_needed: '1,120 MT/year (40% increase)',
      debottleneck_option: 'Upgrade 2 reactor lines: ₹120 crore, adds 180 MT, 14-month timeline, no new land required',
      brownfield_option: 'Add 2 new reactor lines on adjacent land: ₹380 crore, adds 300 MT, 28-month timeline',
      greenfield_option: 'New plant in Hyderabad pharma cluster: ₹900 crore, adds 500 MT, 42-month timeline',
      cmo_option: 'Contract manufacturing with 2 qualified CMOs: ₹0 capex, 30% gross margin dilution, available in 4 months',
      current_ebitda_margin: '34% at plant level',
      cost_of_capital: '11%',
      regulatory: 'USFDA inspection due in 8 months — any major construction disrupts compliance status',
    },
    hiddenInsight: 'The USFDA inspection in 8 months is the binding constraint — brownfield and greenfield both create construction disruption risk to compliance. Optimal path: CMO bridge (months 1–18) to meet near-term demand, run in parallel with debottlenecking (14-month timeline, complete by month 14), then phase out CMO. Greenfield only makes sense if the 3-year demand materialises into a 10-year opportunity — flag this as a strategic decision, not a capacity math decision.',
    suggestedFramework: 'Decision criteria: capital intensity, timeline to capacity, margin impact, regulatory risk, strategic flexibility. Score each option against criteria. Recommend phased approach (CMO bridge + debottleneck now; brownfield contingent on demand confirmation).',
    interviewerNotes: 'Strong candidates will flag the USFDA inspection constraint unprompted or after being told it. Push: "What are your decision criteria?" and "What would make you change your recommendation?"',
    scoringRubric: {
      structuring: 'Must frame decision criteria before evaluating options. Strong: identify regulatory constraint as binding. Weak: evaluate options purely on capex/timeline without constraints.',
      analytics: 'Debottleneck ROI: ₹120Cr investment, 180 MT × avg API price (ask or assume ₹2,500/kg = ₹450 crore revenue) × 34% margin = ₹153 crore EBITDA/year. Payback < 1 year. CMO margin dilution: 30% × expected CMO revenue = cost of bridge. Compare bridge cost vs. debottleneck timeline gap.',
      synthesis: 'Phased recommendation: CMO bridge (now) + debottleneck (start immediately) + brownfield decision gate at month 18 based on demand confirmation. Do NOT recommend greenfield without 10-year demand signal.',
    }
  },
  {
    id: 'ops_005',
    type: 'operations',
    title: 'Meesho Fulfilment — Warehouse Throughput Crisis',
    industry: 'E-Commerce / Logistics',
    difficulty: 'Medium',
    context: `Meesho's largest fulfilment centre in Bhiwandi (Mumbai) processes 180,000 orders per day but is missing daily shipment targets 4 days out of 5. Order processing errors (wrong item, wrong quantity) are running at 3.2%, causing returns that cost ₹85 per incident. The FC Head has been told to hit 98% on-time shipment and <1% errors within 60 days or the FC will be downscaled.`,
    keyData: {
      fc_size: '4.2 lakh sq ft, 2,200 staff across 3 shifts',
      throughput_by_shift: 'Morning: 72K orders (40%), Afternoon: 63K (35%), Night: 45K (25%)',
      error_rate_by_zone: 'Inbound putaway: 0.4%, Picking: 2.1%, Packing: 0.7%',
      error_rate_by_shift: 'Morning: 1.8%, Afternoon: 2.9%, Night: 5.1%',
      pick_rate: 'Avg 68 units/hour vs. benchmark 95 units/hour',
      wms_adoption: 'RF scanner compliance: 61% (rest using paper-based picking)',
      top_error_categories: 'Wrong SKU picked: 58%, Quantity mismatch: 29%, Damaged item: 13%',
      overtime_cost: '₹18 lakh/day in overtime to partially compensate for missed targets',
    },
    hiddenInsight: 'Three distinct problems: (1) Picking errors (2.1%) are the largest error source — root cause is 39% of pickers using paper-based picking; RF scanning reduces pick errors by 75%. (2) Night shift error rate (5.1%) is 3× morning — root cause is inadequate supervision and lighting in zone C-D. (3) Low pick rate (68 vs 95) is a layout/slotting issue — fast-moving SKUs (top 200 SKUs = 60% of picks) are not slotted near pick stations. Fixing RF compliance + slotting recovers 18-20 pick rate points and halves error rate within 30 days.',
    suggestedFramework: 'Diagnose: On-time miss vs. error rate — are they linked or separate? Error Pareto by step → by shift → root cause. Throughput gap analysis (actual vs. benchmark pick rate). Prioritise fixes by impact × speed of implementation.',
    interviewerNotes: 'Rich data case — test whether candidate can Pareto quickly. Push: "Where in the process are errors happening?" Then: "Why is the night shift so different?" Test: "What would you do in the first 7 days?"',
    scoringRubric: {
      structuring: 'Must separate throughput problem from error problem. Strong: Pareto errors by process step (picking = 66% of errors) and by shift (night = 5.1%). Weak: generic "improve training" without data-driven prioritisation.',
      analytics: 'Error cost: 180K orders × 3.2% × ₹85 = ₹4.9 lakh/day = ₹18 crore/year. RF compliance from 61%→100%: error reduction 75% on picking = net error rate ~1.5% total (within target). Pick rate from 68→85 (realistic 30-day improvement) = 25% throughput gain = covers target gap without overtime.',
      synthesis: '7-day actions: force RF scanner compliance (zero paper picking), move top-200 SKUs to prime pick locations, add 1 supervisor per zone on night shift. 30-day: implement slotting optimisation algorithm. 60-day: error rate <1%, pick rate >85, overtime eliminated.',
    }
  },
  {
    id: 'ops_006',
    type: 'operations',
    title: 'Fortis — Operating Theatre Utilisation',
    industry: 'Healthcare / Service Operations',
    difficulty: 'Medium',
    context: `Fortis Healthcare's Delhi NCR cluster (4 hospitals, 38 operating theatres) is achieving 57% OT utilisation against a benchmark of 78% for comparable private hospital networks. The cluster generates ₹420 crore revenue; each utilisation point is worth approximately ₹4.5 crore annually. The CEO wants BCG to identify the fastest path to 72% utilisation.`,
    keyData: {
      ot_utilisation_by_hospital: 'Fortis Gurugram: 71%, Fortis Noida: 63%, Fortis Shalimar Bagh: 52%, Fortis Vasant Kunj: 43%',
      downtime_breakdown: 'Late starts: 31%, Cancellations (day-of): 27%, Long turnovers: 24%, Underbooked slots: 18%',
      cancellation_reasons: 'Patient no-show: 38%, Anaesthetist unavailable: 29%, Equipment fault: 18%, Surgeon delay: 15%',
      surgeon_utilisation: 'Top 20% surgeons: 91% of OT volume; bottom 40%: 6% of OT volume',
      first_case_on_time_start: '34% (industry benchmark: 75%)',
      turnover_time: 'Avg 42 min between cases (benchmark: 25 min)',
      revenue_per_ot_hour: '₹48,000 (general surgery) to ₹1.8 lakh (cardiac)',
    },
    hiddenInsight: 'Late starts (31%) and turnovers (24%) are structural efficiency problems fixable within 60 days with zero capital — first-case on-time start at 34% vs. 75% benchmark is the biggest single lever. Root cause: no accountability system for surgeon punctuality and no pre-call checklist. Cancellations (27%) require patient confirmation protocol (SMS/call 48h before). Vasant Kunj at 43% has a fundamentally different problem — underbooking, not inefficiency — driven by low surgeon roster at that hospital. Fix: redeploy 3 high-volume surgeons from Gurugram (over-indexed) to Vasant Kunj.',
    suggestedFramework: 'OT utilisation waterfall: booked vs. available → actual vs. booked (cancellations) → efficient vs. inefficient time (late starts, turnovers). Segment by hospital to find the outlier. Then Pareto downtime by root cause. Separate structural fixes (process) from capacity fixes (surgeon redeployment).',
    interviewerNotes: 'Push candidate to segment by hospital early. Vasant Kunj at 43% needs a different solution than late-start fixes. Test: "Would the same solution work across all 4 hospitals?"',
    scoringRubric: {
      structuring: 'Strong: segment by hospital first, then Pareto downtime. Must separate Vasant Kunj (booking problem) from others (efficiency problem). Weak: apply one-size solution to all OTs.',
      analytics: 'Revenue opportunity: 15 utilisation points × ₹4.5 crore = ₹67.5 crore/year. First-case start improvement alone: 38 OTs × 1 hour saved daily × ₹80K avg OT revenue = ₹3 lakh/day = ₹11 crore/year from this lever alone. Turnover reduction from 42→25 min = 17 min saved × ~5 turnovers/OT/day = 1.4 extra hours/OT/day of capacity.',
      synthesis: 'Two workstreams: (1) Efficiency — first-case start protocol (accountability + checklist), turnover team dedicated to cleaning/prep, patient confirmation 48h pre-op. (2) Capacity — redeploy 3 surgeons to Vasant Kunj, add anaesthetist on-call coverage. 60-day target: 68% utilisation; 6-month target: 74%.',
    }
  },
  {
    id: 'ops_007',
    type: 'operations',
    title: 'Tata Motors — Strategic Sourcing Under Cost Pressure',
    industry: 'Automotive / Procurement',
    difficulty: 'Hard',
    context: `Tata Motors' commercial vehicles division is facing a ₹1,800 crore annual raw material cost overrun vs. budget. Steel prices have risen 34%, aluminium 28%, and rubber 41% over 18 months. Tata's procurement team has already renegotiated with Tier 1 suppliers but achieved only ₹220 crore in savings. The CPO has engaged BCG to find an additional ₹600 crore in addressable savings within 12 months without disrupting supply continuity.`,
    keyData: {
      total_spend: '₹18,400 crore annual direct material spend',
      spend_breakdown: 'Steel & stampings: 38%, Powertrain components: 22%, Tyres & rubber: 11%, Aluminium castings: 9%, Electronics: 8%, Others: 12%',
      supplier_base: '1,240 Tier 1 suppliers; top 50 = 68% of spend',
      single_source_pct: '41% of spend is single-sourced (no alternate supplier)',
      india_import_pct: 'Electronics: 74% imported; Aluminium castings: 31% imported',
      tier2_visibility: 'Only 23% of Tier 1 suppliers share Tier 2 supplier data',
      design_to_cost: 'Last value engineering exercise: 4 years ago',
      benchmark: 'Toyota India: 8.2% procurement savings/year; Tata CV: 2.1% last year',
    },
    hiddenInsight: 'Three levers in order of impact: (1) Value engineering / design-to-cost — 4 years since last exercise; steel content reduction of 8-10% is achievable with lightweight design changes worth ₹380–480 crore; (2) Dual-sourcing 41% single-source spend — negotiating leverage is near-zero without alternates; qualifying 1 alternate per critical category recovers ₹120–150 crore in price concessions; (3) Tier 2 transparency — 77% of Tier 1s hide Tier 2 margin; forcing transparency and direct Tier 2 contracts on high-volume commodities (steel, rubber) saves ₹80–100 crore. Total: ₹580–730 crore addressable — within the ₹600 crore target.',
    suggestedFramework: 'Spend cube (category × supplier × single/multi source) → Addressable spend identification → Levers: price (renegotiate, dual-source), specification (value engineer), structure (Tier 2 bypass, imports vs. local). Prioritise by savings potential × implementation speed × supply risk.',
    interviewerNotes: 'Test whether candidate goes beyond "renegotiate prices" (already done). Push: "The team already renegotiated — what else?" Look for design-to-cost and dual-sourcing as the unlocks. Test: "Which categories would you prioritise and why?"',
    scoringRubric: {
      structuring: 'Must go beyond price renegotiation (already exhausted). Strong: identify value engineering, dual-sourcing, and Tier 2 transparency as three distinct levers. Framework: spend cube segmentation before diving into solutions.',
      analytics: 'Steel & stampings = ₹18,400 × 38% = ₹6,992 crore. 8% material reduction = ₹559 crore. Realistic with 12-month design cycle? Partial implementation = ₹200-300 crore in year 1. Single-source 41% of ₹18,400 = ₹7,544 crore — qualifying one alternate typically yields 6-8% price reduction = ₹450-600 crore opportunity but 12+ months to qualify. Sequence matters.',
      synthesis: 'Phased plan: Month 1-3: launch value engineering on top 5 steel-intensive components (quick wins), begin alternate supplier qualification for top-10 single-sourced parts. Month 4-9: implement VE changes, use new alternates for renegotiation leverage. Month 10-12: Tier 2 direct contracts. Total year-1 savings: ₹380-450 crore realistically achievable; ₹600 crore by month 18.',
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
