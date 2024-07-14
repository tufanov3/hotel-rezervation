const express = require('express');
const { register, login } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');

const router = express.Router({ mergeParams: true });

router.post('/register', async (req, res) => {
  try {
    console.log('Received registration request:', req.body); // Логирование входящих данных

    const { user, token } = await register(req.body.login, req.body.password);

    console.log('User registered:', user); // Логирование успешной регистрации

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // куки действительны 30 дней
      secure: process.env.NODE_ENV === 'production' // использовать HTTPS в продакшн
    }).send({ error: null, user: mapUser(user) });
  } catch (e) {
    console.error('Registration error:', e.message || "Unknown error"); // Логирование ошибок

    res.send({ error: e.message || "Unknown error" });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('Received login request:', req.body); // Логирование входящих данных

    const { user, token } = await login(req.body.login, req.body.password);

    console.log('User logged in:', user); // Логирование успешного входа

    res.cookie('token', token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    console.error('Login error:', e.message || "Unknown error"); // Логирование ошибок

    res.send({ error: e.message || "Unknown error" });
  }
});

router.post('/logout', (req, res) => {
  console.log('Logout request received'); // Логирование запроса на выход

  res.cookie('token', '', { httpOnly: true }).send({});
});

module.exports = router;
