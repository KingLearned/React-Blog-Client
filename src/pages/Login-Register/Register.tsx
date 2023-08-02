import React from 'react'
import Form from './Form'


const Register = () => {
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