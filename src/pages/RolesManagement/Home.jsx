import Role from '../../assets/RolesManagement/Role.svg'
import CreateRole from '../../assets/RolesManagement/CreateRole.svg'
import Permissions from '../../assets/RolesManagement/Permissions.svg'
import { Link } from 'react-router-dom'
import { AuthCard } from '../../components/Globals'
import { routes } from '../../routes'


const Home = () => {
  const pages = [
    {
      name: 'Roles',
      link: routes.ROLES.path,
      image: Role,
    },
    {
      name: 'Create Role',
      link: routes.CREATE_ROLE.path,
      image: CreateRole,
    },
    {
      name: 'Permissions Management',
      link: routes.PERMISSIONS.path,
      image: Permissions,
    },
  ]
  return (
    <div className='px-layout'>
      <AuthCard />
      <div className='links flex gap-20 justify-start mt-4 py-6'>
        {pages.map((page) => (
          <Link
            key={page.link}
            to={page.link}
            className='w-[200px] h-[200px] LinkBox p-5 flex flex-col justify-center items-center gap-5
                rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-primaryColor
                hover:text-white hover:scale-105'
          >
            <div>
              <img src={page.image} />
            </div>

            <div className='text-center max-w-[70%]'>
              {page.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
