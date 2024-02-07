const express = require('express');
const userRoute = require('./user.routes');

const userRoutes = express.Router();

userRoutes.use(userRoute);
userRoutes.use('*', (req, res) => { res.status(404).send('Route Not Found'); });

module.exports = userRoutes;
