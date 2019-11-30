const Token = require("./models/token");

const authCookie = "__session";
const authMiddleware = async (req, res, next) => {
  const token = req.cookies[authCookie];
  if (token) {
    req.user = await Token.resolveUser(token);
  }
  next();
};

module.exports = { authMiddleware, authCookie };
