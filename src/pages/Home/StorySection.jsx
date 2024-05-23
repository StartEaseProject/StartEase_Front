import Story from '../../assets/globals/story.svg'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import Lottie from 'lottie-react'
import attention from '../../assets/globals/Attention.json'

const StorySection = ({ student, esta, project }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.2, // Adjust this threshold value as needed
  })
  return (
    <>
      <section className='flex py-36  justify-center'>
        <div>
          <div className='font-medium text-primaryColor text-fs-700 mt-[4rem]'>
            <Lottie
              style={{ height: 100 }}
              animationData={attention}
              loop={true}
            />
          </div>
          <div className='pt-24 flex gap-2 items-center'>
            <p className='text-fs-400 min-w-[5rem] font-medium'>New to the idea ?</p>
            <div className='bg-primaryColor w-[5rem] h-[1.5px] rounded-full self-end mb-1' />
          </div>
          <div className='text-thirdColor pt-3 w-[15rem]'>
            Here is a small simple of the origin of our platform.
          </div>
          <button className='bg-gray-200 text-thirdColor px-20 py-3 rounded-[10px] mt-4'>
            Contact us
          </button>
        </div>
        <div className='flex gap-8'>
          <div className='relative'>
            <img src={Story} alt='StartEase' />
            <a
              href='https://www.joradp.dz/FTP/jo-francais/2022/F2022069.pdf'
              target='_blank'
              className='hover:cursor-pointer text-white bg-primaryColor px-[16%] py-6 absolute bottom-12 right-0 rounded-[18px]'
            >
              Learn more
            </a>
          </div>
          <div className='flex flex-col gap-4 pt-14'>
            <div className='flex flex-col  text-fs-700'>
              <div ref={ref} className='text-secondaryColor font-medium'>
                {inView && <CountUp end={esta} duration={2} />}
                <span className='px-2 text-primaryColor'>+</span>
              </div>
              <p className='text-fs-400 text-thirdColor'>Establishments</p>
            </div>
            <div className='flex flex-col text-fs-700'>
              <div className='text-secondaryColor font-medium'>
                {inView && <CountUp end={student} duration={2} />}{' '}
                <span className='px-2 text-primaryColor'>+</span>
              </div>
              <p className='text-fs-400 text-thirdColor'>Students</p>
            </div>
            <div className='flex flex-col  text-fs-700'>
              <div className='text-secondaryColor font-medium'>
                {inView && <CountUp end={project} duration={2} />}{' '}
                <span className='px-2 text-primaryColor'>+</span>
              </div>
              <p className='text-fs-400 text-thirdColor'>Projects</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default StorySection
