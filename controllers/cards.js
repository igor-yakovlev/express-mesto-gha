const card = require('../models/card');

const getCard = async (req, res) => {
  try {
    const data = await card.find();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const data = await card.create({ name, link, owner: req.user._id });
    res.status(201).send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') res.status(400).send({ message: 'Отправлены некорректные данные' });
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const data = await card.findByIdAndRemove(req.params.cardId).orFail(() => res.status(404).send({ message: `Карточки с таким _id ${req.params.cardId} не найдено` }));
    res.status(200).send({ data });
  } catch (e) {
    if (e.name === 'CastError') res.status(400).send({ message: `Карточка с указанным ${req.params.cardId}  не найдена` });
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const likeCard = async (req, res) => {
  try {
    const data = await card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => res.status(404).send({ message: `Карточки с таким _id ${req.params.cardId} не найдено` }));
    res.status(200).send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
    if (e.name === 'CastError') res.status(400).send({ message: `Передан несуществующий ${req.params.cardId} карточки` });
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const data = await card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(() => res.status(404).send({ message: `Карточки с таким _id ${req.params.cardId} не найдено` }));
    res.status(200).send({ data });
  } catch (e) {
    console.log(e);
    if (e.name === 'ValidationError') res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' });
    if (e.name === 'CastError') res.status(400).send({ message: `Передан несуществующий ${req.params.cardId} карточки` });
    if (e.name === 'TypeError') res.status(400).send({ message: `Передан несуществующий ${req.params.cardId} карточки` });
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
