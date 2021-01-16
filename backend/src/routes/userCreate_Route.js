const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/user');


//Crear nuevo usuario
router.post('/nuevoUsuario', async (req, res) => {
    try {

        //destructuring user
        let { nickname, name, lastname, password, passwordCheck, atribute, role } = req.body;

        //Validaciones
        //todos los campos son necesarios
        if (!nickname)
            return res.status(400).json({ msg: 'Es necesario especificar el nombre de usuario' });
        if (!name)
            return res.status(400).json({ msg: 'Es necesario especificar el nombre' });
        if (!lastname)
            return res.status(400).json({ msg: 'Es necesario especificar el apellido' });
        if (!atribute)
            return res.status(400).json({ msg: 'Es necesario especificar el atributo del usuario' });
        if (!role)
            return res.status(400).json({ msg: 'Es necesario especificar el rol del usuario' });

        //usuario a minuscula
        let nicknameLowerCase = nickname.toLowerCase().trim();
        //nickname unico
        //revision en db
        const validNickname = await User.findOne({ nickname: nicknameLowerCase });
        //validacion
        if (validNickname)
            return res.status(400).json({ msg: 'El nombre de usuario ya existe' });

        //contraseñas
        //coincidencia
        if (password !== passwordCheck)
            return res.status(400).json({ msg: 'La contraseña no coincide' });
        //requisitos de la misma
        if (password < 6)
            return res.status(400).json({ msg: 'La contraseña debe contener al menos 6 digitos.' });

        //encriptamos la contraseña con brypt
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);



        //completamos el schema
        const newUser = new User({
            nickname: nicknameLowerCase,
            name,
            lastname,
            password: passwordHash,
            atribute,
            role,
        });

        //guardamos el schema
        const savedUser = await newUser.save();
        res.json(savedUser);
        console.log(savedUser)


    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});
//Listar todos los usuarios
router.get('/', auth, async (req, res) => {

    try {
        const getUsers = await User.find();
        res.send(getUsers);
    } catch (error) {
        console.log(error)
    }
});
//Listar un usuario
router.get('/:id', auth, async (req, res) => {
    try {
        const getUser = await User.find({ _id: req.params.id });
        res.send(getUser);
    } catch (error) {
        console.log(error)
    }
});
//Editar usuario
router.put('/:id', auth, async (req, res) => {
    try {
        let { nickname, name, lastname, password, passwordCheck, atribute, role } = req.body;

        //Validaciones
        //todos los campos son necesarios
        if (!nickname)
            return res.status(400).json({ msg: 'Es necesario especificar el nombre de usuario' });
        if (!name)
            return res.status(400).json({ msg: 'Es necesario especificar el nombre' });
        if (!lastname)
            return res.status(400).json({ msg: 'Es necesario especificar el apellido' });
        if (!atribute)
            return res.status(400).json({ msg: 'Es necesario especificar el atributo del usuario' });
        if (!role)
            return res.status(400).json({ msg: 'Es necesario especificar el rol del usuario' });

        //usuario a minuscula
        let nicknameLowerCase = nickname.toLowerCase().trim();
        //nickname unico

        //contraseñas
        if (password === "" || passwordCheck === "")
            return res.status(400).json({ msg: 'Debe ingresar una nueva contraseña.' });
        //coincidencia
        if (password !== passwordCheck)
            return res.status(400).json({ msg: 'La contraseña no coincide' });
        //requisitos de la misma
        if (password < 6)
            return res.status(400).json({ msg: 'La contraseña debe contener al menos 6 dígitos.' });

        //encriptamos la contraseña con brypt
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);



        const editUser = await User.findOneAndUpdate({ _id: req.params.id }, { nickname: nicknameLowerCase, name, lastname, password: passwordHash, passwordCheck, atribute, role });
        res.send('Usuario editado correctamente');



    } catch (err) {
        res.status(500).json({ err: err.message });
    }
    //Eliminar Usuario

});
//Eliminar usuario
router.delete('/:id', auth, async (req, res) => {
    try {
        // const findUsuario = await User.findOne({_id:req.params.id});
        // if(!findUsuario)
        // return res.status(400).json({msg:'Acceso Invalido'});
        const findUserAndDelete = await User.findByIdAndDelete(req.params.id);
        res.send('Usuario eliminado correctamente');


    } catch (error) {
        console.log(error)
    }
});



module.exports = router;
