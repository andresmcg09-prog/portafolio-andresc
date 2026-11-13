/* Andrés Caicedo — Sala de ventas: datos de las obras */
window.TIENDA = {

  /* Cambia a false cuando los precios, fechas y medidas ya sean los reales */
  datosDeMuestra: true,

  whatsapp: '573227379954',
  correo: 'andrescproductions323@gmail.com',
  instagram: 'andresc_productions',

  /* Cada clic en comprar se guarda en la hoja de Google del portafolio y cuenta como interesado durante horasDeInteres */
  registro: {
    formulario: 'https://docs.google.com/forms/d/e/1FAIpQLSerWAn11LTx9j3BADKB469zZdW0bHbINE1cUwPfcvkxxMyZIA/formResponse',
    hoja: '13bt5kGAiKarF7sLk2Rc3UJb_WWzm550zAcsKCZ33Mug',
    pestana: '659572640',
    campoTipo: 'entry.1433213946',
    campoNombre: 'entry.1893872878',
    campoDetalle: 'entry.911016473',
    horasDeInteres: 12,
    horaDeLaHoja: -5
  },

  /* ── ALAS ── */
  alas: [
    { id: 'audiovisual', nombre: 'Audiovisual', salas: ['video', 'fotografia', 'guiones'] },
    { id: 'diseno', nombre: 'Diseño', salas: ['arte-digital', 'identidad-visual'] },
    { id: 'arte-plastico', nombre: 'Arte plástico', salas: ['pintura', 'murales'] }
  ],

  /* ── SALAS ── */
  salas: [
    { id: 'video', nombre: 'Video', texto: 'Cortos, animaciones y piezas en movimiento. Se venden como licencia de uso o se producen por encargo.' },
    { id: 'fotografia', nombre: 'Fotografía', texto: 'Retratos, calle y naturaleza. Cada foto se entrega impresa, numerada y firmada.' },
    { id: 'arte-digital', nombre: 'Arte digital', texto: 'Ilustración, personajes y piezas gráficas hechas en pantalla.' },
    { id: 'pintura', nombre: 'Pintura', texto: 'Obras originales pintadas a mano. De cada una existe una sola pieza.' },
    { id: 'murales', nombre: 'Murales', texto: 'Pintura de gran formato sobre pared, hecha en el lugar.' },
    { id: 'guiones', nombre: 'Guiones', texto: 'Historias escritas para cortometraje y piezas audiovisuales.' },
    { id: 'identidad-visual', nombre: 'Identidad visual', texto: 'Logotipos, paletas y manuales de marca completos.' }
  ],

  /* ── PROYECTOS ── texto que se muestra al abrir cada proyecto */
  proyectos: [
    { sala: 'pintura', nombre: 'Paisajes', texto: 'Mar y campo pintados al óleo.' },
    { sala: 'pintura', nombre: 'Animales', texto: 'Dos animales, dos formas de usar el color.' },
    { sala: 'pintura', nombre: 'Objetos', texto: 'Cosas pequeñas vistas muy de cerca.' },
    { sala: 'pintura', nombre: 'Frutas', texto: 'Cuatro estudios de fruta: volumen, luz y pincelada.' },
    { sala: 'pintura', nombre: 'Un bocado no hace daño', texto: 'Serie de tres pinturas sobre la comida chatarra, expuesta en noviembre de 2024.' },
    { sala: 'fotografia', nombre: 'Animales', texto: 'Aves, gatos y ganado, fotografiados de cerca.' },
    { sala: 'fotografia', nombre: 'Retratos', texto: 'Retratos posados con luz natural.' },
    { sala: 'fotografia', nombre: 'Calle', texto: 'Gente en su día a día, sin posar.' },
    { sala: 'fotografia', nombre: 'Naturaleza', texto: 'Plantas, flores y caminos.' },
    { sala: 'video', nombre: 'Videos', texto: 'Piezas grabadas y editadas.' },
    { sala: 'video', nombre: 'Animación', texto: 'Animación digital y 2D.' },
    { sala: 'arte-digital', nombre: 'Pintura digital', texto: 'Ilustraciones pintadas en pantalla.' },
    { sala: 'arte-digital', nombre: 'Personaje: Mapache', texto: 'El desarrollo de un personaje: vistas, color y vestuario.' },
    { sala: 'arte-digital', nombre: 'Piezas publicitarias', texto: 'Afiches y publicaciones para marcas y eventos.' }
  ],

  /* ── OBRAS ──
     estado: 'disponible' | 'reservada' | 'vendida' | 'encargo'
     precio: número en pesos, o null si es a convenir · desde: true muestra "Desde" */
  obras: [

    /* ── PINTURA ── */
    {
      codigo: 'P-01', sala: 'pintura', proyecto: 'Paisajes', titulo: 'Barco',
      fecha: '2024', tecnica: 'Óleo sobre lienzo', medidas: '30 × 40 cm',
      venta: 'Obra original, pieza única', incluye: 'Certificado de autenticidad firmado',
      precio: 200000, estado: 'disponible',
      historia: 'Un velero de velas naranjas rompe una ola en un mar azul profundo mientras tres aves cruzan el cielo. El contraste entre el naranja y el azul es lo que sostiene toda la escena.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Barco.jpeg',
      miniatura: 'tienda/miniaturas/P-01.jpg'
    },
    {
      codigo: 'P-02', sala: 'pintura', proyecto: 'Paisajes', titulo: 'Bosque',
      fecha: '2024', tecnica: 'Óleo sobre lienzo', medidas: '40 × 30 cm',
      venta: 'Obra original, pieza única', incluye: 'Certificado de autenticidad firmado',
      precio: 190000, estado: 'disponible',
      historia: 'Dos árboles de copa ancha sobre un prado crecido, pintados con pinceladas cortas y cargadas. Es un paisaje de luz de mediodía, hecho a base de verdes.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Bosque.jpeg',
      miniatura: 'tienda/miniaturas/P-02.jpg'
    },
    {
      codigo: 'P-03', sala: 'pintura', proyecto: 'Animales', titulo: 'Caballo',
      fecha: '2024', tecnica: 'Óleo con espátula sobre lienzo, enmarcado', medidas: '50 × 70 cm con marco',
      venta: 'Obra original, pieza única', incluye: 'Marco de madera y certificado de autenticidad firmado',
      precio: 200000, estado: 'vendida',
      historia: 'La cabeza de un caballo sale de un fondo amarillo y rojo, con la crin hecha de trazos de espátula en todos los colores. Es la pintura con más movimiento de la sala.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Caballo.jpeg',
      miniatura: 'tienda/miniaturas/P-03.jpg'
    },
    {
      codigo: 'P-04', sala: 'pintura', proyecto: 'Objetos', titulo: 'Carro',
      fecha: '2024', tecnica: 'Acrílico sobre lienzo', medidas: '35 × 50 cm',
      venta: 'Obra original, pieza única', incluye: 'Certificado de autenticidad firmado',
      precio: 230000, estado: 'disponible',
      historia: 'El frente de un deportivo amarillo visto muy de cerca, recortado contra un azul eléctrico. El encuadre deja por fuera casi todo el carro y se queda con las luces.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Carro.jpeg',
      miniatura: 'tienda/miniaturas/P-04.jpg'
    },
    {
      codigo: 'P-05', sala: 'pintura', proyecto: 'Objetos', titulo: 'Fósforo',
      fecha: '2024', tecnica: 'Acrílico sobre lienzo', medidas: '30 × 40 cm',
      venta: 'Obra original, pieza única', incluye: 'Certificado de autenticidad firmado',
      precio: 180000, estado: 'disponible',
      historia: 'Un fósforo recién encendido sobre fondo gris. La llama sube en naranja y azul y ocupa más espacio que el propio fósforo.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Fosforo.jpeg',
      miniatura: 'tienda/miniaturas/P-05.jpg'
    },
    {
      codigo: 'P-06', sala: 'pintura', proyecto: 'Animales', titulo: 'Lobo',
      fecha: '2024', tecnica: 'Acrílico sobre lienzo', medidas: '50 × 32 cm',
      venta: 'Obra original, pieza única', incluye: 'Certificado de autenticidad firmado',
      precio: 100000, estado: 'vendida',
      historia: 'Un lobo de perfil divide el cuadro en dos: a un lado la oscuridad con pintura que gotea, al otro un mosaico de pinceladas cálidas.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Lobo.jpeg',
      miniatura: 'tienda/miniaturas/P-06.jpg'
    },
    {
      codigo: 'P-07', sala: 'pintura', proyecto: 'Frutas', titulo: 'Manzana',
      fecha: '2023', tecnica: 'Vinilo sobre cartón', medidas: '25 × 35 cm',
      venta: 'Obra original, pieza única', incluye: 'Certificado de autenticidad firmado',
      precio: 90000, estado: 'disponible',
      historia: 'Una manzana sola sobre una superficie ocre, con un cielo de nubes detrás. Estudio de volumen y de sombra proyectada.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Manzana.jpeg',
      miniatura: 'tienda/miniaturas/P-07.jpg'
    },
    {
      codigo: 'P-08', sala: 'pintura', proyecto: 'Frutas', titulo: 'Naranja',
      fecha: '2023', tecnica: 'Vinilo sobre cartón', medidas: '35 × 27 cm',
      venta: 'Obra original, pieza única', incluye: 'Certificado de autenticidad firmado',
      precio: 110000, estado: 'disponible',
      historia: 'Rodajas de naranja llenan todo el cuadro, con hojas verdes entre los cortes. Funciona como un patrón: no hay centro ni fondo.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Naranja.jpeg',
      miniatura: 'tienda/miniaturas/P-08.jpg'
    },
    {
      codigo: 'P-09', sala: 'pintura', proyecto: 'Frutas', titulo: 'Pera',
      fecha: '2023', tecnica: 'Vinilo sobre cartón', medidas: '28 × 35 cm',
      venta: 'Obra original, pieza única', incluye: 'Certificado de autenticidad firmado',
      precio: 90000, estado: 'disponible',
      historia: 'Una pera verde sobre fondo durazno. El trabajo está en la pincelada que gira alrededor de la fruta para darle peso.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Pera.jpeg',
      miniatura: 'tienda/miniaturas/P-09.jpg'
    },
    {
      codigo: 'P-10', sala: 'pintura', proyecto: 'Frutas', titulo: 'Piña',
      fecha: '2023', tecnica: 'Vinilo sobre cartón', medidas: '25 × 35 cm',
      venta: 'Obra original, pieza única', incluye: 'Certificado de autenticidad firmado',
      precio: 95000, estado: 'disponible',
      historia: 'Una piña de pie, construida rombo por rombo en amarillos y verdes sobre un fondo cálido.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Piña.jpeg',
      miniatura: 'tienda/miniaturas/P-10.jpg'
    },
    {
      codigo: 'P-11', sala: 'pintura', proyecto: 'Un bocado no hace daño', titulo: 'Un bocado no hace daño I',
      fecha: '2024', tecnica: 'Técnica mixta sobre lienzo', medidas: '50 × 70 cm',
      venta: 'Obra original, pieza única', incluye: 'Certificado de autenticidad firmado',
      precio: 200000, estado: 'vendida',
      historia: 'Proyecto final 11, 2024. Primera pieza de la serie sobre la comida chatarra. Un rostro de perfil deja caer de la boca una cascada de pintura de colores que termina cubriendo la parte baja del lienzo.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/pintura_01.jpg',
      miniatura: 'tienda/miniaturas/P-11.jpg',
      vistas: ['img/proyectos.md/Arteplastico/Pintura/pintura_04.jpg']
    },
    {
      codigo: 'P-12', sala: 'pintura', proyecto: 'Un bocado no hace daño', titulo: 'Un bocado no hace daño II',
      fecha: '2024-11', tecnica: 'Técnica mixta sobre lienzo, con maqueta de comida', medidas: '50 × 70 cm',
      venta: 'Obra original, pieza única', incluye: 'Certificado de autenticidad firmado',
      precio: 380000, estado: 'disponible',
      historia: 'Segunda pieza de la serie. Una figura con expresión de angustia mira hacia el frente; delante del cuadro, sobre la mesa, hay una maqueta con comida chatarra que completa la obra.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/pintura_02.jpg',
      miniatura: 'tienda/miniaturas/P-12.jpg',
      vistas: ['img/proyectos.md/Arteplastico/Pintura/pintura_04.jpg']
    },
    {
      codigo: 'P-13', sala: 'pintura', proyecto: 'Un bocado no hace daño', titulo: 'Un bocado no hace daño III',
      fecha: '2024-11', tecnica: 'Técnica mixta sobre lienzo', medidas: '50 × 70 cm',
      venta: 'Obra original, pieza única', incluye: 'Certificado de autenticidad firmado',
      precio: 350000, estado: 'disponible',
      historia: 'Tercera pieza de la serie. Un torso de frente con la pintura cayendo desde la boca hasta acumularse en la base, como si el color fuera lo que se comió.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/pintura_03.jpg',
      miniatura: 'tienda/miniaturas/P-13.jpg',
      vistas: ['img/proyectos.md/Arteplastico/Pintura/pintura_04.jpg']
    },

    /* ── FOTOGRAFÍA ── */
    {
      codigo: 'F-01', sala: 'fotografia', proyecto: 'Animales', titulo: 'Pava real',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 30 × 45 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 85000, estado: 'disponible',
      historia: 'Una pava real de perfil, con el cuello verde y la cresta contra el follaje desenfocado. Es la foto que abre la galería de fotografía del portafolio.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/Principal.jpg',
      miniatura: 'tienda/miniaturas/F-01.jpg'
    },
    {
      codigo: 'F-02', sala: 'fotografia', proyecto: 'Calle', titulo: 'El candado',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 40 × 30 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 85000, estado: 'disponible',
      historia: 'Un señor mayor cierra la reja blanca de su casa. Todo el encuadre es blanco menos él, y por eso la mirada cae en sus manos.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/1.1.jpg',
      miniatura: 'tienda/miniaturas/F-02.jpg'
    },
    {
      codigo: 'F-03', sala: 'fotografia', proyecto: 'Animales', titulo: 'Pájaro en la baranda',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 30 × 45 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 80000, estado: 'disponible',
      historia: 'Un pájaro negro de cola larga posado en un tubo, con el fondo fundido en verde y turquesa.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/1.2.jpg',
      miniatura: 'tienda/miniaturas/F-03.jpg'
    },
    {
      codigo: 'F-04', sala: 'fotografia', proyecto: 'Retratos', titulo: 'Dos en el mirador',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 30 × 40 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 80000, estado: 'disponible',
      historia: 'Retrato de una pareja abrazada en un mirador, con un cielo cargado detrás. Retrato posado con luz natural.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/1.3.jpg',
      miniatura: 'tienda/miniaturas/F-04.jpg'
    },
    {
      codigo: 'F-05', sala: 'fotografia', proyecto: 'Retratos', titulo: 'Retrato urbano',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 25 × 50 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 80000, estado: 'disponible',
      historia: 'Retrato de cuerpo entero, vestuario negro, mirada hacia arriba y fuera del cuadro. Sesión de moda en exteriores.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/1.4.jpg',
      miniatura: 'tienda/miniaturas/F-05.jpg'
    },
    {
      codigo: 'F-06', sala: 'fotografia', proyecto: 'Animales', titulo: 'Res al sol',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 45 × 25 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 75000, estado: 'disponible',
      historia: 'Una res oscura mira a la cámara desde un potrero seco. El pelaje negro contra la tierra clara hace casi una silueta.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/2.1.jpg',
      miniatura: 'tienda/miniaturas/F-06.jpg'
    },
    {
      codigo: 'F-07', sala: 'fotografia', proyecto: 'Retratos', titulo: 'Mujer con sombrero',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 45 × 27 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 90000, estado: 'disponible',
      historia: 'Retrato de perfil: una mano sostiene el ala del sombrero y al fondo queda la ciudad entre montañas.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/2.2.jpg',
      miniatura: 'tienda/miniaturas/F-07.jpg'
    },
    {
      codigo: 'F-08', sala: 'fotografia', proyecto: 'Retratos', titulo: 'Mujer con sombrero, blanco y negro',
      fecha: '2025', tecnica: 'Fotografía digital en blanco y negro, impresión en papel fotográfico mate', medidas: 'Impresión de 45 × 28 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 90000, estado: 'disponible',
      historia: 'Otra toma de la misma sesión, llevada a blanco y negro. Sin el color, lo que manda es la textura del sombrero y del tejido.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/byn.jpeg',
      miniatura: 'tienda/miniaturas/F-08.jpg'
    },
    {
      codigo: 'F-09', sala: 'fotografia', proyecto: 'Animales', titulo: 'Gata tricolor',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 40 × 30 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 85000, estado: 'disponible',
      historia: 'Una gata de tres colores se asoma por debajo de un borde y mira directo al lente con los ojos verdes muy abiertos.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/3.2.jpg',
      miniatura: 'tienda/miniaturas/F-09.jpg'
    },
    {
      codigo: 'F-10', sala: 'fotografia', proyecto: 'Animales', titulo: 'Gallo',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 45 × 25 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 75000, estado: 'disponible',
      historia: 'Un gallo de plumas rojizas entre la maleza. La cresta roja es el único punto de ese color en toda la imagen.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/3.3.jpg',
      miniatura: 'tienda/miniaturas/F-10.jpg'
    },
    {
      codigo: 'F-11', sala: 'fotografia', proyecto: 'Retratos', titulo: 'Perfil en sombra',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 45 × 31 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 90000, estado: 'disponible',
      historia: 'Un retrato de perfil que sale de un fondo negro. La luz lateral dibuja la cara, el arete y nada más.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/3.6.jpg',
      miniatura: 'tienda/miniaturas/F-11.jpg'
    },
    {
      codigo: 'F-12', sala: 'fotografia', proyecto: 'Calle', titulo: 'Mirando la montaña',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 45 × 25 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 80000, estado: 'disponible',
      historia: 'Dos personas de espaldas señalan algo en el paisaje. La foto no muestra qué miran: solo las montañas y la conversación.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/3.8.jpg',
      miniatura: 'tienda/miniaturas/F-12.jpg'
    },
    {
      codigo: 'F-13', sala: 'fotografia', proyecto: 'Calle', titulo: 'Esquina',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 30 × 48 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 80000, estado: 'disponible',
      historia: 'Un hombre de rojo espera con su bicicleta en una esquina, frente a un local iluminado. Fotografía de calle.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/4.1.jpg',
      miniatura: 'tienda/miniaturas/F-13.jpg'
    },
    {
      codigo: 'F-14', sala: 'fotografia', proyecto: 'Retratos', titulo: 'Señor de sombrero',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 30 × 45 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 85000, estado: 'disponible',
      historia: 'Retrato de un hombre con sombrero oscuro y camisa de cuadros, mirando hacia un lado con un fondo de franjas amarillas.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/4.2.jpg',
      miniatura: 'tienda/miniaturas/F-14.jpg'
    },
    {
      codigo: 'F-15', sala: 'fotografia', proyecto: 'Calle', titulo: 'El mandado',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 40 × 40 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 80000, estado: 'disponible',
      historia: 'Un señor de gorra amarilla baja en bicicleta con la bolsa del mercado colgando del manubrio. Tomada desde arriba.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/5.1.jpg',
      miniatura: 'tienda/miniaturas/F-15.jpg'
    },
    {
      codigo: 'F-16', sala: 'fotografia', proyecto: 'Naturaleza', titulo: 'Helecho',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 30 × 50 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 70000, estado: 'disponible',
      historia: 'Una hoja de helecho a contraluz, con el verde encendido contra un fondo casi blanco.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/5.2.jpg',
      miniatura: 'tienda/miniaturas/F-16.jpg'
    },
    {
      codigo: 'F-17', sala: 'fotografia', proyecto: 'Naturaleza', titulo: 'Geranio rojo',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 30 × 40 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 70000, estado: 'disponible',
      historia: 'Un racimo de flores rojas en primer plano, con el fondo azul y verde completamente desenfocado.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/5.3.jpg',
      miniatura: 'tienda/miniaturas/F-17.jpg'
    },
    {
      codigo: 'F-18', sala: 'fotografia', proyecto: 'Calle', titulo: 'Puerta roja',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 30 × 40 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 85000, estado: 'disponible',
      historia: 'Un hombre camina junto a unas columnas blancas enormes hacia una puerta roja. La escala de la arquitectura lo vuelve muy pequeño.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/5.4.jpg',
      miniatura: 'tienda/miniaturas/F-18.jpg'
    },
    {
      codigo: 'F-19', sala: 'fotografia', proyecto: 'Naturaleza', titulo: 'Túnel verde',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 30 × 40 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 90000, estado: 'disponible',
      historia: 'Un fotógrafo de espaldas dentro de un túnel de vegetación. Los bordes se van a negro y la luz queda solo al fondo del camino.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/alejotunel.jpeg',
      miniatura: 'tienda/miniaturas/F-19.jpg'
    },
    {
      codigo: 'F-20', sala: 'fotografia', proyecto: 'Animales', titulo: 'Pájaro en la baranda, versión fría',
      fecha: '2025', tecnica: 'Fotografía digital, impresión en papel fotográfico mate', medidas: 'Impresión de 30 × 50 cm',
      venta: 'Edición de 10 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 80000, estado: 'disponible',
      historia: 'La misma ave de la otra toma, con una edición en grises azulados que la deja casi en silueta.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/pajaro2.jpeg',
      miniatura: 'tienda/miniaturas/F-20.jpg'
    },
    {
      codigo: 'F-21', sala: 'fotografia', proyecto: 'Foto de producto', titulo: 'Sweet Cookies, foto de producto',
      fecha: '2025', tecnica: 'Fotografía de producto en estudio', medidas: 'Archivo digital en alta resolución',
      venta: 'Servicio por encargo: sesión de fotos para tu producto', incluye: 'Fotos editadas y listas para redes',
      precio: 120000, desde: true, estado: 'encargo',
      historia: 'Foto de producto hecha para la marca Sweet Cookies: el empaque con moño rojo y dos galletas sobre fondo blanco. Sirve de ejemplo de lo que puedo hacer con tu producto.',
      imagen: 'img/proyectos.md/Audio Visual/Fotografia/tarro_galletas.jpg',
      miniatura: 'tienda/miniaturas/F-21.jpg'
    },

    /* ── VIDEO ── */
    {
      codigo: 'V-01', sala: 'video', proyecto: 'Videos', titulo: 'Quisiera ser mejor…',
      fecha: '2025', tecnica: 'Video digital, edición y color', medidas: '1 min 43 s',
      venta: 'Servicio por encargo: un video como este para tu proyecto', incluye: 'Video final en MP4',
      precio: 250000, desde: true, estado: 'encargo',
      historia: 'Pieza audiovisual en blanco y negro que abre con la frase del título sobre una cancha vacía.',
      imagen: 'img/proyectos.md/Audio Visual/Videos/posters/Video1.jpg',
      miniatura: 'tienda/miniaturas/V-01.jpg',
      video: 'img/proyectos.md/Audio Visual/Videos/Video1.mp4'
    },
    {
      codigo: 'V-02', sala: 'video', proyecto: 'Videos', titulo: 'Pasos',
      fecha: '2025', tecnica: 'Video digital, edición y color', medidas: '1 min 26 s',
      venta: 'Servicio por encargo: un video como este para tu proyecto', incluye: 'Video final en MP4',
      precio: 250000, desde: true, estado: 'encargo',
      historia: 'Una figura negra camina sobre una superficie clara con fondo azul. El video está contado desde el movimiento de los pies.',
      imagen: 'img/proyectos.md/Audio Visual/Videos/posters/Video2.jpg',
      miniatura: 'tienda/miniaturas/V-02.jpg',
      video: 'img/proyectos.md/Audio Visual/Videos/Video2.mp4'
    },
    {
      codigo: 'V-03', sala: 'video', proyecto: 'Videos', titulo: 'Palmas de cera',
      fecha: '2025', tecnica: 'Video digital, edición y color', medidas: '1 min 40 s',
      venta: 'Licencia de uso del video', incluye: 'Archivo MP4 y permiso de uso por escrito',
      precio: 150000, estado: 'disponible',
      historia: 'Un recorrido por una ladera de bosque con palmas de cera que sobresalen entre la niebla.',
      imagen: 'img/proyectos.md/Audio Visual/Videos/posters/bosque.jpg',
      miniatura: 'tienda/miniaturas/V-03.jpg',
      video: 'img/proyectos.md/Audio Visual/Videos/bosque.mp4'
    },
    {
      codigo: 'V-04', sala: 'video', proyecto: 'Animación', titulo: 'Animación de logotipo',
      fecha: '2025', tecnica: 'Animación digital', medidas: '5 s, 1920 × 1080 px',
      venta: 'Servicio por encargo: animación del logo de tu marca', incluye: 'Animación en MP4',
      precio: 130000, desde: true, estado: 'encargo',
      historia: 'Ejercicio académico de animación de un logotipo conocido. No se vende esta pieza: es la muestra de cómo puedo animar el logo de tu marca.',
      imagen: 'img/proyectos.md/Audio Visual/Animación/posters/cocacola.jpg',
      miniatura: 'tienda/miniaturas/V-04.jpg',
      video: 'img/proyectos.md/Audio Visual/Animación/cocacola.mp4'
    },
    {
      codigo: 'V-05', sala: 'video', proyecto: 'Animación', titulo: 'Lava y fuego',
      fecha: '2025', tecnica: 'Animación 2D', medidas: '22 s, 640 × 480 px',
      venta: 'Servicio por encargo: animación 2D', incluye: 'Animación en MP4',
      precio: 250000, desde: true, estado: 'encargo',
      historia: 'Animación corta con estética de videojuego de plataformas: dos personajes, uno rojo y uno azul, en un escenario de niveles.',
      imagen: 'img/proyectos.md/Audio Visual/Animación/posters/lavayfuego.jpg',
      miniatura: 'tienda/miniaturas/V-05.jpg',
      video: 'img/proyectos.md/Audio Visual/Animación/lava_y_fuego.mp4'
    },
    {
      codigo: 'V-06', sala: 'video', proyecto: 'Motion graphics', titulo: 'Pa’ Guapa, shampoo natural',
      fecha: '2025', tecnica: 'Motion graphics, formato vertical', medidas: '15 s, 2160 × 3840 px',
      venta: 'Servicio por encargo: motion graphics para tu producto', incluye: 'Video vertical en MP4, listo para redes',
      precio: 200000, desde: true, estado: 'encargo',
      historia: 'Pieza de motion graphics para un shampoo natural: el envase sobre agua en movimiento, con fondo rosado.',
      imagen: 'img/proyectos.md/Audio Visual/Motion Graphics/posters/motion.jpg',
      miniatura: 'tienda/miniaturas/V-06.jpg',
      video: 'img/proyectos.md/Audio Visual/Motion Graphics/motion_pieza_01.mp4'
    },

    /* ── ARTE DIGITAL ── */
    {
      codigo: 'D-01', sala: 'arte-digital', proyecto: 'Pintura digital', titulo: 'Cristo',
      fecha: '2025', tecnica: 'Pintura digital', medidas: 'Impresión de 30 × 30 cm',
      venta: 'Edición de 15 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 60000, estado: 'disponible',
      historia: 'Una figura hecha de luz tiende la mano a una persona sentada en el suelo. Toda la iluminación de la escena sale de esa figura.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Cristo.jpeg',
      miniatura: 'tienda/miniaturas/D-01.jpg'
    },
    {
      codigo: 'D-02', sala: 'arte-digital', proyecto: 'Pintura digital', titulo: 'Quién soy yo',
      fecha: '2025', tecnica: 'Pintura digital', medidas: 'Impresión de 30 × 30 cm',
      venta: 'Edición de 15 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 60000, estado: 'disponible',
      historia: 'Alguien se mira al espejo y el reflejo no tiene rostro: solo un signo de interrogación.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Quiensoyyo.jpeg',
      miniatura: 'tienda/miniaturas/D-02.jpg'
    },
    {
      codigo: 'D-03', sala: 'arte-digital', proyecto: 'Pintura digital', titulo: 'Me miran',
      fecha: '2025', tecnica: 'Dibujo digital', medidas: 'Impresión de 30 × 30 cm',
      venta: 'Edición de 15 copias, numeradas y firmadas', incluye: 'Certificado de autenticidad firmado',
      precio: 60000, estado: 'disponible',
      historia: 'Una silueta negra en el centro, rodeada de ojos que la observan desde todas partes.',
      imagen: 'img/proyectos.md/Arteplastico/Pintura/Memiran.jpeg',
      miniatura: 'tienda/miniaturas/D-03.jpg'
    },
    {
      codigo: 'D-04', sala: 'arte-digital', proyecto: 'Personaje: Mapache', titulo: 'Mapache, giro de personaje',
      fecha: '2025', tecnica: 'Ilustración vectorial', medidas: '2715 × 971 px',
      venta: 'Servicio por encargo: diseño de personaje', incluye: 'Personaje en vectores con sus vistas',
      precio: 180000, desde: true, estado: 'encargo',
      historia: 'El personaje del mapache dibujado en cuatro vistas: frente, tres cuartos, perfil y espalda. Es el giro que se usa para animarlo.',
      imagen: 'img/proyectos.md/Diseños/Personajes/personaje_color.webp',
      miniatura: 'tienda/miniaturas/D-04.jpg'
    },
    {
      codigo: 'D-05', sala: 'arte-digital', proyecto: 'Personaje: Mapache', titulo: 'Mapache, pruebas de color',
      fecha: '2025', tecnica: 'Ilustración vectorial', medidas: '3658 × 4571 px',
      venta: 'Servicio por encargo: diseño de personaje', incluye: 'Personaje en vectores con paleta de color',
      precio: 180000, desde: true, estado: 'encargo',
      historia: 'Lámina de desarrollo del mismo personaje: paletas, cambios de vestuario y versiones en distintas edades.',
      imagen: 'img/proyectos.md/Diseños/Personajes/personaje_turnaround.jpg',
      miniatura: 'tienda/miniaturas/D-05.jpg'
    },
    {
      codigo: 'D-06', sala: 'arte-digital', proyecto: 'Piezas publicitarias', titulo: 'Pa’ Guapa, pieza para Instagram',
      fecha: '2025', tecnica: 'Diseño publicitario digital', medidas: '1600 × 1600 px',
      venta: 'Servicio por encargo: piezas para redes sociales', incluye: 'Archivo listo para publicar',
      precio: 50000, desde: true, estado: 'encargo',
      historia: 'Publicación cuadrada para un shampoo natural, con el envase sobre un pedestal y la lista de ingredientes a un lado.',
      imagen: 'img/proyectos.md/Diseños/Publicidad/feed_ig_01.webp',
      miniatura: 'tienda/miniaturas/D-06.jpg'
    },
    {
      codigo: 'D-07', sala: 'arte-digital', proyecto: 'Piezas publicitarias', titulo: 'ADS Productions, afiche',
      fecha: '2025', tecnica: 'Diseño publicitario digital', medidas: '1080 × 1350 px',
      venta: 'Servicio por encargo: afiche publicitario', incluye: 'Archivo listo para publicar o imprimir',
      precio: 80000, desde: true, estado: 'encargo',
      historia: 'Afiche de ADS Productions con la frase «Creamos ideas que cobran vida»: el autor levanta al personaje del mapache sobre su cabeza.',
      imagen: 'img/proyectos.md/Diseños/Publicidad/yoads.jpeg',
      miniatura: 'tienda/miniaturas/D-07.jpg'
    },
    {
      codigo: 'D-08', sala: 'arte-digital', proyecto: 'Piezas publicitarias', titulo: 'Exposición fotográfica, afiche',
      fecha: '2025', tecnica: 'Diseño informativo digital', medidas: '698 × 516 px',
      venta: 'Servicio por encargo: afiche para tu evento', incluye: 'Archivo listo para publicar o imprimir',
      precio: 80000, desde: true, estado: 'encargo',
      historia: 'Afiche de invitación a una exposición fotográfica, con fecha, lugar y hora del evento.',
      imagen: 'img/proyectos.md/Diseños/Informativo/yosena.jpeg',
      miniatura: 'tienda/miniaturas/D-08.jpg'
    },

    /* ── GUIONES ── */
    {
      codigo: 'G-01', sala: 'guiones', proyecto: 'Una espera sin fin…', titulo: 'Una espera sin fin…',
      fecha: '2025', tecnica: 'Guion literario para cortometraje, género dramático', medidas: '9 páginas, 10 minutos estimados',
      venta: 'Servicio por encargo: escritura de guion', incluye: 'Guion en PDF con formato profesional',
      precio: 200000, desde: true, estado: 'encargo',
      historia: 'Guion de cortometraje dramático escrito por Santiago Méndez y Andrés Caicedo para ADS. Puedes leerlo completo y encargar uno para tu propia historia.',
      imagen: 'img/proyectos.md/Audio Visual/Guión/paginas/pagina-1.jpg',
      miniatura: 'tienda/miniaturas/G-01.jpg',
      vistas: [
        'img/proyectos.md/Audio Visual/Guión/paginas/pagina-2.jpg',
        'img/proyectos.md/Audio Visual/Guión/paginas/pagina-3.jpg',
        'img/proyectos.md/Audio Visual/Guión/paginas/pagina-4.jpg',
        'img/proyectos.md/Audio Visual/Guión/paginas/pagina-5.jpg',
        'img/proyectos.md/Audio Visual/Guión/paginas/pagina-6.jpg',
        'img/proyectos.md/Audio Visual/Guión/paginas/pagina-7.jpg',
        'img/proyectos.md/Audio Visual/Guión/paginas/pagina-8.jpg',
        'img/proyectos.md/Audio Visual/Guión/paginas/pagina-9.jpg'
      ],
      documento: 'img/proyectos.md/Audio Visual/Guión/guion_ads.pdf'
    },

    /* ── IDENTIDAD VISUAL ── */
    {
      codigo: 'I-01', sala: 'identidad-visual', proyecto: 'Sweet Cookies', titulo: 'Sweet Cookies, manual de marca',
      fecha: '2025', tecnica: 'Logotipo, paleta de color, tipografía y aplicaciones', medidas: 'Manual de marca de 28 páginas',
      venta: 'Servicio por encargo: identidad visual para tu marca', incluye: 'Logotipo en vectores y manual de marca en PDF',
      precio: 600000, desde: true, estado: 'encargo',
      historia: 'Identidad completa para una marca de galletas: el logotipo con la galleta mordida, los cafés y naranjas de la paleta y las reglas de uso en empaques y redes.',
      imagen: 'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-01.jpg',
      miniatura: 'tienda/miniaturas/I-01.jpg',
      vistas: [
        'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-04.jpg',
        'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-11.jpg',
        'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-12.jpg',
        'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-13.jpg',
        'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-14.jpg',
        'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-15.jpg',
        'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-17.jpg',
        'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-18.jpg',
        'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-19.jpg',
        'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-21.jpg',
        'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-22.jpg',
        'img/proyectos.md/Diseños/Identidad visual/paginas/pagina-23.jpg'
      ],
      documento: 'img/proyectos.md/Diseños/Identidad visual/manual_sweet_cookies.pdf'
    }
  ]
};
