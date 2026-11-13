/* Andrés Caicedo — Portafolio: lógica principal del sitio */
(function () {
  'use strict';

  /* ---------- ANIMACIONES: revelado suave al hacer scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }
  }

  /* ---------- NAV: reloj en tiempo real (hora de Colombia) ---------- */
  var navClock = document.getElementById('navClock');
  if (navClock) {
    var clockFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Bogota',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    var updateNavClock = function () {
      var parts = clockFormatter.formatToParts(new Date());
      var hh = '', mm = '', ampm = '';
      parts.forEach(function (p) {
        if (p.type === 'hour') hh = p.value;
        if (p.type === 'minute') mm = p.value;
        if (p.type === 'dayPeriod') ampm = p.value.toLowerCase().replace(/\./g, '');
      });
      navClock.textContent = hh + ':' + mm + ampm;
    };
    updateNavClock();
    setInterval(updateNavClock, 1000);
  }

  /* ---------- NAV: menú "Categorías" (desplegable) ---------- */
  var navCatsBtn = document.getElementById('navCatsBtn');
  var navCatsMenu = document.getElementById('navCatsMenu');

  if (navCatsBtn && navCatsMenu) {
    navCatsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = navCatsMenu.classList.toggle('open');
      navCatsBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function () {
      navCatsMenu.classList.remove('open');
      navCatsBtn.setAttribute('aria-expanded', 'false');
    });
  }

  /* ---------- NAV: modo oscuro / claro ---------- */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    var themeIcon = themeToggle.querySelector('.theme-icon');
    themeToggle.addEventListener('click', function () {
      var isDark = document.body.classList.toggle('theme-dark');
      themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      themeToggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      if (themeIcon) themeIcon.textContent = isDark ? '☀' : '🌙';
    });
  }

  /* ---------- NAV: marcar la pestaña activa al hacer clic ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link[data-nav]'));
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });

  /* ---------- PÁGINAS DE TRABAJO: categorías interactivas ---------- */
  var workPages = Array.prototype.slice.call(document.querySelectorAll('.work-page'));

  workPages.forEach(function (page) {
    var catButtons = Array.prototype.slice.call(page.querySelectorAll('.cat-btn'));
    if (!catButtons.length) return;

    var bgLayer = page.querySelector('.work-bg');
    var bgList = (page.getAttribute('data-bgs') || '').split(',').filter(Boolean);
    var currentLabel = page.querySelector('.nav-current');
    var featuredEls = Array.prototype.slice.call(page.querySelectorAll('[data-for]'));
    var currentIndex = 0;
    var wheelLocked = false;
    var currentCatName = '';
    var currentCatLabel = '';

    function goTo(index) {
      var total = catButtons.length;
      index = ((index % total) + total) % total;
      currentIndex = index;

      catButtons.forEach(function (btn, i) { btn.classList.toggle('active', i === index); });

      var activeBtn = catButtons[index];
      var catName = activeBtn.getAttribute('data-cat') || activeBtn.textContent.trim();
      currentCatName = catName;
      currentCatLabel = activeBtn.textContent.trim();
      if (currentLabel) currentLabel.textContent = catName;

      featuredEls.forEach(function (el) {
        var isActive = el.getAttribute('data-for') === catName;
        el.classList.toggle('active', isActive);
        var vid = el.querySelector('video');
        if (vid) {
          if (isActive) {
            var p = vid.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            vid.pause();
          }
        }
      });

      if (bgLayer && bgList.length > 1) {
        var bgUrl = bgList[index % bgList.length];
        bgLayer.classList.add('fading');
        window.setTimeout(function () {
          bgLayer.style.backgroundImage = "url('" + bgUrl + "')";
          bgLayer.classList.remove('fading');
        }, 220);
      }
    }

    var galleryBtn = page.querySelector('[data-gallery-btn]');
    if (galleryBtn) {
      galleryBtn.addEventListener('click', function () {
        openCategoryGallery(currentCatName, currentCatLabel);
      });
    }

    catButtons.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        goTo(i);
      });
    });

    var prevBtn = page.querySelector('.nav-prev');
    var nextBtn = page.querySelector('.nav-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });

    function handleWheel(e) {
      if (wheelLocked || Math.abs(e.deltaY) < 12) return;
      e.preventDefault();
      wheelLocked = true;
      goTo(currentIndex + (e.deltaY > 0 ? 1 : -1));
      window.setTimeout(function () { wheelLocked = false; }, 420);
    }
    var catPanel = page.querySelector('.work-categorias');
    var bottomNav = page.querySelector('.work-bottom-nav');
    if (catPanel) catPanel.addEventListener('wheel', handleWheel, { passive: false });
    if (bottomNav) bottomNav.addEventListener('wheel', handleWheel, { passive: false });

    var catWrap = page.querySelector('.work-categorias-wrap');
    var catToggle = page.querySelector('.cat-toggle');
    if (catWrap && catToggle) {
      catToggle.addEventListener('click', function () {
        var collapsed = catWrap.classList.toggle('collapsed');
        catToggle.textContent = collapsed ? '‹' : '›';
        catToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        catToggle.setAttribute('aria-label', collapsed ? 'Mostrar categorías' : 'Ocultar categorías');
      });
    }

    goTo(0);
  });

  /* ---------- GALERÍA POR CATEGORÍA ---------- */
  var galleryOverlay = document.getElementById('galleryOverlay');
  var galleryClose = document.getElementById('galleryClose');
  var galleryTitleEl = document.getElementById('galleryTitle');
  var gallerySubtitleEl = document.getElementById('gallerySubtitle');
  var galleryCarousel = document.getElementById('galleryCarousel');
  var galleryViewSwitch = document.getElementById('galleryViewSwitch');
  var viewButtons = galleryViewSwitch ? Array.prototype.slice.call(galleryViewSwitch.querySelectorAll('.view-btn')) : [];
  var galleryEmpty = document.getElementById('galleryEmpty');
  var galleryEmptyName = document.getElementById('galleryEmptyName');
  var galleryTrack = document.getElementById('galleryTrack');
  var galleryTrackVideos = document.getElementById('galleryTrackVideos');
  var galleryTrackPintura = document.getElementById('galleryTrackPintura');
  var galleryTrackPublicitario = document.getElementById('galleryTrackPublicitario');
  var galleryTrackInformativo = document.getElementById('galleryTrackInformativo');
  var galleryTrackAnimacion = document.getElementById('galleryTrackAnimacion');
  var galleryTrackMotion = document.getElementById('galleryTrackMotion');
  var galleryTrackPersonajesDiseno = document.getElementById('galleryTrackPersonajesDiseno');
  var galleryTrackEscenario = document.getElementById('galleryTrackEscenario');
  var galleryTrackGuion = document.getElementById('galleryTrackGuion');
  var galleryTrackIdentidad = document.getElementById('galleryTrackIdentidad');
  var galleryPrev = document.querySelector('.gallery-scroll-prev');
  var galleryNext = document.querySelector('.gallery-scroll-next');
  var galleryItems = galleryTrack ? Array.prototype.slice.call(galleryTrack.querySelectorAll('.gallery-item')) : [];
  var videoItems = galleryTrackVideos ? Array.prototype.slice.call(galleryTrackVideos.querySelectorAll('.gallery-item-video')) : [];
  var paintingItems = galleryTrackPintura ? Array.prototype.slice.call(galleryTrackPintura.querySelectorAll('.gallery-item')) : [];
  var publicitarioItems = galleryTrackPublicitario ? Array.prototype.slice.call(galleryTrackPublicitario.querySelectorAll('.gallery-item')) : [];
  var informativoItems = galleryTrackInformativo ? Array.prototype.slice.call(galleryTrackInformativo.querySelectorAll('.gallery-item')) : [];
  var animacionItems = galleryTrackAnimacion ? Array.prototype.slice.call(galleryTrackAnimacion.querySelectorAll('.gallery-item-video')) : [];
  var motionItems = galleryTrackMotion ? Array.prototype.slice.call(galleryTrackMotion.querySelectorAll('.gallery-item-video')) : [];
  var personajesDisenoItems = galleryTrackPersonajesDiseno ? Array.prototype.slice.call(galleryTrackPersonajesDiseno.querySelectorAll('.gallery-item')) : [];
  var escenarioItems = galleryTrackEscenario ? Array.prototype.slice.call(galleryTrackEscenario.querySelectorAll('.gallery-item')) : [];
  var guionItems = galleryTrackGuion ? Array.prototype.slice.call(galleryTrackGuion.querySelectorAll('.gallery-item-document')) : [];
  var identidadItems = galleryTrackIdentidad ? Array.prototype.slice.call(galleryTrackIdentidad.querySelectorAll('.gallery-item-document')) : [];
  var activePhotoItems = galleryItems;
  var activeVideoItems = videoItems;
  var allVideoItemLists = [videoItems, animacionItems, motionItems];
  var galleryLightbox = document.getElementById('galleryLightbox');
  var galleryLightboxImg = document.getElementById('galleryLightboxImg');
  var galleryLightboxVideo = document.getElementById('galleryLightboxVideo');
  var galleryLightboxDoc = document.getElementById('galleryLightboxDoc');
  var docScrollViewport = document.getElementById('docScrollViewport');
  var docScrollTrack = document.getElementById('docScrollTrack');
  var docPdfFrame = document.getElementById('docPdfFrame');
  var docPdfToggle = document.getElementById('docPdfToggle');
  var docPdfNewTab = document.getElementById('docPdfNewTab');
  var currentDocItem = null;
  var galleryLightboxClose = document.getElementById('galleryLightboxClose');
  var galleryLbPrev = document.querySelector('.gallery-lb-prev');
  var galleryLbNext = document.querySelector('.gallery-lb-next');
  var lightboxIndex = 0;
  var videoLightboxIndex = 0;
  var lightboxMode = 'photo';

  var GALLERY_WITH_CONTENT = {
    'FOTOGRAFÍA': { subtitle: 'Retrato y paisaje' },
    'VIDEOS': { subtitle: 'Piezas audiovisuales', type: 'video', track: 'videos' },
    'PINTURA': { subtitle: 'Cuadros y estudios', type: 'painting' },
    'PUBLICITARIO': { subtitle: 'Piezas publicitarias', type: 'publicitario' },
    'INFORMATIVO': { subtitle: 'Piezas informativas', type: 'informativo' },
    'ANIMACIÓN': { subtitle: 'Piezas animadas', type: 'video', track: 'animacion' },
    'MOTION GRAPHICS': { subtitle: 'Motion graphics para PitStop Greek y para mi marca', type: 'video', track: 'motion' },
    'PERSONAJES': { subtitle: 'Personajes ilustrados', type: 'personajes-diseno' },
    'ESCENARIO': { subtitle: 'Esculturas y piezas de escenario', type: 'escenario' },
    'GUIÓN': { subtitle: 'Guion audiovisual', type: 'document' },
    'IDENTIDAD VISUAL': { subtitle: 'Manuales de marca', type: 'identidad' }
  };

  function openCategoryGallery(catName, catLabel) {
    if (!galleryOverlay) return;
    var data = GALLERY_WITH_CONTENT[catName];
    var label = catLabel || catName || '';
    var type = data ? (data.type || 'photo') : null;
    var isVideo = type === 'video';
    var videoTrack = isVideo ? data.track : null;
    var isVideosTrack = videoTrack === 'videos';
    var isAnimacion = videoTrack === 'animacion';
    var isMotion = videoTrack === 'motion';
    var isPainting = type === 'painting';
    var isPublicitario = type === 'publicitario';
    var isInformativo = type === 'informativo';
    var isPersonajesDiseno = type === 'personajes-diseno';
    var isEscenario = type === 'escenario';
    var isDocument = type === 'document';
    var isIdentidad = type === 'identidad';

    if (galleryTitleEl) galleryTitleEl.textContent = label;

    if (data) {
      if (gallerySubtitleEl) { gallerySubtitleEl.textContent = data.subtitle || ''; gallerySubtitleEl.hidden = !data.subtitle; }
      if (galleryCarousel) galleryCarousel.hidden = false;
      if (galleryEmpty) galleryEmpty.hidden = true;
      if (galleryTrack) galleryTrack.hidden = (type !== 'photo');
      if (galleryTrackVideos) galleryTrackVideos.hidden = !isVideosTrack;
      if (galleryTrackAnimacion) galleryTrackAnimacion.hidden = !isAnimacion;
      if (galleryTrackMotion) galleryTrackMotion.hidden = !isMotion;
      if (galleryTrackPintura) galleryTrackPintura.hidden = !isPainting;
      if (galleryTrackPublicitario) galleryTrackPublicitario.hidden = !isPublicitario;
      if (galleryTrackInformativo) galleryTrackInformativo.hidden = !isInformativo;
      if (galleryTrackPersonajesDiseno) galleryTrackPersonajesDiseno.hidden = !isPersonajesDiseno;
      if (galleryTrackEscenario) galleryTrackEscenario.hidden = !isEscenario;
      if (galleryTrackGuion) galleryTrackGuion.hidden = !isDocument;
      if (galleryTrackIdentidad) galleryTrackIdentidad.hidden = !isIdentidad;
      activePhotoItems = isPainting ? paintingItems
        : isPublicitario ? publicitarioItems
        : isInformativo ? informativoItems
        : isPersonajesDiseno ? personajesDisenoItems
        : isEscenario ? escenarioItems
        : isDocument ? guionItems
        : isIdentidad ? identidadItems
        : galleryItems;
      activeVideoItems = isAnimacion ? animacionItems
        : isMotion ? motionItems
        : videoItems;
      if (isVideo) playPreviewVideos(); else pausePreviewVideos();
      if (galleryViewSwitch) {
        galleryViewSwitch.hidden = false;
        setGalleryView('carousel');
      }
    } else {
      if (gallerySubtitleEl) gallerySubtitleEl.hidden = true;
      if (galleryCarousel) galleryCarousel.hidden = true;
      if (galleryEmpty) galleryEmpty.hidden = false;
      if (galleryEmptyName) galleryEmptyName.textContent = label;
      pausePreviewVideos();
      if (galleryViewSwitch) galleryViewSwitch.hidden = true;
    }

    galleryOverlay.classList.add('open');
    galleryOverlay.setAttribute('aria-hidden', 'false');
  }
  function setGalleryView(view) {
    if (!galleryCarousel) return;
    galleryCarousel.classList.remove('view-carousel', 'view-grid', 'view-mosaic');
    galleryCarousel.classList.add('view-' + view);
    viewButtons.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-view') === view);
    });
  }
  viewButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setGalleryView(btn.getAttribute('data-view'));
    });
  });
  function playPreviewVideos() {
    activeVideoItems.forEach(function (item) {
      var v = item.querySelector('video.preview-video');
      if (!v || !(v.hasAttribute('autoplay') || v.hasAttribute('data-auto'))) return;
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    });
  }
  function pausePreviewVideos() {
    allVideoItemLists.forEach(function (list) {
      list.forEach(function (item) {
        var v = item.querySelector('video.preview-video');
        if (v) v.pause();
      });
    });
  }
  function closeGallery() {
    if (!galleryOverlay) return;
    galleryOverlay.classList.remove('open');
    galleryOverlay.setAttribute('aria-hidden', 'true');
    pausePreviewVideos();
  }
  function showLightbox(index) {
    var items = activePhotoItems;
    if (!galleryLightbox || !galleryLightboxImg || !items.length) return;
    lightboxMode = 'photo';
    if (galleryLightboxDoc) galleryLightboxDoc.hidden = true;
    if (galleryLbPrev) galleryLbPrev.hidden = false;
    if (galleryLbNext) galleryLbNext.hidden = false;
    var total = items.length;
    lightboxIndex = ((index % total) + total) % total;
    var thisRequest = lightboxIndex;
    var img = items[lightboxIndex].querySelector('img');
    var src = img ? img.getAttribute('src') : '';
    var alt = img ? img.getAttribute('alt') : '';

    if (galleryLightboxVideo) { galleryLightboxVideo.pause(); galleryLightboxVideo.hidden = true; }
    galleryLightboxImg.hidden = false;

    galleryLightbox.classList.add('open');
    galleryLightbox.setAttribute('aria-hidden', 'false');

    galleryLightboxImg.style.opacity = '0';
    galleryLightboxImg.style.transform = 'scale(0.97)';
    var preload = new Image();
    var swapIn = function () {
      if (lightboxIndex !== thisRequest) return;
      galleryLightboxImg.src = src;
      galleryLightboxImg.alt = alt;
      requestAnimationFrame(function () {
        if (lightboxIndex !== thisRequest) return;
        galleryLightboxImg.style.opacity = '1';
        galleryLightboxImg.style.transform = 'scale(1)';
      });
    };
    preload.onload = swapIn;
    preload.onerror = swapIn;
    preload.src = src;
  }
  function showVideoLightbox(index) {
    var items = activeVideoItems;
    if (!galleryLightbox || !galleryLightboxVideo || !items.length) return;
    lightboxMode = 'video';
    if (galleryLightboxDoc) galleryLightboxDoc.hidden = true;
    if (galleryLbPrev) galleryLbPrev.hidden = false;
    if (galleryLbNext) galleryLbNext.hidden = false;
    var total = items.length;
    videoLightboxIndex = ((index % total) + total) % total;
    var vid = items[videoLightboxIndex].querySelector('video');

    if (galleryLightboxImg) galleryLightboxImg.hidden = true;
    galleryLightboxVideo.hidden = false;
    galleryLightboxVideo.src = vid ? vid.getAttribute('src') : '';
    galleryLightboxVideo.currentTime = 0;

    galleryLightbox.classList.add('open');
    galleryLightbox.setAttribute('aria-hidden', 'false');

    var playPromise = galleryLightboxVideo.play();
    if (playPromise && playPromise.catch) playPromise.catch(function () {});
  }
  function showDocPreview(item) {
    if (docPdfFrame) { docPdfFrame.hidden = true; docPdfFrame.removeAttribute('src'); }
    if (docScrollViewport) docScrollViewport.hidden = false;
    if (docPdfToggle) docPdfToggle.textContent = 'Abrir PDF completo';
    if (!docScrollTrack || !item) return;
    var pages = [];
    try { pages = JSON.parse(item.getAttribute('data-doc-pages') || '[]'); } catch (e) { pages = []; }
    var all = pages.concat(pages);
    var html = '';
    all.forEach(function (src, i) {
      var isDup = i >= pages.length;
      html += '<img src="' + src + '" alt="' + (isDup ? '' : 'Página ' + (i + 1)) + '"' + (isDup ? ' aria-hidden="true"' : '') + ' loading="lazy">';
    });
    docScrollTrack.innerHTML = html;
    docScrollTrack.style.animation = 'none';
    void docScrollTrack.offsetHeight;
    docScrollTrack.style.animation = '';
  }
  function showDocumentLightbox(item) {
    if (!galleryLightbox || !galleryLightboxDoc) return;
    lightboxMode = 'document';
    if (galleryLightboxImg) galleryLightboxImg.hidden = true;
    if (galleryLightboxVideo) { galleryLightboxVideo.pause(); galleryLightboxVideo.hidden = true; }
    if (galleryLbPrev) galleryLbPrev.hidden = true;
    if (galleryLbNext) galleryLbNext.hidden = true;

    currentDocItem = item || null;
    var pdfSrc = currentDocItem ? currentDocItem.getAttribute('data-doc-pdf') : '';
    if (docPdfToggle) docPdfToggle.hidden = !pdfSrc;
    if (docPdfNewTab) {
      docPdfNewTab.hidden = !pdfSrc;
      docPdfNewTab.href = pdfSrc || '';
    }
    showDocPreview(currentDocItem);

    galleryLightboxDoc.hidden = false;
    galleryLightbox.classList.add('open');
    galleryLightbox.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox() {
    if (!galleryLightbox) return;
    galleryLightbox.classList.remove('open');
    galleryLightbox.setAttribute('aria-hidden', 'true');
    if (galleryLightboxVideo && !galleryLightboxVideo.hidden) {
      galleryLightboxVideo.pause();
      galleryLightboxVideo.removeAttribute('src');
      galleryLightboxVideo.load();
    }
    if (galleryLightboxDoc) galleryLightboxDoc.hidden = true;
    if (docPdfFrame) { docPdfFrame.hidden = true; docPdfFrame.removeAttribute('src'); }
    if (docScrollViewport) docScrollViewport.hidden = false;
    if (docPdfToggle) docPdfToggle.textContent = 'Abrir PDF completo';
    if (docPdfNewTab) docPdfNewTab.hidden = true;
    if (galleryLbPrev) galleryLbPrev.hidden = false;
    if (galleryLbNext) galleryLbNext.hidden = false;
  }

  if (docPdfToggle) {
    docPdfToggle.addEventListener('click', function () {
      var showingPdf = docPdfFrame && !docPdfFrame.hidden;
      if (showingPdf) {
        docPdfFrame.hidden = true;
        docPdfFrame.removeAttribute('src');
        if (docScrollViewport) docScrollViewport.hidden = false;
        docPdfToggle.textContent = 'Abrir PDF completo';
        showDocPreview(currentDocItem);
      } else {
        var pdfSrc = currentDocItem ? currentDocItem.getAttribute('data-doc-pdf') : '';
        if (!pdfSrc || !docPdfFrame) return;
        if (docScrollViewport) docScrollViewport.hidden = true;
        docPdfFrame.src = pdfSrc;
        docPdfFrame.hidden = false;
        docPdfToggle.textContent = 'Volver a la vista previa';
      }
    });
  }

  var fotoPhotoBig = document.getElementById('fotoPhotoBig');
  if (fotoPhotoBig) {
    fotoPhotoBig.addEventListener('click', function () {
      openCategoryGallery('FOTOGRAFÍA', 'Fotografía');
    });
  }
  var videoPhotoBig = document.getElementById('videoPhotoBig');
  if (videoPhotoBig) {
    videoPhotoBig.addEventListener('click', function () {
      openCategoryGallery('VIDEOS', 'Videos');
    });
  }
  var pinturaPhotoBig = document.getElementById('pinturaPhotoBig');
  if (pinturaPhotoBig) {
    pinturaPhotoBig.addEventListener('click', function () {
      openCategoryGallery('PINTURA', 'Pintura');
    });
  }
  var identidadPhotoBig = document.getElementById('identidadPhotoBig');
  if (identidadPhotoBig) {
    identidadPhotoBig.addEventListener('click', function () {
      openCategoryGallery('IDENTIDAD VISUAL', 'Identidad Visual');
    });
  }
  var publicitarioPhotoBig = document.getElementById('publicitarioPhotoBig');
  if (publicitarioPhotoBig) {
    publicitarioPhotoBig.addEventListener('click', function () {
      openCategoryGallery('PUBLICITARIO', 'Publicitario');
    });
  }
  var informativoPhotoBig = document.getElementById('informativoPhotoBig');
  if (informativoPhotoBig) {
    informativoPhotoBig.addEventListener('click', function () {
      openCategoryGallery('INFORMATIVO', 'Informativo');
    });
  }
  var guionPhotoBig = document.getElementById('guionPhotoBig');
  if (guionPhotoBig) {
    guionPhotoBig.addEventListener('click', function () {
      openCategoryGallery('GUIÓN', 'Guión');
    });
  }
  var animacionPhotoBig = document.getElementById('animacionPhotoBig');
  if (animacionPhotoBig) {
    animacionPhotoBig.addEventListener('click', function () {
      openCategoryGallery('ANIMACIÓN', 'Animación');
    });
  }
  var motionPhotoBig = document.getElementById('motionPhotoBig');
  if (motionPhotoBig) {
    motionPhotoBig.addEventListener('click', function () {
      openCategoryGallery('MOTION GRAPHICS', 'Motion Graphics');
    });
  }
  var personajesDisenoPhotoBig = document.getElementById('personajesDisenoPhotoBig');
  if (personajesDisenoPhotoBig) {
    personajesDisenoPhotoBig.addEventListener('click', function () {
      openCategoryGallery('PERSONAJES', 'Personajes');
    });
  }
  var escenarioPhotoBig = document.getElementById('escenarioPhotoBig');
  if (escenarioPhotoBig) {
    escenarioPhotoBig.addEventListener('click', function () {
      openCategoryGallery('ESCENARIO', 'Escenario');
    });
  }
  if (galleryClose) galleryClose.addEventListener('click', closeGallery);
  if (galleryOverlay) {
    galleryOverlay.addEventListener('click', function (e) {
      if (e.target === galleryOverlay) closeGallery();
    });
  }

  function activeTrack() {
    if (galleryTrackVideos && !galleryTrackVideos.hidden) return galleryTrackVideos;
    if (galleryTrackAnimacion && !galleryTrackAnimacion.hidden) return galleryTrackAnimacion;
    if (galleryTrackMotion && !galleryTrackMotion.hidden) return galleryTrackMotion;
    if (galleryTrackPintura && !galleryTrackPintura.hidden) return galleryTrackPintura;
    if (galleryTrackPublicitario && !galleryTrackPublicitario.hidden) return galleryTrackPublicitario;
    if (galleryTrackInformativo && !galleryTrackInformativo.hidden) return galleryTrackInformativo;
    if (galleryTrackPersonajesDiseno && !galleryTrackPersonajesDiseno.hidden) return galleryTrackPersonajesDiseno;
    if (galleryTrackEscenario && !galleryTrackEscenario.hidden) return galleryTrackEscenario;
    if (galleryTrackGuion && !galleryTrackGuion.hidden) return galleryTrackGuion;
    if (galleryTrackIdentidad && !galleryTrackIdentidad.hidden) return galleryTrackIdentidad;
    return galleryTrack;
  }
  function trackStep(t) {
    var first = t.querySelector(':scope > *');
    if (!first) return 260;
    var gap = parseFloat(getComputedStyle(t).columnGap || getComputedStyle(t).gap || '0') || 0;
    return first.getBoundingClientRect().width + gap;
  }
  if (galleryPrev) {
    galleryPrev.addEventListener('click', function () {
      var t = activeTrack();
      if (t) t.scrollBy({ left: -trackStep(t), behavior: 'smooth' });
    });
  }
  if (galleryNext) {
    galleryNext.addEventListener('click', function () {
      var t = activeTrack();
      if (t) t.scrollBy({ left: trackStep(t), behavior: 'smooth' });
    });
  }

  galleryItems.forEach(function (item, i) {
    item.style.setProperty('--i', i);
    item.addEventListener('click', function () { showLightbox(i); });
  });
  videoItems.forEach(function (item, i) {
    item.style.setProperty('--i', i);
    item.addEventListener('click', function () { showVideoLightbox(i); });
  });
  animacionItems.forEach(function (item, i) {
    item.style.setProperty('--i', i);
    item.addEventListener('click', function () { showVideoLightbox(i); });
  });
  motionItems.forEach(function (item, i) {
    item.style.setProperty('--i', i);
    item.addEventListener('click', function () { showVideoLightbox(i); });
  });
  paintingItems.forEach(function (item, i) {
    item.style.setProperty('--i', i);
    item.addEventListener('click', function () { showLightbox(i); });
  });
  publicitarioItems.forEach(function (item, i) {
    item.style.setProperty('--i', i);
    item.addEventListener('click', function () { showLightbox(i); });
  });
  informativoItems.forEach(function (item, i) {
    item.style.setProperty('--i', i);
    item.addEventListener('click', function () {
      if (item.hasAttribute('data-doc-pages')) showDocumentLightbox(item); else showLightbox(i);
    });
  });
  personajesDisenoItems.forEach(function (item, i) {
    item.style.setProperty('--i', i);
    item.addEventListener('click', function () { showLightbox(i); });
  });
  escenarioItems.forEach(function (item, i) {
    item.style.setProperty('--i', i);
    item.addEventListener('click', function () { showLightbox(i); });
  });
  guionItems.forEach(function (item, i) {
    item.style.setProperty('--i', i);
    item.addEventListener('click', function () { showDocumentLightbox(item); });
  });

  identidadItems.forEach(function (item, i) {
    item.style.setProperty('--i', i);
    item.addEventListener('click', function () { showDocumentLightbox(item); });
  });
  if (galleryLightboxClose) galleryLightboxClose.addEventListener('click', closeLightbox);
  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', function (e) {
      if (e.target === galleryLightbox) closeLightbox();
    });
  }
  if (galleryLbPrev) {
    galleryLbPrev.addEventListener('click', function () {
      if (lightboxMode === 'video') showVideoLightbox(videoLightboxIndex - 1);
      else showLightbox(lightboxIndex - 1);
    });
  }
  if (galleryLbNext) {
    galleryLbNext.addEventListener('click', function () {
      if (lightboxMode === 'video') showVideoLightbox(videoLightboxIndex + 1);
      else showLightbox(lightboxIndex + 1);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (galleryLightbox && galleryLightbox.classList.contains('open')) { closeLightbox(); return; }
    if (galleryOverlay && galleryOverlay.classList.contains('open')) closeGallery();
  });

  /* ---------- FORMULARIO DE CONTACTO ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var nombreInput = document.getElementById('nombre');
  var correoInput = document.getElementById('correo');
  var mensajeInput = document.getElementById('mensaje');
  var submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  var formIframe = document.getElementById('formSubmitTarget');

  function gmailFallbackUrl(nombre, correo, mensaje) {
    var subject = 'Nuevo mensaje desde el portafolio de ' + nombre;
    var body = 'Nombre: ' + nombre + '\nCorreo: ' + correo + '\n\nMensaje:\n' + mensaje;
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent('andrescproductions323@gmail.com') +
      '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  if (form && status && nombreInput && correoInput && mensajeInput && formIframe) {
    var awaitingResponse = false;
    var timeoutId = null;

    formIframe.addEventListener('load', function () {
      if (!awaitingResponse) return;
      awaitingResponse = false;
      if (timeoutId) clearTimeout(timeoutId);
      status.textContent = '¡Gracias' + (this._nombre ? ', ' + this._nombre : '') + '! Tu mensaje fue enviado — te contactaré pronto' + (this._correo ? ' a ' + this._correo : '') + '.';
      status.className = 'form-status ok';
      if (submitBtn) submitBtn.disabled = false;
      form.reset();
    });

    form.addEventListener('submit', function (e) {
      var nombre = nombreInput.value.trim();
      var correo = correoInput.value.trim();
      var mensaje = mensajeInput.value.trim();
      var correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

      if (!nombre || !correoValido || !mensaje) {
        e.preventDefault();
        status.textContent = 'Revisa el formulario: falta el nombre, el correo no es válido o falta el mensaje.';
        status.className = 'form-status err';
        return;
      }

      status.textContent = 'Enviando...';
      status.className = 'form-status';
      if (submitBtn) submitBtn.disabled = true;
      awaitingResponse = true;
      formIframe._nombre = nombre;
      formIframe._correo = correo;

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        if (!awaitingResponse) return;
        awaitingResponse = false;
        status.innerHTML = 'Esto está tardando más de lo normal — puede que no tengas conexión. ' +
          '<a href="' + gmailFallbackUrl(nombre, correo, mensaje) + '" target="_blank" rel="noopener">Haz clic aquí para escribirle por Gmail</a> con tu mensaje ya escrito.';
        status.className = 'form-status err';
        if (submitBtn) submitBtn.disabled = false;
      }, 8000);
    });
  }
})();

/* ---------- VISITAS / ME GUSTA / COMENTARIOS ---------- */
(function () {
  var FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSerWAn11LTx9j3BADKB469zZdW0bHbINE1cUwPfcvkxxMyZIA/formResponse';
  var SHEET_ID = '13bt5kGAiKarF7sLk2Rc3UJb_WWzm550zAcsKCZ33Mug';
  var SHEET_GID = '659572640';
  var ENTRY_TIPO = 'entry.1433213946';
  var ENTRY_NOMBRE = 'entry.1893872878';
  var ENTRY_COMENTARIO = 'entry.911016473';
  var LIKE_KEY = 'portafolioAndresLikeDado';
  var VISIT_KEY = 'portafolioAndresVisitaContada';

  function enviarInteraccion(tipo, nombre, comentario) {
    var f = document.createElement('form');
    f.action = FORM_ACTION;
    f.method = 'POST';
    f.target = 'hiddenInteractionsTarget';
    f.style.display = 'none';
    function addField(name, value) {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value || '';
      f.appendChild(input);
    }
    addField(ENTRY_TIPO, tipo);
    addField(ENTRY_NOMBRE, nombre);
    addField(ENTRY_COMENTARIO, comentario);
    document.body.appendChild(f);
    f.submit();
    setTimeout(function () { f.remove(); }, 4000);
  }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function actualizarTextos(ids, valor) {
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = valor;
    });
  }

  function mostrarErrorComentarios() {
    var list = document.getElementById('commentsList');
    if (list) list.innerHTML = '<p class="comments-empty">No se pudieron cargar los comentarios ahora mismo. Recarga la página para intentarlo de nuevo.</p>';
  }

  function procesarDatos(data) {
    var rows = (data && data.table && data.table.rows) || [];
    var visitas = 0, likes = 0, comentarios = [];
    rows.forEach(function (row) {
      var cells = (row && row.c) || [];
      var tipo = cells[1] && cells[1].v != null ? String(cells[1].v).trim().toLowerCase() : '';
      var nombre = cells[2] && cells[2].v != null ? String(cells[2].v).trim() : '';
      var texto = cells[3] && cells[3].v != null ? String(cells[3].v).trim() : '';
      if (tipo === 'visita') visitas++;
      else if (tipo === 'like') likes++;
      else if (tipo === 'comentario' && texto) comentarios.push({ nombre: nombre || 'Anónimo', texto: texto });
    });

    actualizarTextos(['visitCount'], visitas);
    actualizarTextos(['likeCountMain', 'navLikeCount'], likes);
    actualizarTextos(['commentCount'], comentarios.length);

    var list = document.getElementById('commentsList');
    if (list) {
      if (comentarios.length === 0) {
        list.innerHTML = '<p class="comments-empty">Sé la primera persona en comentar.</p>';
      } else {
        comentarios.reverse();
        list.innerHTML = comentarios.map(function (c) {
          return '<div class="comment-item"><span class="comment-name">' + escapeHTML(c.nombre) +
            '</span><p class="comment-text">' + escapeHTML(c.texto) + '</p></div>';
        }).join('');
      }
    }
  }

  var jsonpContador = 0;
  function cargarDatos() {
    var callbackName = 'gvizCallback_' + (jsonpContador++) + '_' + Date.now();
    var script = document.createElement('script');
    var quitado = false;
    function limpiar() {
      if (quitado) return;
      quitado = true;
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }
    window[callbackName] = function (data) {
      limpiar();
      try { procesarDatos(data); } catch (e) { mostrarErrorComentarios(); }
    };
    script.src = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?tqx=out:json;responseHandler:' + callbackName + '&gid=' + SHEET_GID;
    script.onerror = function () { limpiar(); mostrarErrorComentarios(); };
    document.head.appendChild(script);
    setTimeout(function () { if (!quitado) { limpiar(); mostrarErrorComentarios(); } }, 10000);
  }

  /* La visita solo se cuenta si la persona aceptó la medición en el aviso de cookies */
  function contarVisita() {
    if (window.andrescPuedeMedir && !window.andrescPuedeMedir()) return;
    try { if (sessionStorage.getItem(VISIT_KEY)) return; sessionStorage.setItem(VISIT_KEY, '1'); } catch (e) {}
    enviarInteraccion('visita', '', '');
  }
  contarVisita();
  document.addEventListener('andresc:consentimiento', contarVisita);

  cargarDatos();

  function marcarComoDadoEnPantalla() {
    ['likeBtnMain', 'navLikeBtn'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.classList.add('liked'); el.setAttribute('aria-pressed', 'true'); }
    });
  }
  if (localStorage.getItem(LIKE_KEY)) marcarComoDadoEnPantalla();

  function alDarLike() {
    if (localStorage.getItem(LIKE_KEY)) return;
    localStorage.setItem(LIKE_KEY, '1');
    enviarInteraccion('like', '', '');
    ['likeCountMain', 'navLikeCount'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = (parseInt(el.textContent, 10) || 0) + 1;
    });
    marcarComoDadoEnPantalla();
  }
  ['likeBtnMain', 'navLikeBtn'].forEach(function (id) {
    var btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', alDarLike);
  });

  var commentForm = document.getElementById('commentForm');
  var commentStatus = document.getElementById('commentStatus');
  var commentIframe = document.getElementById('commentFormTarget');
  if (commentForm && commentStatus && commentIframe) {
    var esperandoRespuesta = false;
    commentIframe.addEventListener('load', function () {
      if (!esperandoRespuesta) return;
      esperandoRespuesta = false;
      commentStatus.textContent = '¡Gracias por tu comentario!';
      commentStatus.className = 'form-status ok';
      commentForm.reset();
      setTimeout(cargarDatos, 2500);
    });
    commentForm.addEventListener('submit', function (e) {
      var nombre = document.getElementById('comentNombre').value.trim();
      var texto = document.getElementById('comentTexto').value.trim();
      if (!nombre || !texto) {
        e.preventDefault();
        commentStatus.textContent = 'Escribe tu nombre y tu comentario.';
        commentStatus.className = 'form-status err';
        return;
      }
      commentStatus.textContent = 'Enviando...';
      commentStatus.className = 'form-status';
      esperandoRespuesta = true;
    });
  }
})();

/* ---------- BOTÓN "VOLVER ARRIBA" ---------- */
(function () {
  var backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.className = 'back-to-top';
  backBtn.setAttribute('aria-label', 'Volver arriba');
  backBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"></path><path d="M6 11l6-6 6 6"></path></svg>';
  document.body.appendChild(backBtn);

  function toggleBackBtn() {
    backBtn.classList.toggle('visible', window.scrollY > 700);
  }
  window.addEventListener('scroll', toggleBackBtn, { passive: true });
  toggleBackBtn();

  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
