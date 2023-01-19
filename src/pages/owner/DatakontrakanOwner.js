import React, { useEffect, useState } from 'react'

import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Sidebarowner from '../../component/Sidebar_owner'
import ListkontrakanOwner from '../../component/ListkontrakanOwner'

import css from '../../styles/page/owner/DatakontrakanOwner.module.css'

import createImage from "../../assets/create.png"

import { Modal, Spinner } from 'react-bootstrap'
import { categoryKontrakanGet, categoryKontrakanadd, getCategoryKontrakanID, patchCategoryKontrakanID, deleteCategoryKontrakanID  } from '../../utils/axios'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DatakontrakanOwner() {

  const profile = useSelector((state) => state.auth.profile)

  const [showadd, setShowadd] = useState(false)
  const [showedit, setShowedit] = useState(false)
  const [showdelete, setShowdelete] = useState(false)
  const [images, setImages] = useState([]);
  const [name_kontrakan, setName_kontrakan] = useState('')
  const [province, setProvince] = useState('')
  const [address, setAddress] = useState('')
  const [datakontrakan, setDatakontrakan] = useState([])
  const [loading, setLoading] = useState(false)

  const [detailid, setDetailid] = useState(null)
  const [imageid, setImageid] = useState([])
  const [nameid, setNameid] = useState(null)
  const [locationid, setLocationid] = useState(null)
  const [idctg, setIdctg] = useState(null)
  
  const [deleteid, setDeleteid] = useState(null)


  // get value add
  const deleteImage = (index) => {setImages(images.filter((image, i) => i !== index))};
  const valueName_kontrakan = (e) => {setName_kontrakan(e.target.value)}
  const valueAddress = (e) => {setAddress(e.target.value)}

  // get value edit
  const valueDetailid = (e) => {setDetailid(e.target.value)}
  const valueNameid = (e) => {setNameid(e.target.value)}
  const deleteImageid = (index) => {setImageid(imageid.filter((image, i) => i !== index))};


  const data = [
    { label: "Bandung", value: "Bandung" },
    { label: "Jakarta", value: "Jakarta" },
    { label: "Bali", value: "Bali" },
    { label: "Surabaya", value: "Surabaya" },
    { label: "Palembang", value: "Palembang" },
    { label: "Malang", value: "Malang" },
    { label: "Yogyakarta", value: "Yogyakarta" },
    
 ];

  const handleShowadd = () => {
    (profile.rekening === null) ? toast.error("Please insert no rekening first", {
        position: toast.POSITION.TOP_RIGHT,
      })
     : setShowadd(true)
  }

  useEffect(() => {
    setLoading(true)
    categoryKontrakanGet(profile.id_acc)
    .then((res) => {
      // console.log(res.data.data)
      setDatakontrakan(res.data.data)
      setLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
    })    
  }, [profile.id_acc])

  const clearState = () => {
    setImages([])
    setAddress(null)
    setName_kontrakan(null)
    setProvince(null)
  }
  

  
  const handleAddCategory = async () => {
    try {
      if(!images[0] || !name_kontrakan || !province || !address){
        return (
          toast.error("Data login can't be empty", {
            position: toast.POSITION.TOP_RIGHT,
          }),setLoading(false)
        )
      }
      const getToken = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('image', images[0])
      formData.append('kontrakan_name', name_kontrakan)
      formData.append('province', province)
      formData.append('detail_address', address)
      const result = await categoryKontrakanadd(formData, getToken)
      toast.success(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
      categoryKontrakanGet(profile.id_acc)
      .then((res) => {
        setDatakontrakan(res.data.data)
      })
      .catch((err) => console.log(err))
      setShowadd(false)
      clearState()
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }



  const handleCategoryID = (id_category_kontrakan) => {
    setIdctg(id_category_kontrakan)
    getCategoryKontrakanID(id_category_kontrakan)
    .then((res) => {
      console.log(res.data.data.image)
      setNameid(res.data.data[0].kontrakan_name)
      setDetailid(res.data.data[0].detail_address)
      setLocationid(res.data.data[0].province)
      setImageid(res.data.data.image)
    })

    .catch((err) => {
      console.log(err)
    })
  }

  const handleEditKontrakanID = async () => {
    try {
      const getToken = await localStorage.getItem('token')
      const formData = new FormData()
      formData.append('image', imageid[0])
      formData.append('kontrakan_name', nameid)
      formData.append('province', locationid)
      formData.append('detail_address', detailid)
      const result = await patchCategoryKontrakanID(idctg, formData, getToken)
      toast.success(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
      categoryKontrakanGet(profile.id_acc)
      .then((res) => {
        setDatakontrakan(res.data.data)
      })
      .catch((err) => console.log(err))
      setShowedit(false)
      // clearState()
    } catch (err) {
      console.log(err)
    }
  }

  const deleteCategory = async () => {
    try {
      const result = await deleteCategoryKontrakanID(deleteid)
      const response = await categoryKontrakanGet(profile.id_acc)
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
                  <p>Data Kontrakan</p>  
                  <button className={css.btn_modal} onClick={handleShowadd}><i className="fa-solid fa-plus pe-2"></i>Add Kontrakan</button>
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
                {loading 
                ? <div className="d-flex justify-content-center align-items-center pt-5">
                    <Spinner animation="border" />
                  </div> 
                : <div className={css.scroll}>
                  {datakontrakan.length !== 0 ? datakontrakan.map((e,index) => (
                    <ListkontrakanOwner
                     key={index}
                     no={index + 1}
                     id_kontrakan={e.id}
                     image_kontrakan={e.image}
                     name_kontrakan={e.kontrakan_name}
                     address_kontrakan={e.detail_address}
                     location={e.province}
                     kontrakan_loc={e.province}
                     handle_edit={() => {setShowedit(true); handleCategoryID(e.id) }}
                     handle_delete={() => {setShowdelete(true); setDeleteid(e.id)}}
                    />
                  )) : 'data kosong'}
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
            Add Kontrakan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className={css.container_modals}>
          <div className={css.form_name_kontrakan}>
            <label htmlFor="">Name Kontrakan</label>
            <input type="text" value={name_kontrakan} onChange={valueName_kontrakan} placeholder='Please input name kontrakan' />
          </div>
          <div className={css.form_location}>
            <label htmlFor="">Location</label>
            <div className="w-100">
            <select className="form-select" data-size='5' aria-label="Default select example" onClick={(e) => {setProvince(e.target.value); console.log(e.target.value)} }>
              <option selected >Open this select menu</option>
              {data.map((index) => (
                <option value={index.value}>{index.label}</option>
              ))}
            </select>
            </div>
          </div>
          <div className={css.form_address}>
            <label htmlFor="">Address</label>
            <input type="text" value={address} onChange={valueAddress} placeholder='Please input address' />
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
                {images.length < 1 && (
                  <label for="img-product">
                    <div className={css["add-photo"]}>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="img-product"
                        onChange={(e) => {
                          setImages([e.target.files[0]])
                        }}
                      />
                      <img src={createImage} alt="create_image" className={css.image_preview} width='120' height='120' />
                    </div>
                  </label>
                )}
          </div>
          <button className={css.btn_modal_1} onClick={handleAddCategory}>Save Changes</button>
          <button className={css.btn_modal_2} onClick={() => {setShowadd(false); clearState()}}>Cancel</button>
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
            Edit Kontrakan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className={css.container_modals}>
          <div className={css.form_name_kontrakan}>
            <label htmlFor="">Name Kontrakan</label>
            <input type="text" value={nameid}  onChange={valueNameid} placeholder='Please input name kontrakan' />
          </div>
          <div className={css.form_location}>
            <label htmlFor="">Location</label>
            <div className="w-100">
            <select className="form-select" data-size='5' aria-label="Default select example" onClick={(e) => {setLocationid(e.target.value); console.log(e.target.value)} }>
              <option selected >{locationid}</option>
              {data.map((index) => (
                <option value={index.value}>{index.label}</option>
              ))}
            </select>
            </div>
          </div>
          <div className={css.form_address}>
            <label htmlFor="">Address</label>
            <input type="text" value={detailid} onChange={valueDetailid} placeholder='Please input address' />
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
                        <i onClick={() => deleteImageid(index)} className={`fa-solid fa-plus bg-danger ${css.delete_image}`}></i>
                      </div>
                    );
                  })}
                {imageid.length < 1 && (
                  <label for="img-product">
                    <div className={css["add-photo"]}>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="img-product"
                        onChange={(e) => {
                          setImageid([e.target.files[0]])
                        }}
                      />
                      <img src={createImage} alt="create_image" className={css.image_preview} width='120' height='120' />
                    </div>
                  </label>
                )}
          </div>
          <button className={css.btn_modal_1} onClick={handleEditKontrakanID}>Save Changes</button>
          <button className={css.btn_modal_2} onClick={() => {setShowedit(false); clearState()}}>Cancel</button>
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
        centered
      >
        <Modal.Header closeButton className={`text-white`} style={{backgroundColor:'#3a3a3a'}}>
          <Modal.Title id="example-custom-modal-styling-title">
            Delete Kontrakan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='pt-3'>
          <p>Are you sure want to delete this category kontrakan ?</p>
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

export default DatakontrakanOwner