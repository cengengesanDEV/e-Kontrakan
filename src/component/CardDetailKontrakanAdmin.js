import React from "react";

import css from "../styles/component/CardDetailKontrakanAdmin.module.css";
function CardDetailKontrakanAdmin(props) {
  return (
    <>
      <div className="py-2 px-3">
        <div className={css.card} onClick={props.handleDetail}>
          <div className={`${css["card-image"]}`}>
            <img src={props.image} alt="kontrakan" width="250" height="250" />
          </div>
          <div className={css['card-description']}>
            <p className={css['text-title']}>{props.location}</p>
            <p className={css['text-body']}>{props.tipe}</p>
            <p className={css['text-body']}>{props.ktp}</p>
            <p className={css['text-body']}>{props.price}</p>
            <p className={css['text-body-location']}>{props.desc}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDetailKontrakanAdmin;
