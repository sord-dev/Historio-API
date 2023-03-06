const generateID = require("../helpers/generateID");

function UserModel({ name, password = null, statsId = null }) {
  if (!name) return false;
  return { id: generateID, name, password, statsId };
}

module.exports = UserModel;