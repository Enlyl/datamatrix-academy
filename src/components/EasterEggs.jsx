import { useEffect, useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { useTheme } from '../context/ThemeContext';
import { useAchievements } from '../context/AchievementContext';

export default function EasterEggs() {
    const { findSecret, secretsFound } = useProgress();
    const { activateGodMode } = useTheme();
    const { showAchievement } = useAchievements();
    const [redPill, setRedPill] = useState(false);
    const [confetti, setConfetti] = useState(false);

    // Konami Code: ↑↑↓↓←→←→BA
    useEffect(() => {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        let konamiIndex = 0;

        const handleKey = (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    konamiIndex = 0;
                    activateGodMode();
                    setConfetti(true);
                    if (!secretsFound.includes('s2')) {
                        findSecret('s2');
                        showAchievement('s2');
                    }
                    setTimeout(() => setConfetti(false), 5000);
                }
            } else {
                konamiIndex = 0;
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [secretsFound]);

    // Red Pill easter egg
    useEffect(() => {
        const handleRedPill = () => {
            setRedPill(true);
            if (!secretsFound.includes('s1')) {
                findSecret('s1');
                showAchievement('s1');
            }
            setTimeout(() => setRedPill(false), 3000);
        };

        window.addEventListener('redpill', handleRedPill);
        return () => window.removeEventListener('redpill', handleRedPill);
    }, [secretsFound]);

    return (
        <>
            {redPill && (
                <div className="easter-redpill" onClick={() => setRedPill(false)}>
                    <div className="redpill-text">
                        <p className="redpill-title">💊 Красная таблетка</p>
                        <p className="redpill-message">Добро пожаловать в реальный мир, Нео.</p>
                        <p className="redpill-sub">Теперь ты видишь Матрицу данных.</p>
                    </div>
                </div>
            )}
            {confetti && (
                <div className="easter-confetti">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="confetti-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 3}s`,
                                backgroundColor: ['#ff006e', '#00f0ff', '#ffe600', '#8338ec', '#06d6a0', '#ff00ff'][i % 6],
                            }}
                        />
                    ))}
                    <div className="godmode-text">⚡ GOD MODE ACTIVATED ⚡</div>
                </div>
            )}
        </>
    );
}
