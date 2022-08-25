const express = require('express');
const bodyParser = require('body-parser');
const { getUser, createUser } = require('../controllers/user');

const routes = express.Router();

routes.get('/users', getUser);
routes.post('/users', bodyParser.json(), createUser);

module.exports = {
  routes,
};
