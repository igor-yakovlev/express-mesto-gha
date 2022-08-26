const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6307fa9f6a5754829bc5e837',
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
