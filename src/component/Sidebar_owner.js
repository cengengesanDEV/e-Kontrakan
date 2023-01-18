import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authAction from '../redux/actions/auth'
import css from "../styles/component/Sidebar_owner.module.css"

function Sidebar_owner(props) {

  const { page } = props
  const profile = useSelector((state) => state.auth.profile)
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
              <p className={css.role_title}>{profile.role}</p>
              <div className={css.container_bar}>
                <div className="d-flex flex-column align-items-start w-100 ps-3 gap-2">

                  {profile.role === "owner" 
                  ? <button className={page === 'dashboardowner'? css.dashboard_active : css.dashboard} onClick={() => navigate('/dashboardowner')}>
                    <i className='fa-solid fa-house'></i>
                    <p>Dashboard</p>
                  </button> : profile.role === "admin"
                  ? <button className={page === 'dashboardadmin'? css.dashboard_active : css.dashboard} onClick={() => navigate('/dashboardadmin')}>
                    <i className='fa-solid fa-house'></i>
                    <p>Dashboard</p>
                  </button> : null}

                  {profile.role === "owner" 
                  ? <button className={page === 'profileowner'? css.profile_active : css.profile} onClick={() => navigate('/profileowner')}>
                    <i className="fa-solid fa-user"></i>
                    <p>Profile</p>
                  </button> : profile.role === 'admin' 
                  ? <button className={page === 'profileadmin'? css.profile_active : css.profile} onClick={() => navigate('/datauseradmin')}>
                  <i className="fa-solid fa-user"></i>
                  <p>Data Account</p>
                </button> : null}

                  {profile.role === "owner" ? <button className={page === 'datakontrakanowner' ? css.kontrakan_active : css.kontrakan} onClick={() => navigate('/kontrakanowner')}>
                    <i className="fa-solid fa-house-chimney-medical"></i>
                    <p>Data Kontrakan</p>
                  </button> : null}
                  {profile.role === "owner" ? <button className={page === 'datapemesananowner' ? css.pemesanan_active : css.pemesanan} onClick={() => navigate('/KontrakanPemesananOwner')}>
                    <i className="fa-solid fa-list"></i>
                    <p>Data Pemesanan</p>
                  </button> : null}
                  {profile.role === 'owner' ? <button className={page === 'historyowner' ? css.history_active : css.history}>
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    <p>History Transaction</p>
                  </button> : null}
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