import { useState } from 'react';

export default function QuizMultiChoice({ quiz, onComplete, solved }) {
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const handleSubmit = () => {
        setShowResult(true);
        if (selected === quiz.correct) {
            onComplete();
        }
    };

    const isCorrect = selected === quiz.correct;

    return (
        <div className={`quiz-card ${solved ? 'quiz-solved' : ''}`}>
            <p className="quiz-question">{quiz.question}</p>
            <div className="quiz-options">
                {quiz.options.map((option, i) => (
                    <button
                        key={i}
                        className={`quiz-option ${selected === i ? 'selected' : ''} 
              ${showResult && i === quiz.correct ? 'correct' : ''}
              ${showResult && selected === i && !isCorrect ? 'wrong' : ''}
              ${solved ? 'disabled' : ''}`}
                        onClick={() => { if (!showResult && !solved) setSelected(i); }}
                        disabled={solved}
                    >
                        <span className="option-letter">{'ABCD'[i]}</span>
                        {option}
                    </button>
                ))}
            </div>
            {!solved && (
                <div className="quiz-actions">
                    {!showResult ? (
                        <>
                            <button className="btn btn-primary" onClick={handleSubmit} disabled={selected === null}>
                                Проверить
                            </button>
                            <button className="btn btn-hint" onClick={() => setShowHint(true)}>💡 Подсказка</button>
                        </>
                    ) : isCorrect ? (
                        <div className="quiz-feedback correct">✅ Правильно! Отличная работа!</div>
                    ) : (
                        <div className="quiz-feedback-area">
                            <div className="quiz-feedback wrong">❌ Неправильно. Попробуй ещё раз!</div>
                            <button className="btn btn-secondary" onClick={() => { setShowResult(false); setSelected(null); }}>
                                🔄 Попробовать ещё
                            </button>
                        </div>
                    )}
                </div>
            )}
            {solved && <div className="quiz-feedback correct">✅ Задание выполнено!</div>}
            {showHint && <div className="quiz-hint">💡 {quiz.hint}</div>}
        </div>
    );
}
