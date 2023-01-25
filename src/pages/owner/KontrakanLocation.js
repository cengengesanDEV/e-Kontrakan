import React, { useEffect, useState } from 'react'

import css from "../../styles/page/owner/KontrakanLocation.module.css"
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Sidebarowner from '../../component/Sidebar_owner'
import ListkontrakanOwner from '../../component/ListkontrakanlocationOwner'
import { Modal, Spinner } from 'react-bootstrap'
import createImage from "../../assets/create.png"
import { detailKontrakanGet, detailKontrakanadd, locationDetail,patchLocationKontrakanID , deleteLocationKontrakanID } from '../../utils/axios'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Empty from '../../component/Empty'

function KontrakanLocation() {

  const { id_kontrakan, kontrakan_location } = useParams()
  // console.log(id_kontrakan)


  const [showadd, setShowadd] = useState(false)
  const [showedit, setShowedit] = useState(false)
  const [showdelete, setShowdelete] = useState(false)
  const [images, setImages] = useState([]);
  const [type_kontrakan, setType_kontrakan] = useState(null)
  const [price, setPrice] = useState(null)
  const [desc, setDesc] = useState(null)
  const [fasilitas, setFasilitas] = useState([])
  const [datakontrakan, setDatakontrakan] = useState([])
  const [loading, setLoading] = useState(false)

  const [idctg ,setIdctg] = useState(null)
  const [deskripsi, setDeskripsi] = useState(null)
  const [harga, setHarga] = useState(null)
  const [fasility, setFasility] = useState(null)
  const [tipe, setTipe] = useState(null)
  const [imageid, setImageid] = useState([])
  const [deleteid, setDeleteid] = useState(null)
  const [imageadd, setImageadd] = useState([])
  const [deleteimage, setDeleteimage] = useState([])



  // get value all
  const deleteImage = (index) => {setImages(images.filter((image, i) => i !== index))};
  const valueType_kontrakan = (e) => {setType_kontrakan(e.target.value)}
  const valueDesc = (e) => {setDesc(e.target.value)}
  const valueFasilitas = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFasilitas([...fasilitas, value]);
    } else {
      setFasilitas(fasilitas.filter((v) => v !== value));
    }
  };

  // get value location id
  const deleteImageid = (index,images) => {setImageid(imageid.filter((image, i) => i !== index)); setDeleteimage([...deleteimage, images])};
  const valueType_kontrakanid = (e) => {setTipe(e.target.value)}
  const valueNumber = (e) => {
    if (e.target.value.length === 0) setPrice("");
    if (/[0-9]{1,16}/g.test(e.target.value[e.target.value.length - 1])) setPrice(e.target.value);
  };
  const valueHarga = (e) => {
    if (e.target.value.length === 0) setHarga("");
    if (/[0-9]{1,16}/g.test(e.target.value[e.target.value.length - 1])) setHarga(e.target.value);
  };
  const valueDescid = (e) => {setDeskripsi(e.target.value)}
  const valueFasilitasid = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFasility([...fasility, value]);
    } else {
      setFasility(fasility.filter((v) => v !== value));
    }
  };


  const clearState = () => {
    setImages([])
    setPrice(null)
    setDesc(null)
    setFasilitas([])
    setType_kontrakan(null)
  }

  const clearStateEdit = () => {
    setImageadd([])
    setDeleteimage([])
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
  }, [id_kontrakan])

  const handleAddLocation = async () => {
    try {
      if(!images[0] || !id_kontrakan || !type_kontrakan || !fasilitas[0] || !price || !desc ){
        return (
          toast.error("Data kontrakan can't be empty", {
            position: toast.POSITION.TOP_RIGHT,
          }),setLoading(false)
        )
      }
      if(price >= 999999999){
        return (
          toast.error("the price cannot be above Rp. 999.999.999", {
            position: toast.POSITION.TOP_RIGHT,
          }),setLoading(false)
        )
      }
      const getToken = localStorage.getItem('token')
      const formData = new FormData()
      formData.append("id_kontrakan", id_kontrakan)
      images.forEach((image) => {
        formData.append("images", image);
      });
      formData.append('tipe_kontrakan', type_kontrakan)
      formData.append('fasilitas', fasilitas.join())
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

  const costing = (price) => {
    return (
       "Rp. " +
       parseFloat(price)
          .toFixed()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
 };

 const handleCategoryID = (id_category_kontrakan) => {
    setIdctg(id_category_kontrakan)
    locationDetail(id_category_kontrakan)
    .then((res) => {
      console.log(res.data)
      setDeskripsi(res.data.data.deskripsi)
      setHarga(res.data.data.price)
      setFasility(res.data.data.fasilitas)
      setTipe(res.data.data.tipe_kontrakan)
      setImageid(res.data.data.image)
    
    })

    .catch((err) => {
      console.log(err)
    })
  }
  

  const deleteCategory = async () => {
    try {
      const result = await deleteLocationKontrakanID(deleteid)
      const response = await detailKontrakanGet(id_kontrakan)
      await setDatakontrakan(response.data.data)
      toast.success(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
      setShowdelete(false)
    } catch (err) {
      console.log(err)
      toast.error("Delete Failed", {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const handleEditLocationID = async () => {
    try {
      const getToken = await localStorage.getItem('token')
      const formData = new FormData()
      if(imageadd.length > 0) imageadd.forEach((image) => {formData.append("images", image)});
      if(deleteimage.length > 0) formData.append('imageDelete', deleteimage.join())
      formData.append('tipe_kontrakan', tipe)
      formData.append('fasilitas', fasility.join())
      formData.append('price', harga)
      formData.append('deskripsi', deskripsi)
      const result = await patchLocationKontrakanID(idctg, formData, getToken)
      const response = await detailKontrakanGet(id_kontrakan)
      await setDatakontrakan(response.data.data)
      toast.success(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
      await clearStateEdit()
      setShowedit(false)
    } catch (err) {
      console.log(err)
      toast.error("Edit Kontrakan Failed", {
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
                  <p>Data Kontrakan ~ {kontrakan_location}</p>  
                  <button className={css.btn_modal} onClick={() => setShowadd(true)}><i className="fa-solid fa-plus pe-2"></i>Add Kontrakan by Location</button>
                </div>
                {/* <hr /> */}
                <div className={css.table_bar}>
                  <p className={css.no}>NO</p>
                  <p className={css.image}>Image</p>
                  <p className={css.name_kontrakan}>Tipe</p>
                  <p className={css.tipe}>Price</p>
                  <p className={css.status}>Status</p>
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
                     key={index}
                     no={index + 1}
                     id_location={e.id}
                     image_kontrakan={e.image}
                     price={costing(e.price)}
                     tipe={e.tipe_kontrakan}
                     status={e.status}
                     handle_edit={() => {setShowedit(true); handleCategoryID(e.id)}}
                     handle_delete={() => {setShowdelete(true); setDeleteid(e.id)}}
                     
                    />
                  )) : <Empty name='Data' />}
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
            <label htmlFor="">Price / month</label>
            <input type="text" value={price} onChange={valueNumber} placeholder='Please input address' />
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
              <input type="checkbox" value='Handuk' onChange={valueFasilitas} />
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

      {/* modal edit kontrakan */}
      <Modal
        show={showedit}
        onHide={() => setShowedit(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop='static'
        centered
      >
        <Modal.Header closeButton className={`text-white`} style={{backgroundColor:'#3a3a3a'}}>
          <Modal.Title id="example-custom-modal-styling-title">
            Edit Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className={css.container_modals}>
          <div className={css.form_type}>
            <label htmlFor="">Type Name Kontrakan</label>
            <input type="text" value={tipe} onChange={valueType_kontrakanid} placeholder='Please input type name kontrakan' />
          </div>
          <div className={css.form_price}>
            <label htmlFor="">Price / month</label>
            <input type="text" value={harga} onChange={valueHarga} placeholder='Please input address' />
          </div>
          <div className={css.form_desc}>
            <label htmlFor="">Description</label>
            <input type="text" value={deskripsi} onChange={valueDescid} placeholder='Please input address' />
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
              <input type="checkbox" value='AC' onChange={valueFasilitasid} checked={fasility && fasility.includes('AC') ? true : false} />
              <input type="checkbox" value='Shower' onChange={valueFasilitasid} checked={fasility && fasility.includes('Shower') ? true : false} />
              <input type="checkbox" value='Twin Bed' onChange={valueFasilitasid} checked={fasility && fasility.includes('Twin Bed') ? true : false}  />
              <input type="checkbox" value='Toilet' onChange={valueFasilitasid} checked={fasility && fasility.includes('Toilet') ? true : false} />
              <input type="checkbox" value='Handuk' onChange={valueFasilitasid} checked={fasility && fasility.includes('Handuk') ? true : false} />
              <input type="checkbox" value='Selimut' onChange={valueFasilitasid} checked={fasility && fasility.includes('Selimut') ? true : false} />
            </div>     
          </div>
          <p className={css.choose_image}>Choose Image</p>
          <div className={css.container_image}>
          {imageid &&
                  imageid.length > 0 &&
                  imageid.map((image, index) => {
                    return (
                      <div className="position-relative">
                          <img
                          className={css["image-preview"]}
                          width='120'
                          height='120'
                          alt=""
                          key={index}
                          src={typeof(image) === 'string' ? image : URL.createObjectURL(image)}
                        />
                        <i onClick={() => deleteImageid(index,image)} className={`fa-solid fa-plus bg-danger ${css.delete_image}`}></i>
                      </div>
                    );
                  })}
                {imageid.length < 5 && (
                  <label for="img-product">
                    <div className={css["add-photo"]}>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="img-product"
                        onChange={(e) =>
                          {setImageid([...imageid, e.target.files[0]])
                           setImageadd([...imageadd ,e.target.files[0]])
                          console.log([...imageadd ,e.target.files[0]])}
                        }
                      />
                      <img src={createImage} alt="create_image" className={css.image_preview} width='120' height='120' />
                    </div>
                  </label>
                )}
          </div>
          <button className={css.btn_modal_1} onClick={handleEditLocationID}>Save Changes</button>
          <button className={css.btn_modal_2} onClick={() => setShowedit(false)}>Cancel</button>
        </div>
        </Modal.Body>
      </Modal>


      {/* modal delete kontrakan */}
      <Modal
        show={showdelete}
        onHide={() => setShowdelete(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop='static'
        centered>
        <Modal.Header closeButton className={`text-white`} style={{backgroundColor:'#3a3a3a'}}>
          <Modal.Title id="example-custom-modal-styling-title">
            Delete Kontrakan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='pt-3'>
          <p>Are you sure want to delete this location kontrakan ?</p>
          <div className="pt-3">
          <button className={css.btn_modal_1} onClick={() => deleteCategory()}>Save Changes</button>
          <button className={css.btn_modal_2} onClick={() => setShowdelete(false)}>Cancel</button>
          </div>
        </div>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default KontrakanLocation