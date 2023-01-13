import React from "react";
import css from "../styles/component/CardKontrakan.module.css";
function CardKontrakan() {
   return (
      <div className={css.container}>
         <div className={css.box}>
            <span className={`${css.area} bg-danger`}>DKI JAKARTA</span>
            {/* <span
               className={css.box}
               style={{ "&:first-of-type:before": styles.before }}
            ></span> */}
            <div className={css.top}>
               <img
                  src="https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271__340.jpg"
                  alt="img_kontrakan"
               />
               {/* <span>
                  <i className="fas fa-heart"></i>
                  <i className="fas fa-exchange-alt"></i>
               </span> */}
            </div>
            <div className={css.bottom}>
               <h3>Rumah Asik² Indehoy</h3>
               <br />

               {/* <p>
                  Enchanting three bedrooms, three bath home with spacious one
                  bedroom, one bath...
               </p> */}
               <div className={css.advants}>
                  <div>
                     <span className="text-muted">
                        Jl.Tipar Cakung RT.021/RW.08
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
                  <span className="text-success fw-bold fs-5">
                     Rp.90.000.000/years
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
}

export default CardKontrakan;