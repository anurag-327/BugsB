import { GlobalContext } from "@/Context/ContextProvider"
import { X } from "phosphor-react"
import { useContext } from "react"
import { variables } from "@/appwrite/variables"
import { Toaster, toast } from "react-hot-toast"
import { databases } from "@/appwrite/config"
export default function ConfirmProjectDeletion({setConfirmDeletion,data})
{
    const{user,projects,setProjects}=useContext(GlobalContext)
    function deleteproject()
    {
        try {
            const promise = databases.deleteDocument(variables.APPWRITE_DATABASEID,variables.APPWRITE_COLLECTIONID, data.$id);
            promise.then(function (response) {
              setProjects(projects.filter(item => item.$id!=data.$id)) 
              toast.success("Deleted successfully")
              setConfirmDeletion(false);
            }, function (error) {
               toast.error("Failed to delete project")
               console.log(error); 
            });
        } catch (error) {
            toast.error("Failed to delete project")
            console.log(error); 
        }
        
    }
    return (<div  className=" absolute flex justify-center items-center bg-white z-10 bg-opacity-95 top-0 left-0 h-screen w-screen">
    <Toaster position="top-center" reverseOrder />
    <div  className="absolute right-20 top-20 cursor-pointer">
         <X onClick={() => setConfirmDeletion(false)}  size={30} color="#000000" weight="bold" />
    </div>
    <div className="flex flex-col min-w-[350px] w-[30%]  bg-white border-2 text-center rounded-md p-5">
        <h2 className="font-light">Delete <span className="font-bold">{user.name}/{data.name}</span></h2>
        <span className="mt-10">Note: This is a destructive action.</span>
        <span>Changes cannot be reversed</span>
        <span className="mt-2 text-red-600 font-semibold text-xl">Do you want to delete this project?</span>
        <button onClick={deleteproject} className="p-2 text-white bg-red-600 rounded-md mt-5">Delete {user.name}/{data.name}</button>
    </div>
</div>)
}