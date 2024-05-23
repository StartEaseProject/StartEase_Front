import { useLocation } from 'react-router-dom'
import { NavCard, AuthCard } from '../../components/Globals'
import { ErrorToast } from '../../components/Globals/toasts'
import { routes } from '../../routes'

function Home() {
  const { state } = useLocation()
  const error = state?.error
  window.history.replaceState({}, document.title)
  return (
    <div className='px-layout'>
      {error && <ErrorToast message={error} />}
      <AuthCard />
      <div className='flex flex-col gap-[13px] pt-8'>
        <h3 className='text-thirdColor text-fs-300'>Informations</h3>
        <div className='flex flex-col gap-[28px] max-w-[440px]'>
          <NavCard
            link={routes.PROFILE_INFO.path}
            text='Your Informations'
            icon='profile'
          />
          <NavCard
            link={routes.PROFILE_PASSWORD.path}
            text='Update Password'
            icon='profile'
          />
          {/* <NavCard
            link={routes.PROFILE_ROLES.path}
            text='Roles'
            icon='shield'
          />
          <NavCard
            link={routes.PROFILE_PERMISSIONS.path}
            text='Permissions'
            icon='id'
          /> */}
        </div>
      </div>
    </div>
  )
}

export default Home
