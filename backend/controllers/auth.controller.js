const express = require("express");
const argon2 = require("argon2");
const authController = express.Router();
const jwt = require("jsonwebtoken");

let User = require("../models/User");

authController.route("/sign-up").post(async (req, res) => {
  const body = req.body;
  console.log(body);

  try {
    body.password = await argon2.hash(body.password);
    const users = new User(body);
    users
      .save()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

authController.route("/sign-in").post(async (req, res) => {
  const body = req.body;
  const params = new User(body);
  const { username, password } = params;
  console.log(req);

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "User Not Exist",
      });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password !",
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "myaccesstoken",
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (error) {
    res.status(400).json({
      message: "error",
    });
  }
});

module.exports = authController;
