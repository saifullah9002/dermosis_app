const roles = ['user', 'patient', 'doctor', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['patient']);
roleRights.set(roles[2], ['doctor']);
roleRights.set(roles[3], ['getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};
