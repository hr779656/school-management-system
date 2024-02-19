const { prisma } = require("../../DB/dbConfig");
const asyncHandler = require("../../utils/asyncHandler");
const { ErrorHandler } = require("../../utils/errorhandler");

// getCourses Controller
const getCourses = asyncHandler(async (req, res, next) => {
  const courses = await prisma.courses.findMany();
  if (!courses) {
    next(new ErrorHandler("No courses found ", 400));
  }
  return res.status(200).json({ data: courses });
});

// getSingleCourse Controller
const getSingleCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const course = await prisma.courses.findFirst({
    where: { id: Number(courseId) },
  });
  if (!course) {
    next(new ErrorHandler("No course found ", 400));
  }
  return res.status(200).json({ data: course });
});

// addCourse Controller
const addCourse = asyncHandler(async (req, res, next) => {
  const { title, discription } = req.body;

  if (!title && !discription) {
    return next(new ErrorHandler("Please fill all required fields", 400));
  }

  const courseExist = await prisma.courses.findFirst({ where: { title } });
  if (courseExist) {
    return next(new ErrorHandler("course already exists", 409));
  }

  const addCourseDB = await prisma.courses.create({
    data: {
      title,
      discription,
    },
  });

  if (!addCourseDB) {
    return next(new ErrorHandler("Course could not be added", 500));
  }
  console.log(addCourseDB);
  return res.status(200).json({ message: "Course added successfully" });
});

// updateCourse Controller
const updateCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const { title, discription } = req.body;

  if (!title && !discription) {
    return next(new ErrorHandler("Please fill all required fields", 400));
  }

  const courseExist = await prisma.courses.findFirst({
    where: { id: Number(courseId) },
  });
  if (!courseExist) {
    return next(new ErrorHandler("course not found", 409));
  }

  const updateCourseDB = await prisma.courses.update({
    where: {
      id: Number(courseId),
    },
    data: {
      title,
      discription,
    },
  });

  if (!updateCourseDB) {
    return next(new ErrorHandler("Course could not be updated", 500));
  }
  console.log(updateCourseDB);
  return res.status(200).json({ message: "Course updated successfully" });
});

// deleteCourse Controller
const deleteCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const course = await prisma.courses.delete({
    where: { id: Number(courseId) },
  });
  if (!course) {
    next(new ErrorHandler("No course found ", 400));
  }
  return res.status(200).json({ message: "Course deleted successfully " });
});

module.exports = {
  getCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
