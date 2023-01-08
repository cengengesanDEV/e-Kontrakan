import React from 'react'

import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Sidebarowner from '../../component/Sidebar_owner'
import ListkontrakanOwner from '../../component/ListkontrakanOwner'

import css from '../../styles/page/owner/DatakontrakanOwner.module.css'

function DatakontrakanOwner() {
  return (
    <>
      <Navbar />
        <div className="container-fluid">
          <div className={css.container_left_right}>
            {/* container left */}
            <Sidebarowner />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>    
              <div className={css.form_kontrakan}>
                <div className={css.title_kontrakan}>
                  <p>Data Kontrakan</p>  
                  <button><i className="fa-solid fa-plus pe-2"></i>Add Kontrakan</button>
                </div>
                {/* <hr /> */}
                <div className={css.table_bar}>
                  <p className={css.no}>NO</p>
                  <p className={css.image}>Image</p>
                  <p className={css.name_kontrakan}>Name Kontrakan</p>
                  <p className={css.tipe}>Tipe</p>
                  <p className={css.location}>Location</p>
                  <p className={css.action}>Detail</p>
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
    </>
  )
}

export default DatakontrakanOwner