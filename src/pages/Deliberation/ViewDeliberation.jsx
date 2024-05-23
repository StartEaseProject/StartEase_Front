import { Input, DropDownMenu, Button, LoadingAnimation } from "../../components/Globals";
import PersonRow from "../Project management/PersonRow";
import Attachment from "../Project management/Attachement";
import API from "../../utils/api-client";
import { useParams } from "react-router-dom";
import { ErrorToast, LoadingToast } from "../../components/Globals/toasts";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import NotFound from "../NotFound";

const ViewDelibearion = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { auth } = useAuth()
  const [deliberation, setDeliberation] = useState(null);

  const fetchData = async () => {
    try {
        const res = await API.get('/deliberations/'+id)
        setDeliberation(res.data.data.deliberation)
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
    <section className='px-layout pb-8'>
      {loading && <LoadingAnimation className='scale-[0.5]' />}
      {!loading && !deliberation && <NotFound />}
      {deliberation && (
        <>
          {' '}
          <div className='text-secondaryColor text-fs-400 font-medium'>
            View Deliberation
          </div>
          <p className='text-fs-300 text-thirdColor max-w-[28rem] pt-2'>
            This is the deliberation result. You will find each member mark down
            below.
          </p>
          <div className='flex gap-[17rem] items-start'>
            <div className='grid gap-6 mt-[3rem] max-w-[22.7rem]'>
              <h3 className='text-thirdColor'>
                The Innovative Idea of The Project
              </h3>
              <Input
                inputProps={{
                  value: deliberation.project.trademark_name,
                  disabled: true,
                }}
                icon='strongbox'
                className={`max-w-[22.7rem]`}
              />
              <Input
                inputProps={{
                  value: deliberation.project.scientific_name,
                  disabled: true,
                }}
                icon='cpu'
                className={`max-w-[22.7rem]`}
              />
              {deliberation.members.map((member, index) => {
                return (
                  <div
                    key={member.id}
                    className='grid gap-[1.3rem] max-w-[22.7rem] mt-8'
                  >
                    <h3>{member.first_name + ' ' + member.last_name} member</h3>
                    <PersonRow email={member.email} isDelete={true} />
                    <Input
                      label='Mark'
                      inputProps={{
                        value: member.mark,
                        disabled: true,
                      }}
                      icon='document-text'
                      className='max-w-[22.7rem]'
                    />
                    <Input
                      label='Mention'
                      inputProps={{
                        value: member.mention,
                        disabled: true,
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
                          value={member.appreciation}
                          disabled={true}
                          rows={5}
                          className={`focus:outline-0  disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor
                text-secondaryColor caret-secondaryColor
                `}
                        />
                        <span className={` absolute bottom-0 right-10 `}></span>
                      </div>
                    </div>
                    {auth.permissions.find(
                      (e) => e.name === 'print-defence'
                    ) && (
                      <Attachment
                        title={'Diploma'}
                        name={member.first_name + ' ' + member.last_name}
                        isEdit={false}
                        isUpload={false}
                        isDownload={true}
                        filePath={member.diploma_url}
                      />
                    )}
                  </div>
                )
              })}
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
                    value={deliberation.reserves || 'Empty'}
                    disabled={true}
                    rows={5}
                    className={`focus:outline-0  disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor
                text-secondaryColor caret-secondaryColor
                `}
                  />
                  <span className={` absolute bottom-0 right-10 `}></span>
                </div>
              </div>
              {/* <Attachment
                title={'Thesis Defence PV'}
                name='PV'
                isEdit={false}
                isUpload={false}
                isDownload={true}
                filePath={""}
              /> */}
            </div>
          </div>
        </>
      )}
    </section>
  )
};

export default ViewDelibearion;
