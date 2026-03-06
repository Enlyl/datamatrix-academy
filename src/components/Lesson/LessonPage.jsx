import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useProgress, modules } from '../../context/ProgressContext';
import { useAchievements } from '../../context/AchievementContext';
import CodeBlock from './CodeBlock';
import DataTable from './DataTable';
import QuizMultiChoice from './QuizMultiChoice';
import QuizCodeInput from './QuizCodeInput';
import InteractiveChart from './InteractiveChart';
import CodePlayground from './CodePlayground';

export default function LessonPage() {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const { completeLesson, isLessonCompleted, isLessonUnlocked, unlockAchievement, isModuleCompleted } = useProgress();
    const { showAchievement } = useAchievements();
    const [quizSolved, setQuizSolved] = useState(false);

    // Find lesson data
    let lesson = null, mod = null, lessonIndex = -1;
    for (const m of modules) {
        const idx = m.lessons.findIndex(l => l.id === lessonId);
        if (idx !== -1) { lesson = m.lessons[idx]; mod = m; lessonIndex = idx; break; }
    }

    useEffect(() => {
        setQuizSolved(false);
        window.scrollTo(0, 0);
    }, [lessonId]);

    if (!lesson || !mod) {
        return <div className="lesson-not-found"><h2>Урок не найден</h2><Link to="/">← На главную</Link></div>;
    }

    if (!isLessonUnlocked(lessonId)) {
        return (
            <div className="lesson-locked-page">
                <div className="lock-icon-big">🔒</div>
                <h2>Урок заблокирован</h2>
                <p>Сначала пройди предыдущий урок!</p>
                <Link to="/" className="btn btn-primary">← На главную</Link>
            </div>
        );
    }

    const alreadyCompleted = isLessonCompleted(lessonId);

    const handleQuizComplete = () => {
        setQuizSolved(true);
        if (!alreadyCompleted) {
            completeLesson(lessonId);
            // Check if module completed → unlock achievement
            const achId = `a${mod.id}`;
            setTimeout(() => {
                if (isModuleCompleted(mod.id)) {
                    unlockAchievement(achId);
                    showAchievement(achId);
                    // Check all modules for gold achievement
                    const allDone = modules.every(m => m.lessons.every(l => isLessonCompleted(l.id) || l.id === lessonId));
                    if (allDone) {
                        setTimeout(() => { unlockAchievement('a10'); showAchievement('a10'); }, 1500);
                    }
                }
            }, 500);
        }
    };

    // Next/prev lesson
    const nextLesson = lessonIndex < mod.lessons.length - 1
        ? mod.lessons[lessonIndex + 1]
        : modules.find(m => m.id === mod.id + 1)?.lessons[0] || null;
    const prevLesson = lessonIndex > 0
        ? mod.lessons[lessonIndex - 1]
        : modules.find(m => m.id === mod.id - 1)?.lessons.at(-1) || null;

    const canGoNext = alreadyCompleted || quizSolved;

    return (
        <div className="lesson-page">
            <div className="lesson-breadcrumb">
                <Link to="/">Главная</Link> / <span>{mod.icon} {mod.title}</span> / <span>{lesson.title}</span>
            </div>

            <div className="lesson-header">
                <h1 className="lesson-title">{mod.icon} {lesson.title}</h1>
                <span className="lesson-id">Урок {lesson.id}</span>
                {alreadyCompleted && <span className="lesson-done-badge">✅ Пройден</span>}
            </div>

            <div className="lesson-content">
                {lesson.theory.map((block, i) => {
                    switch (block.type) {
                        case 'text':
                            return <div key={i} className="theory-text" dangerouslySetInnerHTML={{ __html: formatText(block.content) }} />;
                        case 'code':
                            return <CodeBlock key={i} code={block.content} language={block.language || 'python'} />;
                        case 'table':
                            return <div key={i}><p className="theory-text">{block.comment}</p><DataTable /></div>;
                        case 'chart':
                            return <InteractiveChart key={i} {...block.config} />;
                        case 'playground':
                            return <CodePlayground key={i} {...block.config} />;
                        default:
                            return null;
                    }
                })}
            </div>

            <div className="lesson-quiz-section">
                <h2 className="quiz-section-title">💡 Задание</h2>
                {lesson.quiz.type === 'choice' ? (
                    <QuizMultiChoice quiz={lesson.quiz} onComplete={handleQuizComplete} solved={alreadyCompleted || quizSolved} />
                ) : (
                    <QuizCodeInput quiz={lesson.quiz} onComplete={handleQuizComplete} solved={alreadyCompleted || quizSolved} />
                )}
            </div>

            <div className="lesson-navigation">
                {prevLesson ? (
                    <Link to={`/lesson/${prevLesson.id}`} className="btn btn-secondary">← Назад</Link>
                ) : <div />}
                {nextLesson ? (
                    <button
                        className={`btn btn-primary ${!canGoNext ? 'btn-locked' : ''}`}
                        onClick={() => canGoNext && navigate(`/lesson/${nextLesson.id}`)}
                        disabled={!canGoNext}
                        title={!canGoNext ? 'Ответь правильно, чтобы продолжить' : ''}
                    >
                        Далее →
                    </button>
                ) : (
                    <Link to="/achievements" className="btn btn-gold">🏆 Ачивки</Link>
                )}
            </div>
        </div>
    );
}

function formatText(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br/>')
        .replace(/• /g, '&bull; ');
}
