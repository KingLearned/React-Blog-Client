import { AuthContext } from '@/contexts/authContext'
import Proxy from '@/shared/Proxy'
import { PhotoIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import moment from 'moment'
import React, { useState, useEffect, useContext } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from 'react-router-dom'

const inputStyle = 'w-full p-2 my-2 border-[1px] border-gray-500 outline-none placeholder-gray-500 rounded-md'
const btnStyle = 'border-[1px] rounded border-gray-500 p-1 mr-2 hover:text-primary-100 hover:bg-gray-500'

const Category = ['Art','Science','Technology','Cinema','Politics','Food']

type Props = {
  catName:string
}




const Write:any = () => {
  const state = useLocation().state
  
  const navigate = useNavigate()
  const { currentUser }:any = useContext(AuthContext)

  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')
  const [postImg, setPostImg] = useState('')
  const [cat, setCat] = useState('')

  useEffect(() => {
    setTitle(state?.title || '')
    setValue(state?.descrp || '')
    setCat(state?.cat || '')
  }, [state])

  //IMAGE INSTANT PREVIEWER
  const [imgcache,setImgcache] = useState('')

  const handImgChange = (e:any) => {
    const cacheImg = e.target.files[0]
    setPostImg(e.target.files[0])

    const cacheUpload = async () => {
      try{
        const formData = new FormData()
        formData.append('cache', cacheImg)
        const res = await axios.post(`${Proxy}/imgpreview`, formData)
        return setImgcache(res.data)

      }catch(err){
        console.log(err)
      }
    }
    cacheUpload()
  }

  // FOR UPLOADING OF NEW IMAGE
  const upload = async () => {
    try{
      const formData = new FormData()
      formData.append('mainImg', postImg)
      const res = await axios.post(`${Proxy}/upload`, formData)
      return res.data
    }catch(err){
      console.log(err)
    }
  }
  
  const [errMsg,setErrMsg] = useState('')
  const handleSubmit = async (e:any) => {
    e.preventDefault()

    if(!postImg) return setErrMsg('No Image Selected'), setTimeout(() => {setErrMsg('')},3000)
    if(!title) return setErrMsg('No post title'), setTimeout(() => {setErrMsg('')},3000)
    if(!value) return setErrMsg('No written article'), setTimeout(() => {setErrMsg('')},3000)
    if(!cat) return setErrMsg('No category selected'), setTimeout(() => {setErrMsg('')},3000)
    
    
    const imgUrl = !state &&  await upload()
    try{
      // UPDATING OF AN EXISTING POST
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
        <ReactQuill className='border-[1px] border-gray-500 w-full  pb-[66px] md:pb-[44px] h-[400px]' theme='snow' value={value} onChange={setValue} />
      </div>

      <div className="menu md:w-[30%]">
        <div className="border-[1px] border-gray-500 mt-2.5 p-3 h-[44%] flex flex-col relative">

          <div className=' h-[100px] w-[35%] border-[1px] border-gray-500 absolute rounded-md right-5'>
            {imgcache && <img className="h-full w-full" src={`https://cloud.appwrite.io/v1/storage/buckets/cacheBucket/files/${imgcache}/view?project=64c7e9ee17c84cabe3cd&mode=admin`} alt={imgcache} />}
          </div>

          <h1 className='font-bold text-2xl'>Publish</h1>
          <span><b>Status: </b> Draft</span>
          <span><b>Visibility: </b> Public</span>

          <input type="file" id='newsImg' name='newsImg' hidden onChange={handImgChange} />

          <label htmlFor="newsImg" className="flex cursor-pointer">Upload <PhotoIcon className='w-[25px]' /></label>
          <div className='mt-5 flex justify-between'>
            <button className={`${btnStyle}`}>Save as draft</button>
            <button className={`${btnStyle} bg-secondary-500`} onClick={handleSubmit}>Publish</button>
          </div>
          <p className='font-bold mt-1'>{errMsg && `Error: ${errMsg}`}</p>
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