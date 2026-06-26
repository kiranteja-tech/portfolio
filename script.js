/* ============================================================
   Portfolio script — vanilla JS, no dependencies (except Lucide CDN).
   Handles: theme toggle, mobile menu, nav scroll state, reveal-on-scroll,
   and dynamic rendering of Skills / Projects / Journey / Certifications.
   ============================================================ */
(function () {
  "use strict";
  /* ---------- Data ---------- */
  const SKILLS = [
    { icon: "code-2", title: "Programming Languages", items: ["Python", "C"] },
    { icon: "globe", title: "Web Technologies", items: ["HTML", "CSS", "JavaScript", "React"] },
    { icon: "database", title: "Databases", items: ["MySQL", "MongoDB"] },
    { icon: "wrench", title: "Tools & Technologies", items: ["Git", "GitHub", "Docker", "Docker Compose", "REST APIs", "Microservices", "Insomnia"] },
    { icon: "book-open", title: "Core Subjects", items: ["Data Structures & Algorithms","DBMS","Operating Systems","Computer Networks","OOPs","Collections","Multithreading"] },
  ];
  const PROJECTS = [
    {
      title: "Credit Card Fraud Detection",
      description:
        "A machine learning model that detects fraudulent credit card transactions using Scikit-Learn. Handles class imbalance and evaluates with precision/recall.",
      tags: ["Python", "Scikit-Learn", "Pandas", "ML"],
      repo: "https://github.com/kiranteja-tech/credit_card_fraud_detection",
    },
    {
      title: "Fake News Detector",
      description:
        "An NLP-powered Streamlit app that classifies news articles as real or fake using TF-IDF features and a trained classification model.",
      tags: ["Python", "NLP", "Streamlit", "Scikit-Learn"],
      repo: "https://github.com/kiranteja-tech/python-internship-projects/tree/main/Fake%20News%20Detector",
    },
    {
      title: "Expense Tracker",
      description:
        "A Python expense tracking tool with category-wise summaries and Matplotlib visualizations to monitor spending patterns over time.",
      tags: ["Python", "Matplotlib", "CSV"],
      repo: "https://github.com/kiranteja-tech/python-internship-projects/tree/main/Expense_Tracker",
    },
    {
      title: "Excel Report Generator",
      description:
        "Automates Excel report creation from raw data using Pandas and OpenPyXL — styled headers, formulas, and multi-sheet workbooks.",
      tags: ["Python", "Pandas", "OpenPyXL"],
      repo: "https://github.com/kiranteja-tech/python-internship-projects/tree/main/excel%20report%20generator",
    },
  ];
  const TIMELINE = [
    {
      year: "Dec 2025 — Apr 2026",
      title: "Trainee Python Developer",
      org: "Elevate Labs Pvt Ltd",
      body: "Working on Python development, backend fundamentals, data handling, and software development practices through hands-on internship projects.",
      type: "work",
    },
    {
      year: "Ongoing",
      title: "B.Tech in Computer Science (Data Science)",
      org: "ANITS · CGPA 8.64",
      body: "Specializing in Data Science with coursework in DSA, DBMS, Operating Systems, Computer Networks, OOPs, Collections and Multithreading.",
      type: "edu",
    },
  ];
  // Drop matching PDF files into assets/certificates/ — links work as soon as they exist.
  const CERTS = [
    { title: "TATA GenAI Powered Analytics", issuer: "TATA", file: "assets/certificates/kiranteja_tata_genai.pdf" },
    { title: "NPTEL Business Intelligence & Analytics", issuer: "NPTEL", file: "assets/certificates/kiranteja_nptel_certificate.pdf" },
    { title: "Python Certification", issuer: "Elevate Labs", file: "assets/certificates/elevate-python.pdf" },
    { title: "Deloitte Data Analytics", issuer: "Deloitte", file: "assets/certificates/kiranteja_deloitte_internship_certificate.pdf" },
    { title: "Cisco Networking Essentials", issuer: "Cisco", file: "assets/certificates/cisco-networking.pdf" },
  ];
  const ACHIEVEMENTS = [
    "Participated in HackAPTS",
    "Selected for College Level SIH Hackathon",
    "Participated in TechNova Hackathon",
  ];
  /* ---------- Helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else if (v !== undefined && v !== null) node.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach((c) => {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  };
  const icon = (name) => el("i", { "data-lucide": name });
  /* ---------- Renderers ---------- */
  function renderSkills() {
    const root = $("#skills-grid");
    if (!root) return;
    SKILLS.forEach((g, i) => {
      const card = el("div", { class: "card reveal" }, [
        el("div", { class: "skill-head" }, [
          el("div", { class: "card-icon" }, icon(g.icon)),
          el("span", { class: "skill-num" }, "0" + (i + 1)),
        ]),
        el("h3", {}, g.title),
        el(
          "div",
          { class: "tag-row" },
          g.items.map((t) => el("span", { class: "tag" }, t))
        ),
      ]);
      root.appendChild(card);
    });
  }
  function renderProjects() {
    const root = $("#projects-grid");
    if (!root) return;
    PROJECTS.forEach((p) => {
      const card = el("article", { class: "card project-card reveal" }, [
        el("div", { class: "card-icon" }, icon("folder-git-2")),
        el("h3", {}, p.title),
        el("p", {}, p.description),
        el(
          "div",
          { class: "tag-row" },
          p.tags.map((t) => el("span", { class: "tag" }, t))
        ),
        el("div", { class: "project-links" }, [
          el(
            "a",
            { href: p.repo, target: "_blank", rel: "noopener noreferrer" },
            [icon("github"), document.createTextNode(" View Code")]
          ),
        ]),
      ]);
      root.appendChild(card);
    });
  }
  function renderTimeline() {
    const root = $("#timeline");
    if (!root) return;
    TIMELINE.forEach((it) => {
      const li = el("li", { class: "reveal" }, [
        el("span", { class: "dot" }, icon(it.type === "work" ? "briefcase" : "graduation-cap")),
        el("span", { class: "year" }, it.year),
        el("h4", {}, it.title),
        el("p", { class: "org" }, it.org),
        el("p", { class: "body" }, it.body),
      ]);
      root.appendChild(li);
    });
  }
  function renderCerts() {
    const root = $("#certs-grid");
    if (!root) return;
    CERTS.forEach((c) => {
      const card = el("div", { class: "card cert-card reveal" }, [
        el("div", { class: "card-icon" }, icon("award")),
        el("h3", {}, c.title),
        el("p", { class: "issuer" }, c.issuer),
        el(
          "a",
          { class: "cert-link", href: c.file, target: "_blank", rel: "noopener noreferrer" },
          [icon("external-link"), document.createTextNode(" View Certificate")]
        ),
      ]);
      root.appendChild(card);
    });
    const list = $("#achievements-list");
    if (list) ACHIEVEMENTS.forEach((a) => list.appendChild(el("li", {}, a)));
  }
  /* ---------- Theme ---------- */
  function setupTheme() {
    const root = document.documentElement;
    const btn = $("#theme-toggle");
    const stored = localStorage.getItem("theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = stored || (prefersLight ? "light" : "dark");
    root.classList.toggle("dark", initial === "dark");
    updateThemeIcon();
    btn?.addEventListener("click", () => {
      const isDark = root.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      // Re-classify so dark-only styles refresh, then update the icon.
      root.classList.toggle("dark", isDark);
      updateThemeIcon();
    });
    function updateThemeIcon() {
      if (!btn) return;
      const isDark = root.classList.contains("dark");
      btn.innerHTML = "";
      btn.appendChild(icon(isDark ? "sun" : "moon"));
      if (window.lucide) window.lucide.createIcons({ nameAttr: "data-lucide" });
    }
  }
  /* ---------- Nav: scroll state + mobile menu ---------- */
  function setupNav() {
    const nav = $("#nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const toggle = $("#menu-toggle");
    const menu = $("#mobile-menu");
    toggle?.addEventListener("click", () => menu?.classList.toggle("open"));
    menu?.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => menu.classList.remove("open"))
    );
  }
  /* ---------- Reveal on scroll ---------- */
  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, idx) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), idx * 40);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    items.forEach((i) => io.observe(i));
  }
  /* ---------- External links: open in new tab safely ---------- */
  function hardenExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach((a) => {
      const rel = (a.getAttribute("rel") || "").split(/\s+/);
      if (!rel.includes("noopener")) rel.push("noopener");
      if (!rel.includes("noreferrer")) rel.push("noreferrer");
      a.setAttribute("rel", rel.filter(Boolean).join(" "));
    });
  }
  /* ---------- Boot ---------- */
  function init() {
    $("#year").textContent = String(new Date().getFullYear());
    renderSkills();
    renderProjects();
    renderTimeline();
    renderCerts();
    setupTheme();
    setupNav();
    setupReveal();
    hardenExternalLinks();
    if (window.lucide) window.lucide.createIcons({ nameAttr: "data-lucide" });
    // Lucide loads with `defer`, so re-run once it's ready in case it wasn't on first call.
    window.addEventListener("load", () => {
      if (window.lucide) window.lucide.createIcons({ nameAttr: "data-lucide" });
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();