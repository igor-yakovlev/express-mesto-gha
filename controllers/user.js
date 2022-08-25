const user = require('../models/user');

const getUser = (req, res) => {
  user.find().then((data) => res.send(data));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar }).then((data) => res.send(data));
};

module.exports = {
  getUser,
  createUser,
};
