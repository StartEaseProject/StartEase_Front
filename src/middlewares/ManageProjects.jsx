import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { routes } from '../routes'

const ManageProjects = ({ children, empty }) => {
  const { auth } = useAuth()
  const fallback = empty ? null : (
    <Navigate
      to={routes.PROFILE.path}
      state={{ error: 'Not allowed to view this page !' }}
    />
  )
  return auth?.person_type === 'headmaster' ||
    auth.person_type === 'teacher' ||
    auth.person_type === 'scientific committee member' ||
    auth.person_type === 'internship service member' ? (
    <>{children}</>
  ) : (
    <>{fallback}</>
  )
}

export default ManageProjects
