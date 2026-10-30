/**
 * Full Stack Development Laboratory Manual Reader
 * Supporting Labs 4, 5, 6, 7, and 8
 */

document.addEventListener('DOMContentLoaded', () => {
  initLabTabs();
  initThemeToggle();
  initCopyButtons();
  initFontControls();
  initLab4Demo();
  initLab6Demo();
  initLab7Demo();
  initLab8Demo();
});

/* ==========================================================================
   1. Tab Navigation for Lab 4, 5, 6, 7, 8
   ========================================================================== */

function initLabTabs() {
  const tabButtons = document.querySelectorAll('.lab-tab-btn');
  const panels = document.querySelectorAll('.lab-panel');
  const validTargets = ['lab4', 'lab5', 'lab6', 'lab7', 'lab8'];

  function switchLab(targetId) {
    if (!validTargets.includes(targetId)) {
      targetId = 'lab4';
    }

    tabButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-target') === targetId;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    panels.forEach(panel => {
      const isTarget = panel.id === `panel-${targetId}`;
      panel.classList.toggle('active', isTarget);
      if (isTarget) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });

    // Update URL hash without jumping
    if (history.pushState) {
      history.pushState(null, null, `#${targetId}`);
    } else {
      location.hash = `#${targetId}`;
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      switchLab(target);
      const panel = document.getElementById(`panel-${target}`);
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Handle URL hash on initial load
  const currentHash = window.location.hash.replace('#', '');
  if (validTargets.includes(currentHash)) {
    switchLab(currentHash);
  }

  // Handle back/forward navigation
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (validTargets.includes(hash)) {
      switchLab(hash);
    }
  });
}

/* ==========================================================================
   2. Theme Toggle (Light / Dark / System)
   ========================================================================== */

function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');

  function getResolvedScheme() {
    const currentMeta = metaColorScheme ? metaColorScheme.content : 'light dark';
    if (currentMeta === 'dark') return 'dark';
    if (currentMeta === 'light') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateButtonLabel() {
    const resolved = getResolvedScheme();
    if (themeLabel) {
      themeLabel.textContent = resolved === 'dark' ? 'Dark' : 'Light';
    }
  }

  if (toggleBtn && metaColorScheme) {
    toggleBtn.addEventListener('click', () => {
      const currentResolved = getResolvedScheme();
      const targetScheme = currentResolved === 'dark' ? 'light' : 'dark';
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      if (targetScheme === systemPreference) {
        try {
          localStorage.removeItem('color-scheme');
        } catch (e) {}
        metaColorScheme.content = 'light dark';
      } else {
        try {
          localStorage.setItem('color-scheme', targetScheme);
        } catch (e) {}
        metaColorScheme.content = targetScheme;
      }
      updateButtonLabel();
    });

    updateButtonLabel();

    // Listen to storage sync from other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'color-scheme') {
        metaColorScheme.content = e.newValue || 'light dark';
        updateButtonLabel();
      }
    });
  }
}

/* ==========================================================================
   3. Copy Code Snippet Support
   ========================================================================== */

function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-clipboard');
      const codeElement = document.getElementById(targetId);
      if (!codeElement) return;

      const codeText = codeElement.innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        const originalText = btn.textContent;
        btn.textContent = 'Copied! ✓';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    });
  });
}

/* ==========================================================================
   4. Reader Font Size Controls
   ========================================================================== */

function initFontControls() {
  let currentScale = 16;
  const minScale = 14;
  const maxScale = 22;

  const btnDec = document.getElementById('btnFontDec');
  const btnReset = document.getElementById('btnFontReset');
  const btnInc = document.getElementById('btnFontInc');

  if (btnDec && btnReset && btnInc) {
    btnDec.addEventListener('click', () => {
      if (currentScale > minScale) {
        currentScale -= 1;
        document.documentElement.style.setProperty('--base-font-size', `${currentScale}px`);
      }
    });

    btnReset.addEventListener('click', () => {
      currentScale = 16;
      document.documentElement.style.setProperty('--base-font-size', '16px');
    });

    btnInc.addEventListener('click', () => {
      if (currentScale < maxScale) {
        currentScale += 1;
        document.documentElement.style.setProperty('--base-font-size', `${currentScale}px`);
      }
    });
  }
}

/* ==========================================================================
   5. Lab 4 Interactive Demo (Form Validation)
   ========================================================================== */

function initLab4Demo() {
  window.handleLab4DemoSubmit = function(e) {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('demo4_name');
    const email = document.getElementById('demo4_email');
    const password = document.getElementById('demo4_pass');
    const confirmPassword = document.getElementById('demo4_confirm');
    const phone = document.getElementById('demo4_phone');
    const successBanner = document.getElementById('demo4_success');

    // Reset error messages
    document.querySelectorAll('.live-error').forEach(el => el.textContent = '');
    if (successBanner) successBanner.style.display = 'none';

    // 1. Name validation (min 3 chars)
    if (name.value.trim().length < 3) {
      document.getElementById('demo4_name_err').textContent = 'Name must be at least 3 characters.';
      isValid = false;
    }

    // 2. Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      document.getElementById('demo4_email_err').textContent = 'Enter a valid email address.';
      isValid = false;
    }

    // 3. Password length validation (min 8)
    if (password.value.length < 8) {
      document.getElementById('demo4_pass_err').textContent = 'Password must be at least 8 characters.';
      isValid = false;
    }

    // 4. Confirm Password Match
    if (password.value !== confirmPassword.value || confirmPassword.value === '') {
      document.getElementById('demo4_confirm_err').textContent = 'Passwords do not match.';
      isValid = false;
    }

    // 5. Phone validation (exact 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.value)) {
      document.getElementById('demo4_phone_err').textContent = 'Enter a valid 10-digit phone number.';
      isValid = false;
    }

    if (isValid && successBanner) {
      successBanner.textContent = '✓ Validation Success! All form checks passed (as specified in manual).';
      successBanner.style.display = 'block';
    }

    return false;
  };

  window.resetLab4Demo = function() {
    const form = document.getElementById('liveDemoForm4');
    if (form) form.reset();
    document.querySelectorAll('.live-error').forEach(el => el.textContent = '');
    const successBanner = document.getElementById('demo4_success');
    if (successBanner) successBanner.style.display = 'none';
  };
}

/* ==========================================================================
   6. Lab 5 Simulator (Props update)
   ========================================================================== */

window.updateStudentCardPreview = function() {
  const nameInput = document.getElementById('propStudentName');
  const deptInput = document.getElementById('propStudentDept');
  const nameDisplay = document.getElementById('simCardName');
  const deptDisplay = document.getElementById('simCardDept');

  if (nameDisplay && nameInput) {
    nameDisplay.textContent = nameInput.value || 'Student Name';
  }
  if (deptDisplay && deptInput) {
    deptDisplay.textContent = `Department: ${deptInput.value || 'Department'}`;
  }
};

/* ==========================================================================
   7. Lab 6 Interactive Demo (Counter & Todo List useState)
   ========================================================================== */

let counterState = 0;
let todosState = ['Read Experiment 5', 'Practice React Hooks'];

function initLab6Demo() {
  renderLiveTodoList();

  window.handleCounterChange = function(action) {
    const display = document.getElementById('liveCounterValue');
    if (!display) return;

    if (action === 'inc') {
      counterState += 1;
    } else if (action === 'dec') {
      counterState -= 1;
    } else if (action === 'reset') {
      counterState = 0;
    }
    display.textContent = counterState;
  };

  window.handleAddTodo = function() {
    const input = document.getElementById('liveTodoInput');
    if (!input) return;
    const taskText = input.value.trim();
    if (taskText) {
      todosState = [...todosState, taskText];
      input.value = '';
      renderLiveTodoList();
    }
  };

  window.handleRemoveTodo = function(index) {
    todosState = todosState.filter((_, i) => i !== index);
    renderLiveTodoList();
  };
}

function renderLiveTodoList() {
  const listElement = document.getElementById('liveTodoList');
  if (!listElement) return;

  listElement.innerHTML = '';
  if (todosState.length === 0) {
    listElement.innerHTML = '<li style="color: var(--text-muted); font-style: italic;">No tasks yet. Add one above!</li>';
    return;
  }

  todosState.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${escapeHTML(todo)}</span>
      <button type="button" onclick="handleRemoveTodo(${idx})" aria-label="Remove ${escapeHTML(todo)}">Remove</button>
    `;
    listElement.appendChild(li);
  });
}

/* ==========================================================================
   8. Lab 7 Interactive Demo (React API Integration / Axios Simulator)
   ========================================================================== */

function initLab7Demo() {
  window.fetchLiveUsers = async function(isError) {
    const container = document.getElementById('lab7DemoContainer');
    if (!container) return;

    container.innerHTML = '<p style="color: var(--brand-accent); font-weight: 600;">Loading...</p>';

    const targetUrl = isError 
      ? 'https://jsonplaceholder.typicode.com/invalid-users-endpoint-simulate-error'
      : 'https://jsonplaceholder.typicode.com/users';

    try {
      const res = await fetch(targetUrl);
      if (!res.ok) {
        throw new Error('Failed to fetch data.');
      }
      const users = await res.json();
      
      let html = '<div class="browser-window" style="margin-top: 10px;">';
      html += '<div class="browser-bar"><span class="browser-dot red"></span><span class="browser-dot yellow"></span><span class="browser-dot green"></span><span class="browser-url">React App Output</span></div>';
      html += '<div class="browser-body"><h2>User List</h2><div class="api-user-grid">';
      
      users.forEach(user => {
        html += `
          <div class="api-user-item">
            <strong>${escapeHTML(user.name)}</strong> | ${escapeHTML(user.email)} | ${escapeHTML(user.address?.city || 'Unknown')}
          </div>
        `;
      });
      html += '</div></div></div>';
      container.innerHTML = html;
    } catch (err) {
      container.innerHTML = '<div class="browser-window" style="margin-top: 10px;"><div class="browser-body"><p style="color: var(--brand-danger); font-weight: bold;">Failed to fetch data.</p></div></div>';
    }
  };
}

/* ==========================================================================
   9. Lab 8 Interactive Demo (Node.js HTTP Server Simulator)
   ========================================================================== */

function initLab8Demo() {
  window.simulateNodeRequest = function(method, url) {
    const postBodyContainer = document.getElementById('postBodyContainer');
    const badge = document.getElementById('serverStatusBadge');
    const bodyBox = document.getElementById('serverResponseBody');

    // Update active button state
    document.querySelectorAll('.route-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    if (event && event.currentTarget) {
      event.currentTarget.classList.add('active');
    }

    if (method === 'POST') {
      if (postBodyContainer) postBodyContainer.style.display = 'block';
      sendCustomPostRequest();
      return;
    } else {
      if (postBodyContainer) postBodyContainer.style.display = 'none';
    }

    if (method === 'GET' && url === '/') {
      badge.className = 'status-badge status-200';
      badge.textContent = '200 OK';
      bodyBox.textContent = JSON.stringify({ message: 'Welcome to Node.js Server!' }, null, 2);
    } else if (method === 'GET' && url === '/about') {
      badge.className = 'status-badge status-200';
      badge.textContent = '200 OK';
      bodyBox.textContent = JSON.stringify({ course: 'Full Stack Development', lab: 'Node.js Server' }, null, 2);
    } else {
      badge.className = 'status-badge status-404';
      badge.textContent = '404 Not Found';
      bodyBox.textContent = JSON.stringify({ error: 'Route not found' }, null, 2);
    }
  };

  window.sendCustomPostRequest = function() {
    const textarea = document.getElementById('postBodyText');
    const badge = document.getElementById('serverStatusBadge');
    const bodyBox = document.getElementById('serverResponseBody');

    let parsed = {};
    try {
      parsed = JSON.parse(textarea.value);
    } catch (e) {
      parsed = { error: 'Invalid JSON entered in client' };
    }

    badge.className = 'status-badge status-200';
    badge.textContent = '200 OK';
    bodyBox.textContent = JSON.stringify({ received: parsed }, null, 2);
  };
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
