const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", userSchema);
