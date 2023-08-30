import React, { useContext, useEffect } from 'react'
import Form from './Form'
import { AuthContext } from '@/contexts/authContext'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const { currentUser }:any = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(currentUser){
      navigate('/')
    }
  })

  return (
    <Form 
    Lable='REGISTER' 
    placeholderUsername='Username' 
    placeholderPwd='Password' 
    needEmail Que='Have an account?' 
    navTo='Login' 
    Btn='Register' />
  )
}

export default Register