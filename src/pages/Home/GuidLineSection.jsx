import Guid from "./GuidComponent";
import first from "./first.jpeg"
import second from './second.jpeg'
import third from './third.png'
import fourth from './fourth.png'

const GuidLine = () => {
  return (
    <>
      <section className=' mx-20'>
        <div className='text-fs-700 font-medium flex justify-center text-secondaryColor'>
          How can you benefits from our services ?
        </div>
        <div className='flex flex-col pt-16'>
          <Guid
            number={1}
            text={
              'Create an account as a project holder, whether you are a student or a professor. Choose your type then enter  your email. '
            }
            src={first}
            title={'Registration'}
          />
          <Guid
            number={2}
            text={
              'An email will be sent to you. There, you will find a link that takes you to the complete register page. Please provide all necessary information in order to access the platform.'
            }
            src={second}
            title={'Complete Registration'}
          />
          <Guid
            number={3}
            text={
              'Proceed to the project submission interface. Provide project details, including its title, description, and add the email addresses of team members, supervisor, and co-supervisor (optional).'
            }
            src={third}
            title={'Project Submission'}
          />
          <Guid
            number={4}
            text={
              'The scientific committee of your institution will review and make a decision regarding your project. If accepted, you will be able to continue to the next phases of the project (follow-up then thesis defence).'
            }
            src={fourth}
            title={'Project Validation'}
          />
        </div>
      </section>
    </>
  )
};

export default GuidLine;
