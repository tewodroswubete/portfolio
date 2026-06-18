/* ===================================================================
   Tewodros Wubete — Portfolio interactions
   - Sticky nav shadow on scroll
   - Mobile menu toggle
   - Light/dark theme toggle (persisted in localStorage)
   - Scroll reveal animations via IntersectionObserver
   - Auto current year in footer
   =================================================================== */

(function () {
  "use strict";

  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const links = document.querySelector(".nav__links");
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  /* ---- Theme ---- */
  const stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);

  themeToggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---- Nav shadow on scroll ---- */
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  function closeMenu() {
    links.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
  burger.addEventListener("click", function () {
    const open = links.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll(
    ".reveal, .section__title, .skill-card, .project, .timeline__item, .about__text, .about__photo, .contact__title, .contact__text"
  );
  revealEls.forEach(function (el) {
    if (!el.classList.contains("reveal")) el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
