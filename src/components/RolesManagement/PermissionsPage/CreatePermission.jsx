import { useRef } from 'react'
import { Modal, Input, LoadingAnimation, Button } from '../../Globals'
import { useState } from 'react'
import API from '../../../utils/api-client'

const CreatePermission = ({
  closeModal,
  setError,
  setSuccess,
  error,
  setPermissions,
}) => {
  const permissionRef = useRef('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault()
    setSuccess(null)
    setError(null)
    if (permissionRef.current.trim() === '') {
      setError('Username is required')
      return
    }
    setLoading(true)
    try {
      const res = await API.post(`/permissions`, {
        name: permissionRef.current,
      })
      setLoading(false)
      setSuccess(res.data.message)
      setPermissions((perm) => [...perm, res.data.data.permission])
      closeModal()
    } catch (e) {
      setLoading(false)
      setError(e.response.data.message)
    }
  }
  return (
    <Modal title='Update Username' closeModal={closeModal}>
      <form onSubmit={handleSubmit} className='px-[52px] pb-[14px]'>
        <Input
          className='mb-[22px]'
          isError={error}
          inputProps={{
            placeholder: 'New Username',
            onChange: (e) => {
              permissionRef.current = e.target.value
            },
            onFocus: () => setError(false),
          }}
          icon='tag-user'
        />
        {loading ? (
          <LoadingAnimation className='w-8 scale-[5] mx-auto' />
        ) : (
          <Button className='max-w-[364px]'>Create Permission</Button>
        )}
      </form>
    </Modal>
  )
}

export default CreatePermission
