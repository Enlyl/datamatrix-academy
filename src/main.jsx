import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider } from './context/ThemeContext';
import { AchievementProvider } from './context/AchievementContext';
import './themes/retro-pixel.css';
import './themes/matrix.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <ProgressProvider>
                    <AchievementProvider>
                        <App />
                    </AchievementProvider>
                </ProgressProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
