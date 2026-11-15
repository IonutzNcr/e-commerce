import React, { useContext } from 'react';
import { RiSettings4Fill } from 'react-icons/ri';
import { BsFillPersonFill, BsFillCartFill } from 'react-icons/bs';
import { RxUpdate } from 'react-icons/rx';
import { AiFillHome } from 'react-icons/ai';
import logo from '../../assets/logo.png';
import SearchBar from '../SearchBar';
import CartResponsive from '../cart/CartResponsive';
import NavbarCategories from './NavbarCategories';
import Logout from '../Logout/Logout';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {

  const { isLoggedIn } = useContext(AuthContext)
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className='w-full flex-wrap gap-5'>
      <div className='flex items-center justify-between sm:justify-center bg-base-100 w-full p-5 flex-wrap gap-5 xs:flex-col ss:flex-col'>

        {/* LOGO */}
        <a href="/" className='md:hidden'>
          <img src={logo} alt="logo" width="120px" className='rounded-xl hover:scale-95 transition-all duration-200' />
        </a>
        {/* SEARCH BAR */}

        <SearchBar />

        {/* LOGIN BUTTON */}
        {
          !isLoggedIn
            ?
            <div className='flex flex-col justify-center items-center md:flex-row gap-2'>

              <a href="/login">
                <button className='btn text-sm text-sky-400 hover:bg-primary hover:text-black xs-min:text-sm flex gap-2'>
                  CONNEXION
                </button>
              </a>

              {/* REGISTER LINK */}
              <a href='/register' className=' italic btn btn-outline btn-primary '>
                INSCRIPTION
              </a>

              {/* Bouton panier */}
              <div className="ss+-min:hidden" >
                <CartResponsive />
              </div>

            </div>

            :
            user.admin == 1 && isLoggedIn
              ?
              <div className='flex flex-col justify-center items-center gap-2 sm:flex-row xs:gap-4'>

                {/* Bouton home */}
                <a href='/'>
                  <button className='btn text-sky-400 hover:bg-primary hover:text-black flex gap-2'>
                    <AiFillHome className='text-2xl min-w-[36px] xs:min-w-fit' />
                    <p className='xs:hidden'>Home</p>
                  </button>
                </a>

                {/* Bouton panier */}
                <div className="ss-min:hidden" >
                  <CartResponsive />
                </div>

                <details className="dropdown dropdown-bottom dropdown-end font-bold">
                  <summary className="btn text-sky-400 hover:text-white hover:bg-sky-700 ss:w-[250px] sm:w-[250px] mds-min:w-[120px] xl:w-[120px] flex gap-2 justify-center">
                    <div className='ss:w-[250px] sm:w-[250px] mds-min:w-[220px] xl:w-[220px] flex gap-2 justify-center items-center'>
                      <RiSettings4Fill className='text-xl' />
                      <p>
                        OPTIONS
                      </p>
                    </div>
                  </summary>


                  <ul className="p-3 shadow menu dropdown-content z-[1] bg-base-100 w-fit rounded-b-3xl flex-col flex gap-2">

                    <li>
                      <a href="/dashboard" className='w-full rounded-3xl hover:text-primary'>
                        <RxUpdate className='text-xl' />
                        DASHBOARD
                      </a>
                    </li>

                    <li>
                      <a href="/orders" className='w-full rounded-3xl hover:text-primary'>
                        <BsFillCartFill className='text-xl' />
                        COMMANDES
                      </a>
                    </li>

                    <li>
                      <a href="/profile" className='w-full rounded-3xl hover:text-primary'>
                        <BsFillPersonFill className='text-xl' />
                        PROFILE
                      </a>
                    </li>

                    <li>
                      <Logout />
                    </li>
                  </ul>
                </details>

              </div>

              :
              user.admin == 0 && isLoggedIn &&
              <div className='flex flex-col justify-center items-center gap-2 sm:flex-row xs:gap-4'>

                {/* Bouton home */}
                <a href='/'>
                  <button className='btn text-sky-400 hover:bg-primary hover:text-black flex gap-2'>
                    <AiFillHome className='text-2xl min-w-[36px] xs:min-w-fit' />
                    <p className='xs:hidden'>Home</p>
                  </button>
                </a>

                {/* Bouton panier */}
                <div className="ss-min:hidden" >
                  <CartResponsive />
                </div>

                <details className="dropdown dropdown-bottom dropdown-end font-bold">
                  <summary className="btn text-sky-400 hover:text-white hover:bg-sky-700 ss:w-[250px] sm:w-[250px] mds-min:w-[120px] xl:w-[120px] flex gap-2 justify-center">
                    <div className='ss:w-[250px] sm:w-[250px] mds-min:w-[220px] xl:w-[220px] flex gap-2 justify-center items-center'>
                      <RiSettings4Fill className='text-xl' />
                      <p>
                        OPTIONS
                      </p>
                    </div>
                  </summary>

                  <ul className="p-3 shadow menu dropdown-content z-[1] bg-base-100 w-fit rounded-b-3xl flex-col flex gap-2">
                    <li>
                      <a href="/orders" className='w-full rounded-3xl hover:text-primary'>
                        <BsFillCartFill className='text-xl' />
                        COMMANDES
                      </a>
                    </li>

                    <li>
                      <a href="/profile" className='w-full rounded-3xl hover:text-primary'>
                        <BsFillPersonFill className='text-xl' />
                        PROFILE
                      </a>
                    </li>

                    <li>
                      <Logout />
                    </li>
                  </ul>
                </details>
              </div>
        }
      </div>
      <div className="divider"></div>
      <NavbarCategories />
      <div className="divider"></div>
    </div >
  )
}

export default Navbar