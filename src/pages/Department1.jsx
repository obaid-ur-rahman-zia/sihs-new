import React from 'react'
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer'
import Department1hero from '../components/Department1hero'
import Department1 from '../components/Department1'
import Header from '../components/Header'
function Departmentn1() {
  return (
    <>
    <Helmet><title>Department of Physical Therapy - SIHS</title></Helmet>
    <Header/>
    <Department1hero/>
    <Department1/>
    <Footer/>
    </>
  )
}

export default Departmentn1