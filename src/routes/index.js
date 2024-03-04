const express = require('express');
const userRoutes = require('./user.routes');
const videoRoutes = require('./video.routes');
const courseRoutes = require('./course.routes');
const contactRoutes = require('./contact.routes');
const MD_Routes = require('./MD.routes');

const apiRoutes = express.Router();

apiRoutes.use('/user', userRoutes);
apiRoutes.use('/video', videoRoutes);
apiRoutes.use('/courses', courseRoutes);
apiRoutes.use('/contact', contactRoutes);
apiRoutes.use('/mtd', MD_Routes)

module.exports = apiRoutes;
