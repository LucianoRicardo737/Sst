import {useContext, useState,useEffect, useCallback} from 'react';
import Axios from 'axios';
import {IP,PORT} from '../../../env';

import  './singleOrder.css'
import UserContext from '../../../context/UserContext';

import socket from '../../../io';
import ModalCreateMessage from '../modals/Modal_CreateMessage';


export const SingleOrder = ({dataOrder,setDataOrder,setSeOrHideOrder, dataClient,setDataClient,setSeOrHideOrders}) => {

  const {userData}=useContext(UserContext)
  const user = userData.user

  const [messageData, setMessageData] = useState([]);


  //datos del mensaje
  const [msg, setMsg]=useState("");
  const [reparation, setReparation]=useState(dataOrder[0]._id);
  const [userid, setUserid]=useState(user.id);
  //passwor de validacion
  const [password, setPassword]=useState("");
 


const [newState, setNewState] = useState(undefined);

// condicional el render
const [render,setRender]=useState(true);

//editar orden
// const [price, setPrice] = useState("")
const [sendNewPrice, setSendNewPrice] = useState([])


//Mostrar Clientes o cerrar single order
const showClients = () =>{
  setSeOrHideOrder(false)
}

//Actualizar datos de ordenes
const actualizarDatos = useCallback(() =>{
  setReparation(dataOrder[0]._id)
  setUserid(user.id)

  socket.emit('message');
    socket.on('messages', data=>{
    setMessageData(data);
    })
},[dataOrder,user.id,setMessageData])


useEffect(()=>{
  setSendNewPrice(dataOrder[0]);

  return()=>{
    setRender(false)
  };
},[dataOrder,render,])


useEffect(()=>{
  actualizarDatos();
  return()=>{
    setRender(false)
  };
},[dataOrder,actualizarDatos,render,setMessageData])





  const chargeNewPrice =  (e) =>{
    try {

      setSendNewPrice({...sendNewPrice, [e.target.name]:e.target.value}); 

    } catch (error) {
      console.log(error)
    }
  }



//Enviar mensaje
  const sendMessage = async () =>{
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
 
    

            //se guarda la data

      await Axios.put(`http://${IP}:${PORT}/reparaciones/` + dataOrder[0]._id, sendNewPrice, config );


      socket.emit('order');

      //condicional si no son iguales al anterior, se edita. Sino no. Pero tengo dudas
      if(sendNewPrice.pacord !== dataOrder[0].pacord||sendNewPrice.seña !== dataOrder[0].seña){
        //definimos que al no ser igual al dato viejo, sera una variable con el dato nuevo
      let señaUndefined = sendNewPrice.seña
        //y si son iguales a vacio que use el anterior. esto esta muy rebuscado.
      if(
        señaUndefined === ""||
        señaUndefined === undefined){
        setSendNewPrice({...sendNewPrice, seña:dataOrder[0].seña})
      }
    }
      
    

    let estadoEditado = undefined
    if(sendNewPrice.state === newState)
    { 
      estadoEditado = sendNewPrice.state
    }else{
      estadoEditado = undefined
    }


    let newPrice = document.getElementById('newPrice').value
    let nuevaEntrega = document.getElementById('nuevaEntrega').value

    if(newPrice === ""){
      newPrice = undefined
    }
   
    if(nuevaEntrega === ""){
      nuevaEntrega = undefined
    }

  //empaquetamos
  const newMessage = {
    name:nameIdentify,
    reparation,
    msg,
    userid,
    stateEdit:estadoEditado,
    pacordEdit:newPrice,
    señaEdit:nuevaEntrega }


  // enviamos la info con el token
  await Axios.post(`http://${IP}:${PORT}/mensajes/nuevoMensaje`,newMessage, config);

  setNewState(undefined)
  setMsg("")

  //y ahi se fue el mensaje.. que anda bien (arriba)

  

    // limpiando los inputs
      let clearInput = document.querySelector("input[type='text'],input[type='number'],textarea,input[type='password']");
      let clearInputs=document.querySelectorAll("input[type='text'],input[type='number'],textarea,input[type='password']");
      for(let clearInput of clearInputs)
      clearInput.value = "";
      
      let stateValueSelect = document.getElementById('state');
      stateValueSelect.selectedIndex = 0;
      console.log(clearInput)

      document.getElementById('password').value = ""
     
      
      setPassword()
   
    


        socket.emit('message'); 

        let order = await Axios.get(`http://${IP}:${PORT}/reparaciones/` + sendNewPrice._id, config);

     
  
    
        setDataOrder(order?.data);
     }
    } catch (error) {
      console.log(error)
    }
  };





     //ver cliente
     const seeClient = async (e)=>{
      let token = localStorage.getItem('auth-token');

      let config = {headers:{
        'labLERsst-auth-token': token
      }};


      let client = await Axios.get(`http://${IP}:${PORT}/clientes/` + e, config);


      setDataClient(client?.data);
      setSeOrHideOrders(false);

    }

 


    return (
      <div className='singleorder'>

{/* modal */}

<ModalCreateMessage setPassword={setPassword} sendMessage={sendMessage}  showClients={showClients} dataOrder={dataOrder} password={password}  setSendNewPrice={setSendNewPrice} chargeNewPrice={chargeNewPrice} setNewState={setNewState}  />




  {/* info del orden */}
<div className='mt-1 text-left border rounded'>




<div className='row'>

{

      <div 
      
    title={dataClient[0]._id}
    onClick={(e)=> seeClient(e.target.title)}
      className="mb-1 ml-2 btn-link point col-lg-6">
      {dataClient[0].name}&nbsp;&nbsp;{dataClient[0].lastname}
      </div>
   
 
}






</div>
{
      dataOrder.map(order =>{

        let  n =  new Date(order.promised);
        //Año
      let y = n.getFullYear();
        //Mes
      let  m = n.getMonth() + 1;
        //Día
      let  d = n.getDate();
  
  
        //Lo ordenas a gusto.
      let date = d + "/" + m + "/" + y;


          return(
<div key={order._id} className=''>

<div className='input-group mb-1'>

<label
className=' col-lg-6' >
<span className='op50 textchiquito'>
Tipo:&nbsp;&nbsp;</span>
<span className='spanData text-break'>{order.type}</span>
</label>
<label
className=' col-lg-6' >
<span className='op50 textchiquito'>
Marca:&nbsp;&nbsp;</span>
<span className='spanData text-break'>{order.brand}</span>
</label>




</div>



<div className='input-group mb-1'>
<label
className=' col-lg-6' >
<span className='op50 textchiquito'>
Modelo:&nbsp;&nbsp;</span>
<span className='spanData text-break'>{order.model}</span>
</label>
<label
className=' col-lg-6' >
<span className='op50 textchiquito'>
N° Serie:&nbsp;&nbsp;</span>
<span className='spanData text-break'>{order.nserie}</span>
</label>

</div>

<div className='input-group mb-1'>
<label
className=' col-lg-6' >
<span id='spanStateTitle' className='op50 textchiquito'>
Estado:&nbsp;&nbsp;</span>
<span className='spanData text-break' id='spanState'>{order.state}</span></label>






<label
className=' col-lg-6' >
<span className='op50 textchiquito'>
Falla:&nbsp;&nbsp;</span>
<span className='text-break spanData'>{order.failure}</span>
</label>
</div>
<div className='input-group mb-1'>
<div className='col-lg-6' >
<label
>
<span className='op50 textchiquito'>
Observaciones:&nbsp;&nbsp;</span>
<span className=' text-break spanData'>{order.observation}</span>
</label>

</div>
 <div className='point col-lg-6'
      >
      <span className='textchiquito op50'>Fecha de entrega:</span>
      
      <span className='text-danger'>{date}</span></div>
  
</div>
</div>
         )
      })
  }


</div>


{

  dataOrder.map(order=>{


    return(

<div key={order._id} className='row mt-1'>

<div className='col-sm-4'>
  <span 
  className='textchiquito op50' 
  id='acordPriceView'
    >Acordado: 
  </span>$ 
  <span id='monto' className='text-break textonotanchiquitojajaja'>{order.pacord} </span>
</div>

<div className='col-sm-4 '>
  <span className='textchiquito op50'>Entrego: </span> ${order.seña} 
</div>




<div className='col-sm-4 '>
  <span className='textchiquito op50'>Resta: </span> <span className=''>${order.pacord - order.seña}</span> 
</div>


</div>
    )
  })
}




<div className='col-lg-12  mt-1'>
<div className='input-group'>


<input
type="text"
className="form-control border border-info "
placeholder="Mensaje"
name='msg'
id='msg' 
onChange={(e)=>setMsg(e.target.value)}/>
<button
data-toggle="modal" data-target="#validateUser"
className='btn btn-info lef'
type="submit"
  >Enviar</button>


</div>
<div className=' mt-2 '>
<div className="container ovflow">


  {



    messageData.filter(function(msg){
      if(msg.reparation===reparation){
      return( msg)
      } else {
        return(null)

      }

    }).sort(function(a, b){return a-b}).map(msg =>{
     
      let  n =  new Date(msg.createdAt);
        //Año
      let y = n.getFullYear();
        //Mes
      let  m = n.getMonth() + 1;
        //Día
      let  d = n.getDate();
        //hora
      let h = n.getHours();
        //minutos
      let min = n.getMinutes();

        //Lo ordenas a gusto.
      let date = d + "/" + m + "/" + y + " - " + h + ":" + min;


      return (
 

    <div key={msg._id} className='row border-bottom  mt-1 '>

        <span className='text-muted col-sm-4 text-left fotns'>{msg.name}</span>
        <span id='date' className='text-muted col-sm-8 text-right fotns'>{date}</span>
        <p  className='col-sm-12 text-info text-break text-left'>{msg.msg}</p>
        <div className='col-sm-12 text-right'>
           {

        msg.stateEdit === undefined ? 
        null
        : <>
          <span className='col-sm-8 fotns sizemenos15'> 
          <span className='text-muted '>Se cambio a:</span>
          &nbsp;
        "{msg.stateEdit}"</span>
</>


}
          

          {

msg?.pacordEdit === undefined ? 

null
: 
<>

  <span className='col-sm-2 fotns sizemenos15'> 
  <span className='text-muted '>Precio:</span>
  &nbsp;
${msg.pacordEdit}</span>
</>


}
{

msg?.señaEdit === undefined ? 

null
: 
<>

  <span className='col-sm-2 fotns sizemenos15'> 
  <span className='text-muted '>Entrego:</span>
  &nbsp;
${msg.señaEdit}</span>
</>


}
            </div>
    
          
        </div>


      )
    })
  }

</div>
</div>
</div>

      </div>


    )
}
