import React from 'react'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet-async';
import DownloadPage from '../components/DownloadPage'
import Header from '../components/Header'
function Downloads() {
  return (
   <>
       <Helmet><title>Downloads - SIHS</title></Helmet>
   
   <Header/>
   <DownloadPage/>
   <Footer/>
   </>
  )
}

export default Downloads