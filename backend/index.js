const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
