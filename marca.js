/* andresc_productions × Andrés Caicedo — la experiencia de la marca
   1. Intro «El corte» (con botón Saltar)
   2. Mi historia: el logo se talla mientras bajas
   3. El menú marca dónde estás */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var sinMovimiento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. INTRO «EL CORTE» ── */
  var intro = document.getElementById('introCorte');
  var saltar = document.getElementById('introSaltar');
  var introTerminada = false;

  function terminarIntro(rapido) {
    if (introTerminada) return;
    introTerminada = true;
    raiz.classList.remove('intro-activa');
    if (rapido) raiz.style.setProperty('--retraso', '0s');
    if (!intro) return;
    if (saltar && document.activeElement === saltar) saltar.blur();
    if (rapido) intro.classList.add('intro-fuera');
    window.setTimeout(function () { intro.hidden = true; }, rapido ? 480 : 950);
  }

  if (intro && !sinMovimiento) {
    raiz.classList.add('intro-activa');
    window.setTimeout(function () { terminarIntro(false); }, 2900);
    if (saltar) {
      saltar.addEventListener('click', function () { terminarIntro(true); });
      saltar.focus({ preventScroll: true });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !introTerminada) terminarIntro(true);
    });
  } else {
    raiz.style.setProperty('--retraso', '0s');
    if (intro) intro.hidden = true;
  }

  /* ── 2. MI HISTORIA: cada tramo del recorrido talla una parte del logo ── */
  var historia = document.getElementById('historia');
  if (historia && !sinMovimiento) {
    var pasos = Array.prototype.slice.call(historia.querySelectorAll('.historia-paso'));
    var cortes = Array.prototype.slice.call(historia.querySelectorAll('.hc'));
    var brillos = Array.prototype.slice.call(historia.querySelectorAll('.hb'));
    var numero = document.getElementById('historiaNum');
    var barra = document.getElementById('historiaBarra');
    var total = pasos.length;               // 5 pasos: bloque, curva, corte, pausa, abierto
    var pasoActual = -1;
    var pendiente = false;

    historia.classList.add('es-interactiva');

    function suave(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function limitar(v) { return Math.max(0, Math.min(1, v)); }

    function pintar() {
      pendiente = false;
      var caja = historia.getBoundingClientRect();
      var recorrido = caja.height - window.innerHeight;
      var avance = recorrido > 0 ? limitar(-caja.top / recorrido) : 1;
      var tramo = avance * total;                 // 0 … 5

      // los cortes 1, 2 y 3 se tallan en los tramos 1, 2 y 3
      cortes.forEach(function (corte, i) {
        var p = suave(limitar(tramo - (i + 1)));
        corte.style.strokeDashoffset = (1 - p).toFixed(4);
        var brillo = brillos[i];
        if (brillo) {
          brillo.style.strokeDashoffset = (1 - p).toFixed(4);
          brillo.style.opacity = (p > 0 && p < 1) ? '1' : '0';
        }
      });

      var paso = Math.min(total - 1, Math.floor(tramo));
      if (paso !== pasoActual) {
        pasoActual = paso;
        pasos.forEach(function (li, i) {
          li.classList.toggle('es-actual', i === paso);
          li.classList.toggle('ya-paso', i < paso);
        });
        if (numero) numero.textContent = '0' + (paso + 1);
        historia.classList.toggle('final', paso === total - 1);
      }
      if (barra) barra.style.setProperty('--avance', avance.toFixed(4));
    }

    function pedir() {
      if (pendiente) return;
      pendiente = true;
      window.requestAnimationFrame(pintar);
    }
    window.addEventListener('scroll', pedir, { passive: true });
    window.addEventListener('resize', pedir);
    pintar();
  }

  /* ── 3. EL MENÚ SE OSCURECE SOBRE LAS SECCIONES OSCURAS ── */
  var menu = document.getElementById('mainNav');
  var oscuras = ['historia', 'work-audiovisual'].map(function (id) { return document.getElementById(id); })
    .concat(Array.prototype.slice.call(document.querySelectorAll('footer.pie-marca'))).filter(Boolean);
  if (menu && 'IntersectionObserver' in window && oscuras.length) {
    var bajoMenu = {};
    var vigia = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { bajoMenu[e.target.id || 'pie'] = e.isIntersecting; });
      var alguna = Object.keys(bajoMenu).some(function (k) { return bajoMenu[k]; });
      menu.classList.toggle('sobre-oscuro', alguna);
    }, { rootMargin: '0px 0px -92% 0px' });
    oscuras.forEach(function (el) { vigia.observe(el); });
  }

  /* ── 4. EL MENÚ MARCA LA SECCIÓN EN LA QUE ESTÁS ── */
  var enlaces = Array.prototype.slice.call(document.querySelectorAll('.nav-link[data-nav]'));
  var botonTrabajo = document.getElementById('navCatsBtn');
  var secciones = [
    ['historia', 'historia'], ['disciplinas', 'trabajo'], ['work-diseno', 'trabajo'],
    ['work-audiovisual', 'trabajo'], ['work-arteplastico', 'trabajo'], ['servicios', 'servicios'], ['contact', 'contact']
  ].map(function (par) { return { el: document.getElementById(par[0]), clave: par[1] }; })
   .filter(function (s) { return s.el; });

  if ('IntersectionObserver' in window && secciones.length) {
    var visibles = {};
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { visibles[e.target.id] = e.isIntersecting; });
      var activa = '';
      secciones.forEach(function (s) { if (visibles[s.el.id]) activa = s.clave; });
      enlaces.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-nav') === activa); });
      if (botonTrabajo) botonTrabajo.classList.toggle('active', activa === 'trabajo');
    }, { rootMargin: '-45% 0px -50% 0px' });
    secciones.forEach(function (s) { observador.observe(s.el); });
  }
})();
