const express = require('express');
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

userRouter.post('/signin', login);
userRouter.post('/signup', createUser);
userRouter.use(auth);
userRouter.get('/users/me', getUserInfo);
userRouter.get('/users', getUser);
userRouter.get('/users/:userId', getUserById);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouter;
