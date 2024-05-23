import { useState, useEffect } from "react";
import { DateInput, Input } from "../../components/Globals";
import { ErrorToast, LoadingToast } from "../../components/Globals/toasts";
import { useParams } from "react-router-dom";
import API from "../../utils/api-client";
const TaskDetails = () => {
  const { task_id } = useParams();
  const [attachments, setAttachments] = useState([]);
  const [description, setDescription] = useState("");
  const [refusal_motif, setRefusal] = useState('')
  const [wordCount, setWordsCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const MAX_WORDS = 100;

  const fetchData = async () => {
    try {
      const res = await API.get(`/tasks/${task_id}`);
      setTitle(res.data.data.task.title);
      setDescription(res.data.data.task.description);
      setRefusal(res.data.data.task.refusal_motif)
      let count =
        res.data.data.task.description === ""
          ? 0
          : res.data.data.task.description.trim().split(/\s+/).length;
      setWordsCount(count);
      setAttachments(Object.keys(res.data.data.task.resources));
      setDate(res.data.data.task.deadline);

      setLoading(false);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      {(!loading || title) && (
        <section className='px-layout pb-8'>
          <div className='text-secondaryColor text-fs-400 font-medium'>
            Task Details
          </div>
          <p className='text-fs-300 text-thirdColor max-w-[28rem] pt-2'>
            To update a task, please provide its new title, description and
            deadline. You must also update the attachments that the project
            members must provide in order to complete the task.
          </p>
          <div className='flex gap-28'>
            <div className='max-w-[22.5rem]'>
              <div className='text-thirdColor text-fs-400 pb-3 pt-8'>
                Informations
              </div>
              <Input
                className={'pb-4'}
                icon={'note-2'}
                inputProps={{
                  placeholder: 'title',
                  defaultValue: title,
                  disabled: true,
                }}
              />
              <div
                className={`bg-secondBgColor w-[22.5rem]
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
          `}
              >
                <div className='relative w-full'>
                  <textarea
                    disabled={true}
                    value={description}
                    placeholder='Description...'
                    rows={8}
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
              <DateInput
                disabled={true}
                className={'pt-4 pb-8'}
                label={'DeadLine'}
                icon={'calendar'}
                value={date}
              />
              {refusal_motif && (
                <Input
                  className={'pb-4'}
                  icon={'note-2'}
                  inputProps={{
                    placeholder: 'Refusal Motif',
                    defaultValue: refusal_motif,
                    disabled: true,
                  }}
                />
              )}
            </div>
            <div className='min-w-[22.5rem]  text-thirdColor pt-8'>
              Required attachments
              <div>
                {attachments.map((name, index) => {
                  return (
                    <ul key={index} className='flex justify-between py-4'>
                      <li>{name}</li>
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
};

export default TaskDetails;
