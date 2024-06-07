
function mapUser(user) {
    return {
        id: user._id,
        login: user.login,
        roleId: user.role,
    };
}
module.exports = mapUser;
  