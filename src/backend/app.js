const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { register } = require('./controllers/user');
const bodyParser = require('body-parser');

const port = 3001;
const app = express();

// Middleware для парсинга JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Маршрут для регистрации
app.post('/register', async (req, res) => {
    try {
        const user = await register(req.body.login, req.body.password);
        res.json({ error: null, user });
    } catch (e) {
        res.json({ error: e.message || "Unknown error" });
    }
});

// Подключение к MongoDB
mongoose.connect(
    'mongodb+srv://geidar:alanya2030@hotel.h25rdog.mongodb.net/?retryWrites=true&w=majority&appName=hotel'
).then(() => {
    app.listen(port, () => {
        console.log(`Server has been started on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
