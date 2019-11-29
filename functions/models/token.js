const Base = require("./base");
const User = require("./user");

class Token extends Base {
  static collection = "tokens";

  userId;
  value;

  static async resolveUser(value) {
    const token = await Token.filter(["token", "==", value])[0];
    if (!token) return null;
    return await User.get(token.userId);
  }

  static validate(token) {
    const errors = [];
    if (!token.userId) errors.push("token.userId is required");
    if (!token.value) errors.push("token.value is required");
    if (errors.length) {
      throw new Error(`Invalid token (${errors.join(", ")})`);
    }
  }
}

module.exports = Token;
