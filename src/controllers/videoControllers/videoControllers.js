const asyncHandler = require("../../utils/asyncHandler");

const addVideoController = asyncHandler(async (req, res, next) => {
  res.send("Add video Bro!");
});

module.exports = { addVideoController };
