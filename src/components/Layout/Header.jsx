import { useProgress } from '../../context/ProgressContext';
import { useTheme } from '../../context/ThemeContext';

export default function Header({ onMenuToggle }) {
    const { getOverallProgress } = useProgress();
    const { theme, themeNames } = useTheme();
    const progress = getOverallProgress();

    return (
        <header className="header" id="main-header">
            <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
                <span className="menu-icon">☰</span>
            </button>
            <div className="header-brand">
                <h1 className="header-title">
                    <span className="header-logo">⚡</span>
                    DataMatrix Academy
                </h1>
                <span className="header-theme-badge">{themeNames[theme]}</span>
            </div>
            <div className="header-progress">
                <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                </div>
                <span className="progress-text">{Math.round(progress)}%</span>
            </div>
        </header>
    );
}
