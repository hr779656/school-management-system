const JWT = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const { ErrorHandler } = require('../utils/errorhandler');
const { environmentVariables } = require('../config');
const { prisma } = require('../DB/dbConfig');

// eslint-disable-next-line consistent-return
const protectVideo = asyncHandler(async (req, res, next) => {
  const token = req.headers.cookie;
  const { videoId } = req.params;

  if (!token) {
    return next(new ErrorHandler('Unauthorized - No token provided', 401));
  }

  const decoded = JWT.verify(token, environmentVariables.SECRET_KEY);
  if (!decoded) {
    return next(new ErrorHandler('Unauthorized - Invalid token', 401));
  }

  const enrolledCourses = await prisma.users.findFirst({
    where: { id: decoded.id },
    include: { courses: { select: { videos: {where: {videoAuthId: videoId}}} } } },
  });

  const user = await prisma.users.findFirst({
    where: {
      id: decoded.id,

    },
  });

  next();
});
module.exports = { protectVideo };
