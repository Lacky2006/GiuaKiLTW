/* =========================================================
   Portfolio – Lê Minh Hậu
   JavaScript thuần (Vanilla JS) – không dùng thư viện ngoài
   ========================================================= */
'use strict';

/* ---------- Tiện ích chung ---------- */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const storage = {
  get(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* bỏ qua khi bị chặn */ }
  }
};

/* ---------- Dữ liệu chi tiết dự án (dùng cho Modal) ---------- */
const PROJECTS = {
  shop: {
    title: 'HauShop – E-commerce',
    category: 'Fullstack',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=75',
    description: 'Website thương mại điện tử bán thiết bị công nghệ, xây dựng theo mô hình RESTful API (Node.js/Express) kết hợp giao diện JavaScript thuần, dữ liệu lưu trên MongoDB.',
    features: [
      'Đăng ký / đăng nhập, xác thực bằng JWT và mã hoá mật khẩu bcrypt.',
      'Tìm kiếm, lọc theo danh mục – giá, phân trang sản phẩm.',
      'Giỏ hàng, đặt hàng và theo dõi trạng thái đơn hàng.',
      'Trang quản trị: CRUD sản phẩm, quản lý đơn hàng và người dùng.'
    ],
    tags: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'JWT', 'REST API'],
    demo: 'https://leminhhau.github.io/haushop',
    repo: 'https://github.com/leminhhau/haushop'
  },
  task: {
    title: 'TaskFlow – Quản lý công việc',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=75',
    description: 'Ứng dụng quản lý công việc dạng bảng Kanban giúp lên kế hoạch học tập và làm việc nhóm, viết hoàn toàn bằng HTML, CSS và JavaScript thuần.',
    features: [
      'Thêm / sửa / xoá công việc, gán mức độ ưu tiên và hạn chót.',
      'Kéo-thả công việc giữa các cột bằng HTML5 Drag & Drop API.',
      'Lưu dữ liệu bằng localStorage, không mất khi tải lại trang.',
      'Tìm kiếm tức thì, thống kê tiến độ và hỗ trợ Dark Mode.'
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Drag & Drop', 'localStorage'],
    demo: 'https://leminhhau.github.io/taskflow',
    repo: 'https://github.com/leminhhau/taskflow'
  },
  weather: {
    title: 'SkyCast – Dự báo thời tiết',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1200&q=75',
    description: 'Ứng dụng React tra cứu thời tiết thời gian thực, lấy dữ liệu từ OpenWeather API và hiển thị trực quan theo giờ và theo ngày.',
    features: [
      'Tìm kiếm theo tên thành phố hoặc dùng Geolocation để lấy vị trí hiện tại.',
      'Dự báo 5 ngày, biểu đồ nhiệt độ theo giờ.',
      'Xử lý lỗi mạng / thành phố không tồn tại, hiển thị trạng thái loading.',
      'Giao diện responsive bằng CSS Grid, ảnh nền đổi theo thời tiết.'
    ],
    tags: ['React', 'REST API', 'Fetch / Async-Await', 'CSS Grid'],
    demo: 'https://leminhhau.github.io/skycast',
    repo: 'https://github.com/leminhhau/skycast'
  },
  library: {
    title: 'LibManager – Quản lý thư viện',
    category: 'Fullstack',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=75',
    description: 'Hệ thống quản lý thư viện cho trường học: quản lý đầu sách, độc giả và nghiệp vụ mượn – trả, xây dựng bằng Java Spring Boot và MySQL.',
    features: [
      'Quản lý sách, tác giả, thể loại và độc giả (CRUD đầy đủ).',
      'Nghiệp vụ mượn / trả, tự động tính phí trả trễ.',
      'Phân quyền Admin – Thủ thư – Độc giả với Spring Security.',
      'Thống kê sách mượn nhiều, xuất báo cáo theo tháng.'
    ],
    tags: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf', 'Spring Security'],
    demo: 'https://leminhhau.github.io/libmanager',
    repo: 'https://github.com/leminhhau/libmanager'
  }
};

/* =========================================================
   1. HEADER: hiệu ứng khi cuộn + Scroll Progress + Back to top
   ========================================================= */
function initScrollEffects() {
  const header = $('#header');
  const progress = $('#scrollProgress');
  const backToTop = $('#backToTop');
  let ticking = false;

  const update = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

    progress.style.width = `${percent}%`;
    header.classList.toggle('is-scrolled', scrollTop > 20);
    backToTop.classList.toggle('is-visible', scrollTop > 500);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  update();
}

/* =========================================================
   2. MOBILE MENU (Hamburger) + Smooth Scroll + Active link
   ========================================================= */
function initNavigation() {
  const hamburger = $('#hamburger');
  const menu = $('#navMenu');
  const links = $$('.navbar__link');

  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    hamburger.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  };

  hamburger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));

  // Đóng menu khi click ra ngoài hoặc nhấn Esc
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('is-open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
      setMenu(false);
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  // Smooth scroll cho mọi liên kết nội bộ (#...)
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      const target = id.length > 1 ? $(id) : null;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
      setMenu(false);
    });
  });

  // Đánh dấu menu tương ứng với section đang xem
  const sections = links.map((link) => $(link.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((section) => observer.observe(section));
}

/* =========================================================
   3. DARK / LIGHT MODE (lưu localStorage)
   ========================================================= */
function initThemeToggle() {
  const root = document.documentElement;
  const toggle = $('#themeToggle');

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    $('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#0b1120' : '#4f46e5');
  };

  applyTheme(root.getAttribute('data-theme') || 'light');

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storage.set('theme', next);
    showToast('success', 'Đã đổi giao diện', next === 'dark' ? 'Chế độ Tối đã bật 🌙' : 'Chế độ Sáng đã bật ☀️');
  });
}

/* =========================================================
   4. TYPING EFFECT ở Banner
   ========================================================= */
function initTypingEffect() {
  const el = $('#typing');
  const words = [
    'Full-stack Web Developer',
    'Lập trình viên Web',
    'Frontend Enthusiast',
    'Node.js Backend Developer'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const current = words[wordIndex];
    charIndex += isDeleting ? -1 : 1;
    el.textContent = current.slice(0, charIndex);

    let delay = isDeleting ? 45 : 95;

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;            // dừng lại khi gõ xong
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  };

  type();
}

/* =========================================================
   5. SCROLL REVEAL + Skill bars + Counter
   ========================================================= */
function initScrollReveal() {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Tạo độ trễ so le cho các phần tử nằm cạnh nhau
  $$('.reveal').forEach((el) => {
    const siblings = $$(':scope > .reveal', el.parentElement);
    const index = siblings.indexOf(el);
    el.style.transitionDelay = `${Math.min(index, 4) * 0.1}s`;
    revealObserver.observe(el);
  });
}

function initSkillBars() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      $$('.skill__fill', entry.target).forEach((bar) => {
        bar.style.width = `${bar.dataset.level}%`;
      });
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  $$('.skill-group').forEach((group) => observer.observe(group));
}

function initCounters() {
  const animate = (el) => {
    const target = Number(el.dataset.target);
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animate(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  $$('.stats__num').forEach((el) => observer.observe(el));
}

/* =========================================================
   6. PROJECT FILTER (All / Frontend / Fullstack)
   ========================================================= */
function initProjectFilter() {
  const buttons = $$('.filter__btn');
  const cards = $$('.project-card');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });

      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.remove('is-filtering');
        card.classList.toggle('is-hidden', !match);
        if (match) {
          void card.offsetWidth;   // reset animation
          card.classList.add('is-filtering', 'is-visible');
        }
      });
    });
  });
}

/* =========================================================
   7. MODAL chi tiết dự án
   ========================================================= */
function initProjectModal() {
  const modal = $('#projectModal');
  const fields = {
    img: $('#modalImg'),
    badge: $('#modalBadge'),
    title: $('#modalTitle'),
    desc: $('#modalDesc'),
    features: $('#modalFeatures'),
    tags: $('#modalTags'),
    demo: $('#modalDemo'),
    repo: $('#modalRepo')
  };
  let lastFocused = null;

  const createItems = (items, className = '') =>
    items.map((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      if (className) li.className = className;
      return li;
    });

  const open = (key) => {
    const data = PROJECTS[key];
    if (!data) return;

    fields.img.src = data.image;
    fields.img.alt = `Ảnh demo ${data.title}`;
    fields.badge.textContent = data.category;
    fields.title.textContent = data.title;
    fields.desc.textContent = data.description;
    fields.features.replaceChildren(...createItems(data.features));
    fields.tags.replaceChildren(...createItems(data.tags, 'tag'));
    fields.demo.href = data.demo;
    fields.repo.href = data.repo;

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('is-locked');
    $('.modal__close', modal).focus();
  };

  const close = () => {
    if (modal.hidden || modal.classList.contains('is-closing')) return;
    modal.classList.add('is-closing');
    setTimeout(() => {
      modal.hidden = true;
      modal.classList.remove('is-closing');
      document.body.classList.remove('is-locked');
      if (lastFocused) lastFocused.focus();
    }, 250);
  };

  $$('.project-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;   // để link Demo/GitHub hoạt động bình thường
      open(card.dataset.project);
    });
    card.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target === card) {
        e.preventDefault();
        open(card.dataset.project);
      }
    });
  });

  $$('[data-close]', modal).forEach((el) => el.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* =========================================================
   8. TOAST thông báo
   ========================================================= */
function showToast(type, title, message, duration = 4000) {
  const container = $('#toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
  toast.innerHTML = `
    <span class="toast__icon" aria-hidden="true">${type === 'error' ? '!' : '✓'}</span>
    <div>
      <p class="toast__title"></p>
      <p class="toast__msg"></p>
    </div>
    <button class="toast__close" type="button" aria-label="Đóng thông báo">&times;</button>
    <span class="toast__progress" style="animation-duration:${duration}ms"></span>
  `;
  // Gán nội dung bằng textContent để tránh chèn HTML
  $('.toast__title', toast).textContent = title;
  $('.toast__msg', toast).textContent = message;

  const remove = () => {
    if (toast.classList.contains('is-leaving')) return;
    toast.classList.add('is-leaving');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  $('.toast__close', toast).addEventListener('click', remove);
  container.appendChild(toast);
  setTimeout(remove, duration);
}

/* =========================================================
   9. CONTACT FORM – Validate dữ liệu
   ========================================================= */
function initContactForm() {
  const form = $('#contactForm');
  const submitBtn = $('#submitBtn');

  const rules = {
    name: (v) => {
      if (!v) return 'Vui lòng nhập họ và tên.';
      if (v.length < 2) return 'Họ tên phải có ít nhất 2 ký tự.';
      if (!/^[\p{L}\s'.-]+$/u.test(v)) return 'Họ tên chỉ được chứa chữ cái.';
      return '';
    },
    email: (v) => {
      if (!v) return 'Vui lòng nhập email.';
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)) return 'Email không đúng định dạng (vd: ten@gmail.com).';
      return '';
    },
    phone: (v) => {
      const digits = v.replace(/[\s.-]/g, '');
      if (!v) return 'Vui lòng nhập số điện thoại.';
      if (!/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(digits)) return 'Số điện thoại Việt Nam không hợp lệ (10 số, vd: 0397 837 467).';
      return '';
    },
    message: (v) => {
      if (!v) return 'Vui lòng nhập lời nhắn.';
      if (v.length < 10) return 'Lời nhắn cần tối thiểu 10 ký tự.';
      return '';
    }
  };

  const validateField = (field) => {
    const group = field.closest('.form-group');
    const error = rules[field.name](field.value.trim());
    group.classList.toggle('is-invalid', Boolean(error));
    group.classList.toggle('is-valid', !error);
    $('.form-group__error', group).textContent = error;
    field.setAttribute('aria-invalid', String(Boolean(error)));
    return !error;
  };

  const fields = Object.keys(rules).map((name) => form.elements[name]);

  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('is-invalid')) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = fields.filter((field) => !validateField(field));

    if (invalid.length) {
      invalid[0].focus();
      showToast('error', 'Gửi thất bại!', `Vui lòng kiểm tra lại ${invalid.length} trường thông tin chưa hợp lệ.`);
      return;
    }

    // Mô phỏng gửi dữ liệu lên server
    submitBtn.classList.add('is-loading');
    $('.btn__text', submitBtn).textContent = 'Đang gửi...';

    setTimeout(() => {
      const name = form.elements.name.value.trim();
      submitBtn.classList.remove('is-loading');
      $('.btn__text', submitBtn).textContent = 'Gửi lời nhắn';
      form.reset();
      fields.forEach((field) => field.closest('.form-group').classList.remove('is-valid'));
      showToast('success', 'Gửi thành công! 🎉', `Cảm ơn ${name}, Minh Hậu sẽ phản hồi bạn sớm nhất qua email.`);
    }, 1200);
  });
}

/* =========================================================
   KHỞI TẠO
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initScrollEffects();
  initNavigation();
  initThemeToggle();
  initTypingEffect();
  initScrollReveal();
  initSkillBars();
  initCounters();
  initProjectFilter();
  initProjectModal();
  initContactForm();
  $('#year').textContent = new Date().getFullYear();
});
