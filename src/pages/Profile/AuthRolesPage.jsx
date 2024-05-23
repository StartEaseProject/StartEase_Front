import { useAuth } from '../../AuthContext'


const AuthRolesPage = () => {
  const { auth } = useAuth()
  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700'>
          <tr>
            <th
              scope='col'
              className='fs-400 text-secondaryColor font-semibold  px-6 py-3 w-1/4'
            >
              Roles
            </th>
          </tr>
        </thead>
        <tbody>
          {auth?.roles &&
            auth?.roles.map((permission, index) => {
              return (
                <tr className='hover:bg-bgColor' key={index}>
                  <td className='text-secondaryColor fs-300 px-6 py-3 font-normal'>
                    {permission.name}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default AuthRolesPage
