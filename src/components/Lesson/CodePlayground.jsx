import { useState } from 'react';
import CodeBlock from './CodeBlock';

export default function CodePlayground({ initialCode, expectedOutput, successMessage, hint }) {
    const [code, setCode] = useState(initialCode || '');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, running, success, error

    const runCode = () => {
        setStatus('running');
        setOutput('');

        setTimeout(() => {
            try {
                let stdout = [];
                let variables = {};
                const lines = code.split('\n');

                lines.forEach(line => {
                    const trimmed = line.trim();
                    if (!trimmed || trimmed.startsWith('#')) return;

                    // 1. Handle Assignment: var = value
                    if (trimmed.includes('=') && !trimmed.startsWith('print')) {
                        const [name, valEx] = trimmed.split('=').map(s => s.trim());
                        let value = valEx;

                        // Parse basic types
                        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                            value = value.slice(1, -1);
                        } else if (value === 'True') {
                            value = true;
                        } else if (value === 'False') {
                            value = false;
                        } else if (!isNaN(value)) {
                            value = Number(value);
                        }

                        variables[name] = value;
                    }

                    // 2. Handle print(...)
                    if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
                        let content = trimmed.slice(6, -1).trim();

                        // Handle f-strings: f"..."
                        if (content.startsWith('f"') || content.startsWith("f'")) {
                            let str = content.slice(2, -1);
                            // Simple {var} replacement
                            const matches = str.match(/\{([^}]+)\}/g);
                            if (matches) {
                                matches.forEach(m => {
                                    const varName = m.slice(1, -1).trim();
                                    str = str.replace(m, variables[varName] !== undefined ? variables[varName] : `[Error: ${varName} not defined]`);
                                });
                            }
                            stdout.push(str);
                        }
                        // Handle type(...)
                        else if (content.startsWith('type(') && content.endsWith(')')) {
                            const varName = content.slice(5, -1).trim();
                            const val = variables[varName];
                            if (val === undefined) {
                                stdout.push(`<class 'undefined'>`);
                            } else if (typeof val === 'string') {
                                stdout.push(`<class 'str'>`);
                            } else if (typeof val === 'number') {
                                if (Number.isInteger(val)) stdout.push(`<class 'int'>`);
                                else stdout.push(`<class 'float'>`);
                            } else if (typeof val === 'boolean') {
                                stdout.push(`<class 'bool'>`);
                            }
                        }
                        // Handle regular strings
                        else if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
                            stdout.push(content.slice(1, -1));
                        }
                        // Handle variables
                        else if (variables[content] !== undefined) {
                            stdout.push(String(variables[content]));
                        } else {
                            stdout.push(content);
                        }
                    }
                });

                const finalResult = stdout.join('\n') || '(Код выполнен, вывода нет)';
                setOutput(finalResult);

                // Validation: Check if ANY line of the output contains the expected string
                const lines_out = stdout.map(s => s.toLowerCase().trim());
                const isCorrect = !expectedOutput || lines_out.some(line => line.includes(expectedOutput.toLowerCase().trim()));

                if (isCorrect && expectedOutput) {
                    setStatus('success');
                } else if (!expectedOutput) {
                    setStatus('idle');
                } else {
                    setStatus('error');
                }
            } catch (e) {
                setOutput(`Python Simulation Error: ${e.message}`);
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
