const express = require('express');
const multer = require('multer');
const { videoControllers } = require('../../controllers');
const { protectVideo } = require('../../middlewares');

const upload = multer();

const videoRoute = express.Router();

videoRoute.get('/:videoId', protectVideo, videoControllers.viewVideoController);
videoRoute.get('/videos', videoControllers.viewVideoController);
videoRoute.post('/upload-video', upload.any(), videoControllers.uploadVideoController);
videoRoute.delete('/delete-video', videoControllers.deleteVideoController);

module.exports = videoRoute;
