import React, { useState, useEffect } from 'react'
import { RxUpdate } from 'react-icons/rx'
import { AiTwotoneDelete } from 'react-icons/ai'
import { IoIosAddCircle } from 'react-icons/io'
import { RiAdminFill } from 'react-icons/ri'
import ModalUpdateUser from './ModalUpdateUser'

function UsersTab({active, activeModal, setActive, setId, id}) {
  const [users, setUsers] = useState([])

  const isAdmin = ({admin}) => {
    if(admin === 1) {
      return <p>Compte Admin</p>
    } else {
      return <p>Compte Utilisateur</p>
    }
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/users`)
      .then((response) => response.json())
      .then((data) => (
          console.log(data),
          setUsers(data)
        ))
  }, [active]);
  return (
    <div className='p-5'>
      <div className='flex flex-wrap justify-center items-center'>
        {users.map((user, index) => (
          <div key={index} className='w-[300px] border border-base-200 bg-register m-5 text-center rounded-3xl hover:bg-slate-900 hover:scale-105 flex flex-col p-5 items-center gap-5 justify-center transition-all duration-200'>
            <div>
              <button className='btn btn-primary btn-outline' onClick={() => {
                setId(index);
                activeModal("update")
              }}>
              <RxUpdate className='text-2xl' />
                <p>
                  UPDATE
                </p>
              </button>
            </div>
            <div>
              <button className='btn btn-success btn-outline' onClick={() => {
                setId(index);
                activeModal("admin")
              }}>
              <RiAdminFill className='text-2xl' />
                <p>
                  Admin
                </p>
              </button>
            </div>
            <div>
              <button className='btn btn-error btn-outline' onClick={() => {
                setId(index);
                activeModal("delete")
              }}>
              <AiTwotoneDelete className='text-2xl' />
                <p>
                  DELETE
                </p>
              </button>
            </div>
            {isAdmin({ admin: user.admin })}
            <p>Firstname: <span className='text-2xl text-green-500'>{user.firstname}</span></p>
            <p>Lastname: <span className='text-2xl text-green-500'>{user.lastname}</span></p>
            <p>Email: <span className='text-2xl text-green-500'>{user.email}</span></p>
            <p>Country: <span className='text-2xl text-green-500'>{user.country}</span></p>
            <p>Create at <span className='text-2xl text-green-500'>{user.sign_in}</span></p>
          </div>
        ))}
      </div>
      {active === "update" && <ModalUpdateUser event={setActive} user={users[id]} />}
    </div>
  )
}

export default UsersTab
