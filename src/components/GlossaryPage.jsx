import { useState } from 'react';
import { glossary } from '../data/glossary';

export default function GlossaryPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');

    const categories = ['all', ...new Set(glossary.map(g => g.category))];

    const filtered = glossary.filter(item => {
        const matchSearch = item.term.toLowerCase().includes(search.toLowerCase()) ||
            item.definition.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === 'all' || item.category === category;
        return matchSearch && matchCategory;
    });

    return (
        <div className="glossary-page">
            <h1 className="page-title">📖 Глоссарий Data Science</h1>
            <p className="page-subtitle">Ключевые термины, которые встречаются в реальных проектах</p>

            <div className="glossary-filters">
                <input
                    type="text"
                    className="search-input"
                    placeholder="🔍 Поиск термина..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${category === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat === 'all' ? 'Все' : cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="glossary-count">Найдено: {filtered.length}</div>

            <div className="glossary-list">
                {filtered.map((item, i) => (
                    <div key={i} className="glossary-item">
                        <div className="glossary-item-header">
                            <h3 className="glossary-term">{item.term}</h3>
                            <span className="glossary-category">{item.category}</span>
                        </div>
                        <p className="glossary-definition">{item.definition}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
