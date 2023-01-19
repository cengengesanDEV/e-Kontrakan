import React, { useEffect, useState } from 'react'

import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Sidebarowner from '../../component/Sidebar_owner'
import Carduser from "../../component/CardUserAdmin"
import css from "../../styles/page/admin/Datauser.module.css"
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { suspendUser, UnsuspendUser } from "../../utils/axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'


function Datauser() {

  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [datauser, setDatauser] = useState([])
  const [iduser, setIduser] = useState(null)
  const [showsuspend, setShowsuspend] = useState(false)
  const [showactive, setShowactive] = useState(false)
  const [sort, setSort] = useState("active")
  const [msg, setMsg] = useState("")
  const [deps, setDeps] = useState(1)

  const valueSearch = (e) => {
    if(e.key === 'Enter') {
      setSearch(e.target.value)
    }
  }

  const valueMsg = (e) => {setMsg(e.target.value)}
  const valueSort = (e) => {setSort(e.target.value)}

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}/users/search?search=${search}&sort=${sort}`)
    .then((res) => {
      console.log(res.data)
      setDatauser(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })

  },[search, sort, deps])


  const handleSuspend = async () => {
    try {
      if(!msg) return ( toast.error("Please input message to user", {
        position: toast.POSITION.TOP_RIGHT,
      }))
      const getToken = await localStorage.getItem('token')
      await suspendUser(iduser,getToken,{msg: msg})
      toast.success("Suspend acc success", {
        position: toast.POSITION.TOP_RIGHT,
      })
      setShowsuspend(false)
      setDeps(deps + 1)
    } catch (err) {
      console.log(err)
      toast.error("internal server error", {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const handleUnsuspend = async () => {
    try {
      console.log("unsuspend")
      const getToken = await localStorage.getItem('token')
      await UnsuspendUser(iduser,getToken)
      toast.success("this acc success Unsuspend", {
        position: toast.POSITION.TOP_RIGHT,
      })
      setShowactive(false)
      setDeps(deps + 1)
    } catch (err) {
      console.log(err)
      toast.error("Failed Unsuspend", {
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
            <Sidebarowner page='profileadmin' />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>
              <div className={`d-flex flex-row justify-content-between align-items-center ${css.title_content}`}>
                <p className={css.title_data_account}>Data Account</p>
                <div className={`d-flex flex-row align-items-center ${css.form_search}`}>
                  <i className={`fa-sharp fa-solid fa-magnifying-glass ${css.icon_style}`}></i>
                  <input type='search' onKeyDown={valueSearch} className={css.input_search} placeholder="Search Name" />
                </div>
              </div>
              <div className="d-flex flex-column justify-content-start align-items-end">
                <p className={css.title_filter}>Filter</p>
                <div className={css.container_radio}>
                  <div className="form-check">
                    <input className="form-check-input" checked={sort === 'active' ? true : false} type="radio" value='active' name="flexRadioDefault" id="flexRadioDefault1" onChange={valueSort} />
                    <label className={`${css.label_owner} form-check-label`} for="flexRadioDefault1">
                      Active
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" checked={sort === 'suspend' ? true : false} type="radio" value='suspend' name="flexRadioDefault" id="flexRadioDefault2" onChange={valueSort} />
                    <label className={`${css.label_customer} form-check-label`} for="flexRadioDefault2">
                      Unactive
                    </label>
                  </div>
                  </div>
              </div>
              <hr />
                <div className={css.scroll}>
                  {datauser.map((e, index) => (
                    <Carduser
                    key={index}
                    number={index + 1}
                    fullname={e.full_name === null ? "-" : e.full_name}
                    role={e.role}
                    email={e.email}
                    phone_number={e.phone_number}
                    image={e.image}
                    handledetail={() => navigate(`/datacategoryadmin/${e.id}`)}
                    title_suspend={e.status_acc === "active" ? "Suspend" : "Unsuspend"}
                    handlesuspend={() => {if(e.status_acc === "active"){
                      setIduser(e.id);
                      setShowsuspend(true)
                      setShowactive(false)
                    }else{
                      setIduser(e.id);
                      setShowsuspend(false)
                      setShowactive(true)
                    } }}
                    
                    />
                  ))}
                </div>
            </div>
          </div>
        </div>
      <Footer />


      {/* modals suspend acc */}
      <Modal
        show={showsuspend}
        onHide={() => setShowsuspend(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop='static'
        centered>
        <Modal.Header closeButton className={`text-white`} style={{backgroundColor:'#3a3a3a'}}>
          <Modal.Title id="example-custom-modal-styling-title">
            Suspend Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='pt-3'>
          <p className={css.message_title}>Message</p>
          <input type="text" onChange={valueMsg} className={css.message_style} />
          <div className="pt-3">
          <button className={css.btn_modal_1} onClick={handleSuspend}>Save Changes</button>
          <button className={css.btn_modal_2} onClick={() => setShowsuspend(false)}>Cancel</button>
          </div>
        </div>
        </Modal.Body>
      </Modal>

      {/* modal unsupend */}
      <Modal
        show={showactive}
        onHide={() => setShowactive(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop='static'
        centered>
        <Modal.Header closeButton className={`text-white`} style={{backgroundColor:'#3a3a3a'}}>
          <Modal.Title id="example-custom-modal-styling-title">
            Unsuspend Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='pt-3'>
          <p className={css.message_title}>Are u sure want to unsuspend this profile account ?</p>
          <div className="pt-3">
          <button className={css.btn_modal_1} onClick={handleUnsuspend}>Save Changes</button>
          <button className={css.btn_modal_2} onClick={() => setShowactive(false)}>Cancel</button>
          </div>
        </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Datauser