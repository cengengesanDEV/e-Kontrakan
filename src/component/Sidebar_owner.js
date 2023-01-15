import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authAction from '../redux/actions/auth'
import css from "../styles/component/Sidebar_owner.module.css"

function Sidebar_owner(props) {

  const { page } = props
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogout = () => {
    const getToken = localStorage.getItem('token')
    dispatch(authAction.logoutThunk(getToken, 
    () => {
      navigate("/login")
    }))

  }



  return (
    <>
            <div className={`container-fluid ${css.container_left}`}>
              <p className={css.role_title}>Owner</p>
              <div className={css.container_bar}>
                <div className="d-flex flex-column align-items-start w-100 ps-3 gap-2">
                  <button className={page === 'dashboardowner'? css.dashboard_active : css.dashboard} onClick={() => navigate('/dashboardowner')}>
                    <i className='fa-solid fa-house'></i>
                    <p>Dashboard</p>
                  </button>
                  <button className={page === 'profileowner'? css.profile_active : css.profile} onClick={() => navigate('/profileowner')}>
                    <i className="fa-solid fa-user"></i>
                    <p>Profile</p>
                  </button>
                  <button className={page === 'datakontrakanowner' ? css.kontrakan_active : css.kontrakan} onClick={() => navigate('/kontrakanowner')}>
                    <i className="fa-solid fa-house-chimney-medical"></i>
                    <p>Data Kontrakan</p>
                  </button>
                  <button className={page === 'datapemesananowner' ? css.pemesanan_active : css.pemesanan} onClick={() => navigate('/KontrakanPemesananOwner')}>
                    <i className="fa-solid fa-list"></i>
                    <p>Data Pemesanan</p>
                  </button>
                  <button className={page === 'historyowner' ? css.history_active : css.history}>
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    <p>History Transaction</p>
                  </button>
                </div>
                <button className={css.logout} onClick={handleLogout}>
                    <i className='fa-solid fa-right-from-bracket'></i>
                    <p>Logout</p>
                </button>
              </div>
            </div>

    </>
  )
}

export default Sidebar_owner