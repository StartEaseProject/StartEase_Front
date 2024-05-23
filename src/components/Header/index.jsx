import { useAuth } from '../../AuthContext'
import { Input, Icon } from '../Globals'
import { ThemeContext } from "../../ThemeContext";
import { useContext } from "react";

function Header() {
  const newNotif = true

  const { auth } = useAuth()
  const photo = auth?.photo_url
  const { darkMode,toggleDarkMode } = useContext(ThemeContext);

  return (
    <header className='p-layout flex gap-8 items-center justify-between'>
      <Input
        icon='search'
        inputProps={{ placeholder: 'Search' }}
        className='basis-[21.875rem]'
      />
      <div className='shrink-0 flex items-center'>
        <div onClick={()=>{
          toggleDarkMode()
        }}>
          <Icon
          icon={`${darkMode ? "moon" : "sun"}`}
          className='stroke-secondaryColor mr-5 cursor-pointer'
        />
        </div>
        
        <div className='relative mr-7 cursor-pointer'>
          <Icon icon='notification' className='stroke-secondaryColor' />
          {newNotif && (
            <div className='bg-mainRed rounded-full aspect-square w-2 absolute right-[2px] top-[-1px]'></div>
          )}
        </div>
        <div className='w-[2px] bg-thirdColor h-8 mr-7'></div>
        <img
          src={photo}
          alt=''
          className='aspect-square w-9 shadow-default rounded-full'
        />
      </div>
    </header>
  )
}

export default Header
