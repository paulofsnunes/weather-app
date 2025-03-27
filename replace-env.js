// replace-env.js
const fs = require('fs');
const key = process.env.WEATHER_API_KEY;

if (key) {
  const envPath = './src/environments/environment.prod.ts';
  let content = fs.readFileSync(envPath, 'utf8');
  content = content.replace(/weatherApiKey: '.*?'/, `weatherApiKey: '${key}'`);
  fs.writeFileSync(envPath, content);
}