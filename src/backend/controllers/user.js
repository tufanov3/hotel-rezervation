const bcrypt = require('bcrypt');
const User = require('../models/User')
const { generate } = require('../halpers/token');
const token = require('../halpers/token');
const ROLES = require('../models/roles')

async function register(login, password) {
    if (!password) {
        throw new Error('Password is empty');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ login, password: passwordHash });
    return {user, token};
}

async function login(login, password) {
    const user = await User.findOne({ login });
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Wrong password');
    }

    const token = generate({ user: user.id });
    
    return { token, user };
}

function getUsers() {
    return User.find()
}

function getRoles() {
    return[
        {id:  ROLES.ADMIN, name: 'Admin'},
        {id:  ROLES.USER, name: 'User'}
    ]
}

function deleteUser(id) {
    return User.deleteOne({ _id: id })
}

module.exports = {
    register,
    login,
    getUsers,
    getRoles,
    deleteUser
};
