const card = require('../models/card');

const getCard = (req, res) => {
  card.find()
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then((data) => res.status(201).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Отправлены некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((data) => res.status(204).send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Карточка с указанным ${req.params.cardId}  не найдена` });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

const likeCard = (req, res) => {
  card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((data) => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Передан несуществующий ${req.params.cardId} карточки` });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

const dislikeCard = (req, res) => {
  card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((data) => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Передан несуществующий ${req.params.cardId} карточки` });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
