const generateID = require("../helpers/generateID");

function UserModel({ name, password = null, statsId = null }) {
  if (!name) return false;
  let newId = generateID()
  return { id: newId, name, password, statsId };
}

module.exports = UserModel;