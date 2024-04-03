import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '@/contexts/authContext'
import useMediaQuery from '@/hooks/useMediaQuery'
import { XMarkIcon, UserIcon, Bars3Icon, ArrowRightEndOnRectangleIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid'
import Linker from '@/shared/Linker'
import Themes from '@/shared/Themes'
import { Logo } from './useimg'

const Navbar = ({setTheme}:{setTheme:any}) => {

  const Location = useLocation()
  const NavLinks = ['POLITICS', 'BUSINESS', 'SPORTS', 'NATIONAL', 'EDUCATION']

  
  const { currentUser, logout } = useContext(AuthContext)
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  useEffect(() => {
    if(Location.search !== ''){
      return setIsMenuToggled(false)
    }
  },[Location.search])

  const logOutBtn = <span className='flex' onClick={logout} ><ArrowLeftEndOnRectangleIcon className="w-[25px]" /> Logout</span>
  const logInBtn = <Link to='/login' className='flex'><ArrowRightEndOnRectangleIcon className="w-[25px]" />Login</Link>
  const btnStyle = `cursor-pointer rounded-md px-2 py-1 ${currentUser ? 'text-black bg-secondary-500' : 'text-white bg-gray-400'}`
  
  return (
    <div className='font-bold sticky top-0 z-50'>
      <div className='flex items-center max-sm:justify-between bg-white shadow-md px-5'>
        <div className='w-1/3'>
          <Link to='/'>
            <img className='min-w-[100px] max-w-[150px]' src={Logo} alt={Logo} />
          </Link>
        </div>
        {isAboveMediumScreens ? (
        <div className={`w-full flex py-4`}>
          <div className='flex items-center justity-between gap-8'>
            {
              NavLinks.map(each => (
                <Linker page={each} key={each}/>
              ))
            }
            <span className={`${currentUser && 'cursor-pointer'} flex`}><UserIcon className='w-[25px]'/>{currentUser? currentUser.username : 'Guest'}</span>
            <Themes setTheme={setTheme} />
          </div>

          <div className='flex justify-end w-full gap-3'>
            <span className={`${btnStyle} py-2`} >{currentUser? logOutBtn : logInBtn}</span>
            {currentUser && (
              <span className='cursor-pointer bg-primary-500 font-bold p-2 rounded-md hover:bg-transparent hover:border-primary-500 border-[1px] hover:text-primary-500'>
                <Link to='/write'>Make Post</Link>
              </span>
            )}
          </div>
        </div>
        ) : (
          <div className='flex items-center gap-2 py-4'>
            <Themes setTheme={setTheme} />
            {currentUser && (
            <Link className='cursor-pointer bg-primary-500 font-[200] px-1 py-2.5 rounded-[100%] hover:bg-transparent hover:border-primary-500 border-[1px] hover:text-primary-500' to='/write'>Write</Link>)}

            {isMenuToggled ? 
              <XMarkIcon className="w-[35px] cursor-pointer" onClick={() => (setIsMenuToggled(!isMenuToggled))} />
              :
              <Bars3Icon className="w-[35px] cursor-pointer" onClick={() => (setIsMenuToggled(!isMenuToggled))} />
            }
          </div>
        )}
      </div>
      {!isAboveMediumScreens && isMenuToggled && (
      <div className='flex flex-col shadow-lg rounded-md gap-1 bg-gray-100 py-2 w-[60%] absolute z-50 right-0 pl-10'>
        {NavLinks.map(each => (
          <Linker page={each} key={each}/>
        ))}
        <div className='flex flex-col'>
          <span className={`${currentUser && 'cursor-pointer'} flex mb-1.5`}><UserIcon className='w-[25px]'/> {currentUser? currentUser.username : 'Guest'}</span>
          <span className={`${btnStyle} w-[max-content]`}>{currentUser? logOutBtn : logInBtn}</span>
        </div>
      </div>
      )}

    </div>
  )
}

export default Navbar