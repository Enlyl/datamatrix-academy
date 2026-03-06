import { useState } from 'react';
import CodeBlock from './CodeBlock';

export default function CodePlayground({ initialCode, expectedOutput, successMessage, hint }) {
    const [code, setCode] = useState(initialCode || '');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, running, success, error

    const runCode = () => {
        setStatus('running');
        setOutput('');

        // Simulation of Python execution
        setTimeout(() => {
            try {
                // Very basic simulation for educational purposes
                let result = '';
                if (code.includes('print(')) {
                    // Extract content of print()
                    const matches = code.match(/print\(([^)]+)\)/g);
                    if (matches) {
                        result = matches.map(m => {
                            let content = m.slice(6, -1);
                            if (content.startsWith('"') || content.startsWith("'")) {
                                return content.slice(1, -1);
                            }
                            return `[Value of ${content}]`;
                        }).join('\n');
                    }
                } else {
                    result = '(Код выполнен, но ничего не выведено. Используй print())';
                }

                setOutput(result);

                if (expectedOutput && result.toLowerCase().includes(expectedOutput.toLowerCase())) {
                    setStatus('success');
                } else if (!expectedOutput) {
                    setStatus('idle');
                } else {
                    setStatus('error');
                }
            } catch (e) {
                setOutput(`Error: ${e.message}`);
                setStatus('error');
            }
        }, 800);
    };

    return (
        <div className={`code-playground ${status}`}>
            <div className="playground-header">
                <span className="playground-title">🧪 Интерактивная песочница</span>
                <span className="playground-badge">Python Simulator</span>
            </div>

            <div className="playground-body">
                <div className="playground-editor">
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="# Напиши свой код здесь..."
                        spellCheck="false"
                    />
                    <button className="run-btn" onClick={runCode} disabled={status === 'running'}>
                        {status === 'running' ? '⏳ Запуск...' : '▶ Запустить код'}
                    </button>
                </div>

                <div className="playground-output">
                    <div className="output-label">Результат (Console):</div>
                    <pre className="output-content">
                        {output || (status === 'running' ? '...' : '> ')}
                    </pre>
                </div>
            </div>

            {status === 'success' && (
                <div className="playground-feedback success">
                    🌟 {successMessage || 'Отлично! Код работает верно.'}
                </div>
            )}

            {status === 'error' && expectedOutput && (
                <div className="playground-feedback error">
                    ❌ Почти! Попробуй еще раз. {hint && `Подсказка: ${hint}`}
                </div>
            )}
        </div>
    );
}
