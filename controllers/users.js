const user = require('../models/user');

const getUser = async (req, res) => {
  try {
    const data = await user.find();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const getUserById = async (req, res) => {
  try {
    const data = await user.findById(req.params.userId).orFail(() => res.status(404).send({ message: `Пользователь с таким _id ${req.params.userId} не найден` }));
    res.status(200).send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(400).send({ message: 'Отправлены некорректные данные' });
    } else if (e.name === 'CastError') {
      res.status(400).send({ message: `Пользователь по указанному ${req.params.userId} не найден` });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const data = await user.create({ name, about, avatar });
    res.status(201).send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(400).send({ message: 'Отправлены некорректные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const data = await user.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.status(200).send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(400).send({ message: 'Отправлены некорректные данные' });
    } else if (e.name === 'ErrorCaptureStackTrace') {
      res.status(400).send({ message: 'Отправлены некорректные данные' });
    } else if (e.name === 'CastError') {
      res.status(404).send({ message: `Пользователь по указанному ${req.user._id} не найден` });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const data = await user.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
    res.status(200).send(data);
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(400).send({ message: 'Отправлены некорректные данные' });
    } else if (e.name === 'CastError') {
      res.status(404).send({ message: `Пользователь по указанному ${req.user._id} не найден` });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
