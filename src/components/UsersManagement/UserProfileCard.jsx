const UserProfileCard = ({ user }) => {
  return (
    <div>
      <div className='flex gap-4 items-center'>
        <img
          src={user?.photo_url}
          className={`w-20 h-20 rounded-full object-cover`}
        />
        <ul>
          <li className='text-fs-400 font-medium text-secondaryColor capitalize'>
            {user?.person
              ? `${user?.person?.last_name} ${user?.person?.first_name}`
              : 'Super Admin'}
          </li>
          <li className='text-thirdColor text-fs-400'>@{user?.username}</li>
        </ul>
      </div>
    </div>
  )
}

export default UserProfileCard
