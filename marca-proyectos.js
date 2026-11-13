/* MARCA andresc_productions · visor de imágenes de la sección «Marca» */
(function () {
  'use strict';
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.mp-tile[data-mp-src]'));
  if (!tiles.length) return;
  var visor = document.createElement('div');
  visor.className = 'mp-visor'; visor.setAttribute('role', 'dialog'); visor.setAttribute('aria-modal', 'true'); visor.setAttribute('aria-label', 'Vista ampliada');
  visor.innerHTML = '<img alt=""><div class="mp-visor-titulo"></div><button type="button" class="mp-cerrar" aria-label="Cerrar">✕</button><button type="button" class="mp-ant" aria-label="Anterior">‹</button><button type="button" class="mp-sig" aria-label="Siguiente">›</button>';
  document.body.appendChild(visor);
  var img = visor.querySelector('img'), titulo = visor.querySelector('.mp-visor-titulo');
  var grupo = [], pos = 0, origen = null;
  function mostrar() {
    var t = grupo[pos];
    img.src = t.getAttribute('data-mp-src'); img.alt = t.getAttribute('data-mp-titulo') || '';
    titulo.innerHTML = '';
    titulo.appendChild(document.createTextNode(t.getAttribute('data-mp-titulo') || ''));
    var s = document.createElement('small'); s.textContent = (pos + 1) + ' / ' + grupo.length; titulo.appendChild(s);
  }
  function abrir(t) {
    origen = t;
    grupo = tiles.filter(function (x) { return x.getAttribute('data-mp-grupo') === t.getAttribute('data-mp-grupo'); });
    pos = grupo.indexOf(t); mostrar();
    visor.classList.add('abierto'); document.documentElement.style.overflow = 'hidden';
    visor.querySelector('.mp-cerrar').focus();
  }
  function cerrar() { visor.classList.remove('abierto'); document.documentElement.style.overflow = ''; img.removeAttribute('src'); if (origen) origen.focus(); }
  function mover(d) { pos = (pos + d + grupo.length) % grupo.length; mostrar(); }
  tiles.forEach(function (t) { t.addEventListener('click', function () { abrir(t); }); });
  visor.querySelector('.mp-cerrar').addEventListener('click', cerrar);
  visor.querySelector('.mp-ant').addEventListener('click', function () { mover(-1); });
  visor.querySelector('.mp-sig').addEventListener('click', function () { mover(1); });
  visor.addEventListener('click', function (e) { if (e.target === visor) cerrar(); });
  document.addEventListener('keydown', function (e) {
    if (!visor.classList.contains('abierto')) return;
    if (e.key === 'Escape') cerrar(); else if (e.key === 'ArrowLeft') mover(-1); else if (e.key === 'ArrowRight') mover(1);
  });
  /* solo un video sonando a la vez */
  var videos = Array.prototype.slice.call(document.querySelectorAll('.mp video'));
  videos.forEach(function (v) { v.addEventListener('play', function () { videos.forEach(function (o) { if (o !== v) o.pause(); }); }); });
})();
