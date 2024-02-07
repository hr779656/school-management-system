const express = require('express');
const { userControllers } = require('../../controllers');
// const { protectedRoute } = require('../../middlewares/protectedRoute');

const userRoute = express.Router();

// userRoute.get('/get-users', protectedRoute, userControllers.getUsers);
// userRoute.delete('/:userId', protectedRoute, userControllers.deleteUser);
userRoute.post('/add-user', userControllers.addUserController);
userRoute.post('/login-user', userControllers.loginUserController);

module.exports = userRoute;
