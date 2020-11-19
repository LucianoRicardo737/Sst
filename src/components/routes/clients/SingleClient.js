
import {useContext} from 'react';



import SeOrHideOrdersContext from '../../../context/SeOrHideOrdersContext';
import ClientDataContext from '../../../context/ClientDataContext';

import './singleClient.css'
import SearchOrdersContext from '../../../context/SearchOrdersContext';
import RefreshOrderContext from '../../../context/RefreshOrderContext';




const SingleClient = () => {

    //ver o esconder nueva orden
    const {setSeOrHideNewOrder,setSeOrHideNewClient} = useContext(SeOrHideOrdersContext);

    const showNewOrder = () =>{
      setSeOrHideNewClient(false)
      setSeOrHideNewOrder(true)
    }

    //Volver a ver todas las ordenes de trabajo
    const {setSeOrHideOrders}=useContext(SeOrHideOrdersContext);

    //Data del cliente a leer
    const {dataClient}=useContext(ClientDataContext);

    const {searchOrders, setSearchOrders}=useContext(SearchOrdersContext);

    //seteo de ordenes
    const {orders}=useContext(RefreshOrderContext);

    //ir a ordenes
    const backToOrders = ()=>{
        setSeOrHideOrders(true)
        setSeOrHideNewOrder(false)

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
        <div>
        {
                dataClient.map(client=>{
                    return(
                    <h3 key={client._id}>{client.name}&nbsp;{client.lastname}</h3>
                    )
                })
            }
        </div>

        {/* Barra de busqueda y botones de accion */}
             <div className='input-group mt-2'>
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
            className='form-control noradius'
            onChange={(e)=>setSearchOrders(e.target.value)}
            />
            <button 
             className='btn btn-warning  lef'
             onClick={()=>backToOrders()}>
                Cerrar
            </button>
            </div>
           


        {/* info del cliente */}
        <div className='mt-2'>

              {
                    dataClient.map(client =>{
                        return(
        <div key={client._id} className=''>
           <div className='input-group mb-1'>

      <label 
      className='form-control col-lg-4' >
          Nombre:&nbsp;&nbsp;
          <span className='spanData'>{client.name}</span>
          </label>
      <label 
      className='form-control col-lg-4' >
          Apellido:&nbsp;&nbsp;
          <span className='spanData'>{client.lastname}</span>
          </label>
      <label 
      className='form-control col-lg-4' >
          Dni:&nbsp;&nbsp;
          <span className='spanData'>{client.dni}</span>
          </label>
       

  
  </div>


  
  <div className='input-group mb-1'>
      <label 
      className='form-control col-lg-6' >
          Direccion:&nbsp;&nbsp;
          <span className='spanData'>{client.address}</span>
          </label>
      <label 
      className='form-control col-lg-6' >
          Ciudad:&nbsp;&nbsp;
          <span className='spanData'>{client.city}</span></label>
      </div>
      <div className='input-group mb-1'>
      <label 
      className='form-control col-lg-12' >
          Telefono:&nbsp;&nbsp;
          <span className='spanData'>{client.telephone}</span>
          </label>
      </div>
</div>
                       )
                    })
                }
              </div>

        {/* ordenes de trabajo */}
        <div className='wid mt-2'>

          <table  className="table mgtop ">
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
 <div className="overflowSingle p1 ">
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
           
        </div>

        
    )
}

export default SingleClient
