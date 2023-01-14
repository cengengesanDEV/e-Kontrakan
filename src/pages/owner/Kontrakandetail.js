import React from 'react'

import css from "../../styles/page/owner/Kontrakandetail.module.css"
import Navbar from "../../component/Navbar"
import Footer from "../../component/Footer"
import Sidebarowner from "../../component/Sidebar_owner"
import imgDefault from "../../assets/kontrakan1.png"


function Kontrakandetail() {
  return (
    <>
      <Navbar />
        <div className="container-fluid">
          <div className={css.container_left_right}>
            {/* container left */}
            <Sidebarowner page='datakontrakanowner' />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>
              <p className={css.title_preview}>Preview Image</p>
              <div className={css.container_image_preview}>
                <img src={imgDefault} alt="imgPreview" width='200' height='200' />
                <div className={css.container_preview}>
                  <img src={imgDefault} alt="imgPreview" width='100' height='100' />
                  <img src={imgDefault} alt="imgPreview" width='100' height='100' />
                  <img src={imgDefault} alt="imgPreview" width='100' height='100' />
                  <img src={imgDefault} alt="imgPreview" width='100' height='100' />
                  <img src={imgDefault} alt="imgPreview" width='100' height='100' />
                </div>
              </div>

              {/* List */}
              <p className={css.kontrakan_detail}>Data Kontrakan Detail</p>
              <div className={css.box_container}>
               <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2`}>
                 <label htmlFor="">Name</label>
                 <label htmlFor="">Type</label>
                 <label htmlFor="">Price</label>
                 <label htmlFor="">Location</label>
                 <label htmlFor="">Address</label>
                 <label htmlFor="">Owner Name</label>
               </div>
               <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2`}>
                 <label htmlFor="">:</label>
                 <label htmlFor="">:</label>
                 <label htmlFor="">:</label>
                 <label htmlFor="">:</label>
                 <label htmlFor="">:</label>
                 <label htmlFor="">:</label>
               </div>
               <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2`}>
                 <label htmlFor="">1</label>
                 <label htmlFor="">1</label>
                 <label htmlFor="">1</label>
                 <label htmlFor="">1</label>
                 <label htmlFor="">1</label>
                 <label htmlFor="">1</label>
               </div>
             </div>
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}

export default Kontrakandetail