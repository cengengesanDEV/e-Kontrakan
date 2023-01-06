import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// import image
import wp_left from "../assets/wp_auth.jpg";

// import component
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

// import icon react bawaan
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

// import css
import css from "../styles/page/Login.module.css";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function Login() {

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

  const LoginData = () => {
    setLoading(true)
    if(!email || !password) return (
      toast.error("Data login can't be empty", {
        position: toast.POSITION.TOP_RIGHT,
      }),setLoading(false)
    )
    console.log("ssd")
    // axios taro disini
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
              <p className={css.login_title}>LOGIN</p>
            </div>
            <div className={css.content_form}>
              <div className={css.title_announ}>
                <p>log in with your account to be able to booking at will</p>
              </div>
              <div className={css.input_login_email}>
                <label htmlFor="">Email</label>
                <input type="text" name="" id="" placeholder="please input email address" />
              </div>
              <div className={css.input_login_password}>
                <label htmlFor="">Password</label>
                <div className={css.show_eye} onClick={showPassword}>
                  <input type={type} name="" id="" placeholder="please input password" />
                  <Icon icon={icon} className="ms-2 my-2" />
                </div>
              </div>
              <div className={css.link_register}>
                <p>Don't have an account? Let's <Link to='/register'>Sign Up</Link></p>
              </div>
              <div className={css.button_container}>
              {loading ? <div className="d-flex justify-content-center align-items-center pt-3">
                    <Spinner animation="border" />
                </div> : <button className={css.login_button} onClick={LoginData}>Login</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
