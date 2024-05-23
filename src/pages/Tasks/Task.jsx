import { useNavigate } from "react-router-dom";

const Task = ({ title, description, status, attachments, deadline, id }) => {
  const navigate = useNavigate();
  return (
    <li className='w-[30rem] border- rounded-lg shadow-custom text-secondaryColor px-4 py-4'>
      <div className=' flex justify-between gap-4'>
        <h3 className='w-[20rem] overflow-hidden'>{title}</h3>

        <div
          className={` ${
            status === 'completed' ? 'text-mainGreen' : 'text-mainPending'
          } `}
        >
          {status}
        </div>
      </div>

      <p className='text-thirdColor pt-2 line-clamp-2 overflow-hidden'>
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

      {status === 'in progress' ? (
        <div className='flex justify-between py-2'>
          <button
            onClick={() => {
              navigate(`${id}/submit`)
            }}
            className='text-primaryColor'
          >
            Submit
          </button>
          <p className='text-thirdColor'>Deadline : {deadline}</p>
        </div>
      ) : status === 'pending' ? (
        <>
          <div className='flex justify-between'>
            <p className='text-thirdColor'>Deadline : {deadline}</p>
            <button
              onClick={() => {
                navigate(`${id}/submission`)
              }}
              className='text-primaryColor'
            >
              View submission
            </button>
          </div>
        </>
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
  )
};

export default Task;
