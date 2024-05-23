import logo from '../../assets/globals/logo.svg'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, LoadingAnimation } from '../Globals'
import back from '../../assets/Icons/arrow-left.svg'
import API from '../../utils/api-client'
import { routes } from '../../routes'

const ResetPasswordCodePin = ({ advance, email, changeCode }) => {
  const codeRef = useRef('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNext = async () => {
    if (codeRef.current.trim() == '') {
      setError('Please enter a valid code')
      return
    } else {
      setError('')
      setLoading(true)
      let code = codeRef.current.trim()
      try {
        await API.post('/forgotpassword/verify', { email, code })
        setLoading(false)
        changeCode(code)
        advance()
      } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
      }
    }
  }

  return (
    <section className='relative bg-bgColor min-h-screen  '>
      <div className=' absolute bottom-0 left-1/2 transform -translate-x-1/2'>
        <div className='rounded-tl-lg rounded-tr-lg px-6 shadow-default mx-auto grid justify-items-center gap-4 
          bg-white min-w-[46.25rem] py-8'>
          <img src={logo} alt='StartEase' className='pt-8' />
          <div className=' text-fs-700 text-secondaryColor'>Reset Password</div>
          <div className='w-2/3 text-center text-thirdColor text-fs-400'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <div className='grid gap-4'>
            <Input
              label={'Code Pin'}
              icon='pin'
              isError={error}
              onChange={(e) => {
                codeRef.current = e.target.value
              }}
              inputProps={{
                placeholder: 'Enter your code pin',
                type: 'number',
              }}
              className={'pb-2'}
            />

            {error ? (
              <div className=' pb-8 -mt-4 self-end  text-mainRed text-fs-400 hover:cursor-pointer'>
                {error}
              </div>
            ) : (
              <></>
            )}

            <div className='pb-8'>
              {loading ? (
                <LoadingAnimation className='w-8 scale-[5] mx-auto' />
              ) : (
                <Button onClick={handleNext}>Validate</Button>
              )}
            </div>
            <ul className='justify-self-center text-primaryColor text-fs-400 hover:cursor-pointer pb-16 inline-flex gap-2 '>
              <li>
                {' '}
                <img src={back} alt='go-back' />{' '}
              </li>
              <li>
                {' '}
                <Link to={routes.LOGIN.path}>Go back to login</Link>{' '}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPasswordCodePin
