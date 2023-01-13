import React from 'react'

import css from "../styles/component/ListkontrakanlocationOwner.module.css"
import img_kontrakan from '../assets/kontrakan1.png'
import { useNavigate } from 'react-router-dom'

function ListkontrakanOwner() {

  const navigate = useNavigate()

  const kontrakandetailowner = () => navigate('/kontrakandetailowner')


  return (
    <>
      <div className={css.content_list_kontrakan}>
        <p className={css.list_no}>1</p>
        <img src={img_kontrakan} alt="kontrakan" />
        <p className={css.list_name_kontrakan}>Room Melati-002 Lantai 2</p>
        <p className={css.list_tipe}>IDR. 1.500.000/month</p>
        <button className={css.list_action} onClick={kontrakandetailowner}>Preview</button>
        <button className={css.edit_kontrakan}><i className="fa-solid fa-pen-to-square text-dark"></i></button>
        <button className={css.trash}><i className="fa-solid fa-trash"></i></button>
    </div>
          
    </>
  )
}

export default ListkontrakanOwner