const express = require('express');
const bodyParser = require('body-parser');
const {
  getUser,
  createUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/users', getUser);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', bodyParser.json(), createUser);
userRouter.patch('/users/me', bodyParser.json(), updateUser);
userRouter.patch('/users/me/avatar', bodyParser.json(), updateUserAvatar);

module.exports = userRouter;
