import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth.jsx';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(false);
      const res = await fetch('http://localhost:3002/api/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log(data);
      if (!data.success){
        setError(true);
      };
      setIsLoading(false);
      navigate('/sign-in');
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='Email Address' id='email' className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} />
        <input type='text' placeholder='UserName' id='username' className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} />
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-4 rounded-lg'
          onChange={handleChange} />
        <button disabled={isLoading} className='bg-slate-700 text-white p-3 rounded-full uppercase hover:opacity-90 disabled:opacity-80'>{!isLoading ? 'Sign Up' : 'Loading...'}</button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-4 flex-col'>
        <div className='flex gap-2'>
          <p>Have an Account?</p>
          <Link to='/sign-in'>
            <span className='text-blue-500'>Sign In</span>
          </Link>
        </div>
        <p className='text-red-700'>{error && "Something went wrong!!. Please try again Later."}</p>
      </div>
    </div>
  )
}
