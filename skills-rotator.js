/* Andrés Caicedo — Portafolio: carrusel de herramientas (Skills) */
(function () {
  'use strict';

  function setupSkillsRotator(cfg) {
    var idx = 0;
    var page = document.getElementById(cfg.pageId);
    var rotatorBtn = document.getElementById(cfg.rotatorId);
    var rotatorIcon = document.getElementById(cfg.iconId);
    var rotatorImg = document.getElementById(cfg.imgId);
    var rotatorName = document.getElementById(cfg.nameId);
    var modal = document.getElementById(cfg.modalId);

    if (rotatorBtn && rotatorImg && rotatorIcon && rotatorName) {
      setInterval(function () {
        idx = (idx + 1) % cfg.tools.length;
        rotatorIcon.classList.add('is-fading');
        setTimeout(function () {
          rotatorImg.src = cfg.tools[idx].icon;
          rotatorName.textContent = cfg.tools[idx].name;
          rotatorIcon.classList.remove('is-fading');
        }, 220);
      }, 10000);

      rotatorBtn.addEventListener('click', openModal);
    }

    function openModal() {
      if (!modal) return;
      modal.hidden = false;
      requestAnimationFrame(function () { modal.classList.add('active'); });
    }
    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      setTimeout(function () { modal.hidden = true; }, 250);
    }
    if (modal) {
      Array.prototype.slice.call(modal.querySelectorAll('[data-skills-close]')).forEach(function (el) {
        el.addEventListener('click', closeModal);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
      });
    }

    if (page && modal) {
      document.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('[data-gallery-btn]') : null;
        if (!btn || !page.contains(btn)) return;
        var activeCat = page.querySelector('.cat-btn.active');
        if (!activeCat || activeCat.getAttribute('data-cat') !== 'SKILLS') return;
        e.preventDefault();
        e.stopPropagation();
        openModal();
      }, true);
    }
  }

  setupSkillsRotator({
    pageId: 'work-diseno',
    rotatorId: 'skillsRotator', iconId: 'skillsRotatorIcon', imgId: 'skillsRotatorImg', nameId: 'skillsRotatorName', modalId: 'skillsModal',
    tools: [
      { icon: 'img/proyectos.md/Diseños/Skills/Illustrator.png', name: 'Illustrator' },
      { icon: 'img/proyectos.md/Diseños/Skills/photoshop.png', name: 'Photoshop' },
      { icon: 'img/proyectos.md/Diseños/Skills/Figma.png', name: 'Figma' },
      { icon: 'img/proyectos.md/Diseños/Skills/Blender.png', name: 'Blender' },
      { icon: 'img/proyectos.md/Diseños/Skills/canva.png', name: 'Canva' }
    ]
  });

  setupSkillsRotator({
    pageId: 'work-audiovisual',
    rotatorId: 'skillsRotatorAV', iconId: 'skillsRotatorIconAV', imgId: 'skillsRotatorImgAV', nameId: 'skillsRotatorNameAV', modalId: 'skillsModalAV',
    tools: [
      { icon: 'img/proyectos.md/Audio%20Visual/Skills/aftereffects.png', name: 'After Effects' },
      { icon: 'img/proyectos.md/Audio%20Visual/Skills/premiere.png', name: 'Premiere Pro' },
      { icon: 'img/proyectos.md/Audio%20Visual/Skills/audition.png', name: 'Audition' },
      { icon: 'img/proyectos.md/Audio%20Visual/Skills/animate.png', name: 'Animate' },
      { icon: 'img/proyectos.md/Audio%20Visual/Skills/charanimator.png', name: 'Character Animator' },
      { icon: 'img/proyectos.md/Audio%20Visual/Skills/mediaencoder.png', name: 'Media Encoder' },
      { icon: 'img/proyectos.md/Audio%20Visual/Skills/davinciresolve.png', name: 'DaVinci Resolve' },
      { icon: 'img/proyectos.md/Audio%20Visual/Skills/capcut.png', name: 'CapCut' },
      { icon: 'img/proyectos.md/Audio%20Visual/Skills/canva.png', name: 'Canva' }
    ]
  });

  setupSkillsRotator({
    pageId: 'work-arteplastico',
    rotatorId: 'skillsRotatorAP', iconId: 'skillsRotatorIconAP', imgId: 'skillsRotatorImgAP', nameId: 'skillsRotatorNameAP', modalId: 'skillsModalAP',
    tools: [
      { icon: 'img/proyectos.md/Arteplastico/Skills/arcilla.png', name: 'Arcilla' },
      { icon: 'img/proyectos.md/Arteplastico/Skills/carboncillo.png', name: 'Carboncillo' },
      { icon: 'img/proyectos.md/Arteplastico/Skills/oleo.png', name: 'Óleo' },
      { icon: 'img/proyectos.md/Arteplastico/Skills/ibispaint.png', name: 'ibisPaint' }
    ]
  });
})();
