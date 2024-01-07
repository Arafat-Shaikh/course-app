const { User } = require("../models/user");
const bcrypt = require("bcrypt");

exports.signupUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    console.log(typeof password);
    const user = await User.findOne({ $or: [{ email }, { name }] });
    if (user) {
      return res.status(404).json({ error: "User already exist" });
    }

    if (password.length < 6) {
      return res
        .status(401)
        .json({ error: "password should greater than 6 digits" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    let doc = await newUser.save();

    doc.password = null;

    res.status(200).json(doc);
  } catch (error) {
    console.log("error in signup user " + error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "input fields cannot be empty" });
    }

    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordCheck = await bcrypt.compare(password, user.password);

    if (!isPasswordCheck) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    user.password = null;

    res.status(200).json(user);
  } catch (error) {
    console.log("error in login user " + error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      return res.status(401).json("No users found");
    }

    const instructors = users.filter((u) => u.isAdmin !== true);
    console.log("instructors here " + instructors);
    res.status(200).json(instructors);
  } catch (error) {
    console.log("error getAll users " + error.message);
    res.status(500).json({ error: error.message });
  }
};
