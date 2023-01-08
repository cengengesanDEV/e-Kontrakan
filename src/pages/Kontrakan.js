import React from 'react'

// import component
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";


// import css
import css from "../styles/page/Kontrakan.module.css"

function Kontrakan() {
  return (
    <>
      <Navbar />
        <div className="container-fluid">
          <div className={css.container_left_right}>
            {/* container left */}
            <div className={`container-fluid ${css.container_left}`}>
              <p className={css.category_title}>Category</p>
              <div className={css.category}>
                <div className={css.category_left}>
                  <p>Jakarta</p>
                  <p>Jakarta</p>
                  <p>Jakarta</p>
                </div>
                <div className={css.category_right}>
                  <p>1</p>
                  <p>1</p>
                  <p>1</p>
                </div>
              </div>
            </div>

            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>
              <p>asd</p>
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}

export default Kontrakan