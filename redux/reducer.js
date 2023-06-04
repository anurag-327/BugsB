export default function reducer(state={},action)
{
    switch(action.type)
    {
        case "addedCurrentUser" :
            return {currentUser:{username:action.payload.userName,userId:action.payload.id},projects:{...state.projects}}
        case "addedProject" :
            return {currentUser:{...state.currentUser},projects:[...state.projects,{projectId:action.payload.projectId,projectName:action.payload.projectName}]}
        case "removedProject":
            return {currentUser:{...state.currentUser},pojects:state.projects.filter(project => project.projectId!=action.payload.projectId)}  
        default:
            return state      
    } 
}