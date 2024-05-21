import React from 'react'
import { useSelector } from 'react-redux' 

export default function Profile() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' >
        <img src={currentUser.profilePicture} alt='profilePicture' className='mx-auto w-24 rounded-full object-cover self-center'></img>
        <input type='text' placeholder='User Name' id='username' className='bg-slate-100 p-3 rounded-lg' defaultValue={currentUser.username} />
        <input type='text' placeholder='Email Address' id='email' className='bg-slate-100 p-3 rounded-lg' defaultValue={currentUser.email} />
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-4 rounded-lg' />
        <button className='bg-slate-700 text-white p-3 rounded-full uppercase hover:opacity-90 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-3'>
          <span className='text-red-800 cursor-pointer'>Delete Account</span>
          <span className='text-red-800 cursor-pointer'>Sign-out</span>
      </div>
    </div>
  )
}
