const { prisma } = require('../../DB/dbConfig');
const asyncHandler = require('../../utils/asyncHandler');
const { ErrorHandler } = require('../../utils/errorhandler');
const { sendCookieToken } = require('../authControllers');

const addUserController = asyncHandler(async (req, res, next) => {
  const {
    name, password, email, age, role,
  } = req.body;
  if (name && password && email && age && role === '') {
    return next(new ErrorHandler('Please fill all required fields', 400));
  }
  const userExist = await prisma.users.findFirst({ where: { email } });
  if (userExist) {
    next(new ErrorHandler('User already exists', 409));
  }

  const addUserDB = await prisma.users.create({
    data: {
      name, password, email, age, role,
    },
  });
  if (!addUserDB) {
    return next(new ErrorHandler('user already exist', 400));
  }
  return res.status(200).json({ message: 'user added successfully' });
});

// eslint-disable-next-line consistent-return
const loginUserController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.users.findFirst({ where: { email } });
  if (!user) {
    return next(new ErrorHandler('User doesn\'t exist', 404));
  }

  // const userExist = await user.comparePassword(password, user.password);

  if (user.password !== password) {
    return next(new ErrorHandler('Email or password is incorrect', 401));
  }
  // if (!userExist) {
  //   return next(new ErrorHandler('Email or password is incorrect', 401));
  // }

  sendCookieToken(user, 200, req, res);
});

module.exports = { addUserController, loginUserController };
