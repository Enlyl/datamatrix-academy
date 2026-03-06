import { Link } from 'react-router-dom';
import { useProgress, modules } from '../context/ProgressContext';

export default function HomePage() {
    const { getOverallProgress, getModuleProgress, isLessonUnlocked, completedLessons } = useProgress();
    const progress = getOverallProgress();

    // Find next available lesson
    let nextLesson = null;
    for (const mod of modules) {
        for (const lesson of mod.lessons) {
            if (isLessonUnlocked(lesson.id) && !completedLessons.includes(lesson.id)) {
                nextLesson = { ...lesson, moduleName: mod.title, moduleIcon: mod.icon };
                break;
            }
        }
        if (nextLesson) break;
    }

    return (
        <div className="home-page">
            <div className="home-hero">
                <div className="hero-glitch" data-text="DataMatrix Academy">DataMatrix Academy</div>
                <p className="hero-subtitle">Интерактивный курс Data Science — от нуля до Junior</p>
                <div className="hero-stats">
                    <div className="stat-card">
                        <span className="stat-value">{modules.length}</span>
                        <span className="stat-label">модулей</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">{modules.reduce((s, m) => s + m.lessons.length, 0)}</span>
                        <span className="stat-label">уроков</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">{Math.round(progress)}%</span>
                        <span className="stat-label">пройдено</span>
                    </div>
                </div>
                {nextLesson && (
                    <Link to={`/lesson/${nextLesson.id}`} className="btn btn-primary btn-lg hero-cta">
                        {completedLessons.length === 0 ? '🚀 Начать обучение' : `▶ Продолжить: ${nextLesson.moduleIcon} ${nextLesson.title}`}
                    </Link>
                )}
                {!nextLesson && progress >= 100 && (
                    <div className="hero-complete">
                        🎉 Курс пройден! Ты — DATA SENSEI!
                        <Link to="/certificate" className="btn btn-gold btn-sm" style={{ marginLeft: '1rem' }}>🎓 Получить диплом</Link>
                    </div>
                )}

                <div className="home-roadmap">
                    <div className="roadmap-line" />
                    {modules.map((mod, i) => {
                        const isDone = getModuleProgress(mod.id) >= 100;
                        const isLocked = !isLessonUnlocked(mod.lessons[0].id);
                        return (
                            <div key={mod.id} className={`roadmap-step ${isDone ? 'done' : ''} ${isLocked ? 'locked' : ''}`}>
                                <div className="step-circle" title={mod.title}>{mod.icon}</div>
                                <div className="step-label">M{mod.id}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="home-modules">
                <h2 className="section-title">📚 Программа курса</h2>
                <div className="modules-grid">
                    {modules.map(mod => {
                        const modProgress = getModuleProgress(mod.id);
                        const firstLesson = mod.lessons[0];
                        const isAvailable = isLessonUnlocked(firstLesson.id);
                        return (
                            <Link
                                key={mod.id}
                                to={isAvailable ? `/lesson/${firstLesson.id}` : '#'}
                                className={`module-card ${modProgress >= 100 ? 'completed' : ''} ${!isAvailable ? 'locked' : ''}`}
                                onClick={(e) => !isAvailable && e.preventDefault()}
                            >
                                <div className="module-card-icon">{mod.icon}</div>
                                <h3 className="module-card-title">
                                    <span className="module-number">#{mod.id}</span>
                                    {mod.title}
                                </h3>
                                <p className="module-card-desc">{mod.description}</p>
                                <div className="module-card-meta">
                                    <span>{mod.lessons.length} уроков</span>
                                    <span className={`module-card-status ${modProgress >= 100 ? 'done' : modProgress > 0 ? 'in-progress' : ''}`}>
                                        {modProgress >= 100 ? '✅ Пройден' : modProgress > 0 ? `${Math.round(modProgress)}%` : isAvailable ? 'Доступен' : '🔒'}
                                    </span>
                                </div>
                                <div className="module-card-progress">
                                    <div className="module-card-progress-fill" style={{ width: `${modProgress}%` }} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="home-features">
                <h2 className="section-title">⚡ Возможности</h2>
                <div className="features-grid">
                    <Link to="/glossary" className="feature-card">
                        <span className="feature-icon">📖</span>
                        <h3>Глоссарий</h3>
                        <p>30+ ключевых терминов DS с объяснениями</p>
                    </Link>
                    <Link to="/cheatsheet" className="feature-card">
                        <span className="feature-icon">📋</span>
                        <h3>Шпаргалка</h3>
                        <p>Готовый код для Python, Pandas, SQL, ML</p>
                    </Link>
                    <Link to="/achievements" className="feature-card">
                        <span className="feature-icon">🏆</span>
                        <h3>Ачивки</h3>
                        <p>13 достижений + секретные пасхалки</p>
                    </Link>
                    <Link to="/certificate" className="feature-card">
                        <span className="feature-icon">🎓</span>
                        <h3>Сертификат</h3>
                        <p>Получи именной диплом после курса</p>
                    </Link>
                    <Link to="/final-project" className="feature-card feature-highlight">
                        <span className="feature-icon">🚀</span>
                        <h3>Финальный проект</h3>
                        <p>Проверь силы на реальном кейсе</p>
                    </Link>
                    <div className="feature-card">
                        <span className="feature-icon">🎨</span>
                        <h3>3 темы</h3>
                        <p>Cyberpunk, Retro Pixel, Matrix</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
