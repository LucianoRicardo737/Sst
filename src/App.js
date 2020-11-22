import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Axios from 'axios';

import {IP, PORT} from './env'
import UserContext from './context/UserContext';

import Navegation from './components/layout/Navegation';
import Login from './components/auth/Login';
import Sales from './components/routes/Sales';

import Test from './testIo';
import socket from './io';


function App() {

  socket.emit('conectado', "Hola desde cliente");

  const [userData, setUserData]=useState({
    token:undefined,
    user:undefined
  });



  useEffect(()=>{
   const checkLoggedIn = async ()=>{
    //configuracion del header
    let token = localStorage.getItem('auth-token')
    const config ={headers:{
      'labLERsst-auth-token':token
    }};
    //si no existe es null
    if (token===null){
      localStorage.setItem('auth-token', '');
      token='';
    }
    //buscamos
    const tokenExistInServer = await Axios.post(`http://${IP}:${PORT}/acciones/validarToken`,null,config);
    //cargamos datos
    if(tokenExistInServer.data){
      const userDataAll=await Axios.get(`http://${IP}:${PORT}/acciones`,config);

      setUserData({
        token,
        user:userDataAll.data
      })
    }
  };
    checkLoggedIn();
  },[]);






  return (
    <div className="App roboto">

      <Router>
      <UserContext.Provider value={{userData, setUserData}}>
      <Navegation/>
      <Route path='/login'  component={Login}/>



      <Route path='/ventas' component={Sales} />
      </UserContext.Provider>
      <Route path='/' exact component={Test}/>
     </Router>

    </div>
  );
}

export default App;
