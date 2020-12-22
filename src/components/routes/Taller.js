import {useState,useEffect} from 'react';
import './sales.css'

import Clients from './clients/Clients';
import Orders from './orders/Orders';
import SingleClient from './clients/SingleClient';
import CreateClient from './clients/CreateClient';
import CreateOrder from './orders/CreateOrder';
import { SingleOrder } from './orders/SingleOrder';

import {useLocation} from "react-router-dom"

import Error from '../misc/Error'
import Exito from '../misc/Exito'

import { motion } from 'framer-motion'

const Taller = () => {


  let location = useLocation();
  let loc = location.pathname

    //errores
    const[error, setError]=useState(undefined);

    const [exito, setExito]=useState(undefined)
    //mostrar u ocultar ordenes/cliente
    const [seOrHideOrders, setSeOrHideOrders]=useState(true);
    //mostrar u ocultar nuevo cliente
    const [seOrHideNewClient, setSeOrHideNewClient]=useState(false);
     //mostrar u ocultar nueva orden
    const [seOrHideNewOrder, setSeOrHideNewOrder]=useState(false);
     //mostrar u ocultar clientes/ orden unica
    const [seOrHIdeOrder, setSeOrHideOrder] = useState(false);

    const [hideAndSeeData, setHideAndSeeData]=useState(false)
  //data del cliente a mostrar
  const [dataClient, setDataClient]=useState([]);
  //data de la orden a mostarar
  const [dataOrder, setDataOrder]=useState([]);
const [seeClient, setSeeClient]=useState(false);

  const change = () =>{
    let idOrders = document.getElementById('idOrders');

    idOrders.classList.remove('col-lg-12')
    idOrders.classList.add('col-lg-6')
  }
  const changeBack = () =>{
    setSeOrHideOrders(true)


    // if(seOrHideOrders === false){
      
    // }

    if(seOrHideOrders=== true){
    let idOrders = document.getElementById('idOrders');
    idOrders.classList.remove('col-lg-6')
    idOrders.classList.add('col-lg-12')
}



  }

  useEffect(() => {
    try {
      if(exito !== undefined){
        setTimeout(() => {
          setExito(undefined)
        }, 2500);
      }
    } catch (error) {
      
    }
  }, [exito])



    return (
        <>
        <div className='contenedor'>


        {
    error && (<Error message={error} clearError={()=>setError(undefined)}/>)
    }

{
    exito && (<Exito message={exito} clearError={()=>setExito(undefined)}/>)
    }

<div className='row'>
<div className='col-lg-12 '>
      
  {
    seOrHideNewClient ?

     <motion.div 
     
     animate={{ y: 0, opacity: 1 }}
  transition={{ ease: "easeIn", duration: 0.1}}
    style={{y:"-100px", opacity: "0"}}

     id="createClientTransition" className=' border  border-info p-4 mb-3 create'>

    <CreateClient setSeOrHideNewClient={setSeOrHideNewClient} setError={setError} setExito={setExito} />
    </motion.div> : null

  }


   
  {
    seOrHideNewOrder ?
   
    <motion.div 
     
    animate={{ y: 0, opacity: 1 }}
 transition={{ ease: "easeIn", duration: 0.1}}
   style={{y:"-100px", opacity: "0"}}  className='border  border-info p-4 mb-3'>
     <CreateOrder setSeOrHideNewOrder={setSeOrHideNewOrder} setError={setError} dataClient={dataClient} setExito={setExito}/>
     </motion.div> : null

  }


</div>


{
  seeClient === true ?
  <div className='col-lg-6 '>


  <motion.div 
    animate={{ x: 0, opacity: 1 }}
    transition={{ ease: "easeIn", duration: 0.1}}
      style={{x:"-100px", opacity: "0"}}
  
  
  
  className='border  altoTotal border-info p-2 mb-3'>


  <Clients setSeOrHideOrders={setSeOrHideOrders} setDataClient={setDataClient} setSeOrHideNewClient={setSeOrHideNewClient} setSeOrHideNewOrder={setSeOrHideNewOrder} setHideAndSeeData={setHideAndSeeData} loc={loc} setSeeClient={setSeeClient} changeBack={changeBack} />

  </motion.div>


</div> 

:


null
}






{
  seOrHIdeOrder === false ?


null

  :



  
<motion.div 
  
  animate={{ x: 0, opacity: 1 }}
  transition={{ ease: "easeIn", duration: 0.1}}
    style={{x:"-200px", opacity: "0"}}
  className='col-lg-6 '>

<div 


  


className='border altoTotal border-info p-2 mb-3'>
   <SingleOrder dataOrder={dataOrder} setDataOrder={setDataOrder} setSeOrHideOrder={setSeOrHideOrder} dataClient={dataClient} setDataClient={setDataClient} setSeOrHideOrders={setSeOrHideOrders} setError={setError} changeBack={changeBack} loc={loc} setSeeClient={setSeeClient} seeClient={seeClient} />




  </div>

  </motion.div>

}
 


{

  
    seOrHideOrders === true ?
    <div id='idOrders'  className='col-lg-12 '>

<motion.div 
    animate={{ y: 0, opacity: 1 }}
    transition={{ ease: "easeIn", duration: 0.1}}
      style={{y:"100px", opacity: "0"}} 
      className='border border-info p-2 altoTotal'>


<Orders setDataOrder={setDataOrder} setSeOrHideOrder={setSeOrHideOrder} setDataClient={setDataClient} change={change} loc={loc} setSeOrHideNewOrder={setSeOrHideNewOrder}  setSeOrHideNewClient={setSeOrHideNewClient}  setSeeClient={setSeeClient} seeClient={seeClient} />
</motion.div>
</div>

:

<motion.div 

animate={{ x: 0, opacity: 1 }}
transition={{ ease: "easeIn", duration: 0.1}}
  style={{x:"100px", opacity: "0"}}
className='col-lg-6 '>

 
 
<div  className='border altoTotal border-info p-2 '>

<SingleClient setSeOrHideNewOrder={setSeOrHideNewOrder} setSeOrHideNewClient={setSeOrHideNewClient} setSeOrHideOrder={setSeOrHideOrder} setSeOrHideOrders={setSeOrHideOrders} setDataOrder={setDataOrder} dataClient={dataClient} hideAndSeeData={hideAndSeeData} setHideAndSeeData={setHideAndSeeData} setDataClient={setDataClient} setSeeClient=
{setSeeClient} setError={setError} />


</div>
</motion.div>

}


</div>




        </div>
        </>
    )
}

export default Taller
