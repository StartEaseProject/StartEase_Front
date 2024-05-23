import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { routes } from '../routes'

const Guest = ({ children, empty }) => {
  const { auth } = useAuth()
  const fallback = empty ? null : (
    <Navigate to={routes.PROFILE.path} state={{ error: 'Logout first !' }} />
  )
  return !auth ? <>{children}</> : <>{fallback}</>
}

export default Guest
