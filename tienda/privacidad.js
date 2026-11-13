/* Andrés Caicedo — Política de privacidad */
(function () {
  'use strict';

  /* ── TEMA ── */
  var temaBoton = document.getElementById('temaBoton');
  if (!temaBoton) return;
  temaBoton.addEventListener('click', function () {
    var oscuro = document.body.classList.toggle('theme-dark');
    temaBoton.setAttribute('aria-pressed', oscuro ? 'true' : 'false');
    temaBoton.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  });
})();
