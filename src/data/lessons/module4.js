const module4 = {
    id: 4, title: "SQL", icon: "🗄️",
    description: "Разговор с базой данных: от простых вопросов до объединения таблиц.",
    lessons: [
        {
            id: "4-1", title: "SELECT: Как просить данные",
            theory: [
                { type: "text", content: "### 1. Аналогия: Английский для таблиц\n**SQL** — это не совсем программирование, это язык запросов. Представь, что ты вежливый менеджер, который просит склад: «Выбери (SELECT) названия из (FROM) таблицы товаров»." },
                { type: "text", content: "### 2. Базовый запрос" },
                {
                    type: "code", language: "sql", content: `-- Просим всё сразу
SELECT * FROM cyber_games;

-- Просим только нужное (экономим время)
SELECT title, price FROM cyber_games;`
                },
                { type: "text", content: "### 3. Практический пример: Фильтр WHERE\nВ DS мы редко забираем всё. Обычно нам нужны данные за «прошлый месяц» или «дороже 50$»:" },
                {
                    type: "code", language: "sql", content: `SELECT title FROM cyber_games 
WHERE price > 50 AND genre = 'RPG'
LIMIT 10; -- Берем только первые 10 для теста`
                }
            ],
            quiz: {
                type: "code",
                question: "Напиши SQL-запрос, чтобы выбрать (SELECT) столбец `name` из таблицы `players`, где `level` > 10.",
                setup: "",
                answer: ["SELECT name FROM players WHERE level > 10"],
                hint: "SELECT столбец FROM таблица WHERE условие"
            }
        },
        {
            id: "4-2", title: "Агрегация: Считаем итоги",
            theory: [
                { type: "text", content: "### 1. Аналогия: Сводка\nПредставь, что тебе нужно быстро ответить боссу: «Сколько у нас всего игр?» или «Какая самая дорогая?». Для этого в SQL есть встроенные калькуляторы (COUNT, SUM, AVG)." },
                { type: "text", content: "### 2. Примеры функций" },
                {
                    type: "code", language: "sql", content: `-- Считаем количество строк
SELECT COUNT(*) FROM players;
-- Средняя цена
SELECT AVG(price) FROM cyber_games;`
                },
                { type: "text", content: "### 3. Практический пример: Group By\nПочти всегда мы считаем итоги не по всей базе, а по категориям. Это как разложить монетки по кучкам и посчитать сумму в каждой:" },
                {
                    type: "code", language: "sql", content: `SELECT genre, AVG(price) as avg_p 
FROM cyber_games 
GROUP BY genre
ORDER BY avg_p DESC; -- Сортируем от дорогих к дешевым`
                }
            ],
            quiz: {
                type: "code",
                question: "Посчитай количество игроков (COUNT) в группировке по столбцу `country` из таблицы `users`.",
                setup: "",
                answer: ["SELECT country, COUNT(*) FROM users GROUP BY country"],
                hint: "SELECT колонка, COUNT(*) FROM таблица GROUP BY колонка"
            }
        },
        {
            id: "4-3", title: "JOIN: Соединяем миры",
            theory: [
                { type: "text", content: "### 1. Аналогия: Пазл\nВ базах данных информация разная: игры лежат в одной таблице, а разработчики — в другой. Чтобы увидеть их вместе, мы используем **JOIN**, соединяя их по общему полю (например, `id`)." },
                { type: "text", content: "### 2. Как это выглядит" },
                {
                    type: "code", language: "sql", content: `-- Соединяем игры (g) и студии (d)
SELECT g.title, d.name 
FROM games g
JOIN developers d ON g.dev_id = d.id;`
                },
                { type: "text", content: "### 3. Практический пример: LEFT JOIN\nВ DS мы обожаем **LEFT JOIN**. Почему? Потому что мы хотим видеть ВСЕ игры, даже если информацию об их разработчике забыли внести в базу. Мы не теряем данные." }
            ],
            quiz: {
                type: "choice",
                question: "Какой SQL JOIN вернет все записи из левой таблицы, даже если совпадений в правой нет?",
                options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"],
                correct: 1,
                hint: "LEFT JOIN сохраняет все строки слева."
            }
        }
    ]
};
export default module4;
