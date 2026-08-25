/* OBA AgroTech — edit only this number when you're ready */
const OBA_CONFIG = {
  whatsappNumber: "234XXXXXXXXXX",
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
menuBtn?.addEventListener("click", () => mobileMenu.classList.toggle("open"));
document.querySelectorAll(".mobile-menu a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, {threshold:.08});

document.querySelectorAll(".solution-card,.mini-grid article,.tool-list article,.framework-visual").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(18px)";
  el.style.transition = "opacity .7s ease, transform .7s ease";
  observer.observe(el);
});
