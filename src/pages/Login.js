import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

// import support implementation
import { LoginAccount } from "../utils/axios";
import authAction from "../redux/actions/auth";


function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const valueEmail = (e) => {
    setEmail(e.target.value)
  }
  const valuePassword = (e) => {
    setPassword(e.target.value)    
  }

  const LoginData = async () => {
    try {
      setLoading(true)
      if(!email || !password) return (
        toast.error("Data login can't be empty", {
          position: toast.POSITION.TOP_RIGHT,
        }),setLoading(false)
      )
      const response = await LoginAccount({email: email, passwords: password})
      console.log(response.data.data)
      localStorage.setItem('token', response.data.data.token)
      const getToken = response.data.data.token
      await dispatch(authAction.profileThunk(getToken,
        () => {
          if(response.data.data.role === 'admin') {
            toast.success("Login Success", {
              position: toast.POSITION.TOP_RIGHT,
            })
            setTimeout(() => {
              navigate('/dashboardadmin')
            }, 2000);            
          }else if(response.data.data.role === 'owner'){
            toast.success("Login Success", {
              position: toast.POSITION.TOP_RIGHT,
            })
            setTimeout(() => {
              navigate('/dashboardowner')
            }, 2000);            
          } else if(response.data.data.role === 'customer'){
            toast.success("Login Success", {
              position: toast.POSITION.TOP_RIGHT,
            })
            setTimeout(() => {
              navigate('/')
            }, 2000);            
          }
        }))
      
      // navigate('/')
    } catch (err) {
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
                <input type="text" value={email} placeholder="please input email address" onChange={valueEmail} />
              </div>
              <div className={css.input_login_password}>
                <label htmlFor="">Password</label>
                <div className={css.show_eye} onClick={showPassword}>
                  <input type={type} value={password} placeholder="please input password" onChange={valuePassword} />
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
