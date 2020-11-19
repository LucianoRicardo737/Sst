import {useState, useEffect} from 'react';
import './sales.css'

import SearchOrdersConntext from '../../context/SearchOrdersContext'
import SeOrHideOrdersContext from '../../context/SeOrHideOrdersContext'
import ClientDataContext from '../../context/ClientDataContext'
import RefreshClientsContext from '../../context/RefreshClientsContext';
import RefreshOrderContext from '../../context/RefreshOrderContext';

import {IP, PORT} from '../../env';
import Axios from 'axios';

import Clients from './clients/Clients';
import Orders from './orders/Orders';
import SingleClient from './clients/SingleClient';
import CreateClient from './clients/CreateClient';
import CreateOrder from './orders/CreateOrder';

const Sales = () => {
  //contexto para busqueda en ordenes
  const [searchOrders, setSearchOrders]=useState('')
  //contexto para busqueda en clientes
  const [searchClients, setSearchClients]=useState('')
  //mostrar u ocultar ordenes/cliente
  const [seOrHideOrders, setSeOrHideOrders]=useState(true)
    //mostrar u ocultar nuevo cliente
    const [seOrHideNewClient, setSeOrHideNewClient]=useState(false)
     //mostrar u ocultar nuevo cliente
     const [seOrHideNewOrder, setSeOrHideNewOrder]=useState(false)

  //data del cliente a mostrar
  const [dataClient, setDataClient]=useState([]);

  //actalizar lista de clientes
   //todos los clientes
   const [clients, setClients]=useState([]);

  //actalizar lista de Ordenes
   //todos las Ordenes
   const [orders, setOrders]=useState([]);

      //peticion al servidor
      const listAllClients = async () =>{
        try {
          let token = localStorage.getItem('auth-token');
        let config = {headers:{
          'labLERsst-auth-token':token
        }};
        const allClients = await Axios.get(`http://${IP}:${PORT}/clientes/`,config);
        setClients(allClients.data)
        } catch (error) {
          console.log(error)
        }
    
      };

      const listAllOrders = async () =>{
        try {
          let token = localStorage.getItem('auth-token');
          let config = {headers:{
            'labLERsst-auth-token':token
          }};
          const allOrders = await Axios.get(`http://${IP}:${PORT}/reparaciones/`,config);
          setOrders(allOrders.data)
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(()=>{
        // ejecutamos el script
        listAllClients();
        listAllOrders();
      },[]);


    
   

    return ( 
        <>
        <div className='contenedor'>

<div className='row'>
<div className='col-lg-12'>
<SeOrHideOrdersContext.Provider 
  value={{
    seOrHideNewClient,
    setSeOrHideNewClient,
    seOrHideNewOrder, 
    setSeOrHideNewOrder}}>

       <RefreshClientsContext.Provider value={{clients,setClients}}>
       <SearchOrdersConntext.Provider value={{seOrHideNewOrder, setSeOrHideNewOrder}}>
  {
    seOrHideNewClient ?  
     <div className='border border-info p-4 mb-3'>

    <CreateClient/>
    </div> : null
    
  }
  </SearchOrdersConntext.Provider>
  </RefreshClientsContext.Provider>
  <ClientDataContext.Provider value={{dataClient,setDataClient}}>
    <RefreshOrderContext.Provider value={{orders,setOrders}}>
  {
    seOrHideNewOrder ? 
    <div  className='border border-info p-4 mb-3'>
     <CreateOrder/>
     </div> : null
    
  }
  </RefreshOrderContext.Provider>
  </ClientDataContext.Provider>
    </SeOrHideOrdersContext.Provider>
</div>
<div className='col-lg-12'>

</div>

  {/* Componente Clientes */}
  <div className='col-lg-6 '>
  <div className='border border-info p-2 '>
  <SearchOrdersConntext.Provider 
  value={{
    searchOrders, 
    setSearchOrders, 
    searchClients, 
    setSearchClients}}>

  <SeOrHideOrdersContext.Provider 
  value={{
    seOrHideOrders,
    setSeOrHideOrders,
    seOrHideNewClient,
    setSeOrHideNewClient,
    setSeOrHideNewOrder}}>
<ClientDataContext.Provider value={{dataClient,setDataClient}}>
    <RefreshClientsContext.Provider value={{clients,setClients}}>

  <Clients/>

  
  </RefreshClientsContext.Provider>
 </ClientDataContext.Provider>
  </SeOrHideOrdersContext.Provider>

  </SearchOrdersConntext.Provider>
  </div>
  </div>

  {/* Componente Ordenes y Vista de un Cliente*/}
  <div className='col-lg-6 '>
<div className='border border-info p-2'>
<SearchOrdersConntext.Provider 
value={{
  searchOrders, 
  setSearchOrders, 
  searchClients, 
  setSearchClients}}>

<SeOrHideOrdersContext.Provider 
  value={{
    seOrHideOrders,
    setSeOrHideOrders,
    seOrHideNewClient,
    setSeOrHideNewClient,
    seOrHideNewOrder,
    setSeOrHideNewOrder}}>


{
    seOrHideOrders === true ?

<RefreshOrderContext.Provider value={{orders,setOrders}}>

<Orders/> 

</RefreshOrderContext.Provider>
: 

<ClientDataContext.Provider value={{
  dataClient,
  setDataClient}}>

<RefreshOrderContext.Provider value={{orders,setOrders}}>

<SingleClient/>

</RefreshOrderContext.Provider>


</ClientDataContext.Provider>

}


</SeOrHideOrdersContext.Provider>

</SearchOrdersConntext.Provider>
</div>
  </div>  
</div>




        </div>
        </>
    )
}

export default Sales
