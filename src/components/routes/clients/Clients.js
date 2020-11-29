import { memo,useState,useEffect,useCallback} from 'react'

import {IP, PORT} from '../../../env';
import Axios from 'axios';

import './client.css'

import socket from '../../../io';


const Clients = memo(({setSeOrHideOrders,setDataClient,setSeOrHideNewClient,setSeOrHideNewOrder
  }) => {


    //busqueda de clientes
    const [searchClients, setSearchClients]=useState("");


    const showNewClient = ()=>{
      setSeOrHideNewOrder(false);
      setSeOrHideNewClient(true);
      setSearchClients("");
      document.getElementById('searchClient').value = "";
      setTimeout(function(){
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      },200)
  
  }

    //Todos los clientes
     const [clients,setClients]=useState([]);
     const [render,setRender]=useState(true);
     
     const listAllClients =  useCallback( () =>{
      try {
      socket.emit('cliente');
      socket.on('clientes', data=>{
          setClients(data);
      })
      } catch (error) {
        console.log(error)
      }
    },[]);

    useEffect( ()=>{
      if(render===true){
        listAllClients()
      }
      return()=>{
        setRender(false)
      }
    },[listAllClients,render])
  

    
   
    //ver cliente
    const seeClient = async (e)=>{
      let token = localStorage.getItem('auth-token');

      let config = {headers:{
        'labLERsst-auth-token': token
      }};


      let client = await Axios.get(`http://${IP}:${PORT}/clientes/` + e, config);



      setDataClient(client?.data);
      setSeOrHideOrders(false);
    }

  


  

      let searchFilter = clients.filter(function(client){ 
      return client.name.toLowerCase().includes(searchClients.toLowerCase())||
      client.dni.toString().includes(searchClients.toString())||
      client.lastname.toLowerCase().includes(searchClients.toLowerCase())||
      client.telephone.toString().includes(searchClients.toString())
}
      )

      const goToWP = (e) =>{
     
        try {
          const ventana = window.open(`https://api.whatsapp.com/send?phone=${e}`,"_blank");
          setTimeout(function(){
              ventana.close();
          }, 10000); /* 10 Segundos*/
        } catch (error) {
          console.log(error)
        }
      }


      //enviar correo
      const goToEmail = (e) =>{
        console.log(e)
      }


    // console.log("Soy Clientes")

    return (
        <>

          <div className=''>

            <div className='modal-header '>



              <div className='titleFontClients'>
                <span >Clientes</span>
              </div>

            </div>
            <div className='input-group mt-1 '>

                <button
                onClick={showNewClient}
                className='btn btn-info rig'
                >Nuevo Cliente</button>

            <input
            placeholder='Buscar cliente'
            type='text'
            id='searchClient'
            onChange={(e)=>setSearchClients(e.target.value)}
            className='form-control inputSearch  border border-info'
            />
            </div>

              <table className="table mt-1">
              <thead >
                  <tr>
                    <th scope="col">INFO</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Telefono</th>
                  </tr>
                </thead>
              </table>
              <div className='overflow'>
            <table className="table table-hover">

        <tbody>


            {
             searchFilter.slice(0, 300).sort(function(a, b){return a-b}).map(client =>

                {
                return(
                  <tr key={client._id}>
          <th scope='row'>
            <button
            onClick={(e)=>seeClient(e.target.value)}
            value={client._id}
            className='btn btn-link '
              >Ver
            </button>
          </th>
                      <td className="text-break">{client.name}</td>
                      <td className="text-break">{client.lastname}</td>
                      <td>
  <img 
className="whatsapp"
   title={client.prefijo + " " +client.codigo + "-" + client.telephone}
   onClick={(e)=>goToWP(e.target.title)}
  src="icons/whatsapp.png" 
  style={{width:"32px",height:"32px"}} alt=""/>

<img 
className="email"
   title={client.email}
   onClick={(e)=>goToEmail(e.target.title)}
  src="icons/email.png" 
  style={{width:"32px",height:"32px"}}
  alt=""
  />
  
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
)
export default Clients
