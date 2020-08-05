const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { postRoutes } = require("./routes/post");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error(`DB connected error ${err}`);
  });

mongoose.connection.on("error", (err) =>
  console.error(`DB connection error ${err}`)
);

const app = express();

// logging middleware
app.use(morgan("dev"));

app.get("/", postRoutes);

const port = process.env.PORT || 8080;
const origin = process.env.ORIGIN || "http://localhost:";
app.listen(port, () => console.log(`Listening on port ${origin}${port}`));

// Scenario creating RESTful service to post heartbeats for server monitoring and provideRESTFul interface for getting the data.
