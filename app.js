/**
 * Qalmotype - Core Engine (Studio V3 Ultimate Edition)
 * GoodNotes-Style Continuous Multi-Page Engine:
 * Pages flow vertically downwards with authentic separation, realistic paper depth,
 * 22+ authentic handwriting fonts, highlighter markers, chai stains, teacher red ticks,
 * student signatures, and instant multi-page PDF generation.
 */

// STATE MANAGEMENT
const state = {
  text: '',
  fontFamily: 'Caveat',
  selectedCategory: 'all',
  fontSearchQuery: '',
  fontSize: 21,
  lineHeight: 35,
  letterSpacing: 1.0,
  wordSpacing: 7.0,
  bodyColor: '#103b78',
  headingColor: '#b91c1c',
  highlighterColor: 'rgba(254, 240, 138, 0.65)',
  penType: 'ballpoint',
  paperType: 'ruled-margin',
  outputMode: 'photo', // 'photo' or 'print'
  snapToLines: true,
  customPaperImage: null,
  diagramImage: null,
  diagramSize: 220,
  topMargin: 95,
  leftMargin: 115,
  rightMargin: 70,
  bottomMargin: 80,
  baselineJitter: 1.2,
  rotationJitter: 1.0,
  inkBleed: 0.3,
  showCoffeeStain: true,
  showTeacherTicks: true,
  showSignature: true,
  showWrinkles: true,
  drawMode: false,
  pageDrawings: {},
  signatureName: 'Muhammad Ali',
  lightingMode: 'desk-lamp',
  showHoles: true,
  showHeaderMeta: true,
  totalPages: 1,
  zoom: 1.0
};

// MASSIVE CURATED REALISTIC FONTS CATALOG (22+ HANDS)
const HANDWRITING_FONTS = [
  // DOCTOR / MEDICAL
  {
    id: 'Kristi',
    name: 'Doctor Prescription (Rx)',
    category: 'doctor',
    sample: 'Rx Tab Paracetamol 500mg TDS',
    tag: 'Doctor Rx',
    tagClass: 'tag-messy',
    font: 'Kristi, cursive'
  },
  {
    id: 'Cedarville Cursive',
    name: 'Doctor Hurried Notes',
    category: 'doctor',
    sample: 'Clinic examination notes & vitals',
    tag: 'Doctor Cursive',
    tagClass: 'tag-messy',
    font: '"Cedarville Cursive", cursive'
  },
  {
    id: 'Reenie Beanie',
    name: 'Doctor Scribble',
    category: 'doctor',
    sample: 'Ultra-fast hurried doctor scribble',
    tag: 'Doctor Scribble',
    tagClass: 'tag-messy',
    font: '"Reenie Beanie", cursive'
  },

  // MESSY & RUSHED
  {
    id: 'Just Another Hand',
    name: 'Messy Hurried Student',
    category: 'messy',
    sample: 'Rushed 5-minutes before submission',
    tag: 'Messy Rushed',
    tagClass: 'tag-messy',
    font: '"Just Another Hand", cursive'
  },
  {
    id: 'Zeyada',
    name: 'Scratchy Messy Hand',
    category: 'messy',
    sample: 'Fast careless notes on scratchpad',
    tag: 'Messy Scratch',
    tagClass: 'tag-messy',
    font: 'Zeyada, cursive'
  },
  {
    id: 'Homemade Apple',
    name: 'Loose Messy Cursive',
    category: 'messy',
    sample: 'Raw unorganized cursive hand',
    tag: 'Messy Cursive',
    tagClass: 'tag-messy',
    font: '"Homemade Apple", cursive'
  },
  {
    id: 'Nothing You Could Do',
    name: 'Fast Scribble Hand',
    category: 'messy',
    sample: 'Quick hurried ballpoint scribbles',
    tag: 'Quick Scribble',
    tagClass: 'tag-messy',
    font: '"Nothing You Could Do", cursive'
  },
  {
    id: 'Waiting for the Sunrise',
    name: 'Thin Hurried Pen',
    category: 'messy',
    sample: 'Thin irregular hurried lecture hand',
    tag: 'Thin Messy',
    tagClass: 'tag-messy',
    font: '"Waiting for the Sunrise", cursive'
  },

  // STUDENT & COLLEGE
  {
    id: 'Caveat',
    name: 'Everyday Notes',
    category: 'student',
    sample: 'Natural expressive student notes',
    tag: 'Casual Hand',
    tagClass: 'tag-neat',
    font: 'Caveat, cursive'
  },
  {
    id: 'Kalam',
    name: 'Desi Student Ballpoint',
    category: 'student',
    sample: 'Subcontinent university register writing',
    tag: 'Ballpoint Hand',
    tagClass: 'tag-neat',
    font: 'Kalam, cursive'
  },
  {
    id: 'Dekko',
    name: 'College Notebook Hand',
    category: 'student',
    sample: 'Everyday classroom lecture writing',
    tag: 'College Hand',
    tagClass: 'tag-neat',
    font: 'Dekko, cursive'
  },
  {
    id: 'Playpen Sans',
    name: 'Relaxed Student Hand',
    category: 'student',
    sample: 'Relaxed readable student handwriting',
    tag: 'Relaxed Print',
    tagClass: 'tag-neat',
    font: '"Playpen Sans", cursive'
  },
  {
    id: 'Handlee',
    name: 'Modern Student Notes',
    category: 'student',
    sample: 'Casual modern student notebook hand',
    tag: 'Modern Notes',
    tagClass: 'tag-neat',
    font: 'Handlee, cursive'
  },
  {
    id: 'Patrick Hand',
    name: 'Neat Print Classroom',
    category: 'student',
    sample: 'Clear legible print handwriting',
    tag: 'Neat Print',
    tagClass: 'tag-neat',
    font: '"Patrick Hand", cursive'
  },

  // CLASS TOPPER (CLEAN & NEAT)
  {
    id: 'Shadows Into Light',
    name: 'Class Topper Clean',
    category: 'topper',
    sample: 'Neat organized exam assignment',
    tag: 'Clean Topper',
    tagClass: 'tag-neat',
    font: '"Shadows Into Light", cursive'
  },
  {
    id: 'Indie Flower',
    name: 'Bubbly Friendly Hand',
    category: 'topper',
    sample: 'Rounded cheerful friendly handwriting',
    tag: 'Clean Casual',
    tagClass: 'tag-neat',
    font: '"Indie Flower", cursive'
  },
  {
    id: 'Architects Daughter',
    name: 'Architect Technical Hand',
    category: 'topper',
    sample: 'Clean structured engineering style',
    tag: 'Technical Print',
    tagClass: 'tag-neat',
    font: '"Architects Daughter", cursive'
  },

  // FOUNTAIN & CURSIVE
  {
    id: 'Marck Script',
    name: 'Classic Fountain Script',
    category: 'cursive',
    sample: 'Flowing vintage ink signature hand',
    tag: 'Vintage Nib',
    tagClass: 'tag-cursive',
    font: '"Marck Script", cursive'
  },
  {
    id: 'Beth Ellen',
    name: 'Raw Organic Hand',
    category: 'cursive',
    sample: 'Authentic organic human lettering',
    tag: 'Organic Hand',
    tagClass: 'tag-cursive',
    font: '"Beth Ellen", cursive'
  },
  {
    id: 'Dawning of a New Day',
    name: 'Delicate Fine Script',
    category: 'cursive',
    sample: 'Soft delicate flowing cursive hand',
    tag: 'Fine Cursive',
    tagClass: 'tag-cursive',
    font: '"Dawning of a New Day", cursive'
  },
  {
    id: 'Square Peg',
    name: 'Loopy Fast Cursive',
    category: 'cursive',
    sample: 'Rapid flowing loopy handwriting',
    tag: 'Loopy Cursive',
    tagClass: 'tag-cursive',
    font: '"Square Peg", cursive'
  },

  // MARKER & ROUGH
  {
    id: 'Rock Salt',
    name: 'Bold Felt Marker',
    category: 'messy',
    sample: 'Bold rough felt-tip pen writing',
    tag: 'Rough Marker',
    tagClass: 'tag-messy',
    font: '"Rock Salt", cursive'
  },
  {
    id: 'Gloria Hallelujah',
    name: 'Heavy Marker Notes',
    category: 'student',
    sample: 'Bold confident handwritten text',
    tag: 'Bold Notes',
    tagClass: 'tag-neat',
    font: '"Gloria Hallelujah", cursive'
  }
];

// PRESETS DEFINITIONS
const PRESETS = {
  'doctor-rx': {
    fontFamily: 'Kristi',
    penType: 'ballpoint',
    bodyColor: '#103b78',
    headingColor: '#103b78',
    baselineJitter: 2.8,
    rotationJitter: 1.8,
    fontSize: 27,
    lineHeight: 36,
    paperType: 'ruled-plain'
  },
  doctor: {
    fontFamily: 'Reenie Beanie',
    penType: 'ballpoint',
    bodyColor: '#103b78',
    headingColor: '#0f172a',
    baselineJitter: 2.3,
    rotationJitter: 1.6,
    fontSize: 26,
    lineHeight: 33,
    paperType: 'ruled-plain'
  },
  rushed: {
    fontFamily: 'Just Another Hand',
    penType: 'ballpoint',
    bodyColor: '#103b78',
    headingColor: '#103b78',
    baselineJitter: 2.0,
    rotationJitter: 1.4,
    fontSize: 24,
    lineHeight: 32,
    paperType: 'ruled-margin'
  },
  topper: {
    fontFamily: 'Shadows Into Light',
    penType: 'gel',
    bodyColor: '#0f172a',
    headingColor: '#b91c1c',
    baselineJitter: 0.6,
    rotationJitter: 0.4,
    fontSize: 20,
    lineHeight: 35,
    paperType: 'ruled-margin'
  },
  engineering: {
    fontFamily: 'Architects Daughter',
    penType: 'gel',
    bodyColor: '#0f172a',
    headingColor: '#1e3a8a',
    baselineJitter: 0.8,
    rotationJitter: 0.6,
    fontSize: 20,
    lineHeight: 34,
    paperType: 'lab-green'
  },
  vintage: {
    fontFamily: 'Cedarville Cursive',
    penType: 'fountain',
    bodyColor: '#1e3a8a',
    headingColor: '#1e3a8a',
    baselineJitter: 1.4,
    rotationJitter: 1.2,
    fontSize: 22,
    lineHeight: 36,
    paperType: 'parchment'
  }
};

// SAMPLE ASSIGNMENT TEXT (With Headings, Highlighting, and Mistake)
const SAMPLE_ASSIGNMENT = `# DEPARTMENT OF COMPUTER SCIENCE
# OPERATING SYSTEMS (CS-301) - ASSIGNMENT 02

NAME: Muhammad Ali
ROLL NO: BSCS-F21-042
DATE: November 02, 2026

# Q1: Explain Virtual Memory and Demand Paging.
Virtual memory is a memory management technique that creates an ideal illusion of a large, contiguous memory space for each user program. It maps virtual addresses generated by the CPU to ==physical memory addresses== via page tables.

The key benefit is that an application can be ~~compeltely~~ much larger than physical RAM. ==Demand paging== brings a page into memory only when it is referenced during execution.

# Q2: Differences Between Process and Thread:
1. Address Space: Processes have independent memory spaces, whereas threads share memory within the same parent process.
2. Context Switching: Process switching requires flushing ==TLB caches==, while thread switching is very lightweight and ~~imposible~~ much faster.
3. System Calls: Inter-thread communication does not require kernel intervention, resulting in higher execution speed.`;

// DOM ELEMENTS
const textInput = document.getElementById('input-text');
const charCount = document.getElementById('char-count');
const fontSelector = document.getElementById('font-selector');
const fontCountBadge = document.getElementById('font-count-badge');
const fontSearch = document.getElementById('font-search');
const pageIndicator = document.getElementById('page-indicator');
const pagesWrapper = document.getElementById('pages-wrapper');
let currentViewPage = 1;

// DETERMINISTIC PSEUDO RANDOM NUMBER GENERATOR
function pseudoRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// INITIALIZATION
window.addEventListener('DOMContentLoaded', async () => {
  setupTabs();
  buildFontList();
  setupEventListeners();

  // Restore saved data from LocalStorage if available
  loadSavedData();

  if (!textInput.value) {
    textInput.value = SAMPLE_ASSIGNMENT;
  }
  state.text = textInput.value;
  updateCharCount();

  if (document.fonts) {
    await document.fonts.ready;
  }

  renderCanvas();

  // Auto-fit page to screen to maximize viewing area
  setTimeout(fitPageToScreen, 150);
});

// RESTORE FROM LOCALSTORAGE (NEVER LOSE STUDENT WORK)
function loadSavedData() {
  try {
    const saved = localStorage.getItem('qalmotype_saved_data');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.text) textInput.value = data.text;
      if (data.fontFamily) state.fontFamily = data.fontFamily;
      if (data.penType) state.penType = data.penType;
      if (data.bodyColor) state.bodyColor = data.bodyColor;
      if (data.headingColor) state.headingColor = data.headingColor;
      if (data.paperType) state.paperType = data.paperType;
      if (data.outputMode) state.outputMode = data.outputMode;
      if (data.signatureName) state.signatureName = data.signatureName;

      // Sync active classes
      document.querySelectorAll('.pen-card').forEach(c => c.classList.toggle('active', c.dataset.pen === state.penType));
      document.querySelectorAll('.paper-card').forEach(c => c.classList.toggle('active', c.dataset.paper === state.paperType));
      const sigInput = document.getElementById('signature-text');
      if (sigInput) sigInput.value = state.signatureName;
    }
  } catch (e) {
    console.warn('LocalStorage load error:', e);
  }
}

// AUTO-SAVE TIMER
let autoSaveTimer = null;
function triggerAutoSave() {
  const statusEl = document.getElementById('auto-save-status');
  if (statusEl) {
    statusEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Saving...</span>`;
    statusEl.classList.add('saving');
  }

  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    try {
      const dataToSave = {
        text: state.text,
        fontFamily: state.fontFamily,
        penType: state.penType,
        bodyColor: state.bodyColor,
        headingColor: state.headingColor,
        paperType: state.paperType,
        outputMode: state.outputMode,
        signatureName: state.signatureName,
        savedAt: Date.now()
      };
      localStorage.setItem('qalmotype_saved_data', JSON.stringify(dataToSave));
      if (statusEl) {
        statusEl.innerHTML = `<i class="fa-solid fa-check"></i> <span>Saved</span>`;
        statusEl.classList.remove('saving');
      }
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, 1000);
}

// CLEAN AI & CHATGPT MARKERS
function cleanAiText() {
  let val = textInput.value;
  if (!val) return;

  // 1. Remove Markdown Bold and Italic asterisks: **text** -> text, *text* -> text
  val = val.replace(/\*\*([^*]+)\*\*/g, '$1');
  val = val.replace(/\*([^*]+)\*/g, '$1');

  // 2. Remove Markdown headers: ### Heading or ## Heading -> # Heading
  val = val.replace(/#{2,6}\s+/g, '# ');

  // 3. Remove typical robotic ChatGPT introductory & concluding phrases
  const aiPhrases = [
    /As an AI language model[,\s]*/gi,
    /Certainly! Here is[^\n]*\n+/gi,
    /Here is a detailed assignment on[^\n]*\n+/gi,
    /In conclusion,[,\s]*/gi,
    /It is crucial to note that\s*/gi,
    /It is important to remember that\s*/gi,
    /Delve into\s*/gi,
    /Furthermore,\s*/gi,
    /Moreover,\s*/gi,
    /Key Takeaways:\s*/gi,
    /In summary,\s*/gi,
    /To summarize,\s*/gi
  ];

  aiPhrases.forEach(rx => {
    val = val.replace(rx, '');
  });

  // 4. Clean extra multiple line breaks
  val = val.replace(/\n{3,}/g, '\n\n');

  textInput.value = val.trim();
  state.text = textInput.value;
  updateCharCount();
  renderCanvas();
  triggerAutoSave();
}

// FIT PAGE TO VIEWPORT SCREEN
function fitPageToScreen() {
  const viewport = document.getElementById('canvas-viewport');
  if (!viewport || viewport.clientHeight === 0) return;
  const availableHeight = viewport.clientHeight - 48;
  const availableWidth = viewport.clientWidth - 48;
  const scaleY = availableHeight / 934;
  const scaleX = availableWidth / 660;
  state.zoom = Math.max(0.65, Math.min(scaleX, scaleY, 1.35));
  applyZoom();
}

// BUILD FONT LIST UI WITH CATEGORY FILTER & SEARCH
function buildFontList() {
  fontSelector.innerHTML = '';

  const filtered = HANDWRITING_FONTS.filter(font => {
    const matchesCategory = state.selectedCategory === 'all' || font.category === state.selectedCategory;
    const matchesSearch = state.fontSearchQuery === '' || 
      font.name.toLowerCase().includes(state.fontSearchQuery) || 
      font.tag.toLowerCase().includes(state.fontSearchQuery);
    return matchesCategory && matchesSearch;
  });

  if (fontCountBadge) {
    fontCountBadge.textContent = `${filtered.length} of ${HANDWRITING_FONTS.length}`;
  }

  if (filtered.length === 0) {
    fontSelector.innerHTML = `<div style="grid-column: span 2; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">Koi font match nahi hua. Search clear karein.</div>`;
    return;
  }

  filtered.forEach(font => {
    const card = document.createElement('button');
    card.className = `font-card ${font.tagClass} ${state.fontFamily === font.id ? 'active' : ''}`;
    card.dataset.fontId = font.id;
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="font-name">${font.name}</span>
        <span class="font-tag">${font.tag}</span>
      </div>
      <div class="font-sample" style="font-family: ${font.font};">${font.sample}</div>
    `;
    card.addEventListener('click', async () => {
      document.querySelectorAll('.font-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.fontFamily = font.id;

      try {
        if (document.fonts) {
          await document.fonts.load(getResolvedFontString(state.fontSize));
        }
      } catch (e) {
        console.warn('Font load:', e);
      }
      renderCanvas();
    });
    fontSelector.appendChild(card);
  });
}

// SETUP TABS
function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = document.getElementById(btn.dataset.tab);
      if (targetTab) targetTab.classList.add('active');
    });
  });
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
  // Sidebar Collapse / Expand Toggle Button
  const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
  const sidebar = document.getElementById('sidebar');

  if (btnToggleSidebar && sidebar) {
    btnToggleSidebar.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      setTimeout(fitPageToScreen, 280);
    });
  }

  // Auto-fit on Window Resize
  window.addEventListener('resize', () => {
    fitPageToScreen();
  });

  // Output Mode Switcher (Photo vs Print Mode)
  const modePhotoBtn = document.getElementById('mode-photo');
  const modePrintBtn = document.getElementById('mode-print');

  if (modePhotoBtn && modePrintBtn) {
    modePhotoBtn.addEventListener('click', () => {
      modePhotoBtn.classList.add('active');
      modePrintBtn.classList.remove('active');
      state.outputMode = 'photo';
      renderCanvas();
    });

    modePrintBtn.addEventListener('click', () => {
      modePrintBtn.classList.add('active');
      modePhotoBtn.classList.remove('active');
      state.outputMode = 'print';
      renderCanvas();
    });
  }

  // Document File Import (.docx, .txt, .md)
  const docFileInput = document.getElementById('doc-file-input');
  if (docFileInput) {
    docFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        await processImportedDocument(file);
      }
    });
  }

  // Drag & Drop on Text Area Wrapper
  const dropWrapper = document.getElementById('drop-zone-wrapper');
  if (dropWrapper) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropWrapper.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropWrapper.classList.add('drag-over');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropWrapper.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropWrapper.classList.remove('drag-over');
      }, false);
    });

    dropWrapper.addEventListener('drop', async (e) => {
      const dt = e.dataTransfer;
      const file = dt.files[0];
      if (file) {
        await processImportedDocument(file);
      }
    });
  }

  // Quick Paste Button
  const btnQuickPaste = document.getElementById('btn-quick-paste');
  if (btnQuickPaste) {
    btnQuickPaste.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          textInput.value = text;
          state.text = text;
          updateCharCount();
          renderCanvas();
        }
      } catch (err) {
        alert('Clipboard access karne ke liye Ctrl+V press karein.');
      }
    });
  }

  // Bullet Chip
  const chipBullet = document.getElementById('chip-bullet');
  if (chipBullet) {
    chipBullet.addEventListener('click', () => {
      insertTextAtCursor('\n- ');
    });
  }

  // Line Snapping Toggle
  const toggleSnapLines = document.getElementById('toggle-snap-lines');
  if (toggleSnapLines) {
    toggleSnapLines.addEventListener('change', (e) => {
      state.snapToLines = e.target.checked;
      renderCanvas();
    });
  }

  // Text Input
  textInput.addEventListener('input', () => {
    state.text = textInput.value;
    updateCharCount();
    renderCanvas();
    triggerAutoSave();
  });

  // Clean AI Text (Removes ChatGPT artifacts & asterisks)
  const chipCleanAi = document.getElementById('chip-clean-ai');
  if (chipCleanAi) {
    chipCleanAi.addEventListener('click', cleanAiText);
  }

  // Freehand Pen Doodle Drawing Mode
  const btnDrawMode = document.getElementById('btn-draw-mode');
  if (btnDrawMode) {
    btnDrawMode.addEventListener('click', () => {
      state.drawMode = !state.drawMode;
      btnDrawMode.classList.toggle('draw-active', state.drawMode);
      pagesWrapper.classList.toggle('draw-mode', state.drawMode);
    });
  }

  // Backpack Wrinkles Toggle
  const toggleWrinkles = document.getElementById('toggle-wrinkles');
  if (toggleWrinkles) {
    toggleWrinkles.addEventListener('change', (e) => {
      state.showWrinkles = e.target.checked;
      document.querySelectorAll('.wrinkle-overlay').forEach(el => {
        el.style.display = state.showWrinkles ? 'block' : 'none';
      });
    });
  }

  // Font Category Pills
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.selectedCategory = pill.dataset.cat;
      buildFontList();
    });
  });

  // Font Search
  if (fontSearch) {
    fontSearch.addEventListener('input', (e) => {
      state.fontSearchQuery = e.target.value.toLowerCase().trim();
      buildFontList();
    });
  }

  // Quick Presets Bar
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetKey = btn.dataset.preset;
      applyPreset(presetKey);
    });
  });

  // Smart Chips
  document.getElementById('chip-heading').addEventListener('click', () => {
    insertTextAtCursor('\n# ASSIGNMENT TOPIC TITLE\n');
  });

  const chipBold = document.getElementById('chip-bold');
  if (chipBold) {
    chipBold.addEventListener('click', () => {
      const selStart = textInput.selectionStart;
      const selEnd = textInput.selectionEnd;
      if (selStart !== selEnd) {
        const selected = textInput.value.substring(selStart, selEnd);
        insertTextAtCursor(`**${selected}**`);
      } else {
        insertTextAtCursor(' **heavy pressure text** ');
      }
    });
  }

  const chipUnderline = document.getElementById('chip-underline');
  if (chipUnderline) {
    chipUnderline.addEventListener('click', () => {
      const selStart = textInput.selectionStart;
      const selEnd = textInput.selectionEnd;
      if (selStart !== selEnd) {
        const selected = textInput.value.substring(selStart, selEnd);
        insertTextAtCursor(`__${selected}__`);
      } else {
        insertTextAtCursor(' __underlined concept__ ');
      }
    });
  }

  const chipChecklist = document.getElementById('chip-checklist');
  if (chipChecklist) {
    chipChecklist.addEventListener('click', () => {
      insertTextAtCursor('\n[x] Completed Assignment Part\n');
    });
  }

  const chipHighlight = document.getElementById('chip-highlight');
  if (chipHighlight) {
    chipHighlight.addEventListener('click', () => {
      const selStart = textInput.selectionStart;
      const selEnd = textInput.selectionEnd;
      if (selStart !== selEnd) {
        const selected = textInput.value.substring(selStart, selEnd);
        insertTextAtCursor(`==${selected}==`);
      } else {
        insertTextAtCursor(' ==important term== ');
      }
    });
  }

  document.getElementById('chip-mistake').addEventListener('click', () => {
    insertTextAtCursor(' ~~mistake~~ ');
  });

  document.getElementById('chip-date').addEventListener('click', () => {
    const now = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    insertTextAtCursor(`DATE: ${now}\n`);
  });

  document.getElementById('chip-clear').addEventListener('click', () => {
    if (confirm('Kya aap saara text clear karna chahte hain?')) {
      textInput.value = '';
      state.text = '';
      updateCharCount();
      renderCanvas();
    }
  });

  document.getElementById('btn-sample-text').addEventListener('click', () => {
    textInput.value = SAMPLE_ASSIGNMENT;
    state.text = SAMPLE_ASSIGNMENT;
    updateCharCount();
    renderCanvas();
  });

  // Highlighter Color Dots
  document.querySelectorAll('.hl-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('.hl-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      state.highlighterColor = dot.dataset.color;
      renderCanvas();
    });
  });

  // Student Signature Input & Toggle
  const toggleSignature = document.getElementById('toggle-signature');
  const signatureText = document.getElementById('signature-text');
  if (toggleSignature) {
    toggleSignature.addEventListener('change', (e) => {
      state.showSignature = e.target.checked;
      renderCanvas();
    });
  }
  if (signatureText) {
    signatureText.addEventListener('input', (e) => {
      state.signatureName = e.target.value.trim() || 'Muhammad Ali';
      renderCanvas();
    });
  }

  // Dual Ink Colors
  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const type = dot.dataset.type;
      const color = dot.dataset.color;
      
      document.querySelectorAll(`.color-dot[data-type="${type}"]`).forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      if (type === 'body') {
        state.bodyColor = color;
        document.getElementById('body-color-picker').value = color;
      } else {
        state.headingColor = color;
        document.getElementById('heading-color-picker').value = color;
      }
      renderCanvas();
    });
  });

  document.getElementById('body-color-picker').addEventListener('input', (e) => {
    document.querySelectorAll(`.color-dot[data-type="body"]`).forEach(d => d.classList.remove('active'));
    state.bodyColor = e.target.value;
    renderCanvas();
  });

  document.getElementById('heading-color-picker').addEventListener('input', (e) => {
    document.querySelectorAll(`.color-dot[data-type="heading"]`).forEach(d => d.classList.remove('active'));
    state.headingColor = e.target.value;
    renderCanvas();
  });

  // Pen Types
  document.querySelectorAll('.pen-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.pen-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.penType = card.dataset.pen;
      renderCanvas();
    });
  });

  // Paper Selector
  document.querySelectorAll('.paper-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.paper-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.paperType = card.dataset.paper;
      state.customPaperImage = null;
      document.getElementById('btn-remove-custom-paper').style.display = 'none';
      renderCanvas();
    });
  });

  // Sliders
  setupSlider('font-size', 'font-size-val', 'px', val => state.fontSize = Number(val));
  setupSlider('letter-spacing', 'letter-spacing-val', 'px', val => state.letterSpacing = Number(val));
  setupSlider('word-spacing', 'word-spacing-val', 'px', val => state.wordSpacing = Number(val));
  setupSlider('top-margin', 'top-margin-val', 'px', val => state.topMargin = Number(val));
  setupSlider('left-margin', 'left-margin-val', 'px', val => state.leftMargin = Number(val));
  setupSlider('line-height', 'line-height-val', 'px', val => state.lineHeight = Number(val));
  setupSlider('jitter-amount', 'jitter-val', 'px', val => state.baselineJitter = Number(val));
  setupSlider('rotation-amount', 'rotation-val', '°', val => state.rotationJitter = Number(val));
  setupSlider('ink-bleed', 'bleed-val', '', val => state.inkBleed = Number(val));
  setupSlider('diagram-size', 'diagram-size-val', 'px', val => state.diagramSize = Number(val));

  // Diagram / Image Insertion
  const diagramInput = document.getElementById('diagram-input');
  diagramInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          state.diagramImage = img;
          document.getElementById('diagram-upload-label').textContent = file.name;
          document.getElementById('diagram-controls').style.display = 'block';
          renderCanvas();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('btn-remove-diagram').addEventListener('click', () => {
    state.diagramImage = null;
    diagramInput.value = '';
    document.getElementById('diagram-upload-label').textContent = 'Attach Diagram Image';
    document.getElementById('diagram-controls').style.display = 'none';
    renderCanvas();
  });

  // Custom Notebook Photo Upload
  const customPaperInput = document.getElementById('custom-paper-input');
  customPaperInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          state.customPaperImage = img;
          document.getElementById('paper-upload-label').textContent = file.name;
          document.getElementById('btn-remove-custom-paper').style.display = 'block';
          renderCanvas();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('btn-remove-custom-paper').addEventListener('click', () => {
    state.customPaperImage = null;
    customPaperInput.value = '';
    document.getElementById('paper-upload-label').textContent = 'Upload Notebook Page Photo';
    document.getElementById('btn-remove-custom-paper').style.display = 'none';
    renderCanvas();
  });

  // Custom Font Upload (.ttf / .otf)
  const customFontInput = document.getElementById('custom-font-input');
  customFontInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const fontName = 'CustomUserFont_' + Date.now();
        const buffer = await file.arrayBuffer();
        const fontFace = new FontFace(fontName, buffer);
        await fontFace.load();
        document.fonts.add(fontFace);

        const customObj = {
          id: fontName,
          name: 'My Scanned Font',
          category: 'all',
          sample: 'User uploaded custom handwriting',
          tag: 'Scanned',
          tagClass: 'tag-cursive',
          font: `"${fontName}", cursive`
        };
        HANDWRITING_FONTS.unshift(customObj);
        state.fontFamily = fontName;
        document.getElementById('font-upload-label').textContent = file.name;

        buildFontList();
        renderCanvas();
      } catch (err) {
        alert('Font file load nahi ho saki. Valid .ttf ya .otf file chunein.');
        console.error(err);
      }
    }
  });

  // Life Touches Toggles
  const toggleCoffee = document.getElementById('toggle-coffee-stain');
  if (toggleCoffee) {
    toggleCoffee.addEventListener('change', (e) => {
      state.showCoffeeStain = e.target.checked;
      renderCanvas();
    });
  }

  const toggleTicks = document.getElementById('toggle-teacher-ticks');
  if (toggleTicks) {
    toggleTicks.addEventListener('change', (e) => {
      state.showTeacherTicks = e.target.checked;
      renderCanvas();
    });
  }

  // Lighting Atmosphere Grid
  document.querySelectorAll('.light-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.light-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.lightingMode = btn.dataset.light;
      renderCanvas();
    });
  });

  document.getElementById('toggle-holes').addEventListener('change', (e) => {
    state.showHoles = e.target.checked;
    renderCanvas();
  });

  document.getElementById('toggle-header-meta').addEventListener('change', (e) => {
    state.showHeaderMeta = e.target.checked;
    renderCanvas();
  });

  // GoodNotes-Style Page Navigation
  const viewport = document.getElementById('canvas-viewport');

  document.getElementById('btn-next-page').addEventListener('click', () => {
    if (currentViewPage < state.totalPages) {
      currentViewPage++;
      const targetSheet = document.getElementById(`page-sheet-${currentViewPage}`);
      if (targetSheet) {
        targetSheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  document.getElementById('btn-prev-page').addEventListener('click', () => {
    if (currentViewPage > 1) {
      currentViewPage--;
      const targetSheet = document.getElementById(`page-sheet-${currentViewPage}`);
      if (targetSheet) {
        targetSheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // Update Page Indicator on Scroll
  if (viewport) {
    viewport.addEventListener('scroll', () => {
      const sheets = document.querySelectorAll('.page-sheet');
      const viewportScrollY = viewport.scrollTop + 150;
      sheets.forEach((sheet, idx) => {
        if (sheet.offsetTop <= viewportScrollY) {
          currentViewPage = idx + 1;
        }
      });
      if (pageIndicator) {
        pageIndicator.textContent = `Page ${currentViewPage} of ${state.totalPages}`;
      }
    });
  }

  document.getElementById('btn-zoom-in').addEventListener('click', () => {
    if (state.zoom < 1.6) {
      state.zoom += 0.15;
      applyZoom();
    }
  });

  document.getElementById('btn-zoom-out').addEventListener('click', () => {
    if (state.zoom > 0.5) {
      state.zoom -= 0.15;
      applyZoom();
    }
  });

  document.getElementById('btn-zoom-reset').addEventListener('click', () => {
    fitPageToScreen();
  });

  // Print & Export
  document.getElementById('btn-print').addEventListener('click', () => {
    const canvases = document.querySelectorAll('.page-sheet canvas');
    if (canvases.length === 0) return;
    const win = window.open('');
    let html = '<html><head><title>Print Assignment</title><style>@page{size:A4;margin:0;}body{margin:0;}img{width:100%;page-break-after:always;display:block;}</style></head><body>';
    canvases.forEach(c => {
      html += `<img src="${c.toDataURL()}"/>`;
    });
    html += '</body></html>';
    win.document.write(html);
    win.document.close();
    win.onload = () => {
      win.print();
      win.close();
    };
  });

  document.getElementById('btn-download-img').addEventListener('click', downloadCurrentPageImage);
  document.getElementById('btn-download-pdf').addEventListener('click', downloadFullPDF);

  const btnCopy = document.getElementById('btn-copy-img');
  if (btnCopy) btnCopy.addEventListener('click', copyCurrentPageImage);

  const btnZip = document.getElementById('btn-download-zip');
  if (btnZip) btnZip.addEventListener('click', downloadAllPagesAsZip);

  const btnZen = document.getElementById('btn-zen-mode');
  if (btnZen) btnZen.addEventListener('click', toggleZenMode);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('zen-mode')) {
      toggleZenMode();
    }
  });
}

// APPLY 1-CLICK PRESET
function applyPreset(key) {
  const p = PRESETS[key];
  if (!p) return;

  state.fontFamily = p.fontFamily;
  state.penType = p.penType;
  state.bodyColor = p.bodyColor;
  state.headingColor = p.headingColor;
  state.baselineJitter = p.baselineJitter;
  state.rotationJitter = p.rotationJitter;
  state.fontSize = p.fontSize;
  state.lineHeight = p.lineHeight;
  state.paperType = p.paperType;

  // Sync UI controls
  document.getElementById('font-size').value = p.fontSize;
  document.getElementById('font-size-val').textContent = `${p.fontSize}px`;
  document.getElementById('line-height').value = p.lineHeight;
  document.getElementById('line-height-val').textContent = `${p.lineHeight}px`;
  document.getElementById('jitter-amount').value = p.baselineJitter;
  document.getElementById('jitter-val').textContent = `${p.baselineJitter}px`;
  document.getElementById('rotation-amount').value = p.rotationJitter;
  document.getElementById('rotation-val').textContent = `${p.rotationJitter}°`;

  document.querySelectorAll('.pen-card').forEach(c => {
    c.classList.toggle('active', c.dataset.pen === p.penType);
  });

  document.querySelectorAll('.paper-card').forEach(c => {
    c.classList.toggle('active', c.dataset.paper === p.paperType);
  });

  buildFontList();
  renderCanvas();
}

function applyZoom() {
  const wrapper = document.getElementById('pages-wrapper');
  if (wrapper) {
    wrapper.style.transform = `scale(${state.zoom})`;
  }
  document.getElementById('zoom-level').textContent = `${Math.round(state.zoom * 100)}%`;
}

function setupSlider(id, valId, unit, callback) {
  const el = document.getElementById(id);
  const valEl = document.getElementById(valId);
  if (!el || !valEl) return;
  el.addEventListener('input', (e) => {
    valEl.textContent = `${e.target.value}${unit}`;
    callback(e.target.value);
    renderCanvas();
  });
}

function insertTextAtCursor(textToInsert) {
  const start = textInput.selectionStart;
  const end = textInput.selectionEnd;
  const current = textInput.value;
  textInput.value = current.substring(0, start) + textToInsert + current.substring(end);
  textInput.selectionStart = textInput.selectionEnd = start + textToInsert.length;
  textInput.focus();
  state.text = textInput.value;
  updateCharCount();
  renderCanvas();
}

function updateCharCount() {
  const txt = textInput.value.trim();
  const words = txt ? txt.split(/\s+/).length : 0;
  charCount.textContent = `${words} words | ${txt.length} chars`;
}

function getResolvedFontString(size) {
  const found = HANDWRITING_FONTS.find(f => f.id === state.fontFamily);
  const family = found ? found.font : 'Caveat, cursive';
  return `${size * 1.8}px ${family}`;
}

// -------------------------------------------------------------
// TEXT PARSING & GOODNOTES MULTI-PAGE PAGINATION
// -------------------------------------------------------------
function paginateAllPages() {
  const content = textInput.value || '';
  const rawLines = content.split('\n');

  const effectiveLineHeight = state.lineHeight * 1.8;
  const effectiveTopMargin = state.topMargin * 1.8;
  const effectiveLeftMargin = state.leftMargin * 1.8;
  const effectiveRightMargin = state.rightMargin * 1.8;
  const effectiveBottomMargin = state.bottomMargin * 1.8;

  const availableWidth = 1240 - effectiveLeftMargin - effectiveRightMargin;
  const availableHeight = 1754 - effectiveTopMargin - effectiveBottomMargin;
  const maxLinesPerPage = Math.max(1, Math.floor(availableHeight / effectiveLineHeight));

  // Temporary canvas to measure font text
  const measureCanvas = document.createElement('canvas');
  const measureCtx = measureCanvas.getContext('2d');
  measureCtx.font = getResolvedFontString(state.fontSize);

  const processedLines = [];

  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i];
    
    // Check if line is a Heading
    const isHeading = rawLine.startsWith('# ') || rawLine.startsWith('TOPIC:') || rawLine.startsWith('ASSIGNMENT:');
    const cleanLine = rawLine.startsWith('# ') ? rawLine.substring(2) : rawLine;

    if (cleanLine === '') {
      processedLines.push({ text: '', isHeading: false });
      continue;
    }

    const words = cleanLine.split(' ');
    let currentLine = '';

    for (let w = 0; w < words.length; w++) {
      const word = words[w];
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      
      // Strip formatting markers for width calculation
      const textToMeasure = testLine.replace(/==/g, '').replace(/~~/g, '').replace(/\*\*/g, '').replace(/__/g, '').replace(/\[[ xX]\] /g, '');
      const testWidth = measureCtx.measureText(textToMeasure).width + (textToMeasure.length * (state.letterSpacing * 1.6));

      if (testWidth > availableWidth && currentLine !== '') {
        processedLines.push({ text: currentLine, isHeading });
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      processedLines.push({ text: currentLine, isHeading });
    }
  }

  // Split into pages
  const pages = [];
  for (let i = 0; i < processedLines.length; i += maxLinesPerPage) {
    pages.push(processedLines.slice(i, i + maxLinesPerPage));
  }

  if (pages.length === 0) {
    pages.push([]);
  }

  state.totalPages = pages.length;
  if (currentViewPage > state.totalPages) {
    currentViewPage = state.totalPages;
  }
  if (pageIndicator) {
    pageIndicator.textContent = `${state.totalPages} ${state.totalPages === 1 ? 'Page' : 'Pages'}`;
  }

  return pages;
}

// -------------------------------------------------------------
// CONTINUOUS GOODNOTES MULTI-PAGE CANVAS RENDERING
// -------------------------------------------------------------
function renderCanvas() {
  const allPages = paginateAllPages();
  const wrapper = document.getElementById('pages-wrapper');
  if (!wrapper) return;

  // Sync DOM elements in wrapper with allPages.length
  while (wrapper.children.length < allPages.length) {
    const pageNum = wrapper.children.length + 1;
    const sheet = document.createElement('div');
    sheet.className = 'page-sheet';
    sheet.id = `page-sheet-${pageNum}`;
    sheet.innerHTML = `
      <canvas width="1240" height="1754"></canvas>
      <div class="page-badge">Page ${pageNum} of ${allPages.length}</div>
      <div class="canvas-overlay grain-overlay"></div>
      <div class="canvas-overlay shadow-overlay"></div>
      <div class="canvas-overlay crease-overlay"></div>
      <div class="canvas-overlay wrinkle-overlay" style="display:${state.showWrinkles ? 'block' : 'none'};"></div>
    `;
    wrapper.appendChild(sheet);
  }

  while (wrapper.children.length > allPages.length) {
    wrapper.removeChild(wrapper.lastChild);
  }

  // Update styling modes on wrapper
  wrapper.className = `pages-wrapper light-${state.lightingMode} ${state.outputMode === 'print' ? 'print-mode' : ''} ${state.drawMode ? 'draw-mode' : ''}`;

  // Render each individual page canvas sheet
  allPages.forEach((pageLines, pageIdx) => {
    const sheet = wrapper.children[pageIdx];
    const canvasEl = sheet.querySelector('canvas');
    const badgeEl = sheet.querySelector('.page-badge');
    if (badgeEl) {
      badgeEl.textContent = `Page ${pageIdx + 1} of ${allPages.length}`;
    }

    const pCtx = canvasEl.getContext('2d');
    pCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    // 1. Draw Paper Background
    drawPaperBackground(pCtx);

    // 2. Draw Binder Holes
    if (state.showHoles && !state.customPaperImage) {
      drawBinderHoles(pCtx);
    }

    // 3. Draw Paper Ruled Lines & Margins
    drawPaperLines(pCtx);

    // 4. Draw Header Metadata (Page, Date)
    if (state.showHeaderMeta && !state.customPaperImage) {
      drawHeaderMeta(pCtx, pageIdx + 1);
    }

    // 5. Draw Chai / Coffee Mug Ring Stain (Subtle realism on Page 1 in Photo Mode)
    if (state.showCoffeeStain && !state.customPaperImage && pageIdx === 0 && state.outputMode !== 'print') {
      drawCoffeeStain(pCtx);
    }

    // 6. Draw Handwriting Text for this page
    drawHandwrittenLines(pCtx, pageLines, pageIdx + 1);

    // 7. Draw Attached Diagram / Image on Page 1
    if (state.diagramImage && pageIdx === 0) {
      drawAttachedDiagram(pCtx, pageLines.length);
    }

    // 8. Draw Student Signature on Last Page
    if (state.showSignature && pageIdx === allPages.length - 1) {
      drawStudentSignature(pCtx, pageLines.length);
    }

    // 9. Re-draw User Freehand Drawings for this page (if any)
    if (state.pageDrawings[pageIdx + 1] && state.pageDrawings[pageIdx + 1].length > 0) {
      pCtx.save();
      pCtx.strokeStyle = state.bodyColor;
      pCtx.lineWidth = 4.0;
      pCtx.lineCap = 'round';
      pCtx.lineJoin = 'round';
      state.pageDrawings[pageIdx + 1].forEach(stroke => {
        if (stroke.length < 2) return;
        pCtx.beginPath();
        pCtx.moveTo(stroke[0].x, stroke[0].y);
        for (let s = 1; s < stroke.length; s++) {
          pCtx.lineTo(stroke[s].x, stroke[s].y);
        }
        pCtx.stroke();
      });
      pCtx.restore();
    }

    // Setup freehand drawing interaction
    setupDrawingHandlers(sheet, pageIdx + 1);
  });

  // Sync GoodNotes Floating Page Dock
  updatePageDock(allPages.length);
}

// FREEHAND DRAWING / DOODLE LOGIC (GOODNOTES INTERACTIVITY)
let isDrawing = false;
let currentStroke = [];
let currentDrawCanvas = null;
let currentDrawPageNum = 1;

function setupDrawingHandlers(sheet, pageNum) {
  const canvasEl = sheet.querySelector('canvas');
  if (!canvasEl || canvasEl.dataset.drawBound) return;
  canvasEl.dataset.drawBound = 'true';

  canvasEl.addEventListener('mousedown', (e) => {
    if (!state.drawMode) return;
    isDrawing = true;
    currentDrawCanvas = canvasEl;
    currentDrawPageNum = pageNum;
    currentStroke = [];

    const rect = canvasEl.getBoundingClientRect();
    const scaleX = 1240 / rect.width;
    const scaleY = 1754 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    currentStroke.push({ x, y });
  });

  canvasEl.addEventListener('mousemove', (e) => {
    if (!isDrawing || !state.drawMode || currentDrawCanvas !== canvasEl) return;
    const rect = canvasEl.getBoundingClientRect();
    const scaleX = 1240 / rect.width;
    const scaleY = 1754 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    currentStroke.push({ x, y });

    const pCtx = canvasEl.getContext('2d');
    pCtx.save();
    pCtx.strokeStyle = state.bodyColor;
    pCtx.lineWidth = 4.0;
    pCtx.lineCap = 'round';
    pCtx.lineJoin = 'round';
    pCtx.beginPath();
    const prev = currentStroke[currentStroke.length - 2];
    pCtx.moveTo(prev.x, prev.y);
    pCtx.lineTo(x, y);
    pCtx.stroke();
    pCtx.restore();
  });

  window.addEventListener('mouseup', () => {
    if (isDrawing && state.drawMode && currentStroke.length > 0) {
      isDrawing = false;
      if (!state.pageDrawings[currentDrawPageNum]) {
        state.pageDrawings[currentDrawPageNum] = [];
      }
      state.pageDrawings[currentDrawPageNum].push(currentStroke);
      currentStroke = [];
    }
    isDrawing = false;
  });
}

// PROCESS IMPORTED DOCUMENT (.docx, .txt, .md)
async function processImportedDocument(file) {
  const fileName = file.name.toLowerCase();

  try {
    if (fileName.endsWith('.docx')) {
      const buffer = await file.arrayBuffer();
      if (window.mammoth) {
        const result = await window.mammoth.extractRawText({ arrayBuffer: buffer });
        textInput.value = result.value;
        state.text = result.value;
        updateCharCount();
        renderCanvas();
      } else {
        alert('Word parser load nahi ho saka. Text file use karein.');
      }
    } else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        textInput.value = e.target.result;
        state.text = e.target.result;
        updateCharCount();
        renderCanvas();
      };
      reader.readAsText(file);
    } else {
      alert('Kripya .docx, .txt ya .md file upload karein.');
    }
  } catch (err) {
    console.error('Doc import error:', err);
    alert('Document read karne mein masla hua.');
  }
}

// DRAW PAPER BACKGROUND
function drawPaperBackground(pCtx) {
  if (state.customPaperImage) {
    pCtx.drawImage(state.customPaperImage, 0, 0, 1240, 1754);
    return;
  }

  // In Print Mode, render pure crisp white background for ink-saving
  if (state.outputMode === 'print' && state.paperType !== 'yellow-legal' && state.paperType !== 'parchment' && state.paperType !== 'lab-green') {
    pCtx.fillStyle = '#ffffff';
    pCtx.fillRect(0, 0, 1240, 1754);
    return;
  }

  switch (state.paperType) {
    case 'yellow-legal':
      pCtx.fillStyle = '#fef08a'; // Classic legal yellow
      pCtx.fillRect(0, 0, 1240, 1754);
      break;

    case 'lab-green':
      pCtx.fillStyle = '#f0fdf4'; // Light mint computation pad
      pCtx.fillRect(0, 0, 1240, 1754);
      break;

    case 'ivory-plain':
      pCtx.fillStyle = '#faf7ee'; // Warm book paper
      pCtx.fillRect(0, 0, 1240, 1754);
      break;

    case 'parchment':
      pCtx.fillStyle = '#fdf6e2';
      pCtx.fillRect(0, 0, 1240, 1754);
      const vGrad = pCtx.createRadialGradient(620, 877, 200, 620, 877, 900);
      vGrad.addColorStop(0, 'rgba(255,255,255,0)');
      vGrad.addColorStop(1, 'rgba(180, 150, 110, 0.16)');
      pCtx.fillStyle = vGrad;
      pCtx.fillRect(0, 0, 1240, 1754);
      break;

    case 'french-ruled':
      pCtx.fillStyle = '#ffffff';
      pCtx.fillRect(0, 0, 1240, 1754);
      break;

    case 'blackboard':
      pCtx.fillStyle = '#1e293b';
      pCtx.fillRect(0, 0, 1240, 1754);
      break;

    case 'dot-grid':
    case 'blank-white':
    case 'ruled-plain':
    case 'ruled-margin':
    case 'grid':
    default:
      pCtx.fillStyle = '#ffffff';
      pCtx.fillRect(0, 0, 1240, 1754);
      break;
  }
}

// DRAW BINDER HOLES (Left Edge)
function drawBinderHoles(pCtx) {
  pCtx.save();
  const holeX = 45;
  const holeRadius = 14;
  const holePositions = [1754 * 0.22, 1754 * 0.50, 1754 * 0.78];

  holePositions.forEach(y => {
    pCtx.beginPath();
    pCtx.arc(holeX, y, holeRadius, 0, Math.PI * 2);
    pCtx.fillStyle = '#e2e8f0';
    pCtx.fill();

    pCtx.beginPath();
    pCtx.arc(holeX, y, holeRadius - 2, 0, Math.PI * 2);
    pCtx.fillStyle = '#cbd5e1';
    pCtx.fill();

    pCtx.strokeStyle = '#94a3b8';
    pCtx.lineWidth = 1.2;
    pCtx.stroke();
  });

  pCtx.restore();
}

// DRAW HEADER META (Date & Page Number)
function drawHeaderMeta(pCtx, pageNum) {
  const effectiveTopMargin = state.topMargin * 1.8;
  pCtx.save();
  pCtx.font = '22px "Plus Jakarta Sans", sans-serif';
  pCtx.fillStyle = '#94a3b8';
  pCtx.fillText(`Date: ____ / ____ / 2026`, 1240 - 370, effectiveTopMargin - 45);
  pCtx.fillText(`Page: 0${pageNum}`, 1240 - 130, effectiveTopMargin - 45);
  pCtx.restore();
}

// DRAW ULTRA-REALISTIC CHAI / COFFEE CUP STAIN
function drawCoffeeStain(pCtx) {
  pCtx.save();
  const centerX = 1240 - 140;
  const centerY = 190;
  const radius = 95;

  pCtx.beginPath();
  pCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  pCtx.strokeStyle = 'rgba(161, 98, 7, 0.09)';
  pCtx.lineWidth = 9;
  pCtx.stroke();

  pCtx.beginPath();
  pCtx.arc(centerX + 3, centerY - 2, radius + 2, 0.5, 3.2);
  pCtx.strokeStyle = 'rgba(146, 64, 14, 0.12)';
  pCtx.lineWidth = 3;
  pCtx.stroke();

  pCtx.beginPath();
  pCtx.arc(centerX - 25, centerY + 20, 18, 0, Math.PI * 2);
  pCtx.fillStyle = 'rgba(180, 115, 45, 0.04)';
  pCtx.fill();

  pCtx.restore();
}

// DRAW PAPER LINES & MARGINS
function drawPaperLines(pCtx) {
  if (state.customPaperImage) return;

  const effectiveLineHeight = state.lineHeight * 1.8;
  const effectiveTopMargin = state.topMargin * 1.8;
  const effectiveLeftMargin = state.leftMargin * 1.8;

  pCtx.save();

  if (state.paperType === 'ruled-margin') {
    // Double Red Margin Line (Pakistani / Subcontinent Register)
    pCtx.strokeStyle = '#f87171';
    pCtx.lineWidth = 2.4;
    pCtx.beginPath();
    pCtx.moveTo(effectiveLeftMargin - 22, 0);
    pCtx.lineTo(effectiveLeftMargin - 22, 1754);
    pCtx.stroke();

    pCtx.strokeStyle = '#fca5a5';
    pCtx.lineWidth = 1.0;
    pCtx.beginPath();
    pCtx.moveTo(effectiveLeftMargin - 28, 0);
    pCtx.lineTo(effectiveLeftMargin - 28, 1754);
    pCtx.stroke();

    // Top Header Double Blue Line
    pCtx.strokeStyle = '#93c5fd';
    pCtx.lineWidth = 2;
    pCtx.beginPath();
    pCtx.moveTo(0, effectiveTopMargin - 32);
    pCtx.lineTo(1240, effectiveTopMargin - 32);
    pCtx.moveTo(0, effectiveTopMargin - 26);
    pCtx.lineTo(1240, effectiveTopMargin - 26);
    pCtx.stroke();

    // Ruled horizontal lines
    pCtx.strokeStyle = '#bfdbfe';
    pCtx.lineWidth = 1.2;
    for (let y = effectiveTopMargin; y < 1754 - (state.bottomMargin * 1.8); y += effectiveLineHeight) {
      pCtx.beginPath();
      pCtx.moveTo(0, y);
      pCtx.lineTo(1240, y);
      pCtx.stroke();
    }
  } else if (state.paperType === 'yellow-legal') {
    // Yellow Legal Pad
    pCtx.strokeStyle = '#ef4444';
    pCtx.lineWidth = 2.0;
    pCtx.beginPath();
    pCtx.moveTo(effectiveLeftMargin - 20, 0);
    pCtx.lineTo(effectiveLeftMargin - 20, 1754);
    pCtx.stroke();

    pCtx.strokeStyle = 'rgba(100, 116, 139, 0.35)';
    pCtx.lineWidth = 1.0;
    for (let y = effectiveTopMargin; y < 1754 - (state.bottomMargin * 1.8); y += effectiveLineHeight) {
      pCtx.beginPath();
      pCtx.moveTo(0, y);
      pCtx.lineTo(1240, y);
      pCtx.stroke();
    }
  } else if (state.paperType === 'lab-green') {
    // Lab Green Grid
    const gridSize = 32;
    pCtx.strokeStyle = 'rgba(74, 222, 128, 0.45)';
    pCtx.lineWidth = 1;
    for (let x = 0; x < 1240; x += gridSize) {
      pCtx.beginPath();
      pCtx.moveTo(x, 0);
      pCtx.lineTo(x, 1754);
      pCtx.stroke();
    }
    for (let y = 0; y < 1754; y += gridSize) {
      pCtx.beginPath();
      pCtx.moveTo(0, y);
      pCtx.lineTo(1240, y);
      pCtx.stroke();
    }
  } else if (state.paperType === 'dot-grid') {
    // Dot Grid
    const dotSpacing = 36;
    pCtx.fillStyle = '#94a3b8';
    for (let x = effectiveLeftMargin - 40; x < 1240 - (state.rightMargin * 1.8); x += dotSpacing) {
      for (let y = effectiveTopMargin - 40; y < 1754 - (state.bottomMargin * 1.8); y += dotSpacing) {
        pCtx.beginPath();
        pCtx.arc(x, y, 1.4, 0, Math.PI * 2);
        pCtx.fill();
      }
    }
  } else if (state.paperType === 'ruled-plain') {
    // College Ruled
    pCtx.strokeStyle = '#cbd5e1';
    pCtx.lineWidth = 1.2;
    for (let y = effectiveTopMargin; y < 1754 - (state.bottomMargin * 1.8); y += effectiveLineHeight) {
      pCtx.beginPath();
      pCtx.moveTo(0, y);
      pCtx.lineTo(1240, y);
      pCtx.stroke();
    }
  } else if (state.paperType === 'grid') {
    // Graph Grid
    const gridSize = 36;
    pCtx.strokeStyle = '#e2e8f0';
    pCtx.lineWidth = 1;
    for (let x = 0; x < 1240; x += gridSize) {
      pCtx.beginPath();
      pCtx.moveTo(x, 0);
      pCtx.lineTo(x, 1754);
      pCtx.stroke();
    }
    for (let y = 0; y < 1754; y += gridSize) {
      pCtx.beginPath();
      pCtx.moveTo(0, y);
      pCtx.lineTo(1240, y);
      pCtx.stroke();
    }
  } else if (state.paperType === 'french-ruled') {
    // French Ruled (Seyes) - Red left margin line
    pCtx.strokeStyle = '#f87171';
    pCtx.lineWidth = 1.8;
    pCtx.beginPath();
    pCtx.moveTo(effectiveLeftMargin - 20, 0);
    pCtx.lineTo(effectiveLeftMargin - 20, 1754);
    pCtx.stroke();

    // Primary lines and Seyes sublines
    const subSpacing = effectiveLineHeight / 4;
    for (let y = effectiveTopMargin; y < 1754 - (state.bottomMargin * 1.8); y += effectiveLineHeight) {
      // Primary blue baseline
      pCtx.strokeStyle = '#93c5fd';
      pCtx.lineWidth = 1.3;
      pCtx.beginPath();
      pCtx.moveTo(0, y);
      pCtx.lineTo(1240, y);
      pCtx.stroke();

      // Faint sublines
      pCtx.strokeStyle = 'rgba(191, 219, 254, 0.45)';
      pCtx.lineWidth = 0.8;
      for (let s = 1; s <= 3; s++) {
        const subY = y - (s * subSpacing);
        if (subY > 0) {
          pCtx.beginPath();
          pCtx.moveTo(0, subY);
          pCtx.lineTo(1240, subY);
          pCtx.stroke();
        }
      }
    }
  } else if (state.paperType === 'blackboard') {
    // Blackboard faint chalk guidelines
    pCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    pCtx.lineWidth = 1.0;
    for (let y = effectiveTopMargin; y < 1754 - (state.bottomMargin * 1.8); y += effectiveLineHeight) {
      pCtx.beginPath();
      pCtx.moveTo(0, y);
      pCtx.lineTo(1240, y);
      pCtx.stroke();
    }
  }

  pCtx.restore();
}

// -------------------------------------------------------------
// ULTRA-REALISTIC HANDWRITING RENDERING (PER PAGE)
// -------------------------------------------------------------
function drawHandwrittenLines(pCtx, lines, pageNum) {
  const effectiveLineHeight = state.lineHeight * 1.8;
  const effectiveTopMargin = state.topMargin * 1.8;
  const effectiveLeftMargin = state.leftMargin * 1.8;

  pCtx.save();
  pCtx.textBaseline = 'alphabetic';

  lines.forEach((lineObj, lineIndex) => {
    let rawText = lineObj.text;
    const isHeading = lineObj.isHeading;
    const baseY = effectiveTopMargin + (lineIndex * effectiveLineHeight) - 8;
    let currentX = effectiveLeftMargin;

    // Draw Teacher Red Tick Mark (✔) for questions or numbered points
    if (state.showTeacherTicks && (rawText.startsWith('1.') || rawText.startsWith('2.') || rawText.startsWith('3.') || rawText.startsWith('# Q') || rawText.startsWith('Q1:') || rawText.startsWith('Q2:'))) {
      drawTeacherTick(pCtx, effectiveLeftMargin - 45, baseY - 6);
    }

    // Line-level: Bullet items (- or •)
    if (rawText.startsWith('- ') || rawText.startsWith('• ') || rawText.startsWith('* ')) {
      rawText = rawText.substring(2);
      pCtx.save();
      pCtx.fillStyle = state.bodyColor;
      pCtx.beginPath();
      pCtx.arc(currentX + 8, baseY - 6, 2.8, 0, Math.PI * 2);
      pCtx.fill();
      pCtx.restore();
      currentX += 26;
    }

    // Line-level: Hand-drawn Checklist ([ ] or [x])
    if (rawText.startsWith('[ ] ') || rawText.startsWith('[x] ') || rawText.startsWith('[X] ')) {
      const isChecked = rawText.startsWith('[x] ') || rawText.startsWith('[X] ');
      rawText = rawText.substring(4);
      pCtx.save();
      pCtx.strokeStyle = state.bodyColor;
      pCtx.lineWidth = 1.6;
      pCtx.strokeRect(currentX, baseY - 16, 16, 16);
      if (isChecked) {
        pCtx.strokeStyle = state.headingColor || '#b91c1c';
        pCtx.lineWidth = 2.2;
        pCtx.beginPath();
        pCtx.moveTo(currentX + 3, baseY - 8);
        pCtx.lineTo(currentX + 7, baseY - 3);
        pCtx.lineTo(currentX + 18, baseY - 18);
        pCtx.stroke();
      }
      pCtx.restore();
      currentX += 28;
    }

    let activeColor = isHeading ? state.headingColor : state.bodyColor;
    if (state.paperType === 'blackboard') {
      activeColor = isHeading ? '#fef08a' : '#f8fafc'; // Crisp chalk contrast on chalkboard
    }
    const fontSize = isHeading ? state.fontSize * 1.08 : state.fontSize;
    pCtx.font = getResolvedFontString(fontSize);

    configurePenStyle(pCtx, activeColor);

    const words = rawText.split(' ');
    let inHighlight = false;

    words.forEach((rawWord, wordIdx) => {
      let isMistake = false;
      let isBold = false;
      let isUnderline = false;
      let wordToDraw = rawWord;

      // Handle ==highlight==
      if (wordToDraw.startsWith('==')) {
        inHighlight = true;
        wordToDraw = wordToDraw.substring(2);
      }
      let endsHighlight = false;
      if (wordToDraw.endsWith('==')) {
        endsHighlight = true;
        wordToDraw = wordToDraw.substring(0, wordToDraw.length - 2);
      }

      // Handle ~~mistake~~
      if (wordToDraw.startsWith('~~') && wordToDraw.endsWith('~~') && wordToDraw.length > 4) {
        isMistake = true;
        wordToDraw = wordToDraw.substring(2, wordToDraw.length - 2);
      }

      // Handle **bold pressure**
      if (wordToDraw.startsWith('**') && wordToDraw.endsWith('**') && wordToDraw.length > 4) {
        isBold = true;
        wordToDraw = wordToDraw.substring(2, wordToDraw.length - 2);
      }

      // Handle __underline__
      if (wordToDraw.startsWith('__') && wordToDraw.endsWith('__') && wordToDraw.length > 4) {
        isUnderline = true;
        wordToDraw = wordToDraw.substring(2, wordToDraw.length - 2);
      }

      const wordStartX = currentX;
      const cleanWordWidth = pCtx.measureText(wordToDraw).width + (wordToDraw.length * (state.letterSpacing * 1.6));

      // Draw highlighter stroke UNDER text if highlighted
      if (inHighlight) {
        drawHighlighterStroke(pCtx, wordStartX, wordStartX + cleanWordWidth, baseY);
      }

      // Draw character by character for organic jitter & anti-detection variance
      for (let c = 0; c < wordToDraw.length; c++) {
        const char = wordToDraw[c];
        const charWidth = pCtx.measureText(char).width;

        const seed = (lineIndex * 997) + (wordIdx * 43) + (c * 13) + (pageNum * 31);
        const r1 = pseudoRandom(seed);
        const r2 = pseudoRandom(seed + 1);

        const jitterY = (r1 - 0.5) * (state.baselineJitter * 2.8);
        const rotationAngle = (r2 - 0.5) * (state.rotationJitter * (Math.PI / 180) * 1.4);

        pCtx.save();
        pCtx.translate(currentX + (charWidth / 2), baseY + jitterY);
        pCtx.rotate(rotationAngle);

        // ANTI-DETECTION: Micro-scale variance
        const scaleX = 1 + (r1 - 0.5) * 0.07;
        const scaleY = 1 + (r2 - 0.5) * 0.05;
        pCtx.scale(scaleX, scaleY);

        // ANTI-DETECTION: Repeating letter natural variance (e.g. "ee", "oo", "ll")
        if (c > 0 && wordToDraw[c].toLowerCase() === wordToDraw[c - 1].toLowerCase()) {
          pCtx.scale(0.95, 0.96);
          pCtx.rotate(r1 > 0.5 ? 0.04 : -0.04);
        }

        if (state.penType === 'ballpoint') {
          pCtx.globalAlpha = 0.88 + (r1 * 0.12);
        } else if (state.penType === 'pencil') {
          pCtx.globalAlpha = 0.70 + (r1 * 0.18);
        }

        if (isBold) {
          pCtx.lineWidth = 1.4;
          pCtx.strokeStyle = activeColor;
          pCtx.strokeText(char, -(charWidth / 2), 0);
          pCtx.fillText(char, -(charWidth / 2), 0);
        } else {
          pCtx.fillText(char, -(charWidth / 2), 0);
        }

        if (state.penType === 'fountain' && r2 > 0.65) {
          pCtx.globalAlpha = 0.16;
          pCtx.fillText(char, -(charWidth / 2) + 0.3, 0.3);
        }

        pCtx.restore();
        currentX += charWidth + (state.letterSpacing * 1.6);
      }

      // If word is marked as mistake, draw realistic handwritten scratch!
      if (isMistake) {
        drawHumanScratch(pCtx, wordStartX, currentX, baseY);
      }

      // If word is underlined, draw hand-drawn underline
      if (isUnderline) {
        drawHandUnderline(pCtx, wordStartX, currentX, baseY);
      }

      if (endsHighlight) {
        inHighlight = false;
      }

      currentX += state.wordSpacing * 1.5;
    });
  });

  pCtx.restore();
}

// DRAW NATURAL HAND UNDERLINE
function drawHandUnderline(pCtx, startX, endX, baseY) {
  pCtx.save();
  pCtx.strokeStyle = state.bodyColor;
  pCtx.lineWidth = 1.8;
  pCtx.lineCap = 'round';
  pCtx.beginPath();
  pCtx.moveTo(startX, baseY + 4);
  const midX = (startX + endX) / 2;
  pCtx.quadraticCurveTo(midX, baseY + 6, endX, baseY + 4);
  pCtx.stroke();
  pCtx.restore();
}

// DRAW REALISTIC HIGHLIGHTER STROKE
function drawHighlighterStroke(pCtx, startX, endX, baseY) {
  pCtx.save();
  pCtx.fillStyle = state.highlighterColor;
  const markerHeight = 24;
  const markerY = baseY - markerHeight + 5;

  pCtx.beginPath();
  pCtx.moveTo(startX - 4, markerY + (pseudoRandom(startX) * 2));
  pCtx.lineTo(endX + 4, markerY);
  pCtx.lineTo(endX + 3, markerY + markerHeight + (pseudoRandom(endX) * 2));
  pCtx.lineTo(startX - 3, markerY + markerHeight);
  pCtx.closePath();
  pCtx.fill();

  pCtx.restore();
}

// DRAW TEACHER RED PEN CHECKMARK (✔)
function drawTeacherTick(pCtx, x, y) {
  pCtx.save();
  pCtx.strokeStyle = '#dc2626';
  pCtx.lineWidth = 2.2;
  pCtx.lineCap = 'round';
  pCtx.lineJoin = 'round';
  pCtx.globalAlpha = 0.9;

  pCtx.beginPath();
  pCtx.moveTo(x - 6, y - 2);
  pCtx.lineTo(x, y + 8);
  pCtx.lineTo(x + 16, y - 18);
  pCtx.stroke();

  pCtx.restore();
}

// DRAW REALISTIC HANDWRITTEN SCRATCH
function drawHumanScratch(pCtx, startX, endX, baseY) {
  pCtx.save();
  pCtx.strokeStyle = state.bodyColor;
  pCtx.lineWidth = 1.8;
  pCtx.lineCap = 'round';
  pCtx.globalAlpha = 0.85;

  const midY = baseY - 8;
  pCtx.beginPath();
  pCtx.moveTo(startX - 2, midY + (pseudoRandom(startX) * 3));
  pCtx.bezierCurveTo(
    startX + ((endX - startX) * 0.3), midY - 2,
    startX + ((endX - startX) * 0.7), midY + 3,
    endX + 2, midY - 1
  );
  pCtx.stroke();

  pCtx.beginPath();
  pCtx.moveTo(startX, midY + 2);
  pCtx.lineTo(endX, midY - 3);
  pCtx.stroke();

  pCtx.restore();
}

// DRAW STUDENT SIGNATURE AT BOTTOM OF LAST PAGE
function drawStudentSignature(pCtx, totalLines) {
  const effectiveLineHeight = state.lineHeight * 1.8;
  const effectiveTopMargin = state.topMargin * 1.8;

  const sigY = Math.min(1754 - 110, effectiveTopMargin + (totalLines * effectiveLineHeight) + 90);
  const sigX = 1240 - 320;

  pCtx.save();
  pCtx.font = '22px "Plus Jakarta Sans", sans-serif';
  pCtx.fillStyle = '#64748b';
  pCtx.fillText('Submitted by:', sigX, sigY - 22);

  pCtx.font = '36px "Marck Script", cursive';
  pCtx.fillStyle = state.bodyColor;
  pCtx.fillText(state.signatureName, sigX + 10, sigY + 14);

  pCtx.strokeStyle = state.bodyColor;
  pCtx.lineWidth = 1.4;
  pCtx.beginPath();
  pCtx.moveTo(sigX + 10, sigY + 20);
  pCtx.bezierCurveTo(sigX + 70, sigY + 23, sigX + 140, sigY + 18, sigX + 210, sigY + 21);
  pCtx.stroke();

  pCtx.restore();
}

// DRAW ATTACHED DIAGRAM / SKETCH
function drawAttachedDiagram(pCtx, totalLines) {
  if (!state.diagramImage) return;

  const effectiveLineHeight = state.lineHeight * 1.8;
  const effectiveTopMargin = state.topMargin * 1.8;
  const effectiveLeftMargin = state.leftMargin * 1.8;

  const diagY = Math.min(1754 - 350, effectiveTopMargin + (totalLines * effectiveLineHeight) + 40);
  const diagW = state.diagramSize * 1.8;
  const aspect = state.diagramImage.height / state.diagramImage.width;
  const diagH = diagW * aspect;

  pCtx.save();
  pCtx.globalAlpha = 0.95;
  pCtx.drawImage(state.diagramImage, effectiveLeftMargin + 40, diagY, diagW, diagH);
  pCtx.strokeStyle = '#e2e8f0';
  pCtx.lineWidth = 1;
  pCtx.strokeRect(effectiveLeftMargin + 40, diagY, diagW, diagH);
  pCtx.restore();
}

// CONFIGURE PEN STYLES & SHADOWS
function configurePenStyle(pCtx, color) {
  pCtx.fillStyle = color;

  switch (state.penType) {
    case 'ballpoint':
      pCtx.shadowColor = color;
      pCtx.shadowBlur = state.inkBleed * 1.2;
      break;

    case 'gel':
      pCtx.shadowColor = color;
      pCtx.shadowBlur = 0.6;
      break;

    case 'fountain':
      pCtx.shadowColor = color;
      pCtx.shadowBlur = 2.2 * state.inkBleed;
      break;

    case 'pencil':
      pCtx.fillStyle = '#374151';
      pCtx.shadowColor = 'transparent';
      pCtx.shadowBlur = 0;
      break;
  }
}

// -------------------------------------------------------------
// EXPORTING: IMAGE & MULTI-PAGE PDF
// -------------------------------------------------------------
function downloadCurrentPageImage() {
  const targetSheet = document.getElementById(`page-sheet-${currentViewPage}`) || document.querySelector('.page-sheet');
  if (!targetSheet) return;
  const canvasEl = targetSheet.querySelector('canvas');
  const link = document.createElement('a');
  link.download = `Qalmotype_Assignment_Page_${currentViewPage}.png`;
  link.href = canvasEl.toDataURL('image/png');
  link.click();
}

async function downloadFullPDF() {
  const btn = document.getElementById('btn-download-pdf');
  const originalHtml = btn.innerHTML;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Exporting PDF...</span>`;
  btn.disabled = true;

  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const canvases = document.querySelectorAll('.page-sheet canvas');
    canvases.forEach((canvasEl, idx) => {
      const imgData = canvasEl.toDataURL('image/jpeg', 0.95);
      if (idx > 0) {
        pdf.addPage('a4', 'portrait');
      }
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    });

    pdf.save('Qalmotype_Handwritten_Assignment.pdf');
  } catch (err) {
    alert('PDF generate karne mein masla hua.');
    console.error(err);
  } finally {
    btn.innerHTML = originalHtml;
    btn.disabled = false;
  }
}

// -------------------------------------------------------------
// CLIPBOARD: 1-CLICK INSTANT COPY TO CLIPBOARD
// -------------------------------------------------------------
async function copyCurrentPageImage() {
  const targetSheet = document.getElementById(`page-sheet-${currentViewPage}`) || document.querySelector('.page-sheet');
  if (!targetSheet) return;
  const canvasEl = targetSheet.querySelector('canvas');

  if (!navigator.clipboard || !window.ClipboardItem) {
    showToast('Clipboard copy is not supported in this browser. Please use Save PNG.');
    return;
  }

  try {
    canvasEl.toBlob(async (blob) => {
      if (!blob) {
        showToast('Image generate karne mein masla hua.');
        return;
      }
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      showToast(`📋 Page ${currentViewPage} copied to clipboard! Paste with Ctrl+V into Word / WhatsApp.`);
    }, 'image/png');
  } catch (err) {
    console.error('Clipboard error:', err);
    showToast('Clipboard access denied. Please click "Save PNG" instead.');
  }
}

// -------------------------------------------------------------
// BATCH EXPORT: DOWNLOAD ALL PAGES AS ZIP ARCHIVE
// -------------------------------------------------------------
async function downloadAllPagesAsZip() {
  if (typeof JSZip === 'undefined') {
    showToast('ZIP library loading... Please try again in 2 seconds.');
    return;
  }
  const btn = document.getElementById('btn-download-zip');
  const originalHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Creating ZIP...</span>`;
    btn.disabled = true;
  }

  try {
    const zip = new JSZip();
    const sheets = document.querySelectorAll('.page-sheet');

    sheets.forEach((sheet, idx) => {
      const canvasEl = sheet.querySelector('canvas');
      const dataUrl = canvasEl.toDataURL('image/png');
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      zip.file(`Qalmotype_Page_${idx + 1}.png`, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'Qalmotype_Handwritten_Pages.zip';
    link.click();
    showToast(`📦 Downloaded all ${sheets.length} pages in ZIP archive!`);
  } catch (err) {
    console.error('ZIP generation error:', err);
    showToast('ZIP archive create karne mein masla hua.');
  } finally {
    if (btn) {
      btn.innerHTML = originalHtml;
      btn.disabled = false;
    }
  }
}

// -------------------------------------------------------------
// ZEN THEATER MODE (FULLSCREEN FOCUS PREVIEW)
// -------------------------------------------------------------
function toggleZenMode() {
  document.body.classList.toggle('zen-mode');
  const isZen = document.body.classList.contains('zen-mode');
  const btnZen = document.getElementById('btn-zen-mode');
  if (btnZen) {
    btnZen.classList.toggle('draw-active', isZen);
  }
  showToast(isZen ? '🧘 Zen Theater Mode on (Press Esc or button to exit)' : 'Exited Zen Theater Mode');
}

// -------------------------------------------------------------
// TOAST NOTIFICATION SYSTEM
// -------------------------------------------------------------
function showToast(message, duration = 3200) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast-pill';
  toast.innerHTML = message;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('toast-show'), 20);
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, duration);
}

// -------------------------------------------------------------
// GOODNOTES FLOATING PAGE DOCK
// -------------------------------------------------------------
function updatePageDock(totalPages) {
  const dock = document.getElementById('page-dock');
  if (!dock) return;
  dock.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pill = document.createElement('button');
    pill.className = `dock-page-btn ${i === currentViewPage ? 'active' : ''}`;
    pill.dataset.page = i;
    pill.innerHTML = `Page ${i}`;
    pill.title = `Scroll directly to Page ${i}`;
    pill.addEventListener('click', () => {
      currentViewPage = i;
      const targetSheet = document.getElementById(`page-sheet-${i}`);
      if (targetSheet) {
        targetSheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      updateActiveDockBtn();
      const indicator = document.getElementById('page-indicator');
      if (indicator) {
        indicator.textContent = `Page ${currentViewPage} of ${state.totalPages}`;
      }
    });
    dock.appendChild(pill);
  }
}

function updateActiveDockBtn() {
  document.querySelectorAll('.dock-page-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.page, 10) === currentViewPage);
  });
}
