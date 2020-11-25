import {useState} from 'react';
import './sales.css'

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


    return (
        <>
        <div className='contenedor'>

<div className='row'>
<div className='col-lg-12'>
      
  {
    seOrHideNewClient ?
     <div className='border  border-info p-4 mb-3'>

    <CreateClient setSeOrHideNewClient={setSeOrHideNewClient} />
    </div> : null

  }
 

   
  {
    seOrHideNewOrder ?
    <div  className='border  border-info p-4 mb-3'>
     <CreateOrder setSeOrHideNewOrder={setSeOrHideNewOrder} dataClient={dataClient} />
     </div> : null

  }


</div>
<div className='col-lg-12'>

</div>

  {/* Componente Clientes */}
  <div className='col-lg-6 '>
  <div className='border border-info p-2 '>

{
  seOrHIdeOrder === false ?

  <Clients setSeOrHideOrders={setSeOrHideOrders} setDataClient={setDataClient} setSeOrHideNewClient={setSeOrHideNewClient} setSeOrHideNewOrder={setSeOrHideNewOrder} />

  :

   <SingleOrder dataOrder={dataOrder} setSeOrHideOrder={setSeOrHideOrder}   />

}

  </div>
  </div>

  <div className='col-lg-6 '>
<div className='border border-info p-2'>

{
    seOrHideOrders === true ?


<Orders setDataOrder={setDataOrder} setSeOrHideOrder={setSeOrHideOrder}  />


:

<SingleClient setSeOrHideNewOrder={setSeOrHideNewOrder} setSeOrHideNewClient={setSeOrHideNewClient} setSeOrHideOrder={setSeOrHideOrder} setSeOrHideOrders={setSeOrHideOrders} setDataOrder={setDataOrder} dataClient={dataClient} />

}

</div>
  </div>
</div>




        </div>
        </>
    )
}

export default Sales
