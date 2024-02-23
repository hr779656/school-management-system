const { prisma } = require('../../DB/dbConfig');
const asyncHandler = require('../../utils/asyncHandler');
const { ErrorHandler } = require('../../utils/errorhandler');

// getCourses Controller
const getCourses = asyncHandler(async (req, res, next) => {
  const courses = await prisma.courses.findMany({
    include: {
      _count: {
        select: {
          videos: true,
          users: true,
        },
      },
      users: { select: { name: true } },
      videos: {
        select: { title: true },

      },
    },
  });
  if (!courses || courses.length === 0) {
    return next(new ErrorHandler('No courses found ', 404));
  }
  // const coursesWithCount = courses.map((course) => (
  //   {
  //     ...course,
  //     totalEnrolled: course.enrolledStudents.length,
  //     totalVideos: course.videos.length,
  //   }
  // ));

  return res.status(200).json({ data: courses });
});

// getSingleCourse Controller
const getCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const course = await prisma.courses.findFirst({
    where: { id: Number(courseId) },
    include: { videos: true },
  });

  if (!course) {
    return next(new ErrorHandler('No course found ', 404));
  }
  return res.status(200).json({ data: course });
});

// addCourse Controller
const addCourse = asyncHandler(async (req, res, next) => {
  const {
    title, description, price, image,
  } = req.body;

  if (!title || !description || !price || !image) {
    return next(new ErrorHandler('Please fill all required fields', 400));
  }

  const courseExist = await prisma.courses.findFirst({ where: { title } });
  if (courseExist) {
    return next(new ErrorHandler('course already exists', 400));
  }

  const addCourseDB = await prisma.courses.create({
    data: {
      title,
      description,
      price,
      image,
    },
  });

  if (!addCourseDB) {
    return next(new ErrorHandler('Course could not be added', 500));
  }

  return res.status(200).json({ message: 'Course added successfully' });
});

// updateCourse Controller
const updateCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const {
    title, description, price, image,
  } = req.body;

  // if (!title && !description) {
  //   return next(new ErrorHandler('Please fill all required fields', 400));
  // }

  const courseExist = await prisma.courses.findFirst({
    where: { id: Number(courseId) },
  });
  if (!courseExist) {
    return next(new ErrorHandler('course not found', 409));
  }

  const updateCourseDB = await prisma.courses.update({
    where: {
      id: Number(courseId),
    },
    data: {
      title,
      description,
      price,
      image,
    },
  });

  if (!updateCourseDB) {
    return next(new ErrorHandler('Course could not be updated', 500));
  }

  return res.status(200).json({ message: 'Course updated successfully' });
});

// deleteCourse Controller
const deleteCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const course = await prisma.courses.delete({
    where: { id: Number(courseId) },
  });
  if (!course) {
    return next(new ErrorHandler('No course found ', 404));
  }
  return res.status(200).json({ message: 'Course deleted successfully ' });
});

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
