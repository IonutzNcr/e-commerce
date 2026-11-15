import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

function ModalUpdateUser({ event, user }) {
  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      city: user.city,
      zipcode: user.zipcode,
      country: user.country,
    }
  });
  const navigate = useNavigate();

  const onSubmit = (data, article) => {
    let newData = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      address: data.address,
      city: data.city,
      zipcode: data.zipcode,
      country: data.country,
      sign_in: article.sign_in,
    }
    fetch(`http://127.0.0.1:8000/api/user/update/${user.id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newData)
    })
    .then(data => {
      console.log(data)
      return data.json()
    })
    .then(data => {
      console.log(data)
      event(false);
      navigate("/dashboard");
    })
  }

	return (
		<div className="modal-overlay h-screen overflow-y-scroll" onClick={() => event(false)}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col shadow-lg gap-10 rounded-2xl xs:max-w-[330px] bg-base-200 items-center justify-center'>
					<div onClick={() => event(null)} className='w-full flex items-center justify-end p-5'>
						<button className='btn btn-ghost'>
							<MdClose className='text-3xl' />
						</button>
					</div>
          <h2>Modifier un utilisateur</h2>
          <input type="text" placeholder="firstname"  {...register("firstname", { required: true })} />
          <input type="text" placeholder="lastname"  {...register("lastname", { required: true })} />
          <input type="text" placeholder="email"  {...register("email", { required: true })} />
          <input type="text" placeholder="address"  {...register("address", { required: true })} />
          <input type="text" placeholder="city"  {...register("city", { required: true })} />
          <input type="text" placeholder="zipcode"  {...register("zipcode", { required: true })} />
          <input type="text" placeholder="country"  {...register("country", { required: true })} />
          <input className='btn btn-outline btn-success w-fit' type="submit" />
				</form>
			</div>
		</div>
	)
}

export default ModalUpdateUser