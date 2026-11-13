/* andresc_productions — Aviso de cookies y autorización de datos (Ley 1581 de 2012) */
(function () {
  'use strict';

  var CLAVE = 'andrescConsentimiento';      /* 'todas' | 'necesarias' */
  var VERSION = '2026-11-06';
  var CLAVE_VERSION = 'andrescConsentimientoVersion';

  function leer() {
    try {
      if (localStorage.getItem(CLAVE_VERSION) !== VERSION) return null;
      return localStorage.getItem(CLAVE);
    } catch (e) { return null; }
  }
  function guardar(valor) {
    try {
      localStorage.setItem(CLAVE, valor);
      localStorage.setItem(CLAVE_VERSION, VERSION);
    } catch (e) {}
  }

  var eleccion = leer();

  /* Otros scripts preguntan aquí si pueden registrar visitas o clics */
  window.andrescPuedeMedir = function () { return eleccion === 'todas'; };

  function avisar() {
    var ev;
    try { ev = new CustomEvent('andresc:consentimiento', { detail: { eleccion: eleccion } }); }
    catch (e) { ev = document.createEvent('CustomEvent'); ev.initCustomEvent('andresc:consentimiento', false, false, { eleccion: eleccion }); }
    document.dispatchEvent(ev);
  }

  var aviso = null;

  function cerrar() {
    if (!aviso) return;
    aviso.classList.remove('visible');
    var a = aviso;
    setTimeout(function () { if (a.parentNode) a.parentNode.removeChild(a); }, 300);
    aviso = null;
  }

  function elegir(valor) {
    eleccion = valor;
    guardar(valor);
    cerrar();
    avisar();
  }

  function crearBoton(texto, clase, valor) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'cc-boton ' + clase;
    b.textContent = texto;
    b.addEventListener('click', function () { elegir(valor); });
    return b;
  }

  function mostrar() {
    if (aviso) return;
    aviso = document.createElement('section');
    aviso.className = 'cc-aviso';
    aviso.setAttribute('role', 'dialog');
    aviso.setAttribute('aria-live', 'polite');
    aviso.setAttribute('aria-label', 'Aviso de cookies');

    var titulo = document.createElement('p');
    titulo.className = 'cc-titulo';
    titulo.textContent = 'Tu navegación, tus reglas.';

    var texto = document.createElement('p');
    texto.className = 'cc-texto';
    texto.appendChild(document.createTextNode('Este sitio guarda en tu navegador solo lo necesario para funcionar (tema, carrito, me gusta). Si aceptas, también cuenta tu visita de forma anónima con Google. '));
    var enlace = document.createElement('a');
    enlace.href = 'cookies.html';
    enlace.textContent = 'Política de cookies';
    texto.appendChild(enlace);
    texto.appendChild(document.createTextNode('.'));

    var acciones = document.createElement('div');
    acciones.className = 'cc-acciones';
    acciones.appendChild(crearBoton('Solo lo necesario', 'cc-secundario', 'necesarias'));
    acciones.appendChild(crearBoton('Aceptar todo', 'cc-primario', 'todas'));

    aviso.appendChild(titulo);
    aviso.appendChild(texto);
    aviso.appendChild(acciones);
    document.body.appendChild(aviso);
    requestAnimationFrame(function () { if (aviso) aviso.classList.add('visible'); });
  }

  function iniciar() {
    if (!eleccion) mostrar();

    /* Enlaces "Preferencias de cookies" */
    document.addEventListener('click', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('[data-abrir-cookies]') : null;
      if (!t) return;
      e.preventDefault();
      mostrar();
    });

    /* Autorización obligatoria en formularios con datos personales */
    document.addEventListener('submit', function (e) {
      var form = e.target;
      if (!form || !form.querySelector) return;
      var casilla = form.querySelector('input[data-autorizacion]');
      if (!casilla || casilla.checked) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      var estado = form.querySelector('.form-status');
      if (estado) {
        estado.textContent = 'Para enviar, marca la casilla de autorización de datos.';
        estado.className = 'form-status err';
      }
      casilla.focus();
    }, true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
