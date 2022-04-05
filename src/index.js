const express = require('express');
const { admin } = require('./firebase');
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

app.listen(9999, () => {
  console.log('Server listening on port 9999');
  console.log('http://localhost:9999');
});
