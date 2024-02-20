const express = require("express");
const { userControllers } = require("../../controllers");
const { protectRoutes } = require("../../middlewares/index");

const userRoute = express.Router();

userRoute.get("/get-users", userControllers.getUsers);
userRoute.delete("/:userId", userControllers.deleteUser);
userRoute.post("/add-user", protectRoutes, userControllers.addUserController);
userRoute.post("/login-user", userControllers.loginUserController);

module.exports = userRoute;
