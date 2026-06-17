const express = require('express');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando!', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.get('/info', (req, res) => {
  res.json({ app: 'devops-u4', env: process.env.NODE_ENV || 'development' });
});

if (process.env.HC_URL) {
  setInterval(() => {
    https.get(process.env.HC_URL).on('error', (err) => {
      console.error('Erro no ping Healthchecks:', err.message);
    });
  }, 5 * 60 * 1000);
  https.get(process.env.HC_URL);
}

if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
