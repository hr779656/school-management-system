const { prisma } = require("../../DB/dbConfig");
const asyncHandler = require("../../utils/asyncHandler");
const { ErrorHandler } = require("../../utils/errorhandler");
const { sendCookieToken } = require("../authControllers");
const bcrypt = require("bcrypt");
const { environmentVariables } = require("../../config/index");

const addUserController = asyncHandler(async (req, res, next) => {
  const { name, password, email, age, role } = req.body;

  if (!name && !password && !email && !age && !role) {
    return next(new ErrorHandler("Please fill all required fields", 400));
  }

  const userExist = await prisma.users.findFirst({ where: { email } });
  if (userExist) {
    return next(new ErrorHandler("User already exists", 409));
  }

  // Password Bcrypted
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!hashedPassword) {
    return next(new ErrorHandler("Error occured while hashing password", 409));
  }
  // Save user in the database
  const addUserDB = await prisma.users.create({
    data: {
      name,
      password: hashedPassword,
      email,
      age,
      role,
    },
  });

  if (!addUserDB) {
    return next(new ErrorHandler("User could not be added", 500));
  }
  console.log(addUserDB);
  return res.status(200).json({ message: "User added successfully" });
});

const loginUserController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.users.findFirst({ where: { email } });
  if (!user) {
    return next(new ErrorHandler("User doesn't exist", 404));
  }

  const userExist = await bcrypt.compare(password, user.password);

  if (!userExist) {
    return next(new ErrorHandler("Email or password is incorrect", 401));
  }

  sendCookieToken(user, 200, req, res);
});

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await prisma.users.findMany();
  if (!users) {
    next(new ErrorHandler("No users found ", 400));
  }
  return res.status(200).json({ data: users });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await prisma.users.delete({ where: { id: Number(userId) } });
  if (!user) {
    next(new ErrorHandler("No user found ", 400));
  }
  return res.status(200).json({ message: "User deleted successfully " });
});

module.exports = {
  addUserController,
  loginUserController,
  getUsers,
  deleteUser,
};
