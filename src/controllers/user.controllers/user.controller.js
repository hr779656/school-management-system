const bcrypt = require('bcrypt');
const { prisma } = require('../../DB/dbConfig');
const asyncHandler = require('../../utils/asyncHandler');
const { ErrorHandler } = require('../../utils/errorhandler');
const { sendCookieToken } = require('../authControllers');
const { promises } = require('nodemailer/lib/xoauth2');

const addUserController = asyncHandler(async (req, res, next) => {
  const {
    name, password, email, age, role, city, status,
  } = req.body;

  if (!name || !password || !email || !age || !role || !city || typeof status !== 'boolean') {
    return next(new ErrorHandler('Please fill all required fields', 400));
  }

  const userExist = await prisma.users.findFirst({ where: { email } });
  if (userExist) {
    return next(new ErrorHandler('User already exists', 409));
  }

  // Password Bcrypted
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!hashedPassword) {
    return next(new ErrorHandler('Error occured while hashing password', 409));
  }
  // Save user in the database
  const addUserDB = await prisma.users.create({
    data: {
      name,
      password: hashedPassword,
      email,
      age,
      role,
      city,
      status,

    },
  });

  if (!addUserDB) {
    return next(new ErrorHandler('User could not be added', 500));
  }

  return res.status(200).json({ message: 'User added successfully' });
});

// eslint-disable-next-line consistent-return
const loginUserController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.users.findFirst({ where: { email } });
  if (!user) {
    return next(new ErrorHandler('User doesn\'t exist', 404));
  }

  const userExist = await bcrypt.compare(password, user.password);

  if (!userExist) {
    return next(new ErrorHandler('Email or password is incorrect', 401));
  }

  sendCookieToken(user, 200, req, res);
});

const updateUserController = asyncHandler(async (req, res, next) => {
  const {
    userId,
  } = req.params;
  const {
    body,
  } = req;

  const userExist = await prisma.users.findFirst({ where: { id: Number(userId) } });

  if (!userExist) {
    return next(new ErrorHandler('User dosent  exists', 404));
  }

  // Save user in the database
  const addUserDB = await prisma.users.update({
    where: { id: Number(userId) },
    data: {
      ...body,
      courses: { connect: body.courses.map((courseId) => ({ id: Number(courseId) })) },

    },
  });

  if (!addUserDB) {
    return next(new ErrorHandler('Unable to update user', 500));
  }

  return res.status(200).json({ message: 'User updated successfully' });
});

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await prisma.users.findMany({
    include: { courses: { select: { title: true } } },
  });
  if (!users) {
    next(new ErrorHandler('No users found ', 400));
  }
  return res.status(200).json({ data: users });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await prisma.users.delete({ where: { id: Number(userId) } });
  if (!user) {
    next(new ErrorHandler('No user found ', 400));
  }
  return res.status(200).json({ message: 'User deleted successfully ' });
});



//  UserCourseProgress =======

const userCourseProgres = asyncHandler(async (req, res, next) => {
  const { userId, courseId, videosWatched, completed } = req.body

  if (!userId || !courseId || !videosWatched || !completed) {
    return next(new ErrorHandler("All fileds Are Required", 400))
  }

  const findusercourse = await prisma.users.findFirst({
    where: {
      id: Number(userId)
    },
    include: {
      courses: {
        select: {
          id: true
        }
      }
    }
  })

  if (findusercourse) {
    const a = findusercourse.courses.filter((item) => item.id === parseInt(courseId))

    if (a) {

      const C_Ufind = await prisma.userCourseProgress.findFirst({
        where: {
          userId: Number(userId),
          courseId: Number(courseId)
        }
      })

      if (!C_Ufind) {

        await prisma.userCourseProgress.create({
          data: {
            userId: Number(userId),
            courseId: Number(courseId),
            videosWatched: Number(videosWatched),
            completed
          }
        }).then((result) => {
          console.log(result)
          return res.status(200).json({ msg: 'userProgress saved successfully' })
        })
          .catch((err) => {
            console.log(err)
            return next(new ErrorHandler('something wrong userProgress Not saved', 400))
          })
      }

      if (C_Ufind.completed === true) {
        let increamentVideo = C_Ufind.videosWatched + parseInt(videosWatched);
        return increamentVideo;
      }

      await prisma.userCourseProgress.update({
        where: {
          userId,
          courseId
        },
        data: {
          videosWatched: Number(increamentVideo),
          completed
        }
      })

      return res.status(200).json({ msg: 'user Progress update' })

    } else {
      next(new ErrorHandler('Not Enrolled'))
    }
  } else {
    next(new ErrorHandler('User Not Found'))
  }

})

module.exports = {
  updateUserController,
  addUserController,
  loginUserController,
  getUsers,
  deleteUser,
  userCourseProgres
};
