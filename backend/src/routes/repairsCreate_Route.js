const router = require('express').Router();
const auth = require('../middleware/auth');
const Repair = require('../models/repair');



//Agregar producto para reparar
router.post('/nuevaReparacion', auth, async (req, res) => {
    try {

        //destructuring product
        let { numberid, type, pacord, seña, brand, model, nserie, failure, state, observation, client, createdby, promised } = req.body;

        //Validaciones
        //todos los campos son necesarios
        if (!type)
            return res.status(400).json({ msg: 'Es necesario especificar el tipo de producto' });
        // if (!brand)
        // return res.status(400).json({msg:'Es necesario especificar la marca del producto'});
        // if (!model)
        // return res.status(400).json({msg:'Es necesario especificar el modelo del producto'});
        // if (!nserie)
        // return res.status(400).json({msg:'Es necesario especificar el numero de serie del producto'});
        // if (!failure)
        // return res.status(400).json({msg:'Es necesario especificar la falla del producto'});
        if (!state)
            return res.status(400).json({ msg: 'Es necesario especificar el estado del producto' });
        if (!client)
            return res.status(400).json({ msg: 'Es necesario especificar el cliente al cual le pertenece el producto' });
        if (!createdby)
            return res.status(400).json({ msg: 'Es necesario especificar quien crea el producto' });



        //id numerico unico
        //revision en db
        const validNumberid = await Repair.findOne().count();
        //incremento del id
        const increment = validNumberid + 1


        console.log(promised)

        //completamos el schema
        const newRepair = new Repair({
            numberid: increment,
            type,
            brand,
            model,
            nserie: nserie.trim(),
            failure,
            state: state.toLowerCase(),
            observation,
            pacord: pacord.trim(),
            seña: seña.trim(),
            client,
            promised,
            createdby: req.user
        });

        //guardamos el schema
        const savedRepair = await newRepair.save();
        res.json(savedRepair);
        console.log(savedRepair)


    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});
//Listar todas las repareciones
router.get('/', auth, async (req, res) => {
    try {
        const getRepairs = await Repair.find();
        res.send(getRepairs);
    } catch (error) {
        console.log(error)
    }
});
//Listar una reparacion
router.get('/:id', auth, async (req, res) => {
    try {
        const getRepair = await Repair.find({ _id: req.params.id });
        res.send(getRepair);
    } catch (error) {
        console.log(error)
    }
});
//Editar reparacion
router.put('/:id', auth, async (req, res) => {
    try {

        let
            { type,
                brand,
                pacord,
                seña,
                model,
                nserie,
                state,
                failure,
                promised,
                observation } = req.body;
        const editRepair = await Repair.findOneAndUpdate({ _id: req.params.id },
            {
                type,
                state,
                pacord,
                seña,
                brand,
                model,
                nserie,
                failure,
                promised,
                observation
            });
        res.send('Reparacion editada correctamente');

        console.log(editRepair)

    } catch (error) {
        console.log(error)
    }
    //Eliminar Reparacion

});
//Eliminar reparacion
router.delete('/:id', auth, async (req, res) => {
    try {
        // const findUsuario = await User.findOne({_id:req.params.id});
        // if(!findUsuario)
        // return res.status(400).json({msg:'Acceso Invalido'});
        const findRepairAndDelete = await Repair.findByIdAndDelete(req.params.id);
        res.send('Reparacion eliminada correctamente');


    } catch (error) {
        console.log(error)
    }








});



module.exports = router;
