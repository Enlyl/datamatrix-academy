const module9 = {
    id: 9, title: "Machine Learning", icon: "🤖",
    description: "Будущее здесь: от предсказания цен до классификации игроков.",
    lessons: [
        {
            id: "9-1", title: "Линейная Регрессия: Предсказание чисел",
            theory: [
                { type: "text", content: "### 1. Аналогия: Стрельба по мишени\n**Линейная регрессия** пытается провести прямую линию через облако точек так, чтобы она была как можно ближе к каждой из них. Представь, что ты предсказываешь цену квартиры: чем больше площадь, тем выше линия цены." },
                { type: "text", content: "### 2. Обучение модели" },
                {
                    type: "code", language: "python", content: `from sklearn.linear_model import LinearRegression
model = LinearRegression()

# Подставляем признаки X (площадь) и цель y (цена)
model.fit(X_train, y_train)
# Предсказываем цену для новых данных
predictions = model.predict(X_test)`
                },
                { type: "text", content: "### 3. Практический пример: Оценка качества\nПрофессионал никогда не верит модели на слово. Мы используем метрику MSE (среднеквадратичная ошибка), чтобы понять, насколько сильно наша «линия» промахнулась мимо реальности." }
            ],
            quiz: {
                type: "code",
                question: "Создай экземпляр модели `LinearRegression` и сохрани его в переменную `lr_model`.",
                setup: "from sklearn.linear_model import LinearRegression",
                answer: ["lr_model = LinearRegression()"],
                hint: "Имя_переменной = LinearRegression()"
            }
        },
        {
            id: "9-2", title: "Логистическая Регрессия: Выбор категории",
            theory: [
                { type: "text", content: "### 1. Аналогия: Дым или не дым?\nНесмотря на название, это алгоритм для **КЛАССИФИКАЦИИ**. Он не предсказывает цену, он отвечает на вопрос: «Да или Нет?». Купит ли пользователь игру? Уйдет ли клиент? \n\nВместо прямой линии он рисует кривую (сигмоиду), которая разделяет два мира." },
                { type: "text", content: "### 2. Пример классификации" },
                {
                    type: "code", language: "python", content: `from sklearn.linear_model import LogisticRegression
clf = LogisticRegression()

clf.fit(X_train, y_train)
# Модель выдает 1 (да) или 0 (нет)
y_pred = clf.predict(X_test)`
                },
                { type: "text", content: "### 3. Практический пример: Отчет\nВ задачах классификации мы смотрим не на ошибку, а на «точность» (Accuracy) и F1-score. Для этого есть удобный инструмент `classification_report`, который показывает, как часто модель ошибалась в каждом классе." }
            ],
            quiz: {
                type: "choice",
                question: "Какой алгоритм лучше подойдет для предсказания: 'уйдет ли клиент от компании (Churn) или нет'?",
                options: ["Линейная регрессия", "Логистическая регрессия", "K-Means кластеризация", "Арифметика"],
                correct: 1,
                hint: "Это задача классификации (Да/Нет), а не предсказание числа."
            }
        }
    ]
};
export default module9;
