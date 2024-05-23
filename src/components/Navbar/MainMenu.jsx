import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../Globals'
import { useState } from 'react'
import { routes } from '../../routes'
import MiddlewareWrapper from '../../utils/MiddlewareWrapper'

const MainMenu = () => {
  const location = useLocation().pathname
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen((isOpen) => !isOpen)
  const mainMenu = Object.values(routes).filter(
    (route) => route.path.startsWith(routes.HOME.path) && route.navbar
  )

  return (
    <div className='text-fs-300'>
      <div className='transition-[margin_bottom] duration-500 pr-5 flex items-center justify-between mb-6'>
        <h4 className='pr-7 text-mainGrey uppercase text-thirdColor'>
          main menu
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
          {mainMenu.map((page) => (
            <MiddlewareWrapper
              middlewares={page.middlewares}
              empty={true}
              key={page.path}
            >
              <Link className='flex items-center gap-3 relative' to={page.path}>
                <Icon icon={page.icon} className='stroke-secondaryColor' />
                <span className='grow'>{page.navbar}</span>
                <div
                  className={`h-10 bg-primaryColor rounded-[10px] 
                                ${
                                  ((page.path === routes.HOME.path &&
                                    routes.HOME.path === location) ||
                                    (page.path != routes.HOME.path &&
                                      location.startsWith(page.path))) &&
                                  'w-1'
                                }`}
                ></div>
              </Link>
            </MiddlewareWrapper>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MainMenu
