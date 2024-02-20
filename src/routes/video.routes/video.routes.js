const express = require("express");
const { videoControllers } = require("../../controllers");

const videoRoute = express.Router();

videoRoute.get("/view-video/:videoId", videoControllers.viewVideoController);
videoRoute.post("/upload-video", videoControllers.uploadVideoController);
videoRoute.delete("/delete-video", videoControllers.deleteVideoController);

module.exports = videoRoute;
