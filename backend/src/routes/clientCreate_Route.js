const router = require('express').Router();
const auth = require('../middleware/auth');
const Client = require('../models/client');

//Nuevo Cliente
router.post('/nuevoCliente', auth, async (req, res) => {
    try {
        //destructuring client
        let { name, lastname, prefijo, codigo, telephone, fijo, dni, address, city, observation, email } = req.body
        if (!name || name === "")
            return res.status(400).json({ msg: 'Es necesario especificar el NOMBRE del cliente.' });
        if (!lastname || lastname === "")
            return res.status(400).json({ msg: 'Es necesario especificar el APELLIDO del cliente.' });
        // if (!dni||dni==="")
        // return res.status(400).json({msg:'Es necesario especificar el DNI del cliente.'});
        // if (!address||address==="")
        // return res.status(400).json({msg:'Es necesario especificar la DIRECCIÓN del cliente.'});
        // if (!telephone||telephone==="")
        // return res.status(400).json({msg:'Es necesario especificar el TELÉFONO del cliente.'});
        // if (!codigo||codigo==="")
        // return res.status(400).json({msg:'Es necesario especificar el CÓDIGO de área del teléfono.'});
        // if (!prefijo||prefijo==="")
        // return res.status(400).json({msg:'Es necesario especificar el PREFIJO del teléfono.'});
        //verificacion de existencia del dni
        // const validDni = await Client.findOne({dni});
        // if(validDni)
        // return res.status(400).json({msg:'El dni ya se encuentra registrado. Revise el DNI.'});

        //cargamos los datos en el schema
        const newClient = new Client({
            name: name.trim(),
            lastname: lastname.trim(),
            dni,
            address: address.trim(),
            telephone: telephone.trim(),
            fijo: fijo.trim(),
            prefijo: prefijo.trim(),
            codigo: codigo.trim(),
            email: email.trim(),
            city: city.trim(),
            observation: observation.trim()
        });

        //guardamos el schema
        const savedClient = await newClient.save();
        res.json(savedClient);
        console.log(savedClient);
        return res.status(200).json({ msg: 'El Cliente fue creado con éxito' });

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});
//Listar todos los clientes
router.get('/', auth, async (req, res) => {
    try {
        const getClients = await Client.find();
        res.send(getClients);
    } catch (error) {
        console.log(error)
    }
});

//Listar un Cliente
router.get('/:id', auth, async (req, res) => {
    try {
        const getClient = await Client.find({ _id: req.params.id });
        res.send(getClient);
    } catch (error) {
        console.log(error)
    }
});
//Editar Cliente
router.put('/:id', auth, async (req, res) => {
    try {
        let { name, lastname, prefijo, codigo, telephone, fijo, dni, address, city, observation, email } = req.body;
        //validaciones
        if (!name || name === "")
            return res.status(400).json({ msg: 'Es necesario especificar el NOMBRE del cliente.' });
        if (!lastname || lastname === "")
            return res.status(400).json({ msg: 'Es necesario especificar el APELLIDO del cliente.' });
        //   if (!dni||dni==="")
        //   return res.status(400).json({msg:'Es necesario especificar el DNI del cliente.'});
        //   if (!address||address==="")
        //   return res.status(400).json({msg:'Es necesario especificar la DIRECCIÓN del cliente.'});
        //   if (!telephone||telephone==="")
        //   return res.status(400).json({msg:'Es necesario especificar el TELÉFONO del cliente.'});
        //   if (!codigo||codigo==="")
        //   return res.status(400).json({msg:'Es necesario especificar el CÓDIGO de área del teléfono.'});
        //   if (!prefijo||prefijo==="")
        //   return res.status(400).json({msg:'Es necesario especificar el PREFIJO del teléfono.'});
        //   //verificacion de existencia del dni
        //   const validDni = await Client.findOne({dni});
        //   if(validDni)
        //   return res.status(400).json({msg:'El dni ya se encuentra registrado. Revise el DNI.'});

        const editClient = await Client.findOneAndUpdate({ _id: req.params.id }, {
            name: name.trim(),
            lastname: lastname.trim(),
            dni,
            address: address.trim(),
            telephone: telephone.trim(),
            fijo: fijo.trim(),
            codigo: codigo.trim(),
            prefijo: prefijo.trim(),
            email: email.trim(),
            city: city.trim(),
            observation: observation.trim()
        });
        return res.status(200).json({ msg: 'El Cliente fue editado con éxito' });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
    //Eliminar Client

});
//Eliminar Cliente
router.delete('/:id', auth, async (req, res) => {
    try {
        // const findClient = await Client.findOne({_id:req.params.id});
        // if(!findClient)
        // return res.status(400).json({msg:'Acceso Invalido'});
        const findClientAndDelete = await Client.findByIdAndDelete(req.params.id);
        res.send('Usuario eliminado correctamente');
    } catch (error) {
        console.log(error)
    }
});


module.exports = router;
