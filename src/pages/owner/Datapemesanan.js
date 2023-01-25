import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import css from "../../styles/page/owner/Datapemesanan.module.css"
import Navbar from "../../component/Navbar"
import Footer from "../../component/Footer"
import Sidebarowner from "../../component/Sidebar_owner"
import { getPemesanan,pemesananACC, finishOrder } from "../../utils/axios"
import { Modal } from 'react-bootstrap'
import Empty from '../../component/Empty';


function Datapemesanan() {

  const [pemesanan, setPemesanan] = useState([])
  const [id, setId] = useState(null)
  const [showedit, setShowedit] = useState(false)
  const [image, setImage] = useState(null)
  const [status, setStatus] = useState(null)
  const [active, setActive] = useState('paid')

  const valueStatus = (e) => {setStatus(e.target.value)}
  const data = [
    { label: "Active", value: "paid" },
    { label: "Finish", value: "process" },    
 ];

  useEffect(() => {
    const getToken = localStorage.getItem('token')
    getPemesanan(getToken,active)
    .then((res) => {
      console.log(res.data)
      setPemesanan(res.data.data)
    })
    .catch((err) => {console.log(err)})
  }, [active])

  const handleStatus = async () => {
    try {
      const getToken = await localStorage.getItem('token')
      const result = await pemesananACC(id, getToken, {status: status})
      const response = await getPemesanan(getToken,active)
      setPemesanan(response.data.data)
      toast.success(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
      setShowedit(false)
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const handleFinish = async (idFinish) => {
    try {
      const getToken = await localStorage.getItem('token')
      const result = await finishOrder(idFinish, getToken)
      const response = await getPemesanan(getToken,active)
      setPemesanan(response.data.data)
      toast.success(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
      setShowedit(false)
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  

  return (
    <>
    <ToastContainer />
      <Navbar />
        <div className="container-fluid">
          <div className={css.container_left_right}>
            {/* container left */}
            <Sidebarowner page='datapemesananowner' />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>
              <div className="">
                <p className={css.data_title}>Data Pemesanan</p>
                <div className="py-3">
                <select className="form-select" data-size='5' aria-label="Default select example" onClick={(e) => {setActive(e.target.value); console.log(e.target.value)} }>
                  {/* <option selected >Open this select menu</option> */}
                  {data.map((index) => (
                    <option value={index.value}>{index.label}</option>
                  ))}
                </select>
                </div>
              </div>
              {pemesanan.length > 0 
              ? pemesanan.map((e, index) => (
                <div key={index} className="d-flex flex-row justify-content-between align-items-center py-3">
                  <div className="d-flex flex-row gap-3">
                    <img src={e.image} alt="bukti" width='100' height='100' />
                    <div className={css.title}>
                      <p>{e.tipe_kontrakan}</p>
                      <p>{e.owner}</p>
                      <p>{(e.order_date).slice(0,10)}</p>
                      <p>{e.payment_method}</p>
                    </div>
                  </div>
                  {e.status_booking === 'paid' ? <button onClick={() => {setId(e.id);setImage(e.image); setShowedit(true)}} className={css.btn_change}>Change Status</button> : <button onClick={() => {handleFinish(e.id)}} className={css.btn_change}>Finish Order</button>}
                </div>
              )) : <Empty name='Data' /> }
            </div>
          </div>
        </div>
      <Footer />

            {/* modal delete kontrakan */}
            <Modal
              show={showedit}
              onHide={() => setShowedit(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
              backdrop='static'
              centered>
              <Modal.Header closeButton className={`text-white`} style={{backgroundColor:'#3a3a3a'}}>
                <Modal.Title id="example-custom-modal-styling-title">
                  Change Status payment
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className='pt-3'>
                <div className="d-flex flex-column align-items-center">
                  <img src={image} alt="bukti" width='200' height='200' />
                  <div className="py-3 d-flex flex-row align-items-center gap-4">
                    <div className="form-check">
                      <input className="form-check-input" value='accept' type="radio" name="gender" id="flexRadioDefault1" onChange={valueStatus} checked={status === 'accept' ? true : false} />
                      <label className="form-check-label" for="flexRadioDefault1">
                        Accept
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault2" onChange={valueStatus} value='decline' checked={status === 'decline' ? true : false} />
                      <label className="form-check-label" for="flexRadioDefault2">
                        Decline
                      </label>
                    </div>
                  </div>
                </div>
                <div className="pt-3">
                <button className={css.btn_modal_1} onClick={handleStatus}>Save Changes</button>
                <button className={css.btn_modal_2} onClick={() => setShowedit(false)}>Cancel</button>
                </div>
              </div>
              </Modal.Body>
            </Modal>

    </>
  )
}

export default Datapemesanan