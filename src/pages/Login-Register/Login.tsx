import Form from './Form'

const Login = () => {

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