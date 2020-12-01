import React, {useEffect,useState,useCallback}from 'react';

import Axios from 'axios';
import {IP,PORT} from '../../../env';


const ModalCreateMessage = ({setPassword, sendMessage, showClients, dataOrder,password,chargeNewPrice}) => {


  //estados 
  const [state,setState]=useState("")
  //set crear state
  const [stateData, setStateData]=useState([]);

  //condicional de desmonte
  const [render,setRender]=useState(true);
  //Ver crear Estado
  const [seeNewState, setSeeNewState]=useState(false);


  const showNewState = () =>{
    setSeeNewState(true);
    document.getElementById('password').value = "";
    setPassword("")
  }

  //crear estado de reparacion
  const createState = async () =>{
   
    try { 
    //validamos los datos
    const token = localStorage.getItem('auth-token');
    const config = { headers:{
      'labLERsst-auth-token':token
    }};
    
    //importamos la clave
    const validateUser = {password}

    //validamos el usuario solo con la pw
    const userLogRes = await Axios.post(`http://${IP}:${PORT}/identificando/login`,validateUser,config);

    //cargamos el nombre en una variable
    let nameIdentify = userLogRes.data.userExisting.name

    if(nameIdentify){


    //empaquetamos
    const newState = {
      name:nameIdentify,
      stateAdd:state
    }

    

    // enviamos la info con el token
    await Axios.post(`http://${IP}:${PORT}/generales/crearEstado`,newState, config);

    let typeState = document.getElementById('newState')
    typeState.value = ""
    
    // console.log(newState)
    setState("")
    setPassword("")
    SeeData()
    setSeeNewState(false)
    document.getElementById('password').value = ""

    // console.log("crear estado")
}else {
console.log("Contraseña Invalida")
}

      // socket.emit('message'); 

  } catch (error) {
    console.log(error)
  }
}


  //cargar los estados de reparacion
  const SeeData = useCallback(async () =>{
  let token = localStorage.getItem('auth-token');
  let config = {headers:{
    'labLERsst-auth-token': token
  }};


  let states = await Axios.get(`http://${IP}:${PORT}/generales/estados`, config);

  setStateData(states.data);


    // console.log("Ver data")
},[])

   

  useEffect(() => {
    if(render===true){
      // console.log("Use Effect")
    SeeData()
    document.getElementById('password').value = ""
    setPassword("")

  }
    return () => {
      setRender(false)
    }
  }, [SeeData, render, setPassword])



    return (
        <div>
            <div className="modal fade" id="validateUser" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Confirme el usuario antes de agregar</h5>
      </div>
      <div className="modal-body">


      <div className='container'>

{
 seeNewState === true ?
      <div className='row'>
    <div className='col-lg-12'>
  <form autoComplete="off">


  <input
    type="text"
    className="form-control border border-info mb-2"
    placeholder="Ingrese el nuevo estado"
    name='newState'
    id='newState'
  
   
    onChange={(e)=>setState(e.target.value)} 
    />
  </form>

    </div>
  </div>
  :      <div className=''>

  <div className='input-group'>
  <button 
  className='btn btn-outline-info rig'
  onClick={()=>showNewState()}
    >+</button>
                <select
                  className="custom-select "
                  id="state"
                  name='state'
                  defaultValue='disabled'
                  onChange={chargeNewPrice}
                  // onClick={chargeNewPrice}
                  >
          <option  disabled value='disabled'>No modificar estado</option>
          {    
            stateData?.sort(function(a, b){return a-b}).map(state =>
              {
              return(
                <option key={state._id}>{state.stateAdd}</option>
          )
          })
            }
        </select>
  </div>

<div>
<input
type="date"
className="form-control  col-lg-12  mt-2"
placeholder="Fecha de Entrega"
name='promised'
id='promised'


onChange={chargeNewPrice} 
/>
</div>

        <div className='row'>



<input
type="number"
className="form-control  col-lg-5 ml-auto mr-auto mt-2"
placeholder="Entrega"
name='seña'
id='nuevaEntrega'


onChange={chargeNewPrice} 
/>

<input
type="number"
className="form-control  col-lg-5 ml-auto mr-auto mt-2"
placeholder="Precio"
name='pacord'
id='newPrice'


onChange={chargeNewPrice} 
/>

</div>
        
        </div>


     
  }


     


</div>


      </div>
      <div className="modal-footer m-auto">
      <div className=''>
      <form autoComplete="off">
     <input
    autoComplete="new-password"
     onChange={(e)=>setPassword(e.target.value)}
     name='password' 
      id='password'
      type='password'
     className="form-control"
     placeholder='Ingrese su contraseña'
     />
     </form>
     </div>


       {   
seeNewState === true ?
<>
        <button 
        type="button" 
        className="btn btn-secondary " 
        onClick={()=>setSeeNewState(false)}
          >Atras</button>
        <button 
        onClick={createState}
        type="button" 
        className="btn btn-warning"
          >Nuevo Estado</button>

</>
          :
          <>
   
   <button 
        type="button" 
        className="btn btn-secondary " 
        data-dismiss="modal"
          >Cancelar</button>
        <button 
         onClick={sendMessage}
        type="button" 
        className="btn btn-danger" 
        data-dismiss="modal"
          >Agregar</button> 
          </>
}
          
      </div>
    </div>
  </div>
</div>




        </div>
    )
}

export default ModalCreateMessage
