const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const router = require("./routes/blogRoutes");
const Task = require("./models/blogSchema");
const blogRouter = require("./routes/blogRoutes");
const app = express();
app.use(express.json());

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, connection) => {
    if (err) {
      console.log(err);
      return console.log("Error in connecting to Database");
    }
    app.use("/blogs", blogRouter);

    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });

    //console.log(connection);

    //creating
    console.log("succesfully connected");
  }
);
