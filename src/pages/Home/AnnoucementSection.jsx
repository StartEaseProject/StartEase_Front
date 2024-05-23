import { Icon } from '../../components/Globals'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const AnnoucementSection = ({ annoucements }) => {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [images, setImages] = useState(
    annoucements.map((e) => {
      return e.photo
    })
  )
  const [titles, setTitles] = useState(
    annoucements.map((e) => {
      return e.title
    })
  )
  const [descriptions, setDescriptions] = useState(
    annoucements.map((e) => {
      return e.description
    })
  )
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % annoucements.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [annoucements.length])

  return (
    <>
      <div className='flex justify-center  text-secondaryColor font-medium text-fs-600 pt-28'></div>
      <section className='bg-bgColor rounded-2xl flex flex-col items-center gap-8 mx-28 mt-16 transition-all'>
        <div className='text-secondaryColor font-medium text-fs-600 pt-14 transition-all duration-500'>
          Annoucements
        </div>
        <div className='relative h-[1rem] text-thirdColor text-fs-400 w-[40rem] text-center transition-all duration-500'>
          {titles.map((e, index) => {
            return (
              <p
                key={index}
                className={`transition-all w-full duration-1000 absolute ${
                  currentSlide === index ? 'opacity-1OO' : 'opacity-0'
                }`}
              >
                {e}
              </p>
            )
          })}
        </div>
        {/* <p className="text-thirdColor text-fs-400 w-[40rem] text-center transition-all duration-500">
          {annoucements[currentSlide].title}
        </p> */}
        <div className='relative isolate'>
          <div className='relative'>
            <div className='relative w-[50rem] h-[30rem] bg-thirdColor my-8 rounded-3xl '>
              {images.map((e, index) => {
                return (
                  <img
                    key={index}
                    className={`rounded-3xl object-cover transition-all w-full duration-1000 absolute ${
                      currentSlide === index ? 'opacity-1OO' : 'opacity-0'
                    }`}
                    src={e}
                    alt='e'
                  />
                )
              })}
            </div>
            {/* <img
              src={annoucements[currentSlide].photo}
              alt="announcement"
              className="w-[50rem] h-[30rem] bg-thirdColor my-8 rounded-3xl object-cover transition-all duration-500"
            /> */}
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-40 rounded-3xl'></div>
          </div>
          <div className='absolute bottom-14 flex flex-col gap-4'>
            <div className='relative h-[1rem] text-white  text-fs-400 w-[48rem] text-left px-8'>
              {descriptions.map((e, index) => {
                return (
                  <p
                    key={index}
                    className={`transition-all w-[45rem] duration-1000 absolute bottom-0 ${
                      currentSlide === index ? 'opacity-1OO' : 'opacity-0'
                    }`}
                  >
                    {e}
                  </p>
                )
              })}
            </div>

            <button
              onClick={() => {
                navigate(`${annoucements[currentSlide].id}`)
              }}
              className='hover:scale-105 transition-all duration-500 text-white self-end items-end py-3 px-6  text-center bg-blue-800 rounded-xl'
            >
              Learn more
            </button>
          </div>

          <div className='absolute -z-10 -top-2 left-1/2 transform -translate-x-1/2 rounded-full bg-transparent border-2 border-thirdColor opacity-50  h-[35rem] w-[35rem]' />
          <div className='absolute -z-10 -top-[2rem] left-1/2 transform -translate-x-1/2 rounded-full bg-transparent border-2 border-thirdColor opacity-20 h-[38rem] w-[38rem]' />
          <div className='absolute -z-10 -top-[3.5rem] left-1/2 transform -translate-x-1/2 rounded-full bg-transparent border-2 border-thirdColor opacity-5  h-[41rem] w-[41rem]' />
        </div>
        <div className='flex gap-2 w-[40rem] justify-center'>
          {annoucements.map((e, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                }}
                className={`transition-all duration-500 hover:cursor-pointer rounded-full h-2 w-2 ${
                  index === currentSlide
                    ? 'bg-primaryColor'
                    : 'bg-thirdColor opacity-40'
                }`}
              />
            )
          })}
        </div>
        <div className='text-secondaryColor font-medium text-fs-600 text-center w-[34rem]'>
          Are you ready for experianting with us ?
        </div>
        <p className='text-thirdColor text-fs-400 '>
          Please enter your email in order to subscribe to our newsletter.
        </p>
        <div className='flex gap-8 pt-4'>
          <div
            className={`bg-transparent 
                w-[25rem]
                outline
                outline-thirdColor
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
                `}
          >
            <Icon
              icon={'email'}
              className={`shrink-0 stroke-thirdColor group-focus-within:stroke-primaryColor`}
            />

            <input
              placeholder='Your email address'
              className={`disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor `}
            />
          </div>
          <button
            onClick={() => {
              navigate('/register')
            }}
            className='px-8  border-2 border-primaryColor text-primaryColor rounded-[10px]'
          >
            Get Started
          </button>
        </div>
        <div className='text-thirdColor text-fs-400 pb-14'>
          You already have an account ?&nbsp;
          <span
            onClick={() => {
              navigate('/login')
            }}
            className='hover:cursor-pointer text-primaryColor'
          >
            Sign in
          </span>
        </div>
      </section>
    </>
  )
}

export default AnnoucementSection
