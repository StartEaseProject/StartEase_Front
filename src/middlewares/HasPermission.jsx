import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { routes } from '../routes'

const HasPermission = ({ children, empty, permission }) => {
  const { auth } = useAuth()
  const fallback = empty ? null : (
    <Navigate to={routes.LOGIN.path} state={{ error: 'Login first !' }} />
  )
  return auth.permissions.find(e => e.name===permission)!==undefined ? <>{children}</> : <>{fallback}</>
}

export default HasPermission
