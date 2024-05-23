import { useState, useEffect } from 'react'
import {
  Input,
  DropDownMenu,
  Button,
  DateInput,
  LoadingAnimation,
} from '../../components/Globals'
import PersonRow from '../Project management/PersonRow'
import Attachment from '../Project management/Attachement'
import { useParams } from 'react-router-dom'
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from '../../components/Globals/toasts'
import NotFound from '../NotFound'
import API from '../../utils/api-client'
import TimeInput from '../../components/Globals/TimeInput'
import AddInput from '../Project management/AddInput'
import useRedirect from '../../useRedirect'
import { routes } from '../../routes'

const UpdateSoutenance = () => {
  const redirect = useRedirect(routes.SOUTENANCE_MANAGEMENT.path)
  const [success, setSuccess] = useState('')
  const [defaultTime, setDefault] = useState('')
  const { id } = useParams()
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [room, setRoom] = useState('')
  const [place, setPlace] = useState('')
  const [mode, setMode] = useState('')
  const [nature, setNature] = useState('')
  const [president, setPresident] = useState('')
  const [testers, setTesters] = useState([])
  const [invited, setInvited] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [soutenance, setSoutenace] = useState(null)
  const [attachments, setAttachments] = useState([])
  const [rooms, setRooms] = useState([])

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setSuccess('')
      setError('')
      const data = {
        date: date,
        time: time,
        room_id: room,
        other_place: place,
        mode: mode,
        nature: nature,
        president: president,
        examiners: testers,
        guest: invited,
      }
      const res = await API.put(`/defences/${id}`, data)
      setLoading(false)
      setSuccess(res.data.message)
      redirect()
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
    }
  }

  const handleRooms = (e) => {
    const room = rooms.find((room) => room.name === e)

    setRoom(room.id)
  }

  const handlePresident = (e) => {
    setPresident(e)
  }
  const handleInvited = (e) => {
    setInvited(e)
  }

  const handleDate = (e) => {
    const date = new Date(e)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${
      day < 10 ? '0' : ''
    }${day}`
    setDate(formattedDate)
  }
  const handleMode = (e) => {
    setMode(e)
  }
  const handleNature = (e) => {
    setNature(e)
  }
  const handleAddTesters = (e) => {
    setTesters((prev) => [...prev, e])
  }
  const handleDeleteTesters = (index) => {
    setTesters((prev) => {
      const newTeam = [...prev]
      newTeam.splice(index, 1)
      return newTeam
    })
  }

  const convertTimeStringToDate = (timeString) => {
    const [time, period] = timeString.split(' ')
    const [hours, minutes] = time.split(':')

    let date = new Date()
    date.setHours(
      period === 'PM' && parseInt(hours) !== 12
        ? parseInt(hours) + 12
        : parseInt(hours)
    )
    date.setMinutes(parseInt(minutes))
    date.setSeconds(0)
    date.setMilliseconds(0)
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    return date
  }
  const handleTime = (e) => {
    const date = e.$d
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
    const newdate = new Date(`01/01/2000 ${formattedTime}`)
    const newformattedTime = newdate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    setTime(newformattedTime)
  }
  const fetchSoutenace = async () => {
    setLoading(true)
    try {
      const res = await API.get(`defences/${id}`)
      const response = await API.get(`rooms`)
      setRooms(response.data.data.rooms)
      setSoutenace(res.data.data.defence)
      setDate(res.data.data.defence.date)

      setTime(res.data.data.defence.time)

      setDefault(convertTimeStringToDate(res.data.data.defence.time))
      setRoom(res.data.data.defence.room.name)
      setPlace(res.data.data.defence.other_place)
      setMode(res.data.data.defence.mode)
      setNature(res.data.data.defence.nature)
      setInvited(res.data.data.defence.guest || '')
      setPresident(res.data.data.defence.jurys.president.email)
      setTesters(
        res.data.data.defence.jurys.examiners.map((e) => {
          return e.email
        })
      )
      const newAtt = Object.entries(res.data.data.defence.files).map(
        ([key, value]) => ({
          file: {
            name: value.name,
            path: value.link,
          },
          type: key,
        })
      )
      setAttachments(newAtt)
      setLoading(false)
    } catch (e) {
      setError(e.response.data.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSoutenace()
  }, [])
  return (
    <>
      {success && <SuccessToast message={success} />}
      {loading && !soutenance && <LoadingAnimation className='scale-[0.5]' />}
      {loading && soutenance && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      {!loading && !soutenance && <NotFound />}
      {soutenance && (
        <>
          <section className='px-layout pb-8'>
            <div className='text-secondaryColor text-fs-400 font-medium'>
              Update soutenance
            </div>
            <p className='text-fs-300 text-thirdColor max-w-[26rem] pt-2'>
              These are the observations of this project. When updating the
              progress, the supervisor can add an observation.
            </p>
            <div className='flex mx-auto justify-between pt-8'>
              <div className='flex flex-col gap-8 max-w-[22.5rem]'>
                <DateInput
                  handleChange={handleDate}
                  label={'Date'}
                  icon={'calendar'}
                  value={date}
                />
                <TimeInput
                  disabled={false}
                  handleChange={handleTime}
                  label={'Time'}
                  icon={'clock'}
                  value={defaultTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                />

                <DropDownMenu
                  defaultTitle={'Select the room'}
                  isdelete={true}
                  handleChange={handleRooms}
                  title={room ? room : 'Select the room'}
                  label={'Room'}
                  icon={'house-2'}
                  iconColor={'stroke-thirdColor'}
                  isEdit={true}
                  list={rooms.map((room) => room.name)}
                />

                <Input
                  onChange={(e) => {
                    setPlace(e.target.value)
                  }}
                  label={'Other'}
                  icon={'house-2'}
                  inputProps={{
                    defaultValue: place,
                    placeholder: 'Enter an other place',
                  }}
                />

                <DropDownMenu
                  list={['on site', 'remote']}
                  title={mode}
                  label={'Mode'}
                  icon={'setting-2'}
                  iconColor={'stroke-thirdColor'}
                  isEdit={true}
                  handleChange={handleMode}
                />
                <DropDownMenu
                  list={['open', 'closed']}
                  title={nature}
                  label={'Nature'}
                  icon={'setting-2'}
                  iconColor={'stroke-thirdColor'}
                  isEdit={true}
                  handleChange={handleNature}
                />
                <div className='text-fs-400 text-thirdColor pb-10'>
                  {Object.entries(soutenance.files).length !== 0 && (
                    <div>
                      <div className='flex justify-between'>
                        <p>Attachments</p>
                      </div>
                      <p className='text-fs-300 pt-2 pb-4'>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                  )}

                  <ul className='flex flex-col gap-5'>
                    {attachments.map((attachment, index) => {
                      return (
                        <li key={attachment.type}>
                          <Attachment
                            title={attachment.type}
                            filePath={attachment?.file.path}
                            name={attachment.file.name}
                            isEdit={false}
                            isDownload={true}
                            isUpload={false}
                            index={index}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <Button onClick={handleSubmit} className={'-mt-16'}>
                  Save
                </Button>
              </div>
              <div className='text-thirdColor text-fs-400 pr-[10rem]'>
                <div className='py-2'>
                  <p className='pb-2'>President</p>
                  {president && (
                    <PersonRow email={president} index={''} isDelete={false} />
                  )}

                  {!president && <AddInput handleChange={handlePresident} />}
                </div>
                <div className='py-2'>
                  <p className='pb-2'>Supervisor</p>

                  <PersonRow
                    email={soutenance.jurys.supervisor.email}
                    pic={soutenance.jurys.supervisor.photo_url}
                    index={''}
                    isDelete={true}
                  />
                </div>
                <div className='py-2'>
                  <p className='pb-2'>Co-Supervisors</p>
                  {soutenance.jurys.co_supervisor && (
                    <PersonRow
                      email={soutenance.jurys.co_supervisor.email}
                      pic={soutenance.jurys.co_supervisor.photo_url}
                      isDelete={true}
                    />
                  )}
                </div>
                <div className='py-2'>
                  <p className='pb-2'>Testers</p>
                  {testers.map((e, index) => {
                    return (
                      <PersonRow
                        handleDelete={handleDeleteTesters}
                        key={index}
                        email={e}
                        isDelete={false}
                      />
                    )
                  })}
                  {testers.length < 3 && (
                    <AddInput handleChange={handleAddTesters} />
                  )}
                </div>

                <div className='py-2'>
                  <p className='pb-2'>Guest</p>
                  {invited && (
                    <PersonRow
                      handleDelete={handleInvited}
                      email={invited}
                      isDelete={false}
                    />
                  )}
                </div>

                {!invited && <AddInput handleChange={handleInvited} />}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default UpdateSoutenance
