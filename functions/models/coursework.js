const Base = require("./base");

class Coursework extends Base {
  constructor(props) {
    const defs = {
      name: undefined,
      date: undefined,
      file: undefined
    };
    super({ ...defs, ...props });
    Coursework.collection = "courseworks";
  }

  static validate(coursework) {
    const errors = [];
    if (!coursework.name) errors.push("coursework.name is required");
    else {
      if (coursework.name.length < 5 || coursework.name.length > 100)
        errors.push("coursework.name has to be from 5 to 20 characters long");
    }
    if (!coursework.date) errors.push("coursework.date is required");
    if (!coursework.file) errors.push("coursework.file is required");
    if (errors.length) {
      throw new Error(`Invalid coursework (${errors.join(", ")})`);
    }
  }
}

module.exports = Coursework;
