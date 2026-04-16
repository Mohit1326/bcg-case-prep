// ── Cases extracted from Case Books (CIC, Darden, DayOne, Fuqua, ICC) ─────────
window.BOOK_CASES = [
  {
    "id": "cic_001",
    "source": "CIC",
    "type": "profitability",
    "title": "Toffee Manufacturer Volume Decline",
    "industry": "FMCG / Consumer Goods",
    "difficulty": "Medium",
    "context": "Your client is an Indian toffee (candy) manufacturer who is facing a decline in profits of 20% over the last 2-3 months. The toffees are sold all over India through third-party distributors who sell to three types of retailers: large retailers (10% of sales), medium retailers (30%), and small Paan shops (60%). They want your help to turnaround the situation.",
    "keyData": {
      "profit_decline": "20% over 2-3 months",
      "distribution_split": "Large 10%, Medium 30%, Paan shops 60%",
      "problem_location": "Paan shops have shown all the volume decline; large and medium retailers unaffected",
      "root_cause": "Distributor changed toffee containers to ones with narrower necks, making it physically difficult for shopkeepers to dispense toffees to customers",
      "product_type": "Commodity toffee (like Mentos), not differentiated"
    },
    "hiddenInsight": "The decline is not demand-driven or competition-driven — it is a supply-side packaging/operations issue. The distributor changed the containers to ones with narrower necks, making it impossible for the Paan shop owner to hand out toffees easily. Strong candidates isolate the problem along the value chain (Production → Distribution Push → Customer Pull) and zoom in on the Paan shop segment specifically before diagnosing the root cause.",
    "suggestedFramework": "Profit Framework → isolate revenue vs cost → volume decline confirmed → segment by distribution channel → isolate Paan shops → value chain analysis (Production / Distribution Push / Customer Pull) → identify bottleneck at point of sale",
    "interviewerNotes": "Push candidate to segment the problem by distribution channel early. If they go straight to competitor analysis, redirect: 'toffees are a commoditized product — customers don't prefer one brand over another.' Key probe: 'Is the toffee physically reaching the Paan shop? Yes. Is the shopkeeper selling it to customers? This is the gap — why?'",
    "scoringRubric": {
      "structuring": "Strong: immediately asks about value chain and segments by channel. Weak: jumps to competitor/product benchmarking on a commodity product.",
      "analytics": "Strong: quantifies the segment sizes (60% of sales in Paan shops = the majority of the problem). Weak: treats all channels equally.",
      "synthesis": "Strong: identifies root cause as operational/packaging issue without prompting, suggests container redesign. Weak: gets stuck at 'distribution issue' without specificity."
    }
  },
  {
    "id": "cic_002",
    "source": "CIC",
    "type": "profitability",
    "title": "Teak Wood Logging Company — Unsustainable High Profits",
    "industry": "Natural Resources / Forestry",
    "difficulty": "Hard",
    "context": "Your client is a South Indian teak wood manufacturer who has been reporting significantly higher profits than competitors since they started the business three years ago. The client is concerned about whether these high profits are sustainable. Both the client and competitors manufacture two types of wooden planks: Type A (less sturdy) and Type B (more sturdy, higher priced). All companies operate in the Nilgiri forests with a 50 sqm plot of land on a 99-year government lease. Planks are sold in a common wholesale market.",
    "keyData": {
      "client_units_vs_competition": "Client produces 1.5x more units than competitors (same land area)",
      "product_mix_client": "3:1 ratio of Type B (high margin) to Type A",
      "product_mix_competitors": "1:9 ratio of Type B to Type A",
      "root_cause": "Special minerals in the client's soil cause trees to grow faster (more cutting cycles/year) AND produce wood with higher inherent sturdiness (more Type B planks)",
      "minerals_depleting": "Minerals will deplete linearly over the next 5 years",
      "market_structure": "All planks that are produced get sold (commodity wholesale market)"
    },
    "hiddenInsight": "Both advantages — higher production volume AND favorable product mix — stem from the same hidden source: unique minerals in the client's soil plot. These minerals are finite and will be exhausted in 5 years. The profits are NOT sustainable. Bonus insight: while they still have the advantage, the client could price Type B planks at a premium since no competitor can match quality, maximizing cumulative profit before the minerals deplete.",
    "suggestedFramework": "Profit Tree: Revenue = Price × Volume. Benchmark client vs. competitor on each metric. Volume advantage → drill into cutting cycles → land area same → trees grow faster → soil minerals. Product mix advantage → sturdiness of wood → same soil minerals. Sustainability check → minerals depleting → 5-year horizon.",
    "interviewerNotes": "Key data to reveal only when asked: (1) cutting cycles per year are higher for client, (2) area of land is the same (50sqm each), (3) minerals exist and are depleting. Probe: 'Why do you produce more planks per year on the same land area?' and 'What determines whether a plank is Type A or Type B?'. Brownie points for suggesting a premium pricing strategy for Type B before depletion.",
    "scoringRubric": {
      "structuring": "Strong: benchmarks both volume AND product mix independently before seeking a common root cause. Weak: only investigates one dimension.",
      "analytics": "Strong: calculates revenue contribution of each factor (1.5x volume + 3:1 vs 1:9 mix). Weak: qualitative only.",
      "synthesis": "Strong: identifies single root cause (minerals) driving both advantages, evaluates sustainability, proposes pricing action. Weak: stops at 'minerals cause higher production'."
    }
  },
  {
    "id": "cic_003",
    "source": "CIC",
    "type": "profitability",
    "title": "Mumbai Hotel — Room Rate Pricing Decision",
    "industry": "Hospitality",
    "difficulty": "Medium",
    "context": "Your client owns a business hotel located in a commercial area of Mumbai with uniform room rates. The client is considering raising room rates from $160 to $180 per night to increase profits. There is one nearby competitor hotel charging ~$160. The client's hotel has a better business center than the competitor.",
    "keyData": {
      "current_room_rate": "$160/night",
      "proposed_room_rate": "$180/night",
      "customer_mix": "80% business travelers, 20% tourists",
      "business_traveler_policy": "Companies reimburse hotel stays up to $220/night cap; also cover extras (no personal cost sensitivity)",
      "competitor_rate": "~$160/night but inferior business center",
      "business_center": "Client has better business center used frequently by business customers for corporate meetings",
      "key_insight": "Business travelers are price-inelastic (company pays) and value the business center; tourists are price-elastic but are only 20% of guests"
    },
    "hiddenInsight": "The $180 rate increase is safe for 80% of business travelers because (a) companies pay the bill and (b) the corporate cap is $220, well above the new rate. Crucially, the better business center creates a moat — business customers need it and won't switch. The 20% tourist segment is price-elastic, but the real insight is to explore differential pricing: create 'executive suites' for business travelers at a premium and 'standard rooms' for tourists, rather than a blanket increase. Since the cap is $220, the client can go higher than $180.",
    "suggestedFramework": "Impact of price change on profits = f(occupancy change, extras spend change, cost change). Segment customers: business vs tourist. For each: price elasticity, alternatives available. Analyze competitive moat (business center). Model two scenarios: uniform vs. differentiated pricing.",
    "interviewerNotes": "Key data to reveal: 80/20 customer split, $220 company cap, no personal cost sensitivity for business travelers, business center importance. Push: 'Should we price at $180 or can we go higher?' and 'Is $180 the right answer or is there a smarter strategy?' Probe for price differentiation idea.",
    "scoringRubric": {
      "structuring": "Strong: immediately segments customers by price sensitivity before calculating impact. Weak: applies uniform analysis to all guests.",
      "analytics": "Strong: identifies $220 headroom and quantifies incremental revenue vs. potential tourist loss. Weak: only states 'business travelers are less price sensitive.'",
      "synthesis": "Strong: proposes differentiated pricing with rationale (executive vs. standard rooms). Weak: recommends $180 blanket increase without exploring the $220 ceiling."
    }
  },
  {
    "id": "cic_004",
    "source": "CIC",
    "type": "profitability",
    "title": "Book Retailer — Should We Switch to a No-Return Model?",
    "industry": "Publishing / Retail",
    "difficulty": "Hard",
    "context": "Your client is a book retailer who currently buys periodical books (like a monthly magazine) from a publisher at $10/book and sells at $12/book. Any unsold books are returned to the publisher at no cost to the retailer. The publisher is proposing a new deal: the retailer buys books at $9/book (10% discount) but cannot return unsold copies. The publisher produces 10,000 books/month at a cost of $5/book. Demand ranges from 7,500-10,000 books/month with an average of 8,000. Should the retailer switch models? If yes, how many books should they order?",
    "keyData": {
      "current_purchase_price": "$10/book",
      "new_purchase_price": "$9/book",
      "selling_price": "$12/book (unchanged)",
      "publisher_unit_cost": "$5/book",
      "current_demand_range": "7,500-10,000 books/month",
      "average_demand": "8,000/month",
      "current_retailer_monthly_profit": "$16,000 (8,000 × $2 margin)",
      "current_publisher_monthly_profit": "$30,000 (8,000×$10 - 10,000×$5)",
      "new_retailer_profit_at_8000_order": "$24,000 (8,000×$3 margin)",
      "worst_case_retailer_profit_at_7500_demand": "$18,000 (still beats $16,000)",
      "optimal_order_quantity": "8,000 books"
    },
    "hiddenInsight": "The new model is better for the retailer if they order 8,000 books (the average demand). At 8,000 books ordered: retailer profit = $24,000 vs. old $16,000. Even in the worst case (demand = 7,500): profit = $18,000, still better than the old model average of $16,000. The publisher also benefits: at X=8,000 orders, publisher profit = $32,000 vs. old $30,000. Key insight: you must check publisher incentive constraint (X ≥ 7,500) and retailer worst-case scenario simultaneously.",
    "suggestedFramework": "Model both parties' P&L under old and new models. Set up retailer profit equation for Case I (demand > order quantity) and Case II (demand < order quantity). Use publisher constraint (must earn at least $30,000) to set minimum order of 7,500. Optimize retailer profit by finding the order quantity that works in expectation and check worst-case downside.",
    "interviewerNotes": "Reveal data sequentially as the candidate asks. Key probe: 'What order quantity makes economic sense?' Push candidate to check both publisher incentive AND retailer worst-case scenario. Bonus point: candidate should note that the key variable is the demand distribution shape, and the 8,000 average is an approximation.",
    "scoringRubric": {
      "structuring": "Strong: sets up two-party analysis (publisher + retailer) with constraint equations. Weak: only analyzes one party.",
      "analytics": "Strong: correctly models Case I vs. Case II scenarios and calculates worst-case profit at 7,500 demand. Weak: only calculates average-case scenario.",
      "synthesis": "Strong: confirms both parties benefit and identifies 8,000 as the optimal order with risk analysis. Weak: reaches 'yes switch' without specifying order quantity or validating worst case."
    }
  },
  {
    "id": "cic_005",
    "source": "CIC",
    "type": "ma",
    "title": "Canada Discount Retailer — Threat from US Competitor Acquisition",
    "industry": "Retail",
    "difficulty": "Hard",
    "context": "Your client is Canada-Mart, the #1 Canadian discount retailer with 500 stores and 60% market share. The #2 player, Maple-Mart, has 300 stores and 30% market share. US-Mart, a US discount retailer with 4,000 stores in the US, is acquiring Maple-Mart. The CEO of Canada-Mart asks: Should I be worried? How does this acquisition threaten our market share and profitability? How should I respond?",
    "keyData": {
      "canada_mart_stores": 500,
      "canada_mart_market_share": "60%",
      "maple_mart_stores": 300,
      "maple_mart_market_share": "30%",
      "us_mart_us_stores": 4000,
      "us_mart_cogs_advantage": "15% lower cost of goods vs. US competitors due to scale",
      "us_mart_pricing": "~10% lower prices than US competitors",
      "canada_mart_advantage": "Franchise model drives higher customer service and sales vs. centrally-owned Maple-Mart stores",
      "canada_distribution_cost_advantage": "~2% cost advantage for Canada-Mart vs. US-Mart",
      "labor_cost": "Canada has higher labor costs than US (affects US-Mart more than Canada-Mart)"
    },
    "hiddenInsight": "US-Mart's buying power ($5B revenue vs. $1B #2 competitor) gives it ~15% lower COGS and ~10% lower prices in the US. Even accounting for higher Canadian distribution/labor costs, US-Mart will likely offer 7-8% lower prices than Canada-Mart. Canada-Mart's service advantage (franchise model) will erode over time as price differentials compound. The immediate threat is not service, but price. Canada-Mart should consider: (1) consolidating product lines to improve buying power, (2) frequent shopper programs, (3) marketing its service guarantee. The franchise model advantage cannot easily be copied by US-Mart.",
    "suggestedFramework": "Competitor threat framework: (1) Understand Canada-Mart's current competitive advantage sources. (2) Assess US-Mart's strengths in the US and transferability to Canada. (3) Calculate the sustainable price gap. (4) Identify defensive strategies along the value chain.",
    "interviewerNotes": "Key data reveals: US-Mart COGS advantage (15%), pricing advantage (10%), Canada-Mart franchise vs. Maple-Mart corporate stores. Push candidate: 'Given the price gap you calculated, what should Canada-Mart do?' Probe for consolidation/buying power strategy. Note: some data about US-Mart translates to Canada, some does not (higher labor costs in Canada affect US-Mart more).",
    "scoringRubric": {
      "structuring": "Strong: benchmarks both companies' competitive advantages systematically before assessing threat. Weak: treats this as a simple market entry case.",
      "analytics": "Strong: calculates sustainable price gap (7-8%) after adjusting for Canada-specific cost disadvantages. Weak: only says US-Mart is cheaper.",
      "synthesis": "Strong: identifies franchise model as non-replicable moat, proposes SKU rationalization to improve buying power, and acknowledges price gap is terminal threat. Weak: vague recommendations."
    }
  },
  {
    "id": "darden_001",
    "source": "Darden",
    "type": "operations",
    "title": "Central Power — Preparing for Deregulation",
    "industry": "Utilities / Energy",
    "difficulty": "Medium",
    "context": "Your client is a regional electricity monopoly with 100% market share. Due to regulation, its market will be opened to competition on January 1st of next year. There are no actual competitors yet. The client has no control over pricing or cost-cutting in the short term. They want ideas on actions to take now to better prepare for competitors. The company has three divisions: Sales & General Administration, Generation & Transmission, and Maintenance & Repair.",
    "keyData": {
      "industrial_customers": 150,
      "industrial_revenue": "$150M",
      "industrial_revenue_per_customer": "$1,000,000",
      "commercial_customers": 10000,
      "commercial_revenue": "$60M",
      "commercial_revenue_per_customer": "$6,000",
      "residential_customers": 100000,
      "residential_revenue": "$48M",
      "residential_revenue_per_customer": "$480",
      "total_revenue": "$258M",
      "industrial_share_of_revenue": "58%",
      "key_insight": "1 industrial customer = ~2,083 residential customers in revenue terms"
    },
    "hiddenInsight": "The key insight is that 150 industrial customers generate 58% of all revenue ($150M). A rational competitor will target industrial customers first — they are concentrated, high-value, and easy to approach via direct B2B sales. Central Power must defend industrial clients through: dedicated account management, priority maintenance/repair, customized billing, energy efficiency programs, and switching cost increases (long-term contracts). All actions should be biased toward the industrial segment first.",
    "suggestedFramework": "Customer retention framework: (1) Understand customer segmentation and value by segment. (2) Anticipate competitor entry strategy based on data. (3) Identify retention levers across the value chain (Sales/Admin, Generation/Transmission, Maintenance/Repair). (4) Prioritize actions by customer value tier.",
    "interviewerNotes": "Show revenue table early and ask 'What is your reaction to this data?' Strong candidates immediately calculate revenue per customer by segment and recognize industrial customers as the priority. Phase 2: ask candidate to generate ideas for customer retention — this is unstructured. Strong candidates explore the value chain and generate specific, creative ideas. Push 'what else?' repeatedly. Avoid tangents about pricing or cost-cutting (not available levers).",
    "scoringRubric": {
      "structuring": "Strong: organizes retention ideas by company division/value chain after identifying industrial segment priority. Weak: generates random ideas without structure or misses the industrial insight.",
      "analytics": "Strong: calculates all three revenue-per-customer figures and residential customer equivalents. Weak: misses the 2,083:1 ratio.",
      "synthesis": "Strong: recommendation biases all actions toward industrial clients and includes specific, implementable ideas. Weak: generic recommendation without industrial segment emphasis."
    }
  },
  {
    "id": "darden_002",
    "source": "Darden",
    "type": "profitability",
    "title": "Chemicals Inc. — Profitability Decline Despite Revenue Growth",
    "industry": "Chemicals / Manufacturing",
    "difficulty": "Hard",
    "context": "The CEO of Chemicals Inc., a leading chemicals company, reports that EBITDA is hovering near zero despite overall sales growth outpacing industry averages. Paradoxically, business unit leaders all report that revenues, volumes, and profitability in their units have never been higher. Revenues last year were $2B. COGS is ~25% (variable, industry-wide feedstock volatility). SG&A is 30% of revenue — above industry benchmark. The company has 15 product lines across 3 technology platforms (A, B, C) and 5 industries (Automotive, Medical, Consumer Goods, Electronics, Drilling). All product lines share the same service model and technical support.",
    "keyData": {
      "revenue": "$2B",
      "cogs_pct": "25% (variable, industry norm)",
      "sga_pct": "30% of revenue (above industry benchmark)",
      "business_units": 3,
      "product_lines": 15,
      "industries_served": "Automotive, Medical, Consumer Goods/Packaging, Electronics, Drilling",
      "service_model": "All 15 product lines receive same full-service model regardless of margin",
      "key_data": "Wide range of contribution margins across 15 product lines (Exhibit 1: some very high, some commodity-level near zero)",
      "root_cause": "High-margin specialty products are subsidizing low-margin commodity products through shared SG&A; no cost allocation differentiation"
    },
    "hiddenInsight": "The paradox (unit-level profitability vs. zero EBITDA) is caused by improper cost allocation. All 15 product lines share the same expensive full-service model, but only high-margin products (Medical, Drilling) can afford it. Low-margin commodity products (Automotive parts, Consumer Packaging) are being over-served relative to their contribution margin. The fix: reorganize into two BUs — Specialty (high margin, full service) and Commodity (low margin, stripped-down service model with IT tools, a-la-carte services). Each shared service function should have a single leader accountable for cost allocation.",
    "suggestedFramework": "Profitability framework: Revenue OK (growing above market) → investigate cost structure. SG&A is 30% vs. industry benchmark → above normal. Drill into product line contribution margins (Exhibit 1) → wide dispersion → hypothesis: not all products deserve full service. Segment by contribution margin → reorganize BUs.",
    "interviewerNotes": "Show Exhibit 1 (contribution margin bar chart across 15 product lines, colored by BU). Expected insight: wide margin dispersion AND BUs are mixed across the range — not a clean BU-level problem. Key probe: 'Why is SG&A high?' and 'What would you do about the low-margin product lines?' Push for specific reorganization recommendation.",
    "scoringRubric": {
      "structuring": "Strong: quickly dismisses revenue as the problem and focuses on SG&A; uses product line data to form hypothesis. Weak: tries to improve revenue or cuts COGS without engaging the cost allocation issue.",
      "analytics": "Strong: uses margin chart to classify products and quantifies potential SG&A savings from a tiered service model. Weak: only qualitative observations.",
      "synthesis": "Strong: recommends two-BU reorganization (Specialty vs. Commodity) with specific service level changes and single accountable shared service leaders. Weak: vague 'reduce costs' recommendation."
    }
  },
  {
    "id": "darden_003",
    "source": "Darden",
    "type": "profitability",
    "title": "Hospital Profitability — Revenue Decline After CEO Change",
    "industry": "Healthcare",
    "difficulty": "Hard",
    "context": "A hospital group originally had one main hospital. It then acquired 3 additional hospitals. After the acquisition, overall profits are declining. However, the acquired hospitals have NOT experienced any decline. The main hospital underwent a CEO change: the old CEO was an MD doctor; the new CEO has an MBA and business background. No external market conditions have changed.",
    "keyData": {
      "revenue_structure": "Payments primarily from insurance companies per service",
      "patient_volume": "No change in total patient volume",
      "service_mix_change": "No change in mix of services performed",
      "insurance_mix": "Patient mix shifting: more public insurance, fewer private insurance patients",
      "private_vs_public_reimbursement": "Private insurance pays more than public insurance per service",
      "referral_mechanism": "Private insurance patients are referred by private physicians",
      "hypothesis": "New MBA CEO changed relationships with physicians, reducing referrals of private insurance patients",
      "billing_service_price": "$50,000/year",
      "physician_annual_profit": "$175,000",
      "physician_time_on_billing": "15% of time",
      "physician_revenue": "$425,000/year",
      "roi_of_outsourcing": "70% ROI: saves 15% billing time → 15%/75% × $425K = $85K additional revenue vs $50K cost",
      "physician_profit_increase": "20% (from $175K to $210K)"
    },
    "hiddenInsight": "The revenue decline is caused by a shift in patient insurance mix — fewer private insurance patients (who pay more) and more public insurance patients (who pay less). The root cause is that private physicians are referring fewer patients to the main hospital since the CEO change shifted away from the MD culture they trusted. The fix: rebuild physician relationships by offering a billing outsourcing service the hospital already has. This service generates a 70% ROI for physicians, increasing their profits by 20%, creating a loyalty driver.",
    "suggestedFramework": "Profit tree → revenue decline confirmed → volume same, price per patient declining → patient insurance mix shifting toward public → private patients referred by physicians → physician relationship hypothesis → test with survey → billing service as loyalty tool → ROI calculation.",
    "interviewerNotes": "Phase 1: guide candidate to realize profit decline is in main hospital only. Phase 2: push through revenue decline → patient mix → insurance type → physician referrals. Phase 3: present survey results showing physicians cite complex billing as main frustration. Phase 4: walk through billing service ROI calculation. Provide revenue number ONLY IF candidate specifically asks for it.",
    "scoringRubric": {
      "structuring": "Strong: isolates to main hospital quickly, then drills through revenue → patient mix → insurance type → referral chain. Weak: gets distracted by acquisition or focuses on cost side.",
      "analytics": "Strong: correctly calculates revenue uplift from outsourced billing time (15%/75% × $425K = $85K), ROI (70%), and profit improvement (20%). Weak: misses the time freed = revenue opportunity calculation.",
      "synthesis": "Strong: connects CEO change → physician relationship → referrals → billing service as solution, with ROI numbers. Weak: identifies problem but cannot link to actionable solution."
    }
  },
  {
    "id": "darden_004",
    "source": "Darden",
    "type": "growth",
    "title": "Capital Investment in Nuclear Power Plant",
    "industry": "Utilities / Energy",
    "difficulty": "Hard",
    "context": "A major East Coast regulated electric utility (market cap: $6B) has received a permit to build its first nuclear power plant. The plant would supply 8,760 GWh/year and is expected to operate for 30 years. The utility's current annual demand is 17,000 GWh, partly served by 9,000 GWh from old, dirty coal plants being retired. The plant is to be outsourced at a quoted cost of $7B. Revenue is $80/MWh; variable cost is $10/MWh. Should the utility build the plant?",
    "keyData": {
      "plant_capacity": "8,760 GWh/year",
      "plant_life": "30 years",
      "current_demand": "17,000 GWh/year (flat)",
      "quoted_build_cost": "$7B",
      "client_market_cap": "$6B",
      "revenue_per_mwh": "$80",
      "variable_cost_per_mwh": "$10",
      "annual_contribution": "$613.2M (= 8,760 GWh × 1,000 MWh/GWh × $70/MWh)",
      "cost_overrun_risk": "Technology/engineering ($4B, 50% risk, $800M overrun), Structure ($2B, 50% risk, $600M overrun), Other ($1B, 20% risk, $250M overrun)",
      "expected_total_cost": "$7.75B (= $7B + $400M + $300M + $50M)",
      "breakeven_years": "12.6 years (~13 years)",
      "industry_average_breakeven": "6-7 years"
    },
    "hiddenInsight": "The investment does not make sense. At $7.75B expected cost against a $6B market cap, the investment exceeds the company's entire value — financing will be extremely expensive. The breakeven of ~13 years is roughly double the industry average of 6-7 years. Beyond financials: the company has no nuclear operations expertise, creating significant organizational risk. The client should explore alternative, less capital-intensive generation technologies (gas, renewables) to replace the retiring coal plants.",
    "suggestedFramework": "Capital investment framework: (1) Calculate expected cost including overruns. (2) Calculate annual contribution margin. (3) Calculate breakeven period. (4) Compare to industry benchmarks and company financial capacity. (5) Assess qualitative risks (organizational capability, regulatory, safety).",
    "interviewerNotes": "Phase 1: candidate calculates expected cost with probability-weighted overruns. Phase 2: candidate calculates annual contribution ($70/MWh × 8,760,000 MWh = $613.2M). Phase 3: breakeven = $7.75B/$0.613B = ~13 years. Key probe: 'How does the market cap compare to the investment?' and 'What organizational risks exist?' Reveal market cap ONLY if candidate asks — it's a crucial data point.",
    "scoringRubric": {
      "structuring": "Strong: sets up expected value calculation for cost, then contribution margin, then breakeven — all before recommendation. Weak: skips cost overrun analysis.",
      "analytics": "Strong: correctly converts GWh to MWh for calculation ($70 × 8,760,000 = $613.2M/year), calculates expected cost with probability weighting. Weak: math errors in unit conversion.",
      "synthesis": "Strong: compares breakeven to industry norm, flags market cap vs. investment mismatch, recommends against AND suggests alternatives. Weak: just says 'breakeven is long.'"
    }
  },
  {
    "id": "darden_005",
    "source": "Darden",
    "type": "growth",
    "title": "Thailand Hotel Chain — Revenue Growth Lagging Tourist Growth",
    "industry": "Hospitality / Tourism",
    "difficulty": "Medium",
    "context": "You are working for the CEO of a luxury hotel resort chain in Thailand with 20 hotels evenly spread across major tourist destinations. Tourist growth in Thailand was 6% but the chain's revenue grew only 4%. Both economy and luxury hotel segments show the same 4% revenue growth, making this an industry-wide trend. The CEO wants to understand why revenue growth lags tourist growth and what to do about it.",
    "keyData": {
      "tourist_growth": "6% year-on-year",
      "revenue_growth": "4% (industry-wide, both segments)",
      "revenue_breakdown": "80% room rentals, 20% value-added services (WiFi, laundry, banquet halls)",
      "both_streams_growing_at": "4%",
      "room_rental_analysis": "Tourists at hotels up 6%, but spend per tourist down ~2%",
      "spend_per_tourist_components": "Avg. length of stay × rate per night",
      "rate_per_night": "Unchanged",
      "avg_length_of_stay": "Decreased (industry-wide trend)",
      "customer_segments": "NA/Europe (50% of customers, longer stays), Asia (50% of customers, shorter stays)",
      "root_cause": "Asian tourist numbers growing faster than Western tourists; Asian tourists have shorter average stays due to lower affordability → mix shift toward shorter-stay customers"
    },
    "hiddenInsight": "Revenue growth lags tourist growth because the mix of tourists is shifting toward Asian tourists who have shorter stays and lower per-night spend. While total tourist count grows 6%, Western tourists (who stay longer) are growing slower while Asian tourists (who stay shorter) are growing faster. This creates a mix effect that depresses revenue per tourist and overall revenue growth. Both room rentals and VAS are affected equally since VAS revenue is also correlated with length of stay.",
    "suggestedFramework": "Revenue decomposition: Tourist growth (6%) → Revenue per tourist declining (~2%). Split revenue/tourist: Rate per night (flat) × avg length of stay (declining). Investigate WHY avg. length of stay is declining → customer segmentation (geography) → identify mix shift toward shorter-stay Asian tourists.",
    "interviewerNotes": "Key: candidate must segment by customer geography, not just by family/singles. The insight comes from noticing that Asian tourist share is increasing AND they have shorter average stays. Key probe: 'You know length of stay is declining — is this happening across all customer segments or just some?' Push candidate to ask about geography-based segmentation.",
    "scoringRubric": {
      "structuring": "Strong: correctly decomposes revenue as (tourists × spend/tourist) = (tourists × nights × rate) and identifies length of stay as the variable. Weak: uses room occupancy × rate decomposition which obscures the insight.",
      "analytics": "Strong: calculates the ~2% decline in spend/tourist needed to explain the gap (6% growth → 4% growth). Weak: identifies 'length of stay declining' without quantifying.",
      "synthesis": "Strong: identifies Asian-Western mix shift as root cause, connects VAS decline to same mechanism, recommends monitoring segment mix for early warning. Weak: only says 'length of stay is declining.'"
    }
  },
  {
    "id": "fuqua_001",
    "source": "Fuqua",
    "type": "profitability",
    "title": "Convenience Store Chain — Underpriced Advil",
    "industry": "Retail",
    "difficulty": "Medium",
    "context": "Your client is a major convenience store chain with 5,000 stores in the US and $25B in annual revenues. Over the past year, your team has aggressively cut costs (supplier discounts, labor restructuring, 10% opex reduction) and partners believe there is little room for further cost reduction. How else can you increase profits? Costs are similar across the 4 major chains that control 95% of the market.",
    "keyData": {
      "total_revenue": "$25B",
      "product_segments": "Pain Relievers ($10B, low scan margin), Food & Beverage ($9B, $3B scan margin), Cleaning Products ($0.5B), Other ($2B)",
      "food_bev_price_vs_competitors": "Client charges $1.50/unit vs. competitors at $1.35-$1.45; lowest volume share (~18%)",
      "advil_client_price": "$3.99",
      "advil_competitor_avg_price": "$4.69",
      "motrin_price": "$4.99 (same as competitors)",
      "store_brand_price": "$1.99 (slightly above competitor $1.89)",
      "advil_profit_per_unit": "$0.20 (vs Motrin $0.50, Store Brand $0.70)",
      "advil_market_share": "~44% of client pain reliever sales",
      "advil_price_elasticity": "Very inelastic — customers are brand loyal and companies pay",
      "motrin_advil_substitutability": "Very low — loyal customer bases"
    },
    "hiddenInsight": "The client is underpricing Advil significantly ($3.99 vs. $4.69 industry average) while having the highest market share in Advil. Because Advil customers are highly brand loyal (very low cross-brand substitution) and many are expensed through work, raising the Advil price to match competitors would generate substantial profit with minimal volume loss. The F&B segment is already priced too high relative to competitors and losing volume — do NOT raise prices there. Advil is the lever.",
    "suggestedFramework": "Revenue uplift framework: identify which products/segments have pricing power. Pain Relievers: inelastic demand + brand loyalty + competitor price gap = pricing opportunity. F&B: highest price in market + lowest volume share = no pricing power. Recommend raising Advil price and calculate profit impact.",
    "interviewerNotes": "Guide candidate through exhibits sequentially: Exhibit 1 (total sales and margins by category) → Exhibit 2 (F&B competitive pricing) → Exhibit 3 (pain reliever P&L by brand) → Exhibit 4 (competitor prices) → Exhibit 5 (market share). Don't reveal next exhibit until candidate asks for competitive data. Key probe: 'Why should we consider pain relievers when F&B is our biggest revenue segment?'",
    "scoringRubric": {
      "structuring": "Strong: uses scan margin and price elasticity together to rank segments by pricing opportunity. Weak: focuses on F&B because it's the largest segment.",
      "analytics": "Strong: calculates profit per unit for all three brands, identifies Advil's $0.20/unit vs. potential $0.90/unit at competitor pricing. Weak: only reads exhibits without calculating.",
      "synthesis": "Strong: recommends Advil price increase to $4.69, quantifies profit impact, explicitly avoids F&B price increase. Also explores store-brand mix shift opportunity. Weak: generic 'raise prices' recommendation."
    }
  },
  {
    "id": "fuqua_002",
    "source": "Fuqua",
    "type": "profitability",
    "title": "Euro Seafood Restaurant — Same-Store Sales Decline",
    "industry": "Restaurants / Food Service",
    "difficulty": "Medium",
    "context": "A private equity client recently acquired a leading European seafood restaurant chain with 700 restaurants. Same-store sales (SSS) declined last year. The PE parent has aggressive expectations for improved business performance. How can the client improve SSS? Note: SSS improvement is the metric, not overall revenue growth.",
    "keyData": {
      "number_of_restaurants": 700,
      "sss_declined": true,
      "customer_traffic": "Highly correlated with SSS growth — biggest driver",
      "price_vs_competitors": "Client already priced at a premium",
      "avg_check_size": "Higher than competition",
      "table_configuration": "Mix of 4-seat and 2-seat tables",
      "table_utilization": "~50% utilization of 4-seat tables during peak hours (avg 2 people per 4-seat table)",
      "opportunity": "Splitting one 4-seat table per restaurant into two 2-seaters adds 2 seats per restaurant",
      "calculation": "2 additional seats × 2 peak hours × 2 table turns/hour = 8 additional meals/restaurant/day",
      "total_additional_meals": "8 × 700 = 5,600 meals/day",
      "avg_meal_value": "$50",
      "margin": "30%",
      "additional_daily_profit": "$84,000/day (5,600 × $50 × 30%)",
      "additional_annual_profit": "~$30M/year (× 360 days)"
    },
    "hiddenInsight": "Since price and check size are already at a premium, the only lever to increase SSS is to serve more customers (traffic). The key insight is that 4-seat tables are only 50% utilized — parties of 1 or 2 are turned away or forced to use 4-seat tables inefficiently. By reconfiguring one 4-seat table per restaurant into two 2-seaters, the chain can add ~$30M in annual profit with minimal investment. This is an operations/capacity optimization insight, not a pricing or product insight.",
    "suggestedFramework": "SSS decomposition: Traffic × Average Check. Check size and price already at premium → no room there. Focus on traffic. Traffic = seats filled = capacity utilization × table turns. Analyze table configuration utilization data. Identify opportunity to reconfigure tables. Calculate bottom-line impact.",
    "interviewerNotes": "Show Exhibit 1 (traffic vs. SSS correlation) first. Then Exhibit 2 (competitor pricing) to establish no pricing room. Then Exhibit 3 (table configuration/utilization). When candidate suggests reconfiguring tables, ask 'What is the bottom-line impact of adding 2 seats per restaurant?' Guide: 2 peak hours, 2 table turns/hour per seat, 700 restaurants, $50 avg meal, 30% margin. Let candidate make reasonable assumptions.",
    "scoringRubric": {
      "structuring": "Strong: decomposes SSS into traffic × check, rules out price/check levers first, then focuses on capacity. Weak: immediately focuses on pricing or marketing without consulting data.",
      "analytics": "Strong: correctly calculates ~$30M impact (8 meals × 700 restaurants × $50 × 30% × 360 days). Weak: identifies table reconfiguration but cannot quantify it.",
      "synthesis": "Strong: recommends specific action (reconfigure tables), provides P&L impact, identifies implementation risks (cost of renovation, customer experience). Weak: only suggests 'improve table utilization.'"
    }
  },
  {
    "id": "fuqua_003",
    "source": "Fuqua",
    "type": "profitability",
    "title": "Office Products Co. — Flat Revenue Despite Growing Market",
    "industry": "Office Supplies / E-commerce",
    "difficulty": "Medium",
    "context": "Office Products Co. sells office supplies directly to businesses and consumers via two channels: catalogue and internet. The company had historically grown revenues at 10%/year (CAGR) with 12% operating margins. Over the past two years, revenue growth has been flat and margins are declining. The overall direct market is growing at 7%/year. No new competitors have entered the market, but existing competitors are gaining share.",
    "keyData": {
      "annual_revenue": "$1B (2007)",
      "historical_growth": "10% CAGR",
      "operating_margin": "12%",
      "recent_growth": "Flat (0%)",
      "market_growth": "7%/year",
      "internet_share_of_market": "15% of direct channel in 2007",
      "internet_share_of_client": "8% of client sales in 2007",
      "prospecting_catalogue_circulation": "Declining: 3M in 2002 → 1M in 2007",
      "catalogue_avg_transaction": "~5x higher than internet channel",
      "catalogue_retention_rate": "Higher than internet",
      "root_cause": "Client underinvested in catalogue channel (cutting circulation) while competitors invested in internet; client also lagging internet growth vs. market"
    },
    "hiddenInsight": "The company has been cutting its prospecting catalogue circulation (from 3M to 1M over 5 years) — starving the high-value, high-margin catalogue business. Meanwhile, internet sales, while growing, lag the market and have much lower transaction values (1/5 of catalogue). The company is in a squeeze: losing its most profitable channel through underinvestment while failing to capture internet growth. Fix: reinvest in catalogue to protect the high-value customer base, while developing a strategy to improve internet $/transaction (target small/medium business users online).",
    "suggestedFramework": "Revenue analysis: channels (catalogue vs. internet). For each: volume, price/transaction, growth vs. market. Identify underperformance by channel. Cost analysis: SG&A trends. Competitive analysis: what are competitors doing differently? Recommend channel-specific strategies.",
    "interviewerNotes": "Show Exhibit 1 (market growth trends by channel) and Exhibit 2 (company sales performance). Key insight trigger: declining prospecting catalogue circulation in Exhibit 2. Probe: 'Why is catalogue growth flat if the market is growing?' and 'What is the difference in profitability between catalogue and internet customers?'",
    "scoringRubric": {
      "structuring": "Strong: analyzes channels separately, identifies declining catalogue investment as specific root cause. Weak: focuses on internet channel only since it's 'the future.'",
      "analytics": "Strong: calculates market share loss by channel, identifies 5x transaction value difference between catalogue and internet. Weak: only reads growth rates.",
      "synthesis": "Strong: recommends protecting catalogue (reinvest in circulation) while growing profitable internet customers (target SMBs). Weak: recommends 'invest in internet' without protecting catalogue."
    }
  },
  {
    "id": "fuqua_004",
    "source": "Fuqua",
    "type": "profitability",
    "title": "Scotch Bar Valuation",
    "industry": "Hospitality / F&B",
    "difficulty": "Medium",
    "context": "You are sitting in one of Chicago's oldest scotch bars on a Friday night. Your friend asks you to estimate the value of the bar using a back-of-the-envelope calculation. The bar is located on a busy street, open Tuesday-Sunday (5pm-2am). Max capacity: 100 people. Staff: bartender and two servers. Tax rate: 40%. Discount rate: 13%. Annual cash flow growth rate: 3%.",
    "keyData": {
      "daily_revenue_fri_sat_peak": "$4,800/day",
      "seasonal_adjustments": "Spring/Summer (25 weeks): full; Fall/Winter (25 weeks): 75% of summer for Fri/Sat, 85% for weekdays",
      "total_annual_revenue": "$568,000",
      "variable_costs": "20% of revenue = $113,600",
      "fixed_costs": "$120,000/year",
      "pre_tax_income": "$334,400",
      "after_tax_cash_flow": "$200,400 (~$200K)",
      "perpetuity_formula": "CF / (r - g) = $200K / (13% - 3%) = $200K / 10% = $2M",
      "bar_value": "~$2M"
    },
    "hiddenInsight": "The valuation is a simple perpetuity: after-tax cash flows / (discount rate - growth rate). Key skills tested: (1) building revenue from first principles with seasonal adjustments, (2) correctly categorizing fixed vs. variable costs, (3) applying after-tax adjustment, (4) applying perpetuity formula (not just presenting income). The exhibit provides segmented daily averages that the candidate must piece together.",
    "suggestedFramework": "Valuation = PV of future cash flows. Revenue = daily customers × avg spend × days open × seasonal adjustments. Costs = fixed + variable. Income = Revenue - Costs. After-tax income = Income × (1 - tax rate). Valuation = After-tax CF / (r - g).",
    "interviewerNotes": "Let candidate estimate revenue approach, then show Exhibit 1 (segmented daily averages by season and day type). Challenge the candidate: 'What might drive variation in these numbers?' (answer: weekday/weekend and seasonality). After revenue calculation, push on cost structure — ask candidate to brainstorm fixed vs. variable costs before revealing numbers.",
    "scoringRubric": {
      "structuring": "Strong: immediately frames as DCF/perpetuity problem; organizes revenue by segment before calculating. Weak: gives a point estimate without structuring seasonality.",
      "analytics": "Strong: correctly calculates all segments ($420K + $148K = $568K), applies variable cost, fixed cost, tax, and perpetuity formula. Weak: math errors or misses after-tax step.",
      "synthesis": "Strong: sanity-checks $2M value ('does this seem right for a Chicago bar on a busy street?') and flags key assumptions. Weak: presents $2M without commentary."
    }
  },
  {
    "id": "fuqua_005",
    "source": "Fuqua",
    "type": "market_entry",
    "title": "Napoleon's Pizza — Market Entry Decision",
    "industry": "Food Service / Restaurants",
    "difficulty": "Medium",
    "context": "Napoleon's Pizza is considering entering a new market. The candidate is asked to evaluate whether the market entry makes sense and how to approach it.",
    "keyData": {
      "note": "This case from Fuqua provides a standard market entry framework exercise. The candidate must structure the evaluation across: market attractiveness (size, growth, profitability), competitive landscape, operational feasibility (supply chain, staffing), and financial viability (break-even, IRR). Specific numerical data is provided by the interviewer during the case."
    },
    "hiddenInsight": "Market entry cases should test both qualitative framework and quantitative break-even analysis. Strong candidates immediately identify that the key question is not 'is the market attractive?' but 'can we be profitable and win given our specific capabilities and the competitive response?'",
    "suggestedFramework": "Market Entry framework: (1) Market attractiveness — size, growth, margins. (2) Competitive analysis — who is there, how entrenched, barriers to entry. (3) Our competitive advantage — what do we do better? (4) Implementation — value chain, capex, staffing. (5) Financial analysis — break-even, payback period, IRR vs. hurdle rate.",
    "interviewerNotes": "Push candidate to quantify the market and set up a break-even calculation. Key probe: 'What would need to be true for this to be profitable in year 3?' Ask for specific customer acquisition costs and unit economics.",
    "scoringRubric": {
      "structuring": "Strong: covers all five framework pillars in a logical sequence. Weak: only covers market attractiveness.",
      "analytics": "Strong: sets up unit economics and break-even analysis. Weak: stays qualitative throughout.",
      "synthesis": "Strong: gives a clear go/no-go recommendation with specific conditions. Weak: 'it depends' without specificity."
    }
  },
  {
    "id": "icc_001",
    "source": "ICC",
    "type": "ma",
    "title": "CanadaCo vs USCo — Retail M&A Competitive Threat",
    "industry": "Retail / Discount Stores",
    "difficulty": "Hard",
    "context": "Your client is CanadaCo, the largest discount retailer in Canada with 500 stores, surpassing the second-largest competitor (300 stores) in both market share and profitability for several years. USCo, the largest US discount retailer (4,000 stores in the US), has just bought the second-largest Canadian competitor (300 stores) and plans to convert all stores to USCo. The CEO asks: Should I be worried? How should I react?",
    "keyData": {
      "canadaco_stores": 500,
      "competitor_stores_now_usco": 300,
      "usco_us_stores": 4000,
      "usco_avg_store_size_sqft": 200000,
      "typical_store_sqft": 100000,
      "usco_us_revenue": "$5B",
      "usco_second_competitor_us_revenue": "$1B",
      "usco_cogs_advantage": "~15% lower than US competitors",
      "usco_price_advantage": "~10% lower than US competitors",
      "canadaco_advantage": "Franchise model → better customer service → higher per-store sales",
      "canadaco_distribution_advantage": "~2% cost advantage on distribution vs. USCo",
      "canada_labor_cost": "Higher than US (hurts USCo more than CanadaCo)",
      "canadaco_annual_revenue": "~$750M",
      "sustainable_usco_price_advantage_in_canada": "7-8% lower prices",
      "canadaco_brand_strength": "Strong in Canada; USCo has no brand awareness with Canadian consumers"
    },
    "hiddenInsight": "USCo can leverage its massive buying power (COGS 15% lower) to offer prices ~7-8% below CanadaCo even accounting for higher Canadian distribution and labor costs. In the near term, CanadaCo's brand and service advantage will protect it, but over time consumers will gravitate to persistent 7-8% lower prices. CanadaCo must respond: (1) reduce SKUs to concentrate buying power, (2) launch loyalty program (with awareness that it also rewards already-loyal customers), (3) market service guarantee, (4) exploit Canadian supplier relationships. The franchise model cannot be easily replicated by USCo.",
    "suggestedFramework": "(1) Understand CanadaCo's competitive advantage sources. (2) Map USCo's US strengths (scale, COGS, pricing). (3) Assess transferability to Canada (distribution costs, labor, brand). (4) Calculate sustainable price gap. (5) Identify defensive strategies.",
    "interviewerNotes": "This case rewards systematic competitive benchmarking. Push candidate to quantify the price gap (10% US advantage minus 2-3% Canada cost adjustments = 7-8%). Key probe: 'What is the one thing CanadaCo cannot easily copy from USCo, and what is the one thing USCo cannot easily copy from CanadaCo?' Answer: CanadaCo cannot easily achieve USCo's buying power; USCo cannot easily replicate the franchise model incentive structure.",
    "scoringRubric": {
      "structuring": "Strong: analyzes both companies' competitive advantages before assessing threat. Weak: only analyzes USCo.",
      "analytics": "Strong: calculates 7-8% price gap in Canada. Weak: says 'USCo will be cheaper' without quantification.",
      "synthesis": "Strong: recommends SKU rationalization to improve buying power as primary lever; franchise model as non-replicable moat. Weak: generic suggestions (marketing, loyalty programs) without strategic priority."
    }
  },
  {
    "id": "icc_002",
    "source": "ICC",
    "type": "growth",
    "title": "MedCount — Medical Software Revenue Growth",
    "industry": "Healthcare Technology",
    "difficulty": "Hard",
    "context": "Your client is GenCo, a diversified company. Five years ago it acquired MedCount, which sells administrative software systems to large US hospitals. MedCount has failed to deliver the promised growth. GenCo has already squeezed margins. Now it needs to find new revenue opportunities. How would you approach identifying growth avenues for MedCount?",
    "keyData": {
      "current_market_focus": "Administrative systems for large US hospitals",
      "market_size_admin": "$1,500M",
      "market_growth_admin": "5%/year",
      "market_size_patient_admin": "$1,000M",
      "market_growth_patient_admin": "5%/year",
      "market_size_physician_support": "$1,200M",
      "market_growth_physician_support": "12%/year",
      "medcount_admin_market_share": "$700M / $1,500M = 47%",
      "hcs_software_admin_revenue": "$100M (7% growth)",
      "industry_trends": "Hospital consolidation (3-4 networks = 45% market), cost controls, vendor consolidation, systems upgrades",
      "decision_maker_mismatch": "IT function buys software; Medical staff buy devices — different buyers",
      "physician_support_growth": "12% vs 5% for other segments"
    },
    "hiddenInsight": "MedCount has nearly 47% market share in a mature, 5%-growth administrative systems market — there is little room to grow within that segment. The highest-growth opportunity is physician support systems ($1.2B, 12% growth). Hospital consolidation is driving vendor rationalization — hospitals want fewer vendors, which favors a supplier who can cover multiple software categories. MedCount should expand into physician support via acquisition or partnership, leveraging its existing hospital relationships. However, the different buyer (Medical staff vs. IT) means cross-selling is not automatic.",
    "suggestedFramework": "Market expansion framework: (1) Current market saturation analysis. (2) Adjacent market sizing (patient admin, physician support). (3) Competitive analysis by segment. (4) Customer needs and buying patterns. (5) Capability assessment. (6) Entry strategy (organic, acquisition, partnership).",
    "interviewerNotes": "Reveal market data table when candidate asks about market size. Key probes: 'Which market is most attractive and why?' (physician support — 12% growth) and 'What barriers exist to entering physician support?' (different buyer, specialized knowledge, entrenched competitors). Ask candidate to recommend a specific entry mode.",
    "scoringRubric": {
      "structuring": "Strong: analyzes all three markets systematically against size, growth, and capability fit before recommending. Weak: immediately says 'expand into physician support' without systematic analysis.",
      "analytics": "Strong: calculates MedCount's current admin market share (47%), recognizes saturation, and compares growth rates. Weak: only notes physician support has high growth.",
      "synthesis": "Strong: recommends physician support via acquisition (faster), flags different buyer as implementation risk, suggests using hospital consolidation trend as tailwind. Weak: recommends organic growth into physician support without acknowledging capability gap."
    }
  },
  {
    "id": "dayone_001",
    "source": "DayOne",
    "type": "profitability",
    "title": "Book Publisher — Should We Switch to a No-Return Model?",
    "industry": "Publishing / Retail",
    "difficulty": "Easy",
    "context": "Your client is a Chennai-based book publisher selling to retail book stores and via e-commerce. A major retail store client is suggesting a change to the existing business model. Current model: client sells books to stores at Rs. 20/book; at year-end, buys back unsold books (20% of 10,000 = 2,000 books) at Rs. 20/book and recycles them at Re. 1/book. New model: client sells at Rs. 18/book (10% discount), but the store keeps all unsold books — no buyback. Should the client switch?",
    "keyData": {
      "current_model": {
        "books_sold_to_store": 10000,
        "sale_price": "Rs. 20/book",
        "buyback_rate": "20% (2,000 books)",
        "buyback_price": "Rs. 20/book",
        "recycle_price": "Re. 1/book",
        "manufacturing_cost": "Rs. 10/book",
        "current_revenue": "Rs. 2,02,000",
        "current_cost": "Rs. 1,40,000",
        "current_profit": "Rs. 62,000"
      },
      "new_model": {
        "books_ordered_by_store": "8,000 (store orders less since they bear the risk of leftover)",
        "sale_price": "Rs. 18/book",
        "manufacturing_cost": "Rs. 10/book",
        "new_revenue": "Rs. 1,44,000",
        "new_cost": "Rs. 80,000",
        "new_profit": "Rs. 64,000"
      }
    },
    "hiddenInsight": "The new model is marginally more profitable (Rs. 64,000 vs Rs. 62,000) despite the lower per-unit price. The critical insight that must be identified: the retailer will reduce their order quantity from 10,000 to 8,000 books under the new model because they now bear the full risk of unsold inventory. Candidates who forget to adjust the order quantity will incorrectly conclude the new model is less profitable.",
    "suggestedFramework": "Cost-benefit analysis for both models. Set up: Revenue = units sold × price. Cost = units produced × manufacturing cost + buyback cost - recycle revenue. Key variable: under the new model, the retailer's order quantity changes.",
    "interviewerNotes": "Guide candidate to realize that the store will order fewer books under the new model (since they bear risk). The insight about reduced order quantity (8,000 vs 10,000) should come from the candidate, not the interviewer. If they miss it, hint: 'If you owned the store and had to keep all unsold books, would you order the same amount as before?'",
    "scoringRubric": {
      "structuring": "Strong: immediately sets up profit equations for both models before calculating. Weak: jumps to calculations without structure.",
      "analytics": "Strong: correctly adjusts order quantity to 8,000 for new model, reaches Rs. 64,000 profit. Weak: uses 10,000 books for new model and gets wrong answer.",
      "synthesis": "Strong: recommends switching, states the assumptions, notes the margin is thin so monitor retailer ordering behavior. Weak: just says 'yes, switch' without conditions."
    }
  },
  {
    "id": "dayone_002",
    "source": "DayOne",
    "type": "profitability",
    "title": "Cyclic Menace — Bicycle Manufacturer Profit Decline",
    "industry": "Consumer Goods / Manufacturing",
    "difficulty": "Medium",
    "context": "Your client is a national bicycle manufacturer in India. Profits over the last 6 months have declined. The decline is company-specific (not industry-wide). The client sells two products: Sports Xtreme (Rs. 10,000/unit, 40% margin) and Cycle Supreme (Rs. 3,500/unit, 30% margin). Competitors have similar prices and margins.",
    "keyData": {
      "sports_xtreme_price": "Rs. 10,000",
      "sports_xtreme_margin": "40%",
      "sports_xtreme_2014_units": 10000,
      "sports_xtreme_2015_units": 12000,
      "cycle_supreme_price": "Rs. 3,500",
      "cycle_supreme_margin": "30%",
      "cycle_supreme_2014_units": 80000,
      "cycle_supreme_2015_units": 52000,
      "cost_increase": "Raw material costs increased by ~5% (industry-wide, unavoidable short-term)",
      "revenue_change": "-20%",
      "root_cause": "Recently launched #WeBuildXtreme PR campaign on social media caused brand association to shift entirely to sports cycling, depressing daily-use Cycle Supreme sales"
    },
    "hiddenInsight": "There are two causes: (1) Major: The company's own PR campaign (#WeBuildXtreme) repositioned the brand as a sports-only company, causing the daily-use Cycle Supreme segment (which was 80%+ of unit volume) to collapse. Customers perceive the brand as not for everyday use anymore. (2) Minor: Industry-wide raw material cost increase of ~5%, which cannot be resolved in the short term. The marketing-driven brand damage is the primary and actionable lever.",
    "suggestedFramework": "Profit framework: Revenue declined 20%, costs increased 5%. Revenue breakdown: Sports Xtreme up (12K units), Cycle Supreme down sharply (80K → 52K). Daily use cycle decline → demand-side problem → competitor gain or market drop or brand perception issue → advertising/marketing analysis → recent PR campaign.",
    "interviewerNotes": "Provide the unit sales table upfront. Key probe: 'Your client is a national brand. Why is that important?' Guide candidate toward marketing as the cause. Candidate should notice that Sports Xtreme grew while Cycle Supreme declined — suggest a connection between the sports campaign and the daily-use brand perception.",
    "scoringRubric": {
      "structuring": "Strong: uses revenue first (80-20 rule on Cycle Supreme volume), then drills into demand vs. supply causes, then marketing specifically. Weak: immediately jumps to cost analysis.",
      "analytics": "Strong: calculates revenue impact of Cycle Supreme decline (52K vs 80K units × Rs. 3,500 × 30% margin) to show scale of the problem. Weak: only notes units declined.",
      "synthesis": "Strong: identifies two root causes with different actionability; recommends immediate rebranding to restore dual-brand identity for Cycle Supreme. Weak: recommends 'fix marketing' without specificity."
    }
  },
  {
    "id": "dayone_003",
    "source": "DayOne",
    "type": "market_entry",
    "title": "Care for the Car — Luxury Car Entry into Bangladesh",
    "industry": "Automotive / Luxury Goods",
    "difficulty": "Medium",
    "context": "Your client is a major European luxury car manufacturer considering entering the Bangladeshi market. Bangladesh has seen 5% GDP growth year-on-year. The only current player is Bercedes Menz, which has its own dealership and exports cars from its home country. Bercedes Menz has sold 10,000 cars over 10 years (~1,000 new buyers/year). Your client also recently entered the Vietnamese market 6 months ago. The client wants to break even within 3 years.",
    "keyData": {
      "bercedes_menz_annual_sales": 1000,
      "car_price": "$100,000/car (industry average)",
      "car_lifecycle": "5-6 years",
      "market_size_year_11_onwards": "2,000 buyers/year (1,000 new + 1,000 re-buyers)",
      "assumed_market_share": "50% (1,000 cars/year for client)",
      "revenue_3_years": "$300M (1,000 × $100K × 3)",
      "fixed_costs_3_years": "$8M (land + market entry costs)",
      "variable_cost_per_car": "$96,000 (manufacturing $20K + transport $24K + tax $41.8K + distribution $10.3K)",
      "profit_3_years": "$4M",
      "breakeven_check": "Positive — entry is viable"
    },
    "hiddenInsight": "The entry is marginally profitable ($4M profit over 3 years on $300M revenue). The critical insight that separates strong candidates: recognizing that luxury car buyers re-purchase after the lifecycle ends, so the effective market size from year 11 onwards doubles to 2,000/year. Without accounting for lifecycle re-purchasing, the market analysis is incomplete. Additional risks: price war from Bercedes Menz and potential new entrants attracted by the client's entry.",
    "suggestedFramework": "Market Entry: (1) Competitive analysis (Bercedes Menz model). (2) Market sizing: new buyers + re-buyers (lifecycle). (3) Market share estimate. (4) Cost-benefit analysis: revenue (price × volume × years) vs. fixed + variable costs. (5) Risk assessment.",
    "interviewerNotes": "Key: candidate should ask about car lifecycle and recognize re-buyer opportunity. If they only count 1,000 buyers/year, hint: 'What happens to cars after several years?' After the profitability analysis, ask: 'What risks does your client face?' Expected: price war, new entrants, currency risk.",
    "scoringRubric": {
      "structuring": "Strong: follows structured market entry framework and asks about competitive response. Weak: jumps straight to financials without understanding the competitive landscape.",
      "analytics": "Strong: identifies the lifecycle re-buyer phenomenon and correctly sizes the market at 2,000. Calculates $4M profit over 3 years. Weak: misses the re-buyer calculation or makes arithmetic errors.",
      "synthesis": "Strong: recommends entry, states the marginal profitability clearly, flags risks (price war, new entrants), mentions Vietnam experience as risk reducer. Weak: simple 'yes, profitable' without risk discussion."
    }
  },
  {
    "id": "dayone_004",
    "source": "DayOne",
    "type": "profitability",
    "title": "iScream — Ice Cream Stall in Cricket Stadium",
    "industry": "Food & Beverage / Retail",
    "difficulty": "Medium",
    "context": "Your client is Baskin Robbins, considering whether to set up an ice cream stall at a cricket stadium in Chennai, India. The stall caters to 1/6 of the stadium's capacity (36,000 seats = 6,000 for the stall). The stadium hosts three match types: IPL (premium), Ranji Trophy (free entry), and India international matches. There is one competitor selling plain vanilla softies at Rs. 20/unit; Baskin Robbins sells at Rs. 50/unit. Ignore setup costs. The objective is profitability.",
    "keyData": {
      "stadium_capacity": 36000,
      "stall_capacity_share": "1/6 = 6,000 people",
      "ipl_matches": 10,
      "ipl_occupancy": "~80%",
      "ipl_people_in_catchment": "6,000 × 80% = 4,800",
      "ipl_buyers_pct": "~50% (premium audience, price insensitive)",
      "baskin_robbins_price": "Rs. 50/unit",
      "competitor_price": "Rs. 20/unit (plain vanilla only)",
      "ipl_revenue_estimate": "Rs. 12,00,000 (4,800 × 50% × Rs. 50 × 10 matches)",
      "ranji_occupancy": "Lower, audience more price sensitive",
      "costs": {
        "variable": "Rs. 20/unit production cost",
        "fixed": "Licensing, stall equipment, maintenance, marketing"
      }
    },
    "hiddenInsight": "The stall is profitable primarily because of IPL matches — premium audiences pay Rs. 500 for tickets and are indifferent to Rs. 50 ice cream. The key analytical insight is that you must segment revenue by match type because the customer profiles and price sensitivity differ dramatically. IPL fans are brand premium-seekers; Ranji fans (free entry) are very price sensitive and may prefer the Rs. 20 competitor. The post-entry analysis (expansion strategy, competitive response) earns brownie points.",
    "suggestedFramework": "Profitability check: Revenue = (# people in catchment × % who buy × price) per match type × # matches. Segment by IPL / Ranji / India internationals. Cost analysis: fixed vs. variable. Qualitative assessment of competitive dynamics (Rs. 50 vs Rs. 20 competitor).",
    "interviewerNotes": "Don't rush to calculations. Focus on qualitative reasoning first (why would someone buy Rs. 50 ice cream at a Ranji match vs. IPL?). Only do detailed calculations for IPL. Push candidate to list fixed vs. variable costs without giving numbers. At the end: 'The venture is profitable — anything else to consider before entering?' (licensing, competitive response, expansion to full stadium).",
    "scoringRubric": {
      "structuring": "Strong: segments revenue by match type and justifies different assumptions for each segment. Weak: treats all matches as equivalent.",
      "analytics": "Strong: calculates IPL revenue (~Rs. 12 lakh), lists all cost components, confirms profitability. Weak: only qualitative — cannot quantify.",
      "synthesis": "Strong: recommends entry, addresses post-entry expansion strategy and competitive response from the Rs. 20 vendor. Weak: just confirms profitability without post-entry risks."
    }
  },
  {
    "id": "dayone_005",
    "source": "DayOne",
    "type": "market_entry",
    "title": "Anti-Smoking Pill — India Market Entry and Pricing",
    "industry": "Pharmaceuticals",
    "difficulty": "Hard",
    "context": "A pharmaceutical company has invented an anti-smoking pill: a 4-month course (once daily) with 50% efficacy in helping people quit permanently. It requires a prescription (not OTC). The company wants to know: (1) Should they enter India? (2) What price should they charge? The company needs to break even on a Rs. 100M plant investment within 2 years.",
    "keyData": {
      "pill_course": "4 months = 120 pills",
      "efficacy": "50% of patients quit permanently",
      "variable_cost": "Re. 1/pill",
      "investment": "Rs. 100M plant",
      "india_smokers": "~11M potential customers (urban smokers with doctor access who want to quit and can afford it)",
      "nicotine_patch_price": "Rs. 5/patch/day → Rs. 600 for 4-month course; <1% efficacy",
      "price_by_income_segment": {
        "upper_middle_class": "Rs. 50/pill (Rs. 6,000 course); 5% of smokers (~0.5M)",
        "middle_class": "Rs. 25/pill (Rs. 3,000 course); 25% of smokers (~2.5M)",
        "lower_middle_class": "Rs. 8/pill (Rs. 960 course); 40% of smokers (~4.4M)",
        "bpl": "Rs. 1.2/pill (Rs. 144 course); 30% of smokers (~3.3M)"
      },
      "profit_at_rs25": "Rs. 8,400M (= Rs. 24 margin × 120 days × 3M customers) - Rs. 100M investment",
      "optimal_price": "Rs. 25/pill maximizes profit"
    },
    "hiddenInsight": "The optimal pricing is Rs. 25/pill targeting the middle class segment (~3M customers). This generates Rs. 8,400M profit — the highest of all price points — because the middle class segment is large enough AND can afford the price. Charging Rs. 50 only reaches 0.5M customers; charging Rs. 8 reaches 7.7M but at much lower margin. The deep insight is the value-based pricing framework: segment willingness-to-pay by income, calculate profit at each price point, select the profit-maximizing price.",
    "suggestedFramework": "Market entry: (1) Market sizing (smokers × want-to-quit × doctor access × affordability). (2) Competitive analysis (nicotine patch as proxy). (3) Value-based pricing by income segment. (4) Profit calculation at each price point. (5) Financial check (break-even vs. Rs. 100M investment).",
    "interviewerNotes": "This is an advanced pricing case. Guide the candidate through: (1) Market sizing funnel. (2) Cost-based floor (Rs. 1/pill). (3) Competitor proxy pricing (nicotine patch). (4) Value-based pricing by segment. For value-based pricing: have candidate estimate max willingness-to-pay by income bracket using spending power analysis. Then ask for profit at each price point to identify the optimal price.",
    "scoringRubric": {
      "structuring": "Strong: structures pricing as cost-based floor → competitor reference → value-based ceiling by segment, then optimizes. Weak: only does cost-based or competitor-based pricing.",
      "analytics": "Strong: correctly calculates market size (~11M), profit at each price point, identifies Rs. 25 as profit-maximizing. Weak: calculates market size but cannot do the multi-price profit comparison.",
      "synthesis": "Strong: recommends Rs. 25 price with rationale, acknowledges break-even is easily achieved (Rs. 8,400M >> Rs. 100M), suggests price differentiation strategy (better packaging/flavor for premium segments). Weak: recommends entering without specifying price."
    }
  }
];
