/* ===================================================================
   HUMAN CONCURSOS — main.js
   ===================================================================
   Edite só o bloco CONFIG abaixo para atualizar contato e responsável.
   Nada mais neste arquivo precisa ser tocado no dia a dia.
=================================================================== */

// ------------------- CONFIG (edite aqui) -------------------
const CONFIG = {
    // Número de WhatsApp no formato 55DDDNUMERO (só dígitos, com DDI 55).
    whatsappNumber: "5585991699174",

    // Mensagem padrão usada quando um botão não define uma mensagem própria.
    whatsappDefaultMessage: "Olá! Vim pelo site da Human Concursos.",

    // Nome do responsável pelo contato (usado em textos, se necessário).
    responsavel: "Tomaz",
};
// -------------------------------------------------------------

function wppUrl(msg) {
    const text = encodeURIComponent(msg || CONFIG.whatsappDefaultMessage);
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
}
// Exposto globalmente para o assets/js/concursos-render.js poder montar
// o link de WhatsApp de cada cartão de concurso.
window.HC_wppUrl = wppUrl;
window.HC_CONFIG = CONFIG;

function setupWhatsappLinks() {
    const navBtn = document.getElementById("btnNavWpp");
    if (navBtn) navBtn.href = wppUrl("Olá! Vim pelo site da Human Concursos.");

    const heroBtn = document.getElementById("btnHeroWpp");
    if (heroBtn)
        heroBtn.href = wppUrl(
            "Olá! Vim pelo site da Human Concursos e quero saber mais.",
        );

    const mobileBtn = document.getElementById("btnMobileWpp");
    if (mobileBtn)
        mobileBtn.href = wppUrl("Olá! Vim pelo site da Human Concursos.");

    document.querySelectorAll(".wpp-link").forEach((el) => {
        el.href = wppUrl(el.getAttribute("data-msg"));
    });
}

function setupMobileMenu() {
    const toggle = document.getElementById("navToggle");
    const panel = document.getElementById("mobilePanel");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", () => {
        const isOpen = panel.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Fecha o menu ao tocar em qualquer link dentro dele.
    panel.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            panel.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

function setupActiveNav() {
    const current = document.body.getAttribute("data-page");
    if (!current) return;
    document.querySelectorAll("[data-nav]").forEach((link) => {
        if (link.getAttribute("data-nav") === current) {
            link.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupWhatsappLinks();
    setupMobileMenu();
    setupActiveNav();
});
