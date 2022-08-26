const express = require('express');
const bodyParser = require('body-parser');
const { getCard, createCard, deleteCard } = require('../controllers/card');

const cardRouter = express.Router();

cardRouter.get('/cards', getCard);
cardRouter.post('/cards', bodyParser.json(), createCard);
cardRouter.delete('/cards/:cardId', deleteCard);

module.exports = cardRouter;
