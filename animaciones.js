/* Andrés Caicedo — Portafolio: animaciones */
(function () {
  'use strict';

  if (!window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var raiz = document.documentElement;
  var punteroFino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  raiz.classList.add('anima');

  function todos(selector) { return Array.prototype.slice.call(document.querySelectorAll(selector)); }

  /* ── MOVIMIENTO SUAVIZADO ── */
  function seguir(aplicar, factor) {
    var destino = { x: 0, y: 0 }, actual = { x: 0, y: 0 }, cuadro = 0;

    function paso() {
      actual.x += (destino.x - actual.x) * factor;
      actual.y += (destino.y - actual.y) * factor;
      if (Math.abs(destino.x - actual.x) + Math.abs(destino.y - actual.y) < 0.004) {
        actual.x = destino.x;
        actual.y = destino.y;
        cuadro = 0;
      } else {
        cuadro = window.requestAnimationFrame(paso);
      }
      aplicar(actual.x, actual.y);
    }

    return function (x, y) {
      destino.x = x;
      destino.y = y;
      if (!cuadro) cuadro = window.requestAnimationFrame(paso);
    };
  }

  function posicion(e, el) {
    var r = el.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: ((e.clientY - r.top) / r.height) * 2 - 1,
      px: e.clientX - r.left,
      py: e.clientY - r.top
    };
  }

  /* ── BARRA DE PROGRESO ── */
  var nav = document.getElementById('mainNav');
  var progreso = document.createElement('span');
  progreso.className = 'progreso-lectura';
  progreso.setAttribute('aria-hidden', 'true');
  if (nav) nav.appendChild(progreso);

  /* ── FONDOS CON PROFUNDIDAD AL DESPLAZAR ── */
  var paginas = todos('.work-page');
  var pendiente = false;

  function alDesplazar() {
    pendiente = false;
    var alto = window.innerHeight;
    var recorrido = raiz.scrollHeight - alto;
    progreso.style.setProperty('--progreso', recorrido > 0 ? Math.min(1, window.scrollY / recorrido).toFixed(4) : '0');

    paginas.forEach(function (pagina) {
      var r = pagina.getBoundingClientRect();
      if (r.bottom < 0 || r.top > alto) return;
      var centro = (r.top + r.height / 2 - alto / 2) / alto;
      pagina.style.setProperty('--par', (centro * -34).toFixed(1) + 'px');
    });
  }

  function pedirCuadro() {
    if (pendiente) return;
    pendiente = true;
    window.requestAnimationFrame(alDesplazar);
  }

  window.addEventListener('scroll', pedirCuadro, { passive: true });
  window.addEventListener('resize', pedirCuadro);
  alDesplazar();

  /* ── ENTRADA DE CADA SECCIÓN ── */
  if ('IntersectionObserver' in window) {
    var entrada = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('entro');
        entrada.unobserve(e.target);
      });
    }, { threshold: 0.25 });
    paginas.forEach(function (p) { entrada.observe(p); });
  } else {
    paginas.forEach(function (p) { p.classList.add('entro'); });
  }

  /* ── CONTEO DE VISITAS, ME GUSTA Y COMENTARIOS ── */
  function contar(el, hasta, observador) {
    var inicio = null;
    var cancelado = false;

    function paso(t) {
      if (cancelado) return;
      if (observador.takeRecords().length) { cancelado = true; return; }
      if (inicio === null) inicio = t;
      var avance = Math.min(1, (t - inicio) / 900);
      el.textContent = String(Math.round(hasta * (1 - Math.pow(1 - avance, 3))));
      observador.takeRecords();
      if (avance < 1) window.requestAnimationFrame(paso);
    }

    window.requestAnimationFrame(paso);
  }

  if ('MutationObserver' in window) {
    ['visitCount', 'likeCountMain', 'navLikeCount', 'commentCount'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var hecho = false;
      var observador = new MutationObserver(function () {
        if (hecho) return;
        var texto = el.textContent.trim();
        if (!/^\d+$/.test(texto) || parseInt(texto, 10) < 2) return;
        hecho = true;
        contar(el, parseInt(texto, 10), observador);
      });
      observador.observe(el, { childList: true, characterData: true, subtree: true });
    });
  }

  if (!punteroFino) return;

  /* ── PROFUNDIDAD CON EL PUNTERO (INICIO Y DISCIPLINAS) ── */
  todos('.hero, .hub').forEach(function (zona) {
    var mover = seguir(function (x, y) {
      zona.style.setProperty('--mx', x.toFixed(3));
      zona.style.setProperty('--my', y.toFixed(3));
    }, 0.08);
    zona.addEventListener('pointermove', function (e) {
      var p = posicion(e, zona);
      mover(p.x, p.y);
    });
    zona.addEventListener('pointerleave', function () { mover(0, 0); });
  });

  /* ── LUZ EN LAS TARJETAS DE DISCIPLINA ── */
  todos('.hub-side').forEach(function (tarjeta) {
    tarjeta.addEventListener('pointermove', function (e) {
      var p = posicion(e, tarjeta);
      tarjeta.style.setProperty('--lx', p.px.toFixed(0) + 'px');
      tarjeta.style.setProperty('--ly', p.py.toFixed(0) + 'px');
    });
  });

  /* ── INCLINACIÓN DE LA FOTO DESTACADA ── */
  todos('.featured-photo-big').forEach(function (marco) {
    var foto = marco.querySelector('.photo-crop');
    if (!foto) return;
    var girar = seguir(function (x, y) {
      var fuerza = Math.sqrt(x * x + y * y);
      foto.style.rotate = fuerza < 0.004 ? '' : (-y).toFixed(3) + ' ' + x.toFixed(3) + ' 0 ' + (fuerza * 7).toFixed(2) + 'deg';
    }, 0.12);
    marco.addEventListener('pointermove', function (e) {
      var p = posicion(e, marco);
      girar(p.x, p.y);
    });
    marco.addEventListener('pointerleave', function () { girar(0, 0); });
  });

  /* ── BOTONES QUE SIGUEN AL PUNTERO ── */
  todos('.hero-cta, .btn-contact, .btn-gallery, .nav-shop-btn').forEach(function (boton) {
    var mover = seguir(function (x, y) {
      boton.style.translate = (Math.abs(x) + Math.abs(y) < 0.05) ? '' : x.toFixed(1) + 'px ' + y.toFixed(1) + 'px';
    }, 0.18);
    boton.addEventListener('pointermove', function (e) {
      var p = posicion(e, boton);
      mover(p.x * 6, p.y * 4);
    });
    boton.addEventListener('pointerleave', function () { mover(0, 0); });
  });
})();
