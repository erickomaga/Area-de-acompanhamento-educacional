/**
 * script.js
 * Requer env.generated.js carregado ANTES no index.html
 */

(function () {
  "use strict";

  if (!window.__ENV__ || !window.__ENV__.API_URL) {
    console.error("API_URL não definida. Verifique env.generated.js");
    return;
  }

  const API_URL = window.__ENV__.API_URL;

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      const alunos = await buscarAlunos();
      renderizarAlunos(alunos);
    } catch (error) {
      mostrarErro(error.message);
    }
  }

  async function buscarAlunos() {
    const response = await fetch(`${API_URL}/alunos`);

    if (!response.ok) {
      throw new Error("Erro ao buscar dados do servidor");
    }

    return response.json();
  }

  function renderizarAlunos(alunos) {
    const container = document.getElementById("alunos");

    if (!container) {
      console.warn("Elemento #alunos não encontrado no HTML");
      return;
    }

    if (!Array.isArray(alunos) || alunos.length === 0) {
      container.innerHTML = "<p>Nenhum aluno encontrado.</p>";
      return;
    }

    container.innerHTML = "";

    alunos.forEach((aluno) => {
      const card = document.createElement("div");
      card.className = "aluno-card";

      card.innerHTML = `
        <h3>${escapeHtml(aluno.nome)}</h3>
        <p>Série: ${escapeHtml(aluno.serie)}</p>
        <p>Status: ${escapeHtml(aluno.status)}</p>
      `;

      container.appendChild(card);
    });
  }

  function mostrarErro(mensagem) {
    const container = document.getElementById("alunos");
    if (container) {
      container.innerHTML = `<p class="erro">${mensagem}</p>`;
    }
    console.error(mensagem);
  }

  function escapeHtml(text) {
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
