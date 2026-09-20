/* ============================================================
   ГеоЛиния · структура курсов
   Единый источник данных для боковых панелей уроков.
   Формат: window.COURSES_DATA[courseId] = {
     title, topics: [ { title, lessons: [ [файл, название], ... ] } ]
   }
   ============================================================ */
window.COURSES_DATA = {
  "geodesy-course-1": {
    title: "Геодезия. Курс 1",
    topics: [
      {
        title: "Тема 01. Введение в геодезию",
        lessons: [
          ["subject-and-tasks-of-geodesy.html", "Предмет и задачи геодезии"],
          ["history-of-geodesy.html", "Краткие сведения из истории геодезии"],
          ["history-of-geodetic-instruments.html", "Краткая история геодезических приборов"],
          ["earth-shape-and-size.html", "Форма и размеры Земли"]
        ]
      },
      {
        title: "Тема 02. Геодезическое оборудование",
        lessons: [
          ["modern-geodetic-instruments.html", "Современные геодезические приборы"],
          ["gnss-equipment.html", "ГНСС-оборудование: принцип работы"],
          ["distance-measurement.html", "Измерение расстояний"],
          ["measuring-tape.html", "Измерение расстояний рулеткой"],
          ["stadia-rangefinder.html", "Нитяный дальномер"],
          ["theodolites-classification-and-design.html", "Теодолиты: классификация, устройство и принцип работы"],
          ["theodolite-checks.html", "Теодолиты: поверки и юстировки"],
          ["theodolite-horizontal-angles.html", "Измерение горизонтальных углов теодолитом"],
          ["theodolite-vertical-angles.html", "Измерение вертикальных углов теодолитом"],
          ["levels-classification-and-design.html", "Нивелиры: классификация, устройство и принцип работы"],
          ["level-checks-and-adjustments.html", "Нивелиры: поверки и юстировки"]
        ]
      },
      {
        title: "Тема 03. Топографические карты и планы",
        lessons: [
          ["orthogonal-projection.html", "Ортогональная проекция"],
          ["cartographic-projections.html", "Картографические проекции"],
          ["gauss-kruger-projection.html", "Проекция Гаусса-Крюгера"],
          ["plan-map-profile.html", "Топографические карты и планы"],
          ["topographic-symbols.html", "Топографические условные знаки"],
          ["lmp-and-tgt.html", "Использование ЛМП и ТГТ"],
          ["landform-types.html", "Рельеф"],
          ["contour-lines.html", "Горизонтали"],
          ["digital-terrain-models.html", "Цифровые модели местности"]
        ]
      },
      {
        title: "Тема 04. Системы координат и ориентирование",
        lessons: [
          ["geodetic-coordinate-system.html", "Геодезическая система координат"],
          ["line-orientation-on-map.html", "Ориентирование линий на карте"],
          ["direct-and-inverse-geodetic-problems.html", "Прямая и обратная геодезические задачи"],
          ["directional-angle-transfer.html", "Передача дирекционных углов"]
        ]
      },
      {
        title: "Тема 05. Топографическая съёмка местности",
        lessons: [
          ["inaccessible-distance.html", "Определение недоступного расстояния"],
          ["survey-control.html", "Съёмочное обоснование"],
          ["state-geodetic-network-points.html", "Пункты государственной геодезической сети"],
          ["coordinate-register-calculation.html", "Вычисление ведомости координат"]
        ]
      }
    ]
  },
  "measurement-errors": {
    title: "Теория погрешностей",
    topics: [
      {
        title: "Тема 01. Случайные события",
        lessons: [
          ["probability-basics.html", "Основы теории вероятностей: основные понятия"]
        ]
      },
      {
        title: "Тема 02. Комбинаторика",
        lessons: [
          ["combinatorics-basics.html", "Комбинаторика: перестановки, размещения, сочетания"]
        ]
      },
      {
        title: "Тема 03. Вероятности событий",
        lessons: [
          ["probability-theorems.html", "Вероятность события. Условная вероятность. Сложение и умножение"]
        ]
      }
    ]
  },
  "geodetic-astronomy": {
    title: "Основы геодезической астрономии",
    topics: [
      {
        title: "Тема 01. Небесная сфера и системы координат",
        lessons: [
          ["celestial-sphere.html", "Небесная сфера и системы координат"]
        ]
      },
      {
        title: "Тема 02. Связи систем координат и времени",
        lessons: [
          ["coord-time-links.html", "Связи систем координат и времени"]
        ]
      },
      {
        title: "Тема 03. Системы измерения времени",
        lessons: [
          ["time-systems.html", "Системы измерения времени в астрономии"]
        ]
      }
    ]
  }
};
