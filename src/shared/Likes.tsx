import { HeartIcon } from "@heroicons/react/24/solid"
import axios from "axios"
import Proxy from "./Proxy"
import { useContext, useEffect, useState } from "react"
import { handleLike } from "./setPostLikes"
import { AuthContext } from "@/contexts/authContext"

type Props = {
  postId:number
  likes:number
}

const Likes = ({postId, likes}:Props) => {
  const [newLikes, setNewLikes] = useState(Number)

  const { currentUser }:any = useContext(AuthContext)
    
    useEffect(() => {
        currentUser && setNewLikes(likes)
    },[likes])

    
    const updateLikes = async (likeNumber:number) => {
      try{
          const res = currentUser && await axios.put(`${Proxy}/posts/likes/${postId}`, {currentLikes: likeNumber})
          console.log(res.data)
        } catch(err){
          console.log(err)
        }
    }

  return (
    <div className='flex '>{newLikes}<HeartIcon onClick={() => 
      { currentUser &&
        (handleLike(postId) 
        ? 
        (setNewLikes(newLikes+1),updateLikes(newLikes+1)) 
        : 
        (setNewLikes(newLikes-1),updateLikes(newLikes-1))) 
      }} className='cursor-pointer ml-1 w-[20px]'/>
    </div>
  )
}

export default Likes