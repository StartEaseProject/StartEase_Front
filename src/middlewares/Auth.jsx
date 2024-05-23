import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { routes } from '../routes'

const Auth = ({ children, empty }) => {
  const { auth } = useAuth()
  const fallback = empty ? null : (
    <Navigate to={routes.LOGIN.path} state={{ error: 'Login first !' }} />
  )
  return auth ? <>{children}</> : <>{fallback}</>
}

export default Auth
