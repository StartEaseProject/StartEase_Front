import { Button, LoadingAnimation } from '../../components/Globals'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
} from '../../components/Globals/toasts'
import API from '../../utils/api-client'
import UserProfileCard from '../../components/UsersManagement/UserProfileCard'
import RoleRow from '../../components/UsersManagement/RoleRow'
import NotFound from '../NotFound'

const UserRolesPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [allRoles, setAllRoles] = useState([])
  const [userRoles, setUserRoles] = useState([])
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const addRole = (id) => {
    if (!userRoles.includes(id)) {
      setUserRoles((roles) => [...roles, id])
    }
  }
  const removeRole = (id) =>
    setUserRoles((roles) => roles.filter((roleId) => roleId !== id))
  const handleSave = async () => {
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      const res = await API.put(`/users/update/roles`, {
        user: id,
        roles: userRoles,
      })
      setLoading(false)
      setSuccess(res.data.message)
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
    }
  }
  const initFetch = async () => {
    try {
      const [rolesRes, userRes] = await Promise.all([
        API.get(`/roles`),
        API.get(`/users/${id}`),
      ])
      setAllRoles(rolesRes.data.data.roles)
      setLoading(false)
      setUser(userRes.data.data.user)
      setUserRoles(userRes.data.data.user.roles.map((p) => p.id))
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
    }
  }
  useEffect(() => {
    initFetch()
  }, [])

  return (
    <section className='py-8'>
      {success && <SuccessToast message={success} />}
      {error && user && <ErrorToast message={error} />}
      {error && !user && <NotFound />}
      {loading && user && <LoadingToast />}
      {loading && !user && <LoadingAnimation className='scale-[0.5]' />}
      {user && (
        <>
          <div className='px-layout pb-4'>
            <UserProfileCard user={user} />
            <div className='text-secondaryColor font-semibold text-fs-400 flex justify-between pt-8 pb-3'>
              <div>Roles</div>
              <div>Assignment</div>
            </div>
          </div>

          {allRoles.map((role) => {
            return (
              <RoleRow
                key={role.id}
                role={role}
                removeRole={removeRole}
                addRole={addRole}
                isSelected={userRoles.includes(role.id)}
              />
            )
          })}
          <div className='pl-11 pt-8'>
            <Button onClick={handleSave}>Save changes</Button>
          </div>
        </>
      )}
    </section>
  )
}

export default UserRolesPage
