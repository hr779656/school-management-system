const express = require("express");
const userRoutes = require("./user.routes");
const videoRoutes = require("./video.routes");
const courseRoutes = require("./course.routes");

const apiRoutes = express.Router();

apiRoutes.use("/user", userRoutes);
apiRoutes.use("/video", videoRoutes);
apiRoutes.use("/course", courseRoutes);

module.exports = apiRoutes;
