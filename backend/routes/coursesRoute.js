const express = require("express");
const {
  addCourse,
  getAllCourse,
  getCourseById,
  updateCourse,
  usersLecturesCourse,
} = require("../controllers/courseController");
const router = express.Router();

router
  .post("/create", addCourse)
  .get("/", getAllCourse)
  .get("/detail/:id", getCourseById)
  .put("/update", updateCourse)
  .get("/lectures/:id", usersLecturesCourse);

exports.router = router;
