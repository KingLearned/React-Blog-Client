import Proxy from '@/shared/Proxy';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import { plainText, postInterface } from '@/shared/defineTypes';
import Views from '@/shared/Views';
import Comments from '@/shared/Comments';
import Likes from '@/shared/Likes';
import { setPostLikes } from '@/shared/setPostLikes';
import ImagePath from '@/shared/cloudImg';
import wordCount from '@/shared/wordCounter';
// import PostInteraction from '@/shared/PostInteraction';
import { AuthContext } from '@/contexts/authContext';
import { Xicon } from '@/components/useimg';

const Home = () => {
  // window.scrollTo({ top: 0, left: 0 })
  const [posts,setPosts] = useState([])
  setPostLikes(posts) //HANDLE THE POST LIKES FROM THE LOCAL STORAGE
  
  const { currentUser }:any = useContext(AuthContext)
  
  const [Interact,setInteract] = useState(false)

  const category = useLocation().search
  
  useEffect(() => {
    const source = axios.CancelToken.source()
    const fetchData = async () => {
      try{
        window.scrollTo({ top: 0, left: 0 })
        const res = await axios.get(`${Proxy}/posts${category}`, {cancelToken: source.token})
        setPosts(res.data) // Push the data into the "POSTS" Array
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [category])

  const setTheme = () => { return localStorage.getItem('theme') }

  const showSkeleton = () => {
    const genArray = [1,2,3,4,5]
    return (
      <>
      {genArray.map((each:any) => (
        <div className={`animate-pulse border-gray-20 md:flex pb-5 mb-5 ${(genArray.indexOf(each as never)%2) === 0 && 'flex-row-reverse'}`} key={each}>
          <div className={`md:mx-10 md:w-[40%] h-[280px] rounded-md  mb-3 bg-gray-20`}> </div>
          <div className='md:w-[60%] md:px-10'>
            <h1 className='w-full h-10 rounded-md bg-gray-20'></h1>
            <p className='w-full h-[100px] my-2 rounded-md bg-gray-20'> </p> 
            <div className='w-[100px] h-[50px] my-2 rounded-md bg-gray-20'></div>
            <div className='flex justify-between mt-7 shadow-md p-5 rounded-md bg-gray-20'></div>
          </div>
        </div>
      ))}
      </>
    )
  }

  const PostInteraction = (
    <div className="w-full h-[92vh] flex flex-col justify-center items-center bg-[rgba(0,0,0,0.3)] fixed z-99 -mt-5">
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
    <div className={`mt-5 relative`}>
      {Interact && PostInteraction}
      <div className='homeclass md:mx-10 mx-3 mt-5 min-h-[75vh] -z-10' key={12}>
        {posts.length > 0 ? 
        
          posts.map((post:postInterface) => (
            <div className={` border-b-[1px] border-gray-500 md:flex pb-8 mb-10 ${(posts.indexOf(post as never)%2) === 0 && 'flex-row-reverse'}`} key={post.postId}>

              <div className={`md:mx-10 md:w-[50%]  mb-3`}>
                  <img className='w-full h-[450px] object-cover' src={ImagePath(post.img)} alt={post.img} />
              </div>

              <div className='md:w-[60%] md:px-10 justify-between flex flex-col'>
                <h1 className={`${setTheme() && 'text-white'} md:text-[45px] md:leading-[48px] leading-7 text-[25px] font-bold`}>{post.title}</h1>
                <p className={` ${setTheme() && 'text-gray-100'} my-3`}> {wordCount(plainText(post.descrp))}. . .</p> 
                
                <Link to={`/post/${post.postId}`}>
                  <button className='border-[1px] rounded border-gray-500 mt-2 p-2 font-bold hover:text-primary-100 hover:bg-gray-500'>
                    Read More
                  </button>
                </Link>
                <div onClick={() => {!currentUser && setInteract(true)}} className={`${setTheme() && 'text-white shadow-sm shadow-white'} flex justify-between shadow-md p-5 rounded-md`}>
                  <Views /> <Comments /> <Likes postId={post.postId} likes={post.likes} />
                </div>
              </div>
            </div>
          ))
        :
        showSkeleton()
        }
      </div>
    </div>
  )
}

export default Home