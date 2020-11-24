import {useEffect } from 'react';

import socket from './io'


const Test = () => {

useEffect(()=>{
  socket.emit('connection')
});



  return (
    <div className='container mt-5 text-center p-2 border'>


    </div>
  )
}

export default Test
