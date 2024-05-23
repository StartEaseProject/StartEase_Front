import logo from "../../assets/globals/logo.svg";
import hero from "../../assets/globals/hero.svg";
import RowSlideshow from "./SlideShow";
import Typist from "react-typist";
import { useNavigate } from "react-router-dom";
import email from "../../assets/globals/email.svg";
import { useAuth } from "../../AuthContext";

const HeroSection = ({ experts, logos, esta }) => {
  const { auth } = useAuth()
  const navigate = useNavigate();
  return (
    <>
      <section className='container'>
        <nav className='flex justify-around pt-6 items-center'>
          <img src={logo} alt='StartEase' className='h-8 -mx-14' />
          <div className='flex gap-8 text-thirdColor'>
            <p className='hover:underline hover:cursor-pointer'>How it works</p>
            <p className='hover:underline hover:cursor-pointer'>Library</p>
            <p className='hover:underline hover:cursor-pointer'>Contact</p>
          </div>
          {!auth ? (
            <button
              onClick={() => {
                navigate('/login')
              }}
              className='transition-all duration-700 hover:scale-105  hover:shadow-lg hover:shadow-blue-400 bg-primaryColor text-white rounded-lg px-14 py-3 -mx-14'
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={() => {
                navigate('/main-menu')
              }}
              className='transition-all duration-700 hover:scale-105  hover:shadow-lg hover:shadow-blue-400 bg-primaryColor text-white rounded-lg px-14 py-3 -mx-14'
            >
              Go to dashboard
            </button>
          )}
        </nav>
        <div className='flex justify-around mx-20 pt-20'>
          <div className='flex flex-col gap-8 w-[50%]'>
            <h1 className='text-fs-800 font-medium'>
              <Typist
                className='text-secondaryColor'
                avgTypingDelay={50}
                startDelay={1000}
                cursor={{ hideWhenDone: true }}
              >
                Empowering Student Projects: Collaborate, Organize, Succeed!
              </Typist>
            </h1>

            <p className='text-thirdColor'>
              StartEase is a service that allows students to team up and submit
              their start-up ideas for approval by the scientific committee. By
              providing a seamless platform for collaboration, organization, and
              support, StartEase empowers students to take their entrepreneurial
              ventures to new heights and achieve remarkable success.
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
                <img
                  src={email}
                  alt='email'
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
                className=' px-5 min-w-[9rem]    border-2 border-primaryColor text-primaryColor rounded-[10px]'
              >
                Get Started
              </button>
            </div>
            <div className='flex -space-x-3 items-center'>
              <img
                src={experts[0]}
                alt='expert'
                className=' h-12 w-12 rounded-full border-4 border-white object-cover '
              />
              <img
                src={experts[1]}
                alt='expert'
                className=' h-12 w-12 rounded-full border-4 border-white object-cover '
              />
              <img
                src={experts[2]}
                alt='expert'
                className=' h-12 w-12 rounded-full border-4 border-white object-cover '
              />
              <img
                src={experts[3]}
                alt='expert'
                className=' h-12 w-12 rounded-full border-4 border-white object-cover '
              />

              <p className='text-thirdColor px-6'>Experts</p>
            </div>
          </div>
          <img src={hero} alt='StartEase' />
        </div>
        <div className='flex flex-col pt-12  gap-4'>
          <p className='flex justify-center pb-8'>
            We Collaborate With &nbsp;{esta}+ Leading Universities And Establishments
          </p>
          <RowSlideshow strings={logos} />
        </div>
      </section>
    </>
  )
};

export default HeroSection;
