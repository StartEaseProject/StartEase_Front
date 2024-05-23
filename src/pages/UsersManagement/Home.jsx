import { AuthCard, NavCard } from '../../components/Globals'
import { routes } from '../../routes'

const Home = () => {
  return (
    <section className='px-layout'>
      <div>
        <AuthCard />
        <div className='pt-20 grid gap-6 max-w-[27.5rem]'>
          <NavCard
            text={'Users table'}
            icon={'folder'}
            link={routes.USERS.path}
          />
          <NavCard
            text={'Create new user'}
            icon={'profile'}
            link={routes.CREATE_USER.path}
          />
        </div>
      </div>
    </section>
  )
}

export default Home
