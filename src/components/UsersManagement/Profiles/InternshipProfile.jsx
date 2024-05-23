import { Input } from '../../Globals'

const InternshipProfile = ({ user }) => {
  return (
    <div className='flex pt-16 gap-32 pb-20'>
      <div className='min-w-[22.5rem] flex flex-col gap-8'>
        <Input
          icon={'person'}
          label={'First name'}
          inputProps={{ value: user?.person?.first_name, disabled: true }}
        />

        <Input
          icon={'person'}
          label={'Last Name'}
          inputProps={{ value: user?.person?.last_name, disabled: true }}
        />
        <Input
          icon={'email'}
          label={'Email'}
          inputProps={{ value: user?.email, disabled: true }}
        />
      </div>
      <div className='min-w-[22.5rem] flex flex-col gap-8'>
        <Input
          icon={'house'}
          label={'Establishment'}
          inputProps={{
            value: user?.person?.establishment?.name,
            disabled: true,
          }}
        />
        <Input
          icon={'grade'}
          label={'Grade'}
          inputProps={{
            value: user?.person?.grade?.name,
            disabled: true,
          }}
        />
        <Input
          icon={'call'}
          label={'Phone number'}
          inputProps={{ value: user?.phone_number || "", disabled: true }}
        />
      </div>
    </div>
  )
}

export default InternshipProfile
