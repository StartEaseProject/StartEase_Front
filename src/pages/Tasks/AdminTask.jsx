import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Icon } from "../../components/Globals";
import API from "../../utils/api-client";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import { useAuth } from "../../AuthContext";
const AdminTask = ({
  canDelete,
  canUpdate,
  canValidate,
  title,
  description,
  status,
  attachments,
  deadline,
  id,
  handleDelteTask,
  index,
  taskIndex,
}) => {
  const [thisStatus, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { auth } = useAuth()
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleDelte = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      const res = await API.delete(`/tasks/${id}`);
      setLoading(false);
      setSuccess(res.data.message);
      handleDelteTask(index, taskIndex);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const handleApprove = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      const res = await API.put(`/tasks/${id}/validate`, {
        validated: true,
      });
      setStatus("completed");
      setLoading(false);
      setSuccess(res.data.message);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      {success && <SuccessToast message={success} />}
      <li className='w-[34rem] border- rounded-lg shadow-custom text-secondaryColor px-4 py-4'>
        <div className='flex justify-between gap-4'>
          <h3 className="grow overflow-hidden">{title}</h3>
          {status === 'completed' ||
          status === 'pending' ||
          thisStatus === 'completed' ? (
            <div
              className={`${
                status === 'completed' ? 'text-mainGreen' : 'text-mainPending'
              } 
            `}
            >
              {status}
            </div>
          ) : (
            <div className='flex flex-col text-right'>
              {canUpdate && (
                <button
                  onClick={() => {
                    navigate(`${id}/edit`)
                  }}
                  className='text-primaryColor self-end'
                >
                  Edit
                </button>
              )}
              <div
                className={`text-mainPending 
            `}
              >
                {status}
              </div>
            </div>
          )}
        </div>

        <p
          className={`text-thirdColor pt-2 
           line-clamp-2 
          `}
        >
          {description}
        </p>

        <button
          className=' text-primaryColor hover:underline pb-2'
          onClick={() => {
            navigate(`${id}`)
          }}
        >
          View More
        </button>

        <h3>Required attachments</h3>
        <ul className='text-thirdColor pb-4 pt-2'>
          {attachments.map((e, index) => {
            return <li key={index}>{e}</li>
          })}
        </ul>

        {status !== 'completed' && thisStatus !== 'completed' ? (
          <div className='flex justify-between py-2'>
            <div className='flex gap-3'>
              {canDelete && (
                <>
                  <Icon
                    onClick={() => {
                      if (
                        confirm('Are you sure you want to delete this task?')
                      ) {
                        handleDelte()
                      } else {
                      }
                    }}
                    icon={'trash'}
                    className={'stroke-primaryColor hover:cursor-pointer'}
                  />
                  
                </>
              )}

              {status !== 'in progress' && (
                <button
                  onClick={() => {
                    navigate(`${id}/submission`)
                  }}
                  className='text-primaryColor text-fs-300'
                >
                  View submission
                </button>
              )}
            </div>

            <p className='text-thirdColor'>Deadline : {deadline}</p>
          </div>
        ) : (
          <>
            <div className='flex justify-between'>
              <div>
                <h3>Approvement date</h3>
                <p className='text-thirdColor pt-2'>{deadline}</p>
              </div>

              <button
                onClick={() => {
                  navigate(`${id}/submission`)
                }}
                className='text-primaryColor text-fs-400'
              >
                View submission
              </button>
            </div>
          </>
        )}
      </li>
    </>
  )
};

export default AdminTask;
