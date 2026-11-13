/* Andrés Caicedo — Sala de ventas */
(function () {
  'use strict';

  var T = window.TIENDA;
  if (!T || !T.obras) return;

  var CLAVE_CARRITO = 'tiendaCarrito';
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var ESTADOS = {
    disponible: 'Disponible',
    reservada: 'Reservada',
    vendida: 'Vendida',
    encargo: 'Por encargo'
  };

  var menosMovimiento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!menosMovimiento) document.documentElement.classList.add('con-movimiento');

  function $(id) { return document.getElementById(id); }

  function crear(etiqueta, clase, texto) {
    var el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined && texto !== null) el.textContent = texto;
    return el;
  }

  function ruta(r) { return encodeURI(r); }

  function slug(texto) {
    return String(texto).toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  /* ── FORMATOS ── */
  function miles(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

  function precioCorto(obra) {
    if (typeof obra.precio !== 'number') return 'A convenir';
    return (obra.desde ? 'Desde ' : '') + '$ ' + miles(obra.precio);
  }

  function fechaLarga(fecha) {
    var p = String(fecha || '').split('-');
    if (!p[0]) return '';
    if (p.length === 1) return p[0];
    var mes = MESES[parseInt(p[1], 10) - 1] || '';
    if (p.length === 2) return mes.charAt(0).toUpperCase() + mes.slice(1) + ' de ' + p[0];
    return parseInt(p[2], 10) + ' de ' + mes + ' de ' + p[0];
  }

  function plural(n, uno, varios) { return n + ' ' + (n === 1 ? uno : varios); }

  /* ── DATOS ── */
  function salaPorId(id) {
    for (var i = 0; i < T.salas.length; i++) if (T.salas[i].id === id) return T.salas[i];
    return null;
  }

  function alaDeSala(salaId) {
    for (var i = 0; i < T.alas.length; i++) if (T.alas[i].salas.indexOf(salaId) !== -1) return T.alas[i];
    return null;
  }

  function obraPorCodigo(codigo) {
    for (var i = 0; i < T.obras.length; i++) if (T.obras[i].codigo === codigo) return T.obras[i];
    return null;
  }

  function obrasDeSala(salaId) {
    return T.obras.filter(function (o) { return o.sala === salaId; });
  }

  function textoProyecto(salaId, nombre) {
    var lista = T.proyectos || [];
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].sala === salaId && lista[i].nombre === nombre) return lista[i].texto || '';
    }
    return '';
  }

  function proyectosDeSala(salaId) {
    var orden = [], mapa = {};
    obrasDeSala(salaId).forEach(function (o) {
      var nombre = o.proyecto || o.titulo;
      if (!mapa[nombre]) {
        mapa[nombre] = { nombre: nombre, id: slug(nombre), sala: salaId, obras: [], texto: textoProyecto(salaId, nombre) };
        orden.push(mapa[nombre]);
      }
      mapa[nombre].obras.push(o);
    });
    return orden;
  }

  function proyectoDeObra(obra) {
    var lista = proyectosDeSala(obra.sala);
    for (var i = 0; i < lista.length; i++) if (lista[i].obras.indexOf(obra) !== -1) return lista[i];
    return null;
  }

  /* ── ENLACES DE CONTACTO ── */
  function enlaceWhatsApp(mensaje) {
    return 'https://wa.me/' + T.whatsapp + '?text=' + encodeURIComponent(mensaje);
  }

  function enlaceCorreo(asunto, cuerpo) {
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(T.correo) +
      '&su=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
  }

  function enlaceDeObra(obra) {
    if (location.protocol !== 'https:') return '';
    return '\n' + location.origin + location.pathname + '#obra/' + obra.codigo;
  }

  function mensajeDeObra(obra) {
    var base = '«' + obra.titulo + '» (código ' + obra.codigo + ')';
    var precio = typeof obra.precio === 'number' ? ' Precio publicado: ' + precioCorto(obra).toLowerCase() + ' COP.' : '';
    var texto;
    if (obra.estado === 'encargo') {
      texto = 'Hola Andrés, vi ' + base + ' en tu sala de ventas y quiero pedir una cotización para un trabajo parecido.' + precio;
    } else if (obra.estado === 'reservada') {
      texto = 'Hola Andrés, vi que ' + base + ' está reservada. ¿Me avisas si vuelve a estar disponible?';
    } else if (obra.estado === 'vendida') {
      texto = 'Hola Andrés, vi que ' + base + ' ya se vendió. ¿Podrías hacer una obra parecida por encargo?';
    } else {
      texto = 'Hola Andrés, quiero comprar la obra ' + base + ' que vi en tu sala de ventas.' + precio + ' ¿Sigue disponible?';
    }
    return texto + enlaceDeObra(obra);
  }

  function textoBotonCompra(obra) {
    if (obra.estado === 'encargo') return 'Cotizar por WhatsApp';
    if (obra.estado === 'reservada') return 'Preguntar por WhatsApp';
    if (obra.estado === 'vendida') return 'Encargar una parecida';
    return 'Comprar por WhatsApp';
  }

  /* ── ESTADO ── */
  function ponerEstado(el, obra) {
    var estado = ESTADOS[obra.estado] ? obra.estado : 'disponible';
    el.className = (el.dataset.base || '') + ' estado estado-' + estado;
    el.textContent = ESTADOS[estado];
  }

  /* ── AVISO DE MUESTRA Y PIE ── */
  if (T.datosDeMuestra) $('avisoMuestra').hidden = false;
  $('pieWhatsapp').href = enlaceWhatsApp('Hola Andrés, vi tu sala de ventas y quiero hacerte una pregunta.');
  $('pieCorreo').href = enlaceCorreo('Consulta desde la sala de ventas', 'Hola Andrés,\n\nVi tu sala de ventas y quiero hacerte una pregunta.\n\n');
  $('pieInstagram').href = 'https://www.instagram.com/' + T.instagram;

  /* ── TEMA ── */
  var temaBoton = $('temaBoton');
  temaBoton.addEventListener('click', function () {
    var oscuro = document.body.classList.toggle('theme-dark');
    temaBoton.setAttribute('aria-pressed', oscuro ? 'true' : 'false');
    temaBoton.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  });

  /* ── REGISTRO DE PEDIDOS ── */
  var CLAVE_INTERES = 'tiendaInteresPropio';
  var HORAS_INTERES = (T.registro && T.registro.horasDeInteres) || 12;
  var interes = {};

  function leerPropios() {
    try {
      var guardado = JSON.parse(localStorage.getItem(CLAVE_INTERES) || '{}');
      return guardado && typeof guardado === 'object' ? guardado : {};
    } catch (err) { return {}; }
  }

  function sinRegistrar(codigos) {
    var propios = leerPropios();
    var limite = Date.now() - HORAS_INTERES * 3600000;
    var nuevos = codigos.filter(function (c) { return !(propios[c] > limite); });
    nuevos.forEach(function (c) { propios[c] = Date.now(); });
    try { localStorage.setItem(CLAVE_INTERES, JSON.stringify(propios)); } catch (err) {}
    return nuevos;
  }

  function enviarRegistro(accion, detalle) {
    var r = T.registro;
    if (!r || !r.formulario) return;
    if (window.andrescPuedeMedir && !window.andrescPuedeMedir()) return;
    try {
      var marco = $('registroMarco');
      if (!marco) {
        marco = crear('iframe', 'registro-marco');
        marco.id = 'registroMarco';
        marco.name = 'registroMarco';
        marco.title = 'registro de pedidos';
        marco.setAttribute('aria-hidden', 'true');
        marco.tabIndex = -1;
        document.body.appendChild(marco);
      }
      var f = crear('form', 'registro-marco');
      f.action = r.formulario;
      f.method = 'POST';
      f.target = 'registroMarco';
      [[r.campoTipo, 'compra'], [r.campoNombre, accion], [r.campoDetalle, detalle]].forEach(function (par) {
        if (!par[0]) return;
        var campo = crear('input');
        campo.type = 'hidden';
        campo.name = par[0];
        campo.value = par[1];
        f.appendChild(campo);
      });
      document.body.appendChild(f);
      f.submit();
      window.setTimeout(function () { f.remove(); }, 4000);
    } catch (err) {}
  }

  function registrar(accion, obras, total) {
    var codigos = obras.map(function (o) { return o.codigo; });
    if (!codigos.length) return;
    var nuevos = sinRegistrar(codigos);
    var detalle = obras.length === 1
      ? obras[0].codigo + ' | ' + obras[0].titulo + ' | ' + precioCorto(obras[0])
      : codigos.join(', ') + ' | total ' + total;
    if (!nuevos.length) detalle += ' | repite';
    enviarRegistro(accion, detalle);
    nuevos.forEach(function (c) { interes[c] = (interes[c] || 0) + 1; });
    pintarInteres();
  }

  /* ── COMPRADORES INTERESADOS ── */
  function textoInteres(codigo) {
    var obra = obraPorCodigo(codigo);
    var n = interes[codigo] || 0;
    if (!n || !obra || obra.estado === 'vendida') return '';
    return n === 1 ? '1 comprador interesado' : n + ' compradores interesados';
  }

  function pintarInteres() {
    Array.prototype.forEach.call(document.querySelectorAll('.viva-item'), function (item) {
      var marca = item.querySelector('.cedula-interes');
      if (!marca) return;
      var texto = textoInteres(item.dataset.codigo);
      marca.textContent = texto;
      marca.hidden = !texto;
    });
    var enFicha = $('fichaInteres');
    var texto = obraAbierta ? textoInteres(obraAbierta.codigo) : '';
    enFicha.textContent = texto ? texto + ' en las últimas ' + HORAS_INTERES + ' horas' : '';
    enFicha.hidden = !texto;
  }

  window.tiendaInteres = function (datos) {
    var filas = (datos && datos.table && datos.table.rows) || [];
    var zona = (T.registro && typeof T.registro.horaDeLaHoja === 'number') ? T.registro.horaDeLaHoja : -5;
    var ahora = Date.now();
    var cuenta = {};
    filas.forEach(function (fila) {
      var c = fila.c || [];
      var m = /Date\((\d+),(\d+),(\d+)(?:,(\d+),(\d+),(\d+))?\)/.exec(String(c[0] && c[0].v));
      if (!m || !c[1] || c[1].v == null) return;
      var momento = Date.UTC(+m[1], +m[2], +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)) - zona * 3600000;
      var hace = ahora - momento;
      if (hace > HORAS_INTERES * 3600000 || hace < -600000) return;
      var partes = String(c[1].v).split('|').map(function (p) { return p.trim(); });
      if (partes.indexOf('repite') !== -1) return;
      partes[0].split(',').forEach(function (codigo) {
        codigo = codigo.trim();
        if (obraPorCodigo(codigo)) cuenta[codigo] = (cuenta[codigo] || 0) + 1;
      });
    });
    interes = cuenta;
    pintarInteres();
  };

  function pedirInteres() {
    var r = T.registro;
    if (!r || !r.hoja || document.hidden) return;
    var viejo = $('interesGuion');
    if (viejo) viejo.remove();
    var guion = crear('script');
    guion.id = 'interesGuion';
    guion.src = 'https://docs.google.com/spreadsheets/d/' + encodeURIComponent(r.hoja) +
      '/gviz/tq?tqx=out:json;responseHandler:tiendaInteres&gid=' + encodeURIComponent(r.pestana || '0') +
      '&tq=' + encodeURIComponent("select A, D where B = 'compra' order by A desc limit 400");
    document.head.appendChild(guion);
  }

  /* ── HISTORIAL ── */
  var aplicandoHistorial = false;
  var esperandoAtras = false;
  var enCola = [];

  function vaciarCola() {
    esperandoAtras = false;
    var pendientes = enCola;
    enCola = [];
    pendientes.forEach(function (accion) { accion(); });
  }

  function ponerHash(hash, empujar) {
    if (aplicandoHistorial) return;
    var destino = hash ? '#' + hash : location.pathname + location.search;
    try {
      if (empujar && location.hash !== '#' + hash) history.pushState(null, '', destino);
      else history.replaceState(null, '', destino);
    } catch (err) {}
  }

  function reanimar(el, clase) {
    el.classList.remove(clase);
    void el.offsetWidth;
    el.classList.add(clase);
  }

  /* ── PAREDES ── */
  var paredes = [];
  var PASO_MS = 2300;

  function iconoCarrito() {
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    [['path', { d: 'M3 4h2.2l2.3 11h10.2l2-8H6.4' }], ['circle', { cx: '9.5', cy: '19', r: '1.5' }], ['circle', { cx: '16.5', cy: '19', r: '1.5' }]].forEach(function (forma) {
      var el = document.createElementNS(NS, forma[0]);
      Object.keys(forma[1]).forEach(function (k) { el.setAttribute(k, forma[1][k]); });
      svg.appendChild(el);
    });
    return svg;
  }

  function crearItem(pared, obra, i, copia) {
    var item = crear('div', 'viva-item' + (obra.estado === 'vendida' ? ' es-vendida' : '') + (copia ? ' es-copia' : ''));
    if (copia) item.setAttribute('aria-hidden', 'true');
    item.dataset.codigo = obra.codigo;
    item.style.setProperty('--orden', Math.min(i, 8));
    item.style.setProperty('--dura', (6 + ((i * 37) % 45) / 10).toFixed(1) + 's');
    item.style.setProperty('--espera', (-((i * 53) % 80) / 10).toFixed(1) + 's');
    item.appendChild(crear('span', 'viva-luz'));

    var abrir = crear('button', 'viva-abrir');
    abrir.type = 'button';
    if (copia) abrir.tabIndex = -1;
    abrir.setAttribute('aria-label', obra.titulo + ', ' + (obra.estado === 'vendida' ? 'vendida, ' : '') + precioCorto(obra) + '. Ver la ficha.');
    var muro = crear('span', 'viva-muro');
    var img = crear('img');
    img.src = ruta(obra.miniatura || obra.imagen);
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    muro.appendChild(img);
    abrir.appendChild(muro);
    if (obra.video) abrir.appendChild(crear('span', 'viva-video'));
    var cedula = crear('span', 'cedula');
    cedula.appendChild(crear('span', 'cedula-titulo', obra.titulo));
    cedula.appendChild(crear('span', 'cedula-dato', obra.tecnica.split(',')[0]));
    cedula.appendChild(crear('span', 'cedula-precio', precioCorto(obra)));
    if (obra.estado === 'vendida' || obra.estado === 'reservada') {
      var est = crear('span');
      est.dataset.base = 'cedula-estado';
      ponerEstado(est, obra);
      cedula.appendChild(est);
    }
    var marca = crear('span', 'cedula-interes');
    marca.hidden = true;
    cedula.appendChild(marca);
    abrir.appendChild(cedula);
    abrir.addEventListener('click', function () { abrirFicha(obra.codigo, abrir, pared.lista); });
    item.appendChild(abrir);

    if (sePuedeAnadir(obra)) {
      var anadir = crear('button', 'viva-anadir');
      anadir.type = 'button';
      if (copia) anadir.tabIndex = -1;
      item.classList.add('con-anadir');
      anadir.appendChild(iconoCarrito());
      anadir.addEventListener('click', function () {
        cambiarCarrito([obra.codigo], elegidas.indexOf(obra.codigo) === -1);
      });
      item.appendChild(anadir);
    }
    return item;
  }

  function pintarBotonesDePared() {
    Array.prototype.forEach.call(document.querySelectorAll('.viva-item'), function (item) {
      var boton = item.querySelector('.viva-anadir');
      var obra = obraPorCodigo(item.dataset.codigo);
      if (!boton || !obra) return;
      var esta = elegidas.indexOf(obra.codigo) !== -1;
      boton.setAttribute('aria-pressed', esta ? 'true' : 'false');
      boton.setAttribute('aria-label', (esta ? 'Quitar ' : 'Añadir ') + obra.titulo + (esta ? ' del carrito' : ' al carrito'));
    });
  }

  function crearPared(ala, indice) {
    var obrasDelAla = T.obras.filter(function (o) { return ala.salas.indexOf(o.sala) !== -1; });
    var pared = {
      ala: ala, lista: obrasDelAla, sala: '', pausada: false, encima: false, visible: false,
      moviendo: false, reloj: 0
    };

    var seccion = crear('section', 'viva');
    seccion.id = 'pared-' + ala.id;
    seccion.setAttribute('aria-labelledby', 'pared-' + ala.id + '-titulo');
    pared.seccion = seccion;

    var cabecera = crear('header', 'viva-cabecera');
    var titulo = crear('h2', null, ala.nombre);
    titulo.id = 'pared-' + ala.id + '-titulo';
    cabecera.appendChild(titulo);

    var filtros = crear('div', 'viva-filtros');
    filtros.setAttribute('role', 'group');
    filtros.setAttribute('aria-label', 'Categorías de ' + ala.nombre);
    function chip(salaId, nombre, cuenta) {
      var b = crear('button', 'chip');
      b.type = 'button';
      b.dataset.sala = salaId;
      b.setAttribute('aria-pressed', salaId === '' ? 'true' : 'false');
      b.appendChild(crear('span', null, nombre));
      b.appendChild(crear('span', 'chip-numero', cuenta));
      b.addEventListener('click', function () { filtrarPared(pared, salaId, false); });
      filtros.appendChild(b);
    }
    chip('', 'Todo', String(obrasDelAla.length));
    ala.salas.forEach(function (salaId) {
      var sala = salaPorId(salaId);
      if (!sala) return;
      var n = obrasDeSala(salaId).length;
      chip(salaId, sala.nombre, n ? String(n) : 'Pronto');
    });
    cabecera.appendChild(filtros);
    pared.filtros = filtros;

    var modo = crear('button', 'viva-modo', 'Ver todas');
    modo.type = 'button';
    modo.setAttribute('aria-pressed', 'false');
    modo.addEventListener('click', function () {
      var enCuadricula = seccion.classList.toggle('en-cuadricula');
      modo.textContent = enCuadricula ? 'Ver en pared' : 'Ver todas';
      modo.setAttribute('aria-pressed', enCuadricula ? 'true' : 'false');
      pista.classList.remove('se-mueve');
      pista.style.transform = '';
      pared.moviendo = false;
      animarCambio(pared);
      window.requestAnimationFrame(function () { medir(pared); programar(pared); });
    });
    cabecera.appendChild(modo);
    pared.modo = modo;
    seccion.appendChild(cabecera);

    var marco = crear('div', 'viva-marco');
    var pista = crear('div', 'viva-pista');
    pared.pista = pista;
    pared.marco = marco;
    marco.appendChild(pista);

    var vacia = crear('div', 'viva-vacia');
    vacia.hidden = true;
    vacia.appendChild(crear('h3', null, 'Esta sala todavía se está montando.'));
    var vaciaTexto = crear('p');
    vacia.appendChild(vaciaTexto);
    var vaciaBoton = crear('a', 'boton boton-claro', 'Encargar por WhatsApp');
    vaciaBoton.target = '_blank';
    vaciaBoton.rel = 'noopener noreferrer';
    vacia.appendChild(vaciaBoton);
    marco.appendChild(vacia);
    pared.vacia = vacia;
    pared.vaciaTexto = vaciaTexto;
    pared.vaciaBoton = vaciaBoton;

    var anterior = crear('button', 'viva-flecha viva-anterior', '‹');
    anterior.type = 'button';
    anterior.setAttribute('aria-label', 'Obra anterior de ' + ala.nombre);
    anterior.addEventListener('click', function () { mover(pared, -1); });
    var siguiente = crear('button', 'viva-flecha viva-siguiente', '›');
    siguiente.type = 'button';
    siguiente.setAttribute('aria-label', 'Obra siguiente de ' + ala.nombre);
    siguiente.addEventListener('click', function () { mover(pared, 1); });
    marco.appendChild(anterior);
    marco.appendChild(siguiente);

    var pausa = crear('button', 'viva-pausa', menosMovimiento ? 'Reanudar' : 'Pausar');
    pausa.type = 'button';
    pared.pausada = menosMovimiento;
    pausa.addEventListener('click', function () {
      pared.pausada = !pared.pausada;
      pausa.textContent = pared.pausada ? 'Reanudar' : 'Pausar';
      programar(pared);
    });
    marco.appendChild(pausa);
    seccion.appendChild(marco);

    marco.addEventListener('pointerenter', function () { pared.encima = true; programar(pared); });
    marco.addEventListener('pointerleave', function () { pared.encima = false; programar(pared); });
    marco.addEventListener('focusin', function (e) {
      var conTeclado = false;
      try { conTeclado = e.target.matches(':focus-visible'); } catch (err) {}
      pared.conFoco = conTeclado;
      var enfocada = conTeclado && e.target.closest ? e.target.closest('.viva-item') : null;
      if (enfocada) traerALaVista(pared, enfocada);
      programar(pared);
    });
    marco.addEventListener('focusout', function () { pared.conFoco = false; programar(pared); });
    var toque = null;
    pista.addEventListener('pointerdown', function (e) {
      toque = e.pointerType === 'touch' ? { x: e.clientX, y: e.clientY } : null;
    });
    pista.addEventListener('pointerup', function (e) {
      if (!toque) return;
      var dx = e.clientX - toque.x, dy = e.clientY - toque.y;
      toque = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        pared.deslizo = true;
        mover(pared, dx < 0 ? 1 : -1);
      }
    });
    pista.addEventListener('click', function (e) {
      if (!pared.deslizo) return;
      pared.deslizo = false;
      e.preventDefault();
      e.stopPropagation();
    }, true);
    pista.addEventListener('transitionend', function (e) {
      if (e.target !== pista || e.propertyName !== 'transform') return;
      terminarPaso(pared);
    });

    pared.desfase = indice * 1100;
    $('paredes').appendChild(seccion);
    paredes.push(pared);
    pintarPista(pared);
    return pared;
  }

  function pintarPista(pared) {
    var pista = pared.pista;
    pista.classList.remove('se-mueve', 'par');
    pista.style.transform = '';
    pared.moviendo = false;
    pared.sentido = 0;
    pared.arreglo = 0;
    pista.textContent = '';
    pared.lista.forEach(function (obra, i) { pista.appendChild(crearItem(pared, obra, i)); });

    var hay = pared.lista.length > 0;
    pista.hidden = !hay;
    pared.vacia.hidden = hay;
    pared.modo.hidden = pared.lista.length < 2;
    if (!hay) {
      var sala = salaPorId(pared.sala);
      var nombre = (sala ? sala.nombre : pared.ala.nombre).toLowerCase();
      pared.vaciaTexto.textContent = 'Aún no hay obras de ' + nombre + ' publicadas. Si tienes una idea, cuéntamela y te envío una propuesta.';
      pared.vaciaBoton.href = enlaceWhatsApp('Hola Andrés, vi tu sala de ventas y quiero encargar un trabajo de ' + nombre + '.');
    }
    pintarBotonesDePared();
    pintarInteres();
    window.requestAnimationFrame(function () { medir(pared); programar(pared); });
  }

  function animarCambio(pared) {
    reanimar(pared.seccion, 'cambia');
    window.clearTimeout(pared.relojCambio);
    pared.relojCambio = window.setTimeout(function () { pared.seccion.classList.remove('cambia'); }, 1200);
  }

  function medir(pared) {
    var pista = pared.pista;
    var n = pared.lista.length;
    var veces = 0;
    if (!pared.seccion.classList.contains('en-cuadricula')) {
      var paso = n ? distancia(pared, pista.firstElementChild) : 0;
      var borde = parseFloat(window.getComputedStyle(pista).paddingLeft) || 0;
      var gap = parseFloat(window.getComputedStyle(pista).columnGap) || 0;
      var ancho = pared.marco.clientWidth;
      var cabe = n * paso - gap + borde * 2 <= ancho + 8;
      pared.seccion.classList.toggle('quieta', cabe || n < 2);
      if (!cabe && n > 1) veces = Math.max(1, Math.ceil((ancho + paso * 3 + gap) / (n * paso)));
    }
    if (veces !== pared.arreglo) ordenar(pared, veces);
  }

  function ordenar(pared, veces) {
    var pista = pared.pista;
    var propias = {};
    pista.classList.remove('se-mueve');
    pista.style.transform = '';
    pared.moviendo = false;
    Array.prototype.slice.call(pista.children).forEach(function (item) {
      if (item.classList.contains('es-copia')) pista.removeChild(item);
      else propias[item.dataset.codigo] = item;
    });
    var fila = pared.lista.map(function (obra) { return propias[obra.codigo]; }).filter(Boolean);
    for (var v = 1; v < veces; v++) {
      pared.lista.forEach(function (obra, i) { fila.push(crearItem(pared, obra, i, true)); });
    }
    var desde = veces ? Math.ceil(fila.length / 2) : 0;
    for (var i = 0; i < fila.length; i++) pista.appendChild(fila[(desde + i) % fila.length]);
    pista.classList.toggle('par', veces > 0 && fila.length % 2 === 0);
    pared.arreglo = veces;
    if (veces > 1) { pintarBotonesDePared(); pintarInteres(); }
  }

  function traerALaVista(pared, item) {
    var pista = pared.pista;
    if (!puedeMoverse(pared)) return;
    if (pared.moviendo) terminarPaso(pared);
    pared.marco.scrollLeft = 0;
    var marco = pared.marco.getBoundingClientRect();
    for (var tope = pista.children.length; tope > 0; tope--) {
      var r = item.getBoundingClientRect();
      if (r.left < marco.left && pista.lastElementChild !== item) pista.insertBefore(pista.lastElementChild, pista.firstElementChild);
      else if (r.right > marco.right && pista.firstElementChild !== item) pista.appendChild(pista.firstElementChild);
      else break;
    }
  }

  function puedeMoverse(pared) {
    return !pared.seccion.classList.contains('quieta') && !pared.seccion.classList.contains('en-cuadricula');
  }

  function distancia(pared, item) {
    var gap = parseFloat(window.getComputedStyle(pared.pista).columnGap) || 0;
    return item.getBoundingClientRect().width + gap;
  }

  function mover(pared, sentido) {
    var pista = pared.pista;
    if (pared.moviendo || !puedeMoverse(pared) || pista.children.length < 2) return;
    pared.moviendo = true;
    pared.sentido = sentido;
    window.clearTimeout(pared.relojPaso);
    pared.relojPaso = window.setTimeout(function () { terminarPaso(pared); }, 1300);

    if (sentido > 0) {
      var paso = distancia(pared, pista.firstElementChild);
      if (menosMovimiento) { terminarPaso(pared); return; }
      pista.classList.add('se-mueve');
      pista.style.transform = 'translateX(' + (-paso).toFixed(1) + 'px)';
    } else {
      var ultimo = pista.lastElementChild;
      pista.insertBefore(ultimo, pista.firstElementChild);
      if (menosMovimiento) { pared.moviendo = false; return; }
      pista.classList.remove('se-mueve');
      pista.style.transform = 'translateX(' + (-distancia(pared, ultimo)).toFixed(1) + 'px)';
      void pista.offsetWidth;
      pista.classList.add('se-mueve');
      pista.style.transform = 'translateX(0px)';
    }
  }

  function terminarPaso(pared) {
    var pista = pared.pista;
    if (!pared.moviendo) return;
    pista.classList.remove('se-mueve');
    if (pared.sentido > 0 && pista.firstElementChild) pista.appendChild(pista.firstElementChild);
    pista.style.transform = '';
    pared.moviendo = false;
  }

  function programar(pared) {
    window.clearTimeout(pared.reloj);
    var quieta = pared.pausada || pared.encima || pared.conFoco || !pared.visible || document.hidden ||
      ficha.open || carrito.open || !puedeMoverse(pared);
    if (quieta) return;
    pared.reloj = window.setTimeout(function () {
      mover(pared, 1);
      programar(pared);
    }, PASO_MS);
  }

  function programarTodas() { paredes.forEach(programar); }

  function filtrarPared(pared, salaId, desplazar) {
    pared.sala = salaId;
    pared.lista = T.obras.filter(function (o) {
      return salaId ? o.sala === salaId : pared.ala.salas.indexOf(o.sala) !== -1;
    });
    Array.prototype.forEach.call(pared.filtros.children, function (b) {
      b.setAttribute('aria-pressed', b.dataset.sala === salaId ? 'true' : 'false');
    });
    pintarPista(pared);
    animarCambio(pared);
    if (desplazar) pared.seccion.scrollIntoView({ behavior: menosMovimiento ? 'auto' : 'smooth', block: 'start' });
  }

  function paredDeSala(salaId) {
    for (var i = 0; i < paredes.length; i++) if (paredes[i].ala.salas.indexOf(salaId) !== -1) return paredes[i];
    return null;
  }

  /* ── FICHA ── */
  var ficha = $('ficha');
  var fichaMedio = $('fichaMedio');
  var fichaVistas = $('fichaVistas');
  var fichaHoja = ficha.querySelector('.ficha-hoja');
  var obraAbierta = null;
  var listaFicha = [];
  var volverA = null;
  var fichaEmpujada = false;
  var cierrePorHistorial = false;

  function ponerMedio(obra, rutaImagen, sinAnimar) {
    fichaMedio.textContent = '';
    if (obra.video && !rutaImagen) {
      var video = crear('video');
      video.controls = true;
      video.preload = 'none';
      video.playsInline = true;
      video.poster = ruta(obra.imagen);
      video.src = ruta(obra.video);
      video.setAttribute('aria-label', 'Video: ' + obra.titulo);
      fichaMedio.appendChild(video);
    } else {
      var img = crear('img');
      img.src = ruta(rutaImagen || obra.imagen);
      img.alt = obra.titulo;
      fichaMedio.appendChild(img);
    }
    if (sinAnimar) fichaMedio.classList.remove('cambia');
    else reanimar(fichaMedio, 'cambia');
  }

  function ponerVistas(obra) {
    fichaVistas.textContent = '';
    var vistas = obra.vistas && obra.vistas.length && !obra.video ? [obra.imagen].concat(obra.vistas) : [];
    fichaVistas.hidden = !vistas.length;
    vistas.forEach(function (v, i) {
      var b = crear('button', 'ficha-vista');
      b.type = 'button';
      b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      b.setAttribute('aria-label', 'Ver imagen ' + (i + 1) + ' de ' + vistas.length);
      var img = crear('img');
      img.src = ruta(v);
      img.alt = '';
      img.loading = 'lazy';
      b.appendChild(img);
      b.addEventListener('click', function () {
        Array.prototype.forEach.call(fichaVistas.children, function (otro) { otro.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        ponerMedio(obra, v);
      });
      fichaVistas.appendChild(b);
    });
  }

  function ponerDatos(obra) {
    var dl = $('fichaDatos');
    dl.textContent = '';
    var sala = salaPorId(obra.sala);
    var ala = alaDeSala(obra.sala);
    var etiquetaMedidas = obra.video ? 'Duración' : (obra.documento ? 'Extensión' : 'Medidas');
    var filas = [
      ['Fecha', fechaLarga(obra.fecha)],
      ['Hecha con', obra.tecnica],
      [etiquetaMedidas, obra.medidas],
      ['Se vende', obra.venta],
      ['Incluye', obra.incluye],
      ['Categoría', [ala ? ala.nombre : '', sala ? sala.nombre : ''].filter(Boolean).join(' / ')]
    ];
    filas.forEach(function (f) {
      if (!f[1]) return;
      dl.appendChild(crear('dt', null, f[0]));
      dl.appendChild(crear('dd', null, f[1]));
    });
  }

  function ponerProyecto(obra) {
    var caja = $('fichaProyecto');
    var proyecto = proyectoDeObra(obra);
    var otras = proyecto ? proyecto.obras.filter(function (o) { return o !== obra; }) : [];
    caja.hidden = !otras.length;
    if (!otras.length) return;

    $('fichaProyectoTitulo').textContent = 'Más del proyecto «' + proyecto.nombre + '»';
    $('fichaProyectoTexto').textContent = proyecto.texto || '';
    $('fichaProyectoTexto').hidden = !proyecto.texto;

    var fila = $('fichaProyectoObras');
    fila.textContent = '';
    otras.forEach(function (o) {
      var b = crear('button', 'ficha-proyecto-obra');
      b.type = 'button';
      var img = crear('img');
      img.src = ruta(o.miniatura || o.imagen);
      img.alt = '';
      img.loading = 'lazy';
      b.appendChild(img);
      b.appendChild(crear('strong', null, o.titulo));
      b.appendChild(crear('span', null, precioCorto(o)));
      b.addEventListener('click', function () {
        listaFicha = proyecto.obras;
        llenarFicha(o);
        ponerHash('obra/' + o.codigo, false);
        $('fichaTitulo').focus({ preventScroll: true });
      });
      fila.appendChild(b);
    });
    pintarBotonProyecto();
  }

  function pintarBotonProyecto() {
    var b = $('fichaProyectoAlCarrito');
    var proyecto = obraAbierta ? proyectoDeObra(obraAbierta) : null;
    var obras = proyecto ? proyecto.obras.filter(sePuedeAnadir) : [];
    if (obras.length < 2) { b.hidden = true; return; }
    var faltan = obras.filter(function (o) { return elegidas.indexOf(o.codigo) === -1; });
    b.hidden = false;
    b.disabled = !faltan.length;
    b.textContent = faltan.length ? 'Añadir todo el proyecto al carrito' : 'Proyecto en el carrito';
  }

  function llenarFicha(obra, sinAnimar) {
    obraAbierta = obra;
    ponerMedio(obra, null, sinAnimar);
    ponerVistas(obra);

    $('fichaCodigo').textContent = obra.codigo;
    var est = $('fichaEstado');
    est.dataset.base = 'ficha-estado';
    ponerEstado(est, obra);
    $('fichaTitulo').textContent = obra.titulo;
    ponerDatos(obra);
    $('fichaHistoria').textContent = obra.historia || '';

    var doc = $('fichaDocumento');
    doc.hidden = !obra.documento;
    if (obra.documento) doc.href = ruta(obra.documento);

    var precio = $('fichaPrecio');
    precio.textContent = '';
    if (typeof obra.precio === 'number') {
      precio.appendChild(crear('small', null, obra.desde ? 'Precio desde' : (obra.estado === 'vendida' ? 'Se vendió en' : 'Precio')));
      precio.appendChild(document.createTextNode('$ ' + miles(obra.precio) + ' COP'));
    } else {
      precio.textContent = 'Precio a convenir';
    }

    var comprar = $('fichaComprar');
    comprar.textContent = textoBotonCompra(obra);
    comprar.href = enlaceWhatsApp(mensajeDeObra(obra));
    $('fichaCorreo').href = enlaceCorreo('Consulta por «' + obra.titulo + '» (' + obra.codigo + ')', mensajeDeObra(obra) + '\n\n');
    $('fichaNota').textContent = 'La disponibilidad, el pago y la entrega se confirman por WhatsApp.';

    pintarBotonCarrito();
    ponerProyecto(obra);
    pintarInteres();

    var varias = listaFicha.length > 1 && listaFicha.indexOf(obra) !== -1;
    $('fichaAnterior').hidden = !varias;
    $('fichaSiguiente').hidden = !varias;

    if (sinAnimar) fichaHoja.classList.remove('cambia');
    else reanimar(fichaHoja, 'cambia');
    fichaHoja.scrollTop = 0;
    ficha.scrollTop = 0;
  }

  function abrirFicha(codigo, origen, lista) {
    if (esperandoAtras) {
      enCola.push(function () { abrirFicha(codigo, origen, lista); });
      return;
    }
    var obra = obraPorCodigo(codigo);
    if (!obra) return;
    volverA = origen || null;
    if (lista && lista.indexOf(obra) !== -1) listaFicha = lista;
    else {
      var proyecto = proyectoDeObra(obra);
      listaFicha = proyecto ? proyecto.obras : [obra];
    }
    if (!ficha.open) {
      if (carrito.open) carrito.close();
      cierrePorHistorial = false;
      fichaEmpujada = !aplicandoHistorial;
      ponerHash('obra/' + obra.codigo, true);
      ficha.showModal();
      programarTodas();
    }
    llenarFicha(obra);
    $('fichaTitulo').focus({ preventScroll: true });
  }

  function pasarFicha(sentido, conTeclado) {
    var i = listaFicha.indexOf(obraAbierta);
    if (listaFicha.length < 2 || i === -1) return;
    llenarFicha(listaFicha[(i + sentido + listaFicha.length) % listaFicha.length], conTeclado);
    ponerHash('obra/' + obraAbierta.codigo, false);
  }

  $('fichaAnterior').addEventListener('click', function () { pasarFicha(-1); });
  $('fichaSiguiente').addEventListener('click', function () { pasarFicha(1); });
  $('fichaCerrar').addEventListener('click', function () { ficha.close(); });
  $('fichaComprar').addEventListener('click', function () {
    if (obraAbierta) registrar(textoBotonCompra(obraAbierta), [obraAbierta], precioCorto(obraAbierta));
  });
  ficha.addEventListener('click', function (e) { if (e.target === ficha) ficha.close(); });
  ficha.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'VIDEO') return;
    if (e.key === 'ArrowRight') pasarFicha(1, true);
    if (e.key === 'ArrowLeft') pasarFicha(-1, true);
  });
  ficha.addEventListener('close', function () {
    if (ficha.open) return;
    fichaMedio.textContent = '';
    obraAbierta = null;
    if (aviso.parentNode === ficha) { aviso.hidden = true; document.body.appendChild(aviso); }
    if (cierrePorHistorial) cierrePorHistorial = false;
    else if (fichaEmpujada) {
      esperandoAtras = true;
      history.back();
      window.setTimeout(function () { if (esperandoAtras) vaciarCola(); }, 700);
    } else ponerHash('', false);
    fichaEmpujada = false;
    programarTodas();
    if (volverA && document.body.contains(volverA)) volverA.focus({ preventScroll: true });
  });

  /* ── CARRITO ── */
  var carrito = $('carrito');
  var contador = $('contadorCarrito');
  var aviso = $('avisoCarrito');
  var elegidas = leerCarrito();
  var totalMostrado = 0;
  var relojAviso = 0;

  function leerCarrito() {
    try {
      var guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || '[]');
      if (!Array.isArray(guardado)) return [];
      return guardado.filter(function (c, i) {
        return typeof c === 'string' && obraPorCodigo(c) && obraPorCodigo(c).estado !== 'vendida' && guardado.indexOf(c) === i;
      });
    } catch (err) { return []; }
  }

  function guardarCarrito() {
    try { localStorage.setItem(CLAVE_CARRITO, JSON.stringify(elegidas)); } catch (err) {}
  }

  function sePuedeAnadir(obra) { return obra.estado !== 'vendida'; }

  function resumenCarrito() {
    var total = 0, hayDesde = false;
    elegidas.forEach(function (codigo) {
      var obra = obraPorCodigo(codigo);
      if (!obra) return;
      if (typeof obra.precio === 'number') total += obra.precio;
      if (obra.desde || typeof obra.precio !== 'number') hayDesde = true;
    });
    return { total: total, hayDesde: hayDesde, texto: (hayDesde ? 'Desde ' : '') + '$ ' + miles(total) };
  }

  function animarTotal(el, hasta, prefijo) {
    var desde = totalMostrado;
    totalMostrado = hasta;
    if (menosMovimiento || desde === hasta) { el.textContent = prefijo + '$ ' + miles(hasta); return; }
    var inicio = null;
    function paso(t) {
      if (inicio === null) inicio = t;
      var avance = Math.min(1, (t - inicio) / 450);
      var suave = 1 - Math.pow(1 - avance, 3);
      el.textContent = prefijo + '$ ' + miles(desde + (hasta - desde) * suave);
      if (avance < 1 && totalMostrado === hasta) window.requestAnimationFrame(paso);
      else if (totalMostrado === hasta) el.textContent = prefijo + '$ ' + miles(hasta);
    }
    window.requestAnimationFrame(paso);
  }

  function pintarBotonCarrito() {
    var b = $('fichaAlCarrito');
    if (!obraAbierta) return;
    b.hidden = !sePuedeAnadir(obraAbierta);
    var esta = elegidas.indexOf(obraAbierta.codigo) !== -1;
    b.textContent = esta ? 'Quitar del carrito' : 'Añadir al carrito';
    b.setAttribute('aria-pressed', esta ? 'true' : 'false');
  }

  function pintarCarrito() {
    contador.textContent = String(elegidas.length);

    var lista = $('carritoLista');
    lista.textContent = '';
    var renglones = [];

    elegidas.forEach(function (codigo, i) {
      var obra = obraPorCodigo(codigo);
      if (!obra) return;
      renglones.push((i + 1) + '. «' + obra.titulo + '» (' + obra.codigo + '): ' + precioCorto(obra).toLowerCase());

      var li = crear('li', 'carrito-item');
      li.style.setProperty('--orden', i);
      var img = crear('img');
      img.src = ruta(obra.miniatura || obra.imagen);
      img.alt = '';
      li.appendChild(img);

      var datos = crear('div');
      var titulo = crear('button', 'carrito-item-titulo', obra.titulo);
      titulo.type = 'button';
      titulo.addEventListener('click', function () { abrirFicha(obra.codigo, $('abrirCarrito')); });
      datos.appendChild(titulo);
      datos.appendChild(crear('span', 'carrito-item-codigo', obra.codigo + ' '));
      datos.appendChild(crear('span', 'carrito-item-precio', precioCorto(obra)));
      li.appendChild(datos);

      var quitar = crear('button', 'carrito-quitar', 'Quitar');
      quitar.type = 'button';
      quitar.setAttribute('aria-label', 'Quitar ' + obra.titulo + ' del carrito');
      quitar.addEventListener('click', function () { cambiarCarrito([obra.codigo], false); });
      li.appendChild(quitar);

      lista.appendChild(li);
    });

    var resumen = resumenCarrito();
    var hay = elegidas.length > 0;
    $('carritoVacia').hidden = hay;
    $('carritoPie').hidden = !hay;
    $('carritoCuenta').textContent = plural(elegidas.length, 'obra en el carrito', 'obras en el carrito');
    animarTotal($('carritoTotal'), resumen.total, resumen.hayDesde ? 'Desde ' : '');
    $('carritoEnviar').href = enlaceWhatsApp(
      'Hola Andrés, quiero pedir estas obras de tu sala de ventas:\n' + renglones.join('\n') +
      '\nTotal: ' + resumen.texto.toLowerCase() + ' COP. ¿Siguen disponibles?'
    );
  }

  function mostrarAviso(texto) {
    $('avisoCarritoTexto').textContent = texto;
    var casa = ficha.open ? ficha : document.body;
    if (aviso.parentNode !== casa) casa.appendChild(aviso);
    aviso.hidden = false;
    reanimar(aviso, 'entra');
    window.clearTimeout(relojAviso);
    relojAviso = window.setTimeout(function () { aviso.hidden = true; }, 5000);
  }

  function cambiarCarrito(codigos, anadir) {
    var cambiadas = [];
    codigos.forEach(function (codigo) {
      var obra = obraPorCodigo(codigo);
      var i = elegidas.indexOf(codigo);
      if (anadir && i === -1 && obra && sePuedeAnadir(obra)) { elegidas.push(codigo); cambiadas.push(obra); }
      if (!anadir && i !== -1) { elegidas.splice(i, 1); cambiadas.push(obra); }
    });
    if (!cambiadas.length) return;

    guardarCarrito();
    pintarCarrito();
    pintarBotonCarrito();
    pintarBotonProyecto();
    pintarBotonesDePared();
    reanimar(contador, 'late');

    var que = cambiadas.length === 1 ? '«' + cambiadas[0].titulo + '»' : plural(cambiadas.length, 'obra', 'obras');
    var total = resumenCarrito().texto;
    if (anadir) mostrarAviso(que + (cambiadas.length === 1 ? ' se añadió' : ' se añadieron') + ' al carrito. Total: ' + total);
    else if (!carrito.open) mostrarAviso(que + (cambiadas.length === 1 ? ' se quitó' : ' se quitaron') + ' del carrito. Total: ' + total);
  }

  $('fichaAlCarrito').addEventListener('click', function () {
    if (!obraAbierta) return;
    cambiarCarrito([obraAbierta.codigo], elegidas.indexOf(obraAbierta.codigo) === -1);
  });
  $('fichaProyectoAlCarrito').addEventListener('click', function () {
    var proyecto = obraAbierta ? proyectoDeObra(obraAbierta) : null;
    if (proyecto) cambiarCarrito(proyecto.obras.map(function (o) { return o.codigo; }), true);
  });
  $('abrirCarrito').addEventListener('click', function () { aviso.hidden = true; carrito.showModal(); programarTodas(); });
  $('avisoCarritoVer').addEventListener('click', function () {
    aviso.hidden = true;
    if (ficha.open) ficha.close();
    carrito.showModal();
    programarTodas();
  });
  aviso.addEventListener('pointerenter', function () { window.clearTimeout(relojAviso); });
  aviso.addEventListener('pointerleave', function () { relojAviso = window.setTimeout(function () { aviso.hidden = true; }, 2500); });
  $('carritoCerrar').addEventListener('click', function () { carrito.close(); });
  carrito.addEventListener('click', function (e) { if (e.target === carrito) carrito.close(); });
  carrito.addEventListener('close', programarTodas);
  $('carritoVaciar').addEventListener('click', function () { cambiarCarrito(elegidas.slice(), false); });
  $('carritoEnviar').addEventListener('click', function () {
    registrar('Pedido del carrito', elegidas.map(obraPorCodigo).filter(Boolean), resumenCarrito().texto);
  });
  totalMostrado = resumenCarrito().total;
  pintarCarrito();

  /* ── MONTAJE DE LAS PAREDES ── */
  T.alas.forEach(crearPared);

  if ('IntersectionObserver' in window) {
    var vigia = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        paredes.forEach(function (pared) {
          if (pared.seccion !== e.target) return;
          pared.visible = e.isIntersecting;
          if (e.isIntersecting && !pared.encendida) {
            pared.encendida = true;
            pared.seccion.classList.add('enciende');
            window.setTimeout(function () { pared.seccion.classList.remove('enciende'); }, 2600);
          }
          window.clearTimeout(pared.reloj);
          if (e.isIntersecting) pared.reloj = window.setTimeout(function () { programar(pared); }, pared.desfase);
        });
      });
    }, { threshold: 0.2 });
    paredes.forEach(function (pared) { vigia.observe(pared.seccion); });
  } else {
    paredes.forEach(function (pared) { pared.visible = true; programar(pared); });
  }

  document.addEventListener('visibilitychange', programarTodas);

  pedirInteres();
  window.setInterval(pedirInteres, 180000);
  window.addEventListener('resize', function () {
    paredes.forEach(function (pared) { medir(pared); programar(pared); });
  });

  /* ── APARICIÓN AL DESPLAZAR ── */
  Array.prototype.forEach.call(document.querySelectorAll('.compra-pasos li'), function (li, i) {
    li.classList.add('al-entrar');
    li.style.setProperty('--orden', i);
  });
  var porEntrar = document.querySelectorAll('.al-entrar');
  if ('IntersectionObserver' in window && !menosMovimiento) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('a-la-vista');
        observador.unobserve(entrada.target);
      });
    }, { threshold: 0.15 });
    Array.prototype.forEach.call(porEntrar, function (el) { observador.observe(el); });
  } else {
    Array.prototype.forEach.call(porEntrar, function (el) { el.classList.add('a-la-vista'); });
  }

  /* ── ENLACE DIRECTO Y BOTÓN ATRÁS ── */
  function aplicarHash(alCargar) {
    var partes = location.hash.replace(/^#/, '').split('/').map(function (p) {
      try { return decodeURIComponent(p); } catch (err) { return ''; }
    });

    if (partes[0] === 'obra' && obraPorCodigo(partes[1])) {
      var obra = obraPorCodigo(partes[1]);
      var deLaObra = paredDeSala(obra.sala);
      abrirFicha(obra.codigo, null, deLaObra ? deLaObra.lista : null);
      return;
    }

    if (ficha.open) {
      cierrePorHistorial = true;
      ficha.close();
    }

    if (alCargar && partes[0] === 'sala' && salaPorId(partes[1])) {
      var pared = paredDeSala(partes[1]);
      if (pared) filtrarPared(pared, partes[1], true);
    }
  }

  function desdeHistorial(alCargar) {
    aplicandoHistorial = true;
    try { aplicarHash(alCargar); } finally { aplicandoHistorial = false; }
  }

  desdeHistorial(true);
  window.addEventListener('popstate', function () {
    var habiaCola = esperandoAtras;
    esperandoAtras = false;
    desdeHistorial(false);
    if (habiaCola) vaciarCola();
  });
})();
