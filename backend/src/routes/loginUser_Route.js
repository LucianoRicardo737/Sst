const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/user');


//Log usuario
router.post('/login', async (req, res) => {
    try {
        //destructuring
        let { nickname, password } = req.body;
        //pasamos a minusculas
        let userMinus = nickname.toLowerCase().trim();
        //validamos que el nick sea enviado
        if (!nickname)
            return res.status(400).json({ msg: 'Ingrese el nombre de usuario' });
        //validamos que el password sea enviado
        if (!password)
            return res.status(400).json({ msg: 'Ingrese la contraseña' });
        //condicional para saber si el usuario existe
        const userExisting = await User.findOne({ nickname: userMinus });

        if (!userExisting)
            return res.status(400).json({ msg: 'El usuario no esta registrado' });

        //validamos la contraseña
        const userMatchPassword = await bcrypt.compare(password, userExisting.password);

        if (!userMatchPassword)
            return res.status(400).json({ msg: 'La contraseña es incorrecta' });
        //cargamos el token
        const token = jwt.sign({ id: userExisting._id }, process.env.JWT_MISTERIOSO);

        //enviamos el usuario
        res.json({
            token,
            userExisting: {
                id: userExisting._id,
                nickname: userExisting.nickname,
                nombre: userExisting.name,
                atribute: userExisting.atribute,
                role: userExisting.role
            }
        });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});
//Validacion de token
router.post('/validarToken', async (req, res) => {
    try {
        const token = req.header('labLERsst-auth-token');

        if (!token)
            return res.json(false);

        const tokenVerified = jwt.verify(token, process.env.JWT_MISTERIOSO);
        if (!tokenVerified)
            return res.json(false);

        const userExisting = await User.findById(tokenVerified.id);
        if (!userExisting)
            return res.json(false);

        return res.json(true);

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
})
//Datos del usuario
router.get('/', auth, async (req, res) => {
    try {
        const userExisting = await User.findById(req.user);
        res.json({
            id: userExisting._id,
            nickname: userExisting.nickname,
            nombre: userExisting.name,
            atribute: userExisting.atribute,
            role: userExisting.role
        });
    } catch (error) {
        console.log(error)
    }
});


module.exports = router;