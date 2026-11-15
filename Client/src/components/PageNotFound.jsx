import React from 'react'

const PageNotFound = () => {
  return (
    <div className='h-[100vh] w-full flex flex-col gap-20 items-center justify-center text-6xl font-light text-neutral-500 p-5'>
      <p>404 | page not found</p>

      <a href="/">
        <button className='btn btn-primary btn-outline'>
          Retour à la page d'accueil
        </button>
      </a>
    </div>
  )
}

export default PageNotFound