import React, { useEffect, useState } from 'react'

import css from "../../styles/page/admin/Datakontrakandetail.module.css"
import Navbar from "../../component/Navbar"
import Footer from "../../component/Footer"
import Sidebarowner from "../../component/Sidebar_owner"


import {locationDetail} from "../../utils/axios"
import { useParams } from 'react-router-dom'


function Kontrakandetail() {

  const { id_location } = useParams()

  const [image_preview, setImage_preview] = useState([])
  const [fasilitas, setFasilitas] = useState([])
  const [preview, setPreview] = useState(0)
  const [datakontrakan, setDatakontrakan] = useState({})

  useEffect(() => {
      locationDetail(id_location)
      .then((res) => {
        console.log(res.data.data)
        setDatakontrakan(res.data.data)
        setImage_preview(res.data.data.image)
        setFasilitas(res.data.data.fasilitas)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id_location])

  const costing = (price) => {
    return (
       "Rp. " +
       parseFloat(price)
          .toFixed()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
 };
  

  return (
    <>
      <Navbar />
        <div className="container-fluid">
          <div className={css.container_left_right}>
            {/* container left */}
            <Sidebarowner page='profileadmin' />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>
              <p className={css.title_preview}>Preview Image</p>

              {/* preview image */}
              <div className={css.container_image_preview}>
                <img src={image_preview[preview]} alt="imgPreview" className={css.card} />
                <div className={css.container_preview}>
                  {image_preview.map((images, index) => (
                    <div key={index} className={css.card_preview} onClick={() => setPreview(index)}>
                      <img src={images} alt="imgPreview" width='150' height='150' />                    
                  </div>
                  ))}
                </div>
              </div>

              {/* List */}
              <p className={css.kontrakan_detail}>Data Kontrakan Detail</p>
              <p className={css.title_kontrakan}>{datakontrakan.kontrakan_name}</p>
              <div className={css.owner_price}>
                <p>Owner : {datakontrakan.full_name}</p>
                <div className="d-flex flex-row align-items-center gap-2">
                  <i className="fa-solid fa-money-bill text-danger"></i>
                  <p className='text-danger'>{costing(datakontrakan.price)}</p>
                </div>
              </div>
              <div className={css.box_container}>
                 <div className={`${css.data_profile_1} d-flex flex-column justify-content-center gap-2`}>
                   <label htmlFor="">Tipe Kontrakan</label>
                   <label htmlFor="">Fasilitas</label>
                   <label htmlFor="">Location</label>
                   <label htmlFor="">Status</label>
                   <label htmlFor="">Address</label>
                 </div>
                 <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2`}>
                   <label htmlFor="">:</label>
                   <label htmlFor="">:</label>
                   <label htmlFor="">:</label>
                   <label htmlFor="">:</label>
                   <label htmlFor="">:</label>
                 </div>
                 <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2`}>
                   <label htmlFor="">{datakontrakan.tipe_kontrakan}</label>
                   <label htmlFor="">{fasilitas.join()}</label>
                   <label htmlFor="">{datakontrakan.province}</label>
                   <label htmlFor="">{datakontrakan.status}</label>
                   <label htmlFor="">{datakontrakan.detail_address}</label>
                 </div>
               </div>
              <p className={css.desc}>Description <br /> {datakontrakan.deskripsi}</p>
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}

export default Kontrakandetail