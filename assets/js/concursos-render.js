/* ===================================================================
   HUMAN CONCURSOS — concursos-render.js
   ===================================================================
   Módulo compartilhado que transforma um item do concursos.json em
   HTML de cartão (.concurso-card). Usado por:
     - concursos-abertos.html
     - em-breve.html
     - gerador-concurso.html (pré-visualização ao vivo)
   Não precisa editar este arquivo no dia a dia.
=================================================================== */

const HC_STATUS_LABEL = {
  aberto: "Inscrições abertas",
  previsto: "Previsto",
};

const HC_PRAZO_LABEL = {
  aberto: "inscrições até",
  previsto: "previsão de edital",
};

function hcEscapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

function hcPlaceholderIcon() {
  return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4-8 4-8-4 8-4z" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M4 11v6c0 1.1 3.6 3 8 3s8-1.9 8-3v-6" stroke="#fff" stroke-width="1.4"/>
  </svg>`;
}

/**
 * Gera o HTML de um cartão de concurso.
 * @param {Object} item - ver assets/data/concursos.json para o formato dos campos.
 */
function hcRenderConcursoCard(item) {
  const status = item.status === "previsto" ? "previsto" : "aberto";
  const statusLabel = item.exemplo ? "Exemplo" : HC_STATUS_LABEL[status];
  const statusClass = item.exemplo ? "status-exemplo" : "status-" + status;
  const prazoLabel = HC_PRAZO_LABEL[status];
  const btnLabel = status === "previsto" ? "Quero ser avisado" : "Quero me preparar";

  const imageHtml = item.imagem
    ? `<img src="${hcEscapeHtml(item.imagem)}" alt="${hcEscapeHtml(item.cargo || "Concurso")}" loading="lazy">`
    : hcPlaceholderIcon();

  const bancaHtml = item.banca
    ? `<p class="concurso-banca">Banca organizadora: <strong>${hcEscapeHtml(item.banca)}</strong></p>`
    : "";

  const wppMsg = item.whatsappMsg || `Olá! Vim pelo site da Human Concursos e tenho interesse no concurso de ${item.cargo || ""}.`;
  const href = typeof HC_wppUrl === "function" ? HC_wppUrl(wppMsg) : "#";

  return `
    <div class="concurso-card">
      <div class="concurso-image">${imageHtml}</div>
      <div class="concurso-main">
        <div class="concurso-top">
          <span class="concurso-status ${statusClass}">${hcEscapeHtml(statusLabel)}</span>
          <span class="concurso-orgao">${hcEscapeHtml(item.orgao || "")}</span>
        </div>
        <h3>${hcEscapeHtml(item.cargo || "")}</h3>
        ${bancaHtml}
        <div class="concurso-meta">
          <div><strong>${hcEscapeHtml(item.vagas || "—")}</strong>vagas</div>
          <div><strong>${hcEscapeHtml(item.escolaridade || "—")}</strong>escolaridade</div>
          <div><strong>${hcEscapeHtml(item.salario || "—")}</strong>salário</div>
          <div><strong>${hcEscapeHtml(item.prazo || "—")}</strong>${prazoLabel}</div>
        </div>
      </div>
      <div class="concurso-cta">
        <a class="btn btn-dark" href="${href}" target="_blank" rel="noopener">${btnLabel}</a>
      </div>
    </div>
  `;
}

/**
 * Busca assets/data/concursos.json, filtra por status e renderiza
 * dentro do elemento indicado.
 * @param {string} status - "aberto" ou "previsto"
 * @param {string} containerId - id do elemento onde os cartões entram
 * @param {string} emptyMessage - texto exibido quando não há nenhum item
 */
function hcLoadConcursos(status, containerId, emptyMessage) {
  const container = document.getElementById(containerId);
  if (!container) return;

  fetch("assets/data/concursos.json")
    .then((res) => res.json())
    .then((data) => {
      const items = data.filter((item) => (item.status === "previsto" ? "previsto" : "aberto") === status);
      if (items.length === 0) {
        container.innerHTML = `<div class="concurso-empty">${hcEscapeHtml(emptyMessage || "Nenhum concurso cadastrado no momento.")}</div>`;
        return;
      }
      container.innerHTML = items.map(hcRenderConcursoCard).join("");
    })
    .catch(() => {
      // Ao abrir o arquivo .html direto (duplo clique), o navegador bloqueia
      // a leitura do JSON por segurança (CORS). Funciona normalmente quando
      // publicado no GitHub Pages, ou testado com um servidor local
      // (veja o README, seção "Testar localmente").
      container.innerHTML = `<div class="concurso-empty">Não foi possível carregar os concursos agora. Se você abriu este arquivo direto do computador (duplo clique), veja o README — seção "Testar localmente" — para rodar um servidor local simples.</div>`;
    });
}
