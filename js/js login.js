(function (global) {
  'use strict';

  const USERS = {
    'maker09': 'maker123',
    'cadmus09': 'cadmus123',
    'aurora01': 'aurora123',
    'luna02': 'luna123',
    'atlas03': 'atlas123',
    'solis04': 'solis123',
    'nimbus05': 'nimbus123',
    'orion06': 'orion123',
    'nova07': 'nova123',
    'eclipse08': 'eclipse123',
    'oito': 'oito123',
    'vulcan10': 'vulcan123',
    'zephyr11': 'zephyr123',
    'phoenix12': 'phoenix123',
    'onyx13': 'onyx123'
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
