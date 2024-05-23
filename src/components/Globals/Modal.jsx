
const Modal = ({ title, children, closeModal }) => {
  const close = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div
      onClick={close}
      className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-10'
    >
      <div className='bg-white rounded-lg shadow min-w-[25rem] z-20 relative'>
        <div className='flex justify-center text-secondaryColor text-fs-500 pt-4'>
          {title}
        </div>
        <div className='bg-bgColor h-[1px] mb-4 mt-2' />
        <div className='p-4'>{children}</div>
      </div>
    </div>
  )
}

export default Modal
