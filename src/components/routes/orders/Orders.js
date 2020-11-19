import { useContext} from 'react'

import SearchOrdersContext from '../../../context/SearchOrdersContext';
import RefreshOrderContext from '../../../context/RefreshOrderContext';


const Orders = () => {




  //Buscar ordenes
  const {searchOrders, setSearchOrders}=useContext(SearchOrdersContext);

    //seteo de ordenes
    const {orders}=useContext(RefreshOrderContext);
    //peticion al backend
   

    //filtro de busqueda de orden de trabajo
    let searchFilter = orders.filter(function(order){


      return order.numberid.toString().includes(searchOrders.toString())||



      order.type.toLowerCase().includes(searchOrders
        .toLowerCase())||
      order.brand.toLowerCase().includes(searchOrders
        .toLowerCase())||
      order.state.toLowerCase().includes(searchOrders
        .toLowerCase())
     
      });

    return (
        <div id='orders'>
             <h3>Ordenes de Trabajo</h3>
             {/* barra de busqueda y botones de accion */}
  <div className='input-group '>
            <input 
            placeholder='Buscar orden de trabajo'
            id='searchOrder'
            type='text'
            className='form-control'
            onChange={(e)=>setSearchOrders(e.target.value)}
            />
  </div>
            {/* tabla de resultados */}
 
 <table className="table mgtop ">
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
  <div className='overflow'>
  <table className="table table-sm table-hover">


  <tbody>
      {
        searchFilter.slice(0, 50).sort(function(a, b){return a-b}).map(order =>{
          return(
            <tr key={order._id}>
          <th scope='row'>{order.numberid}</th>
                      <td>{order.type}</td>
                      <td>{order.brand}</td>
                      <td>{order.state}</td>
                      <td>
                          <button className='btn btn-outline-info'>
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
    )
}

export default Orders
