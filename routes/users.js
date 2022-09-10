const { celebrate, Joi } = require('celebrate');
const express = require('express');
const { ObjectId } = require('mongoose').Types;
const auth = require('../middlewares/auth');

const {
  getUser,
  createUser,
  getUserById,
  updateUser,
  updateUserAvatar,
  getUserInfo,
  login,
} = require('../controllers/users');

const userRouter = express.Router();
userRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);
userRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(w{3})?[a-z0-9-]+\.[a-z0-9\S]{2,}/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), createUser);
userRouter.use(auth);
userRouter.get('/users/me', getUserInfo);
userRouter.get('/users', getUser);
userRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
  }),
}), getUserById);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/https?:\/\/(w{3})?[a-z0-9-]+\.[a-z0-9\S]{2,}/),
  }),
}), updateUserAvatar);

module.exports = userRouter;
