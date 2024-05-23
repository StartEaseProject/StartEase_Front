import trashCan from '../../../assets/Icons/trashCan.svg'

const PermissionsTable = ({ permissions, handleDelete, openModal }) => {
  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700'>
          <tr>
            <th
              scope='col'
              className='fs-400 text-secondaryColor font-semibold  px-6 py-3 w-1/4'
            >
              Permissions
            </th>
            <th
              scope='col'
              className='fs-400 text-secondaryColor font-semibold  px-6 py-3 w-1/4'
            >
              Roles Count
            </th>
            <th
              scope='col'
              className='fs-400 text-primaryColor font-medium px-6 py-3 w-1/4 text-right'
            >
              <p className='cursor-pointer' onClick={openModal}>
                New Permission
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {permissions &&
            permissions.map((permission, index) => {
              return (
                <tr className='hover:bg-bgColor' key={index}>
                  <td className='text-secondaryColor fs-300 px-6 py-3 font-normal'>
                    {permission.name}
                  </td>
                  <td className='text-secondaryColor fs-300 px-6 py-3 font-normal'>
                    {permission.roles_count}
                  </td>
                  <td className='fs-300 font-medium px-6 py-3 text-primaryColor justify-end gap-4 flex items-center'>
                    {permission.type === 'custom' &&
                      permission.roles_count === 0 && (
                        <img
                          className='cursor-pointer'
                          onClick={() => {
                            handleDelete(permission.id)
                          }}
                          src={trashCan}
                          alt=''
                        />
                      )}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default PermissionsTable
