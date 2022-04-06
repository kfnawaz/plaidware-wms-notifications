const express = require('express');
const { API_PORT } = require('./config/env');
const { sendToOne } = require('./firebase/fcm');

const app = express();

app.use(express.json());

app.post('/send', (req, res) => {
  const { token, title, body, type } = req.body;
  sendToOne(token, title, body, type);
  res.send({ success: true, data: 'message sent' });
});

app.get('/', (_req, res) => {
  res.send({ success: true, data: 'Hey there' });
});

app.listen(API_PORT, () => {
  console.log(`Server listening on port ${API_PORT}`);
  console.log(`http://localhost:${API_PORT}`);
});
