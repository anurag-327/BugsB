"use client"
import Image from 'next/image'
import { useContext, useEffect } from 'react';
import { account } from '@/appwrite/config';
import { useRouter } from "next/navigation";
import { GlobalContext } from '@/Context/ContextProvider';
import Navbar from '@/components/navbar';
import Project from '@/components/project';
import AddNewProject from '@/components/addNewProjectBtn';
import Loader from '@/components/loader';
import { PlusCircle } from 'phosphor-react';
import { useState } from 'react';
export default function Home() {
  const router=useRouter();
  const {user,projects,globalLoading}=useContext(GlobalContext)
  const [openBox,setOpenBox]=useState(false)
  const handleLogout=async() =>
  {
    try{
      const promise=await account.deleteSession("current");
      setUser();
    }catch(err)
    {
      console.log(err)
    }
  }
  return (
    <main className={`flex flex-col min-h-[90vh] items-center ${globalLoading?"justify-center":"justify-start"} gap-2 `}>
      {
        globalLoading?<><Loader /><span>Please wait while we set up the dashboard</span></>:(<> <h1 className='text-6xl mt-10 mb-10 font-extrabold'>Projects</h1>
          <div className='flex flex-col rounded-md  shadow-md p-3  gap-2 w-[35%] sm:w-full sm:max-w-[350px]'>
            <div className='w-full flex gap-2 sm:flex-col justify-center items-center'>
              <AddNewProject openBox={openBox} setOpenBox={setOpenBox} />
              <input className='border w-[50%] sm:w-full p-3 outline-none resize-none focus:border-2 focus:border-orange-400 rounded-md  border-gray-300' type="text" placeholder='search' />
            </div>
          <div className='flex flex-col w-full mt-5 p-2  min-w-[350px] max-w-[600px] gap-2 mb-3'>
          {
            projects.map((data) => <Project key={data.$id} data={data} />)
          }
         </div>
         {
          projects.length==0&&<button className='flex flex-col justify-center items-center'>
             <PlusCircle onClick={() =>setOpenBox(true)} size={50} color="#dddddd" />
             <span className='text-center  text-gray-600'>Configure new project</span></button>
         }
          </div>
        </>)
      }
        
         
    </main>
  )
}
