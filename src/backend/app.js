const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors');

const routes = require('./routes')


const port = 3001;
const app = express();

app.use(express.static('/hotel'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3001', // Разрешаем запросы с этого источника
    credentials: true, // Разрешаем отправку куки и заголовков авторизации через CORS
}));


app.use('/', routes)

mongoose.connect(
    'mongodb+srv://geidar:alanya2030@hotel.h25rdog.mongodb.net/?retryWrites=true&w=majority&appName=hotel'
).then(() => {
    app.listen(port, () => {
        console.log(`Server has been started on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
