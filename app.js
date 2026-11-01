/**
 * HandWriter Pro - Core Engine (V2 Premium)
 * Advanced canvas renderer featuring dual-ink rendering, mistake strike-throughs,
 * binder punch holes, diagram attachments, and human realism jitter.
 */

// STATE MANAGEMENT
const state = {
  text: '',
  fontFamily: 'Caveat',
  fontSize: 21,
  lineHeight: 35,
  letterSpacing: 1.0,
  wordSpacing: 7.0,
  bodyColor: '#103b78',
  headingColor: '#b91c1c',
  penType: 'ballpoint',
  paperType: 'ruled-margin',
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
  showShadows: true,
  showGrain: true,
  showCrease: true,
  showTilt: false,
  showHoles: true,
  showHeaderMeta: true,
  currentPage: 1,
  totalPages: 1,
  zoom: 1.0
};

// CURATED REALISTIC FONTS (INCLUDING REAL DOCTOR PRESCRIPTION & MESSY STYLES)
const HANDWRITING_FONTS = [
  {
    id: 'Kristi',
    name: 'Doctor Prescription (Rx)',
    sample: 'Rx Tab Paracetamol 500mg TDS',
    tag: 'Doctor Rx',
    tagClass: 'tag-messy',
    font: 'Kristi, cursive'
  },
  {
    id: 'Cedarville Cursive',
    name: 'Doctor Hurried Notes',
    sample: 'Clinic examination notes & vitals',
    tag: 'Doctor Cursive',
    tagClass: 'tag-messy',
    font: '"Cedarville Cursive", cursive'
  },
  {
    id: 'Reenie Beanie',
    name: 'Doctor Scribble',
    sample: 'Ultra-fast hurried doctor scribble',
    tag: 'Doctor Scribble',
    tagClass: 'tag-messy',
    font: '"Reenie Beanie", cursive'
  },
  {
    id: 'Zeyada',
    name: 'Scratchy Messy Hand',
    sample: 'Fast careless notes on scratchpad',
    tag: 'Messy Scratch',
    tagClass: 'tag-messy',
    font: 'Zeyada, cursive'
  },
  {
    id: 'Just Another Hand',
    name: 'Messy Hurried Student',
    sample: 'Rushed 5-minutes before submission',
    tag: 'Messy Rushed',
    tagClass: 'tag-messy',
    font: '"Just Another Hand", cursive'
  },
  {
    id: 'Homemade Apple',
    name: 'Loose Messy Cursive',
    sample: 'Raw unorganized cursive hand',
    tag: 'Messy Cursive',
    tagClass: 'tag-messy',
    font: '"Homemade Apple", cursive'
  },
  {
    id: 'Beth Ellen',
    name: 'Raw Human Hand',
    sample: 'Authentic organic human lettering',
    tag: 'Organic Hand',
    tagClass: 'tag-neat',
    font: '"Beth Ellen", cursive'
  },
  {
    id: 'Caveat',
    name: 'Everyday Notes',
    sample: 'Natural expressive student notes',
    tag: 'Casual Everyday',
    tagClass: 'tag-neat',
    font: 'Caveat, cursive'
  },
  {
    id: 'Kalam',
    name: 'Desi Student Ballpoint',
    sample: 'Subcontinent university register writing',
    tag: 'Ballpoint Hand',
    tagClass: 'tag-neat',
    font: 'Kalam, cursive'
  },
  {
    id: 'Shadows Into Light',
    name: 'Class Topper Clean',
    sample: 'Neat organized exam assignment',
    tag: 'Clean Topper',
    tagClass: 'tag-neat',
    font: '"Shadows Into Light", cursive'
  },
  {
    id: 'Patrick Hand',
    name: 'Neat Print Classroom',
    sample: 'Clear legible print handwriting',
    tag: 'Neat Print',
    tagClass: 'tag-neat',
    font: '"Patrick Hand", cursive'
  },
  {
    id: 'Marck Script',
    name: 'Classic Fountain Script',
    sample: 'Flowing vintage ink signature hand',
    tag: 'Vintage Nib',
    tagClass: 'tag-cursive',
    font: '"Marck Script", cursive'
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
  }
};

// SAMPLE ASSIGNMENT TEXT (With Headings and Natural Mistake)
const SAMPLE_ASSIGNMENT = `# DEPARTMENT OF COMPUTER SCIENCE
# ASSIGNMENT NO: 02 (OPERATING SYSTEMS)

NAME: Muhammad Ali
ROLL NO: BSCS-F21-042
DATE: November 02, 2026

# Q1: Explain Virtual Memory and Demand Paging.
Virtual memory is a memory management capability of an OS that uses hardware and software to allow a computer to compensate for physical memory shortages by temporarily transferring data from random access memory (RAM) to disk storage.

The primary benefit is that an application can be ~~compeltely~~ much larger than physical memory. Demand paging brings a page into memory only when it is needed during program execution.

# Q2: Differences Between Process and Thread:
1. Address Space: Processes have independent memory spaces, whereas threads share memory within the same parent process.
2. Context Switching: Process switching requires invalidating translation lookaside buffers (TLB), while thread switching is very lightweight and ~~imposible~~ much faster.
3. System Calls: Inter-thread communication does not require kernel intervention, leading to higher throughput.`;

// DOM ELEMENTS
const canvas = document.getElementById('assignment-canvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('input-text');
const charCount = document.getElementById('char-count');
const fontSelector = document.getElementById('font-selector');
const pageIndicator = document.getElementById('page-indicator');
const canvasStage = document.getElementById('canvas-stage');
const shadowOverlay = document.getElementById('shadow-overlay');
const grainOverlay = document.getElementById('grain-overlay');
const creaseOverlay = document.getElementById('crease-overlay');

// SEEDABLE DETERMINISTIC PSEUDO RANDOM GENERATOR
function pseudoRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// INITIALIZATION
window.addEventListener('DOMContentLoaded', async () => {
  setupTabs();
  buildFontList();
  setupEventListeners();

  textInput.value = SAMPLE_ASSIGNMENT;
  updateCharCount();

  if (document.fonts) {
    await document.fonts.ready;
  }

  renderCanvas();
});

// BUILD FONT LIST UI
function buildFontList() {
  fontSelector.innerHTML = '';
  HANDWRITING_FONTS.forEach(font => {
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
  // Text Input
  textInput.addEventListener('input', () => {
    state.text = textInput.value;
    updateCharCount();
    renderCanvas();
  });

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

  document.getElementById('chip-date').addEventListener('click', () => {
    const now = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    insertTextAtCursor(`DATE: ${now}\n`);
  });

  document.getElementById('chip-mistake').addEventListener('click', () => {
    insertTextAtCursor(' ~~mistake~~ ');
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

  // Dual Ink Colors
  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const type = dot.dataset.type; // 'body' or 'heading'
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

  // Color Pickers
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

  // Realism & Overlay Toggles
  document.getElementById('toggle-shadows').addEventListener('change', (e) => {
    state.showShadows = e.target.checked;
    shadowOverlay.style.display = state.showShadows ? 'block' : 'none';
  });

  document.getElementById('toggle-grain').addEventListener('change', (e) => {
    state.showGrain = e.target.checked;
    grainOverlay.style.display = state.showGrain ? 'block' : 'none';
  });

  document.getElementById('toggle-crease').addEventListener('change', (e) => {
    state.showCrease = e.target.checked;
    creaseOverlay.style.display = state.showCrease ? 'block' : 'none';
  });

  document.getElementById('toggle-tilt').addEventListener('change', (e) => {
    state.showTilt = e.target.checked;
    canvasStage.classList.toggle('tilt-effect', state.showTilt);
  });

  document.getElementById('toggle-holes').addEventListener('change', (e) => {
    state.showHoles = e.target.checked;
    renderCanvas();
  });

  document.getElementById('toggle-header-meta').addEventListener('change', (e) => {
    state.showHeaderMeta = e.target.checked;
    renderCanvas();
  });

  // Navigation & Zoom
  document.getElementById('btn-prev-page').addEventListener('click', () => {
    if (state.currentPage > 1) {
      state.currentPage--;
      renderCanvas();
    }
  });

  document.getElementById('btn-next-page').addEventListener('click', () => {
    if (state.currentPage < state.totalPages) {
      state.currentPage++;
      renderCanvas();
    }
  });

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
    state.zoom = 1.0;
    applyZoom();
  });

  // Direct Print
  document.getElementById('btn-print').addEventListener('click', () => {
    const win = window.open('');
    win.document.write(`<img src="${canvas.toDataURL()}" style="width:100%;" onload="window.print(); window.close();"/>`);
    win.document.close();
  });

  // Export Buttons
  document.getElementById('btn-download-img').addEventListener('click', downloadCurrentPageImage);
  document.getElementById('btn-download-pdf').addEventListener('click', downloadFullPDF);
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

  // Update active pen card
  document.querySelectorAll('.pen-card').forEach(c => {
    c.classList.toggle('active', c.dataset.pen === p.penType);
  });

  // Update active paper card
  document.querySelectorAll('.paper-card').forEach(c => {
    c.classList.toggle('active', c.dataset.paper === p.paperType);
  });

  // Update font card
  buildFontList();
  renderCanvas();
}

function applyZoom() {
  canvasStage.style.transform = `scale(${state.zoom})`;
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
// TEXT PARSING & PAGINATION LOGIC
// -------------------------------------------------------------
function paginateText() {
  const content = textInput.value || '';
  const rawLines = content.split('\n');

  const effectiveLineHeight = state.lineHeight * 1.8;
  const effectiveTopMargin = state.topMargin * 1.8;
  const effectiveLeftMargin = state.leftMargin * 1.8;
  const effectiveRightMargin = state.rightMargin * 1.8;
  const effectiveBottomMargin = state.bottomMargin * 1.8;

  const availableWidth = canvas.width - effectiveLeftMargin - effectiveRightMargin;
  const availableHeight = canvas.height - effectiveTopMargin - effectiveBottomMargin;
  const maxLinesPerPage = Math.max(1, Math.floor(availableHeight / effectiveLineHeight));

  ctx.font = getResolvedFontString(state.fontSize);

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
      const testWidth = ctx.measureText(testLine).width + (testLine.length * (state.letterSpacing * 1.6));

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
  if (state.currentPage > state.totalPages) {
    state.currentPage = state.totalPages;
  }
  pageIndicator.textContent = `Page ${state.currentPage} of ${state.totalPages}`;

  return pages[state.currentPage - 1] || [];
}

// -------------------------------------------------------------
// CANVAS RENDERING
// -------------------------------------------------------------
function renderCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Draw Paper
  drawPaperBackground();

  // 2. Draw Binder Holes & Punch Marks
  if (state.showHoles && !state.customPaperImage) {
    drawBinderHoles();
  }

  // 3. Draw Paper Lines & Margins
  drawPaperLines();

  // 4. Draw Header Metadata (Page, Date)
  if (state.showHeaderMeta && !state.customPaperImage) {
    drawHeaderMeta();
  }

  // 5. Draw Handwriting Text for current page
  const pageLines = paginateText();
  drawHandwrittenLines(pageLines);

  // 6. Draw Attached Diagram / Image if on Page 1 (or current page)
  if (state.diagramImage && state.currentPage === 1) {
    drawAttachedDiagram(pageLines.length);
  }
}

// DRAW PAPER BACKGROUND
function drawPaperBackground() {
  if (state.customPaperImage) {
    ctx.drawImage(state.customPaperImage, 0, 0, canvas.width, canvas.height);
    return;
  }

  switch (state.paperType) {
    case 'parchment':
      ctx.fillStyle = '#fdf6e2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const vGrad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 200, canvas.width / 2, canvas.height / 2, 900);
      vGrad.addColorStop(0, 'rgba(255,255,255,0)');
      vGrad.addColorStop(1, 'rgba(180, 150, 110, 0.16)');
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      break;

    case 'blank-white':
    case 'ruled-plain':
    case 'ruled-margin':
    case 'grid':
    default:
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      break;
  }
}

// DRAW BINDER HOLES (Left Edge)
function drawBinderHoles() {
  ctx.save();
  const holeX = 45;
  const holeRadius = 14;
  const holePositions = [canvas.height * 0.22, canvas.height * 0.50, canvas.height * 0.78];

  holePositions.forEach(y => {
    // Hole shadow inside
    ctx.beginPath();
    ctx.arc(holeX, y, holeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#e2e8f0';
    ctx.fill();

    // Darker inner hole
    ctx.beginPath();
    ctx.arc(holeX, y, holeRadius - 2, 0, Math.PI * 2);
    ctx.fillStyle = '#cbd5e1';
    ctx.fill();

    // Paper edge ring
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  });

  ctx.restore();
}

// DRAW HEADER META (Date & Page Number)
function drawHeaderMeta() {
  const effectiveTopMargin = state.topMargin * 1.8;
  ctx.save();
  ctx.font = '22px "Inter", sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`Date: ____ / ____ / 2026`, canvas.width - 370, effectiveTopMargin - 45);
  ctx.fillText(`Page: 0${state.currentPage}`, canvas.width - 130, effectiveTopMargin - 45);
  ctx.restore();
}

// DRAW PAPER LINES & MARGINS
function drawPaperLines() {
  if (state.customPaperImage) return;

  const effectiveLineHeight = state.lineHeight * 1.8;
  const effectiveTopMargin = state.topMargin * 1.8;
  const effectiveLeftMargin = state.leftMargin * 1.8;

  ctx.save();

  if (state.paperType === 'ruled-margin') {
    // Double Red Margin Line (Standard Pakistani / Asian Register)
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(effectiveLeftMargin - 22, 0);
    ctx.lineTo(effectiveLeftMargin - 22, canvas.height);
    ctx.stroke();

    ctx.strokeStyle = '#fca5a5';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(effectiveLeftMargin - 28, 0);
    ctx.lineTo(effectiveLeftMargin - 28, canvas.height);
    ctx.stroke();

    // Top Header Double Blue Line
    ctx.strokeStyle = '#93c5fd';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, effectiveTopMargin - 32);
    ctx.lineTo(canvas.width, effectiveTopMargin - 32);
    ctx.moveTo(0, effectiveTopMargin - 26);
    ctx.lineTo(canvas.width, effectiveTopMargin - 26);
    ctx.stroke();

    // Horizontal ruled blue lines
    ctx.strokeStyle = '#bfdbfe';
    ctx.lineWidth = 1.2;
    for (let y = effectiveTopMargin; y < canvas.height - (state.bottomMargin * 1.8); y += effectiveLineHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  } else if (state.paperType === 'ruled-plain') {
    // College Ruled (Blue lines)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.2;
    for (let y = effectiveTopMargin; y < canvas.height - (state.bottomMargin * 1.8); y += effectiveLineHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  } else if (state.paperType === 'grid') {
    // Graph Grid
    const gridSize = 36;
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  ctx.restore();
}

// -------------------------------------------------------------
// ULTRA-REALISTIC HANDWRITING RENDERING
// -------------------------------------------------------------
function drawHandwrittenLines(lines) {
  const effectiveLineHeight = state.lineHeight * 1.8;
  const effectiveTopMargin = state.topMargin * 1.8;
  const effectiveLeftMargin = state.leftMargin * 1.8;

  ctx.save();
  ctx.textBaseline = 'alphabetic';

  lines.forEach((lineObj, lineIndex) => {
    const text = lineObj.text;
    const isHeading = lineObj.isHeading;
    const baseY = effectiveTopMargin + (lineIndex * effectiveLineHeight) - 8;
    let currentX = effectiveLeftMargin;

    // Apply color: Heading Color vs Body Color
    const activeColor = isHeading ? state.headingColor : state.bodyColor;
    const fontSize = isHeading ? state.fontSize * 1.08 : state.fontSize;
    ctx.font = getResolvedFontString(fontSize);

    configurePenStyle(activeColor);

    // Parse words to detect mistakes: ~~word~~
    const words = text.split(' ');

    words.forEach((rawWord, wordIdx) => {
      let isMistake = false;
      let wordToDraw = rawWord;

      // Check if word is wrapped in ~~...~~
      if (rawWord.startsWith('~~') && rawWord.endsWith('~~') && rawWord.length > 4) {
        isMistake = true;
        wordToDraw = rawWord.substring(2, rawWord.length - 2);
      }

      const wordStartX = currentX;

      // Draw character by character for organic jitter
      for (let c = 0; c < wordToDraw.length; c++) {
        const char = wordToDraw[c];
        const charWidth = ctx.measureText(char).width;

        const seed = (lineIndex * 997) + (wordIdx * 43) + (c * 13) + (state.currentPage * 31);
        const r1 = pseudoRandom(seed);
        const r2 = pseudoRandom(seed + 1);

        const jitterY = (r1 - 0.5) * (state.baselineJitter * 2.8);
        const rotationAngle = (r2 - 0.5) * (state.rotationJitter * (Math.PI / 180) * 1.4);

        ctx.save();
        ctx.translate(currentX + (charWidth / 2), baseY + jitterY);
        ctx.rotate(rotationAngle);

        if (state.penType === 'ballpoint') {
          ctx.globalAlpha = 0.88 + (r1 * 0.12);
        } else if (state.penType === 'pencil') {
          ctx.globalAlpha = 0.70 + (r1 * 0.18);
        }

        ctx.fillText(char, -(charWidth / 2), 0);

        // Subtle fountain pen bleed
        if (state.penType === 'fountain' && r2 > 0.65) {
          ctx.globalAlpha = 0.16;
          ctx.fillText(char, -(charWidth / 2) + 0.3, 0.3);
        }

        ctx.restore();
        currentX += charWidth + (state.letterSpacing * 1.6);
      }

      // If word is marked as mistake, draw realistic human scribble strike-through!
      if (isMistake) {
        drawHumanScratch(wordStartX, currentX, baseY);
      }

      // Space between words
      currentX += state.wordSpacing * 1.5;
    });
  });

  ctx.restore();
}

// DRAW REALISTIC HANDWRITTEN SCRATCH / STRIKE-THROUGH
function drawHumanScratch(startX, endX, baseY) {
  ctx.save();
  ctx.strokeStyle = state.bodyColor;
  ctx.lineWidth = 1.8;
  ctx.lineCap = 'round';
  ctx.globalAlpha = 0.85;

  const midY = baseY - 8;
  ctx.beginPath();
  ctx.moveTo(startX - 2, midY + (pseudoRandom(startX) * 3));
  // Natural wavy strike
  ctx.bezierCurveTo(
    startX + ((endX - startX) * 0.3), midY - 2,
    startX + ((endX - startX) * 0.7), midY + 3,
    endX + 2, midY - 1
  );
  ctx.stroke();

  // Secondary fast stroke
  ctx.beginPath();
  ctx.moveTo(startX, midY + 2);
  ctx.lineTo(endX, midY - 3);
  ctx.stroke();

  ctx.restore();
}

// DRAW ATTACHED DIAGRAM / SKETCH
function drawAttachedDiagram(totalLines) {
  if (!state.diagramImage) return;

  const effectiveLineHeight = state.lineHeight * 1.8;
  const effectiveTopMargin = state.topMargin * 1.8;
  const effectiveLeftMargin = state.leftMargin * 1.8;

  // Position diagram below the last line
  const diagY = Math.min(canvas.height - 350, effectiveTopMargin + (totalLines * effectiveLineHeight) + 40);
  const diagW = state.diagramSize * 1.8;
  const aspect = state.diagramImage.height / state.diagramImage.width;
  const diagH = diagW * aspect;

  ctx.save();
  ctx.globalAlpha = 0.95;
  // Draw subtle photo tape or clean border
  ctx.drawImage(state.diagramImage, effectiveLeftMargin + 40, diagY, diagW, diagH);
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.strokeRect(effectiveLeftMargin + 40, diagY, diagW, diagH);
  ctx.restore();
}

// CONFIGURE PEN STYLES & SHADOWS
function configurePenStyle(color) {
  ctx.fillStyle = color;

  switch (state.penType) {
    case 'ballpoint':
      ctx.shadowColor = color;
      ctx.shadowBlur = state.inkBleed * 1.2;
      break;

    case 'gel':
      ctx.shadowColor = color;
      ctx.shadowBlur = 0.6;
      break;

    case 'fountain':
      ctx.shadowColor = color;
      ctx.shadowBlur = 2.2 * state.inkBleed;
      break;

    case 'pencil':
      ctx.fillStyle = '#374151';
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      break;
  }
}

// -------------------------------------------------------------
// EXPORTING: IMAGE & PDF
// -------------------------------------------------------------
function downloadCurrentPageImage() {
  const link = document.createElement('a');
  link.download = `KalamoType_Assignment_Page_${state.currentPage}.png`;
  link.href = canvas.toDataURL('image/png');
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

    const savedCurrentPage = state.currentPage;

    for (let pageNum = 1; pageNum <= state.totalPages; pageNum++) {
      state.currentPage = pageNum;
      renderCanvas();

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      if (pageNum > 1) {
        pdf.addPage('a4', 'portrait');
      }
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    }

    state.currentPage = savedCurrentPage;
    renderCanvas();

    pdf.save('KalamoType_Handwritten_Assignment.pdf');
  } catch (err) {
    alert('PDF generate karne mein masla hua.');
    console.error(err);
  } finally {
    btn.innerHTML = originalHtml;
    btn.disabled = false;
  }
}
