import {useState} from 'react';
import './sales.css'


import SeOrHideOrdersContext from '../../context/SeOrHideOrdersContext'
import ClientDataContext from '../../context/ClientDataContext'
import OrderDataContext from '../../context/OrderDataContext'

import Clients from './clients/Clients';
import Orders from './orders/Orders';
import SingleClient from './clients/SingleClient';
import CreateClient from './clients/CreateClient';
import CreateOrder from './orders/CreateOrder';
import { SingleOrder } from './orders/SingleOrder';

const Sales = () => {

  //mostrar u ocultar ordenes/cliente
  const [seOrHideOrders, setSeOrHideOrders]=useState(true);
    //mostrar u ocultar nuevo cliente
    const [seOrHideNewClient, setSeOrHideNewClient]=useState(false);
     //mostrar u ocultar nueva orden
    const [seOrHideNewOrder, setSeOrHideNewOrder]=useState(false);
     //mostrar u ocultar clientes/ orden unica
    const [seOrHIdeOrder, setSeOrHideOrder] = useState(false);


  //data del cliente a mostrar
  const [dataClient, setDataClient]=useState([]);
  //data de la orden a mostarar
  const [dataOrder, setDataOrder]=useState([]);

  //actalizar lista de clientes
   //todos los clientes
  //  const [clients, setClients]=useState([]);

   

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

       
      
  {
    seOrHideNewClient ?
     <div className='border  border-info p-4 mb-3'>

    <CreateClient/>
    </div> : null

  }
 
  
  <ClientDataContext.Provider value={{dataClient,setDataClient}}>
   
  {
    seOrHideNewOrder ?
    <div  className='border  border-info p-4 mb-3'>
     <CreateOrder/>
     </div> : null

  }

  </ClientDataContext.Provider>
    </SeOrHideOrdersContext.Provider>
</div>
<div className='col-lg-12'>

</div>

  {/* Componente Clientes */}
  <div className='col-lg-6 '>
  <div className='border border-info p-2 '>
 

  <SeOrHideOrdersContext.Provider
  value={{
    seOrHideOrders,
    setSeOrHideOrders,
    seOrHideNewClient,
    setSeOrHideNewClient,
    setSeOrHideNewOrder,
    seOrHIdeOrder,
    setSeOrHideOrder}}>
<ClientDataContext.Provider value={{dataClient,setDataClient}}>
 

{
  seOrHIdeOrder === false ?

  <Clients/>


  :




  <OrderDataContext.Provider value={{dataOrder}}>

   <SingleOrder/>

   </OrderDataContext.Provider>




}



 </ClientDataContext.Provider>
  </SeOrHideOrdersContext.Provider>

  </div>
  </div>

  {/* Componente Ordenes y Vista de un Cliente*/}
  <div className='col-lg-6 '>
<div className='border border-info p-2'>


<SeOrHideOrdersContext.Provider
  value={{
    seOrHideOrders,
    setSeOrHideOrders,
    seOrHideNewClient,
    setSeOrHideNewClient,
    seOrHideNewOrder,
    setSeOrHideNewOrder,
    seOrHIdeOrder,
    setSeOrHideOrder}}>


  <OrderDataContext.Provider value={{dataOrder,setDataOrder}}>
{
    seOrHideOrders === true ?





<Orders/>



:

<ClientDataContext.Provider value={{
  dataClient,
  setDataClient}}>



<SingleClient/>

</ClientDataContext.Provider>

}

</OrderDataContext.Provider>



</SeOrHideOrdersContext.Provider>


</div>
  </div>
</div>




        </div>
        </>
    )
}

export default Sales
