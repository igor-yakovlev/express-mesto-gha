const user = require('../models/user');

const getUser = (req, res) => {
  user.find().then((data) => res.send(data));
};

const getUserById = (req, res) => {
  user.findById(req.params.userId)
    .then((data) => res.send({ data }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((data) => res.send({ data }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getUser,
  getUserById,
  createUser,
};
