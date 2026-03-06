export const cheatsheet = [
    {
        category: "Python Basics",
        items: [
            {
                title: "Переменные и типы",
                description: "Способы хранения данных разных форматов (строки, числа, логика).",
                useCase: "Начало любого анализа: хранение путей к файлам, настроек или промежуточных вычислений.",
                code: `name = "Cyber Samurai"  # str\nprice = 59.99            # float\nyear = 2023              # int\nis_online = True         # bool`
            },
            {
                title: "Списки",
                description: "Упорядоченные коллекции элементов, которые можно изменять.",
                useCase: "Хранение набора названий столбцов, имен файлов или последовательности значений.",
                code: `games = ["RPG", "Shooter", "Racing"]\ngames.append("Strategy")\ngames[0]    # "RPG"\nlen(games)  # 4`
            },
            {
                title: "Словари",
                description: "Наборы пар 'ключ-значение' для быстрого поиска.",
                useCase: "Хранение метаданных об объекте (например, все характеристики одной игры).",
                code: `game = {"title": "Neon Streets", "score": 9.4}\ngame["title"]       # "Neon Streets"\ngame.get("price", 0)  # 0 (default)`
            },
            {
                title: "List Comprehension",
                description: "Компактный способ создания списков за одну строку.",
                useCase: "Быстрая фильтрация данных или преобразование (например, возведение всех чисел в квадрат).",
                code: `scores = [8.7, 7.2, 9.1, 6.8]\nhigh = [s for s in scores if s > 8.0]\n# [8.7, 9.1]`
            },
            {
                title: "Lambda / map / filter",
                description: "Инструменты функционального программирования для обработки коллекций.",
                useCase: "Применение одной функции к целому столбцу данных без циклов.",
                code: `prices = [59.99, 39.99, 49.99]\ndiscounted = list(map(lambda p: p * 0.8, prices))\nexpensive = list(filter(lambda p: p > 40, prices))`
            },
        ]
    },
    {
        category: "NumPy",
        items: [
            {
                title: "Создание массивов",
                description: "Высокопроизводительные структуры для числовых вычислений.",
                useCase: "Работа с матрицами, изображениями (как пикселями) или большими наборами чисел.",
                code: `import numpy as np\na = np.array([1, 2, 3, 4, 5])\nz = np.zeros((3, 4))\nr = np.arange(0, 10, 2)  # [0, 2, 4, 6, 8]`
            },
            {
                title: "Индексация и slicing",
                description: "Способы 'нарезки' массивов и выбора элементов по условию.",
                useCase: "Выборка конкретной области на изображении или фильтрация сигналов.",
                code: `a = np.array([10, 20, 30, 40, 50])\na[1:3]    # [20, 30]\na[a > 25] # [30, 40, 50]  — boolean mask`
            },
            {
                title: "Математика и агрегация",
                description: "Быстрые операции над целыми массивами данных.",
                useCase: "Статистический анализ: поиск среднего, нормализация данных, векторные вычисления.",
                code: `a = np.array([8.7, 7.2, 9.1, 6.8])\nnp.mean(a)   # 7.95\nnp.std(a)    # 0.87\nnp.max(a)    # 9.1\na * 10       # [87, 72, 91, 68]`
            },
        ]
    },
    {
        category: "Pandas",
        items: [
            {
                title: "Чтение данных",
                description: "Загрузка таблиц из разных форматов в оперативную память.",
                useCase: "Импорт CSV из Excel, SQL или API для начала анализа.",
                code: `import pandas as pd\ndf = pd.read_csv("cyber_games.csv")\ndf.head()     # первые 5 строк\ndf.info()     # типы и пропуски\ndf.describe() # статистики`
            },
            {
                title: "Выборка данных",
                description: "Доступ к нужным строкам и столбцам таблицы.",
                useCase: "Изоляция нужных переменных (например, только цены и продажи) для модели.",
                code: `df["title"]              # один столбец (Series)\ndf[["title", "price"]]   # несколько столбцов\ndf.loc[0]                # строка по метке\ndf.iloc[0:5]             # строки по позиции`
            },
            {
                title: "Фильтрация",
                description: "Отсеивание лишних данных по сложным условиям.",
                useCase: "Поиск целевой аудитории (например, игроки старше 18 лет из Европы).",
                code: `# Игры дороже $50\ndf[df["price"] > 50]\n\n# RPG на PC\ndf[(df["genre"] == "RPG") & (df["platform"] == "PC")]`
            },
            {
                title: "GroupBy",
                description: "Группировка данных для вычисления итогов по категориям.",
                useCase: "Отчеты: средняя выручка по странам или количество заказов по месяцам.",
                code: `# Средние продажи по жанрам\ndf.groupby("genre")["sales_mln"].mean()\n\n# Несколько агрегаций\ndf.groupby("platform").agg({"sales_mln": "sum", "price": "mean"})`
            },
            {
                title: "Пропуски",
                description: "Обработка 'дырок' в данных (NaN).",
                useCase: "Очистка данных: удаление плохих строк или заполнение пробелов средним значением.",
                code: `df.isnull().sum()           # кол-во NaN по столбцам\ndf.dropna()                 # удалить строки с NaN\ndf["price"].fillna(df["price"].median())  # заполнить`
            },
            {
                title: "Merge",
                description: "Объединение нескольких таблиц в одну по ключу.",
                useCase: "Обогащение данных: добавление информации об авторе к списку книг.",
                code: `# Объединение двух таблиц\npd.merge(games, developers, on="developer", how="left")`
            },
        ]
    },
    {
        category: "SQL",
        items: [
            {
                title: "SELECT / WHERE",
                description: "Базовый запрос для извлечения данных из базы.",
                useCase: "Выгрузка нужной статистики со склада данных (BigQuery, PostgreSQL).",
                code: `SELECT title, price\nFROM cyber_games\nWHERE price > 50\nORDER BY price DESC\nLIMIT 5;`
            },
            {
                title: "GROUP BY",
                description: "Агрегация данных на уровне базы данных.",
                useCase: "Быстрый подсчет итогов без загрузки всех данных в Python.",
                code: `SELECT genre, AVG(sales_mln) as avg_sales\nFROM cyber_games\nGROUP BY genre\nHAVING AVG(sales_mln) > 10;`
            },
            {
                title: "JOIN",
                description: "Связывание таблиц по общим ID прямо в запросе.",
                useCase: "Связывание заказов с именами клиентов для маркетингового анализа.",
                code: `SELECT g.title, d.country\nFROM games g\nINNER JOIN developers d\n  ON g.developer = d.name;`
            },
            {
                title: "Оконные функции",
                description: "Сложные вычисления внутри групп без схлопывания строк.",
                useCase: "Ранжирование (топ-3 товара в каждой категории) или скользящее среднее.",
                code: `SELECT title, genre,\n  ROW_NUMBER() OVER (PARTITION BY genre ORDER BY sales_mln DESC) as rank\nFROM cyber_games;`
            },
        ]
    },
    {
        category: "Визуализация",
        items: [
            {
                title: "matplotlib",
                description: "Универсальный 'холст' для создания графиков с нуля.",
                useCase: "Создание специфических графиков, где важна настройка каждой детали.",
                code: `import matplotlib.pyplot as plt\n\nplt.figure(figsize=(10, 6))\nplt.bar(df["title"], df["sales_mln"])\nplt.xlabel("Игра")\nplt.ylabel("Продажи (млн)")\nplt.title("Продажи видеоигр")\nplt.xticks(rotation=45)\nplt.show()`
            },
            {
                title: "seaborn",
                description: "Высокоуровневая библиотека для красивой статистики.",
                useCase: "Быстрый поиск закономерностей и визуализация распределений (EDA).",
                code: `# Heatmap корреляций\nsns.heatmap(df.corr(), annot=True, cmap="coolwarm")\n\n# Boxplot\nsns.boxplot(x="genre", y="sales_mln", data=df)\n\n# Scatter + trend\nsns.regplot(x="review_score", y="sales_mln", data=df)`
            },
        ]
    },
    {
        category: "Machine Learning",
        items: [
            {
                title: "Train/Test Split",
                description: "Разделение данных на обучение и проверку, чтобы не допустить 'зубрежки'.",
                useCase: "Подготовка данных перед запуском любого алгоритма обучения.",
                code: `from sklearn.model_selection import train_test_split\n\nX = df[["price", "review_score", "players_k"]]\ny = df["sales_mln"]\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)`
            },
            {
                title: "Линейная регрессия",
                description: "Алгоритм для предсказания непрерывных чисел по прямой линии.",
                useCase: "Прогноз цен, выручки, температур или любых числовых величин.",
                code: `from sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\ny_pred = model.predict(X_test)`
            },
            {
                title: "Логистическая регрессия",
                description: "Алгоритм для классификации (предсказывает категорию: Да/Нет, 1/0).",
                useCase: "Определение спама в почте, предсказание оттока клиентов.",
                code: `from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)`
            },
            {
                title: "Random Forest",
                description: "Ансамбль решающих деревьев, 'голосование' множества моделей для точности.",
                useCase: "Сложные задачи классификации и регрессии с множеством нелинейных связей.",
                code: `from sklearn.ensemble import RandomForestClassifier\n\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)`
            },
            {
                title: "K-Means (Кластеризация)",
                description: "Алгоритм обучения 'без учителя', который сам делит данные на группы.",
                useCase: "Сегментация клиентов: разделение базы на 'новичков', 'лояльных' и 'китов'.",
                code: `from sklearn.cluster import KMeans\nmodel = KMeans(n_clusters=3)\nmodel.fit(X)`
            },
            {
                title: "Метрики",
                description: "Способы оценки того, насколько хорошо модель справляется с задачей.",
                useCase: "Финальная проверка: стоит ли выкатывать модель в продакшн.",
                code: `from sklearn.metrics import accuracy_score, f1_score, mean_squared_error\n\nprint(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")\nprint(f"F1:       {f1_score(y_test, y_pred):.2f}")`
            },
        ]
    },
];
