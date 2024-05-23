import { Link } from 'react-router-dom'
import Icon from './Icon'

const NavCard = ({ className, text, link, icon, ...rest }) => {
  return (
    <Link
      to={link}
      {...rest}
      className={
        `bg-bgColor gap-3 text-thirdColor transition-all flex items-center rounded-[10px] py-4 group
            px-[10px] hover:bg-primaryColor hover:text-white duration-500 ` +
        className
      }
    >
      <Icon
        icon={icon}
        className='fill-transparent stroke-thirdColor
                group-hover:stroke-white shrink-0 duration-500'
      />
      <span className='grow  text-fs-300 capitalize font-medium '>{text}</span>
      <Icon
        icon='send'
        className='fill-transparent stroke-primaryColor shrink-0
                group-hover:stroke-white transition-all duration-500'
      />
    </Link>
  )
}

export default NavCard
