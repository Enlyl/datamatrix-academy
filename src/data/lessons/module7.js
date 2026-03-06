const module7 = {
    id: 7, title: "EDA", icon: "🔍",
    description: "Исследовательский анализ: учимся «допрашивать» данные и находить скрытое.",
    lessons: [
        {
            id: "7-1", title: "Что такое EDA? (Интервью с данными)",
            theory: [
                { type: "text", content: "### 1. Аналогия: Свидание вслепую\n**EDA (Exploratory Data Analysis)** — это первое знакомство с данными. Ты не бросаешься сразу строить модели, а сначала «задаешь вопросы»: «Много ли пропусков?», «В каких единицах цена?», «Нет ли тут дубликатов?»." },
                { type: "text", content: "### 2. Первые шаги детектива" },
                {
                    type: "code", language: "python", content: `import pandas as pd
# Проверка на «дырки» в данных
print(df.isnull().sum())
# Проверка на одинаковые строки
print(df.duplicated().sum())`
                },
                { type: "text", content: "### 3. Практический пример: Категории\nЧасто в данных бывают опечатки (например, 'RPG' и 'R.P.G.'). Профессионал всегда проверяет уникальные значения:" },
                {
                    type: "code", language: "python", content: `# Смотрим, сколько раз встречается каждый жанр
print(df['genre'].value_counts())`
                }
            ],
            quiz: {
                type: "choice",
                question: "С чего профессиональный Data Scientist ВСЕГДА начинает EDA после загрузки данных?",
                options: ["Построение нейросети", "Удаление всех пропусков", "Инспекция данных (head, info, describe) ", "Создание финальной презентации"],
                correct: 2,
                hint: "Сначала нужно понять, что вообще лежит в таблице."
            }
        },
        {
            id: "7-2", title: "Поиск аномалий: Кто лишний?",
            theory: [
                { type: "text", content: "### 1. Аналогия: Баскетболист в детском саду\n**Аномалии (выбросы)** — это значения, которые «сломают» твою статистику. Представь, что ты меряешь средний рост в группе детского сада, куда зашел Шакил О’Нил. Его рост — это выброс." },
                { type: "text", content: "### 2. Как увидеть выброс" },
                {
                    type: "code", language: "python", content: `import seaborn as sns
# Боксплот («ящик с усами») — лучший способ увидеть аномалии
sns.boxplot(x=df['price'])`
                },
                { type: "text", content: "### 3. Практический пример: Математический фильтр\nМы используем правило IQR (межквартильный размах), чтобы автоматически очистить данные от «великанов»:" },
                {
                    type: "code", language: "python", content: `Q1 = df['price'].quantile(0.25)
Q3 = df['price'].quantile(0.75)
IQR = Q3 - Q1
# Удаляем всё, что слишком далеко от центра
clean_df = df[df['price'].between(Q1 - 1.5*IQR, Q3 + 1.5*IQR)]`
                }
            ],
            quiz: {
                type: "code",
                question: "Посчитай `Q1` (квантиль 0.25) для столбца `df['sales']` и сохрани в переменную `q1`.",
                setup: "import pandas as pd\ndf = pd.read_csv('games.csv')",
                answer: ["q1 = df['sales'].quantile(0.25)"],
                hint: "df['колонка'].quantile(0.25)"
            }
        }
    ]
};
export default module7;
