const JWT = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const { ErrorHandler } = require('../utils/errorhandler');
const { environmentVariables } = require('../config');
const { prisma } = require('../DB/dbConfig');

// eslint-disable-next-line consistent-return
const protectVideo = asyncHandler(async (req, res, next) => {
  const { token } = req.headers;
  const { videoId } = req.params;

  if (!token) {
    return next(new ErrorHandler('Unauthorized - No token provided', 401));
  }

  const decoded = JWT.verify(token, environmentVariables.SECRET_KEY);
  if (!decoded) {
    return next(new ErrorHandler('Unauthorized - Invalid token', 401));
  }

  // const videoAuth = await prisma.users.findFirst({
  //   where: { id: decoded.id },
  //   include: {
  //     courses: {
  //       select: {
  //         videos: {
  //           where: { videoAuthId: videoId },
  //         },
  //       },
  //     },
  //   },
  // });

  const user = await prisma.users.findFirst({
    where: { id: decoded.id },
    include: {
      courses: {
        select: {
          videos: {
            where: { id: Number(videoId) },
          },
        },
      },
    },
  });

  if (!user || !user.courses || user.courses.length === 0) {
    return next(new ErrorHandler('Unauthorized - You aren\'t Enrolled', 401));
  }

  const enrolledInCourse = user.courses.some((course) => course.videos.length > 0);

  if (!enrolledInCourse) {
    return next(new ErrorHandler('Unauthorized - You aren\'t Enrolled', 401));
  }

  next();
});

module.exports = { protectVideo };
