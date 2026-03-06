import { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Link } from 'react-router-dom';
import CodeBlock from './Lesson/CodeBlock';
import DataTable from './Lesson/DataTable';

export default function FinalProjectPage() {
    const { getOverallProgress } = useProgress();
    const progress = getOverallProgress();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({ s1: '', s2: '', s3: '' });
    const [feedback, setFeedback] = useState('');

    const handleCheck = (s, correct, next) => {
        if (answers[s].toLowerCase().trim() === correct.toLowerCase().trim()) {
            setFeedback('✅ Верно! Переходим к следующему этапу.');
            setTimeout(() => {
                setStep(next);
                setFeedback('');
            }, 1500);
        } else {
            setFeedback('❌ Ошибка. Проверь код еще раз.');
        }
    };

    if (progress < 80) {
        return (
            <div className="final-project-locked">
                <div className="lock-icon-huge">🚧</div>
                <h1>Финальный проект заблокирован</h1>
                <p>Нужно пройти хотя бы 80% курса, чтобы приступить к финальному испытанию.</p>
                <Link to="/" className="btn btn-primary">Вернуться к обучению</Link>
            </div>
        );
    }

    return (
        <div className="final-project-page">
            <h1 className="page-title">🚀 Финальный проект: Аналитик Будущего</h1>
            <p className="page-subtitle">Примени все знания на реальном кейсе кибер-спортивной индустрии.</p>

            <div className="project-container">
                <div className="project-steps">
                    <div className={`project-step-indicator ${step >= 1 ? 'active' : ''}`}>1. Очистка</div>
                    <div className={`project-step-indicator ${step >= 2 ? 'active' : ''}`}>2. Аналитика</div>
                    <div className={`project-step-indicator ${step >= 3 ? 'active' : ''}`}>3. Модель</div>
                </div>

                <div className="project-card">
                    {step === 1 && (
                        <div className="project-content">
                            <h3>Этап 1: Подготовка данных</h3>
                            <p>У нас есть датасет `cyber_games`. Твоя задача — найти все игры с ценой выше 50 и жанром 'RPG'.</p>
                            <CodeBlock code="expensive_rpg = df[(df['price'] > 50) & (df['genre'] == 'RPG')]" language="python" />
                            <div className="project-task">
                                <label>Какая команда выведет первые 5 строк полученной таблицы?</label>
                                <input
                                    type="text"
                                    value={answers.s1}
                                    onChange={e => setAnswers({ ...answers, s1: e.target.value })}
                                    placeholder="Например: df.head()"
                                />
                                <button className="btn btn-primary" onClick={() => handleCheck('s1', 'expensive_rpg.head()', 2)}>Проверить</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="project-content">
                            <h3>Этап 2: Визуализация трендов</h3>
                            <p>Мы хотим увидеть, как менялись продажи (`sales_mln`) по годам (`release_year`).</p>
                            <div className="project-task">
                                <label>Какую библиотеку мы импортируем как `sns` для красивых графиков?</label>
                                <input
                                    type="text"
                                    value={answers.s2}
                                    onChange={e => setAnswers({ ...answers, s2: e.target.value })}
                                    placeholder="Название библиотеки..."
                                />
                                <button className="btn btn-primary" onClick={() => handleCheck('s2', 'seaborn', 3)}>Проверить</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="project-content">
                            <h3>Этап 3: Предсказание</h3>
                            <p>Мы обучаем модель `LinearRegression`. Мы разбили данные на `X_train` и `y_train`.</p>
                            <div className="project-task">
                                <label>Какой метод запускает процесс обучения модели `model`?</label>
                                <input
                                    type="text"
                                    value={answers.s3}
                                    onChange={e => setAnswers({ ...answers, s3: e.target.value })}
                                    placeholder="Например: model.train()"
                                />
                                <button className="btn btn-primary" onClick={() => handleCheck('s3', 'model.fit(X_train, y_train)', 4)}>Проверить</button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="project-success">
                            <h2>🎊 Проект завершен!</h2>
                            <p>Ты успешно прошел через все тернии анализа данных. Теперь ты готов к реальным вызовам!</p>
                            <Link to="/certificate" className="btn btn-gold btn-lg">🎓 Твой диплом</Link>
                        </div>
                    )}

                    {feedback && <div className="project-feedback">{feedback}</div>}
                </div>
            </div>
        </div>
    );
}
