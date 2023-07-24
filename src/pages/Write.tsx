import { AuthContext } from '@/contexts/authContext'
import Proxy from '@/shared/Proxy'
import { postImg } from '@/shared/allAssets'
import { PhotoIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import moment from 'moment'
import React, { useState, useEffect, useContext } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from 'react-router-dom'

const inputStyle = 'w-full p-2 my-2 border-[1px] border-gray-500 outline-none placeholder-gray-500 rounded-md'
const btnStyle = 'border-[1px] rounded border-gray-500 p-1 mr-2 hover:text-primary-100 hover:bg-gray-500'

const Category = ['Art','Science','Technology','Cinema','Design','Food']

type Props = {
  catName:string
}



const Write:any = () => {
  const state = useLocation().state
  
  const navigate = useNavigate()
  const { currentUser }:any = useContext(AuthContext)

  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')
  const [img, setImg] = useState('')
  const [cat, setCat] = useState('')

  useEffect(() => {
    setTitle(state?.title || '')
    setValue(state?.descrp || '')
    setCat(state?.cat || '')
  }, [state])

  const upload = async () => { //For Uploading of New Image
    try{
      const formData = new FormData()
      formData.append('file', img)
      const res = await axios.post(`${Proxy}/upload`, formData)
      return res.data
    }catch(err){
      console.log(err)
    }
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const imgUrl = !state &&  await upload()
    
    try{

      //UPDATING OF AN EXISTING POST
      state ? (await axios.put(`${Proxy}/posts/${state.postId}`, {
        title:title, descrp:value, cat:cat, img: state ? state.img : imgUrl, userId:currentUser.secureToken
      }),
      navigate(`/?cat=${cat}`) 
      )
      :
      //WRITING OF NEW POST
      (await axios.post(`${Proxy}/posts/`, {
        title:title, descrp:value, cat:cat, img: imgUrl, date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), userId:currentUser.Id  
      }),
      navigate(`/?cat=${cat}`))
    } catch(err){
      console.log(err)
    }

  }

  const setTheme = () => {
    return localStorage.getItem('theme')
  }

  const ListCat = ( { catName }:Props ) => {
    return (
      <div className='flex gap-1 mt-[2px]'>
        <input type="radio" checked={cat ? (cat === catName) : false} id={catName} name='cat' value={catName} onChange={(e:any) => setCat(e.target.value)} />
        <label htmlFor={catName}>{catName}</label>
      </div>
    )
  }

  return  currentUser ?  
    <div className={`${setTheme() && 'text-white'} md:flex justify-between md:mx-0 mx-5 mt-5 md:h-[470px]`}>
      <div className="w-[100%] mr-5">
        <input type="text"  className={`${inputStyle} ${setTheme() && 'text-gray-500'}`} value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)} />
        <div className=' border-[1px] border-gray-500 overflow-y-scroll'>
          <ReactQuill className='h-[400px]' theme='snow' value={value} onChange={setValue} />
        </div>
      </div>

      <div className="menu md:w-[30%]">
        <div className="border-[1px] border-gray-500 mt-2.5 p-3 h-[44%] flex flex-col relative">

          <div className=' h-[100px] w-[35%] border-[1px] border-gray-500 absolute rounded-md right-5'>
            {/* <img className="h-full w-full" src={`/cacheImages/4CA7JOSWC87.jpg`} alt="" /> */}
          </div>

          <h1 className='font-bold text-2xl'>Publish</h1>
          <span><b>Status: </b> Draft</span>
          <span><b>Visibility: </b> Public</span>
          <input type="file" id='newsImg' name='newsImg' hidden onChange={(e:any) => {setImg(e.target.files[0])}} />
          <label htmlFor="newsImg" className="flex cursor-pointer">Upload <PhotoIcon className='w-[25px]' /></label>
          <div className='mt-5 flex justify-between'>
            <button className={`${btnStyle}`}>Save as draft</button>
            <button className={`${btnStyle} bg-secondary-500`} onClick={handleSubmit}>Publish</button>
          </div>
        </div>

        <div className="border-[1px] border-gray-500 my-5 p-3 h-[44%]" >
          <h1 className='font-bold text-2xl'>Category</h1>
          {Category.map((eachCat) => (
            <ListCat catName={eachCat} key={eachCat} />
          ))}
        </div>
      </div>
    </div>:
    navigate('/')
  
}

export default Write