import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { AuthContext } from '@/contexts/authContext'
import Proxy from '@/shared/Proxy'
import axios from 'axios'
import React, { useState, ChangeEvent, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const justfyCenter = 'flex flex-col justify-center items-center'
const inputStyle = 'p-2 my-2 outline-gray-500 placeholder-gray-500 w-full rounded-md'

type Props = {
    Lable: string
    placeholderUsername: string
    placeholderPwd: string
    navTo: string
    Btn: string
    Que: string
    needEmail?: true
}

const Form = ( { Lable, placeholderUsername, placeholderPwd, needEmail, Que, navTo, Btn }:Props ) => {

  const setTheme = () => { return localStorage.getItem('theme') }
  const [err,setError] = useState('')
  const navigate = useNavigate()
  const [isTheme, setIsTheme] = useState(false);
  
  useEffect(() => {
    setIsTheme(localStorage.getItem('theme') ? true : false)
  },[])

  const { login } = useContext(AuthContext)

  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    pwd:"",
  })
  
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    return setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      const res = !needEmail ? await axios.post(`${Proxy}/auth/login`, inputs) : await axios.post(`${Proxy}/auth/register`, inputs)
      needEmail ?
      (
        res.data.Error ?
        (
          setError(res.data.Error),
          setTimeout(() => { setError('') }, 3000)
        )
        :
        res.data.success &&
        navigate('/login')
      )
      :
      (
        res.data.Error ? 
        ( 
          setError(res.data.Error),
          setTimeout(() => { setError('') }, 3000)
        ) : (
          await login(inputs), //Capture and Store Users Data to the Storage
          navigate('/')
        )
      )

    }
    catch (err){
      console.log(err)
    }

  }
  
  

  return (
    <>
      <Navbar setTheme={setIsTheme} />
        <div className={`h-[85vh] ${justfyCenter} ${isTheme && 'bg-black'}`}>
          <form className={`${justfyCenter} bg-gray-100 p-5 w-[50%] max-sm:w-full rounded-md`} action="">
            <h1 className={`font-[900] text-[20px] my-3 ${isTheme && 'text-white'}`}>{Lable}</h1>
            
            <input type="text" name='username' className={inputStyle} placeholder={placeholderUsername} onChange={handleChange} />
            {needEmail && <input type="email" name='email' className={inputStyle} placeholder='Email' onChange={handleChange} />}
            <input type="password" name='pwd' className={inputStyle}  placeholder={placeholderPwd} onChange={handleChange} />
            <p className='py-2 h-[25px]'>{
            err && err 
            }</p>
            <button className='rounded-md font-bold bg-gray-500 text-gray-300 px-10 py-2 my-2 mt-5 hover:bg-gray-400 hover:text-white' onClick={handleSubmit}>{Btn}</button>
            <span className={justfyCenter}>{Que} <Link className='text-gray-500 font-bold' to={`/${navTo.toLocaleLowerCase()}`}>{navTo}</Link></span>
          </form>
        </div>
      <Footer />
    </>
  )
}

export default Form