import {useState } from 'react'

import {IP, PORT} from '../../../env';
import Axios from 'axios';

// import SeOrHideOrdersContext from '../../../context/SeOrHideOrdersContext';

import './createClient.css'

import socket from '../../../io';


const CreateClient = ({setSeOrHideNewClient, setError}) => {


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

        setError(undefined)
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

          if(newClient.codigo === ""){
            setNewClient({...newClient, codigo:"54"})
          }

          //enviamos la info con el token
          await Axios.post(`http://${IP}:${PORT}/clientes/nuevoCliente`,newClient, config);




          //limpiando los inputs
          let clearInput = document.querySelector("input[type='text'],input[type='number'],textarea");
          let clearInputs=document.querySelectorAll("input[type='text'],input[type='number'],textarea");
          for(let clearInput of clearInputs)
          clearInput.value = "";
          console.log(clearInput)

          //limpiando el estado


          // setNewClient(initialState);
          //refresh a la lista de clientes
          // listAllClients();
            socket.emit('cliente');
          setSeOrHideNewClient(false);
          setError(undefined)
        } catch (err) {
          err.response.data.msg && 
          setError(err.response.data.msg);
        }
      }




    return (




 <div className="row  " id="createClient">

  <div className="col-lg-12 text-left">

        <h4>NUEVO CLIENTE</h4>
      </div>
  <div className="col-md-4 ">

    <input
    type="text"
    className="form-control"
    placeholder="Nombre"
    name='name'
    id='name'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-4 ">
    <input
    type="text"
    className="form-control"
    placeholder="Apellido"
    name='lastname'
    id='lastname'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-4 mb-2">
    <input
    type="number"
    className="form-control"
    placeholder="Dni"
    name='dni'
    id='dni'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-6 mb-2">
    <input
    type="text"
    className="form-control"
    placeholder="Dirección"
    name='address'
    id='address'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-6 mb-2">
    <input
    type="text"
    className="form-control"
    placeholder="Ciudad"
    name='city'
    id='city'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-1 mb-2">
    <input
    type="text"
    className="form-control"
    placeholder="+54"
    
    name='prefijo'
    id='prefijo'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-2 mb-2">
    <input
    type="text"
    className="form-control"
    placeholder="Código de área"
    name='codigo'
    id='codigo'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-3 mb-2">
    <input
    type="text"
    className="form-control"
    placeholder="Teléfono"
    name='telephone'
    id='telephone'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-6 mb-2">
    <input
    type="email"
    className="form-control"
    placeholder="Email"
    name='email'
    id='email'
    onChange={handleChangeText} />
  </div>
  <div className="col-md-12 mb-2">
  <textarea
  className="form-control"
  placeholder='Observaciones'
  name='observation'
  id='observation'
  onChange={handleChangeText} ></textarea>
  </div>
<div  className='row col-md-12 justify-content-end'>

<div className="col-md-1 borderButtonGreen">

<span
type="button"
data-dismiss="modal"
onClick={()=>submit()}
className="btn btn-check text-success ">
    ✔</span>

    </div>
    <div className="col-md-1 borderButtonRed  mr-2">

<span
type="button"
className="btn btn-close text-danger "
data-dismiss="modal"
onClick={hideNewClient}>
    X</span>
</div>

</div>

 </div>


    )
}

export default CreateClient
