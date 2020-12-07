import React,{useCallback, useEffect, useState} from 'react'

import Error from '../misc/Error'

import Axios from 'axios';
import {IP, PORT} from '../../env'

import './admin.css'

import { motion } from 'framer-motion'

const Admin = () => {

    const[error, setError]=useState(undefined);
    const nuevoUsuarioIdentificatorio = {
        name:"",
        password:"",
        passwordCheck:""
    }
    //crear y editar usuarios usan la misma variable
    const nuevoUsuario = {
    nickname:"",
    name:"",
    lastname:"",
    password:"",
	passwordCheck:"",
    atribute:"",
    role:""
    }

    // data de formularios
    const [usuarios, setUsuarios] = useState([])
    const [usuariosInternos, setUsuariosInternos] = useState([])
    const [estados, setEstados]  = useState([])
    const [productos, setProductos]  = useState([])
    // nuevo usuario
    const [nuevoUsuarioData, setNuevoUsuarioData]=useState(nuevoUsuario)
 
    //nuevo usuario identificatorio
    const [nuevoUsuarioIdent, setNuevoUsuarioIdent]=useState(nuevoUsuarioIdentificatorio)

    // info unica de la orden a editar.
    const [dataEdit, setDataEdit]=useState({})
    
    
    //renderizado para crear un nuevo usuario identificatorio
    const[verNuevoUsuarioIdentificatorio, setVerNuevoUsuarioIdentificatorio]=useState(false);

    // condicional de vista de nuevo usuario
    const [viewCreateUsuarios, setViewCreateUsuarios] = useState(false)
    //renderizado de editado
    const [editarUsuarios, setEditarUsuarios] = useState(false)
    // renderizado para mostrar datos del usuario
    const [seeUser,setSeeUser]=useState(false)
    //renderizar identificador de usuarios
    const [verUsuariosUnicos, setVerUsuariosUnicos]=useState(true)


    const setDatosNuevoUsuario = useCallback((e) =>{
        setNuevoUsuarioData({...nuevoUsuarioData, [e.target.name]:e.target.value})
    },[nuevoUsuarioData])

    const setDatosNuevoUsuarioIdentificatorio = useCallback((e) =>{
        setNuevoUsuarioIdent({...nuevoUsuarioIdent, [e.target.name]:e.target.value})
    },[nuevoUsuarioIdent])


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

    const verDatosUsuaro = async (e) =>{
        try {
        
       

        let token = localStorage.getItem('auth-token');
        let config = {headers:{
        'labLERsst-auth-token': token
        }};

    
      
        let getUserData = await Axios.get(`http://${IP}:${PORT}/usuarios/` + e, config);


        setDataEdit(getUserData?.data)
        
        setSeeUser(true)
        setVerUsuariosUnicos(false)
        setViewCreateUsuarios(false)
        setEditarUsuarios(false)
        

    


        } catch (error) {
            console.log(error)
        }
    }

    const abrirCrearUsuario = () =>{
  try {
    setViewCreateUsuarios(true)
    setEditarUsuarios(false)
    setVerUsuariosUnicos(false)
    setSeeUser(false)
    setVerNuevoUsuarioIdentificatorio(false)
  } catch (error) {
      console.log(error)
  }
    }
   
    const abrirEditarUsuario = async (e) =>{
        try {
        setSeeUser(false)
        setVerUsuariosUnicos(false)
        setViewCreateUsuarios(true)
        setEditarUsuarios(true)
        setVerNuevoUsuarioIdentificatorio(false)


        let token = localStorage.getItem('auth-token');
        let config = {headers:{
          'labLERsst-auth-token': token
        }};
     

      
        let getUserData = await Axios.get(`http://${IP}:${PORT}/usuarios/` + e, config);


        setDataEdit(getUserData?.data)


     
        
        } catch (error) {
            console.log(error)
        }
    }
    
    const cerrarEditarCrearCliente = () =>{
      try {
        setVerUsuariosUnicos(true)
        setViewCreateUsuarios(false)
        setVerNuevoUsuarioIdentificatorio(false)
        setEditarUsuarios(false)
        setSeeUser(false)
        
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



        await Axios.post(`http://${IP}:${PORT}/usuarios/nuevoUsuario`,nuevoUsuarioData, config);


        let getUsuarios = await Axios.get(`http://${IP}:${PORT}/usuarios/`, config);

        setUsuarios(getUsuarios?.data)

        let clearInput = document.querySelector("input[type='text'],input[type='select'],textarea,input[type='password']");
        let clearInputs=document.querySelectorAll("input[type='text'],input[type='select'],textarea,input[type='password']");
        for(let clearInput of clearInputs)
        clearInput.value = "";
        let atributeValueSelect = document.getElementById('atribute');
        let roleValueSelect = document.getElementById('role');
        atributeValueSelect.selectedIndex = 0;
        roleValueSelect.selectedIndex = 0;
        setNuevoUsuarioData(nuevoUsuario)
      

     } catch (err ) {
        err.response.data.msg && 
        setError(err.response.data.msg);
     }


    }


    const editarUsuarioExistente = async (e)=>{

        try {
             //validamos los datos
          const token = localStorage.getItem('auth-token');
          const config = { headers:{
            'labLERsst-auth-token':token
             }};


             let {
                nickname,
                name,
                lastname,
                password,
                passwordCheck,
                atribute,
                role
             } = nuevoUsuarioData 

             if(nickname===""){
                nickname=dataEdit[0].nickname
              }
              if(name===""){
                name=dataEdit[0].name
              }
              if(lastname===""){
                lastname=dataEdit[0].lastname
              }
              if(atribute===""){
                atribute=dataEdit[0].atribute
              }
              if(role===""){
                role=dataEdit[0].role
              }

           
            
             let t = await Axios.put(`http://${IP}:${PORT}/usuarios/` + dataEdit[0]._id, 
              {  nickname,
                name,
                lastname,
                password,
                passwordCheck,
                atribute,
                role} , config );
                         
              
                console.log( nickname,
                    name,
                    lastname,
                    password,
                    passwordCheck,
                    atribute,
                    role)
                console.log(t.data)

                
        let getUserData = await Axios.get(`http://${IP}:${PORT}/usuarios/` + dataEdit[0]._id, config);


        setDataEdit(getUserData?.data)

        let getUsuarios = await Axios.get(`http://${IP}:${PORT}/usuarios/`, config);

        setUsuarios(getUsuarios?.data)

        } catch (err) {
            err.response.data.msg && 
        setError(err.response.data.msg);


        }






    }


    const eliminarCuentaDeUsuario = async (e) =>{
      

      
   try {
    if (window.confirm("Seguro que quiere eliminar este usuario?")) {
     
    let token = localStorage.getItem('auth-token');
    let config = {headers:{
      'labLERsst-auth-token': token
    }};


    await Axios.delete(`http://${IP}:${PORT}/usuarios/`+ e, config);


    let getUsuarios = await Axios.get(`http://${IP}:${PORT}/usuarios/`, config);

    setUsuarios(getUsuarios?.data)
} else {
    return null
}
   } catch (error) {
       console.log(error)
   }


    }

    const crearUsuarioIdentificatorio = async (e) =>{
        try {
            let token = localStorage.getItem('auth-token');
            let config = {headers:{
              'labLERsst-auth-token': token
            }};
    
    
    
            await Axios.post(`http://${IP}:${PORT}/identificando/crearUsuario`,nuevoUsuarioIdent, config);
    
    
           
    
            let clearInput = document.querySelector("input[type='text'],input[type='password']");
            let clearInputs=document.querySelectorAll("input[type='text'],input[type='select'],input[type='password']");
            for(let clearInput of clearInputs)
            clearInput.value = "";
      
            setNuevoUsuarioIdent(nuevoUsuarioIdent)
           

     
         } catch (err ) {
            err.response.data.msg && 
            setError(err.response.data.msg);
         }
    
    
    }

    const cerrarCrearIdentificatorio= async () =>{
try {
    setVerNuevoUsuarioIdentificatorio(false)

    let token = localStorage.getItem('auth-token');
    let config = {headers:{
      'labLERsst-auth-token': token
    }};


   //todos los usuarios internos
   let getUsuariosIndent = await Axios.get(`http://${IP}:${PORT}/identificando/`, config);

   setUsuariosInternos(getUsuariosIndent?.data)

    
} catch (error) {
    console.log(error)    
}
    }

    const eliminarUsuarioIdentificatorio = async (e) =>{
      

      
        try {
         if (window.confirm("Seguro que quiere eliminar este usuario?")) {
          
         let token = localStorage.getItem('auth-token');
         let config = {headers:{
           'labLERsst-auth-token': token
         }};
     
     
         await Axios.delete(`http://${IP}:${PORT}/identificando/`+ e, config);
     
       //todos los usuarios internos
       let getUsuariosIndent = await Axios.get(`http://${IP}:${PORT}/identificando/`, config);

       setUsuariosInternos(getUsuariosIndent?.data)
     } else {
         return null
     }
        } catch (error) {
            console.log(error)
        }
     
     
         }

    const eliminarEstadoDeReparacion = async (e) =>{



    try {
        if (window.confirm("Seguro que quiere eliminar este usuario?")) {
        
        let token = localStorage.getItem('auth-token');
        let config = {headers:{
        'labLERsst-auth-token': token
        }};
    
    
        await Axios.delete(`http://${IP}:${PORT}/generales/estados/`+ e, config);
    
        //todos los estados
        let getEstados = await Axios.get(`http://${IP}:${PORT}/generales/estados`, config);

        setEstados(getEstados?.data)
    } else {
        return null
    }
    } catch (error) {
        console.log(error)
    }
    
    
        }

    const eliminarTipoDeProducto = async (e) =>{



        try {
            if (window.confirm("Seguro que quiere eliminar este usuario?")) {
            
            let token = localStorage.getItem('auth-token');
            let config = {headers:{
            'labLERsst-auth-token': token
            }};
        
        
            await Axios.delete(`http://${IP}:${PORT}/generales/tipos/`+ e, config);
        
            //todos los productos
            let getProductos = await Axios.get(`http://${IP}:${PORT}/generales/tipos`, config);

            setProductos(getProductos?.data)
        } else {
            return null
        }
        } catch (error) {
            console.log(error)
        }
        
        
            }

    // load datos al arrancar
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
            <motion.div 
     
     animate={{ x: 0, opacity: 1 }}
  transition={{ ease: "easeIn", duration: 0.2}}
    style={{x:"-100px", opacity: "0"}} className='col-lg-6 '>

            <div className='border border-info  max'>
               <div className='justify-content-between align-items-center d-flex mb-n1'>
               <span className='ml-4'>Cuentas de sistema</span>

               <span 
               onClick={()=>abrirCrearUsuario()}
               className='btn mt-2 mb-n2 mr-4 btn-link'>Crear cuenta</span>
               </div>
               <hr></hr>
                <ul className='over'>

                {
                    usuarios.map(usrs=>{
                        return(
                        <li key={usrs._id} className='list-group-item-action text-left  d-flex justify-content-between mb-2 ml-n3 align-items-center'>
                        <span
                        title={usrs._id} 
                        onClick={(e)=>verDatosUsuaro(e.target.title)}
                        className='btn  btn-link'
                        >{usrs.name}&nbsp;&nbsp;{usrs.lastname}</span>
                        
                        <div className='button-group'>

                        <span 
                        onClick={(e)=> abrirEditarUsuario(e.target.title)}
                 
                        title={usrs._id}
                        className='btn text-warning point mr-1 edit'>
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

            </motion.div>
            
            {
                // ver usuario unico
                seeUser === true ? 
                <> 

<motion.div 
     
     animate={{ x: 0, opacity: 1 }}
  transition={{ ease: "easeIn", duration: 0.2}}
    style={{x:"100px", opacity: "0"}} className='col-lg-6 '>

<div className='border border-info  max'>
<div className='justify-content-between align-items-center d-flex'>
            <span className='ml-4 mt-2 mb-1'>Usuario: {dataEdit[0].name}&nbsp;&nbsp;{dataEdit[0].lastname}</span>

             
              <span 
               onClick={()=>cerrarEditarCrearCliente()}
               className=' mt-2 mb-n2 mr-4 text-danger point  delete'>X</span>
              
               </div>
   <hr></hr>
  
  <div>





  <div id="dataClient" className='mt-1  text-left  '>

  {
        dataEdit.map(user =>{
            return(
<div key={user._id} className='mt-1'>
<div className='input-group mb-1 mt-4'>

<label
className=' col-lg-6' >
<span className='op50 textchiquito'>Nombre:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{user.name}</span>
</label>
<label
className=' col-lg-6' >
<span className='op50 textchiquito'>Apellido:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{user.lastname}</span>
</label>

</div>

<div className='input-group mb-1 '>
<label
className=' col-lg-6' >
<span className='op50 textchiquito'>permisos:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{user.atribute}</span>
</label>
<label
className=' col-lg-6' >
<span className='op50 textchiquito'>Rol:</span>&nbsp;&nbsp;
<span className='spanData text-break'>{user.role}</span></label>
</div>

</div>
           )
        })
    }
  </div>



















  </div>


    
</div>

</motion.div>


                </> : 
                null
            }




{

verUsuariosUnicos === true ?

            // {/* listar identificadores */}
            <motion.div 
     
            animate={{ x: 0, opacity: 1 }}
         transition={{ ease: "easeIn", duration: 0.2}}
           style={{x:"100px", opacity: "0"}} className='col-lg-6 '>

            <div className='border border-info  max'>

            <div className='justify-content-between align-items-center d-flex mb-n1'>

    <span className='ml-4 mt-2 mb-2'>Cuentas de identificación</span>
   
   { verNuevoUsuarioIdentificatorio === true ?

<span 
onClick={()=>cerrarCrearIdentificatorio()}
className=' mt-2 mb-n2 mr-4 text-danger point  delete'>X</span>

:
    <span 
               onClick={()=>setVerNuevoUsuarioIdentificatorio(true)}
               className='btn mt-2 mb-n2 mr-4 btn-link'>Crear Usuario</span>}
    </div>
    <hr></hr>

  {  
verNuevoUsuarioIdentificatorio === true ? <>


<div className="row p-2 ">


<div className='col-lg-12 mb-4'>
<input 
type="text"
 className='form-control'
 placeholder="nombre"
 id="name"
 name="name"
 onChange={setDatosNuevoUsuarioIdentificatorio}
/>

</div>
<div className='col-lg-6 '>
<input 
type="password"
 className='form-control'
 placeholder="contraseña"
 id="password"
 name="password"
 onChange={setDatosNuevoUsuarioIdentificatorio}
/>
</div>
<div className='col-lg-6 '>
<input 
type="password"
 className='form-control'
 placeholder="Repita la contraseña"
 id="passwordCheck"
 name="passwordCheck"
 onChange={setDatosNuevoUsuarioIdentificatorio}
/>
</div>

<div className='col-lg-12 mt-4'>

<button 
onClick={()=>crearUsuarioIdentificatorio()}
className='btn btn-block btn-success'>Crear</button>
</div>
</div>





</>
: 

  <>
    <ul className='adminPanelOverflow '>

    { 
        usuariosInternos.map(ident=>{
            return(
            <li key={ident._id} className='list-group-item-action text-left  d-flex justify-content-between mb-2 ml-n3 align-items-center'><span className='ml-3'>{ident.name}</span>
            
            <div className='button-group'>

            {/* <span className='btn text-warning point mr-1 edit'>
                Editar
            </span> */}
            <span 
            title={ident._id}
            onClick={(e)=>eliminarUsuarioIdentificatorio(e.target.title)}
            className='btn text-danger point mr-2 delete'>
                X
            </span>
            
            </div>
            </li>
            



            )
        })
    }
    </ul>
    </> 
   
   }

    
</div>

</motion.div>
: null
}
{

viewCreateUsuarios === false ?
null
:
    // crear o editar usuario
    <motion.div 
     
    animate={{ x: 0, opacity: 1 }}
 transition={{ ease: "easeIn", duration: 0.2}}
   style={{x:"100px", opacity: "0"}} className='col-lg-6 '>

            <div className='border border-info p-2 max'>
            <div className='justify-content-between align-items-center d-flex'>
               <span className='ml-4'>{editarUsuarios === false ?<> Crear usuario general </> : <>Editar Usuario</>}</span>

             
              <span 
               onClick={()=>cerrarEditarCrearCliente()}
               className=' mt-2 mb-n2 mr-4 text-danger point  delete'>X</span>
              
               </div>
    <hr></hr>
    <div className='over input-group'>

    <div className="col-md-4 marginbot">

        {
            editarUsuarios === true ? 
            <>
             <input 
            type="text"
            className="form-control"
            placeholder={dataEdit[0]?.nickname}
            name="nickname"
            id="nickname"
            onChange={setDatosNuevoUsuario}
            />
             </> :
              <>
            
            
             <input 
            type="text"
            className="form-control"
            placeholder="Usuario"
            name="nickname"
            id="nickname"
            onChange={setDatosNuevoUsuario}
            />
             </>

   
    
    }


    </div>
    <div className="col-md-4 marginbot">

    {
            editarUsuarios === true ? 
            <>
             <input 
            type="text"
            className="form-control"
            placeholder={dataEdit[0]?.name}
            name="name"
            id="name"
            onChange={setDatosNuevoUsuario}
            />
             </> :
              <>

    <input 
    type="text"
    className="form-control"
    placeholder="nombre"
    name="name"
    id="name"
    onChange={setDatosNuevoUsuario}
    />

</>
}


    </div>
    <div className="col-md-4 marginbot">

    {
            editarUsuarios === true ? 
            <>
             <input 
            type="text"
            className="form-control"
            placeholder={dataEdit[0]?.lastname}
            name="lastname"
            id="lastname"
            onChange={setDatosNuevoUsuario}
            />
             </> :
              <>
    <input 
    type="text"
    className="form-control"
    placeholder="Apellido"
    name="lastname"
    id="lastname"
    onChange={setDatosNuevoUsuario}
    />
</>
}


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
{
            editarUsuarios === true ? 
            <>
 <select
    type="text"
    className="custom-select"
    defaultValue='disabled'
    name="atribute"
    id="atribute"
    onChange={setDatosNuevoUsuario}
    >
           <option  disabled value='disabled'>{dataEdit[0]?.atribute}</option>
        <option >user</option>
        <option >admin</option>

    </select>


            </>
            :
            <>
 
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
    </>
}
    </div>
    <div className="col-md-6 marginbot">
    {
            editarUsuarios === true ? 
            <>
    <select
    type="text"
    className="custom-select"
    defaultValue='disabled'
    name="role"
    id="role"
    onChange={setDatosNuevoUsuario}
    >
           <option  disabled value='disabled'>{dataEdit[0]?.role}</option>
        <option >vendedor</option>
        <option >taller</option>
    </select>



</>
            :
            <>
 
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

    </>
}

    </div>


   
   
    </div>
    {
            editarUsuarios === true ? 
            <> 
  <button 
    onClick={()=>editarUsuarioExistente()}
    className='btn btn-success btn-block'>Editar</button>
            </> :

            <>
    <button 
    onClick={()=>crearUsuarioGeneral()}
    className='btn btn-success btn-block'>Crear</button>

    </> }
    </div>

</motion.div>
}




            {/* lista de estados editables */}
            <motion.div 
     
     animate={{ x: 0, opacity: 1 }}
  transition={{ ease: "easeIn", duration: 0.2}}
    style={{x:"-100px", opacity: "0"}} className='col-lg-6  mt-4'>

            <div className='border border-info p-2 max'>
                
                <div className='justify-content-between align-items-center d-flex'>
                <span>Listar y eliminar estados de reparaciones</span>
               </div>
               <hr></hr>
               <div className='over adminPanelOverflow '>

               <ul className=' mt-1 ml-n2 '>
                  

                  {
                      estados.map(stat=>{
                          return(
                          <li key={stat._id} className='pl-2 list-group-item-action text-left  d-flex justify-content-between mb-2 ml-n3 align-items-center'>{stat.stateAdd}
                          
                          <div className='button-group'>
  
                    
                          <span
                          title={stat._id}
                          onClick={(e)=>eliminarEstadoDeReparacion(e.target.title)}
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

            </motion.div>

            {/* lista de  */}
            <motion.div 
     
     animate={{ x: 0, opacity: 1 }}
  transition={{ ease: "easeIn", duration: 0.2}}
    style={{x:"100px", opacity: "0"}} className='col-lg-6  mt-4'>

<div className='border border-info p-2 max'>

<div className='justify-content-between align-items-center d-flex'>
<span>Listar y eliminar categorías de productos</span>
               </div> 
               <hr></hr>

 
   <div className='over adminPanelOverflow'>
   <ul className='mt-1 ml-n2'>

{
    productos.map(usrs=>{
        return(
        <li key={usrs._id} className='pl-2 list-group-item-action text-left  d-flex justify-content-between mb-2 ml-n3 align-items-center'>{usrs.typeProduct}
        
        <div className='button-group'>

  
        <span 
        title={usrs._id}
        onClick={(e)=>eliminarTipoDeProducto(e.target.title)}
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

</motion.div>





           </div>














        </div>
    )
}

export default Admin
