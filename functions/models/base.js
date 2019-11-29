const db = require("./db");

// helpers
const snapToArray = snapshot => {
  const arr = [];
  snapshot.forEach(doc => {
    arr.push(doc);
  });
  return arr;
};
const parseDoc = doc => {
  return {
    id: doc.id,
    ...doc.data()
  };
};

class Base {
  // override collection
  static collection = undefined;

  constructor(props = {}) {
    Object.assign(this, props);
  }

  static parseSnap(snapshot) {
    return snapToArray(snapshot)
      .map(parseDoc)
      .map(obj => new Base(obj));
  }

  static async getAll() {
    try {
      const snapshot = await db.collection(this.collection).get();
      const objs = this.parseSnap(snapshot);
      return objs;
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  static async filter(...filters) {
    try {
      let ref = db.collection(this.collection);
      filters.forEach(filter => {
        ref = ref.where(...filter);
      });
      const snapshot = await ref.get();
      if (snapshot.empty) return null;
      const users = this.parseUsersSnap(snapshot);
      return users[0];
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  static async get(id) {
    try {
      const snapshot = await db
        .collection(this.collection)
        .doc(id)
        .get();
      if (snapshot.empty) return null;
      const objs = this.parseSnap(snapshot);
      return objs[0];
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  static async create(obj) {
    this.validate(obj);
    try {
      const ref = await db.collection(this.collection).add(obj);
      return new Base({ id: ref.id, ...obj });
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  static async update(obj) {
    this.validate(obj);
    try {
      await db
        .collection(this.collection)
        .doc(obj.id)
        .set(obj);
      return obj;
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  static async save(obj) {
    const { id } = obj;
    let existing = await this.get(id);
    if (existing) {
      existing = new Base({
        ...existing,
        ...obj
      });
      return await this.update(existing);
    } else {
      return await this.create(obj);
    }
  }

  static async delete(obj) {
    try {
      await db
        .collection(this.collection)
        .doc(obj.id)
        .delete();
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  static validate(obj) {
    const errors = [];
    if (errors.length) {
      throw new Error(`Invalid obj (${errors.join(", ")})`);
    }
  }
}

module.exports = Base;
