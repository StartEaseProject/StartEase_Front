import { useState } from 'react'
import {
  FirstStep,
  SecondStep,
  ThirdStep,
} from '../../components/RolesManagement/CreateRolePage'
import { useEffect } from 'react'
import {
  ErrorToast,
  SuccessToast,
  LoadingToast,
} from '../../components/Globals/toasts'
import { Timeline } from '../../components/Globals'
import API from '../../utils/api-client'
import useRedirect from '../../useRedirect'
import { routes } from '../../routes'

const CreateRolePage = () => {
  const redirect = useRedirect(routes.ROLES.path)
  const [currentStep, setCurrentStep] = useState(1)
  const advance = () => setCurrentStep((current) => current + 1)
  const retreat = () => setCurrentStep((current) => current - 1)
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [name, setName] = useState(null)
  const [rolePermissions, setRolePermissions] = useState([])

  const addPermission = (id) => {
    if (!rolePermissions.includes(id)) {
      setRolePermissions((perm) => [...perm, id])
    }
  }

  const removePermission = (id) =>
    setRolePermissions((perm) => perm.filter((permId) => permId !== id))

  const fetchPermissions = async () => {
    try {
      const res = await API.get('/permissions')
      setPermissions(res.data.data.permissions)
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const handleSubmit = async () => {
    setSuccess(false)
    setError(false)
    if (rolePermissions.length === 0) {
      setError('Please provide at least one permission')
      return
    }
    setLoading(true)
    try {
      const res = await API.post('/roles', {
        name,
        permissions: rolePermissions,
      })
      setSuccess(res.data.message)
      redirect()
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPermissions()
  }, [])

  return (
    <div className='mt-7'>
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast />}
      <div className='px-layout pb-5'>
        <Timeline currentStep={currentStep} total={3} />
      </div>
      {currentStep === 1 && <FirstStep advance={advance} />}
      {currentStep === 2 && (
        <SecondStep advance={advance} retreat={retreat} setName={setName} />
      )}
      {currentStep === 3 && (
        <ThirdStep
          setRolePermissions={setRolePermissions}
          retreat={retreat}
          permissions={permissions}
          handleSubmit={handleSubmit}
          addPermission={addPermission}
          removePermission={removePermission}
        />
      )}
    </div>
  )
}

export default CreateRolePage
