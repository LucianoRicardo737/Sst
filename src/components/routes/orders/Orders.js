import { memo, useState, useEffect, useCallback } from 'react'

import './orders.css';

import Axios from 'axios';
import { IP, PORT } from '../../../env'

import socket from '../../../io';

const Orders = memo(({ setSeeClient, seeClient, setDataOrder, setSeOrHideOrder, setDataClient, change, loc }) => {

  // console.log('Soy Ordenes')
  //seteo de ordenes
  const [orders, setOrders] = useState([]);
  //Buscar ordenes
  const [searchOrders, setSearchOrders] = useState("");
  const [searchOrdersForState, setSearchOrdersForState] = useState("");

  // condicional el render
  const [render, setRender] = useState(true);

  //estados de carga de datos de variables
  const [stateData, setStateData] = useState([]);

  const [verEntregados, setVerEntregados] = useState(false)
  const [verAnulados, setVerAnulados] = useState(false)


  const listAllOrders = useCallback(() => {
    try {
      socket.emit('order');
      socket.on('orders', orders => {
        setOrders(orders);
      })
    } catch (error) {
      console.log(error)
    }
  }, []);

  //peticion al backend

  const seeOrder = async (e) => {



    let token = localStorage.getItem('auth-token');
    let config = {
      headers: {
        'labLERsst-auth-token': token
      }
    };

    let order = await Axios.get(`http://${IP}:${PORT}/reparaciones/` + e, config);

    let idClient = order.data[0].client

    let client = await Axios.get(`http://${IP}:${PORT}/clientes/` + idClient, config);


    setDataOrder(order?.data);
    setDataClient(client?.data);
    setSeOrHideOrder(true);
    if (loc === "/taller") {
      change()
      setSeeClient(false)
    }


  }


  const searchForState = (e) => {
    document.getElementById('searchOrder').value = ""
    setSearchOrders("")
    setSearchOrdersForState(e)
  }

  const searchForOrderNumber = (e) => {
    setSearchOrdersForState("");
    document.getElementById('state').value = "disabled"
    setSearchOrders(e)



  }

  const clearClick = () => {
    setSearchOrders("")
    setSearchOrdersForState("");
    document.getElementById('searchOrder').value = ""
    document.getElementById('state').value = "disabled"
  }


  // filtro de busqueda de orden de trabajo
  let searchFilter = orders.filter(function (order) {







    if (searchOrders === "") {
      return order.state.toString().includes(searchOrdersForState.toString())
    }

    if (order.numberid.toString() === searchOrders.toString()) {
      return order.numberid.toString().includes(searchOrders.toString())
    }


    else {
      return null
    }
  })


  useEffect(() => {
    if (render === true) {
      listAllOrders();
    }
    return () => {
      setRender(false)
    };

  }, [listAllOrders, render]);


  //cargar los estados de reparacion
  const SeeData = useCallback(async () => {
    let token = localStorage.getItem('auth-token');
    let config = {
      headers: {
        'labLERsst-auth-token': token
      }
    };


    let states = await Axios.get(`http://${IP}:${PORT}/generales/estados`, config);

    setStateData(states.data);



    // console.log("Ver data")
  }, [])

  const mostrarOrdenesEntregadas = () => {
    if (verEntregados === false) {
      setVerEntregados(true)

    } else {
      setVerEntregados(false)
    }

  }

  const mostrarOrdenesAnuladas = () => {
    if (verAnulados === false) {
      setVerAnulados(true)

    } else {
      setVerAnulados(false)
    }

  }



  useEffect(() => {
    if (render === true) {
      SeeData()
    }
    return () => {
      setRender(false)
    }
  }, [SeeData, render])

  const showClients = () => {



    setSeOrHideOrder(false)
    setSeeClient(true)


    let idOrders = document.getElementById('idOrders');
    idOrders.classList.add('col-lg-6')
    idOrders.classList.remove('col-lg-12')
  }



  let fecha = new Date();

  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset() / 60)


  //Año
  let year = fecha.getFullYear();
  //Mes
  let mes = fecha.getMonth() + 1;
  //Día
  let dia = fecha.getDate();


  let dayToStringEdit = dia.toString()
  if (dayToStringEdit.length === 1) {
    dia = "0" + dia
  }

  let mesToStringEdit = mes.toString()
  if (mesToStringEdit.length === 1) {
    mes = "0" + mes
  }


  //Lo ordenas a gusto.
  let dateNowComplete = dia + "/" + mes + "/" + year;

  function VerClientes() {

    try {
      if (loc === "/taller") {
        return (

          seeClient === true ? null :
            <button
              onClick={showClients}
              className='btn btn-info rig'
            >Ver Clientes</button>)
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
    }
  }




  return (

    <div id='orders'>

      {/* <button 
          onClick={()=>{wptest()}}
          className="btn btn-block btn-danger">ENVIAR WP</button> */}


      <div className='modal-header noBorderBut'>

        <div className='titleFontOrders'>
          <span>Ordenes de Trabajo</span>


        </div>
        <div className="input-group-text">
          <span>Entregados:&nbsp; </span>
          <input type="checkbox" aria-label="Checkbox for following text input"
            onChange={() => mostrarOrdenesEntregadas()}
          />&nbsp;&nbsp;
         <span>Anulados:&nbsp; </span>
          <input type="checkbox" aria-label="Checkbox for following text input"
            onChange={() => mostrarOrdenesAnuladas()}
          />
        </div>
      </div>

      {/* barra de busqueda y botones de accion */}
      <div className='input-group mt-1'>

        <div>
          <VerClientes />

        </div>
        <input
          placeholder='Buscar por numero'
          id='searchOrder'
          type='text'
          className={loc === "/taller" ? "form-control  border border-info" : "rounded-left form-control  border border-info"}
          onClick={() => { clearClick() }}
          onChange={(e) => searchForOrderNumber(e.target.value)}
        />

        <select
          className="custom-select border border-info backgreey achicar"
          id="state"
          name='state'
          defaultValue='disabled'
          onChange={(e) => searchForState(e.target.value)}
        >
          <option disabled value='disabled'>Buscar por Estado</option>
          <option >a revisar</option>
          <option >ir a domicilio</option>
          <option >entregado</option>
          <option >llamar al cliente</option>
          <option >reparacion aceptada</option>
          <option >reparacion cancelada</option>
          <option >listo para entregar</option>
          <option >listo sin reparacion</option>
          <option >esperando respuesta</option>
          <option >anulado</option>
          {
            stateData?.sort(function (a, b) { return a - b }).map(state => {
              return (
                <option key={state._id}>{state.stateAdd}</option>
              )
            })
          }
        </select>
      </div>
      {/* tabla de resultados */}

      <table className="table  textchiquito2 table-sm  mt-1">
        <thead>
          <tr >
            <th scope="col">N°</th>
            <th scope="col">Tipo</th>
            <th scope="col">Marca</th>
            <th scope="col">Estado</th>
            {

              loc === "/taller" ?

                <th scope="col">Fecha de ingreso</th>

                : null

            }
            <th scope="col">Fecha de entrega</th>
          </tr>
        </thead>
      </table>

      {/* <table className="table  table-sm table-hover overflow"> */}
      <div className='overflow'>
        <table className="table table-sm table-hover ">

          <tbody >
            {
              searchFilter.slice(0, 150).sort(function (a, b) { return a - b }).filter(function (order) {
                if (verEntregados === false) {

                  return (order.state !== "entregado")
                } else {
                  return (order.state)
                }

              }).filter(function (order) {
                if (verAnulados === false) {

                  return (order.state !== "anulado")
                } else {
                  return (order.state)
                }
              }).map(order => {



                let fecha = new Date(order.promised);

                fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset() / 60)
                //Año
                let year = fecha.getFullYear();
                //Mes
                let mes = fecha.getMonth() + 1;
                //Día
                let dia = fecha.getDate() + 1;


                let dayToStringEdit = dia.toString()
                if (dayToStringEdit.length === 1) {
                  dia = "0" + dia
                }

                let mesToStringEdit = mes.toString()
                if (mesToStringEdit.length === 1) {
                  mes = "0" + mes
                }


                //Lo ordenas a gusto.
                let dateEdit = dia + "/" + mes + "/" + year;





                function FechaDeEntrega() {
                  try {

                    if (order.state === "entregado") {
                      return (
                        <td className="text-break text-success">{dateEdit}</td>
                      )
                    }
                    if (dateNowComplete === dateEdit) {
                      return (
                        <td className="text-break text-warning">{dateEdit}</td>
                      )
                    }
                    if (dateNowComplete > dateEdit) {
                      return (
                        <td className="text-break text-danger">{dateEdit}</td>
                      )
                    }
                    else {
                      return (
                        <td className="text-break ">{dateEdit}</td>)
                    }
                  } catch (error) {
                    console.log(error)
                  }
                }



                let fechaDeCreacion = new Date(order.createdAt);

                fechaDeCreacion.setMinutes(fechaDeCreacion.getMinutes() + fechaDeCreacion.getTimezoneOffset() / 60)
                //Año
                let añoDeCreacion = fechaDeCreacion.getFullYear();
                //Mes
                let mesDeCreacion = fechaDeCreacion.getMonth() + 1;
                //Día
                let DiaDeCreacion = fechaDeCreacion.getDate() + 1;


                let dayToStringEditCreate = DiaDeCreacion.toString()
                if (dayToStringEditCreate.length === 1) {
                  DiaDeCreacion = "0" + DiaDeCreacion
                }

                let mesToStringEditCreate = mesDeCreacion.toString()
                if (mesToStringEditCreate.length === 1) {
                  mesDeCreacion = "0" + mesDeCreacion
                }


                //Lo ordenas a gusto.
                let dateCreated = DiaDeCreacion + "/" + mesDeCreacion + "/" + añoDeCreacion;

                function FechaDeIngreso() {
                  try {

                    return (
                      <td className="text-break ">{dateCreated}</td>)


                  } catch (error) {
                    console.log(error)
                  }
                }





                return (
                  <tr key={order._id}>

                    <th scope='row'>
                      <button
                        className='btn btn-link '
                        value={order._id}
                        onClick={(e) => seeOrder(e.target.value)}
                      >{order.numberid}
                      </button>
                    </th>
                    <td className="text-break">{order.type}</td>
                    <td className="text-break">{order.brand}</td>
                    <td className="text-break">{order.state}</td>
                    {

                      loc === "/taller" ?
                        <FechaDeIngreso />

                        :
                        null

                    }


                    {

                      order.promised === null || order.promised === undefined ?

                        <td className="text-break text-warning"></td>

                        :



                        <FechaDeEntrega />




                    }



                  </tr>
                )
              })
            }
          </tbody>


        </table>
      </div>
    </div>
  )
})

export default Orders
