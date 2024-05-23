import { useParams } from 'react-router-dom'
import { Input, DropDownMenu, Button, LoadingAnimation } from '../../components/Globals'
import { ErrorToast, LoadingToast, SuccessToast } from '../../components/Globals/toasts'
import API from '../../utils/api-client'
import PersonRow from '../Project management/PersonRow'
import { useEffect, useState } from 'react'
import useRedirect from '../../useRedirect'
import { routes } from '../../routes'

const AddDelibearion = () => {
  const redirect = useRedirect(routes.SOUTENANCE_MANAGEMENT.path)
  const [wordCount, setWordsCount] = useState(0)
  const MAX_WORDS = 25
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [defence, setDefence] = useState(null)
  const [reserves, setReserves] = useState('')
  const [members, setMembers] = useState(null)

  const changeAtt = (indexx, att, value) => {
    setMembers((prevMembers) => {
      return prevMembers.map((m, index) => {
        if (index === indexx) {
          return {
            ...m,
            [att]: value,
          }
        }
        return m
      })
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const res = await API.post('/deliberations/' + id, {data:members, reserves})
      console.log(res.data.data.deliberation);
      setSuccess(res.data.message)
      redirect()
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async () => {
    try {
      const res = await API.get('/defences/' + id)
      setDefence(res.data.data.defence)
      setMembers(
        res.data.data.defence.project.members.map((m) => {
          return {
            member_id: m.id,
            mark: '',
            mention: '',
            appreciation: '',
          }
        })
      )
    } catch (e) {
      console.log(e);
      setError(e.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <form className='px-layout pb-8' onSubmit={handleSubmit}>
      {loading && defence && <LoadingToast />}
      {loading && !defence && <LoadingAnimation className='scale-[0.5]' />}
      {error && <ErrorToast message={error} />}
      {success && <SuccessToast message={success} />}
      {defence && (
        <>
          <div className='text-secondaryColor text-fs-400 font-medium'>
            Add Deliberation
          </div>
          <p className='text-fs-300 text-thirdColor max-w-[28rem] pt-2'>
            To add a deliberation, please enter each member’s mark, mention and
            appreciation. If there are any reserves to be corrected, please
            provide them.
          </p>
          <div className='flex gap-[17rem] items-start'>
            <div className='grid gap-6 mt-[3rem] max-w-[22.7rem]'>
              <h3 className='text-thirdColor'>
                The Innovative Idea of The Project
              </h3>
              <Input
                inputProps={{
                  value: defence.project.trademark_name,
                }}
                icon='strongbox'
                className={`max-w-[22.7rem]`}
              />
              <Input
                inputProps={{
                  value: defence.project.scientific_name,
                  disabled: true,
                }}
                icon='cpu'
                className={`max-w-[22.7rem]`}
              />
              {defence.project.members.map((member, index) => {
                return (
                  <div
                    key={member.id}
                    className='grid gap-[1.3rem] max-w-[22.7rem] mt-8'
                  >
                    <h3>
                      {!member.first_name
                        ? 'Member'
                        : member.first_name + ' ' + member.last_name}{' '}
                      member
                    </h3>
                    <PersonRow email={member.email} isDelete={true} />
                    <Input
                      label='Mark'
                      inputProps={{
                        value: members[index].mark,
                        onChange: (e) =>
                          changeAtt(index, 'mark', e.target.value),
                      }}
                      icon='document-text'
                      className='max-w-[22.7rem]'
                    />
                    <Input
                      label='Mention'
                      inputProps={{
                        value: members[index].mention,
                        onChange: (e) =>
                          changeAtt(index, 'mention', e.target.value),
                      }}
                      icon='task-square'
                      className='max-w-[22.7rem]'
                    />
                    <div>
                      <div>
                        <div className='text-thirdColor text-fs-400'>
                          Appreciation
                        </div>
                        <p className='text-fs-300 text-thirdColor max-w-[28rem] pt-2'>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </p>
                      </div>
                    </div>
                    <div
                      className={`bg-secondBgColor w-[22.5rem]
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
          `}
                    >
                      <div className='relative w-full'>
                        <textarea
                          value={members[index].appreciation}
                          onChange={(e) =>
                            changeAtt(index, 'appreciation', e.target.value)
                          }
                          rows={5}
                          className={`focus:outline-0  disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor
                text-secondaryColor caret-secondaryColor
                `}
                        />
                        <span className={` absolute bottom-0 right-10 `}></span>
                      </div>
                    </div>
                  </div>
                )
              })}
              <Button className='mt-4'>Submit</Button>
            </div>
            <div className='grid gap-6 mt-[3rem] max-w-[22.7rem]'>
              <div>
                <div>
                  <div className='text-thirdColor text-fs-400'>
                    Reservation (Optionel)
                  </div>
                  <p className='text-fs-300 text-thirdColor max-w-[28rem] pt-2'>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
              <div
                className={`bg-secondBgColor w-[22.5rem]
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
          `}
              >
                <div className='relative w-full'>
                  <textarea
                    placeholder='Reservation...'
                    value={reserves}
                    onChange={(e) => setReserves(e.target.value)}
                    rows={5}
                    className={`focus:outline-0  disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor
                text-secondaryColor caret-secondaryColor
                `}
                  />
                  <span
                    className={` absolute bottom-0 right-10 ${
                      wordCount > MAX_WORDS ? 'text-mainRed' : 'text-thirdColor'
                    }`}
                  >
                    {wordCount} - {MAX_WORDS} words
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  )
}

export default AddDelibearion
