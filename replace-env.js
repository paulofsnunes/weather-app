// replace-env.js
const fs = require('fs');
const key = process.env.WEATHER_API_KEY || '383be21d0c4e49b58b9232316252603'; // Fallback para desenvolvimento

const envPath = './src/environments/environment.prod.ts';
let content = fs.readFileSync(envPath, 'utf8');

content = content.replace(
  /weatherApiKey: '.*?'/, 
  `weatherApiKey: '${key}'`
);

fs.writeFileSync(envPath, content);
console.log('✅ Chave da API substituída com sucesso');