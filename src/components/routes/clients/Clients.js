import { memo,useState,useEffect,useCallback} from 'react'

import {IP, PORT} from '../../../env';
import Axios from 'axios';

import './client.css'

import socket from '../../../io';


const Clients = memo(({setSeOrHideOrders,setDataClient,setSeOrHideNewClient,setSeOrHideNewOrder, setHideAndSeeData,setSeeClient, loc, changeBack
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
  

    const clearClick = () =>{
      setSearchClients("")
   

      document.getElementById('searchClient').value = ""
    }
   
    //ver cliente
    const seeClient = async (e)=>{
      setHideAndSeeData(false)
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
       window.location=`mailto:${e}`;
      }


      const closeClients = () =>{

        changeBack()

        setSeeClient(false)

     

      }

    // console.log("Soy Clientes")

    return (
        <>

          <div className='divClientes'>

            <div className='modal-header noBorderBut'>
              <div className='titleFontClients mb-1'>
                <span >Clientes</span>


              </div>
              { loc === "/taller" &&
              <div className=''>
              <span
                onClick={closeClients}
                className='btn btn-close text-danger'
                  >X</span>
            </div>
           }
            </div>
          
            <div className='input-group mt-1 '>

                <button
                onClick={showNewClient}
                className='btn btn-info rig'
                >Nuevo Cliente</button>
   
            <input
            autoComplete="off"
            placeholder='Buscar cliente'
            type='text'
            id='searchClient'
            onClick={()=>{clearClick()}}
            onChange={(e)=>setSearchClients(e.target.value)}
            className='form-control inputSearch  border border-info'
            />
            </div>
            
              <table className="table textchiquito2 table-sm  mt-1">
              <thead >
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Teléfono</th>
                  </tr>
                </thead>
              </table>
              <div className='overflow'>
            <table className="table table-sm table-hover">
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
              >Vér
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
  style={{width:"30px",height:"30px"}} alt=""/>

<img 
className="email"
   title={client.email}
   onClick={(e)=>goToEmail(e.target.title)}
  src="icons/email.png" 
  style={{width:"30px",height:"30px"}}
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
