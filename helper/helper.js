import toast from 'react-hot-toast'
export function verifyEmail(email)
{
    if(!email)
    {
        toast.error("Email Required...")
        return false;
    }
    else if(email.includes(" "))
    {
        toast.error("Wrong Email....!")
        return true;
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    {
        toast.error("Invalid Email Format....")
        return false;
    }
    else
    {
        return true;
    }
}
export function verifyPassword(password)
{
    if(!password)
    {
      toast.error('Password required...!');   
      return(false)
    }
    else if(password.includes(" "))
    {
        toast.error('Invalid Password...!');   
        return(false)
    }
    else
    {
        return true;
    }
}