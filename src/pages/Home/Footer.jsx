import social from "../../assets/globals/social.svg";

const Footer = () => {
  return (
    <>
      <section className='bg-blue-700  mt-24 text-white text-fs-300'>
        <div className='flex justify-between mx-24 pt-12'>
          <div className='space-y-4'>
            <div className='font-medium text-fs-600 pl-4'>StartEase</div>
            <p className='pt-4 text-fs-300 w-[25rem]'>
              StartEase is a service that allows students to team up and submit
              their start-up ideas for approval by the scientific committee. By
              providing a seamless platform for collaboration, organization, and
              support, StartEase empowers students to take their entrepreneurial
              ventures to new heights and achieve remarkable success.
            </p>
          </div>
          <div className='space-y-4'>
            <div className='font-medium pb-4'>Activity</div>
            <p>Docuementation</p>
            <p>Companies</p>
            <p>Statistiques</p>
            <p>StartEase </p>
          </div>
          <div className='space-y-4'>
            <div className='font-medium pb-4'>Contact us</div>
            <p>Address : El wiam , SBA , 22000</p>
            <p>Email : DevCore@gmail.com</p>
            <p>Phone : +213 349839434</p>
          </div>
          <div className='space-y-4'>
            <div className='pb-4'>Newsletter</div>
            <div
              className={`bg-secondBgColor 
                py-[6px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
               `}
            >
              <input
                placeholder='Enter your email...'
                className={`disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor 
            }`}
              />
              <button className='bg-blue-700 px-6 py-3 rounded-lg'>
                Subscire
              </button>
            </div>
            <img src={social} alt='StartEase' className='pt-3' />
          </div>
        </div>
        <div className='pt-16 mx-24 pb-8'>
          <div className='h-[1.5px] w-full bg-white rounded-lg opacity-60 mb-6' />
          <div className='flex justify-between'>
            <div>©2023 StartEase - Project</div>
            <div className='flex gap-6'>
              <p>Mentions légales</p>
              <p>Conditions générales</p>
              <p>Politique de confidentialité</p>
            </div>
            <div>Designed and coded by DevCore</div>
          </div>
        </div>
      </section>
    </>
  )
};

export default Footer;
