import { useState } from 'react';
import { cheatsheet } from '../data/cheatsheet';
import CodeBlock from './Lesson/CodeBlock';

export default function CheatSheetPage() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [search, setSearch] = useState('');

    const filteredContent = cheatsheet.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(search.toLowerCase())) ||
            (item.useCase && item.useCase.toLowerCase().includes(search.toLowerCase()))
        )
    })).filter(cat => cat.items.length > 0);

    return (
        <div className="cheatsheet-page">
            <h1 className="page-title">📋 Шпаргалка по коду</h1>
            <p className="page-subtitle">Быстрый справочник по основным командам и паттернам</p>

            <div className="cheatsheet-controls">
                <input
                    type="text"
                    className="search-input"
                    placeholder="🔍 Поиск по коду и описаниям..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="cheatsheet-tabs">
                    <button
                        className={`cheatsheet-tab ${search === '' && activeCategory === -1 ? 'active' : ''}`}
                        onClick={() => { setSearch(''); setActiveCategory(-1); }}
                    >
                        Все
                    </button>
                    {cheatsheet.map((cat, i) => (
                        <button
                            key={i}
                            className={`cheatsheet-tab ${search === '' && activeCategory === i ? 'active' : ''}`}
                            onClick={() => { setSearch(''); setActiveCategory(i); }}
                        >
                            {cat.category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="cheatsheet-content">
                {search !== '' ? (
                    // Show all matching results grouped by category when searching
                    filteredContent.map((cat, ci) => (
                        <div key={ci} className="cheatsheet-search-group">
                            <h2 className="cheatsheet-cat-title">{cat.category}</h2>
                            {cat.items.map((item, i) => (
                                <CheatSheetItem key={i} item={item} category={cat.category} />
                            ))}
                        </div>
                    ))
                ) : (
                    // Show only active category items when not searching
                    activeCategory === -1 ? (
                        cheatsheet.map((cat, ci) => (
                            <div key={ci} className="cheatsheet-search-group">
                                <h2 className="cheatsheet-cat-title">{cat.category}</h2>
                                {cat.items.map((item, i) => (
                                    <CheatSheetItem key={i} item={item} category={cat.category} />
                                ))}
                            </div>
                        ))
                    ) : (
                        cheatsheet[activeCategory].items.map((item, i) => (
                            <CheatSheetItem key={i} item={item} category={cheatsheet[activeCategory].category} />
                        ))
                    )
                )}
                {search !== '' && filteredContent.length === 0 && (
                    <div className="no-results">Ничего не найдено по запросу "{search}"</div>
                )}
            </div>
        </div>
    );
}

function CheatSheetItem({ item, category }) {
    return (
        <div className="cheatsheet-item">
            <h3 className="cheatsheet-item-title">{item.title}</h3>
            {item.description && (
                <p className="cheatsheet-item-desc"><strong>Что это:</strong> {item.description}</p>
            )}
            {item.useCase && (
                <p className="cheatsheet-item-use"><strong>Когда использовать:</strong> {item.useCase}</p>
            )}
            <CodeBlock code={item.code} language={category.includes('SQL') ? 'sql' : 'python'} />
        </div>
    );
}
