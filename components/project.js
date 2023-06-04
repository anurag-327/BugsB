import { Folder,Trash } from "phosphor-react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import {X} from "phosphor-react";
import ConfirmProjectDeletion from "./confirmProjectDeletion";
import { set } from "react-hook-form";
export default function Project({data})
{
    const router=useRouter();
    // const bgcolors=["bg-orange-200","bg-blue-200","bg-green-200","bg-red-200","bg-violet-400","bg-gray-300"]
    const bgcolors = ["bg-red-200", "bg-blue-100", "bg-yellow-100", "bg-slate-200", "bg-orange-200", "bg-green-100", "bg-cyan-100", "bg-indigo-100", "bg-pink-200", "bg-rose-200"];
    var random = Math.floor(Math.random() * bgcolors.length);
    const [confirmDeletion,setConfirmDeletion]=useState(false)
    function openProject()
    {
        router.push(`/project/${data.name}`)
    }
    
    return(
        <>
        {
            confirmDeletion?(<ConfirmProjectDeletion setConfirmDeletion={setConfirmDeletion} data={data} />):(<div   className={`border  full  flex gap-3 w-full  p-2 items-center relative border-gray-300 shadow-sm cursor-pointer`}>
            <div onClick={openProject} className=" w-[85%] flex cursor-pointer justify-start items-center gap-2">
               <Folder size={30} color="#000000" weight="fill" />
               <span className="">{data.name}</span>
               {/* <div className="border-2 border-gray-600 rounded-sm  w-6 h-6 text-center">2</div> */}
            </div>
            <div onClick={() => setConfirmDeletion(true)} className="absolute right-3">
              <Trash size={25} color="#17141a" weight="fill" />
            </div>
        </div>)
        }
        </>
    )
}