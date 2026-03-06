import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LessonPage from './components/Lesson/LessonPage';
import GlossaryPage from './components/GlossaryPage';
import CheatSheetPage from './components/CheatSheetPage';
import AchievementList from './components/Achievements/AchievementList';
import AchievementPopup from './components/Achievements/AchievementPopup';
import HomePage from './components/HomePage';
import EasterEggs from './components/EasterEggs';
import { useAchievements } from './context/AchievementContext';

export default function App() {
    const { popup } = useAchievements();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="app">
            <EasterEggs />
            <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="app-body">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/lesson/:lessonId" element={<LessonPage />} />
                        <Route path="/glossary" element={<GlossaryPage />} />
                        <Route path="/cheatsheet" element={<CheatSheetPage />} />
                        <Route path="/achievements" element={<AchievementList />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
            <Footer />
            {popup && <AchievementPopup achievement={popup} />}
        </div>
    );
}
