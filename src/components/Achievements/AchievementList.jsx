import { useProgress } from '../../context/ProgressContext';
import { achievements } from '../../data/achievements';

export default function AchievementList() {
    const { achievements: unlocked, secretsFound } = useProgress();

    const isUnlocked = (id) => unlocked.includes(id) || secretsFound.includes(id);

    const normalAch = achievements.filter(a => a.type === 'normal');
    const goldAch = achievements.filter(a => a.type === 'gold');
    const secretAch = achievements.filter(a => a.type === 'secret');

    const totalUnlocked = achievements.filter(a => isUnlocked(a.id)).length;

    return (
        <div className="achievements-page">
            <h1 className="page-title">🏆 Достижения</h1>
            <p className="page-subtitle">Разблокировано: {totalUnlocked} из {achievements.length}</p>

            <div className="achievements-progress-bar">
                <div className="achievements-progress-fill" style={{ width: `${(totalUnlocked / achievements.length) * 100}%` }} />
            </div>

            <h2 className="achievements-section-title">📦 Модули</h2>
            <div className="achievements-grid">
                {normalAch.map(ach => (
                    <div key={ach.id} className={`achievement-card ${isUnlocked(ach.id) ? 'unlocked' : 'locked'}`}>
                        <span className="achievement-icon">{isUnlocked(ach.id) ? ach.icon : '🔒'}</span>
                        <h3 className="achievement-title">{isUnlocked(ach.id) ? ach.title : '???'}</h3>
                        <p className="achievement-desc">{isUnlocked(ach.id) ? ach.description : 'Пройди модуль, чтобы разблокировать'}</p>
                    </div>
                ))}
            </div>

            <h2 className="achievements-section-title">🌟 Золотые</h2>
            <div className="achievements-grid">
                {goldAch.map(ach => (
                    <div key={ach.id} className={`achievement-card gold ${isUnlocked(ach.id) ? 'unlocked' : 'locked'}`}>
                        <span className="achievement-icon">{isUnlocked(ach.id) ? ach.icon : '🔒'}</span>
                        <h3 className="achievement-title">{isUnlocked(ach.id) ? ach.title : '???'}</h3>
                        <p className="achievement-desc">{isUnlocked(ach.id) ? ach.description : 'Пройди все модули'}</p>
                    </div>
                ))}
            </div>

            <h2 className="achievements-section-title">🕵️ Секретные</h2>
            <div className="achievements-grid">
                {secretAch.map(ach => (
                    <div key={ach.id} className={`achievement-card secret ${isUnlocked(ach.id) ? 'unlocked' : 'locked'}`}>
                        <span className="achievement-icon">{isUnlocked(ach.id) ? ach.icon : '🔒'}</span>
                        <h3 className="achievement-title">{isUnlocked(ach.id) ? ach.title : '???'}</h3>
                        <p className="achievement-desc">{isUnlocked(ach.id) ? ach.description : 'Найди секрет...'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
