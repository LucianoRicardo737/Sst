import React,{ useState, useCallback, useEffect} from 'react'



import socket from '../../io';


const Home = () => {



    // condicional el render
    const [render,setRender]=useState(true);
    const [repairs, setRepairs] = useState([])


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



// const [testSt, setTestSt ] = useState([])
// const [sumaTotal, setSumaTotal] =useState("")



// let test = montos.reduce(function(total, num) {return total + num})







// let otra = testSt.reduce(function(total, num) {
    
//    return (total = total + num)


// })
// console.log(otra)

    return (

       
        <div className='contenedor'>




<div className='row'>
<div className='col-lg-12  border  border-info p-4  create'>
    <h4 className='text-left'>Resumen de reparaciones</h4>

    <div className='col-lg-12  '>
        <h5 className='text-left'>Estadisticas en vivo</h5>
        <hr></hr>
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



{/* <div className='row'>
<div className='col-lg-12  border  border-info p-4 mb-3 create'>

   <div className='col-lg-12  d-flex justify-content-between align-items-center'>

   <h5 className='text-left '>Resumen Historico</h5>


  
<span className=" nav-link active ">Reparaciones Entregadas:&nbsp;<span className='restantes border border-success'>{entregados.length}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>ingresos Totales:

    
    
    &nbsp;$<span id="totalEntregado"></span> </span></span>



   </div>




    <div className='col-lg-12  p-3'>
        <h5 className='mb-4'>Entregados</h5>
<div className='row'>


<div className='col-lg-4'>
    

</div>



</div>
</div>

</div>
</div> */}





        </div>
    )
}

export default Home
