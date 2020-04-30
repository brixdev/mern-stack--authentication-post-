const jwt = require("jsonwebtoken");

module.exports = tokenMiddleware = () => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(process.env.REACT_APP_ACCESS_TOKEN);

    if (authHeader) {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        jwt.verify(token, "myaccesstoken", (err, user) => {
          if (err) {
            return res.sendStatus(403);
          }
          req.user = user;
          next();
        });
      }
    } else {
      res.sendStatus(401);
    }
  };
};
