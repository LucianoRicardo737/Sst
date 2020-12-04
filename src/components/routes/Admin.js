import React,{useCallback, useEffect, useState} from 'react'

import Error from '../misc/Error'

import Axios from 'axios';
import {IP, PORT} from '../../env'

import './admin.css'

const Admin = () => {

    const[error, setError]=useState(undefined);


    const nuevoUsuario = {
    nickname:"",
    name:"",
    lastname:"",
    password:"",
	passwordCheck:"",
    atribute:"",
    role:""
    }


    const [usuarios, setUsuarios] = useState([])
    const [usuariosInternos, setUsuariosInternos] = useState([])
    const [estados, setEstados]  = useState([])
    const [productos, setProductos]  = useState([])

    const [nuevoUsuarioData, setNuevoUsuarioData]=useState(nuevoUsuario)
    const [viewCreateUsuarios, setViewCreateUsuarios] = useState(false)
    const [editarUsuarios, setEditarUsuarios] = useState(false)

    const setDatosNuevoUsuario = useCallback((e) =>{
        setNuevoUsuarioData({...nuevoUsuarioData, [e.target.name]:e.target.value})
    },[nuevoUsuarioData])

    const listarTodosLosUsuarios = async () =>{
        try {
            let token = localStorage.getItem('auth-token');
            let config = {headers:{
              'labLERsst-auth-token': token
            }};


            //todos los usuarios
            let getUsuarios = await Axios.get(`http://${IP}:${PORT}/usuarios/`, config);

            setUsuarios(getUsuarios?.data)


            //todos los usuarios internos
            let getUsuariosIndent = await Axios.get(`http://${IP}:${PORT}/identificando/`, config);

            setUsuariosInternos(getUsuariosIndent?.data)
    
            //todos los estados
            let getEstados = await Axios.get(`http://${IP}:${PORT}/generales/estados`, config);

            setEstados(getEstados?.data)

            //todos los productos
            let getProductos = await Axios.get(`http://${IP}:${PORT}/generales/tipos`, config);

            setProductos(getProductos?.data)


      
        } catch (error) {
            console.log(error)            
        }
    }



    const crearUsuarioGeneral = async () =>{
   
     try {
        let token = localStorage.getItem('auth-token');
        let config = {headers:{
          'labLERsst-auth-token': token
        }};

        const nuevoUser = {
            nickname:nuevoUsuarioData.nickname,
            name:nuevoUsuarioData.name,
            lastname:nuevoUsuarioData.lastname,
            password:nuevoUsuarioData.password,
            passwordCheck:nuevoUsuarioData.passwordCheck,
            atribute:nuevoUsuarioData.atribute,
            role:nuevoUsuarioData.role
        }


        await Axios.post(`http://${IP}:${PORT}/usuarios/nuevoUsuario`,nuevoUser, config);





        let getUsuarios = await Axios.get(`http://${IP}:${PORT}/usuarios/`, config);

        setUsuarios(getUsuarios?.data)
     } catch (err ) {
        err.response.data.msg && 
        setError(err.response.data.msg);
     }


    }

    const eliminarCuentaDeUsuario = async (e) =>{
       
        let token = localStorage.getItem('auth-token');
        let config = {headers:{
          'labLERsst-auth-token': token
        }};


        await Axios.delete(`http://${IP}:${PORT}/usuarios/`+ e, config);


        let getUsuarios = await Axios.get(`http://${IP}:${PORT}/usuarios/`, config);

        setUsuarios(getUsuarios?.data)


    }





    useEffect(()=>{
        try {
            listarTodosLosUsuarios()
        } catch (error) {
            console.log(error)
        }
    },[])
        


    return (
        <div className='contenedor'>

{
    error && (<Error message={error} clearError={()=>setError(undefined)}/>)
    }
           

           <div className='row'>

            {/* listar usuarios */}
            <div className='col-lg-6 '>

            <div className='border border-info  max'>
               <div className='justify-content-between align-items-center d-flex'>
               <span className='ml-4'>Cuentas de sistema</span>

               <span 
               onClick={()=>setViewCreateUsuarios(true)}
               className='btn mt-2 mb-n2 mr-4 text-success create2 add'>Crear cuenta</span>
               </div>
               <hr></hr>
                <ul className='over'>

                {
                    usuarios.map(usrs=>{
                        return(
                        <li key={usrs._id} className='list-group-item-action text-left  d-flex justify-content-between mb-2 ml-n3 align-items-center'>{usrs.name}&nbsp;&nbsp;{usrs.lastname}
                        
                        <div className='button-group'>

                        <span className='btn text-warning point mr-1 edit'>
                            Editar
                        </span>
                        <span

                        
                        title={usrs._id} 
                       
                        onClick={(e)=>eliminarCuentaDeUsuario(e.target.title)}
                        
                        className='btn text-danger point mr-2 delete'>
                            X
                        </span>
                        
                        </div>
                        </li>
                        



                        )
                    })
                }
                </ul>


                
            </div>

            </div>
            







{

viewCreateUsuarios === false ?
            // {/* listar identificadores */}
      <div className='col-lg-6 '>

            <div className='border border-info p-2 max'>
    <span>Cuentas de sistema</span>
    <hr></hr>
    <ul className='over'>

    {
        usuariosInternos.map(ident=>{
            return(
            <li key={ident._id} className='list-group-item-action text-left  d-flex justify-content-between mb-2 p-2 align-items-center'>{ident.name}
            
            <div className='button-group'>

            <span className='btn text-warning point mr-1 edit'>
                Editar
            </span>
            <span className='btn text-danger point mr-2 delete'>
                X
            </span>
            
            </div>
            </li>
            



            )
        })
    }
    </ul>


    
</div>

</div>
:
   <div className='col-lg-6 '>

            <div className='border border-info p-2 max'>
            <div className='justify-content-between align-items-center d-flex'>
               <span className='ml-4'>Crear usuario general</span>

             
              <span 
               onClick={()=>setViewCreateUsuarios(false)}
               className=' mt-2 mb-n2 mr-4 text-danger point  delete'>X</span>
              
               </div>
    <hr></hr>
    <div className='over input-group'>

    <div className="col-md-4 marginbot">
    <input 
    type="text"
    className="form-control"
    placeholder="Usuario"
    name="nickname"
    id="nickname"
    onChange={setDatosNuevoUsuario}
    />


    </div>
    <div className="col-md-4 marginbot">
    <input 
    type="text"
    className="form-control"
    placeholder="nombre"
    name="name"
    id="name"
    onChange={setDatosNuevoUsuario}
    />


    </div>
    <div className="col-md-4 marginbot">
    <input 
    type="text"
    className="form-control"
    placeholder="Apellido"
    name="lastname"
    id="lastname"
    onChange={setDatosNuevoUsuario}
    />


    </div>
    <div className="col-md-6 marginbot">
    <input 
    type="password"
    className="form-control"
    placeholder="Contraseña"
    name="password"
    id="password"
    onChange={setDatosNuevoUsuario}
    />


    </div>
    <div className="col-md-6 marginbot">
    <input 
    type="password"
    className="form-control"
    placeholder="Repetir contraseña"
    name="passwordCheck"
    id="passwordCheck"
    onChange={setDatosNuevoUsuario}
    />


    </div>
    <div className="col-md-6 marginbot">
    <select
    type="text"
    className="custom-select"
    defaultValue='disabled'
    name="atribute"
    id="atribute"
    onChange={setDatosNuevoUsuario}
    >
           <option  disabled value='disabled'>Atributo de usuario</option>
        <option >user</option>
        <option >admin</option>

    </select>

    </div>
    <div className="col-md-6 marginbot">
    <select
    type="text"
    className="custom-select"
    defaultValue='disabled'
    name="role"
    id="role"
    onChange={setDatosNuevoUsuario}
    >
           <option  disabled value='disabled'>Rol de usuario</option>
        <option >vendedor</option>
        <option >taller</option>
    </select>



    </div>


   
   
    </div>
  
    <button 
    onClick={()=>crearUsuarioGeneral()}
    className='btn btn-success btn-block'>Crear</button>
    </div>

</div>
}






            {/* lista de estados editables */}
            <div className='col-lg-6  mt-4'>

            <div className='border border-info p-2 max'>
                <span>Cuentas de sistema</span>
                <ul className='over'>

                {
                    estados.map(stat=>{
                        return(
                        <li key={stat._id} className='list-group-item-action text-left  d-flex justify-content-between mb-2 p-2 align-items-center'>{stat.name}
                        
                        <div className='button-group'>

                        <span className='btn text-warning point mr-1 edit'>
                            Editar
                        </span>
                        <span className='btn text-danger point mr-2 delete'>
                            X
                        </span>
                        
                        </div>
                        </li>
                        



                        )
                    })
                }
                </ul>


                
            </div>

            </div>

            {/* lista de  */}
            <div className='col-lg-6  mt-4'>

<div className='border border-info p-2 max'>
    <span>Cuentas de sistema</span>
    <ul className='over'>

    {
        productos.map(usrs=>{
            return(
            <li key={usrs._id} className='list-group-item-action text-left  d-flex justify-content-between mb-2 p-2 align-items-center'>{usrs.typeProduct}
            
            <div className='button-group'>

            <span className='btn text-warning point mr-1 edit'>
                Editar
            </span>
            <span className='btn text-danger point mr-2 delete'>
                X
            </span>
            
            </div>
            </li>
            



            )
        })
    }
    </ul>


    
</div>

</div>





           </div>














        </div>
    )
}

export default Admin
