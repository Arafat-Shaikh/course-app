const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    name: { type: String },
    level: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    lectures: [
      {
        instructorId: { type: String, required: true },
        date: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

exports.Course = mongoose.model("Course", courseSchema);
