import React, { useState } from 'react'

// import component
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import Sidebarowner from '../../component/Sidebar_owner';

// import css
import css from "../../styles/page/owner/ProfileOwner.module.css"
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

function ProfileOwner() {

  const profile = useSelector((state) => state.auth.profile)

  const [show, setShow] = useState(false);

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
                    <button className='me-2' onClick={() => setShow(true)}>Edit Profile</button>
                    <button>Edit Password</button>
                  </div>
                </div>
                <div className={css.content_input}>
                  <div className={css.fullname}>
                    <label htmlFor="">Fullname</label>
                    <input type="text" value={profile.fullname} placeholder='Please input fullname' disabled />
                  </div>
                  <div className={css.phone_number}>
                    <label htmlFor="">Phone Number</label>
                    <input type="tel" value={profile.phone_number} placeholder='Please input phone number' disabled />
                  </div>
                </div>
                <div className={css.content_input}>
                  <div className={css.fullname}>
                    <label htmlFor="">Address</label>
                    <input type="text" value={profile.address} placeholder='Please input address' disabled />
                  </div>
                  <div className={css.phone_number}>
                    <label htmlFor="">Location</label>
                    <input type="tel" value={profile.location} placeholder='Please input location' disabled />
                  </div>
                </div>
                <div className={css.save_change}>
                  <button>Save Change</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />


      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop='static'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
        </Modal.Body>
        <Modal.Footer>
        <Button>Close</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default ProfileOwner