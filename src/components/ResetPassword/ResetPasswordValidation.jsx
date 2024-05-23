import logo from '../../assets/globals/logo.svg'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, LoadingAnimation, PasswordInput } from '../Globals'
import API from '../../utils/api-client'
import { SuccessToast } from '../Globals/toasts'
import { useAuth } from '../../AuthContext'

const ResetPasswordValidation = ({ email, code }) => {
  const { authenticate } = useAuth()
  const newPasswordRef = useRef('')
  const confirmPasswordRef = useRef('')
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const redirect = useNavigate()
  const handleSubmit = async () => {
    let password = newPasswordRef.current.trim()
    let confirm_password = confirmPasswordRef.current.trim()
    setError('')
    if (
      newPasswordRef.current.trim() == '' ||
      confirmPasswordRef.current.trim() == ''
    ) {
      setError('Password cant be empty')
      return
    }
    if (
      newPasswordRef.current.trim().length < 8 ||
      confirmPasswordRef.current.trim().length < 8
    ) {
      setError("Password can't be less than 8 characters.")
    } else if (
      newPasswordRef.current.trim() !== confirmPasswordRef.current.trim()
    ) {
      setError('Wrong confirmation')
    }
    if (error === '') {
      try {
        setLoading(true)

        await API.post('/forgotpassword/reset', {
          email,
          code,
          password,
          confirm_password,
        })
        setLoading(false)
        setSuccess(true)
        await authenticate(email, password)
        redirect('/settings/profile')
      } catch (error) {
        setLoading(false)
        setError(error.response.data.message)
      }
    }
  }

  return (
    <section className='relative bg-bgColor min-h-screen '>
      {success && (
        <SuccessToast message={'Password has been updated successfully!'} />
      )}
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 '>
        <div className='rounded-tl-lg rounded-tr-lg px-6 shadow-default mx-auto grid 
          justify-items-center gap-4 bg-white min-w-[46.25rem] py-8'>
          <img src={logo} alt='StartEase' className='pt-8' />
          <div className=' text-fs-700 text-secondaryColor -mt-4'>
            Reset password
          </div>
          <div className='w-2/3 text-center text-thirdColor text-fs-400'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. the printing and typesetting industry.
          </div>
          <div className='grid gap-4'>
            <PasswordInput
              label={'New Password'}
              isError={error}
              className={'pb-4'}
              onChange={(e) => {
                newPasswordRef.current = e.target.value
              }}
              inputProps={{ placeholder: 'Password' }}
            />
            <PasswordInput
              label={'Confirm Password'}
              isError={error}
              className={'pb-4'}
              onChange={(e) => {
                confirmPasswordRef.current = e.target.value
              }}
              inputProps={{ placeholder: 'Password' }}
            />
            {error ? (
              <div className='-mt-4 pb-4 self-end  text-mainRed text-fs-400 hover:cursor-pointer'>
                {error}
              </div>
            ) : (
              <></>
            )}

            <div className='pb-8 pt-4'>
              {loading ? (
                <LoadingAnimation className='w-8 scale-[5] mx-auto' />
              ) : (
                <Button onClick={handleSubmit}>Reset Password</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPasswordValidation
