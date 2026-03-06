// Модуль 1: Python Basics for DS
const module1 = {
    id: 1,
    title: "Python Basics for DS",
    icon: "🐍",
    description: "Разбиваем основы Python на простые шаги: переменные как коробки, списки как шкафы и функции как чертежи.",
    lessons: [
        {
            id: "1-1",
            title: "Переменные и базовые типы",
            theory: [
                { type: "text", content: "### 1. Аналогия: Данные в коробках\nПредставь, что **переменная** — это коробка, на которой наклеена бирка с именем. В коробку можно положить число, текст или список. \n\n**Почему это важно в Data Science:**\nВместо того чтобы каждый раз вручную писать огромную таблицу, мы присваиваем её переменной `data` и работаем с коротким именем." },
                { type: "text", content: "### 2. Базовые типы\n• `str` (строка) — текстовая информация.\n• `int` (целое число) — количество (например, сколько раз кликнули на игру).\n• `float` (с точкой) — точность (например, средняя оценка или цена).\n• `bool` (логика) — переключатель (True/False)." },
                {
                    type: "code", language: "python", content: `# Создание переменных (бирка = содержимое)
game_title = "Cyber Samurai"  # str
release_year = 2023           # int
price = 59.99                 # float
is_active = True             # bool`
                },
                { type: "text", content: "### 3. Практический пример\nВ работе с данными мы часто используем **f-строки** для красивых отчетов и `type()` для проверки, не превратилось ли число в текст по ошибке:" },
                {
                    type: "code", language: "python", content: "print(f\"Игра {game_title} стоит \\${price}\")\n# Проверка типа критична при загрузке данных\nprint(type(price))  # <class 'float'>"
                },
                {
                    type: "playground",
                    config: {
                        initialCode: 'name = "Data Scientist"\nprint(f"Hello, I am a {name}")\nprint(type(name))',
                        expectedOutput: "Data Scientist",
                        successMessage: "Прекрасно! Ты освоил переменные и f-строки.",
                        hint: "Попробуй изменить значение в переменной name."
                    }
                }
            ],
            quiz: {
                type: "code",
                question: "Создай переменную `game_name` со значением 'Neon Streets' и выведи её тип с помощью функции `type()`.",
                setup: "",
                answer: ["game_name = 'Neon Streets'\nprint(type(game_name))", "game_name = \"Neon Streets\"\nprint(type(game_name))"],
                hint: "Сначала присвой значение, затем используй print(type(переменная))"
            }
        },
        {
            id: "1-2",
            title: "Списки (Lists)",
            theory: [
                { type: "text", content: "### 1. Аналогия: Поезд с вагонами\n**Список (list)** — это поезд, где каждый вагон (элемент) имеет свой номер (индекс). Первый вагон всегда имеет индекс **0**.\n\n**В Data Science:** Мы храним в списках названия колонок, настройки обучения или просто наборы чисел." },
                { type: "text", content: "### 2. Управление списком" },
                {
                    type: "code", language: "python", content: `genres = ["RPG", "Shooter", "Indie"]
print(genres[0])        # Достаем ПЕРВЫЙ элемент: "RPG"
genres.append("Action") # Цепляем новый вагон в конец`
                },
                { type: "text", content: "### 3. Практический пример: Срезы\nСрезы (slices) позволяют отрезать «кусок» данных. Это как если бы ты сказал: «Дай мне только первые два жанра»:" },
                {
                    type: "code", language: "python", content: `top_two = genres[:2]    # Берем от начала до 2-го (не включая его)
if "RPG" in genres:
    print("РПГ найдена!")`
                }
            ],
            quiz: {
                type: "code",
                question: "Создай список `categories` с элементами 'Classic' и 'Modern'. Добавь в него элемент 'Retro'.",
                setup: "",
                answer: ["categories = ['Classic', 'Modern']\ncategories.append('Retro')", "categories = [\"Classic\", \"Modern\"]\ncategories.append(\"Retro\")"],
                hint: "Используй метод .append('значение')"
            }
        },
        {
            id: "1-3",
            title: "Словари (Dictionaries)",
            theory: [
                { type: "text", content: "### 1. Аналогия: Карточка игрока\n**Словарь (dict)** — это как карточка в библиотеке или профиль в игре. У каждого значения есть уникальное имя (Ключ).\n\n**В Data Science:** Почти все данные, которые приходят из интернета (API), выглядят как огромные словари." },
                { type: "text", content: "### 2. Работа с ключами" },
                {
                    type: "code", language: "python", content: `player = {
    "name": "Alex",
    "score": 1500
}
print(player["name"]) # Достаем значение по имени ключа`
                },
                { type: "text", content: "### 3. Практический пример: Безопасность\nЕсли ключа нет, Python выдаст ошибку. Профи используют метод `.get()`, чтобы вместо ошибки получить «пусто» или значение по умолчанию:" },
                {
                    type: "code", language: "python", content: `rating = player.get("rank", "Beginner") 
# Если rank нет, программа не упадет, а запишет "Beginner"`
                }
            ],
            quiz: {
                type: "code",
                question: "Создай словарь `user` с ключом 'name' и значением 'Admin'. Получи значение по ключу через метод `.get()`.",
                setup: "",
                answer: ["user = {'name': 'Admin'}\nuser.get('name')", "user = {\"name\": \"Admin\"}\nuser.get(\"name\")"],
                hint: "Используй метод .get('ключ')"
            }
        },
        {
            id: "1-4",
            title: "Циклы и Условия",
            theory: [
                { type: "text", content: "### 1. Контроль потока\n**Условия (if)** — это развилки на дороге. **Циклы (for)** — это повторение одного и того же действия для каждого элемента (например, применить скидку к каждому товару)." },
                { type: "text", content: "### 2. Базовый цикл" },
                {
                    type: "code", language: "python", content: `prices = [100, 200, 300]
for p in prices:
    if p > 150:
        print(f"{p} — Дорого")`
                },
                { type: "text", content: "### 3. Практический пример: List Comprehension\nВ DS мы любим короткие записи. Это «быстрый цикл», который создает новый список из старого за одну строку:" },
                {
                    type: "code", language: "python", content: `# Сделать скидку 20% на все цены:
sale_prices = [p * 0.8 for p in prices]`
                }
            ],
            quiz: {
                type: "code",
                question: "Используя list comprehension, создай список `doubled` из списка `nums = [1, 2, 3]`, где каждое число умножено на 2.",
                setup: "nums = [1, 2, 3]",
                answer: ["doubled = [n * 2 for n in nums]", "doubled = [x * 2 for x in nums]"],
                hint: "[выражение for элемент in список]"
            }
        },
        {
            id: "1-5",
            title: "Функции и Lambda",
            theory: [
                { type: "text", content: "### 1. Аналогия: Мини-комбайн\n**Функция (`def`)** — это чертеж станка. Вы один раз описываете, как превращать «яблоки в сок», а потом просто нажимаете кнопку запуска.\n\n**Lambda** — это маленький «одноразовый» станок для самых простых действий." },
                { type: "text", content: "### 2. Практический пример\nВ DS функции нужны для очистки данных. Например, функция, которая убирает лишние знаки из цены:" },
                {
                    type: "code", language: "python", content: `def clean_currency(value):
    return float(value.replace("$", ""))

# Lambda для быстрой математики:
to_percent = lambda x: x * 100`
                },
                { type: "text", content: "### 3. Куда это применять?\nПозже в библиотеке Pandas мы будем «напускать» такие функции на целые столбцы таблиц одной командой." }
            ],
            quiz: {
                type: "code",
                question: "Напиши lambda-функцию `square`, которая возводит число `x` в квадрат (`x**2`).",
                setup: "",
                answer: ["square = lambda x: x**2", "square = lambda x: x * x"],
                hint: "lambda аргумент: выражение"
            }
        }
    ]
};

export default module1;
