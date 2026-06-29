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

const DEFAULT_MUSIC_TRACKS = [
  { id: "default-1", title: "Autumn Chill Study", artist: "Lofi Focus", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", category: "lofi" },
  { id: "default-2", title: "Midnight Tea", artist: "Cafe Jazz", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", category: "jazz" },
  { id: "default-3", title: "Warm Fireplace", artist: "Aesthetic Chill", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", category: "lofi" },
  { id: "default-4", title: "Raindrops on Glass", artist: "Piano Dreams", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", category: "piano" },
  { id: "default-5", title: "Cyber Library", artist: "Synthwave Study", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", category: "synth" },
  { id: "default-6", title: "Morning Mist", artist: "Acoustic Focus", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", category: "acoustic" },
  { id: "default-7", title: "Cosmic Nebula", artist: "Ambient Focus", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", category: "ambient" },
  { id: "default-8", title: "Deep Mind Focus", artist: "Alpha Focus", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", category: "ambient" }
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
  todos: [],
  musicQueue: [],
  currentTrackIndex: null,
  musicPlaying: false,
  musicLoop: "none",
  musicShuffle: false,
  customTracks: [],
  musicVolume: 70,
  libraryMode: "online",
  onlineTracks: []
};

// ==========================================
// Focus Session Engine State
// ==========================================
let activeSubjectId = null;
let editingSubjectId = null;
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

// YouTube Player & Invidious Integration State
let ytPlayer = null;
let ytPlayerReady = false;
let ytTimeInterval = null;
let invidiousInstance = "https://inv.thepixora.com";

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

function getHueFromColor(colorStr) {
  if (!colorStr) return 270;
  if (colorStr.startsWith("hsl")) {
    const match = colorStr.match(/hsl\((\d+)/);
    return match ? parseInt(match[1]) : 270;
  }
  if (colorStr.startsWith("#")) {
    let r = parseInt(colorStr.slice(1, 3), 16) / 255;
    let g = parseInt(colorStr.slice(3, 5), 16) / 255;
    let b = parseInt(colorStr.slice(5, 7), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h;
    if (max === min) {
      h = 0;
    } else {
      let d = max - min;
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return Math.round(h * 360);
  }
  return 270;
}

function saveActiveSessionState() {
  if (!activeSubjectId) {
    clearActiveSessionState();
    return;
  }
  const sessionState = {
    activeSubjectId: activeSubjectId,
    sessionStart: sessionStart,
    elapsedSeconds: elapsedSeconds,
    timerRunning: timerRunning,
    isResting: isResting,
    restSeconds: restSeconds,
    currentMode: currentMode,
    countdownDuration: countdownDuration,
    countdownRemaining: countdownRemaining,
    lastTick: Date.now()
  };
  localStorage.setItem("ypt_active_session", JSON.stringify(sessionState));
}

function clearActiveSessionState() {
  localStorage.removeItem("ypt_active_session");
}

function saveAmbientSoundsState() {
  const activeSounds = {};
  document.querySelectorAll(".sound-item").forEach(item => {
    if (item.classList.contains("active")) {
      const soundKey = item.getAttribute("data-sound");
      const volumeSlider = item.querySelector(".sound-volume");
      activeSounds[soundKey] = volumeSlider ? parseFloat(volumeSlider.value) : 50;
    }
  });
  localStorage.setItem("ypt_active_ambient_sounds", JSON.stringify(activeSounds));
}

function initAmbientSoundsFromStorage() {
  const savedData = localStorage.getItem("ypt_active_ambient_sounds");
  if (!savedData) return;
  try {
    const activeSounds = JSON.parse(savedData);
    Object.keys(activeSounds).forEach(soundKey => {
      const vol = activeSounds[soundKey];
      const item = document.querySelector(`.sound-item[data-sound="${soundKey}"]`);
      if (item) {
        item.classList.add("active");
        const toggleBtn = item.querySelector(".sound-toggle-btn");
        const playIcon = toggleBtn.querySelector(".icon-play-sound");
        const pauseIcon = toggleBtn.querySelector(".icon-pause-sound");
        if (playIcon) playIcon.classList.add("hidden");
        if (pauseIcon) pauseIcon.classList.remove("hidden");
        
        const volumeSlider = item.querySelector(".sound-volume");
        if (volumeSlider) volumeSlider.value = vol;

        // Try playing
        const audioEl = document.getElementById(`audio-${soundKey}`);
        if (audioEl) {
          audioEl.volume = vol / 100;
          audioEl.play().catch(err => {
            // Autoplay blocked, will recover on interaction
          });
        }
      }
    });
  } catch (err) {
    console.error("Failed to restore ambient sounds:", err);
  }
}

let ambientSoundsInitialized = false;
function tryPlayAllActiveAmbientSounds() {
  if (ambientSoundsInitialized) return;
  const savedData = localStorage.getItem("ypt_active_ambient_sounds");
  if (!savedData) {
    ambientSoundsInitialized = true;
    return;
  }
  try {
    const activeSounds = JSON.parse(savedData);
    let successfullyPlayed = 0;
    const soundKeys = Object.keys(activeSounds);
    const totalSounds = soundKeys.length;
    if (totalSounds === 0) {
      ambientSoundsInitialized = true;
      return;
    }

    soundKeys.forEach(soundKey => {
      const vol = activeSounds[soundKey];
      const audioEl = document.getElementById(`audio-${soundKey}`);
      if (audioEl) {
        audioEl.volume = vol / 100;
        audioEl.play()
          .then(() => {
            successfullyPlayed++;
            if (successfullyPlayed === totalSounds) {
              ambientSoundsInitialized = true;
            }
          })
          .catch(err => {
            // Autoplay blocked, wait for next user action
          });
      }
    });
  } catch (err) {
    console.error("Autoplay unblock error:", err);
  }
}

function checkAndRecoverSession() {
  const savedData = localStorage.getItem("ypt_active_session");
  if (!savedData) return;

  try {
    const saved = JSON.parse(savedData);
    if (!saved || !saved.activeSubjectId) {
      clearActiveSessionState();
      return;
    }

    const sub = appState.subjects.find(s => s.id === saved.activeSubjectId);
    if (!sub) {
      clearActiveSessionState();
      return;
    }

    const offlineSeconds = Math.floor((Date.now() - saved.lastTick) / 1000);

    // Case A: User away for > 5 minutes (300 seconds)
    if (offlineSeconds > 300) {
      const focusTime = saved.currentMode === "stopwatch" ? saved.elapsedSeconds : (saved.countdownDuration - saved.countdownRemaining);
      if (focusTime >= 5) {
        const newLog = {
          id: `log-${Date.now()}`,
          subjectId: saved.activeSubjectId,
          startTime: saved.sessionStart || new Date().toISOString(),
          duration: focusTime
        };
        appState.logs.push(newLog);
        localStorage.setItem("ypt_logs", JSON.stringify(appState.logs));
        updateTodayTimesFromLogs();
        updateStreak();
        showToast(`Auto-saved previous session: ${formatDurationHM(focusTime)}`, "info");
      }
      clearActiveSessionState();
      return;
    }

    // Case B: User refreshed or had a quick interruption (<= 5 minutes)
    activeSubjectId = saved.activeSubjectId;
    sessionStart = saved.sessionStart;
    currentMode = saved.currentMode;
    countdownDuration = saved.countdownDuration;
    countdownRemaining = saved.countdownRemaining;
    isResting = saved.isResting;
    restSeconds = saved.restSeconds;
    elapsedSeconds = saved.elapsedSeconds;
    
    // Add offline time to the ticking timer
    if (saved.timerRunning) {
      if (isResting) {
        restSeconds += offlineSeconds;
      } else {
        if (currentMode === "stopwatch") {
          elapsedSeconds += offlineSeconds;
        } else {
          // If countdown timer completed while offline, transition to rest
          if (countdownRemaining - offlineSeconds <= 0) {
            const focusTime = countdownRemaining; // study duration completed
            if (focusTime >= 5) {
              const newLog = {
                id: `log-${Date.now()}`,
                subjectId: activeSubjectId,
                startTime: sessionStart || new Date().toISOString(),
                duration: focusTime
              };
              appState.logs.push(newLog);
              localStorage.setItem("ypt_logs", JSON.stringify(appState.logs));
              updateTodayTimesFromLogs();
              updateStreak();
            }
            isResting = true;
            restSeconds = offlineSeconds - countdownRemaining;
            countdownRemaining = countdownDuration;
          } else {
            countdownRemaining -= offlineSeconds;
          }
        }
      }
    }

    // Restore UI view to Focus Screen
    switchTab("focus");

    // Restore Focus Badge metadata
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
    setElementText("focus-session-total-text", `Session Today: ${formatDurationHM(sub.totalTime)}`);
    updateFocusClockDisplay();

    // Re-ticking behavior
    if (saved.timerRunning) {
      const focusView = document.getElementById("view-focus");
      if (isResting) {
        timerRunning = false;
        if (focusView) {
          focusView.classList.remove("focusing-active");
          focusView.classList.add("resting-active");
        }
        setElementText("focus-status-text", "RESTING");
        const coffee = document.getElementById("rest-icon-coffee");
        const study = document.getElementById("rest-icon-study");
        if (coffee) coffee.classList.add("hidden");
        if (study) study.classList.remove("hidden");
        setElementText("rest-btn-text", "Study");
        
        clearInterval(restInterval);
        restInterval = setInterval(() => {
          restSeconds++;
          updateFocusClockDisplay();
          document.title = `Resting: ${formatDurationHMS(restSeconds)} | Shinova`;
          saveActiveSessionState();
        }, 1000);
      } else {
        timerRunning = true;
        if (focusView) {
          focusView.classList.remove("resting-active");
          focusView.classList.add("focusing-active");
        }
        setElementText("focus-status-text", "FOCUSING");
        
        clearInterval(timerInterval);
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
          saveActiveSessionState();
        }, 1000);
      }
      showToast("Session recovered!", "success");
    } else {
      timerRunning = false;
      const focusView = document.getElementById("view-focus");
      if (focusView) {
        focusView.classList.remove("focusing-active", "resting-active");
      }
      setElementText("focus-status-text", "PAUSED");
      updateFocusClockDisplay();
    }
  } catch (err) {
    console.error("Failed to recover active session state:", err);
    clearActiveSessionState();
  }
}

// ==========================================
// App Initialization
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initData();
  initAmbientSoundsFromStorage();
  checkAndRecoverSession();
  startLocalClock();
  applyTheme(appState.user.theme);
  
  // Set initial greeting
  const homeUserEl = document.getElementById("home-username");
  if (homeUserEl) homeUserEl.innerText = appState.user.username;

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
  initMusicSpace();
  
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

  // Unblock autoplay for active ambient sounds on first interaction
  ["click", "keydown", "touchstart"].forEach(evtName => {
    document.addEventListener(evtName, tryPlayAllActiveAmbientSounds);
  });
});

// Load state from local storage or pre-populate defaults
function initData() {
  const localUser = localStorage.getItem("ypt_user");
  const localSubjects = localStorage.getItem("ypt_subjects");
  const localLogs = localStorage.getItem("ypt_logs");
  const localTodos = localStorage.getItem("ypt_todos");
  const isInitialized = localStorage.getItem("ypt_initialized");
  const localCustomTracks = localStorage.getItem("ypt_custom_tracks");
  
  appState.customTracks = localCustomTracks ? JSON.parse(localCustomTracks) : [];
  appState.musicVolume = localStorage.getItem("ypt_music_volume") !== null ? parseInt(localStorage.getItem("ypt_music_volume")) : 70;
  appState.musicQueue = [];
  appState.currentTrackIndex = null;
  appState.musicPlaying = false;
  appState.musicLoop = "none";
  appState.musicShuffle = false;
  appState.libraryMode = "online";
  appState.onlineTracks = [];

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
      saveActiveSessionState();
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
      saveAmbientSoundsState();
    });

    volumeSlider.addEventListener("input", (e) => {
      setAmbientVolume(soundKey, e.target.value / 100);
      saveAmbientSoundsState();
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
  saveActiveSessionState();
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

    const editBtn = document.createElement("button");
    editBtn.className = "subject-dropdown-item-edit";
    editBtn.setAttribute("title", "Edit Subject");
    editBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
    `;

    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.style.display = "none";
      openEditSubjectModal(sub.id);
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
    row.appendChild(editBtn);
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
    
    editingSubjectId = null;
    setElementText("subject-modal-title", "Add New Subject");
    const submitBtn = document.querySelector("#subject-form button[type='submit']");
    if (submitBtn) submitBtn.innerText = "Create Subject";

    // Reset color dots and custom hue slider to default
    document.querySelectorAll("#modal-subject .color-dot").forEach(d => d.classList.remove("active"));
    const firstDot = document.querySelector("#modal-subject .color-dot");
    if (firstDot) firstDot.classList.add("active");
    const customHueSlider = document.getElementById("custom-subject-hue");
    if (customHueSlider) customHueSlider.value = 270;
    const customColorPreview = document.getElementById("custom-color-preview");
    if (customColorPreview) {
      customColorPreview.style.backgroundColor = "hsl(270, 70%, 60%)";
      customColorPreview.style.boxShadow = "0 0 10px hsl(270, 70%, 60%)";
    }

    // Open add subject modal
    const nameInput = document.getElementById("subject-name");
    if (nameInput) nameInput.value = "";
    document.getElementById("modal-subject").classList.add("active");
  });
  dropdown.appendChild(addBtn);
}

function openEditSubjectModal(subjectId) {
  editingSubjectId = subjectId;
  const sub = appState.subjects.find(s => s.id === subjectId);
  if (!sub) return;

  const nameInput = document.getElementById("subject-name");
  if (nameInput) nameInput.value = sub.name;

  // Select correct color dot or populate custom color picker
  document.querySelectorAll("#modal-subject .color-dot").forEach(d => {
    if (d.getAttribute("data-color") === sub.color) {
      d.classList.add("active");
    } else {
      d.classList.remove("active");
    }
  });

  const hue = getHueFromColor(sub.color);
  const customHueSlider = document.getElementById("custom-subject-hue");
  if (customHueSlider) customHueSlider.value = hue;

  const customColorPreview = document.getElementById("custom-color-preview");
  if (customColorPreview) {
    const finalColor = sub.color.startsWith("hsl") ? sub.color : `hsl(${hue}, 70%, 60%)`;
    customColorPreview.style.backgroundColor = finalColor;
    customColorPreview.style.boxShadow = `0 0 10px ${finalColor}`;
  }

  // Update modal title and button text
  setElementText("subject-modal-title", "Edit Subject");
  const submitBtn = document.querySelector("#subject-form button[type='submit']");
  if (submitBtn) submitBtn.innerText = "Save Changes";

  const modalSub = document.getElementById("modal-subject");
  if (modalSub) modalSub.classList.add("active");
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
    saveActiveSessionState();
  }, 1000);
  saveActiveSessionState();
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
  saveActiveSessionState();
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
    saveActiveSessionState();
  }, 1000);
  saveActiveSessionState();
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
  saveActiveSessionState();
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
  clearActiveSessionState();

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

function updateActiveSubjectBadge() {
  if (!activeSubjectId) return;
  const sub = appState.subjects.find(s => s.id === activeSubjectId);
  if (!sub) return;

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
      
      // Reset color dots and custom hue slider to default
      document.querySelectorAll("#modal-subject .color-dot").forEach(d => d.classList.remove("active"));
      const firstDot = document.querySelector("#modal-subject .color-dot");
      if (firstDot) firstDot.classList.add("active");
      
      const customHueSlider = document.getElementById("custom-subject-hue");
      if (customHueSlider) customHueSlider.value = 270;
      const customColorPreview = document.getElementById("custom-color-preview");
      if (customColorPreview) {
        customColorPreview.style.backgroundColor = "hsl(270, 70%, 60%)";
        customColorPreview.style.boxShadow = "0 0 10px hsl(270, 70%, 60%)";
      }

      const modalSub = document.getElementById("modal-subject");
      if (modalSub) modalSub.classList.add("active");
    });
  }

  // Subject color dot selection
  document.querySelectorAll("#modal-subject .color-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      document.querySelectorAll("#modal-subject .color-dot").forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });

  // Custom Color Picker slider input
  const customHueSlider = document.getElementById("custom-subject-hue");
  const customColorPreview = document.getElementById("custom-color-preview");
  if (customHueSlider) {
    customHueSlider.addEventListener("input", (e) => {
      const hue = e.target.value;
      const HSLColor = `hsl(${hue}, 70%, 60%)`;
      if (customColorPreview) {
        customColorPreview.style.backgroundColor = HSLColor;
        customColorPreview.style.boxShadow = `0 0 10px ${HSLColor}`;
      }
      // Deselect preset dots when choosing a custom color
      document.querySelectorAll("#modal-subject .color-dot").forEach(d => d.classList.remove("active"));
    });
  }

  // Subject Form submission
  const subjectForm = document.getElementById("subject-form");
  if (subjectForm) {
    subjectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("subject-name");
      const name = nameInput ? nameInput.value.trim() : "";
      
      const activeColorDot = document.querySelector("#modal-subject .color-dot.active");
      let color;
      if (activeColorDot) {
        color = activeColorDot.getAttribute("data-color");
      } else {
        const hueSlider = document.getElementById("custom-subject-hue");
        const hue = hueSlider ? hueSlider.value : 270;
        color = `hsl(${hue}, 70%, 60%)`;
      }

      if (name) {
        if (editingSubjectId) {
          // Edit Mode
          const subIndex = appState.subjects.findIndex(s => s.id === editingSubjectId);
          if (subIndex !== -1) {
            appState.subjects[subIndex].name = name;
            appState.subjects[subIndex].color = color;
            localStorage.setItem("ypt_subjects", JSON.stringify(appState.subjects));
            
            // If it is the active subject, update the focus badge
            if (activeSubjectId === editingSubjectId) {
              updateActiveSubjectBadge();
            }

            // Sync Weekly Chart / Subject Chart colors and names if Insights are initialized
            if (window.Chart && typeof updateChartsThemes === "function") {
              updateChartsThemes();
            }

            renderSubjectDropdown();
            
            // Get active filter for todo list
            const activeFilterBtn = document.querySelector(".filter-btn.active");
            const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
            renderTodoList(activeFilter);
            
            showToast("Subject updated successfully!", "success");
          }
          editingSubjectId = null;
        } else {
          // Create Mode
          const newSub = {
            id: `sub-${Date.now()}`,
            name: name,
            color: color,
            totalTime: 0
          };
          
          appState.subjects.push(newSub);
          localStorage.setItem("ypt_subjects", JSON.stringify(appState.subjects));
          
          // If in focus view, switch to the new subject immediately
          const focusView = document.getElementById("view-focus");
          if (focusView && focusView.classList.contains("active")) {
            changeActiveSubject(newSub.id);
          } else {
            renderSubjectDropdown();
          }
          showToast("Subject created successfully!", "success");
        }
        
        document.getElementById("modal-subject").classList.remove("active");
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

  // About Developer Modal open/close listeners
  const btnAbout = document.getElementById("btn-about");
  const modalAbout = document.getElementById("modal-about");
  const btnCloseAboutModal = document.getElementById("btn-close-about-modal");

  if (btnAbout && modalAbout) {
    btnAbout.addEventListener("click", () => {
      modalAbout.classList.add("active");
    });
  }

  if (btnCloseAboutModal && modalAbout) {
    btnCloseAboutModal.addEventListener("click", () => {
      modalAbout.classList.remove("active");
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
        const thumbUrl = w.url.replace("backgrounds/", "backgrounds/thumbnails/");
        item.innerHTML = `
          <img src="${thumbUrl}" alt="${w.name}" loading="lazy">
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

// ==========================================
// Music Space Manager (Lo-fi Library & Custom Playlist)
// ==========================================
function initMusicSpace() {
  loadYouTubeAPI();
  const musicToggleBtn = document.getElementById("btn-toggle-music");
  const soundboardToggleBtn = document.getElementById("btn-toggle-soundboard");
  const musicWidget = document.getElementById("floating-music-widget");
  const globalPlayer = document.getElementById("music-global-player");
  const fileInput = document.getElementById("music-local-file-input");

  function openMusicWidgetWithTab(tabId, toggleBtn) {
    const tabButtons = document.querySelectorAll(".music-tab-btn");
    tabButtons.forEach(btn => {
      if (btn.getAttribute("data-music-tab") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    document.querySelectorAll(".music-tab-content").forEach(content => {
      if (content.id === `music-tab-${tabId}`) {
        content.classList.add("active");
      } else {
        content.classList.remove("active");
      }
    });

    if (tabId === "queue") renderMusicQueue();
    else if (tabId === "library") renderMusicLibrary();

    if (musicWidget) musicWidget.classList.add("active");
    if (musicToggleBtn) musicToggleBtn.classList.toggle("active", musicToggleBtn === toggleBtn);
    if (soundboardToggleBtn) soundboardToggleBtn.classList.toggle("active", soundboardToggleBtn === toggleBtn);
  }

  function closeMusicWidget() {
    if (musicWidget) musicWidget.classList.remove("active");
    if (musicToggleBtn) musicToggleBtn.classList.remove("active");
    if (soundboardToggleBtn) soundboardToggleBtn.classList.remove("active");
  }
  
  // Tab Switchers
  const tabButtons = document.querySelectorAll(".music-tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-music-tab");
      
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      document.querySelectorAll(".music-tab-content").forEach(content => {
        if (content.id === `music-tab-${tabId}`) {
          content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      });
      
      if (tabId === "queue") {
        renderMusicQueue();
      } else if (tabId === "library") {
        renderMusicLibrary();
      }
    });
  });

  // Toggle Widget Panel via buttons
  if (musicToggleBtn && musicWidget) {
    musicToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = musicWidget.classList.contains("active");
      const activeTabBtn = document.querySelector(".music-tab-btn.active");
      const activeTab = activeTabBtn ? activeTabBtn.getAttribute("data-music-tab") : "player";

      if (isActive && activeTab !== "ambient") {
        closeMusicWidget();
      } else {
        const nextTab = activeTab === "ambient" ? "player" : activeTab;
        openMusicWidgetWithTab(nextTab, musicToggleBtn);
      }
    });
  }

  if (soundboardToggleBtn && musicWidget) {
    soundboardToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = musicWidget.classList.contains("active");
      const activeTabBtn = document.querySelector(".music-tab-btn.active");
      const activeTab = activeTabBtn ? activeTabBtn.getAttribute("data-music-tab") : "player";

      if (isActive && activeTab === "ambient") {
        closeMusicWidget();
      } else {
        openMusicWidgetWithTab("ambient", soundboardToggleBtn);
      }
    });
  }

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    // If the clicked element is no longer in the DOM (e.g. removed during library re-render),
    // we assume it was inside the widget and do not close it.
    if (!document.body.contains(e.target)) return;

    if (musicWidget && musicWidget.classList.contains("active") && 
        !musicWidget.contains(e.target) && 
        e.target !== musicToggleBtn && 
        (!musicToggleBtn || !musicToggleBtn.contains(e.target)) && 
        e.target !== soundboardToggleBtn && 
        (!soundboardToggleBtn || !soundboardToggleBtn.contains(e.target))) {
      
      const trackModal = document.getElementById("modal-add-track");
      if (trackModal && trackModal.classList.contains("active")) return;
      const confirmModal = document.getElementById("modal-custom-confirm");
      if (confirmModal && confirmModal.classList.contains("active")) return;

      closeMusicWidget();
    }
  });

  // Set Player Initial Volume
  if (globalPlayer) {
    globalPlayer.volume = appState.musicVolume / 100;
  }
  const volumeSlider = document.getElementById("music-volume");
  if (volumeSlider) {
    volumeSlider.value = appState.musicVolume;
    volumeSlider.addEventListener("input", (e) => {
      const vol = parseInt(e.target.value);
      appState.musicVolume = vol;
      localStorage.setItem("ypt_music_volume", vol);
      if (globalPlayer) {
        globalPlayer.volume = vol / 100;
      }
      if (ytPlayerReady && ytPlayer && ytPlayer.setVolume) {
        ytPlayer.setVolume(vol);
      }
    });
  }

  // Play / Pause Button
  const playPauseBtn = document.getElementById("music-btn-play-pause");
  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
      toggleMusicPlayback();
    });
  }

  // Next / Prev Buttons
  const nextBtn = document.getElementById("music-btn-next");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      playNextTrack();
    });
  }
  
  const prevBtn = document.getElementById("music-btn-prev");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      playPreviousTrack();
    });
  }

  // Shuffle Button
  const shuffleBtn = document.getElementById("music-btn-shuffle");
  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", () => {
      appState.musicShuffle = !appState.musicShuffle;
      shuffleBtn.classList.toggle("active", appState.musicShuffle);
      showToast(appState.musicShuffle ? "Shuffle enabled" : "Shuffle disabled", "info");
    });
  }

  // Loop Button
  const loopBtn = document.getElementById("music-btn-loop");
  const loopBadge = document.getElementById("music-loop-badge");
  if (loopBtn) {
    loopBtn.addEventListener("click", () => {
      if (appState.musicLoop === "none") {
        appState.musicLoop = "all";
        loopBtn.classList.add("active");
        if (loopBadge) {
          loopBadge.innerText = "A";
          loopBadge.classList.remove("hidden");
        }
        showToast("Looping all tracks", "info");
      } else if (appState.musicLoop === "all") {
        appState.musicLoop = "one";
        loopBtn.classList.add("active");
        if (loopBadge) {
          loopBadge.innerText = "1";
          loopBadge.classList.remove("hidden");
        }
        showToast("Looping current track", "info");
      } else {
        appState.musicLoop = "none";
        loopBtn.classList.remove("active");
        if (loopBadge) {
          loopBadge.classList.add("hidden");
        }
        showToast("Looping disabled", "info");
      }
    });
  }

  // Scrubber Progress Events
  const progressBar = document.getElementById("music-progress-bar");
  if (progressBar && globalPlayer) {
    globalPlayer.addEventListener("timeupdate", () => {
      const currentTrack = appState.currentTrackIndex !== null ? appState.musicQueue[appState.currentTrackIndex] : null;
      if (currentTrack && currentTrack.category === "youtube") return;

      if (globalPlayer.duration) {
        const pct = (globalPlayer.currentTime / globalPlayer.duration) * 100;
        progressBar.value = pct;
        
        document.getElementById("music-time-current").innerText = formatTimeMS(globalPlayer.currentTime);
        document.getElementById("music-time-total").innerText = formatTimeMS(globalPlayer.duration);
      }
    });

    globalPlayer.addEventListener("loadedmetadata", () => {
      const currentTrack = appState.currentTrackIndex !== null ? appState.musicQueue[appState.currentTrackIndex] : null;
      if (currentTrack && currentTrack.category === "youtube") return;
      document.getElementById("music-time-total").innerText = formatTimeMS(globalPlayer.duration);
    });

    globalPlayer.addEventListener("ended", () => {
      const currentTrack = appState.currentTrackIndex !== null ? appState.musicQueue[appState.currentTrackIndex] : null;
      if (currentTrack && currentTrack.category === "youtube") return;
      handleTrackEnded();
    });

    progressBar.addEventListener("input", (e) => {
      const currentTrack = appState.currentTrackIndex !== null ? appState.musicQueue[appState.currentTrackIndex] : null;
      if (currentTrack && currentTrack.category === "youtube") {
        if (ytPlayerReady && ytPlayer && ytPlayer.getDuration) {
          const time = (parseFloat(e.target.value) / 100) * ytPlayer.getDuration();
          ytPlayer.seekTo(time, true);
        }
      } else {
        if (globalPlayer.duration) {
          const time = (parseFloat(e.target.value) / 100) * globalPlayer.duration;
          globalPlayer.currentTime = time;
        }
      }
    });
  }

  // Search Library
  const searchInput = document.getElementById("music-search");
  let onlineSearchTimeout = null;
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      if (onlineSearchTimeout) {
        clearTimeout(onlineSearchTimeout);
      }
      
      const query = searchInput.value.trim();
      if (!query) {
        const container = document.getElementById("music-library-list");
        if (container) {
          container.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 0.75rem; padding: 1.5rem 0;">Enter text to search...</div>`;
        }
        return;
      }
      
      const container = document.getElementById("music-library-list");
      if (container) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 0.75rem; padding: 1.5rem 0;">Searching...</div>`;
      }
      
      onlineSearchTimeout = setTimeout(() => {
        searchOnlineTracks(query);
      }, 500);
    });
  }

  // Clear Queue Button
  const clearQueueBtn = document.getElementById("btn-clear-music-queue");
  if (clearQueueBtn) {
    clearQueueBtn.addEventListener("click", () => {
      clearMusicQueue();
    });
  }

  // Render initial count
  updateQueueCountBadge();
}

function formatTimeMS(seconds) {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

// Get the merged tracks list (default + custom URLs + custom local files)
function getFullTrackLibrary() {
  return [...DEFAULT_MUSIC_TRACKS, ...appState.customTracks];
}

// Render Library List
function renderMusicLibrary() {
  renderOnlineLibrary();
}

async function initInvidiousInstance() {
  try {
    const res = await fetch("https://api.invidious.io/instances.json");
    const data = await res.json();
    for (const item of data) {
      const details = item[1];
      if (details.type === "https" && details.cors === true && details.api === true) {
        try {
          const testRes = await fetch(`${details.uri}/api/v1/search?q=test&limit=1`);
          if (testRes.ok) {
            invidiousInstance = details.uri;
            console.log("Selected Invidious Instance:", invidiousInstance);
            return;
          }
        } catch (e) {}
      }
    }
  } catch (err) {
    console.warn("Could not load Invidious instances, using fallback:", invidiousInstance);
  }
}

async function searchOnlineTracks(query) {
  if (!query) {
    appState.onlineTracks = [];
    renderOnlineLibrary();
    return;
  }
  
  const searchQuery = query;
  
  if (!invidiousInstance) {
    await initInvidiousInstance();
  }
  
  const limit = 25;
  const url = `${invidiousInstance}/api/v1/search?q=${encodeURIComponent(searchQuery)}&limit=${limit}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    
    if (data && Array.isArray(data)) {
      const videos = data.filter(item => item.type === "video" || item.type === "short");
      appState.onlineTracks = videos.map(item => ({
        id: `youtube-${item.videoId}`,
        title: item.title,
        artist: item.author,
        url: item.videoId,
        image: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`,
        category: "youtube",
        videoId: item.videoId
      }));
    } else {
      appState.onlineTracks = [];
    }
  } catch (err) {
    console.error("Error searching Invidious tracks:", err);
    try {
      console.log("Retrying search with fresh instance list...");
      await initInvidiousInstance();
      const retryUrl = `${invidiousInstance}/api/v1/search?q=${encodeURIComponent(searchQuery)}&limit=${limit}`;
      const res = await fetch(retryUrl);
      const data = await res.json();
      if (data && Array.isArray(data)) {
        const videos = data.filter(item => item.type === "video" || item.type === "short");
        appState.onlineTracks = videos.map(item => ({
          id: `youtube-${item.videoId}`,
          title: item.title,
          artist: item.author,
          url: item.videoId,
          image: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`,
          category: "youtube",
          videoId: item.videoId
        }));
      } else {
        appState.onlineTracks = [];
      }
    } catch (retryErr) {
      console.error("Invidious search retry failed:", retryErr);
      appState.onlineTracks = [];
      showToast("Online search offline. Try again.", "danger");
    }
  }

  if (appState.libraryMode === 'online') {
    renderOnlineLibrary();
  }
}

function renderOnlineLibrary() {
  const container = document.getElementById("music-library-list");
  if (!container) return;

  container.innerHTML = "";

  const searchInput = document.getElementById("music-search");
  const query = searchInput ? searchInput.value.trim() : "";

  if (!query) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 0.75rem; padding: 1.5rem 0;">Enter text to search...</div>`;
    return;
  }

  if (appState.onlineTracks.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 0.75rem; padding: 1.5rem 0;">No tracks found. Try another search!</div>`;
    return;
  }

  appState.onlineTracks.forEach(track => {
    const item = document.createElement("div");
    item.className = "library-track-item";
    
    const currentTrack = appState.currentTrackIndex !== null ? appState.musicQueue[appState.currentTrackIndex] : null;
    const isCurrentlyPlaying = currentTrack && currentTrack.id === track.id;

    if (isCurrentlyPlaying) {
      item.classList.add("active");
    }

    const imgHtml = track.image ? `<img src="${track.image}" class="track-item-artwork" alt="artwork">` : '';

    item.innerHTML = `
      ${imgHtml}
      <div class="track-item-info">
        <span class="track-item-title">${track.title}</span>
        <span class="track-item-artist">${track.artist}</span>
      </div>
      <div class="track-item-actions">
        <button class="track-item-btn play" title="Play Now">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
        </button>
        <button class="track-item-btn enqueue" title="Add to Queue">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
    `;

    item.querySelector(".track-item-info").addEventListener("click", () => {
      playLibraryTrackImmediately(track);
    });

    item.querySelector(".play").addEventListener("click", () => {
      playLibraryTrackImmediately(track);
    });

    item.querySelector(".enqueue").addEventListener("click", () => {
      addTrackToQueue(track, false);
    });

    container.appendChild(item);
  });
}

function loadYouTubeAPI() {
  if (window.YT) return;
  
  window.onYouTubeIframeAPIReady = function() {
    const container = document.createElement("div");
    container.id = "youtube-player-container";
    container.style.position = "absolute";
    container.style.width = "1px";
    container.style.height = "1px";
    container.style.opacity = "0";
    container.style.pointerEvents = "none";
    document.body.appendChild(container);

    ytPlayer = new YT.Player("youtube-player-container", {
      height: "1",
      width: "1",
      videoId: "",
      playerVars: {
        playsinline: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        rel: 0,
        modestbranding: 1
      },
      events: {
        onReady: (event) => {
          ytPlayerReady = true;
          ytPlayer.setVolume(appState.musicVolume);
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.ENDED) {
            handleTrackEnded();
          } else if (event.data === YT.PlayerState.PLAYING) {
            appState.musicPlaying = true;
            updateMusicControlIcons();
          } else if (event.data === YT.PlayerState.PAUSED) {
            appState.musicPlaying = false;
            updateMusicControlIcons();
          }
        }
      }
    });
  };

  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function startYouTubeTimeUpdater() {
  if (ytTimeInterval) clearInterval(ytTimeInterval);
  
  ytTimeInterval = setInterval(() => {
    const currentTrack = appState.currentTrackIndex !== null ? appState.musicQueue[appState.currentTrackIndex] : null;
    if (!currentTrack || currentTrack.category !== "youtube") {
      clearInterval(ytTimeInterval);
      return;
    }
    
    if (ytPlayerReady && ytPlayer && ytPlayer.getCurrentTime && ytPlayer.getDuration) {
      try {
        const current = ytPlayer.getCurrentTime();
        const duration = ytPlayer.getDuration();
        if (duration) {
          const pct = (current / duration) * 100;
          const progressBar = document.getElementById("music-progress-bar");
          if (progressBar) progressBar.value = pct;
          
          document.getElementById("music-time-current").innerText = formatTimeMS(current);
          document.getElementById("music-time-total").innerText = formatTimeMS(duration);
        }
      } catch (e) {
        console.warn("YouTube time update failed:", e);
      }
    }
  }, 500);
}

// Render Queue List
function renderMusicQueue() {
  const container = document.getElementById("music-queue-list");
  if (!container) return;

  container.innerHTML = "";
  
  if (appState.musicQueue.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 0.75rem; padding: 2rem 0;">Queue is empty.<br><span style="font-size: 0.7rem; opacity: 0.6;">Add songs from the Library tab.</span></div>`;
    return;
  }

  appState.musicQueue.forEach((track, index) => {
    const item = document.createElement("div");
    item.className = "queue-track-item";
    
    const isCurrentlyPlaying = index === appState.currentTrackIndex;
    if (isCurrentlyPlaying) {
      item.classList.add("active");
    }

    item.innerHTML = `
      <div class="queue-track-info">
        <span class="queue-track-title">${index + 1}. ${track.title}</span>
        <span class="queue-track-artist">${track.artist} ${isCurrentlyPlaying ? '• (Now Playing)' : ''}</span>
      </div>
      <button class="queue-track-remove" title="Remove">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
      </button>
    `;

    // Click track to switch play to it
    item.querySelector(".queue-track-info").addEventListener("click", () => {
      playQueueTrack(index);
    });

    item.querySelector(".queue-track-remove").addEventListener("click", () => {
      removeTrackFromQueue(index);
    });

    container.appendChild(item);
  });
}

function updateQueueCountBadge() {
  const badge = document.getElementById("music-queue-count");
  if (badge) {
    badge.innerText = appState.musicQueue.length;
  }
}

// Add Track to Library (Custom URL)
function addCustomUrlTrack(title, artist, url) {
  const newTrack = {
    id: `custom-url-${Date.now()}`,
    title: title,
    artist: artist || "Custom Stream",
    url: url,
    category: "custom"
  };

  appState.customTracks.push(newTrack);
  localStorage.setItem("ypt_custom_tracks", JSON.stringify(appState.customTracks));
  
  // Re-render
  renderMusicLibrary();
}

// Add Local MP3 Files to Library/Queue
function addLocalFileTracks(fileList) {
  let firstNewIndex = appState.musicQueue.length;

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    const objectUrl = URL.createObjectURL(file);
    
    // Clean filename (strip extension)
    let title = file.name;
    const dotIdx = title.lastIndexOf(".");
    if (dotIdx !== -1) title = title.substring(0, dotIdx);

    const newTrack = {
      id: `custom-local-${Date.now()}-${i}`,
      title: title,
      artist: "Local Audio File",
      url: objectUrl,
      category: "local"
    };

    // Add to active library as session-only and queue
    appState.musicQueue.push(newTrack);
  }

  updateQueueCountBadge();
  showToast(`Added ${fileList.length} local track(s) to queue`, "success");
  
  // If nothing was playing, play the first added local song immediately
  if (appState.currentTrackIndex === null || !appState.musicPlaying) {
    playQueueTrack(firstNewIndex);
  } else {
    renderMusicQueue();
  }
}

// Delete Custom Track from Library
function deleteCustomTrack(trackId) {
  appState.customTracks = appState.customTracks.filter(t => t.id !== trackId);
  localStorage.setItem("ypt_custom_tracks", JSON.stringify(appState.customTracks));
  
  // If it was in queue, remove it from queue too
  appState.musicQueue = appState.musicQueue.filter(t => t.id !== trackId);
  updateQueueCountBadge();

  renderMusicLibrary();
  renderMusicQueue();
}

// Add track to queue
function addTrackToQueue(track, playImmediately = false) {
  appState.musicQueue.push(track);
  updateQueueCountBadge();
  showToast(`Added "${track.title}" to queue`, "success");

  if (playImmediately || appState.currentTrackIndex === null) {
    playQueueTrack(appState.musicQueue.length - 1);
  } else {
    renderMusicQueue();
  }
}

// Play track immediately from Library
function playLibraryTrackImmediately(track) {
  // Check if track is already in queue
  let idx = appState.musicQueue.findIndex(t => t.id === track.id);
  if (idx === -1) {
    // Add to queue
    appState.musicQueue.push(track);
    idx = appState.musicQueue.length - 1;
    updateQueueCountBadge();
  }
  
  playQueueTrack(idx);
}

// Play specific track in the queue by index
function playQueueTrack(queueIndex) {
  if (queueIndex < 0 || queueIndex >= appState.musicQueue.length) return;

  appState.currentTrackIndex = queueIndex;
  const track = appState.musicQueue[queueIndex];
  
  const globalPlayer = document.getElementById("music-global-player");
  
  // Update player metadata UI
  document.getElementById("music-track-title").innerText = track.title;
  document.getElementById("music-track-artist").innerText = track.artist;
  
  // Update vinyl artwork cover
  const vinylDisk = document.getElementById("music-vinyl-disk");
  if (vinylDisk) {
    if (track.image) {
      vinylDisk.style.backgroundImage = `url(${track.image})`;
      vinylDisk.style.backgroundSize = "cover";
      vinylDisk.style.backgroundPosition = "center";
    } else {
      vinylDisk.style.backgroundImage = "";
      vinylDisk.style.backgroundSize = "";
      vinylDisk.style.backgroundPosition = "";
    }
  }

  if (track.category === "youtube") {
    // Pause HTML5 player
    if (globalPlayer) {
      globalPlayer.pause();
    }
    
    // Play YouTube video
    if (ytPlayerReady && ytPlayer && ytPlayer.loadVideoById) {
      ytPlayer.loadVideoById(track.videoId);
      ytPlayer.playVideo();
      appState.musicPlaying = true;
      updateMusicControlIcons();
      startYouTubeTimeUpdater();
    } else {
      showToast("YouTube player is loading, please wait...", "warning");
    }
  } else {
    // Pause YouTube player
    if (ytPlayerReady && ytPlayer && ytPlayer.getPlayerState) {
      try {
        const state = ytPlayer.getPlayerState();
        if (state === YT.PlayerState.PLAYING || state === YT.PlayerState.BUFFERING) {
          ytPlayer.pauseVideo();
        }
      } catch (e) {
        console.warn("YouTube player state check failed:", e);
      }
    }

    if (globalPlayer) {
      globalPlayer.src = track.url;
      globalPlayer.load();
      
      // Start Playing
      globalPlayer.play().then(() => {
        appState.musicPlaying = true;
        updateMusicControlIcons();
      }).catch(err => {
        console.log("Audio autoplay block or URL load failure:", err);
        showToast("Autoplay blocked. Press Play to start.", "warning");
        appState.musicPlaying = false;
        updateMusicControlIcons();
      });
    }
  }

  // Update tabs render
  renderMusicQueue();
  renderMusicLibrary();
}

function toggleMusicPlayback() {
  const globalPlayer = document.getElementById("music-global-player");
  if (!globalPlayer) return;

  if (appState.musicQueue.length === 0) {
    showToast("Queue is empty. Search and play a song from the Library first.", "warning");
    return;
  }

  if (appState.currentTrackIndex === null) {
    appState.currentTrackIndex = 0;
  }

  const track = appState.musicQueue[appState.currentTrackIndex];

  if (track.category === "youtube") {
    if (ytPlayerReady && ytPlayer) {
      if (appState.musicPlaying) {
        ytPlayer.pauseVideo();
        appState.musicPlaying = false;
      } else {
        ytPlayer.playVideo();
        appState.musicPlaying = true;
        startYouTubeTimeUpdater();
      }
      updateMusicControlIcons();
    } else {
      showToast("YouTube player is loading, please wait...", "warning");
    }
  } else {
    if (appState.musicPlaying) {
      globalPlayer.pause();
      appState.musicPlaying = false;
    } else {
      if (globalPlayer.src !== track.url) {
        globalPlayer.src = track.url;
      }
      globalPlayer.play().then(() => {
        appState.musicPlaying = true;
      }).catch(err => {
        console.log("Error resuming music play:", err);
      });
    }
    updateMusicControlIcons();
  }
}

function updateMusicControlIcons() {
  const playIcon = document.getElementById("music-icon-play");
  const pauseIcon = document.getElementById("music-icon-pause");
  const vinylDisk = document.getElementById("music-vinyl-disk");

  if (appState.musicPlaying) {
    if (playIcon) playIcon.classList.add("hidden");
    if (pauseIcon) pauseIcon.classList.remove("hidden");
    if (vinylDisk) vinylDisk.classList.add("spinning");
  } else {
    if (playIcon) playIcon.classList.remove("hidden");
    if (pauseIcon) pauseIcon.classList.add("hidden");
    if (vinylDisk) vinylDisk.classList.remove("spinning");
  }
}

function playNextTrack() {
  if (appState.musicQueue.length === 0) return;

  if (appState.musicShuffle) {
    const nextIdx = Math.floor(Math.random() * appState.musicQueue.length);
    playQueueTrack(nextIdx);
    return;
  }

  let nextIdx = appState.currentTrackIndex + 1;
  
  if (nextIdx >= appState.musicQueue.length) {
    if (appState.musicLoop === "all") {
      nextIdx = 0;
    } else {
      // Loop is none or one, stop at end
      showToast("Reached the end of the queue.", "info");
      const globalPlayer = document.getElementById("music-global-player");
      if (globalPlayer) {
        globalPlayer.currentTime = 0;
        globalPlayer.pause();
      }
      appState.musicPlaying = false;
      updateMusicControlIcons();
      return;
    }
  }

  playQueueTrack(nextIdx);
}

function playPreviousTrack() {
  const globalPlayer = document.getElementById("music-global-player");
  if (globalPlayer && globalPlayer.currentTime > 3) {
    // If song is past 3 seconds, restart it
    globalPlayer.currentTime = 0;
    return;
  }

  if (appState.musicQueue.length === 0) return;

  let prevIdx = appState.currentTrackIndex - 1;
  if (prevIdx < 0) {
    if (appState.musicLoop === "all") {
      prevIdx = appState.musicQueue.length - 1;
    } else {
      prevIdx = 0; // stay on first
    }
  }

  playQueueTrack(prevIdx);
}

function handleTrackEnded() {
  if (appState.musicLoop === "one") {
    // Replay current
    playQueueTrack(appState.currentTrackIndex);
  } else {
    // Skip to next
    playNextTrack();
  }
}

function removeTrackFromQueue(index) {
  const wasPlayingCurrent = index === appState.currentTrackIndex;
  
  appState.musicQueue.splice(index, 1);
  updateQueueCountBadge();

  if (appState.musicQueue.length === 0) {
    // Queue is empty now
    appState.currentTrackIndex = null;
    appState.musicPlaying = false;
    const globalPlayer = document.getElementById("music-global-player");
    if (globalPlayer) {
      globalPlayer.src = "";
    }
    document.getElementById("music-track-title").innerText = "Not Playing";
    document.getElementById("music-track-artist").innerText = "Select a song from Library";
    
    // Reset vinyl background
    const vinylDisk = document.getElementById("music-vinyl-disk");
    if (vinylDisk) {
      vinylDisk.style.backgroundImage = "";
      vinylDisk.style.backgroundSize = "";
      vinylDisk.style.backgroundPosition = "";
    }

    updateMusicControlIcons();
  } else {
    if (wasPlayingCurrent) {
      // Play whatever has slid into the current index
      let nextIdx = index;
      if (nextIdx >= appState.musicQueue.length) nextIdx = 0;
      playQueueTrack(nextIdx);
    } else {
      // Adjust active track index if index before current was deleted
      if (index < appState.currentTrackIndex) {
        appState.currentTrackIndex--;
      }
      renderMusicQueue();
    }
  }
}

function clearMusicQueue() {
  appState.musicQueue = [];
  appState.currentTrackIndex = null;
  appState.musicPlaying = false;
  
  updateQueueCountBadge();
  
  const globalPlayer = document.getElementById("music-global-player");
  if (globalPlayer) {
    globalPlayer.src = "";
  }
  document.getElementById("music-track-title").innerText = "Not Playing";
  document.getElementById("music-track-artist").innerText = "Select a song from Library";
  
  // Reset vinyl background
  const vinylDisk = document.getElementById("music-vinyl-disk");
  if (vinylDisk) {
    vinylDisk.style.backgroundImage = "";
    vinylDisk.style.backgroundSize = "";
    vinylDisk.style.backgroundPosition = "";
  }
  
  updateMusicControlIcons();
  renderMusicQueue();
  renderMusicLibrary();
  showToast("Queue cleared", "info");
}
