import { useContext, useEffect } from 'react'
import Form from './Form'
import { AuthContext } from '@/contexts/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { currentUser }:any = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(currentUser){
      navigate('/')
    }
  })

  return (
    <Form 
    Lable='LOGIN' 
    placeholderUsername='Username' 
    placeholderPwd='Password' 
    Que="Don't Have an account?" 
    navTo='Register' 
    Btn='Login' />
  )
  

}

export default Login