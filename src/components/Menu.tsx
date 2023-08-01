import Proxy from "@/shared/Proxy";
import ImagePath from "@/shared/cloudImg";
import { plainText, postInterface } from "@/shared/defineTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

interface Props{
  category:any
  mainNews:any
}

const Menu = ({ category, mainNews }:Props) => {

  const [posts,setPosts] = useState([])

  useEffect(() => {
    const source = axios.CancelToken.source()

    const fetchData = async () => {
      try{

        const res = await axios.get(`${Proxy}/posts/?cat=${category}`, {cancelToken: source.token})
        res.data[0].cat === category && setPosts(res.data) // Push the data into the "POSTS" Array

      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [category])


  const getText = (html:any) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  const showSkeleton = () => {
    const genArray = [1,2]
    return (
      <>
      {genArray.map(each => (
        <div className={`animate-pulse relative mb-10`} key={each}>
          <div className='w-full h-[250px] my-3 rounded-md bg-gray-20'></div>
          <div>
              <h1 className='w-full h-10 rounded-md bg-gray-20'></h1>
              <p className='w-full h-[100px] my-2 rounded-md bg-gray-20'></p> 
              <div className='w-[100px] h-[50px] my-2 rounded-md bg-gray-20'></div>
          </div>
        </div>
      ))}
      </>
    )
  }

    return (
        <div className="md:ml-8 md:w-[30%] mt-10 md:mt-0  md:border-l-[1px] md:border-gray-500 md:pl-8">
            <h1 className="text-center text-xl font-bold bg-gray-500 text-white py-1">RELATED ARTICLES</h1>

            <div className='mt-2'>
              {posts.length > 0 ?
                posts.map((post: postInterface) => ( post.postId !== mainNews &&
                  <div className={`relative mb-10`} key={post.postId}>
                      <div className={`w-full mb-3`}>
                          <img className="w-full h-[250px]" src={ImagePath(post.img)} alt={post.img} />
                      </div>
                      <div>
                          <h1 className='text-2xl font-bold'>{post.title}</h1>
                          <p> {(plainText(post.descrp)).slice(0,120)}...</p> 
                          <button className='border-[1px] rounded border-gray-500 mt-2 p-2 font-bold hover:text-primary-100 hover:bg-gray-500'>
                              <Link to={`/post/${post.postId}`}>Read More</Link>
                          </button>
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

export default Menu