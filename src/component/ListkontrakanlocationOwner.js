import React from 'react'

import css from "../styles/component/ListkontrakanlocationOwner.module.css"
import img_kontrakan from '../assets/kontrakan1.png'
import { useNavigate } from 'react-router-dom'

function ListkontrakanOwner(props) {

  const navigate = useNavigate()

  const kontrakandetailowner = () => navigate(`/kontrakandetailowner/${props.id_location}`)


  return (
    <>
      <div className={css.content_list_kontrakan}>
        <p className={css.list_no}>{props.no}</p>
        <img src={props.image_kontrakan} alt="kontrakan" />
        <p className={css.list_name_kontrakan}>{props.tipe}</p>
        <p className={css.list_tipe}>{props.price}</p>
        <button className={css.list_action} onClick={kontrakandetailowner}>Preview</button>
        <button className={css.edit_kontrakan}><i className="fa-solid fa-pen-to-square text-dark"></i></button>
        <button className={css.trash}><i className="fa-solid fa-trash"></i></button>
    </div>
          
    </>
  )
}

export default ListkontrakanOwner