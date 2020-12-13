import { useState, useEffect, useCallback}  from 'react';
import Axios from 'axios';
import {IP, PORT} from '../../../env'

import {useLocation} from "react-router-dom"

import './singleClient.css'

import socket from '../../../io';
import ModalValidate from '../modals/Modal_Validate';

const SingleClient = ({setSeOrHideNewOrder,setSeOrHideNewClient,setSeOrHideOrder, setSeOrHideOrders,setDataOrder, dataClient, setDataClient, hideAndSeeData, setHideAndSeeData, setSeeClient, setError}) => {



  let location = useLocation();
  let loc = location.pathname

  const initialState={
    name:dataClient[0].name,
    lastname:dataClient[0].lastname,
    dni:dataClient[0].dni,
    address:dataClient[0].address,
    codigo:dataClient[0].codigo,
    prefijo:dataClient[0].prefijo,
    telephone:dataClient[0].telephone,
    fijo:dataClient[0].fijo,
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
      if(loc==="/taller")
      {
        setSeOrHideOrders(true)
        // setSeOrHideOrder(false)
    setTimeout(function(){
      let idOrders = document.getElementById('idOrders');
      idOrders.classList.remove('col-lg-12')
      idOrders.classList.add('col-lg-6')
   
    },100)
      } else {
        setSeOrHideOrders(true)
        setSeOrHideNewOrder(false)
        setSeOrHideOrder(false)
      }

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
      if(loc === "/taller"){
      setSeeClient(false)
      } 
    }



    // filtro de busqueda de orden de trabajo
    let searchFilter = orders.filter(function(order){
      if(order.client === dataClient[0]._id){
        return order
      } else {
        return (null)
      }
    }).filter(function(order){
      if (searchOrders === "") {
        return order.state.toString().includes(searchOrdersForState.toString())
       
      }
      
      if(order.numberid.toString() === searchOrders.toString()){
        
      return order.numberid.toString().includes(searchOrders.toString())
      
    }  else {
          return(null)
        }})

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


      const goToWP = (e) =>{
     
        try {
          const ventana = window.open(`https://api.whatsapp.com/send?phone=${e}`,"_blank");
          setTimeout(function(){
              ventana.close();
          }, 10000); /* 10 Segundos*/
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
 const userLogRes = await Axios.post(`http://${IP}:${PORT}/identificando/login`,
 validateUser,config);

 //cargamos el nombre en una variable
 let nameIdentify = userLogRes.data.userExisting.name

 if(nameIdentify){




  let {name,
    lastname,
    dni,
    address,
    codigo,
    prefijo,
    telephone,
    fijo,
    email,
    city,
    observation} =editClientData
  
    if(name===""){
      name=dataClient[0].name
    }
    if(lastname===""){
      lastname=dataClient[0].lastname
    }
    if(dni===""){
      dni=dataClient[0].dni
    }
    if(address===""){
      address=dataClient[0].address
    }
    if(codigo===""){
      codigo=dataClient[0].codigo
    }
    if(prefijo===""){
      prefijo=dataClient[0].prefijo
    }
    if(telephone===""){
      telephone=dataClient[0].telephone
    }
    if(fijo===""){
      fijo=dataClient[0].fijo
    }
    if(email===""){
      email=dataClient[0].email
    }
    if(city===""){
      city=dataClient[0].city
    }
    if(observation===""){
      observation=dataClient[0].observation
    }
  



         await Axios.put(`http://${IP}:${PORT}/clientes/` + dataClient[0]._id, 
         {name,
         lastname,
         dni,
         address,
         codigo,
         prefijo,
         telephone,
         fijo,
         email,
         city,
         observation} , config );

         
        socket.emit('cliente');
        let client = await Axios.get(`http://${IP}:${PORT}/clientes/` + idClient, config);

        setDataClient(client?.data);
        setHideAndSeeData(false);
}

  setPassword(undefined)
  document.getElementById("password").value= ""
        } catch (err) {
          err.response.data.msg && 
          setError(err.response.data.msg);
        }
      }
   
        // console.log("Soy SingleCLient")


        let fecha =  new Date();

        fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset()/60)
      
  
         //Año
         let year = fecha.getFullYear();
         //Mes
       let  mes = fecha.getMonth() + 1;
         //Día
       let  dia = fecha.getDate() ;
   
   
       let dayToStringEdit = dia.toString()
       if(dayToStringEdit.length === 1){
         dia = "0" + dia
       }
   
       let mesToStringEdit = mes.toString()
       if(mesToStringEdit.length === 1){
         mes = "0" + mes
       }
   
   
         //Lo ordenas a gusto.
       let dateNowComplete = dia + "/" + mes + "/" + year;

    return (
        <div className='test'>



          <ModalValidate setPassword={setPassword} sendEditClient={sendEditClient} />



          

        {/* informacion de */}
      <div className='modal-header '>

        <div className='text-break titleFont '>
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
  
  
 <div className="button-group mb-n4">

 <span
  className=' btn btn-editar text-success mr-4'
  data-toggle="modal" data-target="#confirmEditClient"
  // onClick={()=>sendEditClient()}
  >
     ✔
 </span> 
 <span
  className='btn btn-close text-danger'
  onClick={()=>cancelEdit()}>
    X
 </span> 
 </div>
  :

 <div className="button-group">
        <span
           className=' btn btn-editar text-warning'
           onClick={()=>editClientOn()}>
              ?
          </span>
          <span
           className='btn btn-close text-danger'
           onClick={()=>backToOrders()}>
              X
          </span>

          </div>

}
        
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
<span className='op50 textchiquito'>Nombre:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.name}</span>
</label>
<label
className=' col-lg-6' >
<span className='op50 textchiquito'>Apellido:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.lastname}</span>
</label>

</div>

<div className='input-group mb-1 '>
<label
className=' col-lg-6' >
<span className='op50 textchiquito'>Dirección:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.address}</span>
</label>
<label
className=' col-lg-6' >
<span className='op50 textchiquito'>Ciudad:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.city}</span></label>
</div>
<div className='input-group '>


<label
className=' col-lg-6' >
<span 
className='op50 textchiquito'
>Teléfono:</span>&nbsp;&nbsp;
<span className='spanData ml-n3 btn btn-link text-break'
 title={client.prefijo + " " +client.codigo + "-" + client.telephone}
onClick={(e)=>goToWP(e.target.title)}
>{client.prefijo + " " + client.codigo + "-" + client.telephone}</span>
</label>


<label
className=' col-lg-6' >
  <span className='op50 textchiquito'>Dni:</span>&nbsp;&nbsp;
  <span className='spanData text-break'>{client.dni}</span>
  </label>
</div>
<div className='input-group mb-1 '>
{

client.fijo === "" ? null :

<label
className=' col-lg-6' >
<span className='op50 textchiquito'>Teléfono fijo:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.fijo}</span></label>


}

<label
className=' col-lg-6' >
<span className='op50 textchiquito'>Email:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{client.email}</span>
</label>
<label
className=' col-lg-6' >
<span className='op50 textchiquito'>Observación:</span>&nbsp;&nbsp;
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
    placeholder={initialState.codigo === ""?"Codigo":initialState.codigo}
    name='codigo'
    id='codigo'
    onChange={handleChangeText} />
    </label>
    <label
className='col-lg-5' >
    <input
    type="text"
    className="form-control"
    placeholder={initialState.telephone==="" ?"Teléfono celular" : initialState.telephone}
    name='telephone'
    id='telephone'
    onChange={handleChangeText} />
</label>

</div>
<div className='input-group  '>
<label
className='col-lg-5' >
    <input
    type="text"
    className="form-control"
    placeholder={initialState.fijo===""? "Teléfono fijo":initialState.fijo}
    name='fijo'
    id='fijo'
    onChange={handleChangeText} />
</label>
<label
className=' col-lg-7' >
  <input
    type="email"
    className="form-control"
    placeholder={initialState.email === "" ? "Email" : initialState.email }
    name='email'
    id='email'
    onChange={handleChangeText} />
</label>

</div>
</div>
         
</div>

}




        {/* Barra de busqueda y botones de accion */}
        <div className='input-group mt-1 '>
               <button
              onClick={showNewOrder}
              className='btn btn-info rig'
              >
                  +
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
        <option >a revisar</option>
        <option >ir a domicilio</option>
        <option >entregado</option>
        <option >llamar al cliente</option>
        <option >reparacion aceptada</option>
        <option >reparacion cancelada</option>
        <option >listo para entregar</option>
        <option >listo sin reparacion</option>
        <option >anulado</option>
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





        {/* ordenes de trabajo */}
        <div className='wid mt-1'>

          <table  className="table table-sm ">
          <thead>
    <tr>
    <th scope="col">N°</th>
      <th scope="col">Tipo</th>
      <th scope="col">Marca</th>
      <th scope="col">Estado</th>
      <th scope="col">Fecha de entrega</th>
    </tr>
  </thead>

          </table>
 <div className="overflowSingle">
 <table className="table table-sm table-hover  ">

<tbody>
    {

searchFilter.slice(0, 2550).sort(function(a, b){return a-b}).map(order =>{


  let fecha =  new Date(order.promised);

  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset()/60)
    //Año
  let year = fecha.getFullYear();
    //Mes
  let  mes = fecha.getMonth() + 1;
    //Día
  let  dia = fecha.getDate() +1 ;


  let dayToStringEdit = dia.toString()
  if(dayToStringEdit.length === 1){
    dia = "0" + dia
  }

  let mesToStringEdit = mes.toString()
  if(mesToStringEdit.length === 1){
    mes = "0" + mes
  }


    //Lo ordenas a gusto.
  let dateEdit = dia + "/" + mes + "/" + year;


  function FechaDeEntrega(){
    try {
      if(dateNowComplete === dateEdit) {
        return (
          <td className="text-break text-warning">{dateEdit}</td>
        )
      } 
      
    
      if(dateNowComplete > dateEdit) {
        return (
          <td className="text-break text-danger">{dateEdit}</td>
        )
      }
      if(order.state === "entregado"){
       return(
          <td className="text-break text-success">{dateEdit}</td>
       )
      } 
      
      else {
        return (
        <td className="text-break ">{dateEdit}</td>)
      }
    } catch (error) {
      console.log(error)
    }
}




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
                    {
                       
                       order.promised === null|| order.promised === undefined ?

                     <td className="text-break text-warning"></td>
                      
                     :
                     
                   
                      
                      <FechaDeEntrega/>
                     
                      
                   

                     }
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
