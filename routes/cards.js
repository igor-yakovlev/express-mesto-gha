const express = require('express');
const {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const cardRouter = express.Router();

cardRouter.get('/cards', getCard);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.put('/cards/:cardId/likes', likeCard);
cardRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRouter;
