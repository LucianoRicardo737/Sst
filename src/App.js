import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Axios from 'axios';

import { IP, PORT } from './env'
import UserContext from './context/UserContext';

import Navegation from './components/layout/Navegation';
import Login from './components/auth/Login';
import Sales from './components/routes/Sales';
import Taller from './components/routes/Taller';
import Admin from './components/routes/Admin';

import 'animate.css/animate.css'
import Home from './components/routes/Home';

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  const [admin, setAdmin] = useState(false)
  const [isLog, setIsLog] = useState(false)

  useEffect(() => {
    try {
      if (userData.user === undefined) {
        setIsLog(false)
      }
      if (userData.user !== undefined) {
        setIsLog(true)
      }
    } catch (error) {
      console.log(error)
    }
  }, [setUserData, setIsLog, userData.user])

  useEffect(() => {
    try {
      if (isLog === true) {
        if (userData.user?.atribute === "admin") {
          setAdmin(true)
        } else {
          setAdmin(false)
        }
      } else {
        setAdmin(false)
      }
    } catch (error) {
      console.log(error)
    }
  }, [isLog, userData.user?.atribute])

  useEffect(() => {

    const checkLoggedIn = async () => {
      //configuracion del header
      let token = localStorage.getItem('auth-token')
      const config = {
        headers: {
          'labLERsst-auth-token': token
        }
      };
      //si no existe es null
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      //buscamos
      const tokenExistInServer = await Axios.post(`http://${IP}:${PORT}/acciones/validarToken`, null, config);
      //cargamos datos
      if (tokenExistInServer.data) {
        const userDataAll = await Axios.get(`http://${IP}:${PORT}/acciones`, config);

        setUserData({
          token,
          user: userDataAll.data
        })
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className="App roboto">
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navegation admin={admin} isLog={isLog} />
          <Route path='/login' component={Login} />

          {admin === true ? <Route path='/admin' component={Admin} /> : null}

          {
            isLog === true ? <Route path='/ventas' component={Sales} /> : null
          }
          {
            isLog === true ?
              <Route path='/taller' component={Taller} />
              : null
          }

        </UserContext.Provider>
        {
          isLog === true ?
            <Route path='/' exact component={Home} />
            : null
        }

      </Router>

    </div>
  );
}

export default App;
