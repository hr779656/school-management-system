// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const { environmentVariables } = require('../../config');

const signToken = async (id) => jwt.sign({ id }, environmentVariables.SECRET_KEY, {
  expiresIn: '1h',
});

const sendCookieToken = async (user, statusCode, req, res) => {
  const token = await signToken(user.id);
  const {
    id, name, email, role,
  } = user;

  const cookieOptions = {
    httpOnly: true,
    // sameSite: 'strict',
    // maxAge: process.env.JWT_MAX_AGE * 60 * 1000,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'http',
  };
  res.cookie('token', token, cookieOptions);
  res.status(statusCode).json({
    status: 'success',
    token,
    id,
    name,
    role,
    email,
  });
};

module.exports = {
  sendCookieToken,
};
