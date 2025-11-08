import React from 'react'
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer'
import Department4hero from '../components/Department4hero'
import Department4 from '../components/Department4'
import Header from '../components/Header'

function Departmentn4() {
  return (
    <>
    <Helmet><title>Department of Applied Sciences - SIHS</title></Helmet>
    <Header/>
    <Department4hero/>
    <Department4/>
    <Footer/>
    </>
  );
}

export default Departmentn4;
