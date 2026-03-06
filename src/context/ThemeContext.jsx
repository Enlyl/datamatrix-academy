import { createContext, useContext, useState, useEffect } from 'react';

const THEME_KEY = 'dsTheme';
const themes = ['cyberpunk', 'retro', 'matrix'];
const themeNames = {
    cyberpunk: 'Cyberpunk 2077',
    retro: 'Retro Pixel',
    matrix: 'Matrix',
};
const themeIcons = {
    cyberpunk: '🌆',
    retro: '👾',
    matrix: '💊',
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState(() => {
        try {
            return localStorage.getItem(THEME_KEY) || 'cyberpunk';
        } catch { return 'cyberpunk'; }
    });
    const [godMode, setGodMode] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem(THEME_KEY, theme); } catch { }
    }, [theme]);

    useEffect(() => {
        if (!godMode) return;
        let idx = 0;
        const interval = setInterval(() => {
            idx = (idx + 1) % themes.length;
            document.documentElement.setAttribute('data-theme', themes[idx]);
        }, 5000);
        return () => clearInterval(interval);
    }, [godMode]);

    const setTheme = (t) => {
        if (themes.includes(t)) {
            setGodMode(false);
            setThemeState(t);
        }
    };

    const activateGodMode = () => setGodMode(true);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themes, themeNames, themeIcons, godMode, activateGodMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
