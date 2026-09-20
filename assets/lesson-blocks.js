/* ============================================================
   ГеоЛиния · боковая панель урока и разворачивающиеся темы
   Панель строится из assets/courses-data.js по атрибуту
   data-course на <aside class="gl-sidebar">.
   ============================================================ */
(function(){
  var aside = document.querySelector('.gl-sidebar[data-course]');
  var DATA = window.COURSES_DATA || {};
  var courseId = aside ? aside.getAttribute('data-course') : null;
  var course = courseId ? DATA[courseId] : null;

  if (aside && course) {
    var file = (location.pathname.split('/').pop() || 'index.html').split('?')[0].split('#')[0];
    var html = '<div class="gl-sidebar-label">' + course.title + '</div>';
    course.topics.forEach(function(topic){
      if (!topic.lessons.length) {
        html += '<section class="gl-course-block gl-course-soon"><div class="gl-block-soon"><span>' +
                topic.title + '</span><em>готовится</em></div></section>';
        return;
      }
      var open = false, links = '';
      topic.lessons.forEach(function(lesson){
        var active = lesson[0] === file;
        if (active) open = true;
        links += '<a href="' + lesson[0] + '"' + (active ? ' class="active" aria-current="page"' : '') + '>' + lesson[1] + '</a>';
      });
      html += '<section class="gl-course-block' + (open ? ' open' : '') + '">' +
        '<button aria-expanded="' + (open ? 'true' : 'false') + '" class="gl-block-toggle" type="button">' +
        '<span>' + topic.title + '</span><i>⌄</i></button>' +
        '<div class="gl-block-lessons">' + links + '</div></section>';
    });
    html += '<a class="gl-course-link" href="index.html">← Страница курса</a>';
    aside.innerHTML = html;
  }

  /* разворачивание/сворачивание тем (делегирование кликов) */
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.gl-block-toggle');
    if (!btn) return;
    var block = btn.closest('.gl-course-block');
    var open = !block.classList.contains('open');
    block.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
})();

/* ============================================================
   Панель «Термины и определения»: кнопка-стрелка у правого
   края страницы. Термины урока, их определения и источники —
   из encyclopedia-data.js (terms, lessons, sources).
   Открытая панель сжимает страницу (body.gl-terms-open).
   ============================================================ */
(function(){
  var ENC = window.ENCYCLOPEDIA;
  var side = document.querySelector('.gl-sidebar[data-course]');
  if (!ENC || !ENC.terms || !ENC.lessons || !side) return;
  var courseId = side.getAttribute('data-course');
  var file = (location.pathname.split('/').pop() || 'index.html').split('?')[0].split('#')[0];
  var termSlugs = ENC.lessons[courseId + '/' + file] || [];
  if (!termSlugs.length) return;

  var items = '';
  for (var i = 0; i < termSlugs.length; i++) {
    var slug = termSlugs[i];
    var term = ENC.terms[slug];
    if (!term) continue;
    var href = '../../encyclopedia/' + slug + '.html';
    items += '<div class="gl-term-item">' +
      '<a class="gl-term-name" href="' + href + '">' + term.t + '</a>' +
      (term.d ? '<p class="gl-term-def">' + term.d + '</p>' : '') +
      '</div>';
  }

  var sources = (courseId && ENC.sources && ENC.sources[courseId]) || [];
  var srcHtml = '';
  if (sources.length) {
    srcHtml = '<h3 class="gl-terms-sub">Источники и нормативные документы</h3>' +
      '<ul class="gl-terms-sources">' +
      sources.map(function(s){
        return '<li><a href="' + s.u + '" target="_blank" rel="noopener">' + s.t + '</a></li>';
      }).join('') + '</ul>';
  }

  var panel = document.createElement('aside');
  panel.className = 'gl-terms-panel';
  panel.id = 'glTermsPanel';
  panel.setAttribute('aria-label', 'Термины и определения');
  panel.innerHTML = '<h2 class="gl-terms-title">Термины и определения</h2>' +
    '<p class="gl-terms-hint">Определения — из статей энциклопедии</p>' +
    items + srcHtml;
  document.body.appendChild(panel);

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'gl-terms-toggle';
  btn.setAttribute('aria-controls', 'glTermsPanel');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Открыть панель «Термины и определения»');
  btn.innerHTML = '<i aria-hidden="true">❯</i><span>Термины</span>';
  document.body.appendChild(btn);

  function setOpen(open){
    document.body.classList.toggle('gl-terms-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open
      ? 'Закрыть панель «Термины и определения»'
      : 'Открыть панель «Термины и определения»');
  }
  btn.addEventListener('click', function(){
    setOpen(!document.body.classList.contains('gl-terms-open'));
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') setOpen(false);
  });
})();
