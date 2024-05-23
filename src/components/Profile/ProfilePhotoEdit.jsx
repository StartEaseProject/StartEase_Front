import { Icon } from '../Globals'
import { useAuth } from '../../AuthContext'
import { useState } from 'react'
import { ErrorToast, LoadingToast, SuccessToast } from '../Globals/toasts'

const ProfilePhotoEdit = ({ className }) => {
  const { auth, updatePhoto } = useAuth()
  const [image, setImage] = useState(null)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePicture = (event) => {
    setImage(event.target.files[0])
  }

  const handleSave = async () => {
    setError(null)
    setSuccess(null)
    if (!image) return
    setLoading(true)
    const { success, error } = await updatePhoto(image)
    if (success) setSuccess(success)
    if (error) setError(error)
    setLoading(false)
  }

  return (
    <div className='flex gap-32 items-center'>
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast message={loading} />}
      <div className={`flex gap-4 items-center ` + className}>
        <div className='flex justify-center items-center w-[78px] h-[76px] relative'>
          <img
            src={image ? URL.createObjectURL(image) : auth?.photo_url}
            alt='Selected Image'
            className='w-20 h-20 rounded-full object-cover'
          />

          <label
            htmlFor='file-upload'
            className='flex justify-center items-center rounded-full absolute w-5 h-5 border-[1px]
              bg-primaryColor top-[70%] left-[70%] hover:cursor-pointer'
          >
            <Icon
              icon='edit-2'
              className='fill-transparent stroke-bgColor
                group-hover:stroke-white shrink-0 duration-500 w-[11px]'
            />

            <input
              onChange={handlePicture}
              id='file-upload'
              type='file'
              className='hidden appearance-none'
            />
          </label>
        </div>
        <ul>
          <li className='text-fs-400 font-medium text-secondaryColor capitalize'>
            {auth?.person
              ? `${auth?.person?.last_name} ${auth?.person?.first_name}`
              : 'Super Admin'}
          </li>
          <li className='text-thirdColor text-fs-400'>
            Update your details informations
          </li>
        </ul>
      </div>
      {image && (
        <button
          className='font-semibold text-primaryColor'
          onClick={handleSave}
          disabled={loading}
        >
          Save
        </button>
      )}
    </div>
  )
}
export default ProfilePhotoEdit
