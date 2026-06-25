// Shinova Core Controller Logic

// ==========================================
// Application State & Storage
// ==========================================
// Pre-populated defaults removed for a clean start

const MOTIVATIONAL_QUOTES = [
  { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
  { text: "Deep work is the superpower of the 21st century.", author: "Cal Newport" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "Your mind is for having ideas, not holding them.", author: "David Allen" },
  { text: "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.", author: "Alexander Graham Bell" },
  { text: "Today a reader, tomorrow a leader.", author: "Margaret Fuller" }
];

const WALLPAPERS = [
  { id: "aurora", name: "Default", url: "aurora" },
  { id: "beach-1", name: "Beach 1", url: "backgrounds/Beach (1).jpg" },
  { id: "beach-2", name: "Beach 2", url: "backgrounds/Beach (2).jpg" },
  { id: "beach-3", name: "Beach 3", url: "backgrounds/Beach (3).jpg" },
  { id: "cafe-1", name: "Cafe 1", url: "backgrounds/Cafe.jpg" },
  { id: "cafe-2", name: "Cafe 2", url: "backgrounds/Cafe 2.jpg" },
  { id: "cafe-3", name: "Cafe 3", url: "backgrounds/Cafe 3.jpg" },
  { id: "cafe-4", name: "Cafe 4", url: "backgrounds/Cafe 4.jpg" },
  { id: "cafe-5", name: "Cafe 5", url: "backgrounds/Cafe 5.jpg" },
  { id: "fireplace-1", name: "Fireplace 1", url: "backgrounds/Fireplace.jpg" },
  { id: "fireplace-2", name: "Fireplace 2", url: "backgrounds/Fireplace 2.jpg" },
  { id: "france-1", name: "France 1", url: "backgrounds/France (1).jpg" },
  { id: "france-2", name: "France 2", url: "backgrounds/France (2).jpg" },
  { id: "france-3", name: "France 3", url: "backgrounds/France (3).jpg" },
  { id: "france-4", name: "France 4", url: "backgrounds/France (4).jpg" },
  { id: "france-5", name: "France 5", url: "backgrounds/France (5).jpg" },
  { id: "italy-1", name: "Italy 1", url: "backgrounds/Italy (1).jpg" },
  { id: "italy-2", name: "Italy 2", url: "backgrounds/Italy (2).jpg" },
  { id: "italy-3", name: "Italy 3", url: "backgrounds/Italy (3).jpg" },
  { id: "italy-4", name: "Italy 4", url: "backgrounds/Italy (4).jpg" },
  { id: "italy-5", name: "Italy 5", url: "backgrounds/Italy (5).jpg" },
  { id: "japan-1", name: "Japan 1", url: "backgrounds/Japan (1).jpg" },
  { id: "japan-2", name: "Japan 2", url: "backgrounds/Japan (2).jpg" },
  { id: "japan-3", name: "Japan 3", url: "backgrounds/Japan (3).jpg" },
  { id: "japan-4", name: "Japan 4", url: "backgrounds/Japan (4).jpg" },
  { id: "japan-5", name: "Japan 5", url: "backgrounds/Japan (5).jpg" },
  { id: "japan-6", name: "Japan 6", url: "backgrounds/Japan (6).jpg" },
  { id: "japan-7", name: "Japan 7", url: "backgrounds/Japan (7).jpg" },
  { id: "japan-8", name: "Japan 8", url: "backgrounds/Japan (8).jpg" },
  { id: "japan-9", name: "Japan 9", url: "backgrounds/Japan (9).jpg" },
  { id: "library-1", name: "Library 1", url: "backgrounds/Library.jpg" },
  { id: "library-2", name: "Library 2", url: "backgrounds/Library 2.jpg" },
  { id: "rain-1", name: "Rain 1", url: "backgrounds/Rain.jpg" },
  { id: "rain-2", name: "Rain 2", url: "backgrounds/Rain 2.jpg" },
  { id: "rain-3", name: "Rain 3", url: "backgrounds/Rain 3.jpg" },
  { id: "snow-mountain-1", name: "Snow Mountain 1", url: "backgrounds/Snow Mountain (1).jpg" },
  { id: "snow-mountain-2", name: "Snow Mountain 2", url: "backgrounds/Snow Mountain (2).jpg" }
];

let appState = {
  user: {
    username: "FocusMaster",
    status: "Studying hard for finals!",
    targetDaily: 6, // 6 hours
    theme: "indigo-dark",
    streak: 0,
    activeWallpaper: "cafe-2"
  },
  subjects: [],
  logs: [],
  todos: []
};

// ==========================================
// Focus Session Engine State
// ==========================================
let activeSubjectId = null;
let timerRunning = false;
let elapsedSeconds = 0;
let sessionStart = null;
let timerInterval = null;

let isResting = false;
let restSeconds = 0;
let restInterval = null;

let currentMode = "stopwatch"; // 'stopwatch' or 'timer'
let countdownDuration = 1500; // default 25 min (in seconds)
let countdownRemaining = 1500;

// Audio context for synthesized white noise
let whiteNoiseSource = null;
let whiteNoiseGain = null;
let audioCtx = null;

// Chart.js instances
let weeklyChart = null;
let subjectChart = null;

// ==========================================
// Helper Utility Functions
// ==========================================
function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDurationHMS(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0')
  ].join(':');
}

function formatDurationHM(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  return `${hours}h ${minutes}m`;
}

function setElementText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

// ==========================================
// App Initialization
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initData();
  startLocalClock();
  applyTheme(appState.user.theme);
  
  // Set initial greeting
  const homeUserEl = document.getElementById("home-username");
  if (homeUserEl) homeUserEl.innerText = appState.user.username;

  // Set random quote in top bar
  const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  setElementText("top-quote-text", `"${quote.text}"`);

  initNavigation();
  renderHomeSubjects();
  initPlanner();
  initInsights();
  initSettings();
  initFocusMode();
  initModals();
  initWallpaperManager();
  initOnboarding();
  initCustomDialogs();
  
  // Render lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Trigger Onboarding Modal if not initialized
  const isInitialized = localStorage.getItem("ypt_initialized");
  if (isInitialized !== "true") {
    const onboardingModal = document.getElementById("modal-onboarding");
    if (onboardingModal) {
      onboardingModal.classList.add("active");
    }
  }
});

// Load state from local storage or pre-populate defaults
function initData() {
  const localUser = localStorage.getItem("ypt_user");
  const localSubjects = localStorage.getItem("ypt_subjects");
  const localLogs = localStorage.getItem("ypt_logs");
  const localTodos = localStorage.getItem("ypt_todos");
  const isInitialized = localStorage.getItem("ypt_initialized");
  
  if (localUser) {
    appState.user = JSON.parse(localUser);
    if (!appState.user.activeWallpaper) {
      appState.user.activeWallpaper = "cafe-2";
    }
  } else {
    localStorage.setItem("ypt_user", JSON.stringify(appState.user));
  }

  if (isInitialized === "true") {
    appState.subjects = localSubjects ? JSON.parse(localSubjects) : [];
    appState.todos = localTodos ? JSON.parse(localTodos) : [];
    appState.logs = localLogs ? JSON.parse(localLogs) : [];
  } else {
    // First time loading, start with clean empty state
    appState.subjects = [];
    appState.todos = [];
    appState.logs = [];
    
    localStorage.setItem("ypt_subjects", JSON.stringify(appState.subjects));
    localStorage.setItem("ypt_todos", JSON.stringify(appState.todos));
    localStorage.setItem("ypt_logs", JSON.stringify(appState.logs));
  }

  // Sync today's times from logs
  updateTodayTimesFromLogs();
}

function updateTodayTimesFromLogs() {
  const todayStr = getLocalDateString();
  
  // Reset subjects today's total time
  appState.subjects.forEach(sub => sub.totalTime = 0);
  
  // Accumulate
  appState.logs.forEach(log => {
    const logDateStr = getLocalDateString(new Date(log.startTime));
    if (logDateStr === todayStr) {
      const sub = appState.subjects.find(s => s.id === log.subjectId);
      if (sub) {
        sub.totalTime += log.duration;
      }
    }
  });

  // Calculate total focus time today
  let todayTotalSeconds = 0;
  appState.subjects.forEach(sub => todayTotalSeconds += sub.totalTime);
  setElementText("today-total-time-home", formatDurationHMS(todayTotalSeconds));
  
  localStorage.setItem("ypt_subjects", JSON.stringify(appState.subjects));
}

// ==========================================
// Theme manager
// ==========================================
function applyTheme(themeName) {
  // Normalize old themes to dark theme if any
  if (themeName !== "classic-light") {
    themeName = "indigo-dark";
  }

  document.documentElement.setAttribute("data-theme", themeName);
  
  const sunIcon = document.getElementById("theme-toggle-icon-sun");
  const moonIcon = document.getElementById("theme-toggle-icon-moon");
  const toggleText = document.getElementById("theme-toggle-text");
  
  if (themeName === "classic-light") {
    if (sunIcon) sunIcon.classList.add("hidden");
    if (moonIcon) moonIcon.classList.remove("hidden");
    if (toggleText) toggleText.innerText = "Light Mode";
  } else {
    if (sunIcon) sunIcon.classList.remove("hidden");
    if (moonIcon) moonIcon.classList.add("hidden");
    if (toggleText) toggleText.innerText = "Dark Mode";
  }

  if (window.Chart) {
    updateChartsThemes();
  }
}

function updateChartsThemes() {
  const isLight = document.documentElement.getAttribute("data-theme") === "classic-light";
  const textColor = isLight ? "#475569" : "#a1a1aa";
  const gridColor = isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.08)";

  if (weeklyChart) {
    weeklyChart.options.plugins.legend.labels.color = textColor;
    weeklyChart.options.scales.x.ticks.color = textColor;
    weeklyChart.options.scales.x.grid.color = gridColor;
    weeklyChart.options.scales.y.ticks.color = textColor;
    weeklyChart.options.scales.y.grid.color = gridColor;
    weeklyChart.update();
  }

  if (subjectChart) {
    subjectChart.options.plugins.legend.labels.color = textColor;
    subjectChart.update();
  }
}

// ==========================================
// Local Clock Ticker
// ==========================================
function startLocalClock() {
  function tick() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    setElementText("local-clock-display", `${hrs}:${mins}`);
  }
  tick();
  setInterval(tick, 1000);
}

// ==========================================
// Tab Navigation Dock
// ==========================================
function initNavigation() {
  const dockButtons = document.querySelectorAll(".dock-btn[data-tab]");
  
  dockButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Fullscreen toggle button
  const fsBtn = document.getElementById("btn-toggle-fullscreen");
  if (fsBtn) {
    fsBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.log("Error attempting to enable fullscreen:", err);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }
}

function switchTab(tabId) {
  if (tabId === "focus" && !activeSubjectId) {
    if (appState.subjects.length > 0) {
      openFocusSession(appState.subjects[0].id);
    } else {
      const defaultSub = {
        id: `sub-${Date.now()}`,
        name: "General Study",
        color: "#8b5cf6",
        totalTime: 0
      };
      appState.subjects.push(defaultSub);
      localStorage.setItem("ypt_subjects", JSON.stringify(appState.subjects));
      openFocusSession(defaultSub.id);
    }
    return;
  }

  // Update active state in nav buttons
  document.querySelectorAll(".dock-btn[data-tab]").forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Toggle stage-views
  document.querySelectorAll(".stage-view").forEach(view => {
    if (view.id === `view-${tabId}`) {
      view.classList.add("active");
    } else {
      view.classList.remove("active");
    }
  });

  // Render logic for specific views
  if (tabId === "home") {
    updateTodayTimesFromLogs();
  } else if (tabId === "planner") {
    renderPlanner();
  } else if (tabId === "insights") {
    renderInsights();
  } else if (tabId === "settings") {
    populateSettings();
  }
}

// ==========================================
// Home subjects Grid View
// ==========================================
function renderHomeSubjects() {
  const container = document.getElementById("home-subjects-list");
  if (!container) return;
  container.innerHTML = "";

  if (appState.subjects.length === 0) {
    container.innerHTML = `
      <div style="color: var(--text-muted); font-size: 0.9rem; padding: 1.5rem; text-align: center; width: 100%;">
        No subjects added yet. Add a subject below to start focusing!
      </div>
    `;
    return;
  }

  appState.subjects.forEach(sub => {
    const btn = document.createElement("button");
    btn.className = "home-subject-badge-btn";
    btn.style.setProperty("--subj-theme-color", sub.color);
    btn.setAttribute("data-id", sub.id);
    btn.innerHTML = `
      <span class="color-dot"></span>
      <span>${sub.name}</span>
      <span class="total-tag">${formatDurationHM(sub.totalTime)}</span>
      <span class="delete-subj-btn" title="Delete Subject">&times;</span>
    `;

    // Click behavior
    btn.addEventListener("click", async (e) => {
      // If clicked the delete cross
      if (e.target.classList.contains("delete-subj-btn")) {
        e.stopPropagation();
        if (await showConfirm(`Are you sure you want to delete "${sub.name}"? This will not delete its past study logs.`)) {
          deleteSubject(sub.id);
        }
        return;
      }
      // Otherwise open focus overlay
      openFocusSession(sub.id);
    });

    container.appendChild(btn);
  });
}

function deleteSubject(subjectId) {
  appState.subjects = appState.subjects.filter(s => s.id !== subjectId);
  localStorage.setItem("ypt_subjects", JSON.stringify(appState.subjects));
  renderHomeSubjects();
  renderSubjectDropdown();
  if (activeSubjectId === subjectId) {
    exitFocusSession();
  }
}

// ==========================================
// Planner & 10-Minute Timeline Logic
// ==========================================
function initPlanner() {
  // Task Filter buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderTodoList(btn.getAttribute("data-filter"));
    });
  });
}

function renderPlanner() {
  renderTimeline();
  const activeFilterBtn = document.querySelector(".filter-btn.active");
  const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
  renderTodoList(activeFilter);
}

// Draw the horizontal 10-Minute Timeline Grid (144 blocks total)
function renderTimeline() {
  const blocksContainer = document.getElementById("timeline-blocks");
  if (!blocksContainer) return;
  blocksContainer.innerHTML = "";

  const todayStr = getLocalDateString();
  const blocksData = Array(144).fill(null);

  // Filter logs for today
  const todayLogs = appState.logs.filter(log => getLocalDateString(new Date(log.startTime)) === todayStr);

  todayLogs.forEach(log => {
    const start = new Date(log.startTime);
    const startHour = start.getHours();
    const startMin = start.getMinutes();
    
    // Absolute start minute of the day
    const absoluteStartMin = startHour * 60 + startMin;
    const startBlock = Math.floor(absoluteStartMin / 10);
    const numBlocks = Math.ceil(log.duration / 600); // 10 minute blocks

    const sub = appState.subjects.find(s => s.id === log.subjectId);
    const color = sub ? sub.color : "var(--primary)";
    const name = sub ? sub.name : "Study";

    for (let i = 0; i < numBlocks; i++) {
      const idx = startBlock + i;
      if (idx < 144) {
        blocksData[idx] = { color, name };
      }
    }
  });

  // Render blocks
  for (let idx = 0; idx < 144; idx++) {
    const blockEl = document.createElement("div");
    blockEl.className = "timeline-block";
    
    const blockHour = Math.floor((idx * 10) / 60);
    const blockMin = (idx * 10) % 60;
    const timeStr = `${String(blockHour).padStart(2, '0')}:${String(blockMin).padStart(2, '0')}`;

    if (blocksData[idx]) {
      blockEl.style.backgroundColor = blocksData[idx].color;
      blockEl.setAttribute("data-tooltip", `${timeStr} - Studying ${blocksData[idx].name}`);
    } else {
      blockEl.setAttribute("data-tooltip", `${timeStr} - Idle`);
    }

    blocksContainer.appendChild(blockEl);
  }

  // Render Legend
  const legendContainer = document.getElementById("timeline-legend-container");
  if (legendContainer) {
    legendContainer.innerHTML = "";
    appState.subjects.forEach(sub => {
      const item = document.createElement("div");
      item.className = "legend-item";
      item.innerHTML = `
        <span class="legend-dot" style="background-color: ${sub.color}"></span>
        <span>${sub.name}</span>
      `;
      legendContainer.appendChild(item);
    });
  }
}

// Render Todo checklist items
function renderTodoList(filter = "all") {
  const todoListEl = document.getElementById("todo-items-list");
  if (!todoListEl) return;
  todoListEl.innerHTML = "";

  let filteredTodos = appState.todos;
  if (filter === "pending") {
    filteredTodos = appState.todos.filter(t => !t.completed);
  } else if (filter === "completed") {
    filteredTodos = appState.todos.filter(t => t.completed);
  }

  if (filteredTodos.length === 0) {
    todoListEl.innerHTML = `
      <li class="text-center py-6 text-muted" style="list-style: none; font-size: 0.9rem;">No tasks found.</li>
    `;
    return;
  }

  filteredTodos.forEach(todo => {
    const sub = appState.subjects.find(s => s.id === todo.subjectId);
    const subName = sub ? sub.name : "General";
    const subColor = sub ? sub.color : "var(--primary)";

    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <div class="todo-item-left">
        <div class="todo-checkbox ${todo.completed ? 'checked' : ''}">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="todo-info">
          <span class="todo-title-text">${todo.title}</span>
          <span class="todo-subject-badge" style="--badge-theme-color: ${subColor}">${subName.toUpperCase()}</span>
        </div>
      </div>
      <button class="todo-delete-btn" title="Delete Task">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
      </button>
    `;

    // Checkbox toggling
    li.querySelector(".todo-checkbox").addEventListener("click", () => {
      toggleTodo(todo.id);
    });

    // Delete todo
    li.querySelector(".todo-delete-btn").addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    todoListEl.appendChild(li);
  });
}

function toggleTodo(todoId) {
  const todo = appState.todos.find(t => t.id === todoId);
  if (todo) {
    todo.completed = !todo.completed;
    localStorage.setItem("ypt_todos", JSON.stringify(appState.todos));
    const activeFilterBtn = document.querySelector(".filter-btn.active");
    const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
    renderTodoList(activeFilter);
  }
}

function deleteTodo(todoId) {
  appState.todos = appState.todos.filter(t => t.id !== todoId);
  localStorage.setItem("ypt_todos", JSON.stringify(appState.todos));
  const activeFilterBtn = document.querySelector(".filter-btn.active");
  const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
  renderTodoList(activeFilter);
}

// ==========================================
// Insights & Stats Logic
// ==========================================
function initInsights() {
  // Empty constructor placeholder
}

function renderInsights() {
  const logs = appState.logs;

  // KPI Calculations
  const uniqueDates = new Set(logs.map(log => getLocalDateString(new Date(log.startTime))));
  const totalDays = uniqueDates.size || 0;

  const dailyTotals = {};
  logs.forEach(log => {
    const day = getLocalDateString(new Date(log.startTime));
    dailyTotals[day] = (dailyTotals[day] || 0) + log.duration;
  });
  
  let maxSeconds = 0;
  let totalStudySeconds = 0;
  Object.keys(dailyTotals).forEach(day => {
    if (dailyTotals[day] > maxSeconds) maxSeconds = dailyTotals[day];
    totalStudySeconds += dailyTotals[day];
  });

  const averageSeconds = totalDays > 0 ? Math.floor(totalStudySeconds / totalDays) : 0;
  
  setElementText("kpi-avg-time", formatDurationHM(averageSeconds));
  setElementText("kpi-max-time", formatDurationHM(maxSeconds));
  setElementText("streak-count", `${appState.user.streak} Days`);

  renderHeatmap(dailyTotals);
  renderCharts();
}

function renderHeatmap(dailyTotals) {
  const heatmapGrid = document.getElementById("heatmap-grid-blocks");
  if (!heatmapGrid) return;
  heatmapGrid.innerHTML = "";

  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const blockDate = new Date();
    blockDate.setDate(today.getDate() - i);
    const dateStr = getLocalDateString(blockDate);

    const seconds = dailyTotals[dateStr] || 0;
    const hours = seconds / 3600;

    let level = "level-0";
    if (hours > 0 && hours <= 1) level = "level-1";
    else if (hours > 1 && hours <= 3) level = "level-2";
    else if (hours > 3 && hours <= 5) level = "level-3";
    else if (hours > 5) level = "level-4";

    const block = document.createElement("div");
    block.className = `heatmap-block ${level}`;
    
    const tooltipText = `${blockDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${hours.toFixed(1)} hrs focused`;
    block.setAttribute("data-tooltip", tooltipText);

    heatmapGrid.appendChild(block);
  }
}

function renderCharts() {
  if (!window.Chart) {
    console.log("Chart.js not loaded yet.");
    return;
  }

  const isLight = document.documentElement.getAttribute("data-theme") === "classic-light";
  const textColor = isLight ? "#475569" : "#a1a1aa";
  const gridColor = isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.08)";

  // Bar Chart - Weekly
  const today = new Date();
  const last7DaysLabels = [];
  const last7DaysHours = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    last7DaysLabels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
    
    const dateStr = getLocalDateString(d);
    const dayLogs = appState.logs.filter(log => getLocalDateString(new Date(log.startTime)) === dateStr);
    const totalSecs = dayLogs.reduce((acc, log) => acc + log.duration, 0);
    last7DaysHours.push(Number((totalSecs / 3600).toFixed(1)));
  }

  const barCanvas = document.getElementById("weeklyHoursChart");
  if (barCanvas) {
    if (weeklyChart) weeklyChart.destroy();
    weeklyChart = new Chart(barCanvas, {
      type: 'bar',
      data: {
        labels: last7DaysLabels,
        datasets: [{
          label: 'Focus Hours',
          data: last7DaysHours,
          backgroundColor: '#8b5cf6',
          borderRadius: 8,
          hoverBackgroundColor: '#a855f7'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            labels: { color: textColor }
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor }
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor },
            title: {
              display: true,
              text: 'Hours',
              color: textColor
            }
          }
        }
      }
    });
  }

  // Donut Chart - Subject distribution
  const subjectSums = {};
  appState.subjects.forEach(sub => {
    subjectSums[sub.name] = {
      duration: 0,
      color: sub.color
    };
  });

  appState.logs.forEach(log => {
    const sub = appState.subjects.find(s => s.id === log.subjectId);
    if (sub) {
      if (!subjectSums[sub.name]) {
        subjectSums[sub.name] = { duration: 0, color: sub.color };
      }
      subjectSums[sub.name].duration += log.duration;
    }
  });

  const donutLabels = [];
  const donutData = [];
  const donutColors = [];

  Object.keys(subjectSums).forEach(name => {
    if (subjectSums[name].duration > 0) {
      donutLabels.push(name);
      donutData.push(Number((subjectSums[name].duration / 3600).toFixed(1)));
      donutColors.push(subjectSums[name].color);
    }
  });

  const donutCanvas = document.getElementById("subjectDistributionChart");
  if (donutCanvas) {
    if (subjectChart) subjectChart.destroy();
    if (donutData.length === 0) {
      subjectChart = new Chart(donutCanvas, {
        type: 'doughnut',
        data: {
          labels: ['No Study Data'],
          datasets: [{
            data: [1],
            backgroundColor: ['#6b7280']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: textColor } }
          }
        }
      });
    } else {
      subjectChart = new Chart(donutCanvas, {
        type: 'doughnut',
        data: {
          labels: donutLabels,
          datasets: [{
            data: donutData,
            backgroundColor: donutColors,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: textColor }
            }
          }
        }
      });
    }
  }
}

// ==========================================
// Settings Configurations
// ==========================================
function initSettings() {
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      appState.user.username = document.getElementById("input-username").value.trim();
      appState.user.status = document.getElementById("input-status").value.trim();
      appState.user.targetDaily = parseInt(document.getElementById("input-daily-target").value) || 6;
      
      localStorage.setItem("ypt_user", JSON.stringify(appState.user));
      
      const homeUserEl = document.getElementById("home-username");
      if (homeUserEl) homeUserEl.innerText = appState.user.username;
      
      showToast("Profile saved successfully!", "success");
    });
  }

  // Theme toggle button selection (Light/Dark Mode)
  const toggleThemeBtn = document.getElementById("btn-toggle-theme");
  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "classic-light" ? "indigo-dark" : "classic-light";
      
      appState.user.theme = newTheme;
      localStorage.setItem("ypt_user", JSON.stringify(appState.user));
      applyTheme(newTheme);
    });
  }

  // Backup Export
  const exportBtn = document.getElementById("btn-export-data");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
      const dlAnchorElem = document.createElement('a');
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", `shinova-backup-${getLocalDateString()}.json`);
      dlAnchorElem.click();
    });
  }

  // Application Wipe
  const resetBtn = document.getElementById("btn-reset-data");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      if (await showConfirm("WARNING: This will completely erase all subjects, study logs, task items, and reset all streaks. Do you want to continue?")) {
        localStorage.clear();
        showToast("Application database cleared. Reloading page...", "danger");
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    });
  }
}

function populateSettings() {
  const usernameInput = document.getElementById("input-username");
  const statusInput = document.getElementById("input-status");
  const targetInput = document.getElementById("input-daily-target");
  
  if (usernameInput) usernameInput.value = appState.user.username;
  if (statusInput) statusInput.value = appState.user.status;
  if (targetInput) targetInput.value = appState.user.targetDaily;
}

// ==========================================
// Focus Session Engine (Timers & Sounds)
// ==========================================
function initFocusMode() {
  const focusClockDisplay = document.getElementById("focus-clock-display");
  const btnRest = document.getElementById("btn-focus-rest");
  const btnExit = document.getElementById("btn-exit-focus");
  const btnModeToggle = document.getElementById("btn-focus-mode-toggle");
  
  // Click dial to toggle play/pause
  if (focusClockDisplay) {
    focusClockDisplay.addEventListener("click", () => {
      if (timerRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
    });
  }

  // Spacebar play/pause keydown listener
  document.addEventListener("keydown", (e) => {
    if (e.key === " " || e.code === "Space") {
      const focusView = document.getElementById("view-focus");
      if (focusView && focusView.classList.contains("active")) {
        // Ignore spacebar if a modal overlay is active
        const activeModal = document.querySelector(".modal-overlay.active");
        if (activeModal) return;

        // Ignore spacebar if user is typing in editable controls
        const activeEl = document.activeElement;
        const isEditable = activeEl && (
          activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          activeEl.isContentEditable ||
          activeEl.getAttribute("contenteditable") !== null
        );

        if (!isEditable) {
          e.preventDefault(); // Prevent standard page scroll
          if (timerRunning) {
            pauseTimer();
          } else {
            startTimer();
          }
        }
      }
    }
  });

  // Rest button toggle
  if (btnRest) {
    btnRest.addEventListener("click", () => {
      if (isResting) {
        endRest();
        startTimer();
      } else {
        pauseTimer();
        startRest();
      }
    });
  }

  // Exit & Save Focus Session
  if (btnExit) {
    btnExit.addEventListener("click", async () => {
      if (await showConfirm("End study session and save progress?")) {
        exitFocusSession();
      }
    });
  }

  // Stopwatch vs Countdown timer mode toggle
  if (btnModeToggle) {
    btnModeToggle.addEventListener("click", async () => {
      if (timerRunning) return; // Block switches during active sessions
      
      if (currentMode === "stopwatch") {
        const userMins = await showPrompt("Enter countdown minutes:", "25");
        if (userMins === null) return; // Cancelled
        
        currentMode = "timer";
        document.getElementById("focus-mode-icon-stopwatch").classList.add("hidden");
        document.getElementById("focus-mode-icon-timer").classList.remove("hidden");
        setElementText("focus-mode-name", "Countdown");
        
        const mins = parseInt(userMins) || 25;
        countdownDuration = mins * 60;
        countdownRemaining = countdownDuration;
        setElementText("focus-clock-display", formatDurationHMS(countdownRemaining));
      } else {
        currentMode = "stopwatch";
        document.getElementById("focus-mode-icon-stopwatch").classList.remove("hidden");
        document.getElementById("focus-mode-icon-timer").classList.add("hidden");
        setElementText("focus-mode-name", "Stopwatch");
        setElementText("focus-clock-display", formatDurationHMS(elapsedSeconds));
      }
    });
  }

  // Sound panel floating popover toggler
  const soundboardToggle = document.getElementById("btn-toggle-soundboard");
  const soundboardWidget = document.getElementById("floating-soundboard-widget");

  if (soundboardToggle && soundboardWidget) {
    soundboardToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      soundboardWidget.classList.toggle("active");
      soundboardToggle.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (soundboardWidget.classList.contains("active") && !soundboardWidget.contains(e.target) && e.target !== soundboardToggle) {
        soundboardWidget.classList.remove("active");
        soundboardToggle.classList.remove("active");
      }
    });
  }

  // Sound play selectors & independent volume controls
  document.querySelectorAll(".sound-item").forEach(item => {
    const soundKey = item.getAttribute("data-sound");
    const toggleBtn = item.querySelector(".sound-toggle-btn");
    const volumeSlider = item.querySelector(".sound-volume");
    const playIcon = toggleBtn.querySelector(".icon-play-sound");
    const pauseIcon = toggleBtn.querySelector(".icon-pause-sound");

    toggleBtn.addEventListener("click", () => {
      const isActive = item.classList.toggle("active");
      
      if (isActive) {
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
        playAmbientSound(soundKey, volumeSlider.value / 100);
      } else {
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
        stopAmbientSound(soundKey);
      }
    });

    volumeSlider.addEventListener("input", (e) => {
      setAmbientVolume(soundKey, e.target.value / 100);
    });
  });

  // Subject Switcher dropdown popup toggler
  const focusSubjectBadge = document.getElementById("focus-subject-badge");
  const subjectDropdown = document.getElementById("subject-switch-dropdown");

  if (focusSubjectBadge && subjectDropdown) {
    focusSubjectBadge.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = subjectDropdown.style.display === "block";
      if (isVisible) {
        subjectDropdown.style.display = "none";
      } else {
        renderSubjectDropdown();
        subjectDropdown.style.display = "block";
      }
    });

    document.addEventListener("click", (e) => {
      if (!focusSubjectBadge.contains(e.target) && !subjectDropdown.contains(e.target)) {
        subjectDropdown.style.display = "none";
      }
    });
  }
}

function openFocusSession(subjectId) {
  activeSubjectId = subjectId;
  const sub = appState.subjects.find(s => s.id === subjectId);
  if (!sub) return;

  // Sync Focus badge meta
  setElementText("focus-subject-name", sub.name);
  const focusDot = document.getElementById("focus-subject-dot");
  if (focusDot) {
    focusDot.style.color = sub.color;
    focusDot.style.backgroundColor = sub.color;
  }

  const focusBadge = document.getElementById("focus-subject-badge");
  if (focusBadge) {
    focusBadge.style.setProperty("--subj-theme-color", sub.color);
  }

  // Reset focus variables
  elapsedSeconds = 0;
  isResting = false;
  restSeconds = 0;
  countdownRemaining = countdownDuration;

  setElementText("focus-session-total-text", `Session Today: ${formatDurationHM(sub.totalTime)}`);
  
  // Set random quote in header
  const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  setElementText("top-quote-text", `"${quote.text}"`);

  // Switch view to Focus Space
  switchTab("focus");

  // Initialize in a paused state
  timerRunning = false;
  sessionStart = null;
  const focusView = document.getElementById("view-focus");
  if (focusView) {
    focusView.classList.remove("focusing-active", "resting-active");
  }
  setElementText("focus-status-text", "PAUSED");
  updateFocusClockDisplay();
}

function changeActiveSubject(newSubjectId) {
  const oldSubjectId = activeSubjectId;
  const wasRunning = timerRunning;

  if (wasRunning) {
    // If timer is running, log progress of the previous subject first
    const focusTime = currentMode === "stopwatch" ? elapsedSeconds : (countdownDuration - countdownRemaining);
    if (focusTime >= 5 && oldSubjectId) {
      const newLog = {
        id: `log-${Date.now()}`,
        subjectId: oldSubjectId,
        startTime: sessionStart,
        duration: focusTime
      };
      appState.logs.push(newLog);
      localStorage.setItem("ypt_logs", JSON.stringify(appState.logs));
      updateTodayTimesFromLogs();
      updateStreak();
    }
    
    // Clear state
    pauseTimer();
    sessionStart = null;

    // Switch details
    openFocusSession(newSubjectId);
    
    // Continue running immediately for the new subject
    startTimer();
  } else {
    // If paused, just open new subject (initializes in paused state)
    openFocusSession(newSubjectId);
  }
}

function renderSubjectDropdown() {
  const dropdown = document.getElementById("subject-switch-dropdown");
  if (!dropdown) return;
  dropdown.innerHTML = "";

  appState.subjects.forEach(sub => {
    const row = document.createElement("div");
    row.className = "subject-dropdown-item-row";
    row.style.setProperty("--subj-color", sub.color);

    const selectBtn = document.createElement("button");
    selectBtn.className = "subject-dropdown-item";
    selectBtn.innerHTML = `
      <span class="color-dot"></span>
      <span style="flex-grow: 1; text-align: left;">${sub.name}</span>
      ${sub.id === activeSubjectId ? '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check" style="opacity:0.8; margin-left: 4px;"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
    `;

    selectBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.style.display = "none";
      if (sub.id !== activeSubjectId) {
        changeActiveSubject(sub.id);
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "subject-dropdown-item-delete";
    deleteBtn.setAttribute("title", "Delete Subject");
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
    `;

    deleteBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (await showConfirm(`Are you sure you want to delete "${sub.name}"? This will not delete its past study logs.`)) {
        deleteSubject(sub.id);
      }
    });

    row.appendChild(selectBtn);
    row.appendChild(deleteBtn);
    dropdown.appendChild(row);
  });

  // Divider
  const divider = document.createElement("div");
  divider.className = "subject-dropdown-divider";
  dropdown.appendChild(divider);

  // "+ Add Subject" item
  const addBtn = document.createElement("button");
  addBtn.className = "subject-dropdown-item";
  addBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus" style="margin-right: 4px; opacity:0.8;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    <span>Add Subject</span>
  `;
  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.style.display = "none";
    
    // Open add subject modal
    const nameInput = document.getElementById("subject-name");
    if (nameInput) nameInput.value = "";
    document.getElementById("modal-subject").classList.add("active");
  });
  dropdown.appendChild(addBtn);
}

function startTimer() {
  if (isResting) {
    endRest();
  }
  timerRunning = true;
  
  const focusView = document.getElementById("view-focus");
  if (focusView) {
    focusView.classList.remove("resting-active");
    focusView.classList.add("focusing-active");
  }
  setElementText("focus-status-text", "FOCUSING");

  updateFocusClockDisplay();
  clearInterval(timerInterval);

  // Initialize session start time if starting fresh
  if (!sessionStart) {
    sessionStart = new Date().toISOString();
  }

  timerInterval = setInterval(() => {
    if (currentMode === "stopwatch") {
      elapsedSeconds++;
      updateFocusClockDisplay();
      document.title = `Focusing: ${formatDurationHMS(elapsedSeconds)} | Shinova`;
    } else {
      countdownRemaining--;
      updateFocusClockDisplay();
      document.title = `Focusing: ${formatDurationHMS(countdownRemaining)} | Shinova`;
      
      if (countdownRemaining <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        showToast("Focus block completed! Time for a rest.", "success");
        startRest();
      }
    }
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  setElementText("focus-status-text", "PAUSED");
  
  const focusView = document.getElementById("view-focus");
  if (focusView) {
    focusView.classList.remove("focusing-active");
  }
  document.title = "Paused | Shinova";
}

function startRest() {
  isResting = true;
  restSeconds = 0;
  
  const focusView = document.getElementById("view-focus");
  if (focusView) {
    focusView.classList.remove("focusing-active");
    focusView.classList.add("resting-active");
  }
  setElementText("focus-status-text", "RESTING");

  // Toggle coffee to play/stopwatch icon inside Rest pill
  const coffee = document.getElementById("rest-icon-coffee");
  const study = document.getElementById("rest-icon-study");
  if (coffee) coffee.classList.add("hidden");
  if (study) study.classList.remove("hidden");
  setElementText("rest-btn-text", "Study");
  
  updateFocusClockDisplay();
  clearInterval(restInterval);

  restInterval = setInterval(() => {
    restSeconds++;
    updateFocusClockDisplay();
    document.title = `Resting: ${formatDurationHMS(restSeconds)} | Shinova`;
  }, 1000);
}

function endRest() {
  isResting = false;
  clearInterval(restInterval);
  
  const coffee = document.getElementById("rest-icon-coffee");
  const study = document.getElementById("rest-icon-study");
  if (coffee) coffee.classList.remove("hidden");
  if (study) study.classList.add("hidden");
  setElementText("rest-btn-text", "Rest");
  
  const focusView = document.getElementById("view-focus");
  if (focusView) {
    focusView.classList.remove("resting-active");
  }
}

function updateFocusClockDisplay() {
  const display = document.getElementById("focus-clock-display");
  if (!display) return;

  if (isResting) {
    display.innerText = formatDurationHMS(restSeconds);
  } else if (currentMode === "stopwatch") {
    display.innerText = formatDurationHMS(elapsedSeconds);
  } else {
    display.innerText = formatDurationHMS(countdownRemaining);
  }
}

function exitFocusSession() {
  pauseTimer();
  endRest();
  stopAllAmbientSounds();

  document.title = "Shinova - Ambient Study Space & Planner";

  const focusTime = currentMode === "stopwatch" ? elapsedSeconds : (countdownDuration - countdownRemaining);
  
  if (focusTime >= 5 && activeSubjectId) {
    const newLog = {
      id: `log-${Date.now()}`,
      subjectId: activeSubjectId,
      startTime: sessionStart,
      duration: focusTime
    };
    
    appState.logs.push(newLog);
    localStorage.setItem("ypt_logs", JSON.stringify(appState.logs));
    
    updateTodayTimesFromLogs();
    updateStreak();
  }

  activeSubjectId = null;

  // Restore random header quote
  const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  setElementText("top-quote-text", `"${quote.text}"`);

  // Switch view to Home Space
  switchTab("home");
}

function updateStreak() {
  const todayStr = getLocalDateString();
  const lastStreakDate = localStorage.getItem("ypt_streak_date");
  
  if (lastStreakDate !== todayStr) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateString(yesterday);
    
    if (lastStreakDate === yesterdayStr) {
      appState.user.streak++;
    } else if (lastStreakDate === null) {
      appState.user.streak = 1;
    } else {
      appState.user.streak = 1;
    }
    
    localStorage.setItem("ypt_streak_date", todayStr);
    localStorage.setItem("ypt_user", JSON.stringify(appState.user));
  }
}

// ==========================================
// Ambient Audio Manager
// ==========================================
function playAmbientSound(soundKey, volume) {
  const audioEl = document.getElementById(`audio-${soundKey}`);
  if (audioEl) {
    audioEl.volume = volume;
    audioEl.play().catch(err => console.log("Audio autoplay prevented, click required.", err));
  }
}

function stopAmbientSound(soundKey) {
  const audioEl = document.getElementById(`audio-${soundKey}`);
  if (audioEl) {
    audioEl.pause();
    audioEl.currentTime = 0;
  }
}

function setAmbientVolume(soundKey, volume) {
  const audioEl = document.getElementById(`audio-${soundKey}`);
  if (audioEl) {
    audioEl.volume = volume;
  }
}

function stopAllAmbientSounds() {
  document.querySelectorAll(".sound-item").forEach(item => {
    item.classList.remove("active");
    const soundKey = item.getAttribute("data-sound");
    stopAmbientSound(soundKey);
    
    const playIcon = item.querySelector(".icon-play-sound");
    const pauseIcon = item.querySelector(".icon-pause-sound");
    if (playIcon && pauseIcon) {
      playIcon.classList.remove("hidden");
      pauseIcon.classList.add("hidden");
    }
  });
}

// ==========================================
// Modals Manager
// ==========================================
function initModals() {
  // Modal overlay click outside close
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        if (overlay.id === "modal-onboarding") return;
        if (overlay.id === "modal-custom-confirm") {
          overlay.classList.remove("active");
          if (confirmPromiseResolve) confirmPromiseResolve(false);
          return;
        }
        if (overlay.id === "modal-custom-prompt") {
          overlay.classList.remove("active");
          if (promptPromiseResolve) promptPromiseResolve(null);
          return;
        }
        overlay.classList.remove("active");
      }
    });
  });

  // Close subject modal buttons
  const btnCloseSubModal = document.getElementById("btn-close-subject-modal");
  if (btnCloseSubModal) {
    btnCloseSubModal.addEventListener("click", () => {
      document.getElementById("modal-subject").classList.remove("active");
    });
  }
  const btnCancelSub = document.getElementById("btn-cancel-subject");
  if (btnCancelSub) {
    btnCancelSub.addEventListener("click", () => {
      document.getElementById("modal-subject").classList.remove("active");
    });
  }

  // Open Add Subject Modal from Home view
  const btnHomeAddSub = document.getElementById("btn-home-add-subject");
  if (btnHomeAddSub) {
    btnHomeAddSub.addEventListener("click", () => {
      const nameInput = document.getElementById("subject-name");
      if (nameInput) nameInput.value = "";
      
      // Reset color dots and custom color input to default
      document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
      const firstDot = document.querySelector(".color-dot");
      if (firstDot) firstDot.classList.add("active");
      const customColorInput = document.getElementById("custom-subject-color");
      if (customColorInput) customColorInput.value = "#8b5cf6";

      const modalSub = document.getElementById("modal-subject");
      if (modalSub) modalSub.classList.add("active");
    });
  }

  // Subject color dot selection
  document.querySelectorAll(".color-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });

  // Custom Color Picker input
  const customColorInput = document.getElementById("custom-subject-color");
  if (customColorInput) {
    customColorInput.addEventListener("input", () => {
      // Deselect preset dots when choosing a custom color
      document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
    });
  }

  // Subject Form submission
  const subjectForm = document.getElementById("subject-form");
  if (subjectForm) {
    subjectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("subject-name");
      const name = nameInput ? nameInput.value.trim() : "";
      
      const activeColorDot = document.querySelector(".color-dot.active");
      const customColorInput = document.getElementById("custom-subject-color");
      const color = activeColorDot ? activeColorDot.getAttribute("data-color") : (customColorInput ? customColorInput.value : "#8b5cf6");

      if (name) {
        const newSub = {
          id: `sub-${Date.now()}`,
          name: name,
          color: color,
          totalTime: 0
        };
        
        appState.subjects.push(newSub);
        localStorage.setItem("ypt_subjects", JSON.stringify(appState.subjects));
        
        document.getElementById("modal-subject").classList.remove("active");
        
        // If in focus view, switch to the new subject immediately
        const focusView = document.getElementById("view-focus");
        if (focusView && focusView.classList.contains("active")) {
          changeActiveSubject(newSub.id);
        }
      }
    });
  }

  // Close todo modal buttons
  const btnCloseTodoModal = document.getElementById("btn-close-todo-modal");
  if (btnCloseTodoModal) {
    btnCloseTodoModal.addEventListener("click", () => {
      document.getElementById("modal-todo").classList.remove("active");
    });
  }
  const btnCancelTodo = document.getElementById("btn-cancel-todo");
  if (btnCancelTodo) {
    btnCancelTodo.addEventListener("click", () => {
      document.getElementById("modal-todo").classList.remove("active");
    });
  }

  // Open Add Todo Modal
  const btnAddTodo = document.getElementById("btn-add-todo");
  if (btnAddTodo) {
    btnAddTodo.addEventListener("click", () => {
      const selectEl = document.getElementById("todo-subject-select");
      if (!selectEl) return;
      selectEl.innerHTML = "";
      
      if (appState.subjects.length === 0) {
        showToast("Please add at least one subject first before creating tasks.", "warning");
        return;
      }

      appState.subjects.forEach(sub => {
        const opt = document.createElement("option");
        opt.value = sub.id;
        opt.innerText = sub.name;
        selectEl.appendChild(opt);
      });

      const titleInput = document.getElementById("todo-title");
      if (titleInput) titleInput.value = "";
      
      const modalTodo = document.getElementById("modal-todo");
      if (modalTodo) modalTodo.classList.add("active");
    });
  }

  // Todo Form submission
  const todoForm = document.getElementById("todo-form");
  if (todoForm) {
    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const titleInput = document.getElementById("todo-title");
      const selectEl = document.getElementById("todo-subject-select");
      
      const title = titleInput ? titleInput.value.trim() : "";
      const subjectId = selectEl ? selectEl.value : "";

      if (title && subjectId) {
        const newTodo = {
          id: `todo-${Date.now()}`,
          subjectId: subjectId,
          title: title,
          completed: false,
          date: getLocalDateString()
        };

        appState.todos.push(newTodo);
        localStorage.setItem("ypt_todos", JSON.stringify(appState.todos));
        
        document.getElementById("modal-todo").classList.remove("active");
        
        const activeFilterBtn = document.querySelector(".filter-btn.active");
        const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
        renderTodoList(activeFilter);
      }
    });
  }
}

// ==========================================
// Wallpaper Manager (Custom Cozy Backgrounds)
// ==========================================
function initWallpaperManager() {
  const btnOpenWallpapers = document.getElementById("btn-open-wallpapers");
  const modalWallpaper = document.getElementById("modal-wallpaper");
  const btnCloseWallpaperModal = document.getElementById("btn-close-wallpaper-modal");
  const btnCancelWallpaper = document.getElementById("btn-cancel-wallpaper");
  const wallpaperGrid = document.getElementById("wallpaper-options-grid");
  const wallpaperBg = document.getElementById("wallpaper-bg");
  const auroraBg = document.querySelector(".aurora-bg");

  // Function to apply a selected wallpaper
  function applyWallpaper(wallpaperId) {
    const selected = WALLPAPERS.find(w => w.id === wallpaperId);
    if (!selected) return;

    if (selected.id === "aurora") {
      // Revert to animated aurora background
      if (wallpaperBg) {
        wallpaperBg.classList.remove("active");
        wallpaperBg.style.backgroundImage = "none";
      }
      if (auroraBg) {
        auroraBg.classList.remove("aurora-off");
      }
    } else {
      // Load and apply the high-quality cozy wallpaper
      if (wallpaperBg) {
        wallpaperBg.style.backgroundImage = `url('${selected.url}')`;
        wallpaperBg.classList.add("active");
      }
      if (auroraBg) {
        // Fade out aurora backdrop to save rendering power
        auroraBg.classList.add("aurora-off");
      }
    }

    // Save selection in state & localStorage
    appState.user.activeWallpaper = selected.id;
    localStorage.setItem("ypt_user", JSON.stringify(appState.user));

    // Update active state in grid preview items
    document.querySelectorAll(".wallpaper-option").forEach(opt => {
      if (opt.getAttribute("data-id") === selected.id) {
        opt.classList.add("active");
      } else {
        opt.classList.remove("active");
      }
    });
  }

  // Generate the preview grid inside modal
  function renderWallpaperGrid() {
    if (!wallpaperGrid) return;
    wallpaperGrid.innerHTML = "";

    WALLPAPERS.forEach(w => {
      const item = document.createElement("div");
      
      if (w.id === "aurora") {
        item.className = "wallpaper-option default-option-box";
        item.setAttribute("data-id", w.id);
        item.innerHTML = `
          <div style="font-weight: 700; font-size: 0.85rem;">Default</div>
          <span class="wallpaper-option-name">${w.name}</span>
        `;
      } else {
        item.className = "wallpaper-option";
        item.setAttribute("data-id", w.id);
        item.innerHTML = `
          <img src="${w.url}" alt="${w.name}" loading="lazy">
          <span class="wallpaper-option-name">${w.name}</span>
        `;
      }

      if (w.id === appState.user.activeWallpaper) {
        item.classList.add("active");
      }

      item.addEventListener("click", () => {
        applyWallpaper(w.id);
      });

      wallpaperGrid.appendChild(item);
    });
  }

  // Open modal click handler
  if (btnOpenWallpapers) {
    btnOpenWallpapers.addEventListener("click", () => {
      renderWallpaperGrid();
      if (modalWallpaper) {
        modalWallpaper.classList.add("active");
      }
    });
  }

  // Close modal click handlers
  const closeModal = () => {
    if (modalWallpaper) {
      modalWallpaper.classList.remove("active");
    }
  };

  if (btnCloseWallpaperModal) btnCloseWallpaperModal.addEventListener("click", closeModal);
  if (btnCancelWallpaper) btnCancelWallpaper.addEventListener("click", closeModal);

  // Close modal when clicking outside contents
  if (modalWallpaper) {
    modalWallpaper.addEventListener("click", (e) => {
      if (e.target === modalWallpaper) {
        closeModal();
      }
    });
  }

  // Initialize background state on startup
  if (appState.user.activeWallpaper) {
    applyWallpaper(appState.user.activeWallpaper);
  }
}

// ==========================================
// Onboarding Manager (First Time Welcome Setup)
// ==========================================
function initOnboarding() {
  const onboardingForm = document.getElementById("onboarding-form");
  if (onboardingForm) {
    onboardingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const usernameInput = document.getElementById("onboarding-username");
      const targetInput = document.getElementById("onboarding-daily-target");
      
      const username = usernameInput ? usernameInput.value.trim() : "FocusMaster";
      const targetHours = targetInput ? parseInt(targetInput.value) : 6;
      
      // Update appState
      appState.user.username = username || "FocusMaster";
      appState.user.targetDaily = targetHours || 6;
      
      // Save state
      localStorage.setItem("ypt_user", JSON.stringify(appState.user));
      localStorage.setItem("ypt_initialized", "true");
      
      // Update Settings fields so they match
      const settingsUsername = document.getElementById("input-username");
      const settingsTarget = document.getElementById("input-daily-target");
      if (settingsUsername) settingsUsername.value = appState.user.username;
      if (settingsTarget) settingsTarget.value = appState.user.targetDaily;
      
      // Close onboarding modal
      const onboardingModal = document.getElementById("modal-onboarding");
      if (onboardingModal) {
        onboardingModal.classList.remove("active");
      }
    });
  }
}

// ==========================================
// Custom Dialog & Toast System
// ==========================================
let confirmPromiseResolve = null;
let promptPromiseResolve = null;

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "";
  if (type === "success") {
    icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
  } else if (type === "warning" || type === "danger") {
    icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;
  } else {
    icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;
  }

  toast.innerHTML = `
    <span>${icon}</span>
    <span style="flex-grow: 1;">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function showConfirm(message, confirmText = "Confirm", cancelText = "Cancel") {
  return new Promise((resolve) => {
    confirmPromiseResolve = resolve;
    
    document.getElementById("custom-confirm-message").innerText = message;
    document.getElementById("btn-custom-confirm-ok").innerText = confirmText;
    document.getElementById("btn-custom-confirm-cancel").innerText = cancelText;
    
    const okBtn = document.getElementById("btn-custom-confirm-ok");
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("delete") || lowerMsg.includes("erase") || lowerMsg.includes("wipe") || lowerMsg.includes("clear")) {
      okBtn.className = "btn btn-danger";
    } else {
      okBtn.className = "btn btn-primary";
    }

    document.getElementById("modal-custom-confirm").classList.add("active");
  });
}

function showPrompt(message, defaultValue = "", placeholder = "") {
  return new Promise((resolve) => {
    promptPromiseResolve = resolve;
    
    document.getElementById("custom-prompt-message").innerText = message;
    const inputEl = document.getElementById("custom-prompt-input");
    if (inputEl) {
      inputEl.value = defaultValue;
      inputEl.placeholder = placeholder;
      setTimeout(() => inputEl.focus(), 150);
    }
    
    document.getElementById("modal-custom-prompt").classList.add("active");
  });
}

function initCustomDialogs() {
  const btnOk = document.getElementById("btn-custom-confirm-ok");
  const btnCancel = document.getElementById("btn-custom-confirm-cancel");
  const modalConfirm = document.getElementById("modal-custom-confirm");

  if (btnOk) {
    btnOk.addEventListener("click", () => {
      if (modalConfirm) modalConfirm.classList.remove("active");
      if (confirmPromiseResolve) confirmPromiseResolve(true);
    });
  }

  if (btnCancel) {
    btnCancel.addEventListener("click", () => {
      if (modalConfirm) modalConfirm.classList.remove("active");
      if (confirmPromiseResolve) confirmPromiseResolve(false);
    });
  }

  const promptForm = document.getElementById("custom-prompt-form");
  const btnPromptCancel = document.getElementById("btn-custom-prompt-cancel");
  const modalPrompt = document.getElementById("modal-custom-prompt");

  if (promptForm) {
    promptForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = document.getElementById("custom-prompt-input").value.trim();
      if (modalPrompt) modalPrompt.classList.remove("active");
      if (promptPromiseResolve) promptPromiseResolve(value);
    });
  }

  if (btnPromptCancel) {
    btnPromptCancel.addEventListener("click", () => {
      if (modalPrompt) modalPrompt.classList.remove("active");
      if (promptPromiseResolve) promptPromiseResolve(null);
    });
  }
}
