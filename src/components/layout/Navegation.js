import React,{useContext, useState, useCallback, useEffect} from 'react'
import {Link} from 'react-router-dom';

import './navegation.css'

import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



import socket from '../../io';

const Navegation = () => {

    const history = useHistory();

    const {userData, setUserData}=useContext(UserContext)
    const user = userData.user
    // const atributeUser = userData.user.atribute

    const [repairs, setRepairs] = useState([])

    // condicional el render
    const [render,setRender]=useState(true);

    const listAllOrders =  useCallback( () =>{
      try {
        socket.emit('order');
        socket.on('orders', orders=>{
          setRepairs(orders);
        })
      } catch (error) {
        console.log(error)
      }
      },[]);

      useEffect(()=>{
        if(render===true){
          console.log("todas las ordenes")
        listAllOrders();
      }
      return()=>{
        setRender(false)
      };
        
      },[listAllOrders,render]);


    const logOut = () =>{
        setUserData({token:undefined, user:undefined});
        localStorage.setItem('auth-token', "");

        history.push('/');
    };

    // let sear = repairs.filter(function(rep){
    //   if(rep.state === "llamar al cliente"){
       
    //     return rep
    //  }
    // })


return (
    <>

{/* modal */}

<div className="modal fade" id="exampleModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Cerrar Sesion</h5>
      </div>
      <div className="modal-body">
        Esta seguro que desea salir?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button 
        onClick={()=>logOut()}
        type="button" 
        className="btn btn-danger" data-dismiss="modal">Salir</button>
      </div>
    </div>
  </div>
</div>




  <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to='/' className="navbar-brand">Servicio Tecnico Durante</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">

        {
               user ? <>   
            <li className="nav-item ">
                <Link to='/' className="nav-link">Inicio
                </Link>
            </li>
               <li className="nav-item">
                <Link to='/ventas' className="nav-link">Ventas</Link>
            </li>
            <li className="nav-item">
                <Link to='/taller' className="nav-link">Taller</Link>
            </li>
           
            {/* <li className="nav-item dropdown">
                <Link  to='/' className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</Link>
                <div className="dropdown-menu">
                    <Link   to='/' className="dropdown-item">Action</Link>
                    <Link  to='/' className="dropdown-item">Another action</Link>
                    <Link  to='/' className="dropdown-item">Something else here</Link>
                    <div className="dropdown-divider"></div>
                    <Link  to='/' className="dropdown-item">Separated link</Link>
                </div>
            </li> */}
           
               
               </> : <>
              
               </>
           }

        
            
        </ul>
        <ul className="navbar-nav">

{/* {
  sear.size
} */}

        {
                 
            user ? <>

            <li className="nav-item nostyle">
                <span   
                data-toggle="modal" data-target="#exampleModal"
                className="hover nav-link"
                >SALIR</span>
            </li>
           
            </>
              :
            <>
                <li className="nav-item nostyle">
                <Link  to='/login' className="white nav-link">INGRESAR</Link>
                </li>
             </>
           
        }
      </ul>
        </div>
    </nav>
</div>
</>
)
}

export default Navegation
