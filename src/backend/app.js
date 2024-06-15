    const express = require('express');
    const mongoose = require('mongoose');
    const cookieParser = require('cookie-parser');
    const { register, login, getUsers, deleteUser } = require('./controllers/user');
    const { addRoom, editRoom, deleteRoom, getRoomById, searchRooms } = require('./controllers/rooms');
    const mapUser = require('./halpers/mapUser'); 
    const authenticated = require('./middlewares/authenticated');
    const hasRole = require('./middlewares/hasRole');
    const ROLES = require('./models/roles');
    const cors = require('cors');

    const port = 3001;
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.post('/register', async (req, res) => {
        try {
            const { user, token } = await register(req.body.login, req.body.password);
            res.cookie('token', token, { httpOnly: true })
                .send({ error: null, user: mapUser(user) });
        } catch (e) {
            res.send({ error: e.message || "Unknown error" });
        }
    });

    app.post('/login', async (req, res) => {
        try {
            const { user, token } = await login(req.body.login, req.body.password);
            res.cookie('token', token, { httpOnly: true })
            .send({ error: null, user: mapUser(user) });
        } catch (e) {
            res.send({ error: e.message || "Unknown error" });
        }
    });

    app.post('/logout', (req, res) => {
        res.cookie('token', '', { httpOnly: true, expires: new Date(0) })
        .send({});
    });

    app.use(authenticated);

    app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
        const users = await getUsers();
        res.send({ data: users.map(mapUser) });
    });

    app.get('/users/roles', hasRole([ROLES.ADMIN]), async (req, res) => {
        res.send({ data: ROLES });
    });

    app.delete('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
        await deleteUser(req.params.id);
        res.send({ error: null });
    });

    // Room routes
    app.post('/rooms', hasRole([ROLES.ADMIN]), async (req, res) => {
        try {
            const room = await addRoom(req.body);
            res.send({ error: null, room });
        } catch (e) {
            res.send({ error: e.message || "Unknown error" });
        }
    });

    app.put('/rooms/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
        try {
            const room = await editRoom(req.params.id, req.body);
            res.send({ error: null, room });
        } catch (e) {
            res.send({ error: e.message || "Unknown error" });
        }
    });

    app.delete('/rooms/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
        try {
            await deleteRoom(req.params.id);
            res.send({ error: null });
        } catch (e) {
            res.send({ error: e.message || "Unknown error" });
        }
    });

    app.get('/rooms/:id', async (req, res) => {
        try {
            const room = await getRoomById(req.params.id);
            res.send({ error: null, room });
        } catch (e) {
            res.send({ error: e.message || "Unknown error" });
        }
    });

    app.get('/rooms', async (req, res) => {
        try {
            const { page, limit, ...filters } = req.query;
            const result = await searchRooms({ page: parseInt(page), limit: parseInt(limit), filters });
            res.send({ error: null, rooms: result.rooms });
        } catch (e) {
            res.status(500).send({ error: e.message || "Unknown error" });
        }
    });

    app.use(cors());
    

    mongoose.connect(
        'mongodb+srv://geidar:alanya2030@hotel.h25rdog.mongodb.net/hotel?retryWrites=true&w=majority'
    ).then(() => {
        app.listen(port, () => {
            console.log(`Server has been started on port ${port}`);
        });
    }).catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
