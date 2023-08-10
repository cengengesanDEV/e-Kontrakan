import React, { useEffect, useState } from "react";

// import component
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import CardKontrakan from "../component/CardKontrakan";

// import css
import css from "../styles/page/Kontrakan.module.css";
// simple dropdown
import { SimpleDropdown } from "react-js-dropdavn";
import "react-js-dropdavn/dist/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";



function Kontrakan() {

   const navigate = useNavigate()
   const [datakontrakan, setDatakontrakan] = useState([])
   const [next, setNext] = useState(null)
   const [prev, setPrev] = useState(null)
   const [province, setProvince] = useState('')

   const data = [
      { label: "Aceh", value: 3 },
      { label: "Bandung", value: 4 },
      { label: "Bali", value: 3 },
      { label: "Jakarta", value: 1 },
      { label: "Jawa Barat", value: 2 },
      { label: "Jawa Tengah", value: 3 },
      { label: "Jawa Timur", value: 3 },
      { label: "Lampung", value: 3 },
      { label: "Palembang", value: 3 },
      { label: "Medan", value: 3 },
   ];

   const costing = (price) => {
      return (
         "Rp. " +
         parseFloat(price)
            .toFixed()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      );
   };


   const handleNext = () => {
      axios.get(next)
      .then((res) => {
      //  console.log(res.data)
       setDatakontrakan(res.data.data)
       setNext(res.data.meta.next)
       setPrev(res.data.meta.prev)
      })
      .catch((err) => {
       console.log(err)
      })
   }

   const handlePrev = () => {
      axios.get(prev)
      .then((res) => {
      //  console.log(res.data)
       setDatakontrakan(res.data.data)
       setNext(res.data.meta.next)
       setPrev(res.data.meta.prev)
      })
      .catch((err) => {
       console.log(err)
      })
   }

   useEffect(() => {
     axios.get(`${process.env.REACT_APP_BACKEND_HOST}/kontrakan/?page=1&limit=8&province=${province}`)
     .then((res) => {
      console.log(res.data)
      setDatakontrakan(res.data.data)
      setNext(res.data.meta.next)
      setPrev(res.data.meta.prev)

     })
     .catch((err) => {
      console.log(err)
      setDatakontrakan([])
     })
   
   }, [province])
   



   return (
      <>
         <Navbar />
         <div className="container-fluid py-3">
            <div className={css.container_left_right}>
               {/* container left */}
               <div className={`container-fluid ${css.container_left}`}>
                  <div className={css.category}>
                     {/* <div className={css.category_left}>
                        <p>Jakarta</p>
                        <p>Jakarta</p>
                        <p>Jakarta</p>
                     </div>
                     <div className={css.category_right}>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                     </div> */}
                     <p className="text-center fw-bold fs-3">Category</p>
                     <br />
                     <div className="w-100">
                        <SimpleDropdown
                           options={data}
                           labels={{
                              notFoundSearch: "Data tidak ada",
                              notSelected: "Select Area Kontrakan",
                              search: "Search area",
                              seachInputPlaceholder: "Cari Area Kontrakan",
                           }}
                           clearable
                           searchable
                           onChange={(e) => setProvince(e.label)}
                           configs={{ position: { y: "bottom", x: "center" } }}
                        />
                     </div>

                     <Button className="my-4" type='primary' onClick={() => setProvince('')}>See all</Button>

                     
                  </div>
               </div>

               {/* container right */}
               <div className={`${css.container_right} w-100`}>
                  <div className="d-flex flex-row justify-content-start align-items-start flex-wrap w-100 gap-2 ">
                  {datakontrakan && datakontrakan.map((e,index) => (
                     <CardKontrakan
                     keys={index}
                     location_top={e.province}
                     price={costing(e.price)}
                     tipe={e.tipe_kontrakan}
                     image={e.image}
                     address={e.detail_address}    
                     handletodetail={() => navigate(`/kontrakan/detail/${e.id}`)}                 
                     />
                  ))}
                  </div>
                  <div className="d-flex justify-content-center align-items-center mx-auto">
                     <button className="fw-bold btn btn-dark mx-2 px-3 my-3" onClick={() => handlePrev()}>
                        Prev
                     </button>
                     <button className="fw-bold btn btn-dark mx-2 px-3 my-3" onClick={() => handleNext()}>
                        Next
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <Footer />
      </>
   );
}

export default Kontrakan;
