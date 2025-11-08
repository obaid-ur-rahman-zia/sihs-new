import React from 'react'
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import Footer from '../components/Footer'
import AddmitionCimg from '../components/AddmitionCimg'
import ActualAdmissionInfo from '../components/ActualAdmissionInfo'
function AdmissionCriteria() {
  return (
    <>
    <Helmet><title>Admission Criteria - SIHS</title></Helmet>
    <Header/>
    <AddmitionCimg/>
    <ActualAdmissionInfo/>
    <Footer/>
    </>
  )
}

export default AdmissionCriteria