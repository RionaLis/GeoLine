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
        '<a href="' + root + '/encyclopedia/index.html" data-nav="encyclopedia">Энциклопедия</a>' +
        '<a href="' + root + '/news/index.html" data-nav="news">Новости</a>' +
        '<a href="' + root + '/index.html#about" data-nav="about">О проекте</a>' +
      '</nav>' +
      '<div class="header-search">' +
        '<input type="search" id="searchInput" placeholder="Поиск по сайту…" autocomplete="off" aria-label="Поиск по сайту">' +
        '<div class="search-results" id="searchResults"></div>' +
      '</div>' +
      '<button class="font-scale-btn" id="fontScaleBtn" type="button" aria-label="Увеличить шрифт" aria-pressed="false" title="Увеличить шрифт">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
          '<path d="M2.4 12s3.5-6 9.6-6 9.6 6 9.6 6-3.5 6-9.6 6-9.6-6-9.6-6Z"></path>' +
          '<circle cx="12" cy="12" r="3.2"></circle>' +
        '</svg>' +
      '</button>' +
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

  // ---- автоматический счётчик тем и уроков в карточках курсов ----
  // работает на главной и в разделе «Курсы»: считает по courses-data.js
  if (document.querySelector('.course-grid') && window.COURSES_DATA) {
    var plural = function(n, one, few, many) {
      var a = n % 10, b = n % 100;
      return (a === 1 && b !== 11) ? one : (a >= 2 && a <= 4 && (b < 12 || b > 14)) ? few : many;
    };
    document.querySelectorAll('.course-card').forEach(function(card) {
      var href = card.getAttribute('href') || '';
      var key = href.replace(/^(\.\.\/)?(courses\/)?/, '').replace(/\/index\.html$/, '');
      var data = window.COURSES_DATA[key];
      if (!data || !data.topics || !data.topics.length) return;
      var lessons = 0;
      data.topics.forEach(function(t) { lessons += t.lessons.length; });
      var meta = card.querySelector('.course-meta');
      if (!meta) return;
      meta.innerHTML = '<span class="chip">' + data.topics.length + ' ' +
        plural(data.topics.length, 'тема', 'темы', 'тем') + '</span>' +
        '<span class="chip">' + lessons + ' ' + plural(lessons, 'урок', 'урока', 'уроков') + '</span>';
    });
  }

  /* Режим для проектора: увеличивает только текст, не масштабируя изображения
     и геометрию блоков. Выбор хранится в пределах вкладки и действует при
     переходах между всеми страницами сайта. */
  var FONT_SCALE = 1.25;
  var FONT_SCALE_STORAGE_KEY = 'geoline-large-text';
  var fontScaleButton = document.getElementById('fontScaleBtn');
  var fontScaleEnabled = false;
  var fontSnapshots = [];
  var fontRefreshQueued = false;

  function hasOwnText(element) {
    var tag = element.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'OPTION') return true;
    for (var i = 0; i < element.childNodes.length; i++) {
      var node = element.childNodes[i];
      if (node.nodeType === 3 && /\S/.test(node.nodeValue || '')) return true;
    }
    return false;
  }

  function textElements() {
    var all = Array.prototype.slice.call(document.body.querySelectorAll('*'));
    return all.filter(function(element) {
      if (element.closest && element.closest('#fontScaleBtn')) return false;
      if (/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(element.tagName)) return false;
      return hasOwnText(element);
    });
  }

  function enlargeText() {
    var elements = textElements();
    var measured = elements.map(function(element) {
      return {
        element: element,
        size: parseFloat(window.getComputedStyle(element).fontSize),
        value: element.style.getPropertyValue('font-size'),
        priority: element.style.getPropertyPriority('font-size')
      };
    });

    fontSnapshots = [];
    measured.forEach(function(item) {
      if (!isFinite(item.size) || item.size <= 0) return;
      fontSnapshots.push(item);
      item.element.style.setProperty(
        'font-size',
        (Math.round(item.size * FONT_SCALE * 1000) / 1000) + 'px',
        'important'
      );
    });
  }

  function restoreText() {
    fontSnapshots.forEach(function(item) {
      if (item.value) {
        item.element.style.setProperty('font-size', item.value, item.priority);
      } else {
        item.element.style.removeProperty('font-size');
      }
    });
    fontSnapshots = [];
  }

  function updateFontScaleButton() {
    var label = fontScaleEnabled ? 'Вернуть обычный размер шрифта' : 'Увеличить шрифт';
    fontScaleButton.setAttribute('aria-label', label);
    fontScaleButton.setAttribute('aria-pressed', String(fontScaleEnabled));
    fontScaleButton.setAttribute('title', label);
  }

  function rememberFontScale() {
    try {
      if (fontScaleEnabled) sessionStorage.setItem(FONT_SCALE_STORAGE_KEY, '1');
      else sessionStorage.removeItem(FONT_SCALE_STORAGE_KEY);
    } catch (e) {
      /* sessionStorage может быть отключён настройками браузера */
    }
  }

  function setFontScale(enabled, remember) {
    if (enabled === fontScaleEnabled) {
      updateFontScaleButton();
      return;
    }
    fontScaleEnabled = enabled;
    document.body.classList.toggle('gl-large-text', enabled);
    if (enabled) enlargeText();
    else restoreText();
    updateFontScaleButton();
    if (remember) rememberFontScale();
  }

  function refreshEnlargedText() {
    if (!fontScaleEnabled || fontRefreshQueued) return;
    fontRefreshQueued = true;
    window.requestAnimationFrame(function() {
      fontRefreshQueued = false;
      if (!fontScaleEnabled) return;
      restoreText();
      enlargeText();
    });
  }

  function initFontScale() {
    var saved = false;
    try { saved = sessionStorage.getItem(FONT_SCALE_STORAGE_KEY) === '1'; } catch (e) {}

    fontScaleButton.addEventListener('click', function() {
      setFontScale(!fontScaleEnabled, true);
    });

    /* Поиск и учебные интерактивы могут добавлять подписи после загрузки. */
    if (window.MutationObserver) {
      new MutationObserver(function(mutations) {
        var hasNewContent = mutations.some(function(mutation) {
          return mutation.type === 'childList' && mutation.addedNodes.length > 0;
        });
        if (hasNewContent) refreshEnlargedText();
      }).observe(document.body, {childList:true, subtree:true});
    }

    updateFontScaleButton();
    if (saved) setFontScale(true, false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFontScale, {once:true});
  } else {
    initFontScale();
  }
})();
