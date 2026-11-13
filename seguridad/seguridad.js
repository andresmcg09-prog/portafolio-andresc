/* Andrés Caicedo — Portafolio: seguridad de los formularios */
(function () {
  'use strict';

  var horaCarga = Date.now();
  var TIEMPO_MINIMO_MS = 2000;

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

  var CAPTCHA_INFO = {
    contactForm: { preguntaId: 'captchaPreguntaContacto', inputId: 'captchaContacto' },
    commentForm: { preguntaId: 'captchaPreguntaComentario', inputId: 'captchaComentario' }
  };
  var captchaRespuestaEsperada = {};

  function dibujarCaptcha(canvas, a, b) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#f4ecdd';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(46,32,22,0.25)';
    for (var i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * w, Math.random() * h);
      ctx.lineTo(Math.random() * w, Math.random() * h);
      ctx.stroke();
    }

    var texto = a + ' + ' + b + ' =';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillStyle = '#2e2016';
    ctx.textBaseline = 'middle';
    var x = 6;
    for (var i2 = 0; i2 < texto.length; i2++) {
      var ch = texto[i2];
      var y = h / 2 + (Math.random() * 6 - 3);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.random() * 0.36) - 0.18);
      ctx.fillText(ch, 0, 0);
      ctx.restore();
      x += ctx.measureText(ch).width + 1;
    }

    ctx.fillStyle = 'rgba(46,32,22,0.35)';
    for (var i3 = 0; i3 < 18; i3++) {
      ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
    }
  }

  function generarCaptcha(formId) {
    var info = CAPTCHA_INFO[formId];
    if (!info) return;
    var a = 1 + Math.floor(Math.random() * 8);
    var b = 1 + Math.floor(Math.random() * 8);
    captchaRespuestaEsperada[formId] = a + b;
    dibujarCaptcha(document.getElementById(info.preguntaId), a, b);
    var input = document.getElementById(info.inputId);
    if (input) input.value = '';
  }
  Object.keys(CAPTCHA_INFO).forEach(generarCaptcha);

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

  function camposCompletos(form, captchaInfo) {
    var campos = form.querySelectorAll('[required]');
    for (var i = 0; i < campos.length; i++) {
      var campo = campos[i];
      if (captchaInfo && campo.id === captchaInfo.inputId) continue;
      var valor = (campo.value || '').trim();
      if (!valor) return false;
      if (campo.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return false;
    }
    return true;
  }

  function leerStorage(storage, key) {
    try { return parseInt(storage.getItem(key), 10) || 0; } catch (err) { return 0; }
  }
  function escribirStorage(storage, key, valor) {
    try { storage.setItem(key, String(valor)); } catch (err) {}
  }

  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !form.id || !FORM_INFO[form.id]) return;

    var info = FORM_INFO[form.id];
    var captchaInfo = CAPTCHA_INFO[form.id];

    function bloquear(mensaje) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (mensaje) mostrarBloqueo(info.statusId, mensaje);
    }

    // 1) Campo trampa
    var honeypot = form.querySelector('.hp-field');
    if (honeypot && honeypot.value.trim() !== '') {
      bloquear(null);
      return;
    }

    // 2) Automatización del navegador
    if (navigator.webdriver) {
      bloquear(null);
      return;
    }

    // 3) Interacción real (clic o Enter)
    if (!e.isTrusted) {
      bloquear(null);
      return;
    }

    // 4) Tiempo mínimo en la página
    if ((Date.now() - horaCarga) < TIEMPO_MINIMO_MS) {
      bloquear('Espera un momento e inténtalo de nuevo.');
      return;
    }

    if (!camposCompletos(form, captchaInfo)) {
      return;
    }

    // 5) Pregunta de verificación
    if (captchaInfo) {
      var inputCaptcha = document.getElementById(captchaInfo.inputId);
      var respuesta = inputCaptcha ? parseInt(inputCaptcha.value, 10) : NaN;
      if (respuesta !== captchaRespuestaEsperada[form.id]) {
        bloquear('Esa respuesta no es correcta — vuelve a intentarlo.');
        generarCaptcha(form.id);
        return;
      }
    }

    // 6) Límite de frecuencia
    var key = THROTTLE_KEY[info.tipo];
    var limite = THROTTLE_MS[info.tipo];
    var ahora = Date.now();
    var ultimo = leerStorage(localStorage, key);

    if (ultimo && (ahora - ultimo) < limite) {
      var restantes = segundosRestantes(limite - (ahora - ultimo));
      bloquear('Espera ' + restantes + ' segundo' + (restantes === 1 ? '' : 's') + ' antes de volver a enviar.');
      return;
    }

    escribirStorage(localStorage, key, ahora);
    if (captchaInfo) generarCaptcha(form.id);
  }, true);
})();


/* ---------- ANTI-CLICKJACKING ---------- */
(function () {
  'use strict';
  if (window.top === window.self) return;
  /* Permitir el visor de Claude (claude.ai) */
  try { if (document.referrer && /claude\.ai/.test(document.referrer)) return; } catch (e) {}
  try {
    window.top.location = window.self.location.href;
  } catch (err) {
    document.documentElement.style.setProperty('display', 'none', 'important');
  }
})();

/* ---------- AVISO EN LA CONSOLA ---------- */
(function () {
  'use strict';
  if (!window.console || !console.log) return;
  try {
    console.log('%c¡Alto!', 'color:#b33; font-size:46px; font-weight:bold; text-shadow: 1px 1px #000;');
    console.log('%cEsta es una función del navegador pensada para programadores. Si alguien te dijo que pegaras algo aquí para "hackear" una cuenta, ver quién te bloqueó o desbloquear algo, es una estafa: lo único que puede hacer ese código es actuar en tu propio navegador, con tus propias sesiones abiertas. No pegues código que no entiendas.', 'font-size:15px;');
  } catch (err) {}
})();
