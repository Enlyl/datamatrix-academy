import { useEffect, useRef } from 'react';

export default function CodeBlock({ code, language = 'python' }) {
    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current && window.Prism) {
            window.Prism.highlightElement(codeRef.current);
        }
    }, [code]);

    return (
        <div className="code-block">
            <div className="code-block-header">
                <span className="code-lang">{language}</span>
                <button
                    className="code-copy-btn"
                    onClick={() => navigator.clipboard?.writeText(code)}
                    title="Копировать"
                >📋</button>
            </div>
            <pre className={`language-${language}`}>
                <code ref={codeRef} className={`language-${language}`}>
                    {code}
                </code>
            </pre>
        </div>
    );
}
