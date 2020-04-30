const jwt = require("jsonwebtoken");

module.exports = decodeToken = () => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      
      if (authHeader) {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.decode(token, { complete: true });
        const userId = decoded.payload.user.id;
        req.headers.authorization = userId;
        next();
      }
    } catch (error) {
      res.sendStatus(500).json({
        message: error,
      });
    }
  };
};
