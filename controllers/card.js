const card = require('../models/card');

const getCard = (req, res) => {
  card.find().then((data) => res.send(data));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then((data) => res.send({ data }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((data) => res.send({ data }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
};
