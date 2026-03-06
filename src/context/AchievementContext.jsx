import { createContext, useContext, useState, useCallback } from 'react';
import { achievements as achievementsList } from '../data/achievements';

const AchievementContext = createContext();

export function AchievementProvider({ children }) {
    const [popup, setPopup] = useState(null);

    const showAchievement = useCallback((achievementId) => {
        const achievement = achievementsList.find(a => a.id === achievementId);
        if (!achievement) return;
        setPopup(achievement);
        setTimeout(() => setPopup(null), 4000);
    }, []);

    return (
        <AchievementContext.Provider value={{ popup, showAchievement, achievementsList }}>
            {children}
        </AchievementContext.Provider>
    );
}

export function useAchievements() {
    const ctx = useContext(AchievementContext);
    if (!ctx) throw new Error('useAchievements must be used within AchievementProvider');
    return ctx;
}
