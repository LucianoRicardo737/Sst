import {useState,  useContext} from 'react';
import Axios from 'axios';
import {IP,PORT} from '../../../env';
import SeOrHideOrdersContext from '../../../context/SeOrHideOrdersContext';
import UserContext from '../../../context/UserContext';
import ClientDataContext from '../../../context/ClientDataContext';


import socket from '../../../io';

const ModalSingleClien = () => {

  //user context
  const {userData}=useContext(UserContext)
    const user = userData.user

    //Data del cliente a leer
    const {dataClient}=useContext(ClientDataContext);



    let initialState={
        numberid:"",
        type:"",
        brand:"",
        model:"",
        nserie:"",
        failure:"",
        state:"",
        observation:"",
        client:"",
        createdby:user.id
      }

      //cargar los datos de la nueva orden
    const [newOrder, setNewOrder]=useState(initialState)

    newOrder.client=dataClient[0]._id

      //capturando inputs
    const handleChangeText = (e)=>{
        setNewOrder({...newOrder, [e.target.name]:e.target.value});
      }


         //cargar nuevo cliente
    const submit = async ()=> {
      console.log(newOrder)



        try {

          const token = localStorage.getItem('auth-token');
          const config = { headers:{
            'labLERsst-auth-token':token
          }};

          //enviamos la info con el token
          await Axios.post(`http://${IP}:${PORT}/reparaciones/nuevaReparacion`,newOrder, config);



          //limpiando los inputs
          let clearInput = document.querySelector("input[type='text'],input[type='number'],textarea");
          let clearInputs=document.querySelectorAll("input[type='text'],input[type='number'],textarea");
          for(let clearInput of clearInputs)
          clearInput.value = "";
          console.log(clearInput)


  
          // listAllOrders()
            socket.emit('order');

        } catch (error) {
          console.log(error)
        }
      }

      //hide new order
      const {setSeOrHideNewOrder} = useContext(SeOrHideOrdersContext);

      //cerrar
      const hideNewOrder = () =>{
        setSeOrHideNewOrder(false)
      }

    return (






      <div className="row">

      <div className="col-lg-12" >

        {
                dataClient.map(client=>{
                    return(
                    <h3 key={client._id}>Nueva orden a:&nbsp;&nbsp;{client.name}&nbsp;{client.lastname}</h3>
                    )
                })
            }
      </div>


  <div className="col-md-4 marginbot">

<div className='input-group'>

<button className='btn btn-outline-info rig'>+</button>

<select
className="custom-select"
id="type"
name='type'
onChange={handleChangeText}
defaultValue='disabled'>
        <option  disabled value='disabled'>Seleccionar Tipo</option>
        <option >Cocina</option>
        <option >Heladera</option>
        <option >Aire Acondicionado</option>
      </select>

</div>
  </div>

  <div className="col-md-4 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Marca"
    name='brand'
    id='brand'
    onChange={handleChangeText} />
  </div>

  <div className="col-md-4 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Modelo"
    name='model'
    id='model'
    onChange={handleChangeText} />
  </div>

  <div className="col-md-6 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Numero De Serie"
    name='nserie'
    id='nserie'
    onChange={handleChangeText} />
  </div>

  <div className="col-md-6 marginbot">
  <div className='input-group'>

<button className='btn btn-outline-info rig'>+</button>

<select
className="custom-select"
id="state"
name='state'
defaultValue='disabled'
onChange={handleChangeText}>
        <option  disabled value='disabled'>Estado Inicial</option>
        <option >A Reparar</option>
        <option >Garantia</option>
        <option >Retirar En Domicilio</option>
        <option >En Reparacion</option>
        <option >Llamar Al Cliente</option>
        <option >Entregar Sin Reparacion</option>
        <option >Listo Para Entregar</option>
      </select>

</div>
  </div>

  <div className="col-md-12 marginbot">
    <input
    type="text"
    className="form-control"
    placeholder="Detalle la falla del equipo"
    name='failure'
    id='failure'
    onChange={handleChangeText} />
  </div>

  <div className="col-md-12 marginbot">
  <textarea
  className="form-control"
  placeholder='Observaciones extras'
  name='observation'
  id='observation'
  onChange={handleChangeText} ></textarea>
  </div>

  <div className="col-md-12 btn-group">
    <button
    type="button"
    data-dismiss="modal"
    onClick={()=>submit()}
    className="btn btn-success fif ">
      <span >Crear Orden</span></button>
    <button
    type="button"
    className="btn btn-secondary fif"
    onClick={hideNewOrder}>
      Cerrar</button>

      </div>



</div>



    )
}

export default ModalSingleClien
