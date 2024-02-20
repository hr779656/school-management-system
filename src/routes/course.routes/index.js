const express = require('express');
const courseRoute = require('./course.routes');

const courseRoutes = express.Router();

courseRoutes.use(courseRoute);
courseRoutes.use('*', (req, res) => {
  res.status(404).send('Route Not Found');
});

module.exports = courseRoutes;
