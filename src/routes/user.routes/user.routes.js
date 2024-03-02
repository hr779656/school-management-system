const express = require('express');
const { userControllers } = require('../../controllers');
// const { protectRoutes } = require('../../middlewares/index');

const userRoute = express.Router();

userRoute.get('/get-users', userControllers.getUsers);
userRoute.put('/:userId', userControllers.updateUserController);
userRoute.delete('/:userId', userControllers.deleteUser);
userRoute.post('/add-user', userControllers.addUserController);
userRoute.post('/login-user', userControllers.loginUserController);
userRoute.post('/course-progress', userControllers.userCourseProgres)

module.exports = userRoute;
