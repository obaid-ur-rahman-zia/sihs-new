import React from 'react'
import { Helmet } from 'react-helmet-async';
import Principal from '../components/Principal'
import Footer from '../components/Footer'
import AdditionalPrincipalmsg from '../components/AdditionalPrincipalmsg';
import Header from '../components/Header';
function PrincipalMessage() {
  return (
    <>
    <Helmet><title>Principal's Message - SIHS</title></Helmet>
    <Header/>
    <Principal/>
    <AdditionalPrincipalmsg/>
    <Footer/>
    </>
  )
}

export default PrincipalMessage;