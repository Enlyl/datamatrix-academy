const module8 = {
    id: 8, title: "Feature Engineering", icon: "🛠️",
    description: "Кухня данных: превращаем текст в числа и приводим всё к единому масштабу.",
    lessons: [
        {
            id: "8-1", title: "Кодирование: Перевод на язык машин",
            theory: [
                { type: "text", content: "### 1. Аналогия: Переводчик\nМодели ML — это калькуляторы. Они не знают, что такое «RPG» или «Action», они понимают только цифры. Кодирование — это процесс перевода категорий в числа." },
                { type: "text", content: "### 2. Два способа перевода\n• **One-Hot Encoding**: Для каждого жанра создаем отдельную колонку (0 или 1). Как галочки в анкете.\n• **Label Encoding**: Просто даем каждому жанру номер (0, 1, 2...). Как номера в очереди." },
                {
                    type: "code", language: "python", content: `import pandas as pd
# Галочки для каждой колонки
df_encoded = pd.get_dummies(df, columns=['genre'])`
                },
                { type: "text", content: "### 3. Практический пример: Scikit-Learn\nПрофи используют `LabelEncoder` из библиотеки Scikit-Learn, когда категорий слишком много (например, 100 городов), чтобы не плодить лишние колонки:" },
                {
                    type: "code", language: "python", content: `from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['city_code'] = le.fit_transform(df['city'])`
                }
            ],
            quiz: {
                type: "code",
                question: "Примени `pd.get_dummies` к датафрейму `df` для колонки 'platform' и сохрани результат в `df_final`.",
                setup: "import pandas as pd\ndf = pd.read_csv('games.csv')",
                answer: ["df_final = pd.get_dummies(df, columns=['platform'])"],
                hint: "pd.get_dummies(df, columns=['...'])"
            }
        },
        {
            id: "8-2", title: "Масштабирование: Уравниваем права",
            theory: [
                { type: "text", content: "### 1. Аналогия: Гири и гантели\nПредставь, что модель сравнивает «Возраст» (от 0 до 100) и «Зарплату» (до 1 000 000). Модель может подумать, что зарплата в 10 000 раз важнее возраста просто потому, что число больше. \n\n**Масштабирование** приводит их к одной шкале, чтобы «права» у всех были равны." },
                { type: "text", content: "### 2. Как это сделать" },
                {
                    type: "code", language: "python", content: `from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
# Теперь возраст и зарплата будут иметь среднее 0 и разброс 1
scaled_data = scaler.fit_transform(df[['age', 'income']])`
                },
                { type: "text", content: "### 3. Практический пример: Главное правило\nНикогда не обучай скейлер на ВСЕХ данных сразу. Обучай только на тренировочных, а к тестовым просто применяй результат. Иначе модель «подглядит» будущее." }
            ],
            quiz: {
                type: "choice",
                question: "Зачем нужно масштабирование признаков в Machine Learning?",
                options: [
                    "Чтобы данные занимали меньше места",
                    "Чтобы признаки с большими значениями не доминировали над другими",
                    "Чтобы превратить текст в числа",
                    "Чтобы удалить пропуски в данных"
                ],
                correct: 1,
                hint: "Модель может подумать, что доход 100000 важнее возраста 30 только из-за величины числа."
            }
        }
    ]
};
export default module8;
