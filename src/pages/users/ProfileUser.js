import React from "react";

import css from "../../styles/page/users/ProfileUsers.module.css";

import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authAction from "../../redux/actions/auth";
import { Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { patchProfile, editPassword, uploadKTP } from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import { Button, Input, message } from "antd";

function ProfileUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.auth.profile);
  

  const [show, setShow] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [display, setDisplay] = useState(profile.image);
  const [image, setImage] = useState(null);
  const [fullname, setFullname] = useState(profile.fullname);
  const [noKTP, setNoKTP] = useState(profile.noKTP)
  const [address, setAddress] = useState(profile.address);
  const [gender, setGender] = useState(profile.gender);
  const [location, setLocation] = useState(profile.location);
  const [loading, setLoading] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [confirmPass, setConfimPass] = useState("");
  const [showKTP, setShowKTP] = useState(false)
  const [image_ktp, setImage_ktp] = useState(null)
  const [loadingKTP, setLoadingKTP] = useState(false)

  const handleImagePreview = (e) => {
    setImage(e.target.files[0]);
    // console.log(typeof(e.target.files[0]))
    // console.log(e.target.files)
    setDisplay(URL.createObjectURL(e.target.files[0]));
  };

  const valueFullname = (e) => {
    setFullname(e.target.value);
  };
  const valueAddress = (e) => {
    setAddress(e.target.value);
  };
  const valueGender = (e) => {
    setGender(e.target.value);
  };
  const valueLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleEditProfile = async () => {
    try {
      setLoading(true);
      const getToken = localStorage.getItem("token");
      const formData = new FormData();
      if (fullname) formData.append("full_name", fullname);
      if (noKTP) formData.append("no_ktp", noKTP);
      if (address) formData.append("address", address);
      if (location) formData.append("location", location);
      if (gender) formData.append("gender", gender);
      if (image) formData.append("image", image);
      const result = await patchProfile(formData, getToken);
      await dispatch(authAction.profileThunk(getToken));
      toast.success(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowEdit(false);
      setLoading(false);
    } catch (err) {
      // console.log(err)
      setShow(false);
      setLoading(false);
      toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleLogout = () => {
    const getToken = localStorage.getItem("token");
    dispatch(
      authAction.logoutThunk(getToken, () => {
        navigate("/login");
      })
    );
  };

  const handleEditPass = async () => {
    try {
      if (!oldPass || !newPass || !confirmPass) {
        return toast.error("please input all form to change password", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      const token = await localStorage.getItem("token");
      await editPassword(token, {
        oldpass: oldPass,
        newpass: newPass,
        confirmpass: confirmPass,
      });
      toast.success("edit password success", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowpass(false);
      setNewPass("");
      setOldPass("");
      setConfimPass("");
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleUploadKTP = async () => {
    try {
      setLoadingKTP(true)
      if(!image_ktp) return (message.info('please upload ktp'), setLoadingKTP(false))
      const formData = new FormData()
      if(image_ktp) formData.append('image_ktp', image_ktp)
      const token = await localStorage.getItem("token");
      await uploadKTP(formData, token)
      await dispatch(authAction.profileThunk(token));
      message.success('Upload success')
      setShowKTP(false)
      setLoadingKTP(false)
    } catch (error) {
      console.log(error)
      setLoadingKTP(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <main className={css.container}>
        <div className={css.button_container}>
          <button className={css.btn_modal_1} onClick={() => setShowKTP(true)}>
            Upload KTP
          </button>
          <button className={css.btn_modal_1} onClick={() => setShowpass(true)}>
            Edit password
          </button>
          <button className={css.btn_modal_1} onClick={() => setShowEdit(true)}>
            Edit profile
          </button>
        </div>
        <side className={css.profile_container}>
          <span className={css.profile_Top}>
            <div>
              <span className={css.label}>Email </span>
              <span className={css.titik}>:</span>
              <span className={css.text}>{profile.email}</span>
            </div>
            <div>
              <span className={css.label}>Nomor KTP </span>
              <span className={css.titik}>:</span>
              <span className={css.text}>{profile.noKTP}</span>
            </div>
            <div>
              <span className={css.label}>Full name</span>
              <span className={css.titik}>:</span>
              <span className={css.text}>{profile.fullname}</span>
            </div>
            <div>
              <span className={css.label}>Phone number</span>
              <span className={css.titik}>:</span>
              <span className={css.text}>{profile.phone_number}</span>
            </div>
            <div>
              <span className={css.label}>Location</span>
              <span className={css.titik}>:</span>
              <span className={css.text}>
                {profile.location ? profile.location : "-"}
              </span>
            </div>
            <div>
              <span className={css.label}>Address</span>
              <span className={css.titik}>:</span>
              <span className={css.text}>
                {profile.address ? profile.address : "-"}
              </span>
            </div>
            <div>
              <span className={css.label}>Gender</span>
              <span className={css.titik}>:</span>
              <span className={css.text}>
                {profile.gender ? profile.gender : "-"}
              </span>
            </div>
          </span>
          <span className={css.profile_bottom}>
            <div className={css.card}>
              <div className="d-flex flex-column align-items-center">
                <img
                  src={profile.image}
                  alt="images"
                  className={css.image_card}
                />
                <p className={css.card_title_fullname}>
                  {profile.fullname === null
                    ? "please input name"
                    : profile.fullname}
                </p>
                <p className={css.card_title_phone_number}>{profile.role}</p>
              </div>
            </div>
          </span>
          <span className={css.profile_bottom}>
            <div className={css.card}>
              <div className="d-flex flex-column align-items-center">
                <img
                  src={profile.image_ktp}
                  alt="images_ktp"
                  width={'150px'}
                  height={'150px'}
                />
              </div>
            </div>
          </span>
        </side>
        <div className="d-flex justify-content-end mb-5">
          <button className={css.logout} onClick={() => setShow(true)}>
            logout
          </button>
        </div>
      </main>
      <Footer />

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop="static"
        centered
      >
        <Modal.Header
          closeButton
          className={`text-white`}
          style={{ backgroundColor: "#3a3a3a" }}
        >
          <Modal.Title id="example-custom-modal-styling-title">
            are you sure want to logout ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100">
            <button className={css.btn_modal_1} onClick={handleLogout}>
              yes
            </button>
            <button className={css.btn_modal_2} onClick={() => setShow(false)}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showKTP}
        onHide={() => setShowKTP(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop="static"
        centered
      >
        <Modal.Header
          closeButton
          className={`text-white`}
          style={{ backgroundColor: "#3a3a3a" }}
        >
          <Modal.Title id="example-custom-modal-styling-title">
            Upload KTP
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" onChange={(e) => setImage_ktp(e.target.files[0])} />
        </Modal.Body>
        <Modal.Footer>
          <>
            <Button type="primary" loading={loadingKTP} onClick={handleUploadKTP}>
              Save Changes
            </Button>
            <Button type='primary' danger onClick={() => setShowKTP(false)}>
              Cancel
            </Button>
          </>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop="static"
        centered
      >
        <Modal.Header
          closeButton
          className={`text-white`}
          style={{ backgroundColor: "#3a3a3a" }}
        >
          <Modal.Title id="example-custom-modal-styling-title">
            Profile Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={css.scroll}>
            <label htmlFor="" className={css.title_foto_profile}>
              Foto profile
            </label>
            <div className={css.form_fullname}>
              <label htmlFor="img_picture">
                <img
                  src={display}
                  alt="empty-img"
                  className={css.image_modal_preview}
                />
              </label>
              <input
                type="file"
                id="img_picture"
                className="d-none"
                onChange={handleImagePreview}
              />
            </div>
            <div className={css.form_fullname}>
              <label htmlFor="">Fullname</label>
              <input
                type="text"
                value={fullname}
                name="full_name"
                id=""
                placeholder="Please input Fullname"
                onChange={valueFullname}
              />
            </div>
            <div className={css.form_fullname}>
              <label htmlFor="">Number KTP</label>
              <input
                type="text"
                value={noKTP}
                name="full_name"
                id=""
                placeholder="Please input number KTP"
                onChange={(e) => setNoKTP(e.target.value)}
              />
            </div>
            <div className={css.radio_gender}>
              <p className={css.gender_title}>Gender</p>
              <div className="py-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    value="male"
                    type="radio"
                    name="gender"
                    id="flexRadioDefault1"
                    onChange={valueGender}
                    checked={gender === "male" ? true : false}
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    Male
                  </label>
                </div>
                <div className="form-check pt-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="flexRadioDefault2"
                    onChange={valueGender}
                    value="female"
                    checked={gender === "female" ? true : false}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className={css.form_address}>
              <label htmlFor="">Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={valueAddress}
                placeholder="Please input address"
              />
            </div>
            <div className={css.form_location}>
              <label htmlFor="">Location</label>
              <input
                type="text"
                value={location}
                name="location"
                onChange={valueLocation}
                placeholder="Please input Location"
              />
            </div>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center py-4">
                <Spinner animation="border" />{" "}
              </div>
            ) : (
              <>
                <button className={css.btn_modal_1} onClick={handleEditProfile}>
                  Save Changes
                </button>
                <button
                  className={css.btn_modal_2}
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>{" "}
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showpass}
        onHide={() => {
          setNewPass("");
          setOldPass("");
          setConfimPass("");
          setShowpass(false);
        }}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop="static"
        centered
      >
        <Modal.Header
          closeButton
          className={`text-white`}
          style={{ backgroundColor: "#3a3a3a" }}
        >
          <Modal.Title id="example-custom-modal-styling-title">
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100">
            <div className={css.form_fullname}>
              <label htmlFor="">Old Password</label>
              <input
                type="password"
                placeholder="Please input old password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
            </div>
            <div className={css.form_location}>
              <label htmlFor="">New Password</label>
              <input
                type="password"
                placeholder="Please input new password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <div className={css.form_location}>
              <label htmlFor="">Confirm Password</label>
              <input
                type="password"
                placeholder="Please input confirm password"
                value={confirmPass}
                onChange={(e) => setConfimPass(e.target.value)}
              />
            </div>
            <button className={css.btn_modal_1} onClick={handleEditPass}>
              Save Changes
            </button>
            <button
              className={css.btn_modal_2}
              onClick={() => {
                setNewPass("");
                setOldPass("");
                setConfimPass("");
                setShowpass(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      
    </>
  );
}

export default ProfileUser;
