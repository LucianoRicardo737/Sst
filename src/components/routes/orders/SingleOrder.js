import {useContext} from 'react';
// import Axios from 'axios';
// import {IP,PORT} from '../../../env';

import OrderDataContext from '../../../context/OrderDataContext';
import SeOrHideOrdersContext from '../../../context/SeOrHideOrdersContext';
import  './singleOrder.css'




export const SingleOrder = () => {

//Cerrar ventana
const {setSeOrHideOrder}=useContext(SeOrHideOrdersContext);

//data en context
const {dataOrder}=useContext(OrderDataContext);


const showClients = () =>{
  setSeOrHideOrder(false)
}


    return (
      <div className=''>


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



<div className='mt-2'>
{
      dataOrder.map(order =>{
          return(
<div key={order._id} className=''>
<div className='input-group mb-1'>

<label
className='form-control col-lg-4' >
Tipo:&nbsp;&nbsp;
<span className='spanData'>{order.type}</span>
</label>
<label
className='form-control col-lg-4' >
Marca:&nbsp;&nbsp;
<span className='spanData'>{order.brand}</span>
</label>
<label
className='form-control col-lg-4' >
Modelo:&nbsp;&nbsp;
<span className='spanData'>{order.model}</span>
</label>



</div>



<div className='input-group mb-1'>
<label
className='form-control col-lg-6' >
N° Serie:&nbsp;&nbsp;
<span className='spanData'>{order.nserie}</span>
</label>
<label
className='form-control col-lg-6' >
Estado:&nbsp;&nbsp;
<span className='spanData'>{order.state}</span></label>
</div>
<div className='input-group mb-1'>

<label
className='form-control col-lg-12' >
Falla:&nbsp;&nbsp;
<span className='spanData'>{order.failure}</span>
</label>


</div>

<div className='input-group mb-1'>

<textarea className='form-control col-lg-12 row-lg-2' value={order.observation} readOnly>

</textarea>

</div>
</div>
         )
      })
  }


</div>

<div className='col-lg-12 overflowSingleOrder'>
<h1>Test</h1>

</div>


      </div>


    )
}
