const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { register, login, getUsers, deleteUser } = require('./controllers/user');
const mapUser = require('./halpers/mapUser'); 
const authenticated = require('./middlewares/authenticated')
const hasRole = require('./middlewares/hasRole')
const ROLES = require('./models/roles')

const port = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/register', async (req, res) => {
    try {
        const {user, token} = await register(req.body.login, req.body.password);
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
    res.cookie('token', '', {httpOnly: true})
    .send({})
});

app.use(authenticated)

app.get('./users', hasRole([ROLES.ADMIN]), async(req, res) => {
    const users = await getUsers()
    res.send({data: users.map(mapUser)})
})

app.get('./users/roles', hasRole([ROLES.ADMIN]), async(req, res) => {
    const users = await getUsers()
    res.send({data: ROLES})
})

app.delete('/users/:id', hasRole([ROLES.ADMIN]), async(req, res) => {
    await deleteUser(req.params.id)
    res.send({error: null})
})

mongoose.connect(
    'mongodb+srv://geidar:alanya2030@hotel.h25rdog.mongodb.net/?retryWrites=true&w=majority&appName=hotel'
).then(() => {
    app.listen(port, () => {
        console.log(`Server has been started on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
