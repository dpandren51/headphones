const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const filePath = path.join(__dirname, 'fundraiser.json');

app.get('/get', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json({ amount: data.amount });
  } catch {
    res.json({ amount: 0 });
  }
});

app.post('/donate', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const newAmount = Math.min(data.amount + req.body.amount, 200);
    fs.writeFileSync(filePath, JSON.stringify({ amount: newAmount }));
    res.json({ amount: newAmount });
  } catch {
    res.status(500).json({ error: 'Erro ao gravar a doação' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
