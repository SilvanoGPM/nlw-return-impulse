import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  return res.send('ok');
});

app.listen(3333, () => {
  console.log(`server running on http://localhost:3333`)
});
