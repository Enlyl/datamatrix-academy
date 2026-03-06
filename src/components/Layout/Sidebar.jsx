import { Link, useLocation } from 'react-router-dom';
import { useProgress, modules } from '../../context/ProgressContext';
import { useTheme } from '../../context/ThemeContext';

export default function Sidebar({ isOpen, onClose }) {
    const { isLessonCompleted, isLessonUnlocked, getModuleProgress } = useProgress();
    const { theme, setTheme, themes, themeNames, themeIcons } = useTheme();
    const location = useLocation();

    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
            <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
                <div className="sidebar-header">
                    <h2 className="sidebar-title">⚡ Модули</h2>
                    <button className="sidebar-close" onClick={onClose}>✕</button>
                </div>

                <div className="sidebar-nav-links">
                    <Link to="/" className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`} onClick={onClose}>
                        🏠 Главная
                    </Link>
                    <Link to="/glossary" className={`sidebar-link ${location.pathname === '/glossary' ? 'active' : ''}`} onClick={onClose}>
                        📖 Глоссарий
                    </Link>
                    <Link to="/cheatsheet" className={`sidebar-link ${location.pathname === '/cheatsheet' ? 'active' : ''}`} onClick={onClose}>
                        📋 Шпаргалка
                    </Link>
                    <Link to="/achievements" className={`sidebar-link ${location.pathname === '/achievements' ? 'active' : ''}`} onClick={onClose}>
                        🏆 Ачивки
                    </Link>
                </div>

                <div className="sidebar-modules">
                    {modules.map(mod => (
                        <div key={mod.id} className="sidebar-module">
                            <div className="module-header">
                                <span className="module-icon">{mod.icon}</span>
                                <span className="module-title">{mod.title}</span>
                                <span className="module-progress-badge">
                                    {Math.round(getModuleProgress(mod.id))}%
                                </span>
                            </div>
                            <div className="module-progress-bar">
                                <div className="module-progress-fill" style={{ width: `${getModuleProgress(mod.id)}%` }} />
                            </div>
                            <div className="module-lessons">
                                {mod.lessons.map(lesson => {
                                    const completed = isLessonCompleted(lesson.id);
                                    const unlocked = isLessonUnlocked(lesson.id);
                                    const isActive = location.pathname === `/lesson/${lesson.id}`;
                                    return (
                                        <Link
                                            key={lesson.id}
                                            to={unlocked ? `/lesson/${lesson.id}` : '#'}
                                            className={`lesson-link ${completed ? 'completed' : ''} ${!unlocked ? 'locked' : ''} ${isActive ? 'active' : ''}`}
                                            onClick={(e) => { if (!unlocked) e.preventDefault(); else onClose(); }}
                                        >
                                            <span className="lesson-status">
                                                {completed ? '✅' : unlocked ? '📖' : '🔒'}
                                            </span>
                                            <span className="lesson-name">{lesson.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sidebar-themes">
                    <h3 className="sidebar-section-title">🎨 Тема</h3>
                    <div className="theme-buttons">
                        {themes.map(t => (
                            <button
                                key={t}
                                className={`theme-btn ${theme === t ? 'active' : ''}`}
                                onClick={() => setTheme(t)}
                                title={themeNames[t]}
                            >
                                {themeIcons[t]} {themeNames[t]}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
}
