import Description from './Description'
import { Button, Input } from '../../Globals'
import { useRef, useState } from 'react'

const SecondStep = ({ advance, retreat, setName }) => {
  const [error, setError] = useState(null)
  const nameRegex = /^[A-Za-z]{3,}(?:[' -][A-Za-z]+)*$/
  const nameRef = useRef(null)
  const handleNext = () => {
    if (!nameRegex.test(nameRef.current.value)) {
      setError('The name should contain letters and minimum of 3')
      return
    }
    setName(nameRef.current.value)
    advance()
  }

  return (
    <div className='px-layout'>
      <Description
        title='role name'
        description='A role is a way to group permissions. Users with a given role 
            have all the roles permissions. In this step you will enter
             a name for the role. Please make sure that the is meaningful'
      />
      <Input
        isError={error}
        icon='tag-user'
        inputProps={{ placeholder: 'Role name', ref: nameRef }}
        className='mt-6 mb-2 max-w-[22.5rem]'
        onClick={() => setError(false)}
      />
      {error && <p className='text-mainRed'>{error}</p>}
      <div className='flex items-center gap-6 mt-6'>
        <Button onClick={handleNext}>Next</Button>
        <button className='font-semibold text-primaryColor' onClick={retreat}>
          return
        </button>
      </div>
    </div>
  )
}

export default SecondStep
