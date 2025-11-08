import React from 'react'
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer'
import Department3hero from '../components/Department3hero'
import Department3 from '../components/Department3'
import Header from '../components/Header'

function Departmentn3() {
  return (
   <>
    <Helmet><title>Department of Food and Nutrition Sciences - SIHS</title></Helmet>
    <Header/>
    <Department3hero/>
    <Department3/>
    <Footer/>
    </>
  );
}

export default Departmentn3;
