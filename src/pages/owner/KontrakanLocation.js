import React, { useState } from 'react'

import css from "../../styles/page/owner/KontrakanLocation.module.css"
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Sidebarowner from '../../component/Sidebar_owner'
import ListkontrakanOwner from '../../component/ListkontrakanlocationOwner'
import { Modal } from 'react-bootstrap'
import createImage from "../../assets/create.png"


function KontrakanLocation() {

  const [showadd, setShowadd] = useState(false)
  const [images, setImages] = useState([]);


  const deleteImage = (index) => {
    setImages(images.filter((image, i) => i !== index));
  };

  return (
    <>
      <Navbar />
        <div className="container-fluid">
          <div className={css.container_left_right}>
            {/* container left */}
            <Sidebarowner page='datakontrakanowner' />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>
            <div className={css.form_kontrakan}>
                <div className={css.title_kontrakan}>
                  <p>Data Kontrakan ~ Jakarta Utara</p>  
                  <button className={css.btn_modal} onClick={() => setShowadd(true)}><i className="fa-solid fa-plus pe-2"></i>Add Kontrakan by Location</button>
                </div>
                {/* <hr /> */}
                <div className={css.table_bar}>
                  <p className={css.no}>NO</p>
                  <p className={css.image}>Image</p>
                  <p className={css.name_kontrakan}>Tipe</p>
                  <p className={css.tipe}>Price</p>
                  <p className={css.action}>Detail</p>
                </div>
                {/* component */}
                <div className={css.scroll}>
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                  <ListkontrakanOwner />
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />    

      {/* modal add kontrakan */}
      <Modal
        show={showadd}
        onHide={() => setShowadd(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop='static'
        centered
      >
        <Modal.Header closeButton className={`text-white`} style={{backgroundColor:'#3a3a3a'}}>
          <Modal.Title id="example-custom-modal-styling-title">
            Add Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className={css.container_modals}>
          <div className={css.form_name_kontrakan}>
            <label htmlFor="">Id kontrakan</label>
            <input type="text" placeholder='id' disabled />
          </div>
          <div className={css.form_type}>
            <label htmlFor="">Type Name Kontrakan</label>
            <input type="text" name="" id="" placeholder='Please input type name kontrakan' />
          </div>
          <div className={css.form_price}>
            <label htmlFor="">Price</label>
            <input type="text" placeholder='Please input address' />
          </div>
          <div className={css.form_desc}>
            <label htmlFor="">Description</label>
            <input type="text" placeholder='Please input address' />
          </div>
          <label className={css.choose_image} htmlFor="">Fasilitas</label>
          <div className={css.form_fasilitas}>
            <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2`}>
              <label htmlFor="">Ac</label>
              <label htmlFor="">Extra Bed</label>
              <label htmlFor="">Twin Bed</label>
              <label htmlFor="">Toilet</label>
              <label htmlFor="">Haduk</label>
              <label htmlFor="">Selimut</label>
            </div>
            <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2`}>
              <label htmlFor="">:</label>
              <label htmlFor="">:</label>
              <label htmlFor="">:</label>
              <label htmlFor="">:</label>
              <label htmlFor="">:</label>
              <label htmlFor="">:</label>
            </div>
            <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-3`}>
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
            </div>     
          </div>
          <p className={css.choose_image}>Choose Image</p>
          <div className={css.container_image}>
          {images &&
                  images.length > 0 &&
                  images.map((image, index) => {
                    return (
                      <div className="position-relative">
                          <img
                          className={css["image-preview"]}
                          width='120'
                          height='120'
                          alt=""
                          key={index}
                          src={URL.createObjectURL(image)}
                        />
                        <i onClick={() => deleteImage(index)} className={`fa-solid fa-plus bg-danger ${css.delete_image}`}></i>
                      </div>
                    );
                  })}
                {images.length < 5 && (
                  <label for="img-product">
                    <div className={css["add-photo"]}>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="img-product"
                        onChange={(e) =>
                          setImages([...images, e.target.files[0]])
                        }
                      />
                      <img src={createImage} alt="create_image" className={css.image_preview} width='120' height='120' />
                    </div>
                  </label>
                )}
          </div>
          <button className={css.btn_modal_1}>Save Changes</button>
          <button className={css.btn_modal_2}>Cancel</button>
        </div>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default KontrakanLocation