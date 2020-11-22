import {useContext} from 'react';
import Axios from 'axios';
import {IP, PORT} from '../../../env'


import SeOrHideOrdersContext from '../../../context/SeOrHideOrdersContext';
import ClientDataContext from '../../../context/ClientDataContext';
import OrderDataContext from '../../../context/OrderDataContext';
import SearchOrdersContext from '../../../context/SearchOrdersContext';
import RefreshOrderContext from '../../../context/RefreshOrderContext';

import './singleClient.css'


const SingleClient = () => {




    //ver o esconder nueva orden
    const {setSeOrHideNewOrder,setSeOrHideNewClient,setSeOrHideOrder} = useContext(SeOrHideOrdersContext);

    const showNewOrder = () =>{
      setSeOrHideNewClient(false)
      setSeOrHideNewOrder(true)
    }

    //Volver a ver todas las ordenes de trabajo
    const {setSeOrHideOrders}=useContext(SeOrHideOrdersContext);

    //Data del cliente a leer
    const {dataClient}=useContext(ClientDataContext);

    //Datos de la orden a SingleOrder
    const {setDataOrder}=useContext(OrderDataContext);

    //Setear parametros de busqueda de ordenes
    const {searchOrders, setSearchOrders}=useContext(SearchOrdersContext);

    //seteo de ordenes
    const {orders}=useContext(RefreshOrderContext);

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
    let searchFilter = orders.filter(function(order){return order.numberid.toString().includes(searchOrders
        .toString())||
        order.type.toLowerCase().includes(searchOrders
          .toLowerCase())||
        order.brand.toLowerCase().includes(searchOrders
          .toLowerCase())||
        order.state.toLowerCase().includes(searchOrders
          .toLowerCase())

        })

    return (



        <div className=''>

        {/* informacion de */}
      <div className='modal-header '>

        <div className='titleFont'>
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
          <span className='spanData'>{client.name}</span>
          </label>
      <label
      className=' col-lg-6' >
          <span className='op50'>Apellido:</span>&nbsp;&nbsp;
          <span className='spanData'>{client.lastname}</span>
          </label>




  </div>



  <div className='input-group mb-1 '>
      <label
      className=' col-lg-6' >
          <span className='op50'>Direccion:</span>&nbsp;&nbsp;
          <span className='spanData'>{client.address}</span>
          </label>
      <label
      className=' col-lg-6' >
          <span className='op50'>Ciudad:</span>&nbsp;&nbsp;
          <span className='spanData'>{client.city}</span></label>
      </div>
      <div className='input-group '>
      <label
      className=' col-lg-6' >
          <span className='op50'>Telefono:</span>&nbsp;&nbsp;
          <span className='spanData'>{client.telephone}</span>
          </label>
          <label
          className=' col-lg-6' >
              <span className='op50'>Dni:</span>&nbsp;&nbsp;
              <span className='spanData'>{client.dni}</span>
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


      searchFilter.filter(function(order){
        if(order.client===dataClient[0]._id){
        return( order)
        } else {
          return(null)

        }

      }).slice(0, 50).sort(function(a, b){return a-b}).map(order =>{
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
