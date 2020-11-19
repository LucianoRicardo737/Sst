import { useContext} from 'react'

import {IP, PORT} from '../../../env';
import Axios from 'axios';


import './client.css'
import SearchOrdersContext from '../../../context/SearchOrdersContext';
import SeOrHideOrdersContext from '../../../context/SeOrHideOrdersContext';
import ClientDataContext from '../../../context/ClientDataContext';
import RefreshClientsContext from '../../../context/RefreshClientsContext';

const Clients = () => {

    //Variables de contexto
    //busqueda en ordenes
    // const {setSearchOrders}=useContext(SearchOrdersContext);

    //busqueda de clientes
    const {searchClients, setSearchClients}=useContext(SearchOrdersContext);

    //mostrar ordenes o cliente
    const {setSeOrHideOrders}=useContext(SeOrHideOrdersContext);

    //set data cliente a listar
    const {setDataClient}=useContext(ClientDataContext);

    //mostrar u ocultar nuevo cliente
    const {setSeOrHideNewClient,setSeOrHideNewOrder}=useContext(SeOrHideOrdersContext)

    const showNewClient = ()=>{
      setSeOrHideNewOrder(false)
      setSeOrHideNewClient(true);
  }
    
    //Todos los clientes
     const {clients}=useContext(RefreshClientsContext);

   
    //ver cliente
    const seeClient = async (e)=>{
      let token = localStorage.getItem('auth-token');

      let config = {headers:{
        'labLERsst-auth-token': token
      }};


      let client = await Axios.get(`http://${IP}:${PORT}/clientes/` + e, config);
     

     
      setDataClient(client.data);
      setSeOrHideOrders(false);
    }

    
      

     
      let searchFilter = clients.filter(function(client){return client.name.toLowerCase().includes(searchClients.toLowerCase())||
      client.dni.toString().includes(searchClients.toString())||
      client.lastname.toLowerCase().includes(searchClients.toLowerCase())||
      client.telephone.toString().includes(searchClients.toString())
     
      })

    return (
        <>



          <div className=''>

          <h3>Clientes</h3>
            <div className='input-group '>
            <button
            onClick={showNewClient}
            className='btn btn-info rig'
            >Nuevo Cliente</button>
            <input 
            placeholder='Buscar cliente'
            type='text'
            id='searchClient'
            onChange={(e)=>setSearchClients(e.target.value)}
            className='form-control inputSearch  lef'
            />
            </div>
           
              <table className="table mgtop  ">
              <thead>
                  <tr>
                    <th scope="col">DNI</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
              </table>
              <div className='overflow '>
            <table className="table table-sm  table-hover">
              
        <tbody>


            {
             searchFilter.slice(0, 150).sort(function(a, b){return a-b}).map(client =>
                
                {
                return(
                  <tr key={client._id}>
          <th scope='row'>{client.dni}</th>
                      <td>{client.name}</td>
                      <td>{client.lastname}</td>
                      <td>{client.telephone}</td>
                      <td>
                          <div className='btn-group'>
                          <button 
                          onClick={(e)=>seeClient(e.target.value)}
                          value={client._id} className='btn btn-outline-info'>
                            Ver
                          </button>
                          {/* <button 
                          onClick={(e)=>seeClient(e.target.value)}
                          value={client._id} className='btn btn-outline-success'>
                            Ordenes
                          </button> */}
                          </div>
                          
                      </td>
            </tr>     
          )
        })
      }
  </tbody>
</table>
            </div>
          </div>
        </>
    )
}

export default Clients
