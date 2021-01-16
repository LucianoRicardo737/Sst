const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('labLERsst-auth-token');
        if (!token)
            return res.status(401).json({ msg: 'Fallo de token auth' });

        const verified = jwt.verify(token, process.env.JWT_MISTERIOSO);
        if (!verified)
            return res.status(401).json({ msg: 'token no autorizado' });

        req.user = verified.id;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = auth;