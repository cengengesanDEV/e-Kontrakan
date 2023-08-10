import { Button, Input, Modal, message } from "antd";
import React, { useState } from "react";
import { changeforgotPassword, forgotPassword } from "../utils/axios";
import { useSelector } from "react-redux";

function ForgotPassword() {

  const token = useSelector((state) => state.auth.token)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('email');
  const [email, setEmail] = useState(null);
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [otp, setOtp] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirm, setConfirm] = useState(null)


  const handleSendEmail = () => {
    if(content == 'email'){
      if(!email) return message.info("Please insert email")
      setLoadingEmail(true)
      forgotPassword(email)
      .then((res) => {
        message.success(res.data.msg)
        setContent('changePassword')
        setEmail(null)
      })
      .catch((err) => message.error(err.response.data.msg))
      .finally(() => setLoadingEmail(false))
    }else{
      if(!otp || !password || !confirm) return message.info("Please insert field")
      if(password != confirm) return message.info("password tidak sesuai")
      setLoadingEmail(true)
      changeforgotPassword({otp,password})
      .then((res) => {
        // console.log("res.data", res.data)
        message.success(res.data.msg)
        setIsModalOpen(false)
      })
      .catch(err => message.error(err.response.data.msg))
      .finally(() => {setLoadingEmail(false)})
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setContent('email')
    setEmail(null)
    setOtp(null)
    setPassword(null)
    setConfirm(null)
  }



  return (
    <>
      <div className="d-flex flex-row justify-content-center w-100 mt-2">
        <Button onClick={() => setIsModalOpen(true)}>
          Forgot Password
        </Button>
      </div>
      <Modal
        title='Forgot Password'
        open={isModalOpen}
        onOk={() => handleSendEmail()}
        onCancel={() => handleCancel()}
        confirmLoading={loadingEmail}
      >
        {content == 'email'
        ? <>
          <p className="my-2">Please insert Email to change password</p>
          <Input placeholder="Please Insert Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </>
        : <>
          <p className="my-2">Change Password</p>
          <Input className="my-2" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Please insert OTP"  />
          <Input className="my-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Please insert new password"  />
          <Input className="my-2" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Please insert confirm password"  />
        </>}
      </Modal>
    </>
  );
}

export default ForgotPassword;
