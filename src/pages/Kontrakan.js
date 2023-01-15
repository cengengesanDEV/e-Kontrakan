import React from "react";

// import component
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import CardKontrakan from "../component/CardKontrakan";

// import css
import css from "../styles/page/Kontrakan.module.css";
// simple dropdown
import { SimpleDropdown } from "react-js-dropdavn";
import "react-js-dropdavn/dist/index.css";
function Kontrakan() {
   const data = [
      { label: "Aceh", value: 3 },
      { label: "Bandung", value: 4 },
      { label: "Bali", value: 3 },
      { label: "DKI Jakarta", value: 1 },
      { label: "Jawa Barat", value: 2 },
      { label: "Jawa Tengah", value: 3 },
      { label: "Jawa Timur", value: 3 },
      { label: "Lampung", value: 3 },
      { label: "Palembang", value: 3 },
      { label: "Medan", value: 3 },
   ];
   return (
      <>
         <Navbar />
         <div className="container-fluid">
            <div className={css.container_left_right}>
               {/* container left */}
               <div className={`container-fluid ${css.container_left}`}>
                  <div className={css.category}>
                     {/* <div className={css.category_left}>
                        <p>Jakarta</p>
                        <p>Jakarta</p>
                        <p>Jakarta</p>
                     </div>
                     <div className={css.category_right}>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                     </div> */}
                     <p className="text-center fw-bold fs-3">Category</p>
                     <br />
                     <div className="w-100">
                        <SimpleDropdown
                           options={data}
                           labels={{
                              notFoundSearch: "Data tidak ada",
                              notSelected: "Select Area Kontrakan",
                              search: "Search area",
                              seachInputPlaceholder: "Cari Area Kontrakan",
                           }}
                           clearable
                           searchable
                           configs={{ position: { y: "bottom", x: "center" } }}
                        />
                     </div>

                     {/* Sorting Price */}
                  </div>
                  <div>
                     <p className="text-center fw-bold fs-3 mt-3">
                        Sort prices
                     </p>
                     <div className={css.sorting_bar}>
                        <form className={css.form_kontrakan}>
                           <input
                              id="a"
                              type="radio"
                              name="sorting"
                              value="a"
                              checked
                           />
                           <label htmlFor="a">
                              <span></span>Cheapest
                           </label>
                           <input
                              id="b"
                              type="radio"
                              name="sorting"
                              value="b"
                           />
                           <label htmlFor="b">
                              <span></span>Expensive
                           </label>

                           <div className={css.worm}>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                              <div className={css.worm__segment}></div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>

               {/* container right */}
               <div className={`${css.container_right}`}>
                  <CardKontrakan />
                  <CardKontrakan />
                  <CardKontrakan />
                  <CardKontrakan />
                  <CardKontrakan />
                  <CardKontrakan />
                  <CardKontrakan />
                  <CardKontrakan />
                  <div className="d-flex justify-content-center align-items-center mx-auto">
                     <button className="fw-bold btn btn-dark mx-2 px-3 my-3">
                        Prev
                     </button>
                     <button className="fw-bold btn btn-dark mx-2 px-3 my-3">
                        Next
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <Footer />
      </>
   );
}

export default Kontrakan;
