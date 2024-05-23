import { Input } from '../../Globals'

const AdminProfile = ({ user }) => {
  return (
    <div className='flex pt-16 gap-32 pb-6'>
      <div className='min-w-[22.5rem] flex flex-col gap-8'>
        <Input
          icon={'email'}
          label={'Email'}
          inputProps={{ value: user?.email, disabled: true }}
        />
      </div>
      <div className='min-w-[22.5rem] flex flex-col gap-8'>
        <Input
          icon={'call'}
          label={'Phone number'}
          inputProps={{ value: user?.phone_number || "", disabled: true }}
        />
      </div>
    </div>
  )
}

export default AdminProfile
