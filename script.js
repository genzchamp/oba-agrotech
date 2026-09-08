/* OBA AgroTech — core site interactions */
const OBA_CONFIG = {
  whatsappNumber: "2348163431308",
  whatsappMessage: "Hello OBA AgroTech, I would like to learn more about your poultry health and farm solutions."
};

(function () {
  const wa = (message = OBA_CONFIG.whatsappMessage) =>
    `https://wa.me/${OBA_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  function setupWhatsApp() {
    document.querySelectorAll("[data-wa]").forEach(link => {
      const message = link.dataset.waMessage || OBA_CONFIG.whatsappMessage;
      link.href = wa(message);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }

  function setupMobileNav() {
    const button = document.querySelector(".menu-btn");
    const menu = document.querySelector(".mobile-menu");
    if (!button || !menu) return;
    const close = () => {
      menu.classList.remove("open");
      button.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open menu");
    };
    const toggle = () => {
      const open = !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      button.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", toggle);
    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", close));
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 900) close(); }, { passive: true });
  }

  function setupAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        const id = link.getAttribute("href");
        if (!id || id === "#" || id === "#contact") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", id);
      });
    });
    const contactUrl = wa("Hello OBA AgroTech, I would like to contact you about your poultry farm solutions.");
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
      link.href = contactUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }

  function setupBasics() {
    if (!document.querySelector('link[rel="icon"]')) {
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.type = "image/svg+xml";
      favicon.href = "favicon.svg";
      document.head.appendChild(favicon);
    }
  }

  function setupHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupReveal() {
    const targets = document.querySelectorAll(".solution-card, .mini-grid article, .tool-link-card, .framework-visual, .process-step, .offer-panel, .faq-item");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach(el => el.classList.add("reveal", "is-visible"));
      return;
    }
    targets.forEach(el => el.classList.add("reveal"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -60px 0px" });
    targets.forEach(el => observer.observe(el));
  }

  function setupCarousel() {
    const track = document.querySelector(".solution-grid");
    if (!track) return;
    const cards = track.querySelectorAll(".solution-card");
    if (cards.length < 2 || !window.matchMedia("(max-width:900px)").matches) return;
    const dots = document.createElement("div");
    dots.className = "carousel-dots";
    cards.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dots.appendChild(dot);
    });
    track.after(dots);
    track.addEventListener("scroll", () => {
      const width = cards[0].getBoundingClientRect().width + 16;
      const index = Math.min(cards.length - 1, Math.max(0, Math.round(track.scrollLeft / width)));
      dots.querySelectorAll(".carousel-dot").forEach((d, i) => d.classList.toggle("is-active", i === index));
    }, { passive: true });
  }

  function init() {
    setupBasics();
    setupWhatsApp();
    setupMobileNav();
    setupAnchors();
    setupHeader();
    setupReveal();
    setupCarousel();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
