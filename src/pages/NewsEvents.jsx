import React from 'react'
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer'
import NewsandEvents from '../components/NewsandEvents'
import Header from '../components/Header'

function NewsEvents() {
  return (
  <>
  <Helmet><title>News & Events - SIHS</title></Helmet>
  <Header/>
  <NewsandEvents/>
  <Footer/>
  </>
  )
}

export default NewsEvents