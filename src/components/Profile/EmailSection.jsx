import { useAuth } from '../../AuthContext'
import { Input } from '../Globals'

const EmailSection = ({ className }) => {
  const { auth } = useAuth()
  return (
    <div className={`flex flex-col grow gap-3 ` + className}>
      <h3 className='text-thirdColor'>Email</h3>
      <div className='grid gap-[22px] max-w-[365px]'>
        <Input
          inputProps={{
            value: auth?.email,
            disabled: true,
          }}
          icon='email'
        />
      </div>
    </div>
  )
}

export default EmailSection
