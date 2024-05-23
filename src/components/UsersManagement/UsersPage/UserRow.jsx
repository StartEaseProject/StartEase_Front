import { Link } from 'react-router-dom'
import { StatusLabel } from '../../Globals'
import { routes } from '../../../routes'

const UserCard = ({ user }) => {
  return (
    <div className='py-3 w-full hover:bg-bgColor'>
      <div className='pl-[30px] grid grid-cols-5 gap-3 items-center text-fs-300'>
        <div className='flex gap-2 items-center'>
          <img
            src={user?.photo_url}
            className={`w-8 aspect-square rounded-full object-cover`}
          />
          <div className='self-center overflow-hidden whitespace-nowrap overflow-ellipsis text-secondaryColor'>
            {user?.username}
          </div>
        </div>

        <div className='text-thirdColor overflow-hidden whitespace-nowrap overflow-ellipsis'>
          {user?.email}
        </div>
        <div className='text-thirdColor overflow-hidden whitespace-nowrap overflow-ellipsis'>
          {user?.phone_number}
        </div>
        <div>
          <StatusLabel status={user?.is_enabled} />
        </div>

        <div className='text-primaryColor font-medium hover:cursor-pointer hover:underline pl-8'>
          <Link to={routes.USERS.path + '/' + user?.id}>View</Link>
        </div>
      </div>
    </div>
  )
}

export default UserCard
