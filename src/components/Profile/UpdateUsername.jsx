import { useRef } from 'react'
import { useAuth } from '../../AuthContext'
import { Modal, Input, LoadingAnimation, Button } from '../Globals'
import { useState } from 'react'

const UpdateUsername = ({ closeModal, setError, setSuccess, error }) => {
  const { auth, updateUsername } = useAuth()
  const usernameRef = useRef('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess(false)
    setError(false)
    if (usernameRef.current.trim() === '') {
      setError('Username is required')
      return
    }
    setLoading(true)
    const res = await updateUsername(usernameRef.current)
    setLoading(false)
    if (res.success) {
      setSuccess(res.success)
      closeModal()
      usernameRef.current = ''
    } else {
      setError(res.error)
    }
  }
  return (
    <Modal title='Update Username' closeModal={() => !loading && closeModal()}>
      <form onSubmit={handleSubmit} className='px-[52px] pb-[14px]'>
        <Input
          className='mb-[17px]'
          inputProps={{
            value: auth?.username,
            disabled: true,
          }}
          icon='tag-user'
        />
        <Input
          className='mb-[22px]'
          isError={error}
          inputProps={{
            placeholder: 'New Username',
            onChange: (e) => {
              usernameRef.current = e.target.value
            },
            onFocus: () => setError(false),
          }}
          icon='tag-user'
        />
        {loading ? (
          <LoadingAnimation className='w-8 scale-[5] mx-auto' />
        ) : (
          <Button className='max-w-[364px]'>change</Button>
        )}
      </form>
    </Modal>
  )
}

export default UpdateUsername
