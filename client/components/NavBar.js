import { useContext } from 'react';
import React from 'react'
import Link from 'next/link'
import {Context} from '../context';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import axios from 'axios'
import { BiLogOut } from 'react-icons/bi';


const NavBar = () => {
  const { state, dispatch } = useContext(Context);

  const router = useRouter();
   
  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <div className='mx-auto flex justify-center '>
        <div className="container flex flex-col lg:flex-row py-2 justify-between items-center">
            <a href={'/'}>
              <img src="/assets/logo.png" alt="logo" />
            </a>
            <div className="flex items-center gap-4">
                <p className='text-base font-medium cursor-pointer'><Link href={'/login'}>Sign In</Link></p>
                <p className='text-base font-medium capitalize bg-purple-500 border border-none cursor-pointer btn btn-sm'>
                  <Link  href={'/register'}>Create Free Account</Link>
                </p>
                <p 
                onClick={logout}
                className='text-base font-medium cursor-pointer' 
                >
                  Sign out
                </p>
            </div>
        </div>
    </div>
  )
}

export default NavBar;