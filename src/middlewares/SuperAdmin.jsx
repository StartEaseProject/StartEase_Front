import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { routes } from '../routes'

const SuperAdmin = ({ children, empty }) => {
  const { auth } = useAuth()
  const has_access = auth?.roles?.find((role) => role.name === 'super_admin')
  const fallback = empty ? null : <Navigate to={routes.NOTFOUND.path} />
  return has_access ? <>{children}</> : <>{fallback}</>
}

export default SuperAdmin
