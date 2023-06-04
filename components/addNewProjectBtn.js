import { FolderNotchPlus,PlusCircle,Trash } from "phosphor-react"
import { ID,Permission,Role } from "appwrite";
import { databases } from "@/appwrite/config"
import { useContext, useState } from "react";
import { GlobalContext } from "@/Context/ContextProvider";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import {X} from "phosphor-react"
import {useForm} from "react-hook-form"
import Image from "next/image";
export default function AddNewProject({openBox,setOpenBox})
{
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
    const {user,projects,setProjects}=useContext(GlobalContext)
    
    const [loading,setLoading]=useState(false)
    const router=useRouter();
    function addClick()
    {  
        if(user)
        {
            setOpenBox(true)
        }
        else
        {
            toast.error("Sign In to Add New Project!")
            router.push("/login")
        }
       
    }
    function addNewProject(d)
    {
      
        try{
            setLoading(true);
            const data={...d,userId:user.id}
            const documentID=ID.unique();
            const promise = databases.createDocument('647ba7db6742bb709f01', '647ba83f86caaec9012f',documentID, data);
            promise.then(function (response) {
                 
                 setProjects([...projects,response])
                 toast.success("Project added successfully")
                 setOpenBox(false)
                 setLoading(false)
                 reset()
            }, function (error) {
                toast.error("Failed to add project")
                setLoading(false)
                console.log(error); 
            });
        }catch(err)
        {
            toast.error("Failed to add project")
            console.log(err);
        }
        
    }
    return(
        <>
        <button onClick={addClick} className="border-2 bg-gray-200   w-[50%] sm:w-full max-w-[600px] rounded-lg flex gap-3 p-2 items-center  border-gray-400 shadow-md">
            <Toaster position="top-center" reverseOrder />
            <FolderNotchPlus size={30} color="#333" weight="fill" />
            <span className="">Configure new Project</span>
            {/* <span className=" relative left-0">
              <PlusCircle size={25} color="#17141a" weight="bold" />
            </span> */}   
        </button>
        {
            openBox&&<div className="absolute flex flex-col justify-center items-center  left-0 bg-opacity-90 z-50 top-0 w-screen h-screen bg-[#333]">
                <div  className="absolute right-10 top-10 cursor-pointer">
                     <X onClick={() => setOpenBox(false)}  size={30} color="#ffffff" weight="bold" />
                </div>
                <div className="w-[30%] min-w-[350px] max-w-[450px] sm:w-full  flex flex-col gap-5 bg-white p-5 border-2  rounded-md border-gray-400">
                  <h2 className="text-center text-3xl font-semibold">Add Project</h2>
                <form className="flex flex-col gap-3"  onSubmit={handleSubmit(addNewProject)}>
                      <div className="flex flex-col">
                        <label htmlFor="name" >Title: <span className="text-red-800 text-xl">*</span></label>
                        <input className="p-2 border-2 border-gray-500 rounded-md" type="text" {...register("name",{required:true})} placeholder="Title" />
                        {errors.name && <span className="text-red-800 font-semibold">This field is required</span>}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="description" >Description:</label>
                        <input className="p-2 border-2 border-gray-500 rounded-md" type="text" {...register("description")} placeholder="description" />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="githubURL" >Github-URl:</label>
                        <input className="p-2 border-2 border-gray-500 rounded-md" type="text" {...register("githubURL",{pattern:/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi})} placeholder="Github URL" />
                        {errors.githubURL && <span className="text-red-800 font-semibold">Invalid Syntax</span>}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="deploymentURL" >Deployment-URl:</label>
                        <input className="p-2 border-2 border-gray-500 rounded-md" type="text" {...register("deploymentURL",{pattern:/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi})} placeholder="Deployment Link" />
                        {errors.deploymentURL && <span className="text-red-800 font-semibold">Invalid Syntax</span>}
                      </div>
                      <input className={`${loading?"bg-[#dddddd]":"bg-blue-700"} p-2 text-white cursor-pointer rounded-md`} type="submit" value="submit" />
                      <div className="mt-1 flex justify-center gap-3 items-center">
                         <hr className="bg-yellow-400 rounded-md h-[2px] w-[30%]"></hr>
                         <h2 className="font-bold text-xl ">OR</h2>
                         <hr className="bg-yellow-400 rounded-md h-[2px] w-[30%]"></hr>
                      </div>
                     
                </form>
                <button  className={` bg-black  rounded-md  p-2 items-center flex gap-3 text-white justify-center`}>
                        <Image src="/github.png" alt="Github Logo" width={30} height={30}/>
                         <span className="">Configure New Project</span>
                     </button>
                </div>
               
            </div>
          }
          </>
    )
}