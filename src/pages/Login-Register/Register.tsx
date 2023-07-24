import React from 'react'
import Form from './Form'


const Register = () => {
  return (
    <Form 
    Lable='Register' 
    placeholderUsername='Username' 
    placeholderPwd='Password' 
    needEmail Que='Have an account?' 
    navTo='login' 
    Btn='Register' />
  )
}

export default Register