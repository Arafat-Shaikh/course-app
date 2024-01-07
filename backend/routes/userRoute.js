const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");

router
  .post("/signup", signupUser)
  .post("/login", loginUser)
  .get("/", getAllUsers);

exports.router = router;
