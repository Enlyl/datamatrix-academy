import { createContext, useContext, useReducer, useEffect } from 'react';
import module1 from '../data/lessons/module1';
import module2 from '../data/lessons/module2';
import module3 from '../data/lessons/module3';
import module4 from '../data/lessons/module4';
import module5 from '../data/lessons/module5';
import module6 from '../data/lessons/module6';
import module7 from '../data/lessons/module7';
import module8 from '../data/lessons/module8';
import module9 from '../data/lessons/module9';

export const modules = [module1, module2, module3, module4, module5, module6, module7, module8, module9];

const STORAGE_KEY = 'dsProgress';

const initialState = {
    completedLessons: [],
    currentLesson: '1-1',
    achievements: [],
    secretsFound: [],
};

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return { ...initialState, ...JSON.parse(saved) };
    } catch { }
    return initialState;
}

function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { }
}

function reducer(state, action) {
    let newState;
    switch (action.type) {
        case 'COMPLETE_LESSON': {
            if (state.completedLessons.includes(action.lessonId)) return state;
            const completed = [...state.completedLessons, action.lessonId];
            newState = { ...state, completedLessons: completed };
            break;
        }
        case 'SET_CURRENT_LESSON':
            newState = { ...state, currentLesson: action.lessonId };
            break;
        case 'UNLOCK_ACHIEVEMENT': {
            if (state.achievements.includes(action.achievementId)) return state;
            newState = { ...state, achievements: [...state.achievements, action.achievementId] };
            break;
        }
        case 'FIND_SECRET': {
            if (state.secretsFound.includes(action.secretId)) return state;
            newState = { ...state, secretsFound: [...state.secretsFound, action.secretId] };
            break;
        }
        case 'RESET_PROGRESS':
            newState = initialState;
            break;
        default:
            return state;
    }
    saveState(newState);
    return newState;
}

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, null, loadState);

    const completeLesson = (lessonId) => dispatch({ type: 'COMPLETE_LESSON', lessonId });
    const setCurrentLesson = (lessonId) => dispatch({ type: 'SET_CURRENT_LESSON', lessonId });
    const unlockAchievement = (achievementId) => dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId });
    const findSecret = (secretId) => dispatch({ type: 'FIND_SECRET', secretId });
    const resetProgress = () => dispatch({ type: 'RESET_PROGRESS' });

    const isLessonUnlocked = (lessonId) => {
        // First lesson of each module is always unlocked
        if (lessonId.endsWith('-1')) return true;
        // Check if previous lesson is completed
        const [modStr, lesStr] = lessonId.split('-');
        const prevId = `${modStr}-${parseInt(lesStr) - 1}`;
        return state.completedLessons.includes(prevId);
    };

    const isLessonCompleted = (lessonId) => state.completedLessons.includes(lessonId);

    const isModuleCompleted = (moduleId) => {
        const mod = modules.find(m => m.id === moduleId);
        if (!mod) return false;
        return mod.lessons.every(l => state.completedLessons.includes(l.id));
    };

    const getOverallProgress = () => {
        const total = modules.reduce((sum, m) => sum + m.lessons.length, 0);
        return total > 0 ? (state.completedLessons.length / total * 100) : 0;
    };

    const getModuleProgress = (moduleId) => {
        const mod = modules.find(m => m.id === moduleId);
        if (!mod) return 0;
        const completed = mod.lessons.filter(l => state.completedLessons.includes(l.id)).length;
        return mod.lessons.length > 0 ? (completed / mod.lessons.length * 100) : 0;
    };

    return (
        <ProgressContext.Provider value={{
            ...state, completeLesson, setCurrentLesson, unlockAchievement, findSecret,
            resetProgress, isLessonUnlocked, isLessonCompleted, isModuleCompleted,
            getOverallProgress, getModuleProgress, modules,
        }}>
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress() {
    const ctx = useContext(ProgressContext);
    if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
    return ctx;
}
