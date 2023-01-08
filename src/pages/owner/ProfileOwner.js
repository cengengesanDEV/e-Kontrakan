import React from 'react'

// import component
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import Sidebarowner from '../../component/Sidebar_owner';

// import css
import css from "../../styles/page/owner/ProfileOwner.module.css"

function ProfileOwner() {
  return (
    <>
      <Navbar />
        <div className="container-fluid">
          <div className={css.container_left_right}>
            {/* container left */}
            <Sidebarowner />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>
              <div className={css.container_form}>
                <div className={css.container_profile}>
                  <div className={css.image_profile}>
                    <img src="https://res.cloudinary.com/dx7cvqczn/image/upload/v1667811029/coffee_addict/pic_default.png" alt="Profile" className={css.profile_picture} />
                    <input type="file" name="choose_image" id="choose_image" className='' />
                    <div className={css.container_profile_1}>
                      <p className={css.title_username}>Username</p>
                      <p className={css.title_role}>username@gmail.com</p>
                    </div>
                  </div>
                  <div className={css.button_edit_password}>
                    <button>Edit Password</button>
                  </div>
                </div>
                <div className={css.content_input}>
                  <div className={css.fullname}>
                    <label htmlFor="">Fullname</label>
                    <input type="text" name="" id="" placeholder='Please input fullname' />
                  </div>
                  <div className={css.phone_number}>
                    <label htmlFor="">Phone Number</label>
                    <input type="tel" name="" id="" placeholder='Please input phone number' />
                  </div>
                </div>
                <div className={css.content_input}>
                  <div className={css.fullname}>
                    <label htmlFor="">Address</label>
                    <input type="text" name="" id="" placeholder='Please input fullname' />
                  </div>
                  <div className={css.phone_number}>
                    <label htmlFor="">Location</label>
                    <input type="tel" name="" id="" placeholder='Please input phone location' />
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
    </>
  )
}

export default ProfileOwner