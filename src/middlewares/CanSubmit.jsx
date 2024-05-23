import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { routes } from '../routes'

const CanSubmit = ({ children, empty }) => {
  const { auth } = useAuth()
  const fallback = empty ? null : (
    <Navigate
      to={routes.PROFILE.path}
      state={{ error: 'Not allowed to view this page !' }}
    />
  )
  return auth?.permissions?.find((perm) => perm.name === 'create-project') &&
    (auth?.person_type !== 'student' || !auth?.is_project_member) ? (
    <>{children}</>
  ) : (
    <>{fallback}</>
  )
}

export default CanSubmit
