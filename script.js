/**
 * Full Stack Development Laboratory Manual Reader
 * Supporting All 15 Experiments (CMR University 4CSPL2021)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLabTabs();
  initCategoryFilters();
  initThemeToggle();
  initCopyButtons();
  initFontControls();
  initLab4Demo();
  initLab6Demo();
  initLab7Demo();
  initLab8Demo();
  initLab9Demo();
  initLab10Demo();
  initLab11Demo();
  initLab12Demo();
  initLab13Demo();
  initLab14Demo();
  initLab15Demo();
});

/* ==========================================================================
   1. Tab Navigation for all 15 Experiments
   ========================================================================== */

const ALL_LAB_IDS = Array.from({ length: 15 }, (_, i) => `lab${i + 1}`);

function initLabTabs() {
  const tabButtons = document.querySelectorAll('.lab-tab-btn');
  const panels = document.querySelectorAll('.lab-panel');
  const quickSelect = document.getElementById('quickLabSelect');

  window.switchLab = function(targetId) {
    if (!ALL_LAB_IDS.includes(targetId)) {
      targetId = 'lab1';
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

    // Sync quick-select dropdown
    if (quickSelect && quickSelect.value !== targetId) {
      quickSelect.value = targetId;
    }

    // Update URL hash without jumping
    if (history.pushState) {
      history.pushState(null, null, `#${targetId}`);
    } else {
      location.hash = `#${targetId}`;
    }
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      window.switchLab(target);
      const panel = document.getElementById(`panel-${target}`);
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Handle quick select dropdown
  if (quickSelect) {
    quickSelect.addEventListener('change', (e) => {
      window.switchLab(e.target.value);
      const panel = document.getElementById(`panel-${e.target.value}`);
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Handle URL hash on initial load
  const currentHash = window.location.hash.replace('#', '');
  if (ALL_LAB_IDS.includes(currentHash)) {
    window.switchLab(currentHash);
  } else {
    window.switchLab('lab1');
  }

  // Handle browser back/forward navigation
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (ALL_LAB_IDS.includes(hash)) {
      window.switchLab(hash);
    }
  });
}

/* ==========================================================================
   2. Category Filter Bar (Web, React, Node, DB, All)
   ========================================================================== */

function initCategoryFilters() {
  const pills = document.querySelectorAll('.cat-pill');
  const buttons = document.querySelectorAll('.lab-tab-btn');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      buttons.forEach(btn => {
        const cat = btn.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          btn.classList.remove('is-hidden');
        } else {
          btn.classList.add('is-hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   3. Theme Toggle (Light / Dark / System)
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

    window.addEventListener('storage', (e) => {
      if (e.key === 'color-scheme') {
        metaColorScheme.content = e.newValue || 'light dark';
        updateButtonLabel();
      }
    });
  }
}

/* ==========================================================================
   4. Copy Code Snippet Support
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
   5. Reader Font Size Controls
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
   6. Lab 2 Simulator: Viewport width
   ========================================================================== */

window.setLab2Viewport = function(width) {
  const container = document.getElementById('lab2ViewportContainer');
  const grid = document.getElementById('lab2GridArea');
  if (!container || !grid) return;

  container.style.width = width;
  if (width === '480px') {
    grid.style.gridTemplateColumns = '1fr';
  } else {
    grid.style.gridTemplateColumns = '1fr 1fr';
  }
};

/* ==========================================================================
   7. Lab 3 Simulator: DOM Manipulation
   ========================================================================== */

window.simLab3Add = function() {
  const input = document.getElementById('simLab3Input');
  const list = document.getElementById('simLab3List');
  if (!input || !list || !input.value.trim()) return;

  const li = document.createElement('li');
  li.style.cssText = "padding: 10px 14px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;";
  
  const span = document.createElement('span');
  span.textContent = input.value.trim();

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.style.cssText = "background: var(--brand-danger-bg); color: var(--brand-danger); border: 1px solid var(--brand-danger); padding: 4px 8px; border-radius: 4px; cursor: pointer;";
  delBtn.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(delBtn);
  list.appendChild(li);
  input.value = '';
};

window.simLab3Modify = function() {
  const items = document.querySelectorAll('#simLab3List li span');
  items.forEach(span => {
    span.textContent = span.textContent.toUpperCase();
  });
};

/* ==========================================================================
   8. Lab 4 Demo: Form Validation
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

    document.querySelectorAll('#panel-lab4 .live-error').forEach(el => el.textContent = '');
    if (successBanner) successBanner.style.display = 'none';

    if (name.value.trim().length < 3) {
      document.getElementById('demo4_name_err').textContent = 'Name must be at least 3 characters.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      document.getElementById('demo4_email_err').textContent = 'Enter a valid email address.';
      isValid = false;
    }

    if (password.value.length < 8) {
      document.getElementById('demo4_pass_err').textContent = 'Password must be at least 8 characters.';
      isValid = false;
    }

    if (password.value !== confirmPassword.value || confirmPassword.value === '') {
      document.getElementById('demo4_confirm_err').textContent = 'Passwords do not match.';
      isValid = false;
    }

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
    document.querySelectorAll('#panel-lab4 .live-error').forEach(el => el.textContent = '');
    const successBanner = document.getElementById('demo4_success');
    if (successBanner) successBanner.style.display = 'none';
  };
}

/* ==========================================================================
   9. Lab 5 Simulator: Props update
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
   10. Lab 6 Demo: Counter & Todo List useState
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
   11. Lab 7 Demo: React API Integration / Axios Simulator
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
      
      users.slice(0, 8).forEach(user => {
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
   12. Lab 8 Demo: Node.js HTTP Server Simulator
   ========================================================================== */

function initLab8Demo() {
  window.simulateNodeRequest = function(method, url) {
    const postBodyContainer = document.getElementById('postBodyContainer');
    const badge = document.getElementById('serverStatusBadge');
    const bodyBox = document.getElementById('serverResponseBody');

    document.querySelectorAll('#panel-lab8 .route-btn').forEach(btn => {
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

/* ==========================================================================
   13. Lab 9 Demo: Node.js File System Simulator
   ========================================================================== */

let vfsState = {
  fileExists: true,
  content: "Student 1: Rohit Kumar\nStudent 2: Ananya Sharma\n",
  tempRenamed: false
};

function initLab9Demo() {
  updateVfsDisplay();

  window.executeFsAction = function(action) {
    const logBox = document.getElementById('vfsConsoleLog');
    if (!logBox) return;

    if (action === 'write') {
      vfsState.fileExists = true;
      vfsState.content = "Student 1: Rohit Kumar\nStudent 2: Ananya Sharma\n";
      logBox.textContent = "File written successfully.";
      updateVfsDisplay();
    } else if (action === 'read') {
      if (vfsState.fileExists) {
        logBox.textContent = "File Content:\n" + vfsState.content;
      } else {
        logBox.textContent = "Error: ENOENT: no such file or directory, open 'students.txt'";
      }
    } else if (action === 'append') {
      if (!vfsState.fileExists) {
        vfsState.fileExists = true;
        vfsState.content = "";
      }
      vfsState.content += "Student 3: Vikram Rao\n";
      logBox.textContent = "Data appended successfully.";
      updateVfsDisplay();
    } else if (action === 'delete') {
      if (vfsState.fileExists) {
        vfsState.fileExists = false;
        vfsState.content = "";
        logBox.textContent = "File deleted successfully.";
      } else {
        logBox.textContent = "Error: File does not exist (fs.access returned non-zero code).";
      }
      updateVfsDisplay();
    } else if (action === 'rename') {
      vfsState.tempRenamed = true;
      logBox.textContent = "File renamed successfully.\n(temp.txt -> renamed_temp.txt)";
    }
  };

  window.resetFsSimulator = function() {
    vfsState = {
      fileExists: true,
      content: "Student 1: Rohit Kumar\nStudent 2: Ananya Sharma\n",
      tempRenamed: false
    };
    const logBox = document.getElementById('vfsConsoleLog');
    if (logBox) logBox.textContent = "Simulator reset. File restored.";
    updateVfsDisplay();
  };
}

function updateVfsDisplay() {
  const contentEl = document.getElementById('vfsFileContent');
  const stateEl = document.getElementById('vfsFileState');

  if (contentEl && stateEl) {
    if (vfsState.fileExists) {
      stateEl.textContent = "File exists";
      stateEl.style.color = "var(--brand-accent)";
      contentEl.textContent = vfsState.content || "(empty file)";
    } else {
      stateEl.textContent = "File deleted (does not exist)";
      stateEl.style.color = "var(--brand-danger)";
      contentEl.textContent = "(no file on disk)";
    }
  }
}

/* ==========================================================================
   14. Lab 10 Demo: Express.js Routing and Middleware Simulator
   ========================================================================== */

function initLab10Demo() {
  window.triggerExpressDemo = function(routeType) {
    const btnHome = document.getElementById('btnExpRouteHome');
    const btnParam = document.getElementById('btnExpRouteParam');
    const btnQuery = document.getElementById('btnExpRouteQuery');
    const paramControls = document.getElementById('expressParamControls');
    const queryControls = document.getElementById('expressQueryControls');
    const urlLabel = document.getElementById('expCurrentUrlLabel');
    const responseBody = document.getElementById('expResponseBody');
    const loggerWindow = document.getElementById('expressLoggerWindow');

    if (!btnHome || !btnParam || !btnQuery) return;

    btnHome.classList.remove('active');
    btnParam.classList.remove('active');
    btnQuery.classList.remove('active');

    let currentUrl = '';
    let responseObj = {};

    if (routeType === 'home') {
      btnHome.classList.add('active');
      paramControls.style.display = 'none';
      queryControls.style.display = 'none';
      currentUrl = '/';
      responseObj = { message: 'Welcome to Express.js Lab!' };
    } else if (routeType === 'param') {
      btnParam.classList.add('active');
      paramControls.style.display = 'block';
      queryControls.style.display = 'none';
      const studentId = document.getElementById('expStudentIdInput')?.value || '101';
      currentUrl = `/students/${encodeURIComponent(studentId)}`;
      responseObj = { studentId: studentId, message: 'Student details fetched' };
    } else if (routeType === 'query') {
      btnQuery.classList.add('active');
      paramControls.style.display = 'none';
      queryControls.style.display = 'block';
      const name = document.getElementById('expQueryName')?.value || 'Rohit';
      const dept = document.getElementById('expQueryDept')?.value || 'CSE';
      currentUrl = `/search?name=${encodeURIComponent(name)}&dept=${encodeURIComponent(dept)}`;
      responseObj = { search: { name: name, dept: dept }, message: 'Search results' };
    }

    urlLabel.textContent = `Endpoint: GET http://localhost:3001${currentUrl}`;
    responseBody.textContent = JSON.stringify(responseObj, null, 2);

    if (loggerWindow) {
      const logLine = document.createElement('div');
      logLine.className = 'log-entry';
      logLine.textContent = `GET ${currentUrl} - ${new Date().toISOString()}`;
      loggerWindow.appendChild(logLine);
      loggerWindow.scrollTop = loggerWindow.scrollHeight;
    }
  };
}

/* ==========================================================================
   15. Lab 11 Demo: Express RESTful CRUD API Simulator
   ========================================================================== */

let lab11Students = [
  { id: 1, name: "Rohit Kumar", dept: "CSE" },
  { id: 2, name: "Ananya Sharma", dept: "ISE" }
];

function initLab11Demo() {
  window.simLab11 = function(action) {
    const titleEl = document.getElementById('lab11EndpointTitle');
    const badgeEl = document.getElementById('lab11StatusCode');
    const jsonEl = document.getElementById('lab11ResponseJSON');
    if (!titleEl || !badgeEl || !jsonEl) return;

    if (action === 'getAll') {
      titleEl.textContent = 'Endpoint: GET /students';
      badgeEl.className = 'status-badge status-200';
      badgeEl.textContent = '200 OK';
      jsonEl.textContent = JSON.stringify(lab11Students, null, 2);
    } else if (action === 'getOne') {
      titleEl.textContent = 'Endpoint: GET /students/1';
      const found = lab11Students.find(s => s.id === 1);
      if (found) {
        badgeEl.className = 'status-badge status-200';
        badgeEl.textContent = '200 OK';
        jsonEl.textContent = JSON.stringify(found, null, 2);
      } else {
        badgeEl.className = 'status-badge status-404';
        badgeEl.textContent = '404 Not Found';
        jsonEl.textContent = JSON.stringify({ message: 'Student not found' }, null, 2);
      }
    } else if (action === 'create') {
      titleEl.textContent = 'Endpoint: POST /students';
      const newS = { id: lab11Students.length + 1, name: "Vikram Rao", dept: "CSE" };
      lab11Students.push(newS);
      badgeEl.className = 'status-badge status-200';
      badgeEl.textContent = '201 Created';
      jsonEl.textContent = JSON.stringify(newS, null, 2);
    } else if (action === 'update') {
      titleEl.textContent = 'Endpoint: PUT /students/1';
      const s = lab11Students.find(item => item.id === 1);
      if (s) {
        s.name = "Rohit K (Updated)";
        badgeEl.className = 'status-badge status-200';
        badgeEl.textContent = '200 OK';
        jsonEl.textContent = JSON.stringify(s, null, 2);
      }
    } else if (action === 'delete') {
      titleEl.textContent = 'Endpoint: DELETE /students/2';
      lab11Students = lab11Students.filter(item => item.id !== 2);
      badgeEl.className = 'status-badge status-200';
      badgeEl.textContent = '200 OK';
      jsonEl.textContent = JSON.stringify({ message: "Student deleted successfully" }, null, 2);
    } else if (action === 'reset') {
      lab11Students = [
        { id: 1, name: "Rohit Kumar", dept: "CSE" },
        { id: 2, name: "Ananya Sharma", dept: "ISE" }
      ];
      titleEl.textContent = 'Endpoint: Reset to Initial';
      badgeEl.className = 'status-badge status-200';
      badgeEl.textContent = '200 OK';
      jsonEl.textContent = JSON.stringify(lab11Students, null, 2);
    }
  };
}

/* ==========================================================================
   16. Lab 12 Demo: MongoDB Shell CRUD Simulator
   ========================================================================== */

let lab12Docs = [
  { _id: "6724fa1", student_id: 1, name: "Rohit Kumar", dept: "CSE", marks: 85 },
  { _id: "6724fa2", student_id: 2, name: "Ananya Sharma", dept: "ISE", marks: 90 },
  { _id: "6724fa3", student_id: 3, name: "Vikram Rao", dept: "CSE", marks: 78 }
];

function initLab12Demo() {
  window.simLab12 = function(action) {
    const titleEl = document.getElementById('lab12CmdTitle');
    const outEl = document.getElementById('lab12DocOutput');
    if (!titleEl || !outEl) return;

    if (action === 'insert') {
      titleEl.textContent = 'Command: db.students.insertMany([...])';
      outEl.textContent = JSON.stringify({
        acknowledged: true,
        insertedIds: { 0: "6724fa1", 1: "6724fa2", 2: "6724fa3" }
      }, null, 2);
    } else if (action === 'findAll') {
      titleEl.textContent = 'Command: db.students.find().pretty()';
      outEl.textContent = JSON.stringify(lab12Docs, null, 2);
    } else if (action === 'findFilter') {
      titleEl.textContent = 'Command: db.students.find({ dept: "CSE" })';
      const filtered = lab12Docs.filter(d => d.dept === "CSE");
      outEl.textContent = JSON.stringify(filtered, null, 2);
    } else if (action === 'update') {
      titleEl.textContent = 'Command: db.students.updateOne({ student_id: 1 }, { $set: { marks: 92 } })';
      const target = lab12Docs.find(d => d.student_id === 1);
      if (target) target.marks = 92;
      outEl.textContent = JSON.stringify({ acknowledged: true, modifiedCount: 1, matchedCount: 1 }, null, 2);
    } else if (action === 'delete') {
      titleEl.textContent = 'Command: db.students.deleteOne({ student_id: 3 })';
      lab12Docs = lab12Docs.filter(d => d.student_id !== 3);
      outEl.textContent = JSON.stringify({ acknowledged: true, deletedCount: 1 }, null, 2);
    } else if (action === 'reset') {
      lab12Docs = [
        { _id: "6724fa1", student_id: 1, name: "Rohit Kumar", dept: "CSE", marks: 85 },
        { _id: "6724fa2", student_id: 2, name: "Ananya Sharma", dept: "ISE", marks: 90 },
        { _id: "6724fa3", student_id: 3, name: "Vikram Rao", dept: "CSE", marks: 78 }
      ];
      titleEl.textContent = 'Command: db.students.find() [Reset]';
      outEl.textContent = JSON.stringify(lab12Docs, null, 2);
    }
  };
}

/* ==========================================================================
   17. Lab 13 Demo: Mongoose ODM Simulator
   ========================================================================== */

let lab13Students = [
  { _id: "6724a1b8c", student_id: 1, name: "Rohit Kumar", dept: "CSE", marks: 85 },
  { _id: "6724a1b8d", student_id: 2, name: "Ananya Sharma", dept: "ISE", marks: 90 }
];

function initLab13Demo() {
  window.simLab13 = function(action) {
    const titleEl = document.getElementById('lab13ActionTitle');
    const badgeEl = document.getElementById('lab13Badge');
    const outEl = document.getElementById('lab13CodeOutput');
    if (!titleEl || !badgeEl || !outEl) return;

    if (action === 'save') {
      titleEl.textContent = 'Mongoose Method: const s = new Student(...); await s.save();';
      const newObj = { _id: "6724a1b8e", student_id: 3, name: "Vikram Rao", dept: "CSE", marks: 88 };
      lab13Students.push(newObj);
      badgeEl.className = 'status-badge status-200';
      badgeEl.textContent = '201 Created';
      outEl.textContent = JSON.stringify(newObj, null, 2);
    } else if (action === 'find') {
      titleEl.textContent = 'Mongoose Method: await Student.find()';
      badgeEl.className = 'status-badge status-200';
      badgeEl.textContent = '200 OK';
      outEl.textContent = JSON.stringify(lab13Students, null, 2);
    } else if (action === 'update') {
      titleEl.textContent = 'Mongoose Method: await Student.findByIdAndUpdate(id, { marks: 95 }, { new: true })';
      if (lab13Students.length > 0) {
        lab13Students[0].marks = 95;
        badgeEl.className = 'status-badge status-200';
        badgeEl.textContent = '200 OK';
        outEl.textContent = JSON.stringify(lab13Students[0], null, 2);
      }
    } else if (action === 'delete') {
      titleEl.textContent = 'Mongoose Method: await Student.findByIdAndDelete(id)';
      if (lab13Students.length > 1) {
        lab13Students.pop();
        badgeEl.className = 'status-badge status-200';
        badgeEl.textContent = '200 OK';
        outEl.textContent = JSON.stringify({ message: "Deleted successfully" }, null, 2);
      }
    } else if (action === 'valError') {
      titleEl.textContent = 'Mongoose Schema Validation (marks: 120 violates max: 100)';
      badgeEl.className = 'status-badge status-404';
      badgeEl.textContent = '400 Bad Request';
      outEl.textContent = JSON.stringify({
        name: "ValidationError",
        message: "Student validation failed: marks: Path `marks` (120) is more than maximum allowed value (100)."
      }, null, 2);
    }
  };
}

/* ==========================================================================
   18. Lab 14 Demo: JWT Authentication Flow Simulator
   ========================================================================== */

let lab14GeneratedToken = "";

function initLab14Demo() {
  window.simLab14 = function(action) {
    const titleEl = document.getElementById('lab14ActionTitle');
    const badgeEl = document.getElementById('lab14Badge');
    const outEl = document.getElementById('lab14CodeOutput');
    if (!titleEl || !badgeEl || !outEl) return;

    if (action === 'register') {
      titleEl.textContent = 'Step 1: POST /register (bcrypt hash 10 salt rounds)';
      badgeEl.className = 'status-badge status-200';
      badgeEl.textContent = '201 Created';
      outEl.textContent = JSON.stringify({
        message: "User registered successfully",
        user: {
          username: "rohitkumar",
          email: "rohit@cmr.edu.in",
          passwordHash: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQOEG6L5C5v8K3k9uM6u6"
        }
      }, null, 2);
    } else if (action === 'login') {
      titleEl.textContent = 'Step 2: POST /login (bcrypt.compare + jwt.sign)';
      lab14GeneratedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." + btoa(JSON.stringify({ id: "6724user1", exp: Math.floor(Date.now() / 1000) + 3600 })) + ".s4mpL3S1gn4tur3K3y9918237";
      badgeEl.className = 'status-badge status-200';
      badgeEl.textContent = '200 OK';
      outEl.textContent = JSON.stringify({
        token: lab14GeneratedToken,
        expiresIn: "1h"
      }, null, 2);
    } else if (action === 'profileWithToken') {
      titleEl.textContent = 'Step 3: GET /profile with Authorization: Bearer <JWT>';
      if (!lab14GeneratedToken) {
        badgeEl.className = 'status-badge status-404';
        badgeEl.textContent = '401 Unauthorized';
        outEl.textContent = JSON.stringify({ message: "No token provided. Click '2. POST /login' first." }, null, 2);
      } else {
        badgeEl.className = 'status-badge status-200';
        badgeEl.textContent = '200 OK';
        outEl.textContent = JSON.stringify({
          message: "Access granted",
          userId: "6724user1",
          email: "rohit@cmr.edu.in",
          authType: "Stateless JWT"
        }, null, 2);
      }
    } else if (action === 'profileNoToken') {
      titleEl.textContent = 'Step 4: GET /profile without Authorization Header';
      badgeEl.className = 'status-badge status-404';
      badgeEl.textContent = '401 Unauthorized';
      outEl.textContent = JSON.stringify({
        message: "No token provided"
      }, null, 2);
    }
  };
}

/* ==========================================================================
   19. Lab 15 Demo: MERN Stack Architecture Simulator
   ========================================================================== */

function initLab15Demo() {
  window.simLab15 = function(action) {
    const titleEl = document.getElementById('lab15StepTitle');
    const badgeEl = document.getElementById('lab15Badge');
    const outEl = document.getElementById('lab15OutputBox');
    if (!titleEl || !badgeEl || !outEl) return;

    if (action === 'registerFlow') {
      titleEl.textContent = 'Step 1: Frontend RegisterPage.jsx -> POST http://localhost:5000/register';
      badgeEl.className = 'status-badge status-200';
      badgeEl.textContent = '201 Created';
      outEl.textContent = JSON.stringify({
        client: "React Frontend (Vite)",
        action: "POST /register with { email: 'student@cmr.edu.in' }",
        serverAction: "Express -> bcrypt.hash() -> MongoDB User.save()",
        response: { message: "Registered successfully" }
      }, null, 2);
    } else if (action === 'loginFlow') {
      titleEl.textContent = 'Step 2: Frontend LoginPage.jsx -> POST http://localhost:5000/login -> localStorage.setItem';
      badgeEl.className = 'status-badge status-200';
      badgeEl.textContent = '200 OK';
      outEl.textContent = JSON.stringify({
        client: "React Frontend (LoginPage)",
        serverResult: "JWT generated & returned",
        clientStorage: "localStorage.setItem('token', 'eyJhbGciOiJIUzI1Ni...')"
      }, null, 2);
    } else if (action === 'fetchStudents') {
      titleEl.textContent = 'Step 3: Frontend StudentList.jsx -> GET /students with Bearer Token';
      badgeEl.className = 'status-badge status-200';
      badgeEl.textContent = '200 OK';
      outEl.textContent = JSON.stringify({
        requestHeader: "Authorization: Bearer eyJhbGciOi...",
        backendStatus: "auth middleware verified JWT signature",
        responseData: [
          { _id: "101", name: "Rohit Kumar", dept: "CSE", marks: 95 },
          { _id: "102", name: "Ananya Sharma", dept: "ISE", marks: 92 }
        ]
      }, null, 2);
    } else if (action === 'addStudent') {
      titleEl.textContent = 'Step 4: Frontend AddStudent.jsx -> POST /students';
      badgeEl.className = 'status-badge status-200';
      badgeEl.textContent = '201 Created';
      outEl.textContent = JSON.stringify({
        payload: { name: "Vikram Rao", dept: "CSE", marks: 89 },
        database: "MongoDB student document persisted",
        uiUpdate: "React Router navigates back to /students"
      }, null, 2);
    }
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
