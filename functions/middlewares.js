const Token = require("./models/token");

const authMiddleware = async (req, res, next) => {
  const token = req.cookie("user-token");
  if (token) {
    req.user = await Token.resolveUser(token);
  }
  next();
};

module.exports = { authMiddleware };
