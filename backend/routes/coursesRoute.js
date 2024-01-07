const express = require("express");
const {
  addCourse,
  getAllCourse,
  getCourseById,
} = require("../controllers/courseController");
const router = express.Router();

router
  .post("/create", addCourse)
  .get("/", getAllCourse)
  .get("/detail/:id", getCourseById);

exports.router = router;
