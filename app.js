const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { ERROR_NOT_FOUND, ERROR_SERVER } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(userRouter);
app.use(cardRouter);
app.use('*', (req, res, next) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Такого запроса нет' });
  next();
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
