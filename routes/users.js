const express = require('express');
const {
  getUser,
  createUser,
  getUserById,
  updateUser,
  updateUserAvatar,
  login,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/users', getUser);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);
userRouter.post('/signin', login);

module.exports = userRouter;
