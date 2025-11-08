import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DepartmentsHero from '../components/DepartmentsHero';
import DepartmentsList from '../components/DepartmentsList';

function Departments() {
  return (
    <>
      <Helmet>
        <title>Departments - SIHS</title>
      </Helmet>
      <Header />
      <DepartmentsHero />
      <DepartmentsList />
      <Footer />
    </>
  );
}

export default Departments;
