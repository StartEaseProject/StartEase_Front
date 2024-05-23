import PermissionRow from '../PermissionRow'

const RolePermissionsTable = ({
  addPermission,
  modifiable,
  removePermission,
  permissions,
  isSelected,
}) => {
  return (
    <div>
      <h3 className='font-semibold fs-400 px-layout text-secondaryColor'>
        Permissions
      </h3>
      {permissions.map((permission) => {
        return (
          <PermissionRow
            key={permission.id}
            modifiable={modifiable}
            perm={permission}
            removePermission={removePermission}
            addPermission={addPermission}
            isSelected={isSelected(permission.id)}
          />
        )
      })}
    </div>
  )
}

export default RolePermissionsTable
