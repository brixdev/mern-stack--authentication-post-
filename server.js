require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./backend/config/database");
const app = express();
app.use(bodyParser.json());

const PORT = 5000;

mongoose.Promise = global.Promise;
mongoose.connect(config.dbDev, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Can not connect to the database" + err);
  }
);

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./backend/api")(app);

app.listen(PORT, function () {
  console.log(`Listening on Port ${PORT}`);
});
