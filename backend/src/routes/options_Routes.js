const router = require('express').Router();
const auth = require('../middleware/auth');
const Types = require('../models/options/types');
const States = require('../models/options/state');

// Crear Tipo de producto
router.post('/crearTipo', auth, async (req, res) => {
    try {

        //desctructuring
        let { name, typeProduct } = req.body

        //validaciones
        //todos los campos son necesarios
        if (!name)
            return res.status(400).json({ msg: 'Es necesario especificar el nombre de quien lo crea' });
        if (!typeProduct)
            return res.status(400).json({ msg: 'Es necesario especificar la clase de producto' });

        //validar tipo unico
        const validType = await Types.findOne({ typeProduct });
        if (validType)
            return res.status(400).json({ msg: 'Esta clase ya existe' });

        let typeMins = typeProduct.toLowerCase().trim()

        const newType = new Types({
            name,
            typeProduct: typeMins
        });

        //guardamos el schema
        const savedType = await newType.save();
        res.json(savedType);


    } catch (error) {
        console.log(error)
    }
})


//Listar los tipos
router.get('/tipos', auth, async (req, res) => {
    try {
        const getTypes = await Types.find();
        res.send(getTypes);
    } catch (error) {
        console.log(error)
    }
});
//listado unico
router.get('/tipos/:id', auth, async (req, res) => {
    try {
        const getType = await Types.find({ _id: req.params.id });
        res.send(getType);
    } catch (error) {
        console.log(error)
    }
});


// eliminar tipo
router.delete('/tipos/:id', auth, async (req, res) => {
    try {
        await Types.findByIdAndDelete(req.params.id);
        res.send('Mensaje eliminada correctamente');

    } catch (error) {
        console.log(error)
    }
});




// Crear Tipo de producto
router.post('/crearEstado', auth, async (req, res) => {
    try {

        //desctructuring
        let { name, stateAdd } = req.body

        //validaciones
        //todos los campos son necesarios
        if (!name)
            return res.status(400).json({ msg: 'Es necesario especificar el nombre de quien agrega' });

        if (!stateAdd)
            return res.status(400).json({ msg: 'Es necesario especificar el Estado' })

        //validar tipo unico
        const validSstate = await States.findOne({ stateAdd });

        if (validSstate)
            return res.status(400).json({ msg: 'Esta clase ya existe' });

        let stateMins = stateAdd.toLowerCase().trim()

        const newState = new States({
            name,
            stateAdd: stateMins
        });

        //guardamos el schema
        const savedState = await newState.save();
        res.json(savedState);
        console.log(name, stateAdd)

    } catch (error) {
        console.log(error)
    }
})


//Listar los tipos
router.get('/estados', auth, async (req, res) => {
    try {
        const getStates = await States.find();
        res.send(getStates);
    } catch (error) {
        console.log(error)
    }
});
//listado unico
router.get('/estados/:id', auth, async (req, res) => {
    try {
        const getStates = await States.find({ _id: req.params.id });
        res.send(getStates);
    } catch (error) {
        console.log(error)
    }
});


// eliminar tipo
router.delete('/estados/:id', auth, async (req, res) => {
    try {
        await States.findByIdAndDelete(req.params.id);
        res.send('Estado eliminada correctamente');

    } catch (error) {
        console.log(error)
    }
});






module.exports = router;