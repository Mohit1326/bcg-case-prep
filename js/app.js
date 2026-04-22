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
  },
  getCoachSessions() { return this.get('coachSessions', []); },
  saveCoachSession(session) {
    const all = this.getCoachSessions();
    all.unshift(session);
    if (all.length > 30) all.length = 30;
    this.set('coachSessions', all);
  },
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

  // ── Export / Import JSON ──────────────────────────────────────────────────
  document.getElementById('export-history')?.addEventListener('click', () => {
    const sessions = Storage.getSessions();
    if (!sessions.length) { showToast('No sessions to export.', 'error'); return; }
    const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), sessions }, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `bcg-history-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${sessions.length} sessions.`);
  });

  document.getElementById('import-history-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data     = JSON.parse(ev.target.result);
        const incoming = data.sessions || data; // accept bare array too
        if (!Array.isArray(incoming)) throw new Error('Invalid format');
        const existing = Storage.getSessions();
        // Merge: deduplicate by session id or startTime
        const existingIds = new Set(existing.map(s => s.id || s.startTime));
        const merged = [...incoming.filter(s => !existingIds.has(s.id || s.startTime)), ...existing];
        merged.sort((a, b) => new Date(b.startTime || 0) - new Date(a.startTime || 0));
        if (merged.length > 200) merged.length = 200;
        Storage.set('sessions', merged);
        showToast(`Imported ${incoming.length} sessions (${merged.length} total).`);
        renderDashboard && renderDashboard();
      } catch (err) {
        showToast('Import failed — invalid file.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // allow re-import of same file
  });

  // ── GitHub Gist Sync ──────────────────────────────────────────────────────
  const gistPatEl  = document.getElementById('gist-pat');
  const gistStatus = document.getElementById('gist-status');

  // Load saved PAT
  if (gistPatEl) {
    const savedPat = Storage.get('gistPat', '');
    if (savedPat) gistPatEl.value = '•'.repeat(16) + savedPat.slice(-4);
  }

  const _getGistPat = () => {
    const raw = gistPatEl?.value.trim() || '';
    // If it's the masked version, return stored PAT instead
    if (raw.startsWith('•')) return Storage.get('gistPat', '');
    if (raw) { Storage.set('gistPat', raw); } // save new real value
    return raw || Storage.get('gistPat', '');
  };

  const _setGistStatus = (msg, ok = true) => {
    if (gistStatus) { gistStatus.textContent = msg; gistStatus.style.color = ok ? 'var(--green)' : '#e05252'; }
  };

  const GIST_FILENAME = 'bcg-case-prep-history.json';
  const GIST_DESC     = 'BCG Case Prep — session history sync';

  document.getElementById('gist-save')?.addEventListener('click', async () => {
    const pat = _getGistPat();
    if (!pat) { _setGistStatus('Enter your GitHub PAT first.', false); return; }
    const sessions = Storage.getSessions();
    if (!sessions.length) { _setGistStatus('No sessions to save.', false); return; }

    _setGistStatus('Saving…');
    try {
      // Check if gist already exists
      const savedGistId = Storage.get('gistId', '');
      const payload = { description: GIST_DESC, public: false, files: { [GIST_FILENAME]: { content: JSON.stringify({ version: 1, savedAt: new Date().toISOString(), sessions }, null, 2) } } };

      let res;
      if (savedGistId) {
        res = await fetch(`https://api.github.com/gists/${savedGistId}`, {
          method: 'PATCH',
          headers: { Authorization: `token ${pat}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch('https://api.github.com/gists', {
          method: 'POST',
          headers: { Authorization: `token ${pat}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const gist = await res.json();
      Storage.set('gistId', gist.id);
      _setGistStatus(`✓ Saved ${sessions.length} sessions to Gist (id: ${gist.id.slice(0,8)}…)`);
      showToast('History saved to GitHub Gist!');
    } catch (err) {
      _setGistStatus(`Save failed: ${err.message}`, false);
      showToast('Gist save failed.', 'error');
    }
  });

  document.getElementById('gist-load')?.addEventListener('click', async () => {
    const pat = _getGistPat();
    if (!pat) { _setGistStatus('Enter your GitHub PAT first.', false); return; }

    _setGistStatus('Loading…');
    try {
      // Try saved gist ID first, else search by description
      let gistId = Storage.get('gistId', '');
      if (!gistId) {
        const listRes = await fetch('https://api.github.com/gists', { headers: { Authorization: `token ${pat}` } });
        if (!listRes.ok) throw new Error(`GitHub API ${listRes.status}`);
        const gists = await listRes.json();
        const match = gists.find(g => g.description === GIST_DESC && g.files[GIST_FILENAME]);
        if (!match) { _setGistStatus('No saved history found in your Gists.', false); return; }
        gistId = match.id;
        Storage.set('gistId', gistId);
      }

      const gistRes = await fetch(`https://api.github.com/gists/${gistId}`, { headers: { Authorization: `token ${pat}` } });
      if (!gistRes.ok) throw new Error(`GitHub API ${gistRes.status}`);
      const gist    = await gistRes.json();
      const raw     = gist.files[GIST_FILENAME]?.content;
      if (!raw) throw new Error('File not found in Gist');
      const data     = JSON.parse(raw);
      const incoming = data.sessions || data;
      if (!Array.isArray(incoming)) throw new Error('Invalid format');

      // Merge with existing local sessions
      const existing    = Storage.getSessions();
      const existingIds = new Set(existing.map(s => s.id || s.startTime));
      const merged      = [...incoming.filter(s => !existingIds.has(s.id || s.startTime)), ...existing];
      merged.sort((a, b) => new Date(b.startTime || 0) - new Date(a.startTime || 0));
      if (merged.length > 200) merged.length = 200;
      Storage.set('sessions', merged);

      _setGistStatus(`✓ Loaded ${incoming.length} sessions (${merged.length} total after merge).`);
      showToast('History loaded from GitHub Gist!');
      renderDashboard && renderDashboard();
    } catch (err) {
      _setGistStatus(`Load failed: ${err.message}`, false);
      showToast('Gist load failed.', 'error');
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
