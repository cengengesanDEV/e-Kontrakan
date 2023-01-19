import React, {  useEffect, useState } from 'react'

import Navbar from "../../component/Navbar"
import Footer from "../../component/Footer"
import css from "../../styles/page/users/Kontrakandetail.module.css"
import { useNavigate, useParams } from 'react-router-dom'
import {locationDetail,Bookingtransactions} from "../../utils/axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import house from "../../assets/no_bg_house.png"


function Kontrakandetail() {

  const { id_kontrakan } = useParams()
  const navigate = useNavigate()



  const [image_preview, setImage_preview] = useState([])
  const [fasilitas, setFasilitas] = useState([])
  const [preview, setPreview] = useState(0)
  const [datakontrakan, setDatakontrakan] = useState({})
  const [checkin, setCheckin] = useState(null)
  const [checkout, setCheckout] = useState(null)
  const [err, setErr] = useState(true)


  const valueCheckin = (e) => {setCheckin(e.target.value); setErr(true)}
  const valueCheckout = (e) => {setCheckout(e.target.value); setErr(true)}

  const transactionDate = () => {
    const arrbulan = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    const date = new Date();
    const tanggal = date.getDate();
    const bulan = date.getMonth();
    const tahun = date.getFullYear();
    return `${tahun}-${arrbulan[parseInt(bulan)]}-${tanggal}`;
  };

  const cek = () => {
    if(checkin < transactionDate()){
      return false
    }else if(checkin > checkout) {
      return false
    } else if( checkin === checkout ) {
      return false
    } else {
      return true
    }
  }

  const cekPrice = () => {
    const yearIn = parseInt(checkin.split("-")[0])
    const yearOut = parseInt(checkout.split("-")[0])
    const monthIn = parseInt(checkin.split("-")[1])
    const monthOut = parseInt(checkout.split("-")[1])
    let hargabulan = ((yearOut-yearIn)*12)+(monthOut-monthIn)
    if(hargabulan === 0) {
      return hargabulan += 1
    }return hargabulan
  }

  const postBooking = async () => {
    try {
      const getToken = await localStorage.getItem('token')
      if(!getToken) return (
        toast.error("Please Login first", {
          position: toast.POSITION.TOP_RIGHT,
        })
      )
      if(!checkin || !checkout) return (
        toast.error("Please start booking", {
          position: toast.POSITION.TOP_RIGHT,
        })
      )
      await cek()
      console.log(err)
      if(cek() === false) return (toast.error("please input date check in or check out correctly", {
        position: toast.POSITION.TOP_RIGHT,
      }))
      await cekPrice()
      const harga = cekPrice() * datakontrakan.price
      const result = await Bookingtransactions(getToken,{      
        id_kontrakan: parseInt(id_kontrakan),
        checkin: checkin,
        checkout: checkout,
        order_date: transactionDate(),
        total_price: harga,
      })
      toast.success(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      })
      navigate("/historyuser")
    } catch (err) {
      console.log(err)
      toast.error("Booking failed", {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  useEffect(() => {
      locationDetail(id_kontrakan)
      .then((res) => {
        console.log(res.data.data)
        setDatakontrakan(res.data.data)
        setImage_preview(res.data.data.image)
        setFasilitas(res.data.data.fasilitas)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id_kontrakan])

  const costing = (price) => {
    return (
       "Rp. " +
       parseFloat(price)
          .toFixed()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
 };
  return (
      <>
          <ToastContainer />
          <Navbar />
            <div >
                <p className={css.title_preview}>Preview Image</p>

                {/* preview image */}
                <div className={css.container_image_preview}>
                  <img src={image_preview[preview]} alt="imgPreview" className={css.card} />
                  <div className={css.container_preview}>
                    {image_preview.map((images, index) => (
                      <div key={index} className={css.card_preview} onClick={() => setPreview(index)}>
                        <img src={images} alt="imgPreview" width='150' height='150' />                    
                    </div>
                    ))}
                  </div>
                </div>

                {/* List */}
                <div style={{height: '200px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1a1a1a" fill-opacity="1" d="M0,192L48,186.7C96,181,192,171,288,160C384,149,480,139,576,138.7C672,139,768,149,864,160C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                </div>
                <div className={css.container_1}>
                  <p className={css.kontrakan_detail}>Data Kontrakan Detail</p>
                  <p className={css.title_kontrakan}>{datakontrakan.kontrakan_name}</p>
                  <div className={css.owner_price}>
                    <p>Owner : {datakontrakan.full_name}</p>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <i className="fa-solid fa-money-bill text-danger"></i>
                      <p className='text-danger'>{costing(datakontrakan.price)}</p>
                    </div>
                  </div>
                  <div className={css.box_container}>
                    <div className={`${css.data_profile_1} d-flex flex-column justify-content-center gap-2`}>
                      <label htmlFor="">Tipe Kontrakan</label>
                      <label htmlFor="">Fasilitas</label>
                      <label htmlFor="">Location</label>
                      <label htmlFor="">Status</label>
                      <label htmlFor="">Address</label>
                    </div>
                    <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2`}>
                      <label htmlFor="">:</label>
                      <label htmlFor="">:</label>
                      <label htmlFor="">:</label>
                      <label htmlFor="">:</label>
                      <label htmlFor="">:</label>
                    </div>
                    <div className={`${css.data_profile} d-flex flex-column justify-content-center gap-2`}>
                      <label htmlFor="">{datakontrakan.tipe_kontrakan}</label>
                      <label htmlFor="">{fasilitas.join()}</label>
                      <label htmlFor="">{datakontrakan.province}</label>
                      <label htmlFor="">{datakontrakan.status}</label>
                      <label htmlFor="">{datakontrakan.detail_address}</label>
                    </div>
                  </div>
                  <p className={css.desc}>Description <br /> {datakontrakan.deskripsi}</p>
                </div>

                <div style={{height: '100px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1a1a1a" fill-opacity="1" d="M0,64L48,58.7C96,53,192,43,288,37.3C384,32,480,32,576,74.7C672,117,768,203,864,229.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
                </div>
                {/* order */}
                <div className={css.container_2}>
                  <div className="">
                    <p className={css.title_start}>Start Booking</p>
                    <div className="d-flex flex-column align-items-start">
                      <div className={css.check}>
                        <label htmlFor="">Check-in</label>
                        <input type="date" name="" id="" onChange={valueCheckin} />
                      </div>
                      <div className={css.check_1}>
                        <label htmlFor="">Check-out</label>
                        <input type="date" name="" id="" onChange={valueCheckout} />
                      </div>
                      {checkin && checkout && <p>Total Price : {cekPrice() * datakontrakan.price}</p>}
                      {cek() ? <p className={css.error_massage}></p> : <p className={css.error_massage}>Enter the correct date</p> }
                      <button className={css.booking_btn} onClick={postBooking}>Go to booking</button>
                    </div>
                  </div>
                  <img src={house} alt="house" className={css.house_preview} />
                </div>
            </div>
          <Footer />
      </>
  )
}

export default Kontrakandetail