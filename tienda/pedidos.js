/* Andrés Caicedo — Sala de ventas: listado de pedidos */
(function () {
  'use strict';

  var T = window.TIENDA;
  var estado = document.getElementById('pedidosEstado');
  if (!T || !T.registro || !T.registro.hoja) {
    estado.textContent = 'El registro de pedidos no está configurado en tienda/obras.js.';
    return;
  }

  function crear(etiqueta, clase, texto) {
    var el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined && texto !== null) el.textContent = texto;
    return el;
  }

  function obraPorCodigo(codigo) {
    for (var i = 0; i < T.obras.length; i++) if (T.obras[i].codigo === codigo) return T.obras[i];
    return null;
  }

  function celda(fila, i) {
    var c = fila.c && fila.c[i];
    return c && c.v != null ? String(c.v).trim() : '';
  }

  function fecha(fila) {
    var c = fila.c && fila.c[0];
    if (!c) return { texto: '', orden: 0 };
    var m = /Date\((\d+),(\d+),(\d+)(?:,(\d+),(\d+),(\d+))?\)/.exec(String(c.v));
    var orden = m ? new Date(+m[1], +m[2], +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)).getTime() : 0;
    return { texto: c.f || String(c.v || ''), orden: orden };
  }

  /* ── PINTAR ── */
  function pintar(filas) {
    var pedidos = [];
    filas.forEach(function (fila) {
      if (celda(fila, 1).toLowerCase() !== 'compra') return;
      var partes = celda(fila, 3).split('|').map(function (p) { return p.trim(); });
      var f = fecha(fila);
      var repite = partes.indexOf('repite') !== -1;
      pedidos.push({ fecha: f.texto, orden: f.orden, boton: celda(fila, 2) + (repite ? ' (repite)' : ''), codigos: partes[0] || '', titulo: partes[1] || '', precio: partes[2] || '' });
    });
    pedidos.sort(function (a, b) { return b.orden - a.orden; });

    if (!pedidos.length) {
      estado.textContent = 'Todavía nadie ha tocado un botón de compra.';
      return;
    }

    var cuerpo = document.getElementById('pedidosCuerpo');
    var cuenta = {};
    pedidos.forEach(function (p) {
      var codigos = p.codigos.split(',').map(function (c) { return c.trim(); }).filter(Boolean);
      var obra = codigos.length === 1 ? obraPorCodigo(codigos[0]) : null;
      codigos.forEach(function (c) { cuenta[c] = (cuenta[c] || 0) + 1; });

      var tr = crear('tr');
      tr.appendChild(crear('td', 'pedidos-fecha', p.fecha));
      tr.appendChild(crear('td', null, p.boton));

      var tdObra = crear('td');
      var caja = crear('div', 'pedidos-obra');
      if (obra) {
        var img = crear('img');
        img.src = encodeURI(obra.miniatura || obra.imagen);
        img.alt = '';
        img.loading = 'lazy';
        caja.appendChild(img);
      }
      var textos = crear('div');
      if (codigos.length > 1) {
        textos.appendChild(crear('strong', null, codigos.length + ' obras del carrito'));
        textos.appendChild(crear('span', null, codigos.map(function (c) {
          var o = obraPorCodigo(c);
          return o ? o.titulo + ' (' + c + ')' : c;
        }).join(', ')));
      } else {
        textos.appendChild(crear('strong', null, obra ? obra.titulo : (p.titulo || p.codigos)));
        textos.appendChild(crear('span', null, p.codigos));
      }
      caja.appendChild(textos);
      tdObra.appendChild(caja);
      tr.appendChild(tdObra);

      tr.appendChild(crear('td', 'pedidos-precio', codigos.length > 1 ? p.titulo.replace(/^total\s*/i, '') : p.precio));
      cuerpo.appendChild(tr);
    });

    var codigosVistos = Object.keys(cuenta);
    var favorita = codigosVistos.sort(function (a, b) { return cuenta[b] - cuenta[a]; })[0];
    var obraFavorita = obraPorCodigo(favorita);
    document.getElementById('pedidosTotal').textContent = String(pedidos.length);
    document.getElementById('pedidosObras').textContent = String(codigosVistos.length);
    document.getElementById('pedidosFavorita').textContent = obraFavorita ? obraFavorita.titulo : favorita;

    estado.hidden = true;
    document.getElementById('pedidosResumen').hidden = false;
    document.getElementById('pedidosMarco').hidden = false;
  }

  /* ── LEER LA HOJA ── */
  var espera = window.setTimeout(function () {
    estado.textContent = 'No se pudo leer la hoja de Google. Revisa la conexión a internet y vuelve a cargar la página.';
  }, 12000);

  window.pedidosRespuesta = function (datos) {
    window.clearTimeout(espera);
    try {
      pintar((datos && datos.table && datos.table.rows) || []);
    } catch (err) {
      estado.textContent = 'La hoja respondió, pero no se pudo leer el listado.';
    }
  };

  var guion = document.createElement('script');
  guion.src = 'https://docs.google.com/spreadsheets/d/' + encodeURIComponent(T.registro.hoja) +
    '/gviz/tq?tqx=out:json;responseHandler:pedidosRespuesta&gid=' + encodeURIComponent(T.registro.pestana || '0');
  guion.onerror = function () {
    window.clearTimeout(espera);
    estado.textContent = 'No se pudo leer la hoja de Google. Revisa la conexión a internet y vuelve a cargar la página.';
  };
  document.head.appendChild(guion);
})();
