import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, ScatterChart, Scatter
} from 'recharts';
import { cyberGamesData } from '../../data/dataset';

export default function InteractiveChart({ type, xField, yField, title }) {
    const data = cyberGamesData;

    const renderChart = () => {
        switch (type) {
            case 'bar':
                return (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey={xField} stroke="var(--text-secondary)" fontSize={12} tick={{ fill: 'var(--text-secondary)' }} />
                        <YAxis stroke="var(--text-secondary)" fontSize={12} tick={{ fill: 'var(--text-secondary)' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--color-primary)', borderRadius: '8px' }}
                            itemStyle={{ color: 'var(--color-primary)' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Legend />
                        <Bar dataKey={yField} fill="var(--color-primary)" radius={[4, 4, 0, 0]} name={yField === 'sales_mln' ? 'Продажи (млн)' : yField} />
                    </BarChart>
                );
            case 'line':
                // Sort by release year for line chart
                const sortedData = [...data].sort((a, b) => a.release_year - b.release_year);
                return (
                    <LineChart data={sortedData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey={xField} stroke="var(--text-secondary)" fontSize={12} tick={{ fill: 'var(--text-secondary)' }} />
                        <YAxis stroke="var(--text-secondary)" fontSize={12} tick={{ fill: 'var(--text-secondary)' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--color-primary)', borderRadius: '8px' }}
                            itemStyle={{ color: 'var(--color-secondary)' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey={yField} stroke="var(--color-secondary)" strokeWidth={3} dot={{ fill: 'var(--color-secondary)', r: 4 }} activeDot={{ r: 6, stroke: 'var(--text-primary)', strokeWidth: 2 }} name={yField === 'sales_mln' ? 'Продажи (млн)' : yField} />
                    </LineChart>
                );
            case 'scatter':
                return (
                    <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis type="number" dataKey={xField} name="Оценка" stroke="var(--text-secondary)" fontSize={12} tick={{ fill: 'var(--text-secondary)' }} />
                        <YAxis type="number" dataKey={yField} name="Продажи" stroke="var(--text-secondary)" fontSize={12} tick={{ fill: 'var(--text-secondary)' }} />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3' }}
                            contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--color-primary)', borderRadius: '8px' }}
                        />
                        <Legend />
                        <Scatter name="Игры" data={data} fill="var(--color-accent)" />
                    </ScatterChart>
                );
            default:
                return null;
        }
    };

    return (
        <div className="interactive-chart-wrapper">
            <h4 className="chart-title">{title}</h4>
            <div style={{ width: '100%', height: 350, marginTop: '1.5rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            </div>
            <p className="chart-caption">Данные из cyber_games.json (интерактивная визуализация)</p>
        </div>
    );
}
