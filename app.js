const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes/user');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
