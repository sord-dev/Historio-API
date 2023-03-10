const bcrypt = require("bcrypt");

// Creating a class to model user. This class has a method to encrypt the user password.
class User {
  constructor(username, password) {
    this.id = undefined;
    this.username = username;
    this.password = password;
    this.thumbnail = "https://source.boringavatars.com";
    this.statsID = undefined;
  }

  async encryptPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  setId(id) {
    this.id = id;
  }

  setStatsId(id) {
    this.statsID = id;
  }
}

module.exports = User;
