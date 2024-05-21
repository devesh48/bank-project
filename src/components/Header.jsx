import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-slate-400'>
        <div className='flex justify-between items-center max-w-8xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold'>Auth App</h1>
            </Link>
            <ul className='flex gap-6'>
                <Link to={'/home'}><li>Home</li></Link>
                <Link to={'/about'}><li>About</li></Link>
                <Link to={'/sign-in'}><li>Sign In</li></Link>
            </ul>
        </div>
    </div>
  )
}
