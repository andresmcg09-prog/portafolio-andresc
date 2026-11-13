(function(){
  var enMarco = window.top !== window.self;
  var v = document.getElementById('hvVisor'), img = v.querySelector('img');
  function cerrar(){ v.hidden = true; document.documentElement.style.overflow=''; img.removeAttribute('src'); }
  v.querySelector('.hv-cerrar').addEventListener('click', cerrar);
  v.addEventListener('click', function(e){ if(e.target===v) cerrar(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && !v.hidden) cerrar(); });
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href^="docs/Hoja_de_vida_"]');
    if(!a || !enMarco) return;
    e.preventDefault();
    img.src = a.getAttribute('href').indexOf('artista_digital') > -1 ? 'docs/hv_portafolio.jpg' : 'docs/hv_simple.jpg';
    v.hidden = false; document.documentElement.style.overflow='hidden'; v.querySelector('.hv-cerrar').focus();
  }, true);

  /* Videos: cargan y se reproducen solo cuando se ven */
  var vids = [].slice.call(document.querySelectorAll('video[data-auto]'));
  function activo(el){ var f = el.closest('[data-for]'); return !f || f.classList.contains('active'); }
  if (!('IntersectionObserver' in window)) { vids.forEach(function(x){ x.preload='metadata'; }); return; }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(en){
      var x = en.target;
      if (en.isIntersecting && activo(x)) { var p = x.play(); if (p && p.catch) p.catch(function(){}); }
      else if (!x.paused) x.pause();
    });
  }, { rootMargin: '150px 0px', threshold: 0.2 });
  vids.forEach(function(x){ io.observe(x); });
  document.addEventListener('visibilitychange', function(){ if (document.hidden) vids.forEach(function(x){ x.pause(); }); });
})();
