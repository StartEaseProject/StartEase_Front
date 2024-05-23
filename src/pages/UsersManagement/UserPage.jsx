import { NavCard, Modal, LoadingAnimation } from '../../components/Globals'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingToast, SuccessToast } from '../../components/Globals/toasts'
import API from '../../utils/api-client'
import { routes } from '../../routes'
import UserProfileCard from '../../components/UsersManagement/UserProfileCard'
import NotFound from '../NotFound'

const UserPage = () => {
  const [isOpen, setOpen] = useState(false)
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [success, setSuccess] = useState(null)

  const closeModal = () => setOpen(false)
  const handleDisable = async () => {
    setSuccess(false)
    setLoading(true)
    try {
      const res = await API.put(`/users/disable/${id}`)
      setLoading(false)
      setSuccess(res.data.message)
      closeModal()
    } catch (error) {}
  }
  const handleEnable = async () => {
    setSuccess(true)
    setLoading(true)
    try {
      const res = await API.put(`/users/enable/${id}`)
      setLoading(false)
      setSuccess(res.data.message)
      closeModal()
    } catch (error) {}
  }

  const fetchUser = async () => {
    try {
      const res = await API.get(`/users/${id}`)
      setUser(res.data.data.user)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [success])

  return (
    <>
      {success && <SuccessToast message={success} />}
      {!loading && !user && <NotFound />}
      {loading && user && <LoadingToast />}
      {loading && !user && <LoadingAnimation className='scale-[0.5]' />}
      {user && (
        <section className='px-layout'>
          {isOpen && (
            <Modal closeModal={closeModal} title={'Confirmation'}>
              <div className='text-center pb-8 text-thirdColor'>
                Are you sure you want to{' '}
                {user.is_enabled ? 'disable' : 'enable'} this user ?
              </div>
              <div className='flex justify-between px-12 pb-4'>
                <div
                  className='text-mainGreen hover:cursor-pointer'
                  onClick={user.is_enabled ? handleDisable : handleEnable}
                >
                  Confirm
                </div>
                <div
                  className='text-mainRed hover:cursor-pointer'
                  onClick={closeModal}
                >
                  Cancel
                </div>
              </div>
            </Modal>
          )}
          <div className='pt-12'>
            <div className='flex gap-8 justify-between pr-4'>
              <UserProfileCard user={user} />
              <span
                onClick={() => {
                  setOpen(true)
                }}
                className={`${
                  !user.is_enabled
                    ? 'text-mainGreen self-center hover:cursor-pointer'
                    : ' text-mainRed self-center hover:cursor-pointer'
                }`}
              >
                {user.is_enabled ? 'Disable' : 'Enable'}
              </span>
            </div>

            <div className='pt-12 grid gap-6 w-2/5'>
              <NavCard
                text={'View informations '}
                icon={'profile'}
                link={routes.USERS.path + '/' + id + '/informations'}
              />
              <NavCard
                text={'Role management'}
                icon={'security-user'}
                link={routes.USERS.path + '/' + id + '/roles'}
              />
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default UserPage
