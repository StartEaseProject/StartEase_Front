import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { routes } from '../routes'

const HasProject = ({ children, empty }) => {
  const { auth } = useAuth()
  const fallback = empty ? null : (
    <Navigate to={routes.PROFILE.path} state={{ error: 'You do not have a project !' }} />
  )
  return auth?.person_type === 'student' && auth?.is_project_member ? (
    <>{children}</>
  ) : (
    <>{fallback}</>
  )
}

export default HasProject
