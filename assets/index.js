/* Extracted from index.html for separate browser caching (fixed build 2026-10-18). */
// Предотвращение нежелательного автоскролла браузерами при загрузке страницы
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        if (window.location.hash && window.location.hash !== '#privacy' && window.location.hash !== '#privacy-modal' && window.location.hash !== '#sources-modal' && window.location.hash !== '#sources') {
            history.replaceState(null, null, window.location.pathname + window.location.search);
        }

        // Глобальный мониторинг стабильности и ошибок скриптов
        window.addEventListener('error', function(e) {
            console.warn('[Global Handler] Non-fatal runtime notice:', e.message || e);
        });
        window.addEventListener('unhandledrejection', function(e) {
            console.warn('[Global Handler] Unhandled promise rejection notice:', e.reason);
        });

        /* ==========================================================================
           ДАННЫЕ: СЛОВАРЬ ПЕРЕВОДА (RU / EN)
           Позволяет переключать язык всего сайта в 1 клик без перезагрузки.
           ========================================================================== */

        // Безопасный доступ к localStorage: сайт продолжает работать, если хранилище запрещено.
        function safeStorageGet(key, fallback = null) {
            try { const value = window.localStorage.getItem(key); return value === null ? fallback : value; }
            catch (e) { return fallback; }
        }
        function safeStorageSet(key, value) {
            try { window.localStorage.setItem(key, value); return true; }
            catch (e) { return false; }
        }
        function safeStorageRemove(key) {
            try { window.localStorage.removeItem(key); return true; }
            catch (e) { return false; }
        }

        function getInitialLanguage() {
            try {
                const q = new URLSearchParams(window.location.search).get('lang');
                if (q === 'ru' || q === 'en') { safeStorageSet('krasnoufimsk_lang', q); return q; }
            } catch (e) {}
            return safeStorageGet('krasnoufimsk_lang', 'ru') === 'en' ? 'en' : 'ru';
        }
        let currentLang = getInitialLanguage();
        function getScrollBehavior() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'; }

        const themeBtn = document.getElementById('theme-switch-btn');
        const themeIcon = document.getElementById('theme-icon');
        let defaultTheme = 'light';
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            defaultTheme = 'dark';
        }
        const currentTheme = safeStorageGet('kuf_theme') || safeStorageGet('krasnoufimsk_theme', defaultTheme);
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            if (themeIcon) themeIcon.textContent = '🌙';
        }
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                if (document.body.classList.contains('dark-theme')) {
                    themeIcon.textContent = '☀️';
                    safeStorageSet('kuf_theme', 'dark');
                    safeStorageSet('krasnoufimsk_theme', 'dark');
                } else {
                    themeIcon.textContent = '🌙';
                    safeStorageSet('kuf_theme', 'light');
                    safeStorageSet('krasnoufimsk_theme', 'light');
                }
                if (typeof refreshSightsBaseLayer === 'function') refreshSightsBaseLayer();
            });
        }


        const i18n = {
            ru: {
                logoTitle: 'Красноуфимск',
                logoSub: 'Сквозь эпохи',
                cityName: 'Красноуфимск',
                weatherTitle: 'Погода в Красноуфимске',
                weatherCoords: 'Свердловская область • 56,6° с.ш., 57,8° в.д.',
                weatherLive: 'Онлайн',
                weatherFeels: 'Ощущается',
                weatherWind: 'Ветер',
                weatherHumidity: 'Влажность',
                weatherPrecip: 'Осадки',
                weatherPressure: 'Давление',
                weatherForecastTitle: 'Прогноз на 7 дней',
                weatherUpdated: 'Ожидание данных...',
                weatherRefresh: 'Обновить',
                navHome: 'Главная',
                navIntro: 'О городе',
                navTimeline: 'Лента',
                navRoutes: 'Маршруты',
                navGuide: 'Памятка',
                navQuiz: 'Викторина',
                navMenuTitle: 'Разделы путеводителя',
                heroBadge: '🏛️ Краеведческий веб-проект • 2026',
                heroMain: 'КРАСНОУФИМСК',
                heroSeason: 'СКВОЗЬ ЭПОХИ',
                heroDesc: 'Интерактивное путешествие сквозь века: от пограничной казачьей крепости на берегах реки Уфы до уютного современного города с уникальным архитектурным и природным наследием.',
                statFounded: 'Год основания',
                statEpochs: 'Ключевых эпох',
                statYears: 'Истории города',
                statMonuments: 'Объектов в каталоге',
                exploreHistory: 'Исследовать историю',
                introHeading: 'Город на живописных берегах реки Уфы',
                introText: 'Красноуфимск — исторический город на юго-западе Свердловской области. Заложенный как форпост для защиты уральских заводов, город вобрал в себя летопись пугачёвского восстания, купеческие традиции, триумф инженерной мысли в виде знаменитых виадуков и трудовой подвиг в годы Великой Отечественной войны. Ниже представлена интерактивная летопись из 21 этапа, определивших судьбу Красноуфимска.',
                seasonSwitchLabel: '🎨 Режим визуализации темы сайта:',
                btnAuto: '🔄 Авто',
                btnAutumn: '🍂 Осень',
                btnWinter: '❄️ Зима',
                btnSpring: '🌿 Весна',
                btnSummer: '☀️ Лето',
                routesBadge: 'Пешеходные гиды',
                routesHeading: 'Туристические маршруты по Красноуфимску',
                routesSub: 'Готовые маршруты для самостоятельного знакомства с историческим наследием города',
                r1Title: '«Историческое ядро»',
                r1Desc: 'Знакомство со старинными каменными особняками уездного купечества и духовными центрами города.',
                r2Title: '«Панорама Уфы и Красный Яр»',
                r2Desc: 'Прогулка по видовым холмам крепости с выходом к набережной реки Уфа и территории «Красный Яр»; доступность нижнего уровня уточняйте перед прогулкой.',
                r3Title: '«Виадуки начала XX века»',
                r3Desc: 'Автомобильно-велосипедный маршрут к арочным бетонным виадукам начала XX века.',
                rTime: 'Время:',
                rDist: 'Дистанция:',
                rPoints: 'Точки:',
                r1TimeVal: '~45 минут',
                r1DistVal: '1,8 км (~2 500 шагов)',
                r1PointsVal: 'Музей → Земская управа → Свято-Троицкий собор',
                r2TimeVal: '~1 час 15 минут',
                r2DistVal: '2,6 км (~3 600 шагов)',
                r2PointsVal: 'Красный Яр → Дивья гора → Амфитеатр',
                r3TimeVal: '~2,5 часа',
                r3DistVal: '32 км (авто / вело)',
                r3PointsVal: 'Рябиновский виадук → виадук Саранинский Лог',
                btnRouteTimeline: 'Смотреть объекты в ленте времени',
                guideBadge: '🎒 Полезно для поездки',
                guideTitle: 'Памятка для туриста: Красноуфимск',
                guideSubtitle: 'Всё самое важное для комфортного путешествия по историческому городу на юго-западе Свердловской области',
                g1Title: 'Как добраться',
                g1Desc: 'Скорые электропоезда Екатеринбург — Красноуфимск (около 3 ч 25 мин; расписание и тип поезда проверяйте на дату) и поезда дальнего следования. На автомобиле из Екатеринбурга — по Р-242 до Ачита и далее по региональной дороге; с запада к Ачиту можно подъехать по М-12 «Восток».',
                g1Btn: '🚆 Маршрут к ж/д вокзалу →',
                g2Title: 'Что посмотреть',
                g2Desc: 'Краеведческий музей с макетом крепости 1736 года, панорама с Дивьей горы на реку Уфу, набережная и территория проекта «Красный Яр» (нижний уровень благоустраивается), исторический вокзал (мастерская А. В. Щусева) и вековые виадуки.',
                g2Btn: '📜 Смотреть объекты в ленте →',
                g3Title: 'Где отдохнуть и поесть',
                g3Desc: 'Уютные городские кафе и кофейни на исторической улице Советской и смотровые площадки у реки Уфы. Попробуйте знаменитую уральскую выпечку, шаньги и травяной чай.',
                g3Btn: '🍽️ Найти кафе на Яндекс.Картах →',
                g4Title: 'Советы для прогулки',
                g4Desc: 'Красноуфимск расположен на живописных холмах — выбирайте удобную обувь для прогулок. Исторический центр города компактен: ключевые особняки легко обойти пешком за 1,5–2 часа.',
                g4Btn: '🚶 Выбрать пеший маршрут →',
                g5Title: 'Лучшие фотолокации',
                g5Desc: '1) Панорама с Дивьей горы на излучину реки Уфы; 2) Белоснежный амфитеатр набережной; 3) Арочный Рябиновский виадук; 4) Резные карнизы купеческих кирпичных особняков XIX века.',
                g5Btn: '📷 Открыть Дивью гору на карте →',
                g6Title: 'Сувениры и гостинцы',
                g6Desc: 'Сувениры с серебряным соколом и древней спиралью геликоприона в краеведческом музее, знаменитая свежая красноуфимская выпечка, таёжный мёд и ферментированный иван-чай.',
                g6Btn: '🏛️ Сувенирная лавка в музее →',
                btnPrint: 'Сохранить памятку в PDF',
                g2TitlePrint: 'История в датах',
                g3TitlePrint: 'Топ-5 достопримечательностей',
                g5TitlePrint: 'Практическая информация',
                quizBadge: '💡 Проверь свои знания',
                quizHeading: 'Викторина: «Знаток Красноуфимска»',
                quizSub: 'Ответьте на вопросы 3 уровней сложности по истории города и получите именной диплом!',
                btnStartQuiz: 'Начать викторину',
                btnCollapseQuiz: 'Свернуть викторину',
                quizRestart: 'Пройти викторину заново',
                quizDownloadCert: 'Получить диплом А4',
                certClaimLabel: 'Именной диплом знатока (формат А4 для печати)',
                certNamePlaceholder: 'Введите ваше имя и фамилию',
                footerLogo: 'Красноуфимск: Сквозь эпохи',
                footerProject: 'Выполнен в ходе индивидуального проекта.',
                footerCopy: 'Красноуфимск • 2026 год. Разработано с гордостью за родной край.',
                addressLabel: 'Адрес объекта',
                btnMap: 'Показать на Яндекс.Картах',
                btnPrev: '← Предыдущая эпоха',
                btnNext: 'Следующая эпоха →',
                btnFinal: 'Финал ленты времени ✓',
                epochWord: 'Эпоха',
                fromWord: 'из 21',
                factTitle: 'Исторический факт:',

                // Навигация
                plannerCtaBadge: '🧭 Планирование поездки • 2026',
                plannerCtaTitle: 'Планируете поездку в Красноуфимск?',
                plannerCtaDesc: 'Сравните варианты дороги из вашего города — поезд, автобус или автомобиль; для Екатеринбурга доступен скорый электропоезд. Планировщик покажет ориентировочное время в пути, примерную смету и рекомендуемую программу, а расписание и тариф нужно проверить на дату поездки.',
                plannerCtaBtn: 'Открыть планировщик поездки →',
                navSights: 'Достопримечательности',
                sightsMenuLabel: 'Меню достопримечательностей:',
                navSightsDropdownHeader: 'Объекты наследия:',

                // Достопримечательности
                sightsBadge: '🏛️ Культурное наследие • Объекты истории, архитектуры и природы',
                sightsHeading: 'Достопримечательности и памятники Красноуфимска',
                sightsSub: 'Интерактивный каталог памятников истории, архитектуры и природы Красноуфимска. Выберите объект, чтобы прочитать описание, исторический факт и адрес, а также найти его на карте.',
                sightsMapBadge: '📍 Интерактивная карта',
                sightsMapTitle: '27 объектов каталога на карте Красноуфимска',
                sightsMapDesc: 'Нажмите на любую метку, чтобы открыть краткую справку и перейти к подробному изучению объекта в каталоге.',
                sightsMapReset: '🎯 Показать все объекты',
                mapFilterAll: '🌟 Все (27)',
                mapFilterArch: '🏛️ Архитектура (12)',
                mapFilterMonuments: '🚩 Памятники (9)',
                mapFilterNature: '🌿 Природа (4)',
                mapFilterEng: '🌉 Виадуки и Ж/Д (2)',
                sightsMapHint: '💡 Нажатие на карточку в каталоге выше автоматически центрирует карту на выбранном памятнике',
                mapPopupMore: '🔍 Подробнее в каталоге',
                btnOpenMap: '📍 Открыть на Яндекс.Картах',
                btnRouteOpenMap: 'Открыть маршрут на Яндекс.Картах',

                // Викторина
                quizExplainerTitle: '💡 Исторический факт-пояснение:',
                quizCounterLabel: 'Вопрос',
                quizCounterOf: 'из',
                quizPrev: '← Назад',
                quizNext: 'Далее →',
                quizFinish: '🏆 Показать результат',
                quizScore: 'Правильных ответов:',
                quizOutOf: 'из',
                quizCorrect: '✅ Верно!',
                quizWrong: '❌ Неверно!',
                quizResult5: '🏆 Отлично! Вы настоящий знаток истории Красноуфимска!',
                quizResult4: '👍 Хорошо! Вы хорошо знаете историю города.',
                quizResult3: '📖 Неплохо! Почитайте о достопримечательностях подробнее.',
                quizResult2: '🔍 Стоит изучить историю города! Пройдите ленту времени.',

                // Паспорт исследователя и достижения
                passportNav: 'Паспорт исследователя',
                passportModalTitle: 'Паспорт исследователя',
                passportModalSub: 'Красноуфимск • Сквозь эпохи',
                passportRankLabel: 'Ранг:',
                passportBadgesLabel: 'наград',
                passportReset: '🔄 Сбросить прогресс',
                passportDone: 'Готово',
                achieveToastTag: 'Новое достижение!',
                achieveToastBtn: 'Паспорт',
                achieveUnlockedTag: 'Получено!',
                achieveLockedTag: 'В процессе',

                // Юридическая информация и конфиденциальность (152-ФЗ / GDPR)
                footerPrivacyLink: '🔒 Политика конфиденциальности и 152-ФЗ',
                footerSourcesLink: '📚 Источники и кредиты',
                sourcesModalTitle: 'Источники и кредиты',
                sourcesModalSub: 'Красноуфимск: Сквозь эпохи • 2026',
                sourcesModalIntro: 'Ключевые даты, адреса и координаты сверены 19 октября 2026 года по открытым источникам ниже. Юридические статусы объектов перед официальным использованием следует подтверждать актуальной записью ЕГРОКН.',
                sourceOfficial: 'Официальная историческая справка городского округа Красноуфимск',
                sourceMuseumHelicoprion: 'Красноуфимский краеведческий музей: геликоприон',
                sourceMuseumViaducts: 'виадуки',
                sourceCathedral: 'Екатеринбургская епархия: Свято-Троицкий собор',
                sourceWikivoyage: 'Wikivoyage: Красноуфимск',
                sourceHeritageList: 'открытый список культурного наследия',
                sourceWeatherSchool: 'Краеведческий музей: метеорологическая станция при реальном училище (1877)',
                sourceWeatherStation: 'станция Красноуфимск 28434 с 1 июня 1924 года',
                sourceKrasnyYar: 'KSK66: ход благоустройства «Красного Яра» на 16 октября 2026 года',
                sourceMapCredits: 'локальный PMTiles-пакет Protomaps на данных OpenStreetMap',
                sourcesDoneBtn: 'Понятно',
                footerTerms: 'Школьный образовательный краеведческий проект',
                printHist1: '<strong>1736</strong> — Основание крепости Красный Яр полковником А. И. Тевкелевым',
                printHist2: '<strong>1781 / 1783</strong> — Статус уездного города (1781 г.), высочайшее утверждение герба с соколом (1783 г.)',
                printHist3: '<strong>1875</strong> — Реальное училище в Красноуфимске',
                printHist4: '<strong>1880–1886</strong> — Работа М. И. Мизерова и строительство земской больницы',
                printHist5: '<strong>1915–1920</strong> — Здание вокзала (1915), первый паровоз (1916), открытие станции для движения (1919), сквозное движение (1920)',
                printHist6: '<strong>1941–1945</strong> — Красноуфимцы на фронте и в тылу',
                printHist7: '<strong>2026</strong> — 290-летие города',
                printTop1: '🏛️ <strong>Краеведческий музей</strong> — ул. Советская, 42',
                printTop2: '⛪ <strong>Свято-Троицкий собор</strong> — ул. Куйбышева, 5',
                printTop3: '🚂 <strong>Вокзал (мастерская А. В. Щусева)</strong> — ул. Станционная, 11',
                printTop4: '🌊 <strong>Набережная Красный Яр</strong>',
                printTop5: '🌉 <strong>Рябиновский виадук</strong>',
                printPrac1: '📍 <strong>Центр:</strong> пл. Ленина / ул. Советская',
                printPrac2: '🏥 <strong>Красноуфимская ЦРБ:</strong> ул. Транспортная, 12',
                printPrac3: '🏥 <strong>Музей земской больницы Мизерова:</strong> ул. Свободы, 16',
                printPrac4: '🏨 <strong>Гостиницы:</strong> есть в центре города',
                printPrac5: '🎁 <strong>Сувениры:</strong> Краеведческий музей (ул. Советская, 42)',
                printPrac6: '🚕 <strong>Транспорт:</strong> Местные службы такси и автобусы',
                skipLink: 'Перейти к основному содержанию',
                mapAltText: 'Текстовая альтернатива карте: тот же каталог из 27 объектов находится выше — выбирайте объект кнопками, поиском или списком. Маркеры карты доступны с клавиатуры клавишей Tab.',
                privacyModalTitle: 'Политика конфиденциальности и 152-ФЗ',
                privacyModalSub: 'Красноуфимск: Сквозь эпохи • 2026',
                privacyP1: '<strong>1. Статус проекта и оператор:</strong> Интерактивный путеводитель «Красноуфимск: Сквозь эпохи» является некоммерческим исследовательским образовательно-краеведческим веб-ресурсом, созданным в ходе индивидуального проекта.',
                privacyP2: '<strong>2. Локальное хранилище (localStorage) и cookie:</strong> Проект не использует сторонние трекеры персональных данных. Данные о выбранной теме оформления (сезоне), языке (RU/EN), настройках калькулятора поездки и прогрессе викторины сохраняются <em>исключительно на вашем устройстве</em> в локальной памяти браузера.',
                privacyP3: '<strong>3. Персональные данные (152-ФЗ и GDPR):</strong> Сайт не собирает, не запрашивает и не передаёт третьим лицам паспортные данные, номера телефонов, платёжные реквизиты или реальные геолокационные треки. Имя для сертификата исследователя генерируется на клиенте и не покидает ваш браузер.',
                privacyP4: '<strong>4. Внешние сервисы и API:</strong> Прогноз погоды и геокодирование городов запрашиваются через защищённые протоколы HTTPS у служб Open-Meteo и Met.no. Сайт сам не отправляет им ваше имя или геолокацию, но, как при любом сетевом запросе, эти службы технически получают IP-адрес и User-Agent браузера по своим политикам.',
                privacyP5: '<strong>5. Материалы проекта:</strong> В оформлении используются сезонные фоновые изображения из исходной версии проекта, системные эмодзи и элементы интерфейса. Фотографии в карточках достопримечательностей не размещаются, а графика не выдаётся за архивную фотохронику.',
                privacyDoneBtn: 'Понятно',
                cookieNotice: 'Уведомление: сайт сохраняет локальные настройки темы, языка и прогресса в localStorage вашего браузера; кнопка ниже лишь скрывает это уведомление. Аналитические cookie не используются.',
                cookieAccept: 'Принять',
                cookieInfo: 'Подробнее',

                // PWA: Установка веб-приложения
                pwaBadge: '📲 Мобильное приложение PWA',
                pwaTitle: 'Установите путеводитель на смартфон или ПК',
                pwaSubtitle: 'Быстрый доступ ко всем 27 достопримечательностям, истории и викторине даже без интернета (офлайн). Без App Store и Google Play — в 1 клик!',
                pwaFeat1Title: 'Работает офлайн',
                pwaFeat1Desc: 'Все статьи, маршруты и викторина доступны без связи',
                pwaFeat2Title: 'Мгновенный запуск',
                pwaFeat2Desc: 'Отдельное окно на весь экран без лишних рамок браузера',
                pwaFeat3Title: 'Без магазина приложений',
                pwaFeat3Desc: 'Устанавливается из браузера; объём кэша зависит от устройства и браузера',
                pwaBtnInstall: 'Установить приложение',
                pwaHintDefault: 'Для iPhone/iPad: нажмите «Поделиться» ⎋ в Safari и выберите «На экран "Домой" ➕»'
            },
            en: {
                logoTitle: 'Krasnoufimsk',
                logoSub: 'Through the Ages',
                cityName: 'Krasnoufimsk',
                weatherTitle: 'Weather in Krasnoufimsk',
                weatherCoords: 'Sverdlovsk Region • 56.6° N, 57.8° E',
                weatherLive: 'Live',
                weatherFeels: 'Feels like',
                weatherWind: 'Wind',
                weatherHumidity: 'Humidity',
                weatherPrecip: 'Precip.',
                weatherPressure: 'Pressure',
                weatherForecastTitle: '7-Day Forecast',
                weatherUpdated: 'Waiting for data...',
                weatherRefresh: 'Refresh',
                navHome: 'Home',
                navIntro: 'About',
                navTimeline: 'Timeline',
                navRoutes: 'Routes',
                plannerCtaBadge: '🧭 Trip Planning • 2026',
                plannerCtaTitle: 'Planning a trip to Krasnoufimsk?',
                plannerCtaDesc: 'Compare train, bus and car options from your city; a fast electric train is available from Yekaterinburg. The planner shows an estimated journey time, an approximate budget and a recommended itinerary, while timetables and fares must be checked for your travel date.',
                plannerCtaBtn: 'Open Trip Planner →',
                navGuide: 'Tourist Guide',
                navQuiz: 'Quiz',
                navMenuTitle: 'Navigation Menu',
                heroBadge: '🏛️ Educational Web Project • 2026',
                heroMain: 'KRASNOUFIMSK',
                heroSeason: 'THROUGH THE AGES',
                heroDesc: 'An interactive journey through centuries: from a frontier wooden fortress on the banks of the Ufa River to a charming modern city with rich cultural and natural heritage.',
                statFounded: 'Year founded',
                statEpochs: 'Key epochs',
                statYears: 'Years of history',
                statMonuments: 'Places in the catalogue',
                exploreHistory: 'Explore history',
                introHeading: 'City on the scenic banks of the Ufa River',
                introText: 'Krasnoufimsk is a historical city in southwestern Sverdlovsk Oblast. Founded as an outpost to protect Ural factories, it witnessed Pugachev’s rebellion, merchant prosperity, landmark viaduct engineering, and wartime labor heroics. Below is an interactive chronicle of 21 defining milestones.',
                seasonSwitchLabel: '🎨 Site theme visualization mode:',
                btnAuto: '🔄 Auto',
                btnAutumn: '🍂 Autumn',
                btnWinter: '❄️ Winter',
                btnSpring: '🌿 Spring',
                btnSummer: '☀️ Summer',
                routesBadge: 'Walking guides',
                routesHeading: 'Tourist Routes in Krasnoufimsk',
                routesSub: 'Ready-made itineraries for exploring the city’s rich historical landmarks',
                r1Title: '«Historic Core»',
                r1Desc: 'Explore historic stone merchant mansions and spiritual centres of the town.',
                r2Title: '«Ufa River Panorama»',
                r2Desc: 'Scenic walk along the fortress hills to the Ufa River embankment and Krasny Yar area; check access to the lower level before your walk.',
                r3Title: '«Early 20th-Century Viaducts»',
                r3Desc: 'Car or bicycle route to early 20th-century concrete arched railway viaducts.',
                rTime: 'Time:',
                rDist: 'Distance:',
                rPoints: 'Waypoints:',
                r1TimeVal: '~45 minutes',
                r1DistVal: '1.8 km (~2,500 steps)',
                r1PointsVal: 'Museum → Zemstvo Board → Holy Trinity Cathedral',
                r2TimeVal: '~1 hour 15 minutes',
                r2DistVal: '2.6 km (~3,600 steps)',
                r2PointsVal: 'Krasny Yar → Divya Mountain → Amphitheater',
                r3TimeVal: '~2.5 hours',
                r3DistVal: '32 km (car / bicycle)',
                r3PointsVal: 'Ryabinovsky Viaduct → Saraninsky Log Viaduct',
                btnRouteTimeline: 'View landmarks in timeline',
                guideBadge: '🎒 Travel Tips',
                guideTitle: 'Tourist Guide: Krasnoufimsk',
                guideSubtitle: 'Essential information for a comfortable visit to a historical city in southwestern Sverdlovsk Oblast',
                g1Title: 'How to get here',
                g1Desc: 'Fast electric trains from Yekaterinburg to Krasnoufimsk (about 3 h 25 min; check the timetable and train type for your date) and long-distance trains. By car from Yekaterinburg, take R-242 to Achit and then the regional road; from the west, Achit can be reached via the M-12 Vostok expressway.',
                g1Btn: '🚆 Directions to railway station →',
                g2Title: 'What to see',
                g2Desc: 'Regional Lore Museum with 1736 fortress model, panoramic view from Divya Mountain over Ufa River, the embankment and Krasny Yar project area (the lower level is being upgraded), historic railway station (workshop of A. Shchusev), and historic viaducts.',
                g2Btn: '📜 View landmarks in timeline →',
                g3Title: 'Where to eat & relax',
                g3Desc: 'Cozy cafes along historic Sovetskaya Street and scenic viewpoints on the Ufa River. Try traditional Ural shangi, fresh bakery, and wild herbal tea.',
                g3Btn: '🍽️ Find cafes on Yandex Maps →',
                g4Title: 'Walking tips',
                g4Desc: 'Krasnoufimsk is situated on scenic hills — wear comfortable walking shoes. The historic downtown is compact: all key merchant mansions can be easily explored on foot in 1.5–2 hours.',
                g4Btn: '🚶 Choose walking route →',
                g5Title: 'Top photo spots',
                g5Desc: '1) Panorama from Divya Mountain over the Ufa River bend; 2) Embankment amphitheater; 3) Arched Ryabinovsky viaduct; 4) Elaborate brick masonry of 19th-century merchant mansions.',
                g5Btn: '📷 Open Divya Mountain on map →',
                g6Title: 'Souvenirs & Delicacies',
                g6Desc: 'Silver falcon & helicoprion spiral souvenirs at the museum, famous local fresh bakery, natural Bashkir-Ural honey, and authentic fermented Ivan-tea.',
                g6Btn: '🏛️ Museum souvenir shop →',
                btnPrint: 'Save guide as PDF',
                g2TitlePrint: 'History in Dates',
                g3TitlePrint: 'Top-5 Sights',
                g5TitlePrint: 'Practical Information',
                quizBadge: '💡 Test your knowledge',
                quizHeading: 'Quiz: «Krasnoufimsk Expert»',
                quizSub: 'Answer questions across 3 difficulty levels on city history and claim your personalized diploma!',
                btnStartQuiz: 'Start Quiz',
                btnCollapseQuiz: 'Collapse Quiz',
                quizRestart: 'Restart Quiz',
                quizDownloadCert: 'Get A4 Diploma',
                certClaimLabel: 'Personalized Expert Diploma (Print-Ready A4)',
                certNamePlaceholder: 'Enter your full name',
                footerLogo: 'Krasnoufimsk: Through the Ages',
                footerProject: 'Completed as part of an individual project.',
                footerCopy: 'Krasnoufimsk • 2026. Built with pride for our homeland.',
                addressLabel: 'Location Address',
                btnMap: 'Show on Yandex Maps',
                btnPrev: '← Previous epoch',
                btnNext: 'Next epoch →',
                btnFinal: 'Timeline Complete ✓',
                epochWord: 'Epoch',
                fromWord: 'of 21',
                factTitle: 'Historical fact:',

                // Navigation
                navSights: 'Sights',
                sightsMenuLabel: 'Landmarks Menu:',
                navSightsDropdownHeader: 'Heritage Objects:',

                // Sights & Heritage
                sightsBadge: '🏛️ Cultural Heritage • Heritage Objects',
                sightsHeading: 'Krasnoufimsk Landmarks & Monuments',
                sightsSub: 'Interactive catalogue of key historical, architectural and natural monuments. Choose an object to read its description, historical fact and address, and locate it on the map.',
                sightsMapBadge: '📍 Interactive Map',
                sightsMapTitle: '27 Catalogue Places on the Map of Krasnoufimsk',
                sightsMapDesc: 'Click any marker to view a brief summary and explore the landmark in detail.',
                sightsMapReset: '🎯 Show All Sites',
                mapFilterAll: '🌟 All (27)',
                mapFilterArch: '🏛️ Architecture (12)',
                mapFilterMonuments: '🚩 Monuments (9)',
                mapFilterNature: '🌿 Nature (4)',
                mapFilterEng: '🌉 Viaducts & Rail (2)',
                sightsMapHint: '💡 Selecting an item in the catalog above automatically centers the map on the chosen landmark',
                mapPopupMore: '🔍 View in Catalog',
                btnOpenMap: '📍 Open in Yandex Maps',
                btnRouteOpenMap: 'Open route in Yandex Maps',

                // Quiz
                quizExplainerTitle: '💡 Historical Educational Fact:',
                quizCounterLabel: 'QUESTION',
                quizCounterOf: 'OF',
                quizPrev: '← Back',
                quizNext: 'Next →',
                quizFinish: '🏆 Show Result',
                quizScore: 'Correct answers:',
                quizOutOf: 'out of',
                quizCorrect: '✅ Correct!',
                quizWrong: '❌ Incorrect!',
                quizResult5: '🏆 Excellent! You are a true expert!',
                quizResult4: '👍 Good! You know the city well.',
                quizResult3: '📖 Not bad! Read more about the sights.',
                quizResult2: '🔍 Worth studying! Check out the timeline.',

                // Explorer Passport and Achievements
                passportNav: 'Explorer Passport',
                passportModalTitle: 'Explorer Passport',
                passportModalSub: 'Krasnoufimsk • Through the Ages',
                passportRankLabel: 'Rank:',
                passportBadgesLabel: 'badges',
                passportReset: '🔄 Reset Progress',
                passportDone: 'Done',
                achieveToastTag: 'New Achievement!',
                achieveToastBtn: 'Passport',
                achieveUnlockedTag: 'Unlocked!',
                achieveLockedTag: 'In progress',

                // Legal & Privacy Compliance (152-FZ / GDPR)
                footerPrivacyLink: '🔒 Privacy Policy & 152-FZ',
                footerSourcesLink: '📚 Sources & Credits',
                sourcesModalTitle: 'Sources & Credits',
                sourcesModalSub: 'Krasnoufimsk: Through the Ages • 2026',
                sourcesModalIntro: 'Key dates, addresses and coordinates were checked on 19 October 2026 against the open sources below. Legal heritage statuses should be confirmed with a current state-register record before official use.',
                sourceOfficial: 'Official historical note of the Krasnoufimsk urban district',
                sourceMuseumHelicoprion: 'Krasnoufimsk Local History Museum: Helicoprion',
                sourceMuseumViaducts: 'viaducts',
                sourceCathedral: 'Yekaterinburg Diocese: Holy Trinity Cathedral',
                sourceWikivoyage: 'Wikivoyage: Krasnoufimsk',
                sourceHeritageList: 'open cultural heritage list',
                sourceWeatherSchool: 'Local History Museum: meteorological station at the Real School (1877)',
                sourceWeatherStation: 'Krasnoufimsk station 28434, operating since 1 June 1924',
                sourceKrasnyYar: 'KSK66: Krasny Yar improvement progress as of 16 October 2026',
                sourceMapCredits: 'local Protomaps PMTiles package built from OpenStreetMap data',
                sourcesDoneBtn: 'Got it',
                footerTerms: 'School educational local history project',
                printHist1: '<strong>1736</strong> — Krasny Yar fortress founded by Colonel A. I. Tevkelev',
                printHist2: '<strong>1781 / 1783</strong> — District-town status (1781) and imperial approval of the falcon coat of arms (1783)',
                printHist3: '<strong>1875</strong> — Real School in Krasnoufimsk',
                printHist4: '<strong>1880–1886</strong> — Work of M. I. Mizerov and construction of the Zemstvo hospital',
                printHist5: '<strong>1915–1920</strong> — Station building (1915), first locomotive (1916), station opened to traffic (1919), through traffic (1920)',
                printHist6: '<strong>1941–1945</strong> — Krasnoufimsk at the front and on the home front',
                printHist7: '<strong>2026</strong> — 290th anniversary of the town',
                printTop1: '🏛️ <strong>Local History Museum</strong> — 42 Sovetskaya St.',
                printTop2: '⛪ <strong>Holy Trinity Cathedral</strong> — 5 Kuybysheva St.',
                printTop3: '🚂 <strong>Railway station (Shchusev workshop)</strong> — 11 Stantsionnaya St.',
                printTop4: '🌊 <strong>Krasny Yar Embankment</strong>',
                printTop5: '🌉 <strong>Ryabinovsky Viaduct</strong>',
                printPrac1: '📍 <strong>Centre:</strong> Lenin Square / Sovetskaya St.',
                printPrac2: '🏥 <strong>Krasnoufimsk Central District Hospital:</strong> 12 Transportnaya St.',
                printPrac3: '🏥 <strong>Mizerov Zemstvo Hospital Museum:</strong> 16 Svobody St.',
                printPrac4: '🏨 <strong>Hotels:</strong> available in the town centre',
                printPrac5: '🎁 <strong>Souvenirs:</strong> Local History Museum (42 Sovetskaya St.)',
                printPrac6: '🚕 <strong>Transport:</strong> Local taxi services and buses',
                skipLink: 'Skip to main content',
                mapAltText: 'Text alternative to the map: the same catalogue of 27 sights is above — choose a sight with the buttons, search or list. Map markers can be reached with the Tab key.',
                privacyModalTitle: 'Privacy Policy & 152-FZ / GDPR',
                privacyModalSub: 'Krasnoufimsk: Through the Ages • 2026',
                privacyP1: '<strong>1. Project Status & Operator:</strong> The interactive guide "Krasnoufimsk: Through the Ages" is a non-commercial educational local history web resource created as part of an individual project.',
                privacyP2: '<strong>2. Local Storage (localStorage) & Cookies:</strong> The project does not use third-party user tracking. Preferences for design theme (season), language (RU/EN), travel planner settings, and quiz progress are stored <em>solely on your device</em> in local browser storage.',
                privacyP3: '<strong>3. Personal Data (152-FZ & GDPR):</strong> The site does not collect, request, or share passport data, phone numbers, payment details, or geolocation traces with third parties. Explorer certificate names are generated client-side and never leave your browser.',
                privacyP4: '<strong>4. External Services & APIs:</strong> Weather forecasts and city geocoding are requested over secure HTTPS from Open-Meteo and Met.no. The site itself does not send them your name or geolocation, but, as with any network request, those services technically receive your browser IP address and User-Agent under their own policies.',
                privacyP5: '<strong>5. Project Materials:</strong> The design uses the seasonal background images from the original project version, system emoji and interface graphics. Attraction cards do not contain photographs, and graphics are not presented as archival photography.',
                privacyDoneBtn: 'Got it',
                cookieNotice: 'Notice: this site stores local theme, language and progress settings in your browser localStorage; the button below simply dismisses this notice. No analytics cookies are used.',
                cookieAccept: 'Accept',
                cookieInfo: 'Details',

                // PWA Installation
                pwaBadge: '📲 PWA Mobile App',
                pwaTitle: 'Install the Guide on Smartphone or PC',
                pwaSubtitle: 'Fast offline access to all 27 sights, timeline history, and quiz without internet. No App Store or Google Play needed — 1 click!',
                pwaFeat1Title: 'Works Offline',
                pwaFeat1Desc: 'All sights, routes, and quiz available with no connection',
                pwaFeat2Title: 'Instant Launch',
                pwaFeat2Desc: 'Runs in fullscreen standalone mode without browser clutter',
                pwaFeat3Title: 'No App Store Needed',
                pwaFeat3Desc: 'Installs from the browser; cache size depends on your device and browser',
                pwaBtnInstall: 'Install App',
                pwaHintDefault: 'For iPhone/iPad: tap "Share" ⎋ in Safari, then select "Add to Home Screen ➕"'
            }
        };


        /* ==========================================================================
           АВТОНОМНЫЙ РЕЗЕРВНЫЙ БУФЕР ИЗОБРАЖЕНИЙ (IMAGE FALLBACK)
           Гарантирует, что даже если папка images не выгружена на хостинг или возникла ошибка 404,
           фотографии всё равно отобразятся в высоком качестве из встроенного резерва.
           ========================================================================== */
        window.fallbackImages = {};

        

        /* ==========================================================================
           МОБИЛЬНОЕ МЕНЮ (АДАПТИВНАЯ НАВИГАЦИЯ ДЛЯ СМАРТФОНОВ)
           ========================================================================== */
        function toggleMobileMenu() {
            const panel = document.getElementById('mobile-nav-panel');
            const btn = document.getElementById('mobile-menu-btn');
            if (!panel || !btn) return;
            const isOpen = panel.classList.toggle('open');
            btn.classList.toggle('open', isOpen);
            btn.setAttribute('aria-expanded', isOpen);
        }

        function closeMobileMenu() {
            const panel = document.getElementById('mobile-nav-panel');
            const btn = document.getElementById('mobile-menu-btn');
            if (panel) panel.classList.remove('open');
            if (btn) {
                btn.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }
        }

        function handleMobileNavClick(e, targetId) {
            if (e) e.preventDefault();
            closeMobileMenu();
            if (targetId === 'hero') {
                window.scrollTo({ top: 0, behavior: getScrollBehavior() });
            } else {
                scrollToSection(targetId);
            }
        }

        document.addEventListener('click', function (e) {
            const panel = document.getElementById('mobile-nav-panel');
            const btn = document.getElementById('mobile-menu-btn');
            if (panel && panel.classList.contains('open')) {
                if (!panel.contains(e.target) && !btn.contains(e.target)) {
                    closeMobileMenu();
                }
            }
            const sightsWrap = document.getElementById('sights-custom-wrap');
            if (sightsWrap && !sightsWrap.contains(e.target)) {
                if (typeof closeSightsCustomMenu === 'function') {
                    closeSightsCustomMenu();
                }
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (typeof closeMobileMenu === 'function') {
                    closeMobileMenu();
                }
                if (typeof closeSightsCustomMenu === 'function') {
                    closeSightsCustomMenu();
                }
            }
        });

        // Focus trap: пока открыта модалка, Tab не уходит за её пределы
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab') return;
            var dialogs = document.querySelectorAll('[role="dialog"][aria-modal="true"]');
            var openDlg = null;
            for (var i = 0; i < dialogs.length; i++) {
                var st = window.getComputedStyle(dialogs[i]);
                if (st.display !== 'none' && st.visibility !== 'hidden') { openDlg = dialogs[i]; break; }
            }
            if (!openDlg) return;
            var foc = openDlg.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
            if (!foc.length) return;
            var first = foc[0], last = foc[foc.length - 1];
            if (e.shiftKey && (document.activeElement === first || !openDlg.contains(document.activeElement))) {
                e.preventDefault(); last.focus();
            } else if (!e.shiftKey && (document.activeElement === last || !openDlg.contains(document.activeElement))) {
                e.preventDefault(); first.focus();
            }
        });

        // ТЕКСТЫ ДЛЯ 11 КАРТОЧЕК ЭПОХ (ДВУЯЗЫЧНЫЕ)
        // =========================================================================
        // ЛЕНТА ВРЕМЕНИ — 21 КЛЮЧЕВАЯ ЭПОХАЛЬНАЯ ВЕХА ИСТОРИИ КРАСНОУФИМСКА (1736–2026)
        // =========================================================================
        const eventsData = [
            {
                lat: '56.622143', lon: '57.775834',
                year: '1736',
                tag: { ru: '• Основание', en: '• Foundation' },
                badge: { ru: '🏰 Крепость • Форпост', en: '🏰 Fortress • Outpost' },
                title: { ru: '1736 год — Рождение крепости Красный Яр', en: '1736 — Birth of Krasny Yar Fortress' },
                desc: {
                    ru: 'В 1736 году по распоряжению Оренбургской экспедиции полковник Алексей Иванович Тевкелев основал крепость Красный Яр на берегу реки Уфы. Форпост стал южным щитом горнозаводского Урала от набегов кочевников. Внутри крепости располагались церковь, казарма, пороховой погреб и дома первых поселенцев-казаков.',
                    en: 'In 1736, under orders from the Orenburg Expedition, Colonel Alexey Ivanovich Tevkelev founded Krasny Yar fortress on the bank of the Ufa River. The outpost became the southern shield of the mining Ural against nomadic raids, housing a church, barracks, powder cellar, and homes of the first Cossack settlers.'
                },
                fact: {
                    ru: 'По описаниям краеведов, крепость опоясывали деревянные стены с башнями, а по каменному гребню Камешек (прежде — Болгары) были возведены бастионы с пушками. Гарнизону не раз приходилось отражать набеги.',
                    en: 'Krasny Yar fortress was built as a timber quadrangle with corner guard towers and artillery cannons to repel nomadic raids.'
                },
                icon: '🏰',
                mapTitle: { ru: 'Набережная «Красный Яр» — место основания крепости', en: 'Krasny Yar Embankment — site of the original fortress' },
                address: { ru: 'Набережная «Красный Яр» (место крепости 1736 г.)', en: 'Krasny Yar Embankment (fortress site 1736)' },
                mapQuery: 'Красноуфимск улица Советская 1'
            },
            {
                lat: '56.614400', lon: '57.764590',
                directUrl: 'https://yandex.ru/maps/org/krasnoufimskiy_krayevedcheskiy_muzey/1023339938/',
                year: '1755',
                tag: { ru: '• Рост города', en: '• Growth' },
                badge: { ru: '🪵 Слобода • Ремёсла', en: '🪵 Township • Crafts' },
                title: { ru: '1755 год — Слобода и первые ремёсла', en: '1755 — Township \u0026 Early Crafts' },
                desc: {
                    ru: 'К середине XVIII века крепость обросла слободой. Вокруг крепостных стен выросли кузни, кожевенные мастерские, торговые ряды. Казаки активно занимались земледелием, пчеловодством и охотой. Население слободы достигло нескольких сотен человек.',
                    en: 'By the mid-18th century the fortress grew into a township. Smithies, leather workshops and trading rows sprang up around the walls. Cossacks engaged in farming, beekeeping and hunting. The population reached several hundred.'
                },
                fact: {
                    ru: 'В самом Красноуфимске металлургических заводов не было: железо везли с соседних демидовских и осокинских заводов, а красноуфимские кузнецы и кожевники славились изделиями на весь край.',
                    en: 'There were no iron foundries in Krasnoufimsk itself: iron was supplied from neighboring Ural works, while local smiths and leather craftsmen supplied goods across the province.'
                },
                icon: '🪵',
                mapTitle: { ru: 'Исторический центр Красноуфимска (ул. Советская)', en: 'Historic center of Krasnoufimsk (Sovetskaya St.)' },
                address: { ru: 'ул. Советская — историческое ядро города', en: 'Sovetskaya St. — historic town core' },
                mapQuery: 'Красноуфимский краеведческий музей'
            },
            {
                lat: '56.606363', lon: '57.739570',
                year: '1774',
                tag: { ru: '• Пугачёв', en: '• Pugachev' },
                badge: { ru: '🐎 Крестьянская война • Восстание', en: '🐎 Peasant War • Uprising' },
                title: { ru: '1774 год — В огне Пугачёвского бунта', en: '1774 — In the Fire of Pugachev\'s Rebellion' },
                desc: {
                    ru: 'В январе 1774 года отряды Салавата Юлаева захватили Красноуфимскую крепость. В феврале правительственные войска временно вернули её, но в марте повстанцы вновь заняли город. Эти события происходили во время Крестьянской войны под предводительством Емельяна Пугачёва.',
                    en: 'In January 1774, forces led by Salavat Yulayev captured Krasnoufimsk fortress. Government troops temporarily retook it in February, but rebel forces captured the town again in March. These events took place during Yemelyan Pugachev’s Peasant War.'
                },
                fact: {
                    ru: 'Памятный знак Салавату Юлаеву установлен не на Дивьей горе, а на улице Салавата Юлаева. Его открыли 28 июня 2008 года; выбор места предание связывает с юртой Салавата 12 января 1774 года.',
                    en: 'The memorial marker to Salavat Yulaev is not on Divya Mountain but on Salavat Yulaev Street. It was unveiled on 28 June 2008; tradition links the site with Salavat’s yurt on 12 January 1774.'
                },
                icon: '🐎',
                mapTitle: { ru: 'Памятный знак Салавату Юлаеву', en: 'Memorial Marker to Salavat Yulaev' },
                address: { ru: 'ул. Салавата Юлаева', en: 'Salavat Yulaev St.' },
                mapQuery: 'Красноуфимск памятный знак Салавату Юлаеву улица Салавата Юлаева'
            },
            {
                lat: '56.617826', lon: '57.771051',
                year: '1781',
                tag: { ru: '• Герб Сокола', en: '• Falcon Coat of Arms' },
                badge: { ru: '🦅 Императорский указ • Символика', en: '🦅 Imperial Decree • Heraldry' },
                title: { ru: '1781 год — Статус уездного города и герб с соколом (1783)', en: '1781 — District Town Status \u0026 Falcon Emblem (1783)' },
                desc: {
                    ru: 'Указом императрицы Екатерины II в декабре 1781 года Красноуфимск стал уездным городом Пермского наместничества. 17 июля 1783 года городу был высочайше утверждён исторический герб: серебряный сокол на зелёном поле — символ обилия этих благородных птиц в окрестных лесах, зоркости и свободы.',
                    en: 'By decree of Empress Catherine the Great in December 1781, Krasnoufimsk gained district town status in the Perm Viceroyalty. On July 17, 1783, its historic coat of arms was officially granted: a silver falcon on a green field, symbolizing vigilance, nobility and the abundance of these birds in local forests.'
                },
                fact: {
                    ru: 'Образ сокола остаётся главным символом города с момента высочайшего утверждения герба Екатериной II в 1783 году, олицетворяя зоркость, благородство и свободу уральского края.',
                    en: 'The silver falcon has served as the city\'s proud official heraldic emblem since its imperial confirmation by Catherine II in 1783.'
                },
                icon: '🦅',
                mapTitle: { ru: 'Центральная площадь и герб города', en: 'Central Square and Town Coat of Arms' },
                address: { ru: 'пл. Ленина (сердце исторического Красноуфимска)', en: 'Lenina Sq. (historic town center)' },
                directUrl: 'https://yandex.ru/maps/org/v_i_lenin/156209444666/',
                mapQuery: 'Красноуфимск площадь Ленина'
            },
            {
                lat: '56.621297', lon: '57.773395',
                year: '1804',
                tag: { ru: '• Собор', en: '• Cathedral' },
                badge: { ru: '⛪ Каменное зодчество • Духовный центр', en: '⛪ Stone Architecture • Spiritual Center' },
                title: { ru: '1804 год — Возведение Свято-Троицкого собора', en: '1804 — Construction of the Holy Trinity Cathedral' },
                desc: {
                    ru: 'Каменный Свято-Троицкий собор заложили в 1793 году и построили к 1804 году. В 1804 году освятили Никольский придел, а главный Троицкий престол — в 1837 году. Здание переходного от барокко к классицизму стиля с высокой ярусной колокольней стало главной архитектурной доминантой уездного города.',
                    en: 'The stone Holy Trinity Cathedral was begun in 1793 and built by 1804. The St Nicholas side altar was consecrated in 1804 and the main Holy Trinity altar in 1837. Its transitional Baroque-to-Classicism design and tall tiered bell tower made it the district town’s chief architectural landmark.'
                },
                fact: {
                    ru: 'Собор строился на пожертвования горожан и уездного купечества. Сегодня это действующий православный храм и архитектурная доминанта исторического центра.',
                    en: 'The cathedral was built through donations of residents and local merchants. Today it is an active Orthodox church and the architectural dominant of the historic centre.'
                },
                icon: '⛪',
                mapTitle: { ru: 'Свято-Троицкий собор', en: 'Holy Trinity Cathedral' },
                address: { ru: 'ул. Куйбышева, д. 5', en: '5 Kuybysheva St.' },
                directUrl: 'https://yandex.ru/maps/org/sobor_troitsy_zhivonachalnoy_v_krasnoufimske/1031307372/',
                mapQuery: 'Красноуфимск Куйбышева 5 собор'
            },
            {
                lat: '56.614400', lon: '57.764590',
                directUrl: 'https://yandex.ru/maps/org/krasnoufimskiy_krayevedcheskiy_muzey/1023339938/',
                year: '1842',
                mapQuery: 'Красноуфимский краеведческий музей',
                tag: { ru: '• Образование', en: '• Education' },
                badge: { ru: '📚 Уездное училище • Просвещение', en: '📚 County School • Enlightenment' },
                title: { ru: '1842 год — Первое уездное училище', en: '1842 — First County School' },
                desc: {
                    ru: 'В Красноуфимске открылось трёхклассное уездное училище — первое учебное заведение, дававшее систематическое образование детям купцов, мещан и казаков. Вслед за ним появились приходские школы при церквях. Грамотность населения начала неуклонно расти.',
                    en: 'A three-grade county school opened in Krasnoufimsk — the first institution providing systematic education to children of merchants, townspeople and Cossacks. Parish schools at local churches followed, and literacy began to rise steadily.'
                },
                fact: {
                    ru: 'В 1842 году Красноуфимск насчитывал около 2 000 жителей. Уездное училище стало первым светским учебным заведением города; грамотность росла вместе с сетью приходских, а позднее и земских школ.',
                    en: 'In 1842 Krasnoufimsk had about 2,000 residents. The county school became the town’s first secular educational institution; literacy grew as parish and later zemstvo schools appeared.'
                },
                icon: '📚',
                mapTitle: { ru: 'Красноуфимск, исторический центр', en: 'Krasnoufimsk, historic center' },
                address: { ru: 'ул. Советская — центр исторического Красноуфимска', en: 'Sovetskaya St. — historic center' }
            },
            {
                lat: '56.621708', lon: '57.769677',
                year: '1875',
                tag: { ru: '• Реальное училище', en: '• Real School' },
                badge: { ru: '📖 Просвещение • Научные кадры', en: '📖 Enlightenment • Science \u0026 Education' },
                title: { ru: '1875 год — Реальное училище: колыбель науки', en: '1875 — Real School: Cradle of Ural Science' },
                desc: {
                    ru: 'Открылось Красноуфимское шестиклассное Реальное училище с горнозаводским и сельскохозяйственным отделениями — одно из сильнейших учебных заведений Урала своего времени. Здесь готовили передовых агрономов и инженеров. Выпускники училища работали на уральских заводах и создавали основы российской агрономической науки.',
                    en: 'The Krasnoufimsk six-grade Real School opened with mining and agricultural departments and became one of the leading schools of its time in the Urals. Graduates worked at Ural factories and helped lay the foundation of Russian agronomic science.'
                },
                fact: {
                    ru: 'Основателем сельскохозяйственного отделения был первый учёный-агроном Урала Н. А. Соковнин, а его дело продолжили Н. Л. Скалозубов и выдающийся агроном В. Н. Варгин.',
                    en: 'The agricultural department was founded by the Urals’ first scientific agronomist N. A. Sokovnin, with his pioneering work furthered by N. L. Skalozubov and prominent agronomist V. N. Vargin.'
                },
                icon: '📖',
                mapTitle: { ru: 'Бывшее промышленное училище (ул. Ленина, 79)', en: 'Former Industrial School (79 Lenina St.)' },
                address: { ru: 'ул. Ленина, 79', en: '79 Lenina St.' },
                directUrl: 'https://yandex.ru/maps/org/zdaniye_byvshego_krasnoufimskogo_promyshlennogo_uchilishcha_gde_rabotali_agronomy_n_a_sokovnin_n_l_skalozubov_v_n_vargin/60652112866/',
                mapQuery: 'Красноуфимск Ленина 79 бывшее промышленное училище'
            },
            {
                lat: '56.647469', lon: '57.771572',
                year: '1877 → 1924',
                tag: { ru: '• Метеослужба', en: '• Weather Service' },
                badge: { ru: '🌦️ Климат Урала • Наблюдения', en: '🌦️ Ural Climate • Research' },
                title: { ru: '1877 → 1924 гг. — Становление службы погоды: станция ВМО 28434', en: '1877 → 1924 — Weather Service: WMO Station 28434' },
                desc: {
                    ru: 'В 1877 году при Красноуфимском реальном училище Уральское общество любителей естествознания устроило метеорологическую станцию. Современная государственная гидрометеорологическая станция Красноуфимск (международный индекс ВМО 28434) основана 1 июня 1924 года и ведёт наблюдения за климатом Предуралья.',
                    en: 'In 1877 the Ural Society of Natural Science Lovers established a meteorological station at the Krasnoufimsk Real School. The modern state hydrometeorological station Krasnoufimsk (WMO 28434) was founded on 1 June 1924 and records the climate of the Cis-Urals.'
                },
                fact: {
                    ru: 'Наблюдения на Красноуфимской метеостанции ведутся с 1 июня 1924 года — более 100 лет.',
                    en: 'Observations at the Krasnoufimsk weather station have been recorded since 1 June 1924 — for more than 100 years.'
                },
                icon: '🌦️',
                mapTitle: { ru: 'Метеостанция Красноуфимск', en: 'Krasnoufimsk Weather Station' },
                address: { ru: 'ул. Кузнецова, 1', en: '1 Kuznetsova St.' },
                mapQuery: 'улица Кузнецова, 1, Красноуфимск, Свердловская область'
            },
            {
                lat: '56.616173', lon: '57.763080',
                year: '1880–1886',
                tag: { ru: '• Земская медицина', en: '• Zemstvo Medicine' },
                badge: { ru: '🏥 Больница Мизерова • Медицина Урала', en: '🏥 Mizerov Hospital • Ural Medicine' },
                title: { ru: '1880–1886 годы — М. И. Мизеров и земская больница', en: '1880–1886 — M. I. Mizerov and the Zemstvo Hospital' },
                desc: {
                    ru: 'Матвей Иванович Мизеров работал земским врачом в Красноуфимске с 1880 по 1909 год. По его инициативе и проекту в 1886 году был возведён образцовый павильонный комплекс земской больницы, окружённый парком «Целитель» со столетними аллеями лип, сосен, берёз и тополей.',
                    en: 'Matvey Ivanovich Mizerov served as a zemstvo physician in Krasnoufimsk from 1880 to 1909. Under his leadership and design, an exemplary pavilion hospital complex surrounded by Tselitel Park, with old alleys of lindens, pines, birches and poplars, was built in 1886.'
                },
                fact: {
                    ru: 'Больницу построили по павильонной системе — с большими окнами на юг для освещения палат и операционных, а рядом Мизеров заложил парк «Целитель» (1884 год, более тысячи деревьев) с аптекарским огородом. Парк сохранился до сих пор.',
                    en: 'The hospital was built on the pavilion principle, with large south-facing windows to light the wards and operating rooms, and Mizerov laid out the Tselitel Park beside it (1884, over a thousand trees) with an apothecary garden. The park survives to this day.'
                },
                icon: '🏥',
                mapTitle: { ru: 'Земская больница Мизерова (ул. Свободы, 16)', en: 'Mizerov Zemstvo Hospital (16 Svobody St.)' },
                address: { ru: 'ул. Свободы, 16 (комплекс земской больницы)', en: '16 Svobody St. (Zemstvo hospital complex)' },
                directUrl: 'https://yandex.ru/maps/org/muzey_filial_krasnoufimskaya_zemskaya_bolnitsa/200501672404/',
                mapQuery: 'Музей-филиал Красноуфимская земская больница'
            },
            {
                lat: '56.614400', lon: '57.764590',
                year: '1890-е',
                tag: { ru: '• Купеческий расцвет', en: '• Merchant Golden Age' },
                badge: { ru: '🏪 Торговля • Каменная застройка', en: '🏪 Commerce • Stone Architecture' },
                title: { ru: '1890-е годы — Купеческий расцвет и каменная застройка', en: '1890s — Merchant Golden Age & Stone Construction' },
                desc: {
                    ru: 'Конец XIX века стал золотым временем Красноуфимска. Купеческие династии — Серебренниковы, Шевелины, Кузнецовы — возводили каменные особняки и торговые ряды. Улица Советская (бывшая Соболевская) превратилась в процветающий торговый центр с аптеками, типографиями и фотоателье.',
                    en: 'The late 19th century was Krasnoufimsk\'s golden age. Prominent merchant dynasties — Serebrennikovs, Shevelins, Kuznetsovs — built stone estates and trading rows. Sovetskaya Street (former Sobolevskaya) became a bustling commercial avenue.'
                },
                fact: {
                    ru: 'Особняк земского врача Э. М. Сенкевича (ул. Мизерова, 50 / ул. Октября, 29) — выдающийся памятник деревянного модерна. Красноуфимский краеведческий музей был основан в 1912 году земством и сегодня располагается по ул. Советская, 42.',
                    en: 'The mansion of Zemstvo physician E. M. Senkevich (50 Mizerova St. / 29 Oktyabrya St.) is a masterpiece of wooden Art Nouveau. The Krasnoufimsk Museum of Local Lore was founded in 1912 by the Zemstvo and is located today at 42 Sovetskaya St.'
                },
                icon: '🏪',
                mapTitle: { ru: 'Краеведческий музей (ул. Советская, 42)', en: 'Museum of Local Lore (42 Sovetskaya St.)' },
                address: { ru: 'ул. Советская, 42 (Краеведческий музей)', en: '42 Sovetskaya St. (Regional Museum)' },
                directUrl: 'https://yandex.ru/maps/org/krasnoufimskiy_krayevedcheskiy_muzey/1023339938/',
                mapQuery: 'Красноуфимск музей Советская 42'
            },
            {
                lat: '56.616235', lon: '57.772993',
                year: '1914',
                tag: { ru: '• Церковь', en: '• Church' },
                badge: { ru: '🕍 Храм Александра Невского • Русско-византийский стиль', en: '🕍 Alexander Nevsky Church • Russo-Byzantine Style' },
                title: { ru: '1914 год — Церковь святого Александра Невского', en: '1914 — St. Alexander Nevsky Church' },
                desc: {
                    ru: 'На средства горожан и купеческих пожертвований в Красноуфимске была возведена церковь святого Александра Невского в русском стиле. Строительство завершили накануне Первой мировой войны. Храм дополнил архитектурный ансамбль города рядом со Свято-Троицким собором.',
                    en: 'The St. Alexander Nevsky Church in Russo-Byzantine style was built with contributions from residents and merchants, completed on the eve of WWI. It became the city\'s second stone Orthodox parish, complementing the Holy Trinity Cathedral ensemble.'
                },
                fact: {
                    ru: 'Церковь освящена в честь покровителя русского воинства Александра Невского — символично: в том же году началась Первая мировая война, и прихожане уходили на фронт.',
                    en: 'The church was consecrated to Alexander Nevsky, patron of the Russian army — symbolically, the Great War began that same year, and parishioners left for the front.'
                },
                icon: '⛪',
                mapTitle: { ru: 'Церковь Александра Невского', en: 'Alexander Nevsky Church' },
                address: { ru: 'ул. Мизерова, 88', en: '88 Mizerova St.' },
                directUrl: 'https://yandex.ru/maps/org/khram_aleksandra_nevskogo/1282276725/',
                mapQuery: 'Красноуфимск церковь Александра Невского'
            },
            {
                lat: '56.598259', lon: '57.757853',
                year: '1915',
                tag: { ru: '• Железная дорога', en: '• Railway' },
                badge: { ru: '🚂 Казанбургская магистраль • Индустрия', en: '🚂 Kazanburg Railway • Industry' },
                title: { ru: '1915–1920 годы — Железная дорога и виадуки', en: '1915–1920 — Railway & Great Viaducts' },
                desc: {
                    ru: 'Строительство линии и вокзала шло с 1915 года. Первый паровоз пришёл в 1916 году; 14 марта 1919 года торжественно встретили первый поезд после открытия станции для движения. Сквозное движение по линии Казань — Екатеринбург восстановлено 1 июля 1920 года, регулярное — в октябре 1920 года. Виадуки стали ключевыми инженерными сооружениями линии.',
                    en: 'Construction of the line and station began in 1915. The first locomotive arrived in 1916; on 14 March 1919 the first train was ceremonially welcomed as the station opened to traffic. Through traffic on the Kazan–Yekaterinburg line was restored on 1 July 1920, with regular service from October 1920. The viaducts became key engineering structures of the line.'
                },
                fact: {
                    ru: 'Рябиновский и Пудлинговский виадуки — железобетонные арочные мосты. Их проектировали инженеры-мостовики, а не архитектурная мастерская А. В. Щусева.',
                    en: 'The Ryabinovsky and Pudlingovsky viaducts are reinforced-concrete arched bridges designed by bridge engineers, not by A. V. Shchusev’s architectural workshop.'
                },
                icon: '🚂',
                mapTitle: { ru: 'Железнодорожный вокзал Красноуфимск', en: 'Krasnoufimsk Railway Station' },
                address: { ru: 'ул. Станционная, 11', en: '11 Stantsionnaya St.' },
                directUrl: 'https://yandex.ru/maps/org/zdaniye_zheleznodorozhnogo_vokzala_po_planu_arkhitektora_shchuseva_a_v/166739323389/',
                mapQuery: 'Здание железнодорожного вокзала, по плану архитектора Щусева А. В, Красноуфимск'
            },
            {
                lat: '56.614800', lon: '57.760200',
                year: '1918',
                tag: { ru: '• Гражданская война', en: '• Civil War' },
                badge: { ru: '⚔️ Белые vs Красные • Фронт Урала', en: '⚔️ White vs Red • Ural Front' },
                title: { ru: '1918–1919 годы — Красноуфимск в Гражданской войне', en: '1918–1919 — Krasnoufimsk in the Civil War' },
                desc: {
                    ru: 'В годы Гражданской войны Красноуфимск несколько раз переходил из рук в руки. Войска Колчака и Красной армии вели ожесточённые бои за стратегически важный железнодорожный узел. Город подвергся артиллерийским обстрелам, часть деревянных построек сгорела. В 1919 году Красная армия окончательно установила советскую власть.',
                    en: 'During the Civil War, Krasnoufimsk changed hands several times. Kolchak\'s forces and the Red Army fought fiercely for the strategically vital rail junction. The town endured artillery bombardments and some buildings burned. In 1919 the Red Army finally established Soviet power.'
                },
                fact: {
                    ru: 'В Гражданскую войну через Красноуфимск прошли тысячи солдат с обеих сторон. Железная дорога стала главным стратегическим объектом — тот, кто контролировал вокзал, контролировал Средний Урал.',
                    en: 'Thousands of soldiers from both sides passed through Krasnoufimsk. The railway was the main strategic asset — whoever controlled the station controlled the Central Ural.'
                },
                icon: '⚔️',
                mapTitle: { ru: 'Исторический центр Красноуфимска', en: 'Historic center of Krasnoufimsk' },
                address: { ru: 'ул. Советская / пл. Ленина', en: 'Sovetskaya St. / Lenina Sq.' },
                directUrl: 'https://yandex.ru/maps/org/v_i_lenin/156209444666/',
                mapQuery: 'Красноуфимск площадь Ленина'
            },
            {
                lat: '56.615200', lon: '57.767100',
                directUrl: 'https://yandex.ru/maps/org/park_kultury_i_otdykha_imeni_blyukhera/109033798415/',
                year: '1930-е',
                tag: { ru: '• Советизация', en: '• Sovietization' },
                badge: { ru: '🏭 Индустриализация • Коллективизация', en: '🏭 Industrialization • Collectivization' },
                title: { ru: '1930-е годы — Советская перестройка города', en: '1930s — Soviet Transformation of the City' },
                desc: {
                    ru: 'В годы первых пятилеток Красноуфимск преобразился. Открылись педагогическое училище, промышленные предприятия, первый кинотеатр и радиоузел. Купеческие особняки были национализированы. Церкви закрыты. На месте старых рынков разбили парки. Коллективизация изменила деревенскую жизнь всего района.',
                    en: 'During the first Five-Year Plans Krasnoufimsk transformed. A teachers\' college, industrial enterprises, a cinema and radio station opened. Merchant mansions were nationalized, churches closed, parks replaced old markets. Collectivization reshaped rural life across the district.'
                },
                fact: {
                    ru: 'В 1930-х годах Свято-Троицкий собор был закрыт и использовался как склад и цех. Приход собора был вновь официально зарегистрирован в 2001 году, после чего началось постепенное возрождение храма.',
                    en: 'In the 1930s the Holy Trinity Cathedral was closed and used as a warehouse and workshop. The cathedral parish was officially re-registered in 2001, beginning its gradual restoration.'
                },
                icon: '🏭',
                mapTitle: { ru: 'Парк культуры и отдыха им. Блюхера', en: 'Blukher Culture and Recreation Park' },
                address: { ru: 'ул. Советская, Парк культуры и отдыха им. Блюхера', en: 'Sovetskaya St., Blukher Culture and Recreation Park' },
                mapQuery: 'Красноуфимск Парк культуры и отдыха имени Блюхера'
            },
            {
                lat: '56.621350', lon: '57.773858',
                year: '1941–45',
                tag: { ru: '• Победа', en: '• Victory' },
                badge: { ru: '🎖️ Великая Отечественная • Память', en: '🎖️ Great Patriotic War • Memory' },
                title: { ru: '1941–1945 годы — Фронт, тыл, победа!', en: '1941–1945 — Front, Home Front, Victory!' },
                desc: {
                    ru: 'С первых дней войны тысячи красноуфимцев ушли на фронт. Город стал важным тыловым центром: сюда эвакуировали заводы, госпитали разместили в школах и больнице Мизерова. Женщины и дети работали на полях и предприятиях. Многие земляки были отмечены за боевые заслуги; мемориал «Аллея Памяти» и Вечный огонь у площади Свято-Троицкого собора посвящены памяти погибших и участников войны.',
                    en: 'From the first days of war thousands of Krasnoufimsk residents went to the front. The city became an important rear center: factories were evacuated here, and hospitals occupied schools and Mizerov\'s clinic. Women and children worked fields and factories. Residents of Krasnoufimsk and the surrounding district served at the front and on the home front during the Great Patriotic War. The Alley of Memory memorial commemorates local people.'
                },
                fact: {
                    ru: 'Жители Красноуфимска и района сражались на фронте и трудились в тылу. Мемориал «Аллея Памяти» у площади Свято-Троицкого собора (ул. Куйбышева, 3) открыт в 2010 году и посвящён памяти земляков.',
                    en: 'Residents of Krasnoufimsk and the surrounding district served at the front and worked on the home front. The Alley of Memory memorial near Holy Trinity Cathedral square (3 Kuybysheva St.) was opened in 2010 and commemorates local people.'
                },
                icon: '🎖️',
                mapTitle: { ru: 'Мемориал «Аллея Памяти» и Вечный огонь', en: 'Alley of Memory Memorial \u0026 Eternal Flame' },
                address: { ru: 'ул. Куйбышева, 3, площадь у Свято-Троицкого собора', en: '3 Kuybysheva St., Holy Trinity Cathedral square' },
                directUrl: 'https://yandex.ru/maps/org/alleya_pamyati/75796278043/',
                mapQuery: 'Красноуфимск Куйбышева 3 Аллея Памяти Вечный огонь'
            },
            {
                lat: '56.628500', lon: '57.789100',
                year: '1960-е',
                tag: { ru: '• Наука', en: '• Science' },
                badge: { ru: '🌾 Аграрная наука • Селекция Урала', en: '🌾 Agrarian Science • Ural Breeding' },
                title: { ru: '1960-е годы — Красноуфимская селекционная станция', en: '1960s — Krasnoufimsk Agricultural Research Station' },
                desc: {
                    ru: 'Красноуфимская государственная сельскохозяйственная опытная станция (основана ещё в традициях Реального училища) вышла на всесоюзный уровень. Здесь выводили новые сорта зерновых, приспособленных к суровому уральскому климату. Разработки красноуфимских учёных применялись по всему Советскому Союзу.',
                    en: 'The Krasnoufimsk State Agricultural Research Station (rooted in the Real School tradition) reached all-Union prominence. New grain varieties adapted to the harsh Ural climate were developed here and applied across the Soviet Union.'
                },
                fact: {
                    ru: 'Красноуфимские сорта озимой ржи «Красноуфимская» и пшеницы стали стандартом для земледелия на Урале и в Западной Сибири в 1960–80-е годы.',
                    en: 'Krasnoufimsk rye and wheat varieties became the standard for Ural and West Siberian farming during the 1960s–80s.'
                },
                icon: '🌾',
                mapTitle: { ru: 'Красноуфимская селекционная станция', en: 'Krasnoufimsk Breeding Station' },
                address: { ru: 'ул. Селекционная, д. 8', en: '8 Selektsionnaya St.' },
                directUrl: 'https://yandex.ru/maps/org/krasnoufimskaya_selektsionnaya_stantsiya/1036067332/',
                mapQuery: 'Красноуфимск Селекционная станция'
            },
            {
                lat: '56.622143', lon: '57.775834',
                year: '1970-е',
                tag: { ru: '• Советский расцвет', en: '• Soviet Heyday' },
                badge: { ru: '🏗️ Строительство • Городская среда', en: '🏗️ Construction • Urban Development' },
                title: { ru: '1970-е годы — Советский расцвет Красноуфимска', en: '1970s — Soviet Heyday of Krasnoufimsk' },
                desc: {
                    ru: 'В 1970-е годы Красноуфимск стал полноценным районным центром с населением около 40 000 человек. Строились многоэтажные жилые дома, новые школы, Дом культуры. Благоустраивалась набережная у Красного Яра (по воспоминаниям старожилов). Появились первые предприятия перерабатывающей промышленности. Город переживал подлинный демографический и культурный расцвет.',
                    en: 'In the 1970s Krasnoufimsk became a full-scale district center with about 40,000 residents. Multi-story housing, new schools and a House of Culture were built. Older residents recall improvements to the Krasny Yar embankment. Processing enterprises appeared. The city experienced true demographic and cultural flourishing.'
                },
                fact: {
                    ru: 'В 1970-е годы в Красноуфимске работали молочный завод, хлебокомбинат, мясокомбинат и несколько предприятий лёгкой промышленности — основа районной экономики.',
                    en: 'In the 1970s Krasnoufimsk had a dairy, bakery, meat plant and several light industry enterprises — the backbone of the district economy.'
                },
                icon: '🏗️',
                mapTitle: { ru: 'Набережная «Красный Яр»', en: 'Krasny Yar Embankment' },
                address: { ru: 'Набережная «Красный Яр» (ул. Труда)', en: 'Krasny Yar Embankment (Truda St.)' },
                mapQuery: 'Красноуфимск улица Советская 1'
            },
            {
                lat: '56.621297', lon: '57.773395',
                year: '1990-е',
                tag: { ru: '• Новая Россия', en: '• New Russia' },
                badge: { ru: '🆕 Постсоветское время • Возрождение', en: '🆕 Post-Soviet Era • Revival' },
                title: { ru: '1990-е годы — Новая Россия: трудный путь', en: '1990s — New Russia: A Difficult Path' },
                desc: {
                    ru: 'Распад СССР ударил по Красноуфимску как и по всей стране. Многие предприятия закрылись, население сократилось. Но именно в это время возродилась духовная жизнь: церковь Александра Невского вернули Екатеринбургской епархии в конце 1990-х и повторно освятили 8 сентября 1999 года, а в 2001 году был вновь зарегистрирован приход Свято-Троицкого собора.',
                    en: 'The collapse of the USSR hit Krasnoufimsk hard. Many enterprises closed and the population fell. But spiritual life saw revival: the Alexander Nevsky Church was restored and returned in the 1990s. The Holy Trinity Cathedral parish was officially registered again in 2001, beginning its restoration.'
                },
                fact: {
                    ru: 'В 1990-е годы в Красноуфимске была восстановлена казачья традиция: основано Красноуфимское казачье общество, возродившее связь с историей города-крепости 1736 года.',
                    en: 'In the 1990s the Cossack tradition was revived: the Krasnoufimsk Cossack Society was founded, restoring the link to the fortress city\'s 1736 history.'
                },
                icon: '🆕',
                mapTitle: { ru: 'Свято-Троицкий собор (возвращён общине)', en: 'Holy Trinity Cathedral (returned to community)' },
                address: { ru: 'ул. Куйбышева, 5', en: '5 Kuybysheva St.' },
                directUrl: 'https://yandex.ru/maps/org/sobor_troitsy_zhivonachalnoy_v_krasnoufimske/1031307372/',
                mapQuery: 'Красноуфимск Куйбышева 5 собор'
            },
            {
                lat: '56.614400', lon: '57.764590',
                year: '2000-е',
                tag: { ru: '• Реставрация', en: '• Restoration' },
                badge: { ru: '🔨 Возрождение наследия • Туризм', en: '🔨 Heritage Revival • Tourism' },
                title: { ru: '2000-е годы — Реставрация и туристическое развитие', en: '2000s — Restoration \u0026 Tourism Development' },
                desc: {
                    ru: 'В 2000-е годы началась систематическая реставрация исторических зданий Красноуфимска. Были отремонтированы фасады купеческих особняков на Советской улице, обновлена набережная. Краеведческий музей создал новые экспозиции. Красноуфимск вошёл в туристические маршруты Свердловской области как город купеческой истории и природных красот.',
                    en: 'The 2000s brought systematic restoration of Krasnoufimsk\'s historic buildings. Merchant mansion facades on Sovetskaya St. were renovated, the embankment updated. The Regional Museum created new exhibitions. Krasnoufimsk joined Sverdlovsk Oblast tourist routes as a city of merchant heritage and natural beauty.'
                },
                fact: {
                    ru: 'В 2000-х годах Красноуфимск впервые появился на туристических картах Урала: «Город купцов и соколов» стал брендом, привлекающим путешественников из Екатеринбурга и Перми.',
                    en: 'In the 2000s Krasnoufimsk first appeared on Ural tourist maps: "City of Merchants and Falcons" became a brand attracting visitors from Yekaterinburg and Perm.'
                },
                icon: '🔨',
                mapTitle: { ru: 'Краеведческий музей (ул. Советская, 42)', en: 'Regional Museum (42 Sovetskaya St.)' },
                address: { ru: 'ул. Советская, 42 (Краеведческий музей)', en: '42 Sovetskaya St. (Regional Museum)' },
                directUrl: 'https://yandex.ru/maps/org/krasnoufimskiy_krayevedcheskiy_muzey/1023339938/',
                mapQuery: 'Красноуфимск музей Советская 42'
            },
            {
                lat: '56.622143', lon: '57.775834',
                year: '2016',
                tag: { ru: '• 280 лет', en: '• 280 years' },
                badge: { ru: '🎂 Юбилей • 280-летие города', en: '🎂 Anniversary • 280th City Birthday' },
                title: { ru: '2016 год — 280-летие Красноуфимска', en: '2016 — 280th Anniversary of Krasnoufimsk' },
                desc: {
                    ru: 'В 2016 году Красноуфимск отметил своё 280-летие. Масштабное преображение нижнего уровня набережной пришлось на 2020-е годы: проект «Красный Яр» победил во Всероссийском конкурсе лучших проектов создания комфортной городской среды, работы начались в 2025 году и по состоянию на октябрь 2026 года продолжаются. Доступность отдельных участков перед визитом лучше уточнять.',
                    en: 'In 2016 Krasnoufimsk celebrated its 280th anniversary. The large-scale transformation of the lower embankment came in the 2020s: the Krasny Yar project won the All-Russian competition for comfortable urban-environment projects, work began in 2025 and was still under way in October 2026. Check which sections are open before visiting.'
                },
                fact: {
                    ru: 'Главная смотровая точка города — Дивья гора: с неё открывается панорама на излучину Уфы и исторический центр. Сведения о памятных объектах, установленных здесь к 280-летию в 2016 году, документального подтверждения не нашли.',
                    en: 'Divya Mountain is the town’s main viewpoint, overlooking the Ufa River bend and the historic centre. No documentary confirmation has been found for claims that memorial objects were installed there for the 280th anniversary in 2016.'
                },
                icon: '🎂',
                mapTitle: { ru: 'Набережная «Красный Яр»', en: 'Krasny Yar Embankment' },
                address: { ru: 'Набережная «Красный Яр» (ул. Труда)', en: 'Krasny Yar Embankment (Truda St.)' },
                mapQuery: 'Красноуфимск улица Советская 1'
            },
            {
                lat: '56.617826', lon: '57.771051',
                directUrl: 'https://yandex.ru/maps/org/v_i_lenin/156209444666/',
                year: '2026',
                tag: { ru: '• 290 лет', en: '• 290 years' },
                badge: { ru: '🎊 Юбилей 290 лет • Сквозь эпохи', en: '🎊 290th Anniversary • Through the Ages' },
                title: { ru: '2026 год — Красноуфимску 290 лет: сквозь эпохи', en: '2026 — Krasnoufimsk Turns 290: Through the Ages' },
                desc: {
                    ru: 'В 2026 году Красноуфимск отмечает 290-летие со дня основания. За почти три века маленькая казачья крепость превратилась в самобытный уральский город с богатейшим историческим, архитектурным и природным наследием. Этот сайт выполнен в ходе индивидуального проекта как цифровой памятник 290-летней истории.',
                    en: 'In 2026 Krasnoufimsk celebrates its 290th anniversary. In nearly three centuries a small Cossack fortress became a distinctive Ural city with rich historical, architectural and natural heritage. This website was completed as part of an individual project as a digital monument to 290 years of history.'
                },
                fact: {
                    ru: 'За 290 лет Красноуфимск дал стране выдающихся агрономов, врачей, военных и деятелей культуры. Город-крепость стал городом-садом, хранящим память обо всех своих жителях.',
                    en: 'Over 290 years Krasnoufimsk gave Russia outstanding agronomists, doctors, military figures and cultural leaders. The fortress city became a garden city preserving the memory of all its people.'
                },
                icon: '🎊',
                mapTitle: { ru: 'Красноуфимск — центр города', en: 'Krasnoufimsk — city center' },
                address: { ru: 'пл. Ленина, Красноуфимск (290 лет с 1736 года)', en: 'Lenina Sq., Krasnoufimsk (290 years since 1736)' },
                mapQuery: 'В.И. Ленин Красноуфимск'
            }
        ]; // ДАННЫЕ ВИКТОРИНЫ (ДВУЯЗЫЧНЫЕ - 8 ВОПРОСОВ ПО КЛЮЧЕВЫМ ЭТАПАМ)
        const quizDataMaster = [
            // --- EASY (11 questions) ---
            { difficulty: 'easy', q: { ru: 'На какой реке стоит город Красноуфимск?', en: 'On which river is Krasnoufimsk located?' }, options: [{ t: { ru: 'Уфа', en: 'Ufa' }, correct: true }, { t: { ru: 'Волга', en: 'Volga' }, correct: false }, { t: { ru: 'Кама', en: 'Kama' }, correct: false }, { t: { ru: 'Чусовая', en: 'Chusovaya' }, correct: false }], explainer: { ru: 'Город расположен на живописной реке Уфа.', en: 'The city is located on the picturesque Ufa River.' } },
            { difficulty: 'easy', q: { ru: 'В каком году была основана Красноуфимская крепость?', en: 'In what year was the Krasnoufimsk fortress founded?' }, options: [{ t: { ru: '1736', en: '1736' }, correct: true }, { t: { ru: '1703', en: '1703' }, correct: false }, { t: { ru: '1812', en: '1812' }, correct: false }, { t: { ru: '1945', en: '1945' }, correct: false }], explainer: { ru: 'Крепость основана в 1736 году.', en: 'Founded in 1736.' } },
            { difficulty: 'easy', q: { ru: 'Какое ископаемое животное стало одним из символов города (его зубную спираль нашли здесь)?', en: 'What fossil animal became a symbol of the city (its tooth whorl was found here)?' }, options: [{ t: { ru: 'Геликоприон', en: 'Helicoprion' }, correct: true }, { t: { ru: 'Мамонт', en: 'Mammoth' }, correct: false }, { t: { ru: 'Динозавр', en: 'Dinosaur' }, correct: false }, { t: { ru: 'Саблезубый тигр', en: 'Sabertooth tiger' }, correct: false }], explainer: { ru: 'Знаменитая зубная спираль акулы геликоприона была найдена в Красноуфимске.', en: 'The famous tooth whorl of the Helicoprion shark was found here.' } },
            { difficulty: 'easy', q: { ru: 'Какое название изначально носил холм, где заложили крепость?', en: 'What was the original name of the hill where the fortress was built?' }, options: [{ t: { ru: 'Красный Яр', en: 'Krasny Yar' }, correct: true }, { t: { ru: 'Белый Камень', en: 'Bely Kamen' }, correct: false }, { t: { ru: 'Высокая Гора', en: 'Vysokaya Gora' }, correct: false }, { t: { ru: 'Черный Утес', en: 'Cherny Utes' }, correct: false }], explainer: { ru: 'Крепость была заложена на урочище Красный Яр.', en: 'The fortress was built on the Krasny Yar tract.' } },
            { difficulty: 'easy', q: { ru: 'Что означал сокол в историческом гербе Красноуфимска 1783 года?', en: 'What did the falcon mean in Krasnoufimsk’s historic 1783 coat of arms?' }, options: [{ t: { ru: 'Изобилие птиц в округе города', en: 'Abundance of birds around the town' }, correct: true }, { t: { ru: 'Богатые хлебные поля уезда', en: 'Rich grain fields of the district' }, correct: false }, { t: { ru: 'Торговлю по реке Уфе', en: 'Trade along the Ufa River' }, correct: false }, { t: { ru: 'Мирную жизнь казачьей крепости', en: 'Peaceful life of the Cossack fortress' }, correct: false }], explainer: { ru: 'Историческое описание герба 1783 года: серебряный сокол «означающий великое изобилие вокруг того города оных птиц».', en: 'The 1783 blazon says the silver falcon signified the great abundance of birds around the town.' } },
            { difficulty: 'easy', q: { ru: 'Какой статус имеет Красноуфимск сегодня?', en: 'What status does Krasnoufimsk hold today?' }, options: [{ t: { ru: 'Город областного подчинения', en: 'City of regional subordination' }, correct: true }, { t: { ru: 'Деревня в составе сельского поселения', en: 'A village within a rural settlement' }, correct: false }, { t: { ru: 'Поселок городского типа', en: 'Urban-type settlement' }, correct: false }, { t: { ru: 'Село в Красноуфимском районе', en: 'A village in Krasnoufimsk District' }, correct: false }], explainer: { ru: 'Это город областного подчинения в Свердловской области.', en: 'It is a city of regional subordination in the Sverdlovsk Region.' } },
            { difficulty: 'easy', q: { ru: 'В каком регионе России находится Красноуфимск?', en: 'In which region of Russia is Krasnoufimsk located?' }, options: [{ t: { ru: 'Свердловская область', en: 'Sverdlovsk Region' }, correct: true }, { t: { ru: 'Челябинская область', en: 'Chelyabinsk Region' }, correct: false }, { t: { ru: 'Пермский край', en: 'Perm Krai' }, correct: false }, { t: { ru: 'Республика Башкортостан', en: 'Republic of Bashkortostan' }, correct: false }], explainer: { ru: 'Город находится на юго-западе Свердловской области.', en: 'The city is in the south-west of the Sverdlovsk region.' } },
            { difficulty: 'easy', q: { ru: 'Чем знаменит Красноуфимский краеведческий музей?', en: 'What is the local museum famous for?' }, options: [{ t: { ru: 'Богатой палеонтологической коллекцией', en: 'Rich paleontological collection' }, correct: true }, { t: { ru: 'Коллекцией старинных автомобилей и мотоциклов', en: 'A collection of vintage cars and motorcycles' }, correct: false }, { t: { ru: 'Крупнейшей картинной галереей', en: 'Largest art gallery' }, correct: false }, { t: { ru: 'Космическими экспонатами', en: 'Space exhibits' }, correct: false }], explainer: { ru: 'Музей славится находками пермского периода, включая спирали геликоприона.', en: 'The museum is famous for its Permian period fossils.' } },
            { difficulty: 'easy', q: { ru: 'Какой железной дорогой город соединен с остальным миром?', en: 'Which railway connects the city?' }, options: [{ t: { ru: 'Казанский ход Транссиба', en: 'Kazan route of the Trans-Siberian' }, correct: true }, { t: { ru: 'Байкало-Амурская магистраль', en: 'Baikal–Amur Mainline' }, correct: false }, { t: { ru: 'Китайско-Восточная железная дорога', en: 'Chinese Eastern Railway' }, correct: false }, { t: { ru: 'Северная железная дорога', en: 'Northern Railway of Russia' }, correct: false }], explainer: { ru: 'Станция Красноуфимск стоит на казанском (историческом) ходу Транссиба Москва — Казань — Екатеринбург, км 1432, и административно относится к Горьковской железной дороге (Ижевское отделение).', en: 'Krasnoufimsk station lies on the Kazan (historic) route of the Trans-Siberian Railway, Moscow — Kazan — Yekaterinburg, km 1432, and administratively belongs to the Gorky Railway.' } },
            { difficulty: 'easy', q: { ru: 'Какой главный памятник архитектуры встречает прибывающих на поездах?', en: 'Which main architectural monument greets train arrivals?' }, options: [{ t: { ru: 'Исторический вокзал Красноуфимска', en: 'Krasnoufimsk historic railway station' }, correct: true }, { t: { ru: 'Башня Сююмбике в Казанском кремле', en: 'Suyumbike Tower in the Kazan Kremlin' }, correct: false }, { t: { ru: 'Нереализованный проект Дворца Советов', en: 'Unbuilt Palace of the Soviets project' }, correct: false }, { t: { ru: 'Московский Кремль', en: 'Moscow Kremlin' }, correct: false }], explainer: { ru: 'Вокзал Красноуфимска — архитектурный шедевр начала XX века.', en: 'The station is an architectural masterpiece of the early 20th century.' } },
            { difficulty: 'easy', q: { ru: 'Какое восстание поддержали казаки Красноуфимска в 1774 году?', en: 'Which rebellion did the Krasnoufimsk Cossacks support in 1774?' }, options: [{ t: { ru: 'Восстание Емельяна Пугачева', en: 'Yemelyan Pugachev\'s rebellion' }, correct: true }, { t: { ru: 'Восстание Степана Тимофеевича Разина', en: 'Rebellion of Stepan Timofeyevich Razin' }, correct: false }, { t: { ru: 'Восстание декабристов', en: 'Decembrist revolt' }, correct: false }, { t: { ru: 'Медный бунт', en: 'Copper Riot' }, correct: false }], explainer: { ru: 'Красноуфимцы примкнули к армии Пугачева и участвовали в Крестьянской войне.', en: 'Krasnoufimsk people joined Pugachev\'s army.' } },

            // --- MEDIUM (15 questions) ---
            { difficulty: 'medium', q: { ru: 'Для защиты от чьих набегов была построена Красноуфимская крепость?', en: 'Whose raids was the fortress built to guard against?' }, options: [{ t: { ru: 'Кочевых племен башкир', en: 'Nomadic Bashkir tribes' }, correct: true }, { t: { ru: 'Монголо-татар', en: 'Mongol-Tatars' }, correct: false }, { t: { ru: 'Шведов', en: 'Swedes' }, correct: false }, { t: { ru: 'Войск Сибирского ханства', en: 'Troops of the Siberian Khanate' }, correct: false }], explainer: { ru: 'Она защищала уральские заводы от набегов восставших племен.', en: 'It protected Ural plants from rebel tribes.' } },
            { difficulty: 'medium', q: { ru: 'Кем была основана Красноуфимская крепость в 1736 году по предписанию Оренбургской экспедиции?', en: 'Who founded the Krasnoufimsk fortress in 1736 under orders of the Orenburg Expedition?' }, options: [{ t: { ru: 'Полковником А. И. Тевкелевым', en: 'Colonel A. I. Tevkelev' }, correct: true }, { t: { ru: 'Атаманом Ермаком Тимофеевичем', en: 'Ataman Yermak Timofeyevich' }, correct: false }, { t: { ru: 'Никитой Демидовым', en: 'Nikita Demidov' }, correct: false }, { t: { ru: 'Емельяном Пугачевым', en: 'Yemelyan Pugachev' }, correct: false }], explainer: { ru: 'Именно полковник Алексей Иванович Тевкелев заложил крепость летом 1736 года.', en: 'Colonel Alexey Ivanovich Tevkelev founded the fortress in summer 1736.' } },
            { difficulty: 'medium', q: { ru: 'В каком году Красноуфимск получил статус уездного города Пермского наместничества?', en: 'In what year did Krasnoufimsk receive the status of a district town of the Perm Viceroyalty?' }, options: [{ t: { ru: '1781', en: '1781' }, correct: true }, { t: { ru: '1736', en: '1736' }, correct: false }, { t: { ru: '1812', en: '1812' }, correct: false }, { t: { ru: '1905', en: '1905' }, correct: false }], explainer: { ru: 'По указу Екатерины II в 1781 году крепость стала городом.', en: 'By Catherine II decree in 1781, it became a city.' } },
            { difficulty: 'medium', q: { ru: 'К какому геологическому периоду относятся знаменитые красноуфимские ископаемые?', en: 'To which geological period do the famous Krasnoufimsk fossils belong?' }, options: [{ t: { ru: 'Пермский', en: 'Permian' }, correct: true }, { t: { ru: 'Юрский', en: 'Jurassic' }, correct: false }, { t: { ru: 'Меловой', en: 'Cretaceous' }, correct: false }, { t: { ru: 'Кембрийский', en: 'Cambrian' }, correct: false }], explainer: { ru: 'Эти отложения сформировались около 290 млн лет назад в пермском периоде.', en: 'Formed about 290 million years ago in the Permian period.' } },
            { difficulty: 'medium', q: { ru: 'Кто разработал проект и план расположения павильонов Красноуфимской земской больницы?', en: 'Who designed the layout and pavilion plan of the Krasnoufimsk Zemstvo Hospital?' }, options: [{ t: { ru: 'Доктор М. И. Мизеров', en: 'Dr. M. I. Mizerov' }, correct: true }, { t: { ru: 'Архитектор А. В. Щусев', en: 'Arch. A. V. Shchusev' }, correct: false }, { t: { ru: 'Архитектор М. П. Малахов', en: 'Arch. M. P. Malakhov' }, correct: false }, { t: { ru: 'Архитектор К. А. Тон', en: 'Arch. K. A. Thon' }, correct: false }], explainer: { ru: 'Доктор Матвей Иванович Мизеров лично разработал проект и план павильонов больницы с учётом передовых принципов гигиены и вентиляции.', en: 'Dr. Matvey Ivanovich Mizerov personally designed the hospital pavilion layout based on progressive hygienic principles.' } },
            { difficulty: 'medium', q: { ru: 'Какое училище Красноуфимска в 1889 году было преобразовано в промышленное?', en: 'Which Krasnoufimsk school was reorganized into an industrial school in 1889?' }, options: [{ t: { ru: 'Красноуфимское реальное училище', en: 'Krasnoufimsk Real School' }, correct: true }, { t: { ru: 'Уральский государственный университет', en: 'Ural State University' }, correct: false }, { t: { ru: 'Морская академия дальнего плавания', en: 'Maritime Academy of Long Voyages' }, correct: false }, { t: { ru: 'Государственная консерватория', en: 'State Conservatory' }, correct: false }], explainer: { ru: 'Реальное училище открыто в 1875 году, а 27 августа 1889 года преобразовано в промышленное.', en: 'The Real School opened in 1875 and was reorganized into an Industrial School on 27 August 1889.' } },
            { difficulty: 'medium', q: { ru: 'Чем преимущественно занимался Красноуфимский уезд до революции?', en: 'What was the main economic activity in the Krasnoufimsk district before the revolution?' }, options: [{ t: { ru: 'Сельское хозяйство и ремесла', en: 'Agriculture and crafts' }, correct: true }, { t: { ru: 'Крупная металлургия полного цикла', en: 'Large full-cycle metallurgy' }, correct: false }, { t: { ru: 'Нефтедобыча', en: 'Oil production' }, correct: false }, { t: { ru: 'Машиностроение', en: 'Mechanical engineering' }, correct: false }], explainer: { ru: 'Уезд был преимущественно сельскохозяйственным.', en: 'The district was mainly agricultural.' } },
            { difficulty: 'medium', q: { ru: 'Сколько примерно длилось строительство железной дороги до Красноуфимска?', en: 'How long did the railway construction to Krasnoufimsk take?' }, options: [{ t: { ru: 'С 1915 по 1920 год', en: 'From 1915 to 1920' }, correct: true }, { t: { ru: 'С 1890 по 1895 год', en: 'From 1890 to 1895' }, correct: false }, { t: { ru: 'С 1930 по 1935 год', en: 'From 1930 to 1935' }, correct: false }, { t: { ru: 'Менее года', en: 'Less than a year' }, correct: false }], explainer: { ru: 'Строительство началось в 1915 году; первый поезд встретили в 1919-м, а сквозное движение восстановлено в 1920 году.', en: 'Construction began in 1915; the first train was welcomed in 1919 and through traffic restored in 1920.' } },
            { difficulty: 'medium', q: { ru: 'Какой знаменитый земский врач основал в Красноуфимске образцовую больницу и глазное отделение?', en: 'Which famous Zemstvo doctor founded an exemplary hospital and eye clinic in Krasnoufimsk?' }, options: [{ t: { ru: 'Матвей Иванович Мизеров', en: 'Matvey Ivanovich Mizerov' }, correct: true }, { t: { ru: 'Николай Васильевич Склифосовский', en: 'Nikolay Sklifosovsky' }, correct: false }, { t: { ru: 'Николай Иванович Пирогов', en: 'Nikolay Pirogov' }, correct: false }, { t: { ru: 'Владимир Михайлович Бехтерев', en: 'Vladimir Bekhterev' }, correct: false }], explainer: { ru: 'Доктор М. И. Мизеров создал в Красноуфимске одну из передовых земских больниц Урала и спас тысячи людей от слепоты.', en: 'Dr. Mizerov established one of the leading zemstvo hospitals in the Urals and saved thousands from blindness.' } },
            { difficulty: 'medium', q: { ru: 'Что изображено на гербе Красноуфимского округа (утверждён в 2002 году)?', en: 'What is depicted on the coat of arms of the Krasnoufimsk district (adopted in 2002)?' }, options: [{ t: { ru: 'Летящий сокол и волнистая перевязь', en: 'A flying falcon and a wavy bend' }, correct: true }, { t: { ru: 'Семь серебряных звёзд по числу волостей', en: 'Seven silver stars for seven volosts' }, correct: false }, { t: { ru: 'Золотой сноп пшеницы и шестерня', en: 'A golden wheat sheaf and a cogwheel' }, correct: false }, { t: { ru: 'Бегущий лось на голубом поле', en: 'A running elk on a blue field' }, correct: false }], explainer: { ru: 'Герб района повторяет исторический символ города — сокола, но летящего, и дополнен серебряной волнообразной перевязью — рекой Уфой. Утверждён решением районной Думы от 29.08.2002 № 201, внесён в Государственный геральдический регистр под № 1029.', en: 'The district arms repeat the historic falcon of the town, but in flight, plus a silver wavy bend for the Ufa River. Adopted by District Duma decision No. 201 of 29 August 2002; State Heraldic Register No. 1029.' } },
            { difficulty: 'medium', q: { ru: 'Какие виадуки находятся недалеко от Красноуфимска?', en: 'Which viaducts are located near Krasnoufimsk?' }, options: [{ t: { ru: 'Рябиновский и Пудлинговский виадуки', en: 'Ryabinovsky and Pudlingovsky viaducts' }, correct: true }, { t: { ru: 'Виадук Мийо во Франции', en: 'Millau Viaduct in France' }, correct: false }, { t: { ru: 'Виадук Гленфиннан в Шотландском нагорье', en: 'Glenfinnan Viaduct in the Scottish Highlands' }, correct: false }, { t: { ru: 'Босфорский мост в Турции', en: 'Bosphorus Bridge in Türkiye' }, correct: false }], explainer: { ru: 'В окрестностях города есть живописные старинные виадуки 1910-х годов.', en: 'There are picturesque viaducts from the 1910s nearby.' } },
            { difficulty: 'medium', q: { ru: 'В каком стиле построено здание Свято-Троицкого собора?', en: 'In what style is the Holy Trinity Cathedral built?' }, options: [{ t: { ru: 'Классицизм с чертами барокко', en: 'Classicism with Baroque features' }, correct: true }, { t: { ru: 'Русское узорочье XVII века', en: '17th-century Russian uzorochye' }, correct: false }, { t: { ru: 'Северный модерн начала XX века', en: 'Early 20th-century Northern Art Nouveau' }, correct: false }, { t: { ru: 'Неоготика XIX века', en: '19th-century Neo-Gothic' }, correct: false }], explainer: { ru: 'Собор построен к 1804 году в переходном стиле: классицизм с барочными чертами.', en: 'The cathedral was built by 1804 in a transitional style: Classicism with Baroque features.' } },
            { difficulty: 'medium', q: { ru: 'Какой выдающийся геолог и академик впервые научно описал зубную спираль красноуфимского геликоприона?', en: 'Which prominent geologist scientifically described the Krasnoufimsk Helicoprion tooth whorl?' }, options: [{ t: { ru: 'Александр Карпинский', en: 'Alexander Karpinsky' }, correct: true }, { t: { ru: 'Владимир Афанасьевич Обручев', en: 'Vladimir Obruchev' }, correct: false }, { t: { ru: 'Александр Евгеньевич Ферсман', en: 'Alexander Fersman' }, correct: false }, { t: { ru: 'Владимир Иванович Вернадский', en: 'Vladimir Vernadsky' }, correct: false }], explainer: { ru: 'В 1899 году академик А. П. Карпинский исследовал находку краеведа А. Г. Бессонова и дал научное описание Helicoprion bessonowi.', en: 'In 1899, Academician Karpinsky studied the fossil found by Bessonov and published the first scientific description of Helicoprion bessonowi.' } },
            { difficulty: 'medium', q: { ru: 'Какое учебное заведение Красноуфимска стало одним из первых центров сельскохозяйственного образования на Урале?', en: 'Which Krasnoufimsk institution became one of the first centres of agricultural education in the Urals?' }, options: [{ t: { ru: 'Реальное, затем промышленное училище', en: 'Real, later Industrial, School' }, correct: true }, { t: { ru: 'Уральский государственный университет', en: 'Ural State University in Yekaterinburg' }, correct: false }, { t: { ru: 'Горный институт', en: 'Mining Institute' }, correct: false }, { t: { ru: 'Духовная семинария', en: 'Theological Seminary' }, correct: false }], explainer: { ru: 'В 1875 году открылось реальное училище с сельскохозяйственным направлением; в 1889 году оно стало промышленным.', en: 'The Real School with an agricultural focus opened in 1875; in 1889 it became an Industrial School.' } },
            { difficulty: 'medium', q: { ru: 'Что разместили в школах и больнице Красноуфимска в годы Великой Отечественной войны?', en: 'What was housed in Krasnoufimsk schools and hospital during the Great Patriotic War?' }, options: [{ t: { ru: 'Эвакогоспитали для раненых бойцов', en: 'Evacuation hospitals for wounded soldiers' }, correct: true }, { t: { ru: 'Штабы крупных танковых соединений', en: 'Headquarters of large tank formations' }, correct: false }, { t: { ru: 'Склады трофейной бронетехники', en: 'Warehouses of captured armoured vehicles' }, correct: false }, { t: { ru: 'Курсы военных лётчиков', en: 'Training courses for military pilots' }, correct: false }], explainer: { ru: 'Красноуфимск стал тыловым центром: сюда эвакуировали предприятия, а госпитали размещали в школах и больнице Мизерова.', en: 'Krasnoufimsk became a rear centre: enterprises were evacuated here and hospitals were placed in schools and the Mizerov hospital.' } },

            // --- HARD (20 questions - reused from original script) ---

            {
                difficulty: 'hard', q: {
                    ru: 'В каком году полковник А. И. Тевкелев заложил Красноуфимскую оборонительную крепость на реке Уфе?',
                    en: 'In what year was the Krasnoufimsk defense fortress founded on the Ufa River by Colonel A. I. Tevkelev?'
                },
                options: [
                    { t: { ru: '1736 год', en: '1736' }, correct: true },
                    { t: { ru: '1703 год', en: '1703' }, correct: false },
                    { t: { ru: '1781 год', en: '1781' }, correct: false },
                    { t: { ru: '1812 год', en: '1812' }, correct: false }
                ],
                explainer: {
                    ru: 'Крепость на Красном Яру построена в 1736 году по указу Правительствующего Сената силами Оренбургской экспедиции — для защиты уральских заводов и русских поселений от набегов. Место в урочище Красный Яр в апреле 1734 года выбрал отряд полковника А. И. Тевкелева.',
                    en: 'The fortress on Krasny Yar was built in 1736 under a decree of the Governing Senate by the Orenburg Expedition, to protect Ural ironworks and settlements from raids. The site had been chosen in April 1734 by the detachment of Colonel A. I. Tevkelev.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Что изначально означало название урочища «Красный Яр», давшее имя крепости?',
                    en: 'What did the original name of the site "Krasny Yar" mean?'
                },
                options: [
                    { t: { ru: 'Красный крутой берег Уфы', en: 'A steep red bank of the Ufa' }, correct: true },
                    { t: { ru: 'Цвет местной кирпичной глины', en: 'The color of local red clay' }, correct: false },
                    { t: { ru: 'Революционное знамя казаков', en: 'A revolutionary flag of Cossacks' }, correct: false },
                    { t: { ru: 'Обилие ягод шиповника на скалах', en: 'Abundance of rosehips on the rocks' }, correct: false }
                ],
                explainer: {
                    ru: 'Слово «яр» в славянских говорах означает высокий крутой берег или обрыв над рекой, а «красный» — красивый и статный.',
                    en: 'The word "yar" in old Slavic dialects denotes a high steep river bluff, while "krasny" traditionally meant beautiful.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Отряд какого сподвижника Емельяна Пугачёва вошёл в Красноуфимск в январе 1774 года?',
                    en: 'Which Pugachev associate led the detachment that entered Krasnoufimsk in January 1774?'
                },
                options: [
                    { t: { ru: 'Салават Юлаев', en: 'Salavat Yulaev' }, correct: true },
                    { t: { ru: 'Степан Разин', en: 'Stepan Razin' }, correct: false },
                    { t: { ru: 'Ермак Тимофеевич', en: 'Yermak Timofeyevich' }, correct: false },
                    { t: { ru: 'Кондратий Булавин', en: 'Kondraty Bulavin' }, correct: false }
                ],
                explainer: {
                    ru: '12 января 1774 года отряд Салавата Юлаева вошёл в Красноуфимск без боя: гарнизон и казаки присягнули Пугачёву. Салават пробыл в городе около трёх дней, назначил атаманом М. Попова, а 15 января выступил на Кунгур. В феврале и марте 1774 года под крепостью шли бои с правительственными войсками.',
                    en: 'On 12 January 1774 Salavat Yulaev\'s detachment entered Krasnoufimsk without a fight: the garrison and local Cossacks swore loyalty to Pugachev. Salavat stayed about three days, appointed M. Popov ataman and marched on Kungur on 15 January; battles near the fortress followed in February and March 1774.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Какая птица изображена на историческом гербе Красноуфимска, пожалованном Екатериной II в 1783 году?',
                    en: 'Which bird is depicted on the historic coat of arms of Krasnoufimsk granted by Catherine II in 1783?'
                },
                options: [
                    { t: { ru: 'Сокол на золотом суку', en: 'A falcon on a golden branch' }, correct: true },
                    { t: { ru: 'Беркут с расправленными крыльями', en: 'A golden eagle with spread wings' }, correct: false },
                    { t: { ru: 'Белый лебедь на волнах Уфы', en: 'A white swan on the Ufa waves' }, correct: false },
                    { t: { ru: 'Глухарь в сосновом бору', en: 'A capercaillie in a pine forest' }, correct: false }
                ],
                explainer: {
                    ru: 'Исторический герб утверждён Екатериной II: «В верхней части щита герб Пермский, в нижней — серебряный сокол в зелёном поле, сидящий на золотой ветви, в знак того, что около сего города оных птиц водится великое множество».',
                    en: '"In the lower part is a silver falcon perched on a golden branch in a green field, in sign of the great abundance of these birds around this town."'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Чем уникально Красноуфимское реальное училище, открытое земством в 1875 году?',
                    en: 'Why is the Krasnoufimsk Real School (1875) historically notable?'
                },
                options: [
                    { t: { ru: 'Ранним сельскохозяйственным образованием', en: 'Early agricultural education' }, correct: true },
                    { t: { ru: 'Первая астрономическая обсерватория Урала', en: 'The first astronomical observatory in the Urals' }, correct: false },
                    { t: { ru: 'Единственное горнозаводское училище в империи', en: 'The only mining school in the Empire' }, correct: false },
                    { t: { ru: 'Там учился писатель Лев Толстой', en: 'Writer Leo Tolstoy studied there' }, correct: false }
                ],
                explainer: {
                    ru: 'Красноуфимское реальное училище (официально открыто 12 августа 1875 года) имело горнозаводское и сельскохозяйственное отделения и стало одним из первых центров аграрного образования на Урале. С 1893 по 1899 год здесь учился будущий Маршал Советского Союза Б. М. Шапошников.',
                    en: 'The Krasnoufimsk Real School (opened 12 August 1875) had mining and agricultural departments and became one of the first centres of agrarian education in the Urals. Future Marshal of the Soviet Union B. Shaposhnikov studied here from 1893 to 1899.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Какую сенсационную палеонтологическую находку краевед А. Г. Бессонов передал академику А. П. Карпинскому в 1898 году?',
                    en: 'What sensational paleontological find did local historian A. G. Bessonov pass to Academician A. P. Karpinsky in 1898?'
                },
                options: [
                    { t: { ru: 'Зубную спираль геликоприона', en: 'A Helicoprion tooth whorl' }, correct: true },
                    { t: { ru: 'Полный скелет шерстистого мамонта', en: 'A complete skeleton of a woolly mammoth' }, correct: false },
                    { t: { ru: 'Клад золотых монет сарматов', en: 'Sarmatian gold coin horde' }, correct: false },
                    { t: { ru: 'Череп шерстистого носорога', en: 'A skull of a woolly rhinoceros' }, correct: false }
                ],
                explainer: {
                    ru: 'В 1898 году А. Г. Бессонов прислал фотографию и доставил в Геологический комитет шесть зубных спиралей, найденных в карьере на склоне Дивьей горы; академик А. П. Карпинский научно описал их в 1899 году. Типовая коллекция № 1865 хранится в Центральном научно-исследовательском геологическом музее им. Ф. Н. Чернышёва (ЦНИГР) в Санкт-Петербурге, а в фондах Красноуфимского краеведческого музея — пять подлинных зубных спиралей геликоприона.',
                    en: 'In 1898 A. G. Bessonov sent a photograph and delivered six tooth whorls, found in a quarry on the slope of Divya Mountain, to the Geological Committee; Academician A. P. Karpinsky scientifically described them in 1899. The type collection No. 1865 is kept at the Chernyshev Central Geological Research Museum in St Petersburg, while the Krasnoufimsk museum holds five authentic Helicoprion tooth whorls.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Какой выдающийся земский врач построил в Красноуфимске образцовую земскую больницу и заложил парк «Целитель»?',
                    en: 'Which outstanding zemstvo doctor built the model zemstvo hospital in Krasnoufimsk and laid out the Tselitel Park?'
                },
                options: [
                    { t: { ru: 'Доктор Матвей Иванович Мизеров', en: 'Doctor Matvey Ivanovich Mizerov' }, correct: true },
                    { t: { ru: 'Николай Васильевич Склифосовский', en: 'Nikolay Vasilievich Sklifosovsky' }, correct: false },
                    { t: { ru: 'Николай Иванович Пирогов', en: 'Nikolay Ivanovich Pirogov' }, correct: false },
                    { t: { ru: 'Владимир Петрович Филатов', en: 'Vladimir Petrovich Filatov' }, correct: false }
                ],
                explainer: {
                    ru: 'Доктор М. И. Мизеров (1854–1913) работал земским врачом в Красноуфимске в 1880–1909 годах, был доктором медицины и почётным гражданином города. В 1886 году по его проекту построена образцовая земская больница, при ней заложен парк «Целитель». Сегодня здесь — музей «Красноуфимская земская больница», филиал Свердловского областного музея истории медицины (ул. Свободы, 16).',
                    en: 'Dr Matvey Mizerov (1854–1913) served as a zemstvo doctor in Krasnoufimsk from 1880 to 1909 and was an honorary citizen of the town. In 1886 a model zemstvo hospital was built to his design, with the Tselitel Park beside it; today the complex houses the Krasnoufimsk Zemstvo Hospital Museum.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Кто из великих русских зодчих (его архитектурная мастерская) спроектировал ансамбль железнодорожного вокзала Красноуфимска в стиле петровского барокко (1915)?',
                    en: 'Which prominent Russian architect (whose workshop) designed the Krasnoufimsk train station ensemble in Petrine Baroque (1915)?'
                },
                options: [
                    { t: { ru: 'Алексей Викторович Щусев', en: 'Alexey Viktorovich Shchusev' }, correct: true },
                    { t: { ru: 'Константин Андреевич Тон', en: 'Konstantin Andreevich Thon' }, correct: false },
                    { t: { ru: 'Фёдор Осипович Шехтель', en: 'Fyodor Osipovich Schechtel' }, correct: false },
                    { t: { ru: 'Карл Иванович Росси', en: 'Carlo Rossi' }, correct: false }
                ],
                explainer: {
                    ru: 'Архитектурная мастерская академика А. В. Щусева (создателя Мавзолея и Казанского вокзала в Москве) разработала проекты станционных комплексов Казанбургской магистрали, включая Красноуфимский вокзал.',
                    en: 'The architectural workshop of academician Alexey Shchusev designed station ensembles along the Kazanburg railway, including the Krasnoufimsk station.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Какую уникальную конструктивную особенность имеет памятник «Первая казачья изба» (XVIII в.) на улице Риммы Горбуновой?',
                    en: 'What unique architectural feature does the historic "First Cossack Hut" (18th c.) on Rimma Gorbunova St. possess?'
                },
                options: [
                    { t: { ru: 'Лиственничный сруб с бойницей', en: 'A larch log frame with a loophole' }, correct: true },
                    { t: { ru: 'Двухэтажный кирпичный цоколь с бойницами', en: 'Two-story brick basement with loop-holes' }, correct: false },
                    { t: { ru: 'Купольную крышу из листового чугуна', en: 'A dome roof made of cast iron' }, correct: false },
                    { t: { ru: 'Подземный ход к реке Уфе', en: 'An underground passage leading to the Ufa River' }, correct: false }
                ],
                explainer: {
                    ru: '«Первая казачья изба» (ул. Р. Горбуновой, 35) — одна из старейших сохранившихся построек Красноуфимска, сруб середины XVIII века из лиственницы (брёвна диаметром 35–40 см, рубка «в обло»). В стене сохранилась бойница, было и смотровое окно; по преданию, в погребе держали порох. В открытом списке наследия для объекта указан реестровый № 661710757830005; актуальность записи и границы территории следует проверять в ЕГРОКН.',
                    en: 'The First Cossack Hut (35 R. Gorbunova St.) is one of the oldest surviving buildings in Krasnoufimsk: a mid-18th-century larch log house (logs 35–40 cm thick, notched corner joints). A loophole survives in the wall and there was a lookout window; by tradition gunpowder was kept in the cellar. The open heritage list gives registry no. 661710757830005; verify the current record and boundaries in the state register.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Какие промышленные предприятия были эвакуированы в Красноуфимск в годы Великой Отечественной войны и какую продукцию поставляли фронту?',
                    en: 'Which industrial enterprises were evacuated to Krasnoufimsk during WWII and what did they supply to the front?'
                },
                options: [
                    { t: { ru: 'Завод ВЭИ: прожекторы и электротехника', en: 'VEI plant: searchlights and electrical gear' }, correct: true },
                    { t: { ru: 'Танковый завод тяжелого машиностроения: башни танков КВ-1', en: 'Heavy tank machinery plant: KV-1 tank turrets' }, correct: false },
                    { t: { ru: 'Авиационный завод: крылья и фюзеляжи самолётов Як-3', en: 'Aviation plant: Yak-3 wings and fuselages' }, correct: false },
                    { t: { ru: 'Пороховой комбинат синтетического каучука', en: 'Synthetic rubber gunpowder combine' }, correct: false }
                ],
                explainer: {
                    ru: 'По постановлению СНК от 16 августа 1941 года в Красноуфимск, в здание сельхозтехникума, подлежали эвакуации Всесоюзный электротехнический институт (ВЭИ) и его опытный завод; в ноябре 1941 года в город прибыла часть опытного завода ВЭИ. Здесь также работали эвакуированные ВИР, часть Московского вагоноремонтного завода и Харьковского механико-машиностроительного института, а на базе эвакуированного оборудования возник механический завод — будущий опытно-экспериментальный.',
                    en: 'By a decree of 16 August 1941 the All-Union Electrotechnical Institute (VEI) and its experimental plant were to be evacuated to Krasnoufimsk, into the agricultural technical school building; part of the VEI plant arrived in November 1941. VIR, part of the Moscow Railway Car Repair Plant and the Kharkov Mechanical Engineering Institute also operated here.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Чем знаменита Красноуфимская селекционная станция, основанная учеными-агрономами в 1933 году?',
                    en: 'What made the Krasnoufimsk Crop Breeding Station (founded 1933) renowned nationwide?'
                },
                options: [
                    { t: { ru: 'Сортами зерновых для Урала', en: 'Grain cultivars for the Urals' }, correct: true },
                    { t: { ru: 'Выращиванием винограда на Урале', en: 'Cultivating wine grapes in the Urals' }, correct: false },
                    { t: { ru: 'Первой в стране фабрикой минеральных удобрений', en: 'Country’s first mineral fertilizer plant' }, correct: false },
                    { t: { ru: 'Селекцией тропических цитрусовых культур', en: 'Breeding tropical citrus fruits' }, correct: false }
                ],
                explainer: {
                    ru: 'Сорта зерновых культур красноуфимской селекции создавали для земледелия Урала и Западной Сибири с учётом короткого лета и заморозков.',
                    en: 'Krasnoufimsk-bred grain varieties were developed for farming in the Urals and Western Siberia, taking account of short summers and frosts.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Каков геологический возраст знаменитого природного памятника «Соколовский (Соколин) камень» на реке Уфе?',
                    en: 'What is the geological age of the "Sokolovsky (Sokoliy) Rock" natural monument on the Ufa River?'
                },
                options: [
                    { t: { ru: '280–290 млн лет', en: '280–290 million years' }, correct: true },
                    { t: { ru: 'Около 10 тысяч лет (ледниковая морена)', en: 'Approx. 10 thousand years (glacial moraine)' }, correct: false },
                    { t: { ru: '2 миллиона лет (вулканическая лава)', en: '2 million years (volcanic basalt)' }, correct: false },
                    { t: { ru: '500 лет (песчаные наносы)', en: '500 years (sand silt deposits)' }, correct: false }
                ],
                explainer: {
                    ru: 'Соколовский (Соколин) камень — обнажение рифовых известняков Пермского моря возрастом ~280–290 млн лет: три скальных выхода высотой до 80 м на правом берегу Уфы, в окрестностях д. Рябиновки, ниже Красноуфимска по течению. Памятник природы и популярная точка сплавов Красноуфимск — Сарана — Марийские Ключики.',
                    en: 'Sokolovsky (Sokoliy) Rock exposes Permian reef limestones about 280–290 million years old: three outcrops up to 80 m high on the right bank of the Ufa near Ryabinovka village, downstream of Krasnoufimsk. It is a nature monument and a popular stop on rafting routes.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Где в Красноуфимске установлен памятный знак Салавату Юлаеву?',
                    en: 'Where is the memorial marker to Salavat Yulaev in Krasnoufimsk?'
                },
                options: [
                    { t: { ru: 'На улице Салавата Юлаева', en: 'On Salavat Yulaev Street' }, correct: true },
                    { t: { ru: 'На вершине Дивьей горы', en: 'On the summit of Divya Mountain' }, correct: false },
                    { t: { ru: 'На центральной площади', en: 'On the central square' }, correct: false },
                    { t: { ru: 'У железнодорожного вокзала', en: 'By the railway station' }, correct: false }
                ],
                explainer: {
                    ru: 'Памятный знак открыт 28 июня 2008 года на улице Салавата Юлаева. По местному преданию, именно там 12 января 1774 года стояла юрта Салавата; на вершине Дивьей горы такого знака нет.',
                    en: 'The marker was unveiled on 28 June 2008 on Salavat Yulaev Street. Local tradition says Salavat’s yurt stood there on 12 January 1774; there is no such marker on the summit of Divya Mountain.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Что говорит официальная историческая справка города о числе памятников истории и архитектуры в Красноуфимске?',
                    en: 'What does the city’s official historical note say about the number of historical and architectural monuments in Krasnoufimsk?'
                },
                options: [
                    { t: { ru: '15 региональных и 15 местных памятников', en: '15 regional and 15 local monuments' }, correct: true },
                    { t: { ru: 'Только 3 памятника регионального значения', en: 'Only 3 monuments of regional significance' }, correct: false },
                    { t: { ru: 'Более 100 объектов федерального значения', en: 'More than 100 sites of federal significance' }, correct: false },
                    { t: { ru: 'Памятники официально не учитываются', en: 'Monuments are not officially recorded' }, correct: false }
                ],
                explainer: {
                    ru: 'Официальная историческая справка городского округа называет 15 памятников истории и архитектуры регионального значения и 15 памятников и обелисков местного значения. Это датированный подсчёт по указанной методике, а не актуальная выписка из ЕГРОКН.',
                    en: 'The city’s official historical note lists 15 historical and architectural monuments of regional significance and 15 monuments/obelisks of local significance. This is a dated count by that methodology, not a current registry extract.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'К какому юбилею со дня основания Красноуфимской крепости приурочен проект «Красноуфимск: Сквозь эпохи»?',
                    en: 'To which anniversary of the Krasnoufimsk fortress is this project dedicated in 2026?'
                },
                options: [
                    { t: { ru: '290-летию крепости', en: '290th anniversary of the fortress' }, correct: true },
                    { t: { ru: '200-летию статуса города', en: '200th anniversary of town status' }, correct: false },
                    { t: { ru: '350-летию первого поселения', en: '350th anniversary of the first settlement' }, correct: false },
                    { t: { ru: '150-летию реального училища', en: '150th anniversary of the Real School' }, correct: false }
                ],
                explainer: {
                    ru: 'В 2026 году исполняется ровно 290 лет с 1736 года, когда в урочище Красный Яр была построена крепость — место для неё в апреле 1734 года выбрал отряд полковника А. И. Тевкелева.',
                    en: 'In 2026 Krasnoufimsk marks exactly 290 years since 1736, when the fortress was built at the Krasny Yar site chosen in April 1734 by Colonel A. I. Tevkelev\'s detachment.'
                }
            }
            ,
            {
                difficulty: 'hard', q: {
                    ru: 'Как называется главный природный ориентир Красноуфимска — скала у реки Уфы?',
                    en: 'What is the name of the main natural landmark of Krasnoufimsk — the cliff by the Ufa River?'
                },
                options: [
                    { t: { ru: 'Соколовский (Соколин) камень', en: 'Sokolovsky (Sokoliy) Rock' }, correct: true },
                    { t: { ru: 'Дивья гора', en: 'Divya Mountain' }, correct: false },
                    { t: { ru: 'Красный Яр у места старой крепости', en: 'Krasny Yar at the old fortress site' }, correct: false },
                    { t: { ru: 'Владиславлева гора', en: 'Vladislavlev Mountain' }, correct: false }
                ],
                explainer: {
                    ru: 'Скала «Соколовский (Соколин) камень» — рифовые известняки пермского периода возрастом ~280–290 млн лет на правом берегу Уфы, у д. Рябиновки (ниже Красноуфимска по течению). Одно из красивейших природных мест округи.',
                    en: 'Sokolovsky (Sokoliy) Rock consists of Permian reef limestones, about 280–290 million years old, on the right bank of the Ufa near Ryabinovka village, downstream of the town. One of the most beautiful natural spots in the district.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'В каком году железнодорожная линия прошла через Красноуфимск?',
                    en: 'In what year did the railway line pass through Krasnoufimsk?'
                },
                options: [
                    { t: { ru: 'В 1915 году', en: '1915' }, correct: true },
                    { t: { ru: 'В 1890 году', en: '1890' }, correct: false },
                    { t: { ru: 'В 1930 году', en: '1930' }, correct: false },
                    { t: { ru: 'В 1905 году', en: '1905' }, correct: false }
                ],
                explainer: {
                    ru: 'Строительство линии Казань — Екатеринбург (Казанбургская дорога) шло через Красноуфимск с 1915 года: первый паровоз пришёл в 1916-м, а станция открыта для движения в 1919-м. Вокзал возведён по проекту архитектурной мастерской А. В. Щусева — автора Казанского вокзала в Москве и Мавзолея Ленина.',
                    en: 'The Kazan–Yekaterinburg (Kazanburg) railway was built through Krasnoufimsk from 1915: the first locomotive arrived in 1916 and the station opened to traffic in 1919. The station building was designed by the workshop of Alexei Shchusev, author of the Kazansky station in Moscow and of Lenin\'s Mausoleum.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'В каком году в Красноуфимске построили земскую больницу по проекту М. И. Мизерова?',
                    en: 'In what year was the zemstvo hospital in Krasnoufimsk built to M. I. Mizerov’s design?'
                },
                options: [
                    { t: { ru: 'В 1886 году', en: 'In 1886' }, correct: true },
                    { t: { ru: 'В 1875 году', en: 'In 1875' }, correct: false },
                    { t: { ru: 'В 1905 году', en: 'In 1905' }, correct: false },
                    { t: { ru: 'В 1915 году', en: 'In 1915' }, correct: false }
                ],
                explainer: {
                    ru: 'Матвей Иванович Мизеров работал в Красноуфимске с 1880 года; в 1886 году была построена земская больница по его проекту.',
                    en: 'Matvey Ivanovich Mizerov worked in Krasnoufimsk from 1880; the zemstvo hospital was built to his design in 1886.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Как называется мемориальный комплекс с Вечным огнём у площади Свято-Троицкого собора?',
                    en: 'What is the memorial complex with the Eternal Flame near Holy Trinity Cathedral Square called?'
                },
                options: [
                    { t: { ru: 'Аллея Памяти', en: 'Alley of Memory' }, correct: true },
                    { t: { ru: 'Аллея Победы', en: 'Victory Alley' }, correct: false },
                    { t: { ru: 'Парк Героев', en: 'Heroes Park' }, correct: false },
                    { t: { ru: 'Сад Истории', en: 'History Garden' }, correct: false }
                ],
                explainer: {
                    ru: 'Мемориальный комплекс «Аллея Памяти» с Вечным огнём открыт у площади Свято-Троицкого собора 22 июня 2010 года, к 65-летию Победы. Рядом — стела воинам локальных войн «Время выбрало нас…» (2014 год).',
                    en: 'The Alley of Memory complex with the Eternal Flame was opened near Holy Trinity Cathedral Square on 22 June 2010, for the 65th anniversary of Victory. Beside it stands the 2014 stele to soldiers of local wars.'
                }
            },
            {
                difficulty: 'hard', q: {
                    ru: 'Из чего построен Рябиновский железнодорожный виадук под Красноуфимском?',
                    en: 'What is the Ryabinovka Railway Viaduct near Krasnoufimsk made of?'
                },
                options: [
                    { t: { ru: 'Железобетонные арки', en: 'Reinforced-concrete arches' }, correct: true },
                    { t: { ru: 'Металлические фермы на опорах', en: 'Steel trusses on piers' }, correct: false },
                    { t: { ru: 'Кирпичная кладка', en: 'Brick masonry' }, correct: false },
                    { t: { ru: 'Деревянные сваи', en: 'Wooden piles' }, correct: false }
                ],
                explainer: {
                    ru: 'Рябиновский виадук (1915–1919 гг.) — железобетонный арочный мост длиной 283,454 м. С октября 2008 года он законсервирован: поезда идут по новому мосту рядом, а старый стал памятником инженерной архитектуры и точкой туристических маршрутов.',
                    en: 'The Ryabinovka Viaduct (1915–1919) is a reinforced-concrete arch bridge 283.454 m long. Since October 2008 it has been mothballed: trains run over the new bridge nearby, while the old one has become an engineering monument and tourist attraction.'
                }
            }
        ];

        /* ==========================================================================
           ФУНКЦИЯ [0]: ДИНАМИЧЕСКИЙ РАСЧЕТ ВОЗРАСТА КРАСНОУФИМСКА
           Красноуфимск основан в 1736 году. Возраст автоматически высчитывается
           из текущего года (в 2026 году = 290 лет, в 2027 = 291 год и т.д.).
           Правила склонения (лет / год / года) полностью соблюдены для RU и EN.
           ========================================================================== */
        

        /* ==========================================================================
   [1]: СМЕНА ЯЗЫКА (RU / EN)
   ========================================================================== */
        

        function updateCityAge() {
            const currentYear = new Date().getFullYear();
            const age = Math.max(0, currentYear - 1736);
            const statEl = document.getElementById('city-age-stat');
            if (!statEl) return;

            if (currentLang === 'ru') {
                const mod10 = age % 10;
                const mod100 = age % 100;
                let word = 'лет';
                if (mod100 < 11 || mod100 > 14) {
                    if (mod10 === 1) word = 'год';
                    else if (mod10 >= 2 && mod10 <= 4) word = 'года';
                }
                statEl.textContent = `${age} ${word}`;
            } else {
                statEl.textContent = `${age} ${age === 1 ? 'year' : 'years'}`;
            }
        }

        /* ==========================================================================
                   ФУНКЦИЯ [1]: ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА (RU / EN)
                   Обновляет весь интерфейс, карточки и викторину.
                   ========================================================================== */
        function setLanguage(lang) {
            const prevScrollY = window.scrollY;
            currentLang = lang;
            document.documentElement.lang = lang;
            document.title = (lang === 'en')
                ? 'Krasnoufimsk: Through the Ages — Interactive Guide'
                : 'Красноуфимск: Сквозь эпохи — Интерактивный путеводитель';
            safeStorageSet('krasnoufimsk_lang', lang);
            try { const u = new URL(window.location.href); u.searchParams.set('lang', lang); history.replaceState(null, '', u); } catch (e) {}
            const localizedMeta = lang === 'en'
                ? { title: 'Krasnoufimsk: Through the Ages — Interactive Guide', description: 'Krasnoufimsk: Through the Ages is an interactive guide to a Ural town: 21 epochs from the 1736 fortress, routes, viaducts, a map and a local-history quiz.', ogDescription: 'An interactive local-history journey from the Cossack fortress of 1736 to the present day: 21 epochs, curated routes, historic viaducts and a quiz.', locale: 'en_US', url: 'https://krasnoufimsk-history.site/' }
                : { title: 'Красноуфимск: Сквозь эпохи — Интерактивный путеводитель', description: 'Красноуфимск: Сквозь эпохи — интерактивный путеводитель по городу Урала: 21 эпоха от крепости 1736 г., маршруты, виадуки, карта и краеведческая игра.', ogDescription: 'Интерактивное краеведческое путешествие сквозь века: от казачьей крепости 1736 года до современности. 21 эпоха, готовые маршруты, вековые виадуки и викторина знатока.', locale: 'ru_RU', url: 'https://krasnoufimsk-history.site/' };
            const setMeta = (selector, value) => { const el = document.querySelector(selector); if (el) el.setAttribute('content', value); };
            setMeta('meta[name="description"]', localizedMeta.description);
            setMeta('meta[property="og:title"]', localizedMeta.title);
            setMeta('meta[property="og:description"]', localizedMeta.ogDescription);
            setMeta('meta[property="og:url"]', localizedMeta.url);
            setMeta('meta[property="og:locale"]', localizedMeta.locale);
            setMeta('meta[name="twitter:title"]', localizedMeta.title);
            setMeta('meta[name="twitter:description"]', localizedMeta.ogDescription);
            const canonical = document.getElementById('canonical-url'); if (canonical) canonical.href = localizedMeta.url;

            const dict = i18n[lang] || i18n.ru;

            // Обновляем доступность кнопки языка
            const langSwitchBtn = document.getElementById('lang-switch-btn');
            if (langSwitchBtn) {
                langSwitchBtn.setAttribute('aria-label', lang === 'ru' ? 'Переключить на английский' : 'Switch to Russian');
                langSwitchBtn.setAttribute('title', lang === 'ru' ? 'Переключить на английский' : 'Switch to Russian');
            }

            // Обновляем все элементы с атрибутом data-i18n
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key] !== undefined) {
                    if (typeof dict[key] === 'string' && dict[key].includes('<')) {
                        el.innerHTML = dict[key];
                    } else {
                        el.textContent = dict[key];
                    }
                }
            });

            // Обновляем все placeholder-ы с атрибутом data-i18n-placeholder
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const k = el.getAttribute('data-i18n-placeholder');
                if (dict[k]) el.placeholder = dict[k];
            });

            // Локализуем aria-label/title статичных кнопок
            const setAria = (selector, ruText, enText) => document.querySelectorAll(selector).forEach(el => {
                el.setAttribute('aria-label', lang === 'en' ? enText : ruText);
                if (el.hasAttribute('title')) el.setAttribute('title', lang === 'en' ? enText : ruText);
            });
            setAria('#weather-pill', 'Открыть прогноз погоды в Красноуфимске на 7 дней', 'Open the 7-day weather forecast for Krasnoufimsk');
            setAria('#achieve-btn', 'Паспорт исследователя', 'Explorer Passport');
            setAria('#mobile-menu-btn', 'Меню навигации', 'Navigation menu');
            setAria('.mobile-close-btn', 'Закрыть меню', 'Close menu');
            setAria('#timeline-prev-btn', 'Прокрутить ленту влево', 'Scroll timeline left');
            setAria('#timeline-next-btn', 'Прокрутить ленту вправо', 'Scroll timeline right');
            setAria('#sights-select-dropdown', 'Меню достопримечательностей', 'Attractions menu');
            setAria('#btn-close-weather', 'Закрыть окно погоды', 'Close weather dialog');
            setAria('.passport-close-btn', 'Закрыть', 'Close');
            setAria('.passport-done-btn', 'Закрыть паспорт исследователя', 'Close Explorer Passport');
            setAria('.sources-done-btn', 'Закрыть источники и кредиты', 'Close Sources & Credits');
            setAria('#passport-avatar-current', 'Сменить аватар', 'Change avatar');
            setAria('#sights-search-clear-btn', 'Очистить поиск', 'Clear search');
            setAria('#sights-custom-trigger', 'Открыть список достопримечательностей', 'Open the list of attractions');
            setAria('.sights-map-btn-reset', 'Сбросить масштаб и показать весь город', 'Reset zoom and show the whole town');
            setAria('#sights-leaflet-map', 'Интерактивная карта достопримечательностей Красноуфимска', 'Interactive map of Krasnoufimsk attractions');
            const sightNavBtns = document.querySelectorAll('.sights-nav-btn');
            if (sightNavBtns[0]) { sightNavBtns[0].setAttribute('aria-label', lang === 'en' ? 'Previous attraction' : 'Предыдущий объект'); sightNavBtns[0].setAttribute('title', lang === 'en' ? 'Previous attraction' : 'Предыдущий объект'); }
            if (sightNavBtns[1]) { sightNavBtns[1].setAttribute('aria-label', lang === 'en' ? 'Next attraction' : 'Следующий объект'); sightNavBtns[1].setAttribute('title', lang === 'en' ? 'Next attraction' : 'Следующий объект'); }
            const avatarNames = { '🧭': ['Аватар: Компас', 'Avatar: Compass'], '🏛️': ['Аватар: Музей', 'Avatar: Museum'], '🚂': ['Аватар: Паровоз', 'Avatar: Steam locomotive'], '🦈': ['Аватар: Акула Геликоприон', 'Avatar: Helicoprion shark'], '🦅': ['Аватар: Сокол', 'Avatar: Falcon'] };
            document.querySelectorAll('.avatar-opt').forEach(btn => { const pair = avatarNames[btn.textContent.trim()]; if (pair) { btn.setAttribute('aria-label', lang === 'en' ? pair[1] : pair[0]); btn.setAttribute('title', lang === 'en' ? pair[1].replace('Avatar: ', '') : pair[0].replace('Аватар: ', '')); } });

            const lastBadge = window.lastAchievementBadge;
            if (lastBadge) {
                const toastTitle = document.getElementById('achieve-toast-title');
                const toastDesc = document.getElementById('achieve-toast-desc');
                const toastIcon = document.getElementById('achieve-toast-icon');
                if (toastTitle) toastTitle.textContent = lastBadge.title[lang] || lastBadge.title.ru;
                if (toastDesc) toastDesc.textContent = lastBadge.desc[lang] || lastBadge.desc.ru;
                if (toastIcon) toastIcon.textContent = lastBadge.icon;
            }

            // Обновляем текст кнопки языка
            const langLabel = document.getElementById('lang-label');
            if (langLabel) langLabel.textContent = lang === 'ru' ? 'EN' : 'RU';

            // Обновляем текст кнопки раскрытия викторины
            const quizBody = document.getElementById('quiz-body');
            const toggleText = document.getElementById('quiz-toggle-text');
            if (toggleText && quizBody) {
                const isExpanded = quizBody.style.display !== 'none' && getComputedStyle(quizBody).display !== 'none';
                toggleText.textContent = isExpanded ? dict.btnCollapseQuiz : dict.btnStartQuiz;
            }

            // Динамический пересчет возраста Красноуфимска
            updateCityAge();

            // Обновляем теги в кнопках ленты времени
            document.querySelectorAll('.time-btn').forEach((btn, idx) => {
                const tagSpan = btn.querySelector('.tag');
                if (tagSpan && eventsData[idx]) {
                    tagSpan.textContent = eventsData[idx].tag[lang];
                }
            });

            // Перерисовываем карточки и викторину
            renderCards();
            renderQuiz();

            // Обновляем заголовки сезонов
            let currentSeason = 'autumn';
            if (document.body.classList.contains('season-winter')) currentSeason = 'winter';
            if (document.body.classList.contains('season-spring')) currentSeason = 'spring';
            if (document.body.classList.contains('season-summer')) currentSeason = 'summer';
            updateSeasonText(currentSeason);
            // Обновление интерактивного каталога достопримечательностей
            if (typeof renderSightsSelector === 'function') renderSightsSelector(currentSightCategory);
            if (typeof selectSight === 'function') selectSight(currentSightId);
            if (typeof buildTimelineNav === 'function') buildTimelineNav();
            openEvent(typeof currentEventIndex !== 'undefined' ? currentEventIndex : 0, 'event' + ((typeof currentEventIndex !== 'undefined' ? currentEventIndex : 0) + 1));
            if (typeof renderNavSightsDropdown === 'function') renderNavSightsDropdown();
            if (typeof updateSightsDropdownMenu === 'function') updateSightsDropdownMenu();
            if (typeof refreshSightsBaseLayer === 'function') refreshSightsBaseLayer();
            if (typeof renderSightsMapMarkers === 'function' && typeof sightsMap !== 'undefined' && sightsMap) {
                renderSightsMapMarkers(typeof currentMapFilter !== 'undefined' ? currentMapFilter : 'all');
            }
            if (typeof renderPassportBadges === 'function') renderPassportBadges();
            if (typeof updateWeatherDisplay === 'function') updateWeatherDisplay(lang);

            // Фикс для мобильного Safari: принудительная перерисовка при смене языка
            setTimeout(() => {
                window.scrollBy(0, 1);
                window.scrollBy(0, -1);
            }, 50);
        }

        // Обработчик кнопки смены языка
        document.getElementById('lang-switch-btn').addEventListener('click', function () {
            setLanguage(currentLang === 'ru' ? 'en' : 'ru');
        });

        /* ==========================================================================
           ФУНКЦИЯ [2]: ОТРИСОВКА КАРТОЧЕК ЭПОХ (RENDER CARDS)
           Динамически строит 11 карточек с учетом выбранного языка.
           ========================================================================== */
        let currentEventIndex = 0;
        const totalEvents = eventsData.length;

        function renderCards() {
            const container = document.getElementById('events-container');
            if (!container) return;

            const dict = i18n[currentLang];
            let html = '';

            eventsData.forEach((ev, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === totalEvents - 1;
                const activeClass = idx === currentEventIndex ? 'active' : '';

                html += `
                <article class="event-card ${activeClass}" id="event${idx + 1}" data-index="${idx}">
                    <div class="event-card-watermark" aria-hidden="true">${localizeSightYear(ev.year)}</div>
                    <div class="card-header-bar">
                        <span class="epoch-badge">${ev.badge[currentLang]}</span>
                        <span class="event-card-index">${dict.epochWord} ${idx + 1} ${dict.fromWord}</span>
                    </div>
                    <h3>${ev.title[currentLang]}</h3>
                    <p class="event-desc">${ev.desc[currentLang]}</p>
                    
                    <div class="historical-fact-box">
                        <strong>${dict.factTitle}</strong>
                        ${ev.fact[currentLang]}
                    </div>
                    
                    <div class="map-container">
                        
                        <strong class="map-title">${ev.mapTitle[currentLang]}</strong>

                        <div class="landmark-address-card">
                            <div class="address-header">
                                <span class="address-badge">📍 ${dict.addressLabel}</span>
                            </div>
                            <p class="address-details">${ev.address[currentLang]}</p>
                            <div class="address-map-btn-wrap">
                                <button type="button" class="btn-open-map" onclick="openTimelineEventMap(${idx})">
                                    🗺️ ${dict.btnMap}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card-nav-footer">
                        <button type="button" class="btn-step-nav" onclick="stepEvent(-1)" ${isFirst ? 'disabled' : ''}>${dict.btnPrev}</button>
                        <button type="button" class="btn-step-nav" onclick="stepEvent(1)" ${isLast ? 'disabled' : ''}>${isLast ? dict.btnFinal : dict.btnNext}</button>
                    </div>
                </article>
                `;
            });

            container.innerHTML = html;
        }

        function updateTimelineArrows() {
            const container = document.getElementById('timeline-scroll-container');
            const prevBtn = document.getElementById('timeline-prev-btn');
            const nextBtn = document.getElementById('timeline-next-btn');
            if (!container) return;
            const atStart = container.scrollLeft <= 8;
            const atEnd = (container.scrollLeft + container.clientWidth) >= (container.scrollWidth - 8);
            if (prevBtn) prevBtn.disabled = atStart;
            if (nextBtn) nextBtn.disabled = atEnd;
        }

        // Плавная свободная прокрутка ленты времени стрелками
        function scrollTimelineTrack(direction) {
            const container = document.getElementById('timeline-scroll-container');
            if (!container) return;
            const scrollAmount = Math.max(300, Math.floor(container.clientWidth * 0.65));
            container.scrollBy({ left: direction * scrollAmount, behavior: getScrollBehavior() });
            setTimeout(updateTimelineArrows, 260);
        }

        // Поддержка свободного перетаскивания ленты мышью (Drag-to-Scroll)
        function enableDragToScroll(el) {
            if (!el || el.dataset.dragEnabled) return;
            el.dataset.dragEnabled = 'true';
            let isDown = false;
            let startX = 0;
            let scrollStart = 0;
            let dragDistance = 0;

            el.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return;
                isDown = true;
                dragDistance = 0;
                startX = e.pageX - el.offsetLeft;
                scrollStart = el.scrollLeft;
                el.classList.add('is-dragging');
            });

            window.addEventListener('mouseup', () => {
                if (!isDown) return;
                isDown = false;
                el.classList.remove('is-dragging');
                setTimeout(() => { dragDistance = 0; }, 60);
                updateTimelineArrows();
            });

            el.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - el.offsetLeft;
                const walk = x - startX;
                dragDistance = Math.abs(walk);
                el.scrollLeft = scrollStart - walk;
            });

            el.addEventListener('click', (e) => {
                if (dragDistance > 6) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
        }

        // Построение музейной ленты времени
        function buildTimelineNav() {
            const container = document.getElementById('timeline-scroll-container');
            if (!container) return;
            container.innerHTML = eventsData.map((ev, i) => {
                const cleanTag = (ev.tag[currentLang] || '').replace(/^[•\s-]+/, '').trim();
                const epochNum = String(i + 1).padStart(2, '0');
                const isActive = (i === currentEventIndex);
                return `
                    <button class="time-btn ${isActive ? 'active' : ''}" 
                            onclick="openEvent(${i}, 'event${i + 1}', true)"
                            data-index="${i}"
                            type="button"
                            title="${localizeSightYear(ev.year)} — ${cleanTag}"
                            aria-label="${localizeSightYear(ev.year)} — ${cleanTag}">
                        <div class="time-btn-pill">
                            <div class="time-year-row">
                                <span class="time-epoch-index">#${epochNum}</span>
                                <span class="time-year-text">${localizeSightYear(ev.year)}</span>
                            </div>
                            <div class="time-topic-row">
                                <span class="time-topic-text tag">${cleanTag}</span>
                            </div>
                        </div>
                        <div class="time-node-anchor" aria-hidden="true">
                            <span class="time-node-dot"></span>
                        </div>
                    </button>
                `;
            }).join('');

            // Горизонтальный скролл колёсиком мыши
            if (!container.dataset.wheelBound) {
                container.dataset.wheelBound = 'true';
                container.addEventListener('wheel', (e) => {
                    if (e.deltaY !== 0 && !e.shiftKey) {
                        e.preventDefault();
                        container.scrollBy({ left: e.deltaY * 1.6, behavior: getScrollBehavior() });
                    }
                }, { passive: false });
                container.addEventListener('scroll', updateTimelineArrows, { passive: true });
            }

            // Включаем свободное перетаскивание ленты мышью
            enableDragToScroll(container);

            updateTimelineArrows();
        }

        function openEvent(index, eventId, autoScroll = false) {
            currentEventIndex = index;

            const timeBtns = document.querySelectorAll('.time-btn');
            timeBtns.forEach((btn, i) => {
                if (i === index) {
                    btn.classList.add('active');
                    const scrollContainer = document.querySelector('.timeline-scroll-container');
                    if (scrollContainer) {
                        const targetLeft = btn.offsetLeft - (scrollContainer.clientWidth / 2) + (btn.clientWidth / 2);
                        scrollContainer.scrollTo({ left: targetLeft, behavior: getScrollBehavior() });
                    }
                } else {
                    btn.classList.remove('active');
                }
            });

            updateTimelineArrows();

            const cards = document.querySelectorAll('.event-card');
            cards.forEach(card => card.classList.remove('active'));

            const target = document.getElementById(eventId);
            if (target) target.classList.add('active');

            // Мягко поднимаем к началу текста карточки эпохи
            const container = document.getElementById('events-container');
            if (container) {
                const rect = container.getBoundingClientRect();
                const threshold = window.innerWidth <= 960 ? 124 : 138;
                if (autoScroll) {
                    setTimeout(scrollToActiveCard, 40);
                }
            }

            // Достижение «Хранитель эпох» (исследование эпох ленты времени)
            if (typeof trackTimelineEpoch === 'function') {
                trackTimelineEpoch(eventId);
            }
        }

        // Пошаговая навигация (+1 вперед / -1 назад)

        // Плавный скролл к началу текста карточки эпохи
        function scrollToActiveCard() {
            const container = document.getElementById('events-container');
            if (container) {
                const isMobile = window.innerWidth <= 960;
                const headerOffset = isMobile ? 124 : 138; // отступ с учетом высоты шапки и залипающего таймлайна
                const elementPosition = container.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: getScrollBehavior()
                });
            }
        }

        function stepEvent(delta) {
            const nextIndex = currentEventIndex + delta;
            if (nextIndex >= 0 && nextIndex < totalEvents) {
                openEvent(nextIndex, 'event' + (nextIndex + 1));
                // Поднимаем вверх к началу текста карточки эпохи
                setTimeout(() => {
                    scrollToActiveCard();
                }, 50);
            }
        }

        // Поддержка клавиш клавиатуры (Стрелки влево / вправо, Escape)
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
                if (typeof closeWeatherModal === 'function') closeWeatherModal();
                if (typeof closePassportModal === 'function') closePassportModal();
                return;
            }
            if (e.target.isContentEditable || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const isModalOpen = document.querySelector('.passport-modal-backdrop.active, .weather-modal-backdrop.active, body.modal-open');
                if (isModalOpen) return;
                const tl = document.getElementById('timeline');
                if (tl) {
                    const r = tl.getBoundingClientRect();
                    if (r.top < window.innerHeight && r.bottom > 0) {
                        if (e.key === 'ArrowRight') stepEvent(1);
                        if (e.key === 'ArrowLeft') stepEvent(-1);
                    }
                }
            }
        });

        /* ==========================================================================
           ФУНКЦИИ НАВИГАЦИИ И СКРОЛЛА ПО СЕКЦИЯМ
           ========================================================================== */
        function scrollToSection(sectionId, headerOffset = 85) {
            let el = document.getElementById(sectionId);
            if (sectionId === 'timeline') {
                el = document.getElementById('timeline-top-marker') || el;
            }
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
            const targetY = Math.max(0, rect.top + currentScrollY - headerOffset);
            window.scrollTo({
                top: targetY,
                behavior: getScrollBehavior()
            });
        }

        /* ==========================================================================
           ФУНКЦИЯ [2.1]: ПЕРЕХОД К ОБЪЕКТАМ В ЛЕНТЕ ВРЕМЕНИ ИЗ МАРШРУТОВ И ПАМЯТКИ
           Открывает нужную эпоху и гарантированно плавно поднимает страницу ровно к ленте времени.
           ========================================================================== */
        function jumpToTimelineEvent(index, eventId) {
            openEvent(index, eventId);
            setTimeout(() => {
                scrollToSection('timeline');
            }, 40);
        }

        /* ==========================================================================
           ФУНКЦИЯ [3]: ЖИВАЯ ПОГОДА ЧЕРЕЗ OPEN-METEO API
           Получает актуальные метеоданные Красноуфимска без ключей и оплат.
           ========================================================================== */
        const MET_CODES = {
            'clearsky_day': { ru: 'Ясно', en: 'Clear sky', icon: '☀️' },
            'clearsky_night': { ru: 'Ясно', en: 'Clear sky', icon: '🌙' },
            'clearsky': { ru: 'Ясно', en: 'Clear sky', icon: '☀️' },
            'fair_day': { ru: 'Малооблачно', en: 'Mainly clear', icon: '🌤️' },
            'fair_night': { ru: 'Малооблачно', en: 'Mainly clear', icon: '🌤️' },
            'fair': { ru: 'Малооблачно', en: 'Mainly clear', icon: '🌤️' },
            'partlycloudy_day': { ru: 'Переменная облачность', en: 'Partly cloudy', icon: '⛅' },
            'partlycloudy_night': { ru: 'Переменная облачность', en: 'Partly cloudy', icon: '⛅' },
            'partlycloudy': { ru: 'Переменная облачность', en: 'Partly cloudy', icon: '⛅' },
            'cloudy': { ru: 'Пасмурно', en: 'Overcast', icon: '☁️' },
            'rain': { ru: 'Дождь', en: 'Rain', icon: '🌧️' },
            'lightrain': { ru: 'Небольшой дождь', en: 'Slight rain', icon: '🌦️' },
            'heavyrain': { ru: 'Сильный дождь', en: 'Heavy rain', icon: '🌧️' },
            'lightrainshowers': { ru: 'Кратковременный дождь', en: 'Light rain showers', icon: '🌦️' },
            'rainshowers': { ru: 'Дождь', en: 'Rain showers', icon: '🌧️' },
            'heavyrainshowers': { ru: 'Ливень', en: 'Heavy showers', icon: '🌧️' },
            'rainandthunder': { ru: 'Гроза с дождем', en: 'Rain and thunder', icon: '⛈️' },
            'snow': { ru: 'Снег', en: 'Snow', icon: '🌨️' },
            'lightsnow': { ru: 'Небольшой снег', en: 'Light snow', icon: '❄️' },
            'heavysnow': { ru: 'Сильный снегопад', en: 'Heavy snow', icon: '❄️' },
            'snowshowers': { ru: 'Снегопад', en: 'Snow showers', icon: '🌨️' },
            'lightsnowshowers': { ru: 'Временами снег', en: 'Light snow showers', icon: '🌨️' },
            'sleet': { ru: 'Мокрый снег', en: 'Sleet', icon: '🌨️' },
            'lightsleet': { ru: 'Небольшой мокрый снег', en: 'Light sleet', icon: '🌨️' },
            'fog': { ru: 'Туман', en: 'Fog', icon: '🌫️' }
        };

        function getMetInfo(rawCode) {
            if (!rawCode) return { ru: 'Переменная облачность', en: 'Partly cloudy', icon: '⛅' };
            if (MET_CODES[rawCode]) return MET_CODES[rawCode];
            const base = rawCode.replace(/_(day|night|polartwilight)$/, '');
            if (MET_CODES[base]) return MET_CODES[base];
            if (rawCode.includes('thunder')) return { ru: 'Гроза', en: 'Thunderstorm', icon: '⛈️' };
            if (rawCode.includes('snow')) return { ru: 'Снег', en: 'Snow', icon: '🌨️' };
            if (rawCode.includes('sleet')) return { ru: 'Мокрый снег', en: 'Sleet', icon: '🌨️' };
            if (rawCode.includes('rain')) return { ru: 'Дождь', en: 'Rain', icon: '🌧️' };
            if (rawCode.includes('clear')) return { ru: 'Ясно', en: 'Clear sky', icon: '☀️' };
            if (rawCode.includes('cloud')) return { ru: 'Облачно', en: 'Cloudy', icon: '☁️' };
            if (rawCode.includes('fog')) return { ru: 'Туман', en: 'Fog', icon: '🌫️' };
            return { ru: 'Переменная облачность', en: 'Partly cloudy', icon: '⛅' };
        }

        let cachedWeatherState = null;

        let lastDialogTrigger = null;
        function focusDialog(backdrop) {
            if (!backdrop) return;
            lastDialogTrigger = document.activeElement;
            const dialog = backdrop.querySelector('[role="dialog"]') || backdrop;
            if (!dialog.hasAttribute('tabindex')) dialog.setAttribute('tabindex', '-1');
            const focusable = dialog.querySelector('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
            setTimeout(() => { (focusable || dialog).focus(); }, 50);
        }
        function restoreDialogFocus() {
            if (lastDialogTrigger && document.contains(lastDialogTrigger)) lastDialogTrigger.focus();
            lastDialogTrigger = null;
        }
        document.addEventListener('keydown', function(e) {
            if (e.key !== 'Tab') return;
            const backdrop = document.querySelector('.weather-modal-backdrop.active, .passport-modal-backdrop.active');
            if (!backdrop) return;
            const items = Array.from(backdrop.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(el => el.offsetParent !== null || el === document.activeElement);
            if (!items.length) return;
            const first = items[0], last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });

        // Открытие и закрытие центрального модального окна погоды
        window.openWeatherModal = function() {
            const modal = document.getElementById('weather-modal-backdrop');
            if (!modal) return;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            focusDialog(modal);
        };

        window.closeWeatherModal = function() {
            const modal = document.getElementById('weather-modal-backdrop');
            if (!modal) return;
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            const passport = document.getElementById('passport-modal');
            const mobilePanel = document.getElementById('mobile-nav-panel');
            if ((!passport || !passport.classList.contains('active')) &&
                (!mobilePanel || !mobilePanel.classList.contains('open'))) {
                document.body.classList.remove('modal-open');
            }
            restoreDialogFocus();
        };

        window.handleWeatherBackdropClick = function(e) {
            if (e.target && e.target.id === 'weather-modal-backdrop') {
                closeWeatherModal();
            }
        };

        // Генерация 7 карточек динамического прогноза
        function renderForecastDays(daysList, lang) {
            const container = document.getElementById('weather-forecast-days');
            if (!container || !daysList || !daysList.length) return;

            const weekDaysRu = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
            const weekDaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const monthsRu = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
            const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            let html = '';
            daysList.forEach((day, idx) => {
                const d = day.dateObj instanceof Date ? day.dateObj : new Date(day.dateStr + 'T12:00:00');
                const weekdayStr = idx === 0
                    ? (lang === 'en' ? 'Today' : 'Сегодня')
                    : (lang === 'en' ? weekDaysEn[d.getDay()] : weekDaysRu[d.getDay()]);
                const dateStr = d.getDate() + ' ' + (lang === 'en' ? monthsEn[d.getMonth()] : monthsRu[d.getMonth()]);
                const isTodayClass = idx === 0 ? ' is-today' : '';
                const highTempStr = (day.high > 0 ? '+' : '') + day.high + '°';
                const lowTempStr = (day.low > 0 ? '+' : '') + day.low + '°';
                const descTitle = day.wmo[lang] || day.wmo.ru;

                html += `
                    <div class="weather-day-card${isTodayClass}" title="${descTitle}">
                        <span class="weather-day-weekday">${weekdayStr}</span>
                        <span class="weather-day-date">${dateStr}</span>
                        <span class="weather-day-icon">${day.wmo.icon}</span>
                        <span class="weather-day-temp-high">${highTempStr}</span>
                        <span class="weather-day-temp-low">${lowTempStr}</span>
                    </div>
                `;
            });
            container.innerHTML = html;
        }

        // Сезонный резервный список дней на случай отсутствия сети
        function getFallbackDaysList(season) {
            const baseTemps = {
                winter: { high: -7, low: -14, sym: 'lightsnow' },
                spring: { high: 9, low: 1, sym: 'partlycloudy' },
                summer: { high: 23, low: 13, sym: 'clearsky' },
                autumn: { high: 7, low: 1, sym: 'lightrain' }
            }[season] || { high: 8, low: 2, sym: 'partlycloudy' };

            const list = [];
            const now = new Date();
            for (let i = 0; i < 7; i++) {
                const d = new Date(now);
                d.setDate(now.getDate() + i);
                const delta = ((i % 3) - 1) * 2;
                list.push({
                    dateStr: d.toISOString().slice(0, 10),
                    dateObj: d,
                    high: baseTemps.high + delta,
                    low: baseTemps.low + delta,
                    wmo: getMetInfo(baseTemps.sym),
                    symCode: baseTemps.sym
                });
            }
            return list;
        }


        const WEATHER_CACHE_KEY = 'kuf_weather_cache_v3';
        const WEATHER_LEGACY_CACHE_KEY = 'kuf_weather_cache_v2';

        function serializeWeatherDays(daysList) {
            return (Array.isArray(daysList) ? daysList : []).slice(0, 7).map(dl => ({
                dateStr: dl.dateStr,
                high: dl.high,
                low: dl.low,
                symCode: dl.symCode || 'partlycloudy_day'
            }));
        }

        function saveWeatherCache(state) {
            if (!state || !state.current) return;
            const payload = {
                version: 3,
                current: {
                    temp: state.current.temp,
                    feels: state.current.feels,
                    windMs: state.current.windMs,
                    hum: state.current.hum,
                    precip: state.current.precip,
                    pressure: state.current.pressure,
                    code: state.current.code || 'partlycloudy_day'
                },
                daysList: serializeWeatherDays(state.daysList),
                timeStr: state.timeStr || new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                timestamp: Number.isFinite(state.timestamp) ? state.timestamp : Date.now(),
                provider: state.provider || 'met.no'
            };
            const raw = JSON.stringify(payload);
            safeStorageSet(WEATHER_CACHE_KEY, raw);
            // Тот же JSON совместим со старой схемой v2 и остаётся общим для двух страниц.
            safeStorageSet(WEATHER_LEGACY_CACHE_KEY, raw);
        }

        function restoreWeatherCache() {
            const now = new Date();
            const pad = value => String(value).padStart(2, '0');
            const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
            for (const key of [WEATHER_CACHE_KEY, WEATHER_LEGACY_CACHE_KEY]) {
                try {
                    const raw = safeStorageGet(key);
                    if (!raw) continue;
                    const parsed = JSON.parse(raw);
                    const timestamp = Number(parsed && parsed.timestamp);
                    if (!parsed || !parsed.current || !Array.isArray(parsed.daysList)) continue;
                    if (!Number.isFinite(timestamp) || timestamp > Date.now() + 5 * 60 * 1000 || timestamp < Date.now() - 7 * 24 * 60 * 60 * 1000) continue;
                    if (!Number.isFinite(Number(parsed.current.temp))) continue;
                    const daysList = parsed.daysList
                        .filter(dl => dl && typeof dl.dateStr === 'string' && dl.dateStr >= todayStr && Number.isFinite(Number(dl.high)) && Number.isFinite(Number(dl.low)))
                        .slice(0, 7)
                        .map(dl => ({
                            dateStr: dl.dateStr,
                            dateObj: new Date(dl.dateStr + 'T12:00:00'),
                            high: Number(dl.high),
                            low: Number(dl.low),
                            wmo: getMetInfo(dl.symCode || 'partlycloudy_day'),
                            symCode: dl.symCode || 'partlycloudy_day'
                        }));
                    if (!daysList.length) continue;
                    const code = parsed.current.code || 'partlycloudy_day';
                    return {
                        current: {
                            temp: parsed.current.temp,
                            feels: parsed.current.feels,
                            windMs: parsed.current.windMs,
                            hum: parsed.current.hum,
                            precip: parsed.current.precip,
                            pressure: parsed.current.pressure,
                            wmo: getMetInfo(code),
                            code
                        },
                        daysList,
                        timeStr: parsed.timeStr || '',
                        timestamp,
                        provider: parsed.provider || 'saved data',
                        isOffline: true,
                        isCached: true
                    };
                } catch (err) {}
            }
            return null;
        }

        function getWeatherProviderName(data, isEn) {
            if (data && data.provider && data.provider !== 'baseline' && data.provider !== 'saved data') return data.provider;
            if (data && data.isCached) return isEn ? 'saved data' : 'сохранённые данные';
            if (data && data.isOffline) return isEn ? 'seasonal baseline' : 'сезонный базовый расчёт';
            return 'met.no';
        }

        function getWeatherProviderLabel(data, isEn) {
            const providerName = getWeatherProviderName(data, isEn);
            return data && data.isCached
                ? `${providerName} • ${isEn ? 'saved forecast' : 'сохранённый прогноз'}`
                : providerName;
        }

        function getWeatherBadgeLabel(data, isEn) {
            if (data && data.isCached) return isEn ? '● Saved' : '● Сохранено';
            if (data && data.isOffline) return isEn ? '● Baseline' : '● Базовый';
            return `● ${getWeatherProviderName(data, isEn)}`;
        }

        function formatWeatherUpdatedLabel(data, isEn) {
            if (data && data.isCached && Number.isFinite(data.timestamp)) {
                try {
                    const formatted = new Intl.DateTimeFormat(isEn ? 'en-GB' : 'ru-RU', {
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                    }).format(new Date(data.timestamp));
                    return isEn ? `Saved forecast • updated ${formatted}` : `Сохранённый прогноз • обновлено ${formatted}`;
                } catch (err) {}
            }
            if (data && data.isOffline) return isEn ? 'No connection • seasonal baseline' : 'Нет соединения • сезонный базовый расчёт';
            if (data && data.timeStr) return isEn ? `Updated today at ${data.timeStr}` : `Обновлено сегодня в ${data.timeStr}`;
            return isEn ? 'Waiting for data...' : 'Ожидание данных...';
        }

        // Обновление всех элементов отображения погоды на основе сохраненного состояния
        function updateWeatherDisplay(lang = (typeof currentLang !== 'undefined' ? currentLang : 'ru')) {
            if (!cachedWeatherState) return;
            const data = cachedWeatherState;
            const isEn = lang === 'en';

            // Навбар
            const iconEl = document.getElementById('weather-icon');
            const tempEl = document.getElementById('weather-temp');
            if (iconEl) iconEl.textContent = data.current.wmo.icon;
            if (tempEl) tempEl.textContent = (data.current.temp > 0 ? '+' : '') + data.current.temp + '°C';

            // Шапка модального окна
            const mainIconEl = document.getElementById('weather-modal-main-icon');
            if (mainIconEl) mainIconEl.textContent = data.current.wmo.icon;

            // Главная плашка
            const heroTempEl = document.getElementById('weather-hero-temp');
            const heroSummaryEl = document.getElementById('weather-hero-summary');
            const feelsEl = document.getElementById('weather-feels');
            const seasonPillEl = document.getElementById('weather-season-pill');

            if (heroTempEl) heroTempEl.textContent = (data.current.temp > 0 ? '+' : '') + data.current.temp + '°C';
            if (heroSummaryEl) {
                const summaryText = data.current.wmo[lang] || data.current.wmo.ru;
                heroSummaryEl.textContent = `${data.current.wmo.icon} ${summaryText}`;
            }
            if (feelsEl) feelsEl.textContent = (data.current.feels > 0 ? '+' : '') + data.current.feels + '°C';

            const season = typeof getNaturalSeason === 'function' ? getNaturalSeason() : 'autumn';
            const seasonLabels = {
                winter: { ru: '❄️ Уральская зима', en: '❄️ Ural Winter' },
                spring: { ru: '🌱 Весеннее пробуждение', en: '🌱 Spring Awakening' },
                summer: { ru: '☀️ Тёплое уральское лето', en: '☀️ Ural Summer' },
                autumn: { ru: '🍂 Золотая уральская осень', en: '🍂 Golden Ural Autumn' }
            };
            if (seasonPillEl) {
                seasonPillEl.textContent = (seasonLabels[season] && seasonLabels[season][lang]) || seasonLabels[season].ru;
            }

            // 4 метрики
            const windEl = document.getElementById('weather-wind');
            const humEl = document.getElementById('weather-humidity');
            const precipEl = document.getElementById('weather-precip');
            const pressureEl = document.getElementById('weather-pressure');

            if (windEl) windEl.textContent = String(data.current.windMs).replace('.', isEn ? '.' : ',') + (isEn ? ' m/s' : ' м/с');
            if (humEl) humEl.textContent = data.current.hum + '%';
            if (precipEl) precipEl.textContent = String(data.current.precip).replace('.', isEn ? '.' : ',') + (isEn ? ' mm' : ' мм');
            if (pressureEl) pressureEl.textContent = data.current.pressure + (isEn ? ' mmHg' : ' мм');

            // 7 дней прогноза
            renderForecastDays(data.daysList, lang);

            const providerTag = document.querySelector('.forecast-service-tag');
            if (providerTag) providerTag.textContent = getWeatherProviderLabel(data, isEn);
            const providerBadge = document.getElementById('weather-card-badge');
            if (providerBadge) {
                providerBadge.className = 'weather-status-badge' + (data.isOffline ? ' badge-offline' : '');
                providerBadge.textContent = getWeatherBadgeLabel(data, isEn);
            }

            // Время обновления: для офлайн-кэша показываем дату реального получения прогноза.
            const timeEl = document.getElementById('weather-time');
            if (timeEl) timeEl.textContent = formatWeatherUpdatedLabel(data, isEn);
        }

        // Интерактивное обновление погоды с плавной 360° анимацией
        async function refreshWeatherWithAnimation() {
            const icon = document.getElementById('weather-refresh-icon');
            const text = document.getElementById('weather-refresh-text');
            const badge = document.getElementById('weather-card-badge');
            const btn = document.getElementById('btn-refresh-weather');
            const lang = (typeof currentLang !== 'undefined' && currentLang === 'en') ? 'en' : 'ru';

            if (icon) icon.classList.add('spinning');
            if (btn) {
                btn.disabled = true;
                btn.style.pointerEvents = 'none';
            }
            if (text) text.textContent = lang === 'en' ? 'Updating...' : 'Обновление...';
            if (badge) {
                badge.classList.add('badge-loading');
                badge.textContent = lang === 'en' ? '● Loading...' : '● Загрузка...';
            }

            const minDelay = new Promise(resolve => setTimeout(resolve, 750));

            try {
                await Promise.all([fetchKrasnoufimskWeather(), minDelay]);
            } catch (err) {
                console.error('Weather refresh error:', err);
            } finally {
                if (icon) icon.classList.remove('spinning');
                if (btn) {
                    btn.disabled = false;
                    btn.style.pointerEvents = 'auto';
                }
                if (text) text.textContent = lang === 'en' ? 'Refresh' : 'Обновить';
                if (badge) badge.classList.remove('badge-loading');
                updateWeatherDisplay(lang);
            }
        }

        // Основной асинхронный запрос погоды и прогноза Красноуфимска
        async function fetchKrasnoufimskWeather() {
            const lat = 56.6167;
            const lon = 57.7667;
            const baseUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

            try {
                const metCtrl = new AbortController();
                const metTimer = setTimeout(() => metCtrl.abort(), 8000);
                let response;
                try {
                    response = await fetch(baseUrl, { signal: metCtrl.signal });
                } finally {
                    clearTimeout(metTimer);
                }
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                const ts = data.properties.timeseries;
                if (!ts || !ts.length) throw new Error('Пустой ответ API');

                const cur = ts[0];
                const d = cur.data.instant.details;
                const temp = Math.round(d.air_temperature);
                const windMs = d.wind_speed.toFixed(1);
                const hum = Math.round(d.relative_humidity);
                const pressure = Math.round((d.air_pressure_at_sea_level || 1013.25) * 0.750062);
                const feels = Math.round(d.air_temperature - (d.wind_speed > 3 ? d.wind_speed * 0.5 : 0));

                let precip = '0.0';
                let curCode = 'partlycloudy_day';
                if (cur.data.next_1_hours) {
                    precip = (cur.data.next_1_hours.details.precipitation_amount || 0).toFixed(1);
                    curCode = cur.data.next_1_hours.summary.symbol_code || 'partlycloudy_day';
                } else if (cur.data.next_6_hours) {
                    precip = (cur.data.next_6_hours.details.precipitation_amount || 0).toFixed(1);
                    curCode = cur.data.next_6_hours.summary.symbol_code || 'partlycloudy_day';
                }
                const curWmo = getMetInfo(curCode);

                // Группировка по календарным дням для 7-дневного прогноза
                const dayGroups = {};
                ts.forEach(item => {
                    const dStr = item.time.slice(0, 10);
                    if (!dayGroups[dStr]) dayGroups[dStr] = [];
                    dayGroups[dStr].push(item);
                });

                const distinctDates = Object.keys(dayGroups).slice(0, 7);
                const daysList = distinctDates.map(dStr => {
                    const points = dayGroups[dStr];
                    const temps = points.map(p => p.data.instant.details.air_temperature);
                    const high = Math.round(Math.max(...temps));
                    const low = Math.round(Math.min(...temps));

                    let chosen = points.find(p => p.time.includes('T12:00:00Z') || p.time.includes('T11:00:00Z') || p.time.includes('T13:00:00Z')) || points[0];
                    let code = (chosen.data.next_1_hours && chosen.data.next_1_hours.summary.symbol_code) ||
                               (chosen.data.next_6_hours && chosen.data.next_6_hours.summary.symbol_code) ||
                               (chosen.data.next_12_hours && chosen.data.next_12_hours.summary.symbol_code) ||
                               'partlycloudy_day';
                    const wmo = getMetInfo(code);
                    const dateObj = new Date(dStr + 'T12:00:00');
                    return { dateStr: dStr, dateObj, high, low, wmo, symCode: code };
                });

                const now = new Date();
                const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

                cachedWeatherState = {
                    current: { temp, feels, windMs, hum, precip, pressure, wmo: curWmo, code: curCode },
                    daysList,
                    timeStr,
                    timestamp: Date.now(),
                    provider: 'met.no',
                    isOffline: false,
                    isCached: false
                };
                saveWeatherCache(cachedWeatherState);

                updateWeatherDisplay(typeof currentLang !== 'undefined' ? currentLang : 'ru');
            } catch (e) {
                // Попытка получить онлайн-погоду через резервный провайдер Open-Meteo
                try {
                    const openMeteoUrl = 'https://api.open-meteo.com/v1/forecast?latitude=56.6160&longitude=57.7660&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,surface_pressure,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FYekaterinburg';
                    const omCtrl = new AbortController();
                    const omTimer = setTimeout(() => omCtrl.abort(), 10000);
                    let omRes;
                    try {
                        omRes = await fetch(openMeteoUrl, { signal: omCtrl.signal });
                    } finally {
                        clearTimeout(omTimer);
                    }
                    if (omRes.ok) {
                        const omData = await omRes.json();
                        const cur = omData.current;
                        const temp = Math.round(cur.temperature_2m);
                        const feels = Math.round(cur.apparent_temperature);
                        const windMs = (cur.wind_speed_10m / 3.6).toFixed(1);
                        const hum = cur.relative_humidity_2m;
                        const pressure = Math.round(cur.surface_pressure * 0.750062);
                        const precip = (cur.precipitation || 0).toFixed(1);

                        const wmoMap = {
                            0: 'clearsky_day', 1: 'fair_day', 2: 'partlycloudy_day', 3: 'cloudy',
                            45: 'fog', 48: 'fog', 51: 'lightrain', 53: 'rain', 55: 'heavyrain',
                            61: 'lightrain', 63: 'rain', 65: 'heavyrain', 71: 'lightsnow',
                            73: 'snow', 75: 'heavysnow', 80: 'lightrainshowers', 81: 'rainshowers',
                            82: 'heavyrainshowers', 95: 'rainandthunder'
                        };
                        const metCode = wmoMap[cur.weather_code] || 'partlycloudy_day';
                        const curWmo = getMetInfo(metCode);

                        let daysList = [];
                        if (omData.daily && omData.daily.time) {
                            daysList = omData.daily.time.slice(0, 7).map((dStr, idx) => ({
                                dateStr: dStr,
                                dateObj: new Date(dStr + 'T12:00:00'),
                                high: Math.round(omData.daily.temperature_2m_max[idx]),
                                low: Math.round(omData.daily.temperature_2m_min[idx]),
                                wmo: getMetInfo(wmoMap[omData.daily.weather_code[idx]] || 'partlycloudy_day'),
                                symCode: wmoMap[omData.daily.weather_code[idx]] || 'partlycloudy_day'
                            }));
                        } else {
                            daysList = getFallbackDaysList(getNaturalSeason());
                        }

                        const now = new Date();
                        const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

                        cachedWeatherState = {
                            current: { temp, feels, windMs, hum, precip, pressure, wmo: curWmo, code: metCode },
                            daysList,
                            timeStr,
                            timestamp: Date.now(),
                            provider: 'Open-Meteo',
                            isOffline: false,
                            isCached: false
                        };
                        saveWeatherCache(cachedWeatherState);

                        updateWeatherDisplay(typeof currentLang !== 'undefined' ? currentLang : 'ru');
                        return;
                    }
                } catch (omErr) {
                    console.warn('Open-Meteo fallback notice:', omErr);
                }

                console.warn('Используем кэшированную или базовую погоду:', e);

                // Сначала последний успешный прогноз любой из двух страниц; базовый сценарий — только если кэша нет.
                const restoredWeather = restoreWeatherCache();
                if (restoredWeather) {
                    cachedWeatherState = restoredWeather;
                    updateWeatherDisplay(typeof currentLang !== 'undefined' ? currentLang : 'ru');
                    return;
                }

                // Сезонная базовая погода Красноуфимска при отсутствии сети и кэша
                const season = typeof getNaturalSeason === 'function' ? getNaturalSeason() : 'autumn';
                const seasonalData = {
                    winter: { temp: -10, sym: 'snow', wind: '4.2', hum: '82', precip: '1.2', pressure: 755 },
                    spring: { temp: 8, sym: 'partlycloudy', wind: '3.4', hum: '65', precip: '0.0', pressure: 750 },
                    summer: { temp: 22, sym: 'clearsky', wind: '2.5', hum: '55', precip: '0.0', pressure: 748 },
                    autumn: { temp: 6, sym: 'rain', wind: '4.0', hum: '78', precip: '2.1', pressure: 746 }
                }[season] || { temp: 8, sym: 'partlycloudy', wind: '3.0', hum: '65', precip: '0.0', pressure: 750 };

                const now = new Date();
                const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
                const fallbackDays = getFallbackDaysList(season);

                cachedWeatherState = {
                    current: {
                        temp: seasonalData.temp,
                        feels: seasonalData.temp,
                        windMs: seasonalData.wind,
                        hum: seasonalData.hum,
                        precip: seasonalData.precip,
                        pressure: seasonalData.pressure,
                        wmo: getMetInfo(seasonalData.sym),
                        code: seasonalData.sym
                    },
                    daysList: fallbackDays,
                    timeStr,
                    provider: 'baseline',
                    isOffline: true
                };

                updateWeatherDisplay(typeof currentLang !== 'undefined' ? currentLang : 'ru');
            }
        }

        function getNaturalSeason() {
            const m = new Date().getMonth();
            if (m === 11 || m === 0 || m === 1) return 'winter';
            if (m >= 2 && m <= 4) return 'spring';
            if (m >= 5 && m <= 7) return 'summer';
            return 'autumn';
        }


        const seasonInfo = {
            winter: {
                ru: { title: 'СКВОЗЬ ЭПОХИ', heading: 'Заснеженный город на берегу реки Уфы' },
                en: { title: 'THROUGH THE AGES', heading: 'Snowy city on the banks of the Ufa River' },
                metaColor: '#0ea5e9'
            },
            spring: {
                ru: { title: 'СКВОЗЬ ЭПОХИ', heading: 'Цветущий город на живописном берегу реки Уфы' },
                en: { title: 'THROUGH THE AGES', heading: 'Blooming city on the scenic banks of the Ufa River' },
                metaColor: '#10b981'
            },
            summer: {
                ru: { title: 'СКВОЗЬ ЭПОХИ', heading: 'Солнечный город на берегу реки Уфы' },
                en: { title: 'THROUGH THE AGES', heading: 'Sunny city on the banks of the Ufa River' },
                metaColor: '#eab308'
            },
            autumn: {
                ru: { title: 'СКВОЗЬ ЭПОХИ', heading: 'Город на живописном берегу реки Уфы' },
                en: { title: 'THROUGH THE AGES', heading: 'City on the scenic banks of the Ufa River' },
                metaColor: '#d9651a'
            }
        };

        function updateSeasonText(season) {
            const info = seasonInfo[season] || seasonInfo.autumn;
            const heroSeason = document.getElementById('hero-season-title');
            const introHead = document.getElementById('intro-heading');
            const metaTheme = document.getElementById('theme-color-meta');

            if (heroSeason) heroSeason.textContent = info[currentLang].title;
            if (introHead) introHead.textContent = info[currentLang].heading;
            if (metaTheme) metaTheme.setAttribute('content', info.metaColor);
        }

        function setSeasonTheme(season, isAuto = false) {
            const hero = document.getElementById('hero');
            if (hero) {
                hero.classList.remove('season-morphing');
                void hero.offsetWidth;
                hero.classList.add('season-morphing');
                setTimeout(() => { hero.classList.remove('season-morphing'); }, 700);
            }

            document.body.classList.remove('season-winter', 'season-spring', 'season-summer', 'season-autumn');
            document.body.classList.add('season-' + season);

            updateSeasonText(season);

            document.querySelectorAll('.season-btn').forEach(btn => {
                if (isAuto && btn.dataset.season === 'auto') {
                    btn.classList.add('active');
                } else if (!isAuto && btn.dataset.season === season) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            initParticleCanvas(season);
            if (typeof trackSeasonExplored === 'function') {
                trackSeasonExplored(season);
            }
        }

        document.querySelectorAll('.season-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const s = this.dataset.season;
                safeStorageSet('krasnoufimsk_season', s);
                safeStorageSet('kuf_season_theme', s);
                if (s === 'auto') {
                    setSeasonTheme(getNaturalSeason(), true);
                } else {
                    setSeasonTheme(s, false);
                }
            });
        });

        /* ==========================================================================
           ФУНКЦИЯ [6]: ИНТЕРАКТИВНАЯ ВИКТОРИНА (QUIZ)
           ========================================================================== */
        let quizData = [];
        let currentQuizIndex = 0;
        let quizAnswers = {};
        let quizSelected = {};

        function renderQuiz() {
            const quizContainer = document.getElementById('quiz-container');
            if (!quizContainer) return;
            quizContainer.style.display = '';

            if (quizData.length === 0) {
                const isEn = (currentLang === 'en');
                const title = isEn ? 'Choose Difficulty' : 'Выберите уровень сложности';
                const subtitle = isEn
                    ? 'Select your preferred pace and number of historical questions'
                    : 'Выберите подходящий темп и количество вопросов о городе';
                const startLabel = isEn ? 'Start' : 'Начать';

                const easyTitle = isEn ? 'Easy' : 'Лёгкий';
                const easyBadge = isEn ? '10 questions' : '10 вопросов';
                const easyDesc = isEn ? 'Fast & friendly introduction' : 'Для первого знакомства';

                const medTitle = isEn ? 'Medium' : 'Средний';
                const medBadge = isEn ? '15 questions' : '15 вопросов';
                const medDesc = isEn ? 'Test your local knowledge' : 'Проверьте свою эрудицию';

                const hardTitle = isEn ? 'Hard' : 'Сложный';
                const hardBadge = isEn ? '20 questions' : '20 вопросов';
                const hardDesc = isEn ? 'For true Krasnoufimsk experts' : 'Для знатоков истории';

                quizContainer.innerHTML = `
                    <div class="quiz-start-screen">
                        <h3 class="quiz-diff-title">${title}</h3>
                        <p class="quiz-diff-subtitle">${subtitle}</p>
                        <div class="quiz-diff-grid">
                            <button type="button" class="quiz-diff-card quiz-diff-card--easy" onclick="startQuizWithDifficulty('easy')" title="${easyTitle}: ${easyBadge}">
                                <div class="quiz-diff-icon-wrap">
                                    <span class="quiz-diff-icon">🌱</span>
                                </div>
                                <div class="quiz-diff-name">${easyTitle}</div>
                                <div class="quiz-diff-badge">${easyBadge}</div>
                                <div class="quiz-diff-desc">${easyDesc}</div>
                                <div class="quiz-diff-btn-action">${startLabel} →</div>
                            </button>
                            <button type="button" class="quiz-diff-card quiz-diff-card--medium" onclick="startQuizWithDifficulty('medium')" title="${medTitle}: ${medBadge}">
                                <div class="quiz-diff-icon-wrap">
                                    <span class="quiz-diff-icon">🧭</span>
                                </div>
                                <div class="quiz-diff-name">${medTitle}</div>
                                <div class="quiz-diff-badge">${medBadge}</div>
                                <div class="quiz-diff-desc">${medDesc}</div>
                                <div class="quiz-diff-btn-action">${startLabel} →</div>
                            </button>
                            <button type="button" class="quiz-diff-card quiz-diff-card--hard" onclick="startQuizWithDifficulty('hard')" title="${hardTitle}: ${hardBadge}">
                                <div class="quiz-diff-icon-wrap">
                                    <span class="quiz-diff-icon">🏆</span>
                                </div>
                                <div class="quiz-diff-name">${hardTitle}</div>
                                <div class="quiz-diff-badge">${hardBadge}</div>
                                <div class="quiz-diff-desc">${hardDesc}</div>
                                <div class="quiz-diff-btn-action">${startLabel} →</div>
                            </button>
                        </div>
                    </div>
                `;
                const banner = document.getElementById('quiz-results');
                if (banner) banner.style.display = 'none';
                return;
            }

            quizAnswers = {};
            quizSelected = {};
            currentQuizIndex = 0;

            renderQuizQuestion();
            const banner = document.getElementById('quiz-results');
            if (banner) banner.style.display = 'none';
        }

        window.startQuizWithDifficulty = function (diff) {
            window.currentQuizDifficulty = diff;
            const pool = quizDataMaster.filter(q => q.difficulty === diff);
            const limit = diff === 'easy' ? 10 : (diff === 'medium' ? 15 : 20); // medium: 15 questions per run
            const poolCopy = pool.slice();
            for (let i = poolCopy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [poolCopy[i], poolCopy[j]] = [poolCopy[j], poolCopy[i]];
            }
            quizData = poolCopy.slice(0, limit);

            // Надежно перемешиваем варианты ответов (Fisher-Yates)
            quizData.forEach(q => {
                // Создаем глубокую копию опций, чтобы не портить оригинал при рестартах
                const optionsCopy = JSON.parse(JSON.stringify(q.options));
                for (let i = optionsCopy.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
                }
                q.shuffledOptions = optionsCopy;
            });

            renderQuiz();
        };

        window.restartQuiz = function () {
            quizData = [];
            currentQuizIndex = 0;
            quizAnswers = {};
            quizSelected = {};
            window.currentQuizDifficulty = null;
            const banner = document.getElementById('quiz-results');
            if (banner) banner.style.display = 'none';
            renderQuiz();
        };

        function renderQuizQuestion() {
            const quizContainer = document.getElementById('quiz-container');
            if (!quizContainer) return;

            const total = quizData.length;
            const idx = currentQuizIndex;
            const qItem = quizData[idx];
            const qNum = idx + 1;
            const dict = i18n[currentLang] || i18n.ru;
            const answered = quizAnswers[qNum] !== undefined;
            const isLast = (idx === total - 1);
            const answeredCount = Object.keys(quizAnswers).length;

            const progressPct = Math.round((answeredCount / total) * 100);

            quizContainer.innerHTML = `
                <div class="quiz-progress-header">
                    <div class="quiz-counter-pill">
                        <span>🧭</span>
                        <span>${dict.quizCounterLabel || 'Вопрос'} <strong>${qNum}</strong> ${dict.quizCounterOf || 'из'} ${total}</span>
                    </div>
                    <div class="quiz-percent-pill" id="quiz-percent-text">${progressPct}%</div>
                </div>
                <div class="quiz-progress-bar-wrap">
                    <div class="quiz-progress-bar" style="width: ${progressPct}%">
                        <div class="quiz-progress-bar-glow"></div>
                    </div>
                </div>
                <div class="question-box" data-q="${qNum}" ${answered ? 'data-answered="true"' : ''}>
                    <div class="question-title">
                        <span class="question-num">${qNum}</span>
                        <span>${qItem.q[currentLang]}</span>
                    </div>
                    <div class="options-list">
                        ${(qItem.shuffledOptions || qItem.options).map((opt, optIdx) => `
                            <button type="button" class="option-btn ${answered && opt.correct ? 'correct' : ''} ${answered && quizSelected[qNum] === optIdx && !opt.correct ? 'wrong' : ''}" 
                                    onclick="checkAnswer(this, ${optIdx}, ${qNum})" 
                                    ${answered ? 'disabled' : ''}>
                                ${opt.t[currentLang]}
                            </button>
                        `).join('')}
                    </div>
                    <div class="question-feedback" id="feedback-${qNum}" style="${answered ? 'display: block;' : ''}">
                        ${answered && qItem.explainer ? `
                            <div class="quiz-explainer-box">
                                <strong>${dict.quizExplainerTitle || '💡 Интересный факт:'}</strong>
                                <div>${qItem.explainer[currentLang]}</div>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="quiz-nav-btns">
                    <button type="button" class="quiz-nav-btn quiz-nav-prev" onclick="quizStep(-1)" ${idx === 0 ? 'disabled' : ''}>
                        ${dict.quizPrev || '← Назад'}
                    </button>
                    <span class="quiz-nav-dots">
                        ${quizData.map((_, i) => `<span class="quiz-dot ${i === idx ? 'active' : ''} ${quizAnswers[i + 1] !== undefined ? (quizAnswers[i + 1] ? 'answered-correct' : 'answered-wrong') : ''}"></span>`).join('')}
                    </span>
                    ${isLast ? `
                        <button type="button" class="quiz-nav-btn quiz-nav-finish" onclick="finishQuiz()">
                            ${dict.quizFinish || '🏆 Показать результат'}
                        </button>
                    ` : `
                        <button type="button" class="quiz-nav-btn quiz-nav-next" onclick="quizStep(1)">
                            ${dict.quizNext || 'Далее →'}
                        </button>
                    `}
                </div>
            `;
        }

        function quizStep(dir) {
            const newIdx = currentQuizIndex + dir;
            if (newIdx < 0 || newIdx >= quizData.length) return;
            currentQuizIndex = newIdx;
            renderQuizQuestion();
        }

        function checkAnswer(btn, optIndex, qNum) {
            const parent = btn.closest('.question-box');
            if (!parent || parent.dataset.answered) return;
            const qItemForAnswer = quizData[qNum - 1];
            const optsForAnswer = qItemForAnswer.shuffledOptions || qItemForAnswer.options;
            const isCorrect = !!(optsForAnswer[optIndex] && optsForAnswer[optIndex].correct);
            parent.dataset.answered = 'true';
            quizAnswers[qNum] = isCorrect;
            quizSelected[qNum] = optIndex;

            parent.querySelectorAll('.option-btn').forEach(b => {
                b.disabled = true;
                b.classList.add('disabled');
            });

            // Выделяем правильный ответ
            const qItem = quizData[qNum - 1];
            const currentOpts = qItem.shuffledOptions || qItem.options;
            parent.querySelectorAll('.option-btn').forEach((b, i) => {
                if (currentOpts[i].correct) b.classList.add('correct');
            });
            if (!isCorrect) btn.classList.add('wrong');

            const feedback = parent.querySelector('.question-feedback');
            // qItem already defined above
            const dict = i18n[currentLang] || i18n.ru;

            const explainerHtml = (qItem && qItem.explainer) ? `
                <div class="quiz-explainer-box">
                    <strong>${dict.quizExplainerTitle || '💡 Интересный факт:'}</strong>
                    <div>${qItem.explainer[currentLang]}</div>
                </div>
            ` : '';

            if (feedback) {
                feedback.style.display = 'block';
                feedback.innerHTML = `
                    <div class="${isCorrect ? 'feedback-correct' : 'feedback-wrong'}">
                        ${isCorrect ? (dict.quizCorrect || '✅ Верно!') : (dict.quizWrong || '❌ Неверно!')}
                    </div>
                    ${explainerHtml}
                `;
            }

            // Обновляем точки прогресса
            const dotsSpan = document.querySelector('.quiz-nav-dots');
            if (dotsSpan) {
                dotsSpan.innerHTML = quizData.map((_, i) => `<span class="quiz-dot ${i === currentQuizIndex ? 'active' : ''} ${quizAnswers[i + 1] !== undefined ? (quizAnswers[i + 1] ? 'answered-correct' : 'answered-wrong') : ''}"></span>`).join('');
            }

            // Прогресс-бар и процент
            const answeredCount = Object.keys(quizAnswers).length;
            const pct = Math.round((answeredCount / quizData.length) * 100);
            const bar = document.querySelector('.quiz-progress-bar');
            if (bar) bar.style.width = pct + '%';
            const pctText = document.getElementById('quiz-percent-text');
            if (pctText) pctText.textContent = pct + '%';
        }

        function finishQuiz() {
            const total = quizData.length;
            const answered = Object.keys(quizAnswers).length;
            if (answered < total) {
                const left = total - answered;
                const msg = currentLang === 'en'
                    ? `You still have ${left} unanswered question(s). Finish now? Unanswered questions will count as wrong.`
                    : `У вас осталось неотвеченных вопросов: ${left}. Завершить сейчас? Они будут засчитаны как неверные.`;
                if (!confirm(msg)) return;
            }
            const correct = Object.values(quizAnswers).filter(v => v === true).length;
            const dict = i18n[currentLang] || i18n.ru;

            const banner = document.getElementById('quiz-results');
            const scoreText = document.getElementById('quiz-score-text');
            const descText = document.getElementById('quiz-desc-text');
            const diffBadge = document.getElementById('quiz-results-diff-badge');

            // Определение и отображение уровня сложности
            const diff = window.currentQuizDifficulty || (total <= 10 ? 'easy' : (total <= 15 ? 'medium' : 'hard'));
            window.currentQuizDifficulty = diff;

            if (diffBadge) {
                let badgeText = '';
                if (currentLang === 'en') {
                    if (diff === 'easy') badgeText = `🌱 Basic Level • ${total} questions`;
                    else if (diff === 'medium') badgeText = `⚡ Advanced Level • ${total} questions`;
                    else badgeText = `🏆 Expert Level • ${total} questions`;
                } else {
                    if (diff === 'easy') badgeText = `🌱 Базовый уровень • ${total} вопросов`;
                    else if (diff === 'medium') badgeText = `⚡ Продвинутый уровень • ${total} вопросов`;
                    else badgeText = `🏆 Экспертный уровень • ${total} вопросов`;
                }
                diffBadge.textContent = badgeText;
                diffBadge.className = `quiz-diff-tag quiz-diff-tag--${diff}`;
            }

            if (scoreText) scoreText.textContent = `${dict.quizScore || 'Правильных ответов:'} ${correct} ${dict.quizOutOf || 'из'} ${total}`;

            let desc = '';
            const pct = total > 0 ? (correct / total) : 0;
            window.lastQuizScore = correct;
            window.lastQuizTotal = total;
            window.lastQuizPercent = Math.round(pct * 100);

            if (pct >= 0.9) desc = dict.quizResult5 || '🏆 Отлично! Вы настоящий знаток истории Красноуфимска!';
            else if (pct >= 0.7) desc = dict.quizResult4 || '👍 Хорошо! Вы хорошо знаете историю города.';
            else if (pct >= 0.5) desc = dict.quizResult3 || '📖 Неплохо! Почитайте о достопримечательностях подробнее.';
            else desc = dict.quizResult2 || '🔍 Стоит изучить историю города! Пройдите ленту времени.';

            if (descText) descText.textContent = desc;

            // Динамическая смена иконки триумфа
            const trophyElem = banner ? banner.querySelector('.trophy-icon') : null;
            if (trophyElem) {
                if (pct >= 0.95) trophyElem.textContent = '🏆';
                else if (pct >= 0.8) trophyElem.textContent = '🥇';
                else if (pct >= 0.7) trophyElem.textContent = '🥈';
                else trophyElem.textContent = '📜';
            }

            const nameInp = document.getElementById('cert-name-input');
            if (nameInp) {
                nameInp.placeholder = (currentLang === 'en') ? 'Enter your name and surname' : 'Введите ваше имя и фамилию';
                if (!nameInp.value && typeof passportState !== 'undefined' && passportState.name && passportState.name !== 'Исследователь' && passportState.name !== 'Explorer') {
                    nameInp.value = passportState.name;
                }
            }

            window.lastQuizDesc = desc;

            // Показываем блок именного диплома при результате от 70%
            const certBox = document.getElementById('cert-box');
            if (certBox) {
                if (pct >= 0.7) {
                    certBox.style.display = 'block';
                    if (typeof launchConfetti === 'function') {
                        launchConfetti({ count: 110 });
                    }
                } else {
                    certBox.style.display = 'none';
                }
            }

            // Достижение «Абсолютный эрудит» (идеальный результат: все вопросы решены верно, минимум 10)
            if (correct === total && total >= 10 && typeof unlockAchievement === 'function') {
                unlockAchievement('quiz_erudite');
            }

            const quizContainerEl = document.getElementById('quiz-container');
            if (quizContainerEl) quizContainerEl.style.display = 'none';

            if (banner) {
                banner.style.display = 'block';
                banner.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
            }
        }

        /* ==========================================================================
           ФУНКЦИЯ [6.1]: РАСКРЫТИЕ / СВОРАЧИВАНИЕ ВИКТОРИНЫ ПО КНОПКЕ
           Открывает викторину по клику пользователя, сохраняя страницу аккуратной.
           ========================================================================== */
        function toggleQuiz() {
            const quizBody = document.getElementById('quiz-body');
            const toggleBtn = document.getElementById('btn-toggle-quiz');
            const toggleText = document.getElementById('quiz-toggle-text');
            if (!quizBody || !toggleBtn) return;

            const isHidden = quizBody.style.display === 'none' || getComputedStyle(quizBody).display === 'none';
            const dict = i18n[currentLang] || i18n.ru;

            if (isHidden) {
                quizBody.style.display = 'block';
                toggleBtn.classList.add('expanded');
                if (toggleText) toggleText.textContent = dict.btnCollapseQuiz;
                quizBody.scrollIntoView({ behavior: getScrollBehavior(), block: 'nearest' });
            } else {
                quizBody.style.display = 'none';
                toggleBtn.classList.remove('expanded');
                if (toggleText) toggleText.textContent = dict.btnStartQuiz;
            }
        }

        /* ==========================================================================
           ФУНКЦИЯ [7]: АНИМИРОВАННЫЕ СЕЗОННЫЕ ЧАСТИЦЫ НА ХОЛСТЕ (CANVAS)
           ========================================================================== */
        let particleAnimId = null;

        function initParticleCanvas(season) {
            const canvas = document.getElementById('particle-canvas');
            if (!canvas) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { canvas.style.display = 'none'; return; }
            canvas.style.display = '';
            const ctx = canvas.getContext('2d');

            if (particleAnimId) cancelAnimationFrame(particleAnimId);

            function resize() {
                const hero = document.getElementById('hero');
                canvas.width = hero ? hero.clientWidth : window.innerWidth;
                canvas.height = hero ? hero.clientHeight : window.innerHeight;
            }
            resize();
            if (window.__particleResizeHandler) window.removeEventListener('resize', window.__particleResizeHandler);
            window.__particleResizeHandler = resize;
            window.addEventListener('resize', resize);

            const count = window.innerWidth < 768 ? 20 : 50;
            const particles = [];

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 3 + 1.5,
                    speedY: Math.random() * 1.2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.8,
                    opacity: Math.random() * 0.6 + 0.2,
                    rotation: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.03
                });
            }

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach(p => {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);

                    if (season === 'winter') {
                        ctx.fillStyle = `rgba(224, 242, 254, ${p.opacity})`;
                        ctx.beginPath();
                        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (season === 'autumn') {
                        ctx.fillStyle = `rgba(251, 146, 60, ${p.opacity})`;
                        ctx.beginPath();
                        ctx.ellipse(0, 0, p.radius * 2.5, p.radius * 1.2, 0, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (season === 'spring') {
                        ctx.fillStyle = `rgba(187, 247, 208, ${p.opacity})`;
                        ctx.beginPath();
                        ctx.ellipse(0, 0, p.radius * 2, p.radius, Math.PI / 4, 0, Math.PI * 2);
                        ctx.fill();
                    } else {
                        ctx.fillStyle = `rgba(153, 246, 228, ${p.opacity})`;
                        ctx.beginPath();
                        ctx.arc(0, 0, p.radius * 1.3, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    ctx.restore();

                    p.y += p.speedY;
                    p.x += p.speedX;
                    p.rotation += p.rotSpeed;

                    if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
                    if (p.x > canvas.width) p.x = 0;
                    if (p.x < 0) p.x = canvas.width;
                });

                particleAnimId = requestAnimationFrame(draw);
            }

            draw();
        }

        // При скрытии вкладки приостанавливаем анимацию для экономии батареи и ресурсов процессора
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (particleAnimId) {
                    cancelAnimationFrame(particleAnimId);
                    particleAnimId = null;
                }
            } else {
                if (!particleAnimId && typeof initParticleCanvas === 'function') {
                    let currentSeason = 'autumn';
                    if (document.body.classList.contains('season-winter')) currentSeason = 'winter';
                    if (document.body.classList.contains('season-spring')) currentSeason = 'spring';
                    if (document.body.classList.contains('season-summer')) currentSeason = 'summer';
                    initParticleCanvas(currentSeason);
                }
            }
        });

        /* ==========================================================================
           ФУНКЦИЯ [8]: ИНДИКАТОР СКРОЛЛА И КНОПКА "НАВЕРХ"
           ========================================================================== */
        const progressBar = document.getElementById('reading-progress');
        const backToTopBtn = document.getElementById('btn-back-to-top');

        let scrollRafId = null;
        window.addEventListener('scroll', function () {
            if (scrollRafId) return;
            scrollRafId = requestAnimationFrame(() => {
                const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
                if (progressBar) progressBar.style.width = scrolled + '%';

                if (backToTopBtn) {
                    if (winScroll > 400) {
                        backToTopBtn.classList.add('show');
                    } else {
                        backToTopBtn.classList.remove('show');
                    }
                }
                scrollRafId = null;
            });
        }, { passive: true });

        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: getScrollBehavior() });
            });
        }

        /* ==========================================================================
           ФУНКЦИЯ [9]: ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ (SCROLL REVEAL)
           Использует современный IntersectionObserver API для плавного и
           эффектного появления секций и карточек сайта по мере чтения страницы.
           ========================================================================== */
        function initScrollReveal() {
            // Выбираем карточки, секционные заголовки, блоки и элементы для живого плавного появления
            const selectors = [
                '.reveal-on-scroll',
                '.section-header',
                '.event-card',
                '.sight-showcase-card',
                '.route-card',
                '.guide-item',
                '.intro-card',
                '.planner-cta-card',
                '.quiz-card'
            ];
            const allElements = document.querySelectorAll(selectors.join(', '));

            if (!('IntersectionObserver' in window)) {
                allElements.forEach(el => el.classList.add('is-visible'));
                return;
            }

            // Навешиваем базовый класс анимации, если его ещё нет
            allElements.forEach(el => {
                if (!el.classList.contains('reveal-on-scroll')) {
                    el.classList.add('reveal-on-scroll');
                }
            });

            const isMobile = window.innerWidth <= 768;
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, {
                threshold: isMobile ? 0.05 : 0.08,
                rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -55px 0px'
            });

            allElements.forEach(el => {
                // Если элемент находится в верхних 65% экрана при первой загрузке — проявляем его
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.65 && rect.bottom > 0) {
                    el.classList.add('is-visible');
                } else {
                    observer.observe(el);
                }
            });
        }

        /* ==========================================================================
           ТОЧКА ВХОДА ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
           ========================================================================== */

        // =========================================================================
        // УНИВЕРСАЛЬНАЯ КАРТОГРАФИЯ (ЯНДЕКС.КАРТЫ)
        // =========================================================================
        function getMapLocationUrl(lat, lon, queryRu, queryEn, directUrl) {
            // 1. Прямая ссылка на подтверждённую карточку организации в Яндекс.Картах
            if (directUrl && typeof directUrl === 'string' && directUrl.startsWith('https://')) {
                return directUrl;
            }
            
            const hasCoords = lat && lon && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lon));

            // 2. Самый надёжный и безотказный режим Яндекс.Карт — точная координатная метка whatshere[point]
            // В этом режиме Яндекс гарантированно ставит маркер ровно на нужное здание/памятник,
            // определяет реальный адрес, открывает панорамы и предлагает построить маршрут.
            // Ошибки "Ничего не найдено" в этом режиме не бывает в принципе!
            if (hasCoords) {
                const cLon = parseFloat(lon).toFixed(6);
                const cLat = parseFloat(lat).toFixed(6);
                return `https://yandex.ru/maps/?whatshere[point]=${cLon},${cLat}&whatshere[zoom]=17`;
            }

            // 3. Если координаты отсутствуют — чистый адресный запрос
            const query = (queryRu || queryEn || '').trim();
            if (query !== '') {
                return `https://yandex.ru/maps/?text=${encodeURIComponent(query)}`;
            }

            // 4. По умолчанию — центр Красноуфимска
            return 'https://yandex.ru/maps/20691/krasnoufimsk/?ll=57.767,56.617&z=14';
        }

        function openMapLocation(lat, lon, queryRu, queryEn, directUrl) {
            const url = getMapLocationUrl(lat, lon, queryRu, queryEn, directUrl);
            window.open(url, '_blank', 'noopener,noreferrer');
        }

        // Вспомогательная функция открытия карты для ленты времени (открывает точный адрес / карточку места)
        function openTimelineEventMap(index) {
            const ev = eventsData[index];
            if (!ev) return;
            const queryRu = ev.mapQuery || (ev.address ? `Красноуфимск, ${ev.address.ru}` : '');
            const queryEn = (ev.mapTitle && ev.mapTitle.en) ? (ev.mapTitle.en + ', Krasnoufimsk') : '';
            openMapLocation(ev.lat, ev.lon, queryRu, queryEn, ev.directUrl || '');
        }

        // Вспомогательная функция открытия карты для витрины достопримечательностей
        function openSightMap(index) {
            const sight = sightsData[index];
            if (!sight) return;
            const queryRu = sight.queryRu || (sight.address ? `Красноуфимск, ${sight.address.ru}` : '');
            const queryEn = sight.queryEn || (sight.address ? `Krasnoufimsk, ${sight.address.en}` : '');
            openMapLocation(sight.lat, sight.lon, queryRu, queryEn, sight.directUrl || '');
        }



        // =========================================================================
        // =========================================================================
        // ДАННЫЕ 27 ОБЪЕКТОВ НАСЛЕДИЯ КРАСНОУФИМСКА
        // =========================================================================
        const sightsData = [
            // ── 1. АРХИТЕКТУРА ─────────────────────────────────────────────────
            {
                id: 'kazachya-izba', hasMapMark: true, cat: 'architecture', icon: '🏡',
                directUrl: 'https://yandex.ru/maps/org/pervaya_kazachya_izba/238640534796/', year: 'XVIII в.',
                lat: '56.630944', lon: '57.771604',
                style: { ru: 'Русское бревенчатое зодчество XVIII в.', en: '18th-century Russian timber log architecture' },
                siteLabel: { ru: 'Мемориальная доска', en: 'Memorial plaque' },
                registryId: '661710757830005',
                legalStatus: { ru: 'ОКН регионального значения; реестровый № 661710757830005 в открытом списке наследия — актуальность и границы проверяйте в ЕГРОКН', en: 'Regional cultural heritage site; registry no. 661710757830005 in the open heritage list — verify current details and boundaries in the state register' },
                title: { ru: 'Казачья изба: колыбель крепости', en: 'Cossack Log Hut: Cradle of the Fortress' },
                desc: { ru: 'Подлинный памятник деревянного зодчества эпохи основания города. На фасаде — официальная мемориальная доска «Первая казачья изба XVIII век». Сруб из уральской лиственницы (брёвна диаметром 35–40 см, рубка «в обло») — по местному преданию, без единого гвоздя. Её считают одной из старейших сохранившихся построек города.', en: 'An authentic log architecture monument from the fortress era. A historic plaque reads "First Cossack Hut of the 18th Century". Built from Ural larch (logs 35–40 cm thick, notched joints) — by local tradition, without a single nail. It is regarded as one of the oldest surviving buildings in town.' },
                fact: { ru: 'На фасаде сохранена историческая табличка с QR-кодом, где изба названа первой казачьей избой Красноуфимска.', en: 'A historic QR plaque on the façade calls it Krasnoufimsk’s first Cossack hut.' },
                address: { ru: 'ул. Р. Горбуновой, д. 35 (Первая казачья изба)', en: '35 Rimmy Gorbunovoy St. (First Cossack Hut)' },
                queryRu: 'Красноуфимск ул Риммы Горбуновой 35 казачья изба', queryEn: 'Krasnoufimsk 35 Rimmy Gorbunovoy St Cossack hut'
            },
            {
                id: 'vokzal', lat: '56.598259', lon: '57.757853', hasMapMark: true, cat: 'engineering', icon: '🚂', year: '1915 г.',
                directUrl: 'https://yandex.ru/maps/org/zdaniye_zheleznodorozhnogo_vokzala_po_planu_arkhitektora_shchuseva_a_v/166739323389/',
                style: { ru: 'Петровское барокко', en: 'Petrine Baroque' },
                siteLabel: { ru: 'Архитектурная доминанта станции', en: 'Architectural landmark of the station' },
                registryId: '661710757820005',
                legalStatus: { ru: 'ОКН регионального значения; реестровый № 661710757820005 в открытом списке наследия — актуальность и границы проверяйте в ЕГРОКН', en: 'Regional cultural heritage site; registry no. 661710757820005 in the open heritage list — verify current details and boundaries in the state register' },
                title: { ru: 'Вокзал Красноуфимска (мастерская А. В. Щусева)', en: 'Krasnoufimsk Station (Shchusev Workshop)' },
                desc: { ru: 'Памятник архитектуры начала XX века, возведённый по проекту архитектурной мастерской академика А. В. Щусева — создателя Казанского вокзала в Москве. Построен в 1915 году для Казанбургской магистрали. Торжественные барочные фронтоны, арочные окна, высокие своды. Неподалёку, у локомотивного депо (ул. Угольная / Сухобского), установлен исторический паровоз-памятник «Лебедянка» (Л-1699).', en: 'An architectural landmark of the early 20th century designed by the workshop of academician Alexey Shchusev, built in 1915 for the Kazan–Yekaterinburg railway. Features Petrine Baroque pediments, grand arched windows, and nearby at the locomotive depot (Ugolnaya/Sukhobskogo St.), an authentic L-1699 steam locomotive monument.' },
                fact: { ru: 'Мастерская Щусева разрабатывала ансамбль станций Казанбургской дороги, и Красноуфимский вокзал стал одним из красивейших на Урале. Первый паровоз пришёл в 1916 году, а станция открыта для движения в 1919-м. Сегодня станция относится к Горьковской железной дороге (Ижевское отделение) и стоит на казанском ходу Транссиба, км 1432.', en: 'Shchusev’s workshop designed station ensembles for the Kazanburg line, making Krasnoufimsk station a crown jewel of Ural architecture. The first locomotive arrived in 1916 and the station opened to traffic in 1919. Today it belongs to the Gorky Railway (Izhevsk division) on the Kazan route of the Trans-Siberian, km 1432.' },
                address: { ru: 'ул. Станционная, 11', en: '11 Stantsionnaya St.' },
                queryRu: 'Здание железнодорожного вокзала, по плану архитектора Щусева А. В, Красноуфимск', queryEn: 'Krasnoufimsk railway station Stantsionnaya 11'
            },
            {
                id: 'museum', hasMapMark: true, cat: 'architecture', icon: '🏛️', year: '1912 г.',
                directUrl: 'https://yandex.ru/maps/org/krasnoufimskiy_krayevedcheskiy_muzey/1023339938/',
                lat: '56.614400', lon: '57.764590',
                style: { ru: 'Советский модернизм (здание Дома быта «Урал»)', en: 'Soviet modernism (former Ural service building)' },
                siteLabel: { ru: 'Главный музей города • Музейный фонд РФ', en: 'Primary City Museum • State Museum Registry' },
                title: { ru: 'Краеведческий музей (ул. Советская, 42)', en: 'Museum of Local Lore (42 Sovetskaya St.)' },
                desc: { ru: 'Музей основан земством в 1912 году; с 1998 года располагается в трёхэтажном кирпичном здании бывшего Дома быта «Урал». Хранит богатейшую палеонтологическую и историческую коллекцию: череп шерстистого носорога, бивни мамонта и пять подлинных зубных спиралей акулы-геликоприона возрастом около 290 млн лет (типовая коллекция А. Г. Бессонова № 1865 хранится в ЦНИГР им. Ф. Н. Чернышёва в Санкт-Петербурге).', en: 'Founded by the Zemstvo in 1912; since 1998 housed in the former Ural service building. Preserves rich paleontological and historic collections: woolly rhino skull, mammoth tusks, and five authentic Helicoprion shark tooth whorls about 290 million years old (the type collection No. 1865 is kept at the Chernyshev Central Geological Research Museum in St Petersburg).' },
                fact: { ru: 'Зубные спирали геликоприона, переданные А. Г. Бессоновым А. П. Карпинскому в 1898 году, стали мировой научной сенсацией.', en: 'The Helicoprion tooth whorls passed by A. G. Bessonov to A. P. Karpinsky in 1898 became a worldwide scientific sensation.' },
                address: { ru: 'ул. Советская, д. 42', en: '42 Sovetskaya St.' },
                queryRu: 'Красноуфимский краеведческий музей Советская 42', queryEn: 'Krasnoufimsk Museum Sovetskaya 42'
            },
            {
                id: 'uchilische', lat: '56.621708', lon: '57.769677', hasMapMark: true, cat: 'architecture', icon: '🎓', year: '1875 г.',
                directUrl: 'https://yandex.ru/maps/org/zdaniye_byvshego_krasnoufimskogo_promyshlennogo_uchilishcha_gde_rabotali_agronomy_n_a_sokovnin_n_l_skalozubov_v_n_vargin/60652112866/',
                style: { ru: 'Кирпичная эклектика', en: 'Brick Eclectic style' },
                siteLabel: { ru: 'Историческое учебное здание', en: 'Historic school building' },
                registryId: '661710757840005',
                legalStatus: { ru: 'ОКН регионального значения; реестровый № 661710757840005 в открытом списке наследия — актуальность и границы проверяйте в ЕГРОКН', en: 'Regional cultural heritage site; registry no. 661710757840005 in the open heritage list — verify current details and boundaries in the state register' },
                title: { ru: 'Бывшее реальное (промышленное) училище', en: 'Former Real (Industrial) School' },
                desc: { ru: 'Официально открыто земством 12 августа 1875 года как шестиклассное реальное училище с горнозаводским и сельскохозяйственным отделениями — одно из первых средних сельскохозяйственных учебных заведений Урала. 27 августа 1889 года первым в России преобразовано в Красноуфимское промышленное училище (директор Н. А. Соковнин). С 1893 по 1899 год здесь учился будущий Маршал Советского Союза Б. М. Шапошников. Краеведческий музей перечисляет установленные на здании доски о дате основания училища, П. А. Кашпурове и Б. М. Шапошникове, а также об эвакогоспитале и явочной квартире РСДРП(б).', en: 'Officially opened by the zemstvo on 12 August 1875 as a six-grade Real School with mining and agricultural departments — one of the first secondary agricultural schools of the Urals. On 27 August 1889 it became the first in Russia to be reorganized into an industrial school (principal N. A. Sokovnin). Future Marshal of the Soviet Union B. M. Shaposhnikov studied here from 1893 to 1899. The local museum lists plaques on the building to the school\'s founding date, P. A. Kashpurov and B. M. Shaposhnikov, as well as plaques about an evacuation hospital and an RSDLP(b) safe house.' },
                fact: { ru: 'Современная организация аграрного колледжа имеет адрес ул. Пролетарская, 62, но исторический корпус училища находится на ул. Ленина, 79 — при построении маршрута нужен именно этот адрес.', en: 'The modern Agrarian College organisation is addressed at 62 Proletarskaya St., but the historic school building is at 79 Lenina St.—use that address for directions.' },
                address: { ru: 'ул. Ленина, д. 79', en: '79 Lenina St.' },
                queryRu: 'Здание бывшего красноуфимского промышленного училища, где работали агрономы Н.А. Соковнин, Н.Л. Скалозубов, В.Н. Варгин, Красноуфимск', queryEn: 'Krasnoufimsk 79 Lenina former industrial school'
            },
            {
                id: 'museum-old', hasMapMark: true, cat: 'architecture', icon: '🏠', year: 'XIX в.',
                lat: '56.615363', lon: '57.772474',
                style: { ru: 'Купеческая кирпичная эклектика', en: 'Merchant Brick Eclectic style' },
                siteLabel: { ru: 'Памятник купеческого зодчества', en: 'Merchant Architectural Monument' },
                registryId: '661710757950005',
                legalStatus: { ru: 'ОКН регионального значения; реестровый № 661710757950005 в открытом списке наследия — актуальность и границы проверяйте в ЕГРОКН', en: 'Regional cultural heritage site; registry no. 661710757950005 in the open heritage list — verify current details and boundaries in the state register' },
                title: { ru: 'Доходный дом К.А. Шевелина', en: 'K.A. Shevelin Revenue House' },
                desc: { ru: 'Двухэтажный кирпичный доходный дом К. А. Шевелина на ул. Рогозинниковых, 35 — образец жилой и коммерческой застройки уездного Красноуфимска конца XIX века.', en: 'The two-storey brick revenue house of K. A. Shevelin at 35 Rogozinnikovykh St. is an example of late-19th-century residential and commercial building in district-town Krasnoufimsk.' },
                fact: { ru: 'На месте ориентируйтесь на адрес ул. Рогозинниковых, 35: в открытых источниках здание называют именно доходным домом К. А. Шевелина.', en: 'Use 35 Rogozinnikovykh St. for directions: open sources identify the building specifically as K. A. Shevelin\'s revenue house.' },
                address: { ru: 'ул. Рогозинниковых, 35', en: '35 Rogozinnikovykh St.' },
                directUrl: 'https://yandex.ru/maps/org/dokhodny_dom_k_a_shevelina/4323362804/',
                queryRu: 'Красноуфимск Рогозинниковых 35', queryEn: 'Krasnoufimsk Rogozinnikovykh 35'
            },
            {
                id: 'sobor', hasMapMark: true, cat: 'architecture', icon: '⛪', year: '1804 г.',
                directUrl: 'https://yandex.ru/maps/org/sobor_troitsy_zhivonachalnoy_v_krasnoufimske/1031307372/',
                lat: '56.621297', lon: '57.773395',
                style: { ru: 'Переходный от барокко к классицизму', en: 'Transitional Baroque-to-Classicism' },
                siteLabel: { ru: 'Действующий собор', en: 'Active cathedral' },
                legalStatus: { ru: 'Историческое культовое здание; актуальные охранные реквизиты уточняйте в ЕГРОКН', en: 'Historic religious building; verify current protection details in the state register' },
                title: { ru: 'Свято-Троицкий собор', en: 'Holy Trinity Cathedral' },
                desc: { ru: 'Главная архитектурная доминанта исторического центра Красноуфимска. Величественный собор с высокой ярусной колокольней типа «восьмерик на четверике» — памятник переходного от барокко к классицизму стиля. Каменный собор построен к 1804 году: Никольский престол освящён в 1804 году, а главный Троицкий — в 1837 году. Сегодня это действующий православный храм.', en: 'The premier spiritual landmark of Krasnoufimsk. A magnificent cathedral of the transitional Baroque-to-Classicism style with a soaring tiered bell tower (octagon-on-cube), built by 1804; the St Nicholas altar was consecrated in 1804 and the main Holy Trinity altar in 1837. Today it is an active Orthodox church.' },
                fact: { ru: 'В советские годы храм был закрыт и использовался как склад и цех; приход вновь зарегистрирован в 2001 году.', en: 'Closed in the Soviet years and used as a warehouse and workshop, the parish was re-registered in 2001.' },
                address: { ru: 'ул. Куйбышева, д. 5', en: '5 Kuybysheva St.' },
                queryRu: 'Свято-Троицкий собор Красноуфимск Куйбышева 5', queryEn: 'Krasnoufimsk Holy Trinity Cathedral Kuybysheva 5'
            },
            {
                id: 'alexnevsky', hasMapMark: true, cat: 'architecture', icon: '⛪', year: '1903–1914 гг.',
                directUrl: 'https://yandex.ru/maps/org/khram_aleksandra_nevskogo/1282276725/',
                lat: '56.616235', lon: '57.772993',
                style: { ru: 'Русский стиль', en: 'Russian style' },
                siteLabel: { ru: 'Памятник архитектуры', en: 'Architectural Monument' },
                registryId: '661710757920005',
                legalStatus: { ru: 'ОКН регионального значения; реестровый № 661710757920005 в открытом списке наследия — актуальность и границы проверяйте в ЕГРОКН', en: 'Regional cultural heritage site; registry no. 661710757920005 in the open heritage list — verify current details and boundaries in the state register' },
                title: { ru: 'Церковь святого Александра Невского', en: 'St. Alexander Nevsky Church' },
                desc: { ru: 'Заложена в 1903 году по проекту архитектора Д. П. Рябова, выполненному безвозмездно, в память об императоре Александре II (решение думы — от 12 марта 1881 года), подрядчик Ф. Н. Мальков; освящена в 1914 году. Закрыта 6 января 1930 года; в советские годы здание спасло от сноса размещение краеведческого музея. Повторно освящена 8 сентября 1999 года архиепископом Викентием.', en: 'Laid in 1903 to the design of architect D. P. Ryabov, who worked free of charge, in memory of Emperor Alexander II (city duma decision of 12 March 1881), contractor F. N. Malkov; consecrated in 1914. Closed on 6 January 1930 and saved from demolition by housing the local museum; re-consecrated on 8 September 1999 by Archbishop Vikenty.' },
                fact: { ru: 'В 1978–1979 годах здание отреставрировали, в мае 2008 года оно пострадало от пожара; приход действует с конца 1990-х годов.', en: 'The building was restored in 1978–1979 and damaged by fire in May 2008; the parish has operated since the late 1990s.' },
                address: { ru: 'ул. Мизерова, д. 88', en: '88 Mizerova St.' },
                queryRu: 'Красноуфимск церковь Александра Невского Мизерова 88', queryEn: 'Krasnoufimsk St Alexander Nevsky Church Mizerova 88'
            },
            {
                id: 'zemstvo', lat: '56.618921', lon: '57.772353', hasMapMark: true, cat: 'architecture', icon: '⚖️', year: '1912 г.',
                style: { ru: 'Русский кирпичный стиль', en: 'Russian Brick style' },
                siteLabel: { ru: 'Здание земского самоуправления', en: 'Zemstvo self-government building' },
                registryId: '661710757880005',
                legalStatus: { ru: 'ОКН регионального значения; реестровый № 661710757880005 в открытом списке наследия — актуальность и границы проверяйте в ЕГРОКН', en: 'Regional cultural heritage site; registry no. 661710757880005 in the open heritage list — verify current details and boundaries in the state register' },
                title: { ru: 'Здание Земской управы (ул. Советская, 17)', en: 'Zemstvo Board Building (17 Sovetskaya St.)' },
                desc: { ru: 'Монументальное здание из фигурного красного кирпича в русском стиле, возведённое около 1911–1912 годов для Красноуфимской земской управы (по одним данным — по проекту инженера И. И. Зелязе и архитектора К. А. Бернацкого, по другим — архитектора Кавадерова, подрядчик Ф. Н. Мальков). В январе 1918 года здесь проходил I уездный съезд Советов рабочих, солдатских и крестьянских депутатов. Сегодня — Дворец творчества детей и молодёжи.', en: 'Monumental red-brick civic building erected around 1911–1912 for the Krasnoufimsk Zemstvo Board (attributed either to engineer I. I. Zelyaze and architect K. A. Bernatsky, or to architect Kavaderov with contractor F. N. Malkov). In January 1918, the 1st District Congress of Soviets was held here. Today it houses the Youth Creative Center.' },
                fact: { ru: 'Красноуфимское земство признавалось одним из самых передовых на Урале: открывало бесплатные больницы, школы, библиотеки и развивало передовую агрономию.', en: 'The Krasnoufimsk Zemstvo was recognized as one of the most progressive in the Urals, pioneering rural hospitals, schools, and experimental agronomy.' },
                address: { ru: 'ул. Советская, д. 17', en: '17 Sovetskaya St.' },
                directUrl: 'https://yandex.ru/maps/org/zdaniye_byvshey_zemskoy_upravy_gde_v_yanvare_1918_g_prokhodil_pervy_krasnoufimskiy_syezd_sovetov/2611628323/',
                queryRu: 'Советская улица, 17, Красноуфимск, Свердловская область', queryEn: '17 Sovetskaya St., Krasnoufimsk'
            },
            {
                id: 'gorupra', lat: '56.617836', lon: '57.767884', hasMapMark: true, cat: 'architecture', icon: '🏛️', year: 'нач. XX в.',
                style: { ru: 'Промышленная краснокирпичная эклектика', en: 'Industrial Red-Brick Eclectic' },
                siteLabel: { ru: 'Памятник промышленной архитектуры', en: 'Industrial Heritage Monument' },
                registryId: '661710757940005',
                legalStatus: { ru: 'ОКН регионального значения; реестровый № 661710757940005 в открытом списке наследия — актуальность и границы проверяйте в ЕГРОКН', en: 'Regional cultural heritage site; registry no. 661710757940005 in the open heritage list — verify current details and boundaries in the state register' },
                title: { ru: 'Корпус винокуренного завода (казённый винный склад)', en: 'Distillery Building (State Wine Warehouse)' },
                desc: { ru: 'Кирпичный производственный корпус начала XX века на ул. Мизерова, 66. Краеведческий музей уточняет, что исторически это казённый винный склад, построенный после введения винной монополии для ректификации продукции винокуренных заводов, её розлива и отпуска в продажу.', en: 'An early-20th-century brick production building at 66 Mizerova St. The local museum clarifies that historically it was a state wine warehouse, built after the introduction of the state wine monopoly to rectify distillery products, bottle them and release them for sale.' },
                fact: { ru: 'В реестре объект назван «Корпус винокуренного завода», а в путеводителях встречаются и другие названия; надёжный ориентир — адрес ул. Мизерова, 66.', en: 'The registry calls it the “Distillery Building”, while guidebooks use other names; the reliable landmark is 66 Mizerova St.' },
                address: { ru: 'ул. Мизерова, 66', en: '66 Mizerova St.' },
                directUrl: 'https://yandex.ru/maps/org/korpus_byvshego_vinokurennogo_zavoda/233245918377/',
                queryRu: 'ул. Мизерова, 66, Красноуфимск, Свердловская область', queryEn: '66 Mizerova St., Krasnoufimsk'
            },
            {
                id: 'mizerov', hasMapMark: true, cat: 'architecture', icon: '🏥', year: '1886 г.',
                directUrl: 'https://yandex.ru/maps/org/muzey_filial_krasnoufimskaya_zemskaya_bolnitsa/200501672404/',
                lat: '56.616173', lon: '57.763080',
                style: { ru: 'Деревянный больничный городок в парке «Целитель»', en: 'Wooden Hospital Estate in Pine Grove' },
                siteLabel: { ru: 'Комплекс земской медицины', en: 'Zemstvo medicine complex' },
                registryId: '661710757870005',
                legalStatus: { ru: 'ОКН регионального значения; реестровый № 661710757870005 в открытом списке наследия — актуальность и границы проверяйте в ЕГРОКН', en: 'Regional cultural heritage site; registry no. 661710757870005 in the open heritage list — verify current details and boundaries in the state register' },
                title: { ru: 'Музей «Красноуфимская земская больница»', en: 'Krasnoufimsk Zemstvo Hospital Museum' },
                desc: { ru: 'Уникальный комплекс земской больницы, построенный в 1886 году по проекту земского врача Матвея Ивановича Мизерова (1854–1913) на склоне Дивьей горы. Бревенчатые корпуса с резными карнизами стоят в парке «Целитель», заложенном Мизеровым в 1884 году. Больница работала здесь до 1976 года, а с 1988 года это музей «Красноуфимская земская больница» — филиал Свердловского областного музея истории медицины. Сегодня комплекс объединяет пять павильонов: рождения (бывший роддом 1908 года), земской медицины, народной медицины, советского периода и современной сельской медицины.', en: 'A unique zemstvo hospital complex built in 1886 to the design of zemstvo doctor Matvey Ivanovich Mizerov (1854–1913) on the slope of Divya Mountain. The preserved log pavilions stand in the Tselitel Park laid out by Mizerov in 1884. The hospital operated here until 1976; since 1988 it has been the Krasnoufimsk Zemstvo Hospital Museum, a branch of the Sverdlovsk Regional Museum of the History of Medicine. The museum complex now brings together five pavilions: childbirth (the former 1908 maternity hospital), zemstvo medicine, folk medicine, the Soviet period and modern rural medicine.' },
                fact: { ru: 'Павильоны стоят в парке «Целитель» площадью более 2 га; режим работы музея лучше уточнить перед визитом.', en: 'The pavilions stand in Tselitel Park, which covers more than 2 hectares; check the museum\'s opening hours before visiting.' },
                address: { ru: 'ул. Свободы, д. 16 (Музей земской больницы)', en: '16 Svobody St. (Zemstvo Hospital Museum)' },
                queryRu: 'Музей земская больница Мизерова Красноуфимск Свободы 16', queryEn: 'Krasnoufimsk Zemstvo Hospital Museum Svobody 16'
            },
            {
                id: 'perekrestok-vremen', lat: '56.617580', lon: '57.770255', hasMapMark: true, cat: 'monuments', icon: '⏳', year: 'XXI в.',
                style: { ru: 'Городская скульптура', en: 'City Sculpture' },
                siteLabel: { ru: 'Арт-объект', en: 'Art Object' },
                title: { ru: 'Арт-объект «Перекрёсток времен»', en: 'Crossroads of Times Art Object' },
                desc: { ru: 'Городские часы на центральной площади, известные как «Красноуфимский Биг-Бен». По описанию городского туристического портала, часы на перекрёстке двух дорог символизируют переплетение времён в истории Красноуфимска; в тёмное время объект подсвечивается.', en: 'The city clock on the central square, known as the “Krasnoufimsk Big Ben”. According to the city tourism portal, the clock at the crossing of two roads symbolises the interweaving of eras in Krasnoufimsk\'s history; it is illuminated after dark.' },
                fact: { ru: 'В картах объект также обозначен как «Перекрёсток времён» — по этому названию его удобно искать при построении маршрута.', en: 'Maps also label the object “Crossroads of Times”, a useful name when searching for directions.' },
                address: { ru: 'ул. Советская, д. 22 (сквер с городскими часами)', en: '22 Sovetskaya St. (City Clock Square)' },
                queryRu: 'Красноуфимск городские часы Перекрёсток времён Советская 22', queryEn: 'Krasnoufimsk city clock Crossroads of Times Sovetskaya 22',
                directUrl: 'https://yandex.ru/maps/org/perekryostok_vremen/126384792809/'
            },
            {
                id: 'pozharnoye', lat: '56.619023', lon: '57.774537', hasMapMark: true, cat: 'architecture', icon: '🚒', year: '1949–1950-е гг.',
                directUrl: 'https://yandex.ru/maps/org/pozharnaya_chast_73/51586748889/',
                style: { ru: 'Провинциальная краснокирпичная эклектика', en: 'Provincial Red-Brick Eclectic' },
                siteLabel: { ru: 'Памятник пожарно-технической службы', en: 'Firefighting Heritage Monument' },
                title: { ru: 'Пожарная часть №73 (ул. Ленина, 100)', en: 'Fire Station No. 73 (100 Lenina St.)' },
                desc: { ru: 'Участок под здание отведён 23 сентября 1949 года, постройка возведена в 1950-е годы. Здание увенчано деревянной смотровой каланчой. Дореволюционная каланча исторически находилась при Городской управе.', en: 'Land for this station was allocated on September 23, 1949, and built in the 1950s, topped with a wooden watchtower. The pre-revolutionary city watchtower was historically at the Town Board.' },
                fact: { ru: 'Дореволюционная пожарная каланча исторически находилась при городской управе; современное здание части относится уже к послевоенному периоду.', en: 'The pre-revolutionary fire watchtower was historically at the Town Board; the present station building dates to the post-war period.' },
                address: { ru: 'ул. Ленина, д. 100 (историческое пожарное депо)', en: '100 Lenina St. (Historic Fire Station)' },
                queryRu: 'Красноуфимск ул Ленина 100 Пожарная часть', queryEn: '100 Lenina St Krasnoufimsk Fire Station'
            },

            // ── 2. ПАМЯТНИКИ И ИСТОРИЯ ─────────────────────────────────────────
            {
                id: 'divizionnaya', lat: '56.618024', lon: '57.761235', cat: 'nature', icon: '⛰️', year: 'Природа',
                hasMapMark: true,
                directUrl: 'https://yandex.ru/maps/org/gora_divya/224956940977/',
                style: { ru: 'Городская гора и смотровая точка', en: 'Urban hill and viewpoint' },
                siteLabel: { ru: 'Природная смотровая точка', en: 'Natural viewpoint' },
                title: { ru: 'Дивья гора', en: 'Divya Mountain' },
                desc: { ru: 'Одна из заметных высот западной части Красноуфимска и природная смотровая точка: с открытых участков видны город и долина реки Уфы. На склоне находятся комплекс бывшей земской больницы и карьер, где А. Г. Бессонов нашёл зубные спирали геликоприона.', en: 'One of the prominent hills in western Krasnoufimsk and a natural viewpoint: its open areas overlook the town and the Ufa River valley. The former zemstvo hospital complex stands on the slope, as does the quarry where A. G. Bessonov found Helicoprion tooth whorls.' },
                fact: { ru: 'Памятный знак Салавату Юлаеву находится не на Дивьей горе, а примерно в 2 км юго-западнее — на одноимённой улице.', en: 'The memorial marker to Salavat Yulaev is not on Divya Mountain; it is about 2 km to the south-west, on the street named after him.' },
                address: { ru: 'Дивья гора, западная часть города', en: 'Divya Mountain, western part of the town' },
                queryRu: 'Гора Дивья, Красноуфимск', queryEn: 'Krasnoufimsk Divya Mountain'
            },
            {
                id: 'ploschad', lat: '56.617826', lon: '57.771051', hasMapMark: true, cat: 'monuments', icon: '🚩', year: 'XVIII–XX вв.',
                directUrl: 'https://yandex.ru/maps/org/v_i_lenin/156209444666/',
                style: { ru: 'Городской ансамбль и советский монументализм', en: 'Town Ensemble & Monumental Classicism' },
                siteLabel: { ru: 'Главная городская площадь', en: 'Central Municipal Square' },
                title: { ru: 'Центральная площадь города', en: 'Central Town Square' },
                desc: { ru: 'Сердце общественной жизни Красноуфимска на протяжении трёх столетий. Исторически здесь шумели уездные ярмарки (по данным краеведов — Богородицкая и Троицкая). В советский период оформилась парадными фасадами, скверами и памятником Ленину. Сегодня — главная площадка городских праздников.', en: 'The civic heart of Krasnoufimsk for nearly three centuries. Historically hosted bustling provincial trade fairs. Today it serves as the vibrant hub for municipal celebrations and festivals.' },
                fact: { ru: 'На ярмарках XVIII–XIX веков продавали знаменитый уральский мёд, зерно, пушнину и строевой лес.', en: 'Historical Krasnoufimsk fairs traded Ural honey, grain, fur pelts, and high-grade construction timber.' },
                address: { ru: 'Площадь Ленина / ул. Советская', en: 'Lenina Square / Sovetskaya St.' },
                queryRu: 'В.И. Ленин Красноуфимск', queryEn: 'Krasnoufimsk Lenin monument'
            },
            {
                id: 'salavat-memorial', lat: '56.606363', lon: '57.739570', hasMapMark: true, cat: 'monuments', icon: '⚔️', year: '2008 г.',
                directUrl: 'https://yandex.ru/maps/org/salavat_yulayev/174865061813/',
                style: { ru: 'Мемориальный знак', en: 'Memorial Marker' },
                siteLabel: { ru: 'Память о событиях Пугачёвского восстания', en: 'Memory of the Pugachev rebellion' },
                title: { ru: 'Памятный знак Салавату Юлаеву', en: 'Memorial Marker to Salavat Yulaev' },
                desc: { ru: 'Памятный знак открыт 28 июня 2008 года на улице Салавата Юлаева к 450-летию вхождения Башкирии в состав России. Выбор места местное предание связывает с юртой Салавата Юлаева, которая якобы стояла здесь 12 января 1774 года, когда Красноуфимск перешёл к повстанцам без боя.', en: 'The memorial marker was unveiled on 28 June 2008 on Salavat Yulaev Street for the 450th anniversary of Bashkiria joining Russia. Local tradition links the choice of site with Salavat Yulaev\'s yurt, said to have stood here on 12 January 1774, when Krasnoufimsk passed to the rebels without a fight.' },
                fact: { ru: 'Знак не находится на Дивьей горе: между горой и улицей Салавата Юлаева около 2 км по прямой.', en: 'The marker is not on Divya Mountain: the hill and Salavat Yulaev Street are about 2 km apart as the crow flies.' },
                address: { ru: 'ул. Салавата Юлаева', en: 'Salavat Yulaev St.' },
                queryRu: 'Красноуфимск памятный знак Салавату Юлаеву улица Салавата Юлаева', queryEn: 'Krasnoufimsk Salavat Yulaev memorial marker Salavat Yulaev Street'
            },
            {
                id: 'alleya-pamyati', hasMapMark: true, cat: 'monuments', icon: '🕯️', year: '2010 г.',
                directUrl: 'https://yandex.ru/maps/org/alleya_pamyati/75796278043/',
                lat: '56.621350', lon: '57.773858',
                style: { ru: 'Мемориальный комплекс', en: 'Memorial Complex' },
                siteLabel: { ru: 'Главный воинский мемориал города', en: 'Central City War Memorial' },
                title: { ru: 'Аллея Памяти и Вечный огонь', en: 'Alley of Memory & Eternal Flame' },
                desc: { ru: 'Мемориальный комплекс «Аллея Памяти» с Вечным огнём у площади Свято-Троицкого собора открыт 22 июня 2010 года, к 65-летию Победы. 15 февраля 2014 года комплекс дополнила стела воинам локальных войн «Время выбрало нас...». Это единый городской мемориал у собора, а не отдельная аллея бюстов.', en: 'The “Alley of Memory” memorial complex with the Eternal Flame near Holy Trinity Cathedral square opened on 22 June 2010 for the 65th anniversary of Victory. On 15 February 2014 it was joined by the “Time Chose Us...” stele to soldiers of local wars. This is one city memorial by the cathedral, not a separate alley of busts.' },
                fact: { ru: 'С Красноуфимском связывают имена шести Героев Советского Союза: В. И. Винокурова, П. А. Кашпурова, И. И. Марьина, Н. Ф. Сухобского, Н. Х. Хазипова и С. И. Шершавина. В карточке они упомянуты как исторический контекст, без утверждения о ряде бюстов на этой территории.', en: 'Six Heroes of the Soviet Union are linked with Krasnoufimsk: V. I. Vinokurov, P. A. Kashpurov, I. I. Maryin, N. F. Sukhobsky, N. Kh. Khazipov and S. I. Shershavin. They are mentioned here as historical context, without claiming that a row of their busts stands on this site.' },
                address: { ru: 'ул. Куйбышева, 3 (у площади Свято-Троицкого собора)', en: '3 Kuybysheva St. (near Holy Trinity Cathedral Square)' },
                queryRu: 'Красноуфимск Аллея Памяти Вечный огонь Куйбышева 3', queryEn: 'Krasnoufimsk Alley of Memory Eternal Flame Kuybysheva 3'
            },
            {
                id: 'parovoz', lat: '56.601278', lon: '57.767356', hasMapMark: true, cat: 'monuments', icon: '🚂', year: '1951 / 1995 гг.',
                directUrl: 'https://yandex.ru/maps/org/parovoz_pamyatnik_l_1699/82387482330/',
                style: { ru: 'Памятник железнодорожной техники', en: 'Railway Engineering Monument' },
                siteLabel: { ru: 'Памятник у локомотивного депо', en: 'Locomotive Depot Memorial' },
                title: { ru: 'Паровоз-памятник серии «Л» («Лебедянка»)', en: 'L-Series Steam Locomotive "Lebedyanka" Monument' },
                desc: { ru: 'У локомотивного депо станции Красноуфимск установлен подлинный магистральный паровоз серии «Л» (номер Л-1699). Построен на Коломенском заводе в 1951 году; по данным краеведов, установлен как памятник у локомотивного депо 20 апреля 1995 года, к 50-летию Великой Победы. Символ трудового и ратного подвига уральских железнодорожников.', en: 'An authentic L-series steam locomotive (L-1699) stands by the Krasnoufimsk locomotive depot. Built at Kolomna Plant in 1951 and, according to local historians, dedicated as a monument on 20 April 1995 for the 50th anniversary of Victory (symbolizing the railway workers’ wartime and labor achievements).' },
                fact: { ru: '«Лебедянку» прозвали так в честь главного конструктора Л. С. Лебедянского — создателя нескольких поколений советских паровозов.', en: 'The "Lebedyanka" nickname honors lead designer L. S. Lebedyansky, who created several generations of Soviet steam locomotives.' },
                address: { ru: 'ул. Угольная / ул. Сухобского (у локомотивного депо)', en: 'Ugolnaya St. / Sukhobskogo St. (near locomotive depot)' },
                queryRu: 'Паровоз-памятник Л-1699, Красноуфимск', queryEn: 'Krasnoufimsk locomotive monument L-1699'
            },
            {
                id: 'dom-stasovoy', lat: '56.620189', lon: '57.777312', hasMapMark: true, cat: 'architecture', icon: '🏠', year: '1941–1945 гг.',
                directUrl: 'https://yandex.ru/maps/org/dom_v_kotorom_v_1941_1945_gody_zhila_ye_d_stasova_vidny_deyatel_kpss_s_1898_goda_soratnitsa_v_i_lenina/17082544989/',
                style: { ru: 'Исторический жилой дом', en: 'Historical Residential House' },
                siteLabel: { ru: 'Памятник истории', en: 'Historical Monument' },
                registryId: '661710757890005',
                legalStatus: { ru: 'ОКН регионального значения; реестровый № 661710757890005 в открытом списке наследия — актуальность и границы проверяйте в ЕГРОКН', en: 'Regional cultural heritage site; registry no. 661710757890005 in the open heritage list — verify current details and boundaries in the state register' },
                title: { ru: 'Дом, где жила Е.Д. Стасова', en: 'House of E.D. Stasova' },
                desc: { ru: 'Деревянное здание, в котором в годы Великой Отечественной войны находилась в эвакуации Елена Дмитриевна Стасова — видный деятель партии с 1898 года и соратница В.И. Ленина. Дом сохраняет память о жизни и работе известных личностей в уральском тылу.', en: 'A wooden building where Elena Stasova, a prominent party figure since 1898 and an associate of V.I. Lenin, lived in evacuation during the Great Patriotic War. The house preserves the memory of famous personalities in the Ural rear.' },
                fact: { ru: 'Несмотря на преклонный возраст, в годы эвакуации Е.Д. Стасова вела активную общественную деятельность в городе.', en: 'Despite her advanced age, during the evacuation, E.D. Stasova actively participated in the city\'s public life.' },
                address: { ru: 'Пролетарская ул., 101', en: '101 Proletarskaya St.' },
                queryRu: 'Дом, в котором в 1941-1945 годы жила Е.Д. Стасова, видный деятель КПСС с 1898 года, соратница В.И. Ленина, Красноуфимск', queryEn: 'Krasnoufimsk E.D. Stasova House'
            },

            // ── 3. ИНЖЕНЕРИЯ И МОСТЫ ───────────────────────────────────────────
            {
                id: 'viaduct', hasMapMark: true, cat: 'engineering', icon: '🌉', year: '1915–1919 гг.',
                directUrl: 'https://yandex.ru/maps/org/viaduk_ryabinovka/183604558232/',
                lat: '56.552628', lon: '57.712260',
                style: { ru: 'Инженерный неоклассицизм', en: 'Engineering Neoclassicism' },
                siteLabel: { ru: 'Шедевр мостостроения • Памятник техники', en: 'Monument of Engineering & Architecture' },
                title: { ru: 'Рябиновский железнодорожный виадук', en: 'Ryabinovka Railway Viaduct' },
                desc: { ru: 'Главный железнодорожный виадук Красноуфимского района, возведённый в 1915–1919 годах при прокладке магистрали Казань–Екатеринбург. Железобетонная многоарочная конструкция длиной 283,454 м. Строился в суровых условиях Первой мировой войны и стал триумфом инженерной мысли начала XX века.', en: 'The main railway viaduct of Krasnoufimsk district, built in 1915–1919 for the Kazan–Yekaterinburg railroad: a multi-arch reinforced concrete structure 283.454 m long. Erected under WWI conditions, it became a triumph of early 20th-century engineering.' },
                fact: { ru: 'В Красноуфимском районе сохранилось пять исторических арочных виадуков — редкое по плотности собрание инженерных памятников начала XX века. С октября 2008 года Рябиновский виадук законсервирован: поезда идут по новому мосту рядом.', en: 'Krasnoufimsk district preserves five monumental historic viaducts — a remarkably dense group of early 20th-century engineering monuments. Since October 2008 the Ryabinovka viaduct has been mothballed: trains now run over the new bridge nearby.' },
                address: { ru: 'Красноуфимский район, пос. Рябиновка', en: 'Krasnoufimsky District, Ryabinovka village' },
                queryRu: 'Рябиновский виадук Красноуфимск', queryEn: 'Ryabinovsky viaduct Krasnoufimsk'
            },

            // ── 4. ПРИРОДА И ГЕОЛОГИЯ ──────────────────────────────────────────
            {
                id: 'naberezhnaya', lat: '56.622143', lon: '57.775834', hasMapMark: true, cat: 'nature', icon: '🌊', year: '2020–2026 гг.',
                style: { ru: 'Современная эко-урбанистика', en: 'Contemporary Eco-Urbanism' },
                siteLabel: { ru: 'Общественное пространство • проект «Красный Яр»', en: 'Public space • Krasny Yar project' },
                title: { ru: 'Набережная реки Уфы и Красный Яр', en: 'Ufa River Embankment & Krasny Yar' },
                desc: { ru: 'Историческая территория у крутого берега реки Уфы, где стояла крепость 1736 года. Нижний уровень набережной («Козий парк») благоустраивают по проекту «Красный Яр», победившему во Всероссийском конкурсе лучших проектов создания комфортной городской среды. По состоянию на октябрь 2026 года работы продолжаются, поэтому перед визитом уточняйте, какие участки открыты.', en: 'Historic ground by the steep bank of the Ufa River, where the 1736 fortress stood. The lower embankment level (Koziy Park) is being upgraded under the Krasny Yar project, a winner of the All-Russian competition for comfortable urban-environment projects. Work was still under way in October 2026, so check which sections are open before visiting.' },
                fact: { ru: 'Проект предусматривает прогулочные зоны, смотровую площадку, модульную сцену, пирс, детские и спортивные площадки и озеленение; к октябрю 2026 года не все работы были завершены.', en: 'The project includes walking areas, a viewpoint, a modular stage, a pier, children’s and sports areas and landscaping; not all work had been completed by October 2026.' },
                address: { ru: 'Верхний уровень набережной у Красного Яра; нижний уровень — «Козий парк»', en: 'Upper embankment level at Krasny Yar; lower level—Koziy Park' },
                queryRu: 'Красноуфимск набережная Красный Яр', queryEn: 'Krasnoufimsk Krasny Yar embankment'
            },
            {
                id: 'sokoliy-kamen', hasMapMark: true, cat: 'nature', icon: '⛰️', year: '~290 млн лет',
                directUrl: 'https://yandex.ru/maps/org/skala_sokolov_kamen/234546884788/',
                lat: '56.529961', lon: '57.715095',
                style: { ru: 'Геологический памятник природы', en: 'Geological Natural Monument' },
                siteLabel: { ru: 'Рифовые известняки пермского периода', en: 'Permian Reef Limestone Monument' },
                title: { ru: 'Скала «Соколиный (Соколовский) камень»', en: '“Sokoliniy (Sokolovsky) Rock” Permian Cliff' },
                desc: { ru: 'Величественный скальный массив на правом берегу реки Уфы, ниже д. Рябиновки и в окрестностях посёлка Сарана, — обнажение древнейшего кораллового и мшанкового рифа Пермского моря (~280–290 миллионов лет). Три скальных выхода высотой до 80 м, белые известняковые утёсы отвесно падают в воду. Памятник природы и популярная точка сплавов. Спирали ископаемой акулы Helicoprion bessonowi А. Г. Бессонов нашёл не здесь, а в карьере на склоне Дивьей горы в Красноуфимске и передал их А. П. Карпинскому в 1898 году.', en: 'A majestic rock massif on the Ufa riverbank — an exposed reef of the ancient Permian sea (~280–290 million years old). White limestone cliffs drop vertically to the water. A. G. Bessonov found the Helicoprion bessonowi whorls not here but in a quarry on the slope of Divya Mountain in Krasnoufimsk, and passed them to A. P. Karpinsky in 1898.' },
                fact: { ru: 'Памятник природы регионального значения площадью 200 га включает скальные выходы и окружающие леса; соблюдайте режим охраняемой территории.', en: 'This 200-hectare regional nature monument includes the rock outcrops and surrounding forests; please follow the protected-area rules.' },
                address: { ru: 'Правый берег р. Уфы, ниже д. Рябиновки, в окрестностях пос. Сарана', en: 'Right bank of the Ufa River, below Ryabinovka village, near Sarana settlement' },
                queryRu: 'Соколиный Соколовский камень Красноуфимский район скала', queryEn: 'Sokoliniy Sokolovsky Rock Krasnoufimsk district cliff'
            },
            {
                id: 'braviy-kazak', lat: '56.622623', lon: '57.774121', hasMapMark: true, cat: 'monuments', icon: '⚔️', year: 'XXI в.',
                directUrl: 'https://yandex.ru/maps/org/bravy_kazak/44501147207/',
                style: { ru: 'Городская скульптура', en: 'City Sculpture' },
                siteLabel: { ru: 'Памятник основателям', en: 'Founders Monument' },
                title: { ru: 'Скульптура «Бравый казак»', en: 'Brave Cossack Sculpture' },
                desc: { ru: 'Скульптурная композиция казака Красноуфимской крепости и инсталляция крепости на набережной. По описанию городского туристического портала, облик и облачение фигуры воссозданы по ранним описаниям казаков Красноуфимской крепости Оренбургского казачьего войска времён Пугачёвского восстания.', en: 'A sculptural composition of a Cossack of the Krasnoufimsk fortress, together with a fortress installation on the embankment. According to the city tourism portal, the figure\'s appearance and clothing were recreated from early descriptions of Krasnoufimsk fortress Cossacks of the Orenburg Cossack Host from the time of the Pugachev rebellion.' },
                fact: { ru: 'Рядом, в той же крепостной инсталляции, находится копия чугунной пушки XVIII века.', en: 'A replica of an 18th-century cast-iron cannon stands nearby in the same fortress installation.' },
                address: { ru: 'Набережная реки Уфы (Красный Яр)', en: 'Ufa River Embankment (Krasny Yar)' },
                queryRu: 'Бравый казак Красноуфимск', queryEn: 'Krasnoufimsk Brave Cossack'
            },
            {
                id: 'sosnovye-bory', lat: '56.616047', lon: '57.762592', hasMapMark: true, cat: 'nature', icon: '🌲', year: '1884 г.',
                directUrl: 'https://yandex.ru/maps/org/park_tselitel/59666097211/',
                style: { ru: 'Исторический больничный парк', en: 'Historic hospital park' },
                siteLabel: { ru: 'Парк при земской больнице', en: 'Park by the Zemstvo hospital' },
                title: { ru: 'Парк «Целитель»', en: 'Tselitel Park' },
                desc: { ru: 'Исторический парк при комплексе земской больницы на склоне Дивьей горы. Его заложил М. И. Мизеров в 1884 году как часть больничной среды; сегодня аллеи и старые деревья окружают музейные павильоны земской медицины.', en: 'The historic park of the zemstvo hospital complex on the slope of Divya Mountain. M. I. Mizerov laid it out in 1884 as part of the hospital environment; today its alleys and mature trees surround the zemstvo-medicine museum pavilions.' },
                fact: { ru: 'Площадь парка — более 2 га; точка на карте относится именно к парку «Целитель», а не к отдельной охраняемой сосновой роще за городом.', en: 'The park covers more than 2 hectares; the map point refers specifically to Tselitel Park, not to a separate protected pine grove outside the town.' },
                address: { ru: 'Парк «Целитель», у ул. Свободы, 16', en: 'Tselitel Park, by 16 Svobody St.' },
                queryRu: 'парк Целитель Красноуфимск', queryEn: 'Krasnoufimsk Tselitel park'
            },
            {
                id: 'gelikoprion', lat: '56.622152', lon: '57.775134', hasMapMark: true, cat: 'monuments', icon: '🦈', year: '2019 г.',
                directUrl: 'https://yandex.ru/maps/org/akula_gelikoprion/218517186206/',
                style: { ru: 'Арт-объект', en: 'Art Object' },
                siteLabel: { ru: 'Современный арт-объект о палеонтологической находке', en: 'Modern art object about a paleontological discovery' },
                title: { ru: 'Арт-объект «Акула Геликоприон»', en: 'Helicoprion Shark Art Object' },
                desc: { ru: 'Оригинальная скульптура, посвящённая знаменитой ископаемой акуле Геликоприону. Зубные спирали Helicoprion bessonowi найдены краеведом А. Г. Бессоновым в карьере на склоне Дивьей горы, в 1898 году переданы академику А. П. Карпинскому и научно описаны им в 1899 году. Арт-объект напоминает, что 290 миллионов лет назад здесь плескалось тёплое Пермское море.', en: 'An original sculpture dedicated to the famous fossil shark Helicoprion. The Helicoprion bessonowi tooth whorls were found by local historian A. G. Bessonov in a quarry on the slope of Divya Mountain, passed to Academician A. P. Karpinsky in 1898 and scientifically described by him in 1899.' },
                fact: { ru: 'Больше ста лет палеонтологи всего мира спорили, где именно у акулы находилась эта зубная спираль (на носу, плавнике или в пасти).', en: 'For over a century, paleontologists worldwide debated where exactly the shark\'s tooth whorl was located (on its snout, fin, or in its jaw).' },
                address: { ru: 'Набережная реки Уфы', en: 'Ufa River Embankment' },
                queryRu: 'Акула Геликоприон Красноуфимск', queryEn: 'Krasnoufimsk Helicoprion Shark'
            },
            {
                id: 'shtab-azina', lat: '56.623991', lon: '57.767153', hasMapMark: true, cat: 'architecture', icon: '⭐', year: '1919 г.',
                directUrl: 'https://yandex.ru/maps/org/zdaniye_v_kotorom_v_iyule_1919_goda_razmeshchalsya_shtab_28_divizii_pod_komandovaniyem_v_m_azina/198984405778/',
                style: { ru: 'Историческое здание', en: 'Historical Building' },
                siteLabel: { ru: 'Памятник истории Гражданской войны', en: 'Civil War Historical Monument' },
                registryId: '661710757900005',
                legalStatus: { ru: 'ОКН регионального значения; реестровый № 661710757900005 в открытом списке наследия — актуальность и границы проверяйте в ЕГРОКН', en: 'Regional cultural heritage site; registry no. 661710757900005 in the open heritage list — verify current details and boundaries in the state register' },
                title: { ru: 'Штаб 28-й дивизии В.М. Азина', en: 'Headquarters of Azin\'s 28th Division' },
                desc: { ru: 'Здание, в котором в 1919 году, в переломный момент Гражданской войны, размещался штаб 28-й стрелковой дивизии Второй армии Восточного фронта. Дивизией командовал легендарный Владимир Мартинович Азин — один из самых известных красных командиров Восточного фронта. Дом бывший Алексеева; памятная доска на фасаде.', en: 'The building where, in 1919, during a turning point of the Civil War, the headquarters of the 28th Rifle Division of the Second Army of the Eastern Front was located. The division was commanded by the legendary Vladimir Azin, a famous Red commander. Former Alekseev house, with a memorial plaque on the facade.' },
                fact: { ru: 'В. М. Азин (настоящее имя Вольдемар Азиньш) прославился личной храбростью в боях за Урал. Здание штаба — объект культурного наследия областного значения (включено в Госсписок решением исполкома Свердловского облсовета от 18.02.1991 № 75). Его имя носит улица в Красноуфимске — бывшая Криулинская.', en: 'V. M. Azin (real name Voldemar Azinsh) was famous for his personal bravery in the battles for the Urals. The headquarters building is a regional cultural heritage site (state list decision of 18 Feb 1991 No. 75); a street in Krasnoufimsk, former Kriulinskaya, bears his name.' },
                address: { ru: 'ул. Пролетарская, 50', en: '50 Proletarskaya St.' },
                queryRu: 'Здание, в котором в 1919 году размещался штаб 28 дивизии под командованием В. М. Азина, Красноуфимск, Пролетарская 50', queryEn: 'Krasnoufimsk Azin 28th division headquarters'
            }
        ,
            {
                id: 'girl_airplane', lat: '56.622223', lon: '57.775552', hasMapMark: true, cat: 'monuments', icon: '✈️', year: '2019 г.',
                style: { ru: 'Современная городская скульптура', en: 'Modern Urban Sculpture' },
                siteLabel: { ru: 'Арт-объект', en: 'Art Object' },
                title: { ru: 'Скульптура «Девочка с самолётиком»', en: 'Sculpture "Girl with an Airplane"' },
                desc: { ru: 'Бронзовый арт-объект на набережной, установленный в 2019 году в честь уроженки Красноуфимска Ираиды Фёдоровны Вертипраховой — советской лётчицы и заслуженного пилота СССР. Фигура девочки с игрушечным самолётиком рассказывает о детской мечте, которой покорилось небо.', en: 'A bronze art object on the embankment, installed in 2019 in honour of Krasnoufimsk-born Iraida Fyodorovna Vertiprakhova, a Soviet aviator and Honoured Pilot of the USSR. The figure of a girl with a toy aeroplane tells of a childhood dream that reached the sky.' },
                fact: { ru: 'В 2016 году памятную доску И. Ф. Вертипраховой открыли на доме по ул. Ухтомского, 23, где она жила в последние годы.', en: 'In 2016 a memorial plaque to I. F. Vertiprakhova was unveiled at 23 Ukhtomskogo St., where she lived in her final years.' },
                address: { ru: 'Верхний уровень набережной реки Уфы, Красный Яр', en: 'Upper level of the Ufa River embankment, Krasny Yar' },
                directUrl: 'https://yandex.ru/maps/org/devochka_s_samolyotikom/173709599756/',
                queryRu: 'Скульптура Девочка с самолетиком Красноуфимск', queryEn: 'Krasnoufimsk Girl with an Airplane sculpture'
            }
        ,
            {
                id: 'watchtower', lat: '56.622491', lon: '57.771738', hasMapMark: true, cat: 'monuments', icon: '🗼', year: 'XVIII в.',
                style: { ru: 'Деревянное крепостное зодчество (утрачено)', en: 'Wooden Fortress Architecture (lost)' },
                siteLabel: { ru: 'Историческое место', en: 'Historical Site' },
                registryId: '661710817800005',
                legalStatus: { ru: 'Часовня — ОКН регионального значения; реестровый № 661710817800005 в открытом списке наследия — актуальность и границы проверяйте в ЕГРОКН', en: 'The chapel is a regional cultural heritage site; registry no. 661710817800005 in the open heritage list — verify current details and boundaries in the state register' },
                title: { ru: 'Камешек: часовня Иосифа Песнописца и место дозорной башни', en: 'Kameshek: Chapel of St Joseph the Hymnographer & Watchtower Site' },
                desc: { ru: 'Возвышенный берег Уфы на Камешке, где сегодня стоит часовня Иосифа Песнописца. По краеведческим описаниям, прежде здесь находилась дозорная башня Красноуфимской крепости, с которой вели наблюдение за рекой и подступами к поселению. Связь места с Пугачёвым относится к местному преданию.', en: 'The high Ufa bank at Kameshek, where the Chapel of St Joseph the Hymnographer stands today. Local-history accounts place a watchtower of the Krasnoufimsk fortress here, overlooking the river and approaches to the settlement. The Pugachev connection is local tradition.' },
                fact: { ru: 'По описаниям краеведов, крепость имела несколько деревянных башен, соединённых высоким тыном, и бастионы с пушками на каменном гребне Камешек. До наших дней дошли лишь единичные деревянные постройки крепостного времени, их датировка уточняется.', en: 'According to local historians, the fortress had several wooden towers linked by a high palisade, plus cannon-armed bastions on the Kameshek rocky ridge. Only a few timber buildings of the fortress era survive, and their dating is still being refined.' },
                address: { ru: 'Пролетарская ул., 81а, Камешек', en: '81A Proletarskaya St., Kameshek' },
                directUrl: 'https://yandex.ru/maps/org/mesto_gde_stoyala_storozhevaya_bashnya_na_reke_ufe/3251418776/',
                queryRu: 'Красноуфимск часовня Иосифа Песнописца Пролетарская 81а Камешек', queryEn: 'Krasnoufimsk watchtower site'
            }
        ];


        function normalizeDateFields(item) {
            const label = String(item.year || '');
            const years = [...label.matchAll(/\b(1[5-9]\d{2}|20\d{2})\b/g)].map(m => Number(m[1]));
            let endYear = years.length > 1 ? years[years.length - 1] : (years[0] ?? null);
            const shortRange = label.match(/\b(1[5-9]\d{2}|20\d{2})\s*[–-]\s*(\d{2})\b/);
            if (shortRange && years.length === 1) endYear = Math.floor(years[0] / 100) * 100 + Number(shortRange[2]);
            item.yearLabel = { ru: label, en: localizeSightYear(label, 'en') };
            item.startYear = years[0] ?? null;
            item.endYear = endYear;
            item.dateNote = label.includes('/') ? label.split('/').slice(1).join('/').trim() : (label === 'Природа' ? 'natural site' : '');
        }
        eventsData.forEach(event => {
            normalizeDateFields(event);
            event.checkedAt = '2026-10-19';
        });
        quizDataMaster.forEach(question => { question.checkedAt = '2026-10-19'; });
        sightsData.forEach(sight => {
            normalizeDateFields(sight);
            sight.checkedAt = '2026-10-19';
        });
        let currentSightCategory = 'all';
        let currentSightId = 'kazachya-izba';
        let currentSightIndex = 0;

        function filterSightsCategory(cat) {
            currentSightCategory = cat;
            document.querySelectorAll('.sights-cat-tab').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-cat') === cat);
            });
            updateSightsDropdownMenu();
            const filtered = (cat === 'all') ? sightsData : sightsData.filter(s => s.cat === cat);
            if (filtered.length > 0 && !filtered.some(s => s.id === currentSightId)) {
                selectSight(filtered[0].id, false);
            }
        }

        let sightsCustomSearchQuery = '';

        function toggleSightsCustomMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const wrap = document.getElementById('sights-custom-wrap');
            const menu = document.getElementById('sights-custom-menu');
            const trigger = document.getElementById('sights-custom-trigger');
            const bar = document.querySelector('.sights-menu-selector-bar');
            if (!menu || !wrap || !trigger) return;

            const willShow = !menu.classList.contains('show');
            if (willShow) {
                if (bar) bar.classList.add('menu-open');
                wrap.classList.add('open');
                menu.classList.add('show');
                trigger.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                renderSightsCustomOptions(sightsCustomSearchQuery);
                const searchInput = document.getElementById('sights-search-input');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 60);
                }
                scrollCustomMenuToActive();
            } else {
                closeSightsCustomMenu();
            }
        }

        function closeSightsCustomMenu() {
            const wrap = document.getElementById('sights-custom-wrap');
            const menu = document.getElementById('sights-custom-menu');
            const trigger = document.getElementById('sights-custom-trigger');
            const bar = document.querySelector('.sights-menu-selector-bar');
            if (bar) bar.classList.remove('menu-open');
            if (wrap) wrap.classList.remove('open');
            if (menu) menu.classList.remove('show');
            if (trigger) {
                trigger.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
            }
        }

        function chooseCustomSight(id) {
            selectSight(id, false);
            closeSightsCustomMenu();
            const trigger = document.getElementById('sights-custom-trigger');
            if (trigger) trigger.focus();
        }

        function onSightsSearchInput(val) {
            sightsCustomSearchQuery = val || '';
            const clearBtn = document.getElementById('sights-search-clear-btn');
            if (clearBtn) {
                clearBtn.style.display = sightsCustomSearchQuery.trim().length > 0 ? 'flex' : 'none';
            }
            renderSightsCustomOptions(sightsCustomSearchQuery);
        }

        function clearSightsSearch() {
            const input = document.getElementById('sights-search-input');
            if (input) {
                input.value = '';
                input.focus();
            }
            onSightsSearchInput('');
        }

        function scrollCustomMenuToActive() {
            setTimeout(() => {
                const list = document.getElementById('sights-custom-options-list');
                const selected = list ? list.querySelector('.sights-custom-opt-item.selected') : null;
                if (list && selected) {
                    const topPos = selected.offsetTop - list.offsetTop - 40;
                    list.scrollTo({ top: Math.max(0, topPos), behavior: getScrollBehavior() });
                }
            }, 60);
        }

        function localizeSightYear(year, lang = currentLang) {
            if (!year || lang !== 'en') return year || '';
            const exact = {
                'XVIII в.': '18th century', 'XIX в.': '19th century', 'XVIII–XX вв.': '18th–20th centuries',
                '2020-е гг.': '2020s', '1890-е гг.': '1890s', '1880-е гг.': '1880s', '1949–1950-е гг.': '1949–1950s',
                '1774 г. / памятный знак': '1774 / memorial marker', '~290 млн лет': '~290 million years', 'Природа': 'Nature'
            };
            if (exact[year]) return exact[year];
            return year.replace(/(\d{4})-е/g, '$1s').replace(/\s*гг\./g, '').replace(/\s*г\./g, '').replace('млн лет', 'million years');
        }

        function updateSightsCustomTrigger() {
            const sight = sightsData.find(s => s.id === currentSightId) || sightsData[0];
            const globalIdx = sightsData.findIndex(s => s.id === sight.id);
            const numEl = document.getElementById('sights-trigger-num');
            const iconEl = document.getElementById('sights-trigger-icon');
            const titleEl = document.getElementById('sights-trigger-title');
            const yearEl = document.getElementById('sights-trigger-year');

            if (numEl) numEl.textContent = `${globalIdx + 1}.`;
            if (iconEl) iconEl.textContent = sight.icon;
            if (titleEl) titleEl.textContent = sight.title[currentLang] || sight.title.ru;
            if (yearEl) yearEl.textContent = sight.year ? `(${localizeSightYear(sight.year)})` : '';

            // Обновляем скрытый селект для совместимости
            const selectDropdown = document.getElementById('sights-select-dropdown');
            if (selectDropdown && selectDropdown.value !== sight.id) {
                selectDropdown.value = sight.id;
            }
        }

        function syncSightsCustomMenuSelection() {
            const list = document.getElementById('sights-custom-options-list');
            if (!list) return;
            list.querySelectorAll('.sights-custom-opt-item').forEach(item => {
                const isSelected = (item.getAttribute('data-id') === currentSightId);
                item.classList.toggle('selected', isSelected);
                item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
            });
        }

        function renderSightsCustomOptions(searchQuery = '') {
            const list = document.getElementById('sights-custom-options-list');
            if (!list) return;

            const q = (searchQuery || '').trim().toLowerCase();
            const filteredByCat = (currentSightCategory === 'all')
                ? sightsData
                : sightsData.filter(s => s.cat === currentSightCategory);

            let html = '';
            let matchCount = 0;

            filteredByCat.forEach(s => {
                const globalIdx = sightsData.findIndex(item => item.id === s.id);
                const titleRu = (s.title.ru || '').toLowerCase();
                const titleEn = (s.title.en || '').toLowerCase();
                const styleRu = (s.style && s.style.ru || '').toLowerCase();
                const styleEn = (s.style && s.style.en || '').toLowerCase();
                const yearStr = ((s.year || '') + ' ' + localizeSightYear(s.year || '')).toLowerCase();
                const numStr = (globalIdx + 1).toString();

                let matches = true;
                if (q) {
                    matches = titleRu.includes(q) || titleEn.includes(q) || styleRu.includes(q) || styleEn.includes(q) || yearStr.includes(q) || numStr === q;
                }

                if (matches) {
                    matchCount++;
                    const isSelected = (s.id === currentSightId);
                    const titleText = s.title[currentLang] || s.title.ru;
                    const subText = s.style ? (s.style[currentLang] || s.style.ru) : (s.address ? (s.address[currentLang] || s.address.ru) : '');

                    html += `
                        <div class="sights-custom-opt-item ${isSelected ? 'selected' : ''}" data-id="${s.id}" onclick="chooseCustomSight('${s.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();chooseCustomSight('${s.id}');}else if(event.key==='Escape'){closeSightsCustomMenu();document.getElementById('sights-custom-trigger').focus();}" role="option" tabindex="0" aria-selected="${isSelected}">
                            <div class="sights-opt-left">
                                <span class="sights-opt-num-badge">${globalIdx + 1}.</span>
                                <span class="sights-opt-item-icon">${s.icon}</span>
                                <div class="sights-opt-item-info">
                                    <span class="sights-opt-item-title">${titleText}</span>
                                    <span class="sights-opt-item-sub">${subText}</span>
                                </div>
                            </div>
                            <div class="sights-opt-right">
                                <span class="sights-opt-pill-year">${localizeSightYear(s.year)}</span>
                                <span class="sights-opt-check-mark">✓</span>
                            </div>
                        </div>
                    `;
                }
            });

            if (matchCount === 0) {
                const noText = (currentLang === 'en') ? 'No attractions found for this query' : 'По вашему запросу ничего не найдено';
                html = `<div class="sights-opt-no-results">🔍 ${noText}</div>`;
            }

            list.innerHTML = html;
        }

        function updateSightsDropdownMenu() {
            const select = document.getElementById('sights-select-dropdown');
            const filtered = (currentSightCategory === 'all')
                ? sightsData
                : sightsData.filter(s => s.cat === currentSightCategory);

            if (select) {
                let html = '';
                filtered.forEach(s => {
                    const globalIdx = sightsData.findIndex(item => item.id === s.id);
                    const isSelected = (s.id === currentSightId) ? 'selected' : '';
                    html += `<option value="${s.id}" ${isSelected}>${globalIdx + 1}. ${s.icon} ${s.title[currentLang]} (${localizeSightYear(s.year)})</option>`;
                });
                select.innerHTML = html;
                select.value = currentSightId;
            }

            const searchInput = document.getElementById('sights-search-input');
            if (searchInput) {
                searchInput.placeholder = (currentLang === 'en') ? 'Search 27 attractions...' : 'Поиск объекта...';
            }

            renderSightsCustomOptions(sightsCustomSearchQuery);
            updateSightsCustomTrigger();
        }

        function renderNavSightsDropdown() {
            const list = document.getElementById('nav-sights-dropdown-list');
            if (!list) return;
            let html = '';
            sightsData.forEach(s => {
                html += `
                <div class="nav-dropdown-link" onclick="selectSight('${s.id}', true)">
                    <span class="nav-dropdown-link-icon">${s.icon}</span>
                    <span class="nav-dropdown-link-title">${s.title[currentLang]}</span>
                </div>
                `;
            });
            list.innerHTML = html;
        }

        function stepSight(dir) {
            const list = (currentSightCategory === 'all')
                ? sightsData
                : sightsData.filter(s => s.cat === currentSightCategory);
            if (list.length === 0) return;
            let currentFilteredIndex = list.findIndex(s => s.id === currentSightId);
            if (currentFilteredIndex === -1) currentFilteredIndex = 0;
            let nextIndex = currentFilteredIndex + dir;
            if (nextIndex < 0) nextIndex = list.length - 1;
            if (nextIndex >= list.length) nextIndex = 0;
            selectSight(list[nextIndex].id, false);
        }

        function scrollToSiteMapAndFocus(id) {
            const mapCard = document.getElementById('sights-map-card');
            if (mapCard) {
                mapCard.scrollIntoView({ behavior: getScrollBehavior(), block: 'center' });
            }
            if (!sightsMap && typeof initSightsMap === 'function') initSightsMap();
            setTimeout(() => { if (typeof syncSightsMapWithSight === 'function') syncSightsMapWithSight(id); }, 700);
        }

        function renderSightsSelector(filterCat = 'all') {
            updateSightsDropdownMenu();
        }

        
        /* ==========================================================================
           ИНТЕРАКТИВНАЯ КАРТА ДОСТОПРИМЕЧАТЕЛЬНОСТЕЙ (LEAFLET + КАРТОГРАФИЯ)
           ========================================================================== */
        let sightsMap = null;
        let sightsMarkersLayer = null;
        let sightsMarkersMap = {};
        let currentMapFilter = 'all';
        let sightsBaseLayer = null;
        let sightsBaseLayerKey = '';
        let sightsPmtilesArchive = null;
        const SIGHTS_MAP_BOUNDS = [[56.48, 57.66], [56.68, 57.83]];
        const SIGHTS_PMTILES_URL = new URL('assets/maps/krasnoufimsk.pmtiles', document.baseURI).href;

        /* Собственные палитры карты на базе Protomaps light/dark: светлее и теплее
           стандартных (по просьбе владельца; стандартный dark почти чёрный #1f1f1f,
           а light — серо-мятный с белыми дорогами). Главные дороги подкрашены,
           как на классической схеме OSM. */
        const SIGHTS_MAP_FLAVOR_LIGHT = {
            background: '#eae7db', earth: '#f4f1ea',
            park_a: '#cfdec0', park_b: '#b9d2a6', hospital: '#efe3e1', industrial: '#e7e3ea',
            school: '#efe9d4', wood_a: '#c6d8b6', wood_b: '#aec99c', pedestrian: '#efeade',
            scrub_a: '#cfdcbc', scrub_b: '#b7cfa4', glacier: '#ffffff', sand: '#eee4c8',
            beach: '#f0e8cc', aerodrome: '#e5e5e9', runway: '#d8d8de', water: '#aad3df',
            zoo: '#cfe0d2', military: '#e3ded2',
            tunnel_other_casing: '#ded9cb', tunnel_minor_casing: '#ded9cb', tunnel_link_casing: '#ded9cb',
            tunnel_major_casing: '#ded9cb', tunnel_highway_casing: '#ded9cb',
            tunnel_other: '#eae6da', tunnel_minor: '#eae6da', tunnel_link: '#eae6da',
            tunnel_major: '#eae6da', tunnel_highway: '#eae6da', pier: '#e4dfd2',
            buildings: '#ded4c7',
            minor_service_casing: '#d8d2c2', minor_casing: '#d8d2c2', link_casing: '#e8a95c',
            major_casing_late: '#e8a95c', highway_casing_late: '#dd7f76',
            other: '#f7f4ec', minor_service: '#f7f4ec', minor_a: '#f0ede6', minor_b: '#ffffff',
            link: '#fad9a0', major_casing_early: '#e8a95c', major: '#f9bd6d',
            highway_casing_early: '#dd7f76', highway: '#f0928a',
            railway: '#a09a8e', boundaries: '#b7a3b4',
            bridges_other_casing: '#d8d2c2', bridges_minor_casing: '#d8d2c2', bridges_link_casing: '#e8a95c',
            bridges_major_casing: '#e8a95c', bridges_highway_casing: '#dd7f76',
            bridges_other: '#f7f4ec', bridges_minor: '#ffffff', bridges_link: '#fad9a0',
            bridges_major: '#f9bd6d', bridges_highway: '#f0928a',
            roads_label_minor: '#7a7062', roads_label_minor_halo: '#ffffff',
            roads_label_major: '#6e6455', roads_label_major_halo: '#ffffff',
            ocean_label: '#4a86b8', subplace_label: '#7d7568', subplace_label_halo: '#f4f1ea',
            city_label: '#4c4438', city_label_halo: '#f4f1ea',
            state_label: '#a39a8c', state_label_halo: '#f4f1ea', country_label: '#989082',
            address_label: '#7a7062', address_label_halo: '#ffffff',
            pois: { blue: '#1A8CBD', green: '#20834D', lapis: '#315BCF', pink: '#EF56BA', red: '#F2567A', slategray: '#6A5B8F', tangerine: '#CB6704', turquoise: '#00C3D4' },
            landcover: { grassland: 'rgba(208, 222, 188, 1)', barren: 'rgba(239, 232, 206, 1)', urban_area: 'rgba(235, 230, 220, 1)', farmland: 'rgba(219, 230, 196, 1)', glacier: 'rgba(255, 255, 255, 1)', scrub: 'rgba(205, 220, 182, 1)', forest: 'rgba(183, 204, 164, 1)' }
        };
        const SIGHTS_MAP_FLAVOR_DARK = {
            background: '#222930', earth: '#2a3138',
            park_a: '#304636', park_b: '#395c42', hospital: '#38323a', industrial: '#31383f',
            school: '#38352a', wood_a: '#324c37', wood_b: '#3b5f42', pedestrian: '#384048',
            scrub_a: '#304935', scrub_b: '#35543c', glacier: '#5b676f', sand: '#494436',
            beach: '#4e4634', aerodrome: '#323a41', runway: '#49525a', water: '#2f6285',
            zoo: '#2c4a3c', military: '#393e45',
            tunnel_other_casing: '#1b2026', tunnel_minor_casing: '#1b2026', tunnel_link_casing: '#1b2026',
            tunnel_major_casing: '#1b2026', tunnel_highway_casing: '#1b2026',
            tunnel_other: '#333a41', tunnel_minor: '#333a41', tunnel_link: '#333a41',
            tunnel_major: '#333a41', tunnel_highway: '#333a41', pier: '#454f58',
            buildings: '#454f59',
            minor_service_casing: '#22282f', minor_casing: '#22282f', link_casing: '#6f5c40',
            major_casing_late: '#6f5c40', highway_casing_late: '#8a5545',
            other: '#59636d', minor_service: '#59636d', minor_a: '#626c76', minor_b: '#6c7680',
            link: '#96805c', major_casing_early: '#6f5c40', major: '#b39468',
            highway_casing_early: '#8a5545', highway: '#d68d74',
            railway: '#929ca6', boundaries: '#7c8798',
            bridges_other_casing: '#22282f', bridges_minor_casing: '#22282f', bridges_link_casing: '#6f5c40',
            bridges_major_casing: '#6f5c40', bridges_highway_casing: '#8a5545',
            bridges_other: '#59636d', bridges_minor: '#626c76', bridges_link: '#96805c',
            bridges_major: '#b39468', bridges_highway: '#d68d74',
            roads_label_minor: '#a9b2bb', roads_label_minor_halo: '#222930',
            roads_label_major: '#c6ced6', roads_label_major_halo: '#222930',
            ocean_label: '#8db9dc', subplace_label: '#b9c2cb', subplace_label_halo: '#222930',
            city_label: '#eef2f6', city_label_halo: '#222930',
            state_label: '#8d97a1', state_label_halo: '#222930', country_label: '#9aa4ae',
            address_label: '#a9b2bb', address_label_halo: '#222930',
            pois: { blue: '#4299BB', green: '#30C573', lapis: '#2B5CEA', pink: '#EF56BA', red: '#F2567A', slategray: '#93939F', tangerine: '#F19B6E', turquoise: '#00C3D4' },
            landcover: { grassland: 'rgba(64, 94, 68, 1)', barren: 'rgba(88, 82, 62, 1)', urban_area: 'rgba(52, 59, 65, 1)', farmland: 'rgba(60, 90, 66, 1)', glacier: 'rgba(96, 108, 116, 1)', scrub: 'rgba(62, 92, 70, 1)', forest: 'rgba(58, 88, 64, 1)' }
        };

        function decodeSightsPmtilesBase64() {
            const encoded = window.KRASNOUFIMSK_PMTILES_BASE64;
            if (typeof encoded !== 'string' || !encoded) return null;
            const binary = window.atob(encoded);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            return bytes;
        }

        function createEmbeddedSightsPmtilesArchive() {
            if (sightsPmtilesArchive) return sightsPmtilesArchive;
            if (!window.pmtiles || typeof window.pmtiles.PMTiles !== 'function' || typeof window.pmtiles.FileSource !== 'function') return null;
            const bytes = decodeSightsPmtilesBase64();
            if (!bytes) return null;
            const archiveFile = new File([bytes], 'krasnoufimsk.pmtiles', { type: 'application/octet-stream' });
            sightsPmtilesArchive = new window.pmtiles.PMTiles(new window.pmtiles.FileSource(archiveFile));
            return sightsPmtilesArchive;
        }

        function getSightsPmtilesSource() {
            // Chrome/Edge запрещают fetch() к соседнему .pmtiles при открытии страницы через file://.
            // Только в этом режиме лениво используем Base64-копию того же архива как FileSource;
            // на HTTP/HTTPS всегда работает бинарный PMTiles + Range через Service Worker.
            if (window.location.protocol === 'file:') {
                return createEmbeddedSightsPmtilesArchive() || SIGHTS_PMTILES_URL;
            }
            return SIGHTS_PMTILES_URL;
        }

        function getSightsBaseLayerKey() {
            return `${document.body.classList.contains('dark-theme') ? 'dark' : 'light'}:${currentLang === 'en' ? 'en' : 'ru'}`;
        }

        function createSightsBaseLayer() {
            if (!window.protomapsL || typeof window.protomapsL.leafletLayer !== 'function') return null;
            const isDark = document.body.classList.contains('dark-theme');
            const lang = currentLang === 'en' ? 'en' : 'ru';
            const baseOptions = {
                url: getSightsPmtilesSource(),
                lang,
                attribution: '© OpenStreetMap contributors',
                bounds: SIGHTS_MAP_BOUNDS,
                maxDataZoom: 15
            };
            if (typeof window.protomapsL.paintRules === 'function' && typeof window.protomapsL.labelRules === 'function') {
                const flavor = isDark ? SIGHTS_MAP_FLAVOR_DARK : SIGHTS_MAP_FLAVOR_LIGHT;
                return window.protomapsL.leafletLayer({
                    ...baseOptions,
                    paintRules: window.protomapsL.paintRules(flavor),
                    labelRules: window.protomapsL.labelRules(flavor, lang),
                    backgroundColor: flavor.background
                });
            }
            return window.protomapsL.leafletLayer({ ...baseOptions, flavor: isDark ? 'dark' : 'light' });
        }

        function refreshSightsBaseLayer() {
            if (!sightsMap) return;
            const nextKey = getSightsBaseLayerKey();
            if (sightsBaseLayer && sightsBaseLayerKey === nextKey) return;
            const nextLayer = createSightsBaseLayer();
            if (!nextLayer) return;
            if (sightsBaseLayer) sightsMap.removeLayer(sightsBaseLayer);
            sightsBaseLayer = nextLayer;
            sightsBaseLayerKey = nextKey;
            sightsBaseLayer.addTo(sightsMap);
            const mapEl = document.getElementById('sights-leaflet-map');
            if (mapEl) mapEl.classList.remove('map-base-unavailable');
        }

        let leafletLoadPromise = null;
        function loadLocalScript(src) {
            return new Promise((resolve, reject) => {
                const existing = document.querySelector(`script[src="${src}"]`);
                if (existing) {
                    if (existing.dataset.loaded === 'true') { resolve(); return; }
                    existing.addEventListener('load', () => resolve(), { once: true });
                    existing.addEventListener('error', () => reject(new Error(`${src} failed to load`)), { once: true });
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => { script.dataset.loaded = 'true'; resolve(); };
                script.onerror = () => reject(new Error(`${src} failed to load`));
                document.head.appendChild(script);
            });
        }

        function loadLeaflet() {
            const needsFilePmtilesFallback = window.location.protocol === 'file:' && !sightsPmtilesArchive;
            if (typeof L !== 'undefined' && window.protomapsL && !needsFilePmtilesFallback) return Promise.resolve();
            if (leafletLoadPromise) return leafletLoadPromise;
            leafletLoadPromise = (async () => {
                if (!document.querySelector('link[data-leaflet-css]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet'; link.href = 'vendor/leaflet.css'; link.dataset.leafletCss = 'true';
                    document.head.appendChild(link);
                }
                if (typeof L === 'undefined') await loadLocalScript('vendor/leaflet.js');
                if (!window.protomapsL) await loadLocalScript('vendor/protomaps-leaflet.js');
                if (window.location.protocol === 'file:' && !sightsPmtilesArchive) {
                    if (!window.pmtiles) await loadLocalScript('vendor/pmtiles.js');
                    if (!window.KRASNOUFIMSK_PMTILES_BASE64) await loadLocalScript('assets/maps/krasnoufimsk.pmtiles.base64.js');
                    createEmbeddedSightsPmtilesArchive();
                }
            })().catch(err => {
                leafletLoadPromise = null;
                throw err;
            });
            return leafletLoadPromise;
        }
        function lazyInitSightsMap() {
            const card = document.getElementById('sights-map-card') || document.getElementById('sights-leaflet-map');
            if (!card || !('IntersectionObserver' in window)) { initSightsMap(); return; }
            const obs = new IntersectionObserver(entries => {
                if (entries.some(e => e.isIntersecting)) { obs.disconnect(); initSightsMap(); }
            }, { rootMargin: '600px 0px' });
            obs.observe(card);
        }

        function initSightsMap() {
            const mapEl = document.getElementById('sights-leaflet-map');
            if (!mapEl) return;
            if (typeof L === 'undefined' || !window.protomapsL) { loadLeaflet().then(() => initSightsMap()).catch(err => console.warn('Map load notice:', err)); return; }
            if (sightsMap) {
                sightsMap.invalidateSize();
                return;
            }

            try {
                // Центр Красноуфимска
                sightsMap = L.map('sights-leaflet-map', {
                    center: [56.6160, 57.7660],
                    zoom: 13,
                    minZoom: 11,
                    maxZoom: 18,
                    maxBounds: SIGHTS_MAP_BOUNDS,
                    maxBoundsViscosity: 0.85,
                    scrollWheelZoom: false,
                    attributionControl: true
                });
                sightsMap.attributionControl.setPrefix(false);

                // Полностью локальный векторный PMTiles-пакет территории всех 27 объектов.
                // Данные до zoom 15; Leaflet/Protomaps масштабирует их при приближении до 18.
                sightsBaseLayer = createSightsBaseLayer();
                sightsBaseLayerKey = getSightsBaseLayerKey();
                if (sightsBaseLayer) {
                    sightsBaseLayer.addTo(sightsMap);
                } else {
                    mapEl.classList.add('map-base-unavailable');
                    console.warn('Local PMTiles layer is unavailable; markers remain usable.');
                }

                // Включаем колесо мыши при клике по карте и отключаем при уходе курсора
                sightsMap.on('focus', function() { sightsMap.scrollWheelZoom.enable(); });
                mapEl.addEventListener('mouseleave', function() { sightsMap.scrollWheelZoom.disable(); });

                sightsMarkersLayer = L.layerGroup().addTo(sightsMap);
                renderSightsMapMarkers('all');
            } catch (err) {
                console.warn('Map initialization notice:', err);
            }
        }

        function renderSightsMapMarkers(category) {
            if (!sightsMap || !sightsMarkersLayer) return;
            category = category || currentMapFilter || 'all';
            sightsMarkersLayer.clearLayers();
            sightsMarkersMap = {};

            const dict = (typeof i18n !== 'undefined' && i18n[currentLang]) ? i18n[currentLang] : {};
            const popupBtnLabel = dict.mapPopupMore || ((currentLang === 'ru') ? 'Подробнее в каталоге' : 'View in Catalog');

            sightsData.forEach(function(s) {
                if (!s.lat || !s.lon) return;

                // Фильтрация
                if (category !== 'all') {
                    if (category === 'architecture' && s.cat !== 'architecture') return;
                    if (category === 'monuments' && s.cat !== 'monuments') return;
                    if (category === 'nature' && s.cat !== 'nature') return;
                    if (category === 'engineering' && s.cat !== 'engineering') return;
                }

                const lat = parseFloat(s.lat);
                const lon = parseFloat(s.lon);

                const iconHtml = '<div class="custom-map-pin" title="' + (s.title[currentLang] || '') + '">' + (s.icon || '📍') + '</div>';
                const customIcon = L.divIcon({
                    html: iconHtml,
                    className: 'custom-map-pin-wrap',
                    iconSize: [36, 36],
                    iconAnchor: [18, 18],
                    popupAnchor: [0, -18]
                });

                const marker = L.marker([lat, lon], { icon: customIcon, keyboard: true, title: (s.title[currentLang] || ''), alt: (s.title[currentLang] || '') });

                const catLabel = s.style ? s.style[currentLang] : (s.cat || '');
                const popupHtml = '<div class="map-popup-card">' +
                    '<div class="map-popup-header">' +
                        '<span class="map-popup-icon">' + (s.icon || '🏛️') + '</span>' +
                        '<div class="map-popup-header-content">' +
                            '<div class="map-popup-badge">' + (s.year ? localizeSightYear(s.year) + ' • ' : '') + catLabel + '</div>' +
                            '<div class="map-popup-title">' + (s.title[currentLang] || '') + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="map-popup-desc">' + (s.desc[currentLang] || '') + '</div>' +
                    '<button type="button" class="map-popup-btn" onclick="focusSightFromMap(\'' + s.id + '\')">' +
                        '<span>' + popupBtnLabel + '</span>' +
                    '</button>' +
                '</div>';

                marker.bindPopup(popupHtml, { maxWidth: 330, minWidth: 260 });
                marker.on('click', function() {
                    if (typeof trackMapExplore === 'function') trackMapExplore(s.id);
                });
                sightsMarkersLayer.addLayer(marker);
                sightsMarkersMap[s.id] = marker;
            });
        }

        window.filterSightsMap = function(category) {
            currentMapFilter = category;
            const buttons = document.querySelectorAll('.map-filter-btn');
            buttons.forEach(function(btn) {
                if (btn.getAttribute('data-cat') === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            renderSightsMapMarkers(category);
        };

        window.resetSightsMapView = function() {
            if (!sightsMap) return;
            filterSightsMap('all');
            sightsMap.flyTo([56.6160, 57.7660], 13, { animate: true, duration: 1.0 });
        };

        window.focusSightFromMap = function(id) {
            if (typeof selectSight === 'function') {
                selectSight(id, false);
            }
            const showcase = document.getElementById('sight-showcase');
            if (showcase) {
                showcase.scrollIntoView({ behavior: getScrollBehavior(), block: 'center' });
            }
        };

        function syncSightsMapWithSight(id) {
            if (!sightsMap || !sightsMarkersMap[id]) return;
            const marker = sightsMarkersMap[id];
            const latLng = marker.getLatLng();
            sightsMap.flyTo(latLng, 16, { animate: true, duration: 1.0 });
            marker.openPopup();
        }


        function renderLegalStatusPill(sight) {
            if (!sight.legalStatus || !sight.legalStatus[currentLang]) return '';
            if (!sight.registryId) {
                return `<span class="sight-meta-pill">⚖️ ${currentLang === 'ru' ? 'Объект культурного наследия' : 'Cultural heritage site'}</span>`;
            }
            const shortText = sight.id === 'watchtower'
                ? (currentLang === 'ru' ? 'Часовня — ОКН регионального значения' : 'Chapel — regional heritage site')
                : (currentLang === 'ru' ? 'ОКН регионального значения' : 'Regional cultural heritage site');
            const aria = currentLang === 'ru'
                ? `Показать реестровый номер объекта: ${sight.registryId}`
                : `Show the registry number: ${sight.registryId}`;
            return `<button type="button" class="sight-meta-pill registry-pill" data-registry-id="${sight.registryId}" data-short-text="${shortText}" aria-expanded="false" aria-label="${aria}" title="${aria}" onclick="toggleRegistryNumber(this)">⚖️ ${shortText}</button>`;
        }

        window.toggleRegistryNumber = function(button) {
            const expanded = button.getAttribute('aria-expanded') !== 'true';
            button.setAttribute('aria-expanded', String(expanded));
            const shortText = button.dataset.shortText || '';
            const registryId = button.dataset.registryId || '';
            button.textContent = expanded ? `⚖️ ${shortText} • № ${registryId}` : `⚖️ ${shortText}`;
            button.setAttribute('aria-label', expanded
                ? (currentLang === 'ru' ? `Скрыть реестровый номер объекта: ${registryId}` : `Hide the registry number: ${registryId}`)
                : (currentLang === 'ru' ? `Показать реестровый номер объекта: ${registryId}` : `Show the registry number: ${registryId}`));
        };

        function selectSight(id, shouldScroll = false) {
            let sight;
            let sightIndex;
            if (typeof id === 'number') {
                sightIndex = Math.max(0, Math.min(id, sightsData.length - 1));
                sight = sightsData[sightIndex];
                currentSightId = sight.id;
            } else {
                currentSightId = id;
                sight = sightsData.find(s => s.id === id) || sightsData[0];
                sightIndex = sightsData.findIndex(s => s.id === sight.id);
            }
            currentSightIndex = sightIndex;

            // Sync dropdown selector
            const selectDropdown = document.getElementById('sights-select-dropdown');
            if (selectDropdown && selectDropdown.value !== id) {
                selectDropdown.value = id;
            }
            if (typeof updateSightsCustomTrigger === 'function') {
                updateSightsCustomTrigger();
            }
            if (typeof syncSightsCustomMenuSelection === 'function') {
                syncSightsCustomMenuSelection();
            }

            // Render showcase card
            const showcase = document.getElementById('sight-showcase');
            if (!showcase) return;

            const dict = i18n[currentLang];
            const btnMapText = dict.btnOpenMap || ((currentLang === 'ru') ? '📍 Открыть на Яндекс.Картах' : '📍 Open in Yandex Maps');
            const counterText = (currentLang === 'ru')
                ? `Объект ${sightIndex + 1} из ${sightsData.length}`
                : `Object ${sightIndex + 1} of ${sightsData.length}`;

            // Применяем цветовую категорию к родительской карточке
            showcase.className = 'sight-showcase-card cat-' + (sight.cat || 'architecture');

            const btnSiteMapText = (currentLang === 'ru') ? '🗺️ На карте сайта' : '🗺️ View on Site Map';

            showcase.innerHTML = `
                <div class="sight-showcase-body sight-showcase-body--full sight-fade-in">
                    <div class="sight-showcase-top">
                        <div class="sight-showcase-meta">
                            <span class="sight-meta-pill">📍 ${counterText}</span>
                            <span class="sight-meta-pill">🗓️ ${localizeSightYear(sight.year)}</span>
                            <span class="sight-meta-pill">🎨 ${sight.style[currentLang]}</span>
                            ${(sight.siteLabel && sight.siteLabel[currentLang]) ? `<span class="sight-meta-pill">⭐ ${sight.siteLabel[currentLang]}</span>` : ''}
                            ${renderLegalStatusPill(sight)}
                        </div>
                        <h3 class="sight-showcase-title">${sight.icon} ${sight.title[currentLang]}</h3>
                        <p class="sight-showcase-desc">${sight.desc[currentLang]}</p>
                        <div class="sight-showcase-fact">
                            <div class="sight-fact-header">
                                <span class="sight-fact-icon">💡</span>
                                <strong class="sight-fact-label">${currentLang === 'ru' ? 'Исторический факт' : 'Historical Fact'}</strong>
                            </div>
                            <p class="sight-fact-text">${sight.fact[currentLang]}</p>
                        </div>
                        <div class="sight-showcase-address">
                            <span>📍</span> <span>${sight.address[currentLang]}</span>
                        </div>
                    </div>
                    <div class="sight-showcase-footer">
                        <div class="sight-showcase-actions">
                            <button type="button" class="btn-sight-site-map" onclick="scrollToSiteMapAndFocus('${sight.id}')" title="${currentLang === 'ru' ? 'Показать этот объект на интерактивной карте ниже' : 'Show this place on the interactive map below'}">
                                ${btnSiteMapText}
                            </button>
                            <button type="button" class="btn-map-universal" onclick="openSightMap(${sightIndex})" title="${currentLang === 'ru' ? 'Построить точный маршрут в приложении Яндекс.Карты' : 'Open in Yandex Maps navigator'}">
                                🧭 ${btnMapText.replace('📍 ', '')}
                            </button>
                        </div>
                    </div>
                </div>
            `;

            if (shouldScroll) {
                showcase.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
            }

            // Синхронизация с интерактивной картой
            if (typeof syncSightsMapWithSight === 'function') {
                syncSightsMapWithSight(sight.id);
            }

            // Трекинг прогресса для Паспорта исследователя
            if (typeof trackSightExplored === 'function') {
                trackSightExplored(sight.id, sight.cat);
            }
        }

        // =========================================================================


        // =========================================================================
        document.addEventListener('DOMContentLoaded', function () {
            // Инициализация каталога достопримечательностей
            buildTimelineNav();
            openEvent(typeof currentEventIndex !== 'undefined' ? currentEventIndex : 0, 'event' + ((typeof currentEventIndex !== 'undefined' ? currentEventIndex : 0) + 1));
            renderNavSightsDropdown();
            renderSightsSelector('all');
            selectSight('kazachya-izba');



            // Закрепляем экран в самом верху страницы (Hero-секция)
            window.scrollTo(0, 0);

            // Инициализация языка (автоматически рассчитывает возраст города)
            setLanguage(currentLang);

            // Инициализация динамического возраста города
            updateCityAge();

            // Инициализация плавного появления элементов при прокрутке
            initScrollReveal();

            // Инициализация темы оформления (сезона):
            // По умолчанию стоит 'auto' (по календарю).
            // Если пользователь ранее выбрал другую тему — восстанавливаем её из localStorage.
            const savedSeasonChoice = safeStorageGet('krasnoufimsk_season', null) || safeStorageGet('kuf_season_theme', 'auto');
            const validSeasons = ['winter', 'spring', 'summer', 'autumn'];
            if (savedSeasonChoice && validSeasons.includes(savedSeasonChoice)) {
                setSeasonTheme(savedSeasonChoice, false);
            } else {
                const natSeason = getNaturalSeason();
                setSeasonTheme(natSeason, true);
            }

            // Первичный запрос актуальной погоды и прогноза Красноуфимска
            fetchKrasnoufimskWeather();

            // Автоматическое открытие служебных модальных окон по прямой ссылке с хэшем
            const openHashModal = function() {
                if (window.location.hash === '#privacy-modal' || window.location.hash === '#privacy') {
                    if (typeof openPrivacyModal === 'function') openPrivacyModal();
                }
                if (window.location.hash === '#sources-modal' || window.location.hash === '#sources') {
                    if (typeof openSourcesModal === 'function') openSourcesModal();
                }
            };
            setTimeout(openHashModal, 150);
            window.addEventListener('hashchange', openHashModal);
        });


        


        function downloadCertificate() {
            const rawNameInput = document.getElementById('cert-name-input');
            const rawName = rawNameInput ? rawNameInput.value.trim() : '';
            const fallbackName = currentLang === 'ru' ? 'Знаток истории Красноуфимска' : 'Explorer of Krasnoufimsk';
            const finalName = rawName !== '' ? rawName.slice(0, 50) : fallbackName;

            const score = typeof window.lastQuizScore === 'number' ? window.lastQuizScore : 0;
            const total = typeof window.lastQuizTotal === 'number' && window.lastQuizTotal > 0 ? window.lastQuizTotal : 20;
            const pct = Math.round((score / total) * 100);
            const diff = window.currentQuizDifficulty || (total <= 10 ? 'easy' : (total <= 15 ? 'medium' : 'hard'));

            // Международный стандарт печати Landscape A4 (297 x 210 мм): 2480 x 1754 px
            const W = 2480;
            const H = 1754;
            const canvas = document.createElement('canvas');
            canvas.width = W;
            canvas.height = H;
            const ctx = canvas.getContext('2d');

            // Безопасный полифилл roundRect для старых браузеров
            if (!ctx.roundRect) {
                ctx.roundRect = function (x, y, w, h, r) {
                    if (w < 2 * r) r = w / 2;
                    if (h < 2 * r) r = h / 2;
                    this.beginPath();
                    this.moveTo(x + r, y);
                    this.arcTo(x + w, y, x + w, y + h, r);
                    this.arcTo(x + w, y + h, x, y + h, r);
                    this.arcTo(x, y + h, x, y, r);
                    this.arcTo(x, y, x + w, y, r);
                    this.closePath();
                    return this;
                };
            }

            // 1. Благородный фон: Слоновая кость / Музейный пергамент
            const bgGrad = ctx.createLinearGradient(0, 0, W, H);
            bgGrad.addColorStop(0, '#fefdfb');
            bgGrad.addColorStop(0.5, '#faf6ec');
            bgGrad.addColorStop(1, '#f4ece0');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, W, H);

            // Мягкая виньетка по краям (эффект благородного старения бумаги)
            const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.42, W / 2, H / 2, W * 0.72);
            vig.addColorStop(0, 'rgba(255, 255, 255, 0)');
            vig.addColorStop(1, 'rgba(180, 134, 40, 0.08)');
            ctx.fillStyle = vig;
            ctx.fillRect(0, 0, W, H);

            // 2. Фоновый защитный водяной знак и гравюрные виньетки (Гознак-стиль, повышенная четкость)
            ctx.save();
            ctx.translate(W / 2, H / 2 - 20);
            ctx.strokeStyle = 'rgba(180, 134, 40, 0.13)';
            ctx.fillStyle = 'rgba(180, 134, 40, 0.055)';
            ctx.lineWidth = 2.5;

            // Концентрические гильош-кольца
            for (let r of [160, 240, 320, 420, 520, 620]) {
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Фоновая гильош-розетка из 24 лепестков
            for (let i = 0; i < 24; i++) {
                const ang = (i * Math.PI * 2) / 24;
                ctx.beginPath();
                ctx.ellipse(Math.cos(ang) * 380, Math.sin(ang) * 380, 150, 45, ang, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Лучи славы водяного знака
            for (let i = 0; i < 36; i++) {
                const ang = (i * Math.PI * 2) / 36;
                ctx.beginPath();
                ctx.moveTo(Math.cos(ang) * 450, Math.sin(ang) * 450);
                ctx.lineTo(Math.cos(ang) * 600, Math.sin(ang) * 600);
                ctx.stroke();
            }

            // Истинный геральдический герб Красноуфимска в центре водяного знака
            // (По фото: серебряный сокол с опущенными крыльями на золотой волнообразной
            //  перевязи в зелёном поле, под золотой башенной короной о пяти зубцах)
            ctx.save();
            ctx.strokeStyle = 'rgba(180, 134, 40, 0.22)';
            ctx.fillStyle = 'rgba(180, 134, 40, 0.045)';
            ctx.lineWidth = 2.4;

            // 1. Геральдический щит
            ctx.beginPath();
            ctx.moveTo(-160, -170);
            ctx.lineTo(160, -170);
            ctx.lineTo(160, 25);
            ctx.quadraticCurveTo(150, 160, 0, 225);
            ctx.quadraticCurveTo(-150, 160, -160, 25);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Внутренняя двойная геральдическая кайма
            ctx.beginPath();
            ctx.moveTo(-148, -158);
            ctx.lineTo(148, -158);
            ctx.lineTo(148, 20);
            ctx.quadraticCurveTo(138, 148, 0, 210);
            ctx.quadraticCurveTo(-138, 148, -148, 20);
            ctx.closePath();
            ctx.stroke();

            // 2. Золотая волнообразная перевязь внизу щита (как на фото герба)
            ctx.beginPath();
            ctx.moveTo(-140, 120);
            for (let wx = -140; wx < 140; wx += 20) {
                ctx.quadraticCurveTo(wx + 10, 120 + (((wx + 140) / 20) % 2 === 0 ? -12 : 12), wx + 20, 120);
            }
            ctx.lineTo(140, 165);
            for (let wx = 140; wx > -140; wx -= 20) {
                ctx.quadraticCurveTo(wx - 10, 165 + (((wx + 140) / 20) % 2 === 0 ? -12 : 12), wx - 20, 165);
            }
            ctx.closePath();
            ctx.fillStyle = 'rgba(180, 134, 40, 0.08)';
            ctx.fill();
            ctx.stroke();

            // 3. Золотая башенная корона о пяти зубцах над щитом
            ctx.beginPath();
            ctx.moveTo(-110, -172);
            ctx.lineTo(-110, -225); // левый край
            ctx.lineTo(-75, -225);  // башня 1
            ctx.lineTo(-75, -195);
            ctx.lineTo(-45, -195);
            ctx.lineTo(-45, -235);  // башня 2
            ctx.lineTo(-15, -235);
            ctx.lineTo(-15, -195);
            ctx.lineTo(15, -195);
            ctx.lineTo(15, -245);   // центральная главная башня (3)
            ctx.lineTo(45, -245);
            ctx.lineTo(45, -195);
            ctx.lineTo(75, -195);
            ctx.lineTo(75, -225);   // башня 4
            ctx.lineTo(110, -225);  // башня 5
            ctx.lineTo(110, -172);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // Каменная кладка короны
            ctx.beginPath();
            ctx.moveTo(-105, -185); ctx.lineTo(105, -185);
            ctx.moveTo(-75, -185); ctx.lineTo(-75, -172);
            ctx.moveTo(-30, -185); ctx.lineTo(-30, -172);
            ctx.moveTo(30, -185); ctx.lineTo(30, -172);
            ctx.moveTo(75, -185); ctx.lineTo(75, -172);
            ctx.stroke();

            // 4. Геральдический сокол (символ Красноуфимска)
            // Голова с острым хищным клювом влево
            ctx.beginPath();
            ctx.arc(0, -62, 22, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            // Загнутый золотой клюв
            ctx.beginPath();
            ctx.moveTo(-12, -67);
            ctx.quadraticCurveTo(-34, -62, -28, -48);
            ctx.quadraticCurveTo(-18, -50, -10, -56);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // Лазоревое око
            ctx.beginPath();
            ctx.arc(-5, -64, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(180, 134, 40, 0.35)';
            ctx.fill();

            // Могучее оперенное тело
            ctx.beginPath();
            ctx.moveTo(-16, -42);
            ctx.quadraticCurveTo(-36, 0, -28, 48);
            ctx.lineTo(28, 48);
            ctx.quadraticCurveTo(36, 0, 16, -42);
            ctx.closePath();
            ctx.fillStyle = 'rgba(180, 134, 40, 0.06)';
            ctx.fill();
            ctx.stroke();

            // Хвостовые перья до волнообразной перевязи
            for (let tx of [-14, 0, 14]) {
                ctx.beginPath();
                ctx.moveTo(tx - 6, 48);
                ctx.lineTo(tx, 126);
                ctx.lineTo(tx + 6, 48);
                ctx.stroke();
            }

            // Лапы с когтями на волнообразной перевязи
            for (let footX of [-20, 20]) {
                ctx.beginPath();
                ctx.moveTo(footX, 48);
                ctx.lineTo(footX - 10, 112);
                ctx.moveTo(footX, 48);
                ctx.lineTo(footX, 118);
                ctx.moveTo(footX, 48);
                ctx.lineTo(footX + 10, 112);
                ctx.stroke();
            }

            // Распростёртые крылья с выразительными маховыми перьями
            function drawWatermarkWing(isLeft) {
                const s = isLeft ? -1 : 1;
                // Верхняя кромка крыла
                ctx.beginPath();
                ctx.moveTo(s * 15, -42);
                ctx.quadraticCurveTo(s * 75, -30, s * 118, 55);
                // 5 веерных маховых перьев, опущенных вниз (как на фото)
                ctx.lineTo(s * 104, 62);
                ctx.lineTo(s * 98, 40);
                ctx.lineTo(s * 84, 50);
                ctx.lineTo(s * 78, 28);
                ctx.lineTo(s * 64, 38);
                ctx.lineTo(s * 58, 16);
                ctx.lineTo(s * 44, 26);
                ctx.lineTo(s * 40, 4);
                ctx.lineTo(s * 28, 12);
                ctx.quadraticCurveTo(s * 22, -14, s * 14, -30);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Продольные перьевые линии внутри крыла
                for (let p = 1; p <= 4; p++) {
                    ctx.beginPath();
                    ctx.moveTo(s * (30 + p * 8), -30 + p * 6);
                    ctx.quadraticCurveTo(s * (60 + p * 10), -10 + p * 10, s * (85 + p * 7), 20 + p * 10);
                    ctx.stroke();
                }
            }
            drawWatermarkWing(true);
            drawWatermarkWing(false);

            ctx.restore();
            ctx.restore();

            // 2.1. Боковые декоративные гравюрные виньетки (заполняют пустоту по левому и правому краям)
            function drawSideFlourish(baseX, isLeft) {
                ctx.save();
                ctx.translate(baseX, H / 2);
                ctx.strokeStyle = 'rgba(180, 134, 40, 0.22)';
                ctx.fillStyle = 'rgba(180, 134, 40, 0.12)';
                ctx.lineWidth = 2.2;

                const dir = isLeft ? 1 : -1;

                // Вертикальная ветвь с листьями и ягодами
                ctx.beginPath();
                ctx.moveTo(0, -420);
                ctx.quadraticCurveTo(dir * 25, 0, 0, 420);
                ctx.stroke();

                // Листья лавра вдоль ветви
                for (let y = -380; y <= 380; y += 48) {
                    ctx.beginPath();
                    ctx.ellipse(dir * 18, y, 16, 7, dir * 0.45, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.ellipse(dir * -12, y + 24, 13, 6, dir * -0.4, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();

                    // Ягоды
                    ctx.beginPath();
                    ctx.arc(dir * 4, y + 10, 3.5, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Верхний завиток-виньетка
                ctx.beginPath();
                ctx.arc(dir * 15, -435, 18, 0, Math.PI * 1.8);
                ctx.stroke();

                // Нижний завиток-виньетка
                ctx.beginPath();
                ctx.arc(dir * 15, 435, 18, 0, Math.PI * 1.8);
                ctx.stroke();

                ctx.restore();
            }

            drawSideFlourish(200, true);
            drawSideFlourish(W - 200, false);

            // 3. Многослойная императорская золотая рамка (Imperial Gold Border)
            const goldGrad = ctx.createLinearGradient(0, 0, W, H);
            goldGrad.addColorStop(0, '#c59b27');
            goldGrad.addColorStop(0.25, '#fef08a');
            goldGrad.addColorStop(0.5, '#b48608');
            goldGrad.addColorStop(0.75, '#facc15');
            goldGrad.addColorStop(1, '#92400e');

            // Внешний массивный золотой кант
            ctx.strokeStyle = goldGrad;
            ctx.lineWidth = 16;
            ctx.strokeRect(52, 52, W - 104, H - 104);

            // Тонкий внутренний золотой кант
            ctx.strokeStyle = '#b48608';
            ctx.lineWidth = 3;
            ctx.strokeRect(74, 74, W - 148, H - 148);

            // Внутренний декоративный контур
            ctx.strokeStyle = 'rgba(180, 134, 8, 0.45)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(96, 96, W - 192, H - 192);

            // Классические угловые филигранные розетки (Corner Flourishes)
            function drawCornerOrnament(cx, cy, dirX, dirY) {
                ctx.save();
                ctx.translate(cx, cy);
                ctx.strokeStyle = '#b48608';
                ctx.fillStyle = '#d4af37';
                ctx.lineWidth = 2.5;

                ctx.beginPath();
                ctx.moveTo(0, dirY * 46);
                ctx.quadraticCurveTo(dirX * 22, dirY * 22, dirX * 46, 0);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(0, dirY * 26);
                ctx.quadraticCurveTo(dirX * 13, dirY * 13, dirX * 26, 0);
                ctx.stroke();

                // Угловой алмаз (Diamond stud)
                ctx.beginPath();
                ctx.moveTo(dirX * 20, dirY * 20 - 9);
                ctx.lineTo(dirX * 20 + 9, dirY * 20);
                ctx.lineTo(dirX * 20, dirY * 20 + 9);
                ctx.lineTo(dirX * 20 - 9, dirY * 20);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.restore();
            }

            drawCornerOrnament(96, 96, 1, 1);
            drawCornerOrnament(W - 96, 96, -1, 1);
            drawCornerOrnament(96, H - 96, 1, -1);
            drawCornerOrnament(W - 96, H - 96, -1, -1);

            // 4. Парадный официальный герб Красноуфимска
            // По фото официального герба (ГГР № 1027): в зелёном поле серебряный сокол
            // с распростёртыми и опущенными крыльями, стоящий на золотой волнообразной
            // перевязи; щит увенчан золотой башенной короной о пяти зубцах
            const crestX = W / 2;
            const crestY = 208;

            // (Лавровый венок убран: на официальном гербе по фото венка нет)

            // Золотая башенная корона о пяти зубцах (статус уездного / городского округа)
            ctx.save();
            const crownBaseY = crestY - 58;
            ctx.fillStyle = '#ca8a04';
            ctx.strokeStyle = '#fef08a';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(crestX - 52, crownBaseY);
            ctx.lineTo(crestX - 52, crownBaseY - 32); // башня 1
            ctx.lineTo(crestX - 35, crownBaseY - 32);
            ctx.lineTo(crestX - 35, crownBaseY - 18);
            ctx.lineTo(crestX - 22, crownBaseY - 18);
            ctx.lineTo(crestX - 22, crownBaseY - 38); // башня 2
            ctx.lineTo(crestX - 8, crownBaseY - 38);
            ctx.lineTo(crestX - 8, crownBaseY - 18);
            ctx.lineTo(crestX + 8, crownBaseY - 18);
            ctx.lineTo(crestX + 8, crownBaseY - 44);  // центральная башня 3
            ctx.lineTo(crestX + 22, crownBaseY - 44);
            ctx.lineTo(crestX + 22, crownBaseY - 18);
            ctx.lineTo(crestX + 35, crownBaseY - 18);
            ctx.lineTo(crestX + 35, crownBaseY - 32); // башня 4
            ctx.lineTo(crestX + 52, crownBaseY - 32); // башня 5
            ctx.lineTo(crestX + 52, crownBaseY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Каменные швы и бойницы короны
            ctx.strokeStyle = '#854d0e';
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(crestX - 50, crownBaseY - 12); ctx.lineTo(crestX + 50, crownBaseY - 12);
            ctx.moveTo(crestX - 35, crownBaseY - 12); ctx.lineTo(crestX - 35, crownBaseY);
            ctx.moveTo(crestX - 15, crownBaseY - 12); ctx.lineTo(crestX - 15, crownBaseY);
            ctx.moveTo(crestX + 15, crownBaseY - 12); ctx.lineTo(crestX + 15, crownBaseY);
            ctx.moveTo(crestX + 35, crownBaseY - 12); ctx.lineTo(crestX + 35, crownBaseY);
            ctx.stroke();

            // (Драгоценный пояс убран: корона на фото — гладкая золотая кладка)
            ctx.restore();

            // Геральдический щит
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(crestX - 58, crestY - 56);
            ctx.lineTo(crestX + 58, crestY - 56);
            ctx.lineTo(crestX + 58, crestY + 22);
            ctx.quadraticCurveTo(crestX + 52, crestY + 68, crestX, crestY + 86);
            ctx.quadraticCurveTo(crestX - 52, crestY + 68, crestX - 58, crestY + 22);
            ctx.closePath();

            // Изумрудно-зелёное поле герба
            const shieldGrad = ctx.createLinearGradient(crestX - 58, crestY - 56, crestX + 58, crestY + 86);
            shieldGrad.addColorStop(0, '#15803d');
            shieldGrad.addColorStop(0.45, '#166534');
            shieldGrad.addColorStop(1, '#052e16');
            ctx.fillStyle = shieldGrad;
            ctx.fill();

            // Внутренний золотой кант щита
            ctx.strokeStyle = goldGrad;
            ctx.lineWidth = 6;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(crestX - 52, crestY - 50);
            ctx.lineTo(crestX + 52, crestY - 50);
            ctx.lineTo(crestX + 52, crestY + 20);
            ctx.quadraticCurveTo(crestX + 46, crestY + 62, crestX, crestY + 78);
            ctx.quadraticCurveTo(crestX - 46, crestY + 62, crestX - 52, crestY + 20);
            ctx.closePath();
            ctx.strokeStyle = 'rgba(254, 240, 138, 0.75)';
            ctx.lineWidth = 1.6;
            ctx.stroke();

            // Золотая волнообразная перевязь внизу щита (как на фото герба),
            // обрезается по контуру щита через clip
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(crestX - 58, crestY - 56);
            ctx.lineTo(crestX + 58, crestY - 56);
            ctx.lineTo(crestX + 58, crestY + 22);
            ctx.quadraticCurveTo(crestX + 52, crestY + 68, crestX, crestY + 86);
            ctx.quadraticCurveTo(crestX - 52, crestY + 68, crestX - 58, crestY + 22);
            ctx.closePath();
            ctx.clip();
            const bendTop = crestY + 40;
            ctx.beginPath();
            ctx.moveTo(crestX - 62, bendTop);
            for (let wx = -62; wx < 62; wx += 10) {
                ctx.quadraticCurveTo(crestX + wx + 5, bendTop + (((wx + 62) / 10) % 2 === 0 ? -7 : 7), crestX + wx + 10, bendTop);
            }
            ctx.lineTo(crestX + 62, crestY + 92);
            ctx.lineTo(crestX - 62, crestY + 92);
            ctx.closePath();
            const bendGrad = ctx.createLinearGradient(crestX, bendTop - 8, crestX, crestY + 86);
            bendGrad.addColorStop(0, '#fde047');
            bendGrad.addColorStop(1, '#ca8a04');
            ctx.fillStyle = bendGrad;
            ctx.fill();
            ctx.strokeStyle = '#854d0e';
            ctx.lineWidth = 1.4;
            ctx.stroke();
            ctx.restore();

            // Серебряный сокол с распростёртыми крыльями
            // Хвостовые перья
            ctx.fillStyle = '#f1f5f9';
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 1.5;
            for (let t of [-7, 0, 7]) {
                ctx.beginPath();
                ctx.moveTo(crestX + t - 4, crestY + 24);
                ctx.lineTo(crestX + t, crestY + 42);
                ctx.lineTo(crestX + t + 4, crestY + 24);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            // Золотые лапы с когтями, стоящие на земле
            ctx.strokeStyle = '#eab308';
            ctx.fillStyle = '#eab308';
            ctx.lineWidth = 2.4;
            for (let footX of [-12, 12]) {
                ctx.beginPath();
                ctx.moveTo(crestX + footX, crestY + 22);
                ctx.lineTo(crestX + footX - 5, crestY + 39);
                ctx.moveTo(crestX + footX, crestY + 22);
                ctx.lineTo(crestX + footX, crestY + 41);
                ctx.moveTo(crestX + footX, crestY + 22);
                ctx.lineTo(crestX + footX + 5, crestY + 39);
                ctx.stroke();
            }

            // Серебряные крылья, распростёртые и ОПУЩЕННЫЕ вниз (как на фото герба)
            function drawCrestWing(isLeft) {
                const s = isLeft ? -1 : 1;
                ctx.beginPath();
                ctx.moveTo(crestX + s * 8, crestY - 16);
                ctx.quadraticCurveTo(crestX + s * 34, crestY - 12, crestX + s * 48, crestY + 24);
                // 4 веерных пера, опущенных вниз
                ctx.lineTo(crestX + s * 40, crestY + 28);
                ctx.lineTo(crestX + s * 38, crestY + 16);
                ctx.lineTo(crestX + s * 30, crestY + 22);
                ctx.lineTo(crestX + s * 28, crestY + 8);
                ctx.lineTo(crestX + s * 20, crestY + 14);
                ctx.lineTo(crestX + s * 18, crestY + 0);
                ctx.lineTo(crestX + s * 11, crestY + 6);
                ctx.quadraticCurveTo(crestX + s * 9, crestY - 8, crestX + s * 7, crestY - 13);
                ctx.closePath();

                const wingGrad = ctx.createLinearGradient(crestX, crestY - 16, crestX + s * 50, crestY + 28);
                wingGrad.addColorStop(0, '#ffffff');
                wingGrad.addColorStop(1, '#e2e8f0');
                ctx.fillStyle = wingGrad;
                ctx.fill();
                ctx.strokeStyle = '#94a3b8';
                ctx.lineWidth = 1.4;
                ctx.stroke();

                // Прорисовка стволов перьев
                ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
                ctx.lineWidth = 1.1;
                ctx.beginPath();
                ctx.moveTo(crestX + s * 14, crestY - 8);
                ctx.lineTo(crestX + s * 40, crestY + 16);
                ctx.moveTo(crestX + s * 12, crestY - 2);
                ctx.lineTo(crestX + s * 32, crestY + 12);
                ctx.stroke();
            }
            drawCrestWing(true);
            drawCrestWing(false);

            // Серебряное тело сокола
            ctx.beginPath();
            ctx.moveTo(crestX - 9, crestY - 18);
            ctx.quadraticCurveTo(crestX - 16, crestY + 2, crestX - 11, crestY + 22);
            ctx.lineTo(crestX + 11, crestY + 22);
            ctx.quadraticCurveTo(crestX + 16, crestY + 2, crestX + 9, crestY - 18);
            ctx.closePath();
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 1.4;
            ctx.stroke();

            // Оперение груди (тонкие геральдические штрихи)
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 1;
            for (let py of [-8, -1, 6, 13]) {
                ctx.beginPath();
                ctx.arc(crestX, crestY + py, 4.5, 0.2 * Math.PI, 0.8 * Math.PI);
                ctx.stroke();
            }

            // Голова сокола с хохолком
            ctx.beginPath();
            ctx.arc(crestX, crestY - 24, 10.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 1.4;
            ctx.stroke();

            // Острый загнутый золотой клюв влево
            ctx.beginPath();
            ctx.moveTo(crestX - 7, crestY - 27);
            ctx.quadraticCurveTo(crestX - 18, crestY - 25, crestX - 15, crestY - 18);
            ctx.quadraticCurveTo(crestX - 10, crestY - 20, crestX - 6, crestY - 22);
            ctx.closePath();
            ctx.fillStyle = '#eab308';
            ctx.fill();
            ctx.strokeStyle = '#854d0e';
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Лазоревое око сокола
            ctx.beginPath();
            ctx.arc(crestX - 3, crestY - 25, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#0284c7'; // лазоревый
            ctx.fill();
            ctx.beginPath();
            ctx.arc(crestX - 3.8, crestY - 25.8, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff'; // блик
            ctx.fill();

            ctx.restore();

            // Лента основания под щитом
            ctx.save();
            ctx.fillStyle = '#78350f';
            ctx.beginPath();
            ctx.roundRect(crestX - 110, crestY + 92, 220, 28, 7);
            ctx.fill();
            ctx.strokeStyle = '#d4af37';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.font = 'bold 13px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#fef08a';
            ctx.textAlign = 'center';
            const ribbonText = currentLang === 'en' ? '★ 1736 • KRASNOUFIMSK ★' : '★ 1736 • КРАСНОУФИМСК ★';
            ctx.fillText(ribbonText, crestX, crestY + 111);
            ctx.restore();

            // 5. Текстовые блоки диплома
            ctx.textAlign = 'center';

            // Верхний подзаголовок проекта
            ctx.font = '700 24px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#8a6d3b';
            const topHeader = currentLang === 'en' 
                ? '—  HISTORICAL & CULTURAL HERITAGE INITIATIVE  —'
                : '—  НАУЧНО-ИСТОРИЧЕСКИЙ КРАЕВЕДЧЕСКИЙ ПРОЕКТ  —';
            ctx.fillText(topHeader, W / 2, 355);

            // Главный заголовок «ДИПЛОМ ЗНАТОКА»
            ctx.font = 'bold 82px "Playfair Display", Georgia, "Times New Roman", serif';
            const titleGrad = ctx.createLinearGradient(W / 2 - 400, 420, W / 2 + 400, 470);
            titleGrad.addColorStop(0, '#78350f');
            titleGrad.addColorStop(0.35, '#b45309');
            titleGrad.addColorStop(0.65, '#d97706');
            titleGrad.addColorStop(1, '#78350f');
            ctx.fillStyle = titleGrad;
            ctx.fillText(currentLang === 'en' ? 'DIPLOMA OF EXCELLENCE' : 'ДИПЛОМ ЗНАТОКА', W / 2, 445);

            // Название проекта
            ctx.font = '600 27px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#475569';
            ctx.fillText(currentLang === 'en' ? '«KRASNOUFIMSK: THROUGH THE AGES»' : '«КРАСНОУФИМСК: СКВОЗЬ ЭПОХИ»', W / 2, 500);

            // Декоративная разделительная черта с ромбом
            ctx.save();
            ctx.strokeStyle = '#d4af37';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(W / 2 - 300, 536);
            ctx.lineTo(W / 2 - 24, 536);
            ctx.moveTo(W / 2 + 24, 536);
            ctx.lineTo(W / 2 + 300, 536);
            ctx.stroke();

            ctx.fillStyle = '#b48608';
            ctx.beginPath();
            ctx.moveTo(W / 2, 528);
            ctx.lineTo(W / 2 + 9, 536);
            ctx.lineTo(W / 2, 544);
            ctx.lineTo(W / 2 - 9, 536);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // Преамбула вручения
            ctx.font = 'italic 32px "Playfair Display", Georgia, serif';
            ctx.fillStyle = '#5c5346';
            ctx.fillText(currentLang === 'en' ? 'This diploma is proudly awarded to' : 'Настоящим дипломом награждается', W / 2, 598);

            // Имя награждаемого с каллиграфическими виньетками
            let nameSize = 70;
            ctx.font = `bold italic ${nameSize}px "Playfair Display", Georgia, serif`;
            while (ctx.measureText(`❦  ${finalName}  ❦`).width > 1650 && nameSize > 34) {
                nameSize -= 2;
                ctx.font = `bold italic ${nameSize}px "Playfair Display", Georgia, serif`;
            }
            ctx.fillStyle = '#0f172a';
            ctx.fillText(`❦  ${finalName}  ❦`, W / 2, 685);

            // Золотой каллиграфический росчерк под именем
            ctx.save();
            ctx.strokeStyle = '#c59b27';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(W / 2 - 340, 720);
            ctx.quadraticCurveTo(W / 2, 730, W / 2 + 340, 720);
            ctx.stroke();
            ctx.restore();

            // Развернутая торжественная формулировка заслуги
            ctx.font = '400 27px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#334155';
            if (currentLang === 'en') {
                ctx.fillText('For distinguished knowledge of the multi-century history, architecture, and heritage', W / 2, 786);
                ctx.fillText('of Krasnoufimsk from the founding of the Krasny Yar fortress to the modern era of 2026:', W / 2, 828);
            } else {
                ctx.fillText('За отличные знания многовековой истории, уникального архитектурного достояния', W / 2, 786);
                ctx.fillText('и вех развития Красноуфимска со времён основания крепости Красный Яр до эпохи 2026 года:', W / 2, 828);
            }

            // 6. Наградная плашка-картуш уровня сложности и набранного счета
            const plaqueW = 1080;
            const plaqueH = 88;
            const plaqueX = (W - plaqueW) / 2;
            const plaqueY = 878;

            let diffText = '';
            let diffBorder = '#b48608';
            let diffBgStart = 'rgba(254, 243, 199, 0.75)';
            let diffBgEnd = 'rgba(253, 230, 138, 0.45)';
            let diffTextColor = '#92400e';

            if (diff === 'easy') {
                diffText = currentLang === 'en'
                    ? `🌱  BASIC LEVEL  •  SCORE: ${score} OF ${total} (${pct}%)`
                    : `🌱  БАЗОВЫЙ УРОВЕНЬ  •  РЕЗУЛЬТАТ: ${score} ИЗ ${total} (${pct}%)`;
                diffBorder = '#10b981';
                diffBgStart = 'rgba(209, 250, 229, 0.75)';
                diffBgEnd = 'rgba(167, 243, 208, 0.45)';
                diffTextColor = '#065f46';
            } else if (diff === 'medium') {
                diffText = currentLang === 'en'
                    ? `⚡  ADVANCED LEVEL  •  SCORE: ${score} OF ${total} (${pct}%)`
                    : `⚡  ПРОДВИНУТЫЙ УРОВЕНЬ  •  РЕЗУЛЬТАТ: ${score} ИЗ ${total} (${pct}%)`;
                diffBorder = '#0284c7';
                diffBgStart = 'rgba(224, 242, 254, 0.75)';
                diffBgEnd = 'rgba(186, 230, 253, 0.45)';
                diffTextColor = '#0369a1';
            } else {
                diffText = currentLang === 'en'
                    ? `🏆  EXPERT LEVEL  •  SCORE: ${score} OF ${total} (${pct}%)`
                    : `🏆  ЭКСПЕРТНЫЙ УРОВЕНЬ  •  РЕЗУЛЬТАТ: ${score} ИЗ ${total} (${pct}%)`;
                diffBorder = '#d97706';
                diffBgStart = 'rgba(254, 243, 199, 0.75)';
                diffBgEnd = 'rgba(253, 230, 138, 0.45)';
                diffTextColor = '#92400e';
            }

            ctx.save();
            // Фоновый картуш с ленточными ласточкиными вырезами
            const plGrad = ctx.createLinearGradient(plaqueX, plaqueY, plaqueX + plaqueW, plaqueY + plaqueH);
            plGrad.addColorStop(0, diffBgStart);
            plGrad.addColorStop(1, diffBgEnd);
            ctx.fillStyle = plGrad;
            ctx.beginPath();
            ctx.roundRect(plaqueX, plaqueY, plaqueW, plaqueH, 18);
            ctx.fill();
            ctx.strokeStyle = diffBorder;
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.font = 'bold 31px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = diffTextColor;
            ctx.fillText(diffText, W / 2, plaqueY + 56);
            ctx.restore();

            // Оценка экспертной коллегии
            const certDict = i18n[currentLang] || i18n.ru;
            const certFrac = total > 0 ? score / total : 0;
            const appraisal = certFrac >= 0.9
                ? (certDict.quizResult5 || '🏆 Отлично! Вы настоящий знаток истории Красноуфимска!')
                : certFrac >= 0.7
                    ? (certDict.quizResult4 || '👍 Хорошо! Вы хорошо знаете историю города.')
                    : certFrac >= 0.5
                        ? (certDict.quizResult3 || '📖 Неплохо! Почитайте о достопримечательностях подробнее.')
                        : (certDict.quizResult2 || '🔍 Стоит изучить историю города! Пройдите ленту времени.');
            ctx.font = 'italic 28px "Playfair Display", Georgia, serif';
            ctx.fillStyle = '#1e293b';
            ctx.fillText(`«${appraisal}»`, W / 2, 1025);

            // 7. Сбалансированный нижний официальный блок:
            // Слева: Реестровый номер, дата, защита и формат А4
            // По центру: Торжественная 24-лучевая золотая печать с шелковыми лентами
            // Справа: Официальный блок проекта «Красноуфимск 2026» и бессрочная валидация

            const baseLineY = 1275;

            // --- Левая колонка (Реестр и валидация) ---
            ctx.save();
            ctx.textAlign = 'left';

            const serialCode = String((score * 79 + total * 41 + (new Date().getDate())) % 8999 + 1000);
            const serialNum = (currentLang === 'en' ? 'KF-2026-' : 'КФ-2026-') + serialCode;
            const dateStr = new Date().toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            ctx.font = 'bold 22px "Segoe UI", Arial, monospace';
            ctx.fillStyle = '#0f172a';
            ctx.fillText(currentLang === 'en' ? `COMMEMORATIVE NO. ${serialNum}` : `НОМЕР ПАМЯТНОГО ДИПЛОМА ${serialNum}`, 220, baseLineY - 45);

            ctx.font = '500 20px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#475569';
            ctx.fillText(currentLang === 'en' ? `Issue Date: ${dateStr}` : `Дата выдачи: ${dateStr}`, 220, baseLineY - 12);
            ctx.fillText(currentLang === 'en' ? 'Status: Commemorative project diploma' : 'Статус: Памятный диплом проекта', 220, baseLineY + 20);
            ctx.fillText(currentLang === 'en' ? 'Format: Print-ready A4 image (ISO 216)' : 'Формат: Печатное изображение А4 (ISO 216)', 220, baseLineY + 52);

            // Защитные микро-штрихи подлинности
            ctx.fillStyle = '#94a3b8';
            let bx = 220;
            const barHeights = [24, 18, 24, 24, 14, 24, 20, 24, 16, 24, 18, 24, 24, 14, 24, 20, 24, 18, 24, 24, 14, 24];
            for (let b = 0; b < barHeights.length; b++) {
                ctx.fillRect(bx, baseLineY + 82, (b % 3 === 0 ? 4 : 2), 22);
                bx += (b % 3 === 0 ? 8 : 6);
            }
            ctx.restore();

            // --- Центральная колонка (24-лучевая золотая печать с шелковыми лентами) ---
            const sealX = W / 2;
            const sealY = 1275;

            // Алые шелковые ленты (Crimson Silk Ribbons)
            ctx.save();
            function drawRibbonTail(startX, startY, endX, endY, ctrlX, ctrlY) {
                const ribGrad = ctx.createLinearGradient(startX, startY, endX, endY);
                ribGrad.addColorStop(0, '#991b1b');
                ribGrad.addColorStop(0.5, '#b91c1c');
                ribGrad.addColorStop(1, '#7f1d1d');
                ctx.fillStyle = ribGrad;
                ctx.beginPath();
                ctx.moveTo(startX - 24, startY);
                ctx.quadraticCurveTo(ctrlX - 24, ctrlY, endX - 28, endY);
                ctx.lineTo(endX, endY - 20);
                ctx.lineTo(endX + 28, endY);
                ctx.quadraticCurveTo(ctrlX + 24, ctrlY, startX + 24, startY);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#d4af37';
                ctx.lineWidth = 1.8;
                ctx.stroke();
            }
            drawRibbonTail(sealX - 26, sealY + 42, sealX - 74, sealY + 195, sealX - 56, sealY + 115);
            drawRibbonTail(sealX + 26, sealY + 42, sealX + 74, sealY + 195, sealX + 56, sealY + 115);
            ctx.restore();

            // 24-лучевая золотая печать
            ctx.save();
            ctx.translate(sealX, sealY);

            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetY = 8;

            ctx.beginPath();
            const points = 24;
            const outerR = 104;
            const innerR = 91;
            for (let i = 0; i < points * 2; i++) {
                const r = (i % 2 === 0) ? outerR : innerR;
                const angle = (i * Math.PI) / points;
                const px = Math.cos(angle) * r;
                const py = Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();

            const sealGrad = ctx.createRadialGradient(-16, -22, 10, 0, 0, outerR);
            sealGrad.addColorStop(0, '#fef08a');
            sealGrad.addColorStop(0.4, '#eab308');
            sealGrad.addColorStop(0.7, '#ca8a04');
            sealGrad.addColorStop(1, '#854d0e');
            ctx.fillStyle = sealGrad;
            ctx.fill();

            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = '#fef08a';
            ctx.lineWidth = 2.8;
            ctx.stroke();

            // Внутренние кольца печати
            ctx.strokeStyle = '#92400e';
            ctx.lineWidth = 3.2;
            ctx.beginPath();
            ctx.arc(0, 0, 78, 0, Math.PI * 2);
            ctx.stroke();

            // Золотые бусины по окружности (32 шт)
            ctx.fillStyle = '#fef08a';
            for (let i = 0; i < 32; i++) {
                const ang = (i * Math.PI * 2) / 32;
                ctx.beginPath();
                ctx.arc(Math.cos(ang) * 70, Math.sin(ang) * 70, 2.4, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.strokeStyle = '#78350f';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.arc(0, 0, 62, 0, Math.PI * 2);
            ctx.stroke();

            // Текст внутри печати (двуязычный)
            ctx.textAlign = 'center';
            ctx.font = 'bold 15px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#451a03';
            ctx.fillText(currentLang === 'en' ? 'KRASNOUFIMSK' : 'КРАСНОУФИМСК', 0, -24);

            ctx.font = 'bold 23px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#78350f';
            ctx.fillText('★ 1736 ★', 0, 4);

            ctx.font = 'bold 12px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#451a03';
            ctx.fillText(currentLang === 'en' ? 'PROJECT SEAL' : 'ПЕЧАТЬ ПРОЕКТА', 0, 24);
            ctx.fillText(currentLang === 'en' ? 'MERIT AWARD' : 'ЗНАК КАЧЕСТВА', 0, 40);

            ctx.restore();

            // --- Правая колонка: Официальный блок проекта «Красноуфимск 2026» ---
            ctx.save();
            ctx.textAlign = 'right';

            ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#0f172a';
            ctx.fillText(currentLang === 'en' ? 'Heritage Project «Krasnoufimsk 2026»' : 'Краеведческий проект «Красноуфимск 2026»', W - 220, baseLineY - 45);

            ctx.font = '500 20px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#475569';
            ctx.fillText('krasnoufimsk-history.site', W - 220, baseLineY - 12);
            ctx.fillText(currentLang === 'en' ? 'Generated locally in your browser' : 'Сформировано локально в браузере', W - 220, baseLineY + 20);
            ctx.fillText(currentLang === 'en' ? 'Commemorative named diploma' : 'Памятный именной диплом знатока', W - 220, baseLineY + 52);

            // Защитные микро-штрихи справа
            ctx.fillStyle = '#94a3b8';
            let rx = W - 220;
            for (let b = 0; b < barHeights.length; b++) {
                ctx.fillRect(rx - (b % 3 === 0 ? 8 : 6), baseLineY + 82, (b % 3 === 0 ? 4 : 2), 22);
                rx -= (b % 3 === 0 ? 8 : 6);
            }
            ctx.restore();

            // 8. Нижний микропринт (Microprint Footer)
            ctx.textAlign = 'center';
            ctx.font = '400 17px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(currentLang === 'en'
                ? 'Krasnoufimsk • Sverdlovsk Region • Educational Heritage Portal 2026 • A4 sheet format (297 × 210 mm)'
                : 'Красноуфимск • Свердловская область • Научно-образовательный портал 2026 • Формат листа А4 (297 × 210 мм)',
                W / 2, H - 70);

            // Инициируем скачивание диплома
            const translit = {а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'shch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya',А:'A',Б:'B',В:'V',Г:'G',Д:'D',Е:'E',Ё:'E',Ж:'Zh',З:'Z',И:'I',Й:'Y',К:'K',Л:'L',М:'M',Н:'N',О:'O',П:'P',Р:'R',С:'S',Т:'T',У:'U',Ф:'F',Х:'Kh',Ц:'Ts',Ч:'Ch',Ш:'Sh',Щ:'Shch',Ъ:'',Ы:'Y',Ь:'',Э:'E',Ю:'Yu',Я:'Ya'};
            const safeName = (finalName.split('').map(ch => translit[ch] ?? ch).join('').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || 'Explorer').slice(0, 60);
            const safeDiff = diff.toUpperCase();
            const link = document.createElement('a');
            link.download = `Diplom_Krasnoufimsk_${safeDiff}_${safeName}.jpg`;
            link.href = canvas.toDataURL('image/jpeg', 0.92);
            link.click();

            if (typeof launchConfetti === 'function') {
                launchConfetti({ count: 95 });
            }
        }

        /* ==========================================================================
           САЛЮТ КОНФЕТТИ (NATIVE CANVAS CONFETTI ENGINE)
           Легковесный, автономный салют с 3D-вращением и благородной уральской палитрой.
           ========================================================================== */
        function launchConfetti(opts = {}) {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const count = opts.count || 90;
            const colors = opts.colors || ['#f59e0b', '#fbbf24', '#10b981', '#06b6d4', '#3b82f6', '#ec4899', '#ffffff'];

            let canvas = document.getElementById('confetti-canvas');
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            canvas = document.createElement('canvas');
            canvas.id = 'confetti-canvas';
            canvas.style.position = 'fixed';
            canvas.style.inset = '0';
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '999999';
            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);

            const particles = [];
            for (let i = 0; i < count; i++) {
                const isLeft = Math.random() < 0.5;
                const startX = opts.origin ? (opts.origin.x * w) : (isLeft ? w * 0.15 : w * 0.85);
                const startY = opts.origin ? (opts.origin.y * h) : (h * 0.82);
                const baseAngle = isLeft ? -0.32 * Math.PI : -0.68 * Math.PI;
                const angle = baseAngle + (Math.random() - 0.5) * 0.55;
                const speed = Math.random() * 16 + 11;

                particles.push({
                    x: startX,
                    y: startY,
                    vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
                    vy: Math.sin(angle) * speed,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 8 + 6,
                    aspect: Math.random() * 0.6 + 0.4,
                    tilt: Math.random() * 10,
                    tiltSpeed: Math.random() * 0.12 + 0.05,
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 8,
                    gravity: 0.38,
                    drag: 0.982,
                    opacity: 1,
                    decay: Math.random() * 0.008 + 0.005,
                    shape: Math.random() > 0.3 ? 'rect' : 'circle'
                });
            }

            let animationId = null;
            const startTime = performance.now();

            function frame(now) {
                ctx.clearRect(0, 0, w, h);
                let alive = 0;

                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    if (p.opacity <= 0 || p.y > h + 50) continue;
                    alive++;

                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += p.gravity;
                    p.vx *= p.drag;
                    p.vy *= p.drag;
                    p.tilt += p.tiltSpeed;
                    p.rotation += p.rotationSpeed;
                    p.opacity -= p.decay;

                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.globalAlpha = Math.max(0, p.opacity);
                    ctx.fillStyle = p.color;

                    const scaleX = Math.cos(p.tilt);
                    if (p.shape === 'rect') {
                        ctx.fillRect(-p.size / 2 * scaleX, -p.size * p.aspect / 2, p.size * scaleX, p.size * p.aspect);
                    } else {
                        ctx.beginPath();
                        ctx.arc(0, 0, (p.size / 2) * Math.abs(scaleX), 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                }

                if (alive > 0 && (now - startTime) < 4000) {
                    animationId = requestAnimationFrame(frame);
                } else {
                    if (canvas && canvas.parentNode) {
                        canvas.parentNode.removeChild(canvas);
                    }
                }
            }

            animationId = requestAnimationFrame(frame);
        }
        window.launchConfetti = launchConfetti;

        window.addEventListener('load', function () {
            window.scrollTo(0, 0);
        });

/* ---- next original script block ---- */

// Modal Scroll Bleed Protection
        document.addEventListener('click', function (e) {
            setTimeout(function () {
                let isModalOpen = false;

                const weather = document.getElementById('weather-modal-backdrop');
                if (weather && weather.classList.contains('active')) isModalOpen = true;

                const passport = document.getElementById('passport-modal');
                if (passport && passport.classList.contains('active')) isModalOpen = true;

                const mobilePanel = document.getElementById('mobile-nav-panel');
                if (mobilePanel && mobilePanel.classList.contains('open')) isModalOpen = true;

                if (isModalOpen) {
                    document.body.classList.add('modal-open');
                } else {
                    document.body.classList.remove('modal-open');
                    document.body.style.overflow = '';
                }
            }, 60);
        });

/* ---- next original script block ---- */

// ==========================================
        // ГЕНЕРАЦИЯ И СКАЧИВАНИЕ PDF ЧЕРЕЗ PDFMAKE
        // ==========================================
        function downloadGuidePDF() {
            const btnText = document.querySelector('.guide-download-btn span:last-child');
            const originalText = btnText ? btnText.innerText : 'Сохранить';
            if (btnText) btnText.innerText = 'Генерация PDF...';

            // pdfMake: сначала локальная копия (работает офлайн после установки PWA), затем CDN с SRI как резерв.
            const loadScript = (src, integrity) => new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                if (integrity) { script.integrity = integrity; script.crossOrigin = 'anonymous'; script.referrerPolicy = 'no-referrer'; }
                script.onload = () => resolve();
                script.onerror = () => reject(new Error('Failed to load ' + src));
                document.head.appendChild(script);
            });
            const ensurePdfMake = async () => {
                if (typeof pdfMake !== 'undefined') return;
                try {
                    await loadScript('vendor/pdfmake.min.js');
                    await loadScript('vendor/vfs_fonts.js');
                } catch (localErr) {
                    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js', 'sha512-a9NgEEK7tsCvABL7KqtUTQjl69z7091EVPpw5KxPlZ93T141ffe1woLtbXTX+r2/8TtTvRX/v4zTL2UlMUPgwg==');
                    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js', 'sha512-pAoMgvsSBQTe8P3og+SAnjILwnti03Kz92V3Mxm0WOtHuA482QeldNM5wEdnKwjOnQ/X11IM6Dn3nbmvOz365g==');
                }
            };
            ensurePdfMake().then(() => executePdfMake(btnText, originalText)).catch(() => {
                alert((typeof currentLang !== 'undefined' && currentLang === 'en')
                    ? 'Failed to load the PDF library from local files or CDN. Please check your connection.'
                    : 'Ошибка загрузки библиотеки PDF из локальных файлов и CDN. Проверьте соединение.');
                if (btnText) btnText.innerText = originalText;
            });
        }

        function executePdfMake(btnText, originalText) {
            try {
                if (typeof unlockAchievement === 'function') {
                    unlockAchievement('guide_reader');
                }
                const isRu = typeof currentLang !== 'undefined' ? currentLang === 'ru' : true;
                const dict = i18n[isRu ? 'ru' : 'en'];
                const routeRows = [1, 2, 3].map(n => ([{
                    fillColor: n % 2 ? '#f8fafc' : '#ffffff',
                    margin: [4, 4, 4, 4],
                    stack: [
                        { text: `${n}. ${dict['r' + n + 'Title']}`, bold: true, fontSize: 9.5, color: '#0f172a' },
                        { text: `${dict.rTime} ${dict['r' + n + 'TimeVal']}   |   ${dict.rDist} ${dict['r' + n + 'DistVal']}`, fontSize: 8, color: n === 1 ? '#b45309' : (n === 2 ? '#0284c7' : '#059669'), bold: true, margin: [0, 1, 0, 1] },
                        { text: `► ${dict.rPoints} ${dict['r' + n + 'PointsVal']}`, fontSize: 8, color: '#334155' },
                        { text: dict['r' + n + 'Desc'], fontSize: 7.5, color: '#64748b', italics: true, margin: [0, 1, 0, 0] }
                    ]
                }]));
                const chronicleRows = [1, 2, 3, 4, 5, 6, 7].map(n => {
                    const raw = dict['printHist' + n] || '';
                    const match = raw.match(/<strong>(.*?)<\/strong>\s*[—-]\s*(.*)/);
                    const strip = value => String(value || '').replace(/<[^>]+>/g, '');
                    return [
                        { text: match ? strip(match[1]) : '', bold: true, color: '#b45309', fontSize: 8.5 },
                        { text: match ? strip(match[2]) : strip(raw), fontSize: 8.5 }
                    ];
                });
                const pdfSightDirectory = ['museum', 'mizerov', 'vokzal', 'sobor', 'naberezhnaya']
                    .map(id => sightsData.find(sight => sight.id === id))
                    .filter(Boolean)
                    .map(sight => `${sight.title[isRu ? 'ru' : 'en']}: ${sight.address[isRu ? 'ru' : 'en']}`);

                const docDefinition = {
                    pageSize: 'A4',
                    pageMargins: [ 36, 36, 36, 42 ],
                    footer: function(currentPage, pageCount) {
                        return {
                            columns: [
                                {
                                    text: isRu 
                                        ? 'Красноуфимск • Сквозь эпохи  |  Выполнен в ходе индивидуального проекта • 2026' 
                                        : 'Krasnoufimsk • Through the Ages  |  Completed as part of an individual project • 2026',
                                    fontSize: 8,
                                    color: '#94a3b8',
                                    margin: [36, 0, 0, 0]
                                },
                                {
                                    text: `${currentPage} / ${pageCount}`,
                                    alignment: 'right',
                                    fontSize: 8,
                                    color: '#94a3b8',
                                    margin: [0, 0, 36, 0]
                                }
                            ]
                        };
                    },
                    content: [
                        // Верхний фирменный блок (Шапка + Вечный QR-код)
                        {
                            columns: [
                                {
                                    width: '*',
                                    stack: [
                                        { text: isRu ? 'КРАСНОУФИМСК' : 'KRASNOUFIMSK', style: 'brandTitle' },
                                        { text: isRu ? 'СКВОЗЬ ЭПОХИ • ПУТЕВОДИТЕЛЬ ИНДИВИДУАЛЬНОГО ПРОЕКТА' : 'THROUGH THE AGES • INDIVIDUAL PROJECT GUIDE', style: 'brandSubtitle' },
                                        { text: isRu ? '290 ЛЕТ ИСТОРИИ (1736–2026) • СВЕРДЛОВСКАЯ ОБЛАСТЬ' : '290 YEARS OF HISTORY (1736–2026) • SVERDLOVSK REGION', style: 'brandTag' },
                                        { text: isRu ? 'Координаты: 56,6167° с.ш., 57,7667° в.д. | Живописный берег реки Уфы' : 'Coordinates: 56.6167° N, 57.7667° E | Scenic banks of the Ufa River', style: 'brandCoords' }
                                    ]
                                },
                                {
                                    width: 95,
                                    alignment: 'right',
                                    stack: [
                                        { qr: 'https://krasnoufimsk-history.site/', fit: 68, alignment: 'right' },
                                        { text: 'krasnoufimsk-history.site', fontSize: 6.5, color: '#475569', alignment: 'right', margin: [0, 3, 0, 0] },
                                        { text: isRu ? 'Наведите камеру ↗' : 'Scan with camera ↗', fontSize: 6.5, color: '#b45309', bold: true, alignment: 'right' }
                                    ]
                                }
                            ],
                            margin: [0, 0, 0, 10]
                        },

                        // Золотая акцентная линия
                        {
                            table: {
                                widths: ['*'],
                                body: [[{ text: '', fillColor: '#d97706', height: 2 }]]
                            },
                            layout: 'noBorders',
                            margin: [0, 0, 0, 10]
                        },

                        // Блок 1: Хроника и вехи истории
                        { text: isRu ? '■ ХРОНИКА И ВЕХИ ГОРОДА' : '■ CHRONICLE & HISTORICAL MILESTONES', style: 'sectionTitle' },
                        {
                            table: {
                                widths: ['18%', '82%'],
                                body: chronicleRows
                            },
                            layout: {
                                hLineWidth: () => 0.5,
                                vLineWidth: () => 0,
                                hLineColor: () => '#e2e8f0',
                                paddingTop: () => 2.5,
                                paddingBottom: () => 2.5
                            },
                            margin: [0, 0, 0, 10]
                        },

                        // Блок 2: 3 Официальных пешеходных маршрута с сайта
                        { text: isRu ? '■ 3 ТУРИСТИЧЕСКИХ МАРШРУТА' : '■ 3 SIGHTSEEING ROUTES', style: 'sectionTitle' },
                        {
                            table: {
                                widths: ['*'],
                                body: routeRows
                            },
                            layout: {
                                hLineWidth: () => 0.5,
                                vLineWidth: () => 0.5,
                                hLineColor: () => '#cbd5e1',
                                vLineColor: () => '#cbd5e1'
                            },
                            margin: [0, 0, 0, 10]
                        },

                        // Блок 3: 2 Колонки: Адреса достопримечательностей + Памятка и связь
                        {
                            columns: [
                                {
                                    width: '52%',
                                    stack: [
                                        { text: isRu ? '■ АДРЕСА ДОСТОПРИМЕЧАТЕЛЬНОСТЕЙ' : '■ SIGHTS DIRECTORY', style: 'sectionSubTitle' },
                                        {
                                            ul: pdfSightDirectory,
                                            fontSize: 7.5,
                                            color: '#334155',
                                            lineHeight: 1.25
                                        }
                                    ]
                                },
                                {
                                    width: '48%',
                                    stack: [
                                        { text: isRu ? '■ ПАМЯТКА И ЭКСТРЕННАЯ СВЯЗЬ' : '■ TRAVEL MEMO & CONTACTS', style: 'sectionSubTitle' },
                                        {
                                            ul: isRu ? [
                                                'Единая служба спасения: 112 (бесплатно)',
                                                'Автовокзал Красноуфимск: ул. Станционная, 12А',
                                                'Ж/д вокзал Красноуфимск: единый тел. 8 (800) 775-00-00',
                                                'Сувениры: Сувенирная лавка Краеведческого музея',
                                                'Гастрономия: Уральские шаньги в кафе центра города'
                                            ] : [
                                                'Emergency dispatch: 112 (toll-free)',
                                                'Central Bus Station: 12A Stantsionnaya St.',
                                                'Railway Station: 11 Stantsionnaya St.',
                                                'Souvenirs: Museum Gift Shop (42 Sovetskaya St.)',
                                                'Gastronomy: Traditional Ural shangi in downtown cafes'
                                            ],
                                            fontSize: 7.5,
                                            color: '#334155',
                                            lineHeight: 1.25
                                        }
                                    ]
                                }
                            ],
                            margin: [0, 0, 0, 10]
                        },

                        // Нижняя плашка с вечной ссылкой
                        {
                            table: {
                                widths: ['*'],
                                body: [
                                    [
                                        {
                                            fillColor: '#0f172a',
                                            margin: [6, 6, 6, 6],
                                            alignment: 'center',
                                            stack: [
                                                { text: isRu ? '► ИССЛЕДУЙТЕ КРАСНОУФИМСК ОНЛАЙН' : '► EXPLORE KRASNOUFIMSK ONLINE', bold: true, fontSize: 9, color: '#f59e0b' },
                                                { text: isRu ? 'Интерактивная лента времени, викторина, паспорт исследователя и погода:' : 'Interactive timeline, quiz, explorer passport, and live 7-day weather:', fontSize: 7.5, color: '#94a3b8', margin: [0, 2, 0, 2] },
                                                { text: 'https://krasnoufimsk-history.site/', fontSize: 8.5, bold: true, color: '#38bdf8' }
                                            ]
                                        }
                                    ]
                                ]
                            },
                            layout: 'noBorders'
                        }
                    ],
                    styles: {
                        brandTitle: { fontSize: 18, bold: true, color: '#0f172a', letterSpacing: 0.5 },
                        brandSubtitle: { fontSize: 8.5, bold: true, color: '#d97706', margin: [0, 1, 0, 1] },
                        brandTag: { fontSize: 7, bold: true, color: '#475569' },
                        brandCoords: { fontSize: 6.5, color: '#64748b', margin: [0, 1, 0, 0] },
                        sectionTitle: { fontSize: 10, bold: true, color: '#0f172a', margin: [0, 4, 0, 4] },
                        sectionSubTitle: { fontSize: 8.5, bold: true, color: '#0f172a', margin: [0, 2, 0, 2] }
                    },
                    defaultStyle: { font: 'Roboto' }
                };

                const fileName = isRu ? 'Krasnoufimsk_Tourist_Guide.pdf' : 'Krasnoufimsk_Tourist_Guide_EN.pdf';
                pdfMake.createPdf(docDefinition).download(fileName);

                if (typeof launchConfetti === 'function') {
                    launchConfetti({ count: 65 });
                }

                setTimeout(() => {
                    if (btnText) btnText.innerText = originalText;
                }, 1000);

            } catch (error) {
                console.error(error);
                alert(typeof currentLang !== 'undefined' && currentLang === 'en' ? 'Error generating PDF' : 'Произошла ошибка при создании PDF');
                if (btnText) btnText.innerText = originalText;
            }
        }
    
        // Инициализация интерактивной карты памятников
        window.addEventListener('DOMContentLoaded', function() {
            lazyInitSightsMap();
        });
        window.addEventListener('resize', function() {
            if (sightsMap) sightsMap.invalidateSize();
        });

        /* =========================================================================
           [13. ПАСПОРТ ИССЛЕДОВАТЕЛЯ И ХАРДКОРНЫЕ ДОСТИЖЕНИЯ — 2026]
           ========================================================================= */
        const PASSPORT_STORAGE_KEY = 'krasnoufimsk_passport_v3';

        const PASSPORT_BADGES = [
            {
                id: 'all_sights_master',
                icon: '🏛️',
                title: { ru: '«Главный краевед Урала»', en: 'Master Ural Historian' },
                desc: { ru: 'Изучить все 27 достопримечательностей города в каталоге (27 из 27)', en: 'Explore all 27 city sights and monuments in the catalogue (27/27)' },
                target: sightsData.length
            },
            {
                id: 'chrono_master',
                icon: '📜',
                title: { ru: '«Повелитель всех эпох»', en: 'Master of All Epochs' },
                desc: { ru: 'Изучить все 21 историческую эпоху на ленте времени от 1736 до 2026 года (21 из 21)', en: 'Explore all 21 historical epochs on timeline from 1736 to 2026 (21/21)' },
                target: 21
            },
            {
                id: 'quiz_erudite',
                icon: '🎯',
                title: { ru: '«Абсолютный эрудит»', en: 'Absolute Erudite' },
                desc: { ru: 'Пройти любой уровень викторины на 100% без единой ошибки', en: 'Complete any quiz level with a perfect 100% score' },
                target: 1
            },
            {
                id: 'season_master',
                icon: '🍁',
                title: { ru: '«Властелин 4 сезонов»', en: 'Master of 4 Seasons' },
                desc: { ru: 'Опробовать все 4 сезонные темы оформления сайта: Осень, Зиму, Весну и Лето (4 из 4)', en: 'Experience all 4 seasonal themes: Autumn, Winter, Spring, Summer (4/4)' },
                target: 4
            },
            {
                id: 'route_planner_pro',
                icon: '🧭',
                title: { ru: '«Штурман экспедиции»', en: 'Expedition Navigator' },
                desc: { ru: 'Открыть «Умный планировщик» и рассчитать маршрут и бюджет поездки в Красноуфимск', en: 'Open Smart Travel Planner and calculate your journey to Krasnoufimsk' },
                target: 1
            },
            {
                id: 'railway_trio',
                icon: '🚂',
                title: { ru: '«Магистраль виадуков»', en: 'Railway & Viaducts Trio' },
                desc: { ru: 'Изучить все 3 ж/д объекта: вокзал (мастерская Щусева), паровоз Л-1699 и вековой виадук (3 из 3)', en: 'Explore all 3 railway landmarks: Shchusev workshop station, L-1699 train & viaduct (3/3)' },
                target: 3
            },
            {
                id: 'cossack_fortress',
                icon: '⚔️',
                title: { ru: '«Казачья застава»', en: 'Cossack Fortress Guard' },
                desc: { ru: 'Изучить все 3 казачьих памятника: Казачью избу 18 в., Сторожевую башню и Бравого казака (3 из 3)', en: 'Explore all 3 Cossack monuments: 18th-century hut, Watchtower & Brave Cossack (3/3)' },
                target: 3
            },
            {
                id: 'nature_wonders',
                icon: '🌲',
                title: { ru: '«Заповедный Красноуфимск»', en: 'Wild Nature Wonders' },
                desc: { ru: 'Изучить 4 памятника природы: набережную Уфы, Дивью гору, Соколий камень и сосновые боры (4 из 4)', en: 'Explore 4 nature wonders: Ufa embankment, Divya Mountain, Falcon Rock & pine forests (4/4)' },
                target: 4
            },
            {
                id: 'map_explorer',
                icon: '🗺️',
                title: { ru: '«Картограф Урала»', en: 'Ural Cartographer' },
                desc: { ru: 'Исследовать не менее 15 уникальных меток на интерактивной карте города (15 из 15)', en: 'Explore at least 15 unique interactive markers on the city map (15/15)' },
                target: 15
            },
            {
                id: 'zemstvo_healer',
                icon: '🩺',
                title: { ru: '«Наследие Мизерова»', en: 'Mizerov Medical Heritage' },
                desc: { ru: 'Изучить комплекс земской медицины: музей земской больницы и парк «Целитель» (2 из 2)', en: 'Explore the zemstvo medicine complex: the Zemstvo Hospital Museum and Tselitel Park (2/2)' },
                target: 2
            },
            {
                id: 'guide_reader',
                icon: '📄',
                title: { ru: '«Сертифицированный турист»', en: 'Certified Tourist' },
                desc: { ru: 'Сформировать и скачать PDF-путеводитель по Красноуфимску', en: 'Generate and download the Krasnoufimsk PDF guide' },
                target: 1
            },
            {
                id: 'honorary_citizen',
                icon: '👑',
                title: { ru: '«Почётный гражданин»', en: 'Honorary Citizen' },
                desc: { ru: 'Завоевать все 11 хардкорных достижений Красноуфимска (11 из 11)', en: 'Complete all 11 hardcore achievements of Krasnoufimsk (11/11)' },
                target: 11
            }
        ];

        let isPassportLoaded = false;
        let passportState = {
            name: 'Исследователь',
            avatar: '🧭',
            unlocked: {},
            progress: {
                sights_viewed: [],
                timeline_viewed: [],
                seasons_viewed: [],
                map_markers_viewed: []
            }
        };

        function loadPassportState() {
            try {
                const saved = safeStorageGet(PASSPORT_STORAGE_KEY, null);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (parsed && typeof parsed === 'object') {
                        if (parsed.name) passportState.name = parsed.name;
                        if (parsed.avatar) passportState.avatar = parsed.avatar;
                        if (parsed.unlocked && typeof parsed.unlocked === 'object') passportState.unlocked = parsed.unlocked;
                        if (parsed.progress && typeof parsed.progress === 'object') {
                            passportState.progress = parsed.progress;
                        }
                    }
                }
            } catch (e) {
                console.warn('Passport load notice:', e);
            }
            if (!Array.isArray(passportState.progress.sights_viewed)) {
                passportState.progress.sights_viewed = Array.isArray(passportState.progress.arch_viewed) ? passportState.progress.arch_viewed : [];
            }
            if (!Array.isArray(passportState.progress.timeline_viewed)) {
                passportState.progress.timeline_viewed = [];
            }
            if (!Array.isArray(passportState.progress.seasons_viewed)) {
                passportState.progress.seasons_viewed = [];
            }
            if (!Array.isArray(passportState.progress.map_markers_viewed)) {
                passportState.progress.map_markers_viewed = [];
            }
            // Merged catalogue cards retain their progress under the surviving object.
            const mergedSightIds = {
                'ambulatoria': 'mizerov',
                'memorial-boards': 'uchilische',
                'alleya-geroev': 'alleya-pamyati'
            };
            const validSightIds = new Set(sightsData.map(sight => sight.id));
            const normalizeSightProgress = ids => [...new Set(ids.map(id => mergedSightIds[id] || id))].filter(id => validSightIds.has(id));
            passportState.progress.sights_viewed = normalizeSightProgress(passportState.progress.sights_viewed);
            passportState.progress.map_markers_viewed = normalizeSightProgress(passportState.progress.map_markers_viewed);
            isPassportLoaded = true;
            updatePassportBadgeCount();
            checkAutoAchievements();
        }

        function savePassportState() {
            if (!isPassportLoaded) {
                loadPassportState();
            }
            try {
                safeStorageSet(PASSPORT_STORAGE_KEY, JSON.stringify(passportState));
            } catch (e) {
                console.warn('Passport save notice:', e);
            }
            updatePassportBadgeCount();
        }

        function getUnlockedCount() {
            return Object.keys(passportState.unlocked).length;
        }

        function updatePassportBadgeCount() {
            const count = getUnlockedCount();
            const badge = document.getElementById('achieve-count-badge');
            if (badge) {
                badge.textContent = count;
                badge.classList.remove('pulse');
                void badge.offsetWidth;
                badge.classList.add('pulse');
            }
            const mobileBadge = document.getElementById('mobile-achieve-count-badge');
            if (mobileBadge) {
                mobileBadge.textContent = `${count}/${PASSPORT_BADGES.length}`;
            }
        }

        function checkAutoAchievements() {
            try {
                // Если был открыт планировщик
                if (safeStorageGet('kuf_planner_opened', null) === 'true') {
                    if (!passportState.unlocked['route_planner_pro']) {
                        unlockAchievement('route_planner_pro');
                    }
                }
                // Если викторина сдана на 100% (не менее 10 вопросов)
                if (typeof window.lastQuizScore === 'number' && typeof window.lastQuizTotal === 'number'
                    && window.lastQuizScore === window.lastQuizTotal && window.lastQuizTotal >= 10) {
                    if (!passportState.unlocked['quiz_erudite']) {
                        unlockAchievement('quiz_erudite');
                    }
                }
            } catch (e) {
                console.warn('Auto achieve check:', e);
            }
        }

        window.trackTimelineEpoch = function(eventId) {
            if (!isPassportLoaded) loadPassportState();
            if (!Array.isArray(passportState.progress.timeline_viewed)) {
                passportState.progress.timeline_viewed = [];
            }
            if (eventId && !passportState.progress.timeline_viewed.includes(eventId)) {
                passportState.progress.timeline_viewed.push(eventId);
                savePassportState();
            }
            if (passportState.progress.timeline_viewed.length >= 21 && typeof unlockAchievement === 'function') {
                unlockAchievement('chrono_master');
            }
        };

        window.trackSeasonExplored = function(season) {
            if (!isPassportLoaded) loadPassportState();
            if (!['winter', 'spring', 'summer', 'autumn'].includes(season)) return;
            if (!Array.isArray(passportState.progress.seasons_viewed)) {
                passportState.progress.seasons_viewed = [];
            }
            if (!passportState.progress.seasons_viewed.includes(season)) {
                passportState.progress.seasons_viewed.push(season);
                savePassportState();
            }
            const all4 = ['winter', 'spring', 'summer', 'autumn'];
            if (all4.every(s => passportState.progress.seasons_viewed.includes(s))) {
                unlockAchievement('season_master');
            }
        };

        window.trackPlannerOpen = function() {
            try {
                safeStorageSet('kuf_planner_opened', 'true');
            } catch (e) {}
            unlockAchievement('route_planner_pro');
        };

        function unlockAchievement(id) {
            if (!isPassportLoaded) loadPassportState();
            if (passportState.unlocked[id]) return;
            const badge = PASSPORT_BADGES.find(b => b.id === id);
            if (!badge) return;

            passportState.unlocked[id] = Date.now();

            // Проверка главного достижения «Почётный гражданин»
            if (id !== 'honorary_citizen') {
                const countOthers = Object.keys(passportState.unlocked).filter(k => k !== 'honorary_citizen').length;
                if (countOthers >= 11 && !passportState.unlocked['honorary_citizen']) {
                    setTimeout(() => unlockAchievement('honorary_citizen'), 1200);
                }
            }

            savePassportState();
            showAchieveToast(badge);

            const modal = document.getElementById('passport-modal');
            if (modal && modal.classList.contains('active')) {
                renderPassportBadges();
            }
        }

        let toastTimer = null;
        function showAchieveToast(badge) {
            const toast = document.getElementById('achieve-toast');
            if (!toast) return;
            const iconEl = document.getElementById('achieve-toast-icon');
            const titleEl = document.getElementById('achieve-toast-title');
            const descEl = document.getElementById('achieve-toast-desc');

            window.lastAchievementBadge = badge;
            const lang = (typeof currentLang !== 'undefined' && currentLang === 'en') ? 'en' : 'ru';
            if (iconEl) iconEl.textContent = badge.icon;
            if (titleEl) titleEl.textContent = badge.title[lang] || badge.title.ru;
            if (descEl) descEl.textContent = badge.desc[lang] || badge.desc.ru;

            toast.classList.add('show');
            if (typeof launchConfetti === 'function') {
                launchConfetti({ count: 45 });
            }
            if (toastTimer) clearTimeout(toastTimer);
            toastTimer = setTimeout(() => {
                hideAchieveToast();
            }, 4500);
        }

        function hideAchieveToast() {
            const toast = document.getElementById('achieve-toast');
            if (toast) toast.classList.remove('show');
        }

        function getPassportRank(unlockedCount, lang) {
            if (lang === 'en') {
                if (unlockedCount >= 12) return '👑 Honorary Citizen';
                if (unlockedCount >= 11) return '⚔️ Master Historian';
                if (unlockedCount >= 9) return '🏅 Krasnoufimsk Connoisseur';
                if (unlockedCount >= 6) return '🧭 Experienced Explorer';
                if (unlockedCount >= 3) return '🎒 Curious Tourist';
                return '🏛️ City Guest';
            }
            if (unlockedCount >= 12) return '👑 Почётный гражданин';
            if (unlockedCount >= 11) return '⚔️ Мастер краеведения';
            if (unlockedCount >= 9) return '🏅 Знаток Красноуфимска';
            if (unlockedCount >= 6) return '🧭 Опытный исследователь';
            if (unlockedCount >= 3) return '🎒 Любознательный турист';
            return '🏛️ Гость города';
        }

        function renderPassportBadges() {
            const grid = document.getElementById('passport-badges-grid');
            if (!grid) return;

            const lang = (typeof currentLang !== 'undefined' && currentLang === 'en') ? 'en' : 'ru';
            const dict = (typeof i18n !== 'undefined' && i18n[lang]) ? i18n[lang] : {};
            const unlockedTag = dict.achieveUnlockedTag || (lang === 'ru' ? 'Получено!' : 'Unlocked!');
            const lockedTag = dict.achieveLockedTag || (lang === 'ru' ? 'В процессе' : 'In progress');

            const unlockedCount = getUnlockedCount();
            const totalBadges = PASSPORT_BADGES.length;
            const pct = Math.round((unlockedCount / totalBadges) * 100);

            // Обновляем шапку профиля
            const nameInput = document.getElementById('passport-user-name');
            if (nameInput) nameInput.value = passportState.name;

            const avatarBtn = document.getElementById('passport-avatar-current');
            if (avatarBtn) avatarBtn.textContent = passportState.avatar;

            const rankBadge = document.getElementById('passport-rank-val');
            if (rankBadge) rankBadge.textContent = getPassportRank(unlockedCount, lang);

            const ratioEl = document.getElementById('passport-progress-ratio');
            if (ratioEl) ratioEl.textContent = `${unlockedCount}/${totalBadges}`;

            const fillEl = document.getElementById('passport-bar-fill');
            if (fillEl) fillEl.style.width = `${pct}%`;

            const sViewed = passportState.progress.sights_viewed || [];
            const tViewed = passportState.progress.timeline_viewed || [];
            const seaViewed = passportState.progress.seasons_viewed || [];
            const mMapViewed = passportState.progress.map_markers_viewed || [];

            let html = '';
            PASSPORT_BADGES.forEach(b => {
                const isUnlocked = !!passportState.unlocked[b.id];
                const cardClass = isUnlocked ? 'badge-card unlocked' : 'badge-card locked';
                const statusIcon = isUnlocked ? '✅' : '🔒';
                
                // Прогресс для подсказки
                let progressText = isUnlocked ? `✨ ${unlockedTag}` : `🔒 ${lockedTag}`;
                if (!isUnlocked) {
                    if (b.id === 'all_sights_master') {
                        const cur = Math.min(b.target, sViewed.length);
                        progressText = `[${cur}/${b.target}] ${lockedTag}`;
                    } else if (b.id === 'chrono_master') {
                        const cur = Math.min(b.target, tViewed.length);
                        progressText = `[${cur}/${b.target}] ${lockedTag}`;
                    } else if (b.id === 'season_master') {
                        const cur = Math.min(b.target, seaViewed.length);
                        progressText = `[${cur}/${b.target}] ${lockedTag}`;
                    } else if (b.id === 'map_explorer') {
                        const cur = Math.min(b.target, mMapViewed.length);
                        progressText = `[${cur}/${b.target}] ${lockedTag}`;
                    } else if (b.id === 'railway_trio') {
                        const cur = ['vokzal', 'parovoz', 'viaduct'].filter(id => sViewed.includes(id)).length;
                        progressText = `[${cur}/${b.target}] ${lockedTag}`;
                    } else if (b.id === 'cossack_fortress') {
                        const cur = ['kazachya-izba', 'watchtower', 'braviy-kazak'].filter(id => sViewed.includes(id)).length;
                        progressText = `[${cur}/${b.target}] ${lockedTag}`;
                    } else if (b.id === 'nature_wonders') {
                        const cur = ['naberezhnaya', 'divizionnaya', 'sokoliy-kamen', 'sosnovye-bory'].filter(id => sViewed.includes(id)).length;
                        progressText = `[${cur}/${b.target}] ${lockedTag}`;
                    } else if (b.id === 'zemstvo_healer') {
                        const cur = ['mizerov', 'sosnovye-bory'].filter(id => sViewed.includes(id)).length;
                        progressText = `[${cur}/${b.target}] ${lockedTag}`;
                    } else if (b.id === 'honorary_citizen') {
                        const cur = Object.keys(passportState.unlocked).filter(k => k !== 'honorary_citizen').length;
                        progressText = `[${cur}/${b.target}] ${lockedTag}`;
                    } else {
                        progressText = `[0/1] ${lockedTag}`;
                    }
                }

                html += `
                    <div class="${cardClass}">
                        <div class="badge-icon-box">${b.icon}</div>
                        <div class="badge-info">
                            <div class="badge-title-row">
                                <h4 class="badge-title">${b.title[lang] || b.title.ru}</h4>
                                <span class="badge-status-icon">${statusIcon}</span>
                            </div>
                            <p class="badge-desc">${b.desc[lang] || b.desc.ru}</p>
                            <span class="badge-prog-tag">${progressText}</span>
                        </div>
                    </div>
                `;
            });

            grid.innerHTML = html;
        }

        window.openPassportModal = function() {
            loadPassportState();
            const modal = document.getElementById('passport-modal');
            if (!modal) return;
            renderPassportBadges();
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            document.body.classList.add('modal-open');
            focusDialog(modal);
        };

        window.closePassportModal = function() {
            const modal = document.getElementById('passport-modal');
            if (!modal) return;
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            document.body.classList.remove('modal-open');
            const drop = document.getElementById('passport-avatar-dropdown');
            if (drop) drop.style.display = 'none';
            restoreDialogFocus();
        };

        window.handlePassportBackdropClick = function(e) {
            if (e.target && e.target.id === 'passport-modal') {
                closePassportModal();
            }
        };

        window.toggleAvatarDropdown = function(e) {
            if (e && e.stopPropagation) e.stopPropagation();
            const drop = document.getElementById('passport-avatar-dropdown');
            if (drop) {
                drop.style.display = drop.style.display === 'none' ? 'flex' : 'none';
            }
        };

        window.setPassportAvatar = function(emoji) {
            passportState.avatar = emoji;
            savePassportState();
            const btn = document.getElementById('passport-avatar-current');
            if (btn) btn.textContent = emoji;
            const drop = document.getElementById('passport-avatar-dropdown');
            if (drop) drop.style.display = 'none';
        };

        window.savePassportName = function(name) {
            passportState.name = name.trim() || 'Исследователь';
            savePassportState();
            const certNameInput = document.getElementById('cert-name-input');
            if (certNameInput && (!certNameInput.value || certNameInput.value === 'Исследователь')) {
                certNameInput.value = passportState.name;
            }
        };

        window.resetPassportProgress = function() {
            const lang = (typeof currentLang !== 'undefined' && currentLang === 'en') ? 'en' : 'ru';
            const msg = lang === 'en' 
                ? 'Are you sure you want to reset all achievements and start the Hardcore challenge from scratch?' 
                : 'Вы уверены, что хотите сбросить все достижения и начать испытание «Максимальный хардкор» с нуля?';
            if (confirm(msg)) {
                passportState.unlocked = {};
                passportState.progress = {
                    sights_viewed: [],
                    timeline_viewed: [],
                    seasons_viewed: [],
                    map_markers_viewed: []
                };
                try {
                    safeStorageRemove('kuf_planner_opened');
                } catch(e) {}
                savePassportState();
                renderPassportBadges();
                if (typeof updatePassportBadgeCount === 'function') {
                    updatePassportBadgeCount();
                }
            }
        };

        window.trackSightExplored = function(sightId, cat) {
            if (!isPassportLoaded) loadPassportState();
            if (!Array.isArray(passportState.progress.sights_viewed)) {
                passportState.progress.sights_viewed = [];
            }
            if (sightId && !passportState.progress.sights_viewed.includes(sightId)) {
                passportState.progress.sights_viewed.push(sightId);
                savePassportState();
            }

            const sViewed = passportState.progress.sights_viewed;

            // 1. Все объекты текущего каталога
            if (sViewed.length >= sightsData.length) {
                unlockAchievement('all_sights_master');
            }

            // 2. Ж/д коллекция (вокзал мастерской Щусева, паровоз, виадук)
            const railwayIds = ['vokzal', 'parovoz', 'viaduct'];
            if (railwayIds.every(id => sViewed.includes(id))) {
                unlockAchievement('railway_trio');
            }

            // 3. Казачья застава (казачья изба, сторожевая башня, бравый казак)
            const cossackIds = ['kazachya-izba', 'watchtower', 'braviy-kazak'];
            if (cossackIds.every(id => sViewed.includes(id))) {
                unlockAchievement('cossack_fortress');
            }

            // 4. Заповедный Красноуфимск (набережная, дивизионная гора, соколий камень, сосновые боры)
            const natureIds = ['naberezhnaya', 'divizionnaya', 'sokoliy-kamen', 'sosnovye-bory'];
            if (natureIds.every(id => sViewed.includes(id))) {
                unlockAchievement('nature_wonders');
            }

            // 5. Комплекс медицины Мизерова (музей больницы и парк «Целитель»)
            const mizerovIds = ['mizerov', 'sosnovye-bory'];
            if (mizerovIds.every(id => sViewed.includes(id))) {
                unlockAchievement('zemstvo_healer');
            }
        };

        window.trackMapExplore = function(sightId) {
            if (!isPassportLoaded) loadPassportState();
            if (!Array.isArray(passportState.progress.map_markers_viewed)) {
                passportState.progress.map_markers_viewed = [];
            }
            if (sightId && !passportState.progress.map_markers_viewed.includes(sightId)) {
                passportState.progress.map_markers_viewed.push(sightId);
                savePassportState();
            }
            if (passportState.progress.map_markers_viewed.length >= 15) {
                unlockAchievement('map_explorer');
            }
            if (sightId && typeof trackSightExplored === 'function') {
                const s = sightsData.find(x => x.id === sightId);
                trackSightExplored(sightId, s ? s.cat : '');
            }
        };

        // Экспорт глобальных функций
        window.unlockAchievement = unlockAchievement;
        window.loadPassportState = loadPassportState;
        window.savePassportState = savePassportState;
        window.renderPassportBadges = renderPassportBadges;
        window.trackSeasonExplored = trackSeasonExplored;
        window.trackPlannerOpen = trackPlannerOpen;

        // Загрузка состояния немедленно при парсинге скрипта
        loadPassportState();

        // Загрузка состояния при DOMContentLoaded и pageshow
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadPassportState);
        }
        window.addEventListener('pageshow', loadPassportState);
        window.addEventListener('focus', loadPassportState);

        // Закрытие по клавише Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (typeof closePassportModal === 'function') closePassportModal();
                if (typeof closeWeatherModal === 'function') closeWeatherModal();
                if (typeof closePrivacyModal === 'function') closePrivacyModal();
                if (typeof closeSourcesModal === 'function') closeSourcesModal();
            }
        });

        /* =========================================================================
           152-ФЗ / GDPR: ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ И COOKIE CONSENT
           ========================================================================= */
        window.openPrivacyModal = function() {
            const m = document.getElementById('privacy-modal');
            if (m) {
                m.classList.add('active');
                m.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                focusDialog(m);
            }
        };

        window.closePrivacyModal = function() {
            const m = document.getElementById('privacy-modal');
            if (m) {
                m.classList.remove('active');
                m.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                restoreDialogFocus();
            }
        };

        window.openSourcesModal = function() {
            const m = document.getElementById('sources-modal');
            if (m) {
                m.classList.add('active');
                m.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                focusDialog(m);
            }
        };

        window.closeSourcesModal = function() {
            const m = document.getElementById('sources-modal');
            if (m) {
                m.classList.remove('active');
                m.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                restoreDialogFocus();
            }
        };

        window.acceptCookies = function() {
            safeStorageSet('kuf_cookie_consent', 'accepted');
            const b = document.getElementById('cookie-banner');
            if (b) {
                b.style.opacity = '0';
                b.style.transform = 'translateY(10px)';
                setTimeout(() => b.style.display = 'none', 300);
                document.body.classList.remove('cookie-banner-visible');
            }
        };

        function initCookieBanner() {
            const consent = safeStorageGet('kuf_cookie_consent', null);
            if (!consent) {
                const b = document.getElementById('cookie-banner');
                if (b) {
                    b.style.display = 'flex';
                    document.body.classList.add('cookie-banner-visible');
                }
            }
        }

        function checkPrivacyHash() {
            if (window.location.hash === '#privacy') {
                openPrivacyModal();
            }
        }
        window.addEventListener('hashchange', checkPrivacyHash);

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initCookieBanner();
                checkPrivacyHash();
            });
        } else {
            initCookieBanner();
            checkPrivacyHash();
        }

        /* =========================================================================
           PWA: ОБРАБОТЧИК УСТАНОВКИ ВЕБ-ПРИЛОЖЕНИЯ
           ========================================================================= */
        let pwaDeferredPrompt = null;

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            pwaDeferredPrompt = e;
            const btn = document.getElementById('btn-install-pwa');
            const hint = document.getElementById('pwa-install-hint');
            if (btn) {
                btn.classList.add('ready');
            }
            if (hint) {
                hint.textContent = (currentLang === 'en')
                    ? 'Click the button above to install the app on your device!'
                    : 'Нажмите кнопку выше, чтобы установить путеводитель на ваше устройство!';
            }
        });

        window.handlePwaInstallClick = function() {
            if (pwaDeferredPrompt) {
                pwaDeferredPrompt.prompt();
                pwaDeferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        const hint = document.getElementById('pwa-install-hint');
                        const btn = document.getElementById('btn-install-pwa');
                        if (btn) btn.style.display = 'none';
                        if (hint) {
                            hint.textContent = (currentLang === 'en')
                                ? '✅ The app has been successfully installed!'
                                : '✅ Приложение успешно установлено на ваше устройство!';
                        }
                    }
                    pwaDeferredPrompt = null;
                });
            } else {
                const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
                const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
                const isLocal = window.location.protocol === 'file:';
                const hint = document.getElementById('pwa-install-hint');
                if (isStandalone) {
                    if (hint) {
                        hint.textContent = (currentLang === 'en')
                            ? '✅ The app is already installed and running!'
                            : '✅ Приложение уже установлено и запущено на вашем устройстве!';
                    }
                } else if (isIos) {
                    if (hint) {
                        hint.innerHTML = (currentLang === 'en')
                            ? '📲 In Safari, tap the <strong>Share</strong> button ⎋ (bottom of screen), then select <strong>«Add to Home Screen ➕»</strong>.'
                            : '📲 В Safari нажмите кнопку <strong>«Поделиться» ⎋</strong> (внизу экрана) и выберите <strong>«На экран "Домой" ➕»</strong>.';
                    }
                } else if (isLocal) {
                    if (hint) {
                        hint.innerHTML = (currentLang === 'en')
                            ? '🌐 1-click install works on the live site (<a href="https://krasnoufimsk-history.site" target="_blank" rel="noopener noreferrer" style="color:var(--main-color);font-weight:600;text-decoration:underline;">krasnoufimsk-history.site</a>). Browsers restrict PWA installation from local disk files.'
                            : '🌐 Установка в 1 клик работает на опубликованном сайте (<a href="https://krasnoufimsk-history.site" target="_blank" rel="noopener noreferrer" style="color:var(--main-color);font-weight:600;text-decoration:underline;">krasnoufimsk-history.site</a>). Локальные файлы с диска браузер блокирует ради безопасности.';
                    }
                } else {
                    if (hint) {
                        hint.innerHTML = (currentLang === 'en')
                            ? '🖥️ Click the <strong>Install icon ⬇️</strong> in the browser address bar (top right) or open menu (⋮) ➔ <strong>«Install app»</strong>.'
                            : '🖥️ Нажмите на <strong>значок установки ⬇️</strong> в адресной строке браузера (вверху справа) или откройте меню (⋮) ➔ <strong>«Установить приложение»</strong>.';
                    }
                }
            }
        };
        window.addEventListener('appinstalled', () => {
            pwaDeferredPrompt = null;
            const btn = document.getElementById('btn-install-pwa');
            const hint = document.getElementById('pwa-install-hint');
            if (btn) btn.style.display = 'none';
            if (hint) {
                hint.textContent = (currentLang === 'en')
                    ? '✅ The app has been successfully installed!'
                    : '✅ Приложение успешно установлено на ваше устройство!';
            }
        });

        /* ===== Фит-гард шапки: если навигация не помещается по ширине —
           сначала компактный режим, затем бургер-меню (любая ширина экрана).
           Проверяется не только фактический выход за край, но и минимальный
           свободный зазор между логотипом и правой группой: так шапка не
           остаётся «впритык» при другом шрифте, масштабе или поздней
           загрузке температуры/языка. ===== */
        var headerFitGuardTimers = [];
        var headerFitGuardRunning = false;
        function scheduleHeaderFitGuard(delay) {
            var baseDelay = typeof delay === 'number' ? delay : 80;
            headerFitGuardTimers.forEach(clearTimeout);
            headerFitGuardTimers = [];
            // Вторая проверка нужна после CSS-переходов пунктов меню (~0,3 с):
            // первое измерение может увидеть ещё промежуточную ширину.
            [baseDelay, baseDelay + 380].forEach(function(ms) {
                headerFitGuardTimers.push(setTimeout(headerFitGuard, ms));
            });
        }
        function headerFitGuard() {
            if (headerFitGuardRunning) return;
            headerFitGuardRunning = true;
            try {
                var body = document.body;
                var hdr = document.querySelector('header');
                var links = hdr ? hdr.querySelector('.nav-links') : null;
                var left = hdr ? hdr.querySelector('.header-left') : null;
                var right = hdr ? hdr.querySelector('.header-right') : null;
                body.classList.remove('nav-compact-force', 'nav-burger-force');
                if (!hdr || window.innerWidth <= 1100) return;
                function visible(el) {
                    return !!(el && el.getClientRects && el.getClientRects().length &&
                        window.getComputedStyle(el).display !== 'none');
                }
                function overflows() {
                    if (hdr.scrollWidth > hdr.clientWidth + 1) return true;
                    var hr = hdr.getBoundingClientRect();
                    var cs = window.getComputedStyle(hdr);
                    var padL = parseFloat(cs.paddingLeft) || 0;
                    var padR = parseFloat(cs.paddingRight) || 0;
                    if (visible(left) && visible(right)) {
                        var leftRect = left.getBoundingClientRect();
                        var rightRect = right.getBoundingClientRect();
                        if (rightRect.left - leftRect.right < 16) return true;
                        if (leftRect.left < hr.left + padL - 1 ||
                            rightRect.right > hr.right - padR + 1) return true;
                    }
                    if (visible(links)) {
                        if (links.scrollWidth > links.clientWidth + 1) return true;
                        var lr = links.getBoundingClientRect();
                        if (lr.left < hr.left + padL - 1 ||
                            lr.right > hr.right - padR + 1) return true;
                    }
                    return false;
                }
                if (overflows()) {
                    body.classList.add('nav-compact-force');
                    if (overflows()) body.classList.add('nav-burger-force');
                }
            } catch (e) { /* защитный код — не ломаем страницу */ }
            finally { headerFitGuardRunning = false; }
        }
        window.addEventListener('load', function() { scheduleHeaderFitGuard(0); });
        window.addEventListener('resize', function() { scheduleHeaderFitGuard(80); });
        window.addEventListener('orientationchange', function() { scheduleHeaderFitGuard(120); });
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(function() { scheduleHeaderFitGuard(0); });
        document.addEventListener('click', function(e) {
            var t = e.target;
            if (t && t.closest && t.closest('.lang-switch-btn')) scheduleHeaderFitGuard(80);
        });
        if (window.MutationObserver) {
            var headerForObserver = document.querySelector('header');
            if (headerForObserver) {
                new MutationObserver(function() { scheduleHeaderFitGuard(120); })
                    .observe(headerForObserver, { subtree: true, childList: true, characterData: true });
            }
        }
