import React, { useEffect } from 'react'

// import component
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import Sidebarowner from '../../component/Sidebar_owner';

import css from "../../styles/page/owner/Historyowner.module.css"
import CardDetailKontrakanAdmin from '../../component/CardDetailKontrakanAdmin';
import { useState } from 'react';
import { getHistoryowner } from '../../utils/axios';
import Empty from '../../component/Empty';

function HistoryOwner() {

  const [datakontrakan, setDatakontrakan] = useState([])
  const [status, setStatus] = useState('pending')
  const [pemasukan, setPemasukan] = useState(0)

  const data = [
    { label: "Pending", value: "pending" },
    { label: "Paid", value: "paid" },    
    { label: "Process", value: "process" },    
    { label: "Done", value: "done" },    
    { label: "Cancel", value: "cancel" },    
 ];

  useEffect(() => {
    const getToken = localStorage.getItem('token');
    getHistoryowner(getToken, status)
    .then((res) => {
      console.log(res.data)
      setDatakontrakan(res.data.data.data)
      setPemasukan(res.data.data.totalIncome)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [status])

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
            <Sidebarowner page='historyowner' />
            {/* container right */}
            <div className={`container-fluid ${css.container_right}`}>
            <div className="">
                <p className={css.data_title}>Data History</p>
                <p>{`Total : ${costing(pemasukan)}`}</p>
                <div className="py-3">
                <select className="form-select" data-size='5' aria-label="Default select example" onClick={(e) => {setStatus(e.target.value); console.log(e.target.value)} }>
                  {/* <option selected >Open this select menu</option> */}
                  {data.map((index) => (
                    <option value={index.value}>{index.label}</option>
                  ))}
                </select>
                </div>
              </div>
                <div className={`d-flex flex-row justify-content-start pt-4 pb-4 ${css.scroll}`}>
                  <div className="d-flex flex-row justify-content-start flex-wrap">
                    {datakontrakan.length > 0 ? datakontrakan.map((e, index) => (
                      <CardDetailKontrakanAdmin
                        key={index}
                        image={e.image}
                        price={costing(e.total_price)}
                        desc={e.customers}
                        ktp={e?.no_ktp_customer || ''}
                        tipe={e.tipe_kontrakan}
                        location={e.payment_method}
                      />
                    )) : <Empty name='Data' />}
                  </div>
                </div>
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}

export default HistoryOwner