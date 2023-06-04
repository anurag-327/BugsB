"use client"
import { createContext, useEffect, useState } from "react";
export const GlobalContext=createContext();
import { account,databases } from "@/appwrite/config";
import { Query } from "appwrite";
import { set } from "react-hook-form";
import { variables } from "@/appwrite/variables";
export default function ContextProvider({children})
{
    const [user,setUser]=useState();
    const [projects,setProjects]=useState([]);
    const [globalLoading,setGloabalLoading]=useState(false)
    useEffect(() =>
    {
        (async function()
        {
                try{
                    setGloabalLoading(true)
                    const session=await account.get();
                    setUser({id:session.$id,name:session.name,email:session.email})
                    const projects=await databases.listDocuments(variables.APPWRITE_DATABASEID,variables.APPWRITE_COLLECTIONID,[Query.equal('userId',[session.$id])])
                    setProjects(projects.documents)
                    setGloabalLoading(false)
                }catch(err)
                {
                    setGloabalLoading(false)
                    console.log(err)  
                }
                
            }()) 
    },[])
    return(
        <GlobalContext.Provider value={{user,setUser,projects,setProjects,globalLoading,setGloabalLoading}} >{children}</GlobalContext.Provider>
    )
}
