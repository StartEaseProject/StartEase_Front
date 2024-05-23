const StatusLabel = ({ status }) => {
  return (
    <div
      className={`rounded-md w-[120px] py-2 text-center font-medium text-fs-300 ${
        status ? 'text-mainGreen bg-lightGreen' : 'text-mainRed bg-lightRed'
      }`}
    >
      {status ? 'Enabled' : 'Disabled'}
    </div>
  )
}

export default StatusLabel
