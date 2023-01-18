import React from 'react'

import css from "../styles/component/CardHistory.module.css"

function CardHistory(props) {


  return (
    <>
    <div className="py-3">
          <div className={css.container_card}>
            <img src={props.image} alt="history" />
            <div className="d-flex flex-row justify-content-between w-100">
              <div className={`d-flex flex-column align-items-start justify-content-center gap-1 ps-2 ${css.title_desc}`}>
                <p>Tipe Kontrakan : {props.tipe}</p>
                <p>Owner : {props.owner}</p>
                <p>Order : {props.order}</p>
                <p>Check-in : {props.checkin}</p>
                <p>Check-out : {props.checkout}</p>
                <p>Price : {props.price}</p>
              </div>
              <div className={css.content_payment}>
                {props.status === "pending" ? <button className={css.btn_payment} onClick={props.handlepayment}>Payment</button> : null }
                {props.status === "done" ? <button className={css.btn_delete} onClick={props.handledelete}><i className="fa-solid fa-trash"></i></button> : null }
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default CardHistory