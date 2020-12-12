import React from 'react';
import './exito.css'
export default function ErrorUsuarios(props){
    return (
        <div className='error-notice2 animate__animated animate__headShake '>
            <span className='errorMessage'>{props.message}</span>
            <button className='closeErrorButton' onClick={props.clearError}>X</button>
        </div>
    )
}