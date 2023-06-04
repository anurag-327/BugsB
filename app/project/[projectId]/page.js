"use client"
import { useRouter } from 'next/navigation'
const Project = () => {
  const router=useRouter();
  const slug=router.query;
  console.log(slug)
  return (
    <div>Slug</div>
  )
}

export default Project