import { useState, useEffect, useCallback}  from 'react';
import Axios from 'axios';
import {IP, PORT} from '../../../env'


// import SeOrHideOrdersContext from '../../../context/SeOrHideOrdersContext';
// import ClientDataContext from '../../../context/ClientDataContext';
// import OrderDataContext from '../../../context/OrderDataContext';
// import SearchOrdersContext from '../../../context/SearchOrdersContext';


import './singleClient.css'

import socket from '../../../io';

const SingleClient = ({setSeOrHideNewOrder,setSeOrHideNewClient,setSeOrHideOrder, setSeOrHideOrders,setDataOrder, dataClient}) => {


    //ver o esconder nueva orden
    // const {setSeOrHideNewOrder,setSeOrHideNewClient,setSeOrHideOrder} = useContext(SeOrHideOrdersContext);

 
    //Volver a ver todas las ordenes de trabajo
    // const {setSeOrHideOrders}=useContext(SeOrHideOrdersContext);

    //Data del cliente a leer
    // const {dataClient}=useContext(ClientDataContext);

    //Datos de la orden a SingleOrder
    // const {setDataOrder}=useContext(OrderDataContext);

    //Setear parametros de busqueda de ordenes
    const [searchOrders, setSearchOrders]=useState("");

    //seteo de ordenes
    const [orders,setOrders]=useState([]);

      // condicional el render
    const [render,setRender]=useState(true);

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
        if(order.client===dataClient[0]._id){
          return  order.numberid.toString().includes(searchOrders
            .toString())||
            order.state.toString().toLowerCase().includes(searchOrders
              .toString().toLowerCase())||
              order.type.toString().toLowerCase().includes(searchOrders
                .toLowerCase().toString())
    
              
        } else {
          return(null)

        }

      }

      )

        console.log("Soy SingleCLient")

    return (

        <div className=''>

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
        <div>
          <button
           className='btn btn-outline-danger'
           onClick={()=>backToOrders()}>
              Cerrar
          </button>

        </div>
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
            placeholder='Buscar orden de trabajo'
            id='searchOrder'
            type='text'
            className='form-control border border-info '
            onChange={(e)=>setSearchOrders(e.target.value)}
            />

            </div>

        {/* info del cliente */}
        <div className='mt-1 text-left border rounded'>

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
          <span className='op50'>Direccion:</span>&nbsp;&nbsp;
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
          <span className='op50'>Telefono:</span>&nbsp;&nbsp;
          <span className='spanData text-break'>{client.telephone}</span>
          </label>
          <label
          className=' col-lg-6' >
              <span className='op50'>Dni:</span>&nbsp;&nbsp;
              <span className='spanData text-break'>{client.dni}</span>
              </label>
      </div>
</div>
                       )
                    })
                }
              </div>

        {/* ordenes de trabajo */}
        <div className='wid mt-1'>

          <table  className="table  ">
          <thead>
    <tr>
      <th scope="col">N°</th>
      <th scope="col">Tipo</th>
      <th scope="col">Marca</th>
      <th scope="col">Estado</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>

          </table>
 <div className="overflowSingle">
 <table className="table table-sm table-hover overflowSingle ">

<tbody>
    {

searchFilter.slice(0, 2550).sort(function(a, b){return a-b}).map(order =>{
        return(
          <tr key={order._id}>
        <th scope='row'>{order.numberid}</th>
                    <td>{order.type}</td>
                    <td>{order.brand}</td>
                    <td>{order.state}</td>
                    <td>
                        <button
                        value={order._id}
                        onClick={(e)=>seeOrder(e.target.value)}
                        className='btn btn-link'>
                          Ver
                        </button>
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
