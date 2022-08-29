const card = require('../models/card');
const { ERROR_SERVER, ERROR_BAD_REQ, ERROR_NOT_FOUND } = require('../utils/constants');

const getCard = async (req, res) => {
  try {
    const data = await card.find();
    res.send(data);
  } catch (e) {
    res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const data = await card.create({ name, link, owner: req.user._id });
    res.status(201).send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(ERROR_BAD_REQ).send({ message: e.message });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

const deleteCard = async (req, res) => {
  try {
    const data = await card.findByIdAndRemove(req.params.cardId).orFail(() => res.status(ERROR_NOT_FOUND).send({ message: `Карточки с таким _id ${req.params.cardId} не найдено` }));
    res.send({ data });
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(ERROR_BAD_REQ).send({ message: `Карточка с указанным ${req.params.cardId}  не найдена` });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const data = await card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => res.status(ERROR_NOT_FOUND).send({ message: `Карточки с таким _id ${req.params.cardId} не найдено` }));
    res.send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(ERROR_BAD_REQ).send({ message: 'Переданы некорректные данные для постановки лайка' });
    } else if (e.name === 'CastError') {
      res.status(ERROR_BAD_REQ).send({ message: `Передан несуществующий ${req.params.cardId} карточки` });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

const dislikeCard = async (req, res) => {
  try {
    const data = await card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(() => res.status(ERROR_NOT_FOUND).send({ message: `Карточки с таким _id ${req.params.cardId} не найдено` }));
    res.send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(ERROR_BAD_REQ).send({ message: 'Переданы некорректные данные для снятия лайка' });
    } else if (e.name === 'CastError') {
      res.status(ERROR_BAD_REQ).send({ message: `Передан несуществующий ${req.params.cardId} карточки` });
    } else if (e.name === 'TypeError') {
      res.status(ERROR_BAD_REQ).send({ message: `Передан несуществующий ${req.params.cardId} карточки` });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
