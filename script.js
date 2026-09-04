/* OBA AgroTech — edit only this number when you're ready */
const OBA_CONFIG = {
  whatsappNumber: "2348163431308",
  whatsappMessage: "Hello OBA AgroTech, I would like to learn more about your poultry health and farm solutions."
};

document.querySelectorAll("[data-wa]").forEach(link => {
  const number = OBA_CONFIG.whatsappNumber.replace(/\D/g, "");
  const url = number.includes("X") || number.length < 10
    ? "https://wa.me/"
    : `https://wa.me/${number}?text=${encodeURIComponent(OBA_CONFIG.whatsappMessage)}`;
  link.href = url;
  if (url === "https://wa.me/") link.addEventListener("click", e => {
    e.preventDefault();
    alert("Add your WhatsApp number in script.js → OBA_CONFIG.whatsappNumber");
  });
});

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  menuBtn.classList.toggle("is-open");
});
document.querySelectorAll(".mobile-menu a").forEach(a => a.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  menuBtn?.classList.remove("is-open");
}));

/* subtle header shadow once the page has scrolled */
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* Scroll reveal — fires slightly BEFORE an element reaches the viewport
   (rootMargin) so nothing sits invisible while a user is mid-scroll,
   and never hides content at all for reduced-motion users. */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
  ".solution-card, .mini-grid article, .tool-link-card, .framework-visual"
);

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach(el => el.classList.add("reveal", "is-visible"));
} else {
  revealTargets.forEach(el => el.classList.add("reveal"));
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
  );
  revealTargets.forEach(el => observer.observe(el));

  /* safety net: if anything is still hidden 2.5s after load
     (e.g. an edge case the observer missed), show it anyway */
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 400) el.classList.add("is-visible");
      });
    }, 2500);
  });
}

/* Horizontal swipe carousel for card grids that switch from a desktop
   side-by-side layout to a mobile horizontal scroller (see .solution-grid
   in style.css). Adds a "swipe" hint and position dots without touching
   the HTML — built and torn down automatically as the viewport crosses
   the 900px breakpoint. */
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
      const cardWidth = cards[0].getBoundingClientRect().width + 16; // + gap
      const idx = Math.round(track.scrollLeft / cardWidth);
      dotsEl.querySelectorAll(".carousel-dot").forEach((d, i) =>
        d.classList.toggle("is-active", i === Math.min(idx, cards.length - 1))
      );
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

/* ================================================================
   FARM OS — UX clarity layer
   Presentation-only: it does not change storage, calculations, records,
   or existing Farm OS business logic. It makes the existing workspace
   easier to understand and navigate, especially on mobile.
   ================================================================ */
(function setupFarmOSClarity() {
  const isFarmOS = document.querySelector(".app") && document.querySelector(".nav-item");
  if (!isFarmOS) return;

  const style = document.createElement("style");
  style.textContent = `
    .farm-focus-card{
      border:1px solid var(--line);background:linear-gradient(135deg,rgba(216,255,101,.07),rgba(17,42,30,.72));
      border-radius:18px;padding:17px 18px;margin:-6px 0 18px;display:flex;align-items:center;gap:16px;
      box-shadow:0 10px 30px rgba(0,0,0,.16)
    }
    .farm-focus-mark{width:38px;height:38px;border-radius:12px;background:rgba(216,255,101,.12);color:var(--lime);display:grid;place-items:center;font-weight:900;flex:0 0 auto}
    .farm-focus-copy{min-width:0;flex:1}.farm-focus-copy strong{display:block;font:800 .9rem Manrope;margin-bottom:3px}
    .farm-focus-copy span{display:block;color:var(--muted);font-size:.72rem;line-height:1.5}
    .farm-focus-actions{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}
    .farm-focus-action{border:1px solid var(--line);background:rgba(7,18,13,.35);color:var(--text);border-radius:10px;padding:9px 11px;font-size:.7rem;font-weight:800;white-space:nowrap}
    .farm-focus-action:hover{border-color:#3a4a3e;color:var(--lime)}
    @media(max-width:700px){
      .farm-focus-card{align-items:flex-start;padding:15px;margin:-2px 0 16px;gap:11px}
      .farm-focus-mark{width:34px;height:34px;border-radius:10px}
      .farm-focus-actions{width:100%;justify-content:flex-start;margin-top:4px}
      .farm-focus-action{flex:1;min-width:0}
    }
  `;
  document.head.appendChild(style);

  const topbar = document.querySelector(".topbar");
  if (!topbar || document.querySelector(".farm-focus-card")) return;

  const card = document.createElement("div");
  card.className = "farm-focus-card";
  card.innerHTML = `
    <div class="farm-focus-mark" aria-hidden="true">✓</div>
    <div class="farm-focus-copy">
      <strong>Farm focus</strong>
      <span>Keep today simple: review health, record important events, then check the numbers that drive your farm.</span>
    </div>
    <div class="farm-focus-actions" aria-label="Farm OS quick navigation">
      <button type="button" class="farm-focus-action" data-farm-focus="health">Health</button>
      <button type="button" class="farm-focus-action" data-farm-focus="finance">Finance</button>
      <button type="button" class="farm-focus-action" data-farm-focus="production">Production</button>
    </div>
  `;
  topbar.insertAdjacentElement("afterend", card);

  card.querySelectorAll("[data-farm-focus]").forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset.farmFocus;
      const nav = [...document.querySelectorAll(".nav-item")].find(item => {
        const label = (item.textContent || "").trim().toLowerCase();
        return label.includes(target);
      });
      nav?.click();
      nav?.scrollIntoView({ block: "nearest" });
    });
  });
})();
