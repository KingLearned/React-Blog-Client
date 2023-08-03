import Menu from '@/components/Menu'
import { AuthContext } from '@/contexts/authContext'
import Comments from '@/shared/Comments'
import Likes from '@/shared/Likes'
import Proxy from '@/shared/Proxy'
import Views from '@/shared/Views'
import { singlePostInterface } from '@/shared/defineTypes'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import userimage from '@/assets/userimg.jpg'
import ImagePath from '@/shared/cloudImg'
import { Xicon } from '@/components/useimg'


const edits = 'h-full w-[30px] ml-2 cursor-pointer rounded-full p-1 text-white'

const Single = () => {
  const [post,setPost] = useState<singlePostInterface[]>([])

  const navigate = useNavigate()
  const Location = useLocation()
  const postId = Location.pathname.split("/")[2]

  const [Interact,setInteract] = useState<boolean>()
  
  const { currentUser } = useContext(AuthContext)
  

  const source = axios.CancelToken.source()
  useEffect(() => {
    const fetchData = async () => {
      try{
        window.scrollTo({ top: 0, left: 0})
        const res = await axios.get(`${Proxy}/posts/${postId}`, {cancelToken: source.token})
        setPost([res.data]) // Push the data into the "POSTS" Array

      }catch(err){ console.log(err) }
    }
    fetchData()
  }, [postId])

  const handleDelete = async () => {
    try{
      await axios.delete(`${Proxy}/posts/${postId}`, {cancelToken: source.token})
      navigate("/") 

    }catch(err){
      console.log(err)
    }
  }

  const setTheme = () => { return localStorage.getItem('theme') }

  const showSkeleton = () => {
    return (
      <div className={`animate-pulse md:w-[50%] border-gray-20 pb-5 mb-5`} key={''}>
        <div className={` w-full h-[350px] rounded-md  mb-3 bg-gray-20`}> </div>
        <div className='my-3 shadow-md p-8 rounded-md bg-gray-20'></div>
        <div className='flex md:w-[60%] my-3'>
          <div className='w-[50px] h-[50px] rounded-full bg-gray-20'></div>
          <div className='w-[150px] h-[50px] mx-2 rounded-md bg-gray-20'></div>
        </div>
          <h1 className='w-full h-10 rounded-md bg-gray-20'></h1>
          <p className='w-full h-[200px] my-2 rounded-md bg-gray-20'> </p> 
      </div>
    )
  }

  const PostInteraction = (
    <div className={` ${Interact ? 'block' : 'hidden'}  md:w-[91%] md:left-[60px] left-0 h-[92vh] flex flex-col justify-center items-center bg-[rgba(0,0,0,0.3)] fixed z-[99] -mt-5`}>
      <div className="relative h-1/2 bg-white  md:w-1/2 w-[80%] p-10 rounded-md flex flex-col items-center justify-center">
          <button className="font-bold absolute top-2 right-2" onClick={() => {setInteract(false)}}>X</button>
          <img className="w-10" src={Xicon} alt={Xicon} />
          <h1 className="font-bold my-5 text-center">Hey, 👋 register or login to interact.</h1>
          <button className="font-bold text-white p-3 bg-gray-400 rounded-xl"><a href="/login">Click here to Register</a></button>
          <p className="mt-3 text-center text-xs">This blog is powered by <a className="font-bold" href="https://cloudflare.com" target="_blanck">Cloudflare</a>. to interact with the contents on this blog, please login by clicking the button above.</p>
      </div>
    </div>
  )

  return ( 
    <div className={`relative min-h-[100vh] flex md:flex-row flex-col justify-center mt-5 md:mx-0 mx-3`}>  
    
      {post.length > 0 ? 
        <div className='md:w-[50%] '>
          {PostInteraction}
          
          <h1 className={`font-bold text-[35px] ${setTheme() && 'text-white'}`}>{post[0].title}</h1>
          <div className='mb-2.5 '>
            <img className='md:max-h-[350px] h-[380px] w-full' src={ImagePath(post[0].img)} alt={post[0].img} />
          </div>
          <div onClick={() => {!currentUser && setInteract(true)}} className={`flex justify-between my-5 shadow-md ${setTheme() && 'text-white shadow-sm shadow-white'} p-5 rounded-md`}>
            <Views /> <Comments /> <Likes postId={post[0].postId} likes={post[0].likes} />
          </div>

          <div className="flex items-center mb-3">
            <img className='rounded-full h-[30px] w-[30px]' src={userimage} alt={userimage} />
            <div className="mx-2">
              <span className='text-gray-300 font-bold'>Author:</span> <span>{post[0].username}</span>
              <p className='-mt-1.5'><span className='text-gray-300 font-bold'>Posted:</span> {moment(post[0].date).fromNow()}</p>
            </div>
            {currentUser?.username === post[0].username && 
            <>
              <Link className={`${edits} bg-green-blue`} to={`/write?edit=${post[0].postId}`} state={post[0]}>
                <PencilIcon />
              </Link>
              <Link className={`${edits} bg-primary-500`} to={`/write?edit=2`}>
                <TrashIcon />
              </Link>
            </>
            }
          </div>

          <div>
            <div className={`${setTheme() && 'text-gray-50'}`} dangerouslySetInnerHTML={{ __html: post[0].descrp}} /></div>
        </div>
        :
        showSkeleton()
      }
    {post.length > 0 ? <Menu category={post[0].cat} mainNews={post[0].postId} /> : <Menu category={''} mainNews={''} />}
    </div>
  )
}

export default Single