import React, { useState, useEffect } from 'react';
import Navbar from './Navbars/Navbar';
import Footer from './Footer';
import NavbarCategories from './Navbars/NavbarCategories';
// import Loader from './Loader';

const MainLayout = ({ children, cart }) => {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 300);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className={`bg-base-200 w-full flex-col flex items-center overflow-x-hidden h-screen`}>
      <div className="divider"></div>
      {children}
      <div className="divider"></div>
    </div>
  );
};

export default MainLayout;
