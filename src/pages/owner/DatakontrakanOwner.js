import React, { useState } from 'react'

import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Sidebarowner from '../../component/Sidebar_owner'
import ListkontrakanOwner from '../../component/ListkontrakanOwner'

import css from '../../styles/page/owner/DatakontrakanOwner.module.css'
import { Modal } from 'react-bootstrap'

function DatakontrakanOwner() {

  const [showadd, setShowadd] = useState(false)


  return (
    <>
      <Navbar />
        <div className="container-fluid">
          <div className={css.container_left_right}>
            {/* container left */}
            <Sidebarowner page='datakontrakanowner' />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>    
              <div className={css.form_kontrakan}>
                <div className={css.title_kontrakan}>
                  <p>Data Kontrakan</p>  
                  <button className={css.btn_modal_2} onClick={() => setShowadd(true)}><i className="fa-solid fa-plus pe-2"></i>Add Kontrakan</button>
                </div>
                {/* <hr /> */}
                <div className={css.table_bar}>
                  <p className={css.no}>NO</p>
                  <p className={css.image}>Image</p>
                  <p className={css.name_kontrakan}>Name Kontrakan</p>
                  <p className={css.tipe}>Address</p>
                  <p className={css.location}>Location</p>
                  <p className={css.action}>Action</p>
                </div>
                {/* component */}
                <div className={css.scroll}>
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />    


      {/* modal add kontrakan */}
      <Modal
        show={showadd}
        onHide={() => setShowadd(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop='static'
        centered
      >
        <Modal.Header closeButton className={`text-white`} style={{backgroundColor:'#3a3a3a'}}>
          <Modal.Title id="example-custom-modal-styling-title">
            Add Kontrakan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="w-100">
          <div className={css.form_fullname}>
            <label htmlFor="">Name Kontrakan</label>
            <input type="text" placeholder='Please input old password' />
          </div>
          <div className={css.form_location}>
            <label htmlFor="">Location</label>
            <input type="text" placeholder='Please input new password' />
          </div>
          <div className={css.form_location}>
            <label htmlFor="">Detail Address</label>
            <input type="text" placeholder='Please input confirm password' />
          </div>
          <button className={css.btn_modal_1}>Save Changes</button>
          <button className={css.btn_modal_2}>Cancel</button>
        </div>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default DatakontrakanOwner