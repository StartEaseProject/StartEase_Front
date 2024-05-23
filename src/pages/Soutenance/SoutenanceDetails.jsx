import { useState, useEffect } from 'react'
import {
  Input,
  DropDownMenu,
  Modal,
  Icon,
  Button,
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
import { useAuth } from '../../AuthContext'
import NotFound from '../NotFound'
import API from '../../utils/api-client'
import useRedirect from '../../useRedirect'
import { routes } from '../../routes'

const SoutenanceDetails = () => {
  const redirect = useRedirect(routes.SOUTENANCE_MANAGEMENT.path)
  const redirect2 = useRedirect()
  const [success, setSuccess] = useState('')
  const { id } = useParams()
  const temp = ['memory', 'business model canvas', 'label-brevet']
  const { auth } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [soutenance, setSoutenace] = useState(null)
  const [attTypes, setAttTypes] = useState([])
  const [open, setOpen] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [file, setFile] = useState(null)
  const [attType, setAttType] = useState('')
  const [notPassed, setNotPassed] = useState(false)

  const handleOneFile = (e) => {
    setFile(e)
  }

  function handleFileUpload(event) {
    const file = event.file
    if (file.type === 'application/pdf') {
      setAttachments((prevAtt) => [...prevAtt, event])
    } else {
      alert('Please select a PDF file')
    }
  }
  function handleFileDelete(index) {
    setAttachments((prevAtt) => {
      const newAtt = [...prevAtt]
      newAtt.splice(index, 1)
      return newAtt
    })
  }
  const handleAttType = (e) => {
    setAttType(e)
  }

  const fetchSoutenace = async () => {
    setLoading(true)
    try {
      const res = await API.get(`defences/${id}`)
      setSoutenace(res.data.data.defence)
      const currentDate = new Date()
      const combinedDateTime = new Date(
        `${res.data.data.defence.date}T${res.data.data.defence.time}`
      )
      if (combinedDateTime > currentDate) {
        setHasPassed(true)
      }
      const newAtt = Object.entries(res.data.data.defence.files).map(
        ([key, value]) => ({
          file: {
            name: value.name,
            path: value.link,
          },
          type: key,
        })
      )
      const newArray = temp.filter(
        (item) => !Object.keys(res.data.data.defence.files).includes(item)
      )
      setAttTypes(newArray)
      setAttachments(newAtt)
      setLoading(false)
    } catch (e) {
      setError(e.response.data.message)
    } finally {
      setLoading(false)
    }
  }
  const handleAddFiles = async () => {
    try {
      setError('')
      setSuccess('')
      setLoading(true)
      const formData = new FormData()
      for (let i = 0; i < attachments.length; i++) {
        if (attachments[i].file.path) {
          formData.append('old_files[]', attachments[i].file.path)
        }
        if (!attachments[i].file.path) {
          formData.append('files[]', attachments[i].file)
          formData.append('files_types[]', attachments[i].type)
        }
      }

      const res = await API.post(`defences/${id}/files`, formData)
      setLoading(false)
      setSuccess(res.data.message)
      redirect2()
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
    }
  }

  const deleteThesis = async () => {
    try {
      setSuccess('')
      setError('')
      setLoading(true)
      const res = await API.delete(`/defences/${id}`)
      setLoading(false)
      setSuccess(res.data.message)
      redirect()
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchSoutenace()
  }, [])

  return (
    <>
      {success && <SuccessToast message={success} />}
      {loading && soutenance && <LoadingToast />}
      {loading && !soutenance && <LoadingAnimation className='scale-[0.5]' />}
      {error && <ErrorToast message={error} />}
      {!loading && !soutenance && <NotFound />}
      {soutenance && (
        <>
          {open && (
            <Modal title={'Add an attachment'}>
              <DropDownMenu
                iconColor={'stroke-thirdColor'}
                isEdit={true}
                label={'Attachment type'}
                title={'select a type'}
                list={attTypes}
                handleChange={handleAttType}
              />
              <label htmlFor='pdf-file'>
                <div className='py-4 text-primaryColor hover:cursor-pointer'>
                  Add attachment
                </div>
              </label>
              <input
                type='file'
                id='pdf-file'
                accept='application/pdf'
                onChange={(e) => {
                  handleOneFile(e.target.files[0])
                }}
                className='hidden '
              />
              {file && (
                <Attachment
                  name={file.name}
                  index={null}
                  isEdit={true}
                  isDownload={false}
                  isUpload={false}
                  handleDelete={handleOneFile}
                />
              )}
              <ul className='flex justify-between px-8 py-4'>
                <li
                  onClick={() => {
                    if (file && attType !== '') {
                      const data = {
                        type: attType,
                        file: file,
                      }
                      handleFileUpload(data)
                      setOpen(false)
                      const index = attTypes.indexOf(attType)
                      setAttTypes((prevT) => {
                        const newT = [...prevT]
                        newT.splice(index, 1)
                        return newT
                      })
                      setFile(null)
                    }
                  }}
                  className='text-mainGreen hover:cursor-pointer'
                >
                  Confirm
                </li>
                <li
                  onClick={() => {
                    setFile(null)
                    setOpen(false)
                  }}
                  className='text-mainRed hover:cursor-pointer'
                >
                  Cancel
                </li>
              </ul>
            </Modal>
          )}
          <section className='px-layout pb-8'>
            <div className='flex justify-between'>
              <div className='text-secondaryColor text-fs-400 font-medium'>
                View soutenance
              </div>
              {notPassed &&
                auth.permissions.find((e) => {
                  return e.name === 'delete-defence'
                }) && (
                  <button
                    onClick={() => {
                      if (
                        confirm('Are you sure you want to delete this defence?')
                      ) {
                        deleteThesis()
                      } else {
                      }
                    }}
                    className='text-mainRed pr-16'
                  >
                    Delete defence
                  </button>
                )}
            </div>

            <p className='text-fs-300 text-thirdColor max-w-[26rem] pt-2'>
              Here are the defence details. A defence has a date, time, place
              and jury members. The jury is constituted of a president, 3
              examinators, the supervisor/co-supervisor and a guest.
            </p>
            <div className='flex mx-auto justify-between pt-8'>
              <div className='flex flex-col gap-8 max-w-[22.5rem]'>
                <Input
                  label={'Date'}
                  icon={'calendar'}
                  inputProps={{
                    defaultValue: soutenance.date,
                    placeholder: 'Enter the class',
                    disabled: true,
                  }}
                />
                <Input
                  label={'Time'}
                  icon={'clock'}
                  inputProps={{
                    defaultValue: soutenance.time,
                    placeholder: 'Enter the class',
                    disabled: true,
                  }}
                />
                {soutenance.room.name && (
                  <Input
                    label={'Class'}
                    icon={'house-2'}
                    inputProps={{
                      defaultValue: soutenance.room.name,
                      placeholder: 'Enter the class',
                      disabled: true,
                    }}
                  />
                )}
                {soutenance.other_place && (
                  <Input
                    label={'Other'}
                    icon={'house-2'}
                    inputProps={{
                      defaultValue: soutenance.other_place,
                      placeholder: 'Enter an other place',
                      disabled: true,
                    }}
                  />
                )}

                <DropDownMenu
                  list={[]}
                  title={soutenance.mode}
                  label={'Mode'}
                  icon={'setting-2'}
                  iconColor={'stroke-thirdColor'}
                  isEdit={false}
                />
                <DropDownMenu
                  list={[]}
                  title={soutenance.nature}
                  label={'Nature'}
                  icon={'setting-2'}
                  iconColor={'stroke-thirdColor'}
                  isEdit={false}
                />
                <div className='text-fs-400 text-thirdColor pb-10'>
                  {Object.entries(soutenance.files).length !== 0 &&
                    auth.permissions.find((e) => {
                      return e.name === 'upload-files-defence'
                    }) && (
                      <div>
                        <div className='flex justify-between'>
                          <p>Attachments</p>
                          {auth.permissions.find((e) => {
                            return e.name === 'upload-files-defence'
                          }) && (
                            <div
                              onClick={() => {
                                setOpen(true)
                              }}
                            >
                              <Icon
                                icon={'add'}
                                className={
                                  'stroke-primaryColor hover:cursor-pointer'
                                }
                              />
                            </div>
                          )}
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
                            filePath={
                              attachment?.file.path
                                ? attachment.file.path
                                : URL.createObjectURL(attachment.file)
                            }
                            name={attachment.file.name}
                            isEdit={auth.permissions.find((e) => {
                              return e.name === 'upload-files-defence'
                            })}
                            isDownload={
                              !auth.permissions.find((e) => {
                                return e.name === 'upload-files-defence'
                              })
                            }
                            isUpload={false}
                            handleDelete={() => {
                              handleFileDelete(index)
                              setAttTypes((prevT) => [
                                ...prevT,
                                attachment.type,
                              ])
                            }}
                            index={index}
                          />
                        </li>
                      )
                    })}
                  </ul>
                  {attachments.length !== 0 && (
                    <Button className={'mt-8'} onClick={handleAddFiles}>
                      Save
                    </Button>
                  )}
                </div>
              </div>
              <div className='text-thirdColor text-fs-400 pr-[10rem]'>
                <div className='py-2'>
                  <p className='pb-2'>President</p>

                  <PersonRow
                    email={soutenance.jurys.president.email}
                    pic={soutenance.jurys.president.photo_url}
                    index={''}
                    isDelete={true}
                  />
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
                  {soutenance.jurys.examiners.map((e, index) => {
                    return (
                      <PersonRow
                        key={index}
                        pic={e.photo_url}
                        email={e.email}
                        isDelete={true}
                      />
                    )
                  })}
                </div>
                {soutenance.guest && (
                  <div className='py-2'>
                    <p className='pb-2'>Guest</p>

                    <Input
                      label='Guest'
                      inputProps={{
                        disabled: true,
                        defaultValue: soutenance.guest,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default SoutenanceDetails
