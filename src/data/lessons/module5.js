const module5 = {
    id: 5, title: "Data Visualization", icon: "📊",
    description: "Искусство графиков: от черновиков в Matplotlib до шедевров в Seaborn.",
    lessons: [
        {
            id: "5-1", title: "Matplotlib: Твой внутренний художник",
            theory: [
                { type: "text", content: "### 1. Аналогия: Холст и краски\n**Matplotlib** — это база. Представь, что тебе дали чистый холст (`Figure`) и кисти (`Axes`). Ты сам решаешь, где поставить точку, какой толщины будет линия и какого цвета заголовок." },
                { type: "text", content: "### 2. Первый набросок" },
                {
                    type: "code", language: "python", content: `import matplotlib.pyplot as plt

# Рисуем линию (X, Y)
plt.plot([1, 2, 3], [10, 20, 15])
plt.title("Мой первый график")
plt.show() # Показать результат`
                },
                { type: "text", content: "### 3. Практический пример: Читаемость\nГолый график в DS — это плохой тон. Профи всегда добавляют «подписи», чтобы другие понимали, что на картинке:" },
                {
                    type: "code", language: "python", content: `plt.plot(df['date'], df['sales'])
plt.xlabel("Месяц")     # Подпись горизонтальной оси
plt.ylabel("Выручка")   # Подпись вертикальной оси
plt.grid(True)          # Сетка для точности
plt.xticks(rotation=45) # Поворачиваем даты, чтобы не слиплись`
                }
            ],
            quiz: {
                type: "code",
                question: "Напиши команду для создания гистограммы (hist) из столбца `df['price']` и покажи график командой `plt.show()`.",
                setup: "import matplotlib.pyplot as plt",
                answer: ["plt.hist(df['price'])\nplt.show()"],
                hint: "plt.hist(данные)\nplt.show()"
            }
        },
        {
            id: "5-2", title: "Seaborn: Модный стилист",
            theory: [
                { type: "text", content: "### 1. Аналогия: Графики «из коробки»\nЕсли Matplotlib — это конструктор, то **Seaborn** — это готовые дизайнерские шаблоны. Он делает графики красивыми по умолчанию и умеет работать с таблицами Pandas напрямую." },
                { type: "text", content: "### 2. Красота в одну строку" },
                {
                    type: "code", language: "python", content: `import seaborn as sns
# Красивое распределение цен
sns.histplot(df['price'])`
                },
                { type: "text", content: "### 3. Практический пример: Поиск связей\nВ DS мы часто ищем зависимости (например, влияет ли цена на продажи). Для этого используем `scatterplot` (точки):" },
                {
                    type: "code", language: "python", content: `sns.scatterplot(data=df, x='price', y='sales', hue='genre')
# Параметр hue раскрасит точки по жанрам автоматически!`
                }
            ],
            quiz: {
                type: "code",
                question: "Создай `sns.boxplot`, где по оси `x` будет 'genre', а по оси `y` — 'sales'. Данные бери из `df`.",
                setup: "import seaborn as sns",
                answer: ["sns.boxplot(data=df, x='genre', y='sales')"],
                hint: "sns.boxplot(data=..., x='...', y='...')"
            }
        }
    ]
};
export default module5;
