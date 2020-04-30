require("./middlewares/TokenMiddleware");

const authController = require("./controllers/auth.controller");
const postController = require("./controllers/post.controller");

module.exports = function (app) {
  app.use("/auth", authController);
  app.use("/posts", tokenMiddleware(), postController);
  app.use("/", (req, res) => {
    res.send("Hello World");
  });
};
