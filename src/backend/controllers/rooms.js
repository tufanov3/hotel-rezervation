const Rooms = require('../models/rooms')

function addRooms(rooms) {
    return Rooms.create(rooms)
}

async function editRooms(id, rooms) {
    const newRooms = await Rooms.findByIdAndUpdate(id, rooms, {returnDocument: 'after'})

    return newRooms
}

function deleteRooms(id) {
    return Rooms.deleteOne({_id: id})
}

async function searchRooms({ page = 1, limit = 10, filters = {} }) {
    const skip = (page - 1) * limit;
    const query = Rooms.find(filters).skip(skip).limit(limit);
    const rooms = await query.exec();
    const totalRooms = await Rooms.countDocuments(filters);
    return {
        rooms,
        totalPages: Math.ceil(totalRooms / limit),
        currentPage: page
    };
}

function getRooms(id) {
    return Rooms.findById(id)
}


module.exports = {
    addRooms,
    editRooms,
    deleteRooms,
    searchRooms,
    getRooms
};