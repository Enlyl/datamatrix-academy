import { useState } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { useAchievements } from '../../context/AchievementContext';

export default function Footer() {
    const { findSecret, secretsFound } = useProgress();
    const { showAchievement } = useAchievements();
    const [showEgg, setShowEgg] = useState(false);

    const handleSecret42 = () => {
        setShowEgg(true);
        if (!secretsFound.includes('s3')) {
            findSecret('s3');
            showAchievement('s3');
        }
        setTimeout(() => setShowEgg(false), 3000);
    };

    return (
        <footer className="footer" id="main-footer">
            <div className="footer-content">
                <span className="footer-text">Bas © 2026</span>
                <span className="footer-secret" onClick={handleSecret42} title="?">❓</span>
            </div>
            {showEgg && (
                <div className="secret-overlay" onClick={() => setShowEgg(false)}>
                    <div className="secret-message">
                        <p className="secret-title">🌌 42</p>
                        <p>Ответ на главный вопрос жизни, вселенной и всего остального:</p>
                        <p className="secret-answer">Изучай данные.</p>
                    </div>
                </div>
            )}
        </footer>
    );
}
