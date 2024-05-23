import { Input } from '../../Globals'

const StudentProfile = ({ user }) => {
  return (
    <div className='flex pt-16 gap-32 pb-6'>
      <div className='min-w-[22.5rem] flex flex-col gap-8'>
        <Input
          icon={'id'}
          label={'Registration number'}
          inputProps={{ value: user?.person?.num_inscription, disabled: true }}
        />
        <Input
          icon={'person'}
          label={'First name'}
          inputProps={{ value: user?.person?.first_name, disabled: true }}
        />

        <Input
          icon={'person'}
          label='Last name'
          inputProps={{ value: user?.person?.last_name, disabled: true }}
        />
        <Input
          icon={'email'}
          label={'Email'}
          inputProps={{ value: user?.email, disabled: true }}
        />
        <Input
          icon={'call'}
          label={'Phone number'}
          inputProps={{ value: user?.phone_number || '', disabled: true }}
        />
      </div>
      <div className='min-w-[22.5rem] flex flex-col gap-8'>
        <Input
          icon={'calendar'}
          label={'Birthday'}
          inputProps={{ value: user?.person?.birthday, disabled: true }}
        />
        <Input
          icon={'tag-user'}
          label='Birth place'
          inputProps={{ value: user?.person?.birth_place, disabled: true }}
        />
        <Input
          icon={'house'}
          label='Establishment'
          inputProps={{
            value: user?.person?.establishment?.name,
            disabled: true,
          }}
        />
        <Input
          icon={'book-square'}
          label='Speciality'
          inputProps={{
            value: user?.person?.speciality?.name,
            disabled: true,
          }}
        />
        <Input
          icon={'book-saved'}
          label='Filiere'
          inputProps={{
            value: user?.person?.filiere?.name,
            disabled: true,
          }}
        />
      </div>
    </div>
  )
}

export default StudentProfile
