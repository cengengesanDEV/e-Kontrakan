import React from "react";
import css from "../styles/component/CardKontrakan.module.css";


function CardKontrakan(props) {


   return (
      <div className={css.container}>
         <div className={`${css.box} w-100`}>
            <span className={`${css.area} bg-danger`}>{props.location_top}</span>
            {/* <span
               className={css.box}
               style={{ "&:first-of-type:before": styles.before }}
            ></span> */}
            <div className={css.top} onClick={props.handletodetail}>
               <img
                  src={props.image}
                  alt="img_kontrakan"
                  width="100"
                  height="150"
               />
               {/* <span>
                  <i className="fas fa-heart"></i>
                  <i className="fas fa-exchange-alt"></i>
               </span> */}
            </div>
            <div className={css.bottom}>
               <h3>{props.tipe}</h3>
               <br />

               {/* <p>
                  Enchanting three bedrooms, three bath home with spacious one
                  bedroom, one bath...
               </p> */}
               <div className={css.advants}>
                  <div>
                     <span className={`text-muted`}>
                        {props.address}
                     </span>
                     <br />
                     {/* <i className="fas fa-th-large"></i>
                        <span>3</span> */}
                     {/* <span className="text-muted">
                        Jl.Tipar Cakung RT.021/RW.08
                     </span> */}
                  </div>
                  {/* <div>
                     <span>Bathrooms</span>
                     <div>
                        <i className="fas fa-shower"></i>
                        <span>3</span>
                     </div>
                  </div> */}
                  {/* <div>
                     <span>Area</span>
                     <div>
                        <i className="fas fa-vector-square"></i>
                        <span>
                           4300<span>Sq Ft</span>
                        </span>
                     </div>
                  </div> */}
               </div>
               <div className={css.price}>
                  <span>Dikontrakan</span>
                  <span className="text-success fw-bold fs-6">
                     {props.price}/month
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
}

export default CardKontrakan;
