const Base = require("./base");

class User extends Base {
  static collection = "users";

  username;
  facnum;
  firstName;
  middleName;
  lastName;
  password;
  passsalt;
  specialty;
  course;
  educationType;

  static async createUser(user) {
    this.validate(user);
    const match = await Base.filter(["username", "==", user.username]);
    if (match) {
      throw new Error(`User with username ${user.username} already exists`);
    }
    const success = this.validatePassword(user.password);
    if (!success) {
      throw new Error("Invalid password");
    }
    const { salt, hash } = this.getPasswordHash(user.password);
    user.passsalt = salt;
    user.password = hash;
    return await this.create(user);
  }

  static async login({ username, password }) {
    const user = await Base.filter(["username", "==", username]);
    if (!user) {
      throw new Error("Invalid username");
    }
    const hash = this.getPasswordHash(password, user.passsalt);
    if (hash !== user.password) {
      throw new Error("Invalid password");
    }
    return user;
  }

  static getPasswordHash(password, _salt) {
    const salt = _salt || crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(password)
      .digest("hex");
    return { salt, hash };
  }

  static validatePassword(password) {
    /* 
      ^             - start of string
      (?=.*[a-z])   - at least 1 lowercase alphabetical character
      (?=.*[A-Z])   - at least 1 uppercase alphabetical character
      (?=.*[0-9])   - at least 1 numeric character
      (?=.*[-_@*])  - at least one special character ('-','_', '@', '*')
      .{6,30}       - from 6 to 30 characters
      $             - end of string
    */
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_@*]).{6,30}$/;
    return regex.test(password);
  }

  static validate(user) {
    const errors = [];
    if (!user.username) errors.push("user.username is required");
    if (!user.facnum) errors.push("user.facnum is required");
    if (!user.firstName) errors.push("user.firstName is required");
    if (!user.lastName) errors.push("user.lastName is required");
    if (!user.password) errors.push("user.password is required");
    if (!user.specialty) errors.push("user.specialty is required");
    if (!user.course) errors.push("user.course is required");
    if (!user.educationType) errors.push("user.educationType is required");
    if (errors.length) {
      throw new Error(`Invalid user (${errors.join(", ")})`);
    }
  }
}

module.exports = User;
