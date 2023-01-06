import React from 'react'

// import component
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

// import image
import img1 from "../assets/kontrakan1.png";
import img2 from "../assets/kontrakan2.jpg";
import img3 from "../assets/kontrakan3.jpg";
import img4 from "../assets/kontrakan4.jpg";
import img5 from "../assets/kontrakan5.jpg";

// import css
import css from '../styles/page/Dashboard.module.css'

function Dashboard() {


  return (
    <>
    <Navbar />
      <div className="">
        <div className="">
          <div className={css.title_desc_top}>
            <p className={css.title_desc_top_1}>Welcome to house privilege</p>
            <p className={css.title_desc_top_2}>A rental website is a website created to make it easier for people to find a place to live for long term rentals</p>
          </div>
          <div className={css.container_image}>        
            <div className={css.container_image_kontrakan_1}>
              <img src={img1} className={css.content_image_2} alt="home_kontrakan" />
            </div>
            <div className={css.container_image_kontrakan_2}>
              <img src={img2} className={css.content_image_2} alt="home_kontrakan" />
            </div>
            <div className={css.container_image_kontrakan_3}>
              <img src={img3} className={css.content_image_2} alt="home_kontrakan" />
            </div>
            <div className={css.container_image_kontrakan_4}>
              <img src={img4} className={css.content_image_2} alt="home_kontrakan" />
            </div>
            <div className={css.container_image_kontrakan_5}>
              <img src={img5} className={css.content_image_2} alt="home_kontrakan" />
            </div>
          </div>
        <div className={css.container_button_start}>
          <button className={css.start_booking}>Start Booking</button>
        </div>
        </div>
        <div className="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1a1a1a" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          <div className={css.container_fasilitas}>
            <div className={css.fasilitas_image}>
              <img src={img1} alt="kontrakan_preview" />
            </div>
            <div className={css.fasilitas_descript}>
              <p className={css.about_fasilitas}>ABOUT FASILITAS</p>
              <p className={css.about_desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti magnam unde dicta soluta, possimus fugit dignissimos neque provident dolores animi autem maiores numquam temporibus. Laboriosam omnis velit dolorum, corporis, deleniti corrupti culpa iusto voluptates molestiae minima possimus, quam debitis! Neque nam possimus quo culpa hic eveniet cupiditate animi, repellendus amet. </p>
              <div className={css.fasilitas_detail}>
                <div className={css.fasilitas_detail_1}>
                  <i className="fa-solid fa-house"></i>
                  <p>Strategis</p>
                </div>
                <div className={css.fasilitas_detail_1}>
                  <i className="fa-solid fa-house"></i>
                  <p>Bersih</p>
                </div>
                <div className={css.fasilitas_detail_1}>
                  <i className="fa-solid fa-house"></i>
                  <p>Ac</p>
                </div>
                <div className={css.fasilitas_detail_1}>
                  <i className="fa-solid fa-house"></i>
                  <p>Terjangkau</p>
                </div>
                <div className={css.fasilitas_detail_1}>
                  <i className="fa-solid fa-house"></i>
                  <p>Hemat</p>
                </div>
                <div className={css.fasilitas_detail_1}>
                  <i className="fa-solid fa-house"></i>
                  <p>Aestetic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    </>
  )
}

export default Dashboard