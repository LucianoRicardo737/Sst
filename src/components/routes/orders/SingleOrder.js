import {useContext, useState,useEffect, useCallback} from 'react';
import Axios from 'axios';
import {IP,PORT} from '../../../env';

import  './singleOrder.css'
import UserContext from '../../../context/UserContext';

import socket from '../../../io';
import ModalCreateMessage from '../modals/Modal_CreateMessage';

// import { motion } from 'framer-motion'

export const SingleOrder = ({dataOrder,setDataOrder,setSeOrHideOrder, dataClient,setDataClient,setSeOrHideOrders,setError, changeBack, loc}) => {



  const initualStateOrder = {
    numberid:"",
    type:"",
    pacord:"",
    seña:"", 
    brand:"", 
    model:"", 
    nserie:"", 
    failure:"",
    state:"", 
    observation:"",
    client:"",
    createdby:"",
    promised:""
  }
  

  const {userData}=useContext(UserContext)
  const user = userData.user

  const [messageData, setMessageData] = useState([]);


  //datos del mensaje
  const [msg, setMsg]=useState("");
  const [reparation, setReparation]=useState(dataOrder[0]._id);
  const [userid, setUserid]=useState(user.id);
  //passwor de validacion
  const [password, setPassword]=useState("");
 

// condicional el render
const [render,setRender]=useState(true);

//editar orden
// const [price, setPrice] = useState("")
const [sendNewPrice, setSendNewPrice] = useState(initualStateOrder)




//Mostrar Clientes o cerrar single order
const showClients = () =>{
  if(loc === "/taller"){
  changeBack()
}
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


      
    


        let {numberid,
          type,
          pacord,
          seña,
          brand,
          model,
          nserie,
          failure,
          state,
          observation,
          client,
          createdby,
          promised} = sendNewPrice

          let dataSeña = seña;
          let dataState = state;
          let dataPacord = pacord;
          let dataPromised = promised;



          type=dataOrder[0].type
       
         
          brand=dataOrder[0].brand 
          model=dataOrder[0].model 
          nserie=dataOrder[0].nserie 
          failure=dataOrder[0].failure
       
          observation=dataOrder[0].observation
          client=dataOrder[0].client
          createdby=dataOrder[0].createdby
        



          if(seña===""){
            dataSeña = dataOrder[0].seña
          }
          if(state===""){
            dataState = dataOrder[0].state
          }
          if(pacord===""){
            dataPacord = dataOrder[0].pacord
          }
          if(promised===""||promised===undefined){
            dataPromised = undefined
          }
       
       
  
            //se guarda la data

      await Axios.put(`http://${IP}:${PORT}/reparaciones/` + dataOrder[0]._id,
      {numberid,
      type,
      pacord:dataPacord,
      seña:dataSeña,
      brand,
      model,
      nserie,
      failure,
      state:dataState,
      observation,
      client,
      createdby,
      promised:dataPromised} , config );

      socket.emit('order');

        setSendNewPrice(initualStateOrder)

    let estadoEditado = undefined
    if(sendNewPrice.state !== initualStateOrder.state)
    { 
      estadoEditado = sendNewPrice.state
    }else{
      estadoEditado = undefined
    }


    let msjPromised = document.getElementById('promised').value

    let fecha =  new Date(msjPromised);

    if(msjPromised === null||msjPromised === undefined||msjPromised === ""){
      msjPromised = undefined
    } else {


      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())

    }
   



    let newPrice = document.getElementById('newPrice').value

    let nuevaEntrega = document.getElementById('nuevaEntrega').value

    if(newPrice === ""){
      newPrice = undefined
    }
   
    if(nuevaEntrega === ""){
      nuevaEntrega = undefined
    }

    // console.log(fecha)

  //empaquetamos
  const newMessage = {
    name:nameIdentify,
    reparation,
    msg,
    userid,
    fechaEdit:fecha,
    stateEdit:estadoEditado,
    pacordEdit:newPrice,
    señaEdit:nuevaEntrega }


  // enviamos la info con el token
  await Axios.post(`http://${IP}:${PORT}/mensajes/nuevoMensaje`,newMessage, config);


  setMsg("")

  //y ahi se fue el mensaje.. que anda bien (arriba)

  

    // limpiando los inputs
      let clearInput = document.querySelector("input[type='text'],input[type='number'],textarea,input[type='password'],input[type='date']");
      let clearInputs=document.querySelectorAll("input[type='text'],input[type='number'],textarea,input[type='password'],input[type='date']");
      for(let clearInput of clearInputs)
      clearInput.value = "";
      
      let stateValueSelect = document.getElementById('state');
      stateValueSelect.selectedIndex = 0;
      
      document.getElementById('password').value = ""
     
      
      setPassword()
   
    


        socket.emit('message'); 

        let order = await Axios.get(`http://${IP}:${PORT}/reparaciones/` + dataOrder[0]._id, config);

     
        setDataOrder(order?.data);
       


     }
    } catch (err) {

 
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
   

      setTimeout(function(){
      err.response.data.msg && 
      setError(err.response.data.msg);
    },350);
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


  const goToWP = (e) =>{
  
    try {


         
      let fecha =  new Date(dataOrder[0].createdAt);
     
      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset()/60)
        //Año
      let y = fecha.getFullYear();
        //Mes
      let  m = fecha.getMonth() +1 ;
        //Día
      let  d = fecha.getDate() +1 ;

      let dayToString = d.toString()
      if(dayToString.length === 1){
        d = "0" + d
      }

      let mesToString = m.toString()
      if(mesToString.length === 1){
        m = "0" + m
      }

      //   //Lo ordenas a gusto.
      let date = d + "/" + m + "/" + y;





      let numeroDeTelefonoCelularParaWhatsapp = dataClient[0].prefijo + dataClient[0].codigo + dataClient[0].telephone


      let mensajeDeWhatsapp = `Orden N°: ${dataOrder[0].numberid} - Durante equipamientos informa que recibió de ${dataClient[0].name} ${dataClient[0].lastname} el día ${date}, un/a ${dataOrder[0].type}, modelo: ${dataOrder[0].model}, numero de serie: ${dataOrder[0].nserie}. Con la siguiente falla: ${dataOrder[0].failure}. Observando que: ${dataOrder[0].observation}.`





      const ventana = window.open(`https://api.whatsapp.com/send?phone=${numeroDeTelefonoCelularParaWhatsapp}&text=${mensajeDeWhatsapp}`,"_blank");
      setTimeout(function(){
          ventana.close();
      }, 10000); /* 10 Segundos*/
     
    } catch (error) {
      console.log(error)
    }
  }
    return (
      <div className='singleorder'>



        

{/* modal */}

<ModalCreateMessage setPassword={setPassword} sendMessage={sendMessage}  showClients={showClients} dataOrder={dataOrder} password={password}  setSendNewPrice={setSendNewPrice} chargeNewPrice={chargeNewPrice}  setError={setError} />

<div className='modal-header'>
            <div className='titleFontSingleOrder'>
              {
                dataOrder.map(order=>{
                  return(
                    <span
                    className='point btn-link'
                    title='Enviar informacion al cliente'
                    key={order._id}
                    onClick={()=>goToWP()}
                    >
                    Orden N°:&nbsp;{order.numberid}
                  </span>
                  
                  )
                })
              }
            </div>
            <div className=''>
              <span
                onClick={showClients}
                className='btn btn-close text-danger'
                  >X</span>

      
            </div>

        </div>



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


       
      let fecha =  new Date(order.promised);
     
      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset()/60)
        //Año
      let y = fecha.getFullYear();
        //Mes
      let  m = fecha.getMonth() +1 ;
        //Día
      let  d = fecha.getDate() +1 ;

      let dayToString = d.toString()
      if(dayToString.length === 1){
        d = "0" + d
      }

      let mesToString = m.toString()
      if(mesToString.length === 1){
        m = "0" + m
      }

      //   //Lo ordenas a gusto.
      let date = d + "/" + m + "/" + y;


  


          return(
<div key={order._id} className=''>

<div className='input-group '>

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



<div className='input-group '>
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

<div className='input-group '>
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
<div className='input-group '>
<div className='col-lg-6' >
<label
>
<span className='op50 textchiquito'>
Observaciones:&nbsp;&nbsp;</span>
<span className=' text-break spanData'>{order.observation}</span>
</label>

</div>
 <div className=' col-lg-6'
      >
      <span className='textchiquito op50'>Fecha de entrega:</span>
      
      <span className='text-danger textchiquito'>&nbsp;
      
      
      {
      order.promised === null ||order.promised === undefined ? <span>indefinida</span> :
      
      date}
      
      
      </span></div>
  
</div>
</div>
         )
      })
  }


</div>


{

  dataOrder.map(order=>{


    return(

<div key={order._id} className='row mtn
n
n
n
n-1'>

<div className='col-sm-4'>
  <span 
  className='textchiquito op50' 
  id='acordPriceView'
    >Acordado: 
  </span>$ 
  <span id='monto' className='text-break textonotanchiquitojajaja'>{order.pacord} </span>
</div>

<div className='col-sm-4 '>
  <span className='textchiquito op50'>Entregó: </span> ${order.seña} 
</div>




<div className='col-sm-4 '>
  <span className='textchiquito op50'>Resta: </span> <span className=''>${order.pacord - order.seña}</span>  <span className='textchiquito '> + iva </span> 
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

      let fecha =  new Date(msg.createdAt);

      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset()/60)
     
      // let  n =  new Date();
        //Año
      let y = fecha.getFullYear();
        //Mes
      let  m = fecha.getMonth() + 1;
        //Día
      let  d = fecha.getDate();
        //hora
      let h = fecha.getHours();
        //minutos
      let min = fecha.getMinutes();

      let dayToString = d.toString()
      if(dayToString.length === 1){
        d = "0" + d
      }

      let mesToString = m.toString()
      if(mesToString.length === 1){
        m = "0" + m
      }

      let hourToString = h.toString()
      if(hourToString.length === 1){
        h = "0" + h
      }

      let minToString = min.toString()
      if(minToString.length === 1){
        min = "0" + min
      }


        //Lo ordenas a gusto.
      let date = d + "/" + m + "/" + y + " - " + h + ":" + min;



      //
      let  dat =  new Date(msg.fechaEdit);
      //Año
    let year = dat.getFullYear();
      //Mes
    let  mes = dat.getMonth() + 1;
      //Día
    let  dia = dat.getDate();


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


      return (
 

    <div key={msg._id} className='row  border-bottom  mt-1 '>

        <span className='text-muted col-sm-4 text-left fotns'>{msg.name}</span>
        <span id='date' className='text-muted col-sm-8 text-right fotns'>{date}</span>
        <p  className='col-sm-12 text-info text-break text-left'>{msg.msg}</p>
        <div className='col-sm-12 text-right row '>
    {

msg.stateEdit === undefined ? 
null
: <>


  <div className=' mr-2 ml-1 fotns '> 
  <span className='text-muted '>Cambio:</span>
  &nbsp;
"{msg.stateEdit}"</div>
        
</>


}
          

          {

msg?.pacordEdit === undefined ? 

null
: 
<>

  <div className=' fotns mr-2  ml-1'> 
  <span className='text-muted '>Precio:</span>
  &nbsp;
${msg.pacordEdit}</div>
</>


}

{

msg?.señaEdit === undefined ? 

null
: 
<>

  <div className='fotns mr-2  ml-1'> 
  <span className='text-muted '>Entregó:</span>
  &nbsp;
${msg.señaEdit}</div>
</>


}
{

msg?.fechaEdit === null ? 

null
: 
<>

  <div className=' fotns mr-2'> 
  <span className='text-muted '>Entregar:</span>
  &nbsp;
{dateEdit}</div>
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
