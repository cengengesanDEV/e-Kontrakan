import React from 'react'

import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import css from '../../styles/page/users/Historyuser.module.css'
import CardHistory from '../../component/CardHistory'
import { useState } from 'react'
import { useEffect } from 'react'
import { getHistory } from '../../utils/axios'
import { Modal } from 'react-bootstrap'
import default1 from "../../assets/create.png"
import { paymentUser, deletehistoryuser } from '../../utils/axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Empty from '../../component/Empty'
import { message } from 'antd'

function Historyuser() {

  const [sort, setSort] = useState('pending')
  const [history, setHistory] = useState([])
  const [showdelete, setShowdelete] = useState(false)
  const [iddelete, setIddelete] = useState(null)
  const [showedit, setShowedit] = useState(false)
  const [idedit, setIdedit] = useState(null)
  const [name, setName] = useState(null)
  const [rek, setRek] = useState(null)
  const [bank, setBank] = useState(null)
  const [image, setImage] = useState(null)
  const [display, setDisplay] = useState(default1)
  const [deps, setDeps] = useState(null)
  const [length, setLength] = useState(0)

  const valueSort = (e) => {setSort(e.target.value)}
  const handleImagePreview = (e) => {
    setImage(e.target.files[0])
    setDisplay(URL.createObjectURL(e.target.files[0]))
  }

  useEffect(() => {
    const getToken = localStorage.getItem('token')
    getHistory(sort,getToken)
    .then((res) => {
      if(sort == 'process'){
        if(res.data.data.length !== length) {setHistory(res.data.data); message.info('Pembayaran success')}
        setHistory(res.data.data)
        setLength(res.data.data.length)
        setTimeout(() => {
          setDeps(deps + 1)
        }, 10000);
      }else{
        setHistory(res.data.data)
      }
    })
    .catch((err) => {console.log(err)})
  }, [sort, deps])

  const data = [
    { label: "BCA", value: "BCA" },
    { label: "BRI", value: "BRI" },    
    { label: "BNI", value: "BNI" },    
    { label: "Mandiri", value: "Mandiri" },    
    { label: "Dana", value: "Dana" },    
 ];

  const handlePayment = async () => {
    try {
      if(!image || !bank) return message.info('please input again')
      const getToken = await localStorage.getItem("token")
      const formData = new FormData()
      formData.append('payment_method', bank)
      formData.append('id_transaction', idedit)
      formData.append('image', image)
      await paymentUser(getToken, formData)
      const response = await getHistory(sort,getToken)
      setHistory(response.data.data)
      toast.success("waiting approve owner", {
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

  const handleDelete = async () => {
    try {
      const getToken = await localStorage.getItem('token')
      await deletehistoryuser(iddelete, getToken)
      const response = await getHistory(sort,getToken)
      setHistory(response.data.data)
      toast.success("success delete history", {
        position: toast.POSITION.TOP_RIGHT,
      })
    setShowdelete(false)
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
      <div className="p-5">
        <div className="d-flex flex-column">
          <p>Filter</p>
          <div className="d-flex flex-row align-items-center gap-2">
            <div className="form-check">
              <input className="form-check-input" checked={sort === 'pending' ? true : false} type="radio" value='pending' name="flexRadioDefault" id="flexRadioDefault1" onChange={valueSort} />
              <label className={`${css.label_owner} form-check-label`} for="flexRadioDefault1">
                pending
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" checked={sort === 'paid' ? true : false} type="radio" value='paid' name="flexRadioDefault" id="flexRadioDefault2" onChange={valueSort} />
              <label className={`${css.label_customer} form-check-label`} for="flexRadioDefault2">
                Paid
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" checked={sort === 'process' ? true : false} type="radio" value='process' name="flexRadioDefault" id="flexRadioDefault2" onChange={valueSort} />
              <label className={`${css.label_customer} form-check-label`} for="flexRadioDefault2">
                Process
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" checked={sort === 'done' ? true : false} type="radio" value='done' name="flexRadioDefault" id="flexRadioDefault2" onChange={valueSort} />
              <label className={`${css.label_customer} form-check-label`} for="flexRadioDefault2">
                Done
              </label>
            </div>
          </div>
        </div>
        <div className="">
          {history.length > 0 ? history.map((e, index) => (
            <CardHistory
              key={index}
              linkpayment={e.id}
              image={e.image_kontrakan}
              tipe={e.tipe_kontrakan}
              owner={e.owner}
              order={(e.order_date).slice(0,10)}
              checkin={(e.checkin).slice(0,10)}
              checkout={(e.checkout).slice(0,10)}
              price={e.total_price}
              status={e.status_booking}
              handlepayment={() => {setShowedit(true); setIdedit(e.id); setName(e.owner); setRek(e.no_rekening)}}
              handledelete={() => {setShowdelete(true); setIddelete(e.id)}}
            />
          )) : 
          <Empty name='History' />}
        </div>
      </div>
    <Footer />


      {/* modal delete history */}
      <Modal
          show={showedit}
          onHide={() => setShowdelete(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          backdrop='static'
          centered
        >
          <Modal.Header closeButton className={`text-white`} style={{backgroundColor:'#3a3a3a'}}>
            <Modal.Title id="example-custom-modal-styling-title">
              Payment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='pt-3'>
            <div className="d-flex flex-column">
              <p className={css.rekening_owner}>Rekening Owner</p>
              <p className={css.rekening}>Bank : {rek} a/n {name}</p>
            </div>
            <div className="d-flex flex-column">
              <p className={css.rekening_owner}>Choose Bank</p>
              <select className="form-select my-2" data-size='5' aria-label="Default select example" onClick={(e) => {setBank(e.target.value); console.log(e.target.value)} }>
              <option selected >Select Option</option>
              {data.map((index) => (
                <option value={index.value}>{index.label}</option>
              ))}
            </select>
            </div>
            <div className="d-flex flex-column">
              <p className={css.bukti_transfer}>Bukti Transfer :</p>
              <label htmlFor="pay"><img src={display} alt="payment" width='100' height='100' className={css.image_butki} /></label>
              <input type="file" id="pay" onChange={handleImagePreview} className='d-none' />
            </div>
            <div className="pt-3">
              <button className={css.btn_modal_1} onClick={handlePayment}>Save Changes</button>
              <button className={css.btn_modal_2} onClick={() => setShowedit(false)}>Cancel</button>
            </div>
          </div>
          </Modal.Body>
        </Modal>
      



    {/* modal delete history */}
    <Modal
        show={showdelete}
        onHide={() => setShowdelete(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop='static'
        centered
      >
        <Modal.Header closeButton className={`text-white`} style={{backgroundColor:'#3a3a3a'}}>
          <Modal.Title id="example-custom-modal-styling-title">
            Delete History
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='pt-3'>
          <p>Are you sure want to delete this history ?</p>
          <div className="pt-3">
          <button className={css.btn_modal_1} onClick={handleDelete}>Save Changes</button>
          <button className={css.btn_modal_2} onClick={() => setShowdelete(false)}>Cancel</button>
          </div>
        </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Historyuser