"use strict";

/* ===== Hằng số & tiện ích ===== */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/* ===== 1. Dark / Light mode (lưu localStorage) ===== */
function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
  $("#themeToggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", root.dataset.theme);
  });
}

/* ===== 2. Menu mobile ===== */
function initMobileMenu() {
  const toggle = $("#menuToggle");
  const menu = $("#navMenu");
  const setOpen = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "✕" : "☰";
  };
  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  menu.addEventListener("click", (e) => e.target.closest("a") && setOpen(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
}

/* ===== 3. Reveal khi cuộn, thanh kỹ năng, menu active ===== */
function initScrollEffects() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      $$(".bar i", entry.target).forEach((bar) => (bar.style.width = `${bar.dataset.level}%`));
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  const links = $$(".nav__menu a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((section) => spy.observe(section));
}

/* ===== 4. Lọc dự án ===== */
function initProjectFilter() {
  const chips = $$(".chip");
  const projects = $$(".project");
  chips.forEach((chip) => chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.toggle("is-active", c === chip));
    projects.forEach((card) => {
      const show = chip.dataset.filter === "all" || card.dataset.category === chip.dataset.filter;
      card.classList.toggle("is-hidden", !show);
      card.classList.remove("is-showing");
      if (show) {
        card.classList.add("is-visible");
        void card.offsetWidth; 
        card.classList.add("is-showing");
      }
    });
  }));
}

/* ===== 5. Form liên hệ + validation ===== */
function initContactForm() {
  const form = $("#contactForm");
  const status = $("#formStatus");
  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Vui lòng nhập họ tên (ít nhất 2 ký tự)."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Email chưa đúng định dạng."),
    message: (v) => (v.trim().length >= 10 ? "" : "Lời nhắn cần ít nhất 10 ký tự."),
  };

  const validateField = (input) => {
    const message = rules[input.name](input.value);
    $(`#${input.name}Error`).textContent = message;
    input.closest(".field").classList.toggle("is-invalid", Boolean(message));
    input.setAttribute("aria-invalid", Boolean(message));
    return !message;
  };

  const fields = $$("input, textarea", form);
  fields.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => input.closest(".field").classList.contains("is-invalid") && validateField(input));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const allValid = fields.map(validateField).every(Boolean);
    status.textContent = allValid ? "Cảm ơn bạn! Lời nhắn đã được ghi nhận." : "Vui lòng kiểm tra lại các trường báo lỗi.";
    if (allValid) form.reset();
  });
}

/* ===== Khởi chạy ===== */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
  initScrollEffects();
  initProjectFilter();
  initContactForm();
});