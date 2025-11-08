import React from 'react'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet-async';
import NotificationsPage from "../components/NotificationPage"
import Header from '../components/Header'
function Notifications() {
  return (
    <>
        <Helmet><title>Notifications - SIHS</title></Helmet>
    <Header/>
  <NotificationsPage/>
   <Footer/>
   </>
  )
}

export default Notifications 