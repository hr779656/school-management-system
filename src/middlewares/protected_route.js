const { prisma } = require("../DB/dbConfig");
const { environmentVariables } = require("../config");
const asyncHandler = require("../utils/asyncHandler");
const { ErrorHandler } = require("../utils/errorhandler");
const JWT = require("jsonwebtoken");

const protectRoutes = asyncHandler(async (req, res, next) => {
  const token = req.headers.cookie;
  console.log(token);

  if (!token) {
    return next(new ErrorHandler("Unauthorized - No token provided", 401));
  }

  try {
    const decoded = JWT.verify(token, environmentVariables.SECRET_KEY);
    const admin = await prisma.users.findUnique({
      where: {
        id: decoded.id,
        role: "ADMIN",
      },
    });

    if (!admin) {
      return next(new ErrorHandler("Unauthorized - Admin not found", 401));
    }
    // res.json({ msg: "protect route done" });
    next();
  } catch (err) {
    return next(new ErrorHandler("Unauthorized - Invalid token", 401));
  }
});

module.exports = { protectRoutes };
