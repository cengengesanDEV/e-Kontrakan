import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import css from "../styles/component/Sidebar_owner.module.css"

function Sidebar_owner() {

  const navigate = useNavigate()

  const [active_1, setActive_1] = useState(false)
  const [active_2, setActive_2] = useState(false)
  const [active_3, setActive_3] = useState(false)
  const [active_4, setActive_4] = useState(false)
  const [active_5, setActive_5] = useState(false)
  const [active_6, setActive_6] = useState(false)

  const activeDashboard = () => {
    setActive_1(true)
    setActive_2(false)
    setActive_3(false)
    setActive_4(false)
    setActive_5(false)
    setActive_6(false)
    navigate('/dashboardowner')
  }

  const activeProfile = (e) => {    
    setActive_1(false)
    setActive_2(true)
    setActive_3(false)
    setActive_4(false)
    setActive_5(false)
    setActive_6(false)
    navigate('/profileowner')
  }

  const activeKontrakan = () => {
    setActive_1(false)
    setActive_2(false)
    setActive_3(true)
    setActive_4(false)
    setActive_5(false)
    setActive_6(false)
    navigate('/kontrakanowner')
  }

  const activePemesanan = () => {
    setActive_1(false)
    setActive_2(false)
    setActive_3(false)
    setActive_4(true)
    setActive_5(false)
    setActive_6(false)
  }

  const activeHistory = () => {
    setActive_1(false)
    setActive_2(false)
    setActive_3(false)
    setActive_4(false)
    setActive_5(true)
    setActive_6(false)
  }

  const activeLogout = () => {
    setActive_1(false)
    setActive_2(false)
    setActive_3(false)
    setActive_4(false)
    setActive_5(false)
    setActive_6(true)
  }


  return (
    <>
            <div className={`container-fluid ${css.container_left}`}>
              <p className={css.role_title}>Owner</p>
              <div className={css.container_bar}>
                <div className="d-flex flex-column align-items-start">
                  <button className={active_1? css.dashboard_active : css.dashboard} onClick={activeDashboard}>
                    <i className='fa-solid fa-house'></i>
                    <p>Dashboard</p>
                  </button>
                  <button className={active_2 ? css.profile_active : css.profile} onClick={activeProfile}>
                    <i className="fa-solid fa-user"></i>
                    <p>Profile</p>
                  </button>
                  <button className={active_3 ? css.kontrakan_active : css.kontrakan} onClick={activeKontrakan}>
                    <i class="fa-solid fa-house-chimney-medical"></i>
                    <p>Data Kontrakan</p>
                  </button>
                  <button className={active_4 ? css.pemesanan_active : css.pemesanan} onClick={activePemesanan}>
                    <i className="fa-solid fa-list"></i>
                    <p>Data Pemesanan</p>
                  </button>
                  <button className={active_5 ? css.history_active : css.history} onClick={activeHistory}>
                  <i class="fa-solid fa-clock-rotate-left"></i>
                    <p>History Transaction</p>
                  </button>
                </div>
                <button className={active_6 ? css.logout_active : css.logout} onClick={activeLogout}>
                    <i className='fa-solid fa-right-from-bracket'></i>
                    <p>Logout</p>
                </button>
              </div>
            </div>

    </>
  )
}

export default Sidebar_owner