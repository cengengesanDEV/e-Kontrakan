import React from "react";


import css from "../styles/component/CardUserAdmin.module.css"

function CardUserAdmin(props) {
  return (
    <>
      <div className={`d-flex flex-row align-items-center justify-content-between ${css.container_card}`}>
        <div className='d-flex flex-row align-items-center gap-2'>
          <p className={css.number}>{props.number}</p>
          <img
            src={props.image}
            alt='pic'
            width='100'
            height='100'
          />
          <div className={`d-flex flex-column justify-content-center align-items-start gap-1 ${css.title_user}`}>
            <p>{props.fullname}</p>
            <p>{props.email}</p>
            <p>{props.phone_number}</p>
            <p>{props.role}</p>
          </div>
        </div>
        <div className={`d-flex flex-row gap-2 ${css.button_admin}`}>
          <button className={css.suspend} onClick={props.handlesuspend}>{props.title_suspend}</button>
          <button className={css.detail} onClick={props.handledetail}>Detail kontrakan</button>
        </div>
      </div>
    </>
  );
}

export default CardUserAdmin;
