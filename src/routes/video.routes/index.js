const express = require("express");
const videoRoute = require("./video.routes");

const videoRoutes = express.Router();

videoRoutes.use(videoRoute);
videoRoutes.use("*", (req, res) => {
  res.status(404).send("Route Not Found");
});

module.exports = videoRoutes;
