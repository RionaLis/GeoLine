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
