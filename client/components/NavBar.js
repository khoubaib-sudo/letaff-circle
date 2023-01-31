import React from 'react'

const NavBar = () => {
  return (
    <div className='mx-auto flex justify-center '>
        <div className="container flex flex-col lg:flex-row py-2 justify-between items-center">
            <img src="/assets/logo.png" alt="logo" />
            <div className="flex items-center gap-4">
                <p className='text-base font-medium cursor-pointer'>Sign In</p>
                <p className='text-base font-medium capitalize bg-purple-500 border border-none cursor-pointer btn btn-sm'>Create Free Account</p>
             
            </div>
        </div>
    </div>
  )
}

export default NavBar