import { HeartIcon } from "@heroicons/react/24/solid"
import axios from "axios"
import Proxy from "./Proxy"
import { useEffect, useState } from "react"
import { handleLike } from "./setPostLikes"
const likeStatus = JSON.parse(`${localStorage.getItem('postlikes')}`)

type Props = {
    postId:number
    likes:number
}


const Likes = ({postId, likes}:Props) => {
    const [newLikes, setNewLikes] = useState(Number)
    const [like, setlike] = useState(Boolean)
    
    useEffect(() => {
        setNewLikes(likes)
    },[likes])

    const updateLikes = async (likeNumber:number) => {
        
        try{
    
          const res = await axios.put(`${Proxy}/posts/likes/${postId}`, 
          {currentLikes: likeNumber})
          console.log(res.data)
        } catch(err){
          console.log(err)
        }
    }

  return (
    <div className='flex '>{newLikes}<HeartIcon onClick={() => 
        {
            handleLike(postId) 
            ? 
            (setNewLikes(newLikes+1),updateLikes(newLikes+1)) 
            : 
            (setNewLikes(newLikes-1),updateLikes(newLikes-1))
            
            
        }} className='cursor-pointer ml-1 w-[20px]'/></div>
  )
}

export default Likes