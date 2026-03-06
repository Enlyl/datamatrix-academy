const fs = require('fs');
let file = fs.readFileSync('src/data/lessons/module1.js', 'utf8');
const searchElement = 'print(f"Цена: \\\\${price: .2f\\n                }")  // Цена: $59.99` },';
const replacement = 'print(f"Цена: \\\\${price: .2f}")  # Цена: $59.99` },';

file = file.replace(searchElement, replacement);
fs.writeFileSync('src/data/lessons/module1.js', file);
console.log("Done");
