import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { BsFillPersonFill, BsFillFlagFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { AiTwotoneLock } from 'react-icons/ai';
import { FaRegAddressCard } from 'react-icons/fa';
import { MdNumbers } from 'react-icons/md';
import { BiSolidCity } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const register_checker = (data) => {
    fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        city: data.city,
        zipcode: data.zipcode,
        country: data.country
      })
    })
      .then(response => response.text())
      .then(text => {
        const data = JSON.parse(text);
        console.log(data);
        navigate("/login");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onSubmit = (data) => {
    setData(data);
    register_checker(data);
  }

  return (
    <div className='w-[100vw] p-5 flex flex-col items-center justify-center bg-gradient-to-r from-green-900 to-blue-900'>

      <form onSubmit={handleSubmit((data) => onSubmit(data))} className='flex flex-col shadow-lg gap-10 p-10 pb-7 rounded-2xl xs:max-w-[330px]' action="ionut" method="get">

        <div className='flex mds:flex-col gap-10 items-center justify-center'>
          <div className='flex-col flex gap-10'>
            {/* First name */}
            <div className='flex gap-5 items-center justify-center'>
              <label htmlFor="firstname">
                <BsFillPersonFill className='text-4xl' />
              </label>
              <input {...register("firstname")} className='input input-bordered input-primary' type="text" id="firstname" name="firstname" placeholder='First name' required />
            </div>

            {/* Last name */}
            <div className='flex gap-5 items-center justify-center'>
              <label htmlFor="lastName">
                <BsFillPersonFill className='text-4xl' />
              </label>
              <input {...register("lastname")} className='input input-bordered input-primary' type="text" id="lastname" name="lastname" placeholder='Last name' required />
            </div>

            {/* Email */}
            <div className='flex gap-5 items-center justify-center'>
              <label htmlFor="email">
                <GrMail className='text-4xl' />
              </label>
              <input {...register("email")} className='input input-bordered input-primary' type="email" id="email" name="email" placeholder='e-mail@example.com' required />
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
              <input {...register("address")} className='input input-bordered input-primary' type="text" id="address" name="address" placeholder='Address' required />
            </div>

            {/* City */}
            <div className='flex gap-5 items-center justify-center'>
              <label htmlFor="city">
                <BiSolidCity className='text-4xl' />
              </label>
              <input {...register("city")} className='input input-bordered input-primary' type="text" id="city" name="city" placeholder='City' required />
            </div>

            {/* Zip code */}
            <div className='flex gap-5 items-center justify-center'>
              <label htmlFor="zipcode">
                <MdNumbers className='text-4xl' />
              </label>
              <input {...register("zipcode")} className='input input-bordered input-primary' type="text" id="zipcode" name="zipcode" placeholder='Zip code' required />
            </div>

            {/* Country */}
            <div className='flex gap-5 items-center justify-center'>
              <label htmlFor="country">
                <BsFillFlagFill className='text-4xl' />
              </label>
              <input {...register("country")} className='input input-bordered input-primary' type="text" id="country" name="country" placeholder='Country' required />
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <button className='btn btn-primary w-[50%]' type="submit">Valider</button>
        </div>

      </form>

    </div>
  )
}

export default RegisterForm
