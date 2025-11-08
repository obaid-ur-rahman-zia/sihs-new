import React from 'react'
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer'
import Department2hero from '../components/Department2hero'
import Department2 from '../components/Department2'
import Header from '../components/Header'
function Departmentn2() {
  return (
    <>
    <Helmet><title>Department of Allied Health Sciences - SIHS</title></Helmet>
    <Header/>
    <Department2hero/>
    <Department2/>
    <Footer/>
    </>
  )
}

export default Departmentn2