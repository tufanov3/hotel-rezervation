const { verify } = require('../halpers/token');
const User = require('../models/User');

module.exports = async function(req, res, next) {
    const token = req.cookies.token;

    console.log('Received token:', token); // Добавьте логирование полученного токена

    if (!token) {
        return res.status(401).json({ error: 'Authentication error: Token missing' });
    }

    try {
        const tokenData = verify(token);
        console.log('Token data:', tokenData); // Добавьте логирование данных из токена

        const user = await User.findOne({ _id: tokenData.id });

        if (!user) {
            return res.status(401).json({ error: 'Authenticated user not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
