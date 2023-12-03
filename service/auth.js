const sessionIdToMapUser = new Map();

function setUser(id, user) {
  sessionIdToMapUser.set(id, user);
}

function getUser(id) {
  return sessionIdToMapUser.get(id);
}
module.exports = {
  setUser,
  getUser,
};
