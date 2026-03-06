import { useState } from 'react';

function normalize(str) {
    return str.replace(/\s+/g, ' ')
        .replace(/\s*=\s*/g, '=')
        .replace(/\s*\(\s*/g, '(')
        .replace(/\s*\)\s*/g, ')')
        .replace(/'/g, '"')
        .trim()
        .toLowerCase();
}

export default function QuizCodeInput({ quiz, onComplete, solved }) {
    const [code, setCode] = useState(quiz.setup ? quiz.setup + '\n\n' : '');
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const handleCheck = () => {
        // Extract only user-written lines (after setup)
        const setupLines = quiz.setup ? quiz.setup.split('\n').length : 0;
        const userCode = code.split('\n').slice(setupLines).join('\n').trim();
        const normalizedUser = normalize(userCode);

        const correct = quiz.answer.some(ans => {
            const normalizedAns = normalize(ans);
            return normalizedUser.includes(normalizedAns) || normalizedAns.includes(normalizedUser);
        });

        setIsCorrect(correct);
        setShowResult(true);

        // Check for Red Pill easter egg
        if (userCode.toLowerCase().includes('red pill')) {
            window.dispatchEvent(new CustomEvent('redpill'));
        }

        if (correct) onComplete();
    };

    return (
        <div className={`quiz-card quiz-code ${solved ? 'quiz-solved' : ''}`}>
            <p className="quiz-question">{quiz.question}</p>
            <div className="code-editor">
                <textarea
                    className="code-textarea"
                    value={code}
                    onChange={(e) => { if (!solved) setCode(e.target.value); }}
                    spellCheck={false}
                    rows={Math.max(6, code.split('\n').length + 2)}
                    disabled={solved}
                />
            </div>
            {!solved && (
                <div className="quiz-actions">
                    {!showResult || !isCorrect ? (
                        <>
                            <button className="btn btn-primary" onClick={handleCheck}>
                                ▶ Проверить код
                            </button>
                            <button className="btn btn-hint" onClick={() => setShowHint(true)}>💡 Подсказка</button>
                        </>
                    ) : null}
                    {showResult && isCorrect && (
                        <div className="quiz-feedback correct">✅ Код верный! Отлично!</div>
                    )}
                    {showResult && !isCorrect && (
                        <div className="quiz-feedback-area">
                            <div className="quiz-feedback wrong">❌ Не совсем... Проверь синтаксис и попробуй снова.</div>
                            <button className="btn btn-secondary" onClick={() => setShowResult(false)}>
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
