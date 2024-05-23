import { useState, useRef } from 'react'
import { useAuth } from '../../AuthContext'
import { Input, Button, LoadingAnimation } from '../Globals'
import API from '../../utils/api-client'
import { ErrorToast, SuccessToast } from '../Globals/toasts'

const PhoneSection = ({ className }) => {
  const { auth, updatePhone } = useAuth()

  const phoneRef = useRef(auth?.phone_number || "")
  const codeRef = useRef('')
  const [codeSent, setCodeSent] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const sendPin = async () => {
    setError(null)
    setSuccess(null)
    if (phoneRef.current.trim() == '') {
      setError('Phone number is required')
      return
    }
    if (phoneRef.current.trim() === auth?.phone_number) return
    setLoading(true)
    try {
      const res = await API.post('users/update/phonenumber', {
        phone_number: phoneRef.current,
      })
      setSuccess(res.data.message)
      setCodeSent(true)
    } catch (er) {
      setError(er.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setError(null)
    setSuccess(null)
    if (codeRef.current.trim() == '') {
      setError('Pin code is required')
      return
    }
    setLoading(true)
    const res = await updatePhone(codeRef.current)
    setLoading(false)
    setSuccess(res.success)
    setError(res.error)
  }

  return (
    <div className={`flex flex-col grow gap-3 max-w-[365px] ` + className}>
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      <h3 className='text-thirdColor'>Phone Number</h3>
      <div className='flex flex-col gap-[22px]'>
        <div className='relative flex'>
          <Input
            className='grow'
            inputProps={{
              defaultValue: auth?.phone_number || "",
              placeholder: "no phone number",
              onChange: (e) => (phoneRef.current = e.target.value),
            }}
            icon='call'
          />
          <button
            onClick={sendPin}
            className='text-primaryColor absolute self-center right-3 font-medium'
          >
            send
          </button>
        </div>
        <Input
          inputProps={{
            placeholder: 'Sms code',
            type: 'number',
            onChange: (e) => (codeRef.current = e.target.value),
            disabled: !codeSent,
          }}
          icon='key-square'
        />
      </div>
      <p className='text-fs-300 text-thirdColor mb-5'>
        Click on send then provide the pin number .
      </p>
      {loading ? (
        <LoadingAnimation className='w-8 scale-[5] mx-auto' />
      ) : (
        <Button
          onClick={handleSubmit}
          disabled={!codeSent}
          className='max-w-[364px]'
        >
          Change Phone Number
        </Button>
      )}
    </div>
  )
}

export default PhoneSection
