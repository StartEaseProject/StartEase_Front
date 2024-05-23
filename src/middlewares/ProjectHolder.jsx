import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { routes } from '../routes'

const ProjectHolder = ({ children, empty }) => {
  const { auth } = useAuth()
  const fallback = empty ? null : (
    <Navigate
      to={routes.PROFILE.path}
      state={{ error: 'Not allowed to view this page !' }}
    />
  )
  return auth?.roles?.find((role) => role.name === 'project_holder')? (
    <>{children}</>
  ) : (
    <>{fallback}</>
  )
}

export default ProjectHolder
