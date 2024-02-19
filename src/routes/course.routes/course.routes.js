const express = require("express");
const { courseControllers } = require("../../controllers");

const courseRoute = express.Router();

courseRoute.get("/all-courses", courseControllers.getCourses);
courseRoute.get("/:courseId", courseControllers.getSingleCourse);
courseRoute.post("/add-course", courseControllers.addCourse);
courseRoute.put("/update-course/:courseId", courseControllers.updateCourse);
courseRoute.delete("/delete-course/:courseId", courseControllers.deleteCourse);

module.exports = courseRoute;
