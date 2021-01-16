const router = require('express').Router();
const auth = require('../middleware/auth');
const Msg = require('../models/messages');

//Nuevo mensaje
router.post('/nuevoMensaje', auth, async (req, res) => {
    try {

        //destructuring product
        let { name, msg, stateEdit, pacordEdit, señaEdit, reparation, fechaEdit, userid } = req.body;

        //Validaciones
        //todos los campos son necesarios
        if (!name)
            return res.status(400).json({ msg: 'Es necesario especificar el nombre' });
        if (!msg)
            return res.status(400).json({ msg: 'Es necesario especificar el mensaje' });
        if (!reparation)
            return res.status(400).json({ msg: 'Es necesario especificar el modelo del producto' });
        if (!userid)
            return res.status(400).json({ msg: 'Es necesario especificar el numero de serie del producto' });


        //completamos el schema
        const newMsg = new Msg({
            name,
            msg,
            stateEdit,
            pacordEdit,
            señaEdit,
            fechaEdit,
            reparation,
            userid: req.user
        });

        //guardamos el schema
        const savedMsg = await newMsg.save();
        res.json(savedMsg);



    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});
//Listar todos los mensajes
router.get('/', auth, async (req, res) => {
    try {
        const getMsgs = await Msg.find();
        res.send(getMsgs);
    } catch (error) {
        console.log(error)
    }
});
//Ver un mensaje
router.get('/:id', auth, async (req, res) => {
    try {
        const getMsg = await Msg.find({ _id: req.params.id });
        res.send(getMsg);
    } catch (error) {
        console.log(error)
    }
});
//Editar mensajes
router.put('/:id', auth, async (req, res) => {
    try {

        let { msg } = req.body;
        const editMsg = await Msg.findOneAndUpdate({ _id: req.params.id }, { msg });
        res.send('Mensaje editado correctamente');

        console.log(editMsg)

    } catch (error) {
        console.log(error)
    }
    //Eliminar Reparacion
});
//Eliminar mensajes
router.delete('/:id', auth, async (req, res) => {
    try {
        // const findUsuario = await User.findOne({_id:req.params.id});
        // if(!findUsuario)
        // return res.status(400).json({msg:'Acceso Invalido'});
        const findMsgAndDelete = await Msg.findByIdAndDelete(req.params.id);
        res.send('Mensaje eliminada correctamente');


    } catch (error) {
        console.log(error)
    }

});
//Listar mensajes correspondientes a una reparacion


module.exports = router;

