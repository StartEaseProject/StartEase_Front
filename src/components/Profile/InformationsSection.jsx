import { useState } from 'react'
import { Input } from '../Globals'
import { useAuth } from '../../AuthContext'
import { ErrorToast, SuccessToast } from '../Globals/toasts'
import UpdateUsername from './UpdateUsername'

const InformationsSection = ({ className }) => {
  const { auth } = useAuth()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  return (
    <div className={`flex flex-col grow gap-3 ` + className}>
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      <h3 className='text-thirdColor'>Informations</h3>
      <div className='flex flex-col gap-[22px] max-w-[365px]'>
        <div className='relative flex'>
          <Input
            className='grow'
            inputProps={{
              value: auth?.username,
              disabled: true,
            }}
            icon='tag-user'
            
          />
          {/* <button
            onClick={openModal}
            className='text-primaryColor absolute self-center right-3 font-medium'
          >
            change
          </button> */}
        </div>
        <Input
          inputProps={{
            value: auth?.birthday,
            disabled: true,
          }}
          icon='calendar'
        />
      </div>

      {/* {modalIsOpen && (
        <UpdateUsername
          closeModal={closeModal}
          setError={setError}
          setSuccess={setSuccess}
          error={error}
        />
      )} */}
    </div>
  )
}

export default InformationsSection
