const express = require("express");
const {
  viewVideoController,
  uploadVideoController,
} = require("../../controllers/videoControllers");

const videoRoute = express.Router();

videoRoute.get("/view-video/:videoId", viewVideoController);
videoRoute.post("/upload-video", uploadVideoController);

module.exports = videoRoute;
