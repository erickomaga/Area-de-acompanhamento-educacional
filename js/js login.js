(function (global) {
  'use strict';

  const USERS = {
    'maker09': 'maker123'
  };

  /**
   * Verifica.
   * @param {string} username - nome do usuário.
   * @param {string} password - senha.
   * @returns {{ok: boolean, message: string}} - resultado.
   */
  function verifyCredentials(username, password) {
    if (typeof username !== 'string' || typeof password !== 'string') {
      return { ok: false, message: 'Usuário e senha devem ser strings.' };
    }

    const userKey = username.trim().toLowerCase();
    const pass = password; 

    if (!userKey) {
      return { ok: false, message: 'Nome de usuário vazio.' };
    }

    if (!Object.prototype.hasOwnProperty.call(USERS, userKey)) {
      return { ok: false, message: 'Usuário não encontrado.' };
    }

    if (USERS[userKey] === pass) {
      return { ok: true, message: 'Login bem-sucedido.' };
    } else {
      return { ok: false, message: 'Senha incorreta.' };
    }
  }

  function attachFormListener(formId, userInputId, passInputId, redirectUrl) {
    const form = document.getElementById(formId);
    const userInput = document.getElementById(userInputId);
    const passInput = document.getElementById(passInputId);

    if (!form || !userInput || !passInput) {
      console.warn('attachFormListener: elemento(s) não encontrado(s). Verifique os IDs.');
      return;
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      const username = userInput.value;
      const password = passInput.value;

      const result = verifyCredentials(username, password);

      if (result.ok) {
        if (typeof redirectUrl === 'string' && redirectUrl.trim()) {
          window.location.href = redirectUrl;
        } else {
          alert('Login válido (sem redirect configurado).');
        }
      } else {
        alert(result.message);
      }
    });
  }

  global.Auth = {
    USERS: Object.assign({}, USERS),
    verifyCredentials: verifyCredentials,
    attachFormListener: attachFormListener
  };

})(window);
