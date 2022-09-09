const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const {
  ERROR_SERVER,
  ERROR_BAD_REQ,
  ERROR_NOT_FOUND,
  ERROR_UNAUTHORIZED,
} = require('../utils/constants');

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
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await user.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    res.status(201).send({ data });
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(ERROR_BAD_REQ).send({ message: e.message });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await user.findOne({ email }).orFail(() => res.status(ERROR_UNAUTHORIZED).send({ message: 'Неправильные почта или пароль' }));
    const comparePasswords = await bcrypt.compare(password, data.password);
    if (comparePasswords) {
      const token = jwt.sign({ _id: data._id }, 'secret-word', {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 360000,
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).send({ _id: data._id });
    } else {
      res.status(ERROR_UNAUTHORIZED).send({ message: 'Неправильные почта или пароль' });
    }
  } catch (e) {
    res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
  }
};

const getUserInfo = async (req, res) => {
  try {
    console.log(req.user);
    const data = await user.findById(req.user._id);
    res.status(200).send({ data });
  } catch (error) {
    res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
  };
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
  getUserInfo,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
