import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from '../../components/Globals/toasts'
import { RolePermissionsTable } from '../../components/RolesManagement/EditRolePage'
import { Button, LoadingAnimation } from '../../components/Globals'
import API from '../../utils/api-client'
import NotFound from '../NotFound'

const EditRolePage = () => {
  const { id } = useParams()
  const [role, setRole] = useState(null);
  const [allPermissions, setAllPermissions] = useState([])
  const [rolePermissions, setRolePermissions] = useState([])
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const isSelected = (id) => rolePermissions.includes(id)
  const addPermission = (id) => {
    if (!rolePermissions.includes(id)) {
      setRolePermissions((perm) => [...perm, id])
    }
  }
  const removePermission = (id) =>
    setRolePermissions((perm) => perm.filter((permId) => permId !== id))

  const handleSave = async () => {
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      const res = await API.put(`/roles`, {
        role: id,
        permissions: rolePermissions,
      })
      setLoading(false)
      setSuccess(res.data.message)
    } catch (e) {
      setLoading(false)
      setError(e.response.data.message)
    }
  }

  const initFetch = async () => {
    try {
      const [permissionsRes, roleRes] = await Promise.all([
        API.get('/permissions'),
        API.get(`/roles/${id}`),
      ])
      setLoading(false)
      setAllPermissions(permissionsRes.data.data.permissions)
      setRolePermissions(
        roleRes.data.data.role.permissions.map((p) => p.id)
      )
      setRole(roleRes.data.data.role)
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
    }
  }

  useEffect(() => {
    initFetch()
  }, [])

  return (
    <div className='EditRole '>
      {success && <SuccessToast message={success} />}
      {error && role && <ErrorToast message={error} />}
      {!loading && !role && <NotFound />}
      {loading && role && <LoadingToast />}
      {loading && !role && <LoadingAnimation className="scale-[0.5]" />}
      <RolePermissionsTable
        modifiable={role?.type === 'custom' && role?.users_count === 0}
        addPermission={addPermission}
        permissions={allPermissions}
        removePermission={removePermission}
        isSelected={isSelected}
      />
      {role?.type === 'custom' && role?.users_count === 0 && (
        <div className='btn flex justify-start mt-4 px-layout'>
          <Button onClick={handleSave}>Save Change</Button>
        </div>
      )}
    </div>
  )
}

export default EditRolePage
