import React from 'react'

import css from "../styles/component/Footer.module.css"


function Footer() {
  return (
    <>
      <div className="">
        <div className={css.container_footer}>
          <p className={css.copyright}>©2022 Sewa Kontrakan</p>
          <div className={css.pengaduan}>
            <p className={css.phone}>Phone : 081234567892</p>
            <p className={css.email}>Email : kontrakan_sewa@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer