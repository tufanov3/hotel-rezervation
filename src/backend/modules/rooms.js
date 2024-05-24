const mongoose = require('mongoose');
const validator = require('validator');

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: validator.isURL,
            message: 'Image should be a valid URL'
        }
    },
    price: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
