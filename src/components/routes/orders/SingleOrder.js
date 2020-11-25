import {useContext, useState,useEffect, useCallback} from 'react';
import Axios from 'axios';
import {IP,PORT} from '../../../env';

import  './singleOrder.css'
import UserContext from '../../../context/UserContext';

import socket from '../../../io';
import ModalCreateMessage from '../modals/Modal_CreateMessage';


export const SingleOrder = ({dataOrder,setSeOrHideOrder}) => {

  const {userData}=useContext(UserContext)
  const user = userData.user

  const [messageData, setMessageData] = useState([]);

  //datos del mensaje
  const [msg, setMsg]=useState("");
  const [reparation, setReparation]=useState(dataOrder[0]._id);
  const [userid, setUserid]=useState(user.id);
  //passwor de validacion
  const [password, setPassword]=useState("");

//Cerrar ventana
// const {setSeOrHideOrder}=useContext(SeOrHideOrdersContext);

//editar estado
const [state, setState] = useState([]);


// condicional el render
const [render,setRender]=useState(true);

//Mostrar Clientes o cerrar single order
const showClients = () =>{
  setSeOrHideOrder(false)
}

//Actualizar datos de ordenes
const actualizarDatos = useCallback(() =>{
  setReparation(dataOrder[0]._id)
  setUserid(user.id)
},[dataOrder,user.id])

// todos los mensajes
const listAllMsgs = useCallback(() =>{
  socket.emit('message');
  socket.on('messages', data=>{
    setMessageData(data);
  })
},[]);

//ejecutamos todos los mensajes
useEffect(()=>{
  listAllMsgs();
},[listAllMsgs])

//ejecutamos todos los datos.
useEffect(()=>{
  if(render===true){
  actualizarDatos();
}
return()=>{
  setRender(false)
};
},[listAllMsgs,actualizarDatos,render])

  console.log("Soy Single Order")

  //cambiamos el state
  const chargeNewState = async (e) =>{
    try {
      setState({...dataOrder[0], state:e});
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
      
 
      //empaquetamos
      const newMessage = {
        name:nameIdentify,
        reparation,
        msg,
        userid,
        stateEdit:state.state }

     if(nameIdentify){

      // enviamos la info con el token
      await Axios.post(`http://${IP}:${PORT}/mensajes/nuevoMensaje`,newMessage, config);
  
      if(state?.state){

      await Axios.put(`http://${IP}:${PORT}/reparaciones/` + dataOrder[0]._id, state, config );
        let stateValue =  document.getElementById('spanState');
        let stateValueTitle =  document.getElementById('spanStateTitle');
        stateValueTitle.innerHTML = "Editado: "
        stateValue.innerHTML = state.state;

        let stateValueSelect = document.getElementById('state');
        stateValueSelect.selectedIndex = 0;
        
        console.log(stateValueSelect.value)
        socket.emit('order');
        setState([])

      }
        socket.emit('message'); 

     }
    } catch (error) {
      console.log(error)
    }
  };


    return (
      <div className=''>

{/* modal */}

<ModalCreateMessage chargeNewState={chargeNewState} setPassword={setPassword} sendMessage={sendMessage} showClients={showClients} dataOrder={dataOrder} />

  {/* info del orden */}
<div className='mt-1 text-left border rounded'>
{
      dataOrder.map(order =>{
          return(
<div key={order._id} className=''>

<div className='input-group mb-1'>

<label
className=' col-lg-6' >
<span className='op50'>
Tipo:&nbsp;&nbsp;</span>
<span className='spanData text-break'>{order.type}</span>
</label>
<label
className=' col-lg-6' >
<span className='op50'>
Marca:&nbsp;&nbsp;</span>
<span className='spanData text-break'>{order.brand}</span>
</label>




</div>



<div className='input-group mb-1'>
<label
className=' col-lg-6' >
<span className='op50'>
Modelo:&nbsp;&nbsp;</span>
<span className='spanData text-break'>{order.model}</span>
</label>
<label
className=' col-lg-6' >
<span className='op50'>
N° Serie:&nbsp;&nbsp;</span>
<span className='spanData text-break'>{order.nserie}</span>
</label>

</div>

<div className='input-group mb-1'>
<label
className=' col-lg-12' >
<span id='spanStateTitle' className='op50'>
Estado:&nbsp;&nbsp;</span>
<span className='spanData text-break' id='spanState'>{order.state}</span></label>



</div>

<div className='input-group mb-1'>
<label
className=' col-lg-6' >
<span className='op50'>
Falla:&nbsp;&nbsp;</span>
<span className='text-break spanData'>{order.failure}</span>
</label>

<div className='col-lg-6' >
<label
>
<span className='op50'>
Observaciones:&nbsp;&nbsp;</span>
<span className=' text-break spanData'>{order.observation}</span>
</label>
</div>


</div>
</div>
         )
      })
  }


</div>

<div className='col-lg-12  mt-3'>
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

           {

        msg.stateEdit === undefined ? 
        null
        : <>
          <span className='col-sm-12 text-right fotns sizemenos15'> 
          <span className='text-muted '>Se cambio a:</span>
          &nbsp;
        "{msg.stateEdit}"</span>
</>

}
          
    
          

      
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
