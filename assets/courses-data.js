/* ============================================================
   ГеоЛиния · структура курсов
   Единый источник данных для боковых панелей уроков.
   Пустой список lessons — тема объявлена, материалы готовятся.
   ============================================================ */
window.COURSES_DATA = {
  "geodesy-course-1": {
    title: "Геодезия. Курс 1",
    topics: [
      { title: "Тема 01. Введение в геодезию", lessons: [["subject-and-tasks-of-geodesy.html", "Предмет и задачи геодезии"], ["history-of-geodesy.html", "Краткие сведения из истории геодезии"], ["history-of-geodetic-instruments.html", "Краткая история геодезических приборов"], ["earth-shape-and-size.html", "Форма и размеры Земли"]] },
      { title: "Тема 02. Геодезическое оборудование", lessons: [["modern-geodetic-instruments.html", "Современные геодезические приборы"], ["distance-measurement.html", "Измерение расстояний"], ["theodolites-classification-and-design.html", "Теодолиты: классификация, устройство и принцип работы"], ["theodolite-checks.html", "Теодолиты: поверки и юстировки"], ["theodolite-horizontal-angles.html", "Теодолиты: измерение горизонтальных углов"], ["theodolite-vertical-angles.html", "Теодолиты: измерение вертикальных углов"], ["levels-classification-and-design.html", "Нивелиры: классификация, устройство и принцип работы"], ["level-checks-and-adjustments.html", "Нивелиры: поверки и юстировки"]] },
      { title: "Тема 03. Топографические карты и планы", lessons: [["orthogonal-projection.html", "Ортогональная проекция"], ["cartographic-projections.html", "Картографические проекции"], ["gauss-kruger-projection.html", "Проекция Гаусса-Крюгера"], ["plan-map-profile.html", "Топографические карты и планы"], ["lmp-and-tgt.html", "Использование ЛМП и ТГТ"], ["landform-types.html", "Рельеф"], ["contour-lines.html", "Горизонтали"], ["digital-terrain-models.html", "Цифровые модели местности"]] },
      { title: "Тема 04. Системы координат и ориентирование", lessons: [["geodetic-coordinate-system.html", "Геодезическая система координат"], ["line-orientation-on-map.html", "Ориентирование линий на карте"], ["direct-and-inverse-geodetic-problems.html", "Прямая и обратная геодезические задачи"], ["directional-angle-transfer.html", "Передача дирекционных углов"]] },
      { title: "Тема 05. Топографическая съёмка местности", lessons: [["inaccessible-distance.html", "Определение недоступного расстояния"], ["survey-control.html", "Съёмочное обоснование"], ["state-geodetic-network-points.html", "Пункты государственной геодезической сети"], ["coordinate-register-calculation.html", "Вычисление ведомости координат"]] },
    ]
  },
  "measurement-errors": {
    title: "ТМОГИ",
    topics: [
      { title: "Тема 01. Основы теории вероятностей", lessons: [["probability-basics.html", "Основы теории вероятностей"], ["combinatorics-basics.html", "Комбинаторика: перестановки, размещения, сочетания"], ["probability-theorems.html", "Вероятность события и её теоремы"]] },
      { title: "Тема 02. Основы математической статистики", lessons: [] },
      { title: "Тема 03. Теория погрешностей", lessons: [] },
      { title: "Тема 04. Корреляционно-регрессионный анализ", lessons: [] },
      { title: "Тема 05. Метод наименьших квадратов", lessons: [] },
      { title: "Тема 06. Проектирование геодезических построений", lessons: [] },
      { title: "Тема 07. Обработка временных рядов", lessons: [] },
    ]
  },
  "geodetic-astronomy": {
    title: "Основы геодезической астрономии",
    topics: [
      { title: "Тема 01. Предмет и история геодезической астрономии", lessons: [] },
      { title: "Тема 02. Основные понятия астрономии", lessons: [] },
      { title: "Тема 03. Небесная механика", lessons: [] },
      { title: "Тема 04. Сферическая геодезия", lessons: [["celestial-sphere.html", "Небесная сфера и системы координат"], ["coord-time-links.html", "Связи систем координат и времени"], ["time-systems.html", "Системы измерения времени в астрономии"], ["reduction-calculations.html", "Редукционные вычисления в астрономии"]] },
      { title: "Тема 05. Приборы для астрономо-геодезических измерений", lessons: [["angle-measuring-instruments.html", "Угломерные приборы и астрономические теодолиты"], ["time-measurement-instruments.html", "Приборы для измерения и регистрации времени"], ["automation-and-errors.html", "Автоматизация наблюдений, источники ошибок и поправки"]] },
      { title: "Тема 06. Методы астрономических наблюдений в геодезии", lessons: [] },
    ]
  },
};
