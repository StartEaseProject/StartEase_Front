import { routes } from '../../routes'
import project from '../../assets/Project management/project_image.png'
import period from '../../assets/Project management/periods.png'
import { Link } from 'react-router-dom'
import { AuthCard } from '../../components/Globals'

const ProjectManagemet = () => {
  const pages = [
    {
      name: 'Projects table',
      link: routes.PROJECTS.path,
      image: project,
    }

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
              <img src={page.image} className='h-[100px]'/>
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
 
export default ProjectManagemet;