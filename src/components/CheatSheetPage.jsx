import { useState } from 'react';
import { cheatsheet } from '../data/cheatsheet';
import CodeBlock from './Lesson/CodeBlock';

export default function CheatSheetPage() {
    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <div className="cheatsheet-page">
            <h1 className="page-title">📋 Шпаргалка по коду</h1>
            <p className="page-subtitle">Быстрый справочник по основным командам и паттернам</p>

            <div className="cheatsheet-tabs">
                {cheatsheet.map((cat, i) => (
                    <button
                        key={i}
                        className={`cheatsheet-tab ${activeCategory === i ? 'active' : ''}`}
                        onClick={() => setActiveCategory(i)}
                    >
                        {cat.category}
                    </button>
                ))}
            </div>

            <div className="cheatsheet-content">
                {cheatsheet[activeCategory].items.map((item, i) => (
                    <div key={i} className="cheatsheet-item">
                        <h3 className="cheatsheet-item-title">{item.title}</h3>
                        {item.description && (
                            <p className="cheatsheet-item-desc"><strong>Что это:</strong> {item.description}</p>
                        )}
                        {item.useCase && (
                            <p className="cheatsheet-item-use"><strong>Когда использовать:</strong> {item.useCase}</p>
                        )}
                        <CodeBlock code={item.code} language={cheatsheet[activeCategory].category.includes('SQL') ? 'sql' : 'python'} />
                    </div>
                ))}
            </div>
        </div>
    );
}
