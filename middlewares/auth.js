const jwt = require('jsonwebtoken');
const { ERROR_UNAUTHORIZED } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'secret-word');
  } catch (e) {
    return res.status(ERROR_UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};

module.exports = auth;
