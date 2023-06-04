export function addedCurrentUser(userName,userId)
{
    return{type:addedCurrentUser,payload:{userName,userId}}
}
export function addedProject(ProjectName,ProjectId)
{
    return{type:addedCurrentUser,payload:{ProjectName,ProjectId}}
}
export function removedProject(ProjectId)
{
    return{type:addedCurrentUser,payload:{ProjectId}}
}