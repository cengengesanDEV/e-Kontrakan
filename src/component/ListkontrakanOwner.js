import React from 'react'

import css from "../styles/component/ListkontrakanOwner.module.css"
import img_kontrakan from '../assets/kontrakan1.png'

function ListkontrakanOwner() {
  return (
    <>
      <div className={css.content_list_kontrakan}>
        <p className={css.list_no}>1</p>
        <img src={img_kontrakan} alt="kontrakan" />
        <p className={css.list_name_kontrakan}>Room Melati Jakarta Timur</p>
        <p className={css.list_tipe}>Melati-002</p>
        <p className={css.list_location}>Jakarta Utara</p>
        <button className={css.list_action}>Detail</button>
        <button className={css.edit_kontrakan}><i className="fa-solid fa-pen-to-square text-dark"></i></button>
        <button className={css.trash}><i className="fa-solid fa-trash"></i></button>
    </div>
          
    </>
  )
}

export default ListkontrakanOwner