'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Dữ liệu dự án (dùng cho modal) ---------- */
const PROJECTS = {
  trie: {
    title: 'Trie Keyword Suggestion',
    description: 'Dùng cấu trúc cây Trie để lưu từ điển. Khi người dùng nhập một tiền tố, hệ thống liệt kê nhanh các từ gợi ý hoặc tìm tiền tố chung dài nhất của một tập từ.',
    features: ['Gợi ý từ theo tiền tố gần như tức thì', 'Tìm tiền tố chung dài nhất (chia để trị)', 'Xếp hạng gợi ý theo tần suất và độ mới', 'Lưu lịch sử tìm kiếm bằng SQLite', 'Trả về Top-K gợi ý tốt nhất'],
    tech: 'Công nghệ: Python, CustomTkinter, SQLite3',
    url: 'https://github.com/uyen1103/trie-keyword-suggestion'
  },
  chatties: {
    title: 'Chatties',
    description: 'Ứng dụng chat lấy cảm hứng từ Discord, phát triển theo nhóm. Máy chủ TCP viết bằng C++ với Boost.Asio, giao diện máy khách viết bằng Qt 6.',
    features: ['Nhắn tin giữa máy chủ và máy khách qua TCP', 'Giao diện desktop bằng Qt', 'Lộ trình: máy chủ/kênh, vai trò, thoại và video'],
    tech: 'Công nghệ: C++, Qt 6, Boost.Asio, SQLite, CMake',
    url: 'https://github.com/Khoi2310/App_Chatties'
  }
};

/* ---------- Bảng màu: sáng/tối và chuyển mượt sang cam/trắng ---------- */
const root = document.documentElement;
const themeBtn = $('#themeBtn');
const PALETTES = {
  dark: {
    base:   { acc: [125, 255, 178], fg: [232, 232, 227], dim: [138, 138, 132], line: [38, 38, 42], onAcc: [4, 19, 10] },
    orange: { acc: [255, 138, 31],  fg: [255, 255, 255], dim: [184, 169, 154], line: [58, 42, 28], onAcc: [26, 10, 0] }
  },
  light: {
    base:   { acc: [11, 122, 71], fg: [20, 20, 20], dim: [93, 93, 87], line: [217, 217, 210], onAcc: [255, 255, 255] },
    orange: { acc: [217, 86, 10], fg: [31, 18, 9],  dim: [122, 99, 80], line: [234, 217, 200], onAcc: [255, 255, 255] }
  }
};
const CSS_VARS = { acc: '--acc', fg: '--fg', dim: '--dim', line: '--line', onAcc: '--on-acc' };
// mix: 0 = màu mặc định, 1 = cam/trắng. target là giá trị mix đang hướng tới.
const palette = { theme: 'dark', mix: 0, target: 0, accent: 'rgb(125,255,178)', accentRGB: [125, 255, 178] };

function paintPalette() {
  const set = PALETTES[palette.theme];
  for (const key in CSS_VARS) {
    const rgb = set.base[key].map((value, i) => Math.round(value + (set.orange[key][i] - value) * palette.mix));
    root.style.setProperty(CSS_VARS[key], `rgb(${rgb.join(',')})`);
    if (key === 'acc') { palette.accent = `rgb(${rgb.join(',')})`; palette.accentRGB = rgb; }
  }
}
function stepPalette(deltaSeconds) {
  if (palette.mix === palette.target) return;
  palette.mix += (palette.target - palette.mix) * (1 - Math.exp(-deltaSeconds / 0.9));
  if (Math.abs(palette.target - palette.mix) < 0.002) palette.mix = palette.target;
  paintPalette();
}
function applyTheme(theme) {
  palette.theme = theme;
  root.dataset.theme = theme;
  paintPalette();
  try { localStorage.setItem('theme', theme); } catch (e) { /* bỏ qua nếu bị chặn */ }
}
let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('theme') || 'dark'; } catch (e) {}
applyTheme(savedTheme);
themeBtn.addEventListener('click', () => applyTheme(palette.theme === 'dark' ? 'light' : 'dark'));

/* ---------- Menu mobile + liên kết đang xem ---------- */
const nav = $('#nav');
const menuBtn = $('#menuBtn');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
});
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    $$('nav a').forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(section => sectionObserver.observe(section));

/* ---------- Lọc dự án ---------- */
const filterButtons = $$('.chip');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(b => b.classList.toggle('active', b === button));
  $$('.card').forEach(card => { card.hidden = filter !== 'all' && !card.dataset.tags.split(' ').includes(filter); });
}));

/* ---------- Modal chi tiết dự án ---------- */
const modal = $('#modal');
$$('[data-open]').forEach(button => button.addEventListener('click', () => {
  const project = PROJECTS[button.dataset.open];
  $('#mTitle').textContent = project.title;
  $('#mDesc').textContent = project.description;
  $('#mTech').textContent = project.tech;
  $('#mLink').href = project.url;
  const list = $('#mFeat');
  list.replaceChildren(...project.features.map(text => Object.assign(document.createElement('li'), { textContent: text })));
  modal.showModal();
}));
$('#mClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });

/* ---------- Form liên hệ: kiểm tra dữ liệu bằng JavaScript ---------- */
const form = $('#contactForm');
const validators = {
  name: value => value.trim().length >= 2 || 'Vui lòng nhập họ tên (ít nhất 2 ký tự).',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) || 'Email chưa đúng định dạng.',
  message: value => value.trim().length >= 10 || 'Nội dung cần ít nhất 10 ký tự.'
};
function validateField(field) {
  const result = validators[field.name](field.value);
  const message = result === true ? '' : result;
  $(`.err[data-for="${field.name}"]`).textContent = message;
  field.classList.toggle('invalid', Boolean(message));
  return !message;
}
$$('input, textarea', form).forEach(field => field.addEventListener('blur', () => validateField(field)));
form.addEventListener('submit', event => {
  event.preventDefault();
  const fields = $$('input, textarea', form);
  const allValid = fields.map(validateField).every(Boolean);
  const status = $('#formStatus');
  if (!allValid) { status.textContent = ''; fields.find(f => f.classList.contains('invalid')).focus(); return; }
  status.textContent = `Cảm ơn ${form.name.value.trim()}! Tin nhắn đã được ghi nhận (bản demo, chưa gửi đến máy chủ).`;
  form.reset();
});

/* ---------- Lớp phủ 0/1 xanh trên ảnh chân dung: nhấn để lộ ảnh theo đường chéo ---------- */
(function portraitCover() {
  const button = $('#coverBtn'), canvas = $('#cover'), hint = $('#portraitHint');
  const ctx = canvas.getContext('2d');
  const CELL = 10, DURATION = 1.1, FEATHER = 0.22;
  const icon = new Image();
  icon.src = 'images/click.png';
  let width = 0, height = 0, dpr = 1, cols = 0, rows = 0;
  let time = 0, progress = 0, revealing = false, finished = false, visible = true, last = performance.now();
  const easeInOut = p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const clamp01 = value => Math.max(0, Math.min(1, value));
  const noise = (a, b) => { const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return n - Math.floor(n); };

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    width = canvas.clientWidth; height = canvas.clientHeight;
    if (!width || !height) return;
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    cols = Math.ceil(width / CELL); rows = Math.ceil(height / CELL);
  }

  // Các chữ số đổi giá trị lần lượt từ trái sang phải, kèm một dải sáng chạy cùng hướng
  function drawDigits() {
    ctx.font = `500 ${CELL + 1}px "IBM Plex Mono", monospace`;
    ctx.textBaseline = 'top';
    ctx.fillStyle = palette.accent;
    const front = (time * 14) % (cols + 24) - 12;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const flip = Math.floor(time * 5 - col * 0.3 + noise(col, row) * 4);
        const band = Math.exp(-Math.pow(col - front, 2) / 40);
        ctx.globalAlpha = Math.min(1, 0.2 + noise(row, col) * 0.12 + band * 0.7);
        ctx.fillText(((flip % 2) + 2) % 2 ? '1' : '0', col * CELL, row * CELL);
      }
    }
    ctx.globalAlpha = 1;
  }

  // Biểu tượng bàn tay nhấn ở giữa ảnh (không có vòng tròn), nhấn nhẹ theo nhịp
  function drawClickIcon() {
    if (!icon.complete || !icon.naturalWidth) return;
    const w = width * 0.26, h = w * icon.naturalHeight / icon.naturalWidth;
    const tap = prefersReducedMotion ? 0 : Math.max(0, Math.sin(time * 4)) * 0.07;
    ctx.save();
    ctx.translate(width / 2, height / 2 + tap * h * 0.3);
    ctx.scale(1 - tap, 1 - tap);
    ctx.shadowColor = '#000'; ctx.shadowBlur = 12;
    ctx.drawImage(icon, -w / 2, -h / 2, w, h);
    ctx.drawImage(icon, -w / 2, -h / 2, w, h);
    ctx.restore();
  }

  // Lộ ảnh từ góc trên trái xuống góc dưới phải: xóa lớp phủ theo đường chéo, có viền sáng ở mép
  function applyWipe(amount) {
    const k = 2 / (1 / (width * width) + 1 / (height * height));
    const x1 = k / width, y1 = k / height;
    const edge = amount * (1 + FEATHER) - FEATHER;
    const start = clamp01(edge), end = clamp01(edge + FEATHER);
    const accent = palette.accentRGB.join(',');
    if (amount > 0.01 && amount < 0.99) {
      const glow = ctx.createLinearGradient(0, 0, x1, y1);
      glow.addColorStop(Math.max(0, end - 0.05), `rgba(${accent},0)`);
      glow.addColorStop(end, `rgba(${accent},0.9)`);
      glow.addColorStop(Math.min(1, end + 0.015), `rgba(${accent},0)`);
      ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
    }
    const erase = ctx.createLinearGradient(0, 0, x1, y1);
    erase.addColorStop(0, 'rgba(0,0,0,1)');
    erase.addColorStop(start, 'rgba(0,0,0,1)');
    erase.addColorStop(end, 'rgba(0,0,0,0)');
    erase.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = erase; ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
  }

  function draw() {
    if (!width || !height) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#0a0a0a'; ctx.fillRect(0, 0, width, height);
    drawDigits();
    drawClickIcon();
    if (progress > 0) applyWipe(easeInOut(progress));
  }

  function finish() {
    finished = true;
    button.hidden = true;
    hint.textContent = 'Đỗ Thiên Phúc';
  }
  button.addEventListener('click', () => {
    if (revealing) return;
    revealing = true;
    button.setAttribute('aria-label', 'Đang giải mã ảnh chân dung');
    if (prefersReducedMotion) { progress = 1; finish(); }
  });

  function loop(now) {
    if (finished) return;
    const delta = Math.min(0.1, (now - last) / 1000);
    last = now;
    if (visible && !document.hidden) {
      if (!prefersReducedMotion) time += delta;
      if (revealing) { progress = Math.min(1, progress + delta / DURATION); if (progress >= 1) { finish(); return; } }
      draw();
    }
    requestAnimationFrame(loop);
  }
  addEventListener('resize', resize);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(canvas);
  resize();
  requestAnimationFrame(loop);
})();

/* ---------- Nền video ASCII, điều khiển phát và hiệu ứng sóng âm ---------- */
(function videoStage() {
  const EVENT_TIME = 160;   // 2:40, thời điểm kích hoạt sóng âm và đổi màu
  const FOLLOW_UP = 2;      // giây (theo thời gian video) giữa sóng chính và sóng phụ
  const CELL = 14, RAMP = ' .:-=+*#%@', REVEAL_RADIUS = 60;
  const bgCanvas = $('#bg'), bgCtx = bgCanvas.getContext('2d');
  const fxCanvas = $('#fx'), fxCtx = fxCanvas.getContext('2d');
  const video = $('#bgVideo');
  const revealCanvas = document.createElement('canvas'), revealCtx = revealCanvas.getContext('2d');
  const sampler = document.createElement('canvas');
  const samplerCtx = sampler.getContext('2d', { willReadFrequently: true });
  const ui = {
    dock: $('.dock'), play: $('#vPlay'), back: $('#vBack'), fwd: $('#vFwd'), seek: $('#vSeek'), time: $('#vTime'),
    color: $('#vColor'), mute: $('#vMute'), volume: $('#vVol'), volumeOut: $('#vVolOut'), toggle: $('#dockToggle')
  };
  const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, radius: 0, active: false };
  const waves = [];
  let width = 0, height = 0, dpr = 1, cols = 0, rows = 0, luma = new Float32Array(0), colors = new Uint8ClampedArray(0);
  let colorMode = 1;        // 0: nhiều lớp theo màu video, 1: cầu vồng, 2: mặc định (một màu)
  let hasFrame = false, videoFailed = false, frameCount = 0, clock = 0, lastTick = performance.now();
  let previousTime = 0, followUpDue = null, userMuted = false, userPaused = false, needsGesture = false, scrubbing = false;
  let objectUrl = null;

  /* ----- Kích thước ----- */
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    width = innerWidth; height = innerHeight;
    [bgCanvas, fxCanvas, revealCanvas].forEach(c => { c.width = width * dpr; c.height = height * dpr; });
    revealCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(width / CELL); rows = Math.ceil(height / CELL);
    sampler.width = cols; sampler.height = rows;
    luma = new Float32Array(cols * rows);
    colors = new Uint8ClampedArray(cols * rows * 3);
    hasFrame = false;
  }

  /* ----- Lấy độ sáng từ khung hình video ----- */
  function sampleVideo() {
    if (videoFailed || video.readyState < 2 || !video.videoWidth) return;
    const scale = Math.max(cols / video.videoWidth, rows / video.videoHeight);
    const w = video.videoWidth * scale, h = video.videoHeight * scale;
    samplerCtx.drawImage(video, (cols - w) / 2, (rows - h) / 2, w, h);
    let data;
    try { data = samplerCtx.getImageData(0, 0, cols, rows).data; } catch (e) { videoFailed = true; return; }
    for (let i = 0; i < luma.length; i++) {
      const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
      const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      luma[i] = Math.max(0, Math.min(1, (brightness - 0.06) * 1.3));
      // Giữ sắc độ, tăng độ bão hòa rồi đẩy lên sáng tối đa để chữ ASCII có màu rực
      const gray = brightness * 255;
      const vr = gray + (r - gray) * 1.7, vg = gray + (g - gray) * 1.7, vb = gray + (b - gray) * 1.7;
      const peak = Math.max(vr, vg, vb, 1);
      colors[i * 3] = Math.max(0, vr / peak * 255);
      colors[i * 3 + 1] = Math.max(0, vg / peak * 255);
      colors[i * 3 + 2] = Math.max(0, vb / peak * 255);
    }
    hasFrame = true;
  }
  // Khi chưa có video, dùng trường sóng thay thế
  const fallbackValue = (col, row) => (Math.sin(col * 0.12 + clock) + Math.sin(row * 0.14 - clock * 0.7) + Math.sin((col + row) * 0.07 + clock * 0.4) + 3) / 6;

  /* ----- Sóng (sóng âm chính/phụ và gợn khi nhấp chuột) ----- */
  function launchWave(options) {
    waves.push({ x: width / 2, y: height / 2, start: performance.now(), band: 60, stroke: false, line: 6, radius: 0, fade: 1, progress: 0, ...options });
  }
  function launchSonic(isFollowUp) {
    if (prefersReducedMotion) return;
    const farthest = Math.hypot(width, height) / 2 * 1.1;
    launchWave(isFollowUp
      ? { duration: 2600, maxRadius: farthest * 0.8, strength: 0.55, line: 5, stroke: true }
      : { duration: 3400, maxRadius: farthest, strength: 1, line: 12, stroke: true });
  }
  function updateWaves(now) {
    for (let i = waves.length - 1; i >= 0; i--) {
      const wave = waves[i];
      wave.progress = Math.max(0, (now - wave.start) / wave.duration);
      if (wave.progress >= 1) { waves.splice(i, 1); continue; }
      wave.radius = (1 - Math.pow(1 - wave.progress, 3)) * wave.maxRadius;
      wave.fade = Math.pow(1 - wave.progress, 1.4) * wave.strength;
    }
  }
  function drawWaveRings() {
    fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fxCtx.clearRect(0, 0, width, height);
    for (const wave of waves) {
      if (!wave.stroke) continue;
      fxCtx.shadowColor = palette.accent; fxCtx.shadowBlur = 24; fxCtx.strokeStyle = palette.accent;
      [[1, wave.line, 1], [0.93, wave.line * 0.5, 0.5], [0.85, wave.line * 0.25, 0.25]].forEach(([scale, lineWidth, strength]) => {
        fxCtx.globalAlpha = wave.fade * strength;
        fxCtx.lineWidth = Math.max(1, lineWidth * (1 - wave.progress * 0.6));
        fxCtx.beginPath(); fxCtx.arc(wave.x, wave.y, wave.radius * scale, 0, Math.PI * 2); fxCtx.stroke();
      });
      fxCtx.shadowBlur = 0; fxCtx.globalAlpha = wave.fade * 0.8; fxCtx.strokeStyle = '#fff'; fxCtx.lineWidth = 1.5;
      fxCtx.beginPath(); fxCtx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2); fxCtx.stroke();
    }
    fxCtx.globalAlpha = 1;
  }

  /* ----- Màu nhiều lớp cho ký tự ASCII ----- */
  const COLOR_NAMES = ['video', 'cầu vồng', 'mặc định'];
  const scratch = [0, 0, 0];
  const colorCache = new Map();
  const clamp01 = value => Math.max(0, Math.min(1, value));
  const pull = (r, g, b, amount) => {
    scratch[0] += (r - scratch[0]) * amount; scratch[1] += (g - scratch[1]) * amount; scratch[2] += (b - scratch[2]) * amount;
  };
  function hslToScratch(hue, saturation, lightness) {
    const a = saturation * Math.min(lightness, 1 - lightness);
    const channel = n => { const k = (n + hue * 12) % 12; return (lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255; };
    scratch[0] = channel(0); scratch[1] = channel(8); scratch[2] = channel(4);
  }
  function scratchToCss() {
    const r = Math.round(scratch[0] / 32), g = Math.round(scratch[1] / 32), b = Math.round(scratch[2] / 32);
    const key = r * 81 + g * 9 + b;
    let css = colorCache.get(key);
    if (!css) { css = `rgb(${Math.min(255, r * 32)},${Math.min(255, g * 32)},${Math.min(255, b * 32)})`; colorCache.set(key, css); }
    return css;
  }
  // Lớp 1: bóng tối ngả tím lam. Lớp 2: màu thật của video. Lớp 3: vùng sáng ngả trắng.
  // Sau 2:40 mọi màu được kéo dần về cam/trắng. Sóng âm làm ký tự sáng lên.
  function cellColor(index, col, row, lum, boost, useVideo, highlight) {
    const accent = palette.accentRGB;
    if (colorMode === 1) {
      hslToScratch(((col * 4 + row * 2 + clock * 30) % 360) / 360, 0.85, 0.42 + lum * 0.25);
    } else if (colorMode === 0 && useVideo) {
      scratch[0] = colors[index * 3]; scratch[1] = colors[index * 3 + 1]; scratch[2] = colors[index * 3 + 2];
      pull(110, 70, 255, clamp01(1 - lum / 0.35) * 0.55);
      pull(highlight, highlight, highlight, clamp01((lum - 0.65) / 0.35) * 0.6);
    } else {
      scratch[0] = accent[0]; scratch[1] = accent[1]; scratch[2] = accent[2];
    }
    if (colorMode !== 2 && palette.mix > 0) {
      const hi = clamp01((lum - 0.55) / 0.45) * 0.7;
      pull(accent[0] + (highlight - accent[0]) * hi, accent[1] + (highlight - accent[1]) * hi, accent[2] + (highlight - accent[2]) * hi, palette.mix);
    }
    if (boost > 0) pull(highlight, highlight, highlight, Math.min(1, boost));
    return scratchToCss();
  }

  /* ----- Vẽ nền ASCII; gần con trỏ thì hiện rõ video gốc ----- */
  function drawBackground() {
    const useVideo = hasFrame && !videoFailed;
    mouse.x += (mouse.targetX - mouse.x) * 0.18;
    mouse.y += (mouse.targetY - mouse.y) * 0.18;
    const targetRadius = mouse.active && useVideo ? REVEAL_RADIUS : 0;
    mouse.radius += (targetRadius - mouse.radius) * (prefersReducedMotion ? 1 : 0.1);
    if (Math.abs(targetRadius - mouse.radius) < 0.3) mouse.radius = targetRadius;
    const R = mouse.radius;

    bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bgCtx.clearRect(0, 0, width, height);
    bgCtx.font = '500 12px "IBM Plex Mono", monospace';
    bgCtx.textBaseline = 'top';
    const highlight = palette.theme === 'light' ? 20 : 255;
    let lastColor = '';
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * CELL, y = row * CELL;
        let value = useVideo ? luma[row * cols + col] : fallbackValue(col, row);
        let alpha = 0.06 + value * 0.34, boost = 0;
        const lum = Math.max(0, Math.min(1, value));
        for (const wave of waves) {
          const gap = Math.abs(Math.hypot(x - wave.x, y - wave.y) - wave.radius);
          if (gap < wave.band) { const k = (1 - gap / wave.band) * wave.fade; value += k; alpha += k * 0.6; boost += k * 0.8; }
        }
        if (R > 1) {
          const distance = Math.hypot(x + CELL / 2 - mouse.x, y + CELL / 2 - mouse.y);
          alpha *= 1 - Math.max(0, Math.min(1, (R - distance) / (R * 0.45)));
        }
        const index = Math.max(0, Math.min(RAMP.length - 1, Math.floor(value * RAMP.length)));
        if (!index || alpha < 0.01) continue;
        const color = cellColor(row * cols + col, col, row, lum, boost, useVideo, highlight);
        if (color !== lastColor) { bgCtx.fillStyle = color; lastColor = color; }
        bgCtx.globalAlpha = Math.min(alpha, 0.85);
        bgCtx.fillText(RAMP[index], x, y);
      }
    }
    bgCtx.globalAlpha = 1;

    if (R > 1 && useVideo) {
      const scale = Math.max(width / video.videoWidth, height / video.videoHeight);
      const w = video.videoWidth * scale, h = video.videoHeight * scale;
      revealCtx.clearRect(0, 0, width, height);
      revealCtx.globalCompositeOperation = 'source-over';
      revealCtx.drawImage(video, (width - w) / 2, (height - h) / 2, w, h);
      revealCtx.globalCompositeOperation = 'destination-in';
      const mask = revealCtx.createRadialGradient(mouse.x, mouse.y, R * 0.55, mouse.x, mouse.y, R);
      mask.addColorStop(0, 'rgba(0,0,0,1)');
      mask.addColorStop(1, 'rgba(0,0,0,0)');
      revealCtx.fillStyle = mask;
      revealCtx.fillRect(0, 0, width, height);
      revealCtx.globalCompositeOperation = 'source-over';
      bgCtx.drawImage(revealCanvas, 0, 0, width, height);
    }
  }

  /* ----- Mốc thời gian 2:40: sóng chính, sóng phụ sau 2 giây, đổi màu ----- */
  function checkTimeline() {
    const current = video.currentTime;
    if (previousTime < EVENT_TIME && current >= EVENT_TIME) {
      launchSonic(false);
      followUpDue = current + FOLLOW_UP;
      palette.target = 1;
    } else if (current < EVENT_TIME) {
      palette.target = 0;
      followUpDue = null;
    }
    if (followUpDue !== null && current >= followUpDue) { launchSonic(true); followUpDue = null; }
    previousTime = current;
  }

  /* ----- Điều khiển phát ----- */
  const formatTime = seconds => { const s = Math.max(0, Math.floor(seconds || 0)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  function updateUi() {
    ui.play.textContent = video.paused ? '▶' : '❚❚';
    ui.play.setAttribute('aria-label', video.paused ? 'Phát video' : 'Tạm dừng video');
    ui.mute.textContent = video.muted || video.volume === 0 ? '🔇' : '🔊';
    if (!scrubbing) { ui.seek.max = video.duration || 0; ui.seek.value = video.currentTime; }
    ui.time.textContent = videoFailed && !hasFrame ? 'Không phát được video' : `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
  }
  function startPlayback() {
    const attempt = video.play();
    if (attempt) attempt.catch(() => { video.muted = true; needsGesture = true; video.play().catch(() => {}); });
  }
  function unlockOnGesture() {
    if (needsGesture && !userMuted) { video.muted = false; needsGesture = false; }
    if (video.paused && !userPaused && !prefersReducedMotion && video.src) video.play().catch(() => {});
  }
  function loadSource(url) {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = url;
    videoFailed = false; hasFrame = false; previousTime = 0; followUpDue = null;
    video.src = url;
    video.load();
    if (!prefersReducedMotion && !userPaused) startPlayback();
  }
  function blobUrlFromBase64(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return URL.createObjectURL(new Blob([bytes], { type: 'video/mp4' }));
  }

  ui.play.addEventListener('click', () => {
    userPaused = !video.paused;
    if (video.paused) video.play().catch(() => {}); else video.pause();
    updateUi();
  });
  ui.back.addEventListener('click', () => { video.currentTime = Math.max(0, video.currentTime - 10); });
  ui.fwd.addEventListener('click', () => { video.currentTime = Math.min((video.duration || 0) - 0.1, video.currentTime + 10); });
  ui.seek.addEventListener('input', () => { scrubbing = true; video.currentTime = Number(ui.seek.value); });
  ui.seek.addEventListener('change', () => { scrubbing = false; });
  ui.mute.addEventListener('click', () => { userMuted = !video.muted; needsGesture = false; video.muted = userMuted; updateUi(); });
  ui.volume.addEventListener('input', () => {
    const level = Number(ui.volume.value);
    video.volume = level / 100;
    ui.volumeOut.textContent = `${level}%`;
    updateUi();
  });
  ui.color.addEventListener('click', () => {
    colorMode = (colorMode + 1) % COLOR_NAMES.length;
    ui.color.textContent = `Màu: ${COLOR_NAMES[colorMode]}`;
  });
  ui.toggle.addEventListener('click', () => {
    const minimized = ui.dock.classList.toggle('min');
    ui.toggle.textContent = minimized ? '▴' : '▾';
    ui.toggle.setAttribute('aria-expanded', String(!minimized));
    ui.toggle.setAttribute('aria-label', minimized ? 'Mở rộng thanh điều khiển' : 'Thu gọn thanh điều khiển');
  });
  video.addEventListener('error', () => { videoFailed = true; updateUi(); });
  video.addEventListener('loadedmetadata', updateUi);

  function trackPointer(e) {
    mouse.targetX = e.clientX; mouse.targetY = e.clientY; mouse.active = true;
    if (mouse.x < -5000) { mouse.x = mouse.targetX; mouse.y = mouse.targetY; }
  }
  addEventListener('pointermove', trackPointer, { passive: true });
  addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') mouse.active = false; }, { passive: true });
  addEventListener('pointercancel', () => { mouse.active = false; });
  document.addEventListener('pointerleave', () => { mouse.active = false; });
  addEventListener('pointerdown', e => {
    trackPointer(e);
    unlockOnGesture();
    launchWave({ x: e.clientX, y: e.clientY, duration: 900, maxRadius: 260, strength: 0.7, band: 40 });
  }, { passive: true });
  addEventListener('keydown', unlockOnGesture);
  addEventListener('resize', resize);

  /* ----- Vòng lặp chính ----- */
  function loop(now) {
    const delta = Math.min(0.1, (now - lastTick) / 1000);
    lastTick = now; clock += delta * 2;
    checkTimeline();
    stepPalette(delta);
    if (!document.hidden) {
      frameCount++;
      if (frameCount % 2 === 0 || !hasFrame) sampleVideo();
      updateWaves(now);
      drawBackground();
      drawWaveRings();
      if (frameCount % 6 === 0) updateUi();
    }
    requestAnimationFrame(loop);
  }

  video.volume = 0.01;              // âm lượng mặc định: 1% (thang 0 đến 100%)
  video.muted = false;
  resize();
  if (window.DEMO_VIDEO_B64) loadSource(blobUrlFromBase64(window.DEMO_VIDEO_B64)); else videoFailed = true;
  requestAnimationFrame(loop);
})();

/* ---------- Chữ "mã hóa": giải mã mượt khi con trỏ lại gần ---------- */
(function cipherText() {
  if (prefersReducedMotion) return;           // người dùng giảm chuyển động: giữ chữ thường
  const GLYPHS = '01#$%&*+=?<>/\\|{}[]ABCDEF789';
  const RADIUS = 80;
  const chars = [];
  const pointer = { x: -9999, y: -9999, type: '' };
  const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

  $$('[data-cipher]').forEach(host => {
    const text = host.textContent;
    const readable = Object.assign(document.createElement('span'), { className: 'sr', textContent: text });
    const visible = document.createElement('span');
    visible.setAttribute('aria-hidden', 'true');
    [...text].forEach(letter => {
      if (letter === ' ') { visible.append(' '); return; }
      const span = document.createElement('span');
      span.textContent = randomGlyph();
      visible.append(span);
      chars.push({ span, host, letter, shown: span.textContent, reveal: 0, threshold: 0.2 + Math.random() * 0.6, nextRoll: 0, percent: -1, x: 0, y: 0, touchRevealUntil: 0 });
    });
    host.replaceChildren(readable, visible);
  });

  function measure() {
    for (const c of chars) {
      const rect = c.span.getBoundingClientRect();
      c.x = rect.left + rect.width / 2 + scrollX;
      c.y = rect.top + rect.height / 2 + scrollY;
    }
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  addEventListener('load', measure);
  new ResizeObserver(measure).observe(document.body);
  measure();

  const TOUCH_REVEAL_DURATION = 1800;
  const trackPointer = event => {
    if (event.pointerType === 'touch') {
      const revealUntil = performance.now() + TOUCH_REVEAL_DURATION;
      for (const c of chars) {
        if (Math.hypot(c.x - scrollX - event.clientX, c.y - scrollY - event.clientY) < RADIUS) {
          c.touchRevealUntil = revealUntil;
        }
      }
      return;
    }
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.type = event.pointerType;
  };
  addEventListener('pointermove', trackPointer, { passive: true });
  addEventListener('pointerdown', trackPointer, { passive: true });
  document.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') { pointer.x = pointer.y = -9999; pointer.type = ''; }
  });

  let last = performance.now();
  function frame(now) {
    const delta = Math.min(0.1, (now - last) / 1000);
    last = now;
    if (!document.hidden) {
      const smoothing = 1 - Math.exp(-delta / 0.14);
      const top = scrollY - 80, bottom = scrollY + innerHeight + 80;
      for (const c of chars) {
        if (c.y < top || c.y > bottom) continue;
        const near = Math.hypot(c.x - scrollX - pointer.x, c.y - scrollY - pointer.y) < RADIUS;
        c.reveal += ((near || c.touchRevealUntil > now ? 1 : 0) - c.reveal) * smoothing;
        const revealed = c.reveal > c.threshold;
        let glyph = c.shown;
        if (revealed) glyph = c.letter;
        else if (now > c.nextRoll) { glyph = randomGlyph(); c.nextRoll = now + 50 + c.reveal * 220 + Math.random() * 60; }
        if (glyph !== c.shown) { c.span.textContent = glyph; c.shown = glyph; }
        const percent = Math.round(c.reveal * 50) * 2;
        if (percent !== c.percent) {
          c.percent = percent;
          c.span.style.color = `color-mix(in srgb, var(--fg) ${percent}%, var(--acc))`;
          c.span.style.opacity = String(0.55 + c.reveal * 0.45);
        }
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
