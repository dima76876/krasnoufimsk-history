/* Extracted from planner.html for separate browser caching (fixed build 2026-10-18). */
// Глобальный мониторинг стабильности и ошибок скриптов
        window.addEventListener('error', function(e) {
            console.warn('[Global Handler] Non-fatal runtime notice:', e.message || e);
        });
        window.addEventListener('unhandledrejection', function(e) {
            console.warn('[Global Handler] Unhandled promise rejection notice:', e.reason);
        });

        // Защита от XSS-инъекций при выводе пользовательских и внешних данных
        function escapeHtml(str) {
            if (!str) return '';
            return String(str).replace(/[&<>"']/g, s => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            })[s]);
        }

        // Безопасная работа с локальным хранилищем (защита от SecurityError / Private Browsing)
        function safeStorageGet(key, fallback = null) {
            try { const v = window.localStorage.getItem(key); return v === null ? fallback : v; }
            catch (e) { return fallback; }
        }
        function safeStorageSet(key, value) {
            try { window.localStorage.setItem(key, value); return true; }
            catch (e) { return false; }
        }

        /* =========================================================================
           1. БАЗА ГОРОДОВ РОССИИ И ДАННЫЕ МАРШРУТОВ ДО КРАСНОУФИМСКА
           ========================================================================= */
        const CITIES_DATA = [
            {
                id: 'ekb', name: { ru: 'Екатеринбург', en: 'Yekaterinburg' },
                distKm: 200, lat: 56.8389, lon: 60.6057, isPopular: true,
                options: [
                    {
                        type: 'train_fast', icon: '🚆',
                        title: { ru: 'Скорый электропоезд «Финист» / экспресс', en: 'Fast Finist / Express Train' },
                        badge: { ru: 'Рекомендуем • Быстро и удобно', en: 'Recommended • Fast & Comfy' },
                        time: { ru: '~3 ч 22 мин', en: '~3 h 22 min' },
                        priceOneWay: 650,
                        priceMin: 500, priceMax: 800,
                        desc: { ru: 'Прямой комфортный рейс с ж/д вокзала Екатеринбург-Пасс. (время в пути ~3 ч 22 мин; отправления и тип поезда проверяйте на выбранную дату). Прибытие на исторический вокзал Красноуфимска (мастерская А. В. Щусева). Стоимость уточняйте у перевозчика.', en: 'Direct train from Yekaterinburg Main Station (journey time ~3 h 22 min; check departures and train type for your date) to Krasnoufimsk historic station (Shchusev workshop). Check current fares with the carrier.' }
                    },
                    {
                        type: 'bus', icon: '🚌',
                        title: { ru: 'Рейсовый автобус / маршрутка', en: 'Scheduled Intercity Bus' },
                        badge: { ru: 'Несколько рейсов в день', en: 'Multiple daily trips' },
                        time: { ru: '4 ч 10 мин', en: '4 h 10 min' },
                        priceOneWay: 750,
                        priceMin: 600, priceMax: 950,
                        desc: { ru: 'Отправление от Северного и Южного автовокзалов Екатеринбурга. Прибытие на автостанцию Красноуфимска.', en: 'Departs from North and South bus stations, arrives at Krasnoufimsk bus terminal.' }
                    },
                    {
                        type: 'car', icon: '🚗',
                        title: { ru: 'Личный автомобиль (Р-242)', en: 'Personal Car (R-242)' },
                        badge: { ru: 'Полная свобода передвижения', en: 'Maximum flexibility' },
                        time: { ru: '~2 ч 42 мин', en: '~2 h 42 min' },
                        priceOneWay: 1050,
                        priceMin: 850, priceMax: 1300,
                        desc: { ru: 'По Московскому тракту (Р-242) до Ачита, далее по региональной дороге в Красноуфимск. Расход ~17 л бензина АИ-95.', en: 'Via the Moskovsky Highway (R-242) to Achit, then the regional road to Krasnoufimsk. About 17 litres of petrol.' }
                    },
                    {
                        type: 'carpool', icon: '🤝',
                        title: { ru: 'Карпулинг / попутчики (BlaBlaCar)', en: 'Carpooling (BlaBlaCar)' },
                        badge: { ru: 'Экономно', en: 'Budget-friendly' },
                        time: { ru: '2 ч 40 мин', en: '2 h 40 min' },
                        priceOneWay: 500,
                        priceMin: 400, priceMax: 600,
                        desc: { ru: 'Регулярные попутные поездки с водителями каждый день в удобное время.', en: 'Frequent daily shared rides with local drivers.' }
                    }
                ]
            },
            {
                id: 'moscow', name: { ru: 'Москва', en: 'Moscow' },
                distKm: 1488, lat: 55.7558, lon: 37.6173, isPopular: true,
                options: [
                    {
                        type: 'plane_train', icon: '✈️+🚆',
                        title: { ru: 'Самолёт до Кольцово + экспресс «Финист»', en: 'Flight to Koltsovo + Finist express' },
                        badge: { ru: 'Самый быстрый способ', en: 'Fastest Travel Option' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 5400,
                        priceMin: 4300, priceMax: 6750,
                        desc: { ru: 'Перелёт Москва → Екатеринбург (2 ч 20 мин, от 4 600 ₽) + скорый «Финист» в Красноуфимск (~3 ч 22 мин, ~650 ₽).', en: 'Flight to Yekaterinburg Koltsovo Airport + connecting express train to Krasnoufimsk (~3 h 22 min).' }
                    },
                    {
                        type: 'train_direct', icon: '🚆',
                        title: { ru: 'Прямой поезд (Казанский вокзал)', en: 'Direct Train (Kazan Station)' },
                        badge: { ru: 'Без пересадок • Прямо в центр', en: 'Direct • No transfers' },
                        time: { ru: '20 ч 44 мин – 22 ч 06 мин', en: '20 h 44 min – 22 h 06 min' },
                        priceOneWay: 2800,
                        priceMin: 2250, priceMax: 3500,
                        desc: { ru: 'Прямые фирменные поезда Москва — Екатеринбург/Тюмень делают остановку на ст. Красноуфимск. Романтика поезда и вид на Урал.', en: 'Direct long-distance trains from Moscow Kazansky terminal stop directly at Krasnoufimsk.' }
                    },
                    {
                        type: 'plane_bus', icon: '✈️+🚌',
                        title: { ru: 'Самолёт в Кольцово + автобус/такси', en: 'Flight to Koltsovo + Bus' },
                        badge: { ru: 'Гибкий график', en: 'Flexible departure' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 5600,
                        priceMin: 4500, priceMax: 7000,
                        desc: { ru: 'Перелёт до Кольцово + междугородний автобус от Южного автовокзала или трансфер.', en: 'Flight to Koltsovo Airport plus intercity bus or car transfer.' }
                    },
                    {
                        type: 'car', icon: '🚗',
                        title: { ru: 'Авто по скоростной трассе М-12 «Восток»', en: 'Car via M-12 Vostok Highway' },
                        badge: { ru: 'Новая скоростная трасса', en: 'New Expressway' },
                        time: { ru: '~20 часов', en: '~20 hours' },
                        priceOneWay: 7200,
                        priceMin: 5750, priceMax: 9000,
                        desc: { ru: 'По скоростной трассе М-12 «Восток» до примыкания Дюртюли—Ачит, далее по Р-242 до Красноуфимска. Расход ~125 л топлива без учёта остановок и платных участков.', en: 'Via modern M-12 Vostok expressway to the Dyurtyuli–Achit junction, then via R-242 to Krasnoufimsk. ~125 liters of fuel before stops and tolls.' }
                    }
                ]
            },
            {
                id: 'spb', name: { ru: 'Санкт-Петербург', en: 'Saint Petersburg' },
                distKm: 2187, lat: 59.9343, lon: 30.3351, isPopular: true,
                options: [
                    {
                        type: 'plane_train', icon: '✈️+🚆',
                        title: { ru: 'Самолёт до Кольцово + экспресс «Финист»', en: 'Flight to Koltsovo + Finist express' },
                        badge: { ru: 'Оптимально по времени', en: 'Best travel time' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 6200,
                        priceMin: 4950, priceMax: 7750,
                        desc: { ru: 'Прямой перелёт Пулково → Екатеринбург (2 ч 40 мин) + пересадка на комфортный экспресс «Финист».', en: 'Direct flight from Pulkovo to Yekaterinburg + fast connection to Krasnoufimsk.' }
                    },
                    {
                        type: 'train_transfer', icon: '🚆',
                        title: { ru: 'Поезд с пересадкой (Москва или Екатеринбург)', en: 'Train with a transfer (Moscow or Yekaterinburg)' },
                        badge: { ru: 'Требуется пересадка', en: 'Transfer required' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 3400,
                        priceMin: 2700, priceMax: 4250,
                        desc: { ru: 'Беспересадочный поезд до Красноуфимска в проверенных расписаниях не заявлен: стройте маршрут с пересадкой в Москве или Екатеринбурге и проверяйте дату.', en: 'Checked timetables do not show a direct train to Krasnoufimsk: plan a transfer in Moscow or Yekaterinburg and verify your date.' }
                    }
                ]
            },
            {
                id: 'perm', name: { ru: 'Пермь', en: 'Perm' },
                distKm: 205, lat: 58.0105, lon: 56.2502, isPopular: false,
                options: [
                    {
                        type: 'car', icon: '🚗',
                        title: { ru: 'На автомобиле (через Кунгур / Суксун)', en: 'By Car (via Kungur / Suksun)' },
                        badge: { ru: 'Быстро и живописно', en: 'Fast & Scenic' },
                        time: { ru: '~2 ч 42 мин', en: '~2 h 42 min' },
                        priceOneWay: 1250,
                        priceMin: 1000, priceMax: 1550,
                        desc: { ru: 'По трассе Р-242 через старинный Кунгур и Суксун прямо в Красноуфимск. Расход ~20 л топлива.', en: 'Scenic route along R-242 highway via historic Kungur and Suksun. ~20 liters of fuel.' }
                    },
                    {
                        type: 'bus', icon: '🚌',
                        title: { ru: 'Прямой автобус Пермь — Красноуфимск', en: 'Direct Bus Perm — Krasnoufimsk' },
                        badge: { ru: 'Регулярный рейс', en: 'Daily service' },
                        time: { ru: '4 ч 33 мин – 5 ч 05 мин', en: '4 h 33 min – 5 h 05 min' },
                        priceOneWay: 800,
                        priceMin: 650, priceMax: 1000,
                        desc: { ru: 'Ежедневный рейс с Центрального автовокзала Перми до автостанции Красноуфимска.', en: 'Daily bus from Perm Central Bus Station to Krasnoufimsk.' }
                    },
                    {
                        type: 'train_transfer', icon: '🚆+🚌',
                        title: { ru: 'Поезд до Кунгура + автобус/такси', en: 'Train to Kungur + Bus' },
                        badge: { ru: 'С визитом в ледяную пещеру', en: 'Via Kungur Ice Cave' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 950,
                        priceMin: 750, priceMax: 1200,
                        desc: { ru: 'Удобно совместить поездку с осмотром знаменитой Кунгурской ледяной пещеры.', en: 'Great combo to visit Kungur Ice Cave on the way.' }
                    }
                ]
            },
            {
                id: 'ufa', name: { ru: 'Уфа', en: 'Ufa' },
                distKm: 358, lat: 54.7388, lon: 55.9721, isPopular: false,
                options: [
                    {
                        type: 'car', icon: '🚗',
                        title: { ru: 'Автомобиль (через Месягутово)', en: 'By Car (via Mesyagutovo)' },
                        badge: { ru: 'Красивые уральские хребты', en: 'Scenic Ural hills' },
                        time: { ru: '~4 ч 48 мин', en: '~4 h 48 min' },
                        priceOneWay: 1500,
                        priceMin: 1200, priceMax: 1900,
                        desc: { ru: 'Живописная региональная трасса через Башкирию и долину реки Ай. Расход ~24 л топлива.', en: 'Scenic regional road through northern Bashkortostan and Ay River valley.' }
                    },
                    {
                        type: 'bus', icon: '🚌',
                        title: { ru: 'Междугородний автобус Уфа — Красноуфимск', en: 'Intercity Bus Ufa — Krasnoufimsk' },
                        badge: { ru: 'Прямое сообщение', en: 'Direct connection' },
                        time: { ru: '6 ч 55 мин – 8 ч 42 мин', en: '6 h 55 min – 8 h 42 min' },
                        priceOneWay: 950,
                        priceMin: 750, priceMax: 1200,
                        desc: { ru: 'Отправление от Южного автовокзала Уфы.', en: 'Departs from Ufa South Bus Station.' }
                    }
                ]
            },
            {
                id: 'kazan', name: { ru: 'Казань', en: 'Kazan' },
                distKm: 693, lat: 55.8304, lon: 49.0661, isPopular: true,
                options: [
                    {
                        type: 'train_direct', icon: '🚆',
                        title: { ru: 'Прямой поезд (Казанбургская магистраль)', en: 'Direct Train (Historic Line)' },
                        badge: { ru: 'Комфортно за ночь', en: 'Overnight comfort' },
                        time: { ru: 'уточняйте на дату', en: 'check for your date' },
                        priceOneWay: 1450,
                        priceMin: 1150, priceMax: 1800,
                        desc: { ru: 'Историческая линия Казань — Екатеринбург. Вечером садитесь в Казани — утром выходите на историческом вокзале в Красноуфимске (мастерская А. В. Щусева); поезд и дату проверяйте в актуальном расписании.', en: 'Historic Kazan–Yekaterinburg line. Board in the evening in Kazan and arrive at the historic Krasnoufimsk station (Shchusev workshop); check the train and date in the current timetable.' }
                    },
                    {
                        type: 'car', icon: '🚗',
                        title: { ru: 'Автомобиль по скоростной М-12 «Восток»', en: 'Car via M-12 Vostok' },
                        badge: { ru: 'Скоростное шоссе', en: 'Expressway' },
                        time: { ru: '~9 часов', en: '~9 hours' },
                        priceOneWay: 2800,
                        priceMin: 2250, priceMax: 3500,
                        desc: { ru: 'По скоростной трассе М-12 «Восток» через Набережные Челны до примыкания Дюртюли—Ачит, далее по Р-242 до Красноуфимска. Расход ~59 л топлива без учёта остановок.', en: 'Via M-12 Vostok expressway through Naberezhnye Chelny to the Dyurtyuli–Achit junction, then via R-242 to Krasnoufimsk. ~59 liters of fuel.' }
                    }
                ]
            },
            {
                id: 'chelyabinsk', name: { ru: 'Челябинск', en: 'Chelyabinsk' },
                distKm: 408, lat: 55.1644, lon: 61.4368, isPopular: false,
                options: [
                    {
                        type: 'car', icon: '🚗',
                        title: { ru: 'Автомобиль (через Касли / Михайловск)', en: 'Car (via Kasli / Mikhaylovsk)' },
                        badge: { ru: 'Озёрный край и горы', en: 'Lake district & hills' },
                        time: { ru: '~5 ч 42 мин', en: '~5 h 42 min' },
                        priceOneWay: 1850,
                        priceMin: 1500, priceMax: 2300,
                        desc: { ru: 'Красивейшая дорога мимо уральских озёр и перевалов Среднего Урала.', en: 'Scenic route past Ural lakes and mountain passes.' }
                    },
                    {
                        type: 'bus_train', icon: '🚌+🚆',
                        title: { ru: 'Автобус до Екатеринбурга + экспресс «Финист»', en: 'Bus to Yekaterinburg + Finist express' },
                        badge: { ru: 'Надёжный маршрут', en: 'Reliable route' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 1200,
                        priceMin: 950, priceMax: 1500,
                        desc: { ru: 'Автобус или поезд до Екатеринбурга и стыковка на скорый электропоезд; общее время зависит от расписания.', en: 'Bus or train to Yekaterinburg, then a fast train connection; total time depends on the timetable.' }
                    }
                ]
            },
            {
                id: 'samara', name: { ru: 'Самара', en: 'Samara' },
                distKm: 715, lat: 53.1959, lon: 50.1002, isPopular: false,
                options: [
                    {
                        type: 'car', icon: '🚗',
                        title: { ru: 'На автомобиле через Уфу', en: 'Car via Ufa' },
                        badge: { ru: 'Трасса М-5 + Башкирия', en: 'M-5 highway' },
                        time: { ru: '10 часов', en: '10 hours' },
                        priceOneWay: 4000,
                        priceMin: 3200, priceMax: 5000,
                        desc: { ru: 'По трассе М-5 «Урал» до Уфы и далее живописной дорогой в Красноуфимск.', en: 'Via M-5 Ural highway to Ufa and northward to Krasnoufimsk.' }
                    },
                    {
                        type: 'train_transfer', icon: '🚆',
                        title: { ru: 'Поезд с пересадкой в Екатеринбурге', en: 'Train via Yekaterinburg' },
                        badge: { ru: 'Железная дорога', en: 'Rail connection' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 2300,
                        priceMin: 1850, priceMax: 2900,
                        desc: { ru: 'Удобное железнодорожное сообщение через Екатеринбург.', en: 'Rail connection via Yekaterinburg hub.' }
                    }
                ]
            },
            {
                id: 'novosibirsk', name: { ru: 'Новосибирск', en: 'Novosibirsk' },
                distKm: 1760, lat: 55.0084, lon: 82.9357, isPopular: true,
                options: [
                    {
                        type: 'plane_train', icon: '✈️+🚆',
                        title: { ru: 'Самолёт до Кольцово + экспресс «Финист»', en: 'Flight to Koltsovo + Train' },
                        badge: { ru: 'Быстро через Урал', en: 'Quick flight' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 6800,
                        priceMin: 5450, priceMax: 8500,
                        desc: { ru: 'Прямой перелёт Толмачёво → Кольцово (2 ч 10 мин) + электропоезд до Красноуфимска.', en: 'Direct flight to Yekaterinburg + train to Krasnoufimsk.' }
                    },
                    {
                        type: 'train_direct', icon: '🚆',
                        title: { ru: 'Прямой транзитный поезд (проверяйте дату)', en: 'Direct transit train (check your date)' },
                        badge: { ru: 'Транссиб / Казанбургская ветка', en: 'Classic route' },
                        time: { ru: '~27 ч 30 мин', en: '~27 h 30 min' },
                        priceOneWay: 3200,
                        priceMin: 2550, priceMax: 4000,
                        desc: { ru: 'Поезда, следующие в Москву южным ходом через Красноуфимск.', en: 'Direct train traveling westward to Krasnoufimsk.' }
                    }
                ]
            },
            {
                id: 'nizhny', name: { ru: 'Нижний Новгород', en: 'Nizhny Novgorod' },
                distKm: 1089, lat: 56.3269, lon: 44.0059, isPopular: false,
                options: [
                    {
                        type: 'train_transfer', icon: '🚆',
                        title: { ru: 'Поезд с пересадкой (Москва или Екатеринбург)', en: 'Train with a transfer (Moscow or Yekaterinburg)' },
                        badge: { ru: 'Требуется пересадка', en: 'Transfer required' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 2200,
                        priceMin: 1750, priceMax: 2750,
                        desc: { ru: 'Проверяйте маршрут с пересадкой в Москве или Екатеринбурге: прямого поезда в актуальных расписаниях не заявлено.', en: 'Plan a transfer in Moscow or Yekaterinburg: current timetables do not show a direct train.' }
                    },
                    {
                        type: 'car', icon: '🚗',
                        title: { ru: 'Автомобиль по скоростной М-12 «Восток»', en: 'Car via M-12 Vostok' },
                        badge: { ru: 'Скоростное шоссе', en: 'Expressway' },
                        time: { ru: '~14 ч 48 мин', en: '~14 h 48 min' },
                        priceOneWay: 4800,
                        priceMin: 3850, priceMax: 6000,
                        desc: { ru: 'Скоростной маршрут по М-12 «Восток» до примыкания Дюртюли—Ачит, далее по Р-242 до Красноуфимска.', en: 'Expressway route via M-12 Vostok to the Dyurtyuli–Achit junction, then via R-242 to Krasnoufimsk.' }
                    },
                    {
                        type: 'plane_train', icon: '✈️+🚆',
                        title: { ru: 'Самолёт в Екатеринбург + экспресс «Финист»', en: 'Flight to Yekaterinburg + Train' },
                        badge: { ru: 'Быстро по воздуху', en: 'Fast flight combo' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 5200,
                        priceMin: 4150, priceMax: 6500,
                        desc: { ru: 'Авиарейс Стригино → Кольцово (1 ч 45 мин) + комфортный электропоезд до Красноуфимска.', en: 'Flight from Strigino to Koltsovo + Finist express electric train.' }
                    }
                ]
            },
            {
                id: 'omsk', name: { ru: 'Омск', en: 'Omsk' },
                distKm: 1111, lat: 54.9885, lon: 73.3242, isPopular: false,
                options: [
                    {
                        type: 'train_direct', icon: '🚆',
                        title: { ru: 'Прямой поезд Транссиба', en: 'Direct Trans-Siberian Train' },
                        badge: { ru: 'Без пересадок • Прямо в центр', en: 'Direct • No transfers' },
                        time: { ru: '~17 ч 20 мин', en: '~17 h 20 min' },
                        priceOneWay: 2500,
                        priceMin: 2000, priceMax: 3100,
                        desc: { ru: 'Прямой поезд Омск — Москва с остановкой на станции Красноуфимск.', en: 'Direct train from Omsk to Krasnoufimsk.' }
                    },
                    {
                        type: 'plane_train', icon: '✈️+🚆',
                        title: { ru: 'Самолёт до Кольцово + экспресс «Финист»', en: 'Flight to Koltsovo + Train' },
                        badge: { ru: 'Быстро по воздуху', en: 'Fast air connection' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 6200,
                        priceMin: 4950, priceMax: 7750,
                        desc: { ru: 'Рейс Омск → Екатеринбург (1 ч 30 мин) + экспресс «Финист» в Красноуфимск.', en: 'Flight Omsk to Yekaterinburg + Finist express train.' }
                    }
                ]
            },
            {
                id: 'krasnoyarsk', name: { ru: 'Красноярск', en: 'Krasnoyarsk' },
                distKm: 2535, lat: 56.0153, lon: 92.8932, isPopular: false,
                options: [
                    {
                        type: 'plane_train', icon: '✈️+🚆',
                        title: { ru: 'Самолёт в Екатеринбург + экспресс «Финист»', en: 'Flight to Koltsovo + Train' },
                        badge: { ru: 'Оптимально по времени', en: 'Best travel time' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 7900,
                        priceMin: 6300, priceMax: 9900,
                        desc: { ru: 'Перелёт Красноярск → Екатеринбург (3 ч) + скорый электропоезд в Красноуфимск.', en: 'Flight to Yekaterinburg + express train to Krasnoufimsk.' }
                    },
                    {
                        type: 'train_direct', icon: '🚆',
                        title: { ru: 'Прямой поезд Транссибирской магистрали', en: 'Trans-Siberian Direct Train' },
                        badge: { ru: 'Через всю Сибирь', en: 'Across Siberia' },
                        time: { ru: '~40 ч 38 мин', en: '~40 h 38 min' },
                        priceOneWay: 4200,
                        priceMin: 3350, priceMax: 5250,
                        desc: { ru: 'Прямой поезд Красноярск — Москва через Красноуфимск.', en: 'Trans-Siberian train stopping at Krasnoufimsk station.' }
                    }
                ]
            },
            {
                id: 'rostov', name: { ru: 'Ростов-на-Дону', en: 'Rostov-on-Don' },
                distKm: 1970, lat: 47.2357, lon: 39.7015, isPopular: false,
                options: [
                    {
                        type: 'train_transfer', icon: '🚆',
                        title: { ru: 'Поезд с пересадкой в Москве или Екатеринбурге', en: 'Train with a transfer in Moscow or Yekaterinburg' },
                        badge: { ru: 'Требуется пересадка', en: 'Transfer required' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 3600,
                        priceMin: 2900, priceMax: 4500,
                        desc: { ru: 'Подтверждённого прямого поезда до Красноуфимска нет в проверенных источниках: планируйте пересадку и сверяйтесь с датой.', en: 'No confirmed direct train to Krasnoufimsk was found: plan a transfer and verify your date.' }
                    },
                    {
                        type: 'plane_train', icon: '✈️+🚆',
                        title: { ru: 'Самолёт в Кольцово + экспресс «Финист»', en: 'Flight to Koltsovo + Finist express' },
                        badge: { ru: 'Оптимально по времени', en: 'Fastest connection' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 7200,
                        priceMin: 5750, priceMax: 9000,
                        desc: { ru: 'Вылет через хаб Сочи/Минводы в Екатеринбург (Кольцово) + экспресс «Финист» в Красноуфимск (или прямой скорый поезд).', en: 'Flight via Sochi/MinVody hub to Yekaterinburg (Koltsovo) + Finist express to Krasnoufimsk (or direct train).' }
                    },
                    {
                        type: 'car', icon: '🚗',
                        title: { ru: 'Автомобиль через Поволжье и Башкирию', en: 'Car via Volga & Bashkiria' },
                        badge: { ru: 'Маршрут через Самару', en: 'Via Samara highway' },
                        time: { ru: '~27 ч 48 мин', en: '~27 h 48 min' },
                        priceOneWay: 9500,
                        priceMin: 7600, priceMax: 11900,
                        desc: { ru: 'Маршрут по федеральным трассам через Саратов, Самару и Уфу прямо в Красноуфимск. Расход ~160 л бензина.', en: 'Via federal highways through Saratov, Samara, and Ufa to Krasnoufimsk.' }
                    }
                ]
            },
            {
                id: 'krasnodar', name: { ru: 'Краснодар', en: 'Krasnodar' },
                distKm: 2238, lat: 45.0355, lon: 38.9753, isPopular: false,
                options: [
                    {
                        type: 'train_transfer', icon: '🚆',
                        title: { ru: 'Поезд с пересадкой в Москве или Екатеринбурге', en: 'Train with a transfer in Moscow or Yekaterinburg' },
                        badge: { ru: 'Требуется пересадка', en: 'Transfer required' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 3900,
                        priceMin: 3100, priceMax: 4900,
                        desc: { ru: 'Подтверждённого прямого поезда до Красноуфимска нет в проверенных источниках: планируйте пересадку и сверяйтесь с датой.', en: 'No confirmed direct train to Krasnoufimsk was found: plan a transfer and verify your date.' }
                    },
                    {
                        type: 'plane_train', icon: '✈️+🚆',
                        title: { ru: 'Самолёт (Сочи/Минводы) в Кольцово + поезд', en: 'Flight + Express Train' },
                        badge: { ru: 'Быстро по воздуху', en: 'Fast air connection' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 7500,
                        priceMin: 6000, priceMax: 9400,
                        desc: { ru: 'Перелёт до Екатеринбурга (Кольцово) + пересадка на скорый электропоезд «Финист».', en: 'Flight to Yekaterinburg Koltsovo + fast Finist express train to Krasnoufimsk.' }
                    },
                    {
                        type: 'car', icon: '🚗',
                        title: { ru: 'Автомобиль по М-4 «Дон» и М-5 «Урал»', en: 'Car via M-4 Don & M-5 Ural' },
                        badge: { ru: 'Через всю Россию', en: 'Trans-regional route' },
                        time: { ru: '~31 ч 36 мин', en: '~31 h 36 min' },
                        priceOneWay: 10200,
                        priceMin: 8150, priceMax: 12750,
                        desc: { ru: 'Путешествие из столицы Кубани через Поволжье и башкирские холмы прямо в Красноуфимск. Расход ~175 л топлива.', en: 'Scenic route from Kuban across the Volga and Urals. ~175 liters of fuel.' }
                    }
                ]
            },
            {
                id: 'voronezh', name: { ru: 'Воронеж', en: 'Voronezh' },
                distKm: 1589, lat: 51.6608, lon: 39.2003, isPopular: false,
                options: [
                    {
                        type: 'train_transfer', icon: '🚆',
                        title: { ru: 'Поезд с пересадкой в Москве или Екатеринбурге', en: 'Train with a transfer in Moscow or Yekaterinburg' },
                        badge: { ru: 'Требуется пересадка', en: 'Transfer required' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 2900,
                        priceMin: 2300, priceMax: 3600,
                        desc: { ru: 'Проверяйте маршрут с пересадкой в Москве или Екатеринбурге: прямого поезда в актуальных расписаниях не заявлено.', en: 'Plan a transfer in Moscow or Yekaterinburg: current timetables do not show a direct train.' }
                    },
                    {
                        type: 'train_transfer', icon: '🚆+🚆',
                        title: { ru: 'Поезд через Москву + экспресс на Урал', en: 'Express Train via Moscow' },
                        badge: { ru: 'Удобные стыковки', en: 'Fast connections' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 3800,
                        priceMin: 3050, priceMax: 4750,
                        desc: { ru: 'Двухэтажный экспресс до Москвы и ночной поезд Казанского направления прямо в Красноуфимск.', en: 'Double-decker train to Moscow + direct overnight train to Krasnoufimsk.' }
                    },
                    {
                        type: 'car', icon: '🚗',
                        title: { ru: 'Автомобиль через Пензу и Самару', en: 'Car via Penza & Samara' },
                        badge: { ru: 'Через Черноземье и Урал', en: 'Central route' },
                        time: { ru: '~21 ч 42 мин', en: '~21 h 42 min' },
                        priceOneWay: 7400,
                        priceMin: 5900, priceMax: 9250,
                        desc: { ru: 'Маршрут через Тамбов, Пензу, Самару и башкирские долины в Красноуфимск. Расход ~120 л бензина.', en: 'Route across Black Soil region, Volga and Urals to Krasnoufimsk. ~120 l of fuel.' }
                    }
                ]
            },
            {
                id: 'volgograd', name: { ru: 'Волгоград', en: 'Volgograd' },
                distKm: 1501, lat: 48.7080, lon: 44.5133, isPopular: false,
                options: [
                    {
                        type: 'train_direct', icon: '🚆',
                        title: { ru: 'Прямой поезд (Приволжская ж/д)', en: 'Direct Train (Volga Railway)' },
                        badge: { ru: 'Без пересадок • Прямо в центр', en: 'Direct • No transfers' },
                        time: { ru: '~34 ч 37 мин', en: '~34 h 37 min' },
                        priceOneWay: 2700,
                        priceMin: 2150, priceMax: 3400,
                        desc: { ru: 'Прямое ж/д сообщение с вокзала Волгоград-1 до исторического вокзала в Красноуфимске (мастерская А. В. Щусева).', en: 'Direct train from Volgograd-1 terminal to the historic station in Krasnoufimsk (Shchusev workshop).' }
                    },
                    {
                        type: 'plane_train', icon: '✈️+🚆',
                        title: { ru: 'Самолёт Волгоград → Кольцово + экспресс «Финист»', en: 'Flight to Koltsovo + Finist express' },
                        badge: { ru: 'Оптимально по времени', en: 'Best travel time' },
                        time: { ru: 'зависит от стыковки', en: 'depends on the connection' },
                        priceOneWay: 6400,
                        priceMin: 5100, priceMax: 8000,
                        desc: { ru: 'Перелёт Волгоград (Гумрак) → Екатеринбург (Кольцово, 2 ч) + электропоезд до Красноуфимска (~3 ч 22 мин).', en: 'Flight Volgograd to Yekaterinburg (2 h) + connecting express train to Krasnoufimsk (~3 h 22 min).' }
                    },
                    {
                        type: 'car', icon: '🚗',
                        title: { ru: 'Автомобиль вдоль Волги через Самару', en: 'Car along Volga via Samara' },
                        badge: { ru: 'Живописный волжский маршрут', en: 'Scenic Volga route' },
                        time: { ru: '~21 ч 06 мин', en: '~21 h 06 min' },
                        priceOneWay: 7100,
                        priceMin: 5700, priceMax: 8900,
                        desc: { ru: 'По трассе Р-228 вдоль Волги через Саратов, Самару и башкирские холмы в Красноуфимск. Расход ~115 л топлива.', en: 'Along Volga River via Saratov, Samara and Bashkiria to Krasnoufimsk. ~115 l of fuel.' }
                    }
                ]
            }
        ];

        /* Программы тура в городе под количество дней */
        CITIES_DATA.forEach(city => {
            city.checkedAt = '2026-10-18';
            city.distanceSource = 'OSRM road-route estimate between city centres; checked 2026-10-18';
            (city.options || []).forEach(opt => {
                opt.checkedAt = '2026-10-18';
                opt.priceUnit = opt.priceUnit || (opt.type === 'car' ? 'perVehicle' : 'perPerson');
                if (opt.type === 'car' && !opt.vehicleCapacity) opt.vehicleCapacity = 5;
                opt.source = opt.type === 'car' ? 'OSRM road estimate; fuel/tolls vary' : 'Carrier or schedule aggregator — verify exact travel date';
            });
        });
        const ITINERARY_PROGRAMS = {
            1: [
                {
                    dayNum: 1,
                    title: { ru: 'День 1: Экспресс-знакомство с купеческим сердцем и рекой Уфой', en: 'Day 1: Highlights of Merchant Heritage & Ufa River' },
                    places: [
                        { ru: '10:00 — Краеведческий музей (ул. Советская, 42 — палеонтология, зубная спираль геликоприона)', en: '10:00 — Regional Museum (42 Sovetskaya St. — paleontology, Helicoprion shark whorl)' },
                        { ru: '12:00 — Историческая купеческая улица Советская: усадьбы купцов Шевелина, Серебренникова и Земская управа', en: '12:00 — Historic Sovetskaya Street: merchant estates and Zemstvo Board' },
                        { ru: '13:30 — Обед в кафе в историческом центре (традиционные уральские шаньги и травяной чай)', en: '13:30 — Lunch at a cafe in the historic downtown (traditional Ural pastries)' },
                        { ru: '14:45 — Свято-Троицкий собор 1804 года (величие русского классицизма)', en: '14:45 — Holy Trinity Cathedral (classicist stone architecture)' },
                        { ru: '16:00 — Набережная «Красный Яр», скульптура «Девочка с самолётиком» и панорама с Дивьей горы (внимание: на нижнем уровне продолжаются работы по проекту «Красный Яр»; перед визитом уточните открытые участки)', en: '16:00 — Krasny Yar Embankment, the «Girl with a Toy Plane» sculpture and the Divya Mountain viewpoint (note: work on the lower level under the Krasny Yar project is ongoing; check which sections are open before visiting)' },
                        { ru: '18:30 — Памятные сувениры с серебряным соколом и вечерний отъезд', en: '18:30 — Souvenir shopping and departure' }
                    ]
                }
            ],
            2: [
                {
                    dayNum: 1,
                    title: { ru: 'День 1: Историческое купеческое ядро и панорамы реки Уфы', en: 'Day 1: Historic Merchant Core & Scenic River Panoramas' },
                    places: [
                        { ru: '10:30 — Краеведческий музей (богатейшая палеонтология и макет казачьей крепости 1736 г.)', en: '10:30 — Museum of Local Lore (paleontology & 1736 fortress model)' },
                        { ru: '12:30 — Экскурсия по купеческим особнякам улицы Советской и Рогозинниковых', en: '12:30 — Guided walking tour of merchant estates and architecture' },
                        { ru: '14:00 — Обед в историческом центре города', en: '14:00 — Lunch in the town center' },
                        { ru: '15:30 — Дивья гора и вид на излучину Уфы (крутой грунтовый подъём: нужна нескользящая обувь; в дождь и гололёд безопасная замена — верхняя терраса набережной)', en: '15:30 — Divya Mountain viewpoint (steep unpaved climb: wear non-slip shoes; in rain or ice use the upper embankment terrace instead)' },
                        { ru: '17:30 — Вечерний променад по верхней террасе набережной «Красный Яр» и закат (на нижнем уровне продолжаются работы по проекту «Красный Яр»)', en: '17:30 — Sunset walk along the upper terrace of Krasny Yar Embankment (work on the lower level under the Krasny Yar project is ongoing)' },
                        { ru: '19:30 — Заселение в гостиницу, отдых и ужин', en: '19:30 — Check-in at hotel, dinner & rest' }
                    ]
                },
                {
                    dayNum: 2,
                    title: { ru: 'День 2: Наследие мастерской Щусева и триумф вековых виадуков', en: 'Day 2: Shchusev Workshop Heritage & Monumental Viaducts' },
                    places: [
                        { ru: '10:00 — Завтрак в отеле', en: '10:00 — Breakfast at hotel' },
                        { ru: '11:00 — Исторический ж/д вокзал (архитектурная мастерская А. В. Щусева, петровское барокко 1915 г.) и паровоз-памятник «Лебедянка»', en: '11:00 — Historic railway station (A. Shchusev architectural workshop, Petrine Baroque 1915) and steam train monument' },
                        { ru: '11:45 — Выезд на автомобиле или трансфере к Рябиновскому виадуку (около 30 км в одну сторону; осмотр только с безопасных смотровых точек, не выходить на пути и не подходить к опорам)', en: '11:45 — Drive/transfer to the Ryabinovka viaduct (about 30 km one way; view only from safe viewpoints, never enter the tracks or approach the piers)' },
                        { ru: '16:30 — Возвращение в город; если останется время и музей открыт в этот день — Музей земской медицины доктора Мизерова', en: '16:30 — Return to town; if time remains and it is open that day, Dr Mizerov Zemstvo Medicine Museum' },
                        { ru: '17:00 — Покупка сувениров (уральский мёд, иван-чай) и отъезд', en: '17:00 — Souvenirs and departure' }
                    ]
                }
            ],
            3: [
                {
                    dayNum: 1,
                    title: { ru: 'День 1: Город купцов, соколов и первопроходцев', en: 'Day 1: Town of Merchants, Falcons and Pioneers' },
                    places: [
                        { ru: '11:00 — Первая казачья изба XVIII века (колыбель крепости)', en: '11:00 — 18th-century Cossack Log Hut' },
                        { ru: '12:30 — Краеведческий музей (ул. Советская, 42) и палеонтология Урала', en: '12:30 — Regional Museum (42 Sovetskaya St.) and Ural paleontology' },
                        { ru: '14:30 — Обед и пешая прогулка по купеческому кварталу', en: '14:30 — Lunch and historic quarter walk' },
                        { ru: '16:30 — Набережная «Красный Яр» (доступность нижнего уровня уточните перед визитом) и смотровая площадка на Дивьей горе', en: '16:30 — Krasny Yar riverfront (check access to the lower level before visiting) & Divya Mountain' }
                    ]
                },
                {
                    dayNum: 2,
                    title: { ru: 'День 2: Инженерные шедевры: Вокзал мастерской Щусева и Рябиновский виадук', en: 'Day 2: Engineering Wonders: Shchusev Workshop Station & Viaduct' },
                    places: [
                        { ru: '10:30 — Архитектурный ансамбль станции Красноуфимск', en: '10:30 — Krasnoufimsk Railway Station ensemble' },
                        { ru: '12:00 — Выезд на автомобиле к Рябиновскому виадуку (≈30 км; только смотровые точки вне железнодорожных путей)', en: '12:00 — Drive to the Ryabinovka viaduct (about 30 km; viewpoints only, away from railway tracks)' },
                        { ru: '15:30 — виадук Саранинский Лог издали со смотровой точки; затем возвращение в Красноуфимск. Не приближайтесь к действующим путям и опорам', en: '15:30 — Saraninsky Log viaduct from a distant viewpoint, then return to Krasnoufimsk. Keep away from active tracks and piers' }
                    ]
                },
                {
                    dayNum: 3,
                    title: { ru: 'День 3: Земское наследие, природа Уфы и релакс', en: 'Day 3: Zemstvo Heritage & Ural Nature' },
                    places: [
                        { ru: '10:30 — Музей Красноуфимской земской больницы (доктора М. И. Мизерова)', en: '10:30 — Zemstvo Hospital Museum' },
                        { ru: '12:30 — Красноуфимское Реальное училище (кирпичная эклектика, 1875 г.)', en: '12:30 — Real School (brick eclectic style, 1875)' },
                        { ru: '14:30 — Пикник у реки Уфы или прогулка по Сосновому бору', en: '14:30 — Pine forest walk by the Ufa River' },
                        { ru: '17:00 — Завершение путешествия и отъезд', en: '17:00 — Trip wrap-up and departure' }
                    ]
                }
            ],
            4: [
                {
                    dayNum: 1,
                    title: { ru: 'День 1: Историческое купеческое ядро и казачья колыбель', en: 'Day 1: Historic Merchant Core & Cossack Cradle' },
                    places: [
                        { ru: '10:30 — Краеведческий музей (ул. Советская, 42, зубная спираль геликоприона Helicoprion bessonowi, макет крепости 1736 г.)', en: '10:30 — Museum of Local Lore (42 Sovetskaya St., Helicoprion shark whorl, 1736 fortress model)' },
                        { ru: '12:30 — Историческая купеческая улица Советская: усадьбы Шевелина, Серебренникова и здание Земской управы (1911–1912 гг., ныне Дворец творчества).', en: '12:30 — Historic Sovetskaya Street: merchant estates and the Zemstvo Board building (1911–1912, today the Youth Creative Centre).' },
                        { ru: '14:00 — Обед в историческом центре (уральские шаньги, жаркое по-уральски)', en: '14:00 — Lunch in historic town center (traditional Ural cuisine)' },
                        { ru: '15:30 — Свято-Троицкий собор 1804 г. и казачья изба XVIII века', en: '15:30 — Holy Trinity Cathedral (1804) & 18th-century Cossack Hut' },
                        { ru: '17:30 — Доступные участки набережной «Красный Яр» и закат на Дивьей горе с видом на излучину Уфы', en: '17:30 — Open sections of the Krasny Yar Embankment & sunset panorama on Divya Mountain' },
                        { ru: '19:30 — Заселение в гостиницу, вечерний отдых', en: '19:30 — Hotel check-in & evening rest' }
                    ]
                },
                {
                    dayNum: 2,
                    title: { ru: 'День 2: Инженерный триумф мастерской Щусева и музей Земской медицины', en: 'Day 2: Shchusev Workshop Architecture & Zemstvo Medicine' },
                    places: [
                        { ru: '10:00 — Исторический ж/д вокзал (архитектурная мастерская А. В. Щусева, петровское барокко 1915 г.) и паровоз-памятник «Лебедянка»', en: '10:00 — Historic railway station (A. Shchusev workshop, Petrine Baroque 1915) and steam locomotive monument' },
                        { ru: '12:00 — Красноуфимское Реальное училище (кирпичная эклектика, 1875 г.; с 1893 по 1899 год здесь учился маршал Б. М. Шапошников)', en: '12:00 — Krasnoufimsk Real School (brick eclectic style, 1875; Marshal B. Shaposhnikov studied here in 1893–1899)' },
                        { ru: '13:30 — Обед в кафе старого города', en: '13:30 — Lunch in the historic district' },
                        { ru: '15:00 — Музей «Красноуфимская земская больница» (ул. Свободы, 16): музеефицированный больничный комплекс земского времени, пять павильонов и парк «Целитель» с аптекарским садом', en: '15:00 — Krasnoufimsk Zemstvo Hospital Museum (16 Svobody St.): a museumised zemstvo-era hospital complex, five pavilions and the Tselitel Park with an apothecary garden' },
                        { ru: '18:00 — Прогулка по старинному парку «Целитель» (липы, сосны, берёзы) и ужин в ресторане уральской кухни', en: '18:00 — Walk in the historic Tselitel Park (limes, pines, birches) & dinner' }
                    ]
                },
                {
                    dayNum: 3,
                    title: { ru: 'День 3: Монументальные виадуки Красноуфимска и посёлок Сарана', en: 'Day 3: Monumental Viaducts & Sarana Settlement' },
                    places: [
                        { ru: '10:00 — Автоэкспедиция к Рябиновскому виадуку (железобетонный арочный мост 1915–1919 гг., длина 283 м; памятник инженерной архитектуры, законсервирован с 2008 года)', en: '10:00 — Road trip to the Ryabinovka viaduct (reinforced-concrete arch bridge, 1915–1919, 283 m long; an engineering monument, mothballed since 2008)' },
                        { ru: '12:30 — виадук Саранинский Лог среди таёжных холмов (осмотр только со смотровой точки, без выхода к путям)', en: '12:30 — Saraninsky Log Viaduct nestled among taiga hills' },
                        { ru: '14:30 — Посёлок Сарана: Долговский виадук (Долгий Мост) и плотина исторического железоделательного завода', en: '14:30 — Sarana settlement: Dolgovsky viaduct and historic ironworks dam' },
                        { ru: '16:30 — Берег Саранинского водохранилища среди уральских скал, чай на таёжных травах', en: '16:30 — Shore of Sarana reservoir among Ural limestone cliffs, herbal tea' },
                        { ru: '19:00 — Возвращение в Красноуфимск, ужин', en: '19:00 — Return to Krasnoufimsk, dinner' }
                    ]
                },
                {
                    dayNum: 4,
                    title: { ru: 'День 4: Скала Аликаев Камень (Марьин утёс) и природные тайны', en: 'Day 4: Alikaev Kamen (Maryin Cliff) & Ural Nature' },
                    places: [
                        { ru: '09:30 — Экспедиция к 50-метровому утесу Аликаев Камень (легендарный «Марьин утёс» из фильма «Тени исчезают в полдень»)', en: '09:30 — Excursion to 50m high Alikaev Kamen cliff (famed film setting)' },
                        { ru: '11:30 — Подъём на вершину утёса: захватывающая круговая панорама первозданной уральской тайги и реки Сарана', en: '11:30 — Ascent to the cliff top: sweeping panorama of virgin taiga & river' },
                        { ru: '13:30 — Обед на местном форелевом хозяйстве с дегустацией свежевыловленной рыбы и уральского мёда', en: '13:30 — Lunch at local trout farm: fresh fish & Ural honey tasting' },
                        { ru: '15:30 — Эко-тропа вдоль скалистых берегов реки Уфа, осмотр геологических обнажений (окаменелости не собирать и породы не повреждать)', en: '15:30 — Eco-trail along the rocky Ufa riverbanks and geological outcrops (do not collect fossils or damage the rocks)' },
                        { ru: '18:00 — Покупка аутентичных сувениров (соколиная символика, пряники, иван-чай) и памятный отъезд', en: '18:00 — Souvenir shopping and departure' }
                    ]
                }
            ]
        };

        /* =========================================================================
           2. СОСТОЯНИЕ ПРИЛОЖЕНИЯ (STATE)
           ========================================================================= */
        let currentCityId = 'ekb';
        let selectedTransportIndex = 0;
        let tripDays = 2;
        let tripPersons = 2;
        let tripDate = '';
        let hotelCostPerNight = 2800;
        let foodCostPerDayPerPerson = 950;
        let currentLang = 'ru';

        /* =========================================================================
           2.1. ПОЛНЫЙ ДВУЯЗЫЧНЫЙ СЛОВАРЬ И ПЕРЕВОД (РУССКИЙ / ENGLISH)
           ========================================================================= */
        const i18nPlanner = {
            ru: {
                headerLogoTitle: 'Красноуфимск',
                headerLogoSub: 'Калькулятор и гид',
                navHome: 'На главную',
                navHomeFull: 'На главную страницу',
                mobileNavSectionsTitle: '📍 Быстрый переход по шагам:',
                mobileNavStep1: '1. Город отправления',
                mobileNavStep2: '2. Транспорт и билеты',
                mobileNavStep3: '3. Отель и параметры',
                mobileNavStep4: '4. Смета и программа тура',
                mobileNavWeather: 'Погода в Красноуфимске на 7 дней',
                weatherCityLabel: 'Красноуфимск',
                mobileSeasonTitle: '🎨 ВЫБОР ДИЗАЙНА (СЕЗОН):',
                seasonOptAuto: '🔄 Авто',
                seasonOptAutumn: '🍂 Осень',
                seasonOptWinter: '❄️ Зима',
                seasonOptSpring: '🌱 Весна',
                seasonOptSummer: '☀️ Лето',
                mobileSeasonAuto: '🔄 Авто',
                mobileSeasonAutumn: '🍂 Осень',
                mobileSeasonWinter: '❄️ Зима',
                mobileSeasonSpring: '🌱 Весна',
                mobileSeasonSummer: '☀️ Лето',
                heroBadge: 'Умный калькулятор путешествия • 2026',
                pageHeroTitle: 'Как добраться и <span class="highlight">спланировать поездку</span> в Красноуфимск',
                pageHeroDesc: 'Выберите город отправления, транспортную связку и длительность поездки. Система покажет ориентировочное время в пути, примерную смету дороги, гостиницы и питания и составит рекомендуемую программу тура.',
                citySectionTitle: 'Шаг 1. Откуда вы отправляетесь?',
                transSectionTitle: 'Шаг 2. Выберите способ передвижения:',
                transHint: '💡 Нажмите на подходящий вариант, чтобы применить его к смете',
                settingsSectionTitle: 'Шаг 3. Детали вашей поездки:',
                labelDays: '📅 На сколько дней едете?',
                labelPersons: '👥 Количество человек?',
                labelHotel: '🏨 Проживание (в сутки):',
                labelFood: '🍽️ Питание в день на человека:',
                budgetTitle: 'Примерная смета поездки',
                budgetTotalLabel: 'Итоговый бюджет:',
                rowTransport: 'Дорога (туда-обратно):',
                rowHotel: 'Проживание (отель):',
                rowFood: 'Питание и кафе:',
                rowMuseums: 'Музеи и выставки:',
                rowSouvenirs: 'Сувениры и гостинцы:',
                btnNavigator: 'Построить маршрут в Яндекс.Картах',
                programTitle: 'Рекомендуемая программа в Красноуфимске:',
                weatherModalTitle: 'Погода в Красноуфимске',
                weatherCoords: 'Свердловская область • 56,6° с.ш., 57,8° в.д.',
                weatherOnlineBadge: '● Онлайн',
                weatherForecastTitle: 'Прогноз на 7 дней:',
                weatherBtnRefresh: 'Обновить',
                footerLinkHome: 'Главная страница',
                footerLinkTimeline: 'Лента времени',
                footerLinkSights: '27 объектов',
                footerLinkRoutes: 'Пешие гиды',
                footerLinkGuide: 'Памятка туриста',
                footerLinkQuiz: 'Викторина',
                footerCopy: '© 2026 «Красноуфимск: Сквозь эпохи». Выполнен в ходе индивидуального проекта.',
                footerSchool: 'Некоммерческий образовательный проект о Красноуфимске',
                footerLinkPrivacy: '🔒 Политика 152-ФЗ',
                footerLinkSources: '📚 Источники и кредиты',
                daysOpt1: '1 день',
                daysOpt2: '2 дня',
                daysOpt3: '3 дня',
                daysOpt4: '4 дня',
                persOpt1: '1 чел.',
                persOpt2: '2 чел.',
                persOpt3: '3 чел.',
                persOpt4: '4 чел.',
                hotelGuest: '🏡 Гостевой дом / Квартира (~1 600 ₽)',
                hotelStandard: '🏨 Гостиница «Центральная» / «Ковчег» (~2 800 ₽)',
                hotelComfort: '⭐ Комфорт / Отель с завтраком (~4 200 ₽)',
                foodEconomy: '☕ Эконом: выпечка, столовые (~500 ₽)',
                foodStandard: '🍽️ Стандарт: уютные кафе на Советской (~950 ₽)',
                foodGourmet: '🍷 Рестораны и уральская кухня (~1 600 ₽)',
                citySearchPlaceholder: 'Поиск города отправления (например: Москва, Новосибирск, Казань...)',
                cityNotFoundMsg: 'Город не найден. Выберите город из списка ниже или очистите поиск:',
                btnShareTrip: 'Поделиться сметой поездки',
                transportDisclaimer: '⚠️ Время в пути и цены — предварительные оценки. Перед покупкой проверяйте тариф и расписание на вашу дату у перевозчика.',
                ariaOpenMobileMenu: 'Открыть мобильное меню',
                checklistTitle: 'Чек-лист сборов в дорогу:',
                checklistSubtitle: 'Список необходимых вещей с учётом сезона и транспорта в Красноуфимск:',
                geoSearchDivider: '🌍 Найденные города и населённые пункты:',
                searchingCities: 'Поиск по городам России и мира...',
                citySearchLabel: 'Город отправления',
                labelPersonsExact: 'Точное количество (1–20):',
                labelDaysExact: 'Точное количество (1–14):',
                skipLink: 'Перейти к выбору города',
                labelTripDate: '📆 Дата поездки:',
                tripDateNote: 'Цены ниже — диапазоны-ориентиры. Выберите дату и проверьте расписание и тариф у перевозчика.',
                shareCopiedToast: 'Смета и план поездки скопированы в буфер обмена!',
                popularCitiesHeader: 'Города-миллионники России (быстрый выбор):',
                otherCitiesHintTitle: 'Другие города можно найти через поиск',
                otherCitiesHintDesc: 'Введите название города или посёлка в поле выше — поиск предложит найденные варианты. Для произвольного пункта калькулятор покажет оценку автомобильной дороги и не будет выдумывать рейсы.',
                otherCitiesRefineHint: '💡 Не нашли нужный пункт? Уточните написание города в строке поиска'
            },
            en: {
                headerLogoTitle: 'Krasnoufimsk',
                headerLogoSub: 'Calculator & Guide',
                navHome: 'Home',
                navHomeFull: 'To main portal',
                mobileNavSectionsTitle: '📍 Quick step navigation:',
                mobileNavStep1: '1. Departure city',
                mobileNavStep2: '2. Transport & tickets',
                mobileNavStep3: '3. Hotel & parameters',
                mobileNavStep4: '4. Budget & itinerary',
                mobileNavWeather: 'Krasnoufimsk 7-day weather',
                weatherCityLabel: 'Krasnoufimsk',
                mobileSeasonTitle: '🎨 DESIGN THEME (SEASON):',
                seasonOptAuto: '🔄 Auto',
                seasonOptAutumn: '🍂 Autumn',
                seasonOptWinter: '❄️ Winter',
                seasonOptSpring: '🌱 Spring',
                seasonOptSummer: '☀️ Summer',
                mobileSeasonAuto: '🔄 Auto',
                mobileSeasonAutumn: '🍂 Autumn',
                mobileSeasonWinter: '❄️ Winter',
                mobileSeasonSpring: '🌱 Spring',
                mobileSeasonSummer: '☀️ Summer',
                heroBadge: 'Smart Travel Calculator • 2026',
                pageHeroTitle: 'How to get to & <span class="highlight">plan your trip</span> to Krasnoufimsk',
                pageHeroDesc: 'Select your departure city, transport mode, and length of stay. The system instantly calculates travel time, transportation expenses, hotel stays, meal costs, and generates a personalized daily itinerary.',
                citySectionTitle: 'Step 1. Where are you departing from?',
                transSectionTitle: 'Step 2. Choose your transport mode:',
                transHint: '💡 Click any option below to apply it to your trip estimate',
                settingsSectionTitle: 'Step 3. Your trip parameters:',
                labelDays: '📅 Trip duration in days?',
                labelPersons: '👥 Number of travelers?',
                labelHotel: '🏨 Hotel stay (per night):',
                labelFood: '🍽️ Food & meals (day/pers):',
                budgetTitle: 'Estimated trip budget',
                budgetTotalLabel: 'Total estimated budget:',
                rowTransport: 'Transport (round-trip):',
                rowHotel: 'Accommodation (hotel):',
                rowFood: 'Food & dining:',
                rowMuseums: 'Museums & exhibitions:',
                rowSouvenirs: 'Souvenirs & treats:',
                btnNavigator: 'Build route in Yandex Maps',
                programTitle: 'Recommended itinerary in Krasnoufimsk:',
                weatherModalTitle: 'Weather in Krasnoufimsk',
                weatherCoords: 'Sverdlovsk Oblast • 56.6° N, 57.8° E',
                weatherOnlineBadge: '● Live',
                weatherForecastTitle: '7-day forecast:',
                weatherBtnRefresh: 'Refresh',
                footerLinkHome: 'Main page',
                footerLinkTimeline: 'Timeline',
                footerLinkSights: '27 places',
                footerLinkRoutes: 'Walking guides',
                footerLinkGuide: 'Tourist memo',
                footerLinkQuiz: 'Historical quiz',
                footerCopy: '© 2026 "Krasnoufimsk: Through the Ages". Completed as part of an individual project.',
                footerSchool: 'A non-commercial educational project about Krasnoufimsk',
                footerLinkPrivacy: '🔒 Privacy Policy (152-FZ)',
                footerLinkSources: '📚 Sources & Credits',
                daysOpt1: '1 day',
                daysOpt2: '2 days',
                daysOpt3: '3 days',
                daysOpt4: '4 days',
                persOpt1: '1 pers.',
                persOpt2: '2 pers.',
                persOpt3: '3 pers.',
                persOpt4: '4 pers.',
                hotelGuest: '🏡 Guesthouse / Apartment (~1,600 ₽)',
                hotelStandard: '🏨 Hotel "Tsentralnaya" / "Kovcheg" (~2,800 ₽)',
                hotelComfort: '⭐ Comfort / Hotel with breakfast (~4,200 ₽)',
                foodEconomy: '☕ Economy: bakeries, canteens (~500 ₽)',
                foodStandard: '🍽️ Standard: cozy cafes on Sovetskaya (~950 ₽)',
                foodGourmet: '🍷 Restaurants & Ural cuisine (~1,600 ₽)',
                citySearchPlaceholder: 'Search departure city (e.g. Moscow, Novosibirsk, Kazan...)',
                cityNotFoundMsg: 'City not found. Choose a city from suggestions below or clear search:',
                btnShareTrip: 'Share Budget & Itinerary',
                transportDisclaimer: '⚠️ Travel times and prices are preliminary estimates. Before buying, verify the fare and timetable for your date with the carrier.',
                ariaOpenMobileMenu: 'Open mobile menu',
                checklistTitle: 'Travel Packing Checklist:',
                checklistSubtitle: 'Essential packing list tailored to season & travel mode:',
                geoSearchDivider: '🌍 Found cities & locations:',
                searchingCities: 'Searching cities worldwide...',
                citySearchLabel: 'Departure city',
                labelPersonsExact: 'Exact number (1–20):',
                labelDaysExact: 'Exact number (1–14):',
                skipLink: 'Skip to city selection',
                labelTripDate: '📆 Trip date:',
                tripDateNote: 'Prices below are guide ranges. Pick a date and check the timetable and fare with the carrier.',
                shareCopiedToast: 'Trip itinerary and budget copied to clipboard!',
                popularCitiesHeader: 'Russian million-plus cities (quick select):',
                otherCitiesHintTitle: 'Other cities can be found via search',
                otherCitiesHintDesc: 'Type a city or town name into the search bar above to see matching places. For an arbitrary place, the calculator shows a road-distance estimate only and does not invent services.',
                otherCitiesRefineHint: '💡 Looking for another location? Try refining the city name above'
            }
        };

        function applyLanguage(lang, options = {}) {
            currentLang = (lang === 'en') ? 'en' : 'ru';
            document.documentElement.lang = currentLang;
            document.title = (currentLang === 'en')
                ? 'Trip Planner — Krasnoufimsk: Through the Ages'
                : 'Планировщик поездки — Красноуфимск: Сквозь эпохи';
            safeStorageSet('krasnoufimsk_lang', currentLang);
            // SEO: не превращаем чистый /planner.html в /planner.html?lang=... при загрузке.
            if (options && options.updateUrl) {
                try { const u = new URL(window.location.href); u.searchParams.set('lang', currentLang); history.replaceState(null, '', u); } catch (e) {}
            }
            const localizedMeta = currentLang === 'en'
                ? { title: 'Trip Planner — Krasnoufimsk: Through the Ages', description: 'Trip planner for Krasnoufimsk: estimated car, train and bus routes, budget, hotels, meals and a day-by-day programme. Check timetables and fares for your travel date.', ogDescription: 'Estimate the journey to Krasnoufimsk, the budget and a tour programme; verify timetables and fares for your date.', locale: 'en_US', url: 'https://krasnoufimsk-history.site/planner.html' }
                : { title: 'Планировщик поездки — Красноуфимск: Сквозь эпохи', description: 'Планировщик поездки в Красноуфимск: ориентировочные маршруты на авто, поезде и автобусе, оценка бюджета, гостиниц, питания и программа тура. Расписания и тарифы проверяйте на дату поездки.', ogDescription: 'Оцените дорогу до Красноуфимска, бюджет и программу поездки; расписания и тарифы проверяйте на дату.', locale: 'ru_RU', url: 'https://krasnoufimsk-history.site/planner.html' };
            const setMeta = (selector, value) => { const el = document.querySelector(selector); if (el) el.setAttribute('content', value); };
            setMeta('meta[name="description"]', localizedMeta.description);
            setMeta('meta[property="og:title"]', localizedMeta.title);
            setMeta('meta[property="og:description"]', localizedMeta.ogDescription);
            setMeta('meta[property="og:url"]', localizedMeta.url);
            setMeta('meta[property="og:locale"]', localizedMeta.locale);
            setMeta('meta[name="twitter:title"]', localizedMeta.title);
            setMeta('meta[name="twitter:description"]', localizedMeta.ogDescription);
            const canonical = document.getElementById('canonical-url'); if (canonical) canonical.href = localizedMeta.url;
            const dict = i18nPlanner[currentLang] || i18nPlanner.ru;

            // Поле поиска городов
            const searchInput = document.getElementById('city-search-input');
            if (searchInput) {
                searchInput.placeholder = dict.citySearchPlaceholder;
            }

            // Кнопка переключения языка
            const langBtnLabel = document.getElementById('lang-btn-label');
            if (langBtnLabel) langBtnLabel.textContent = (currentLang === 'ru') ? 'EN' : 'RU';
            const langBtn = document.getElementById('btn-lang-toggle');
            if (langBtn) {
                langBtn.setAttribute('aria-label', (currentLang === 'ru') ? 'Переключить на английский' : 'Switch to Russian');
                langBtn.setAttribute('title', (currentLang === 'ru') ? 'Переключить на английский' : 'Switch to Russian');
            }

            // Переводим все элементы с data-lang
            document.querySelectorAll('[data-lang]').forEach(el => {
                const key = el.getAttribute('data-lang');
                if (dict[key]) {
                    if (dict[key].includes('<span')) {
                        el.innerHTML = dict[key];
                    } else {
                        el.textContent = dict[key];
                    }
                }
            });

            // Переводим атрибуты aria-label с data-lang-aria
            document.querySelectorAll('[data-lang-aria]').forEach(el => {
                const k = el.getAttribute('data-lang-aria');
                if (dict[k]) el.setAttribute('aria-label', dict[k]);
            });

            const setPlannerAria = (selector, ruText, enText) => document.querySelectorAll(selector).forEach(el => { el.setAttribute('aria-label', currentLang === 'en' ? enText : ruText); if (el.hasAttribute('title')) el.setAttribute('title', currentLang === 'en' ? enText : ruText); });
            setPlannerAria('#weather-pill', 'Открыть прогноз погоды в Красноуфимске на 7 дней', 'Open the 7-day weather forecast for Krasnoufimsk');
            setPlannerAria('.logo-group', 'Перейти на главную страницу', 'Go to the main page');
            setPlannerAria('.btn-home-pill', 'Вернуться на главный портал города', 'Return to the main city guide');
            setPlannerAria('#btn-season-toggle', 'Выбрать сезонное оформление (дизайн)', 'Choose a seasonal theme');
            setPlannerAria('#btn-back-to-top', 'Вернуться к началу страницы', 'Back to top');
            setPlannerAria('.mobile-weather-row', 'Открыть подробный прогноз на 7 дней', 'Open the detailed 7-day forecast');
            setPlannerAria('#btn-theme-toggle', 'Сменить тему оформления', 'Toggle colour theme');
            setPlannerAria('#mobile-nav-panel', 'Мобильная навигация', 'Mobile navigation');
            setPlannerAria('#city-search-clear-btn', 'Очистить поиск', 'Clear search');
            setPlannerAria('#btn-close-weather', 'Закрыть окно погоды', 'Close weather dialog');

            // Кнопка даты поездки и открытый календарь следуют за языком интерфейса
            if (typeof updateTripDateButtonText === 'function') updateTripDateButtonText();
            const tripCalEl = document.getElementById('trip-calendar');
            if (tripCalEl && !tripCalEl.hidden && typeof renderTripCalendar === 'function') renderTripCalendar();

            // Если в строке поиска указано имя выбранного города, обновляем его под язык
            const curSelectedCity = CITIES_DATA.find(c => c.id === currentCityId);
            if (searchInput && searchInput.value && curSelectedCity) {
                if (searchInput.value === curSelectedCity.name.ru || searchInput.value === curSelectedCity.name.en) {
                    searchInput.value = curSelectedCity.name[currentLang] || curSelectedCity.name.ru;
                }
            }

            // Кнопки дней
            const dayBtns = document.querySelectorAll('.setting-btn[data-type="days"]');
            if (dayBtns.length >= 4) {
                dayBtns[0].textContent = dict.daysOpt1;
                dayBtns[1].textContent = dict.daysOpt2;
                dayBtns[2].textContent = dict.daysOpt3;
                dayBtns[3].textContent = dict.daysOpt4;
            }

            // Кнопки количества человек
            const persBtns = document.querySelectorAll('.setting-btn[data-type="persons"]');
            if (persBtns.length >= 4) {
                persBtns[0].textContent = dict.persOpt1;
                persBtns[1].textContent = dict.persOpt2;
                persBtns[2].textContent = dict.persOpt3;
                persBtns[3].textContent = dict.persOpt4;
            }

            // Опции отелей
            const hotelSelect = document.getElementById('hotel-select');
            if (hotelSelect && hotelSelect.options.length >= 3) {
                hotelSelect.options[0].textContent = dict.hotelGuest;
                hotelSelect.options[1].textContent = dict.hotelStandard;
                hotelSelect.options[2].textContent = dict.hotelComfort;
            }

            // Опции питания
            const foodSelect = document.getElementById('food-select');
            if (foodSelect && foodSelect.options.length >= 3) {
                foodSelect.options[0].textContent = dict.foodEconomy;
                foodSelect.options[1].textContent = dict.foodStandard;
                foodSelect.options[2].textContent = dict.foodGourmet;
            }

            // Обновляем кастомные выпадающие списки (отель и питание)
            if (typeof updateCustomSelectLabels === 'function') {
                updateCustomSelectLabels();
            }

            // Метки погоды
            const feelsLbl = document.getElementById('weather-hero-feels-label');
            if (feelsLbl) feelsLbl.textContent = (currentLang === 'en') ? 'Feels like' : 'Ощущается как';
            const lblWind = document.getElementById('lbl-wind');
            if (lblWind) lblWind.textContent = (currentLang === 'en') ? '💨 Wind' : '💨 Ветер';
            const lblHum = document.getElementById('lbl-humidity');
            if (lblHum) lblHum.textContent = (currentLang === 'en') ? '💧 Humidity' : '💧 Влажность';
            const lblPrecip = document.getElementById('lbl-precip');
            if (lblPrecip) lblPrecip.textContent = (currentLang === 'en') ? '🌧️ Precipitation' : '🌧️ Осадки';
            const lblPress = document.getElementById('lbl-pressure');
            if (lblPress) lblPress.textContent = (currentLang === 'en') ? '⏱️ Pressure' : '⏱️ Давление';

            // Названия в меню сезона
            const savedSeason = safeStorageGet('krasnoufimsk_season', 'auto');
            applySeason(savedSeason, false);

            // Обновляем отображение погоды под текущий язык
            if (typeof updateWeatherDisplay === 'function') {
                updateWeatherDisplay(currentLang);
            }

            // Перерендериваем города и смету под текущий язык
            renderCitySelectors();
            updateCityView(currentCityId);
        }

        /* =========================================================================
           3. ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
           ========================================================================= */
        function initApp() {
            // Тема (светлая / тёмная)
            const savedTheme = safeStorageGet('kuf_theme') || safeStorageGet('krasnoufimsk_theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                document.getElementById('theme-btn-icon').textContent = '☀️';
            }

            // Дизайн (сезон года)
            const savedSeason = safeStorageGet('krasnoufimsk_season', 'auto');
            applySeason(savedSeason, false);

            // Язык: ?lang=ru|en имеет приоритет над сохранённым выбором.
            let queryLang = null;
            try { queryLang = new URLSearchParams(window.location.search).get('lang'); } catch (e) {}
            const savedLang = (queryLang === 'ru' || queryLang === 'en') ? queryLang : safeStorageGet('krasnoufimsk_lang', 'ru');
            currentLang = (savedLang === 'en') ? 'en' : 'ru';
            applyLanguage(currentLang);

            // Загрузка живой погоды для Красноуфимска
            fetchKrasnoufimskWeather();

            // Инициализация выбранного города (Екатеринбург по умолчанию), транспорта и сметы
            selectCity(currentCityId || 'ekb');

            // Плавное появление секций и карточек при скролле (Scroll Reveal)
            initScrollReveal();

            // Обработчики кнопок шапки
            const themeBtn = document.getElementById('btn-theme-toggle');
            if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

            const langBtn = document.getElementById('btn-lang-toggle');
            if (langBtn) langBtn.addEventListener('click', toggleLanguage);

            const mobileBtn = document.getElementById('btn-mobile-menu');
            const mobilePanel = document.getElementById('mobile-nav-panel');
            if (mobileBtn && mobilePanel) {
                mobileBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    mobilePanel.classList.toggle('show');
                });
            }

            // Закрытие выпадающего меню сезона, поиска, мобильной панели и кастомных списков при клике вне их
            document.addEventListener('click', (e) => {
                if (mobilePanel && mobilePanel.classList.contains('show')) {
                    if (!mobilePanel.contains(e.target) && !mobileBtn?.contains(e.target)) {
                        mobilePanel.classList.remove('show');
                    }
                }
                const wrap = document.getElementById('season-dropdown-wrap');
                const menu = document.getElementById('season-dropdown-menu');
                if (wrap && menu && !wrap.contains(e.target)) {
                    menu.classList.remove('show');
                }
                const citySearchWrap = document.querySelector('.city-search-container');
                const cityDropdown = document.getElementById('city-search-dropdown');
                if (citySearchWrap && cityDropdown && !citySearchWrap.contains(e.target)) {
                    cityDropdown.classList.remove('show');
                }
                const hotelWrap = document.getElementById('hotel-custom-wrap');
                const hotelMenu = document.getElementById('hotel-menu');
                if (hotelWrap && hotelMenu && !hotelWrap.contains(e.target)) {
                    hotelWrap.classList.remove('open');
                    hotelMenu.classList.remove('show');
                    document.getElementById('hotel-trigger')?.classList.remove('active');
                }
                const foodWrap = document.getElementById('food-custom-wrap');
                const foodMenu = document.getElementById('food-menu');
                if (foodWrap && foodMenu && !foodWrap.contains(e.target)) {
                    foodWrap.classList.remove('open');
                    foodMenu.classList.remove('show');
                    document.getElementById('food-trigger')?.classList.remove('active');
                }
            });

            // Автоматическое закрытие мобильного меню при переходе на экран ПК
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && mobilePanel) {
                    mobilePanel.classList.remove('show');
                }
            });
        }

        function closeMobilePanel() {
            const panel = document.getElementById('mobile-nav-panel');
            if (panel) panel.classList.remove('show');
        }
        window.closeMobilePanel = closeMobilePanel;

        function toggleTheme() {
            const isDark = document.body.classList.toggle('dark-mode');
            const themeVal = isDark ? 'dark' : 'light';
            safeStorageSet('krasnoufimsk_theme', themeVal);
            safeStorageSet('kuf_theme', themeVal);
            document.getElementById('theme-btn-icon').textContent = isDark ? '☀️' : '🌙';
        }

        function toggleLanguage() {
            currentLang = (currentLang === 'ru') ? 'en' : 'ru';
            safeStorageSet('krasnoufimsk_lang', currentLang);
            applyLanguage(currentLang, { updateUrl: true });
            fetchKrasnoufimskWeather();
        }

        /* =========================================================================
           3.1. МОДУЛЬ ВЫБОРА ДИЗАЙНА (СЕЗОН ГОДА)
           ========================================================================= */
        function getNaturalSeason() {
            const m = new Date().getMonth(); // 0 - Jan ... 11 - Dec
            if (m === 11 || m === 0 || m === 1) return 'winter';
            if (m >= 2 && m <= 4) return 'spring';
            if (m >= 5 && m <= 7) return 'summer';
            return 'autumn';
        }

        function toggleSeasonMenu(e) {
            if (e) e.stopPropagation();
            const menu = document.getElementById('season-dropdown-menu');
            if (menu) menu.classList.toggle('show');
        }

        function applySeason(season, save = true) {
            let actualSeason = season;
            if (season === 'auto') {
                actualSeason = getNaturalSeason();
            }
            document.body.classList.remove('season-winter', 'season-spring', 'season-summer', 'season-autumn');
            document.body.classList.add('season-' + actualSeason);

            if (save) {
                safeStorageSet('krasnoufimsk_season', season);
            }

            const seasonLabels = {
                autumn: { ru: 'Осень', en: 'Autumn', icon: '🍂' },
                winter: { ru: 'Зима', en: 'Winter', icon: '❄️' },
                spring: { ru: 'Весна', en: 'Spring', icon: '🌱' },
                summer: { ru: 'Лето', en: 'Summer', icon: '☀️' }
            };
            const currentInfo = seasonLabels[actualSeason] || seasonLabels.autumn;
            const isAutoSeason = season === 'auto';
            const btnIcon = document.getElementById('season-btn-icon');
            const btnLabel = document.getElementById('season-btn-label');
            const btnToggle = document.getElementById('btn-season-toggle');
            if (btnIcon) btnIcon.textContent = isAutoSeason ? '🔄' : currentInfo.icon;
            if (btnLabel) btnLabel.textContent = isAutoSeason ? (currentLang === 'en' ? 'Auto' : 'Авто') : (currentInfo[currentLang] || currentInfo.ru);
            if (btnToggle) {
                const actualLabel = currentInfo[currentLang] || currentInfo.ru;
                btnToggle.title = isAutoSeason
                    ? (currentLang === 'en' ? `Seasonal theme: Auto (currently ${actualLabel})` : `Сезонная тема: Авто (сейчас применена «${actualLabel}»)`)
                    : (currentLang === 'en' ? `Seasonal theme: ${actualLabel}` : `Сезонная тема: «${actualLabel}»`);
            }

            // Активный пункт в меню шапки и кнопки в мобильном меню показывают именно выбранный режим,
            // а не календарный сезон, который режим «Авто» применил к оформлению.
            document.querySelectorAll('.season-menu-item, .season-chip-btn').forEach(btn => {
                const isSelected = btn.getAttribute('data-season') === season;
                btn.classList.toggle('active', isSelected);
                btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
            });

            // Закрываем меню в шапке
            const menu = document.getElementById('season-dropdown-menu');
            if (menu) menu.classList.remove('show');

            // Обновляем чек-лист сборов в дорогу под новый сезон
            if (typeof renderChecklist === 'function') {
                renderChecklist();
            }
        }

        /* =========================================================================
           3.2. МОДУЛЬ ЖИВОЙ ПОГОДЫ (OPEN-METEO API)
           ========================================================================= */
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

        function getMetInfo(code) {
            if (!code) return { ru: 'Переменная облачность', en: 'Partly cloudy', icon: '⛅' };
            if (MET_CODES[code]) return MET_CODES[code];
            const base = code.replace(/_(day|night|polartwilight)$/, '');
            if (MET_CODES[base]) return MET_CODES[base];
            if (code.includes('thunder')) return { ru: 'Гроза', en: 'Thunderstorm', icon: '⛈️' };
            if (code.includes('snow')) return { ru: 'Снег', en: 'Snow', icon: '🌨️' };
            if (code.includes('rain')) return { ru: 'Дождь', en: 'Rain', icon: '🌧️' };
            if (code.includes('clear')) return { ru: 'Ясно', en: 'Clear sky', icon: '☀️' };
            return { ru: 'Переменная облачность', en: 'Partly cloudy', icon: '⛅' };
        }

        let cachedWeatherState = null;

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

        function renderForecastDays(daysList, lang = currentLang) {
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

        function updateWeatherDisplay(lang = currentLang) {
            if (!cachedWeatherState) {
                const season = typeof getNaturalSeason === 'function' ? getNaturalSeason() : 'autumn';
                const fallbackDays = getFallbackDaysList(season);
                const baseCur = fallbackDays[0];
                cachedWeatherState = {
                    current: {
                        temp: baseCur.high,
                        feels: baseCur.high - 2,
                        windMs: '—',
                        hum: '—',
                        precip: '—',
                        pressure: '—',
                        wmo: baseCur.wmo,
                        code: baseCur.symCode
                    },
                    daysList: fallbackDays,
                    timeStr: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                    isOffline: true
                };
            }

            const data = cachedWeatherState;
            const isEn = (lang === 'en');
            const tempStr = (data.current.temp > 0 ? '+' : '') + data.current.temp + '°C';

            // Навбар и мобильное меню
            const elNavTemp = document.getElementById('weather-temp');
            const elNavIcon = document.getElementById('weather-icon');
            if (elNavTemp) elNavTemp.textContent = tempStr;
            if (elNavIcon) elNavIcon.textContent = data.current.wmo.icon;

            const elMobTemp = document.getElementById('mobile-weather-temp');
            const elMobIcon = document.getElementById('mobile-weather-icon');
            if (elMobTemp) elMobTemp.textContent = tempStr;
            if (elMobIcon) elMobIcon.textContent = data.current.wmo.icon;

            // Модальное окно
            const elHeroTemp = document.getElementById('weather-hero-temp');
            const elHeroSummary = document.getElementById('weather-hero-summary');
            const elFeels = document.getElementById('weather-feels');
            const elWind = document.getElementById('weather-wind');
            const elHum = document.getElementById('weather-humidity');
            const elPrecip = document.getElementById('weather-precip');
            const elPress = document.getElementById('weather-pressure');
            const elMainIcon = document.getElementById('weather-modal-main-icon');
            const elSeasonPill = document.getElementById('weather-season-pill');
            const elTime = document.getElementById('weather-time');

            if (elHeroTemp) elHeroTemp.textContent = tempStr;
            if (elHeroSummary) {
                const summaryText = data.current.wmo[lang] || data.current.wmo.ru;
                elHeroSummary.textContent = `${data.current.wmo.icon} ${summaryText}`;
            }
            if (elFeels) elFeels.textContent = (data.current.feels > 0 ? '+' : '') + data.current.feels + '°C';
            if (elWind) elWind.textContent = ((data.isOffline && !data.isCached) || data.current.windMs === '—') ? '—' : (String(data.current.windMs).replace('.', isEn ? '.' : ',') + (isEn ? ' m/s' : ' м/с'));
            if (elHum) elHum.textContent = ((data.isOffline && !data.isCached) || data.current.hum === '—') ? '—' : (data.current.hum + '%');
            if (elPrecip) elPrecip.textContent = ((data.isOffline && !data.isCached) || data.current.precip === '—') ? '—' : (String(data.current.precip).replace('.', isEn ? '.' : ',') + (isEn ? ' mm' : ' мм'));
            if (elPress) elPress.textContent = ((data.isOffline && !data.isCached) || data.current.pressure === '—') ? '—' : (data.current.pressure + (isEn ? ' mmHg' : ' мм'));
            if (elMainIcon) elMainIcon.textContent = data.current.wmo.icon;

            const season = typeof getNaturalSeason === 'function' ? getNaturalSeason() : 'autumn';
            const seasonLabels = {
                winter: { ru: '❄️ Уральская зима', en: '❄️ Ural Winter' },
                spring: { ru: '🌱 Весеннее пробуждение', en: '🌱 Spring Awakening' },
                summer: { ru: '☀️ Тёплое уральское лето', en: '☀️ Ural Summer' },
                autumn: { ru: '🍂 Золотая уральская осень', en: '🍂 Golden Ural Autumn' }
            };
            if (elSeasonPill) {
                elSeasonPill.textContent = (seasonLabels[season] && seasonLabels[season][lang]) || seasonLabels[season].ru;
            }

            // Статус-бейдж и фактический провайдер в модальном окне
            const providerTag = document.querySelector('.forecast-service-tag');
            if (providerTag) providerTag.textContent = getWeatherProviderLabel(data, isEn);
            const badge = document.getElementById('weather-card-badge');
            if (badge) {
                badge.className = 'weather-status-badge' + (data.isOffline ? ' badge-offline' : '');
                badge.textContent = getWeatherBadgeLabel(data, isEn);
            }

            if (elTime) elTime.textContent = formatWeatherUpdatedLabel(data, isEn);

            // 7 дней прогноза
            renderForecastDays(data.daysList, lang);
        }

        let lastWeatherTrigger = null;
        function openWeatherModal() {
            updateWeatherDisplay(currentLang);
            const modal = document.getElementById('weather-modal-backdrop');
            if (!modal) return;
            lastWeatherTrigger = document.activeElement;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            const dialog = modal.querySelector('[role="dialog"]') || modal;
            if (!dialog.hasAttribute('tabindex')) dialog.setAttribute('tabindex', '-1');
            const closeBtn = modal.querySelector('#btn-close-weather, button');
            setTimeout(() => { (closeBtn || dialog).focus(); }, 50);
        }

        function closeWeatherModal() {
            const modal = document.getElementById('weather-modal-backdrop');
            if (modal) { modal.classList.remove('active'); modal.setAttribute('aria-hidden', 'true'); }
            if (lastWeatherTrigger && document.contains(lastWeatherTrigger)) lastWeatherTrigger.focus();
            lastWeatherTrigger = null;
        }
        document.addEventListener('keydown', function(e) {
            if (e.key !== 'Tab') return;
            const modal = document.querySelector('.weather-modal-backdrop.active');
            if (!modal) return;
            const items = Array.from(modal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(el => el.offsetParent !== null || el === document.activeElement);
            if (!items.length) return;
            const first = items[0], last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });

        function handleWeatherBackdropClick(e) {
            if (e.target && e.target.id === 'weather-modal-backdrop') {
                closeWeatherModal();
            }
        }

        // Поддержка закрытия модальных окон и меню по клавише Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeWeatherModal();
                if (typeof closeMobilePanel === 'function') closeMobilePanel();
                const hotelWrap = document.getElementById('hotel-custom-wrap');
                const foodWrap = document.getElementById('food-custom-wrap');
                if (hotelWrap) hotelWrap.classList.remove('open');
                if (foodWrap) foodWrap.classList.remove('open');
            }
        });

        async function refreshWeatherWithAnimation() {
            const icon = document.getElementById('weather-refresh-icon');
            const text = document.getElementById('weather-refresh-text');
            const badge = document.getElementById('weather-card-badge');
            const btn = document.getElementById('btn-refresh-weather');
            const isEn = (currentLang === 'en');

            if (icon) icon.classList.add('spinning');
            if (btn) {
                btn.disabled = true;
                btn.style.opacity = '0.7';
                btn.style.pointerEvents = 'none';
            }
            if (text) text.textContent = isEn ? 'Updating...' : 'Обновление...';
            if (badge) {
                badge.className = 'weather-status-badge badge-loading';
                badge.textContent = isEn ? '● Loading...' : '● Загрузка...';
            }

            const minDelay = new Promise(resolve => setTimeout(resolve, 650));

            try {
                await Promise.all([fetchKrasnoufimskWeather(), minDelay]);
                if (cachedWeatherState && !cachedWeatherState.isOffline) {
                    showToast(isEn ? 'Weather forecast updated!' : 'Прогноз погоды успешно обновлён!');
                } else if (cachedWeatherState && cachedWeatherState.isCached) {
                    showToast(isEn
                        ? '⚠️ Offline: showing the last saved forecast'
                        : '⚠️ Нет связи с сервером. Показан последний сохранённый прогноз');
                } else {
                    showToast(isEn
                        ? '⚠️ Offline: baseline seasonal forecast shown'
                        : '⚠️ Нет связи с сервером. Показан базовый сезонный прогноз');
                }
            } catch (err) {
                console.error('Weather refresh error:', err);
                showToast(isEn ? '⚠️ Failed to update weather' : '⚠️ Не удалось обновить погоду');
            } finally {
                if (icon) icon.classList.remove('spinning');
                if (btn) {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }
                if (text) text.textContent = isEn ? 'Refresh' : 'Обновить';
                if (badge && badge.classList.contains('badge-loading')) {
                    badge.classList.remove('badge-loading');
                }
            }
        }

        async function fetchKrasnoufimskWeather() {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            try {
                // 1. Пробуем получить данные через Met.no (высокая точность и стабильность)
                let data = null;
                try {
                    const metRes = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=56.6167&lon=57.7667', { signal: controller.signal });
                    if (metRes.ok) {
                        const metData = await metRes.json();
                        const ts = metData.properties && metData.properties.timeseries;
                        if (ts && ts.length > 0) {
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
                                let chosen = points.find(p => p.time.includes('T12:00:00Z') || p.time.includes('T11:00:00Z')) || points[0];
                                let code = (chosen.data.next_1_hours && chosen.data.next_1_hours.summary.symbol_code) ||
                                           (chosen.data.next_6_hours && chosen.data.next_6_hours.summary.symbol_code) ||
                                           'partlycloudy_day';
                                return {
                                    dateStr: dStr,
                                    dateObj: new Date(dStr + 'T12:00:00'),
                                    high, low,
                                    wmo: getMetInfo(code),
                                    symCode: code
                                };
                            });

                            clearTimeout(timeoutId);
                            const now = new Date();
                            const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

                            cachedWeatherState = {
                                current: { temp, feels, windMs, hum, precip, pressure, wmo: getMetInfo(curCode), code: curCode },
                                daysList,
                                timeStr,
                                timestamp: Date.now(),
                                provider: 'met.no',
                                isOffline: false,
                                isCached: false
                            };
                            saveWeatherCache(cachedWeatherState);
                            updateWeatherDisplay(currentLang);
                            return;
                        }
                    }
                } catch(e) {}

                // 2. Альтернативный провайдер Open-Meteo
                const url = 'https://api.open-meteo.com/v1/forecast?latitude=56.6160&longitude=57.7660&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,surface_pressure,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FYekaterinburg';
                const res = await fetch(url, { signal: controller.signal });
                clearTimeout(timeoutId);
                if (!res.ok) throw new Error('Weather API network response was not ok');
                data = await res.json();

                const cur = data.current;
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
                if (data.daily && data.daily.time) {
                    daysList = data.daily.time.slice(0, 7).map((dStr, idx) => ({
                        dateStr: dStr,
                        dateObj: new Date(dStr + 'T12:00:00'),
                        high: Math.round(data.daily.temperature_2m_max[idx]),
                        low: Math.round(data.daily.temperature_2m_min[idx]),
                        wmo: getMetInfo(wmoMap[data.daily.weather_code[idx]] || 'partlycloudy_day'),
                        symCode: wmoMap[data.daily.weather_code[idx]] || 'partlycloudy_day'
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

                updateWeatherDisplay(currentLang);
            } catch (err) {
                clearTimeout(timeoutId);
                const restoredWeather = restoreWeatherCache();
                if (restoredWeather) {
                    console.warn('Weather fetch fallback to the last saved forecast:', err);
                    cachedWeatherState = restoredWeather;
                    updateWeatherDisplay(currentLang);
                    return;
                }
                console.warn('Weather fetch fallback to fresh baseline:', err);
                const season = typeof getNaturalSeason === 'function' ? getNaturalSeason() : 'autumn';
                const fallbackDays = getFallbackDaysList(season);
                const baseCur = fallbackDays[0];
                const now = new Date();
                const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

                cachedWeatherState = {
                    current: {
                        temp: baseCur.high,
                        feels: baseCur.high - 2,
                        windMs: '—',
                        hum: '—',
                        precip: '—',
                        pressure: '—',
                        wmo: baseCur.wmo,
                        code: baseCur.symCode
                    },
                    daysList: fallbackDays,
                    timeStr: timeStr,
                    provider: 'baseline',
                    isOffline: true
                };
                updateWeatherDisplay(currentLang);
            }
        }

        /* =========================================================================
           4. РЕНДЕР СЕЛЕКТОРОВ ГОРОДОВ И ЖИВОЙ ПОИСК (ВКЛЮЧАЯ GEOCODING API)
           ========================================================================= */
        let geoSearchTimer = null;
        let geoAbortController = null;
        let currentGeoSearchQuery = '';
        let externalGeoResults = [];
        let isGeoSearching = false;

        const GEOCODING_CACHE_KEY = 'kuf_geocoding_cache_v1';
        const GEOCODING_CACHE_LIMIT = 40;
        const GEOCODING_CACHE_MAX_AGE = 90 * 24 * 60 * 60 * 1000;

        function normalizeGeoCacheKey(query, lang) {
            return `${lang === 'en' ? 'en' : 'ru'}:${String(query || '').trim().toLocaleLowerCase().replace(/\s+/g, ' ')}`;
        }

        function readGeocodingCache() {
            try {
                const parsed = JSON.parse(safeStorageGet(GEOCODING_CACHE_KEY, '{}'));
                return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
            } catch (err) {
                return {};
            }
        }

        function normalizeGeoResult(item) {
            if (!item || item.id === undefined || !item.name) return null;
            const latitude = Number(item.latitude);
            const longitude = Number(item.longitude);
            if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
            return {
                id: item.id,
                name: String(item.name),
                latitude,
                longitude,
                country: String(item.country || ''),
                admin1: String(item.admin1 || '')
            };
        }

        function getCachedGeoResults(query, lang) {
            const cache = readGeocodingCache();
            const entry = cache[normalizeGeoCacheKey(query, lang)];
            if (!entry || !Array.isArray(entry.results)) return null;
            const timestamp = Number(entry.timestamp);
            if (!Number.isFinite(timestamp) || timestamp > Date.now() + 5 * 60 * 1000 || timestamp < Date.now() - GEOCODING_CACHE_MAX_AGE) return null;
            const existingNames = new Set(
                CITIES_DATA.flatMap(c => [
                    (c.name.ru || '').toLowerCase(),
                    (c.name.en || '').toLowerCase(),
                    String(c.id || '').toLowerCase()
                ])
            );
            return entry.results
                .map(normalizeGeoResult)
                .filter(item => item && !existingNames.has(item.name.toLowerCase()))
                .slice(0, 6);
        }

        function saveGeoResults(query, lang, results) {
            const normalizedResults = (Array.isArray(results) ? results : [])
                .map(normalizeGeoResult)
                .filter(Boolean)
                .slice(0, 6);
            const cache = readGeocodingCache();
            cache[normalizeGeoCacheKey(query, lang)] = {
                timestamp: Date.now(),
                results: normalizedResults
            };
            Object.keys(cache)
                .sort((a, b) => Number(cache[b].timestamp || 0) - Number(cache[a].timestamp || 0))
                .slice(GEOCODING_CACHE_LIMIT)
                .forEach(key => delete cache[key]);
            safeStorageSet(GEOCODING_CACHE_KEY, JSON.stringify(cache));
        }

        // Расчёт расстояния между координатами с учётом извилистости уральских дорог (~1.25)
        function calculateHaversineKm(lat1, lon1, lat2 = 56.6160, lon2 = 57.7660) {
            const R = 6371; // Радиус Земли в км
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                      Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const straight = R * c;
            return Math.max(15, Math.round(straight * 1.25));
        }

        // Динамическое создание объекта города с логистикой и ценами для любого населённого пункта
        function createDynamicCity(geoItem) {
            const lat = geoItem.latitude;
            const lon = geoItem.longitude;
            const straightKm = calculateHaversineKm(lat, lon);
            const roadKm = Math.max(1, Math.round(straightKm * 1.3));
            const cityName = geoItem.name;
            const regionName = geoItem.admin1 || geoItem.country || '';
            const carHours = Math.max(1, Math.round(roadKm / 70));
            const fuelLiters = (roadKm / 100) * 8.5;
            const fuelPrice = 62;
            const carPrice = Math.round(fuelLiters * fuelPrice);
            const carPriceMin = Math.max(50, Math.round(carPrice * 0.8 / 50) * 50);
            const carPriceMax = Math.max(carPriceMin, Math.round(carPrice * 1.25 / 50) * 50);
            const carTimeRu = carHours >= 24 ? `~${Math.floor(carHours / 24)} дн. ${carHours % 24} ч` : `~${carHours} ч`;
            const carTimeEn = carHours >= 24 ? `~${Math.floor(carHours / 24)} d ${carHours % 24} h` : `~${carHours} h`;
            const options = [
                {
                    type: 'car', icon: '🚗',
                    title: { ru: `На автомобиле (оценка ${roadKm} км)`, en: `By car (estimated ${roadKm} km)` },
                    badge: { ru: 'Оценка, а не готовый маршрут', en: 'Estimate, not a ready route' },
                    time: { ru: carTimeRu, en: carTimeEn },
                    priceOneWay: carPrice, priceMin: carPriceMin, priceMax: carPriceMax,
                    desc: {
                        ru: `Расстояние по прямой ${straightKm} км × коэффициент дорожной сети 1,3. Топливо ≈${fuelLiters.toFixed(0)} л при 8,5 л/100 км; платные участки, пробки и остановки не учтены. Постройте фактический маршрут в навигаторе.`,
                        en: `Straight-line distance ${straightKm} km × a 1.3 road-network factor. Fuel ≈${fuelLiters.toFixed(0)} L at 8.5 L/100 km; tolls, traffic and stops are excluded. Build the actual route in a navigator.`
                    }
                },
                {
                    type: 'verify_transport', icon: '🔎',
                    title: { ru: 'Общественный транспорт: проверить на дату', en: 'Public transport: check for your date' },
                    badge: { ru: 'Прямой рейс не гарантируется', en: 'No direct service is implied' },
                    time: { ru: 'зависит от маршрута и пересадок', en: 'depends on route and transfers' },
                    priceOneWay: null, priceMin: null, priceMax: null,
                    desc: {
                        ru: 'Для произвольного города калькулятор не выдумывает поезд, автобус или авиарейс. Выберите дату и проверьте варианты у перевозчика; затем добавьте фактический тариф к смете.',
                        en: 'For an arbitrary city the calculator does not invent a train, bus or flight. Pick a date and check the options with the carrier, then add the real fare to the estimate.'
                    }
                }
            ];
            return { id: 'geo_' + geoItem.id, name: { ru: cityName, en: cityName }, region: regionName, distKm: roadKm, straightKm: straightKm, distanceKind: 'road-estimate', lat: lat, lon: lon, isPopular: false, isDynamic: true, options: options };
        }

        // Запрос к Open-Meteo Geocoding API (без ключей, бесплатный и надёжный)
        async function fetchExternalCities(query) {
            if (!query || query.trim().length < 2) {
                if (geoAbortController) {
                    geoAbortController.abort();
                    geoAbortController = null;
                }
                externalGeoResults = [];
                isGeoSearching = false;
                renderCitySearchDropdown(query);
                return;
            }

            if (geoAbortController) geoAbortController.abort();
            geoAbortController = new AbortController();
            const currentQuery = query.trim().slice(0, 80);

            try {
                const langParam = (currentLang === 'en') ? 'en' : 'ru';
                if (navigator.onLine === false) {
                    const offlineCached = getCachedGeoResults(currentQuery, langParam);
                    if (offlineCached) {
                        externalGeoResults = offlineCached;
                        return;
                    }
                    throw new Error('Offline and this geocoding query has not been cached');
                }
                const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(currentQuery)}&count=6&language=${langParam}&format=json`;
                const res = await fetch(url, { signal: geoAbortController.signal });
                if (!res.ok) throw new Error('Geocoding status ' + res.status);
                const data = await res.json();

                // Игнорируем ответ, если пользователь уже изменил поисковый запрос
                const activeInput = document.getElementById('city-search-input');
                if (activeInput && activeInput.value.trim() !== currentQuery) {
                    return;
                }

                if (data && data.results && Array.isArray(data.results)) {
                    // Исключаем те, которые уже есть в CITIES_DATA
                    const existingNames = new Set(
                        CITIES_DATA.flatMap(c => [
                            (c.name.ru || '').toLowerCase(),
                            (c.name.en || '').toLowerCase(),
                            c.id.toLowerCase()
                        ])
                    );

                    externalGeoResults = data.results
                        .filter(item => {
                            const itemName = (item.name || '').toLowerCase();
                            return !existingNames.has(itemName);
                        })
                        .map(item => ({
                            id: item.id,
                            name: item.name,
                            latitude: item.latitude,
                            longitude: item.longitude,
                            country: item.country || '',
                            admin1: item.admin1 || ''
                        }));
                    saveGeoResults(currentQuery, langParam, externalGeoResults);
                } else {
                    externalGeoResults = [];
                    saveGeoResults(currentQuery, langParam, externalGeoResults);
                }
            } catch(err) {
                if (err.name === 'AbortError') return;
                console.warn('Geocoding search error:', err);
                externalGeoResults = getCachedGeoResults(currentQuery, currentLang === 'en' ? 'en' : 'ru') || [];
            } finally {
                const activeInput = document.getElementById('city-search-input');
                if (!activeInput || activeInput.value.trim() === currentQuery) {
                    isGeoSearching = false;
                    renderCitySearchDropdown(currentQuery);
                }
            }
        }

        function selectDynamicCity(cityId) {
            const geoItem = externalGeoResults.find(g => ('geo_' + g.id) === cityId);
            if (geoItem) {
                const fullCity = createDynamicCity(geoItem);
                const existingIdx = CITIES_DATA.findIndex(c => c.id === fullCity.id);
                if (existingIdx === -1) {
                    CITIES_DATA.unshift(fullCity);
                } else {
                    CITIES_DATA[existingIdx] = fullCity;
                }
            }
            selectCity(cityId);
        }

        function showCitySearchDropdown() {
            const dropdown = document.getElementById('city-search-dropdown');
            if (dropdown) {
                const input = document.getElementById('city-search-input');
                renderCitySearchDropdown(input ? input.value : '');
                dropdown.classList.add('show');
            }
        }

        function renderCitySearchDropdown(searchQuery = '') {
            const dropdown = document.getElementById('city-search-dropdown');
            if (!dropdown) return;

            const query = (searchQuery || '').trim().toLowerCase();
            const kmUnit = (currentLang === 'en') ? 'km' : 'км';
            const dict = i18nPlanner[currentLang] || i18nPlanner.ru;
            let html = '';
            let count = 0;

            // Если поле пустое — выводим заголовок популярных направлений
            if (!query) {
                html += `
                    <div class="city-search-dropdown-header">
                        <span>📌</span>
                        <span>${dict.popularCitiesHeader || 'Популярные города отправления (быстрый выбор):'}</span>
                    </div>
                `;
            }

            // 1. Показываем совпадающие локальные города
            CITIES_DATA.forEach(city => {
                const nameRu = (city.name.ru || '').toLowerCase();
                const nameEn = (city.name.en || '').toLowerCase();
                const idLower = city.id.toLowerCase();
                const displayName = city.name[currentLang] || city.name.ru;
                const isSelected = (city.id === currentCityId);

                let matches = true;
                if (query) {
                    matches = nameRu.includes(query) || nameEn.includes(query) || idLower.includes(query);
                }

                if (matches) {
                    count++;
                    const modesIcons = Array.from(new Set(city.options.map(o => o.icon.split('+')[0]))).join(' ');
                    html += `
                        <div class="city-search-dropdown-item ${isSelected ? 'active' : ''}" onclick="selectCity('${city.id}')">
                            <div class="city-search-item-left">
                                <span>🏙️</span>
                                <div>
                                    <span>${displayName}</span>
                                    <span style="font-size:0.8rem; color:var(--text-muted); margin-left:6px;">(~${city.distKm} ${kmUnit})</span>
                                </div>
                            </div>
                            <div class="city-search-item-right">
                                <span>${modesIcons}</span>
                            </div>
                        </div>
                    `;
                }
            });

            // 2. Если идет поиск по геокодеру — выводим индикатор
            if (isGeoSearching) {
                html += `
                    <div class="city-search-loading">
                        <span class="city-search-loading-spinner"></span>
                        <span>${dict.searchingCities || 'Поиск городов...'}</span>
                    </div>
                `;
            } else if (externalGeoResults.length > 0) {
                // 3. Выводим найденные города из Geocoding API
                html += `<div class="city-search-divider">${dict.geoSearchDivider || '🌍 Найденные города и населённые пункты:'}</div>`;
                externalGeoResults.forEach(item => {
                    count++;
                    const dist = calculateHaversineKm(item.latitude, item.longitude);
                    const regionLabel = item.admin1 ? `${item.admin1}, ${item.country}` : item.country;
                    html += `
                        <div class="city-search-dropdown-item" onclick="selectDynamicCity('geo_${item.id}')">
                            <div class="city-search-item-left">
                                <span>🌍</span>
                                <div>
                                    <span style="font-weight:600;">${escapeHtml(item.name)}</span>
                                    <span style="font-size:0.78rem; color:var(--text-muted); margin-left:6px;">(${escapeHtml(regionLabel)})</span>
                                </div>
                            </div>
                            <div class="city-search-item-right">
                                <span>~${dist} ${kmUnit}</span>
                            </div>
                        </div>
                    `;
                });
            }

            if (count === 0 && !isGeoSearching) {
                html = `<div style="padding:14px; text-align:center; color:var(--text-muted); font-size:0.88rem;">${(currentLang === 'en' ? 'No cities found. Try typing another city name.' : 'Город не найден. Попробуйте ввести другое название.')}</div>`;
            }

            // 4. Постоянная плашка-подсказка внизу выпадающего списка
            if (!query) {
                html += `
                    <div class="city-search-dropdown-footer">
                        <div class="city-search-footer-icon">🔍</div>
                        <div class="city-search-footer-text">
                            <div class="city-search-footer-title">${dict.otherCitiesHintTitle || 'Другие города можно найти через поиск:'}</div>
                            <div class="city-search-footer-desc">${dict.otherCitiesHintDesc || 'Введите название города или посёлка в поле выше — поиск предложит найденные варианты. Для произвольного пункта калькулятор покажет оценку автомобильной дороги и не будет выдумывать рейсы.'}</div>
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="city-search-dropdown-footer-small">
                        <span>${dict.otherCitiesRefineHint || '💡 Не нашли нужный пункт? Уточните написание города в строке поиска'}</span>
                    </div>
                `;
            }

            dropdown.innerHTML = html;
        }

        function renderCitySelectors(searchQuery = '') {
            const chipsBox = document.getElementById('city-chips-container');
            const notFoundEl = document.getElementById('city-search-not-found');
            if (!chipsBox) return;

            let chipsHtml = '';
            const query = (searchQuery || '').trim().toLowerCase();
            let matchCount = 0;

            // Рендерим быстрые кнопки (только популярные хабы ИЛИ совпадения поиска + обязательно выбранный город)
            CITIES_DATA.forEach(city => {
                const nameRu = (city.name.ru || '').toLowerCase();
                const nameEn = (city.name.en || '').toLowerCase();
                const idLower = city.id.toLowerCase();
                const displayName = city.name[currentLang] || city.name.ru;
                const isSelected = (city.id === currentCityId);

                let showInChips = false;
                if (!query) {
                    showInChips = city.isPopular || isSelected;
                } else {
                    showInChips = nameRu.includes(query) || nameEn.includes(query) || idLower.includes(query);
                }

                if (showInChips) {
                    matchCount++;
                    chipsHtml += `
                        <button type="button" class="city-chip ${isSelected ? 'active' : ''}" data-city="${city.id}" onclick="selectCity('${city.id}')">
                            <span>🏙️</span> <span>${displayName}</span>
                        </button>
                    `;
                }
            });

            chipsBox.innerHTML = chipsHtml;

            if (notFoundEl) {
                notFoundEl.style.display = (query && matchCount === 0 && externalGeoResults.length === 0 && !isGeoSearching) ? 'flex' : 'none';
            }

            renderCitySearchDropdown(searchQuery);
        }

        function onCitySearchInput(val) {
            const clearBtn = document.getElementById('city-search-clear-btn');
            if (clearBtn) {
                clearBtn.style.display = (val && val.trim().length > 0) ? 'inline-flex' : 'none';
            }
            const dropdown = document.getElementById('city-search-dropdown');
            if (dropdown) dropdown.classList.add('show');

            renderCitySelectors(val);

            // Обращение к геокодеру с задержкой 280мс
            clearTimeout(geoSearchTimer);
            const query = (val || '').trim();
            if (query.length >= 2) {
                currentGeoSearchQuery = query;
                isGeoSearching = true;
                renderCitySearchDropdown(query);
                geoSearchTimer = setTimeout(() => {
                    fetchExternalCities(query);
                }, 280);
            } else {
                externalGeoResults = [];
                isGeoSearching = false;
                renderCitySearchDropdown(query);
            }
        }

        function clearCitySearch() {
            const input = document.getElementById('city-search-input');
            if (input) {
                input.value = '';
                input.focus();
            }
            const clearBtn = document.getElementById('city-search-clear-btn');
            if (clearBtn) clearBtn.style.display = 'none';
            externalGeoResults = [];
            isGeoSearching = false;
            renderCitySelectors('');
        }

        function selectCity(cityId) {
            currentCityId = cityId;
            selectedTransportIndex = 0; // сбрасываем на первый рекомендуемый транспорт
            const input = document.getElementById('city-search-input');
            const city = CITIES_DATA.find(c => c.id === cityId);
            if (input && city) {
                input.value = city.name[currentLang] || city.name.ru;
            }
            const clearBtn = document.getElementById('city-search-clear-btn');
            if (clearBtn) clearBtn.style.display = input && input.value ? 'inline-flex' : 'none';

            const dropdown = document.getElementById('city-search-dropdown');
            if (dropdown) dropdown.classList.remove('show');

            renderCitySelectors();
            updateCityView(cityId);
        }

        /* =========================================================================
           5. ОБНОВЛЕНИЕ ПРЕДСТАВЛЕНИЯ ПОСЛЕ ВЫБОРА ГОРОДА
           ========================================================================= */
        function updateCityView(cityId) {
            const city = CITIES_DATA.find(c => c.id === cityId) || CITIES_DATA[0];
            const cityName = city.name[currentLang] || city.name.ru;
            const kufName = (currentLang === 'en') ? 'Krasnoufimsk' : 'Красноуфимск';
            const kmUnit = (currentLang === 'en') ? 'km' : 'км';

            // Обновляем плашку расстояния
            const distBadge = document.getElementById('city-distance-text');
            if (distBadge) {
                distBadge.textContent = city.isDynamic
                    ? `${cityName} → ${kufName}: ~${city.distKm} ${kmUnit} (${currentLang === 'en' ? 'road estimate' : 'оценка по дороге'})`
                    : `${cityName} → ${kufName}: ~${city.distKm} ${kmUnit}`;
            }

            // Рендерим карточки транспорта
            renderTransportCards(city);

            // Пересчитываем смету
            recalculateBudget();

            // Рендерим программу тура
            renderProgramDays();

            // Обновляем ссылку Яндекс.Карт
            updateNavigatorLink(city);

            // Обновляем чек-лист сборов в дорогу
            if (typeof renderChecklist === 'function') {
                renderChecklist();
            }
        }

        /* =========================================================================
           6. КАРТОЧКИ ТРАНСПОРТА И ПЕРЕСАДОК
           ========================================================================= */
        function renderTransportCards(city) {
            const grid = document.getElementById('transport-cards-grid');
            if (!grid) return;
            const dynWarn = document.getElementById('dynamic-city-warning');
            if (dynWarn) {
                dynWarn.style.display = city.isDynamic ? 'block' : 'none';
                dynWarn.textContent = city.isDynamic
                    ? (currentLang === 'en'
                        ? '⚠️ This city was found by geocoding: only a road-distance estimate is shown. Trains, buses and fares are not invented — verify them for your date with the carrier before travelling.'
                        : '⚠️ Этот город найден через геокодирование: показана только оценка расстояния по дороге. Поезда, автобусы и тарифы не выдумываются — перед поездкой проверьте их на вашу дату у перевозчика.')
                    : '';
            }

            let html = '';
            city.options.forEach((opt, idx) => {
                const isActive = (idx === selectedTransportIndex);
                const title = opt.title[currentLang] || opt.title.ru;
                const badge = opt.badge[currentLang] || opt.badge.ru;
                const time = opt.time[currentLang] || opt.time.ru;
                const desc = opt.desc[currentLang] || opt.desc.ru;
                const priceLabel = (opt.priceOneWay == null)
                    ? (currentLang === 'en' ? 'fare depends on date' : 'тариф зависит от даты')
                    : `${(opt.priceMin || opt.priceOneWay).toLocaleString(currentLang === 'en' ? 'en-US' : 'ru-RU')}–${(opt.priceMax || opt.priceOneWay).toLocaleString(currentLang === 'en' ? 'en-US' : 'ru-RU')} ₽${tripDate ? '' : (currentLang === 'en' ? ' (pick a date)' : ' (выберите дату)')}`;

                html += `
                    <div class="transport-card ${isActive ? 'active' : ''}" role="button" tabindex="0" aria-pressed="${isActive}" onclick="selectTransport(${idx})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();selectTransport(${idx});}">
                        <div>
                            <div class="transport-top">
                                <span class="transport-mode-badge">${badge}</span>
                                <span class="transport-check-icon" aria-hidden="true" title="${isActive ? (currentLang === 'en' ? 'Selected' : 'Выбрано') : ''}">
                                    <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
                                        <circle cx="10" cy="10" r="10" fill="#22c55e"/>
                                        <path d="M6 10.2L8.7 13L14.2 7.5" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                            <h4 class="transport-title">${opt.icon} ${title}</h4>
                            <div class="transport-meta-row">
                                <span class="transport-meta-item">⏱️ ${time}</span>
                                <span class="transport-meta-item">🎫 ${priceLabel}</span>
                            </div>
                        </div>
                        <div class="transport-route-desc">${desc}</div>
                    </div>
                `;
            });

            grid.innerHTML = html;
        }

        function selectTransport(idx) {
            selectedTransportIndex = idx;
            const city = CITIES_DATA.find(c => c.id === currentCityId);
            if (city) {
                renderTransportCards(city);
                recalculateBudget();
                updateNavigatorLink(city);
                if (typeof renderChecklist === 'function') {
                    renderChecklist();
                }
            }
        }

        /* =========================================================================
           7. ПАРАМЕТРЫ ПОЕЗДКИ И РАСЧЕТ СМЕТЫ
           ========================================================================= */
        function setSetting(type, val) {
            const numVal = parseInt(val, 10) || 1;
            if (type === 'days') tripDays = numVal;
            if (type === 'persons' || type === 'people') tripPersons = numVal;

            const targetType = (type === 'people') ? 'persons' : type;
            document.querySelectorAll(`.setting-btn[data-type="${targetType}"]`).forEach(btn => {
                if (parseInt(btn.getAttribute('data-val'), 10) === numVal) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            const exactPersonsInput = document.getElementById('persons-exact-input');
            if ((type === 'persons' || type === 'people') && exactPersonsInput) exactPersonsInput.value = String(tripPersons);
            const exactDaysInput = document.getElementById('days-exact-input');
            if (type === 'days' && exactDaysInput) exactDaysInput.value = String(tripDays);
            recalculateBudget();
            renderProgramDays();
        }

        function setExactDays(val) {
            const n = Math.max(1, Math.min(14, parseInt(val, 10) || 1));
            tripDays = n;
            document.querySelectorAll('.setting-btn[data-type="days"]').forEach(btn => btn.classList.toggle('active', parseInt(btn.getAttribute('data-val'), 10) === n));
            recalculateBudget();
            renderProgramDays();
            if (typeof renderChecklist === 'function') renderChecklist();
        }

        function setExactPersons(val) {
            const n = Math.max(1, Math.min(20, parseInt(val, 10) || 1));
            tripPersons = n;
            document.querySelectorAll('.setting-btn[data-type="persons"]').forEach(btn => btn.classList.toggle('active', parseInt(btn.getAttribute('data-val'), 10) === n));
            recalculateBudget();
        }

        function onTripDateChange(val) {
            tripDate = val || '';
            const note = document.getElementById('trip-date-note');
            if (note) note.textContent = tripDate
                ? (currentLang === 'en' ? `Selected date: ${formatTripDateDisplay(tripDate)}. Fares below remain estimates — confirm the timetable and price for this date with the carrier.` : `Выбрана дата: ${formatTripDateDisplay(tripDate)}. Суммы ниже остаются оценками — подтвердите расписание и тариф на эту дату у перевозчика.`)
                : (currentLang === 'en' ? 'Prices below are guide ranges. Pick a date and check the timetable and fare with the carrier.' : 'Цены ниже — диапазоны-ориентиры. Выберите дату и проверьте расписание и тариф у перевозчика.');
            const city = CITIES_DATA.find(c => c.id === currentCityId);
            if (city) { renderTransportCards(city); updateNavigatorLink(city); }
            recalculateBudget();
        }

        /* --- Кастомный календарь даты поездки: темизированный, RU/EN, вместо нативного --- */
        let tripCalCursor = null;
        function tripDateLocale() { return currentLang === 'en' ? 'en-GB' : 'ru-RU'; }
        function pad2(n) { return String(n).padStart(2, '0'); }
        function toIsoLocal(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
        function parseIsoLocal(iso) {
            const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
            return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
        }
        function formatTripDateDisplay(iso) {
            const d = parseIsoLocal(iso);
            if (!d) return iso || '';
            return new Intl.DateTimeFormat(tripDateLocale(), { day: 'numeric', month: 'long', year: 'numeric' }).format(d).replace(/\s*г\.$/, '');
        }
        function updateTripDateButtonText() {
            const txt = document.getElementById('trip-date-text');
            if (!txt) return;
            txt.textContent = tripDate ? formatTripDateDisplay(tripDate) : (currentLang === 'en' ? 'dd.mm.yyyy' : 'дд.мм.гггг');
            txt.classList.toggle('is-placeholder', !tripDate);
        }
        function closeTripCalendar() {
            const cal = document.getElementById('trip-calendar');
            const btn = document.getElementById('trip-date-btn');
            if (cal) cal.hidden = true;
            if (btn) btn.setAttribute('aria-expanded', 'false');
        }
        function toggleTripCalendar(ev) {
            if (ev) ev.stopPropagation();
            const cal = document.getElementById('trip-calendar');
            const btn = document.getElementById('trip-date-btn');
            if (!cal) return;
            if (cal.hidden) {
                const base = parseIsoLocal(tripDate) || new Date();
                tripCalCursor = new Date(base.getFullYear(), base.getMonth(), 1);
                renderTripCalendar();
                cal.hidden = false;
                if (btn) btn.setAttribute('aria-expanded', 'true');
            } else {
                closeTripCalendar();
            }
        }
        function shiftTripCalendar(delta, ev) {
            if (ev) ev.stopPropagation();
            if (!tripCalCursor) tripCalCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            tripCalCursor = new Date(tripCalCursor.getFullYear(), tripCalCursor.getMonth() + delta, 1);
            renderTripCalendar();
        }
        function pickTripDate(iso) {
            const hidden = document.getElementById('trip-date-input');
            if (hidden) hidden.value = iso || '';
            closeTripCalendar();
            onTripDateChange(iso || '');
            updateTripDateButtonText();
        }
        function renderTripCalendar() {
            const cal = document.getElementById('trip-calendar');
            if (!cal) return;
            const now = new Date();
            const todayIso = toIsoLocal(now);
            const minCursor = new Date(now.getFullYear(), now.getMonth(), 1);
            const maxCursor = new Date(now.getFullYear(), now.getMonth() + 24, 1);
            if (!tripCalCursor || tripCalCursor < minCursor) tripCalCursor = minCursor;
            if (tripCalCursor > maxCursor) tripCalCursor = maxCursor;
            const y = tripCalCursor.getFullYear();
            const m = tripCalCursor.getMonth();
            const monthTitleRaw = new Intl.DateTimeFormat(tripDateLocale(), { month: 'long', year: 'numeric' }).format(tripCalCursor).replace(/\s*г\.$/, '');
            const monthTitle = monthTitleRaw.charAt(0).toUpperCase() + monthTitleRaw.slice(1);
            const wdFmt = new Intl.DateTimeFormat(tripDateLocale(), { weekday: 'short' });
            let headCells = '';
            for (let i = 0; i < 7; i++) {
                headCells += `<span class="trip-cal-wd">${wdFmt.format(new Date(2024, 0, 1 + i))}</span>`;
            }
            const firstDow = (new Date(y, m, 1).getDay() + 6) % 7;
            const daysInMonth = new Date(y, m + 1, 0).getDate();
            let cells = '';
            for (let i = 0; i < firstDow; i++) cells += '<span class="trip-cal-day is-empty"></span>';
            for (let d = 1; d <= daysInMonth; d++) {
                const iso = y + '-' + pad2(m + 1) + '-' + pad2(d);
                const isPast = iso < todayIso;
                const cls = 'trip-cal-day' + (iso === tripDate ? ' is-selected' : '') + (iso === todayIso ? ' is-today' : '');
                cells += `<button type="button" class="${cls}" ${isPast ? 'disabled' : `onclick="pickTripDate('${iso}')"`}>${d}</button>`;
            }
            const canPrev = tripCalCursor > minCursor;
            const canNext = tripCalCursor < maxCursor;
            const prevLabel = currentLang === 'en' ? 'Previous month' : 'Предыдущий месяц';
            const nextLabel = currentLang === 'en' ? 'Next month' : 'Следующий месяц';
            const todayLabel = currentLang === 'en' ? 'Today' : 'Сегодня';
            const clearLabel = currentLang === 'en' ? 'Clear' : 'Сбросить';
            cal.innerHTML = `
                <div class="trip-cal-head">
                    <button type="button" class="trip-cal-nav" aria-label="${prevLabel}" ${canPrev ? 'onclick="shiftTripCalendar(-1, event)"' : 'disabled'}>‹</button>
                    <span class="trip-cal-title">${monthTitle}</span>
                    <button type="button" class="trip-cal-nav" aria-label="${nextLabel}" ${canNext ? 'onclick="shiftTripCalendar(1, event)"' : 'disabled'}>›</button>
                </div>
                <div class="trip-cal-week">${headCells}</div>
                <div class="trip-cal-grid">${cells}</div>
                <div class="trip-cal-foot">
                    <button type="button" class="trip-cal-foot-btn" onclick="pickTripDate('${todayIso}')">${todayLabel}</button>
                    <button type="button" class="trip-cal-foot-btn" onclick="pickTripDate('')">${clearLabel}</button>
                </div>`;
        }
        document.addEventListener('click', function (e) {
            const wrap = document.getElementById('trip-date-picker');
            const cal = document.getElementById('trip-calendar');
            if (!wrap || !cal || cal.hidden) return;
            const path = typeof e.composedPath === 'function' ? e.composedPath() : null;
            const inside = path ? path.indexOf(wrap) !== -1 : wrap.contains(e.target);
            if (!inside) closeTripCalendar();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeTripCalendar();
        });

        const HOTEL_OPTIONS_DATA = {
            1600: {
                icon: '🏡',
                ru: { title: 'Гостевой дом / Квартира', price: '~1 600 ₽ / сутки', short: 'Гостевой дом (~1 600 ₽)' },
                en: { title: 'Guesthouse / Apartment', price: '~1,600 ₽ / night', short: 'Guesthouse (~1,600 ₽)' }
            },
            2800: {
                icon: '🏨',
                ru: { title: 'Гостиница «Центральная» / «Ковчег»', price: '~2 800 ₽ / сутки', short: 'Гостиница «Центральная» / «Ковчег» (~2 800 ₽)' },
                en: { title: 'Hotel «Tsentralnaya» / «Kovcheg»', price: '~2,800 ₽ / night', short: 'Hotel «Tsentralnaya» / «Kovcheg» (~2,800 ₽)' }
            },
            4200: {
                icon: '⭐',
                ru: { title: 'Комфорт / Отель с завтраком', price: '~4 200 ₽ / сутки', short: 'Комфорт / Отель (~4 200 ₽)' },
                en: { title: 'Comfort / Hotel with breakfast', price: '~4,200 ₽ / night', short: 'Comfort / Hotel (~4,200 ₽)' }
            }
        };

        const FOOD_OPTIONS_DATA = {
            500: {
                icon: '☕',
                ru: { title: 'Эконом: выпечка, столовые', price: '~500 ₽ / день', short: 'Эконом: столовые (~500 ₽)' },
                en: { title: 'Economy: bakeries, canteens', price: '~500 ₽ / day', short: 'Economy: canteens (~500 ₽)' }
            },
            950: {
                icon: '🍽️',
                ru: { title: 'Стандарт: уютные кафе на Советской', price: '~950 ₽ / день', short: 'Стандарт: уютные кафе на Советской (~950 ₽)' },
                en: { title: 'Standard: cozy cafes on Sovetskaya', price: '~950 ₽ / day', short: 'Standard: cozy cafes on Sovetskaya (~950 ₽)' }
            },
            1600: {
                icon: '🍷',
                ru: { title: 'Рестораны и уральская кухня', price: '~1 600 ₽ / день', short: 'Рестораны уральской кухни (~1 600 ₽)' },
                en: { title: 'Restaurants & Ural cuisine', price: '~1,600 ₽ / day', short: 'Restaurants & cuisine (~1,600 ₽)' }
            }
        };

        function syncCustomSelectAria() {
            [['hotel'], ['food']].forEach(([type]) => {
                const wrap = document.getElementById(type + '-custom-wrap');
                const trigger = document.getElementById(type + '-trigger');
                const menu = document.getElementById(type + '-menu');
                const open = !!(wrap && wrap.classList.contains('open'));
                if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
                if (menu) menu.querySelectorAll('.custom-select-option').forEach(opt => opt.setAttribute('aria-selected', opt.classList.contains('selected') ? 'true' : 'false'));
            });
        }

        function toggleCustomSelect(type) {
            const hotelWrap = document.getElementById('hotel-custom-wrap');
            const hotelMenu = document.getElementById('hotel-menu');
            const hotelTrigger = document.getElementById('hotel-trigger');
            const foodWrap = document.getElementById('food-custom-wrap');
            const foodMenu = document.getElementById('food-menu');
            const foodTrigger = document.getElementById('food-trigger');

            if (type === 'hotel') {
                if (foodWrap) foodWrap.classList.remove('open');
                if (foodMenu) foodMenu.classList.remove('show');
                if (foodTrigger) foodTrigger.classList.remove('active');
                if (hotelWrap) hotelWrap.classList.toggle('open');
                if (hotelMenu) hotelMenu.classList.toggle('show');
                if (hotelTrigger) hotelTrigger.classList.toggle('active');
            } else if (type === 'food') {
                if (hotelWrap) hotelWrap.classList.remove('open');
                if (hotelMenu) hotelMenu.classList.remove('show');
                if (hotelTrigger) hotelTrigger.classList.remove('active');
                if (foodWrap) foodWrap.classList.toggle('open');
                if (foodMenu) foodMenu.classList.toggle('show');
                if (foodTrigger) foodTrigger.classList.toggle('active');
            }
                    syncCustomSelectAria();
        }

        function chooseHotel(val, el) {
            val = parseInt(val, 10);
            hotelCostPerNight = val;
            const select = document.getElementById('hotel-select');
            if (select) select.value = val;

            const wrap = document.getElementById('hotel-custom-wrap');
            if (wrap) wrap.classList.remove('open');

            const menu = document.getElementById('hotel-menu');
            if (menu) {
                menu.querySelectorAll('.custom-select-option').forEach(opt => {
                    if (parseInt(opt.getAttribute('data-val'), 10) === val) {
                        opt.classList.add('selected');
                    } else {
                        opt.classList.remove('selected');
                    }
                });
                menu.classList.remove('show');
            }
            const trigger = document.getElementById('hotel-trigger');
            if (trigger) trigger.classList.remove('active');

            updateCustomSelectLabels();
            recalculateBudget();
                    syncCustomSelectAria();
            const hotelTriggerFocus = document.getElementById('hotel-trigger'); if (hotelTriggerFocus) hotelTriggerFocus.focus();
        }

        function chooseFood(val, el) {
            val = parseInt(val, 10);
            foodCostPerDayPerPerson = val;
            const select = document.getElementById('food-select');
            if (select) select.value = val;

            const wrap = document.getElementById('food-custom-wrap');
            if (wrap) wrap.classList.remove('open');

            const menu = document.getElementById('food-menu');
            if (menu) {
                menu.querySelectorAll('.custom-select-option').forEach(opt => {
                    if (parseInt(opt.getAttribute('data-val'), 10) === val) {
                        opt.classList.add('selected');
                    } else {
                        opt.classList.remove('selected');
                    }
                });
                menu.classList.remove('show');
            }
            const trigger = document.getElementById('food-trigger');
            if (trigger) trigger.classList.remove('active');

            updateCustomSelectLabels();
            recalculateBudget();
                    syncCustomSelectAria();
            const foodTriggerFocus = document.getElementById('food-trigger'); if (foodTriggerFocus) foodTriggerFocus.focus();
        }

        function updateCustomSelectLabels() {
            const lang = (currentLang === 'en') ? 'en' : 'ru';

            // 1. Отель
            const currentHotel = HOTEL_OPTIONS_DATA[hotelCostPerNight] || HOTEL_OPTIONS_DATA[2800];
            const hotelTriggerText = document.getElementById('hotel-trigger-text');
            if (hotelTriggerText && currentHotel) {
                hotelTriggerText.textContent = `${currentHotel.icon} ${currentHotel[lang].short}`;
            }
            const hotelMenu = document.getElementById('hotel-menu');
            if (hotelMenu) {
                hotelMenu.querySelectorAll('.custom-select-option').forEach(opt => {
                    const v = parseInt(opt.getAttribute('data-val'), 10);
                    const data = HOTEL_OPTIONS_DATA[v];
                    if (data) {
                        const titleEl = opt.querySelector('.opt-title');
                        const priceEl = opt.querySelector('.opt-price');
                        if (titleEl) titleEl.textContent = data[lang].title;
                        if (priceEl) priceEl.textContent = data[lang].price;
                    }
                });
            }

            // 2. Питание
            const currentFood = FOOD_OPTIONS_DATA[foodCostPerDayPerPerson] || FOOD_OPTIONS_DATA[950];
            const foodTriggerText = document.getElementById('food-trigger-text');
            if (foodTriggerText && currentFood) {
                foodTriggerText.textContent = `${currentFood.icon} ${currentFood[lang].short}`;
            }
            const foodMenu = document.getElementById('food-menu');
            if (foodMenu) {
                foodMenu.querySelectorAll('.custom-select-option').forEach(opt => {
                    const v = parseInt(opt.getAttribute('data-val'), 10);
                    const data = FOOD_OPTIONS_DATA[v];
                    if (data) {
                        const titleEl = opt.querySelector('.opt-title');
                        const priceEl = opt.querySelector('.opt-price');
                        if (titleEl) titleEl.textContent = data[lang].title;
                        if (priceEl) priceEl.textContent = data[lang].price;
                    }
                });
            }
        }

        function onHotelChange(val) {
            chooseHotel(val);
        }

        function onFoodChange(val) {
            chooseFood(val);
        }

        function fmtMoney(v) {
            return (typeof currentLang !== 'undefined' && currentLang === 'en')
                ? v.toLocaleString('en-US') + ' RUB'
                : v.toLocaleString('ru-RU') + ' ₽';
        }

        function recalculateBudget() {
            const city = CITIES_DATA.find(c => c.id === currentCityId) || CITIES_DATA[0];
            const transportOpt = city.options[selectedTransportIndex] || city.options[0];
            const hasFare = !!(transportOpt && transportOpt.priceOneWay != null);
            const unitMin = hasFare ? (transportOpt.priceMin != null ? transportOpt.priceMin : transportOpt.priceOneWay) : 0;
            const unitMax = hasFare ? (transportOpt.priceMax != null ? transportOpt.priceMax : transportOpt.priceOneWay) : 0;
            let transportMultiplier = tripPersons;
            if (transportOpt && transportOpt.priceUnit === 'perVehicle') transportMultiplier = Math.ceil(tripPersons / (transportOpt.vehicleCapacity || 5));
            else if (transportOpt && transportOpt.type === 'car') transportMultiplier = Math.ceil(tripPersons / 5);
            const transportMinTotal = unitMin * 2 * transportMultiplier;
            const transportMaxTotal = unitMax * 2 * transportMultiplier;
            const transportTotal = Math.round((transportMinTotal + transportMaxTotal) / 2);
            const nights = Math.max(0, tripDays - 1);
            const roomsNeeded = Math.ceil(tripPersons / 2);
            const hotelTotal = nights * hotelCostPerNight * roomsNeeded;
            const foodTotal = tripDays * tripPersons * foodCostPerDayPerPerson;
            const museumsPerPerson = (tripDays >= 2) ? 500 : 250;
            const museumsTotal = museumsPerPerson * tripPersons;
            const souvenirsTotal = 350 * tripPersons;
            const nonTransportTotal = hotelTotal + foodTotal + museumsTotal + souvenirsTotal;
            const grandMin = transportMinTotal + nonTransportTotal;
            const grandMax = transportMaxTotal + nonTransportTotal;
            const grandTotal = transportTotal + nonTransportTotal;
            const perPerson = Math.round(grandTotal / tripPersons);
            const perPersonMin = Math.round(grandMin / tripPersons);
            const perPersonMax = Math.round(grandMax / tripPersons);
            document.getElementById('budget-total-val').textContent = hasFare ? `${fmtMoney(grandMin)} – ${fmtMoney(grandMax)}` : `${fmtMoney(grandTotal)} + ${currentLang === 'ru' ? 'дорога по тарифу' : 'fare TBC'}`;
            document.getElementById('budget-per-person-val').textContent = (currentLang === 'ru')
                ? (hasFare ? `${fmtMoney(perPersonMin)} – ${fmtMoney(perPersonMax)} на 1 человека` : `${fmtMoney(perPerson)} на человека без дороги`)
                : (hasFare ? `${fmtMoney(perPersonMin)} – ${fmtMoney(perPersonMax)} per person` : `${fmtMoney(perPerson)} per person excl. fare`);
            document.getElementById('row-transport-val').textContent = hasFare ? `${fmtMoney(transportMinTotal)} – ${fmtMoney(transportMaxTotal)}` : (currentLang === 'ru' ? 'проверьте тариф на дату' : 'check fare for your date');
            document.getElementById('row-hotel-val').textContent = nights > 0 ? `~${fmtMoney(hotelTotal)}` : (currentLang === 'ru' ? '0 ₽ (без ночёвки)' : '0 RUB (day trip)');
            document.getElementById('row-food-val').textContent = `~${fmtMoney(foodTotal)}`;
            document.getElementById('row-museums-val').textContent = `~${fmtMoney(museumsTotal)}`;
            document.getElementById('row-souvenirs-val').textContent = `~${fmtMoney(souvenirsTotal)}`;
        }

        /* =========================================================================
           8. ПРОГРАММА ТУРА ПО ДНЯМ
           ========================================================================= */
        function renderProgramDays() {
            const container = document.getElementById('program-days-list');
            if (!container) return;

            // Базовая программа 1–4 дня; для 5–14 дней добавляем отдельные дни расширения, а не обрезаем поездку.
            const daysKey = Math.min(4, Math.max(1, tripDays));
            const program = [...(ITINERARY_PROGRAMS[daysKey] || ITINERARY_PROGRAMS[3])];
            if (tripDays > 4) {
                const extraTemplates = [
                    { title: { ru: 'Виадуки с трансфером и запасом времени', en: 'Viaducts with a transfer and time buffer' }, places: [
                        { ru: '🚗 Заранее закажите трансфер к смотровым точкам виадуков; не рассчитывайте на пеший переход от города.', en: '🚗 Book a transfer to viaduct viewpoints in advance; do not plan to walk from town.' },
                        { ru: '⚠️ Не выходите на действующие железнодорожные пути и конструкции: осмотр только с безопасных общественных точек.', en: '⚠️ Never enter active railway tracks or structures: view only from safe public points.' }
                    ]},
                    { title: { ru: 'Природа без спешки', en: 'Nature at an easy pace' }, places: [
                        { ru: '🌲 Сосновые боры и набережная Уфы в светлое время; проверьте погоду и возьмите воду.', en: '🌲 Pine forests and the Ufa embankment in daylight; check the weather and carry water.' },
                        { ru: '⚠️ Дивья гора — только подготовленным группам и по безопасному маршруту; детям без взрослых подъём не рекомендуется.', en: '⚠️ Divya Hill is only for prepared groups on a safe route; children should not climb unaccompanied.' }
                    ]},
                    { title: { ru: 'Музеи и свободная программа', en: 'Museums and free time' }, places: [
                        { ru: '🏛️ Повторите понравившийся музей или объект из каталога главной страницы; часы работы уточните в день визита.', en: '🏛️ Revisit a favourite museum or sight from the main-page catalogue; confirm opening hours on the day.' },
                        { ru: '🛍️ Оставьте резерв на сувениры, кафе и непредвиденные переносы транспорта.', en: '🛍️ Keep a buffer for souvenirs, cafés and unexpected transport changes.' }
                    ]}
                ];
                for (let d = 5; d <= tripDays; d++) {
                    const tpl = extraTemplates[(d - 5) % extraTemplates.length];
                    program.push({ dayNum: d, title: tpl.title, places: tpl.places });
                }
            }

            let html = '';
            program.forEach(day => {
                const dayTitle = day.title[currentLang] || day.title.ru;
                const badgeText = (currentLang === 'ru') ? `День ${day.dayNum}` : `Day ${day.dayNum}`;

                html += `
                    <div class="day-block">
                        <div class="day-header">
                            <span class="day-badge">${badgeText}</span>
                            <h4 class="day-name">${dayTitle}</h4>
                        </div>
                        <ul class="day-places-list">
                `;

                day.places.forEach(p => {
                    const placeText = p[currentLang] || p.ru;
                    html += `
                        <li class="day-place-item">
                            <span class="day-place-bullet">✦</span>
                            <span>${placeText}</span>
                        </li>
                    `;
                });

                html += `
                        </ul>
                    </div>
                `;
            });

            container.innerHTML = html;
        }

        /* =========================================================================
           9. ПРЯМОЙ МАРШРУТ В ЯНДЕКС КАРТАХ
           ========================================================================= */
        function updateNavigatorLink(city) {
            const btn = document.getElementById('btn-open-navigator');
            if (!btn || !city) return;
            const transportOpt = (city.options && (city.options[selectedTransportIndex] || city.options[0])) || null;
            const type = transportOpt ? transportOpt.type : 'car';
            const isFlightLeg = (type === 'plane_train' || type === 'plane_bus');
            const isPublic = ['train_fast','train_direct','train_transfer','bus','bus_train','plane_train','plane_bus','verify_transport'].includes(type);
            const label = btn.querySelector('[data-lang="btnNavigator"]');
            if (isPublic) {
                btn.href = 'https://rasp.yandex.ru/';
                if (label) label.textContent = currentLang === 'en' ? 'Check the timetable in Yandex Schedules' : 'Проверить расписание в Яндекс Расписаниях';
                btn.setAttribute('aria-label', isFlightLeg
                    ? (currentLang === 'en' ? 'Check flight and ground-connection timetables; this does not build a single navigator route' : 'Проверить расписания перелёта и наземной стыковки; единый маршрут в навигаторе не строится')
                    : (currentLang === 'en' ? 'Check the public-transport timetable for your travel date' : 'Проверить расписание общественного транспорта на дату поездки'));
                return;
            }
            btn.href = `https://yandex.ru/maps/?rtext=${city.lat},${city.lon}~56.6160,57.7660&rtt=auto`;
            if (label) label.textContent = currentLang === 'en' ? 'Build the road route in Yandex Maps' : 'Построить дорожный маршрут в Яндекс.Картах';
            btn.setAttribute('aria-label', currentLang === 'en' ? 'Build the road route to Krasnoufimsk in Yandex Maps' : 'Построить дорожный маршрут до Красноуфимска в Яндекс.Картах');
        }

        /* =========================================================================
           10. ШЕРИНГ И ИНТЕРАКТИВНЫЙ ЧЕК-ЛИСТ СБОРОВ
           ========================================================================= */
        function shareTripPlan() {
            const dict = i18nPlanner[currentLang] || i18nPlanner.ru;
            const city = CITIES_DATA.find(c => c.id === currentCityId) || CITIES_DATA[0];
            const cityName = city.name[currentLang] || city.name.ru;
            const transportOpt = city.options[selectedTransportIndex] || city.options[0];
            const transportTitle = transportOpt.title[currentLang] || transportOpt.title.ru;
            const transportTime = transportOpt.time[currentLang] || transportOpt.time.ru;
            const totalBudget = document.getElementById('budget-total-val') ? document.getElementById('budget-total-val').textContent : '';
            const perPersonBudget = document.getElementById('budget-per-person-val') ? document.getElementById('budget-per-person-val').textContent : '';

            const currentYear = new Date().getFullYear();
            let text = (currentLang === 'en')
                ? `🧭 TRIP PLAN TO KRASNOUFIMSK (${currentYear})\n\n`
                : `🧭 ПЛАН ПОЕЗДКИ В КРАСНОУФИМСК (${currentYear})\n\n`;

            text += (currentLang === 'en')
                ? `📍 Departure: ${cityName} (~${city.distKm} km)\n`
                : `📍 Отправление: ${cityName} (~${city.distKm} км)\n`;

            text += (currentLang === 'en')
                ? `🔀 Transport: ${transportTitle} (${transportTime})\n`
                : `🔀 Транспорт: ${transportTitle} (${transportTime})\n`;

            text += (currentLang === 'en')
                ? `📅 Duration: ${tripDays} days${tripDate ? ` from ${tripDate}` : ''} • Travelers: ${tripPersons} pers.\n`
                : `📅 Длительность: ${tripDays} дн.${tripDate ? ` с ${tripDate}` : ''} • Путешественников: ${tripPersons} чел.\n`;

            text += (currentLang === 'en')
                ? `💰 Total estimate: ${totalBudget} (${perPersonBudget})\n\n`
                : `💰 Примерный бюджет: ${totalBudget} (${perPersonBudget})\n\n`;

            text += (currentLang === 'en')
                ? `🔗 Plan your customized trip: https://krasnoufimsk-history.site/planner.html`
                : `🔗 Составьте свой маршрут: https://krasnoufimsk-history.site/planner.html`;

            const toastMsg = dict.shareCopiedToast || (currentLang === 'en' ? 'Trip itinerary copied to clipboard!' : 'План поездки скопирован в буфер обмена!');

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast(toastMsg);
                }).catch(() => {
                    fallbackCopy(text, toastMsg);
                });
            } else {
                fallbackCopy(text, toastMsg);
            }
        }


        function fallbackCopy(text, toastMsg) {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy');
                showToast(toastMsg);
            } catch(e) {}
            document.body.removeChild(ta);
        }

        function showToast(msg) {
            const toast = document.getElementById('toast-notify');
            const textEl = document.getElementById('toast-text');
            if (!toast || !textEl) return;
            textEl.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        /* --- ЧЕК-ЛИСТ СБОРОВ В ДОРОГУ --- */
        function getChecklistItems() {
            const isEn = (currentLang === 'en');
            let currentSeason = typeof getNaturalSeason === 'function' ? getNaturalSeason() : 'autumn';
            if (document.body.classList.contains('season-winter')) currentSeason = 'winter';
            else if (document.body.classList.contains('season-spring')) currentSeason = 'spring';
            else if (document.body.classList.contains('season-summer')) currentSeason = 'summer';
            else if (document.body.classList.contains('season-autumn')) currentSeason = 'autumn';

            const city = CITIES_DATA.find(c => c.id === currentCityId) || CITIES_DATA[0];
            const transportOpt = city.options[selectedTransportIndex] || city.options[0];
            const transType = transportOpt ? transportOpt.type : 'car';

            const items = [
                {
                    id: 'docs',
                    icon: '📄',
                    text: isEn ? 'Passport / ID, train or flight tickets, hotel booking confirmation' : 'Паспорт / документы, билеты на поезд/самолёт, бронь гостиницы'
                },
                {
                    id: 'power',
                    icon: '🔋',
                    text: isEn ? 'Phone charger, high-capacity PowerBank & camera for viaducts' : 'Зарядное устройство, ёмкий PowerBank и камера для съёмки виадуков'
                },
                {
                    id: 'shoes',
                    icon: '👟',
                    text: isEn ? 'Comfortable sneakers/boots with non-slip sole for walks & hills' : 'Удобная нескользящая обувь для прогулок по сопкам и набережной Уфы'
                },
                {
                    id: 'meds',
                    icon: '💊',
                    text: isEn ? 'Personal travel first-aid kit, pain relievers & band-aids' : 'Походная мини-аптечка, пластыри и индивидуальные лекарства'
                },
                {
                    id: 'thermos',
                    icon: '☕',
                    text: isEn ? 'Thermos or reusable thermal mug for Ural herbal tea' : 'Термос или термокружка для душистого чая на смотровых площадках'
                }
            ];

            // Сезонные пункты
            if (currentSeason === 'winter') {
                items.push(
                    {
                        id: 'winter_clothes',
                        icon: '🧤',
                        text: isEn ? 'Thermal underwear, wool socks, insulated gloves & windproof hat' : 'Термобельё, шерстяные носки, непродуваемые перчатки и теплая шапка'
                    },
                    {
                        id: 'winter_crampons',
                        icon: '❄️',
                        text: isEn ? 'Ice grips/cleats for shoes (essential on steep slopes of Divya Mountain)' : 'Ледоступы для обуви (актуально на спусках и подъемах Дивьей горы)'
                    }
                );
            } else if (currentSeason === 'summer') {
                items.push(
                    {
                        id: 'summer_repellent',
                        icon: '🦟',
                        text: isEn ? 'Mosquito & tick repellent for walks along Ufa river & pine forests' : 'Репеллент от мошек и клещей для прогулок вдоль реки Уфы и соснового бора'
                    },
                    {
                        id: 'summer_sun',
                        icon: '🕶️',
                        text: isEn ? 'Sunglasses, light sunhat & SPF sunscreen for sunny days' : 'Солнцезащитные очки, панама/кепка и крем SPF для ясных дней'
                    }
                );
            } else { // autumn or spring
                items.push(
                    {
                        id: 'midseason_rain',
                        icon: '☂️',
                        text: isEn ? 'Compact folding umbrella or waterproof windbreaker jacket' : 'Компактный зонт или непромокаемая ветровка-дождевик'
                    },
                    {
                        id: 'midseason_fleece',
                        icon: '🧥',
                        text: isEn ? 'Warm fleece jacket or sweatshirt for cool Ural evenings' : 'Флисовая кофта или тёплый свитшот для вечерних прогулок вдоль реки'
                    }
                );
            }

            // Транспортные пункты
            if (transType === 'car') {
                items.push({
                    id: 'car_nav',
                    icon: '🚗',
                    text: isEn ? 'Downloaded offline Yandex Maps / navigator (Ural canyons have no signal)' : 'Скачанные офлайн-карты в Яндекс.Навигаторе (в логах и низинах пропадает связь)'
                });
                items.push({
                    id: 'car_tools',
                    icon: '🧰',
                    text: isEn ? 'Car kit: tire pressure gauge, emergency tow rope, washer fluid' : 'Автокомплект: трос, стеклоомыватель, знак аварийной остановки'
                });
            } else {
                items.push({
                    id: 'train_comfort',
                    icon: '🎧',
                    text: isEn ? 'Noise-cancelling headphones, neck pillow & offline audio guides' : 'Наушники, дорожная подушка и сохранённые аудиогиды по Красноуфимску'
                });
            }

            return items;
        }

        function getSavedChecklist() {
            try {
                const raw = safeStorageGet('kuf_planner_checklist', null);
                return raw ? JSON.parse(raw) : [];
            } catch(e) {
                return [];
            }
        }

        function saveChecklist(checkedIds) {
            safeStorageSet('kuf_planner_checklist', JSON.stringify(checkedIds));
        }

        function toggleChecklistItem(id) {
            let saved = getSavedChecklist();
            if (saved.includes(id)) {
                saved = saved.filter(x => x !== id);
            } else {
                saved.push(id);
            }
            saveChecklist(saved);
            renderChecklist();
        }

        function renderChecklist() {
            const container = document.getElementById('checklist-items-container');
            const badge = document.getElementById('checklist-progress-badge');
            if (!container) return;

            const items = getChecklistItems();
            const saved = getSavedChecklist();
            let checkedCount = 0;

            let html = '';
            items.forEach(it => {
                const isChecked = saved.includes(it.id);
                if (isChecked) checkedCount++;

                html += `
                    <label class="checklist-item-card ${isChecked ? 'checked' : ''}">
                        <input type="checkbox" class="checklist-checkbox" ${isChecked ? 'checked' : ''} onchange="toggleChecklistItem('${it.id}')">
                        <div class="checklist-item-text">
                            <span style="margin-right:4px;">${it.icon}</span> ${it.text}
                        </div>
                    </label>
                `;
            });

            container.innerHTML = html;

            if (badge) {
                const suffix = (currentLang === 'en') ? 'packed' : 'собрано';
                badge.textContent = `${checkedCount}/${items.length} ${suffix}`;
                if (checkedCount === items.length && items.length > 0) {
                    badge.style.background = 'color-mix(in srgb, #2e7d32 20%, var(--bg-card))';
                    badge.style.color = '#2e7d32';
                } else {
                    badge.style.background = '';
                    badge.style.color = '';
                }
            }
        }

        /* =========================================================================
           11. ПЛАВНОЕ ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ (SCROLL REVEAL / INTERSECTION OBSERVER)
           ========================================================================= */
        function initScrollReveal() {
            const selectors = [
                '.reveal-on-scroll',
                '.planner-hero',
                '.city-picker-card',
                '.transport-section-card',
                '.trip-settings-card',
                '.budget-card',
                '.program-card'
            ];
            const allElements = document.querySelectorAll(selectors.join(', '));

            if (!('IntersectionObserver' in window)) {
                allElements.forEach(el => el.classList.add('is-visible'));
                return;
            }

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
                rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -40px 0px'
            });

            allElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
                    el.classList.add('is-visible');
                } else {
                    observer.observe(el);
                }
            });
        }

        // Запуск
        window.addEventListener('DOMContentLoaded', initApp);

/* ---- next original script block ---- */

(function(){function initBackToTop(){var b=document.getElementById('btn-back-to-top');if(!b)return;function t(){b.classList.toggle('show',window.scrollY>600);}window.addEventListener('scroll',t,{passive:true});t();b.addEventListener('click',function(){window.scrollTo({top:0,behavior:(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth')});});}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initBackToTop);}else{initBackToTop();}})();
