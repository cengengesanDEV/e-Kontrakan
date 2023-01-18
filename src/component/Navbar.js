import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo_white.png";

import css from "../styles/component/Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const profile = useSelector(
    (state) => state.auth.profile,
  );

  const toLogin = () => navigate("/login");
  const toRegister = () => navigate("/register");
  const toBeranda = () => navigate("/");
  const toKontrakan = () => navigate((profile.role === 'admin') ? "/dashboardowner" : (profile.role === 'owner') ? "/dashboardowner" : "/kontrakan");

  return (
    <div className='container-fluid'>
      <div className={css.navbar_container}>
        <div className={css.nav_left}>
          <img src={logo} alt='Logo-kontrakan' />
          <p>House Privilege</p>
        </div>
        <div className={css.navbar_center}>
          {(profile.role === 'admin' || profile.role === 'owner') ? null :<li
            className={css.li_home}
            onClick={toBeranda}
          >
            Beranda
          </li>}
          <li
            className={css.li_kontrakan}
            onClick={toKontrakan}
          >
            {profile.role === 'admin' || profile.role === 'owner' ? 'Data' : 'Kontrakan' }
          </li>
          {(profile.role === 'admin') ? null : <><li className={css.li_kontrakan}>
            Contact US
          </li>
          <li className={css.li_kontrakan}>
            About
          </li></>}
        </div>
        <div>
          {profile.role === "owner" ? (
            <div className="px-5"></div>
          ) : profile.role === "customer" ? (
            <>
            <div className="d-flex flex-row align-items-center gap-3">
              <p className={css.name_customer}>Hi, Customers </p>
              <img src={profile.image} alt="image_customer" onClick={() => navigate('profileuser')} className="rounded-circle" style={{width:'30px', height:'30px', cursor:'pointer'}} />
            </div>
            </>
          ) : profile.role === "admin" ? (
            <button className={css.button_login}>
              Logout
            </button>
          ) : (
            <>
              <button
                className={css.button_login}
                onClick={toLogin}
              >
                Login
              </button>
              <button
                className={css.button_register}
                onClick={toRegister}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
