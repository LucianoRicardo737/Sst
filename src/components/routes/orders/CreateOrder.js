import {useState,  useContext, useEffect, useCallback} from 'react';
import Axios from 'axios';
import {IP,PORT} from '../../../env';

import UserContext from '../../../context/UserContext';


import ModalCreateType from '../modals/Modal_CreateType';
import ModalCreateState from '../modals/Modal_CreateState';

import socket from '../../../io';

import './createorder.css'


const ModalSingleClien = ({setSeOrHideNewOrder,dataClient, setError}) => {

  //user context
  const {userData}=useContext(UserContext)
    const user = userData.user

    //Data del cliente a leer
    // const {dataClient}=useContext(ClientDataContext);


    //tipo de producto nuevo
    const [type,setType]=useState("")
    //estados 
    const [state,setState]=useState("")
  
    //estados de carga de datos de variables
    const [typeData, setTypeData]=useState([]);
    const [stateData, setStateData]=useState([]);

    //passwor de validacion
    const [password, setPassword]=useState("");

    //condicional de desmonte
    const [render,setRender]=useState(true);

    let initialState={
        numberid:"",
        type:"",
        brand:"",
        model:"",
        nserie:"",
        failure:"",
        pacord:"0",
        seña:"0",
        state:"",
        observation:"",
        client:"",
        promised:undefined,
        createdby:user.id
      }

      //cargar los datos de la nueva orden
    const [newOrder, setNewOrder]=useState(initialState)

    newOrder.client=dataClient[0]._id

      //capturando inputs
    const handleChangeText = useCallback((e)=>{
        setNewOrder({...newOrder, [e.target.name]:e.target.value});
        // console.log("Se ejecuta handle Change")
      },[newOrder])


         //cargar nuevo cliente
    const submit = async ()=> {
      


        try {

          const token = localStorage.getItem('auth-token');
          const config = { headers:{
            'labLERsst-auth-token':token
          }};

          //enviamos la info con el token
          await Axios.post(`http://${IP}:${PORT}/reparaciones/nuevaReparacion`,newOrder, config);



          //limpiando los inputs
          let clearInput = document.querySelector("input[type='text'],input[type='number'],textarea,input[type='date']");
          let clearInputs=document.querySelectorAll("input[type='text'],input[type='number'],textarea,input[type='date']");
          for(let clearInput of clearInputs)
          clearInput.value = "";
          let stateValueSelect = document.getElementById('state');
          stateValueSelect.selectedIndex = 0;
          let stateValueSType = document.getElementById('type');
          stateValueSType.selectedIndex = 0;

  
          // listAllOrders()
            socket.emit('order');
            setError(undefined)
            // console.log("Enviando")
        } catch (err) {
          err.response.data.msg && 
          setError(err.response.data.msg);
        }
      }

      //hide new order
      // const {setSeOrHideNewOrder} = useContext(SeOrHideOrdersContext);

      //cerrar
      const hideNewOrder = () =>{
        setError(undefined)
        setSeOrHideNewOrder(false);

        // console.log("mostrar nueva orden")
      }


      //crear tipo de producto
      const createType = async () =>{
        
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
          const newType = {
            name:nameIdentify, 
            typeProduct:type
          }
    
    
          // enviamos la info con el token
          await Axios.post(`http://${IP}:${PORT}/generales/crearTipo`,newType, config);
      
          let typeValue = document.getElementById('newType')
          typeValue.value = ""
            setError(undefined)
          // console.log(newType)
          setType("")
          setPassword("")
          SeeData()
          setError(undefined)
          // console.log("creando tipo")
    }else {
      console.log("Contraseña Invalida")
    }
      
            // socket.emit('message'); 
    
        } catch (err) {
          err.response.data.msg && 
          setError(err.response.data.msg);
        }
      };

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
        
        console.log(newState)
        setState("")
        setPassword("")
        SeeData()
        setError(undefined)
        // console.log("crear estado")
  }else {
    console.log("Contraseña Invalida")
  }
    
          // socket.emit('message'); 
  
      } catch (err) {
        err.response.data.msg && 
        setError(err.response.data.msg);
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


        let types = await Axios.get(`http://${IP}:${PORT}/generales/tipos`, config);

        setTypeData(types.data);
        
          // console.log("Ver data")
      },[])

   

  useEffect(() => {
    if(render===true){

      // console.log("Use Effect")

    SeeData()


  }
    return () => {
      setRender(false)
    }
  }, [SeeData, render,dataClient])


    return (






      <div className="row newOrder">


  

        {/* modal */}
      <ModalCreateType 
      setType={setType} 
      setPassword={setPassword} 
      createType={createType}
      />

      <ModalCreateState 
      createState={createState} 
      setState={setState} 
      setPassword={setPassword}  
     
      />



      <div className="col-lg-12 text-left" >

        {
                dataClient.map(client=>{
                    return(
                    <h4 key={client._id}>Nueva orden a:&nbsp;&nbsp;{client.name}&nbsp;{client.lastname}</h4>
                    )
                })
            }
      </div>


  <div className="col-md-4 marginbot">

<div className='input-group'>

<button 
className='btn btn-outline-info rig'
data-toggle="modal" data-target="#addType"
  >+</button>

<select
className="custom-select"
id="type"
name='type'
onChange={handleChangeText}
defaultValue='disabled'>
        <option  disabled value='disabled'>Seleccionar Tipo</option>
       
    {
          typeData.sort(function(a, b){return a-b}).map(type =>
            {
            return(
              <option key={type._id}>{type.typeProduct}</option>
      )
    })
  }

      </select>

</div>
  </div>

  <div className="col-md-4 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Marca"
    name='brand'
    id='brand'
    onChange={handleChangeText} />
  </div>

  <div className="col-md-4 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Modelo"
    name='model'
    id='model'
    onChange={handleChangeText} />
  </div>

  <div className="col-md-6 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Numero De Serie"
    name='nserie'
    id='nserie'
    onChange={handleChangeText} />
  </div>

  <div className="col-md-6 marginbot">
  <div className='input-group'>

<button 
className='btn btn-outline-info rig'
data-toggle="modal" 
data-target="#addState"
>+</button>

<select
className="custom-select"
id="state"
name='state'
defaultValue='disabled'
onChange={handleChangeText}>
        <option  disabled value='disabled'>Estado Inicial</option>
        <option >a revisar</option>
        <option >entregado</option>
        <option >llamar al cliente</option>
        <option >reparacion aceptada</option>
        <option >reparacion cancelada</option>
        <option >listo para entregar</option>
        <option >list sin reparacion</option>
     
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
  </div>

  <div className="col-md-6 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Detalle la falla del equipo"
    name='failure'
    id='failure'
    onChange={handleChangeText} />
  </div>


  <div className="col-md-6 marginbot">
  <textarea
  className="form-control"
  placeholder='Observaciones extras'
  name='observation'
  id='observation'
  onChange={handleChangeText} ></textarea>
  </div>
  <div className=" marginbot col-md-2 m-auto">
    <label>Fecha de entrega:</label>
    </div>
    <div className=" marginbot col-md-4">
    <input
    type="date"
    className="form-control border "
    placeholder="Fecha de Entrega"
    name='promised'
    id='promised'
    onChange={handleChangeText} />
  </div>

  <div className="col-md-3 marginbot">
    <input
    type="number"
    className="form-control border border-success"
    placeholder="Seña"
    name='seña'
    id='seña'
    onChange={handleChangeText} />
  </div>

  <div className="col-md-3 marginbot">
    <input
    type="number"
    className="form-control border border-warning"
    placeholder="Precio acordado"
    name='pacord'
    id='pacord'
    onChange={handleChangeText} />
  </div>
 




<div className='row col-md-12 justify-content-end'>

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
    onClick={hideNewOrder}>
      X</span>

      </div>

</div>



</div>



    )
}

export default ModalSingleClien
