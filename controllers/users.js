const user = require('../models/user');
const { ERROR_SERVER, ERROR_BAD_REQ, ERROR_NOT_FOUND } = require('../utils/constants');

const getUser = async (req, res) => {
  try {
    const data = await user.find();
    res.send(data);
  } catch (e) {
    res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
  }
};

const getUserById = async (req, res) => {
  try {
    const data = await user.findById(req.params.userId).orFail(() => res.status(ERROR_NOT_FOUND).send({ message: `Пользователь с таким _id ${req.params.userId} не найден` }));
    res.send({ data });
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(ERROR_BAD_REQ).send({ message: `Пользователь по указанному ${req.params.userId} не найден` });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
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
      res.status(ERROR_BAD_REQ).send({ message: e.message });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
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
    ).orFail(() => res.status(ERROR_NOT_FOUND).send({ message: `Пользователь с таким _id ${req.user._id} не найден` }));
    res.send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.log(e.message);
      res.status(ERROR_BAD_REQ).send({ message: e.message });
    } else if (e.name === 'CastError') {
      res.status(ERROR_NOT_FOUND).send({ message: `Пользователь по указанному ${req.user._id} не найден` });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const data = await user.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => res.status(ERROR_NOT_FOUND).send({ message: `Пользователь с таким _id ${req.user._id} не найден` }));
    res.send(data);
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(ERROR_BAD_REQ).send({ message: e.message });
    } else if (e.name === 'CastError') {
      res.status(ERROR_NOT_FOUND).send({ message: `Пользователь по указанному ${req.user._id} не найден` });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
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
