const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    name: { type: String },
    Level: { type: String, required: true, unique: true },
    Description: { type: String, required: true },
    ImageUrl: { type: String, required: true },
    lectures: [
      {
        instructorId: { type: String, required: true },
        date: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

exports.Course = mongoose.model("User", courseSchema);
