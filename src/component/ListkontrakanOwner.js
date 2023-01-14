import React from 'react'

import css from "../styles/component/ListkontrakanOwner.module.css"
// import img_kontrakan from '../assets/kontrakan1.png'
import { useNavigate } from 'react-router-dom'

function ListkontrakanOwner(props) {

  const navigate = useNavigate()

  const kontrakandetailowner = () => navigate(`/kontrakanlocationowner/${props.id_kontrakan}`)


  return (
    <>
      <div className={css.content_list_kontrakan}>
        <p className={css.list_no}>{props.no}</p>
        <img src={props.image_kontrakan} alt="kontrakan" />
        <p className={css.list_name_kontrakan}>{props.name_kontrakan}</p>
        <p className={css.list_tipe}>{props.address_kontrakan}</p>
        <p className={css.list_location}>{props.location}</p>
        <button className={css.list_action} onClick={kontrakandetailowner}>Detail</button>
        <button className={css.edit_kontrakan}><i className="fa-solid fa-pen-to-square text-dark"></i></button>
        <button className={css.trash}><i className="fa-solid fa-trash"></i></button>
    </div>
          
    </>
  )
}

export default ListkontrakanOwner