import React from "react";

import css from "../styles/component/Empty.module.css"

function Empty(props) {
  return (
    <>
      <div className='d-flex flex-column align-items-center py-3'>
        <p className={css.title}>{props.name} Not Found</p>
      </div>
    </>
  );
}

export default Empty;
