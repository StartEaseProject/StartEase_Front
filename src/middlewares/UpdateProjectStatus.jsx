import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { routes } from '../routes'

const UpdateProjectStatus = ({ children, empty }) => {
  const { auth } = useAuth()
  const fallback = empty ? null : (
    <Navigate
      to={routes.PROFILE.path}
      state={{ error: 'Not allowed to view this page !' }}
    />
  )
  return auth?.permissions?.find(
    (perm) => perm.name === 'change-project-status'
  ) ? (
    <>{children}</>
  ) : (
    <>{fallback}</>
  )
}

export default UpdateProjectStatus
