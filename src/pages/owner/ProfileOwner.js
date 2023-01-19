import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import component
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import Sidebarowner from '../../component/Sidebar_owner';

// axios
import { patchProfile } from "../../utils/axios"
import authAction from '../../redux/actions/auth';


// import css
import css from "../../styles/page/owner/ProfileOwner.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Spinner } from 'react-bootstrap';

function ProfileOwner() {

  const dispatch = useDispatch()
  const profile = useSelector((state) => state.auth.profile)

  const [show, setShow] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const [display, setDisplay] = useState(profile.image)
  const [image, setImage] = useState(null)
  const [fullname, setFullname] = useState(profile.fullname)
  const [address, setAddress] = useState(profile.address)
  const [gender, setGender] = useState(profile.gender)
  const [rek, setRek] = useState(profile.rekening)
  const [location, setLocation] = useState(profile.location)
  const [loading, setLoading] = useState(false)


  const handleImagePreview = (e) => {
    setImage(e.target.files[0])
    // console.log(typeof(e.target.files[0]))
    // console.log(e.target.files)
    setDisplay(URL.createObjectURL(e.target.files[0]))
  }

  const valueFullname = (e) => {setFullname(e.target.value)}
  const valueAddress = (e) => {setAddress(e.target.value)}
  const valueGender = (e) => {setGender(e.target.value)}
  const valueLocation = (e) => {setLocation(e.target.value)}
  const valueNumber = (e) => {
    if (e.target.value.length === 0) setRek("");
    if (/[0-9]{1,16}/g.test(e.target.value[e.target.value.length - 1])) setRek(e.target.value);
  };


  const handleEditProfile = async () => {
    try {
      setLoading(true)
      const getToken = localStorage.getItem('token')      
      const formData = new FormData()
      if(fullname) formData.append('full_name', fullname)
      if(address) formData.append('address', address)
      if(location) formData.append('location', location)
      if(gender) formData.append('gender', gender)
      if(rek) formData.append('no_rekening',rek)
      if(image) formData.append('image', image)
      const result = await patchProfile(formData, getToken)
      await dispatch(authAction.profileThunk(getToken))
      toast.success(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
      setShow(false)
      setLoading(false)
    } catch (err) {
      // console.log(err)
      setShow(false)
      setLoading(false)
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
            <Sidebarowner page='profileowner' />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>
              <div className={css.container_form}>
                <div className={css.container_profile}>
                  <div className={css.image_profile}>
                    <img src={profile.image} alt="Profile" className={css.profile_picture} />
                    <div className={css.container_profile_1}>
                      <p className={css.title_username}>{profile.fullname === null ? 'Username' : profile.fullname}</p>
                      <p className={css.title_role}>{profile.email}</p>
                    </div>
                  </div>
                  <div className={`${css.button_edit_password}`}>
                    <button className={`${css.btn_edit_password} me-3`} onClick={() => setShow(true)}>Edit Profile</button>
                    <button className={css.btn_edit_password} onClick={() => setShowpass(true)}>Edit Password</button>
                  </div>
                </div>
                <div className={css.data_detail}>
                  <div className={css.left}>
                    <p className={css.title_data}>Data Detail</p>
                    <div className={css.box_container}>
                      <div>
                        <span className={css.label}>Name</span>
                        <span className={css.titik}>:</span>
                        <span className={css.text}>{profile.fullname === null ? "-" : profile.fullname}</span>
                      </div>
                      <div>
                        <span className={css.label}>Email</span>
                        <span className={css.titik}>:</span>
                        <span className={css.text}>{profile.email === null ? "-" : profile.email}</span>
                      </div>
                      <div>
                        <span className={css.label}>No Rekening</span>
                        <span className={css.titik}>:</span>
                        <span className={css.text}>{profile.rekening === null ? "-" : profile.rekening}</span>
                      </div>
                      <div>
                        <span className={css.label}>Phone number</span>
                        <span className={css.titik}>:</span>
                        <span className={css.text}>{profile.phone_number === null ? "-" : profile.phone_number}</span>
                      </div>
                      <div>
                        <span className={css.label}>Gender</span>
                        <span className={css.titik}>:</span>
                        <span className={css.text}>{profile.gender === null ? "-" : profile.gender}</span>
                      </div>
                      <div>
                        <span className={css.label}>Address</span>
                        <span className={css.titik}>:</span>
                        <span className={css.text}>{profile.address === null ? "-" : profile.address}</span>
                      </div>
                      <div>
                        <span className={css.label}>Location</span>
                        <span className={css.titik}>:</span>
                        <span className={css.text}>{profile.location === null ? "-" : profile.location}</span>
                      </div>
                    </div>
                    <div className={css.noted}>
                      <p>* Click edit data to edit profile data</p>
                      <p>* Click edit password to change password</p>
                    </div>
                  </div>
                  <div className={css.card}>
                    <div className="d-flex flex-column align-items-center">
                      <img src={profile.image} alt="images" className={css.image_card} />
                      <p className={css.card_title_fullname}>{profile.fullname === null ? "please input name" : profile.fullname}</p>
                      <p className={css.card_title_phone_number}>{profile.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />

      {/* Edit Profile */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop='static'
        centered
      >
        <Modal.Header closeButton className={`text-white`} style={{backgroundColor:'#3a3a3a'}}>
          <Modal.Title id="example-custom-modal-styling-title">
            Profile Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className={css.scroll}>
          <label htmlFor="" className={css.title_foto_profile}>Foto profile</label>
          <div className={css.form_fullname}>
            <label htmlFor="img_picture"><img src={display} alt="empty-img" className={css.image_modal_preview} /></label>
            <input type="file" id="img_picture"className='d-none' onChange={handleImagePreview} />
          </div>
          <div className={css.form_fullname}>
            <label htmlFor="">Fullname</label>
            <input type="text" value={fullname} name="full_name" id="" placeholder='Please input Fullname' onChange={valueFullname} />
          </div>
          <div className={`${css.form_fullname} pt-3`}>
            <label htmlFor="">No Rekening</label>
            <input 
                  type="tel"
                  fields={6}
                  maxLength={16}
                  pattern="[0-9]{16}"
                  value={rek}
                  onChange={valueNumber}
                  placeholder='please input phone number' />
          </div>
          <div className={css.radio_gender}>
            <p className={css.gender_title}>Gender</p>
            <div className="py-3">
              <div className="form-check">
                <input className="form-check-input" value='male' type="radio" name="gender" id="flexRadioDefault1" onChange={valueGender} checked={gender === 'male' ? true : false} />
                <label className="form-check-label" for="flexRadioDefault1">
                  Male
                </label>
              </div>
              <div className="form-check pt-2">
                <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault2" onChange={valueGender} value='female' checked={gender === 'female' ? true : false} />
                <label className="form-check-label" for="flexRadioDefault2">
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className={css.form_address}>
            <label htmlFor="">Address</label>
            <input type="text" name="address" value={address} onChange={valueAddress} placeholder='Please input address' />
          </div>
          <div className={css.form_location}>
            <label htmlFor="">Location</label>
            <input type="text" value={location} name="location" onChange={valueLocation}  placeholder='Please input Location' />
          </div>
          {loading ? <div className="d-flex justify-content-center align-items-center py-4">
                    <Spinner animation="border" /> </div> : <><button className={css.btn_modal_1} onClick={handleEditProfile}>Save Changes</button> 
          <button className={css.btn_modal_2} onClick={() => setShow(false)}>Cancel</button> </>}
        </div>
        </Modal.Body>
      </Modal>


      {/* Edit Password */}
      <Modal
        show={showpass}
        onHide={() => setShowpass(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop='static'
        centered
      >
        <Modal.Header closeButton className={`text-white`} style={{backgroundColor:'#3a3a3a'}}>
          <Modal.Title id="example-custom-modal-styling-title">
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="w-100">
          <div className={css.form_fullname}>
            <label htmlFor="">Old Password</label>
            <input type="text" placeholder='Please input old password' />
          </div>
          <div className={css.form_location}>
            <label htmlFor="">New Password</label>
            <input type="text" placeholder='Please input new password' />
          </div>
          <div className={css.form_location}>
            <label htmlFor="">Confirm Password</label>
            <input type="text" placeholder='Please input confirm password' />
          </div>
          <button className={css.btn_modal_1}>Save Changes</button>
          <button className={css.btn_modal_2}>Cancel</button>
        </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProfileOwner