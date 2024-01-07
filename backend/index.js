const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const courseRouter = require("./routes/coursesRoute");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

const PORT = process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/user", userRouter.router);
app.use("/api/course", courseRouter.router);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
