import React from 'react'

// import component
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import Sidebarowner from '../../component/Sidebar_owner';

// import css
import css from "../../styles/page/owner/DashboardOwner.module.css"

// import image
import logo from "../../assets/logo_white.png"

function DashboardOwner() {




  return (
    <>
      <Navbar />
        <div className="container-fluid">
          <div className={css.container_left_right}>
            {/* container left */}
            <Sidebarowner page='dashboardowner' />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>
              <div className={css.welcome_page}>
                <p>Hei Owner, welcome to manage House Privilege</p>
                <img src={logo} alt="Logo" />
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}

export default DashboardOwner