import { useEffect, useState } from 'react'
import { RolesTable } from '../../components/RolesManagement/RolesPage'
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from '../../components/Globals/toasts'
import API from '../../utils/api-client'
import { LoadingAnimation } from '../../components/Globals'

const RolesPage = () => {
  const [roles, setRoles] = useState(null)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const fetchRoles = async () => {
    try {
      const res = await API.get(`/roles`)
      setLoading(false)
      setRoles([...res.data.data.roles])
    } catch (e) {
      setLoading(false)
      setError(e.response.data.message)
    }
  }
  useEffect(() => {
    fetchRoles()
  }, [])

  const handleDelete = async (id) => {
    setSuccess(false)
    setLoading(true)
    try {
      const res = await API.delete(`/roles/${id}`)
      setLoading(false)
      setSuccess(res.data.message)
      setRoles((roles) => roles.filter((role) => role.id != id))
    } catch (e) {
      setLoading(false)
      setError(e.response.message)
    }
  }
  return (
    <div className='roles'>
      {loading && <LoadingAnimation className="scale-[0.5]" />}
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      <RolesTable handleDelete={handleDelete} roles={roles} />
    </div>
  )
}

export default RolesPage
