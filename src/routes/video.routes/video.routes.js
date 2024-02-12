const express = require('express');
const { viewVideoController } = require('../../controllers/videoControllers');

const videoRoute = express.Router();

videoRoute.get('/view-video', viewVideoController);

module.exports = videoRoute;
