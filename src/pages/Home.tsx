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
import { AuthContext } from '@/contexts/authContext';
import { Xicon } from '@/components/useimg';
import Navbar from '@/components/Navbar';
import { XMarkIcon } from '@heroicons/react/24/solid';

const Home = () => {
  const [mainPosts, setmainPosts] = useState([])
  const [page, setPage] = useState(1)

  const [isTheme, setIsTheme] = useState(false);
  setPostLikes(mainPosts) //HANDLE THE POST LIKES FROM THE LOCAL STORAGE
  
  const { currentUser }:any = useContext(AuthContext)
  
  const [Interact,setInteract] = useState(false)
  const category = useLocation().search
  
  const getPage = Number(localStorage.getItem('page')) || 1
  
  useEffect(() => {
    setIsTheme(localStorage.getItem('theme') ? true : false)
    setPage(getPage)

    const fetchData = async () => {
      const source = axios.CancelToken.source()
      try{
        const res = await axios.get(`${Proxy}/posts${category}`, {cancelToken: source.token})
        setmainPosts(res.data)
        window.scrollTo({ top: 0, left: 0 })
      }catch(err){
        console.log(err)
      }
    }
    fetchData()

  }, [category])

  const showSkeleton = () => {
    const genArray = [1,2,3,4,5]
    return (
      <div className='w-full'>
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
      </ div>
    )
  }

  const PostInteraction = (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[rgba(0,0,0,0.3)] fixed z-[1000] ">
      <div className="relative h-1/2 bg-white  md:w-1/2 w-[80%] p-10 rounded-md flex flex-col items-center justify-center">
        <XMarkIcon className="w-[28px] cursor-pointer absolute top-2 right-2" onClick={() => setInteract(false)} />
        <img className="w-10" src={Xicon} alt={Xicon} />
        <h1 className="font-bold my-5 text-center">Hey, 👋 register or login to interact.</h1>
        <button className="font-bold text-white p-3 bg-gray-400 rounded-xl"><a href="/login">Click here to Register</a></button>
        <p className="mt-3 text-center text-xs">This blog is powered by <a className="font-bold" href="https://cloudflare.com" target="_blanck">Cloudflare</a>. to interact with the contents on this blog, please login by clicking the button above.</p>
      </div>
    </div>
  )

  const pages = []
  const p = mainPosts.length % 10 == 0 ? mainPosts.length / 10 : Math.floor(mainPosts.length / 10) + 1
  for (let i = 0; i < p; i++) { pages.push(i+1) }


  return (
    <div>
      <Navbar setTheme={setIsTheme} />
      <div className={`relative min-h-[100vh] flex flex-col ${isTheme && 'bg-black'}`}>
        {Interact && PostInteraction}
        <div className='md:mx-10 mx-3 h-full pt-8'>
          {mainPosts.length > 0 ? 
            mainPosts.slice((page*10)-10, page*10).map((post:postInterface, index) => (
              <div className={` ${mainPosts.slice((page*10)-10, page*10).length !== index+1 && 'border-b-[1px] border-gray-500'} md:flex pb-8 ${index !== 0 && 'mt-10'} ${(mainPosts.indexOf(post as never)%2) === 0 && 'flex-row-reverse'}`} key={post.postId}>

                <div className={`md:mx-10 md:w-[50%] max-sm:h-[20rem] h-[25rem] mb-3`}>
                  <img className='w-full h-full object-cover' src={post.img} alt={post.img} />
                </div>

                <div className='md:w-[60%] md:px-10 flex flex-col md:relative'>
                  <h1 className={`${isTheme && 'text-white'} md:text-[35px]  text-[25px] font-bold`}>{post.title}</h1>
                  <p className={` ${isTheme && 'text-gray-100'} my-3`}> {wordCount(plainText(post.descrp))}. . .<br /> <Link to={`/post/${post.postId}`} className='font-extrabold text-gray-500 underline'>Read More...</Link></p> 

                  <div onClick={() => {!currentUser && setInteract(true)}} className={`${isTheme && 'text-white shadow-sm shadow-white'} md:absolute md:right-[-5] md:bottom-0 md:w-[90%] flex justify-between shadow-md p-5 mt-4 rounded-md`}>
                    <Views postViews={post.views} /> <Comments totalNum={post.comments.length} /> <Likes postId={post.postId} likes={post.likes} />
                  </div>
                </div>
              </div>
            ))
          :
            showSkeleton()
          }
        </div>


        <div className={`flex ${isTheme ? 'bg-white' : 'bg-gray-50'} self-center rounded-md max-w-max my-5 px-6 py-2 `}>
          {
            pages.map((pag,index) => (
              <button className={`transition duration-100 ${page == pag ? 'text-primary-500' : 'hover:text-gray-300'}  ${index !== 0 && 'pl-3'} font-bold ${isTheme ? 'border-black' : 'border-gray-300'} ${index !== pages.length-1 && 'pr-3 border-r-[2px]'}`} key={index} 
              onClick={() => (
                  localStorage.setItem('page', `${pag}`), 
                  setPage(pag),window.scrollTo({ top: 0, left: 0 })
                )}
              > {pag} </button>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home