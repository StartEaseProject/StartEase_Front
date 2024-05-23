import { Link } from 'react-router-dom'
import { routes } from '../../../routes'
import trashCan from '../../../assets/Icons/trashCan.svg'
const RolesTable = ({ roles, handleDelete }) => {
  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700'>
          <tr>
            <th
              scope='col'
              className='fs-400 text-secondaryColor font-semibold  px-layout py-3 w-1/3'
            >
              Role
            </th>
            <th
              scope='col'
              className='fs-400 text-secondaryColor font-semibold px-layout py-3 w-1/3'
            >
              Users Count
            </th>
            <th scope='col' className=''></th>
          </tr>
        </thead>
        <tbody>
          {roles &&
            roles.map((role, index) => {
              return (
                <tr className='hover:bg-bgColor' key={index}>
                  <td className='text-secondaryColor fs-300 px-layout py-3 font-normal capitalize'>
                    {role.name}
                  </td>
                  <td className='text-secondaryColor fs-300 px-layout py-3 font-normal'>
                    {role.users_count}
                  </td>
                  <td className='fs-300 font-medium py-3 text-primaryColor flex justify-end gap-4 items-center px-layout'>
                    <Link
                      className={`${role.id == 1 && 'hidden'}`}
                      to={routes.ROLES.path + '/' + role.id}
                    >
                      View
                    </Link>
                    {(role.type === "custom" && role.users_count===0) && <img
                      className='cursor-pointer'
                      onClick={() => {
                        handleDelete(role.id)
                      }}
                      src={trashCan}
                      alt=''
                    />}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default RolesTable
