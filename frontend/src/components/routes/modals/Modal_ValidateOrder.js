import React from 'react'

const ModalValidate = ({setPassword, sendEditOrder}) => {

    return (
        <div>
      
        <div className="modal fade" id="confirmEditOrder" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
   <h5 className="modal-title" id="exampleModalLabel">Editar Orden</h5>
      </div>
           <div className="modal-body"> 
    
    <p>Ingrese su contraseña para confirmar la edición de la orden</p> 

    
         
    </div> 
    
    
          {/* </div> */}
          <div className="modal-footer m-auto">
    
            {/* contraseña */}
    <div className=''>
    
    
     <input
      onChange={(e)=>setPassword(e.target.value)}
      name='password' 
      id='password'
      autoComplete="new-password"
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
            onClick={()=>sendEditOrder()}  
            type="button" 
            className="btn btn-danger" 
            data-dismiss="modal"
              >Editar</button>
          </div>
        </div>
      </div>
    </div>
    
        </div>
    )
}

export default ModalValidate
