import { useState, useEffect } from 'react';
import './sales.css'

import Clients from './clients/Clients';
import Orders from './orders/Orders';
import SingleClient from './clients/SingleClient';
import CreateClient from './clients/CreateClient';
import CreateOrder from './orders/CreateOrder';
import { SingleOrder } from './orders/SingleOrder';

import Error from '../misc/Error'
import Exito from '../misc/Exito'

import { motion } from 'framer-motion'
import { useLocation } from "react-router-dom"
const Sales = () => {

  let location = useLocation();
  let loc = location.pathname


  const test = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 1, duration: 1 }
    },
    exit: {
      x: "-100w",
      transition: { ease: "easeInOut" }
    }
  }

  //errores
  const [error, setError] = useState(undefined);
  const [exito, setExito] = useState(undefined)
  //mostrar u ocultar ordenes/cliente
  const [seOrHideOrders, setSeOrHideOrders] = useState(true);
  //mostrar u ocultar nuevo cliente
  const [seOrHideNewClient, setSeOrHideNewClient] = useState(false);
  //mostrar u ocultar nueva orden
  const [seOrHideNewOrder, setSeOrHideNewOrder] = useState(false);
  //mostrar u ocultar clientes/ orden unica
  const [seOrHIdeOrder, setSeOrHideOrder] = useState(false);

  const [hideAndSeeData, setHideAndSeeData] = useState(false)
  //data del cliente a mostrar
  const [dataClient, setDataClient] = useState([]);
  //data de la orden a mostarar
  const [dataOrder, setDataOrder] = useState([]);


  useEffect(() => {
    try {
      if (exito !== undefined) {
        setTimeout(() => {
          setExito(undefined)
        }, 2500);
      }
    } catch (error) {

    }
  }, [exito])

  return (
    <>
      <div className='contenedor'>


        {
          error && (<Error message={error} clearError={() => setError(undefined)} />)
        }

        {
          exito && (<Exito message={exito} clearError={() => setExito(undefined)} />)
        }


        <div className='row'>
          <div className='col-lg-12 '>

            {
              seOrHideNewClient ?

                <motion.div

                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeIn", duration: 0.2 }}
                  style={{ y: "-100px", opacity: "0" }}

                  id="createClientTransition" className=' border  border-info p-4 mb-3 create'>

                  <CreateClient setSeOrHideNewClient={setSeOrHideNewClient} setError={setError} setExito={setExito} />
                </motion.div> : null

            }



            {
              seOrHideNewOrder ?

                <motion.div

                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeIn", duration: 0.2 }}
                  style={{ y: "-100px", opacity: "0" }} className='border  border-info p-4 mb-3'>
                  <CreateOrder setSeOrHideNewOrder={setSeOrHideNewOrder} setError={setError} dataClient={dataClient} setExito={setExito} />
                </motion.div> : null

            }


          </div>
          {
            seOrHIdeOrder === false ?


              <div className='col-lg-6 '>


                <motion.div
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ ease: "easeIn", duration: 0.2 }}
                  style={{ x: "-100px", opacity: "0" }}



                  className='border  border-info p-2 mb-3 altoTotal'>


                  <Clients setSeOrHideOrders={setSeOrHideOrders} setDataClient={setDataClient} setSeOrHideNewClient={setSeOrHideNewClient} setSeOrHideNewOrder={setSeOrHideNewOrder} setHideAndSeeData={setHideAndSeeData} />

                </motion.div>


              </div>

              :




              <motion.div

                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeIn", duration: 0.2 }}
                style={{ x: "-100px", opacity: "0" }}
                className='col-lg-6 '>

                <div





                  className='border border-info p-2 mb-3 altoTotal'>
                  <SingleOrder dataOrder={dataOrder} setDataOrder={setDataOrder} setSeOrHideOrder={setSeOrHideOrder} dataClient={dataClient} setDataClient={setDataClient} setSeOrHideOrders={setSeOrHideOrders} setError={setError} loc={loc} />




                </div>

              </motion.div>

          }



          {
            seOrHideOrders === true ?
              <div className='col-lg-6 '>

                <motion.div
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ ease: "easeIn", duration: 0.2 }}
                  style={{ x: "100px", opacity: "0" }} className='border altoTotal border-info p-2 '>
                  <Orders setDataOrder={setDataOrder} setSeOrHideOrder={setSeOrHideOrder} setDataClient={setDataClient} />
                </motion.div>
              </div>

              :

              <motion.div

                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeIn", duration: 0.2 }}
                style={{ x: "100px", opacity: "0" }}
                className='col-lg-6 '>



                <div className='border border-info p-2 altoTotal '>

                  <SingleClient setSeOrHideNewOrder={setSeOrHideNewOrder} setSeOrHideNewClient={setSeOrHideNewClient} setSeOrHideOrder={setSeOrHideOrder} setSeOrHideOrders={setSeOrHideOrders} setDataOrder={setDataOrder} dataClient={dataClient} hideAndSeeData={hideAndSeeData} setHideAndSeeData={setHideAndSeeData} setDataClient={setDataClient} setError={setError} />


                </div>
              </motion.div>

          }


        </div>




      </div>
    </>
  )
}

export default Sales
