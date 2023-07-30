import Proxy from '@/shared/Proxy';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import { plainText, postInterface } from '@/shared/defineTypes';
import Views from '@/shared/Views';
import Comments from '@/shared/Comments';
import Likes from '@/shared/Likes';
import { setPostLikes } from '@/shared/setPostLikes';




const Home = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  const [posts,setPosts] = useState([])

  setPostLikes(posts) //HANDLE THE POST LIKES FROM THE LOCAL STORAGE


  const category = useLocation().search
  
  useEffect(() => {
    // console.log(JSON.parse(`${localStorage.getItem('postlikes')}`))
    
    const source = axios.CancelToken.source()

    const fetchData = async () => {
      try{
        const res = await axios.get(`${Proxy}/posts${category}`, {cancelToken: source.token})
        setPosts(res.data) // Push the data into the "POSTS" Array

      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [category])

  const setTheme = () => {
    return localStorage.getItem('theme')
  }
  return (
    <div className={`mt-5 ${setTheme() && 'text-white'}`}>
      <div className='md:mx-20 mx-10 mt-5 min-h-[75vh]' key={12}>
        {posts.map((post:postInterface) => (
          
          <div className={`relative border-b-[1px] border-gray-500 md:flex pb-8 mb-10 ${(posts.indexOf(post as never)%2) === 0 && 'flex-row-reverse'}`} key={post.postId}>

            <div className={`md:mx-10 md:w-[40%]  mb-3`}>
                <img className='w-full h-[300px]' src={`/uploads/${post.img}`} alt={post.img} />
            </div>

            <div className='md:w-[60%] md:px-10'>
              <h1 className='md:text-[45px] text-[25px] font-bold'>{post.title}</h1>
              <p> {(plainText(post.descrp)).slice(0,184)}...</p> 

              <Link to={`/post/${post.postId}`}>
                <button className='border-[1px] rounded border-gray-500 mt-2 p-2 font-bold hover:text-primary-100 hover:bg-gray-500'>
                  Read More
                </button>
              </Link>
              <div className='flex justify-between mt-7 shadow-md p-5 rounded-md'>
                <Views /> <Comments /> <Likes postId={post.postId} likes={post.likes} />
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default Home