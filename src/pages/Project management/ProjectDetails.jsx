import { Input } from '../../components/Globals'
import Attachment from './Attachement'
import API from '../../utils/api-client'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ErrorToast, LoadingToast } from '../../components/Globals/toasts'

const ProjectDetails = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [project, setProject] = useState(null)
  const [team, setTeam] = useState([])
  const [files, setFiles] = useState(null)
  const fetchData = async () => {
    try {
      if (id) {
        const res = await API.get(`projects/${id}`)
        console.log(res.data)
        setProject(res.data.data.project)
        setTeam(res.data.data.project.members)
        const newAtt = Object.entries(res.data.data.project.files)
          .map(([key, value]) => {
            if (key !== 'thesis defence authorization file') {
              return {
                file: {
                  name: value.name,
                  path: value.link,
                },
                type: key,
              }
            }
            return null
          })
          .filter((item) => item !== null)
        setFiles(newAtt)
        setLoading(false)
      } else {
        const res = await API.get(`projects/my`)
        setProject(res.data.data.project)
        setTeam(res.data.data.project.members)
        const newAtt = Object.entries(res.data.data.project.files).map(
          ([key, value]) => ({
            file: {
              name: value.name,
              path: value.link,
            },
            type: key,
          })
        )
        setFiles(newAtt)
        setLoading(false)
      }
    } catch (e) {
      setError(e.response.data.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      {!loading && (
        <section className='px-layout flex gap-20 pt-4 pb-8'>
          <div className='max-w-[22.5rem] flex flex-col gap-6'>
            <Input
              label={'Domicile establishment'}
              inputProps={{
                value: project.establishment.name,
                disabled: true,
              }}
              icon='house'
            />
            <Input
              label={'Project type'}
              inputProps={{
                value: project.type,
                disabled: true,
              }}
              icon='teacher'
            />
            <Input
              label={'Trademark name'}
              inputProps={{
                value: project.trademark_name,
                disabled: true,
              }}
              icon='strongbox'
            />
            <Input
              label={'Scientific name of the innovative product'}
              inputProps={{
                value: project.scientific_name,
                disabled: true,
              }}
              icon='cpu'
            />
            <div className='text-fs-400 text-thirdColor'>
              Summary of the project
              <p className='text-fs-300 pt-2 pb-4'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <div
                className={`bg-secondBgColor 
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
          `}
              >
                <textarea
                  value={project.resume}
                  rows={5}
                  disabled={true}
                  className={`disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor
                text-secondaryColor caret-secondaryColor
                `}
                />
              </div>
            </div>

            {Object.keys(files).length !== 0 && (
              <div className='text-fs-400 text-thirdColor pb-10'>
                attachments
                <p className='text-fs-300 pt-2 pb-4'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <ul className='flex flex-col gap-5'>
                  {files.map((attachment, index) => {
                    return (
                      <li key={attachment.type} className='py-2'>
                        <Attachment
                          title={attachment.type}
                          filePath={
                            attachment?.file.path
                              ? attachment.file.path
                              : URL.createObjectURL(attachment.file)
                          }
                          name={attachment.file.name}
                          isEdit={false}
                          isDownload={true}
                          isUpload={false}
                          handleDelete={() => {
                            handleFileDelete(index)
                            setAttTypes((prevT) => [...prevT, attachment.type])
                          }}
                          index={index}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className='min-w-[22.5rem] flex flex-col gap-8 text-thirdColor'>
            <div>
              Management Team
              <div className='text-fs-200 py-2'>
                Supervisor
                <ul className=' flex gap-4 items-center text-fs-400 text-secondaryColor py-2'>
                  <li>
                    <img
                      src={project.supervisor.photo_url}
                      className={`w-10 h-10 rounded-full object-cover`}
                    />
                  </li>
                  <li className='self-center overflow-hidden whitespace-nowrap overflow-ellipsis'>
                    {project.supervisor.email}
                  </li>
                </ul>
              </div>
              {project?.co_supervisor && (
                <div className='text-fs-200 py-2'>
                  Supervisor assistant
                  <ul className=' flex gap-4 items-center text-fs-400 text-secondaryColor py-2'>
                    <li>
                      <img
                        src={project?.co_supervisor.photo_url}
                        className={`w-10 h-10 rounded-full object-cover`}
                      />
                    </li>
                    <li className='self-center overflow-hidden whitespace-nowrap overflow-ellipsis'>
                      {project?.co_supervisor.email}
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className='min-w-[22.5rem]  text-thirdColor'>
              Project Team
              <div>
                {team.map((member, index) => {
                  return (
                    <ul
                      key={index}
                      className=' flex gap-4 items-center text-fs-400 text-secondaryColor py-2'
                    >
                      <li>
                        <img
                          src={member.photo_url}
                          className={`w-10 h-10 rounded-full object-cover`}
                        />
                      </li>
                      <li className='self-center overflow-hidden whitespace-nowrap overflow-ellipsis'>
                        {member.email}
                      </li>
                    </ul>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ProjectDetails
