
import React from 'react'

const ModalCreateState = ({ setPassword,setState,createState}) => {
  return (
    <div>
      
    <div className="modal fade" id="addState" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Crear nuevo estado de producto</h5>
      </div>
      <div className="modal-body">


      <div className='container'>






  <div className='row'>
    <div className='col-lg-12'>
  <form autoComplete="off">


  <input
    type="text"
    className="form-control border border-info"
    placeholder="Ingrese el nuevo estado"
    name='newState'
    id='newState'
    onChange={(e)=>setState(e.target.value)} 
    />
  </form>

    </div>
  </div>
 
     
</div>


      </div>
      <div className="modal-footer m-auto">

        {/* contraseña */}
<div className=''>


 <input
  onChange={(e)=>setPassword(e.target.value)}
  autoComplete="new-password"
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
        onClick={createState}
        type="button" 
        className="btn btn-danger" 
        data-dismiss="modal"
          >Agregar</button>
          
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default ModalCreateState