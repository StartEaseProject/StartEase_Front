import { Fragment } from 'react'

const Timeline = ({ currentStep, total }) => {
  return (
    <div className='inline-flex items-center'>
      {[...Array(total)].map((elementInArray, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <span
              className={`h-[2px] w-[135px] 
                    ${
                      index <= currentStep - 1
                        ? 'bg-primaryColor'
                        : 'bg-thirdColor'
                    }`}
            ></span>
          )}
          <span
            className={`text-white font-medium text-fs-300 grid place-content-center aspect-square w-7 rounded-full
                    ${
                      index <= currentStep - 1
                        ? 'bg-primaryColor'
                        : 'bg-thirdColor'
                    }`}
          >
            {index+1}{' '}
          </span>
        </Fragment>
      ))}
    </div>
  )
}

export default Timeline
