import React from 'react';
import { BsFillMotherboardFill, BsMouse3Fill } from 'react-icons/bs';
import { PiComputerTowerFill } from 'react-icons/pi';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiComputerFill } from 'react-icons/ri';
import { ImPriceTag } from 'react-icons/im';

const NavbarCategories = () => {
  return (
    <div className='flex w-full items-center justify-center mds:justify-between mds:flex-col bg-base-200'>
      <div className='flex items-center justify-center py-5 gap-10 flex-wrap xs:hidden ss:hidden mds:hidden md:p-1'>

        {/* ORDINATEURS */}
        <div className="dropdown dropdown-hover tooltip tooltip-info font-bold" data-tip='Ordinateurs'>
            <label className="m-1 btn">
              <PiComputerTowerFill className='text-3xl' />
            </label>
          <ul className="bg-base-300 p-2 shadow menu dropdown-content z-[1] rounded-box w-52">
            <li><a>Tous les PC</a></li>
            <li><a>PC portables</a></li>
            <li><a>PC Fixes</a></li>
            <li><a>PC Gamers</a></li>
          </ul>
        </div>

        {/* ÉCRANS */}
        <div className="dropdown dropdown-hover tooltip tooltip-info font-bold" data-tip='Écrans'>
            <label className="m-1 btn">
              <RiComputerFill className='text-3xl' />
            </label>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-300 rounded-box w-52">
            <li><a>Tous les écrans</a></li>
            <li><a>Écrans incurvés</a></li>
          </ul>
        </div>

        {/* COMPOSANTS */}
        <div className="dropdown dropdown-hover tooltip tooltip-info font-bold" data-tip='Composants'>
            <label className="m-1 btn">
              <BsFillMotherboardFill className='text-3xl' />
            </label>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-300 rounded-box w-52">
            <li><a>Tous les composants</a></li>
            <li><a>Processeurs</a></li>
            <li><a>Cartes graphiques</a></li>
            <li><a>Cartes mères</a></li>
            <li><a>RAM</a></li>
            <li><a>Disques durs</a></li>
            <li><a>SSD</a></li>
            <li><a>Alimentations</a></li>
            <li><a>Refroidissements</a></li>

          </ul>
        </div>

        {/* PÉRIPHÉRIQUES */}
        <div className="dropdown dropdown-hover tooltip tooltip-info font-bold" data-tip='Périphériques'>
            <label className="m-1 btn">
              <BsMouse3Fill className='text-3xl' />
            </label>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-300 rounded-box w-52">
            <li><a>Tous les périphériques</a></li>
            <li><a>Claviers</a></li>
            <li><a>Souris</a></li>
            <li><a>Casques</a></li>
            <li><a>Microphones</a></li>
            <li><a>Webcams</a></li>
            <li><a>Enceintes</a></li>
          </ul>
        </div>

      </div>

      {/* TOUTES LES CATÉGORIES */}
      <div className='flex items-center justify-center xl:p-5 gap-5 md:p-2'>
        <a href='/categorie' className='flex items-center justify-center btn btn-outline  tooltip tooltip-info'>
          Catégories <BiCategoryAlt className='text-3xl' />
        </a>

        {/* TOUS LES ARTICLES */}
        <a className='btn btn-outline ' href="/listArticles">
          Articles
          <ImPriceTag className='text-xl' />
        </a>
      </div>



    </div>
  )
}

export default NavbarCategories