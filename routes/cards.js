const express = require('express');
const { ObjectId } = require('mongoose').Types;
const { celebrate, Joi } = require('celebrate');
const {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const cardRouter = express.Router();

const cardIdValidation = Joi.string().required().custom((value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
});

cardRouter.get('/cards', getCard);
cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/(w{3})?[a-z0-9-]+\.[a-z0-9\S]{2,}/),
  }),
}), createCard);
cardRouter.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: cardIdValidation,
  }),
}), deleteCard);
cardRouter.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: cardIdValidation,
  }),
}), likeCard);
cardRouter.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: cardIdValidation,
  }),
}), dislikeCard);

module.exports = cardRouter;
