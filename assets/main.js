/* ============================================================
   ГеоЛиния · общая верхняя панель, подвал и поиск
   Подключается на всех страницах. Корень сайта задаётся
   атрибутом data-root на <body>, текущий раздел — data-page.
   ============================================================ */
(function(){
  var root = document.body.dataset.root || '.';

  var header =
    '<header class="site-header"><div class="container header-inner">' +
      '<a class="brand" href="' + root + '/index.html">' +
        '<span class="brand-mark"><img src="' + root + '/uploads/common/geoline-logo.png" alt="ГеоЛиния"></span>' +
        '<span class="brand-name">ГеоЛиния</span>' +
      '</a>' +
      '<nav class="main-nav" id="nav">' +
        '<a href="' + root + '/index.html" data-nav="home">Главная</a>' +
        '<a href="' + root + '/courses/index.html" data-nav="courses">Курсы</a>' +
        '<a href="' + root + '/encyclopedia.html" data-nav="encyclopedia">Энциклопедия</a>' +
        '<a href="' + root + '/news.html" data-nav="news">Новости</a>' +
        '<a href="' + root + '/index.html#about" data-nav="about">О проекте</a>' +
      '</nav>' +
      '<div class="header-search">' +
        '<input type="search" id="searchInput" placeholder="Поиск по сайту…" autocomplete="off" aria-label="Поиск по сайту">' +
        '<div class="search-results" id="searchResults"></div>' +
      '</div>' +
      '<button class="menu-btn" id="menuBtn" aria-label="Меню">☰</button>' +
    '</div></header>';

  var footer =
    '<footer class="site-footer" id="contacts"><div class="container footer-inner">' +
      '<div><div class="footer-brand">ГеоЛиния</div>' +
      '<div class="footer-small">Образовательный проект о геодезии и науках о Земле.</div></div>' +
      '<div class="footer-contacts"><span>Контакты</span>' +
      '<b>к.т.н. Щукина Екатерина Александровна</b>' +
      '<a href="mailto:shchukinaea@guz.ru">shchukinaea@guz.ru</a></div>' +
      '<div class="footer-small footer-copy">© <span id="year"></span> ГеоЛиния</div>' +
    '</div></footer>';

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);
  document.getElementById('year').textContent = new Date().getFullYear();

  /* текущий раздел в меню */
  var page = document.body.dataset.page;
  if (page) {
    var link = document.querySelector('#nav a[data-nav="' + page + '"]');
    if (link) link.setAttribute('aria-current', 'page');
  }

  /* мобильное меню */
  document.getElementById('menuBtn').onclick = function(){
    document.getElementById('nav').classList.toggle('open');
  };

  /* поиск: живая выпадающая строка результатов */
  var input = document.getElementById('searchInput');
  var box = document.getElementById('searchResults');
  var items = [];

  function close(){ box.classList.remove('open'); items = []; }
  function render(list){
    if (!list.length) {
      box.innerHTML = '<div class="empty">Ничего не найдено</div>';
    } else {
      box.innerHTML = list.map(function(x){
        return '<a class="search-item" href="' + root + '/' + x.url + '"><b>' + x.title + '</b><small>' + x.course + '</small></a>';
      }).join('');
      items = box.querySelectorAll('.search-item');
    }
    box.classList.add('open');
  }
  function find(q){
    q = q.trim().toLowerCase();
    if (!q) { close(); return; }
    var data = window.SEARCH_DATA || [];
    render(data.filter(function(x){
      return (x.title + ' ' + (x.desc || '') + ' ' + (x.course || '')).toLowerCase().indexOf(q) > -1;
    }));
  }
  input.addEventListener('input', function(){ find(input.value); });
  input.addEventListener('focus', function(){ if (input.value.trim()) find(input.value); });
  input.addEventListener('keydown', function(e){
    if (e.key === 'Enter' && items.length) { location.href = items[0].getAttribute('href'); }
    if (e.key === 'Escape') { close(); input.blur(); }
  });
  document.addEventListener('keydown', function(e){
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault(); input.focus(); input.select();
    }
  });
  document.addEventListener('click', function(e){
    if (!e.target.closest('.header-search')) close();
  });
})();
