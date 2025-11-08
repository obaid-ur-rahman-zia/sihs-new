import React from 'react'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet-async';
import ContactAndLocation from '../components/ContactAndLocation'
import Header from '../components/Header'

function ContactUs() {
  return (
    <>
    <Helmet><title>Contact Us - SIHS</title></Helmet>
    <Header/>
    <ContactAndLocation/>
    <Footer/>
    </>
  )
}

export default ContactUs