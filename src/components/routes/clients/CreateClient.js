import {useState } from 'react'

import {IP, PORT} from '../../../env';
import Axios from 'axios';

// import SeOrHideOrdersContext from '../../../context/SeOrHideOrdersContext';

import './createClient.css'

import socket from '../../../io';


const CreateClient = ({setSeOrHideNewClient}) => {


    //state inicial para el nuevo usuario
    const initialState={
        name:"",
        lastname:"",
        dni:"",
        address:"",
        prefijo:"+54",
        telephone:"",
        codigo:"",
        email:"",
        city:"",
        observation:""
      }


      //estado para nuevo cliente
      const [newClient, setNewClient]=useState(initialState);

      //mostrar u ocultar nuevo cliente
    // const {setSeOrHideNewClient}=useContext(SeOrHideOrdersContext);

    const hideNewClient = ()=>{
        setSeOrHideNewClient(false);
    }

        //cargamos datos en el state
    const handleChangeText = (e)=>{
        setNewClient({...newClient, [e.target.name]:e.target.value});
      }

       //cargar nuevo cliente
    const submit = async ()=> {
        try {
          const token = localStorage.getItem('auth-token');
          const config = { headers:{
            'labLERsst-auth-token':token
          }};

          //enviamos la info con el token
          await Axios.post(`http://${IP}:${PORT}/clientes/nuevoCliente`,newClient, config);




          //limpiando los inputs
          let clearInput = document.querySelector("input[type='text'],input[type='number'],textarea");
          let clearInputs=document.querySelectorAll("input[type='text'],input[type='number'],textarea");
          for(let clearInput of clearInputs)
          clearInput.value = "";
         

          //limpiando el estado


          // setNewClient(initialState);
          //refresh a la lista de clientes
          // listAllClients();
            socket.emit('cliente');
          setSeOrHideNewClient(false);
        } catch (error) {
          console.log(error)
        }
      }




    return (




 <div className="row ">

  <div className="col-lg-12">

        <h3>NUEVO CLIENTE</h3>
      </div>
  <div className="col-md-4 marginbot">

    <input
    type="text"
    className="form-control"
    placeholder="Nombre"
    name='name'
    id='name'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-4 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Apellido"
    name='lastname'
    id='lastname'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-4 marginbot">
    <input
    type="number"
    className="form-control"
    placeholder="Dni"
    name='dni'
    id='dni'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-6 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Direccion"
    name='address'
    id='address'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-6 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Ciudad"
    name='city'
    id='city'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-1 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="+54"
    value="+54"
    name='prefijo'
    id='prefijo'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-2 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Codigo de Area"
    name='codigo'
    id='codigo'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-3 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Telefono"
    name='telephone'
    id='telephone'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-6 marginbot">
    <input
    type="email"
    className="form-control"
    placeholder="Email"
    name='email'
    id='email'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-12 marginbot">
  <textarea
  className="form-control"
  placeholder='Observaciones extras'
  name='observation'
  id='observation'
  onChange={handleChangeText} ></textarea>
  </div>

  <div className="col-md-12 btn-group">

        <button
        type="button"
        data-dismiss="modal"
        onClick={()=>submit()}
        className="btn btn-success fif ">
            Agregar Cliente</button>
        <button
        type="button"
        className="btn btn-secondary fif "
        data-dismiss="modal"
        onClick={hideNewClient}>
            Cerrar</button>
      </div>

 </div>


    )
}

export default CreateClient
