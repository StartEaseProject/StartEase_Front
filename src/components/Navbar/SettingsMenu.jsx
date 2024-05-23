import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '../Globals'
import { useState } from 'react'
import { useAuth } from '../../AuthContext'
import { LoadingToast } from '../Globals/toasts'
import { routes } from '../../routes'

const SettingsMenu = () => {
  const location = useLocation().pathname
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const toggle = () => setIsOpen((isOpen) => !isOpen)
  const settings = Object.values(routes).filter(
    (route) => route.path.startsWith(routes.SETTINGS.path) && route.navbar
  )
  const handleLogout = async () => {
    setLoading(true)
    const { success, error } = await logout()
    setLoading(false)
    navigate('/login')
  }

  return (
    <div className='text-fs-300'>
      {loading && <LoadingToast />}
      <div className='transition-[margin_bottom] duration-500 pr-5 flex items-center justify-between mb-6'>
        <h4 className='pr-7 text-mainGrey uppercase text-thirdColor'>
          settings menu
        </h4>
        <Icon
          icon='arrow-down'
          className={`stroke-thirdColor cursor-pointer transition-transform 
                    duration-500 ${!isOpen && 'rotate-180'}`}
          onClick={toggle}
        />
      </div>
      <div
        className={`transition-[grid-template-rows_opacity] duration-500 pl-3 overflow-hidden grid
                ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <ul className='min-h-0 space-y-3 text-secondaryColor'>
          {settings.map((page) => (
            <Link
              className='flex items-center gap-3 relative'
              to={page.path}
              key={page.path}
            >
              <Icon icon={page.icon} className='stroke-secondaryColor' />
              <span className='grow'>{page.navbar}</span>
              <div
                className={`h-10 bg-primaryColor rounded-[10px] 
                                ${
                                  ((page.path === routes.SETTINGS.path &&
                                    routes.SETTINGS.path === location) ||
                                    (page.path != routes.SETTINGS.path &&
                                      location.startsWith(page.path))) &&
                                  'w-1'
                                }`}
              ></div>
            </Link>
          ))}
          <li
            className='flex items-center gap-3 cursor-pointer'
            onClick={() => !loading && handleLogout()}
          >
            <Icon icon='logout' className='stroke-secondaryColor' />
            <span className='grow'>Logout</span>
            <div className='h-10 bg-primaryColor rounded-[10px]'></div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SettingsMenu
