export default function AchievementPopup({ achievement }) {
    return (
        <div className="achievement-popup" key={achievement.id}>
            <div className="achievement-popup-inner">
                <div className="achievement-popup-glow" />
                <span className="achievement-popup-icon">{achievement.icon}</span>
                <div className="achievement-popup-text">
                    <span className="achievement-popup-label">🏆 Достижение получено!</span>
                    <span className="achievement-popup-title">{achievement.title}</span>
                    <span className="achievement-popup-desc">{achievement.description}</span>
                </div>
            </div>
        </div>
    );
}
