import { cyberGamesData, columnDescriptions } from '../../data/dataset';

export default function DataTable() {
    const columns = Object.keys(cyberGamesData[0]);
    const displayData = cyberGamesData.slice(0, 8); // Show first 8 rows

    return (
        <div className="data-table-wrapper">
            <div className="data-table-title">📊 cyber_games dataset (первые 8 из {cyberGamesData.length})</div>
            <div className="data-table-scroll">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map(col => (
                                <th key={col} title={columnDescriptions[col]?.ru || col}>
                                    {col}
                                    <span className="col-type">{columnDescriptions[col]?.type}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.map((row, i) => (
                            <tr key={i}>
                                {columns.map(col => (
                                    <td key={col} className={`cell-${typeof row[col]}`}>
                                        {typeof row[col] === 'boolean' ? (row[col] ? '✅' : '❌') : String(row[col])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="data-table-footer">... ещё {cyberGamesData.length - 8} строк</div>
        </div>
    );
}
