// ── Global State ──────────────────────────────────────────────────────────────
window.APP = {
  apiKey: '',
  userName: 'Candidate',
  currentView: 'dashboard',
  // Direct Anthropic API — no proxy needed
  apiUrl: 'https://api.anthropic.com/v1/messages',
};

// ── LocalStorage Helpers ──────────────────────────────────────────────────────
window.Storage = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem('bcg_' + key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('bcg_' + key, JSON.stringify(value)); } catch (e) { console.warn('Storage error', e); }
  },
  getSessions() { return this.get('sessions', []); },
  saveSession(session) {
    const sessions = this.getSessions();
    sessions.unshift(session);
    if (sessions.length > 50) sessions.length = 50;
    this.set('sessions', sessions);
  }
};

// ── Navigation ────────────────────────────────────────────────────────────────
window.showView = function(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const view = document.getElementById('view-' + viewId);
  if (view) view.classList.add('active');
  const navItem = document.querySelector(`[data-view="${viewId}"]`);
  if (navItem) navItem.classList.add('active');
  APP.currentView = viewId;
  if (viewId === 'dashboard') window.renderDashboard  && window.renderDashboard();
  if (viewId === 'library')   window.renderLibrary    && window.renderLibrary();
  if (viewId === 'history')   window.renderHistory    && window.renderHistory();
  if (viewId === 'practice')  window.showFocusBanner  && window.showFocusBanner();
  if (viewId === 'coach')     window.renderCoachSelect && window.renderCoachSelect();
};

// ── API Call (direct to Anthropic — no proxy) ─────────────────────────────────
window.callClaude = async function(messages, systemPrompt, model = 'claude-haiku-4-5-20251001', maxTokens = 1024) {
  if (!APP.apiKey) {
    showApiKeyModal();
    throw new Error('No API key set. Please enter your Anthropic API key in Settings.');
  }
  const body = { model, max_tokens: maxTokens, system: systemPrompt, messages };

  let res;
  try {
    res = await fetch(APP.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify(body)
    });
  } catch (networkErr) {
    throw new Error(`Network error: ${networkErr.message}. Check your internet connection.`);
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    if (res.status === 401) throw new Error('Invalid API key. Please update it in Settings.');
    if (res.status === 429) throw new Error('Rate limited. Wait a moment and try again.');
    if (res.status === 400) throw new Error(`Bad request: ${errText}`);
    throw new Error(`API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.content[0].text;
};

// ── API Key Modal ─────────────────────────────────────────────────────────────
window.showApiKeyModal = function() {
  const existing = document.getElementById('api-key-modal');
  if (existing) { existing.style.display = 'flex'; return; }

  const modal = document.createElement('div');
  modal.id = 'api-key-modal';
  modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:9999;`;
  modal.innerHTML = `
    <div style="background:#1e2d1a;border:1px solid rgba(0,166,81,0.3);border-radius:16px;padding:32px;max-width:420px;width:90%;">
      <div style="font-size:18px;font-weight:700;color:#e8f0e4;margin-bottom:8px;">API Key Required</div>
      <p style="font-size:13px;color:#8fa887;margin-bottom:20px;line-height:1.7;">
        Get a free key at <strong style="color:#00a651">console.anthropic.com</strong><br>
        → Sign in → API Keys → Create Key (starts with <code style="color:#00a651">sk-ant-</code>)
      </p>
      <input id="modal-key-input" type="password" placeholder="sk-ant-api03-..."
        style="width:100%;background:#243320;border:1px solid rgba(0,166,81,0.3);color:#e8f0e4;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:12px;font-family:monospace;" />
      <div style="display:flex;gap:10px;">
        <button onclick="(()=>{const k=document.getElementById('modal-key-input').value.trim();if(!k)return;APP.apiKey=k;Storage.set('apiKey',k);document.getElementById('api-key-modal').style.display='none';showToast('API key saved!');updateApiStatus();})()"
          style="flex:1;background:#00a651;color:white;border:none;padding:10px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;">
          Save & Continue
        </button>
        <button onclick="document.getElementById('api-key-modal').style.display='none'"
          style="background:#243320;color:#8fa887;border:1px solid rgba(0,166,81,0.2);padding:10px 16px;border-radius:8px;font-size:13px;cursor:pointer;">
          Cancel
        </button>
      </div>
    </div>`;
  document.body.appendChild(modal);
};

// ── API Status Badge (replaces proxy badge) ────────────────────────────────────
window.updateApiStatus = function() {
  const badge = document.getElementById('proxy-status');
  if (!badge) return;
  if (APP.apiKey) {
    badge.textContent = 'API Key: Set ✓';
    badge.className = 'proxy-badge online';
  } else {
    badge.textContent = 'No API Key — click to add';
    badge.className = 'proxy-badge offline';
    badge.style.cursor = 'pointer';
    badge.onclick = showApiKeyModal;
  }
};

// ── Settings ──────────────────────────────────────────────────────────────────
window.initSettings = function() {
  const savedKey  = Storage.get('apiKey', '');
  const savedName = Storage.get('userName', '');
  if (savedKey)  APP.apiKey   = savedKey;
  if (savedName) APP.userName = savedName;

  const nameEl = document.getElementById('settings-name');
  const keyEl  = document.getElementById('settings-key');
  if (nameEl) nameEl.value = APP.userName;
  if (keyEl)  keyEl.value  = APP.apiKey ? '•'.repeat(20) + APP.apiKey.slice(-4) : '';

  document.getElementById('save-settings')?.addEventListener('click', () => {
    const name     = nameEl.value.trim();
    const keyInput = document.getElementById('settings-key-real').value.trim();
    if (name)     { APP.userName = name;     Storage.set('userName', name); }
    if (keyInput) { APP.apiKey   = keyInput; Storage.set('apiKey', keyInput); }
    showToast('Settings saved!');
    if (keyEl) keyEl.value = APP.apiKey ? '•'.repeat(20) + APP.apiKey.slice(-4) : '';
    document.getElementById('settings-key-real').value = '';
    updateApiStatus();
  });

  document.getElementById('clear-data')?.addEventListener('click', () => {
    if (confirm('Delete all session history? This cannot be undone.')) {
      Storage.set('sessions', []);
      showToast('Session history cleared.');
      renderDashboard();
    }
  });
};

// ── Toast Notification ────────────────────────────────────────────────────────
window.showToast = function(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show ' + type;
  setTimeout(() => t.classList.remove('show'), 3500);
};

// ── Boot ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSettings();
  updateApiStatus();

  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => showView(el.dataset.view));
  });

  const hasKey = Storage.get('apiKey', '');
  if (!hasKey) {
    showView('dashboard'); // show dashboard first so UI is visible
    setTimeout(showApiKeyModal, 400); // then prompt for key
  } else {
    showView('dashboard');
  }

  window.renderDashboard && window.renderDashboard();
});
