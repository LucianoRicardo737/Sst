
import {useState,useEffect} from 'react';
//tempo
import socket from './io';



const Test = () => {

const [data, setData]=useState([]);

useEffect(()=>{
  socket.emit('cliente');
  socket.on('clientes',data => {
   setData(data)
 });

},[])

const testButton = ()=>{

    socket.emit('cliente');

    socket.on('clientes',data => {
     setData(data)
   });

}



  return (
    <div className='container mt-5 text-center p-2 border'>

      <button
      onClick={testButton}
      className='btn btn-block btn-danger'>TEST</button>

    {
      data.slice(0, 150).sort(function(a, b){return a-b}).map(client =>{
        return (
          <ul key={client._id}>

            <li >{client.name}</li>

          </ul>
        )
      })
    }


    </div>
  )
}

export default Test
