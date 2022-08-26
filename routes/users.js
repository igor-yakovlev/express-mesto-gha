const express = require('express');
const bodyParser = require('body-parser');
const { getUser, createUser, getUserById } = require('../controllers/user');

const userRouter = express.Router();

userRouter.get('/users', getUser);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', bodyParser.json(), createUser);

module.exports = userRouter;
