// ── Interview State Machine ────────────────────────────────────────────────────
window.Interview = (function() {
  const STAGES = ['setup', 'clarifying', 'structuring', 'analysis', 'synthesis'];
  const STAGE_LABELS = {
    setup:       'Case Setup',
    clarifying:  'Clarifying Questions',
    structuring: 'Structure Your Approach',
    analysis:    'Deep-Dive Analysis',
    synthesis:   'Final Recommendation'
  };
  const STAGE_HINTS = {
    setup:       'Read the case. Ask 1–2 clarifying questions to understand scope.',
    clarifying:  'Ask sharp, targeted questions. Aim for 2–3 max. Then say "I\'m ready to structure."',
    structuring: 'State your hypothesis first. Then lay out your MECE framework.',
    analysis:    'Dig into the numbers. Prioritise the biggest levers. Do the math.',
    synthesis:   'Give your recommendation. Situation → Insight → Action → Risk.'
  };

  // How many candidate messages per stage before auto-advancing
  const STAGE_MESSAGE_THRESHOLDS = {
    setup: 2,
    clarifying: 4,
    structuring: 3,
    analysis: 8,
  };

  let state = {
    stage: null,
    caseObj: null,
    messages: [],
    transcript: [],
    startTime: null,
    stageStartTimes: {},
    stageMsgCounts: { setup:0, clarifying:0, structuring:0, analysis:0, synthesis:0 },
    isTyping: false,
  };

  // ── Speech Recognition ────────────────────────────────────────────────────
  const Speech = (function() {
    let recognition = null;
    let active = false;
    // FIX: Track only NEW speech added since mic was last turned on.
    // We store a "base" (what was in textarea when mic started) separately
    // from "newSpeech" (only what was spoken this session).
    // On render: textarea = base + newSpeech.
    // On start: base = current textarea value (user's manually-edited version), newSpeech = ''.
    // This means manual deletions are respected and never re-added.
    let base = '';
    let newSpeech = '';

    function supported() {
      return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    }

    function init() {
      if (!supported()) return false;
      if (recognition) { try { recognition.abort(); } catch(e){} }
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SR();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';
      recognition.maxAlternatives = 1;

      recognition.onresult = (e) => {
        let interimChunk = '';
        // Rebuild newSpeech from scratch using only final results in this session
        // to avoid index drift issues on restart
        let finalChunk = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript;
          if (e.results[i].isFinal) {
            finalChunk += t + ' ';
          } else {
            interimChunk += t;
          }
        }
        if (finalChunk) newSpeech += finalChunk;
        const interim = document.getElementById('interim-text');
        if (interim) interim.textContent = interimChunk;
        const input = document.getElementById('input-text');
        // Combine: base the user already had + new speech this session
        if (input) input.value = (base + newSpeech).trim();
      };

      recognition.onerror = (e) => {
        if (e.error === 'not-allowed') {
          showToast('Microphone access denied. Allow mic in browser settings.', 'error');
          setMicState(false);
          active = false;
        } else if (e.error !== 'no-speech' && e.error !== 'aborted') {
          console.warn('Speech error:', e.error);
        }
      };

      recognition.onend = () => {
        if (active) {
          try { recognition.start(); } catch(e) { /* already starting */ }
        } else {
          setMicState(false);
        }
      };
      return true;
    }

    function start() {
      // FIX: Snapshot current textarea as the base.
      // New speech appends AFTER this — manual edits are preserved.
      const inputEl = document.getElementById('input-text');
      base = inputEl ? inputEl.value.trim() : '';
      newSpeech = '';
      // Clear interim
      const interim = document.getElementById('interim-text');
      if (interim) interim.textContent = '';
      active = true;
      setMicState(true);
      try { recognition?.start(); } catch(e) { init(); recognition?.start(); }
    }

    function stop() {
      active = false;
      setMicState(false);
      try { recognition?.stop(); } catch(e) {}
      const interim = document.getElementById('interim-text');
      if (interim) interim.textContent = '';
      const inputEl = document.getElementById('input-text');
      return inputEl ? inputEl.value.trim() : (base + newSpeech).trim();
    }

    // Called after send — full reset
    function reset() {
      base = '';
      newSpeech = '';
      const inputEl = document.getElementById('input-text');
      if (inputEl) inputEl.value = '';
      const interim = document.getElementById('interim-text');
      if (interim) interim.textContent = '';
      // If mic is still active, re-anchor to blank
      if (active) {
        try { recognition?.stop(); } catch(e) {}
        // onend will restart it with empty base
      }
    }

    function isActive() { return active; }

    // FIX: Proper two-state mic button — red = recording, idle = off
    function setMicState(on) {
      const btn = document.getElementById('mic-btn');
      const indicator = document.getElementById('mic-indicator');
      if (!btn || !indicator) return;
      if (on) {
        btn.classList.add('active');
        btn.title = 'Mic ON — click to stop (or hold Space)';
        indicator.classList.add('pulsing');
        indicator.style.background = '#ef5350';
      } else {
        btn.classList.remove('active');
        btn.title = 'Click to speak (or hold Space)';
        indicator.classList.remove('pulsing');
        indicator.style.background = '';
      }
    }

    return { init, start, stop, reset, isActive, supported };
  })();

  // ── Interviewer Voice (Text-to-Speech) ───────────────────────────────────
  const Voice = (function() {
    let enabled = true;
    let speaking = false;
    let preferredVoice = null;

    // Pick the best available voice — prefer a clear English voice
    function pickVoice() {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return null;
      // Priority order: Daniel (UK), Google UK English Male, Samantha, any en-IN, en-GB, en-US
      const priorities = [
        v => v.name === 'Daniel',
        v => v.name.includes('Google UK English Male'),
        v => v.name.includes('Google UK English Female'),
        v => v.name === 'Samantha',
        v => v.lang === 'en-IN',
        v => v.lang === 'en-GB',
        v => v.lang.startsWith('en-US') && !v.name.includes('Zira'),
        v => v.lang.startsWith('en'),
      ];
      for (const fn of priorities) {
        const match = voices.find(fn);
        if (match) return match;
      }
      return voices[0];
    }

    // Voices load async — try once now, re-pick on voiceschanged
    if (window.speechSynthesis) {
      preferredVoice = pickVoice();
      window.speechSynthesis.onvoiceschanged = () => { preferredVoice = pickVoice(); };
    }

    function speak(text) {
      if (!enabled || !window.speechSynthesis) return;
      // Cancel any in-flight speech
      window.speechSynthesis.cancel();
      // Strip markdown-ish chars that sound awkward when spoken
      const clean = text
        .replace(/---/g, '. ')
        .replace(/[*_`#]/g, '')
        .replace(/\n+/g, ' ')
        .trim();
      const utt = new SpeechSynthesisUtterance(clean);
      if (!preferredVoice) preferredVoice = pickVoice();
      if (preferredVoice) utt.voice = preferredVoice;
      utt.rate  = 0.95;   // slightly measured — interview pace
      utt.pitch = 1.0;
      utt.volume = 1.0;
      utt.onstart = () => { speaking = true; };
      utt.onend   = () => { speaking = false; };
      utt.onerror = () => { speaking = false; };
      window.speechSynthesis.speak(utt);
    }

    function stop() {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      speaking = false;
    }

    function toggle() {
      enabled = !enabled;
      if (!enabled) stop();
      const btn = document.getElementById('voice-btn');
      if (btn) {
        btn.textContent = enabled ? '🔊' : '🔇';
        btn.title = enabled ? 'Interviewer voice ON — click to mute' : 'Interviewer voice OFF — click to unmute';
        btn.classList.toggle('active', enabled);
      }
      showToast(enabled ? 'Interviewer voice ON' : 'Interviewer voice muted');
    }

    function isSpeaking() { return speaking; }
    function isEnabled()  { return enabled;  }

    return { speak, stop, toggle, isSpeaking, isEnabled };
  })();

  // ── System Prompts — Socratic, never prescriptive ─────────────────────────
  function buildSystemPrompt(stage, caseObj) {
    const base = `You are a BCG India partner conducting a LIVE case interview for a Senior Associate 2 candidate.

CASE: ${caseObj.title} (${caseObj.type})
CONTEXT GIVEN TO CANDIDATE: ${caseObj.context}

DATA YOU CAN SHARE (ONLY when candidate specifically asks for it):
${Object.entries(caseObj.keyData).map(([k,v]) => `- ${k}: ${v}`).join('\n')}

════════════════════════════════════════════════
CRITICAL INTERVIEWER RULES — NEVER BREAK THESE:
════════════════════════════════════════════════
1. NEVER give the answer, solution, or framework to the candidate. Not even hints.
2. NEVER say things like "you should look at X" or "consider Y" or "the key issue is Z".
3. Instead, ask PROBING QUESTIONS that make the candidate think harder:
   - "What does that tell you?"
   - "So what would you do with that information?"
   - "Which of those buckets is most important and why?"
   - "Walk me through your math on that."
   - "What are you assuming there?"
   - "What would change your answer?"
4. If candidate is on the right track, push deeper: "Good — what next?"
5. If candidate is off track, redirect with: "Let's step back — what's the core question here?"
6. NEVER evaluate or score mid-interview. No "great point!" or "exactly right!"
7. Keep ALL responses to 1-3 sentences maximum. Be terse. This is an interview, not a lecture.
8. Share data ONLY when the candidate asks a specific question that requires it.`;

    const stageInstructions = {
      setup: `
CURRENT STAGE: Case Setup
You have just read the case to the candidate. Wait for them to respond.
If they ask a clarifying question, answer briefly using available data only.
If they seem unsure how to start, ask: "What's your first reaction to this situation?"
Do NOT prompt them to structure yet — let them lead.`,

      clarifying: `
CURRENT STAGE: Clarifying Questions
Candidate should ask targeted questions to gather missing data.
Answer each question ONLY from the available data above.
If they ask something not in the data, say "Assume [reasonable number]."
After they've asked 2-3 questions, if they keep asking, probe: "You have enough to start — what's your hypothesis?"
Do NOT suggest what questions they should ask.`,

      structuring: `
CURRENT STAGE: Framework / Structure
Listen to their framework silently. Do NOT fill in their gaps.
When they finish, ask exactly ONE of:
  - "What's your hypothesis going into this?"
  - "Which of these buckets do you think matters most?"
  - "Walk me through your logic for that structure."
After they answer, say: "Okay. Take me into [the most relevant bucket they named]."
Do NOT validate their framework or tell them it's correct.`,

      analysis: `
CURRENT STAGE: Deep-Dive Analysis
This is the meat of the case. Be an active, challenging interviewer.
- When they ask for data: provide it from the available data above.
- When they do calculations: let them finish, then ask "What does that number tell you?"
- When they make an assertion: push back with "How do you know that?" or "What's the evidence?"
- When they find something interesting: ask "So what? What would you do about it?"
- When they get stuck: ask "What information would help you move forward?"
NEVER volunteer data they haven't asked for.
NEVER confirm they've found the right answer mid-case.`,

      synthesis: `
CURRENT STAGE: Final Recommendation
Let the candidate speak uninterrupted for their recommendation.
When they finish, ask EXACTLY ONE challenge question, such as:
  - "What's the biggest risk to your recommendation?"
  - "How confident are you — what would change your mind?"
  - "Your client's CEO pushes back and says [plausible objection] — what do you say?"
After their response, say: "Thank you. That concludes our case today."`,
    };

    return base + (stageInstructions[stage] || '');
  }

  // ── Stage Auto-Advance ────────────────────────────────────────────────────
  // Two mechanisms: keyword triggers + message count thresholds
  function detectStageAdvance(userText) {
    if (!state.stage || state.stage === 'synthesis') return;

    const t = userText.toLowerCase();
    const idx = STAGES.indexOf(state.stage);

    // Keyword triggers (explicit signals from candidate)
    const keywordMap = {
      setup:       ['i want to clarify', 'can i ask', 'before i structure', 'a few questions', 'clarify'],
      clarifying:  ['my framework', 'my approach', 'i would structure', 'let me structure', 'ready to structure', 'i think the key', 'the main issue', 'hypothesis'],
      structuring: ['let me dig into', 'drilling down', 'looking at the data', 'the numbers show', 'if we look at', 'let\'s analyse', 'let me calculate', 'the math'],
      analysis:    ['my recommendation', 'in summary', 'to summarize', 'final recommendation', 'i would recommend', 'to conclude', 'the answer is', 'i believe the solution'],
    };

    const triggers = keywordMap[state.stage] || [];
    const keywordHit = triggers.some(kw => t.includes(kw));

    // Message count threshold — advance if conversation has progressed enough
    state.stageMsgCounts[state.stage] = (state.stageMsgCounts[state.stage] || 0) + 1;
    const threshold = STAGE_MESSAGE_THRESHOLDS[state.stage] || 999;
    const countHit = state.stageMsgCounts[state.stage] >= threshold;

    if (keywordHit || countHit) {
      advanceStage();
    }
  }

  function advanceStage() {
    const idx = STAGES.indexOf(state.stage);
    if (idx < STAGES.length - 1) {
      state.stage = STAGES[idx + 1];
      state.stageStartTimes[state.stage] = Date.now();
      state.stageMsgCounts[state.stage] = 0;
      updateStageUI();
      addToTranscript('system', `— ${STAGE_LABELS[state.stage]} —`);
      // Notify timer of stage change
      if (window.CaseTimer) CaseTimer.onStageChange(state.stage);
    }
  }

  // ── Core Send ─────────────────────────────────────────────────────────────
  function startCase(caseObj) {
    state = {
      stage: 'setup',
      caseObj,
      messages: [],
      transcript: [],
      startTime: Date.now(),
      stageStartTimes: { setup: Date.now() },
      stageMsgCounts: { setup:0, clarifying:0, structuring:0, analysis:0, synthesis:0 },
      isTyping: false,
    };
    renderInterviewUI();
    Speech.init();
    updateStageUI();
    // Start case timer
    if (window.CaseTimer) {
      CaseTimer.start();
      CaseTimer.onStageChange('setup');
    }
    const openingText = `Good morning. Here's your case.\n\n---\n\n${caseObj.context}\n\n---\n\nTake a moment to read through it. When you're ready, go ahead.`;
    addToTranscript('interviewer', openingText);
    Voice.speak(`Good morning. Here's your case. ${caseObj.context}. Take a moment to read through it. When you're ready, go ahead.`);
  }

  async function sendMessage(text) {
    if (!text.trim() || state.isTyping) return;
    state.isTyping = true;

    Speech.reset(); // clear buffer BEFORE disabling btn
    document.getElementById('send-btn').disabled = true;
    addToTranscript('candidate', text);

    state.messages.push({ role: 'user', content: text });
    const contextMessages = state.messages.slice(-16);

    try {
      showTypingIndicator(true);
      const systemPrompt = buildSystemPrompt(state.stage, state.caseObj);
      const response = await callClaude(contextMessages, systemPrompt, 'claude-haiku-4-5-20251001', 300);
      showTypingIndicator(false);
      state.messages.push({ role: 'assistant', content: response });
      addToTranscript('interviewer', response);
      Voice.speak(response);
      detectStageAdvance(text);
    } catch (err) {
      showTypingIndicator(false);
      addToTranscript('system', `Error: ${err.message}`);
    }

    state.isTyping = false;
    document.getElementById('send-btn').disabled = false;
  }

  // ── End Case & Score ──────────────────────────────────────────────────────
  async function endCase() {
    if (!state.caseObj) return;
    const endBtn = document.getElementById('end-case-btn');
    if (endBtn) { endBtn.disabled = true; endBtn.textContent = 'Scoring...'; }

    addToTranscript('system', '— Scoring your performance... —');

    // Stop voice and timer
    Voice.stop();
    const timingSummary = window.CaseTimer ? CaseTimer.stop() : null;

    const fullTranscript = state.transcript
      .filter(t => t.role !== 'system')
      .map(t => `${t.role.toUpperCase()}: ${t.text}`)
      .join('\n\n');

    try {
      const result = await window.Scoring.scoreSession(state.caseObj, fullTranscript);
      const session = {
        id: 'sess_' + Date.now(),
        timestamp: Date.now(),
        caseType: state.caseObj.type,
        caseTitle: state.caseObj.title,
        scores: result.scores,
        overall: result.overall,
        verdict: result.verdict,
        durationMinutes: timingSummary ? Math.round(timingSummary.totalMins) : Math.round((Date.now() - state.startTime) / 60000),
        feedback: result,
        transcript: fullTranscript,
        caseContext: state.caseObj.context,
        caseId: state.caseObj.id,
        timingSummary,
      };
      Storage.saveSession(session);
      window.Scoring.displayResults(result, session);

      // Generate solution debrief in background — show spinner on debrief tab
      const debriefBadge = document.getElementById('debrief-loading-badge');
      if (debriefBadge) debriefBadge.style.display = 'inline';
      window.Scoring.generateDebrief(state.caseObj, fullTranscript)
        .then(debrief => {
          window.Scoring.displayDebrief(debrief);
          if (debriefBadge) debriefBadge.style.display = 'none';
          // Update saved session with debrief
          const sessions = Storage.getSessions();
          if (sessions[0]?.id === session.id) { sessions[0].debrief = debrief; Storage.set('sessions', sessions); }
        })
        .catch(err => {
          if (debriefBadge) { debriefBadge.textContent = 'failed'; debriefBadge.style.background = 'rgba(239,83,80,0.2)'; debriefBadge.style.color = '#ef5350'; }
          const spinner = document.getElementById('debrief-spinner');
          if (spinner) spinner.innerHTML = `<p style="color:#ef5350;font-size:13px;">Debrief generation failed: ${err.message}</p>`;
          console.error('Debrief error:', err);
        });

    } catch (err) {
      addToTranscript('system', `Scoring error: ${err.message}`);
      if (endBtn) { endBtn.disabled = false; endBtn.textContent = 'End & Score'; }
    }
  }

  // ── UI Helpers ────────────────────────────────────────────────────────────
  function addToTranscript(role, text) {
    state.transcript.push({ role, text, time: Date.now() });
    const feed = document.getElementById('transcript-feed');
    if (!feed) return;
    const el = document.createElement('div');
    el.className = `message ${role}`;
    el.innerHTML = `<span class="role-label">${role === 'interviewer' ? 'Interviewer' : role === 'candidate' ? 'You' : ''}</span><p>${text.replace(/\n/g,'<br>').replace(/---/g,'<hr>')}</p>`;
    feed.appendChild(el);
    feed.scrollTop = feed.scrollHeight;
  }

  function showTypingIndicator(show) {
    const el = document.getElementById('typing-indicator');
    if (el) el.style.display = show ? 'flex' : 'none';
  }

  function updateStageUI() {
    STAGES.forEach((s, i) => {
      const el = document.getElementById(`stage-${s}`);
      if (!el) return;
      el.classList.remove('active','completed','upcoming');
      const cur = STAGES.indexOf(state.stage);
      if (i < cur) el.classList.add('completed');
      else if (i === cur) el.classList.add('active');
      else el.classList.add('upcoming');
    });
    const hint = document.getElementById('stage-hint');
    if (hint) hint.textContent = STAGE_HINTS[state.stage] || '';
    const label = document.getElementById('current-stage-label');
    if (label) label.textContent = STAGE_LABELS[state.stage] || '';
    const endBtn = document.getElementById('end-case-btn');
    if (endBtn) endBtn.style.display = state.stage === 'synthesis' ? 'inline-flex' : 'none';
  }

  function renderInterviewUI() {
    document.getElementById('interview-active').style.display = 'flex';
    document.getElementById('case-select-screen').style.display = 'none';
    document.getElementById('results-panel').style.display = 'none';
    document.getElementById('transcript-feed').innerHTML = '';
  }

  // ── Event Wiring ──────────────────────────────────────────────────────────
  function wireEvents() {
    document.getElementById('send-btn')?.addEventListener('click', () => {
      const text = document.getElementById('input-text').value.trim();
      if (text) sendMessage(text);
    });

    document.getElementById('input-text')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const text = e.target.value.trim();
        if (text) sendMessage(text);
      }
    });

    // FIX: Toggle mic properly — one click on, next click off
    document.getElementById('mic-btn')?.addEventListener('click', () => {
      if (!Speech.supported()) {
        showToast('Speech not supported. Use Chrome or Edge.', 'error');
        return;
      }
      if (Speech.isActive()) {
        Speech.stop();
      } else {
        Speech.start();
      }
    });

    // Spacebar push-to-talk (only when not typing in a field)
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target.id !== 'input-text' && e.target.tagName !== 'INPUT' && APP.currentView === 'practice') {
        if (!Speech.isActive()) { e.preventDefault(); Speech.start(); }
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.code === 'Space' && APP.currentView === 'practice') {
        if (Speech.isActive()) Speech.stop();
      }
    });

    document.getElementById('voice-btn')?.addEventListener('click', Voice.toggle);

    document.getElementById('end-case-btn')?.addEventListener('click', endCase);

    document.getElementById('advance-stage-btn')?.addEventListener('click', advanceStage);

    document.getElementById('new-case-btn')?.addEventListener('click', () => {
      Speech.stop();
      document.getElementById('interview-active').style.display = 'none';
      document.getElementById('case-select-screen').style.display = 'flex';
      document.getElementById('results-panel').style.display = 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', wireEvents);

  return { startCase, STAGE_LABELS, STAGES };
})();
