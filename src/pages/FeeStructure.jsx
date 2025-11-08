import React from 'react'
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import Footer from '../components/Footer'
import FeeHero from '../components/FeeHero'
import FeeStructureTable from '../components/FeeStructureTable'

function FeeStructure() {
  return (
    <>
      <Helmet><title>Fee Structure - SIHS</title></Helmet>
      <Header/>
      <FeeHero/>
      <FeeStructureTable/>
      <Footer/>
    </>
  )
}

export default FeeStructure
