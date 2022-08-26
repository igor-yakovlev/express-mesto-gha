const user = require('../models/user');

const getUser = (req, res) => {
  user.find()
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

const getUserById = (req, res) => {
  user.findById(req.params.userId)
    .then((data) => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Отправлены некорректные данные' });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Пользователь по указанному ${req.params.userId} не найден` });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((data) => res.status(201).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Отправлены некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  user.findByIdAndUpdate(req.user._id, { name, about })
    .then((data) => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Отправлены некорректные данные' });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Пользователь по указанному ${req.user._id} не найден` });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar })
    .then((data) => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Отправлены некорректные данные' });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Пользователь по указанному ${req.user._id} не найден` });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
