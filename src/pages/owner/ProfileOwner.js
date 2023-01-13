import React, { useState } from 'react'

// import component
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import Sidebarowner from '../../component/Sidebar_owner';
import Form from 'react-bootstrap/Form';


// import css
import css from "../../styles/page/owner/ProfileOwner.module.css"
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

function ProfileOwner() {

  const profile = useSelector((state) => state.auth.profile)

  const [show, setShow] = useState(false);
  const [showpass, setShowpass] = useState(false);

  return (
    <>
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
                    <img src="https://res.cloudinary.com/dx7cvqczn/image/upload/v1667811029/coffee_addict/pic_default.png" alt="Profile" className={css.profile_picture} />
                    <input type="file" name="choose_image" id="choose_image" className='' />
                    <div className={css.container_profile_1}>
                      <p className={css.title_username}>Username</p>
                      <p className={css.title_role}>Email@gmail.com</p>
                    </div>
                  </div>
                  <div className={`${css.button_edit_password}`}>
                    <button className={`${css.btn_edit_password} me-3`} onClick={() => setShow(true)}>Edit Profile</button>
                    <button className={css.btn_edit_password} onClick={() => setShowpass(true)}>Edit Password</button>
                  </div>
                </div>
                <div className={css.data_detail}>
                  <div className="">
                    <p className={css.title_data}>Data Detail</p>
                    <div className={css.box_container}>
                      <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2`}>
                        <label htmlFor="">Name</label>
                        <label htmlFor="">Email</label>
                        <label htmlFor="">Phone number</label>
                        <label htmlFor="">Gender</label>
                        <label htmlFor="">Address</label>
                        <label htmlFor="">Location</label>
                      </div>
                      <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2`}>
                        <label htmlFor="">:</label>
                        <label htmlFor="">:</label>
                        <label htmlFor="">:</label>
                        <label htmlFor="">:</label>
                        <label htmlFor="">:</label>
                        <label htmlFor="">:</label>
                      </div>
                      <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2 pt-3`}>
                        <label htmlFor="">{profile.fullname}</label>
                        <label htmlFor="">{profile.email}</label>
                        <label htmlFor="">{profile.phone_number}</label>
                        <label htmlFor="">{profile.gender}</label>
                        <label htmlFor="">{profile.address}</label>
                        <label htmlFor="">{profile.location}</label>
                      </div>
                    </div>
                    <div className={css.noted}>
                      <p>* Click image for change image profile</p>
                      <p>* Click edit data to edit profile data</p>
                      <p>* Click edit password to change password</p>
                    </div>
                  </div>
                  <div className={css.card}>
                    <div className="d-flex flex-column align-items-center">
                      <img src={profile.image} alt="" className={css.image_card} />
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
        <div className="w-100">
          <div className={css.form_fullname}>
            <label htmlFor="">Fullname</label>
            <input type="text" name="" id="" placeholder='Please input Fullname' />
          </div>
          <div className={css.radio_gender}>
            <p className={css.gender_title}>Gender</p>
            <div key={`inline-radio`} className=" pt-3 mb-3">
                  <Form.Check
                    inline
                    label="Male"
                    name="group1"
                    type='radio'
                    id={`inline-radio-1`}
                  />
                  <Form.Check
                    inline
                    label="Female"
                    name="group1"
                    type='radio'
                    id={`inline-radio-2`}
                  />
            </div>            
          </div>
          <div className={css.form_address}>
            <label htmlFor="">Address</label>
            <input type="text" name="" id="" placeholder='Please input address' />
          </div>
          <div className={css.form_location}>
            <label htmlFor="">Location</label>
            <input type="text" name="" id="" placeholder='Please input Location' />
          </div>
          <button className={css.btn_modal_1}>Save Changes</button>
          <button className={css.btn_modal_2}>Cancel</button>
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