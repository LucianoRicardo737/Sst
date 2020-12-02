import { memo,useState, useEffect, useCallback} from 'react'

import './orders.css';

import Axios from 'axios';
import {IP, PORT} from '../../../env'

import socket from '../../../io';

const Orders =memo (({setDataOrder, setSeOrHideOrder,  setDataClient}) => {


  // console.log('Soy Ordenes')
 //seteo de ordenes
 const [orders,setOrders]=useState([]);
  //Buscar ordenes
  const [searchOrders, setSearchOrders]=useState("");
  const [searchOrdersForState,setSearchOrdersForState]=useState("");

 // condicional el render
const [render,setRender]=useState(true);

 //estados de carga de datos de variables
 const [stateData, setStateData]=useState([]);

 

  const listAllOrders =  useCallback( () =>{
  try {
    socket.emit('order');
    socket.on('orders', orders=>{
      setOrders(orders);
    })
  } catch (error) {
    console.log(error)
  }
  },[]);

  //peticion al backend

    const seeOrder = async (e)=>{

      let token = localStorage.getItem('auth-token');
      let config = {headers:{
        'labLERsst-auth-token': token
      }};

      let order = await Axios.get(`http://${IP}:${PORT}/reparaciones/` + e, config);

      let idClient = order.data[0].client

      let client = await Axios.get(`http://${IP}:${PORT}/clientes/` + idClient, config);

  
      setDataOrder(order?.data);
      setDataClient(client?.data);
      setSeOrHideOrder(true);

    }

 
    const searchForState = (e) =>{
      document.getElementById('searchOrder').value = ""
      setSearchOrders("")
      setSearchOrdersForState(e)
    }

    const searchForOrderNumber = (e) =>{
      setSearchOrdersForState("");
      document.getElementById('state').value = "disabled"
      setSearchOrders(e)
      


    }

    const clearClick = () =>{
      setSearchOrders("")
      setSearchOrdersForState("");
      document.getElementById('searchOrder').value = ""
      document.getElementById('state').value = "disabled"
    }


    // filtro de busqueda de orden de trabajo
    let searchFilter = orders.filter(function(order){
      if (searchOrders === "") {
        return order.state.toString().includes(searchOrdersForState.toString())
       
      }
      
      if(order.numberid.toString() === searchOrders.toString()){
        
      return order.numberid.toString().includes(searchOrders.toString())
      
    } 
  
    else {
      return null
    }
})


   useEffect(()=>{
      if(render===true){
      listAllOrders();
    }
    return()=>{
      setRender(false)
    };
      
    },[listAllOrders,render]);


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
      SeeData()
    }
      return () => {
        setRender(false)
      }
    }, [SeeData, render])


    // const wptest = ( ) =>{
    //   const ventana = window.open("https://api.whatsapp.com/send?phone=+543533415285","_blank");
    //   setTimeout(function(){
    //       ventana.close();
    //   }, 10000); /* 5 Segundos*/
    // }

    return (

        <div id='orders'>

          {/* <button 
          onClick={()=>{wptest()}}
          className="btn btn-block btn-danger">ENVIAR WP</button> */}


    <div className='modal-header'>
      <div className='titleFontOrders'>
       <span>Ordenes de Trabajo</span>
     </div>
    </div>

             {/* barra de busqueda y botones de accion */}
  <div className='input-group mt-1'>
            <input
            placeholder='Buscar por numero'
            id='searchOrder'
            type='text'
            className='form-control  border border-info'
            onClick={()=>{clearClick()}}
            onChange={(e)=>searchForOrderNumber(e.target.value)}
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
            {/* tabla de resultados */}

 <table className="table  table-sm mt-1 ">
 <thead>
    <tr>
      <th scope="col">N°</th>
      <th scope="col">Tipo</th>
      <th scope="col">Marca</th>
      <th scope="col">Estado</th>
    </tr>
  </thead>
  </table>
  <div className='overflow'>
  <table className="table  table-sm table-hover overflow">


  <tbody >
      {
        searchFilter.slice(0, 150).sort(function(a, b){return a-b}).map(order =>{
          return(
            <tr key={order._id}>

          <th scope='row'>
            <button
              className='btn btn-link '
              value={order._id}
              onClick={(e)=>seeOrder(e.target.value)}
            >{order.numberid}
            </button>
            </th>
                      <td className="text-break">{order.type}</td>
                      <td className="text-break">{order.brand}</td>
                      <td className="text-break">{order.state}</td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
  </div>
</div>
    )
})

export default Orders
