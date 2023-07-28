import Logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className='w-[100%] px-5 py-5 mt-8 md:flex justify-center md:justify-between bg-gray-100'>
      <img className='w-[100px]' src={Logo} alt={Logo} />
      <span>Learneds Blog. &copy; 2023 All rights reserved.</span>
    </footer>
  )
}

export default Footer