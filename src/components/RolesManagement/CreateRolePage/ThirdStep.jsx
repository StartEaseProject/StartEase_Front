import Description from './Description'
import { Button } from '../../Globals'
import PermissionRow from '../PermissionRow'

const ThirdStep = ({
  handleSubmit,
  retreat,
  permissions,
  removePermission,
  addPermission,
  setRolePermissions,
}) => {
  const handleReturn = () => {
    setRolePermissions([])
    retreat()
  }
  return (
    <div>
      <div className='px-layout'>
        <Description
          title='permissions'
          description='In the final step, you will select the role permissions. Please
                    choose wisely each permission and click on submit and the end of the page'
        />
      </div>

      <ul className='mt-6'>
        {permissions.map((perm) => (
          <PermissionRow
            key={perm.id}
            perm={perm}
            modifiable={true}
            removePermission={removePermission}
            addPermission={addPermission}
          />
        ))}
      </ul>

      <div className='flex items-center gap-6 px-layout mt-8'>
        <Button onClick={handleSubmit}>Submit</Button>
        <button
          className='font-semibold text-primaryColor'
          onClick={handleReturn}
        >
          return
        </button>
      </div>
    </div>
  )
}

export default ThirdStep
