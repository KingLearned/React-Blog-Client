import Menu from '@/components/Menu'
import { AuthContext } from '@/contexts/authContext'
import Comments from '@/shared/Comments'
import Likes from '@/shared/Likes'
import Proxy from '@/shared/Proxy'
import Views from '@/shared/Views'
import { postImg } from '@/shared/allAssets'
import { singlePostInterface } from '@/shared/defineTypes'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const edits = 'h-full w-[30px] ml-2 cursor-pointer rounded-full p-1 text-white'
type Props = {
  children: React.ReactNode;
}
const P = ( { children }:Props ) => {
  return(
    <p className='py-1.5 text-justify'>{children}</p>
  )
}
const Single = () => {
  const [post,setPost] = useState<singlePostInterface[]>([])

  const Location = useLocation()
  const navigate = useNavigate()

  const postId = Location.pathname.split("/")[2]
  
  const {currentUser} = useContext(AuthContext)

  const source = axios.CancelToken.source()
  useEffect(() => {
    const fetchData = async () => {
      try{

        const res = await axios.get(`${Proxy}/posts/${postId}`, {cancelToken: source.token})
        setPost([res.data]) // Push the data into the "POSTS" Array

      }catch(err){
        console.log(err)
      }
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

  const setTheme = () => {
    return localStorage.getItem('theme')
  }
  return ( post.length > 0 &&
    <div className={`flex md:flex-row flex-col justify-center mt-5 md:mx-0 mx-10 ${setTheme() && 'text-white'}`}>
      <div className='md:w-[50%]'>
        <div className='mb-2.5 '>
          <img className='max-h-[400px] w-full' src={`/uploads/${post[0].img}`} alt={post[0].img} />
        </div>
        <div className='flex justify-between my-5 shadow-md p-5 rounded-md'>
          <Views /> <Comments /> <Likes postId={post[0].postId} likes={post[0].likes} />
        </div>
        <div className="flex items-center">
          <img className='rounded-full h-[30px] w-[30px]' src={postImg} alt={postImg} />
          <div className="mx-2">
            <span className=''>{ post[0].username ? post[0].username : 'John'}</span>
            <p className='-mt-1.5'>Posted {moment(post[0].date).fromNow()}</p>
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
          <h1 className='font-bold text-[30px]'>{post[0].title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post[0].descrp}} />
          </div>
      </div>
      <Menu category={post[0].cat} mainNews={post[0].title} />
    </div>
  )
}

export default Single