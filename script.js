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
