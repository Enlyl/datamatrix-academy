// Сквозной датасет cyber_games — используется во всех модулях
export const cyberGamesData = [
    { game_id: 1, title: "Cyber Samurai", genre: "RPG", platform: "PC", release_year: 2023, developer: "NeonForge", rating: "M", sales_mln: 15.2, price: 59.99, players_k: 2500, review_score: 8.7, has_multiplayer: true },
    { game_id: 2, title: "Pixel Racer X", genre: "Racing", platform: "Console", release_year: 2022, developer: "RetroWave", rating: "E", sales_mln: 8.4, price: 39.99, players_k: 1800, review_score: 7.2, has_multiplayer: true },
    { game_id: 3, title: "Shadow Protocol", genre: "Stealth", platform: "PC", release_year: 2024, developer: "DarkByte", rating: "M", sales_mln: 22.1, price: 49.99, players_k: 3200, review_score: 9.1, has_multiplayer: false },
    { game_id: 4, title: "Galaxy Trader", genre: "Strategy", platform: "Mobile", release_year: 2021, developer: "StarCode", rating: "E10+", sales_mln: 5.7, price: 0.00, players_k: 4500, review_score: 6.8, has_multiplayer: true },
    { game_id: 5, title: "Neural Drift", genre: "Shooter", platform: "PC", release_year: 2023, developer: "SynthLab", rating: "M", sales_mln: 18.9, price: 59.99, players_k: 2100, review_score: 8.3, has_multiplayer: true },
    { game_id: 6, title: "Dungeon Bits", genre: "RPG", platform: "Console", release_year: 2022, developer: "NeonForge", rating: "T", sales_mln: 12.6, price: 49.99, players_k: 1900, review_score: 8.0, has_multiplayer: false },
    { game_id: 7, title: "Turbo Hack", genre: "Racing", platform: "PC", release_year: 2024, developer: "RetroWave", rating: "E", sales_mln: 6.3, price: 29.99, players_k: 1200, review_score: 7.5, has_multiplayer: true },
    { game_id: 8, title: "Void Collapse", genre: "Shooter", platform: "Console", release_year: 2023, developer: "DarkByte", rating: "M", sales_mln: 20.5, price: 59.99, players_k: 2800, review_score: 8.9, has_multiplayer: true },
    { game_id: 9, title: "Code Warriors", genre: "Strategy", platform: "PC", release_year: 2021, developer: "SynthLab", rating: "T", sales_mln: 9.8, price: 44.99, players_k: 1500, review_score: 7.8, has_multiplayer: true },
    { game_id: 10, title: "Neon Streets", genre: "RPG", platform: "PC", release_year: 2024, developer: "NeonForge", rating: "M", sales_mln: 25.3, price: 69.99, players_k: 3800, review_score: 9.4, has_multiplayer: true },
    { game_id: 11, title: "Star Cipher", genre: "Stealth", platform: "Mobile", release_year: 2022, developer: "StarCode", rating: "T", sales_mln: 3.2, price: 9.99, players_k: 2200, review_score: 6.5, has_multiplayer: false },
    { game_id: 12, title: "Quantum Arena", genre: "Shooter", platform: "PC", release_year: 2023, developer: "SynthLab", rating: "M", sales_mln: 16.7, price: 49.99, players_k: 2600, review_score: 8.1, has_multiplayer: true },
    { game_id: 13, title: "Retro Siege", genre: "Strategy", platform: "Console", release_year: 2024, developer: "RetroWave", rating: "E10+", sales_mln: 7.1, price: 39.99, players_k: 1100, review_score: 7.0, has_multiplayer: true },
    { game_id: 14, title: "Binary Forest", genre: "RPG", platform: "PC", release_year: 2022, developer: "DarkByte", rating: "T", sales_mln: 11.4, price: 44.99, players_k: 1700, review_score: 7.9, has_multiplayer: false },
    { game_id: 15, title: "Mech Overdrive", genre: "Racing", platform: "Console", release_year: 2023, developer: "NeonForge", rating: "E", sales_mln: 10.2, price: 49.99, players_k: 2000, review_score: 8.4, has_multiplayer: true },
    { game_id: 16, title: "Data Heist", genre: "Stealth", platform: "PC", release_year: 2024, developer: "SynthLab", rating: "M", sales_mln: 19.8, price: 59.99, players_k: 2900, review_score: 9.0, has_multiplayer: false },
    { game_id: 17, title: "Pixel Legends", genre: "RPG", platform: "Mobile", release_year: 2021, developer: "StarCode", rating: "E", sales_mln: 4.5, price: 0.00, players_k: 5200, review_score: 7.1, has_multiplayer: true },
    { game_id: 18, title: "Crypto Runner", genre: "Racing", platform: "PC", release_year: 2023, developer: "DarkByte", rating: "T", sales_mln: 8.9, price: 34.99, players_k: 1400, review_score: 7.6, has_multiplayer: false },
    { game_id: 19, title: "Neural Nexus", genre: "Strategy", platform: "PC", release_year: 2024, developer: "NeonForge", rating: "T", sales_mln: 14.3, price: 54.99, players_k: 2300, review_score: 8.5, has_multiplayer: true },
    { game_id: 20, title: "Glitch Storm", genre: "Shooter", platform: "Console", release_year: 2022, developer: "RetroWave", rating: "M", sales_mln: 13.8, price: 49.99, players_k: 2400, review_score: 8.2, has_multiplayer: true },
];

// Описания столбцов для обучения
export const columnDescriptions = {
    game_id: { ru: "Уникальный ID игры", type: "int" },
    title: { ru: "Название игры", type: "string" },
    genre: { ru: "Жанр", type: "categorical" },
    platform: { ru: "Платформа", type: "categorical" },
    release_year: { ru: "Год выпуска", type: "int" },
    developer: { ru: "Разработчик", type: "categorical" },
    rating: { ru: "Возрастной рейтинг (ESRB)", type: "categorical" },
    sales_mln: { ru: "Продажи (млн копий)", type: "float" },
    price: { ru: "Цена ($)", type: "float" },
    players_k: { ru: "Кол-во игроков (тыс.)", type: "int" },
    review_score: { ru: "Оценка критиков (0-10)", type: "float" },
    has_multiplayer: { ru: "Есть мультиплеер", type: "boolean" },
};
