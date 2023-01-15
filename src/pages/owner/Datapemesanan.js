import React from 'react'


import css from "../../styles/page/owner/Datapemesanan.module.css"
import Navbar from "../../component/Navbar"
import Footer from "../../component/Footer"
import Sidebarowner from "../../component/Sidebar_owner"


function Datapemesanan() {
  return (
    <>
      <Navbar />
        <div className="container-fluid">
          <div className={css.container_left_right}>
            {/* container left */}
            <Sidebarowner page='datapemesananowner' />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>
              <p>asd</p>
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}

export default Datapemesanan