import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { routes } from '../routes'

const Teacher = ({ children, empty }) => {
  const { auth } = useAuth()
  const fallback = empty ? null : (
    <Navigate
      to={routes.PROFILE.path}
      state={{ error: 'Not allowed to view this page !' }}
    />
  )
  return auth.person_type === 'teacher' ? <>{children}</> : <>{fallback}</>
}

export default Teacher
