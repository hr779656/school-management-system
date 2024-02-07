const { body } = require('express-validator');

const validSchUserReg = [
  body('name').isLength({ min: 6, max: 10 }).withMessage('Username must be 6 and 10 char'),
  body('password').isLength({ min: 6, max: 6 }).withMessage('Password must be 6 char required'),
];

module.exports = validSchUserReg;
