import { useEffect, useState } from 'react'
import {
  LoadingToast,
  ErrorToast,
  SuccessToast,
} from '../../components/Globals/toasts'
import API from '../../utils/api-client'
import {
  CreatePermission,
  PermissionsTable,
} from '../../components/RolesManagement/PermissionsPage'
import { LoadingAnimation } from '../../components/Globals'

const Permissions = () => {
  const [permissions, setPermissions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [showPopUp, setShowPopUp] = useState(false)

  function closeModal() {
    setShowPopUp(false)
  }

  function openModal() {
    setShowPopUp(true)
  }

  const fetchPermissions = async () => {
    try {
      const res = await API.get(`/permissions`)
      setPermissions([...res.data.data.permissions])
      setLoading(false)
    } catch (e) {
      setLoading(false)
      setError(e.response.data.message)
    }
  }
  useEffect(() => {
    fetchPermissions()
  }, [])

  const handleDelete = async (id) => {
    setSuccess(null)
    setError(null)
    setLoading(true)
    try {
      const res = await API.delete(`/permissions/${id}`)
      setLoading(false)
      setSuccess(res.data.message)
      setPermissions((perm) => perm.filter((p) => p.id != id))
    } catch (e) {
      setLoading(false)
      setError(e.response.data.message)
    }
  }

  return (
    <div className='Permissions'>
      {showPopUp && (
        <CreatePermission
          setPermissions={setPermissions}
          setSuccess={setSuccess}
          setError={setError}
          error={error}
          closeModal={closeModal}
        />
      )}
      {loading && <LoadingAnimation className="scale-[0.5]" />}
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      <PermissionsTable
        handleDelete={handleDelete}
        openModal={openModal}
        permissions={permissions}
      />
    </div>
  )
}
export default Permissions
