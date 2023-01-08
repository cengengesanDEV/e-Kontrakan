import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo_white.png";

import css from "../styles/component/Navbar.module.css";

function Navbar() {
  const navigate = useNavigate()

  const toLogin = () => navigate('/login')
  const toRegister = () => navigate('/register')
  const toBeranda = () => navigate('/')
  const toKontrakan = () => navigate ('kontrakan')

  return (
    <div className='container-fluid'>
      <div className={css.navbar_container}>
        <div className={css.nav_left}>
          <img src={logo} alt='Logo-kontrakan' />
          <p>House Privilege</p>
        </div>
        <div className={css.navbar_center}>
          <li className={css.li_home} onClick={toBeranda}>Beranda</li>
          <li className={css.li_kontrakan} onClick={toKontrakan}>Kontrakan</li>          
          <li className={css.li_kontrakan}>Contact US</li>          
          <li className={css.li_kontrakan}>About</li>
        </div>
        <div>
          <button className={css.button_login} onClick={toLogin} >Login</button>
          <button className={css.button_register} onClick={toRegister}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
