import {useContext, useState,useEffect, useCallback} from 'react';
import Axios from 'axios';
import {IP,PORT} from '../../../env';

import OrderDataContext from '../../../context/OrderDataContext';
import SeOrHideOrdersContext from '../../../context/SeOrHideOrdersContext';
import  './singleOrder.css'
import UserContext from '../../../context/UserContext';

import socket from '../../../io';
// import Orders from './Orders';

export const SingleOrder = () => {

  const {userData}=useContext(UserContext)
  const user = userData.user

  //data en context
  const {dataOrder}=useContext(OrderDataContext);
  //id orden perteneciente
  const idOrder =dataOrder[0]._id;

  const [messageData, setMessageData] = useState([]);

  //datos del mensaje
  const [msg, setMsg]=useState("");
  const [reparation, setReparation]=useState(idOrder);
  const [userid, setUserid]=useState(user.id);
  //passwor de validacion
  const [password, setPassword]=useState("");

//Cerrar ventana
const {setSeOrHideOrder}=useContext(SeOrHideOrdersContext);

//editar estado
const [state, setState] = useState([]);


// condicional el render
const [render,setRender]=useState(true);

const showClients = () =>{
  setSeOrHideOrder(false)
}

// const handleChangeText = (e)=>{

// }
const actualizarDatos = useCallback(() =>{


  setReparation(idOrder)
  setUserid(user.id)

},[idOrder,user.id])


const listAllMsgs = useCallback(() =>{
  socket.emit('message');

  socket.on('messages', data=>{
    setMessageData(data);
  })
},[]);

useEffect(()=>{
  listAllMsgs();
},[listAllMsgs])

useEffect(()=>{
  if(render===true){
  actualizarDatos();

}
return()=>{
  setRender(false)
};
},[actualizarDatos,render])




  console.log("Soy Single Order")


  const chargeNewState = async (e) =>{
    try {

      let orderData = dataOrder;
      setState({...orderData[0], state:e});

    } catch (error) {
      console.log(error)
    }
  }
//Enviar mensaje
  const sendMessage = async () =>{
      
    try { 
      
      //importamos la clave
      const validateUser = {password}

      //validamos el usuario solo con la pw
      const userLogRes = await Axios.post(`http://${IP}:${PORT}/identificando/login`,validateUser);

      //cargamos el nombre en una variable
      let nameIdentify = userLogRes.data.userExisting.name
 
      //empaquetamos
      const newMessage = {name:nameIdentify,reparation,msg,userid }

      //validamos los datos
      const token = localStorage.getItem('auth-token');
      const config = { headers:{
        'labLERsst-auth-token':token
      }};

      // enviamos la info con el token
      await Axios.post(`http://${IP}:${PORT}/mensajes/nuevoMensaje`,newMessage, config);
  
 


      let orderData = dataOrder;

      await Axios.put(`http://${IP}:${PORT}/reparaciones/` + orderData[0]._id, state, config );


      socket.emit('message');

      
    } catch (error) {
      console.log(error)
    }
  };




  

    return (
      <div className=''>

{/* modal */}

<div className="modal fade" id="validateUser" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Confirme el usuario antes de agregar</h5>
      </div>
      <div className="modal-body">


      <div className='container'>




  <div className='form-group'>
    <label htmlFor='password'>Ingrese su contraseña</label>
     <input
     onChange={(e)=>setPassword(e.target.value)}
     name='password' 
      id='password'
      type='password'
     className="form-control"
     placeholder='Ingrese su contraseña'
     />
     </div>
     


</div>


      </div>
      <div className="modal-footer m-auto">
      <div className=''>
              <select
                className="custom-select "
                id="state"
                name='state'
                defaultValue='disabled'
                onChange={(e)=>chargeNewState(e.target.value)}
                >
        <option  disabled value='disabled'>Estado Inicial</option>
        <option >A Reparar</option>
        <option >Garantia</option>
        <option >Retirar En Domicilio</option>
        <option >En Reparacion</option>
        <option >Llamar Al Cliente</option>
        <option >Entregar Sin Reparacion</option>
        <option >Listo Para Entregar</option>
      </select>
      </div>

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
          
      </div>
    </div>
  </div>
</div>



        <div className='modal-header'>
            <div className='titleFontSingleOrder'>
              {
                dataOrder.map(order=>{
                  return(
                    <span
                    key={order._id}
                    >
                    Orden N°:&nbsp;{order.numberid}
                  </span>
                  )
                })
              }
            </div>
            <div className=''>
              <button
                onClick={showClients}
                className='btn btn-outline-danger'
                  >Cerrar</button>
            </div>

        </div>


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
<span className='op50'>
Estado:&nbsp;&nbsp;</span>
<span className='spanData text-break'>{order.state}</span></label>



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
      return (



        
        <div key={msg._id} className='row border-bottom  mt-1 '>
           <span className='text-muted col-sm-4 text-left'>{msg.name}</span>
          <span className='text-muted col-sm-8 text-right'>{msg.createdAt}</span>
    
          <p className='col-sm-12 text-info text-break text-left'>{msg.msg}</p>
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
