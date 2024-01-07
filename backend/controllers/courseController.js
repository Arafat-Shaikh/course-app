const { Course } = require("../models/course");
const cloudinary = require("cloudinary").v2;

exports.getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      return res.status(401).json({ error: "courses not found" });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.log("error in courses " + error.message);
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { name, level, description, imageUrl } = req.body;

    if (!name || !level || !description || !imageUrl) {
      return res.status(401).json({ error: "all input fields are required" });
    }

    const imgInfo = await cloudinary.uploader.upload(imageUrl);
    let img = imgInfo.secure_url;
    const newCourse = new Course({
      name: name,
      level: level,
      description: description,
      imageUrl: img,
    });

    const doc = await newCourse.save();

    res.status(201).json(doc);
  } catch (error) {
    console.log("error in adding course " + error.message);
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(401).json({ error: "document not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.log("error in getCourseById " + error.message);
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { course, name, date } = req.body;

    const lecturesAssignedCourseWithName = await Course.find({
      lectures: {
        $elemMatch: { name: name },
      },
    });

    let alreadyAssigned = false;

    outerLoop: for (const item of lecturesAssignedCourseWithName) {
      for (const lect of item.lectures) {
        if (lect.date === date) {
          alreadyAssigned = true;
          break outerLoop;
        }
      }
    }

    if (alreadyAssigned) {
      return res
        .status(401)
        .json({ error: "instructor is already assigned for that date" });
    }

    const newCourse = await Course.findByIdAndUpdate(course._id, course, {
      new: true,
    });

    res.status(401).json(newCourse);
  } catch (error) {
    console.log("error in update course " + error.message);
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.usersLecturesCourse = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const lecturesAssignedCourseWithName = await Course.find({
      lectures: {
        $elemMatch: { name: id },
      },
    });

    let lectures = [];

    lecturesAssignedCourseWithName.forEach((item) => {
      item.lectures.forEach((lect) => {
        if (lect.name == id) {
          lectures.push(lect);
        }
      });
    });

    console.log(lectures);
    res.status(200).json(lectures);
  } catch (error) {
    console.log("error in usersLecturesCourse " + error.message);
    res.status(500).json({ error: "something went wrong" });
  }
};
