const card = require('../models/card');

const getCard = (req, res) => {
  card.find()
    .then((data) => res.send(data))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Отправлены некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((data) => res.send({ data }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

const likeCard = (req, res) => {
  card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((data) => res.send({ data }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

const dislikeCard = (req, res) => {
  console.log(req.user._id);
  card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((data) => res.send({ data }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
