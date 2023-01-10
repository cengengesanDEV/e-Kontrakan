import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// import css
import css from '../styles/page/Register.module.css'

// import image
import wp_left from "../assets/wp_auth.jpg";

// import component
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

// import icon react bawaan
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { Link, Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { RegisterAccount } from '../utils/axios';

function Register() {

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)

  const showPassword = () => {
    if (type === "password") {
       setIcon(eye);
       setType("text");
    } else {
       setIcon(eyeOff);
       setType("password");
    }
  };

  const valueNumber = (e) => {
    if (e.target.value.length === 0) setPhoneNumber("");
    if (/[0-9]{1,12}/g.test(e.target.value[e.target.value.length - 1])) setPhoneNumber(e.target.value);
  };

  const valueEmail = (e) => {
    setEmail(e.target.value)
  }
  const valuePassword = (e) => {
    setPassword(e.target.value)
  }
  const valueRole = (e) => {
    setRole(e.target.value)
  }


  const registerData = async () => {
    try {
      setLoading(true)
      if(!email || !password || !phoneNumber || !role) return (
        toast.error("Data register can't be empty", {
          position: toast.POSITION.TOP_RIGHT,
        }),setLoading(false)
      )
      const response = await RegisterAccount({
        email: email,
        passwords : password,
        phone_number : phoneNumber,
        role : role
      })
      toast.success(response.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
      })
      Navigate("/login")
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
    })
      setLoading(false)
    }
  }



  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className=''>
        <div className={css.container_main}>
          <div className={css.content_left}>
            <img src={wp_left} alt='Homepage' />
          </div>
          <div className={css.content_right}>
            <div className={css.login_background}>
              <p className={css.login_title}>REGISTRATION</p>
            </div>
            <div className={css.content_form}>
              <div className={css.title_announ}>
                <p className='text-center'>Before you booking please register your data first</p>
              </div>
              <div className={css.input_login_email}>
                <label htmlFor="">Email</label>
                <input type="text" name="" id="" placeholder='please input email address' onChange={valueEmail} />
              </div>
              <div className={css.input_login_password}>
                <label htmlFor="">Password</label>
                <div className={css.show_eye} onClick={showPassword}>
                  <input type={type} name="" id="" placeholder='please input password' onChange={valuePassword} />
                  <Icon icon={icon} className="ms-2 my-2" />
                </div>
              </div>
              <div className={css.input_login_phone}>
                <label htmlFor="">Phone Number</label>
                <input 
                  type="tel"
                  fields={6}
                  maxLength={12}
                  pattern="[0-9]{12}"
                  name=""
                  id=""
                  value={phoneNumber}
                  onChange={valueNumber}
                  placeholder='please input phone number' />
              </div>
              <div className={css.container_radio}>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={valueRole} />
                <label className={`${css.label_owner} form-check-label`} for="flexRadioDefault1">
                  Owner
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={valueRole} />
                <label className={`${css.label_customer} form-check-label`} for="flexRadioDefault2">
                  Customer
                </label>
              </div>
              </div>
              <div className={css.link_register}>
                <p>You have an account? Let's <Link to='/'>Login</Link></p>
              </div>
              <div className={css.button_container}>
                {loading ? <div className="d-flex justify-content-center align-items-center pt-3">
                    <Spinner animation="border" />
                </div> : <button className={css.login_button} onClick={registerData}>Register</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Register