import React from 'react';
import { GrMail } from 'react-icons/gr';
import { BsFillPersonFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiTwotoneLock } from 'react-icons/ai';
import { FaRegAddressCard } from 'react-icons/fa';
import { BiSolidCity } from 'react-icons/bi';
import { MdNumbers } from 'react-icons/md';
import { BsFillFlagFill } from 'react-icons/bs';

const ProfileBlock = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const onSubmit = (data) => {
    setData(data);
  }

  if (!user) {
    window.location.href = '/*';
    return;
  }

  return (
    <div className='w-[100vw] p-5 flex flex-col items-center justify-center gap-5 bg-gradient-to-r from-green-900 to-blue-900'>
      
      <h1 className='flex items-center justify-center'>
        <span className='text-4xl font-bold text-white text-center'>
          Modifier mon profil
        </span>
      </h1>
      {user ?

        <form onSubmit={handleSubmit((data) => onSubmit(data))} className='flex flex-col shadow-lg gap-10 p-10 pb-7 rounded-2xl xs:max-w-[330px]'>
          <div className='flex mds:flex-col gap-10 items-center justify-center'>
            <div className='flex-col flex gap-10'>
              {/* First name */}
              <div className='flex gap-5 items-center justify-center'>
                <label htmlFor="firstname">
                  <BsFillPersonFill className='text-4xl' />
                </label>
                <input {...register("firstname")} defaultValue={user.firstname} className='input input-bordered input-primary' type="text" id="firstname" name="firstname" required />
              </div>

              {/* Last name */}
              <div className='flex gap-5 items-center justify-center'>
                <label htmlFor="lastname">
                  <BsFillPersonFill className='text-4xl' />
                </label>
                <input {...register("lastname")} defaultValue={user.lastname} className='input input-bordered input-primary' type="text" id="lastname" name="lastname" required />
              </div>

              {/* Email */}
              <div className='flex gap-5 items-center justify-center'>
                <label htmlFor="email">
                  <GrMail className='text-4xl' />
                </label>
                <input {...register("email")} defaultValue={user.email} className='input input-bordered input-primary' type="email" id="email" name="email" required />
              </div>

              {/* Password */}
              <div className='flex gap-5 items-center justify-center'>
                <label htmlFor="password">
                  <AiTwotoneLock className='text-4xl' />
                </label>
                <input {...register("password")} className='input input-bordered input-primary' type="password" id="password" name="password" placeholder='********' required />
              </div>
            </div>

            <div className='flex-col flex gap-10'>
              {/* Address */}
              <div className='flex gap-5 items-center justify-center'>
                <label htmlFor="address">
                  <FaRegAddressCard className='text-4xl' />
                </label>
                <input {...register("address")} defaultValue={user.address} className='input input-bordered input-primary' type="text" id="address" name="address" required />
              </div>

              {/* City */}
              <div className='flex gap-5 items-center justify-center'>
                <label htmlFor="city">
                  <BiSolidCity className='text-4xl' />
                </label>
                <input {...register("city")} defaultValue={user.city} className='input input-bordered input-primary' type="text" id="city" name="city" required />
              </div>

              {/* Zip code */}
              <div className='flex gap-5 items-center justify-center'>
                <label htmlFor="zipcode">
                  <MdNumbers className='text-4xl' />
                </label>
                <input {...register("zipcode")} defaultValue={user.zipcode} className='input input-bordered input-primary' type="text" id="zipcode" name="zipcode" required />
              </div>

              {/* Country */}
              <div className='flex gap-5 items-center justify-center'>
                <label htmlFor="country">
                  <BsFillFlagFill className='text-4xl' />
                </label>
                <input {...register("country")} defaultValue={user.country} className='input input-bordered input-primary' type="text" id="country" name="country" required />
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <button className='btn btn-primary w-[50%]' type="submit">MODIFIER</button>
          </div>
        </form>
        :
        <p>No user data</p>
      }
    </div>
  )

}

export default ProfileBlock
