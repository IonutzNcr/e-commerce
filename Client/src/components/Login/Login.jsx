import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonVcardFill } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';

const LoginForm = () => {

  const { login, token } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState("");
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  if (localStorage.getItem('user')) {
    window.location.href = '/';
    return;
  }

  const loginChecker = (data) => {
    fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          setLoginError('Email ou mot de passe invalide !');
          throw new Error('Email ou mot de passe invalide !');
        }
      })
      .then(data => {
        login(data.token, data.user);
        navigate("/");
      })

      .catch(error => {
        console.error(error);
      });
  };

  const onSubmit = (data) => {
    setData(data);
    loginChecker(data);
  }

  return (
    <div className="bg-base-200 w-full flex-col flex items-center flex-grow">

      <div className='h-full w-[100vw] p-5 flex flex-col items-center justify-center bg-gradient-to-r from-green-900 to-blue-900'>
        <form onSubmit={handleSubmit((data) => onSubmit(data))} className='flex-col flex shadow-lg gap-10 p-5 pb-7 rounded-2xl items-center justify-center'>

          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='flex items-center justify-center gap-2'>
              <label className='text-2xl' htmlFor="email">
                <BsFillPersonVcardFill className='text-4xl' />
              </label>
              <input {...register("email", { required: "Veuillez renseigner votre email" })} className='input input-bordered input-primary min-w-[250px] w-full max-w-xs' type="email" id="email" name="email" placeholder='test@example.com' autoComplete='email'/>
            </div>
            {errors.email && <p className='text-red-500 w-full mt-2 text-center'>{errors.email.message}</p>}
          </div>

          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='flex items-center justify-center gap-2'>
              <label className='text-2xl' htmlFor="password">
                <FaLock className='text-4xl' />
              </label>
              <input {...register("password", { required: "Veuillez renseigner votre mot de passe" })} className='input input-bordered input-primary min-w-[250px] w-full max-w-xs' type="password" id="password" name="password" placeholder='********' autoComplete="current-password"/>
            </div>
            {errors.password && <p className='text-red-500 w-full mt-2 text-center'>{errors.password.message}</p>}
          </div>

          {loginError && <p className='text-red-500 w-full'>{loginError}</p>}

          <button className='btn btn-primary w-full max-w-xs' type="submit">Connexion</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm