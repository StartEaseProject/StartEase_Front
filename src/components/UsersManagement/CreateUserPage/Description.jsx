const Description = ({ title, description }) => {
  return (
    <>
      <h2 className='text-secondaryColor  font-medium capitalize mb-5'>
        {title}
      </h2>
      <p className='text-thirdColor text-fs-300 max-w-[28.125rem]'>
        {description}.
      </p>
    </>
  )
}

export default Description
