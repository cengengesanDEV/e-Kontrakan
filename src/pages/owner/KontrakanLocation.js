import React, { useEffect, useState } from 'react'

import css from "../../styles/page/owner/KontrakanLocation.module.css"
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Sidebarowner from '../../component/Sidebar_owner'
import ListkontrakanOwner from '../../component/ListkontrakanlocationOwner'
import { Modal, Spinner } from 'react-bootstrap'
import createImage from "../../assets/create.png"
import { detailKontrakanGet, detailKontrakanadd } from '../../utils/axios'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function KontrakanLocation() {

  const { id_kontrakan } = useParams()
  console.log(id_kontrakan)


  const [showadd, setShowadd] = useState(false)
  const [images, setImages] = useState([]);
  const [type_kontrakan, setType_kontrakan] = useState(null)
  const [price, setPrice] = useState(null)
  const [desc, setDesc] = useState(null)
  const [fasilitas, setFasilitas] = useState([])
  const [datakontrakan, setDatakontrakan] = useState([])
  const [loading, setLoading] = useState(false)


  const deleteImage = (index) => {
    setImages(images.filter((image, i) => i !== index));
  };

  const valueType_kontrakan = (e) => {setType_kontrakan(e.target.value)}
  const valuePrice = (e) => {setPrice(e.target.value)}
  const valueDesc = (e) => {setDesc(e.target.value)}
  const valueFasilitas = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFasilitas([...fasilitas, value]);
    } else {
      setFasilitas(fasilitas.filter((v) => v !== value));
    }
  };


  const clearState = () => {
    setImages([])
    setPrice(null)
    setDesc(null)
    setFasilitas([])
    setType_kontrakan(null)
  }


  useEffect(() => {
    setLoading(true)
    detailKontrakanGet(id_kontrakan)
    .then((res) => {
      setDatakontrakan(res.data.data)
      setLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
    })    
  }, [])

  const handleAddLocation = async () => {
    try {
      const getToken = localStorage.getItem('token')
      const formData = new FormData()
      formData.append("id_kontrakan", id_kontrakan)
      images.forEach((image) => {
        formData.append("images", image);
      });
      formData.append('tipe_kontrakan', type_kontrakan)
      formData.append('fasilitas', (fasilitas))
      formData.append('price', price)
      formData.append('deskripsi', desc)
      const result = await detailKontrakanadd(formData, getToken)
      toast.success(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
      detailKontrakanGet(id_kontrakan)
      .then((res) => {
        console.log(res.data.data)
        setDatakontrakan(res.data.data)
      })
      .catch((err) => console.log(err))
      setShowadd(false)
      clearState()
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  return (
    <>
      <ToastContainer />
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
                {loading 
                ? <div className="d-flex justify-content-center align-items-center pt-5">
                    <Spinner animation="border" />
                  </div> 
                : <div className={css.scroll}>
                {datakontrakan.length !== 0 ? datakontrakan.map((e,index) => (
                    <ListkontrakanOwner
                     no={index + 1}
                     id_location={e.id}
                     image_kontrakan={e.image}
                     price={e.price}
                     tipe={e.tipe_kontrakan}
                    />
                  )) : "data kosong"}
                </div>}
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
          <div className={css.form_type}>
            <label htmlFor="">Type Name Kontrakan</label>
            <input type="text" value={type_kontrakan} onChange={valueType_kontrakan} placeholder='Please input type name kontrakan' />
          </div>
          <div className={css.form_price}>
            <label htmlFor="">Price</label>
            <input type="text" value={price} onChange={valuePrice} placeholder='Please input address' />
          </div>
          <div className={css.form_desc}>
            <label htmlFor="">Description</label>
            <input type="text" value={desc} onChange={valueDesc} placeholder='Please input address' />
          </div>
          <label className={css.choose_image} htmlFor="">Fasilitas</label>
          <div className={css.form_fasilitas}>
            <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2`}>
              <label htmlFor="">Ac</label>
              <label htmlFor="">Shower</label>
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
              <input type="checkbox" value='AC' onChange={valueFasilitas} />
              <input type="checkbox" value='Shower' onChange={valueFasilitas} />
              <input type="checkbox" value='Twin Bed' onChange={valueFasilitas} />
              <input type="checkbox" value='Toilet' onChange={valueFasilitas} />
              <input type="checkbox" value='Haduk' onChange={valueFasilitas} />
              <input type="checkbox" value='Selimut' onChange={valueFasilitas} />
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
          <button className={css.btn_modal_1} onClick={handleAddLocation}>Save Changes</button>
          <button className={css.btn_modal_2}>Cancel</button>
        </div>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default KontrakanLocation