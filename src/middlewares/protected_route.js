const JWT = require('jsonwebtoken');
const { prisma } = require('../DB/dbConfig');
const { environmentVariables } = require('../config');
const asyncHandler = require('../utils/asyncHandler');
const { ErrorHandler } = require('../utils/errorhandler');

// eslint-disable-next-line consistent-return
const protectRoutes = asyncHandler(async (req, res, next) => {
  const token = req.headers.cookie;

  if (!token) {
    return next(new ErrorHandler('Unauthorized - No token provided', 401));
  }

  const decoded = JWT.verify(token, environmentVariables.SECRET_KEY);
  if (!decoded) {
    return next(new ErrorHandler('Unauthorized - Invalid token', 401));
  }
  const admin = await prisma.users.findUnique({
    where: {
      id: decoded.id,
      role: 'ADMIN',
    },
  });

  if (!admin) {
    return next(new ErrorHandler('Unauthorized Acess!', 401));
  }

  next();
});

module.exports = { protectRoutes };
