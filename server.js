const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const db = require("./models");

const PORT = process.env.PORT || 3001

const app = express();

app.use(logger("dev"));

// Allows to parse the encoded From data

app.use(express.urlencoded({ extended: true }));

 // Automatically Parses JSON data for us
app.use(express.json());


app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/html-routes.js"));
app.use(require("./routes/api-routes.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
