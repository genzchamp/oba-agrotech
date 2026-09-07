/* OBA AgroTech — edit this configuration when needed */
const OBA_CONFIG = {
  whatsappNumber: "2348163431308",
  whatsappMessage: "Hello OBA AgroTech, I would like to learn more about your poultry health and farm solutions."
};

/* Brand + legal readiness */
(function setupSiteBasics() {
  if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    favicon.href = "favicon.svg";
    document.head.appendChild(favicon);
  }

  const footerBottom = document.querySelector(".footer-bottom");
  if (footerBottom && !footerBottom.querySelector(".legal-links")) {
    const legal = document.createElement("div");
    legal.className = "legal-links";
    legal.innerHTML = `<a href="privacy.html">Privacy</a><a href="terms.html">Terms</a>`;
    footerBottom.appendChild(legal);
  }

  const style = document.createElement("style");
  style.textContent = `.legal-links{display:flex;gap:14px;margin-top:8px}.legal-links a{opacity:.72}.legal-links a:hover{opacity:1;color:var(--lime)}@media(max-width:700px){.legal-links{justify-content:flex-start;gap:16px}}`;
  document.head.appendChild(style);
})();

/* WhatsApp — every data-wa link uses the configured Nigerian number. */
(function setupWhatsApp() {
  const number = String(OBA_CONFIG.whatsappNumber).replace(/\D/g, "");
  const url = `https://wa.me/${number}?text=${encodeURIComponent(OBA_CONFIG.whatsappMessage)}`;

  document.querySelectorAll("[data-wa]").forEach(link => {
    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
})();

/* Mobile navigation */
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("open");
    mobileMenu.classList.toggle("open", isOpen);
    menuBtn.classList.toggle("is-open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".mobile-menu a").forEach(a => a.addEventListener("click", () => {
  mobileMenu?.classList.remove("open");
  menuBtn?.classList.remove("is-open");
  menuBtn?.setAttribute("aria-expanded", "false");
}));

/* Same-page navigation. Do not interfere with external/page links. */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", targetId);
  });
});

/* The homepage currently has no #contact section. Make Contact useful by
   routing it to WhatsApp instead of leaving the visitor at a dead anchor. */
(function fixContactNavigation() {
  const number = String(OBA_CONFIG.whatsappNumber).replace(/\D/g, "");
  const url = `https://wa.me/${number}?text=${encodeURIComponent("Hello OBA AgroTech, I would like to contact you about your poultry farm solutions.")}`;
  document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
})();

/* Header shadow */
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* Scroll reveal */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(".solution-card, .mini-grid article, .tool-link-card, .framework-visual");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach(el => el.classList.add("reveal", "is-visible"));
} else {
  revealTargets.forEach(el => el.classList.add("reveal"));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -60px 0px" });
  revealTargets.forEach(el => observer.observe(el));
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 400) el.classList.add("is-visible");
      });
    }, 2500);
  });
}

/* Mobile solution-card carousel */
function setupSwipeCarousel(trackSelector, cardSelector) {
  const track = document.querySelector(trackSelector);
  if (!track) return;
  const cards = track.querySelectorAll(cardSelector);
  if (cards.length < 2) return;
  const mq = window.matchMedia("(max-width: 900px)");
  let dotsEl = null, hintEl = null, onScroll = null;

  function build() {
    if (!mq.matches || dotsEl) return;
    hintEl = document.createElement("div");
    hintEl.className = "carousel-hint";
    hintEl.innerHTML = `Swipe to explore <span class="sweep">→</span>`;
    track.insertAdjacentElement("beforebegin", hintEl);
    dotsEl = document.createElement("div");
    dotsEl.className = "carousel-dots";
    cards.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dotsEl.appendChild(dot);
    });
    track.insertAdjacentElement("afterend", dotsEl);
    let dismissed = false;
    onScroll = () => {
      if (!dismissed) { dismissed = true; hintEl.classList.add("is-hidden"); }
      const cardWidth = cards[0].getBoundingClientRect().width + 16;
      const idx = Math.round(track.scrollLeft / cardWidth);
      dotsEl.querySelectorAll(".carousel-dot").forEach((d, i) => d.classList.toggle("is-active", i === Math.min(idx, cards.length - 1)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(() => hintEl?.classList.add("is-hidden"), 4500);
  }

  function teardown() {
    if (onScroll) track.removeEventListener("scroll", onScroll);
    hintEl?.remove(); hintEl = null;
    dotsEl?.remove(); dotsEl = null;
  }
  build();
  mq.addEventListener("change", () => (mq.matches ? build() : teardown()));
}
setupSwipeCarousel(".solution-grid", ".solution-card");

/* Farm OS clarity layer */
(function setupFarmOSClarity() {
  const isFarmOS = document.querySelector(".app") && document.querySelector(".nav-item");
  if (!isFarmOS) return;
  const style = document.createElement("style");
  style.textContent = `.farm-focus-card{border:1px solid var(--line);background:linear-gradient(135deg,rgba(216,255,101,.07),rgba(17,42,30,.72));border-radius:18px;padding:17px 18px;margin:-6px 0 18px;display:flex;align-items:center;gap:16px;box-shadow:0 10px 30px rgba(0,0,0,.16)}.farm-focus-mark{width:38px;height:38px;border-radius:12px;background:rgba(216,255,101,.12);color:var(--lime);display:grid;place-items:center;font-weight:900;flex:0 0 auto}.farm-focus-copy{min-width:0;flex:1}.farm-focus-copy strong{display:block;font:800 .9rem Manrope;margin-bottom:3px}.farm-focus-copy span{display:block;color:var(--muted);font-size:.72rem;line-height:1.5}.farm-focus-actions{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.farm-focus-action{border:1px solid var(--line);background:rgba(7,18,13,.35);color:var(--text);border-radius:10px;padding:9px 11px;font-size:.7rem;font-weight:800;white-space:nowrap}.farm-focus-action:hover{border-color:#3a4a3e;color:var(--lime)}@media(max-width:700px){.farm-focus-card{align-items:flex-start;padding:15px;margin:-2px 0 16px;gap:11px}.farm-focus-mark{width:34px;height:34px;border-radius:10px}.farm-focus-actions{width:100%;justify-content:flex-start;margin-top:4px}.farm-focus-action{flex:1;min-width:0}}`;
  document.head.appendChild(style);
  const topbar = document.querySelector(".topbar");
  if (!topbar || document.querySelector(".farm-focus-card")) return;
  const card = document.createElement("div");
  card.className = "farm-focus-card";
  card.innerHTML = `<div class="farm-focus-mark" aria-hidden="true">✓</div><div class="farm-focus-copy"><strong>Farm focus</strong><span>Keep today simple: review health, record important events, then check the numbers that drive your farm.</span></div><div class="farm-focus-actions" aria-label="Farm OS quick navigation"><button type="button" class="farm-focus-action" data-farm-focus="health">Health</button><button type="button" class="farm-focus-action" data-farm-focus="finance">Finance</button><button type="button" class="farm-focus-action" data-farm-focus="production">Production</button></div>`;
  topbar.insertAdjacentElement("afterend", card);
  card.querySelectorAll("[data-farm-focus]").forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset.farmFocus;
      const nav = [...document.querySelectorAll(".nav-item")].find(item => (item.textContent || "").trim().toLowerCase().includes(target));
      nav?.click();
      nav?.scrollIntoView({ block: "nearest" });
    });
  });
})();
