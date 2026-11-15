import React from 'react';
import ShowCategories from './categories/ShowCategories'
import ShowTrends from './Trends/ShowTrends';
import Navbar from './Navbars/Navbar';
import Footer from './Footer';
import NavbarCategories from './Navbars/NavbarCategories';

const Home = () => {
    return (
        
        <div className='w-full'>

            <ShowTrends />

            <div className="divider"></div>

            <ShowCategories />

        </div>
    )
}

export default Home
