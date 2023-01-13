import React, { useState } from 'react'

import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Sidebarowner from '../../component/Sidebar_owner'
import ListkontrakanOwner from '../../component/ListkontrakanOwner'

import css from '../../styles/page/owner/DatakontrakanOwner.module.css'

import createImage from "../../assets/create.png"

import { Modal } from 'react-bootstrap'
import { SimpleDropdown } from 'react-js-dropdavn'

function DatakontrakanOwner() {

  const [showadd, setShowadd] = useState(false)
  const [images, setImages] = useState([]);


  const deleteImage = (index) => {
    setImages(images.filter((image, i) => i !== index));
  };

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
            <Sidebarowner page='datakontrakanowner' />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>    
              <div className={css.form_kontrakan}>
                <div className={css.title_kontrakan}>
                  <p>Data Kontrakan</p>  
                  <button className={css.btn_modal} onClick={() => setShowadd(true)}><i className="fa-solid fa-plus pe-2"></i>Add Kontrakan</button>
                </div>
                {/* <hr /> */}
                <div className={css.table_bar}>
                  <p className={css.no}>NO</p>
                  <p className={css.image}>Image</p>
                  <p className={css.name_kontrakan}>Name Kontrakan</p>
                  <p className={css.tipe}>Address</p>
                  <p className={css.location}>Location</p>
                  <p className={css.action}>Action</p>
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
            Add Kontrakan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className={css.container_modals}>
          <div className={css.form_name_kontrakan}>
            <label htmlFor="">Name Kontrakan</label>
            <input type="text" placeholder='Please input name kontrakan' />
          </div>
          <div className={css.form_location}>
            <label htmlFor="">Location</label>
            <div className="w-100">
               <SimpleDropdown
                  options={data}
                  labels={{
                     notFoundSearch: "Data empty",
                     notSelected: "Choose Location",
                     search: "Search location",
                     seachInputPlaceholder: "Cari Area Kontrakan",
                  }}
                  clearable
                  searchable
                  configs={{ position: { y: "center", x: "center" } }}
               />
            </div>
          </div>
          <div className={css.form_address}>
            <label htmlFor="">Address</label>
            <input type="text" placeholder='Please input address' />
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

export default DatakontrakanOwner