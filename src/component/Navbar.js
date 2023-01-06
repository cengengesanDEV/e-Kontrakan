import React from "react";

import logo from "../assets/logo_white.png";

import css from "../styles/component/Navbar.module.css";

function Navbar() {
  return (
    <div className='container-fluid'>
      <div className={css.navbar_container}>
        <div className={css.nav_left}>
          <img src={logo} alt='Logo-kontrakan' />
          <p>Sewa Kontrakan</p>
        </div>
        <div className={css.navbar_center}>
          <li className={css.li_home}>Beranda</li>
          <li className={css.li_kontrakan}>Kontrakan</li>
        </div>
        <div>
          <button className={css.button_login}>Login</button>
          <button className={css.button_register}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
