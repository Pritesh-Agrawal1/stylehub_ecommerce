import React from 'react';
import CustomNavbar from './CustomNavbar';
import Footer from './Footer';
import '../styles/Base.css';

const Base = ({ children }) => {
  return (
    <div className="container-fluid">
      <CustomNavbar />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Base;
