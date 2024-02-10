const express = require("express");
const { addVideoController } = require("../../controllers/videoControllers");

const videoRoute = express.Router();

videoRoute.get("/add-video", addVideoController);

module.exports = videoRoute;
