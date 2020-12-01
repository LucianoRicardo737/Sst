import { useState, useEffect, useCallback}  from 'react';
import Axios from 'axios';
import {IP, PORT} from '../../../env'


import './singleClient.css'

import socket from '../../../io';
import ModalValidate from '../modals/Modal_Validate';

const SingleClient = ({setSeOrHideNewOrder,setSeOrHideNewClient,setSeOrHideOrder, setSeOrHideOrders,setDataOrder, dataClient, setDataClient, hideAndSeeData, setHideAndSeeData}) => {

  const initialState={
    name:dataClient[0].name,
    lastname:dataClient[0].lastname,
    dni:dataClient[0].dni,
    address:dataClient[0].address,
    codigo:dataClient[0].codigo,
    prefijo:dataClient[0].prefijo,
    telephone:dataClient[0].telephone,
    email:dataClient[0].email,
    city:dataClient[0].city,
    observation:dataClient[0].observation
  }

    //Setear parametros de busqueda de ordenes
    const [searchOrders, setSearchOrders]=useState("");

    //seteo de ordenes
    const [orders,setOrders]=useState([]);

      //passwor de validacion
    const [password, setPassword]=useState("");   

    
    const [idClient] = useState(dataClient[0]._id)
      // condicional el render
    const [render,setRender]=useState(true);

    const [editClientData, setEditClientData]=useState(initialState)
    


    const [searchOrdersForState,setSearchOrdersForState]=useState("");

  //estados de carga de datos de variables
    const [stateData, setStateData]=useState([]);

const showNewOrder = () =>{
  setSeOrHideNewClient(false)
  setSeOrHideNewOrder(true)

  setSearchOrders("");
  document.getElementById('searchOrder').value = "";

  setTimeout(function(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  },200);
}


const searchForState = (e) =>{
  document.getElementById('searchOrder').value = ""
  setSearchOrders("")
  setSearchOrdersForState(e)
}
const clearClick = () =>{
  setSearchOrders("")
  setSearchOrdersForState("");
  document.getElementById('searchOrder').value = ""
  document.getElementById('state').value = "disabled"
}
  //cargar los estados de reparacion
  const SeeData = useCallback(async () =>{
    let token = localStorage.getItem('auth-token');
    let config = {headers:{
      'labLERsst-auth-token': token
    }};


    let states = await Axios.get(`http://${IP}:${PORT}/generales/estados`, config);

    setStateData(states?.data);


    
      // console.log("Ver data")
  },[])



useEffect(() => {
if(render===true){
SeeData()
}
return () => {
  setRender(false)
}
}, [SeeData, render])

const listAllOrders =  useCallback( () =>{
    try {
      socket.emit('order');
      socket.on('orders', orders=>{
        if(orders){
        setOrders(orders);
      }
      })
    } catch (error) {
      console.log(error)
    }
  },[]);

  useEffect(()=>{
    if(render===true){
    listAllOrders();
  }
  return()=>{
    setRender(false)
  }
},[listAllOrders, render]);

    //ir a ordenes
    const backToOrders = ()=>{
        setSeOrHideOrders(true)
        setSeOrHideNewOrder(false)
        setSeOrHideOrder(false)

    }


    //setear datos de la orden
    const seeOrder = async (e)=>{
      let token = localStorage.getItem('auth-token');
      let config = {headers:{
        'labLERsst-auth-token': token
      }};
      let order = await Axios.get(`http://${IP}:${PORT}/reparaciones/` + e, config);
      setDataOrder(order.data);
      setSeOrHideOrder(true);
    }



    // filtro de busqueda de orden de trabajo
    let searchFilter = orders.filter(function(order){
      if (searchOrders === "") {
        return order.state.toString().includes(searchOrdersForState.toString())
       
      }
      
      if(order.numberid.toString() === searchOrders.toString()){
        
      return order.numberid.toString().includes(searchOrders.toString())
      
    }  else {
          return(null)

        }

      }

      )
      

      // useEffect(()=>{

      // },)

      const editClientOn = () =>{
      //  let infoClient = document.getElementById('dataClient')
     try {
      setHideAndSeeData(true)
     } catch (error) {
       console.log(error)
     }
      }

      const cancelEdit = () =>{
       try {
        setHideAndSeeData(false)
       } catch (error) {
         console.log(error)
       }
      }

      const handleChangeText = (e)=>{
        try {
          setEditClientData({...editClientData, [e.target.name]:e.target.value});
      
        } catch (error) {
          console.log(error)
        }
      }

      const sendEditClient = async () =>{
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
          
         await Axios.put(`http://${IP}:${PORT}/clientes/` + dataClient[0]._id, editClientData, config );
         
        socket.emit('cliente');
      
        let client = await Axios.get(`http://${IP}:${PORT}/clientes/` + idClient, config);



        setDataClient(client?.data);
        setHideAndSeeData(false);

}

  setPassword(undefined)
  document.getElementById("password").value= ""


        } catch (error) {
          console.log(error)
        }
      }
   
        // console.log("Soy SingleCLient")

    return (

      
        <div className=''>

          <ModalValidate setPassword={setPassword} sendEditClient={sendEditClient} />

        {/* informacion de */}
      <div className='modal-header '>

        <div className='text-break titleFont'>
        {
                dataClient.map(client=>{
                    return(
                    <span  key={client._id}>{client.name}&nbsp;{client.lastname}</span>
                    )
                })
            }
        </div>
        
{
  hideAndSeeData === true ?
  
 <div className="button-group">
  <button
  className='btn btn-outline-danger rig'
  onClick={()=>cancelEdit()}>
     Cancelar Edicion
 </button> 
 <button
  className='btn btn-outline-success lef'
  data-toggle="modal" data-target="#confirmEditClient"
  // onClick={()=>sendEditClient()}
  >
     Confirmar
 </button> 
 </div>
  :

 <div className="button-group">
        <button
           className='btn btn-outline-warning rig'
           onClick={()=>editClientOn()}>
              Editar
          </button>
          <button
           className='btn btn-outline-danger lef'
           onClick={()=>backToOrders()}>
              Cerrar
          </button>

          </div>

}
        
      </div>

        {/* Barra de busqueda y botones de accion */}
             <div className='input-group mt-1 '>
               <button
              onClick={showNewOrder}
              className='btn btn-info rig'
              >
                  Nueva Orden
              </button>
            <input
            placeholder='Buscar por numero'
            id='searchOrder'
            type='text'
            className='form-control border border-info '
            onClick={()=>{clearClick()}}
            onChange={(e)=>setSearchOrders(e.target.value)}
            />
            <select
className="custom-select border border-info"
id="state"
name='state'
defaultValue='disabled'
onChange={(e)=>searchForState(e.target.value)}
>
        <option  disabled value='disabled'>Buscar por Estado</option>
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

        {/* info del cliente */}
{
  hideAndSeeData === false ? 
  <div id="dataClient" className='mt-1  text-left border rounded'>

  {
        dataClient.map(client =>{
            return(
<div key={client._id} className='mt-1'>
<div className='input-group mb-1'>

<label
className=' col-lg-6' >
<span className='op50'>Nombre:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.name}</span>
</label>
<label
className=' col-lg-6' >
<span className='op50'>Apellido:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.lastname}</span>
</label>

</div>

<div className='input-group mb-1 '>
<label
className=' col-lg-6' >
<span className='op50'>Dirección:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.address}</span>
</label>
<label
className=' col-lg-6' >
<span className='op50'>Ciudad:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.city}</span></label>
</div>
<div className='input-group '>
<label
className=' col-lg-6' >
<span 
className='op50'
>Teléfono:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.prefijo + " " + client.codigo + "-" + client.telephone}</span>
</label>
<label
className=' col-lg-6' >
  <span className='op50'>Dni:</span>&nbsp;&nbsp;
  <span className='spanData text-break'>{client.dni}</span>
  </label>
</div>
<div className='input-group mb-1 '>
<label
className=' col-lg-6' >
<span className='op50'>Email:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.email}</span>
</label>
<label
className=' col-lg-6' >
<span className='op50'>Observación:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.observation}</span>
</label>
</div>
</div>
           )
        })
    }
  </div>
:
<div id="editClient" className='mt-1  text-left border rounded'>


<div  className='mt-2'>
<div className='input-group '>

<label
className=' col-lg-4' >
<input
    type="text"
    className="form-control"
    placeholder={initialState.name}
    name='name'
    id='name'
    onChange={handleChangeText} />
</label>
<label
className=' col-lg-4' >
<input
    type="text"
    className="form-control"
    placeholder={initialState.lastname}
    name='lastname'
    id='lastname'
    onChange={handleChangeText} />
</label>
<label
className=' col-lg-4' >
  <input
    type="number"
    className="form-control"
    placeholder={initialState.dni}
    name='dni'
    id='dni'
    onChange={handleChangeText} />
</label>

</div>

<div className='input-group '>
<label
className=' col-lg-6' >
  <input
    type="text"
    className="form-control"
    placeholder={initialState.address}
    name='address'
    id='address'
    onChange={handleChangeText} />
</label>
<label
className=' col-lg-6' >
  <input
    type="text"
    className="form-control"
    placeholder={initialState.city}
    name='city'
    id='city'
    onChange={handleChangeText} />
</label>
</div>


<div className='input-group '>
<label
className=' col-lg-3' >
  <input
    type="text"
    className="form-control "
    placeholder={initialState.prefijo}
    name='prefijo'
    id='prefijo'
    onChange={handleChangeText} />
    </label>
    <label
className='col-lg-4' >
    <input
    type="text"
    className="form-control"
    placeholder={initialState.codigo}
    name='codigo'
    id='codigo'
    onChange={handleChangeText} />
    </label>
    <label
className='col-lg-5' >
    <input
    type="text"
    className="form-control"
    placeholder={initialState.telephone}
    name='telephone'
    id='telephone'
    onChange={handleChangeText} />
</label>

</div>
<div className='input-group  '>
<label
className=' col-lg-12' >
  <input
    type="email"
    className="form-control"
    placeholder={initialState.email}
    name='email'
    id='email'
    onChange={handleChangeText} />
</label>

</div>
</div>
         
</div>

}
        {/* ordenes de trabajo */}
        <div className='wid mt-1'>

          <table  className="table table-sm ">
          <thead>
    <tr>
      <th scope="col">N°</th>
      <th scope="col">Tipo</th>
      <th scope="col">Marca</th>
      <th scope="col">Estado</th>
    </tr>
  </thead>

          </table>
 <div className="overflowSingle">
 <table className="table table-sm table-hover  ">

<tbody>
    {

searchFilter.slice(0, 2550).sort(function(a, b){return a-b}).map(order =>{
        return(
          <tr key={order._id}>
        <th scope='row'><button
                        value={order._id}
                        onClick={(e)=>seeOrder(e.target.value)}
                        className='btn btn-link'>
                         {order.numberid}
                        </button></th>
                    <td>{order.type}</td>
                    <td>{order.brand}</td>
                    <td>{order.state}</td>
                    <td>
                        
                    </td>
          </tr>
        )
      })
    }
</tbody>
</table>


 </div>
</div>

        </div>


    )
}

export default SingleClient
