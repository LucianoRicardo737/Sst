import React, { useState, useContext } from 'react'
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import { IP, PORT } from '../../env';
import Axios from 'axios';

import './login.css'
import Error from '../misc/Error';

const Login = () => {

    const [error, setError] = useState(undefined);
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const initialState = {
        nickname: "",
        password: ""
    };

    const [dataUser, setDataUser] = useState(initialState)

    const handleChangeText = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            const userLogin = { nickname: dataUser.nickname, password: dataUser.password };
            const userLogRes = await Axios.post(`http://${IP}:${PORT}/acciones/login`, userLogin);
            setUserData({
                token: userLogRes.data.token,
                user: userLogRes.data.userExisting
            });
            let token = userLogRes.data.token;
            localStorage.setItem('auth-token', token);
            history.push('/ventas');
        } catch (err) {
            err.response.data.msg &&
                setError(err.response.data.msg);
        }
    }

    return (
        <div className='container'>

            {
                error && (<Error message={error} clearError={() => setError(undefined)} />)
            }
            <h3 className='text-center'
                style={{ marginTop: "70px" }}>Ingrese su cuenta</h3>

            <form onSubmit={submit}>
                <div className='form-group'>
                    <input
                        name='nickname'
                        onChange={handleChangeText}
                        value={dataUser.nickname}
                        className="form-control"
                        placeholder='Ingrese el nombre de usuario'
                    />
                </div>
                <div className='form-group'>
                    <input
                        name='password'
                        onChange={handleChangeText}
                        value={dataUser.password}
                        className="form-control"
                        type="password"
                        placeholder='Ingrese la contraseña'
                    />
                </div>
                <div className='form-group'>

                    <button
                        type='submit'
                        className='btn btn-block btn-info'
                    >
                        Ingresar
                </button>

                </div>
            </form>

        </div>
    )
}

export default Login
