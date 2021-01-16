const router = require('express').Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const identifyUser = require('../models/options/identifyUser');



router.post('/login', auth, async (req, res) => {
    try {
        //destructuring
        let { password } = req.body;
        //validamos que el password sea enviado
        if (!password)
            return res.status(400).json({ msg: 'Ingrese la contraseña' });
        //condicional para saber si el usuario existe
        const userExisting = await identifyUser.findOne({ password });
        if (!userExisting)
            return res.status(400).json({ msg: 'El usuario no esta registrado' });
        //enviamos el usuario
        res.json({
            userExisting: {
                id: userExisting._id,
                name: userExisting.name.toLowerCase().trim()
            }
        });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


//opciones de reparacion
router.post('/reparaciones', auth, async (req, res) => {
    try {
    } catch (error) {
    }
});

router.post('/crearUsuario', auth, async (req, res) => {
    try {
        //desctucturacion al user
        let { name, password, passwordCheck } = req.body;
        //validaciones
        if (!name)
            return res.status(400).json({ msg: 'Es necesario especificar un nombre' });
        if (!password)
            return res.status(400).json({ msg: 'Es necesario especificar una contraseña' });
        //usuario en minusculas
        let nameLowerCase = name.toLowerCase().trim();
        //usuario unico
        //consulta
        const validName = await identifyUser.findOne({ name: nameLowerCase });
        //validamos
        if (validName)
            return res.status(400).json({ msg: 'El nombre de usuario ya existe' });
        //validamos contraseña que tambien debe ser unica, ya que identificara directamente al usuario
        //consulta
        const validPassword = await identifyUser.findOne({ password });
        //validamos
        if (validPassword)
            return res.status(400).json({ msg: 'La contraseña ya existe y debe ser única' });

        //coincidencia
        if (password !== passwordCheck)
            return res.status(400).json({ msg: 'La contraseña no coincide' });
        const newidentifyUser = new identifyUser({
            name: name.toLowerCase().trim(),
            password: password.trim()
        });

        const savedUser = await newidentifyUser.save();
        res.json(savedUser);
        console.log(savedUser)
        console.log(newidentifyUser)
    } catch (err) {

        res.status(500).json({ err: err.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const getidentifyUser = await identifyUser.find();
        res.send(getidentifyUser);
    } catch (error) {
        console.log(error)
    }
});

//Listar un usuario
router.get('/:id', auth, async (req, res) => {
    try {
        const getidentifyUserForId = await identifyUser.find({ _id: req.params.id });
        res.send(getidentifyUserForId);
    } catch (error) {
        console.log(error)
    }
});

//Editar usuario
router.put('/:id', auth, async (req, res) => {
    try {
        let { name, password, passwordCheck } = req.body;
        //validaciones
        if (!name)
            return res.status(400).json({ msg: 'Es necesario especificar un nombre' });
        if (!password)
            return res.status(400).json({ msg: 'Es necesario especificar una contraseña' });
        //usuario en minusculas
        let nameLowerCase = name.toLowerCase().trim();
        //usuario unico
        //consulta
        const validName = await identifyUser.findOne({ name: nameLowerCase });
        //validamos
        if (validName)
            return res.status(400).json({ msg: 'El nombre de usuario ya existe' });
        //validamos contraseña que tambien debe ser unica, ya que identificara directamente al usuario
        //consulta
        const validPassword = await identifyUser.findOne({ password });
        //validamos
        if (validPassword)
            return res.status(400).json({ msg: 'La contraseña ya existe y debe ser única' });
        //coincidencia
        if (password !== passwordCheck)
            return res.status(400).json({ msg: 'La contraseña no coincide' });
        await identifyUser.findOneAndUpdate({ _id: req.params.id }, { name, password, passwordCheck });
        res.send('Usuario editado correctamente');
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

//Eliminar usuario
router.delete('/:id', auth, async (req, res) => {
    try {
        // const findUsuario = await User.findOne({_id:req.params.id});
        // if(!findUsuario)
        // return res.status(400).json({msg:'Acceso Invalido'});
        const findidentifyUserAndDelete = await identifyUser.findByIdAndDelete(req.params.id);
        res.send('Usuario eliminado correctamente');
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


module.exports = router;
