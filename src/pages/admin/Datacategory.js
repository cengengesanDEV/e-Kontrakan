import React, { useEffect, useState } from 'react'

import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Sidebarowner from '../../component/Sidebar_owner'
import CardDetailKontrakanAdmin from '../../component/CardDetailKontrakanAdmin'
import css from "../../styles/page/admin/Datacategory.module.css"
import { getkontrakanuserID } from "../../utils/axios"
import { useNavigate, useParams } from 'react-router-dom'




function Datacategory() {

  const {id_user} = useParams()
  const navigate = useNavigate()
  const [datakontrakan, setDatakontrakan] = useState([])

  useEffect(() => {
    getkontrakanuserID(id_user)
    .then((res) => {
      console.log(res.data)
      setDatakontrakan(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  
  }, [])

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
    <Navbar />
        <div className="container-fluid">
          <div className={css.container_left_right}>
            {/* container left */}
            <Sidebarowner page='profileadmin' />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>
              <p className={css.title_kontrakan}>Data Kontrakan User</p>
              <div className={`d-flex flex-row justify-content-center pt-4 pb-4 ${css.scroll}`}>
                <div className="d-flex flex-row justify-content-start flex-wrap">
                  {datakontrakan.length > 0 ? datakontrakan.map((e, index) => (
                    <CardDetailKontrakanAdmin
                      key={index}
                      image={e.image}
                      price={costing(e.price)}
                      desc={e.deskripsi}
                      tipe={e.tipe_kontrakan}
                      location={e.province}
                      handleDetail={() => navigate(`/datadetailkontrakan/${e.id}`)}
                    />
                  )) : "data kosong"}
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}

export default Datacategory