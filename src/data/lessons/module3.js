const module3 = {
    id: 3, title: "Pandas", icon: "🐼",
    description: "Работа с таблицами: от загрузки до автоматического анализа данных.",
    lessons: [
        {
            id: "3-1", title: "DataFrame: Excel на стероидах",
            theory: [
                { type: "text", content: "### 1. Аналогия: Умная таблица\n**DataFrame** — это как лист в Excel, но вместо того чтобы кликать мышкой, вы управляете им через код. Это позволяет обрабатывать миллионы строк за секунды и автоматизировать рутину." },
                { type: "text", content: "### 2. Загрузка данных" },
                {
                    type: "code", language: "python", content: `import pandas as pd
# Читаем CSV файл (как открываем Excel-файл)
df = pd.read_csv("games.csv")`
                },
                { type: "text", content: "### 3. Практический пример: Инспекция\nПрежде чем работать, нужно «посмотреть в глаза» данным. Мы используем три главные команды:" },
                {
                    type: "code", language: "python", content: `df.head()     # Показать верхушку таблицы
df.info()     # Проверить, всё ли загрузилось (типы, пропуски)
df.describe() # Быстрая статистика: средняя цена, максимум и т.д.`
                }
            ],
            quiz: {
                type: "code",
                question: "Импортируй pandas как `pd` и загрузи файл `games.csv` в переменную `df`.",
                setup: "",
                answer: ["import pandas as pd\ndf = pd.read_csv('games.csv')"],
                hint: "pd.read_csv('имя_файла')"
            }
        },
        {
            id: "3-2", title: "Выбор и Фильтрация",
            theory: [
                { type: "text", content: "### 1. Аналогия: Поиск в базе\nПредставь, что DataFrame — это библиотека. Выбор колонки (`df['title']`) — это взять одну полку. Фильтрация — это найти книги только одного автора." },
                { type: "text", content: "### 2. Базовые фильтры" },
                {
                    type: "code", language: "python", content: `# Только дорогие игры
expensive = df[df["price"] > 50]
# Комбинируем: RPG со скидкой
promo_rpg = df[(df["genre"] == "RPG") & (df["is_promo"] == True)]`
                },
                { type: "text", content: "### 3. Практический пример: Цепочки\nВ DS мы часто фильтруем данные и сразу выбираем нужные столбцы, чтобы не забивать память лишним:" },
                {
                    type: "code", language: "python", content: `# Получить только названия популярных игр
popular_names = df[df["sales"] > 1000]["title"]`
                }
            ],
            quiz: {
                type: "code",
                question: "Из таблицы `df` выбери все строки, где `sales > 100`, и сохрани результат в `top_sales`.",
                setup: "import pandas as pd\ndf = pd.read_csv('games.csv')",
                answer: ["top_sales = df[df['sales'] > 100]"],
                hint: "df[df['колонка'] > число]"
            }
        },
        {
            id: "3-3", title: "Группировка (Groupby)",
            theory: [
                { type: "text", content: "### 1. Аналогия: Порядок на складе\n**GroupBy** — это как если бы вы попросили рабочих разложить все товары по коробкам: «фрукты в одну, овощи в другую», а потом посчитали вес в каждой коробке." },
                { type: "text", content: "### 2. Как это работает" },
                {
                    type: "code", language: "python", content: `# Считаем среднюю цену для каждого жанра
avg_by_genre = df.groupby("genre")["price"].mean()`
                },
                { type: "text", content: "### 3. Практический пример: Агрегатор\nПрофи используют метод `.agg()`, чтобы получить сразу несколько ответов за один раз:" },
                {
                    type: "code", language: "python", content: `# Для каждого жанра: средняя цена и общие продажи
stats = df.groupby("genre").agg({
    "price": "mean",
    "sales": "sum"
})`
                }
            ],
            quiz: {
                type: "code",
                question: "Сгруппируй `df` по колонке 'genre' и найди сумму ('sum') по колонке 'revenue'. Сохрани в `res`.",
                setup: "import pandas as pd\ndf = pd.read_csv('games.csv')",
                answer: ["res = df.groupby('genre')['revenue'].sum()"],
                hint: "df.groupby('...') ['...'].sum()"
            }
        }
    ]
};
export default module3;
