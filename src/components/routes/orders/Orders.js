import { useContext} from 'react'

import SearchOrdersContext from '../../../context/SearchOrdersContext';
import RefreshOrderContext from '../../../context/RefreshOrderContext';
import SeOrHideOrdersContext from '../../../context/SeOrHideOrdersContext';
import OrderDataContext from '../../../context/OrderDataContext';
import './orders.css';

import Axios from 'axios';
import {IP, PORT} from '../../../env'

const Orders = () => {




  //Buscar ordenes
  const {searchOrders,
    setSearchOrders}=useContext(SearchOrdersContext);

    //mostramos u coultamos clientes
    const {setSeOrHideOrder}=useContext(SeOrHideOrdersContext);
    //Datos de la orden a SingleOrder
    const {setDataOrder}=useContext(OrderDataContext);
    //seteo de ordenes
    const {orders}=useContext(RefreshOrderContext);
    //peticion al backend

    const seeOrder = async (e)=>{

      let token = localStorage.getItem('auth-token');

      let config = {headers:{
        'labLERsst-auth-token': token
      }};


      let order = await Axios.get(`http://${IP}:${PORT}/reparaciones/` + e, config);

      setDataOrder(order.data);

      setSeOrHideOrder(true);

    }

    //filtro de busqueda de orden de trabajo
    let searchFilter = orders.filter(function(order){


      return order.numberid.toString().includes(searchOrders.toString())

      });


    return (


        <div id='orders'>

    <div className='modal-header'>
      <div className='titleFontOrders'>
       <span>Ordenes de Trabajo</span>
     </div>
    </div>



             {/* barra de busqueda y botones de accion */}
  <div className='input-group mt-1'>
            <input
            placeholder='Buscar orden de trabajo'
            id='searchOrder'
            type='text'
            className='form-control  border border-info'
            onChange={(e)=>setSearchOrders(e.target.value)}
            />
  </div>
            {/* tabla de resultados */}

 <table className="table mt-1 ">
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
  <table className="table table-hover">


  <tbody>
      {
        searchFilter.slice(0, 150).sort(function(a, b){return a-b}).map(order =>{
          return(
            <tr key={order._id}>

          <th scope='row'>
            <button
              className='btn btn-link'
              value={order._id}
              onClick={(e)=>seeOrder(e.target.value)}
            >{order.numberid}
            </button>
            </th>
                      <td>{order.type}</td>
                      <td>{order.brand}</td>
                      <td>{order.state}</td>
            </tr>
          )
        })
      }
  </tbody>
</table>
</div>
        </div>
    )
}

export default Orders
