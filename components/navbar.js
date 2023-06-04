"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { account } from '@/appwrite/config';
import { GlobalContext } from '@/Context/ContextProvider';
import { useRouter } from 'next/navigation';
import { Bug } from 'phosphor-react';
import Image from 'next/image';
import {X,List} from "phosphor-react"
export default function Navbar() {
  const {user,setUser,setProjects}=useContext(GlobalContext)
  const router=useRouter();
  const [navbar, setNavbar] = useState(false);
  async function handleSignOut()
  { 
    try
    {
      const promise = await account.deleteSessions();
      setUser();
      setProjects([])
      router.push("/")
    }catch(err)
    {
      console.log(err)
    }
  }
  return (
    <div>
      <nav className="w-full bg-gray-100 shadow p-2">
        <div className="justify-between px-4 mx-auto  md:items-center sm:flex-col flex ">
          <div className='relative'>
            <div className='flex gap-3 sm:absolute sm:right-2 sm:top-2 justify-center items-center'>
            <Bug size={35} color="#17141a" weight="bold" />
            <span className='text-2xl font-extrabold '>BugsB</span>
            </div>
            <div className="items-center justify-between py-3 md:py-5 hidden sm:flex">
            
              <div className=" ">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <X size={20} color="#17141a" />
                  ) : (
                    <List size={20} color="#17141a" />
                    
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex  justify-end sm:justify-center items-end md:block xl:block lg:block 2xl:block ${navbar?"block":"hidden"}`}
            >
              <ul className="items-center sm:w-full flex sm:flex-col  text-center  justify-center  gap-5 sm:gap-2 ">
                <li className="bg-blue-500 sm:w-full text-white px-2 py-1 rounded-md">
                  <Link href="/">
                    Home
                  </Link>
                </li>
                {
                  user?<li className="bg-red-500 sm:w-full text-white cursor-pointer px-2 py-1 rounded-md" onClick={handleSignOut} >
                  SignOut
                  </li>: <li className="bg-orange-300 sm:w-full cursor-pointer px-2 py-1 rounded-md">
                  <Link href="/login">
                    SignUp
                  </Link>
                </li>
                }
                
              </ul>
            </div>
          </div>
        </div>
      </nav>
      
    </div>
  );
}