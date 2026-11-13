/* Andrés Caicedo — Portafolio: seguridad de los formularios */
(function () {
  'use strict';

  var THROTTLE_MS = {
    contacto: 30000,
    comentario: 20000
  };
  var THROTTLE_KEY = {
    contacto: 'seguridadUltimoEnvioContacto',
    comentario: 'seguridadUltimoEnvioComentario'
  };

  var FORM_INFO = {
    contactForm: { tipo: 'contacto', statusId: 'formStatus' },
    commentForm: { tipo: 'comentario', statusId: 'commentStatus' }
  };

  function segundosRestantes(ms) {
    return Math.max(1, Math.ceil(ms / 1000));
  }

  function mostrarBloqueo(statusId, mensaje) {
    var status = statusId ? document.getElementById(statusId) : null;
    if (status) {
      status.textContent = mensaje;
      status.className = 'form-status err';
    }
  }

  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !form.id || !FORM_INFO[form.id]) return;

    var info = FORM_INFO[form.id];

    // 1) Campo trampa
    var honeypot = form.querySelector('.hp-field');
    if (honeypot && honeypot.value.trim() !== '') {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    // 2) Límite de frecuencia
    var key = THROTTLE_KEY[info.tipo];
    var limite = THROTTLE_MS[info.tipo];
    var ahora = Date.now();
    var ultimo = 0;
    try { ultimo = parseInt(sessionStorage.getItem(key), 10) || 0; } catch (err) { ultimo = 0; }

    if (ultimo && (ahora - ultimo) < limite) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var restantes = segundosRestantes(limite - (ahora - ultimo));
      mostrarBloqueo(info.statusId, 'Espera ' + restantes + ' segundo' + (restantes === 1 ? '' : 's') + ' antes de volver a enviar.');
      return;
    }

    try { sessionStorage.setItem(key, String(ahora)); } catch (err) {}
  }, true);
})();
