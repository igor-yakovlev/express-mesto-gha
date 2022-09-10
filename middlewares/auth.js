const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token === undefined) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'secret-word');
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
