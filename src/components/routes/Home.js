import React,{ useState, useCallback, useEffect} from 'react'



import socket from '../../io';
import Moment from 'react-moment';

const Home = () => {



    // condicional el render
    const [render,setRender]=useState(true);
    const [repairs, setRepairs] = useState([])

    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");

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

        let sear = repairs.filter(function(rep){
            if(rep.state === "llamar al cliente"){
              return rep.state
           } else {
             return null
           }
          })
      
      
          let reparacionesPEndientes = repairs.filter(function(rep){
            if(rep.state === "reparacion aceptada"){
              return rep.state
           } else {
             return null
           }
          })
      
      
          let revisarPendientes = repairs.filter(function(rep){
            if(rep.state === "a revisar"){
              return rep.state
           } else {
             return null
           }
          })
          let listosConRep = repairs.filter(function(rep){
            if(rep.state === "listo para entregar"){
              return rep.state
           } else {
             return null
           }
          })
          let listosSinRep = repairs.filter(function(rep){
            if(rep.state === "listos sin reparacion"){
              return rep.state
           } else {
             return null
           }
          })
          let reparacionesCanceladas = repairs.filter(function(rep){
            if(rep.state === "reparacion cancelada"){
              return rep.state
           } else {
             return null
           }
          })

          let irADomicilio = repairs.filter(function(rep){
            if(rep.state === "ir a domicilio"){
              return rep.state
           } else {
             return null
           }
          })

          let esperandoRespuesta = repairs.filter(function(rep){
            if(rep.state === "esperando respuesta"){
              return rep.state
           } else {
             return null
           }
          })

          let entregados = repairs.filter(function(rep){
            if(rep.state === "entregado"){
              return rep.state
           } else {
             return null
           }
          })




          let montos = repairs.filter(function(rep){
            if(rep.state === "entregado"){
              return rep 
           } else {
             return null
           }
          }).map(test=>{return test.pacord})




      let total = 0;
    
      montos.map(todo => {
        return total+=todo
      })

      // || rep.createdAt === Date.now()


      let filtros = repairs.filter(function(rep){
        if(rep.state === "entregado"){
        

          return rep
          
        }
      }).filter(function(rep){
        if(rep.updatedAt >= desde){
          
          return rep 
        } 
        
      }).map(test=>{return test.pacord})

      let totalDesde = 0;
    
      filtros.map(todo => {
        return totalDesde+=todo
      })

  

      
      let filtrosHasta = repairs.filter(function(rep){
        if(rep.state === "entregado"){
        

          return rep
          
        }
      }).filter(function(rep){
        if(rep.updatedAt <= hasta){
          
          return rep 
        } 
        
      }).map(test=>{return test.pacord})

      let totalHasta = 0;
    
      filtrosHasta.map(todo => {
        return totalHasta-=todo
      })


      console.log("totalDesde:",totalDesde)
      console.log("totalHasta:",totalHasta)
    

      let res = totalDesde - totalHasta
      console.log("TOTAL:",res)

  //     let searchFilter = clients.filter(function(client){ 
  //       return client.name.toLowerCase().includes(searchClients.toLowerCase())||
  //       client.dni.toString().includes(searchClients.toString())||
  //       client.lastname.toLowerCase().includes(searchClients.toLowerCase())||
  //       client.telephone.toString().includes(searchClients.toString())
  // }
  //       )

  // console.log(Date.now(rep.createdAt))



  // let fecha =  new Date(filtros.createdAt);
     
  // fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset()/60)
  //   //Año
  // let y = fecha.getFullYear();
  //   //Mes
  // let  m = fecha.getMonth() +1 ;
  //   //Día
  // let  d = fecha.getDate() +1 ;

  // let dayToString = d.toString()
  // if(dayToString.length === 1){
  //   d = "0" + d
  // }

  // let mesToString = m.toString()
  // if(mesToString.length === 1){
  //   m = "0" + m
  // }

  // //   //Lo ordenas a gusto.
  // let date = d + "/" + m + "/" + y;


      


    return (

       
        <div className='contenedor'>


<div className='row mb-2'>
<div className='col-lg-12  border  border-info p-4  create'>
   <div>

   <h4 className='text-left'>Resumen de reparaciones</h4>

<div className='col-lg-12  '>
    <h5 className='text-left'>Estadisticas en vivo</h5>
    <hr></hr>


   </div>
<div className='row'>

<div className='col-lg-3  '>
<span className=" nav-link active ">Revisiones Pendientes:&nbsp;<span className={ revisarPendientes.length === 0 ?'restantes border border-success' : 'restantes border border-warning'}>{revisarPendientes.length}</span></span>

</div>

<div className='col-lg-3  '>
<span className=" nav-link active ">Llamados pendientes:&nbsp;<span className={ sear.length === 0 ?'restantes border border-success' : 'restantes border border-warning'}>{sear.length}</span></span>

</div>


<div className='col-lg-3 mt-1  '>
<span className=" nav-link active ">Esperando Respuesta:&nbsp;<span className={ esperandoRespuesta.length === 0 ?'restantes border border-success' : 'restantes border border-warning'}>{esperandoRespuesta.length}</span></span>

</div>


<div className='col-lg-3  '>
<span className=" nav-link active ">Domicilios Pendientes:&nbsp;<span className={ irADomicilio.length === 0 ?'restantes border border-success' : 'restantes border border-warning'}>{irADomicilio.length}</span></span>

</div>



<div className='col-lg-3  '>
<span className=" nav-link active ">Reparaciones pendientes:&nbsp;<span className={ reparacionesPEndientes.length === 0 ?'restantes border border-success' : 'restantes border border-warning'}>{reparacionesPEndientes.length}</span></span>

</div>



<div className='col-lg-3 mt-1   '>
<span className=" nav-link active ">Reparaciones canceladas:&nbsp;<span className={ reparacionesCanceladas.length === 0 ?'restantes border border-success' : 'restantes border border-warning'}>{reparacionesCanceladas.length}</span></span>

</div>

<div className='col-lg-3 mt-1  '>
<span className=" nav-link active ">Reparaciones Listas:&nbsp;<span className={ listosConRep.length === 0 ?'restantes border border-success' : 'restantes border border-warning'}>{listosConRep.length}</span></span>

</div>



<div className='col-lg-3 mt-1  '>
<span className=" nav-link active ">Entregar sin reparacion:&nbsp;<span className={ listosSinRep.length === 0 ?'restantes border border-success' : 'restantes border border-warning'}>{listosSinRep.length}</span></span>

</div>




</div>


    </div>

</div>
</div>


{/* 
<div className='row'>

<div className='col-lg-12  border  border-info p-4 mb-3 create'>
<div>

<h4 className='text-left'>Resumen Historico </h4>

<div className='col-lg-12  '>
 <h5 className='text-left'>Entregados</h5>
 <hr></hr>

 
</div></div>

   <div className='col-lg-12  d-flex justify-content-between align-items-center'>

   <h5 className='text-left ml-5'>Total:</h5>


  
<span className=" nav-link active mr-5">Reparaciones Entregadas:&nbsp;<span className='restantes border border-success'>{entregados.length}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>ingresos Totales: 

    
    
    &nbsp;${total}<span id="totalEntregado"></span> </span></span>



   </div>




    <div className='col-lg-12  p-3'>
        <h5 className='mb-4 text-left'>Filtrar por meses</h5>
        <hr></hr>
<div className='row'>

<div className='col-lg-12  d-flex justify-content-between align-items-center'>
<div className=' row col-lg-6'>


<div className="input-group">
  <div className="input-group-prepend">
    <span className="input-group-text">Desde:</span>
  </div>
  <input
        type="date"
        className="form-control border "
        placeholder="Desde"
        name='desde'
        id='desde'
        onChange={(e)=>setDesde(e.target.value)}
         />


      



  <div className="input-group-prepend ml-2">
    <span className="input-group-text">Hasta:</span>
  </div>
  <input
        type="date"
        className="form-control border "
        placeholder="Hasta"
        name='hasta'
        id='hasta'
        onChange={(e)=>setHasta(e.target.value)}
         />
</div>


</div>

<div>


<span className=" nav-link active mr-5">Reparaciones Entregadas:&nbsp;<span className='restantes border border-success'>{entregados.length}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>ingresos Totales: 

 
 
&nbsp;${total}<span id="totalEntregado"></span> </span></span>


</div>

</div>





</div>
</div>

</div>
</div>


 */}


        </div>
    )
}

export default Home
