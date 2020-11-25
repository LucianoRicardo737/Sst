import React from 'react';

const ModalCreateMessage = ({chargeNewState, setPassword, sendMessage, showClients, dataOrder}) => {
    return (
        <div>
            <div className="modal fade" id="validateUser" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Confirme el usuario antes de agregar</h5>
      </div>
      <div className="modal-body">


      <div className='container'>


     <div className=''>
              <select
                className="custom-select border border-info"
                id="state"
                name='state'
                defaultValue='disabled'
                onChange={(e)=>chargeNewState(e.target.value)}
                >
        <option  disabled value='disabled'>No modificar estado</option>
        <option >A Reparar</option>
        <option >Garantia</option>
        <option >Retirar En Domicilio</option>
        <option >En Reparacion</option>
        <option >Llamar Al Cliente</option>
        <option >Entregar Sin Reparacion</option>
        <option >Listo Para Entregar</option>
      </select>
      </div>
     


</div>


      </div>
      <div className="modal-footer m-auto">
      <div className=''>
    
     <input
     onChange={(e)=>setPassword(e.target.value)}
     name='password' 
      id='password'
      type='password'
     className="form-control"
     placeholder='Ingrese su contraseña'
     />
     </div>

        <button 
        type="button" 
        className="btn btn-secondary " 
        data-dismiss="modal"
          >Cancelar</button>
        <button 
         onClick={sendMessage}
        type="button" 
        className="btn btn-danger" 
        data-dismiss="modal"
          >Agregar</button>
          
      </div>
    </div>
  </div>
</div>



        <div className='modal-header'>
            <div className='titleFontSingleOrder'>
              {
                dataOrder.map(order=>{
                  return(
                    <span
                    key={order._id}
                    >
                    Orden N°:&nbsp;{order.numberid}
                  </span>
                  )
                })
              }
            </div>
            <div className=''>
              <button
                onClick={showClients}
                className='btn btn-outline-danger'
                  >Cerrar</button>
            </div>

        </div>
        </div>
    )
}

export default ModalCreateMessage
