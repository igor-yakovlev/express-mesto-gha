const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const card = require('../models/card');

const getCard = async (req, res, next) => {
  try {
    const data = await card.find();
    res.send(data);
  } catch (e) {
    next(e);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const data = await card.create({ name, link, owner: req.user._id });
    res.status(201).send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(e.message));
      return;
    }
    next(e);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const currentCard = await card.findById(req.params.cardId);
    if (req.user._id !== currentCard.owner.toString()) {
      throw new ForbiddenError('Отказано в доступе');
    }
    const data = await card.findByIdAndRemove(req.params.cardId);
    if (!data) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.send({ data });
  } catch (e) {
    if (e.name === 'TypeError') {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
      return;
    }
    if (e.name === 'CastError') {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
      return;
    }
    next(e);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const data = await card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!data) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      return;
    }
    if (e.name === 'CastError') {
      next(new NotFoundError('Передан несуществующий _id карточки'));
      return;
    }
    next(e);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const data = await card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!data) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные для снятия лайка'));
      return;
    }
    if (e.name === 'CastError') {
      next(new NotFoundError('Передан несуществующий _id карточки'));
      return;
    }
    if (e.name === 'TypeError') {
      next(new NotFoundError('Передан несуществующий _id карточки'));
      return;
    }
    next(e);
  }
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
