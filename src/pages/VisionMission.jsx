import React from 'react'
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer'
import Vision from '../components/Vision'
import OurVisionAndMission from '../components/OurVisionAndMission'
import Header from '../components/Header'
function VissionMission() {
  return (
    <>
    <Helmet><title>Vision & Mission - SIHS</title></Helmet>
    <Header/>
    <Vision/>
    <OurVisionAndMission/>
    <Footer/>
    </>
  )
}

export default VissionMission