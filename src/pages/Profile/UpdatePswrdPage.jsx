import { useRef, useState } from 'react'
import {
  Button,
  LoadingAnimation,
  PasswordInput,
  AuthCard,
} from '../../components/Globals'
import API from '../../utils/api-client'
import { ErrorToast, SuccessToast } from '../../components/Globals/toasts'

const UpdatePswrdPage = () => {
  const currentPasswordRef = useRef('')
  const newPasswordRef = useRef('')
  const confirmNewPasswordRef = useRef('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const current_password = currentPasswordRef.current.trim()
    const new_password = newPasswordRef.current.trim()
    const confirm_new_password = confirmNewPasswordRef.current.trim()
    setSuccess(false)
    setError(false)
    if (
      current_password == '' ||
      new_password == '' ||
      confirm_new_password == ''
    ) {
      setError('Please Fill the fields')
      return
    }
    setLoading(true)
    try {
      const res = await API.put('/users/update/password', {
        current_password,
        new_password,
        confirm_new_password,
      })
      setSuccess(res.data.message)
    } catch (e) {
      setError(e.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='px-layout pb-10' onClick={() => setError(false)}>
      <AuthCard />
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      <form onSubmit={handleSubmit} className='space-y-8 max-w-[360px] mt-8'>
        <PasswordInput
          isError={error}
          label='Current Password'
          inputProps={{
            placeholder: 'Current password',
            onChange: (e) => (currentPasswordRef.current = e.target.value),
          }}
          icon='key'
        />
        <PasswordInput
          label='New Password'
          isError={error}
          inputProps={{
            placeholder: 'New password',
            onChange: (e) => (newPasswordRef.current = e.target.value),
          }}
          icon='key'
        />
        <PasswordInput
          label='Confirm New Password'
          isError={error}
          inputProps={{
            placeholder: 'Confirm new password',
            onChange: (e) => (confirmNewPasswordRef.current = e.target.value),
          }}
          icon='key'
        />
        {loading ? (
          <LoadingAnimation className='w-8 scale-[5] mx-auto' />
        ) : (
          <Button>Change Password</Button>
        )}
      </form>
    </div>
  )
}

export default UpdatePswrdPage
