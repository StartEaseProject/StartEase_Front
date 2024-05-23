import { useAuth } from '../../AuthContext'
import { EmailSection, PhoneSection } from '../../components/Profile'
import { Input } from '../Globals'

const AdminProfile = () => {
  const { auth } = useAuth()
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div>
        <div className='flex flex-col grow gap-3 mb-[30px]'>
          <h3 className='text-thirdColor'>Informations</h3>
          <div className='flex flex-col gap-[22px] max-w-[365px]'>
            <div className='relative flex'>
              <Input
                className='grow'
                inputProps={{
                  value: auth?.username,
                  disabled: true,
                }}
                icon='tag-user'
              />
            </div>
          </div>
        </div>
        <EmailSection />
      </div>
      <PhoneSection className='mb-[15px]' />
    </div>
  )
}

export default AdminProfile
